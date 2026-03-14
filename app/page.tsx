"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
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
  const { locale } = useLanguage();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen w-full bg-white font-[var(--font-body)]">
      <Navbar onOpenModal={openModal} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={locale}
          initial={{ opacity: 0, filter: "blur(8px)", y: 10 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(8px)", y: -10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
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
        </motion.div>
      </AnimatePresence>

      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
