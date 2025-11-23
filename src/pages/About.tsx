import { Target, Eye, AlertCircle, Lightbulb, CheckCircle, Shield, Zap, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: CheckCircle,
      title: t.about.values.simplicity.title,
      description: t.about.values.simplicity.description,
    },
    {
      icon: Shield,
      title: t.about.values.reliability.title,
      description: t.about.values.reliability.description,
    },
    {
      icon: Zap,
      title: t.about.values.innovation.title,
      description: t.about.values.innovation.description,
    },
    {
      icon: Heart,
      title: t.about.values.support.title,
      description: t.about.values.support.description,
    },
  ];

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#001F20] to-[#003840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t.about.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-gradient-to-br from-[#00E8E5] to-[#00b8b5] p-8 rounded-2xl text-white">
              <div className="bg-white bg-opacity-20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{t.about.mission.title}</h2>
              <p className="text-lg leading-relaxed">
                {t.about.mission.content}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#001F20] to-[#003840] p-8 rounded-2xl text-white">
              <div className="bg-white bg-opacity-20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Eye className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold mb-4">{t.about.vision.title}</h2>
              <p className="text-lg leading-relaxed">
                {t.about.vision.content}
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="flex items-start mb-6">
                <div className="bg-red-100 p-3 rounded-lg mr-4">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#001F20] mb-4">
                    {t.about.problem.title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t.about.problem.content}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#00E8E5] bg-opacity-10 p-8 rounded-2xl border-2 border-[#00E8E5]">
              <div className="flex items-start mb-6">
                <div className="bg-[#00E8E5] p-3 rounded-lg mr-4">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#001F20] mb-4">
                    {t.about.solution.title}
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {t.about.solution.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#001F20] mb-4">
              {t.about.values.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="bg-[#001F20] w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-[#00E8E5]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#001F20] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
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
          <a
            href="https://onereserve.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#00E8E5] text-[#001F20] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#00d4d1] transition-all transform hover:scale-105 shadow-lg"
          >
            {t.home.cta.button}
          </a>
        </div>
      </section>
    </div>
  );
}
