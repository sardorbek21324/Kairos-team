import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MouseEvent, ReactNode } from 'react';
import { Mail, Phone } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PromoCountdownBanner from './components/PromoCountdownBanner';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Industries from './pages/Industries';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AppContent() {
  const { isChanging, language, t } = useLanguage();
  const { pathname } = useLocation();
  const phoneHref = 'tel:+48503413651';

  const emailHref = 'mailto:sardo@kairosteams.com';
  const mobileCtaCopy = {
    en: { call: 'Call now', email: 'Email us' },
    pl: { call: 'Zadzwoń', email: 'Napisz email' },
    ru: { call: 'Позвонить', email: 'Написать email' }
  } as const;
  const mobileCta = mobileCtaCopy[language];

  const handleCallClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion(phoneHref);
      return;
    }

    window.location.href = phoneHref;
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 noise opacity-[0.03] pointer-events-none z-[100]" />
      <ScrollToTop />
      <PromoCountdownBanner />
      <Header />
      {pathname !== '/' && (
        <a
          href={phoneHref}
          onClick={handleCallClick}
          className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-2xl bg-brand-accent px-5 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-2xl shadow-brand-accent/30 transition-all hover:bg-blue-600 sm:inline-flex"
        >
          <Phone size={18} />
          {t('contact.book.btns.call')}
        </a>
      )}

      <div className="fixed inset-x-4 bottom-4 z-[210] sm:hidden">
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/15 bg-brand-surface/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-md">
          <a
            href={phoneHref}
            onClick={handleCallClick}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-accent px-3 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white"
          >
            <Phone size={14} />
            {mobileCta.call}
          </a>
          <a
            href={emailHref}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white"
          >
            <Mail size={14} />
            {mobileCta.email}
          </a>
        </div>
      </div>

      <main className="flex-grow pb-24 sm:pb-0">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isChanging ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<RouteTransition><Services /></RouteTransition>} />
            <Route path="/portfolio" element={<RouteTransition><Portfolio /></RouteTransition>} />
            <Route path="/industries" element={<RouteTransition><Industries /></RouteTransition>} />
            <Route path="/about" element={<RouteTransition><About /></RouteTransition>} />
            <Route path="/contact" element={<RouteTransition><Contact /></RouteTransition>} />
            <Route path="/privacy" element={<RouteTransition><Privacy /></RouteTransition>} />
          </Routes>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

// Helper to keep page transitions smooth
function RouteTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
