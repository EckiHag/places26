"use server";

import { UserSchema, userSchema } from "@/lib/schemas/userSchema";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

/**
 * Alle User laden (neueste zuerst).
 * Gibt reine JSON-Objekte zurück (ohne Prisma-Proxies).
 */
export const getUserAll = async (): Promise<User[] | null> => {
  try {
    const data = await prisma.user.findMany({
      orderBy: { created: "desc" }, // falls dein Feld anders heißt: z.B. createdAt
    });

    // ✅ Prisma-Daten in ein reines JSON-Objekt umwandeln
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export type ActionResult<T> = { status: "success"; data: T } | { status: "error"; error: string | z.ZodIssue[] };

/**
 * User aktualisieren.
 */
export async function updateUser(id: string, data: UserSchema): Promise<ActionResult<User>> {
  try {
    // Validierung
    const validated = userSchema.safeParse(data);
    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    // Existenz prüfen
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return { status: "error", error: "User not found" };
    }

    // Update
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...validated.data,
      },
    });

    return { status: "success", data: updatedUser };
  } catch (error) {
    console.error("updateUser error:", error);
    return { status: "error", error: "Something went wrong" };
  }
}

/**
 * User per ID holen (roh, ohne JSON-Clone).
 */
export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}
