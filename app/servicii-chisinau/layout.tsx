import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicii Electrice Chișinău | Toate Sectoarele și Suburbiile | Electrician Recomandări",
  description: "Electrician Chișinău cu recomandări: servicii electrice în Botanica, Buiucani, Centru, Ciocana, Rîșcani. Suburbii Durlești, Ialoveni, Codru. Intervenții rapide 24/7.",
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
