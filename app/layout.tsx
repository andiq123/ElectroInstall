import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LanguageProvider } from "@/context/LanguageContext";
import { SITE_URL, BUSINESS_INFO } from "@/lib/constants";
import { absoluteOgImageUrl } from "@/lib/seo/og";
import "./globals.css";

const PHONE_DISPLAY = BUSINESS_INFO.phoneDisplay;

// Display font — only the two weights actually used in the design:
//   font-semibold (600) for nav links / subtitles
//   font-bold/black (700) for headings, CTAs, hero H1
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700"],
});

// Body font — three weights cover all UI text:
//   400 regular prose, 500 medium labels, 600 semibold buttons
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "optional",   // ← "optional": if not cached, skip FOUT entirely
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Electrician Chișinău 24/7 | ElectroInstall",
    template: "%s | ElectroInstall",
  },
  description: `Electrician autorizat în Chișinău pentru urgențe, prize, tablouri și instalații complete. Sună: ${PHONE_DISPLAY}.`,
  keywords: [
    "electrician Chișinău",
    "electrician autorizat Chisinau",
    "instalații electrice Chișinău",
    "electrician urgent 24/7 Chișinău",
    "tablouri electrice Chișinău",
    "ElectroInstall",
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
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "ro_MD",
    alternateLocale: ["ru_MD"],
    url: SITE_URL,
    siteName: "ElectroInstall",
    title: "Electrician Chișinău 24/7 | ElectroInstall",
    description: `Prize, tablouri, instalații complete și intervenții rapide în Chișinău. Sună la ${PHONE_DISPLAY}.`,
    images: [
      {
        url: absoluteOgImageUrl(),
        width: 1200,
        height: 630,
        alt: "ElectroInstall - Electrician Chișinău cu recomandări",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Electrician Chișinău 24/7 | ElectroInstall",
    description: `Prize, tablouri și intervenții rapide în Chișinău. Sună la ${PHONE_DISPLAY}.`,
    images: [absoluteOgImageUrl()],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ro-MD": SITE_URL,
      "ru-MD": `${SITE_URL}?lang=ru`,
      "x-default": SITE_URL,
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
    "Electrician Chișinău cu recomandări: servicii electrice, intervenții rapide 24/7, montaj tablouri, prize și instalații în toate sectoarele și suburbiile.",
  url: SITE_URL,
  logo: absoluteOgImageUrl(),
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
  openingHours: "Mo-Su 00:00-23:59",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  image: absoluteOgImageUrl(),
  hasMap: "https://www.google.com/maps?q=Chisinau,Moldova",
  knowsAbout: [
    "Instalații electrice",
    "Reparații electrice",
    "Tablouri electrice",
    "Electrician autorizat",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+373067596246",
    contactType: "customer service",
    areaServed: "MD",
    availableLanguage: ["Romanian", "Russian"],
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
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
        description:
          "Electrician Chișinău disponibil 24/7 pentru intervenții rapide: scurtcircuite, pene de curent, defecțiuni electrice.",
      },
      {
        "@type": "Service",
        name: "Montaj Instalații Electrice",
        description:
          "Proiectare și execuție instalații electrice complete pentru apartamente, case și spații comerciale.",
      },
      {
        "@type": "Service",
        name: "Instalare Tablouri Electrice",
        description:
          "Montaj și modernizare tablouri de distribuție, siguranțe automate și protecții diferențiale.",
      },
      {
        "@type": "Service",
        name: "Montaj Prize și Întrerupătoare",
        description:
          "Instalare accesorii electrice, prize, întrerupătoare și variatoare de lumină.",
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
  description:
    "Electrician Chișinău cu recomandări: servicii electrice și intervenții rapide 24/7.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: ["ro", "ru"],
  potentialAction: [
    { "@type": "ReadAction", target: `${SITE_URL}/blog` },
    { "@type": "ReadAction", target: `${SITE_URL}/servicii-chisinau` },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://api.emailjs.com" />

        <meta name="theme-color" content="#f8f9fb" />
        <meta name="color-scheme" content="light" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${manrope.variable} font-sans m-0 p-0 antialiased bg-[var(--page-bg)] text-[var(--text-primary)] selection:bg-[var(--accent-light)] selection:text-zinc-900`}
        suppressHydrationWarning
      >
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
