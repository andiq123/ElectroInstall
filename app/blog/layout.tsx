import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Shared Blog Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]">
        <div className="container px-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="group flex items-center gap-3">
              <Logo size="sm" showText={true} />
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                ← Acasă
              </Link>
              <Link
                href="/#contact"
                className="btn btn-primary text-sm py-2 px-4"
              >
                Contactează-ne
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content with padding for fixed header */}
      <div className="pt-16">{children}</div>
    </>
  );
}
