import { Metadata } from "next";
import ServiciiChisinauClient from "./ServiciiChisinauClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Electrician Chișinău - Servicii Electrice și Intervenții 24/7",
  description: "Servicii de electrician în Chișinău și suburbii. Intervenții rapide, montaj tablouri, prize și instalații electrice. Vezi zonele de acoperire.",
  alternates: {
    canonical: `${SITE_URL}/servicii-chisinau`,
  },
};

export default function ServiciiChisinau() {
  return <ServiciiChisinauClient />;
}
