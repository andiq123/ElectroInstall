"use client";

import { Children, type ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { type HomeChromeCopy } from "@/lib/homeChrome";
import type { Locale, Translations } from "@/lib/locales";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import TestimonialsSection from "@/components/TestimonialsSection";

const ContactModal = dynamic(() => import("@/components/ui/ContactModal"), {
  ssr: false,
});

interface HomePageClientProps {
  chrome: HomeChromeCopy;
  common: Translations["common"];
  contact: Translations["contact"];
  contactForm: Translations["contact_form"];
  faq: Translations["faq"];
  featuresSection: ReactNode;
  footer: ReactNode;
  hero: Translations["hero"];
  locale: Locale;
  nav: Translations["nav"];
  servicesSection: ReactNode;
  testimonials: Translations["testimonials"];
}

export default function HomePageClient({
  chrome,
  common,
  contact,
  contactForm,
  faq,
  featuresSection,
  footer,
  hero,
  locale,
  nav,
  servicesSection,
  testimonials,
}: HomePageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const featuresNodes = Children.toArray(featuresSection);
  const servicesNodes = Children.toArray(servicesSection);
  const footerNodes = Children.toArray(footer);

  return (
    <div className="min-h-screen w-full bg-[var(--page-bg)] font-body-ui">
      <Navbar
        chrome={chrome}
        common={common}
        locale={locale}
        nav={nav}
        onOpenModal={() => setIsModalOpen(true)}
      />

      <div className="animate-page-fade">
        <main id="main-content">
          <HeroSection hero={hero} onOpenModal={() => setIsModalOpen(true)} />
          {featuresNodes}
          {servicesNodes}
          <TestimonialsSection chrome={chrome} data={testimonials} />
          <FAQSection faq={faq} />
          <ContactSection
            common={common}
            contact={contact}
            onOpenModal={() => setIsModalOpen(true)}
          />
        </main>
        {footerNodes}
      </div>

      {isModalOpen ? (
        <ContactModal
          chrome={chrome}
          contactForm={contactForm}
          isOpen={isModalOpen}
          locale={locale}
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}
    </div>
  );
}
