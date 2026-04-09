"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff, Lock } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { firebaseAuth } from "@/lib/firebase/client";
import { signInWithEmailAndPassword } from "firebase/auth";

type Status = "idle" | "submitting" | "error";

// Contrast table (bg #191c1e):
//   zinc-300 #d4d4d8  11.59:1  body text, subtitles
//   zinc-400 #a1a1aa   6.68:1  labels, secondary text  ← minimum for normal text
//   zinc-500 #71717a   3.54:1  decorative only (icons, placeholders)
//   white    #ffffff  17.13:1  headings

export default function CrmLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);
    try {
      if (!firebaseAuth) throw new Error("Firebase not configured.");
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      await firebaseAuth.currentUser?.getIdToken(true);
      router.push("/crm");
    } catch {
      setErrorMessage("Email sau parola incorecta.");
      setStatus("error");
    }
  }

  const busy = status === "submitting";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f1012] px-4">

      {/* ── Ambient glows ───────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12]"
        style={{ background: "radial-gradient(circle, #ffc107 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #ffc107 0%, transparent 70%)" }}
      />

      {/* ── Login card ──────────────────────────────────── */}
      <div className="relative w-full max-w-[400px]">
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#191c1e] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">

          {/* Amber top accent line */}
          <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#ffc107] to-transparent" />

          <div className="px-8 py-9">
            {/* Logo */}
            <Logo size="sm" showText animated={false} light />

            {/* Header */}
            <div className="mt-8 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ffc107]/10 ring-1 ring-[#ffc107]/25">
                <Lock className="h-5 w-5 text-[#ffc107]" aria-hidden />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-white leading-tight">
                  Acces CRM
                </h1>
                {/* zinc-300 = 11.59:1 against #191c1e ✅ */}
                <p className="mt-0.5 text-sm text-zinc-300">
                  Cont admin ElectroInstall
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">

              {/* Email */}
              <div className="space-y-1.5">
                {/* zinc-400 = 6.68:1 ✅ */}
                <label
                  htmlFor="crm-email"
                  className="block text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-400"
                >
                  Email
                </label>
                <input
                  id="crm-email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={busy}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@electroinstall.md"
                  /* text-white = 17:1, placeholder zinc-500 = 3.54:1 (supplementary hint only) */
                  className="w-full rounded-xl border border-white/[0.09] bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-all focus:border-[#ffc107]/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#ffc107]/15 disabled:opacity-50"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="crm-password"
                  className="block text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-400"
                >
                  Parola
                </label>
                <div className="relative">
                  <input
                    id="crm-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    disabled={busy}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/[0.09] bg-white/[0.05] px-4 py-3 pr-11 text-sm text-white placeholder:text-zinc-500 outline-none transition-all focus:border-[#ffc107]/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#ffc107]/15 disabled:opacity-50"
                  />
                  {/* Eye toggle — zinc-400 = 6.68:1 ✅ */}
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc107]/40 rounded"
                    aria-label={showPassword ? "Ascunde parola" : "Arata parola"}
                  >
                    {showPassword
                      ? <EyeOff className="h-4 w-4" aria-hidden />
                      : <Eye className="h-4 w-4" aria-hidden />
                    }
                  </button>
                </div>
              </div>

              {/* Error — red-300 = ~8:1 on dark bg ✅ */}
              {status === "error" && errorMessage && (
                <div
                  role="alert"
                  className="flex items-center gap-2.5 rounded-xl border border-red-400/25 bg-red-500/[0.10] px-4 py-3 text-sm font-medium text-red-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                  {errorMessage}
                </div>
              )}

              {/* Submit — zinc-900 on #ffc107: 13.5:1 ✅ */}
              <button
                type="submit"
                disabled={busy}
                className="relative inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-xl bg-[#ffc107] font-display text-sm font-bold text-zinc-900 shadow-[0_4px_16px_-4px_rgba(255,193,7,0.5)] transition-all hover:bg-[#ffcd38] hover:shadow-[0_4px_20px_-4px_rgba(255,193,7,0.65)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc107] focus-visible:ring-offset-2 focus-visible:ring-offset-[#191c1e]"
              >
                {busy ? (
                  <>
                    <span
                      aria-hidden
                      className="h-4 w-4 rounded-full border-2 border-zinc-900/30 border-t-zinc-900 motion-safe:animate-spin"
                    />
                    Conectare...
                  </>
                ) : (
                  "Conectare"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer — zinc-400 = 7.43:1 against #0f1012 ✅ */}
        <p className="mt-5 text-center text-xs text-zinc-400">
          ElectroInstall CRM &middot; acces restrictionat
        </p>
      </div>
    </div>
  );
}
