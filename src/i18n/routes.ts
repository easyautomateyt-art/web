/**
 * Single source of truth for the localized URL structure.
 * Consumed by the <Seo> component (canonical + hreflang), the sitemap
 * generator and the prerender script. Keep in sync with the routes declared
 * in src/AppShell.tsx.
 */

export type Lang = 'es' | 'ca' | 'en';

export type PageKey =
  | 'home'
  | 'services'
  | 'about'
  | 'contact'
  | 'legal'
  | 'privacy'
  | 'restaurants'
  | 'hairSalons'
  | 'beautyCenters'
  | 'butcherShops'
  | 'bakeries';

export interface RouteDef {
  key: PageKey;
  paths: Record<Lang, string>;
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export const SITE_URL = 'https://onereserve.es';

export const LANGS: Lang[] = ['es', 'ca', 'en'];

export const OG_LOCALE: Record<Lang, string> = {
  es: 'es_ES',
  ca: 'ca_ES',
  en: 'en_US',
};

export const ROUTES: RouteDef[] = [
  { key: 'home', priority: 1.0, changefreq: 'weekly', paths: { es: '/es', ca: '/ca', en: '/en' } },
  { key: 'services', priority: 0.9, changefreq: 'monthly', paths: { es: '/es/servicios', ca: '/ca/serveis', en: '/en/services' } },
  { key: 'restaurants', priority: 0.8, changefreq: 'monthly', paths: { es: '/es/servicios/restaurantes', ca: '/ca/serveis/restaurants', en: '/en/services/restaurants' } },
  { key: 'hairSalons', priority: 0.8, changefreq: 'monthly', paths: { es: '/es/servicios/peluquerias', ca: '/ca/serveis/perruqueries', en: '/en/services/hair-salons' } },
  { key: 'beautyCenters', priority: 0.8, changefreq: 'monthly', paths: { es: '/es/servicios/estetica', ca: '/ca/serveis/estetica', en: '/en/services/beauty-centres' } },
  { key: 'butcherShops', priority: 0.8, changefreq: 'monthly', paths: { es: '/es/servicios/carnicerias', ca: '/ca/serveis/carnisseries', en: '/en/services/butcher-shops' } },
  { key: 'bakeries', priority: 0.8, changefreq: 'monthly', paths: { es: '/es/servicios/panaderias', ca: '/ca/serveis/forns', en: '/en/services/bakeries' } },
  { key: 'about', priority: 0.6, changefreq: 'yearly', paths: { es: '/es/sobre', ca: '/ca/sobre', en: '/en/about' } },
  { key: 'contact', priority: 0.7, changefreq: 'yearly', paths: { es: '/es/contacto', ca: '/ca/contacte', en: '/en/contact' } },
  { key: 'legal', priority: 0.2, changefreq: 'yearly', paths: { es: '/es/aviso-legal', ca: '/ca/avis-legal', en: '/en/legal-notice' } },
  { key: 'privacy', priority: 0.2, changefreq: 'yearly', paths: { es: '/es/politica-privacidad', ca: '/ca/politica-privacitat', en: '/en/privacy-policy' } },
];

/** Detect language from a pathname (defaults to Spanish). */
export function detectLang(pathname: string): Lang {
  if (pathname.startsWith('/en')) return 'en';
  if (pathname.startsWith('/ca')) return 'ca';
  return 'es';
}

/** Normalize a pathname (strip trailing slash) for matching. */
function normalize(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}

/** Find the route definition that matches a given pathname. */
export function findRouteByPath(pathname: string): RouteDef | undefined {
  const p = normalize(pathname);
  return ROUTES.find((r) => LANGS.some((l) => r.paths[l] === p));
}

/** Every concrete URL path that should be prerendered / listed in the sitemap. */
export const ALL_PATHS: string[] = ROUTES.flatMap((r) => LANGS.map((l) => r.paths[l]));
