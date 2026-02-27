import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Services() {
  const { t } = useLanguage();

  const packageKeys = ['starter', 'growth', 'performance'];

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter text-gradient">
            {t('services.title')}
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed font-medium">
            {t('services.intro')}
          </p>
        </motion.div>

        <div className="mb-32">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">{t('services.retainerTitle')}</h2>
            <p className="text-slate-400 font-medium">{t('services.retainerIntro')}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packageKeys.map((key, i) => {
              const pkg = t(`services.${key}`);
              const isPopular = key === 'growth';
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative p-10 rounded-[40px] border transition-all duration-500 flex flex-col ${isPopular ? 'bg-brand-accent text-white border-brand-accent shadow-2xl shadow-brand-accent/20 lg:scale-105 z-10' : 'bg-brand-surface text-white border-white/5 shadow-sm hover:border-white/20'}`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-brand-accent px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-10">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${isPopular ? 'bg-white/20 text-white' : 'bg-brand-accent/10 text-brand-accent'}`}>
                      {pkg.tag}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black mt-6 tracking-tight capitalize">{key}</h3>
                  </div>
                  <p className={`mb-10 leading-relaxed font-medium text-sm ${isPopular ? 'text-white/80' : 'text-slate-400'}`}>
                    {pkg.title}
                  </p>
                  <ul className="space-y-5 mb-12 flex-grow">
                    {pkg.items.map((f: string, j: number) => (
                      <li key={j} className="flex items-start gap-4 text-xs font-bold">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isPopular ? 'bg-white' : 'bg-brand-accent'}`} />
                        <span className={isPopular ? 'text-white' : 'text-slate-300'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/contact" 
                    className={`block w-full py-5 rounded-2xl text-center font-black uppercase tracking-widest text-xs transition-all ${isPopular ? 'bg-white text-brand-accent hover:bg-slate-100' : 'bg-brand-accent text-white hover:bg-blue-600 shadow-lg shadow-brand-accent/20'}`}
                  >
                    {t('nav.book')}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Production Services */}
        <div className="mb-32">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">{t('services.productionTitle')}</h2>
            <p className="text-slate-400 font-medium">{t('services.productionIntro')}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {t('services.prodItems').map((item: any, i: number) => (
              <Link 
                key={i}
                to="/contact"
                className="block group"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-brand-surface p-8 sm:p-10 rounded-[40px] border border-white/5 group-hover:border-brand-accent/30 transition-all duration-500 flex flex-col h-full"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-8 gap-6">
                    <div className="flex-grow">
                      <h4 className="font-black text-xl sm:text-2xl text-white mb-3 tracking-tight leading-tight group-hover:text-brand-accent transition-colors">{item.title}</h4>
                      <p className="text-brand-accent font-black text-[10px] sm:text-xs uppercase tracking-widest">{item.desc}</p>
                    </div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-brand-accent group-hover:text-white transition-all duration-500 shrink-0">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                  <ul className="space-y-4 mt-auto">
                    {item.items.map((li: string, j: number) => (
                      <li key={j} className="flex items-start gap-3 text-xs font-bold text-slate-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{li}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div className="mb-32">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">{t('services.additionalTitle')}</h2>
            <p className="text-slate-400 font-medium">{t('services.additionalIntro')}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {['social', 'ads', 'design'].map((key, i) => {
              const data = t(`services.${key}`);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bento-card p-10"
                >
                  <h3 className="text-2xl font-black text-white mb-8 tracking-tight">{data.title}</h3>
                  <ul className="space-y-5">
                    {data.items.map((li: string, j: number) => (
                      <li key={j} className="flex items-start gap-4 text-xs font-bold text-slate-400">
                        <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
                        {li}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Tailored CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[48px] overflow-hidden bg-brand-surface border border-white/5 p-8 sm:p-12 lg:p-24 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/10 to-transparent pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-8 tracking-tight max-w-4xl mx-auto">
            {t('services.tailored.title')}
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
            {t('services.tailored.desc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="w-full sm:w-auto bg-white text-brand-dark px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-brand-accent hover:text-white transition-all shadow-2xl shadow-white/5">
              {t('nav.audit')}
            </Link>
            <Link to="/contact" className="w-full sm:w-auto glass border border-white/10 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
              {t('nav.book')}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
