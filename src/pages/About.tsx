import {
  Target, Eye, AlertCircle, Lightbulb,
  CheckCircle, Shield, Zap, Heart, ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function About() {
  const { t, language } = useLanguage();
  const base = language === 'es' ? '/es' : language === 'ca' ? '/ca' : '/en';
  const contactSlug = language === 'es' ? 'contacto' : language === 'ca' ? 'contacte' : 'contact';
  const contactPath = `${base}/${contactSlug}`;

  const values = [
    { icon: CheckCircle, title: t.about.values.simplicity.title, description: t.about.values.simplicity.description, accent: '#00E8E5' },
    { icon: Shield, title: t.about.values.reliability.title, description: t.about.values.reliability.description, accent: '#6366F1' },
    { icon: Zap, title: t.about.values.innovation.title, description: t.about.values.innovation.description, accent: '#F59E0B' },
    { icon: Heart, title: t.about.values.support.title, description: t.about.values.support.description, accent: '#EC4899' },
  ];

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
          <div className="inline-flex items-center gap-2 bg-[#00E8E5]/10 border border-[#00E8E5]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00E8E5] animate-pulse" />
            <span className="text-[#00E8E5] text-sm font-medium tracking-wide">{t.about.badge}</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
            {t.about.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════════════════════
          MISSION + VISION — side by side cards
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Mission */}
            <div className="group relative bg-[#001F20] rounded-3xl p-10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E8E5] to-transparent" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#00E8E5] opacity-[0.05] blur-[60px]" />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-[#00E8E5]/10 border border-[#00E8E5]/30 flex items-center justify-center mb-8">
                  <Target className="h-7 w-7 text-[#00E8E5]" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-5">{t.about.mission.title}</h2>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {t.about.mission.content}
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative bg-[#001F20] rounded-3xl p-10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-transparent" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-violet-500 opacity-[0.05] blur-[60px]" />

              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/30 flex items-center justify-center mb-8">
                  <Eye className="h-7 w-7 text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-5">{t.about.vision.title}</h2>
                <p className="text-gray-400 leading-relaxed text-lg">
                  {t.about.vision.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PROBLEM → SOLUTION
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">

            {/* Problem */}
            <div className="relative bg-white border border-gray-200 rounded-3xl p-10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-transparent" />

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <span className="text-red-500 text-xs font-bold uppercase tracking-widest">{t.about.problemLabel}</span>
              </div>

              <h2 className="text-2xl font-bold text-[#001F20] mb-5">
                {t.about.problem.title}
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                {t.about.problem.content}
              </p>

              {/* Visual: scattered icons */}
              <div className="flex gap-3 mt-8">
                {['📊', '📒', '📱', '💻', '📋'].map((e, i) => (
                  <div key={i} className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-lg opacity-60">
                    {e}
                  </div>
                ))}
              </div>
            </div>

            {/* Solution */}
            <div className="relative bg-white border-2 border-[#00E8E5]/30 rounded-3xl p-10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E8E5] to-transparent" />
              <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-[#00E8E5] opacity-[0.05] blur-[60px]" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#00E8E5]/10 border border-[#00E8E5]/30 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-[#00E8E5]" />
                  </div>
                  <span className="text-[#00E8E5] text-xs font-bold uppercase tracking-widest">{t.about.solutionLabel}</span>
                </div>

                <h2 className="text-2xl font-bold text-[#001F20] mb-5">
                  {t.about.solution.title}
                </h2>
                <p className="text-gray-500 leading-relaxed text-lg">
                  {t.about.solution.content}
                </p>

                {/* Visual: unified icon */}
                <div className="flex items-center gap-3 mt-8">
                  <div className="w-10 h-10 rounded-lg bg-[#00E8E5]/10 border border-[#00E8E5]/30 flex items-center justify-center">
                    <span className="text-lg">🟢</span>
                  </div>
                  <span className="text-[#001F20] font-semibold text-sm">{t.about.solutionTagline}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          VALUES
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#00E8E5] text-sm font-semibold uppercase tracking-widest mb-3">{t.about.valuesLabel}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#001F20]">
              {t.about.values.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white border border-gray-200 rounded-2xl p-7 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${value.accent}, transparent)` }}
                  />

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${value.accent}15`, border: `1px solid ${value.accent}30` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: value.accent }} />
                  </div>

                  <h3 className="text-lg font-bold text-[#001F20] mb-3">{value.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{value.description}</p>
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
          <p className="text-[#00E8E5] text-sm font-semibold uppercase tracking-widest mb-4">{t.about.ctaLabel}</p>
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
