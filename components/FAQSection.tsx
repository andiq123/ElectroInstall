"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import SectionHeader from "@/components/ui/SectionHeader";
import { PlusIcon, MinusIcon } from "@/components/ui/Icons";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

export default function FAQSection() {
  const { t } = useLanguage();
  const faq = t.faq as { title_part1: string; title_part2: string; items: Array<{ question: string; answer: string }> };
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const title = `${faq.title_part1} ${faq.title_part2}`;

  return (
    <section id="faq" className="scroll-mt-20 bg-[var(--bg-section-alt)] py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[var(--bg-base)] via-transparent to-[var(--bg-base)] opacity-80" />
      
      {/* Animated Glowing Orbs */}
      <motion.div 
        className="absolute -left-64 top-1/4 w-[500px] h-[500px] bg-[var(--accent)] opacity-[0.04] blur-[100px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.15, 1], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -right-32 bottom-1/4 w-[400px] h-[400px] bg-[var(--primary)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.2, 1], x: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="container-inner max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title={title}
            centered
            className="mb-12 sm:mb-16"
          />
        </motion.div>
        
        <motion.ul 
          className="flex flex-col gap-4" 
          role="list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.li
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl border border-[var(--border-glass)] shadow-sm overflow-hidden transition-colors hover:border-[var(--accent-muted)]"
              >
                <button
                  type="button"
                  className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className={`text-[1.125rem] font-semibold transition-colors ${isOpen ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}`}>
                    {item.question}
                  </span>
                  <motion.span 
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--bg-section-alt)] flex items-center justify-center text-[var(--accent)]"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    aria-hidden
                  >
                    {isOpen ? <MinusIcon size="sm" /> : <PlusIcon size="sm" />}
                  </motion.span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-glass)] pt-4 mt-2">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
