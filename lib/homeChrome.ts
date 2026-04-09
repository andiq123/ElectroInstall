import type { Locale } from "@/lib/locales";

export type HomeChromeCopy = {
  close: string;
  closeDialog: string;
  closeMenu: string;
  footerContact: string;
  footerNavigation: string;
  homeLabel: string;
  mainNavigation: string;
  mobileMenu: string;
  ofLabel: string;
  openMenu: string;
  nextTestimonial: string;
  previousTestimonial: string;
  testimonialsNavigation: string;
  testimonialsPagination: string;
};

const HOME_CHROME_BY_LOCALE: Record<Locale, HomeChromeCopy> = {
  ro: {
    close: "Închide",
    closeDialog: "Închide dialogul",
    closeMenu: "Închide meniul",
    footerContact: "Contact",
    footerNavigation: "Navigare",
    homeLabel: "ElectroInstall – Pagina principală",
    mainNavigation: "Navigare principală",
    mobileMenu: "Meniu mobil",
    ofLabel: "din",
    openMenu: "Deschide meniul",
    nextTestimonial: "Testimonial următor",
    previousTestimonial: "Testimonial anterior",
    testimonialsNavigation: "Navigare testimoniale",
    testimonialsPagination: "Selectare testimonial",
  },
  ru: {
    close: "Закрыть",
    closeDialog: "Закрыть диалог",
    closeMenu: "Закрыть меню",
    footerContact: "Контакты",
    footerNavigation: "Навигация",
    homeLabel: "ElectroInstall – Главная страница",
    mainNavigation: "Основная навигация",
    mobileMenu: "Мобильное меню",
    ofLabel: "из",
    openMenu: "Открыть меню",
    nextTestimonial: "Следующий отзыв",
    previousTestimonial: "Предыдущий отзыв",
    testimonialsNavigation: "Навигация по отзывам",
    testimonialsPagination: "Выбор отзыва",
  },
};

export function getHomeChrome(locale: Locale): HomeChromeCopy {
  return HOME_CHROME_BY_LOCALE[locale];
}
