"use server";
import { prisma } from "@/lib/prisma";
import { PicSchema, picSchema } from "@/lib/schemas/picSchema";
import { Pics } from "@prisma/client";
import fs from "fs";
import path from "path";
import { z } from "zod";

// export type Slide = {
//   id: string;
//   image?: string | null;
//   created: Date;
//   imgwidth?: number | null;
//   imgheight?: number | null;
//   copyright?: string | null;
//   title: string | null; // `null` erlauben
//   description: string | null;
//   belongstoid: string;
//   ord: number;
//   video: boolean;
// };

export type ActionResult<T> = { status: "success"; data: T } | { status: "error"; error: string | z.ZodIssue[] };

export async function getPicsTwenty() {
  try {
    const data = await prisma.pics.findMany({
      skip: 1200,
      take: 7, // Begrenzt die Anzahl der zurückgegebenen Ergebnisse auf 20
    });
    // console.log("getPicsTwenty")
    return data;
  } catch (error) {
    console.error("Error fetching places:", error);
    return []; // leeres array zurückgeben
  }
}

export const getPicsByBelongstoid = async (id: string) => {
  // console.log("getPicsByBelongstoid: ", id)
  try {
    const data = await prisma.pics.findMany({
      where: {
        belongstoid: id,
      },
      orderBy: {
        created: "desc", // Sortiere nach dem Erstellungsdatum abwärts
      },
    });
    // console.log("getPicsByBelongstoid:", data)
    return data;
  } catch (error) {
    console.error("Error fetching pictures:", error);
    return null;
  }
};

export const getPicById = async (id: string) => {
  try {
    const data = await prisma.pics.findUnique({
      where: {
        id: id,
      },
    });
    console.log("getPicById id: ", id);
    console.log("getPicById data: ", data);
    return data;
  } catch (error) {
    console.error("Error fetching pictures:", error);
    return null;
  }
};

export async function addPic(data: PicSchema): Promise<ActionResult<Pics>> {
  try {
    // Validierung der Daten
    const validated = picSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { title, description, belongstoid, image, imgwidth, imgheight, copyright, ord, video } = validated.data;

    // Benutzer erstellen und die Bildinformationen speichern
    const pic = await prisma.pics.create({
      data: {
        title,
        description,
        belongstoid: belongstoid || "", // Speichert `null`, falls `undefined`
        image,
        imgwidth,
        imgheight,
        copyright,
        ord,
        video,
      },
    });

    return { status: "success", data: pic };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function updatePic(id: string, data: PicSchema): Promise<ActionResult<Pics>> {
  try {
    // Validierung der Daten
    const validated = picSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { title, description, image, copyright, ord, video } = validated.data;

    // Prüfen, ob das Fach existiert
    const existingPic = await prisma.places.findUnique({ where: { id } });

    if (!existingPic) {
      return { status: "error", error: "Pic not found" };
    }

    // Fach aktualisieren
    const updatedPic = await prisma.pics.update({
      where: { id },
      data: {
        title,
        description,
        image,
        copyright,
        ord,
        video,
      },
    });

    return { status: "success", data: updatedPic };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export const deletePicWithId = async (image: string, id: string) => {
  console.log("Die Funktion deletePicWithId wurde mit folgendem image aufgerufen: ", image);
  try {
    const filePath = path.join(process.cwd(), "public", image);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Fehler beim Löschen der Datei:", err);
        return;
      }
      console.log("Die Datei wurde erfolgreich gelöscht.");
    });
  } catch (error) {
    console.error("Fehler beim Löschen des Bildes:", error);
    return false;
  }

  try {
    const deletedPic = await prisma.pics.delete({
      where: {
        id: id,
      },
    });

    console.log("Der Datensatz wurde erfolgreich gelöscht: ", deletedPic);
    return true;
  } catch (error) {
    console.error("Fehler beim Löschen des Datensatzes: ", error);
    return false;
  }
};
