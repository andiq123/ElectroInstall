import type { Metadata } from "next";
import { SITE_URL, BUSINESS_INFO } from "@/lib/constants";
import { absoluteOgImageUrl } from "@/lib/seo/og";

export type ServicePageContent = {
  slug: string;
  title: string;
  metadataTitle: string;
  description: string;
  kicker: string;
  lede: string;
  intro: string[];
  benefits: string[];
  detailRows: Array<{ service: string; detail: string; note: string }>;
  process: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedLinks: Array<{ href: string; label: string }>;
};

const OG_IMAGE = absoluteOgImageUrl();
const PHONE = BUSINESS_INFO.phoneDisplay;

export const SERVICE_PAGES: Record<string, ServicePageContent> = {
  "instalatii-electrice-chisinau": {
    slug: "instalatii-electrice-chisinau",
    title: "Instalații electrice Chișinău",
    metadataTitle: "Instalații Electrice Chișinău | ElectroInstall",
    description:
      "Instalații electrice complete în Chișinău pentru apartamente, case și renovări. Tablou, circuite noi, prize și protecții montate corect.",
    kicker: "Montaj complet și renovări",
    lede:
      "Instalații electrice pentru apartamente, case și spații mici, gândite pentru consumul real de astăzi și executate curat, fără improvizații.",
    intro: [
      "Când refaci instalația într-un apartament sau într-o casă, nu ai nevoie doar de cabluri noi. Ai nevoie de circuite împărțite logic, de protecții corecte în tablou și de un plan clar pentru consumatorii mari: plită, cuptor, boiler, aer condiționat sau mașină de spălat.",
      "ElectroInstall execută lucrări de instalații electrice în Chișinău cu accent pe claritate: discutăm traseele, stabilim ce rămâne și ce se schimbă, apoi primești un plan clar înainte de începerea lucrării. Asta este diferența dintre o lucrare făcută doar să funcționeze și una făcută să rămână sigură mulți ani.",
    ],
    benefits: [
      "Circuite dedicate pentru bucătărie, baie, aer condiționat și consumatori mari.",
      "Tablou electric ordonat, cu protecții automate și diferențiale alese corect.",
      "Montaj prize, întrerupătoare, corpuri de iluminat și trasee noi de cablu.",
      "Refacere instalații vechi din aluminiu sau extinderi pentru renovări complete.",
    ],
    detailRows: [
      {
        service: "Circuit nou cu cablu de cupru",
        detail: "Traseu și protecție dedicate",
        note: "În funcție de lungime, traseu și nivelul de finisaj.",
      },
      {
        service: "Tablou electric pentru apartament",
        detail: "Configurație pentru consumul locuinței",
        note: "Structură orientativă pentru apartamente și renovări complete.",
      },
      {
        service: "Montaj priză / întrerupător",
        detail: "Poziționare adaptată spațiului",
        note: "Pentru poziții individuale sau înlocuiri simple.",
      },
      {
        service: "Revizie și testare după montaj",
        detail: "Teste finale după montaj",
        note: "Verificare funcțională la finalul lucrării.",
      },
    ],
    process: [
      {
        title: "Discuție și evaluare",
        body: "Analizăm planul locuinței, consumatorii mari și traseele care trebuie refăcute sau adăugate.",
      },
      {
        title: "Planul lucrării",
        body: "Primești o propunere clară de execuție, cu etapele și materialele importante pentru lucrare.",
      },
      {
        title: "Montaj pe etape",
        body: "Trasee, doze, tablou, prize și întrerupătoare montate în ordinea corectă pentru a evita refacerile.",
      },
      {
        title: "Verificare și punere în funcțiune",
        body: "Testez circuitele, protecțiile și continuitatea astfel încât instalația să fie pregătită pentru utilizare normală.",
      },
    ],
    faqs: [
      {
        question: "Când merită refăcută toată instalația electrică?",
        answer:
          "Când ai cablaj vechi din aluminiu, siguranțe care declanșează des, puține prize sau consumatori mari adăugați ulterior. În astfel de cazuri, reparațiile punctuale doar amână problema.",
      },
      {
        question: "Lucrați și în apartamente locuite?",
        answer:
          "Da. Se poate lucra etapizat, însă este mai eficient în timpul unei renovări, când traseele și tabloul pot fi reorganizate corect.",
      },
      {
        question: "Pot păstra o parte din instalația existentă?",
        answer:
          "Uneori da, dar doar după verificare. Dacă partea veche nu suportă consumul actual sau nu permite protecții corecte, recomand înlocuirea ei.",
      },
      {
        question: "Folosiți materiale incluse sau pot cumpăra eu?",
        answer:
          "Ambele variante sunt posibile. Pot lucra cu materialele tale dacă sunt potrivite, sau le pot aduce eu pentru a păstra compatibilitatea sistemului.",
      },
    ],
    relatedLinks: [
      { href: "/preturi-instalatii-electrice", label: "Vezi pagina de diagnoză și remedieri" },
      { href: "/electrician-24-7-chisinau", label: "Ai o urgență electrică?" },
      { href: "/blog/modificari-electrice-renovare-apartament", label: "Ghid pentru renovarea apartamentului" },
    ],
  },
  "electrician-24-7-chisinau": {
    slug: "electrician-24-7-chisinau",
    title: "Electrician urgent 24/7 Chișinău",
    metadataTitle: "Electrician Urgent 24/7 Chișinău | ElectroInstall",
    description:
      "Electrician urgent 24/7 în Chișinău pentru pene de curent, scurtcircuite, prize arse și tablouri defecte. Intervenție rapidă și sigură.",
    kicker: "Intervenții rapide, zi și noapte",
    lede:
      "Pentru scurtcircuite, tablouri care declanșează, prize topite sau lipsă totală de curent, intervenția trebuie făcută repede și fără improvizații.",
    intro: [
      "Urgențele electrice apar de obicei în cele mai incomode momente: seara, în weekend sau chiar înainte de un eveniment important. Dacă simți miros de ars, vezi urme de topire sau rămâi fără tensiune pe un circuit important, primul obiectiv este siguranța, nu o reparație grăbită făcută de oricine este disponibil.",
      "ElectroInstall oferă intervenții 24/7 în Chișinău pentru situații care nu pot aștepta. Diagnosticarea începe cu izolarea problemei, apoi stabilim cauza și soluția potrivită pentru remediere.",
    ],
    benefits: [
      "Intervenții pentru scurtcircuite, miros de ars și prize sau întrerupătoare supraîncălzite.",
      "Remedierea circuitelor fără tensiune și verificarea tabloului electric.",
      "Înlocuire automată, conexiuni defecte și elemente care prezintă risc imediat.",
      "Sfaturi clare despre ce poți opri până la sosire și când trebuie apelat imediat.",
    ],
    detailRows: [
      {
        service: "Diagnosticare urgență 24/7",
        detail: "Identific rapid sursa problemei",
        note: "Include deplasarea în Chișinău și identificarea cauzei.",
      },
      {
        service: "Înlocuire automat / conexiune defectă",
        detail: "Intervenție după starea tabloului",
        note: "În funcție de tipul elementului și accesul la tablou.",
      },
      {
        service: "Refacere priză sau doză afectată",
        detail: "Remediere pentru contacte arse",
        note: "Pentru contacte arse, urme de carbonizare sau joc mecanic.",
      },
      {
        service: "Punere în siguranță temporară",
        detail: "Stabilizare până la reparația completă",
        note: "Pentru situații în care reparația completă cere materiale suplimentare.",
      },
    ],
    process: [
      {
        title: "Confirmarea urgenței",
        body: "La telefon clarificăm dacă este lipsă totală de curent, risc de incendiu sau o problemă locală pe un singur circuit.",
      },
      {
        title: "Izolare și diagnostic",
        body: "La sosire verific sursa defectului, izolez zona cu risc și identific elementele afectate.",
      },
      {
        title: "Explicarea soluției",
        body: "Îți spun ce se poate rezolva imediat, ce materiale sunt necesare și dacă este nevoie de o revenire pentru remedierea completă.",
      },
      {
        title: "Remediere și testare",
        body: "Refac circuitul, înlocuiesc componenta defectă și verific funcționarea în condiții normale.",
      },
    ],
    faqs: [
      {
        question: "Când trebuie să sun imediat un electrician?",
        answer:
          "Dacă vezi fum, simți miros de ars, auzi pocnituri în tablou sau prizele se încing. Aceste semne indică risc real și nu trebuie amânate.",
      },
      {
        question: "Ce fac până ajunge electricianul?",
        answer:
          "Dacă poți face asta în siguranță, oprește circuitul afectat sau alimentarea generală. Nu desface prize și nu atinge fire sau părți metalice suspecte.",
      },
      {
        question: "Veniți și pentru pene locale de curent?",
        answer:
          "Da. Dacă vecinii au curent și doar la tine nu funcționează un circuit, problema este aproape sigur în instalația interioară și se poate verifica rapid.",
      },
      {
        question: "Interveniți și în weekend sau noaptea?",
        answer:
          "Da, pentru urgențe reale. Disponibilitatea depinde de program și de gravitatea cazului, dar răspund cât mai repede posibil.",
      },
    ],
    relatedLinks: [
      { href: "/instalatii-electrice-chisinau", label: "Ai nevoie de refacerea completă a instalației?" },
      { href: "/preturi-instalatii-electrice", label: "Vezi pagina de diagnoză și remedieri" },
      { href: "/blog/urgente-electrice-ce-trebuie-sa-faci", label: "Ce faci într-o urgență electrică" },
    ],
  },
  "preturi-instalatii-electrice": {
    slug: "preturi-instalatii-electrice",
    title: "Diagnoză și remedieri electrice Chișinău",
    metadataTitle: "Diagnoză și Remedieri Electrice Chișinău | ElectroInstall",
    description:
      "Diagnoză și remedieri electrice în Chișinău pentru prize, întrerupătoare, tablouri, circuite fără tensiune și defecțiuni repetate.",
    kicker: "Prize, automate și tablouri verificate corect",
    lede:
      "Când ai prize fără tensiune, automate care declanșează sau conexiuni care se încălzesc, problema trebuie localizată corect înainte de orice reparație.",
    intro: [
      "Cele mai multe defecțiuni electrice par simple la telefon, dar cauza reală apare doar după verificare: o conexiune slăbită, o doză afectată, un conductor întrerupt sau o protecție montată greșit.",
      "Pe această pagină găsești tipurile de probleme pe care le verific cel mai des în Chișinău și modul în care abordez diagnoza. Scopul este să remediez cauza, nu doar simptomul care reapare după câteva zile.",
    ],
    benefits: [
      "Diagnoză pentru prize, întrerupătoare, corpuri de iluminat și circuite care nu mai funcționează corect.",
      "Verificarea tablourilor electrice care declanșează des sau se încălzesc anormal.",
      "Remedieri punctuale pentru conexiuni slabe, doze afectate și contacte arse.",
      "Explicații clare despre cauza problemei și pașii necesari pentru remediere.",
    ],
    detailRows: [
      {
        service: "Priză sau întrerupător defect",
        detail: "Verific conexiunile, doza și circuitul",
        note: "Pentru lipsă tensiune, miros de ars sau automat care declanșează.",
      },
      {
        service: "Automat care sare",
        detail: "Testez circuitul și consumatorii",
        note: "Caut cauza reală înainte de orice înlocuire de componentă.",
      },
      {
        service: "Lustră sau iluminat care pâlpâie",
        detail: "Caut contactele slabe și conexiunile instabile",
        note: "Important mai ales în instalațiile mai vechi sau modificate în timp.",
      },
      {
        service: "Circuit fără tensiune",
        detail: "Verific traseul, dozele și tabloul",
        note: "Pentru camere, prize sau zone unde alimentarea cade intermitent.",
      },
      {
        service: "Tablou cu urme de încălzire",
        detail: "Inspectez protecțiile și conexiunile",
        note: "Semn important că instalația are nevoie de atenție imediată.",
      },
      {
        service: "Defect recurent",
        detail: "Elimin cauza, nu doar efectul",
        note: "Pentru probleme care reapar după improvizații sau reparații incomplete.",
      },
    ],
    process: [
      {
        title: "Descrierea simptomelor",
        body: "La telefon sau prin formular clarificăm ce nu funcționează, când a apărut problema și dacă există risc imediat.",
      },
      {
        title: "Verificarea instalației",
        body: "Controlez traseele, tabloul, dozele și punctele de consum ca să izolez cauza reală a defectului.",
      },
      {
        title: "Explicarea remedierii",
        body: "Îți explic ce trebuie refăcut, ce poate fi rezolvat pe loc și ce trebuie urmărit pe termen scurt.",
      },
      {
        title: "Execuția și verificarea finală",
        body: "După remediere, circuitul este testat și știi exact ce s-a făcut și ce rămâne de monitorizat.",
      },
    ],
    faqs: [
      {
        question: "Ce informații să trimit înainte de vizită?",
        answer:
          "Spune ce nu funcționează, de când a apărut problema, dacă se simte miros de ars sau dacă a sărit o protecție în tablou. Dacă ai poze clare, ajută mult.",
      },
      {
        question: "Reparați și probleme mici?",
        answer:
          "Da. O priză, un întrerupător sau un corp de iluminat cu probleme merită verificate corect, mai ales dacă apar semne de încălzire sau funcționare instabilă.",
      },
      {
        question: "Când devine o problemă electrică o urgență reală?",
        answer:
          "Când vezi fum, simți miros de ars, apar urme de topire, tabloul pocnește sau rămâi fără curent pe circuite importante. Atunci trebuie oprit ce se poate în siguranță și sunat imediat.",
      },
      {
        question: "Lucrați și pe instalații vechi?",
        answer:
          "Da. În multe apartamente vechi, tocmai instalația existentă este sursa principală a defectelor. Verificarea arată dacă merită o reparație punctuală sau o refacere mai amplă.",
      },
    ],
    relatedLinks: [
      { href: "/instalatii-electrice-chisinau", label: "Instalații electrice complete" },
      { href: "/electrician-24-7-chisinau", label: "Urgențe și intervenții 24/7" },
      { href: "/blog/cum-sa-alegi-electrician-chisinau", label: "Cum alegi un electrician bun" },
    ],
  },
};

export function getServicePage(slug: string) {
  return SERVICE_PAGES[slug];
}

export function buildServicePageMetadata(page: ServicePageContent): Metadata {
  const canonicalUrl = `${SITE_URL.replace(/\/$/, "")}/${page.slug}`;

  return {
    title: page.metadataTitle,
    description: page.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "ro_MD",
      url: canonicalUrl,
      siteName: "ElectroInstall",
      title: page.metadataTitle,
      description: page.description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${page.title} - ElectroInstall ${PHONE}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metadataTitle,
      description: page.description,
      images: [OG_IMAGE],
    },
  };
}
