import { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Politică de Confidențialitate | ElectroInstall",
  description: "Află cum colectăm și protejăm datele tale cu caracter personal.",
  alternates: {
    canonical: `${SITE_URL}/politica-confidentialitate`,
  },
};

export default function PoliticaConfidentialitate() {
  return <PrivacyClient />;
}
