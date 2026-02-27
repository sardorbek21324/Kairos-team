import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingCallButton from './components/FloatingCallButton';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Industries from './pages/Industries';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

function AppContent() {
  const { isChanging } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed inset-0 noise opacity-[0.03] pointer-events-none z-[100]" />
      <ScrollToTop />
      <Header />
      <main className="flex-grow pb-20 sm:pb-24 md:pb-0">
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
      <FloatingCallButton />
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
