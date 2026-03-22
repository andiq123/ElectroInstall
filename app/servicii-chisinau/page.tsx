import { Metadata } from "next";
import ServiciiChisinauClient from "./ServiciiChisinauClient";
import { BUSINESS_INFO, SITE_URL } from "@/lib/constants";
import { absoluteOgImageUrl } from "@/lib/seo/og";

const base = SITE_URL.replace(/\/$/, "");
const serviciiUrl = `${base}/servicii-chisinau`;
const phone = BUSINESS_INFO.phoneDisplay;

export const metadata: Metadata = {
  title: "Electrician Chișinău - Servicii Electrice și Intervenții 24/7",
  description:
    "Servicii de electrician în Chișinău și suburbii. Intervenții rapide, montaj tablouri, prize și instalații electrice. Vezi zonele de acoperire.",
  alternates: {
    canonical: serviciiUrl,
    languages: {
      "ro-MD": serviciiUrl,
      "ru-MD": `${serviciiUrl}?lang=ru`,
      "x-default": serviciiUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_MD",
    alternateLocale: ["ru_MD"],
    url: serviciiUrl,
    siteName: "ElectroInstall",
    title: `Servicii electrice Chișinău - ${phone} | ElectroInstall`,
    description:
      "Electrician în toate sectoarele și suburbiile: instalații, reparații, urgențe 24/7.",
    images: [{ url: absoluteOgImageUrl(), alt: "ElectroInstall – servicii electrice Chișinău" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Servicii electrice Chișinău | ElectroInstall`,
    images: [absoluteOgImageUrl()],
  },
};

export default function ServiciiChisinau() {
  return <ServiciiChisinauClient />;
}
