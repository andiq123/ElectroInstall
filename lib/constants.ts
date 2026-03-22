export const DEFAULT_SITE_URL = "https://www.electro-install.xyz";

export const SITE_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
  DEFAULT_SITE_URL;

export const CTA_ACCENT_CLASS =
  "bg-[var(--accent-light)] text-zinc-900 ring-1 ring-amber-600/15 hover:bg-[#ffcd38] transition-colors";

export const BUSINESS_INFO = {
  name: 'ElectroInstall (Radu)',
  phone: '+373 067596246',
  phoneDisplay: '067 596 246',
  location: 'Chișinău, Moldova',
  email: 'radu@electroinstall.md',
} as const;

export const PHONE_HREF = `tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}` as const;

export const SERVICE_CATEGORIES = [
  {
    id: 'installation',
    title: 'Instalații Electrice',
    subtitle: 'De la proiect la montaj',
    icon: '⚡',
    color: 'from-amber-500 to-yellow-500',
    featured: true,
    services: [
      'Montaj instalație electrică casnică',
      'Instalare tablouri electrice cu protecție',
      'Montaj prize și întrerupătoare (Viko, Schneider)',
      'Instalare și prindere corpuri de iluminat',
      'Montaj bandă LED și senzori de prezență',
      'Cablare pentru internet și TV',
    ],
  },
  {
    id: 'repair',
    title: 'Reparații & Diagnoză',
    subtitle: 'Revenim la siguranță',
    icon: '🔧',
    color: 'from-green-500 to-emerald-500',
    featured: true,
    services: [
      'Depistare scurtcircuit și pierderi',
      'Schimbare siguranțe vechi cu automate',
      'Reparații prize topite sau defecte',
      'Înlocuire cablaj de aluminiu cu cupru',
      'Remediere probleme instalație veche',
    ],
  },
  {
    id: 'appliances',
    title: 'Conectare Electrocasnice',
    subtitle: 'Instalare sigură',
    icon: '🔌',
    color: 'from-blue-500 to-cyan-500',
    featured: false,
    services: [
      'Conectare plită cu inducție/electrică',
      'Instalare cuptor electric încorporabil',
      'Montaj și conectare mașină de spălat',
      'Instalare boiler electric cu împământare',
      'Conectare hotă de bucătărie',
    ],
  },
  {
    id: 'emergency',
    title: 'Asistență Electrică',
    subtitle: 'Intervenții de zi',
    icon: "⚡",
    color: 'from-red-500 to-orange-500',
    featured: false,
    services: [
      'Electrician de serviciu',
      'Reparații urgente de zi',
      'Intervenții pentru pene de curent',
    ],
  },
  {
    id: 'panels',
    title: 'Automatizări Simple',
    subtitle: 'Confort și control',
    icon: '📊',
    color: 'from-purple-500 to-pink-500',
    featured: false,
    services: [
      'Instalare releu protecție tensiune',
      'Montaj stabilizatoare de tensiune',
      'Automatizare iluminat curte',
      'Conectare generatoare backup',
    ],
  },
] as const;
