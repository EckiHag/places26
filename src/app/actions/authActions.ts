"use server";

import { signIn, signOut } from "@/auth";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";

type PrismaUser = Awaited<ReturnType<typeof prisma.user.create>>; // User-Typ ableiten

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
  console.log("signInUser");
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(result);
    return { status: "success", data: "Logged in" };
  } catch (error) {
    console.log("Error in signInUser:", error);
    // return { status: "error", error: "Something went wrong" };
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Email oder Password falsch! ☹️" };
        default:
          return { status: "error", error: "Something went wrong" };
      }
    } else {
      return { status: "error", error: "Something else went wrong" };
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}

export async function registerUser(data: RegisterSchema): Promise<ActionResult<PrismaUser>> {
  try {
    // Validierung der Daten
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, email, password, image, imgwidth, imgheight } = validated.data;

    // Passwort-Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Überprüfen, ob der Benutzer bereits existiert
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { status: "error", error: "User already exists" };
    }

    // Benutzer erstellen und die Bildinformationen speichern
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        image, // Bild-URL
        imgwidth, // Bildbreite
        imgheight, // Bildhöhe
      },
    });

    return { status: "success", data: user };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!record || record.expiresAt < new Date() || record.used) {
    return { success: false, error: "Token ist ungültig oder abgelaufen." };
  }

  // 🔐 Neues Passwort hashen (z. B. mit bcrypt)
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // 💾 Passwort speichern
  await prisma.user.update({
    where: { id: record.userId },
    data: { passwordHash: hashedPassword },
  });

  // 🚫 Token ungültig machen
  await prisma.passwordResetToken.update({
    where: { token },
    data: { used: true },
  });

  return { success: true };
}
// export async function resetPassword(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
//   // TODO: Token in DB validieren
//   // z.B. const resetRequest = await db.passwordResetToken.findUnique({ where: { token } });

//   const isValid = token && token.length > 10; // Nur Beispiel!
//   if (!isValid) {
//     return { success: false, error: "Token ist ungültig oder abgelaufen." };
//   }

//   // TODO: Benutzer anhand des Tokens finden und Passwort updaten
//   // z.B. await db.user.update({ where: { id: userId }, data: { password: hash(newPassword) } });

//   console.log("🔐 Neues Passwort:", newPassword, "für Token:", token);
//   return { success: true };
// }
