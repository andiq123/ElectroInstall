"use client";

import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { PhoneIcon } from "@/components/ui/Icons";
import { motion } from "framer-motion";

interface ContactSectionProps {
  onOpenModal?: () => void;
}

export default function ContactSection({ onOpenModal }: ContactSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden bg-[var(--bg-section-alt)]">
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />
      
      <div className="container-inner relative z-10">
        <motion.div 
          className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-[var(--shadow-premium)] p-8 sm:p-16 lg:p-24 text-center border border-[var(--border-glass)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]" />
          <motion.div 
            className="absolute -bottom-24 -right-24 w-64 h-64 bg-[var(--accent)] opacity-[0.06] blur-[80px] rounded-full pointer-events-none"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute -top-24 -left-24 w-64 h-64 bg-[var(--primary)] opacity-[0.04] blur-[80px] rounded-full pointer-events-none"
            animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h2 
              className="font-[var(--font-display)] text-[2.5rem] sm:text-[3.5rem] font-extrabold text-[var(--text-primary)] leading-tight tracking-tight mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t.contact.title_part1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)]">{t.contact.title_part2}</span>
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {t.contact.subtitle}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onOpenModal}
                className="w-full sm:w-auto min-h-[56px] px-8 py-4 rounded-xl text-base font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-lg shadow-[var(--primary)]/20 transition-all border border-transparent"
              >
                {t.common.cta_primary}
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={PHONE_HREF}
                className="w-full sm:w-auto flex items-center justify-center gap-3 min-h-[56px] px-8 py-4 rounded-xl text-base font-bold text-[var(--text-primary)] bg-white border-2 border-[var(--border-strong)] hover:border-[var(--accent)] hover:text-[var(--accent-dark)] transition-all shadow-sm"
                aria-label={t.common.call_now}
              >
                <PhoneIcon size="sm" />
                <span className="tracking-wide">{BUSINESS_INFO.phoneDisplay}</span>
              </motion.a>
            </motion.div>
            
            {t.contact.trust_line && (
              <motion.p 
                className="mt-8 text-sm font-medium text-[var(--text-muted)]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {t.contact.trust_line}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
