import { Metadata } from "next";
import TermsClient from "./TermsClient";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Termeni și Condiții | ElectroInstall",
  description: "Regulamentul și condițiile de utilizare a serviciilor ElectroInstall.",
  alternates: {
    canonical: `${SITE_URL}/termeni-conditii`,
  },
};

export default function TermeniConditii() {
  return <TermsClient />;
}
