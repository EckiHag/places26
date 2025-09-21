import { z } from "zod";
import { UserRole } from "@prisma/client";

export const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  emailVerified: z.date().optional(),
  image: z.string().optional(),
  passwordHash: z.string().optional(),
  role: z.nativeEnum(UserRole).default("NEWBIE"),
  imgwidth: z.number().int().positive("Image width must be positive").optional(),
  imgheight: z.number().int().positive("Image height must be positive").optional(),
  // id & created sind DB-gesteuert → nicht Teil des Eingabe-Schemas
});

// Für Updates kannst du weiterhin ein Partial verwenden (konventionell):
export const userUpdateSchema = userSchema.partial();

export type UserSchema = z.infer<typeof userSchema>;
export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
