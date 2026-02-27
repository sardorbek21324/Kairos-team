import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-brand-dark text-slate-300 pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-accent2 flex items-center justify-center text-white font-bold text-xl">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-lg leading-none text-white">KAIROS TEAM</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{t('footer.location')}</span>
              </div>
            </Link>
            <p className="max-w-md text-slate-400 leading-relaxed mb-8 font-medium">
              {t('footer.desc')}
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-accent/20 transition-colors">
                  <Phone size={18} className="text-slate-400 group-hover:text-brand-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('footer.phone')}</span>
                  <a href="tel:+48503413651" className="font-bold text-white">+48 503 413 651</a>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand-accent/20 transition-colors">
                  <Mail size={18} className="text-slate-400 group-hover:text-brand-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t('footer.email')}</span>
                  <a href="mailto:sardo@kairosteams.com" className="font-bold text-white">sardo@kairosteams.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:items-end justify-between">
            <div className="flex gap-12 mb-10 lg:mb-0">
              <div className="flex flex-col gap-4">
                <span className="text-white font-black text-xs uppercase tracking-widest mb-2">
                  {language === 'ru' ? 'Компания' : language === 'pl' ? 'Firma' : 'Company'}
                </span>
                <Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
                <Link to="/portfolio" className="hover:text-white transition-colors">{t('nav.portfolio')}</Link>
                <Link to="/services" className="hover:text-white transition-colors">{t('nav.services')}</Link>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-white font-black text-xs uppercase tracking-widest mb-2">
                  {language === 'ru' ? 'Поддержка' : language === 'pl' ? 'Wsparcie' : 'Support'}
                </span>
                <Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
                <Link to="/privacy" className="hover:text-white transition-colors">{language === 'ru' ? 'Политика' : language === 'pl' ? 'Prywatność' : 'Privacy'}</Link>
              </div>
            </div>
            
            <div className="flex gap-4 mt-10">
              <a href="https://www.instagram.com/_kairos_team_" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-accent transition-all hover:-translate-y-1">
                <Instagram size={20} className="text-white" />
              </a>
              <a href="https://www.linkedin.com/company/kairos-team/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-accent transition-all hover:-translate-y-1">
                <Linkedin size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 font-medium">
            {t('footer.rights')}
          </p>
          <div className="flex gap-6 text-xs font-bold text-slate-600 uppercase tracking-widest">
            <span>{t('footer.location')}</span>
            <span>Est. 2024</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
