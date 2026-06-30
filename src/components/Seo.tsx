import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_URL, OG_LOCALE, ROUTES, detectLang, type PageKey } from '../i18n/routes';
import { SEO_META } from '../i18n/seo';

const OG_IMAGE = `${SITE_URL}/og-image.png`;
const LOGO = `${SITE_URL}/OneReserve_Logo_web-removebg-preview.png`;

/** Organization + WebSite schema, emitted once on the home page. */
function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'OneReserve',
        url: SITE_URL,
        logo: LOGO,
        sameAs: [] as string[],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'OneReserve',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['es', 'ca', 'en'],
      },
      {
        '@type': 'SoftwareApplication',
        name: 'OneReserve',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: SITE_URL,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      },
    ],
  };
}

/** Breadcrumb schema for the industry sub-pages. */
function breadcrumbSchema(pageKey: PageKey, lang: 'es' | 'ca' | 'en') {
  const home = ROUTES.find((r) => r.key === 'home')!;
  const services = ROUTES.find((r) => r.key === 'services')!;
  const current = ROUTES.find((r) => r.key === pageKey)!;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'OneReserve', item: SITE_URL + home.paths[lang] },
      { '@type': 'ListItem', position: 2, name: SEO_META.services[lang].title.split('|')[0].trim(), item: SITE_URL + services.paths[lang] },
      { '@type': 'ListItem', position: 3, name: SEO_META[pageKey][lang].title.split('|')[0].trim(), item: SITE_URL + current.paths[lang] },
    ],
  };
}

const INDUSTRY_KEYS: PageKey[] = ['restaurants', 'hairSalons', 'beautyCenters', 'butcherShops', 'bakeries'];

interface SeoProps {
  pageKey: PageKey;
}

export default function Seo({ pageKey }: SeoProps) {
  const { pathname } = useLocation();
  const lang = detectLang(pathname);
  const route = ROUTES.find((r) => r.key === pageKey) ?? ROUTES[0];
  const meta = SEO_META[pageKey][lang];
  const canonical = SITE_URL + route.paths[lang];

  const jsonLd =
    pageKey === 'home'
      ? organizationSchema()
      : INDUSTRY_KEYS.includes(pageKey)
        ? breadcrumbSchema(pageKey, lang)
        : null;

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates */}
      <link rel="alternate" hrefLang="es" href={SITE_URL + route.paths.es} />
      <link rel="alternate" hrefLang="ca" href={SITE_URL + route.paths.ca} />
      <link rel="alternate" hrefLang="en" href={SITE_URL + route.paths.en} />
      <link rel="alternate" hrefLang="x-default" href={SITE_URL + route.paths.es} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="OneReserve" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:locale" content={OG_LOCALE[lang]} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
