"use server";

// import { prisma } from "@/lib/prisma";
import sharp from "sharp";
import axios from "axios";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type PrismaPics = Awaited<ReturnType<typeof prisma.pics.create>>; // User-Typ ableiten
// type Pics = typeof prisma.pics.$types.Model;

export const writehw = async () => {
  try {
    const pics: PrismaPics[] = await prisma.pics.findMany({
      where: {
        OR: [{ imgwidth: null }, { imgheight: null }],
      },
    });

    if (pics.length === 0) {
      return { message: "No images to update.", updated: 0 };
    }

    const updates = await Promise.all(
      pics.map(async (pic) => {
        const imageUrl = `https://beihaggis.de/${pic.image.replace(/^.\//, "")}`;

        try {
          // Bild herunterladen
          const response = await axios({
            url: imageUrl,
            responseType: "arraybuffer",
          });

          const buffer = Buffer.from(response.data);

          // Hole Bilddimensionen
          const metadata = await sharp(buffer).metadata();

          // Aktualisiere die Datenbank
          return prisma.pics.update({
            where: { id: pic.id },
            data: {
              imgwidth: metadata.width,
              imgheight: metadata.height,
            },
          });
        } catch (error) {
          console.warn(`Failed to process image: ${imageUrl}`, error);
          return null;
        }
      })
    );

    return {
      message: "Image dimensions updated successfully.",
      updated: updates.filter(Boolean).length,
    };
  } catch (error) {
    console.error("Error in writehw:", error);
    throw new Error("An error occurred while updating image dimensions.");
  }
};
