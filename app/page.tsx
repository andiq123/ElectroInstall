"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ContactModal, ScrollReveal } from "@/components/ui";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar onOpenModal={openModal} />
      <main id="main-content" className="min-h-screen bg-[var(--bg-primary)]">
        {/* Hero is always visible immediately */}
        <HeroSection onOpenModal={openModal} />
        
        {/* Other sections reveal on scroll */}
        <ScrollReveal>
          <ServicesSection onOpenModal={openModal} />
        </ScrollReveal>
        
        <ScrollReveal delay={50}>
          <WhyChooseUs />
        </ScrollReveal>
        
        <ScrollReveal delay={50}>
          <ProcessSection />
        </ScrollReveal>
        
        <ScrollReveal delay={50}>
          <FAQSection />
        </ScrollReveal>
        
        <ScrollReveal delay={50}>
          <ContactSection onOpenModal={openModal} />
        </ScrollReveal>
      </main>
      
      <ScrollReveal>
        <div className="bg-[var(--bg-secondary)] border-t border-[var(--border-glass)]">
          <Footer />
        </div>
      </ScrollReveal>

      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
