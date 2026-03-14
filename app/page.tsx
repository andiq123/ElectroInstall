"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ContactModal } from "@/components/ui";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen w-full bg-white font-[var(--font-body)]">
      <Navbar onOpenModal={openModal} />
      <main id="main-content">
        <HeroSection onOpenModal={openModal} />
        <Reveal className="section-scroll-reveal">
          <FeaturesSection />
        </Reveal>
        <Reveal className="section-scroll-reveal">
          <TestimonialsSection />
        </Reveal>
        <Reveal className="section-scroll-reveal">
          <FAQSection />
        </Reveal>
        <Reveal className="section-scroll-reveal">
          <ContactSection onOpenModal={openModal} />
        </Reveal>
      </main>
      <Footer />
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
