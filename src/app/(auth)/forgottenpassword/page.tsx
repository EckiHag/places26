// src/app/auth/forgottenpassword/page.tsx
"use client";

import React, { useActionState } from "react";
import { requestPasswordReset } from "@/app/actions/mailActions";

type ActionState = {
  success?: boolean;
  error?: string;
};

export default function ForgottenPasswordPage() {
  const initialState: ActionState = {};
  const [state, formAction] = useActionState(requestPasswordReset, initialState);

  return (
    <div className="flex flex-col items-center mt-24 p-4">
      <h1 className="text-2xl font-bold mb-2">Passwort vergessen?</h1>
      <h2 className="mb-6 text-gray-600">Kein Problem – gib deine E-Mail ein:</h2>

      <form action={formAction} className="w-full max-w-sm space-y-4">
        <input type="email" name="email" placeholder="Deine E-Mail-Adresse" required className="w-full p-2 border border-gray-300 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          E-Mail senden
        </button>
      </form>

      {state?.error && <p className="mt-4 text-center text-sm text-red-600">{state.error}</p>}
      {state?.success && <p className="mt-4 text-center text-sm text-green-600">E-Mail zum Zurücksetzen wurde versendet!</p>}
    </div>
  );
}
