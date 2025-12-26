import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electrician Chișinău | Servicii Electrice Sectoare și Suburbii",
  description: "Servicii electrice profesionale în toate sectoarele din Chișinău: Botanica, Buiucani, Centru, Ciocana, Rîșcani. Intervenții rapide și în suburbii (Durlești, Ialoveni).",
  keywords: [
    "electrician Chisinau",
    "electrician Botanica",
    "electrician Buiucani",
    "electrician Centru",
    "electrician Riscani",
    "electrician Ciocana",
    "electrician Durlesti",
    "electrician Ialoveni",
    "reparatii electrice Chisinau",
    "электрик Кишинев",
    "услуги электрика",
    "электрик ботаника",
    "электрик центp",
    "электрик рышкановка",
    "электрик чеканы",
    "электрик буюканы",
    "ремонт электрики кишинев",
  ],
};

export default function ServiciiChisinauLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
