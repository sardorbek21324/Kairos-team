import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MouseEvent, ReactNode } from 'react';
import { Phone } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Industries from './pages/Industries';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AppContent() {
  const { isChanging, t } = useLanguage();
  const { pathname } = useLocation();
  const phoneHref = 'tel:+48503413651';

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
      <Header />
      {pathname !== '/' && (
        <a
          href={phoneHref}
          onClick={handleCallClick}
          className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-2xl bg-brand-accent px-5 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-2xl shadow-brand-accent/30 transition-all hover:bg-blue-600"
        >
          <Phone size={18} />
          {t('contact.book.btns.call')}
        </a>
      )}
      <main className="flex-grow">
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
