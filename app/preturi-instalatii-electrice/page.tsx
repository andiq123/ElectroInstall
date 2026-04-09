import ServiceLandingPage from "@/components/ServiceLandingPage";
import { buildServicePageMetadata, getServicePage } from "@/lib/service-pages";

const page = getServicePage("preturi-instalatii-electrice");

export const metadata = buildServicePageMetadata(page);

export default function PreturiInstalatiiElectricePage() {
  return <ServiceLandingPage page={page} />;
}
