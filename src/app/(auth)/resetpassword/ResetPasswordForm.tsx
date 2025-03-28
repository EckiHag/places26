"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/app/actions/authActions";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!token) {
      setMessage("Kein gültiger Token gefunden.");
      return;
    }

    const result = await resetPassword(token, password);

    if (result.success) {
      setSuccess(true);
      setMessage("Passwort wurde erfolgreich zurückgesetzt.");
    } else {
      setMessage(result.error || "Fehler beim Zurücksetzen des Passworts.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-24 p-4">
      <h1 className="text-2xl font-bold mb-4">Neues Passwort setzen</h1>

      {success ? (
        <p className="text-green-600">{message}</p>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <input
            type="password"
            placeholder="Neues Passwort"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Passwort speichern
          </button>
        </form>
      )}

      {message && <p className="mt-4 text-sm text-red-600 text-center">{message}</p>}
    </div>
  );
}
