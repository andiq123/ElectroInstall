import { Metadata } from "next";
import { BUSINESS_INFO } from "@/lib/constants";

const PHONE_DISPLAY = BUSINESS_INFO.phoneDisplay;

export const metadata: Metadata = {
  title: `Servicii Electrice Chișinău - ${PHONE_DISPLAY} | Electrician Recomandări`,
  description: `Cauți electrician în Chișinău? Sună la ${PHONE_DISPLAY}. Servicii electrice în Botanica, Buiucani, Centru, Ciocana, Rîșcani. Suburbii Durlești, Ialoveni, Codru. Intervenții rapide 24/7.`,
  keywords: [
    "electrician Chisinau",
    "electrician Chisinau recomandări",
    "electrician Botanica",
    "electrician Buiucani",
    "electrician Centru",
    "electrician Riscani",
    "electrician Ciocana",
    "electrician Durlesti",
    "electrician Ialoveni",
    "servicii electrice Chisinau",
    "electrician urgent 24/7",
    "электрик Кишинев",
    "услуги электрика Кишинев",
    "электрик ботаника",
    "электрик центр",
    "электрик рышкановка",
    "электрик чеканы",
    "электрик буюканы",
  ],
};

export default function ServiciiChisinauLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
