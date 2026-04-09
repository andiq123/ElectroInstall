"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ServicesShowcaseSection from "@/components/ServicesShowcaseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Defer the modal bundle — it's never needed on initial paint
const ContactModal = dynamic(() => import("@/components/ui/ContactModal"), {
  ssr: false,
});

export default function HomePageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { locale } = useLanguage();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen w-full bg-[var(--page-bg)] font-body-ui">
      <Navbar onOpenModal={openModal} />

      <div key={locale} className="animate-page-fade">
        <main id="main-content">
          <HeroSection onOpenModal={openModal} />
          <FeaturesSection />
          <ServicesShowcaseSection />
          <TestimonialsSection />
          <FAQSection />
          <ContactSection onOpenModal={openModal} />
        </main>
        <Footer />
      </div>

      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
