import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import ServicesShowcaseSection from "@/components/ServicesShowcaseSection";
import HomeStructuredData from "@/components/seo/HomeStructuredData";
import { BUSINESS_INFO, SITE_URL } from "@/lib/constants";
import { getHomeChrome } from "@/lib/homeChrome";
import { getTranslations } from "@/lib/locales";
import { resolveRequestLocale } from "@/lib/request-locale";
import { absoluteOgImageUrl } from "@/lib/seo/og";

const phone = BUSINESS_INFO.phoneDisplay;

export const metadata: Metadata = {
  title: "Electrician Chișinău 24/7 | ElectroInstall",
  description: `Electrician autorizat în Chișinău pentru urgențe, prize, tablouri și instalații complete. Sună: ${phone}.`,
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
    title: "Electrician Chișinău 24/7 | ElectroInstall",
    description: `Prize, tablouri, instalații complete și intervenții rapide în Chișinău. Sună la ${phone}.`,
    images: [
      {
        url: absoluteOgImageUrl(),
        width: 1200,
        height: 630,
        alt: `ElectroInstall – electrician Chișinău, ${phone}`,
      },
    ],
  },
  twitter: {
    title: "Electrician Chișinău 24/7 | ElectroInstall",
    description: `Prize, tablouri și intervenții rapide în Chișinău. Sună la ${phone}.`,
    images: [absoluteOgImageUrl()],
  },
};

type HomePageProps = {
  searchParams: Promise<{ lang?: string | string[] }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { lang } = await searchParams;
  const requestedLocale = Array.isArray(lang) ? lang[0] : lang;
  const locale = await resolveRequestLocale(requestedLocale);
  const t = getTranslations(locale);
  const chrome = getHomeChrome(locale);

  return (
    <>
      <HomeStructuredData />
      <HomePageClient
        locale={locale}
        chrome={chrome}
        common={t.common}
        contact={t.contact}
        contactForm={t.contact_form}
        faq={t.faq}
        hero={t.hero}
        nav={t.nav}
        testimonials={t.testimonials}
        featuresSection={<FeaturesSection home={t.home} />}
        servicesSection={<ServicesShowcaseSection services={t.services} />}
        footer={<Footer chrome={chrome} footer={t.footer} nav={t.nav} />}
      />
    </>
  );
}
