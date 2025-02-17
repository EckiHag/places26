import { z } from "zod";

export const picSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  belongstoid: z.string().optional(), // Optional weil vom Code übergeben
  image: z.string().optional(), // Optionales Feld für den Bildpfad
  imgwidth: z.number().positive("Image width must be a positive number").optional(),
  imgheight: z.number().positive("Image height must be a positive number").optional(),
  copyright: z.string().optional(), // Optional, falls kein Copyright angegeben wird
  ord: z.number().int().default(0), // Standardwert 0 für die Reihenfolge
  video: z.boolean().default(false), // Standardwert false für Videos
});

// Update-Schema: Gleiche Struktur, aber ohne "image"
export const picUpdateSchema = picSchema.omit({ image: true, imgwidth: true, imgheight: true });

export type PicSchema = z.infer<typeof picSchema>;
export type PicUpdateSchema = z.infer<typeof picUpdateSchema>;
