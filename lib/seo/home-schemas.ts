import { SITE_URL } from "@/lib/constants";
import { ro } from "@/lib/locales/ro";
import { absoluteOgImageUrl } from "@/lib/seo/og";

export function webPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "ElectroInstall – Electrician Chișinău",
    description:
      "Electrician Chișinău cu recomandări: servicii electrice, preț corect, intervenții rapide 24/7.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteOgImageUrl(),
    },
    inLanguage: "ro-MD",
  };
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ro.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
