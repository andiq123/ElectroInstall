"use client";

/**
 * Section Data - Centralized content for main page sections
 * Separates data from presentation (Single Responsibility Principle)
 */

import { ReactNode } from "react";
import {
  CertificateIcon,
  ClockIcon,
  ToolIcon,
  CurrencyIcon,
  PhoneIcon,
  ClipboardIcon,
  ShieldIcon,
} from "@/components/ui/Icons";

// Why Choose Us section data
export interface ReasonItem {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

export const REASONS: ReasonItem[] = [
  {
    icon: <CertificateIcon className="w-8 h-8" />,
    title: "Licențiat & Asigurat",
    description:
      "Lucrăm oficial cu toate actele în regulă. Oferim garanție și factură pentru fiecare serviciu.",
    color: "var(--color-success)",
  },
  {
    icon: <ClockIcon className="w-8 h-8" />,
    title: "Disponibil 24/7",
    description:
      "Urgențe electrice? Suntem disponibili non-stop pentru situații de urgență în Chișinău.",
    color: "var(--accent)",
  },
  {
    icon: <ToolIcon className="w-8 h-8" />,
    title: "Experiență Vastă",
    description:
      "Peste 10 ani de experiență în instalații electrice rezidențiale și comerciale.",
    color: "var(--accent-secondary)",
  },
  {
    icon: <CurrencyIcon className="w-8 h-8" />,
    title: "Prețuri Transparente",
    description:
      "Fără costuri ascunse. Primești estimare clară înainte de a începe lucrarea.",
    color: "var(--cat-panels)",
  },
];

// Stats for WhyChooseUs section
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export const STATS: StatItem[] = [
  { value: 500, suffix: "+", label: "Lucrări Finalizate" },
  { value: 10, suffix: "+", label: "Ani Experiență" },
  { value: 100, suffix: "%", label: "Clienți Mulțumiți" },
];

// Process section data
export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Apelează-ne",
    description:
      "Sună sau completează formularul online pentru a ne descrie problema sau serviciul necesar.",
    icon: <PhoneIcon className="w-10 h-10" />,
  },
  {
    number: "02",
    title: "Evaluarea",
    description:
      "Venim la locație pentru a evalua situația și oferim o estimare clară a costurilor.",
    icon: <ClipboardIcon className="w-10 h-10" />,
  },
  {
    number: "03",
    title: "Lucrarea",
    description:
      "Efectuăm lucrarea profesional, respectând toate standardele de siguranță.",
    icon: <ToolIcon className="w-10 h-10" />,
  },
  {
    number: "04",
    title: "Garanție",
    description:
      "Primești factură oficială și garanție. Oferim suport post-lucrare.",
    icon: <ShieldIcon className="w-10 h-10" />,
  },
];

// FAQ section data
export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Cât costă serviciile unui electrician?",
    answer:
      "Prețurile variază în funcție de complexitatea lucrării. Oferim o evaluare gratuită și estimare clară înainte de a începe orice lucrare. Contactați-ne pentru o ofertă personalizată.",
  },
  {
    question: "Oferiți servicii în afara Chișinăului?",
    answer:
      "Da, oferim servicii în Chișinău și împrejurimi. Pentru localități mai îndepărtate, vă rugăm să ne contactați pentru a discuta detaliile și disponibilitatea.",
  },
  {
    question: "Cât durează o lucrare obișnuită?",
    answer:
      "Durata depinde de tipul și complexitatea lucrării. O instalare simplă de priză poate dura 30-60 minute, în timp ce o instalație electrică completă poate necesita câteva zile.",
  },
  {
    question: "Oferiți garanție pentru lucrări?",
    answer:
      "Da, toate lucrările noastre vin cu garanție oficială. Termenul de garanție variază în funcție de tipul serviciului, dar lucrăm întotdeauna cu materiale de calitate.",
  },
  {
    question: "Puteți veni în urgență?",
    answer:
      "Absolut! Suntem disponibili 24/7 pentru urgențe electrice în Chișinău. Apelați-ne direct pentru asistență imediată în caz de pană de curent sau probleme urgente.",
  },
  {
    question: "Ce metode de plată acceptați?",
    answer:
      "Acceptăm plata cash, transfer bancar și card. Pentru lucrări mai ample, putem discuta un plan de plată în tranșe.",
  },
  {
    question: "Aveți toate autorizațiile necesare?",
    answer:
      "Da, suntem licențiați și asigurați complet. Lucrăm oficial cu toate actele în regulă și eliberăm factură pentru fiecare serviciu prestat.",
  },
  {
    question: "Cum pot programa o vizită?",
    answer:
      "Puteți suna la numărul nostru de telefon, completa formularul online sau folosi butonul de contact rapid. Vom răspunde în cel mai scurt timp posibil.",
  },
];
