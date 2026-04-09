import ServiceLandingPage from "@/components/ServiceLandingPage";
import { buildServicePageMetadata, getServicePage } from "@/lib/service-pages";

const page = getServicePage("instalatii-electrice-chisinau");

export const metadata = buildServicePageMetadata(page);

export default function InstalatiiElectricePage() {
  return <ServiceLandingPage page={page} />;
}
