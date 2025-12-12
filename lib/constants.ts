// Navigation Links
export const NAV_LINKS = [
  { href: '#servicii', label: 'Servicii' },
  { href: '#despre', label: 'Despre Noi' },
  { href: '#contact', label: 'Contact' },
] as const;

// Hero Content
export const HERO_CONTENT = {
  badge: {
    text: '⚡ Electrician Profesionist',
  },
  headline: {
    parts: ['MESTER', 'ELECTRIC', 'MOLDOVA'],
    gradientIndex: 1,
  },
  description: 'Servicii electrice profesionale pentru casa și afacerea ta. Licențiat, asigurat și de încredere. Lucrăm oficial cu factură și garanție.',
  cta: {
    primary: {
      text: 'Comandă Serviciu',
      icon: 'arrow' as const,
    },
    secondary: {
      text: 'Apelează Acum',
      icon: 'phone' as const,
    },
  },
} as const;

// Business Information
export const BUSINESS_INFO = {
  name: 'ElectroInstall',
  phone: '+373 061110314',
  location: 'Chișinău, Moldova',
  email: 'contact@electroinstall.md',
  paymentMethods: ['Card', 'Numerar', 'Transfer Bancar'],
  guarantee: 'Garanție oficială',
} as const;

// Service Categories with comprehensive list
export const SERVICE_CATEGORIES = [
  {
    id: 'emergency',
    title: 'Urgențe Electrice',
    subtitle: 'Disponibil 24/7',
    icon: '🚨',
    color: 'from-red-500 to-orange-500',
    featured: true,
    services: [
      'Apel de urgență electrician',
      'Depanare scurtcircuit',
      'Restabilire curent electric',
      'Reparații electrice urgente',
    ],
  },
  {
    id: 'installation',
    title: 'Instalații Electrice',
    subtitle: 'Montaj la cheie',
    icon: '⚡',
    color: 'from-amber-500 to-yellow-500',
    featured: true,
    services: [
      'Montaj electrice la cheie',
      'Instalare tablouri electrice',
      'Montaj prize și întrerupătoare',
      'Instalare prize 380V pentru aragaz',
      'Prindere și conectare candelabre',
      'Montaj iluminat LED',
    ],
  },
  {
    id: 'appliances',
    title: 'Conectare Electrocasnice',
    subtitle: 'Toate aparatele',
    icon: '🔌',
    color: 'from-blue-500 to-cyan-500',
    featured: false,
    services: [
      'Conectare aragaz electric',
      'Instalare plită electrică',
      'Conectare cuptor/hotă',
      'Instalare mașină de spălat',
      'Conectare boiler electric',
      'Montaj aer condiționat',
    ],
  },
  {
    id: 'repair',
    title: 'Reparații & Întreținere',
    subtitle: 'Diagnoză profesională',
    icon: '🔧',
    color: 'from-green-500 to-emerald-500',
    featured: false,
    services: [
      'Depistare defecțiuni cablaj',
      'Reparații scurtcircuit',
      'Înlocuire cabluri vechi',
      'Revizie instalații electrice',
      'Verificare siguranțe',
    ],
  },
  {
    id: 'panels',
    title: 'Tablouri & Contoare',
    subtitle: 'Soluții complete',
    icon: '📊',
    color: 'from-purple-500 to-pink-500',
    featured: false,
    services: [
      'Asamblare tablouri electrice',
      'Instalare automate',
      'Montaj contoare electrice',
      'Instalare stabilizatoare',
      'Conectare generatoare',
      'Relee intermediare',
    ],
  },
  {
    id: 'wiring',
    title: 'Cablaje & Trasee',
    subtitle: 'De la zero la gata',
    icon: '🏠',
    color: 'from-indigo-500 to-blue-500',
    featured: false,
    services: [
      'Proiectare trasee electrice',
      'Montaj cabluri în perete',
      'Instalare canale cablu',
      'Cablare bucătărie completă',
      'Înlocuire instalație veche',
    ],
  },
] as const;

// Legacy services for backward compatibility
export const SERVICES = SERVICE_CATEGORIES.flatMap(cat => 
  cat.services.slice(0, 2).map((service, idx) => ({
    id: `${cat.id}-${idx}`,
    title: service,
    description: cat.subtitle,
    icon: cat.icon,
  }))
).slice(0, 9);

// Trust Indicators
export const TRUST_INDICATORS = [
  { text: 'Licențiat', icon: '✓' },
  { text: 'Asigurat', icon: '✓' },
  { text: 'Disponibil 24/7', icon: '✓' },
] as const;

// Footer Links
export const FOOTER_LINKS = [
  { href: '#', label: 'Pagina Principală' },
] as const;

// SEO Keywords (Romanian & Russian)
export const SEO_KEYWORDS = {
  ro: [
    'electrician Chișinău',
    'servicii electrice Moldova',
    'instalații electrice la cheie',
    'reparații electrice urgente',
    'montaj tablou electric',
    'conectare aragaz electric',
    'electrician non-stop',
  ],
  ru: [
    'электрик Кишинёв',
    'электромонтажные работы',
    'ремонт электрики',
    'установка розеток',
    'подключение электроплиты',
    'вызов электрика',
  ],
} as const;
