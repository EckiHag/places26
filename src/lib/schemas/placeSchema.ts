import { z } from "zod";

export const placeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  creator: z.string(), // Optionale weil vom Code übergeben
  creatorsubject: z.string(), // Optionale weil vom Code übergeben
  image: z.string().optional(), // Optionales Feld für den Bildpfad
  imgwidth: z.number().positive("Image width must be a positive number").optional(),
  imgheight: z.number().positive("Image height must be a positive number").optional(),
});

// Update-Schema: Gleiche Struktur, aber ohne "image"
export const placeUpdateSchema = placeSchema.omit({ image: true, imgwidth: true, imgheight: true });

export type PlaceSchema = z.infer<typeof placeSchema>;
export type PlaceUpdateSchema = z.infer<typeof placeUpdateSchema>;
