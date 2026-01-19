import { Calendar, Package, FileText, Database, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link, Navigate } from 'react-router-dom';

type IndustryKey = 'restaurants' | 'hairSalons' | 'beautyCenters' | 'butcherShops' | 'bakeries';

interface IndustryPageProps {
  type: IndustryKey;
}

const serviceConfig = [
  {
    key: 'reservations',
    icon: Calendar,
    color: 'from-teal-500 to-cyan-600',
  },
  {
    key: 'orders',
    icon: Package,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    key: 'invoicing',
    icon: FileText,
    color: 'from-green-500 to-emerald-600',
  },
  {
    key: 'stock',
    icon: Database,
    color: 'from-orange-500 to-red-600',
  },
  {
    key: 'timeControl',
    icon: Clock,
    color: 'from-cyan-500 to-teal-600',
  },
  {
    key: 'accounting',
    icon: CreditCard,
    color: 'from-purple-500 to-pink-600',
  },
];

export default function IndustryPage({ type }: IndustryPageProps) {
  const { t, language } = useLanguage();
  const base = language === 'es' ? '/es' : '/ca';
  const contactPath = `${base}/${language === 'es' ? 'contacto' : 'contacte'}`;

  // Access the specific industry translations
  const industryData = t.industries[type];

  if (!industryData) {
    return <Navigate to="/" />;
  }

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#001F20] to-[#003840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {industryData.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {industryData.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {serviceConfig.map((config, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const serviceData = (industryData as any)[config.key];
              const Icon = config.icon;
              const isEven = index % 2 === 0;

              // Ensure we have features array
              const features = Array.isArray(serviceData.features) 
                ? serviceData.features 
                : Object.values(serviceData.features || {});

              return (
                <div
                  key={config.key}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                >
                  <div className="flex-1">
                    <div className="bg-[#00E8E5] bg-opacity-10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-[#00E8E5]" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#001F20] mb-4">
                      {serviceData.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {serviceData.description}
                    </p>

                    <div className="bg-gray-50 p-6 rounded-xl mb-6">
                      <ul className="space-y-3">
                        {features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-[#00E8E5] mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#00E8E5] bg-opacity-10 border-l-4 border-[#00E8E5] p-4 rounded">
                      <p className="text-gray-700 italic">
                        {serviceData.benefit}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className={`bg-gradient-to-br ${config.color} h-80 rounded-2xl shadow-2xl flex items-center justify-center`}>
                      <Icon className="h-32 w-32 text-white opacity-20" />
                    </div>
                  </div>
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
