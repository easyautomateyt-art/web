import { useMemo, useEffect, useRef, useState } from 'react'; // eslint-disable-line
import {
  Calendar, Package, FileText, Database,
  CheckCircle, Cloud, HeadphonesIcon, RefreshCw,
  Clock, CreditCard, ArrowRight, Zap,
  TrendingUp, Users, ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

/* ─── Static data (language-agnostic) ─────────────────────────────────── */

const INDUSTRY_PATHS = ['peluquerias', 'restaurantes', 'estetica', 'carnicerias', 'panaderias'];
const INDUSTRY_EMOJIS = ['✂️', '🍽️', '💆', '🥩', '🍞'];
const INDUSTRY_KEYS = ['hairSalons', 'restaurants', 'beautyCenters', 'butcherShops', 'bakeries'] as const;

const FEATURES_CONFIG = [
  { icon: Calendar, key: 'reservations' as const, accent: '#00E8E5', bg: 'from-cyan-500/20 to-teal-600/10' },
  { icon: Package, key: 'orders' as const, accent: '#6366F1', bg: 'from-indigo-500/20 to-blue-600/10' },
  { icon: FileText, key: 'invoicing' as const, accent: '#10B981', bg: 'from-emerald-500/20 to-green-600/10' },
  { icon: Database, key: 'stock' as const, accent: '#F59E0B', bg: 'from-amber-500/20 to-orange-600/10' },
  { icon: Clock, key: 'timeControl' as const, accent: '#8B5CF6', bg: 'from-violet-500/20 to-purple-600/10' },
  { icon: CreditCard, key: 'accounting' as const, accent: '#EC4899', bg: 'from-pink-500/20 to-rose-600/10' },
];

const BENEFITS_CONFIG = [
  { icon: CheckCircle, key: 'easy' as const },
  { icon: Cloud, key: 'cloud' as const },
  { icon: HeadphonesIcon, key: 'support' as const },
  { icon: RefreshCw, key: 'updates' as const },
];

/* ─── Intersection observer hook ─────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Main component ──────────────────────────────────────────────────── */
export default function Home() {
  const { t, language } = useLanguage();
  const base = language === 'es' ? '/es' : language === 'ca' ? '/ca' : '/en';
  const contactSlug = language === 'es' ? 'contacto' : language === 'ca' ? 'contacte' : 'contact';
  const servicesSlug = language === 'es' ? 'servicios' : language === 'ca' ? 'serveis' : 'services';
  const contactPath = `${base}/${contactSlug}`;

  const { ref: featuresRef } = useInView(0.1);

  const features = useMemo(() => FEATURES_CONFIG.map(({ icon, key, accent, bg }) => ({
    icon, accent, bg,
    title: t.home.features[key].title,
    description: t.home.features[key].description,
  })), [t]);

  const benefits = useMemo(() => BENEFITS_CONFIG.map(({ icon, key }) => ({
    icon,
    title: t.home.benefits[key].title,
    description: t.home.benefits[key].description,
  })), [t]);

  const steps = useMemo(() => [
    { num: '01', icon: Zap, title: t.home.process.steps.s1.title, desc: t.home.process.steps.s1.desc },
    { num: '02', icon: Users, title: t.home.process.steps.s2.title, desc: t.home.process.steps.s2.desc },
    { num: '03', icon: TrendingUp, title: t.home.process.steps.s3.title, desc: t.home.process.steps.s3.desc },
  ], [t]);

  const industries = useMemo(() => INDUSTRY_KEYS.map((key, i) => ({
    emoji: INDUSTRY_EMOJIS[i],
    path: INDUSTRY_PATHS[i],
    name: t.home.industries.items[key].name,
    desc: t.home.industries.items[key].desc,
  })), [t]);

  return (
    <div className="pt-16 overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════
          HERO — gradient mesh + floating stats cards
      ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center bg-[#001F20] overflow-hidden">

        {/* Ambient gradient orbs */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#00E8E5] opacity-[0.07] blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-teal-400 opacity-[0.06] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-cyan-500 opacity-[0.05] blur-[100px] pointer-events-none" />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#00E8E5 1px, transparent 1px), linear-gradient(90deg, #00E8E5 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#00E8E5]/10 border border-[#00E8E5]/30 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00E8E5] animate-pulse" />
                <span className="text-[#00E8E5] text-sm font-medium tracking-wide">{t.home.hero.badge}</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
                {t.home.hero.titleLine1}<br />
                <span className="relative">
                  <span className="text-[#00E8E5]">{t.home.hero.titleHighlight}</span>
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#00E8E5] to-transparent opacity-60" />
                </span>
                <br />{t.home.hero.titleLine2}
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-lg">
                {t.home.hero.description}
                <span className="text-white font-medium"> {t.home.hero.descriptionBold}</span> {t.home.hero.descriptionEnd}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={contactPath}
                  className="group inline-flex items-center justify-center gap-2 bg-[#00E8E5] text-[#001F20] px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all duration-200 shadow-[0_0_30px_rgba(0,232,229,0.3)] hover:shadow-[0_0_40px_rgba(0,232,229,0.5)]"
                >
                  {t.home.hero.ctaPrimary}
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={`${base}/${servicesSlug}`}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/5 hover:border-[#00E8E5]/50 transition-all duration-200"
                >
                  {t.home.hero.ctaModules}
                </Link>
              </div>

            </div>

            {/* Right — floating dashboard mockup */}
            <div className="relative hidden lg:block">
              {/* Main card */}
              <div className="relative bg-gradient-to-br from-[#002A2B] to-[#001F20] border border-white/10 rounded-2xl p-6 shadow-2xl">
                {/* Top bar */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <div className="flex-1 bg-white/5 rounded-md h-6 ml-2" />
                </div>

                {/* Fake calendar grid */}
                <div className="mb-4">
                  <p className="text-[#00E8E5] text-xs font-semibold uppercase tracking-widest mb-3">{t.home.hero.dashTitle}</p>
                  <div className="space-y-2">
                    {[
                      { time: '10:00', name: 'María G.', service: 'Corte + color', color: 'bg-[#00E8E5]' },
                      { time: '11:30', name: 'Carlos M.', service: 'Barba clásica', color: 'bg-violet-400' },
                      { time: '13:00', name: 'Laura P.', service: 'Mechas babylights', color: 'bg-emerald-400' },
                      { time: '16:00', name: 'Ana S.', service: 'Manicura gel', color: 'bg-amber-400' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2.5">
                        <div className={`w-1 h-8 rounded-full ${item.color}`} />
                        <div className="flex-shrink-0 text-gray-400 text-xs w-10">{item.time}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white text-sm font-medium truncate">{item.name}</div>
                          <div className="text-gray-500 text-xs truncate">{item.service}</div>
                        </div>
                        <div className="text-emerald-400 text-xs font-semibold">✓</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: t.home.hero.dashStat1, val: '12', color: 'text-[#00E8E5]' },
                    { label: t.home.hero.dashStat2, val: '486€', color: 'text-emerald-400' },
                    { label: t.home.hero.dashStat3, val: '0', color: 'text-violet-400' },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-2.5 text-center">
                      <div className={`text-lg font-bold ${s.color}`}>{s.val}</div>
                      <div className="text-gray-500 text-[10px] mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating notification card */}
              <div className="absolute -top-5 -right-5 bg-[#002A2B] border border-[#00E8E5]/30 rounded-xl p-3.5 shadow-xl flex items-center gap-3 w-56">
                <div className="w-9 h-9 rounded-full bg-[#00E8E5]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📲</span>
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{t.home.hero.notifTitle}</p>
                  <p className="text-gray-400 text-[10px]">WhatsApp → María G.</p>
                </div>
              </div>

              {/* Floating payment card */}
              <div className="absolute -bottom-5 -left-5 bg-[#002A2B] border border-emerald-500/30 rounded-xl p-3.5 shadow-xl flex items-center gap-3 w-52">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">💳</span>
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{t.home.hero.paymentTitle}</p>
                  <p className="text-emerald-400 text-xs font-bold">+68,00 €</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════════════════════
          FEATURES — 6-up grid with accent colors
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#00E8E5] text-sm font-semibold uppercase tracking-widest mb-3">{t.home.features.label}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#001F20] mb-4">
              {t.home.features.title}
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              {t.home.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group relative bg-gradient-to-br ${feature.bg} border border-white rounded-2xl p-7 hover:border-opacity-50 hover:shadow-xl transition-all duration-300 overflow-hidden`}
                  style={{ '--accent': feature.accent } as React.CSSProperties}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${feature.accent}, transparent)` }}
                  />

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${feature.accent}20`, border: `1px solid ${feature.accent}40` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: feature.accent }} />
                  </div>

                  <h3 className="text-xl font-bold text-[#001F20] mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{feature.description}</p>

                  <div className="mt-5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Link
                      to={`${base}/${servicesSlug}`}
                      className="text-sm font-semibold"
                      style={{ color: feature.accent }}
                    >
                      {t.home.features.seeMore}
                    </Link>
                    <ChevronRight className="h-4 w-4" style={{ color: feature.accent }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          HOW IT WORKS — 3 steps
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#001F20] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00E8E5 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#00E8E5] text-sm font-semibold uppercase tracking-widest mb-3">{t.home.process.label}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t.home.process.title}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t.home.process.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-[#00E8E5]/30 to-transparent" />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-[#00E8E5]/10 border border-[#00E8E5]/30 flex items-center justify-center">
                      <Icon className="h-9 w-9 text-[#00E8E5]" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#001F20] border border-[#00E8E5]/50 flex items-center justify-center">
                      <span className="text-[#00E8E5] text-[10px] font-black">{step.num}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <Link
              to={contactPath}
              className="group inline-flex items-center justify-center gap-2 bg-[#00E8E5] text-[#001F20] px-8 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all duration-200 shadow-[0_0_30px_rgba(0,232,229,0.3)] hover:shadow-[0_0_40px_rgba(0,232,229,0.5)]"
            >
              {t.home.process.ctaButton}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-gray-500 text-sm mt-3">{t.home.process.ctaNote}</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          INDUSTRIES
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#00E8E5] text-sm font-semibold uppercase tracking-widest mb-3">{t.home.industries.label}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#001F20] mb-4">
              {t.home.industries.title}
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              {t.home.industries.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.map((ind, i) => (
              <Link
                key={i}
                to={`${base}/${servicesSlug}/${ind.path}`}
                className="group bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-[#00E8E5] hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200 inline-block">{ind.emoji}</div>
                <h3 className="font-bold text-[#001F20] mb-1 text-sm">{ind.name}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{ind.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BENEFITS — why OneReserve
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — visual */}
            <div className="relative order-2 lg:order-1">
              <div className="bg-gradient-to-br from-[#001F20] to-[#003840] rounded-3xl p-8 shadow-2xl">
                <p className="text-[#00E8E5] text-xs font-semibold uppercase tracking-widest mb-6">{t.home.benefits.panelTitle}</p>

                {/* Revenue chart mockup */}
                <div className="mb-6">
                  <div className="flex items-end justify-between gap-1 h-24">
                    {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm transition-all"
                        style={{ height: `${h}%`, background: i === 11 ? '#00E8E5' : `rgba(0,232,229,${0.2 + h / 300})` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600 text-[10px]">{t.home.benefits.monthStart}</span>
                    <span className="text-gray-600 text-[10px]">{t.home.benefits.monthEnd}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: t.home.benefits.metric1, val: '12.480€', up: true },
                    { label: t.home.benefits.metric2, val: '94%', up: true },
                    { label: t.home.benefits.metric3, val: '62€', up: false },
                    { label: t.home.benefits.metric4, val: '38', up: true },
                  ].map((m, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3">
                      <div className="text-gray-400 text-[10px] mb-1">{m.label}</div>
                      <div className="text-white font-bold text-lg">{m.val}</div>
                      <div className={`text-[10px] font-semibold ${m.up ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {m.up ? '↑' : '→'} {t.home.benefits.vsLastMonth}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — benefits list */}
            <div className="order-1 lg:order-2">
              <p className="text-[#00E8E5] text-sm font-semibold uppercase tracking-widest mb-3">{t.home.benefits.label}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#001F20] mb-6">
                {t.home.benefits.title}
              </h2>
              <p className="text-xl text-gray-500 mb-10">{t.home.benefits.subtitle}</p>

              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex gap-5 items-start group">
                      <div className="w-12 h-12 rounded-xl bg-[#001F20] border border-[#00E8E5]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#00E8E5] group-hover:bg-[#00E8E5]/10 transition-all duration-300">
                        <Icon className="h-5 w-5 text-[#00E8E5]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#001F20] mb-1">{benefit.title}</h3>
                        <p className="text-gray-500 leading-relaxed text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA — final
      ════════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#001F20] overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00E8E5] opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#00E8E5] text-sm font-semibold uppercase tracking-widest mb-4">{t.home.cta.label}</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t.home.cta.title}
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            {t.home.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={contactPath}
              className="group inline-flex items-center justify-center gap-2 bg-[#00E8E5] text-[#001F20] px-10 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all duration-200 shadow-[0_0_40px_rgba(0,232,229,0.25)] hover:shadow-[0_0_60px_rgba(0,232,229,0.4)]"
            >
              {t.common.contactNow}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-gray-600 text-sm mt-6">{t.common.noCommitment}</p>
        </div>
      </section>
    </div>
  );
}
