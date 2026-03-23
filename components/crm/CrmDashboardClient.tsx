"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CrmRequest } from "@/lib/crm/types";
import { homeUi } from "@/lib/homeUi";
import { cn } from "@/lib/utils";
import { firebaseAuth } from "@/lib/firebase/client";
import { signOut } from "firebase/auth";
import {
  listCrmRequestsFromRtdb,
  updateCrmRequestStatusInRtdb,
} from "@/lib/firebase/crmRequestsClient";

type StatusFilter = "all" | "new" | "reviewed";

export default function CrmDashboardClient() {
  const router = useRouter();
  const [requests, setRequests] = useState<CrmRequest[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!firebaseAuth) {
        setError("Firebase not configured.");
        return;
      }
      try {
        const data = await listCrmRequestsFromRtdb(200);
        if (mounted) setRequests(data);
      } catch {
        if (mounted) setError("No access to CRM data.");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

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

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const data = await listCrmRequestsFromRtdb(200);
      setRequests(data);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    if (!firebaseAuth) {
      router.push("/crm/login");
      return;
    }
    await signOut(firebaseAuth);
    router.push("/crm/login");
  }

  async function markReviewed(id: string) {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateCrmRequestStatusInRtdb(id, "reviewed");
      setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch {
      setError("Could not update request.");
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
                  CRM
                </h1>
                <p className="mt-1 text-base text-[var(--text-secondary)]">
                  Cereri de la clienți (email + stocare în CRM).
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={refresh}
                  className="rounded-2xl border border-[var(--border-default)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-colors hover:border-[var(--accent)]"
                  disabled={loading}
                >
                  {loading ? "Actualizez..." : "Actualizează"}
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-2xl bg-[var(--text-primary)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Logout
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

          <div className={cn("rounded-2xl border border-[var(--border-default)] bg-white shadow-sm overflow-hidden")}>
            <div className="overflow-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead className="bg-[var(--bg-elevated)]">
                  <tr className="text-left text-sm text-[var(--text-secondary)]">
                    <th className="px-6 py-4 font-semibold">Dată</th>
                    <th className="px-6 py-4 font-semibold">Nume</th>
                    <th className="px-6 py-4 font-semibold">Telefon</th>
                    <th className="px-6 py-4 font-semibold">Mesaj</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Acțiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-[var(--text-secondary)]">
                        Nimic de afișat.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((r) => (
                      <tr key={r.id} className="border-t border-[var(--border-default)]">
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
                          <div className="max-w-[340px] truncate" title={r.message}>
                            {r.message}
                          </div>
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
                            {r.status === "new" ? "Nou" : "Verificată"}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          {r.status === "new" ? (
                            <button
                              type="button"
                              onClick={() => markReviewed(r.id)}
                              className="rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--text-inverted)] shadow-accent-sm transition-opacity hover:opacity-90"
                            >
                              Marchez
                            </button>
                          ) : (
                            <span className="text-sm text-[var(--text-secondary)]">—</span>
                          )}
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
    </main>
  );
}

