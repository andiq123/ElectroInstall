"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { BoltIcon, ClipboardIcon, CurrencyIcon, ShieldIcon } from "@/components/ui/Icons";

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

export default function FeaturesSection() {
  const { t } = useLanguage();
  const home = t.home as {
    features_title: string;
    features_subtitle: string;
    features: Array<{ label: string; icon: keyof typeof ICON_MAP }>;
  };

  return (
    <section className="bg-white border-t border-black/[0.06] py-16 sm:py-20 lg:py-24 scroll-mt-[4.5rem]">
      <div className="container-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-black/[0.04]">
              <Image
                src={WORK_IMAGES[0]}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-black/[0.04] sm:translate-y-6">
              <Image
                src={WORK_IMAGES[1]}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <h2 className="font-[var(--font-display)] text-[1.75rem] sm:text-[2rem] lg:text-[2.25rem] font-bold text-[var(--text-primary)] leading-tight tracking-tight">
              {home.features_title}
            </h2>
            <p className="text-[1.0625rem] sm:text-[1.125rem] text-[var(--text-secondary)] leading-[1.65] max-w-xl">
              {home.features_subtitle}
            </p>
            <ul className="space-y-4">
              {home.features.map((item) => {
                const Icon = ICON_MAP[(item.icon as keyof typeof ICON_MAP)] ?? CurrencyIcon;
                return (
                  <li key={item.label} className="flex items-center gap-4">
                    <span className="flex w-10 h-10 items-center justify-center rounded-lg bg-[var(--accent-muted)] text-[var(--accent)] shrink-0">
                      <Icon size="md" />
                    </span>
                    <span className="text-[1.0625rem] font-medium text-[var(--text-primary)]">
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
