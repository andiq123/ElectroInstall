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

export const metadata: Metadata = {
  metadataBase: new URL("https://electroinstall.md"),
  title: {
    default: "ElectroInstall | Electrician Profesionist în Chișinău, Moldova",
    template: "%s | ElectroInstall",
  },
  description:
    "ElectroInstall: Servicii electrice profesionale în Chișinău. Electrician autorizat pentru intervenții rapide, montaj tablouri, prize și instalații electrice în toate sectoarele și suburbiile Moldovei. Disponibil 24/7 pentru urgențe.",
  keywords: [
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
    "mester electric",
    "ElectroInstall",
    "servicii electrice Moldova",
    "reparatii prize",
    "montaj lustre Chisinau",
    "электрик Кишинев",
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
    url: "https://electroinstall.md",
    siteName: "ElectroInstall",
    title: "ElectroInstall | Electrician Profesionist în Chișinău",
    description:
      "Servicii electrice profesionale în Chișinău, Moldova. Licențiat, asigurat și disponibil 24/7.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ElectroInstall - Electrician Profesionist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ElectroInstall | Electrician Profesionist în Chișinău",
    description:
      "Servicii electrice profesionale în Chișinău, Moldova. Licențiat, asigurat și disponibil 24/7.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://electroinstall.md",
    languages: {
      'ro-MD': 'https://electroinstall.md',
      'ru-MD': 'https://electroinstall.md?lang=ru',
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

// JSON-LD Structured Data for Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: "ElectroInstall",
  alternateName: "Mester Electric",
  description:
    "Servicii electrice profesionale în Chișinău, Moldova. Instalare prize, întrerupătoare, candelabre, conectare electrocasnice.",
  url: "https://electroinstall.md",
  telephone: "+373061110314",
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
    {
      "@type": "City",
      "name": "Chișinău"
    },
    {
      "@type": "City",
      "name": "Durlești"
    },
    {
      "@type": "City",
      "name": "Ialoveni"
    },
    {
      "@type": "City",
      "name": "Codru"
    }
  ],
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
  priceRange: "MDL",
  image: "https://electroinstall.md/og-image.jpg",
  hasMap: "https://www.google.com/maps?q=Chisinau,Moldova",
  contactPoint: {
    "@type": "ContactPoint",
    "telephone": "+373061110314",
    "contactType": "customer service"
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    "name": "Servicii Electrice",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Intervenții de Urgență",
        "description": "Reparații rapide pentru defecțiuni electrice neașteptate, scurtcircuite și pene de curent."
      },
      {
        "@type": "Service",
        "name": "Montaj Instalații Electrice",
        "description": "Proiectare și execuție instalații electrice complete pentru apartamente, case și spații comerciale."
      },
      {
        "@type": "Service",
        "name": "Instalare Tablouri Electrice",
        "description": "Montaj și modernizare tablouri de distribuție, siguranțe automate și protecții diferențiale."
      },
      {
        "@type": "Service",
        "name": "Montaj Prize și Întrerupătoare",
        "description": "Instalare accesorii electrice, prize, întrerupătoare și variatoare de lumină."
      }
    ]
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
