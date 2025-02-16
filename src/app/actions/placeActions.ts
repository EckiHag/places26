"use server";
import { prisma } from "@/lib/prisma";
import { PlaceSchema, placeSchema } from "@/lib/schemas/placeSchema";
import { Places } from "@prisma/client";
import { z } from "zod";

export const getPlacesAll = async () => {
  try {
    const data = await prisma.places.findMany();
    // console.log("getPlacesAll")
    return data;
  } catch (error) {
    console.error("Error fetching places:", error);
    return null;
  }
};

export const getPlacesByCreatorsubject = async (id: string) => {
  // console.log("getPlacesByCreatorsubject: ", id)
  try {
    const data = await prisma.places.findMany({
      where: {
        creatorsubject: id,
      },
    });
    // console.log("getPlacesByCreatorsubject:", data)
    return data;
  } catch (error) {
    console.error("Error fetching pictures:", error);
    return null;
  }
};

export type ActionResult<T> = { status: "success"; data: T } | { status: "error"; error: string | z.ZodIssue[] };

export async function addPlace(data: PlaceSchema): Promise<ActionResult<Places>> {
  try {
    // Validierung der Daten
    const validated = placeSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { title, description, image, creator, creatorsubject, imgwidth, imgheight } = validated.data;

    // Benutzer erstellen und die Bildinformationen speichern
    const place = await prisma.places.create({
      data: {
        title,
        description,
        creator,
        creatorsubject,
        image,
        imgwidth,
        imgheight,
      },
    });

    return { status: "success", data: place };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function updatePlace(id: string, data: PlaceSchema): Promise<ActionResult<Places>> {
  try {
    // Validierung der Daten
    const validated = placeSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { title, description, image } = validated.data;

    // Prüfen, ob das Fach existiert
    const existingSubject = await prisma.places.findUnique({ where: { id } });

    if (!existingSubject) {
      return { status: "error", error: "Place not found" };
    }

    // Fach aktualisieren
    const updatedPlace = await prisma.places.update({
      where: { id },
      data: {
        title,
        description,
        image,
      },
    });

    return { status: "success", data: updatedPlace };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function getPlaceById(id: string) {
  return prisma.places.findUnique({ where: { id } });
}
