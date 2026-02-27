import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, Instagram, MapPin, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell,
  Tooltip,
  XAxis,
  ReferenceLine
} from 'recharts';

const CaseChart = ({ data, label, growthText }: { data: any[], label: string, growthText?: string }) => {
  return (
    <div className="w-full h-56 sm:h-64 mt-6 sm:mt-8 mb-6 bg-white/5 rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 border border-white/5 overflow-hidden group/chart flex flex-col">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex flex-col">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-1">
            <TrendingUp size={10} className="text-brand-accent" />
            {label}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
            {growthText}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 800, textTransform: 'uppercase' }} 
              dy={10}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-brand-dark/95 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl shadow-2xl max-w-[200px]">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-accent mb-1">
                        {payload[0].payload.name}
                      </p>
                      <p className="text-sm font-bold text-white leading-tight">
                        {payload[0].payload.tooltip}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" />
            <Bar dataKey="value" radius={[6, 6, 6, 6]} maxBarSize={60} animationDuration={1500}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === data.length - 1 ? '#00FF00' : '#334155'} 
                  className="transition-all duration-500 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const { t } = useLanguage();

  const cases = t('portfolio.cases');

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-20"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter text-gradient">
            {t('portfolio.title')}
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed font-medium">
            {t('portfolio.intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-20 sm:mb-32">
          {cases.map((item: any, i: number) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-surface rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 border border-white/5 shadow-sm hover:shadow-2xl hover:border-white/20 transition-all duration-500 flex flex-col group"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight group-hover:text-brand-accent transition-colors">{item.name}</h3>
              <p className="text-slate-400 font-medium mb-8 sm:mb-10 leading-relaxed text-sm sm:text-lg">{item.title}</p>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12">
                {item.links.site && (
                  <a 
                    href={item.links.site.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white hover:bg-white hover:text-brand-dark transition-all duration-300"
                  >
                    <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px]" />
                    {item.links.site.label}
                  </a>
                )}
                {item.links.ig && (
                  <a 
                    href={item.links.ig.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white hover:bg-white hover:text-brand-dark transition-all duration-300"
                  >
                    <Instagram size={12} className="sm:w-[14px] sm:h-[14px]" />
                    {item.links.ig.label}
                  </a>
                )}
                {item.links.map && (
                  <a 
                    href={item.links.map.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white hover:bg-white hover:text-brand-dark transition-all duration-300"
                  >
                    <MapPin size={12} className="sm:w-[14px] sm:h-[14px]" />
                    {item.links.map.label}
                  </a>
                )}
              </div>

              {item.chart && (
                <CaseChart data={item.chart.data} label={item.chart.label} growthText={item.chart.growthText} />
              )}

              <ul className="space-y-4 mb-12">
                {item.items.map((li: string, j: number) => (
                  <li key={j} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    {li}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10 border-t border-white/5">
                <div className="flex flex-wrap gap-3">
                  {item.results.map((res: string, j: number) => (
                    <span key={j} className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest ${j % 2 === 0 ? 'bg-brand-accent/10 text-brand-accent' : 'bg-brand-accent2/10 text-brand-accent2'}`}>
                      {res}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Other Brands */}
        <div className="mb-20 sm:mb-32">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-8 sm:mb-12 tracking-tight">{t('portfolio.otherBrands.title')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {t('portfolio.otherBrands.items').map((brand: string, i: number) => (
              <div key={i} className="bg-brand-surface p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/5 text-center font-black uppercase tracking-widest text-[9px] sm:text-xs text-slate-400 flex items-center justify-center min-h-[60px] sm:min-h-[100px]">
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Similar CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[48px] overflow-hidden bg-brand-surface border border-white/5 p-8 sm:p-12 lg:p-24 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/10 to-transparent pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-8 tracking-tight max-w-4xl mx-auto">
            {t('portfolio.similar.title')}
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
            {t('portfolio.similar.desc')}
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
