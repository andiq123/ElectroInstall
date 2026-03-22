import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { SITE_URL } from "@/lib/constants";
import { homeUi } from "@/lib/homeUi";
import { absoluteOgImageUrl } from "@/lib/seo/og";
const blogUrl = `${SITE_URL.replace(/\/$/, "")}/blog`;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Sfaturi despre siguranță electrică, alegerea electricianului și practici corecte — ElectroInstall Chișinău.",
  alternates: { canonical: blogUrl },
  openGraph: {
    type: "website",
    url: blogUrl,
    siteName: "ElectroInstall",
    title: "Blog | ElectroInstall – Electrician Chișinău",
    description:
      "Articole despre electricitate, siguranță acasă și servicii electrice în Chișinău.",
    images: [{ url: absoluteOgImageUrl(), alt: "ElectroInstall" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | ElectroInstall",
    images: [absoluteOgImageUrl()],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className={homeUi.blogHeaderBar}>
        <div className={homeUi.blogHeaderInner}>
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Acasă">
            <Logo size="sm" showText animated={false} light={false} />
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className={`${homeUi.blogNavLink} hidden sm:inline-flex`}>
              ← Acasă
            </Link>
            <Link href="/" className={`${homeUi.blogNavLink} sm:hidden`} aria-label="Acasă">
              ←
            </Link>
            <Link href="/#contact" className={homeUi.pillHeader}>
              Contact
            </Link>
          </div>
        </div>
      </header>
      <div className="pt-14 sm:pt-16">{children}</div>
    </>
  );
}
