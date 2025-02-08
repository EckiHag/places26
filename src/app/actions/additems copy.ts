"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function newSubject(payload: FormData) {
  try {
    // Werte aus dem FormData-Objekt extrahieren
    const title = payload.get("title");
    const description = payload.get("description");
    const image = payload.get("image");
    const creator = payload.get("creator");
    const group = payload.get("group");

    // Validierung der Pflichtfelder
    if (!title || !description || !creator || !group) {
      throw new Error("Required fields are missing.");
    }

    // Daten in der Datenbank speichern
    const newSubject = await prisma.subjects.create({
      data: {
        title: String(title),
        description: String(description),
        image: image instanceof File ? image.name : String(image), // Beispiel: Dateiname verwenden
        creator: String(creator),
        group: String(group),
      },
    });

    console.log("newSubject", newSubject);
    return { status: "success", data: newSubject };
  } catch (error: unknown) {
    // Fehlerbehandlung
    if (error instanceof Error) {
      console.error("Error creating new subject:", error);
      return { status: "error", message: error.message };
    } else {
      console.error("Unknown error creating new subject:", error);
      return { status: "error", message: "An unknown error occurred" };
    }
  }
}
