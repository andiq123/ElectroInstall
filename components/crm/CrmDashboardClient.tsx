"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { CrmRequest, CrmRequestStatus } from "@/lib/crm/types";
import { homeUi } from "@/lib/homeUi";
import { cn } from "@/lib/utils";
import { firebaseAuth } from "@/lib/firebase/client";
import {
  listRequests,
  updateRequest,
  deleteRequest,
  debugGetCrmAdminFlags,
} from "@/lib/firebase/crmRequestsClient";

type StatusFilter = "all" | "new" | "reviewed";

type EditFields = {
  name: string;
  phone: string;
  message: string;
  status: CrmRequestStatus;
};

function serializeUnknownError(err: unknown) {
  if (err instanceof Error) {
    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
  }

  if (typeof err === "object" && err !== null) {
    const maybe = err as Record<string, unknown>;
    return {
      message: typeof maybe.message === "string" ? maybe.message : undefined,
      code: typeof maybe.code === "string" ? maybe.code : undefined,
      serverCode:
        typeof maybe.serverCode === "string" ? maybe.serverCode : undefined,
      stack: typeof maybe.stack === "string" ? maybe.stack : undefined,
      raw: err,
    };
  }

  return { raw: err };
}

export default function CrmDashboardClient() {
  const router = useRouter();
  const [requests, setRequests] = useState<CrmRequest[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<CrmRequest | null>(null);
  const [editFields, setEditFields] = useState<EditFields | null>(null);

  useEffect(() => {
    if (!firebaseAuth) {
      setError("Firebase nu este configurat.");
      return;
    }
    let mounted = true;
    const unsub = onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) return;
      const uid = user.uid;
      listRequests()
        .then((data) => {
          if (mounted) {
            setRequests(data);
            setError(null);
          }
        })
        .catch((err) => {
          if (mounted) {
            setRequests([]);
            console.error("[CRM] loadRequests failed", {
              uid,
              error: serializeUnknownError(err),
            });
            debugGetCrmAdminFlags(uid)
              .then((flags) => {
                console.error("[CRM] admin flags", flags);
              })
              .catch((flagsErr) => {
                console.error("[CRM] reading admin flags failed", {
                  uid,
                  error: serializeUnknownError(flagsErr),
                });
              });
            setError("Nu ai acces la CRM.");
          }
        });
    });
    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  useEffect(() => {
    if (!editing) {
      setEditFields(null);
      return;
    }
    setEditFields({
      name: editing.name,
      phone: editing.phone,
      message: editing.message,
      status: editing.status,
    });
  }, [editing]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return requests.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.message.toLowerCase().includes(q)
      );
    });
  }, [requests, filter, query]);

  async function reload() {
    setLoading(true);
    setError(null);
    try {
      setRequests(await listRequests());
    } catch (err) {
      console.error("[CRM] reload failed", { error: serializeUnknownError(err) });
      setError("Nu s-au putut încărca cererile.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    if (firebaseAuth) await signOut(firebaseAuth);
    router.push("/crm/login");
  }

  async function onSaveEdit(e: FormEvent) {
    e.preventDefault();
    if (!editing || !editFields) return;
    setLoading(true);
    setError(null);
    try {
      await updateRequest(editing.id, editFields);
      setRequests((prev) =>
        prev.map((r) =>
          r.id === editing.id
            ? {
                ...r,
                ...editFields,
                reviewedAt:
                  editFields.status === "reviewed"
                    ? new Date().toISOString()
                    : undefined,
              }
            : r
        )
      );
      setEditing(null);
    } catch (err) {
      console.error("[CRM] updateRequest failed", {
        id: editing.id,
        fields: editFields,
        error: serializeUnknownError(err),
      });
      setError("Nu s-a putut salva.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Ștergi această cerere?")) return;
    setLoading(true);
    try {
      await deleteRequest(id);
      setRequests((prev) => prev.filter((r) => r.id !== id));
      if (editing?.id === id) setEditing(null);
    } catch (err) {
      console.error("[CRM] deleteRequest failed", {
        id,
        error: serializeUnknownError(err),
      });
      setError("Nu s-a putut șterge.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={homeUi.pageMain}>
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col gap-6 py-8">
          <div className={cn(homeUi.cardSurface, "p-6")}>
            {error ? (
              <div className="mb-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-section-alt)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                {error}
              </div>
            ) : null}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-display text-2xl font-black tracking-tight text-[var(--text-primary)]">
                  Cereri clienți
                </h1>
                <p className="mt-1 text-base text-[var(--text-secondary)]">
                  Din formularul de contact de pe site
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={reload}
                  disabled={loading}
                  className="rounded-2xl border border-[var(--border-default)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-colors hover:border-[var(--accent)] disabled:opacity-50"
                >
                  {loading ? "Se încarcă..." : "Actualizează"}
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-2xl bg-[var(--text-primary)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Ieșire
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="input-label">Caută</label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Nume, telefon sau mesaj..."
                  className="input-field w-full"
                />
              </div>
              <div>
                <label className="input-label">Status</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as StatusFilter)}
                  className="input-field w-full"
                >
                  <option value="all">Toate</option>
                  <option value="new">Noi</option>
                  <option value="reviewed">Verificate</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-default)] bg-white shadow-sm overflow-hidden">
            <div className="overflow-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead className="bg-[var(--bg-elevated)]">
                  <tr className="text-left text-sm text-[var(--text-secondary)]">
                    <th className="px-6 py-4 font-semibold">Dată</th>
                    <th className="px-6 py-4 font-semibold">Nume</th>
                    <th className="px-6 py-4 font-semibold">Telefon</th>
                    <th className="px-6 py-4 font-semibold">Mesaj</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-10 text-center text-[var(--text-secondary)]"
                      >
                        Nicio cerere.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((r) => (
                      <tr
                        key={r.id}
                        className="border-t border-[var(--border-default)]"
                      >
                        <td className="px-6 py-5 text-sm text-[var(--text-secondary)] whitespace-nowrap">
                          {new Date(r.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-5 text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">
                          {r.name}
                        </td>
                        <td className="px-6 py-5 text-sm text-[var(--text-secondary)] whitespace-nowrap">
                          {r.phone}
                        </td>
                        <td className="px-6 py-5 text-sm text-[var(--text-secondary)]">
                          <div
                            className="max-w-[340px] truncate"
                            title={r.message}
                          >
                            {r.message}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-[var(--text-secondary)] whitespace-nowrap">
                          {r.emailSent ? "Da" : "Nu"}
                        </td>
                        <td className="px-6 py-5 text-sm whitespace-nowrap">
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-3 py-1 font-semibold text-xs border",
                              r.status === "new"
                                ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent-dark)]"
                                : "border-[var(--border-default)] bg-[var(--bg-section-alt)] text-[var(--text-secondary)]"
                            )}
                          >
                            {r.status === "new" ? "Nou" : "Verificat"}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setEditing(r)}
                              disabled={loading}
                              className="rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--text-inverted)] shadow-accent-sm transition-opacity hover:opacity-90 disabled:opacity-50"
                            >
                              Editează
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(r.id)}
                              disabled={loading}
                              className="rounded-2xl border border-[var(--border-default)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:border-red-400 hover:text-red-500 disabled:opacity-50"
                            >
                              Șterge
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {editing && editFields ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crm-edit-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Închide"
            onClick={() => setEditing(null)}
          />
          <form
            onSubmit={onSaveEdit}
            className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-lg"
          >
            <h2
              id="crm-edit-title"
              className="font-display text-lg font-bold text-[var(--text-primary)]"
            >
              Editează cererea
            </h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="input-label">Nume</label>
                <input
                  className="input-field w-full"
                  value={editFields.name}
                  onChange={(e) =>
                    setEditFields((f) =>
                      f ? { ...f, name: e.target.value } : f
                    )
                  }
                  required
                />
              </div>
              <div>
                <label className="input-label">Telefon</label>
                <input
                  className="input-field w-full"
                  value={editFields.phone}
                  onChange={(e) =>
                    setEditFields((f) =>
                      f ? { ...f, phone: e.target.value } : f
                    )
                  }
                  required
                />
              </div>
              <div>
                <label className="input-label">Mesaj</label>
                <textarea
                  className="input-field w-full min-h-[100px]"
                  value={editFields.message}
                  onChange={(e) =>
                    setEditFields((f) =>
                      f ? { ...f, message: e.target.value } : f
                    )
                  }
                  rows={4}
                />
              </div>
              <div>
                <label className="input-label">Status</label>
                <select
                  className="input-field w-full"
                  value={editFields.status}
                  onChange={(e) =>
                    setEditFields((f) =>
                      f
                        ? {
                            ...f,
                            status: e.target.value as CrmRequestStatus,
                          }
                        : f
                    )
                  }
                >
                  <option value="new">Nou</option>
                  <option value="reviewed">Verificat</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-2xl border border-[var(--border-default)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]"
              >
                Anulează
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--text-inverted)] disabled:opacity-50"
              >
                Salvează
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  );
}
