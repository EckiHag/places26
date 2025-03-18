import { z } from "zod";

export const subjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  creator: z.string(), // Optionale weil vom Code übergeben
  image: z.string().optional(), // Optionales Feld für den Bildpfad
  imgwidth: z.number().positive("Image width must be a positive number").optional(),
  imgheight: z.number().positive("Image height must be a positive number").optional(),
  group: z.string().min(1, {
    message: "Group is required",
  }),
  ord: z.number().int().default(0), // Standardwert 0 für die Reihenfolge
});

// Update-Schema: Gleiche Struktur, aber ohne "image"
export const subjectUpdateSchema = subjectSchema.omit({ image: true, imgwidth: true, imgheight: true });

export type SubjectSchema = z.infer<typeof subjectSchema>;
export type SubjectUpdateSchema = z.infer<typeof subjectUpdateSchema>;
