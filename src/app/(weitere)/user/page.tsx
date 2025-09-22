// app/(weitere)/user/page.tsx
import { getUserAll } from "@/app/actions/userActions";
import { User } from "@prisma/client";
import UsersTableClient from "./userTableClient"; // Client-Komponente separat

export default async function UserTabelle() {
  const users: User[] = (await getUserAll()) ?? [];
  console.log("users: ", users);
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">User-Verwaltung</h2>
      <UsersTableClient initialUsers={users} />
    </div>
  );
}
