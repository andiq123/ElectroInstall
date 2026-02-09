import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const baseUrl = "https://electro-install.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Electrician Bun Chișinău | Recomandări 2025–2026 | ElectroInstall",
    template: "%s | ElectroInstall",
  },
  description:
    "Electrician Chișinău recomandări: servicii electrice profesionale, autorizat ANRE. Intervenții rapide și urgent 24/7, montaj tablouri, prize, instalații electrice. Toate sectoarele și suburbiile.",
  keywords: [
    "electrician bun Chisinau",
    "electrician Chisinau recomandări",
    "electrician Chisinau 2025",
    "electrician Chisinau 2026",
    "electricieni autorizați ANRE Chisinau",
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
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_MD",
    url: baseUrl,
    siteName: "ElectroInstall",
    title: "Electrician Bun Chișinău | Recomandări | Autorizat ANRE | 24/7",
    description:
      "Electrician Chișinău recomandări: autorizat ANRE, intervenții rapide, disponibil 24/7. Montaj tablouri, prize, instalații electrice în toate sectoarele.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ElectroInstall - Electrician Chișinău recomandări, autorizat ANRE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Electrician Bun Chișinău | Recomandări | Autorizat ANRE | 24/7",
    description:
      "Electrician Chișinău recomandări: autorizat ANRE, intervenții rapide, disponibil 24/7.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "ro-MD": baseUrl,
      "ru-MD": `${baseUrl}?lang=ru`,
    },
  },
  verification: {
    google: "xNzZcxYZ5zE9HRw-TdG46X2aCiOX7bTf-UToItFDHTg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "ElectroInstall",
  alternateName: "Mester Electric",
  description:
    "Electrician Chișinău recomandări: servicii electrice profesionale, autorizat ANRE. Intervenții rapide și disponibil 24/7. Montaj tablouri electrice, prize, instalații electrice în toate sectoarele și suburbiile Chișinăului.",
  url: baseUrl,
  telephone: "+373067596246",
  email: "contact@electroinstall.md",
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
  image: `${baseUrl}/og-image.jpg`,
  hasMap: "https://www.google.com/maps?q=Chisinau,Moldova",
  knowsAbout: ["Instalații electrice", "Reparații electrice", "Tablouri electrice", "Autorizație ANRE"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+373067596246",
    contactType: "customer service",
    areaServed: "MD",
    availableLanguage: ["Romanian", "Russian"],
    hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" },
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
  sameAs: [],
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0b" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans m-0 p-0 antialiased`} suppressHydrationWarning>
        <LanguageProvider>
          <a href="#main-content" className="skip-link">
            Sari la conținut
          </a>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
