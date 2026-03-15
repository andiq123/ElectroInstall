"use client";

import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
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

function TestimonialCard({ quote, name, service, delayClass }: Testimonial & { delayClass?: string }) {
  return (
    <div 
      className={`relative flex flex-col gap-4 sm:gap-5 p-5 sm:p-8 rounded-2xl bg-white shadow-[var(--shadow-md)] border border-[var(--border-default)] h-full overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-premium)] hover:border-[var(--accent-muted)] hover:-translate-y-1 animate-fadeInUp ${delayClass}`}
    >
      <div className="hidden sm:block">
        <QuoteMark />
      </div>
      <div className="flex gap-1 text-[var(--accent)] mb-1 sm:mb-2">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="w-4 h-4 sm:w-5 sm:h-5" />
        ))}
      </div>
      <p className="text-[1rem] sm:text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed flex-1 relative z-10 font-medium italic">
        &quot;{quote}&quot;
      </p>
      <footer className="pt-4 sm:pt-5 border-t border-[var(--border-default)] flex items-center gap-3 sm:gap-4">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--bg-inset)] flex items-center justify-center text-[var(--text-tertiary)] font-bold text-base sm:text-lg">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-[1rem] font-semibold text-[var(--text-primary)]">{name}</p>
          <p className="text-[0.875rem] text-[var(--text-muted)] font-medium">{service}</p>
        </div>
      </footer>
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const data = t.testimonials as { title: string; items: Testimonial[] };

  return (
    <section className="bg-[var(--bg-base)] py-14 sm:py-24 lg:py-28 relative overflow-hidden">
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none hidden sm:block" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent opacity-90 pointer-events-none z-0" />
      
      {/* Animated Glowing Orbs */}
      <div 
        className="absolute right-0 top-0 w-[500px] h-[500px] bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] opacity-[0.04] blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3 animate-orb"
      />
      <div 
        className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[var(--primary)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/3 animate-orb-reverse delay-500"
      />
      
      <div className="container-inner relative z-10">
        <Reveal>
          <SectionHeader
            title={data.title}
            centered
            className="mb-8 sm:mb-16"
          />
        </Reveal>
        
        <Reveal 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-6xl mx-auto"
          delay={0.2}
        >
          {data.items.map((item, i) => {
            const delayClass = i === 1 ? 'delay-200' : i === 2 ? 'delay-400' : '';
            return <TestimonialCard key={item.name} {...item} delayClass={delayClass} />
          })}
        </Reveal>
      </div>
    </section>
  );
}
