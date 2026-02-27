import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.portfolio'), path: '/portfolio' },
    { name: t('nav.industries'), path: '/industries' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-accent2 shadow-lg shadow-brand-accent/20 flex items-center justify-center text-white font-bold text-xl transition-all group-hover:scale-110 group-hover:rotate-3">
            K
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-lg leading-none text-white">KAIROS TEAM</span>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
              {language === 'ru' ? 'SMM • Контент • Реклама' : 'SMM • Content • Ads'}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4">
          <nav className="flex items-center gap-1 bg-white/5 border border-white/5 rounded-2xl p-1 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === item.path ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center bg-white/5 rounded-2xl p-1 border border-white/5 backdrop-blur-md">
            {(['en', 'pl', 'ru'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-2 rounded-xl text-[10px] font-black transition-all ${language === lang ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <Link to="/contact" className="bg-white text-brand-dark px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all shadow-xl shadow-white/5 block text-center max-w-[200px]">
            {t('nav.book')}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 text-white border border-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-brand-dark/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden lg:hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-4 rounded-2xl text-xl font-bold transition-all ${location.pathname === item.path ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-white/5 my-6" />
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Globe size={14} /> Language
                </span>
                <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5">
                  {(['en', 'pl', 'ru'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-black transition-all ${language === lang ? 'bg-brand-accent text-white shadow-lg' : 'text-slate-500'}`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <Link 
                to="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-white text-brand-dark p-5 rounded-2xl text-center font-black uppercase tracking-widest shadow-xl shadow-white/5"
              >
                {t('nav.book')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
