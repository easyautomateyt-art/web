import { Mail, Send, Loader2, MessageSquare, Clock, Shield } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptError, setAcceptError] = useState('');
  const [triedSubmit, setTriedSubmit] = useState(false);

  const base = language === 'es' ? '/es' : language === 'ca' ? '/ca' : '/en';
  const privacySlug = language === 'es' ? 'politica-privacidad' : language === 'ca' ? 'politica-privacitat' : 'privacy-policy';
  const privacyPath = `${base}/${privacySlug}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTriedSubmit(true);
    if (!acceptedPrivacy) {
      setAcceptError(t.contact.form.acceptError);
      return;
    }
    setAcceptError('');
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, accept: acceptedPrivacy }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error('Contact send failed', data);
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Contact send error', err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-16 overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#001F20] py-24 md:py-32 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#00E8E5] opacity-[0.06] blur-[120px] pointer-events-none" />

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
            <span className="text-[#00E8E5] text-sm font-medium tracking-wide">{t.contact.badge}</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
            {t.contact.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════════════════════
          FORM + SIDEBAR
      ════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ─── Form ──────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#001F20] mb-2">
                      {t.contact.form.name} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[#001F20] placeholder-gray-400 focus:outline-none focus:border-[#00E8E5] focus:ring-2 focus:ring-[#00E8E5]/20 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#001F20] mb-2">
                      {t.contact.form.email} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[#001F20] placeholder-gray-400 focus:outline-none focus:border-[#00E8E5] focus:ring-2 focus:ring-[#00E8E5]/20 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#001F20] mb-2">
                      {t.contact.form.message} <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      rows={6}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[#001F20] placeholder-gray-400 focus:outline-none focus:border-[#00E8E5] focus:ring-2 focus:ring-[#00E8E5]/20 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Privacy checkbox */}
                  <div className="flex items-start gap-3">
                    <input
                      id="accept"
                      name="accept"
                      type="checkbox"
                      checked={acceptedPrivacy}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setAcceptedPrivacy(checked);
                        if (checked) setAcceptError('');
                      }}
                      className="h-4 w-4 mt-1 rounded border-gray-300 text-[#00E8E5] focus:ring-[#00E8E5]"
                    />
                    <label htmlFor="accept" className="text-sm text-gray-500">
                      {t.contact.form.acceptPrefix}{' '}
                      <Link
                        to={privacyPath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00E8E5] underline hover:text-[#00d4d1] font-medium"
                      >
                        {t.contact.form.acceptLink}
                      </Link>
                    </label>
                  </div>

                  {(acceptError || (triedSubmit && !acceptedPrivacy)) && (
                    <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                      {acceptError || t.contact.form.acceptError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending' || !acceptedPrivacy}
                    aria-disabled={status === 'sending' || !acceptedPrivacy}
                    className="w-full group bg-[#00E8E5] text-[#001F20] px-6 py-4 rounded-xl font-bold text-lg hover:bg-[#001F20] hover:text-[#00E8E5] transition-all duration-200 shadow-[0_0_30px_rgba(0,232,229,0.2)] hover:shadow-[0_0_40px_rgba(0,232,229,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#00E8E5] disabled:hover:text-[#001F20] disabled:shadow-none flex items-center justify-center gap-2"
                    title={!acceptedPrivacy ? t.contact.form.acceptError : undefined}
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5" />
                        {t.contact.form.sending}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        {t.contact.form.send}
                      </>
                    )}
                  </button>

                  {status === 'success' && (
                    <div className="bg-emerald-50 border border-emerald-300 text-emerald-700 px-5 py-4 rounded-xl text-sm font-medium">
                      {t.contact.form.success}
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="bg-red-50 border border-red-300 text-red-700 px-5 py-4 rounded-xl text-sm font-medium">
                      {t.contact.form.error}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* ─── Sidebar ───────────────────────────────────── */}
            <div className="space-y-6">

              {/* Contact info card */}
              <div className="bg-[#001F20] rounded-3xl p-8 overflow-hidden relative">
                <div className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full bg-[#00E8E5] opacity-[0.06] blur-[40px]" />

                <div className="relative">
                  <h3 className="text-lg font-bold text-white mb-6">{t.contact.info.title}</h3>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00E8E5]/10 border border-[#00E8E5]/30 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-[#00E8E5]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-1">{t.contact.info.email}</p>
                      <a
                        href={`mailto:${t.contact.info.emailValue}`}
                        className="text-[#00E8E5] hover:text-white transition-colors font-medium"
                      >
                        {t.contact.info.emailValue}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick promises */}
              <div className="space-y-4">
                {[
                  { icon: MessageSquare, text: t.contact.promise1, accent: '#00E8E5' },
                  { icon: Clock, text: t.contact.promise2, accent: '#6366F1' },
                  { icon: Shield, text: t.contact.promise3, accent: '#10B981' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.accent}12`, border: `1px solid ${item.accent}30` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: item.accent }} />
                      </div>
                      <p className="text-[#001F20] font-medium text-sm">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
