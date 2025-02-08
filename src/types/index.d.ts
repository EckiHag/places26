// src/types/index.d.ts

import { ZodIssue } from 'zod';


export type ExtendedUser = DefaultSession["user"] & {
  //   role: UserRole;
  //   isTwoFactorEnabled: boolean;
  //   isOAuth: boolean;
  role: "ADMIN" | "USER"
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}



type ActionResult<T> = 
    {status: 'success', data: T} | {status: 'error', error: string | ZodIssue[]}