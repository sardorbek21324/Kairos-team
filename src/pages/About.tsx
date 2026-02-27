import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Zap, BarChart3, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter text-gradient">
            {t('about.title')}
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed font-medium">
            {t('about.intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-surface p-8 sm:p-12 rounded-[48px] border border-white/5"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 tracking-tight">{t('about.approach.title')}</h2>
            <div className="space-y-8">
              {t('about.approach.items').map((item: any, i: number) => (
                <div key={i} className="group">
                  <h4 className="text-xl font-black text-white mb-2 group-hover:text-brand-accent transition-colors">{item.title}</h4>
                  <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-accent text-white p-8 sm:p-12 rounded-[48px] shadow-2xl shadow-brand-accent/20 flex flex-col justify-center"
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-8 tracking-tight">{t('about.why.title')}</h2>
            <p className="text-lg sm:text-xl text-white/90 font-medium leading-relaxed mb-12">
              {t('about.why.desc')}
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-5xl font-black mb-2 tracking-tighter">{t('about.why.stats.growth')}</div>
                <div className="text-xs font-black uppercase tracking-widest text-white/60">{t('about.why.stats.growthLabel')}</div>
              </div>
              <div>
                <div className="text-5xl font-black mb-2 tracking-tighter">{t('about.why.stats.brands')}</div>
                <div className="text-xs font-black uppercase tracking-widest text-white/60">{t('about.why.stats.brandsLabel')}</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-brand-surface rounded-[48px] p-8 sm:p-12 lg:p-24 border border-white/5 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-8 tracking-tight">{t('about.cta.title')}</h2>
          <p className="text-slate-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto font-medium">
            {t('about.cta.desc')}
          </p>
          <Link to="/contact" className="inline-flex bg-white text-brand-dark px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-white transition-all shadow-2xl shadow-white/5 items-center gap-3 group">
            {t('about.cta.button')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
