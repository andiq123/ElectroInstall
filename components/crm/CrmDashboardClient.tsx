"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { flushSync } from "react-dom";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  Inbox,
  LogOut,
  Mail,
  Pencil,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import type { CrmRequest, CrmRequestStatus } from "@/lib/crm/types";
import { cn } from "@/lib/utils";
import { firebaseAuth } from "@/lib/firebase/client";
import {
  updateRequest,
  deleteRequest,
  subscribeRequests,
} from "@/lib/firebase/crmRequestsClient";
import styles from "./CrmDashboardClient.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type StatusFilter = "all" | "new" | "reviewed";
type Session = "pending" | null | User;
type EditDraft = {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: CrmRequestStatus;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const LOCALE_FLAG: Record<string, string> = { ro: "🇷🇴", ru: "🇷🇺" };

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRows() {
  return (
    <>
      {[100, 85, 70, 90, 60].map((w, i) => (
        <tr key={i} className={styles.skeletonRow}>
          <td className="px-5 py-4" style={{ animationDelay: `${i * 60}ms` }}>
            <div className={cn(styles.skeletonCell, "h-3.5 w-20")} />
          </td>
          <td className="px-5 py-4">
            <div className={cn(styles.skeletonCell, "h-3.5")} style={{ width: `${w * 0.7}px` }} />
          </td>
          <td className="px-5 py-4">
            <div className={cn(styles.skeletonCell, "h-3.5 w-28")} />
          </td>
          <td className="px-5 py-4">
            <div className={cn(styles.skeletonCell, "h-3.5")} style={{ width: `${w * 1.6}px`, maxWidth: "260px" }} />
          </td>
          <td className="px-5 py-4">
            <div className={cn(styles.skeletonCell, "h-5 w-16 rounded-full")} />
          </td>
          <td className="px-5 py-4">
            <div className="flex gap-2">
              <div className={cn(styles.skeletonCell, "h-8 w-8 rounded-lg")} />
              <div className={cn(styles.skeletonCell, "h-8 w-8 rounded-lg")} />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  accent,
  loading,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  accent?: boolean;
  loading?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border px-5 py-4",
        accent
          ? "border-[#ffc107]/30 bg-[#ffc107]/[0.06]"
          : "border-white/[0.06] bg-white/[0.03]"
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          accent ? "bg-[#ffc107]/15 text-[#ffc107]" : "bg-white/[0.06] text-zinc-400"
        )}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
          {label}
        </p>
        {loading ? (
          <div className={cn(styles.skeletonCell, "mt-1 h-6 w-10 rounded-md")} />
        ) : (
          <p
            className={cn(
              "mt-0.5 font-display text-2xl font-black leading-none",
              accent ? "text-[#ffc107]" : "text-white"
            )}
          >
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Edit field ───────────────────────────────────────────────────────────────

function EditField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-bold uppercase tracking-[0.13em] text-zinc-400">
        {label}
      </p>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 outline-none transition-all focus:border-[#ffc107]/40 focus:ring-2 focus:ring-[#ffc107]/15 disabled:opacity-50";

// ─── Main component ───────────────────────────────────────────────────────────

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
  const [edit, setEdit] = useState<EditDraft | null>(null);
  const [showEditPassword, setShowEditPassword] = useState(false);

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subscribeDeferRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafEndLoadingRef = useRef<number | null>(null);
  const firstRtdbSnapshotRef = useRef(true);
  const authUnsubCancelledRef = useRef(false);

  // ── Toast ────────────────────────────────────────────────────────────────────
  const showToast = useCallback((kind: "success" | "error", message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ kind, message });
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  useEffect(() => () => { if (toastTimerRef.current) clearTimeout(toastTimerRef.current); }, []);

  // ── Auth + realtime subscription ─────────────────────────────────────────────
  function scheduleEndInitialLoad() {
    if (rafEndLoadingRef.current !== null) {
      cancelAnimationFrame(rafEndLoadingRef.current);
    }
    const id1 = requestAnimationFrame(() => {
      if (authUnsubCancelledRef.current) return;
      const id2 = requestAnimationFrame(() => {
        rafEndLoadingRef.current = null;
        if (!authUnsubCancelledRef.current) setAwaitingFirstSnapshot(false);
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
      if (subscribeDeferRef.current) { clearTimeout(subscribeDeferRef.current); subscribeDeferRef.current = null; }
      stopListen?.();
      stopListen = null;
      if (rafEndLoadingRef.current !== null) { cancelAnimationFrame(rafEndLoadingRef.current); rafEndLoadingRef.current = null; }

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

      flushSync(() => { setAwaitingFirstSnapshot(true); });
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
            console.error("[CRM] subscribeRequests failed", err);
            showToast("error", "Nu ai acces la date.");
          }
        );
      }, 0);
    });

    return () => {
      authUnsubCancelledRef.current = true;
      if (rafEndLoadingRef.current !== null) cancelAnimationFrame(rafEndLoadingRef.current);
      if (subscribeDeferRef.current) { clearTimeout(subscribeDeferRef.current); subscribeDeferRef.current = null; }
      stopListen?.();
      unsubAuth();
    };
  }, [router, showToast]);

  // ── Derived state ─────────────────────────────────────────────────────────────
  const listReady = session !== "pending" && session !== null && !awaitingFirstSnapshot;

  useEffect(() => {
    if (!listReady || requests.length > 0 || subscribeError) { setEmptySettled(false); return; }
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

  const newCount = useMemo(() => requests.filter((r) => r.status === "new").length, [requests]);
  const reviewedCount = useMemo(() => requests.filter((r) => r.status === "reviewed").length, [requests]);

  const sessionPending = session === "pending";
  const showLoading = sessionPending || awaitingFirstSnapshot ||
    (listReady && !subscribeError && requests.length === 0 && !emptySettled);
  const hasNoRecords = listReady && !subscribeError && requests.length === 0 && emptySettled;
  const hasNoMatches = listReady && requests.length > 0 && filtered.length === 0;

  // ── Actions ───────────────────────────────────────────────────────────────────
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
      showToast("success", "Cerere actualizata.");
    } catch (err) {
      console.error("[CRM] updateRequest failed", err);
      showToast("error", "Nu s-a putut salva.");
    } finally {
      setMutating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Stergi aceasta cerere?")) return;
    setMutating(true);
    try {
      await deleteRequest(id);
      if (edit?.id === id) setEdit(null);
      showToast("success", "Cerere stearsa.");
    } catch (err) {
      console.error("[CRM] deleteRequest failed", err);
      showToast("error", "Nu s-a putut sterge.");
    } finally {
      setMutating(false);
    }
  }

  // ── Firebase not configured ───────────────────────────────────────────────────
  if (!firebaseAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f1012] px-6">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-6 py-5 text-sm text-zinc-400">
          Firebase nu este configurat.
        </div>
      </div>
    );
  }

  if (session === null) return null;

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0f1012] font-body-ui text-white">

      {/* ── Toast ──────────────────────────────────────────────────────────────── */}
      {toast && (
        <div
          className="fixed right-5 top-5 z-[200]"
          aria-live="polite"
          aria-atomic="true"
        >
          <div
            role="status"
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-2xl backdrop-blur-sm",
              toast.kind === "success"
                ? "border-[#ffc107]/30 bg-[#ffc107]/10 text-[#ffc107]"
                : "border-red-500/20 bg-red-500/10 text-red-400"
            )}
          >
            {toast.kind === "success"
              ? <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
              : <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
            }
            {toast.message}
            <button
              onClick={() => setToast(null)}
              className="ml-1 opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Inchide"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
        </div>
      )}

      {/* ── Top nav bar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0f1012]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ffc107]">
              <span className="font-display text-xs font-black text-zinc-900">E</span>
            </div>
            <span className="font-display text-sm font-bold text-white">CRM</span>
            <span className="hidden text-zinc-400 sm:inline">/</span>
            <span className="hidden text-sm text-zinc-400 sm:inline">Cereri</span>
          </div>

          {!sessionPending && session && (
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-zinc-400 sm:block truncate max-w-[200px]">
                {(session as User).email}
              </span>
              <button
                type="button"
                onClick={logout}
                className="flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 text-xs font-semibold text-zinc-400 transition-all hover:border-white/[0.14] hover:text-white"
              >
                <LogOut className="h-3.5 w-3.5" aria-hidden />
                <span className="hidden sm:inline">Iesire</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ── Page body ───────────────────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl px-5 py-7 sm:px-6">

        {/* ── Stat cards ────────────────────────────────────────────────────────── */}
        <div className="mb-7 grid grid-cols-3 gap-3 sm:gap-4">
          <StatCard
            label="Total"
            value={requests.length}
            icon={Users}
            loading={showLoading}
          />
          <StatCard
            label="Noi"
            value={newCount}
            icon={Circle}
            accent
            loading={showLoading}
          />
          <StatCard
            label="Verificate"
            value={reviewedCount}
            icon={CheckCircle2}
            loading={showLoading}
          />
        </div>

        {/* ── Toolbar ───────────────────────────────────────────────────────────── */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          {/* Search */}
          <div className="relative w-full max-w-sm">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cauta dupa nume, telefon, mesaj..."
              disabled={hasNoRecords}
              className="h-9 w-full rounded-lg border border-white/[0.08] bg-white/[0.04] pl-9 pr-8 text-sm text-white placeholder:text-zinc-500 outline-none transition-all focus:border-[#ffc107]/40 focus:ring-2 focus:ring-[#ffc107]/12 disabled:opacity-40"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Sterge cautarea"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div
            role="tablist"
            aria-label="Filtru status"
            className="flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.03] p-1"
          >
            {(["all", "new", "reviewed"] as const).map((f) => (
              <button
                key={f}
                role="tab"
                type="button"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "h-7 rounded-md px-3 text-xs font-semibold transition-all",
                  filter === f
                    ? "bg-[#ffc107] text-zinc-900 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                )}
              >
                {f === "all" ? "Toate" : f === "new" ? "Noi" : "Verificate"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Table card ────────────────────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#141618]">

          {subscribeError ? (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <AlertCircle className="h-10 w-10 text-red-500/60" aria-hidden />
              <p className="text-sm text-zinc-400">
                Nu s-au putut incarca datele. Verifica regulile Firebase.
              </p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden />
                Reincarca
              </button>
            </div>
          ) : hasNoRecords ? (
            <div className="flex flex-col items-center gap-3 px-6 py-20 text-center">
              <Inbox className="h-12 w-12 text-zinc-700" aria-hidden />
              <h2 className="font-display text-base font-bold text-zinc-400">
                Nicio cerere inca
              </h2>
              <p className="max-w-xs text-sm text-zinc-400 leading-relaxed">
                Cand cineva trimite formularul de pe site, cererea apare aici automat.
              </p>
            </div>
          ) : hasNoMatches ? (
            <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
              <Search className="h-10 w-10 text-zinc-700" aria-hidden />
              <p className="text-sm text-zinc-400">Niciun rezultat pentru filtrele curente.</p>
              <button
                type="button"
                onClick={() => { setQuery(""); setFilter("all"); }}
                className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                Reseteaza filtrele
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto overscroll-x-contain">
              <table className="w-full min-w-[680px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Data", "Nume", "Telefon", "Mesaj", "Status", "Actiuni"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-400"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {showLoading ? (
                    <SkeletonRows />
                  ) : (
                    filtered.map((r) => (
                      <tr
                        key={r.id}
                        className="group transition-colors hover:bg-white/[0.025]"
                      >
                        {/* Date */}
                        <td className="whitespace-nowrap px-5 py-4">
                          <p className="text-xs font-semibold text-zinc-300">{formatDate(r.createdAt)}</p>
                          <p className="mt-0.5 text-[11px] text-zinc-400">{formatTime(r.createdAt)}</p>
                        </td>

                        {/* Name + locale */}
                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] font-display text-xs font-bold text-zinc-300">
                              {r.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-white">{r.name}</p>
                              <p className="text-[11px] text-zinc-400">
                                {LOCALE_FLAG[r.locale] ?? ""} {r.locale.toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="whitespace-nowrap px-5 py-4">
                          <a
                            href={`tel:${r.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-[#ffc107]"
                          >
                            <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
                            {r.phone}
                          </a>
                        </td>

                        {/* Message */}
                        <td className="px-5 py-4">
                          <div className="flex items-start gap-2">
                            {r.emailSent && (
                              <Mail
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400"
                                aria-label="Email trimis"
                              />
                            )}
                            <span
                              className="block max-w-[260px] truncate text-zinc-400"
                              title={r.message}
                            >
                              {r.message}
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="whitespace-nowrap px-5 py-4">
                          {r.status === "new" ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ffc107]/30 bg-[#ffc107]/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#ffc107]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#ffc107]" aria-hidden />
                              Nou
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-zinc-300">
                              <CheckCircle2 className="h-3 w-3" aria-hidden />
                              Verificat
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              title="Editeaza"
                              aria-label={`Editeaza cererea lui ${r.name}`}
                              onClick={() => setEdit({ id: r.id, name: r.name, phone: r.phone, message: r.message, status: r.status })}
                              disabled={mutating}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400 transition-all hover:border-[#ffc107]/40 hover:bg-[#ffc107]/10 hover:text-[#ffc107] disabled:pointer-events-none disabled:opacity-40"
                            >
                              <Pencil className="h-3.5 w-3.5" aria-hidden />
                            </button>
                            <button
                              type="button"
                              title="Sterge"
                              aria-label={`Sterge cererea lui ${r.name}`}
                              onClick={() => handleDelete(r.id)}
                              disabled={mutating}
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400 transition-all hover:border-red-500/30 hover:bg-red-500/[0.08] hover:text-red-400 disabled:pointer-events-none disabled:opacity-40"
                            >
                              <Trash2 className="h-3.5 w-3.5" aria-hidden />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Row count footer */}
          {!showLoading && !hasNoRecords && !subscribeError && filtered.length > 0 && (
            <div className="border-t border-white/[0.04] px-5 py-3">
              <p className="text-[11px] text-zinc-400">
                {filtered.length} {filtered.length === 1 ? "cerere" : "cereri"} afisate
                {filter !== "all" || query ? ` din ${requests.length} total` : ""}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* ── Edit modal ──────────────────────────────────────────────────────────── */}
      {edit && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crm-edit-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setEdit(null)}
            aria-hidden
          />

          {/* Panel */}
          <form
            onSubmit={onSaveEdit}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-2xl border border-white/[0.07] bg-[#191c1e] sm:rounded-2xl"
          >
            {/* Amber top line */}
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#ffc107] to-transparent" />

            <div className="px-6 py-6">
              <div className="mb-6 flex items-center justify-between">
                <h2
                  id="crm-edit-title"
                  className="font-display text-base font-bold text-white"
                >
                  Editeaza cererea
                </h2>
                <button
                  type="button"
                  onClick={() => setEdit(null)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 hover:text-white transition-colors"
                  aria-label="Inchide"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <EditField label="Nume">
                  <input
                    className={inputCls}
                    value={edit.name}
                    onChange={(e) => setEdit((d) => d ? { ...d, name: e.target.value } : d)}
                    required
                    disabled={mutating}
                    placeholder="Ion Popescu"
                  />
                </EditField>

                <EditField label="Telefon">
                  <input
                    className={inputCls}
                    value={edit.phone}
                    onChange={(e) => setEdit((d) => d ? { ...d, phone: e.target.value } : d)}
                    required
                    disabled={mutating}
                    placeholder="+373 069 000 000"
                  />
                </EditField>

                <EditField label="Status">
                  <select
                    className={cn(inputCls, "cursor-pointer")}
                    value={edit.status}
                    onChange={(e) => setEdit((d) => d ? { ...d, status: e.target.value as CrmRequestStatus } : d)}
                    disabled={mutating}
                  >
                    <option value="new">Nou</option>
                    <option value="reviewed">Verificat</option>
                  </select>
                </EditField>
              </div>

              <div className="mt-4">
                <EditField label="Mesaj">
                  <textarea
                    className={cn(inputCls, "min-h-[90px] resize-y")}
                    value={edit.message}
                    onChange={(e) => setEdit((d) => d ? { ...d, message: e.target.value } : d)}
                    rows={3}
                    disabled={mutating}
                  />
                </EditField>
              </div>

              <div className="mt-6 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEdit(null)}
                  disabled={mutating}
                  className="h-9 rounded-lg border border-white/[0.08] px-4 text-sm font-semibold text-zinc-400 transition-colors hover:text-white disabled:opacity-50"
                >
                  Anuleaza
                </button>
                <button
                  type="submit"
                  disabled={mutating}
                  aria-busy={mutating}
                  className="inline-flex h-9 min-w-[110px] items-center justify-center gap-2 rounded-lg bg-[#ffc107] px-5 font-display text-sm font-bold text-zinc-900 shadow-[0_2px_12px_-4px_rgba(255,193,7,0.5)] transition-all hover:bg-[#ffcd38] disabled:pointer-events-none disabled:opacity-60"
                >
                  {mutating ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 motion-safe:animate-spin" aria-hidden />
                      Salvare...
                    </>
                  ) : "Salveaza"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
