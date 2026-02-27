import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Play, Zap, BarChart3, Target, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-glow">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent2/20 blur-[120px] rounded-full animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-10 mt-12 lg:mt-0"
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            {t('hero.kicker')}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-[1.1] lg:leading-[0.95] mb-8 lg:mb-10 tracking-tighter text-gradient"
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-400 leading-relaxed mb-10 lg:mb-12 max-w-3xl mx-auto font-medium"
          >
            {t('hero.lead')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6"
          >
            <Link to="/contact" className="w-full sm:w-auto bg-white text-brand-dark px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-accent hover:text-white transition-all shadow-2xl shadow-white/5 flex items-center justify-center gap-3 group">
              {t('nav.book')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/portfolio" className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-3">
              <Play size={16} fill="currentColor" />
              {t('nav.portfolio')}
            </Link>
            <Link to="/services" className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all flex items-center justify-center gap-3">
              {t('nav.services')}
            </Link>
          </motion.div>

          <div className="mt-20 flex flex-wrap justify-center gap-4">
            {t('hero.points').map((point: string, i: number) => (
              <div key={i} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-300">
                <CheckCircle2 size={14} className="text-brand-accent" />
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Scope Section */}
      <section className="py-32 relative bg-brand-surface/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bento-card p-8 sm:p-12 lg:p-20"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-12 tracking-tight text-center">
                {t('hero.scope.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                {t('hero.scope.items').map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-5 p-5 sm:p-6 rounded-[32px] bg-white/5 border border-white/5 group hover:border-brand-accent/30 transition-all h-full">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all shrink-0 mt-0.5">
                      <CheckCircle2 size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-base sm:text-lg font-bold text-white leading-tight pt-1.5 sm:pt-2">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/contact" className="bg-brand-accent text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-brand-accent/20">
                  {t('nav.book')}
                </Link>
                <Link to="/contact" className="glass border border-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all">
                  {t('nav.audit')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-20 tracking-tight text-center">
            {t('stats.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { val: '30+', label: t('stats.brands') },
              { val: '1000+', label: t('stats.assets') },
              { val: '2+', label: t('stats.years') }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bento-card text-center p-12"
              >
                <div className="text-7xl font-black text-white mb-4 tracking-tighter text-gradient">{stat.val}</div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-32 bg-brand-surface/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-8 tracking-tight">
                {t('whatWeDo.title')}
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 font-medium leading-relaxed">
                {t('whatWeDo.intro')}
              </p>
            </div>
            <Link to="/services" className="bg-white text-brand-dark px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-white transition-all shadow-2xl shadow-white/5">
              {t('nav.services')}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { data: t('whatWeDo.packages'), icon: <Rocket size={24} /> },
              { data: t('whatWeDo.production'), icon: <Zap size={24} /> },
              { data: t('whatWeDo.ads'), icon: <Target size={24} /> }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bento-card p-10 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-brand-accent mb-8 group-hover:bg-brand-accent group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{item.data.title}</h3>
                <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">{item.data.desc}</p>
                <ul className="space-y-4">
                  {item.data.items.map((li: string, j: number) => (
                    <li key={j} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      {li}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-8 tracking-tight">
              {t('howWeWork.title')}
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 font-medium">{t('howWeWork.intro')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {t('howWeWork.steps').map((step: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-[32px] bg-brand-surface border border-white/5 flex flex-col items-center text-center group hover:border-brand-accent/30 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-accent font-black text-xl mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all">
                  {i + 1}
                </div>
                <h4 className="text-lg font-black text-white mb-3 tracking-tight">{step.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                {i < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[48px] overflow-hidden bg-brand-surface border border-white/5 p-12 lg:p-24 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/10 to-transparent pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-8 tracking-tight max-w-4xl mx-auto">
              {t('cta.title')}
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
              {t('cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/contact" className="w-full sm:w-auto bg-white text-brand-dark px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-brand-accent hover:text-white transition-all shadow-2xl shadow-white/5">
                {t('cta.audit')}
              </Link>
              <Link to="/contact" className="w-full sm:w-auto glass border border-white/10 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                {t('cta.book')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
