"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, Variants } from "framer-motion";
import { StarIcon } from "@heroicons/react/20/solid";

interface Testimonial {
  quote: string;
  name: string;
  service: string;
}

function QuoteMark() {
  return (
    <svg
      aria-hidden="true"
      className="w-10 h-10 text-[var(--accent)] opacity-20 absolute top-6 right-6"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M11.3 2.6C6.1 5 3 9.2 3 14c0 3.5 2.5 6 5.5 6 2.7 0 4.5-2 4.5-4.5 0-2.4-1.7-4.2-3.8-4.5.3-2.3 2-4.8 4.6-6.3l-2.5-2.1zm10 0C16.1 5 13 9.2 13 14c0 3.5 2.5 6 5.5 6 2.7 0 4.5-2 4.5-4.5 0-2.4-1.7-4.2-3.8-4.5.3-2.3 2-4.8 4.6-6.3l-2.5-2.1z" />
    </svg>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

function TestimonialCard({ quote, name, service }: Testimonial) {
  return (
    <motion.blockquote 
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="relative flex flex-col gap-5 p-7 sm:p-8 rounded-3xl bg-white shadow-[var(--shadow-md)] border border-[var(--border-glass)] h-full overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-premium)] hover:border-[var(--accent-muted)]"
    >
      <QuoteMark />
      <div className="flex gap-1 text-[var(--accent)] mb-2">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="w-5 h-5" />
        ))}
      </div>
      <p className="text-[1.125rem] text-[var(--text-secondary)] leading-relaxed flex-1 relative z-10 font-medium italic">
        &quot;{quote}&quot;
      </p>
      <footer className="pt-5 border-t border-[var(--border-glass)] flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[var(--bg-inset)] flex items-center justify-center text-[var(--text-tertiary)] font-bold text-lg">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-[1rem] font-bold text-[var(--text-primary)]">{name}</p>
          <p className="text-[0.875rem] text-[var(--text-muted)] font-medium">{service}</p>
        </div>
      </footer>
    </motion.blockquote>
  );
}

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const data = t.testimonials as { title: string; items: Testimonial[] };

  return (
    <section className="bg-[var(--bg-base)] py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent opacity-90 pointer-events-none z-0" />
      
      {/* Animated Glowing Orbs */}
      <motion.div 
        className="absolute right-0 top-0 w-[500px] h-[500px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] opacity-[0.04] blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[var(--primary)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/3"
        animate={{ scale: [1, 1.2, 1], x: [0, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container-inner relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-[var(--font-display)] text-[2.5rem] sm:text-[3rem] font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
            {data.title}
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-dark)] rounded-full mx-auto mt-6" />
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {data.items.map((item) => (
            <TestimonialCard key={item.name} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
