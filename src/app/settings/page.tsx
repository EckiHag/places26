// src/app/settings/page.tsx
'use server'
import { auth } from '@/auth';
import SettingsClient from './SettingsClient';

export default async function Settings() {
  const session = await auth(); // Abruf der Session auf dem Server
  return <SettingsClient session={session} />;
}
