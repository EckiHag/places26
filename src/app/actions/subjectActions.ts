"use server";
// import { prisma } from "@/lib/prisma";
import { SubjectSchema, subjectSchema } from "@/lib/schemas/subjectSchema";
import { z } from "zod";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { prisma } from "@/lib/prisma";
type Subjects = Awaited<ReturnType<typeof prisma.subjects.create>>; // User-Typ ableiten

export const getSubjectsAll = async () => {
  try {
    const data = await prisma.subjects.findMany({
      orderBy: {
        created: "desc", // Sortiere nach dem Erstellungsdatum abwärts
      },
    });
    // console.log("getSubjectsAll")
    return data;
  } catch (error) {
    console.error("Error fetching places:", error);
    return null;
  }
};

export type ActionResult<T> = { status: "success"; data: T } | { status: "error"; error: string | z.ZodIssue[] };
export async function addSubject(data: SubjectSchema): Promise<ActionResult<Subjects>> {
  try {
    // Validierung der Daten
    const validated = subjectSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { title, description, image, creator, group } = validated.data;

    // Benutzer erstellen und die Bildinformationen speichern
    const subject = await prisma.subjects.create({
      data: {
        title,
        description,
        image,
        creator,
        group,
      },
    });

    return { status: "success", data: subject };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function updateSubject(id: string, data: SubjectSchema): Promise<ActionResult<Subjects>> {
  try {
    // Validierung der Daten
    const validated = subjectSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { title, description, image, group } = validated.data;

    // Prüfen, ob das Fach existiert
    const existingSubject = await prisma.subjects.findUnique({ where: { id } });

    if (!existingSubject) {
      return { status: "error", error: "Subject not found" };
    }

    // Fach aktualisieren
    const updatedSubject = await prisma.subjects.update({
      where: { id },
      data: {
        title,
        description,
        image,
        group,
      },
    });

    return { status: "success", data: updatedSubject };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getSubjectById(id: string) {
  return prisma.subjects.findUnique({ where: { id } });
}
