"use server";

import { signIn, signOut } from "@/auth";
// import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
// import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
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
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
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
