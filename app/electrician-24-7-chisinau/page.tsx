import ServiceLandingPage from "@/components/ServiceLandingPage";
import { buildServicePageMetadata, getServicePage } from "@/lib/service-pages";

const page = getServicePage("electrician-24-7-chisinau");

export const metadata = buildServicePageMetadata(page);

export default function ElectricianUrgentPage() {
  return <ServiceLandingPage page={page} />;
}
