import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog-posts";

export function GET() {
  const lines = [
    "# ElectroInstall",
    "",
    "> Electrician Chișinău cu recomandări: servicii electrice și intervenții rapide 24/7.",
    "",
    "## Principal",
    "",
    `- [Pagina principală](${SITE_URL}): Electrician Chișinău, servicii electrice, recomandări, contact.`,
    `- [Contact / Programare](${SITE_URL}/#contact): Programare sau mesaj, răspuns prompt.`,
    `- [Servicii Chișinău](${SITE_URL}/servicii-chisinau): Servicii electrice în toate sectoarele și suburbiile.`,
    `- [Întrebări frecvente](${SITE_URL}/#faq): Răspunsuri despre servicii, programări și urgențe.`,
    "",
    "## Blog – Sfaturi electrice",
    "",
    `- [Index blog](${SITE_URL}/blog): Toate articolele despre siguranță electrică și practici.`,
    ...BLOG_POSTS.slice(0, 15).map(
      (p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt.slice(0, 80)}…`
    ),
    "",
    "## Legal",
    "",
    `- [Politica de confidențialitate](${SITE_URL}/politica-confidentialitate)`,
    `- [Termeni și condiții](${SITE_URL}/termeni-conditii)`,
    "",
    "## Contact",
    "",
    "- Telefon: +373 067596246",
    "- Locație: Chișinău, Moldova",
    "- Disponibil: 24/7 la urgențe",
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
