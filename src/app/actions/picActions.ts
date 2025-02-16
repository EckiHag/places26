"use server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export type Slide = {
  id: string;
  image?: string;
  created: Date;
  imgwidth?: number | null;
  imgheight?: number | null;
  copyright?: string | null;
  title: string | null; // `null` erlauben
  description: string | null;
  belongstoid: string;
  ord: number;
  video: boolean;
};

export async function getPicsTwenty(): Promise<Slide[]> {
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

// export const editPicWithId = async (id) => {
//   console.log("Die Funktion editPicWithId wurde mit folgender id aufgerufen: ", id)
//   return null
// }

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
