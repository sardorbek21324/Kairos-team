import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Phone, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SHOW_DELAY_MS = 15000;
const COUNTDOWN_SECONDS = 5 * 60;
const DISMISS_STORAGE_KEY = 'kairos-promo-banner-dismissed';

const promoCopy = {
  en: {
    badge: 'Limited offer',
    title: 'Get 30% off if you call us right now',
    desc: 'The offer is active only during this countdown. Call now and lock your discount.',
    cta: 'Call now',
    timerLabel: 'Offer expires in'
  },
  pl: {
    badge: 'Oferta limitowana',
    title: 'Otrzymaj 30% zniżki, jeśli zadzwonisz teraz',
    desc: 'Oferta działa tylko podczas tego odliczania. Zadzwoń i zarezerwuj rabat.',
    cta: 'Zadzwoń teraz',
    timerLabel: 'Oferta kończy się za'
  },
  ru: {
    badge: 'Ограниченное предложение',
    title: 'Получите скидку 30%, если позвоните прямо сейчас',
    desc: 'Предложение действует только во время этого таймера. Позвоните сейчас и зафиксируйте скидку.',
    cta: 'Позвонить сейчас',
    timerLabel: 'До конца акции'
  }
} as const;

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export default function PromoCountdownBanner() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const copy = useMemo(() => promoCopy[language], [language]);
  const phoneHref = 'tel:+48503413651';

  const handleCallClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
      (window as any).gtag_report_conversion(phoneHref);
      return;
    }

    window.location.href = phoneHref;
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const isDismissed = sessionStorage.getItem(DISMISS_STORAGE_KEY) === 'true';
    if (isDismissed) {
      return;
    }

    const showTimer = window.setTimeout(() => {
      setIsOpen(true);
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!isOpen || secondsLeft <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isOpen, secondsLeft]);

  const closeBanner = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(DISMISS_STORAGE_KEY, 'true');
    }

    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[220] flex items-end justify-center bg-[#05070A]/65 p-4 backdrop-blur-sm sm:items-center"
        >
          <motion.aside
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative w-full max-w-xl overflow-hidden rounded-[30px] border border-white/15 bg-brand-surface p-6 shadow-2xl shadow-black/40 sm:p-8"
          >
            <button
              type="button"
              onClick={closeBanner}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              aria-label="Close promo banner"
            >
              <X size={18} />
            </button>

            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-accent via-brand-accent2 to-brand-accent" />

            <div className="mb-5 inline-flex items-center rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-brand-accent">
              {copy.badge}
            </div>

            <h3 className="max-w-md text-2xl font-black tracking-tight text-white sm:text-3xl">
              {copy.title}
            </h3>
            <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-slate-300">
              {copy.desc}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">{copy.timerLabel}</p>
              <p className="mt-2 text-4xl font-black tracking-[0.08em] text-white">{formatTime(secondsLeft)}</p>
            </div>

            <motion.a
              href={phoneHref}
              onClick={handleCallClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{ boxShadow: ['0 0 0 rgba(59,130,246,0.35)', '0 0 28px rgba(59,130,246,0.65)', '0 0 0 rgba(59,130,246,0.35)'] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatType: 'loop' }}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-accent px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition-colors hover:bg-blue-600"
            >
              <Phone size={18} />
              {copy.cta}
            </motion.a>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
