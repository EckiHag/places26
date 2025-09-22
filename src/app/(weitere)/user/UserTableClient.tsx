"use client";

import React, { useState, useTransition } from "react";
import { User, UserRole } from "@prisma/client";
import { updateUserRoleAction } from "@/app/actions/userActions";

export default function UserTableClient({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const roles = Object.values(UserRole);

  const onSubmitClient = (id: string, role: UserRole) => {
    startTransition(() => {
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
      setMessage(`Rolle aktualisiert für User ${id} → ${role}`);
      setTimeout(() => setMessage(null), 3000);
    });
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="p-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {users.length} Nutzer{users.length === 1 ? "" : ":innen"} geladen
          {selectedIds.size > 0 && <span className="ml-2">• {selectedIds.size} ausgewählt</span>}
        </div>
        {pending && <div className="text-xs px-2 py-1 rounded bg-gray-100">Speichere…</div>}
      </div>

      {message && (
        <div className="px-4 pb-2">
          <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{message}</div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-y">
            <tr>
              <th className="px-4 py-3 text-left"></th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">E-Mail</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b last:border-b-0 hover:bg-gray-50">
                {/* Auswahl */}
                <td className="px-4 py-2">
                  <input type="checkbox" className="h-4 w-4" checked={selectedIds.has(u.id)} onChange={() => toggleSelect(u.id)} />
                </td>

                {/* Name + ID */}
                <td className="px-4 py-2">
                  <div className="font-medium text-gray-900">{u.name ?? "—"}</div>
                  <div className="text-xs text-gray-500">{u.id}</div>
                </td>

                {/* E-Mail */}
                <td className="px-4 py-2">{u.email ?? "—"}</td>

                {/* Role mit Formular */}
                <td className="px-4 py-2">
                  <form
                    action={async (formData) => {
                      await updateUserRoleAction(formData);
                      const role = formData.get("role") as UserRole;
                      onSubmitClient(u.id, role);
                    }}
                    className="flex items-center gap-2"
                  >
                    <input type="hidden" name="id" value={u.id} />
                    <select name="role" defaultValue={u.role} className="border rounded px-2 py-1">
                      {roles.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className="px-3 py-1 rounded-lg border bg-gray-900 text-white hover:bg-gray-800">
                      Speichern
                    </button>
                  </form>
                </td>

                {/* Created */}
                <td className="px-4 py-2">{u.created ? new Date(u.created).toLocaleString() : "—"}</td>

                {/* Extra Aktionen */}
                <td className="px-4 py-2">
                  <button className="px-3 py-1 rounded-lg border hover:bg-gray-100" onClick={() => alert(JSON.stringify(u, null, 2))} type="button">
                    Details
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                  Keine Nutzer gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 text-xs text-gray-500">Tipp: Mehrfachauswahl ist möglich. Eine Sammelaktion lässt sich leicht ergänzen.</div>
    </div>
  );
}
