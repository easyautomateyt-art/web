import { Calendar, Package, FileText, Database, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Services() {
  const { t, language } = useLanguage();
  const base = language === 'es' ? '/es' : '/ca';
  const contactPath = `${base}/${language === 'es' ? 'contacto' : 'contacte'}`;

  const services = [
    {
      icon: Calendar,
      title: t.services.reservations.title,
      description: t.services.reservations.description,
      features: [
        t.services.reservations.features.calendar,
        t.services.reservations.features.auto,
        t.services.reservations.features.reminders,
        t.services.reservations.features.online,
        t.services.reservations.features.management,
        t.services.reservations.features.stats,
      ],
      benefit: t.services.reservations.benefit,
      color: 'from-teal-500 to-cyan-600',
    },
    {
      icon: Package,
      title: t.services.orders.title,
      description: t.services.orders.description,
      features: [
        t.services.orders.features.tracking,
        t.services.orders.features.states,
        t.services.orders.features.notifications,
        t.services.orders.features.history,
        t.services.orders.features.integration,
        t.services.orders.features.reports,
      ],
      benefit: t.services.orders.benefit,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: FileText,
      title: t.services.invoicing.title,
      description: t.services.invoicing.description,
      features: [
        t.services.invoicing.features.auto,
        t.services.invoicing.features.templates,
        t.services.invoicing.features.legal,
        t.services.invoicing.features.export,
        t.services.invoicing.features.accounting,
        t.services.invoicing.features.series,
      ],
      benefit: t.services.invoicing.benefit,
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Database,
      title: t.services.stock.title,
      description: t.services.stock.description,
      features: [
        t.services.stock.features.realtime,
        t.services.stock.features.alerts,
        t.services.stock.features.movements,
        t.services.stock.features.multi,
        t.services.stock.features.valuation,
        t.services.stock.features.reports,
      ],
      benefit: t.services.stock.benefit,
      color: 'from-orange-500 to-red-600',
    },
  ];

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#001F20] to-[#003840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t.services.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                >
                  <div className="flex-1">
                    <div className="bg-[#00E8E5] bg-opacity-10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-[#00E8E5]" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#001F20] mb-4">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="bg-gray-50 p-6 rounded-xl mb-6">
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-[#00E8E5] mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#00E8E5] bg-opacity-10 border-l-4 border-[#00E8E5] p-4 rounded">
                      <p className="text-gray-700 italic">
                        {service.benefit}
                      </p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className={`bg-gradient-to-br ${service.color} h-80 rounded-2xl shadow-2xl flex items-center justify-center`}>
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
