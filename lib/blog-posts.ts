// Blog Posts Data
// This can be moved to a CMS or database later

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "cum-sa-alegi-electrician-chisinau",
    title: "Cum să alegi un electrician de încredere în Chișinău",
    excerpt:
      "Ghid complet pentru alegerea unui electrician profesionist. Află ce întrebări să pui și ce să verifici înainte de a angaja.",
    content: `
# Cum să alegi un electrician de încredere în Chișinău

Alegerea unui electrician de încredere este esențială pentru siguranța casei tale. Iată ce trebuie să știi:

## 1. Verifică licența și asigurarea

Un electrician profesionist trebuie să aibă toate actele în regulă. Întreabă despre licența de practică, asigurarea de răspundere și experiența în domeniu.

## 2. Cere referințe și recenzii

Verifică recenziile online și cere referințe de la clienți anteriori.

## 3. Solicită o estimare detaliată

Înainte de a începe lucrarea, cere o estimare clară a costurilor.

## 4. Verifică garanția

Un electrician serios oferă garanție pentru lucrările efectuate.
    `,
    date: "2024-12-10",
    readTime: "5 min",
    category: "Sfaturi",
  },
  {
    slug: "siguranta-electrica-casa-sfaturi",
    title: "Siguranța electrică în casă: 10 sfaturi esențiale",
    excerpt:
      "Protejează-ți familia cu aceste 10 sfaturi de siguranță electrică. Prevenția este cheia unui cămin sigur.",
    content: `
# Siguranța electrică în casă: 10 sfaturi esențiale

Siguranța electrică ar trebui să fie o prioritate în orice casă:

## 1. Nu supraîncărcați prizele

Folosirea prelungitoarelor multiple poate duce la supraîncălzire și incendii.

## 2. Verificați periodic cablurile

Cablurile deteriorate sunt un pericol major.

## 3. Instalați întrerupătoare diferențiale

Acestea vă protejează împotriva electrocutării.

## 4. Nu ignorați mirosul de ars

Un miros de ars poate indica o problemă electrică gravă.

## 5. Programați inspecții regulate

O inspecție anuală poate preveni multe probleme.
    `,
    date: "2024-12-05",
    readTime: "7 min",
    category: "Siguranță",
  },
  {
    slug: "de-ce-sa-nu-repari-singur-electricitatea",
    title: "De ce să nu încerci reparațiile electrice singur",
    excerpt:
      "Reparațiile electrice făcute de amatori pot fi periculoase. Află de ce e important să apelezi la un profesionist.",
    content: `
# De ce să nu încerci reparațiile electrice singur

Poate părea tentant să economisești bani făcând reparații singur, dar iată de ce nu e o idee bună:

## Riscul de electrocutare

Curentul electric este extrem de periculos. Chiar și o greșeală mică poate fi fatală.

## Riscul de incendiu

O instalație făcută incorect poate provoca incendii ore sau zile mai târziu.

## Probleme legale

Lucrările electrice trebuie efectuate de profesioniști licențiați pentru a fi conforme cu legea.
    `,
    date: "2024-11-28",
    readTime: "4 min",
    category: "Siguranță",
  },
  {
    slug: "cand-sa-inlocuiesti-tabloul-electric",
    title: "Când trebuie să înlocuiești tabloul electric?",
    excerpt:
      "Tabloul electric vechi poate fi un pericol ascuns. Află semnele care indică necesitatea înlocuirii.",
    content: `
# Când trebuie să înlocuiești tabloul electric?

Tabloul electric este inima sistemului electric al casei. Iată semnele care arată că e timpul pentru înlocuire:

## Semne de avertizare

- Siguranțele sar frecvent
- Mirosuri ciudate în jurul tabloului
- Tabloul are mai mult de 25 de ani
- Fire expuse sau coroziune vizibilă
- Tabloul face zgomote (buzz sau pocnituri)

## De ce e important?

Un tablou vechi nu poate gestiona consumul modern de electricitate și poate cauza incendii.
    `,
    date: "2024-11-20",
    readTime: "4 min",
    category: "Instalații",
  },
  {
    slug: "modificari-electrice-renovare-apartament",
    title: "Modificările electrice necesare la renovarea apartamentului",
    excerpt:
      "Planifici o renovare? Află ce lucrări electrice trebuie incluse în buget și de ce sunt importante.",
    content: `
# Modificările electrice necesare la renovarea apartamentului

Renovarea este momentul perfect pentru a aduce instalația electrică la standarde moderne:

## Ce să incluzi în renovare

- Înlocuirea cablajelor vechi din aluminiu
- Adăugarea de prize în puncte strategice
- Instalarea întrerupătoarelor diferențiale
- Circuite separate pentru electrocasnice mari
- Iluminat LED modern și eficient

## Costul ignorării

Instalațiile vechi nu pot suporta consumul modern și reprezintă un risc de incendiu.
    `,
    date: "2024-11-15",
    readTime: "5 min",
    category: "Instalații",
  },
  {
    slug: "urgente-electrice-ce-trebuie-sa-faci",
    title: "Urgențe electrice: ce trebuie să faci în caz de pană",
    excerpt:
      "Știi ce să faci când rămâi fără curent? Ghid pas cu pas pentru gestionarea urgențelor electrice.",
    content: `
# Urgențe electrice: ce trebuie să faci în caz de pană

Panicile electrice pot fi stresante. Iată cum să le gestionezi calm:

## Pasul 1: Verifică siguranțele

Verifică mai întâi tabloul electric. S-ar putea să fie doar o siguranță sărită.

## Pasul 2: Verifică vecinii

Dacă și vecinii n-au curent, problema e la rețea.

## Pasul 3: Nu încerca reparații

Nu deschide tabloul electric și nu umbla la fire dacă nu știi ce faci.

## Pasul 4: Sună un profesionist

Pentru urgențe electrice, sună imediat un electrician autorizat.
    `,
    date: "2024-11-10",
    readTime: "3 min",
    category: "Urgențe",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 2
): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.slug !== currentSlug).slice(0, limit);
}
