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
    title: "Electrician Autorizat",
    description:
      "Lucrăm responsabil, cu respectarea normelor tehnice. Oferim garanție pentru fiecare intervenție.",
    color: "var(--color-success)",
  },
  {
    icon: <ClockIcon className="w-8 h-8" />,
    title: "Program Flexibil",
    description:
      "Ai nevoie de o programare după lucru? Găsim împreună momentul potrivit pentru vizită.",
    color: "var(--accent)",
  },
  {
    icon: <ToolIcon className="w-8 h-8" />,
    title: "Soluții Durabile",
    description:
      "Folosesc doar materiale de calitate (cupru, protecții automate) pentru o instalație sigură pe termen lung.",
    color: "var(--accent-secondary)",
  },
  {
    icon: <CurrencyIcon className="w-8 h-8" />,
    title: "Estimare Corectă",
    description:
      "Analizăm problema și stabilim prețul înainte de a începe. Fără surprize la finalul lucrării.",
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
  { value: 8, suffix: "+ ani", label: "Experiență" },
  { value: 300, suffix: "+", label: "Case Sigure" },
  { value: 100, suffix: "%", label: "Transparență" },
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
    title: "Discuția",
    description:
      "Îmi spui care este problema. Analizăm împreună dacă necesită intervenție imediată sau o programare.",
    icon: <PhoneIcon className="w-10 h-10" />,
  },
  {
    number: "02",
    title: "Planificarea",
    description:
      "Stabilim materialele necesare și ofer o estimare de preț pentru manoperă.",
    icon: <ClipboardIcon className="w-10 h-10" />,
  },
  {
    number: "03",
    title: "Execuția",
    description:
      "Vin la locație și rezolv problema curat și eficient, fără să las mizerie în urmă.",
    icon: <ToolIcon className="w-10 h-10" />,
  },
  {
    number: "04",
    title: "Verificarea",
    description:
      "Mă asigur că totul funcționează corect și îți explic cum să eviți problemele pe viitor.",
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
    question: "Cât costă intervenția unui electrician?",
    answer:
      "Fiecare lucrare este diferită. Înainte de a începe, îți spun exact cât va costa manopera. Pentru lucrări mici (schimbat o priză, un automat), am prețuri fixe, corecte.",
  },
  {
    question: "Vii și pentru lucrări mici?",
    answer:
      "Desigur. Nicio lucrare nu este prea mică. Fie că e vorba de un întrerupător defect sau de montarea unei lustre, mă ocup cu aceeași atenție.",
  },
  {
    question: "Puteți veni în aceeași zi?",
    answer:
      "Dacă programul îmi permite și este o problemă care nu poate aștepta, încerc să ajung în cel mai scurt timp posibil.",
  },
  {
    question: "Oferiți factură?",
    answer:
      "Da, munca mea este transparentă. Primești dovadă pentru plată și garanție pentru lucrarea efectuată.",
  },
  {
    question: "Ce materiale folosiți?",
    answer:
      "Prefer să lucrez cu mărci de încredere (Schneider, Legrand, Viko). Putem folosi materialele tale sau le pot cumpăra eu, oferindu-ți bonul fiscal.",
  },
];
