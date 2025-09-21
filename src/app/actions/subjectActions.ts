"use server";

import { SubjectSchema, subjectSchema } from "@/lib/schemas/subjectSchema";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { Subjects } from "@prisma/client";

export const getSubjectsAll = async (): Promise<Subjects[] | null> => {
  try {
    const data = await prisma.subjects.findMany({
      orderBy: { created: "desc" },
    });

    // ✅ Prisma-Daten in ein reines JSON-Objekt umwandeln
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching subjects:", error);
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

    const { title, description, image, creator, group, imgwidth, imgheight } = validated.data;

    // Benutzer erstellen und die Bildinformationen speichern
    const subject = await prisma.subjects.create({
      data: {
        title,
        description,
        image,
        imgwidth,
        imgheight,
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

    const { title, description, image, group, ord } = validated.data;

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
        ord,
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
