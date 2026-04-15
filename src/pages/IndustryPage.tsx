import {
  Calendar, Package, FileText, Database,
  CheckCircle, Clock, CreditCard, ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link, Navigate } from 'react-router-dom';

type IndustryKey = 'restaurants' | 'hairSalons' | 'beautyCenters' | 'butcherShops' | 'bakeries';

interface IndustryPageProps {
  type: IndustryKey;
}

const SERVICE_CONFIG = [
  { key: 'reservations', icon: Calendar, accent: '#00E8E5', bg: 'from-cyan-500/10 to-teal-500/5' },
  { key: 'orders', icon: Package, accent: '#6366F1', bg: 'from-indigo-500/10 to-blue-500/5' },
  { key: 'invoicing', icon: FileText, accent: '#10B981', bg: 'from-emerald-500/10 to-green-500/5' },
  { key: 'stock', icon: Database, accent: '#F59E0B', bg: 'from-amber-500/10 to-orange-500/5' },
  { key: 'timeControl', icon: Clock, accent: '#8B5CF6', bg: 'from-violet-500/10 to-purple-500/5' },
  { key: 'accounting', icon: CreditCard, accent: '#EC4899', bg: 'from-pink-500/10 to-rose-500/5' },
];

const INDUSTRY_EMOJIS: Record<IndustryKey, string> = {
  restaurants: '🍽️',
  hairSalons: '✂️',
  beautyCenters: '💆',
  butcherShops: '🥩',
  bakeries: '🍞',
};

export default function IndustryPage({ type }: IndustryPageProps) {
  const { t, language } = useLanguage();
  const base = language === 'es' ? '/es' : language === 'ca' ? '/ca' : '/en';
  const contactSlug = language === 'es' ? 'contacto' : language === 'ca' ? 'contacte' : 'contact';
  const contactPath = `${base}/${contactSlug}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const industryData = (t as any).industries?.[type];

  if (!industryData) {
    return <Navigate to="/" />;
  }

  const emoji = INDUSTRY_EMOJIS[type] || '🏪';

  return (
    <div className="pt-16 overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#001F20] py-24 md:py-32 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#00E8E5] opacity-[0.06] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-teal-400 opacity-[0.04] blur-[100px] pointer-events-none" />

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#00E8E5 1px, transparent 1px), linear-gradient(90deg, #00E8E5 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-[#00E8E5]/10 border border-[#00E8E5]/30 rounded-full px-5 py-2 mb-8">
            <span className="text-2xl">{emoji}</span>
            <span className="text-[#00E8E5] text-sm font-medium tracking-wide">{(t as any).industryPage.badge}</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
            {industryData.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            {industryData.subtitle}
          </p>

          {/* Quick nav pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {SERVICE_CONFIG.map((config, i) => {
              const Icon = config.icon;
              const sData = industryData[config.key];
              if (!sData) return null;
              return (
                <a
                  key={i}
                  href={`#module-${config.key}`}
                  className="group inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300 hover:border-[#00E8E5]/50 hover:text-white hover:bg-[#00E8E5]/10 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" style={{ color: config.accent }} />
                  <span>{sData.title}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════════════════════
          SERVICES — alternating layout
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-32">
            {SERVICE_CONFIG.map((config, index) => {
              const serviceData = industryData[config.key];
              if (!serviceData) return null;

              const Icon = config.icon;
              const isEven = index % 2 === 0;
              const { accent, bg } = config;

              const features = Array.isArray(serviceData.features)
                ? serviceData.features
                : Object.values(serviceData.features || {});

              return (
                <div
                  key={config.key}
                  id={`module-${config.key}`}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center scroll-mt-24`}
                >
                  {/* Text side */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: `${accent}15`, border: `1px solid ${accent}40` }}
                      >
                        <Icon className="h-7 w-7" style={{ color: accent }} />
                      </div>
                      <div className="text-gray-300 text-5xl font-black leading-none select-none">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-[#001F20] mb-4">
                      {serviceData.title}
                    </h2>
                    <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                      {serviceData.description}
                    </p>

                    <div className="space-y-3 mb-8">
                      {(features as string[]).map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: `${accent}20` }}
                          >
                            <CheckCircle className="h-3.5 w-3.5" style={{ color: accent }} />
                          </div>
                          <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-l-2 pl-4 py-2" style={{ borderColor: accent }}>
                      <p className="text-gray-700 text-sm italic">{serviceData.benefit}</p>
                    </div>
                  </div>

                  {/* Visual side — abstract card mockup */}
                  <div className="flex-1 w-full">
                    <div className={`relative bg-gradient-to-br ${bg} border border-gray-100 rounded-3xl p-8 min-h-[360px] flex flex-col justify-between overflow-hidden`}>
                      <div
                        className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                        style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                      />

                      <div className="absolute -bottom-8 -right-8 opacity-[0.06]">
                        <Icon className="h-48 w-48" style={{ color: accent }} />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-3 h-3 rounded-full" style={{ background: accent, opacity: 0.6 }} />
                          <div className="w-3 h-3 rounded-full bg-gray-300" />
                          <div className="w-3 h-3 rounded-full bg-gray-200" />
                          <div className="ml-auto bg-white/80 rounded-md px-3 py-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{serviceData.title}</span>
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-lg px-4 py-3">
                              <div className="w-1.5 h-8 rounded-full" style={{ background: accent, opacity: 0.3 + i * 0.2 }} />
                              <div className="flex-1 space-y-1.5">
                                <div className="h-2.5 rounded-full bg-gray-200" style={{ width: `${70 - i * 10}%` }} />
                                <div className="h-2 rounded-full bg-gray-100" style={{ width: `${50 - i * 5}%` }} />
                              </div>
                              <div className="text-xs font-bold" style={{ color: accent }}>
                                {i === 0 ? '✓' : ''}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-6 relative z-10">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center">
                            <div className="h-2 w-8 mx-auto rounded-full bg-gray-200 mb-2" />
                            <div className="h-3 w-12 mx-auto rounded-full" style={{ background: `${accent}30` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#001F20] overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00E8E5] opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#00E8E5] text-sm font-semibold uppercase tracking-widest mb-4">{emoji} {(t as any).industryPage.ctaLabel}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {t.home.cta.title}
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            {t.home.cta.subtitle}
          </p>

          <Link
            to={contactPath}
            className="group inline-flex items-center justify-center gap-2 bg-[#00E8E5] text-[#001F20] px-10 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all duration-200 shadow-[0_0_40px_rgba(0,232,229,0.25)] hover:shadow-[0_0_60px_rgba(0,232,229,0.4)]"
          >
            {t.common.contactNow}
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <p className="text-gray-600 text-sm mt-6">{t.common.noCommitment}</p>
        </div>
      </section>
    </div>
  );
}
