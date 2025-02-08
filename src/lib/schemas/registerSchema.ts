import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
  image: z.string().optional(), // Optionales Feld für den Bildpfad
  imgwidth: z.number().optional(), // Optionales Feld für Bildbreite
  imgheight: z.number().optional(), // Optionales Feld für Bildhöhe
});

export type RegisterSchema = z.infer<typeof registerSchema>;
