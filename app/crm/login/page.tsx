"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { Input } from "@/components/ui/Input";
import { homeUi } from "@/lib/homeUi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/lib/firebase/client";

export default function CrmLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      if (!firebaseAuth) {
        setErrorMessage("Firebase not configured.");
        setStatus("error");
        return;
      }

      await signInWithEmailAndPassword(firebaseAuth, email, password);
      await firebaseAuth.currentUser?.getIdToken(true);
      router.push("/crm");
    } catch {
      setErrorMessage("Login failed.");
      setStatus("error");
    }
  }

  return (
    <main className={homeUi.pageMain}>
      <div className="relative mx-auto flex min-h-screen w-full flex-col items-center justify-center px-6">
        <div className="absolute inset-0 opacity-[0.2] electricity-pattern" aria-hidden />
        <div className="relative w-full max-w-md">
          <div className="card-elevated card p-8">
            <div className="flex items-center justify-start gap-3">
              <Logo size="sm" showText animated={false} light={false} />
            </div>
            <h1 className="mt-6 font-display text-2xl font-black tracking-tight text-[var(--text-primary)]">
              CRM
            </h1>
            <p className="mt-2 text-base text-[var(--text-secondary)] leading-relaxed">
              Doar contul admin.
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === "submitting"}
                autoComplete="email"
                placeholder="admin@example.com"
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={status === "submitting"}
                autoComplete="current-password"
                placeholder="••••••••"
              />

              {status === "error" && errorMessage ? (
                <div className="rounded-xl border border-[var(--danger-glow)] bg-[var(--danger-glow)]/10 px-4 py-3 text-sm text-[var(--text-primary)]">
                  {errorMessage}
                </div>
              ) : null}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--accent)] px-6 py-3 text-[var(--text-inverted)] font-semibold shadow-accent-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Se conecteaza..." : "Conectare"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

