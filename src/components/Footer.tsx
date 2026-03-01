import { useLanguage } from '../context/LanguageContext';
import { NavLink, Link } from 'react-router-dom';

export default function Footer() {
  const { t, language } = useLanguage();

  const base = language === 'es' ? '/es' : language === 'ca' ? '/ca' : '/en';
  const avisoSlug = language === 'es' ? 'aviso-legal' : language === 'ca' ? 'avis-legal' : 'legal-notice';
  const privacySlug = language === 'es' ? 'politica-privacidad' : language === 'ca' ? 'politica-privacitat' : 'privacy-policy';
  const servicesSlug = language === 'es' ? 'servicios' : language === 'ca' ? 'serveis' : 'services';
  const contactSlug = language === 'es' ? 'contacto' : language === 'ca' ? 'contacte' : 'contact';
  const aboutSlug = language === 'en' ? 'about' : 'sobre';

  return (
    <footer className="bg-[#001F20] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to={base} className="inline-block mb-4">
              <img src="/OneReserve_Logo_web-removebg-preview.png" alt="OneReserve" className="h-10" />
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00E8E5]">{t.footer.links.title}</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to={`${base}`} className="text-gray-300 hover:text-[#00E8E5] transition-colors">{t.nav.home}</NavLink>
              </li>
              <li>
                <NavLink to={`${base}/${servicesSlug}`} className="text-gray-300 hover:text-[#00E8E5] transition-colors">{t.nav.services}</NavLink>
              </li>
              <li>
                <NavLink to={`${base}/${aboutSlug}`} className="text-gray-300 hover:text-[#00E8E5] transition-colors">{t.nav.about}</NavLink>
              </li>
              <li>
                <NavLink to={`${base}/${contactSlug}`} className="text-gray-300 hover:text-[#00E8E5] transition-colors">{t.nav.contact}</NavLink>
              </li>
              <li>
                <Link to={`${base}/${avisoSlug}`} className="text-gray-300 hover:text-[#00E8E5] transition-colors">{t.footer.legalLink}</Link>
              </li>
              <li>
                <Link to={`${base}/${privacySlug}`} className="text-gray-300 hover:text-[#00E8E5] transition-colors">{t.footer.privacyLink}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00E8E5]">{t.footer.contact.title}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${t.footer.contact.email}`}
                  className="text-gray-300 hover:text-[#00E8E5] transition-colors"
                >
                  {t.footer.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
