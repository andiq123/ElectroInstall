import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Blog",
  description: "Sfaturi și noutăți electrice de la ElectroInstall Chișinău.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-elevated)] border-b border-[var(--border-default)]">
        <div className="container-inner flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center gap-3" aria-label="Acasă">
            <Logo size="sm" showText={true} animated={false} light={false} />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-[15px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              ← Acasă
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center min-h-[40px] px-5 py-2.5 rounded-lg text-[15px] font-semibold text-white bg-[var(--text-primary)] hover:opacity-90 transition-opacity"
            >
              Contactează-ne
            </Link>
          </div>
        </div>
      </header>
      <div className="pt-14 sm:pt-16">{children}</div>
    </>
  );
}
