import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Send, Phone, Calendar, Instagram, Linkedin } from 'lucide-react';

export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === 'Sending...') {
      return;
    }

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      link: String(formData.get('link') ?? ''),
    };

    try {
      setStatus('Sending...');
      const response = await fetch(`${import.meta.env.VITE_LEADS_API_URL}/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to send lead');
      }

      let responseJson: { ok?: boolean } | null = null;
      try {
        responseJson = await response.json();
      } catch {
        responseJson = null;
      }

      if (responseJson?.ok === false) {
        throw new Error('Lead endpoint returned ok=false');
      }

      setStatus('Done.');
      e.currentTarget.reset();
    } catch {
      setStatus('Failed. Please try again.');
    }
  };

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter text-gradient">
            {t('contact.title')}
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed font-medium">
            {t('contact.intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-brand-surface p-6 sm:p-10 rounded-[40px] border border-white/5 shadow-2xl"
            >
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 tracking-tight">{t('contact.audit.title')}</h3>
              <p className="text-slate-400 font-medium mb-10 leading-relaxed">
                {t('contact.audit.desc')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{t('contact.audit.labels.name')}</label>
                    <input 
                      name="name"
                      required
                      className="w-full px-7 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent focus:bg-white/10 transition-all outline-none font-bold text-white placeholder:text-slate-700"
                      placeholder={t('contact.audit.labels.namePlaceholder')}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{t('contact.audit.labels.email')}</label>
                    <input 
                      name="email"
                      required
                      type="email"
                      className="w-full px-7 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent focus:bg-white/10 transition-all outline-none font-bold text-white placeholder:text-slate-700"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{t('contact.audit.labels.company')}</label>
                  <input 
                    name="link"
                    className="w-full px-7 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent focus:bg-white/10 transition-all outline-none font-bold text-white placeholder:text-slate-700"
                    placeholder={t('contact.audit.labels.companyPlaceholder')}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{t('contact.audit.labels.message')}</label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    className="w-full px-7 py-5 rounded-2xl bg-white/5 border border-white/10 focus:border-brand-accent focus:bg-white/10 transition-all outline-none font-bold text-white placeholder:text-slate-700 resize-none"
                    placeholder={t('contact.audit.labels.messagePlaceholder')}
                  />
                </div>
                <div className="flex items-center gap-8 pt-4">
                  <button
                    disabled={status === 'Sending...'}
                    className="bg-brand-accent text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-brand-accent/20 flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {t('contact.audit.labels.send')} <Send size={16} />
                  </button>
                  {status && <span className="text-sm font-black uppercase tracking-widest text-brand-accent">{status}</span>}
                </div>
              </form>
            </motion.div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white text-brand-dark p-6 sm:p-10 rounded-[40px] shadow-2xl"
            >
              <h3 className="text-2xl sm:text-3xl font-black mb-4 tracking-tight">{t('contact.book.title')}</h3>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                {t('contact.book.desc')}
              </p>
              <div className="space-y-5 mb-12">
                {t('contact.book.cover.items').map((item: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 text-sm font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <a 
                  href="https://calendly.com/cerbius/working" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-brand-dark text-white py-5 rounded-2xl text-center font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  <Calendar size={18} /> {t('contact.book.btns.calendar')}
                </a>
                <a 
                  href="tel:+48503413651"
                  className="w-full bg-slate-100 text-brand-dark py-5 rounded-2xl text-center font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
                >
                  <Phone size={18} /> {t('contact.book.btns.call')}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-surface p-10 rounded-[40px] border border-white/5"
            >
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8">{t('contact.socials')}</h4>
              <div className="flex gap-5">
                <a href="https://www.instagram.com/_kairos_team_" className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-brand-accent transition-all duration-300 border border-white/5">
                  <Instagram size={24} />
                </a>
                <a href="https://www.linkedin.com/company/kairos-team/" className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-brand-accent transition-all duration-300 border border-white/5">
                  <Linkedin size={24} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
