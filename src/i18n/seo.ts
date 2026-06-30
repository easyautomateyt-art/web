import type { PageKey, Lang } from './routes';

export interface SeoEntry {
  title: string;
  description: string;
}

/**
 * Per-page, per-language SEO metadata. Titles aim for ~50-60 chars and
 * descriptions for ~150-160 chars, with relevant keywords for each market.
 */
export const SEO_META: Record<PageKey, Record<Lang, SeoEntry>> = {
  home: {
    es: {
      title: 'OneReserve | Software de gestión todo-en-uno para tu negocio',
      description: 'Gestiona reservas, pedidos, facturación, stock, fichajes y contabilidad desde una sola plataforma. Software en la nube para tu negocio. Pruébalo gratis.',
    },
    ca: {
      title: 'OneReserve | Programari de gestió tot-en-un per al teu negoci',
      description: 'Gestiona reserves, comandes, facturació, estoc, fitxatges i comptabilitat des d\'una sola plataforma. Programari al núvol per al teu negoci. Prova-ho gratis.',
    },
    en: {
      title: 'OneReserve | All-in-one business management software',
      description: 'Manage bookings, orders, invoicing, inventory, time tracking and accounting from a single cloud platform. Software built for your business. Try it free.',
    },
  },
  services: {
    es: {
      title: 'Servicios y módulos | OneReserve',
      description: 'Descubre los módulos de OneReserve: reservas, pedidos, facturación con Verifactu, control de stock, fichajes y contabilidad. Todo integrado y en la nube.',
    },
    ca: {
      title: 'Serveis i mòduls | OneReserve',
      description: 'Descobreix els mòduls d\'OneReserve: reserves, comandes, facturació amb Verifactu, control d\'estoc, fitxatges i comptabilitat. Tot integrat i al núvol.',
    },
    en: {
      title: 'Services & modules | OneReserve',
      description: 'Explore the OneReserve modules: bookings, orders, invoicing, inventory control, time tracking and accounting. Fully integrated and in the cloud.',
    },
  },
  about: {
    es: {
      title: 'Sobre nosotros | OneReserve',
      description: 'Conoce OneReserve: nuestra misión es simplificar la gestión de pequeños y medianos negocios con una plataforma única, intuitiva y en la nube.',
    },
    ca: {
      title: 'Sobre nosaltres | OneReserve',
      description: 'Coneix OneReserve: la nostra missió és simplificar la gestió de petits i mitjans negocis amb una plataforma única, intuïtiva i al núvol.',
    },
    en: {
      title: 'About us | OneReserve',
      description: 'Get to know OneReserve: our mission is to simplify the management of small and medium businesses with a single, intuitive cloud platform.',
    },
  },
  contact: {
    es: {
      title: 'Contacto | OneReserve',
      description: '¿Tienes dudas o quieres una demo de OneReserve? Contáctanos y descubre cómo digitalizar la gestión de tu negocio sin compromiso.',
    },
    ca: {
      title: 'Contacte | OneReserve',
      description: 'Tens dubtes o vols una demo d\'OneReserve? Contacta\'ns i descobreix com digitalitzar la gestió del teu negoci sense compromís.',
    },
    en: {
      title: 'Contact | OneReserve',
      description: 'Have questions or want a OneReserve demo? Get in touch and discover how to digitize your business management with no commitment.',
    },
  },
  legal: {
    es: { title: 'Aviso legal | OneReserve', description: 'Aviso legal y condiciones de uso de la web de OneReserve.' },
    ca: { title: 'Avís legal | OneReserve', description: 'Avís legal i condicions d\'ús del web d\'OneReserve.' },
    en: { title: 'Legal notice | OneReserve', description: 'Legal notice and terms of use of the OneReserve website.' },
  },
  privacy: {
    es: { title: 'Política de privacidad | OneReserve', description: 'Política de privacidad y tratamiento de datos personales de OneReserve.' },
    ca: { title: 'Política de privacitat | OneReserve', description: 'Política de privacitat i tractament de dades personals d\'OneReserve.' },
    en: { title: 'Privacy policy | OneReserve', description: 'Privacy policy and personal data processing at OneReserve.' },
  },
  restaurants: {
    es: {
      title: 'Software para restaurantes | OneReserve',
      description: 'Gestiona reservas, comandas, TPV, facturación y stock de tu restaurante desde una sola app. Digitaliza tu restaurante con OneReserve. Pruébalo gratis.',
    },
    ca: {
      title: 'Programari per a restaurants | OneReserve',
      description: 'Gestiona reserves, comandes, TPV, facturació i estoc del teu restaurant des d\'una sola app. Digitalitza el teu restaurant amb OneReserve.',
    },
    en: {
      title: 'Restaurant management software | OneReserve',
      description: 'Manage bookings, orders, POS, invoicing and inventory for your restaurant from one app. Digitize your restaurant with OneReserve. Try it free.',
    },
  },
  hairSalons: {
    es: {
      title: 'Software para peluquerías | OneReserve',
      description: 'Programa de gestión y reservas online para peluquerías: agenda, clientes, recordatorios automáticos, caja y facturación. Prueba OneReserve gratis.',
    },
    ca: {
      title: 'Programari per a perruqueries | OneReserve',
      description: 'Programa de gestió i reserves online per a perruqueries: agenda, clients, recordatoris automàtics, caixa i facturació. Prova OneReserve gratis.',
    },
    en: {
      title: 'Hair salon software | OneReserve',
      description: 'Online booking and management software for hair salons: calendar, clients, automatic reminders, cash and invoicing. Try OneReserve free.',
    },
  },
  beautyCenters: {
    es: {
      title: 'Software para centros de estética | OneReserve',
      description: 'Gestiona citas, bonos, clientes y facturación de tu centro de estética con recordatorios automáticos. Digitaliza tu negocio con OneReserve.',
    },
    ca: {
      title: 'Programari per a centres d\'estètica | OneReserve',
      description: 'Gestiona cites, bons, clients i facturació del teu centre d\'estètica amb recordatoris automàtics. Digitalitza el teu negoci amb OneReserve.',
    },
    en: {
      title: 'Beauty salon software | OneReserve',
      description: 'Manage appointments, vouchers, clients and invoicing for your beauty centre with automatic reminders. Digitize your business with OneReserve.',
    },
  },
  butcherShops: {
    es: {
      title: 'Software para carnicerías | OneReserve',
      description: 'Control de stock, pedidos, pesaje, facturación y trazabilidad para tu carnicería en una sola plataforma. Gestiona tu carnicería con OneReserve.',
    },
    ca: {
      title: 'Programari per a carnisseries | OneReserve',
      description: 'Control d\'estoc, comandes, pesatge, facturació i traçabilitat per a la teva carnisseria en una sola plataforma. Gestiona-la amb OneReserve.',
    },
    en: {
      title: 'Butcher shop software | OneReserve',
      description: 'Inventory control, orders, weighing, invoicing and traceability for your butcher shop in a single platform. Manage it with OneReserve.',
    },
  },
  bakeries: {
    es: {
      title: 'Software para panaderías | OneReserve',
      description: 'Gestiona pedidos, producción, stock y facturación de tu panadería desde una sola app. Digitaliza tu panadería con OneReserve. Pruébalo gratis.',
    },
    ca: {
      title: 'Programari per a forns i pastisseries | OneReserve',
      description: 'Gestiona comandes, producció, estoc i facturació del teu forn des d\'una sola app. Digitalitza el teu forn amb OneReserve. Prova-ho gratis.',
    },
    en: {
      title: 'Bakery management software | OneReserve',
      description: 'Manage orders, production, inventory and invoicing for your bakery from one app. Digitize your bakery with OneReserve. Try it free.',
    },
  },
};
