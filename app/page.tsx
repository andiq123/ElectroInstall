import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import HomeStructuredData from "@/components/seo/HomeStructuredData";
import { BUSINESS_INFO, SITE_URL } from "@/lib/constants";
import { absoluteOgImageUrl } from "@/lib/seo/og";

const phone = BUSINESS_INFO.phoneDisplay;

export const metadata: Metadata = {
  title: `Electrician Chișinău - ${phone} | ElectroInstall`,
  description: `Cauți electrician în Chișinău? Sună la ${phone}. ElectroInstall: servicii electrice rapide, preț corect înainte de lucru, intervenții 24/7. Montaj tablouri, prize, instalații.`,
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ro-MD": SITE_URL,
      "ru-MD": `${SITE_URL}?lang=ru`,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_MD",
    alternateLocale: ["ru_MD"],
    siteName: "ElectroInstall",
    url: SITE_URL,
    title: `Electrician Chișinău - ${phone} | ElectroInstall`,
    description: `Sună la ${phone}. Preț corect, lucrări conform normelor, disponibil 24/7 la urgențe.`,
    images: [{ url: absoluteOgImageUrl(), alt: `ElectroInstall – electrician Chișinău, ${phone}` }],
  },
  twitter: {
    title: `Electrician Chișinău - ${phone} | ElectroInstall`,
    description: `Sună la ${phone}. Electrician Chișinău: preț corect, intervenții rapide, 24/7.`,
    images: [absoluteOgImageUrl()],
  },
};

export default function HomePage() {
  return (
    <>
      <HomeStructuredData />
      <HomePageClient />
    </>
  );
}
