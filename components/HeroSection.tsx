"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import { motion, Variants } from "framer-motion";

const PHONE_DISPLAY = BUSINESS_INFO.phoneDisplay;

interface HeroSectionProps {
  onOpenModal?: () => void;
}

function renderHeadline(line: string, highlight: string) {
  const i = line.indexOf(highlight);
  if (i === -1) return line;
  return (
    <>
      {line.slice(0, i)}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] selection:text-white relative">
        {highlight}
        <motion.span 
          className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--accent)] to-transparent rounded-full"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      </span>
      {line.slice(i + highlight.length)}
    </>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 20 } 
  }
};

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const { t } = useLanguage();
  const hero = t.hero as {
    headline_1?: string;
    highlight_1?: string;
    headline_2?: string;
    highlight_2?: string;
    subhead: string;
    cta: string;
    badge_text?: string;
    call_us?: string;
  };

  const hasSplit = hero.headline_1 && hero.highlight_1 && hero.headline_2 && hero.highlight_2;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative bg-[var(--bg-base)] overflow-hidden"
    >
      <div className="sr-only">
        <h1>Electrician Chișinău – {PHONE_DISPLAY}. ElectroInstall – reparații și instalații electrice.</h1>
        <p>Sună la {PHONE_DISPLAY}. Preț corect înainte de lucrare. Lucrări conform normelor. Disponibil 24/7.</p>
      </div>

      {/* Animated Glowing Background Orbs */}
      <motion.div 
        className="absolute top-[10%] -left-[10%] w-[40vw] h-[40vw] bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 pointer-events-none"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute bottom-[10%] -right-[10%] w-[35vw] h-[35vw] bg-[var(--primary)] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 pointer-events-none"
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", delay: 2 }}
      />
      
      {/* Clean Grid Decorative Background */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-[var(--bg-base)] to-[var(--bg-base)] opacity-80 block" />

      <div className="container-inner py-16 sm:py-20 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[70vh]">
          
          {/* Text Content */}
          <motion.div 
            className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              id="hero-heading"
              variants={itemVariants}
              className="font-[var(--font-display)] text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] font-extrabold text-[var(--text-primary)] leading-[1.05] tracking-tight mb-6"
            >
              {hasSplit ? (
                <>
                  <span className="block">{renderHeadline(hero.headline_1!, hero.highlight_1!)}</span>
                  <span className="block mt-2">{renderHeadline(hero.headline_2!, hero.highlight_2!)}</span>
                </>
              ) : (
                (t.hero as { headline: string }).headline
              )}
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-[1.125rem] sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg mb-10">
              {hero.subhead}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenModal}
                className="group inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-3 rounded-xl text-base font-bold text-white bg-[var(--primary)] shadow-lg shadow-[var(--primary)]/20 hover:shadow-[var(--primary)]/30 transition-all w-full sm:w-auto"
              >
                {hero.cta}
                <ArrowRightIcon size="sm" className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-3 min-h-[56px] px-8 py-3 rounded-xl text-base font-bold text-[var(--text-primary)] bg-white border border-[var(--border-glass)] shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent-dark)] transition-all w-full sm:w-auto"
                aria-label={t.common.call_now}
              >
                <span aria-hidden="true" className="text-[var(--text-muted)]">{hero.call_us}</span>
                <span className="tracking-tight">{PHONE_DISPLAY}</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <motion.div 
            className="order-1 lg:order-2 lg:col-span-6 relative w-full aspect-[4/3] lg:aspect-square max-h-[500px] lg:max-h-none mx-auto"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Animated Decorative Ring */}
            <motion.div 
              className="absolute -inset-8 border border-[var(--accent)] rounded-full opacity-20 pointer-events-none hidden sm:block"
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ borderStyle: "dashed", borderWidth: "2px" }}
            />
            
            {/* Layered Decorative Elements */}
            <div className="absolute -inset-4 sm:-inset-8 border pointer-events-none border-[var(--border-glass)] rounded-[3rem] opacity-50 bg-[var(--bg-section-alt)]/20 backdrop-blur-sm" />
            <div className="absolute inset-4 sm:inset-8 bg-gradient-to-tr from-[var(--bg-inset)] to-white rounded-3xl shadow-[var(--shadow-premium)] rotate-6 opacity-40 transition-transform duration-700 hover:rotate-2" />
            
            <div className="absolute inset-0 bg-white rounded-3xl shadow-[var(--shadow-lg)] overflow-hidden border border-white/40 ring-1 ring-black/5 group">
              <Image
                src="/male-elictirican-at-the-panel.jpg"
                alt="Electrician la panoul de distribuție – ElectroInstall Chișinău"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="object-cover object-center transition-transform hover:scale-110 duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none mix-blend-overlay opacity-80 group-hover:opacity-50 transition-opacity duration-700" />
            </div>

            {/* Premium Clean Badge */}
            <motion.div 
              className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 bg-white/90 backdrop-blur-xl border border-[var(--border-glass)] rounded-2xl p-4 sm:p-6 shadow-[var(--shadow-lg)] w-max"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[var(--primary)] flex items-center justify-center text-white rounded-xl shadow-[var(--shadow-md)]">
                   <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                   </svg>
                </div>
                <div>
                  <p className="font-[var(--font-display)] font-extrabold text-[1.25rem] text-[var(--text-primary)] leading-none mb-1">100+</p>
                  <p className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">{hero.badge_text}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
