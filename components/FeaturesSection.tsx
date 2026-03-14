"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { BoltIcon, ClipboardIcon, CurrencyIcon, ShieldIcon } from "@/components/ui/Icons";
import { motion, Variants } from "framer-motion";

const WORK_IMAGES = [
  "/electric-panel-photo.jpg",
  "/electric-panel-being-tested.jpg",
] as const;

const ICON_MAP = {
  currency: CurrencyIcon,
  shield: ShieldIcon,
  bolt: BoltIcon,
  clipboard: ClipboardIcon,
} as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function FeaturesSection() {
  const { t } = useLanguage();
  const home = t.home as {
    features_title: string;
    features_subtitle: string;
    features: Array<{ label: string; icon: keyof typeof ICON_MAP }>;
  };

  return (
    <section className="bg-[var(--bg-section-alt)] py-20 sm:py-24 lg:py-32 relative overflow-hidden scroll-mt-20">
      
      {/* Animated Floating Shapes */}
      <motion.div 
        className="absolute top-20 right-10 w-24 h-24 border-[4px] border-[var(--accent)] rounded-2xl opacity-10 pointer-events-none z-0 hidden lg:block"
        animate={{ rotate: 360, y: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-32 h-32 border-[2px] border-[var(--primary)] rounded-full opacity-10 pointer-events-none z-0 hidden lg:block"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle Dot Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-white to-transparent z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white to-transparent z-0 pointer-events-none" />

      <div className="container-inner relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Images Layout */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 sm:-inset-8 border pointer-events-none border-[var(--border-glass)] rounded-[3rem] opacity-50 block" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative z-10">
              <motion.div 
                className="relative aspect-[4/5] sm:aspect-[3/4] rounded-3xl overflow-hidden shadow-[var(--shadow-premium)] border border-white/50"
                initial={{ opacity: 0, y: 40, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Image
                  src={WORK_IMAGES[0]}
                  alt="Instalații electrice"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-1000 hover:scale-110"
                />
              </motion.div>
              
              <motion.div 
                className="relative aspect-[4/5] sm:aspect-[3/4] rounded-3xl overflow-hidden shadow-[var(--shadow-premium)] border border-white/50 sm:translate-y-12"
                initial={{ opacity: 0, y: 60, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <Image
                  src={WORK_IMAGES[1]}
                  alt="Testare panou electric"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-1000 hover:scale-110"
                />
              </motion.div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-8 lg:space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="font-[var(--font-display)] text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-bold text-[var(--text-primary)] leading-[1.15] tracking-tight mb-6">
                {home.features_title}
              </h2>
              <p className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-xl">
                {home.features_subtitle}
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {home.features.map((item) => {
                const Icon = ICON_MAP[(item.icon as keyof typeof ICON_MAP)] ?? CurrencyIcon;
                return (
                  <motion.div 
                    key={item.label} 
                    variants={itemVariants}
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-[var(--border-glass)] hover:shadow-[var(--shadow-md)] hover:border-[var(--accent-muted)] transition-all flex flex-col items-start gap-4"
                  >
                    <div className="flex w-12 h-12 items-center justify-center rounded-xl bg-[var(--bg-section-alt)] text-[var(--text-secondary)] group-hover:bg-[var(--accent)] group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                      <Icon size="md" />
                    </div>
                    <span className="text-[1.0625rem] font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-dark)] transition-colors">
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
