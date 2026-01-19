import { useMemo } from 'react';
import { Calendar, Package, FileText, Database, CheckCircle, Cloud, HeadphonesIcon, RefreshCw, Clock, CreditCard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const FEATURES_CONFIG = [
  { icon: Calendar, key: 'reservations' },
  { icon: Package, key: 'orders' },
  { icon: FileText, key: 'invoicing' },
  { icon: Database, key: 'stock' },
  { icon: Clock, key: 'timeControl' },
  { icon: CreditCard, key: 'accounting' },
] as const;

const BENEFITS_CONFIG = [
  { icon: CheckCircle, key: 'easy' },
  { icon: Cloud, key: 'cloud' },
  { icon: HeadphonesIcon, key: 'support' },
  { icon: RefreshCw, key: 'updates' },
] as const;

export default function Home() {
  const { t, language } = useLanguage();
  const base = language === 'es' ? '/es' : '/ca';
  const contactPath = `${base}/${language === 'es' ? 'contacto' : 'contacte'}`;

  const features = useMemo(() => FEATURES_CONFIG.map(({ icon, key }) => ({
    icon,
    title: t.home.features[key].title,
    description: t.home.features[key].description,
  })), [t]);

  const benefits = useMemo(() => BENEFITS_CONFIG.map(({ icon, key }) => ({
    icon,
    title: t.home.benefits[key].title,
    description: t.home.benefits[key].description,
  })), [t]);

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#001F20] to-[#003840] text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t.home.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto">
              {t.home.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to={contactPath}
                className="bg-[#00E8E5] text-[#001F20] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#00d4d1] transition-all transform hover:scale-105 shadow-lg"
              >
                {t.common.contactNow}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001F20] mb-4">
              {t.home.features.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.home.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-[#00E8E5] transition-all hover:shadow-xl"
                >
                  <div className="bg-[#00E8E5] bg-opacity-10 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-[#00E8E5]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#001F20] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001F20] mb-4">
              {t.home.benefits.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.home.benefits.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center"
                >
                  <div className="bg-[#001F20] w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon className="h-8 w-8 text-[#00E8E5]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#001F20] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-[#001F20] to-[#003840] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.home.cta.title}
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            {t.home.cta.subtitle}
          </p>
          <Link
            to={contactPath}
            className="inline-block bg-[#00E8E5] text-[#001F20] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#00d4d1] transition-all transform hover:scale-105 shadow-lg"
          >
            {t.common.contactNow}
          </Link>
        </div>
      </section>
    </div>
  );
}
