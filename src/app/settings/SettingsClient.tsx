// src/app/settings/SettingsClient.tsx
'use client';

import { Button } from "@heroui/react";
import { FaRegSmile } from 'react-icons/fa';
import { signOutUser } from '@/app/actions/authActions';
import { Session } from 'next-auth';

interface SettingsClientProps {
  session: Session | null; // Session kann null sein, wenn der Benutzer nicht eingeloggt ist
}

export default function SettingsClient({ session }: SettingsClientProps) {

  const handleSignOut = async () => {
    try {
      // await fetch('/api/auth/signout', { method: 'POST' });
      // window.location.reload(); // Seite neu laden, um Session-Änderungen anzuzeigen
      await signOutUser()
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

const role =session?.user.role

  return (
    <div className='ml-10 mt-10 flex flex-col'>
      <h1 className='text-3xl'>Hello app!</h1>

      <h3 className='text-2xl font-semibold'>User session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <Button
            color='primary'
            variant='bordered'
            startContent={<FaRegSmile size={20} />}
            onPress={handleSignOut}
          >
            Sign out
          </Button>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
      <br></br>
      <h3 className='text-2xl font-semibold'>Role: {role}</h3>
    </div>
  );
}
