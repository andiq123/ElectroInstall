"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import type { CrmRequest, CrmRequestStatus } from "@/lib/crm/types";
import { homeUi } from "@/lib/homeUi";
import { cn } from "@/lib/utils";
import { firebaseAuth } from "@/lib/firebase/client";
import {
  updateRequest,
  deleteRequest,
  subscribeRequests,
} from "@/lib/firebase/crmRequestsClient";
import styles from "./CrmDashboardClient.module.css";

type StatusFilter = "all" | "new" | "reviewed";

type Session = "pending" | null | User;

type EditDraft = {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: CrmRequestStatus;
};

function CrmTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-auto overscroll-contain">
      <table className="w-full min-w-[760px] border-collapse">
        <thead className="bg-[var(--bg-elevated)] shadow-[inset_0_-1px_0_0_var(--border-default)]">
          <tr className="text-left text-sm text-[var(--text-secondary)]">
            {["Dată", "Nume", "Telefon", "Mesaj", "Email trimis", "Status", "Acțiuni"].map((label) => (
              <th key={label} className="px-6 py-4 font-semibold">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function TableLoadingRow() {
  return (
    <tr className="border-t border-[var(--border-default)]">
      <td colSpan={7} className="px-6 py-10">
        <div className="flex min-h-[120px] flex-col justify-center gap-5">
          <p className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
            <span
              className="inline-block h-4 w-4 shrink-0 rounded-full border-2 border-[var(--accent)] border-t-transparent motion-safe:animate-spin"
              aria-hidden
            />
            Se încarcă cererile…
          </p>
          <div className={cn("flex flex-col gap-2.5", styles.skeletonStack)} aria-hidden>
            <div className={cn("h-2.5 w-full", styles.skeletonBar)} />
            <div className={cn("h-2.5 w-[min(92%,42rem)]", styles.skeletonBar)} />
            <div className={cn("h-2.5 w-[min(72%,30rem)]", styles.skeletonBar)} />
            <div className={cn("h-2.5 w-[min(56%,22rem)]", styles.skeletonBar)} />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default function CrmDashboardClient() {
  const router = useRouter();
  const [session, setSession] = useState<Session>("pending");
  const [requests, setRequests] = useState<CrmRequest[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [mutating, setMutating] = useState(false);
  const [awaitingFirstSnapshot, setAwaitingFirstSnapshot] = useState(false);
  const [emptySettled, setEmptySettled] = useState(false);
  const [subscribeError, setSubscribeError] = useState(false);
  const [toast, setToast] = useState<{ kind: "success" | "error"; message: string } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subscribeDeferRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafEndLoadingRef = useRef<number | null>(null);
  const firstRtdbSnapshotRef = useRef(true);
  const authUnsubCancelledRef = useRef(false);
  const [edit, setEdit] = useState<EditDraft | null>(null);

  const showToast = useCallback((kind: "success" | "error", message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ kind, message });
    toastTimerRef.current = setTimeout(() => setToast(null), 2800);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  function scheduleEndInitialLoad() {
    if (rafEndLoadingRef.current !== null) {
      cancelAnimationFrame(rafEndLoadingRef.current);
      rafEndLoadingRef.current = null;
    }
    const id1 = requestAnimationFrame(() => {
      if (authUnsubCancelledRef.current) return;
      const id2 = requestAnimationFrame(() => {
        rafEndLoadingRef.current = null;
        if (authUnsubCancelledRef.current) return;
        setAwaitingFirstSnapshot(false);
      });
      rafEndLoadingRef.current = id2;
    });
    rafEndLoadingRef.current = id1;
  }

  useLayoutEffect(() => {
    if (!firebaseAuth) return;
    authUnsubCancelledRef.current = false;

    let stopListen: (() => void) | null = null;
    const unsubAuth = onAuthStateChanged(firebaseAuth, (user) => {
      if (subscribeDeferRef.current) {
        clearTimeout(subscribeDeferRef.current);
        subscribeDeferRef.current = null;
      }
      stopListen?.();
      stopListen = null;

      if (rafEndLoadingRef.current !== null) {
        cancelAnimationFrame(rafEndLoadingRef.current);
        rafEndLoadingRef.current = null;
      }

      setSession(user);

      if (!user) {
        firstRtdbSnapshotRef.current = true;
        setRequests([]);
        setEdit(null);
        setAwaitingFirstSnapshot(false);
        setEmptySettled(false);
        setSubscribeError(false);
        router.replace("/crm/login");
        return;
      }

      flushSync(() => {
        setAwaitingFirstSnapshot(true);
      });
      setEmptySettled(false);
      setSubscribeError(false);

      subscribeDeferRef.current = setTimeout(() => {
        subscribeDeferRef.current = null;
        stopListen = subscribeRequests(
          (data) => {
            setRequests(data);
            if (firstRtdbSnapshotRef.current) {
              firstRtdbSnapshotRef.current = false;
              scheduleEndInitialLoad();
            }
          },
          (err) => {
            firstRtdbSnapshotRef.current = true;
            setRequests([]);
            setAwaitingFirstSnapshot(false);
            setSubscribeError(true);
            console.error("[CRM] subscribeRequests failed", { uid: user.uid, err });
            showToast("error", "Nu ai acces la CRM.");
          }
        );
      }, 0);
    });

    return () => {
      authUnsubCancelledRef.current = true;
      if (rafEndLoadingRef.current !== null) {
        cancelAnimationFrame(rafEndLoadingRef.current);
        rafEndLoadingRef.current = null;
      }
      if (subscribeDeferRef.current) {
        clearTimeout(subscribeDeferRef.current);
        subscribeDeferRef.current = null;
      }
      stopListen?.();
      unsubAuth();
    };
  }, [router, showToast]);

  const listReady = session !== "pending" && session !== null && !awaitingFirstSnapshot;

  useEffect(() => {
    if (!listReady || requests.length > 0 || subscribeError) {
      setEmptySettled(false);
      return;
    }
    const id = window.setTimeout(() => setEmptySettled(true), 450);
    return () => clearTimeout(id);
  }, [listReady, requests.length, subscribeError]);

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

  const sessionPending = session === "pending";
  const hasNoRecords =
    listReady && !subscribeError && requests.length === 0 && emptySettled;
  const hasNoMatches = listReady && requests.length > 0 && filtered.length === 0;
  const showListLoading =
    sessionPending ||
    awaitingFirstSnapshot ||
    (listReady && !subscribeError && requests.length === 0 && !emptySettled);

  function resetFilters() {
    setQuery("");
    setFilter("all");
  }

  async function logout() {
    if (firebaseAuth) await signOut(firebaseAuth);
    router.push("/crm/login");
  }

  async function onSaveEdit(e: FormEvent) {
    e.preventDefault();
    if (!edit) return;
    setMutating(true);
    try {
      const { id, ...fields } = edit;
      await updateRequest(id, fields);
      setEdit(null);
      showToast("success", "Salvat.");
    } catch (err) {
      console.error("[CRM] updateRequest failed", { id: edit.id, err });
      showToast("error", "Nu s-a putut salva.");
    } finally {
      setMutating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Ștergi această cerere?")) return;
    setMutating(true);
    try {
      await deleteRequest(id);
      if (edit?.id === id) setEdit(null);
      showToast("success", "Șters.");
    } catch (err) {
      console.error("[CRM] deleteRequest failed", { id, err });
      showToast("error", "Nu s-a putut șterge.");
    } finally {
      setMutating(false);
    }
  }

  if (!firebaseAuth) {
    return (
      <main className={homeUi.pageMain}>
        <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-8">
          <div
            className={cn(
              homeUi.cardSurface,
              "p-6 text-center text-[var(--text-secondary)]"
            )}
          >
            Firebase nu este configurat.
          </div>
        </div>
      </main>
    );
  }

  if (session === null) return null;

  return (
    <main className={homeUi.pageMain}>
      {toast ? (
        <div
          className="fixed top-6 right-6 z-[70] max-w-[min(360px,calc(100vw-3rem))]"
          aria-live="polite"
          aria-atomic="true"
        >
          <div
            role="status"
            className={cn(
              "rounded-2xl border px-4 py-3 text-sm shadow-sm",
              toast.kind === "success"
                ? "border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent-dark)]"
                : "border-[var(--danger-glow)] bg-[var(--danger-glow)]/10 text-[var(--text-primary)]"
            )}
          >
            {toast.message}
          </div>
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="flex flex-col gap-6 py-8">
          <div className={cn(homeUi.cardSurface, "min-h-[188px] p-6")}>
            {sessionPending ? (
              <div>
                <div className={cn("h-7 w-44 max-w-full rounded-lg", styles.skeletonBar)} />
                <div className={cn("mt-3 h-4 w-72 max-w-full rounded-md", styles.skeletonBar)} />
                <div className={cn("mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3", styles.skeletonStack)}>
                  <div className={cn("sm:col-span-2 h-10 rounded-xl", styles.skeletonBar)} />
                  <div className={cn("h-10 rounded-xl", styles.skeletonBar)} />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="font-display text-2xl font-black tracking-tight text-[var(--text-primary)]">
                      Cereri clienți
                    </h1>
                    <p className="mt-1 text-base text-[var(--text-secondary)]">
                      Din formularul de contact de pe site
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    className="rounded-2xl bg-[var(--text-primary)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Ieșire
                  </button>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <label className="input-label">Caută</label>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Nume, telefon sau mesaj..."
                      className="input-field w-full"
                      disabled={hasNoRecords}
                    />
                  </div>
                  <div>
                    <label className="input-label">Status</label>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as StatusFilter)}
                      className="input-field w-full"
                      disabled={hasNoRecords}
                    >
                      <option value="all">Toate</option>
                      <option value="new">Noi</option>
                      <option value="reviewed">Verificate</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={cn(
              homeUi.cardSurface,
              "overflow-hidden"
            )}
          >
            {showListLoading ? (
              <CrmTable>
                <TableLoadingRow />
              </CrmTable>
            ) : listReady && subscribeError ? (
              <div className="px-6 py-12 text-center text-sm text-[var(--text-secondary)]">
                Nu s-au putut încărca cererile. Verifică conexiunea și regulile Firebase.
              </div>
            ) : hasNoRecords ? (
              <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center sm:py-20">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-default)] bg-[var(--bg-section-alt)] text-[var(--text-secondary)]"
                  aria-hidden
                >
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293L8.293 13.293A1 1 0 007.586 13H4"
                    />
                  </svg>
                </div>
                <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">Încă nu ai cereri</h2>
                <p className="max-w-md text-sm text-[var(--text-secondary)] leading-relaxed">
                  Când cineva trimite formularul de contact de pe site, cererea apare aici automat.
                </p>
              </div>
            ) : hasNoMatches ? (
              <div className="flex flex-col items-center justify-center gap-4 px-6 py-14 text-center">
                <p className="text-sm text-[var(--text-secondary)]">Niciun rezultat pentru filtrele tale.</p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-2xl border border-[var(--border-default)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-sm transition-colors hover:border-[var(--accent)]"
                >
                  Resetează căutarea și filtrul
                </button>
              </div>
            ) : (
              <CrmTable>
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-[var(--border-default)] transition-colors duration-200 motion-safe:hover:bg-[var(--bg-section-alt)]/55"
                  >
                    <td className="px-6 py-5 text-sm text-[var(--text-secondary)] whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">
                      {r.name}
                    </td>
                    <td className="px-6 py-5 text-sm text-[var(--text-secondary)] whitespace-nowrap">{r.phone}</td>
                    <td className="px-6 py-5 text-sm text-[var(--text-secondary)]">
                      <div className="max-w-[340px] truncate" title={r.message}>
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
                          onClick={() =>
                            setEdit({
                              id: r.id,
                              name: r.name,
                              phone: r.phone,
                              message: r.message,
                              status: r.status,
                            })
                          }
                          disabled={mutating}
                          className="rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--text-inverted)] shadow-accent-sm transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
                        >
                          Editează
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(r.id)}
                          disabled={mutating}
                          className="rounded-2xl border border-[var(--border-default)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:border-red-400 hover:text-red-500 disabled:pointer-events-none disabled:opacity-50"
                        >
                          Șterge
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </CrmTable>
            )}
          </div>
        </div>
      </div>

      {edit ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crm-edit-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            aria-label="Închide"
            onClick={() => setEdit(null)}
          />
          <form
            onSubmit={onSaveEdit}
            className="relative z-10 w-full max-w-lg rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-lg"
          >
            <h2 id="crm-edit-title" className="font-display text-lg font-bold text-[var(--text-primary)]">
              Editează cererea
            </h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="input-label">Nume</label>
                <input
                  className="input-field w-full"
                  value={edit.name}
                  onChange={(e) => setEdit((d) => (d ? { ...d, name: e.target.value } : d))}
                  required
                />
              </div>
              <div>
                <label className="input-label">Telefon</label>
                <input
                  className="input-field w-full"
                  value={edit.phone}
                  onChange={(e) => setEdit((d) => (d ? { ...d, phone: e.target.value } : d))}
                  required
                />
              </div>
              <div>
                <label className="input-label">Mesaj</label>
                <textarea
                  className="input-field w-full min-h-[100px]"
                  value={edit.message}
                  onChange={(e) => setEdit((d) => (d ? { ...d, message: e.target.value } : d))}
                  rows={4}
                />
              </div>
              <div>
                <label className="input-label">Status</label>
                <select
                  className="input-field w-full"
                  value={edit.status}
                  onChange={(e) =>
                    setEdit((d) =>
                      d ? { ...d, status: e.target.value as CrmRequestStatus } : d
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
                onClick={() => setEdit(null)}
                className="rounded-2xl border border-[var(--border-default)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]"
              >
                Anulează
              </button>
              <button
                type="submit"
                disabled={mutating}
                aria-busy={mutating}
                className="inline-flex min-w-[7.5rem] items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--text-inverted)] disabled:pointer-events-none disabled:opacity-55"
              >
                {mutating ? (
                  <>
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[var(--text-inverted)] border-t-transparent motion-safe:animate-spin"
                      aria-hidden
                    />
                    Salvare…
                  </>
                ) : (
                  "Salvează"
                )}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  );
}
