import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Utensils, ShoppingBag, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Industries() {
  const { t } = useLanguage();

  const icons = [<Utensils size={32} />, <ShoppingBag size={32} />, <Briefcase size={32} />];
  const industries = t('industries.items');

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter text-gradient">
            {t('industries.title')}
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed font-medium">
            {t('industries.intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {industries.map((item: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-surface p-10 rounded-[40px] border border-white/5 shadow-sm hover:shadow-2xl hover:border-white/20 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-brand-accent/10 group-hover:text-brand-accent transition-all duration-500">
                {icons[i] || <Briefcase size={32} />}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">{item.title}</h3>
              <p className="text-brand-accent font-black text-[10px] uppercase tracking-widest mb-6">{item.desc}</p>
              <p className="text-slate-400 mb-10 leading-relaxed font-medium text-sm">{item.text}</p>
              <ul className="space-y-4">
                {item.items.map((f: string, j: number) => (
                  <li key={j} className="flex items-center gap-4 text-xs font-bold text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <section className="bg-brand-surface rounded-[48px] p-8 sm:p-12 lg:p-24 relative overflow-hidden border border-white/5">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/10 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-8 tracking-tight">
              {t('industries.different.title')}
            </h2>
            <p className="text-slate-400 text-lg sm:text-xl mb-12 font-medium">
              {t('industries.different.desc')}
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/contact" className="w-full sm:w-auto bg-white text-brand-dark px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-white transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-3 group">
                {t('nav.audit')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="w-full sm:w-auto glass border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center justify-center">
                {t('nav.book')}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
