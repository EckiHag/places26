"use server";
import { prisma } from "@/lib/prisma";
import { PicSchema, picSchema } from "@/lib/schemas/picSchema";
import { Pics } from "@prisma/client";
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

export async function getPicsForMemory() {
  const anzahl = 12;
  try {
    // Anzahl aller Bilder ermitteln
    const totalCount = await prisma.pics.count();

    // Sicherstellen, dass mindestens 6 Bilder da sind
    if (totalCount < anzahl) {
      throw new Error("Nicht genügend Bilder in der Datenbank.");
    }

    // Zufälliger Offset, damit wir 6 Bilder ab dieser Position nehmen können
    const maxSkip = totalCount - anzahl;
    const skip = Math.floor(Math.random() * maxSkip);

    // 6 zufällige Bilder laden
    const data = await prisma.pics.findMany({
      skip,
      take: anzahl,
    });

    return data;
  } catch (error) {
    console.error("Fehler beim Laden der Memory-Bilder:", error);
    return [];
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
    const existingPic = await prisma.pics.findUnique({ where: { id } });

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

export async function updatePicsOrd(sortedPics: Pics[]) {
  try {
    // Update jedes Bild in der DB mit ord + 5
    const updatedPics = sortedPics.map((pic) => ({
      ...pic,
      ord: (pic.ord || 0) + 5,
    }));

    // Beispiel: Speichern in der DB (falls Prisma genutzt wird)
    await Promise.all(
      updatedPics.map((pic) =>
        prisma.pics.update({
          where: { id: pic.id },
          data: { ord: pic.ord },
        })
      )
    );

    return { success: true, updatedPics };
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Pics:", error);
    return { success: false, error: "Fehler beim Aktualisieren der Bilder." };
  }
}

export const deletePicWithId = async (id: string, image: string): Promise<boolean> => {
  console.log("deletePicWithId wurde mit folgender ID aufgerufen:", id);
  console.log("deletePicWithId wurde mit folgendem Bild aufgerufen:", image);

  const deleteResponse = await deleteImageFile(image);

  if (!deleteResponse.success) {
    console.error("Bild konnte nicht gelöscht werden:", deleteResponse.message);
    return false;
  }

  try {
    const deletedPic = await prisma.pics.delete({
      where: { id },
    });
    console.log("Der Datensatz wurde erfolgreich gelöscht:", deletedPic);
    return true;
  } catch (error) {
    console.error("Fehler beim Löschen des Datensatzes:", error);
    return false;
  }
};

export const deleteImageFile = async (imagePath: string): Promise<{ success: boolean; message?: string }> => {
  try {
    if (!imagePath) {
      console.error("Fehler: Kein Bildpfad angegeben.");
      return { success: false, message: "Kein Bildpfad angegeben." };
    }

    const uploadPassword = process.env.NEXT_PUBLIC_UPLOAD_PASSWORD;
    if (!uploadPassword) {
      console.error("Fehler: UPLOAD_PASSWORD ist nicht gesetzt.");
      return { success: false, message: "UPLOAD_PASSWORD nicht gesetzt." };
    }

    const response = await fetch("https://beihaggis.de/api/places26/p26picdelete/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-upload-password": uploadPassword,
      },
      body: JSON.stringify({ filePath: imagePath }),
    });

    if (!response.ok) {
      const errorMessage = `Fehler beim Löschen: ${response.statusText}`;
      console.error(errorMessage);
      return { success: false, message: errorMessage };
    }

    const data = await response.json();
    console.log("Server Antwort:", data);

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Fehler beim Löschen der Datei:", error);
    return { success: false, message: "Server-Fehler beim Löschen." };
  }
};
