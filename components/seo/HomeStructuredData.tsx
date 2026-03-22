import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, webPageSchema } from "@/lib/seo/home-schemas";

export default function HomeStructuredData() {
  return (
    <>
      <JsonLd data={webPageSchema()} />
      <JsonLd data={faqPageSchema()} />
    </>
  );
}
