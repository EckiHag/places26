"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/app/actions/authActions";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const passwordValid = password.length >= 6;
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!token) {
      setMessage("Kein gültiger Token gefunden.");
      return;
    }

    if (!passwordValid) {
      setMessage("Passwort muss mindestens 6 Zeichen lang sein.");
      return;
    }

    if (!passwordsMatch) {
      setMessage("Die Passwörter stimmen nicht überein.");
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
          <div className="relative">
            <input
              type="password"
              placeholder="Neues Passwort"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded pr-10 ${password.length === 0 ? "border-gray-300" : passwordValid ? "border-green-500" : "border-red-500"}`}
            />
            {password.length > 0 && <span className="absolute right-2 top-2 text-xl">{passwordValid ? "✔️" : "❌"}</span>}
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Passwort wiederholen"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-2 border rounded pr-10 ${confirmPassword.length === 0 ? "border-gray-300" : passwordsMatch ? "border-green-500" : "border-red-500"}`}
            />
            {confirmPassword.length > 0 && <span className="absolute right-2 top-2 text-xl">{passwordsMatch ? "✔️" : "❌"}</span>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400" disabled={!passwordValid || !passwordsMatch}>
            Passwort speichern
          </button>
        </form>
      )}

      {message && <p className="mt-4 text-sm text-red-600 text-center">{message}</p>}
    </div>
  );
}
