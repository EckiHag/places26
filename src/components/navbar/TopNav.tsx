"use server";

import { auth } from "../../auth";
import ClientNav from "./ClientNav";

export default async function TopNav() {
  const session = await auth(); // Server-seitige Authentifizierung

  return <ClientNav session={session} />;
}
