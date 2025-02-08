// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

// Hier gibts noch keine wirkliche Lösung, weil eslint (s.o.) einfach ausgeschaltet wurde:
// https://next-auth.js.org/getting-started/typescript

// Benutzerdefinierte Erweiterung der Typen
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string; // Role zur Session hinzufügen
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string; // Role zum User hinzufügen
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: string; // Role zum JWT hinzufügen
  }
}
