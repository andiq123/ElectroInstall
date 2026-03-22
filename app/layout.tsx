import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { SITE_URL, BUSINESS_INFO } from "@/lib/constants";

const PHONE_DISPLAY = BUSINESS_INFO.phoneDisplay;
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Electrician Chișinău - ${PHONE_DISPLAY} | ElectroInstall`,
    template: "%s | ElectroInstall",
  },
  description:
    `Cauți electrician în Chișinău? Sună la ${PHONE_DISPLAY}. ElectroInstall oferă servicii electrice rapide, preț corect, intervenții 24/7. Montaj tablouri, prize, instalații.`,
  keywords: [
    "electrician bun Chisinau",
    "electrician Chisinau recomandări",
    "electrician Chisinau 2025",
    "electrician Chisinau 2026",
    "electrician autorizat Chisinau",
    "electrician Chisinau urgent 24/7",
    "electrician Chisinau",
    "electrician Moldova",
    "servicii electrice Chisinau",
    "reparatii electrice",
    "montaj prize Chisinau",
    "instalare tablouri electrice",
    "electrician Botanica",
    "electrician Buiucani",
    "electrician Riscani",
    "electrician Ciocana",
    "electrician Centru",
    "electrician Durlesti",
    "intervenție rapidă electrician",
    "mester electric",
    "ElectroInstall",
    "servicii electrice Moldova",
    "reparatii prize",
    "montaj lustre Chisinau",
    "электрик Кишинев",
    "электрик Кишинев отзывы",
    "услуги электрика Кишинев",
    "электромонтаж",
    "ремонт электрики",
    "вызов электрика",
    "установка розеток",
    "электрик ботаника",
    "электрик чеканы",
    "электрик рышкановка",
    "электрик буюканы",
  ],
  authors: [{ name: "ElectroInstall" }],
  creator: "ElectroInstall",
  publisher: "ElectroInstall",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_MD",
    url: SITE_URL,
    siteName: "ElectroInstall",
    title: `Electrician Chișinău - ${PHONE_DISPLAY} | ElectroInstall | 24/7`,
    description:
      `Cauți electrician în Chișinău? Sună la ${PHONE_DISPLAY}. Preț corect, intervenții rapide, disponibil 24/7. Montaj tablouri, prize, instalații.`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ElectroInstall - Electrician Chișinău cu recomandări",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Electrician Chișinău - ${PHONE_DISPLAY} | ElectroInstall | 24/7`,
    description:
      `Sună la ${PHONE_DISPLAY}. Electrician Chișinău cu recomandări: preț corect, intervenții rapide, 24/7.`,
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ro-MD": SITE_URL,
      "ru-MD": `${SITE_URL}?lang=ru`,
    },
  },
  verification: {
    google: "qnRuvVmqesuL7Nr4HLlWjbSCngIGRfCRfRUThB6KXAo",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: "ElectroInstall",
  alternateName: "Mester Electric",
  description:
    "Electrician Chișinău cu recomandări: servicii electrice, preț corect, intervenții rapide 24/7. Montaj tablouri, prize, instalații în toate sectoarele și suburbiile.",
  url: SITE_URL,
  telephone: "+373067596246",
  email: "radu@electroinstall.md",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chișinău",
    addressCountry: "MD",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.0105,
    longitude: 28.8638,
  },
  areaServed: [
    { "@type": "City", name: "Chișinău" },
    { "@type": "City", name: "Durlești" },
    { "@type": "City", name: "Ialoveni" },
    { "@type": "City", name: "Codru" },
    { "@type": "City", name: "Trușeni" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  priceRange: "MDL",
  image: `${SITE_URL}/og-image.jpg`,
  hasMap: "https://www.google.com/maps?q=Chisinau,Moldova",
  knowsAbout: ["Instalații electrice", "Reparații electrice", "Tablouri electrice", "Electrician autorizat"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+373067596246",
    contactType: "customer service",
    areaServed: "MD",
    availableLanguage: ["Romanian", "Russian"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicii Electrice",
    itemListElement: [
      {
        "@type": "Service",
        name: "Electrician urgent 24/7 – Intervenții de urgență",
        description: "Electrician Chișinău disponibil 24/7 pentru intervenții rapide: scurtcircuite, pene de curent, defecțiuni electrice.",
      },
      {
        "@type": "Service",
        name: "Montaj Instalații Electrice",
        description: "Proiectare și execuție instalații electrice complete pentru apartamente, case și spații comerciale.",
      },
      {
        "@type": "Service",
        name: "Instalare Tablouri Electrice",
        description: "Montaj și modernizare tablouri de distribuție, siguranțe automate și protecții diferențiale.",
      },
      {
        "@type": "Service",
        name: "Montaj Prize și Întrerupătoare",
        description: "Instalare accesorii electrice, prize, întrerupătoare și variatoare de lumină.",
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "ElectroInstall – Electrician Chișinău",
  description: "Electrician Chișinău cu recomandări: servicii electrice, preț corect, intervenții rapide 24/7.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["ro", "ru"],
  potentialAction: {
    "@type": "ReadAction",
    target: [{ "@type": "EntryPoint", url: `${SITE_URL}/blog` }],
  },
};

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#f8f9fb" />
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${manrope.variable} font-sans m-0 p-0 antialiased bg-[var(--page-bg)] text-[var(--text-primary)] selection:bg-[var(--accent-light)] selection:text-zinc-900`} suppressHydrationWarning>
        <LanguageProvider>
          <a href="#main-content" className="skip-link">
            Sari la conținut
          </a>
          {children}
          <Analytics />
          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}
