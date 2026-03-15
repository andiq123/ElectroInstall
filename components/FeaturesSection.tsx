"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { BoltIcon, ClipboardIcon, CurrencyIcon, ShieldIcon } from "@/components/ui/Icons";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

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

type FeatureItem = {
  label: string;
  icon: keyof typeof ICON_MAP;
};

const ANIMATION_DELAY_CLASS = ["", "delay-100", "delay-200", "delay-300"] as const;

function getDelayClass(index: number): string {
  return ANIMATION_DELAY_CLASS[index] ?? "";
}

function FeatureCard({ item, delayClass }: { item: FeatureItem; delayClass: string }) {
  const Icon = ICON_MAP[item.icon] ?? CurrencyIcon;

  return (
    <div
      className={`group bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-[var(--border-default)] hover:shadow-[var(--shadow-md)] hover:border-[var(--accent-muted)] transition-all flex flex-col items-start gap-3 sm:gap-4 animate-fadeInUp ${delayClass}`}
    >
      <div className="flex w-10 h-10 sm:w-12 sm:h-12 items-center justify-center rounded-xl bg-[var(--bg-section-alt)] text-[var(--text-secondary)] group-hover:bg-[var(--accent)] group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
        <Icon size="md" />
      </div>
      <span className="text-[1rem] sm:text-[1.0625rem] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-dark)] transition-colors">
        {item.label}
      </span>
    </div>
  );
}

export default function FeaturesSection() {
  const { t } = useLanguage();
  const home = t.home as {
    features_title: string;
    features_subtitle: string;
    features: FeatureItem[];
  };

  return (
    <section id="services" className="bg-[var(--bg-section-alt)] py-14 sm:py-24 lg:py-28 relative overflow-hidden scroll-mt-20">
      
      <div 
        className="absolute top-20 right-10 w-24 h-24 border-[4px] border-[var(--accent)] rounded-2xl opacity-10 pointer-events-none z-0 hidden lg:block animate-spin-slow"
      />
      <div 
        className="absolute bottom-20 left-10 w-32 h-32 border-[2px] border-[var(--primary)] rounded-full opacity-10 pointer-events-none z-0 hidden lg:block animate-orb"
      />

      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none hidden sm:block" 
           style={{ backgroundImage: 'radial-gradient(var(--primary) 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-white to-transparent z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white to-transparent z-0 pointer-events-none" />

      <div className="container-inner relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
          
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-2 sm:-inset-8 border pointer-events-none border-[var(--border-glass)] rounded-[2rem] sm:rounded-[3rem] opacity-40 sm:opacity-50 block" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 relative z-10">
              <Reveal 
                className="relative aspect-[16/10] sm:aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[var(--shadow-premium)] border border-white/50 max-h-[220px] sm:max-h-none"
              >
                <Image
                  src={WORK_IMAGES[0]}
                  alt="Instalații electrice"
                  fill
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 40vw"
                  className="object-cover transition-transform duration-1000 sm:hover:scale-110"
                />
              </Reveal>
              
              <Reveal 
                className="relative hidden sm:block aspect-[3/4] rounded-3xl overflow-hidden shadow-[var(--shadow-premium)] border border-white/50 sm:translate-y-12"
                delay={0.2}
                yOffset={60}
              >
                <Image
                  src={WORK_IMAGES[1]}
                  alt="Testare panou electric"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-1000 sm:hover:scale-110"
                />
              </Reveal>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8 lg:space-y-10">
            <Reveal>
              <SectionHeader
                title={home.features_title}
                subtitle={home.features_subtitle}
                className="!mb-0"
              />
            </Reveal>
            
            <Reveal 
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6"
              delay={0.2}
            >
              {home.features.map((item, index) => (
                <FeatureCard
                  key={item.label}
                  item={item}
                  delayClass={getDelayClass(index)}
                />
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
