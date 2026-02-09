// Navigation Links
export const NAV_LINKS = [
  { href: '#servicii', label: 'Servicii' },
  { href: '#despre', label: 'Despre Noi' },
  { href: '#contact', label: 'Contact' },
] as const;

// Hero Content
export const HERO_CONTENT = {
  badge: {
    text: '⚡ Electrician Autorizat: Radu',
  },
  headline: {
    parts: ['SOLUȚII', 'ELECTRICE', 'CORECTE'],
    gradientIndex: 1,
  },
  description: 'Reparații și instalații electrice executate cu atenție și responsabilitate. Fără soluții de moment, doar lucrări sigure și durabile pentru locuința ta.',
  cta: {
    primary: {
      text: 'Solicită Consultanță',
      icon: 'arrow' as const,
    },
    secondary: {
      text: 'Sună Electricianul',
      icon: 'phone' as const,
    },
  },
} as const;

export const SHOW_EMAIL = false;

export const BUSINESS_INFO = {
  name: 'ElectroInstall (Radu)',
  phone: '+373 067596246',
  location: 'Chișinău, Moldova',
  email: 'radu@electroinstall.md',
} as const;

// Service Categories with comprehensive list
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
    icon: '�',
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
  { text: 'Electrician Autorizat', icon: '✓' },
  { text: 'Atenție la detalii', icon: '✓' },
  { text: 'Garanție pe lucrare', icon: '✓' },
] as const;

// Footer Links
export const FOOTER_LINKS = [
  { href: '#servicii', label: 'Servicii' },
  { href: '#despre', label: 'Cine este Radu?' },
  { href: '#contact', label: 'Contact' },
] as const;

export const SEO_KEYWORDS = {
  ro: [
    'electrician bun Chișinău',
    'electrician Chișinău recomandări',
    'electricieni autorizați ANRE Chișinău',
    'electrician Chișinău urgent 24/7',
    'electrician Chișinău 2025',
    'electrician Chișinău 2026',
    'electrician Chișinău',
    'reparații electrice',
    'montaj prize Chișinău',
    'instalare tablou electric',
    'intervenție rapidă electrician',
    'instalații electrice casnice',
  ],
  ru: [
    'электрик Кишинёв',
    'электрик Кишинев отзывы',
    'услуги электрика Кишинев',
    'электромонтаж Кишинев',
    'ремонт электрики',
    'установка розеток',
    'подключение плиты',
    'вызов электрика на дом',
  ],
} as const;
