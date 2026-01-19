import { Mail, Send } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTriedSubmit(true);
    // validate privacy acceptance
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

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (err) {
      console.error('Contact send error', err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-16">
      <section className="bg-gradient-to-br from-[#001F20] to-[#003840] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t.contact.title}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00E8E5] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00E8E5] focus:outline-none transition-colors"
                    />
                  </div>

                  

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.contact.form.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00E8E5] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex items-start">
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
                      className="h-4 w-4 mt-1 mr-3"
                    />
                    <label htmlFor="accept" className="text-sm text-gray-700">
                      {t.contact.form.acceptPrefix}{' '}
                      <a
                        href={`${window.location.origin}${window.location.pathname}#${language === 'es' ? 'politica-privacidad' : 'politica-privacitat'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00E8E5] underline"
                      >
                        {t.contact.form.acceptLink}
                      </a>
                    </label>
                  </div>

                  {(acceptError || (triedSubmit && !acceptedPrivacy)) && (
                    <div className="text-sm text-red-600">{acceptError || t.contact.form.acceptError}</div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending' || !acceptedPrivacy}
                    aria-disabled={status === 'sending' || !acceptedPrivacy}
                    className="w-full bg-[#00E8E5] text-[#001F20] px-6 py-4 rounded-lg font-semibold text-lg hover:bg-[#00d4d1] transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    title={!acceptedPrivacy ? t.contact.form.acceptError : undefined}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        {t.contact.form.sending}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        {t.contact.form.send}
                      </>
                    )}
                  </button>

                  {status === 'success' && (
                    <div className="bg-green-50 border-2 border-green-500 text-green-700 px-4 py-3 rounded-lg">
                      {t.contact.form.success}
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg">
                      {t.contact.form.error}
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#001F20] to-[#003840] p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-6">{t.contact.info.title}</h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#00E8E5] p-3 rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-[#001F20]" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{t.contact.info.email}</h4>
                      <a
                        href={`mailto:${t.contact.info.emailValue}`}
                        className="text-[#00E8E5] hover:underline"
                      >
                        {t.contact.info.emailValue}
                      </a>
                    </div>
                  </div>

                  {/* Horario de atención removido por solicitud del usuario */}
                </div>
              </div>

              {/* CTA removed per request: 'Únete a cientos...' and 'Acceder' */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
