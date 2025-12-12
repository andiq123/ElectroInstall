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
    "Servicii electrice profesionale în Chișinău, Moldova. Instalare prize, întrerupătoare, candelabre, conectare electrocasnice, montare cablaje. Apelați +373 061110314. Licențiat și asigurat.",
  keywords: [
    "electrician Chișinău",
    "servicii electrice Moldova",
    "ElectroInstall",
    "mester electric",
    "instalare prize",
    "montare candelabre",
    "electrician profesionist",
    "reparații electrice Chișinău",
    "instalații electrice",
    "electrician non-stop",
    "servicii electrice urgente",
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
  areaServed: {
    "@type": "City",
    name: "Chișinău",
  },
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
  priceRange: "$$",
  image: "https://mesterelectric.md/og-image.jpg",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="dark">
      <head>
        <meta name="theme-color" content="#0a0a0b" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans m-0 p-0 antialiased`}>
        <a href="#main-content" className="skip-link">
          Sari la conținut
        </a>
        {children}
      </body>
    </html>
  );
}
