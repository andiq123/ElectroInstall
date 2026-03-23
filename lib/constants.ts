export const DEFAULT_SITE_URL = "https://www.electro-install.xyz";

export const SITE_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SITE_URL) ||
  DEFAULT_SITE_URL;

export const BUSINESS_INFO = {
  name: 'ElectroInstall (Radu)',
  phone: '+373 067596246',
  phoneDisplay: '067 596 246',
  location: 'Chișinău, Moldova',
  email: 'radu@electroinstall.md',
} as const;

export const PHONE_HREF = `tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}` as const;
