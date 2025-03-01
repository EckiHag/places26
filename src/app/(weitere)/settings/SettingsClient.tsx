// src/app/settings/SettingsClient.tsx
"use client";

import { Card, CardHeader, CardBody, Button, Divider } from "@heroui/react";
import { FaRegSmile } from "react-icons/fa";
import { signOutUser } from "@/app/actions/authActions";
import { Session } from "next-auth";
import Image from "next/image";

interface SettingsClientProps {
  session: Session | null; // Session kann null sein, wenn der Benutzer nicht eingeloggt ist
}

export default function SettingsClient({ session }: SettingsClientProps) {
  const handleSignOut = async () => {
    try {
      // await fetch('/api/auth/signout', { method: 'POST' });
      // window.location.reload(); // Seite neu laden, um Session-Änderungen anzuzeigen
      await signOutUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const role = session?.user.role;

  return (
    <div className="flex flex-col items-center">
      <Card className="max-w-[300px] lg:max-w-[400px] min-h-[200px] mx-4">
        <CardHeader className="flex gap-3  bg-primary-400">
          <div className="flex flex-col">
            <p className="text-2xl">Session</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="bg-primary-100">
          <div className="ml-5 mr-5 mt-10 flex flex-col">
            {session && session.user && (
              <>
                <h1 className="text-3xl">Hello {session.user.name}!</h1>
                <h3 className="text-2xl font-semibold break-words max-w-full">User session data:</h3>
                <div className="mt-1 p-4">
                  <div className="mb-2">
                    <div className="ml-10">
                      <Image src={`https://beihaggis.de/${session.user.image}`} width={128} height={128} alt="User Image" className="rounded-md" />
                    </div>
                    <label className="font-semibold">Name:</label>
                    <span className="ml-2">{session.user.name || "N/A"}</span>
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold">Email:</label>
                    <span className="ml-2">{session.user.email || "N/A"}</span>
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold">ID:</label>
                    <span className="ml-2">{session.user.id || "N/A"}</span>
                  </div>
                  <div className="mb-2">
                    <label className="font-semibold">Role:</label>
                    <span className="ml-2">{session.user.role || "N/A"}</span>
                  </div>
                  {session.user.image && (
                    <div className="mb-2">
                      <label className="font-semibold">Image:</label>
                      <span className="ml-2">{session.user.image || "N/A"}</span>
                    </div>
                  )}
                </div>
                <Button
                  className="text-psecondary-500 bg-psecondary-200 border-psecondary-500 mt-4"
                  variant="bordered"
                  startContent={<FaRegSmile size={20} />}
                  onPress={handleSignOut}
                >
                  Sign out
                </Button>
              </>
            )}

            {!session && <div>Not signed in</div>}

            <br></br>
            <h3 className="text-2xl font-semibold">Role: {role}</h3>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
