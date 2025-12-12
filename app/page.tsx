"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LightBulb from "@/components/LightBulb";
import { ContactModal } from "@/components/ui";

// Hook to add scroll reveal to sections
function useSectionReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("revealed");
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// Wrapper component for scroll reveal sections
function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add("revealed");
          }, delay);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="section-scroll-reveal">
      {children}
    </div>
  );
}

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
        <RevealSection>
          <ServicesSection />
        </RevealSection>
        
        <RevealSection delay={50}>
          <WhyChooseUs />
        </RevealSection>
        
        <RevealSection delay={50}>
          <ProcessSection />
        </RevealSection>
        
        <RevealSection delay={50}>
          <FAQSection />
        </RevealSection>
        
        <RevealSection delay={50}>
          <ContactSection />
        </RevealSection>
      </main>
      
      <RevealSection>
        <Footer />
      </RevealSection>
      
      <LightBulb />
      
      {/* Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
