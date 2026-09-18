import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiHeart, FiTrendingUp, FiCheckCircle } from 'react-icons/fi';

export default function About() {
  const { t } = useTranslation('about');

  return (
    <div className="bg-amber-50/30 overflow-hidden">

      {/* ── Hero Section ── */}
      <section className="relative py-20 lg:py-32 bg-[var(--color-choco-900)] text-amber-50 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1558980394-0a37b69789ce?w=1600&fit=crop')] bg-cover bg-center mix-blend-overlay" />
        <div className="container-main relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl mb-6 text-white"
          >
            {t('about.title', 'Our Story,')} <br className="hidden sm:block" />
            <span className="text-amber-500">{t('about.subtitle', 'Baked Fresh')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-amber-200/80 leading-relaxed max-w-2xl mx-auto"
          >
            {t('about.description', 'From a tiny home kitchen in 2019 to the city\'s favorite artisan bakery, our mission has always remained the same: spreading joy through authentic, handcrafted bakes.')}
          </motion.p>
        </div>
      </section>

      {/* ── Content Section ── */}
      <section className="container-main py-16 lg:py-24 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-choco-900)] mb-6">{t('about.philosophyTitle', 'The Crumbelle Philosophy')}</h2>
            <div className="space-y-6 text-[var(--color-choco-600)] text-lg leading-relaxed">
              <p>{t('about.p1', "We believe that baking is an honest profession. It requires patience, precision, and an unwavering commitment to quality. That's why we don't take shortcuts.")}</p>
              <p>{t('about.p2', "Every morning, our master bakers arrive at 4 AM to start the ovens. Our sourdough starters are fed with care, our butter is folded meticulously for those perfect flaky layers, and our cakes are frosted just hours before they reach your celebrations.")}</p>
              <p>{t('about.p3', "We source local, organic flour wherever possible and insist on using real Belgian couverture chocolate instead of synthetic compounds.")}</p>
              <strong className="block font-display text-2xl text-amber-600 mt-4 italic">{t('about.quote', '"You can taste the love."')}</strong>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-[400px] sm:h-[600px] w-full isolate">
            <div className="absolute inset-0 bg-amber-500 rounded-[3rem] -rotate-3 z-0" />
            <img src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=1000&max-h=1200&fit=crop" alt="Baker decorating cake" className="absolute inset-0 w-full h-full object-cover rounded-[3rem] z-10 shadow-xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500" />
            <div className="absolute -bottom-6 left-4 sm:-bottom-8 sm:-left-8 bg-white p-4 sm:p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-rose-500"><FiHeart size={28} /></div>
              <div>
                <p className="font-bold text-2xl text-[var(--color-choco-900)]">{t('about.handcrafted', '100%')}</p>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mt-1">{t('about.handcraftedSub', 'Handcrafted')}</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Values Grid ── */}
      <section className="bg-white py-16 lg:py-24 border-t border-amber-100">
        <div className="container-main max-w-6xl">
          <h2 className="text-center font-display font-bold text-3xl sm:text-4xl text-[var(--color-choco-900)] mb-16">{t('about.valuesTitle', 'What We Stand For')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex justify-center items-center shadow-sm text-amber-500 mx-auto mb-6 text-2xl">🌾</div>
              <h3 className="font-display font-bold text-xl text-[var(--color-choco-900)] mb-3">{t('about.v1Title', 'Pure Ingredients')}</h3>
              <p className="text-[var(--color-choco-600)] text-sm leading-relaxed">{t('about.v1Desc', 'No artificial flavors. We use Madagascar vanilla, authentic butter, and farm-fresh seasonal produce.')}</p>
            </div>

            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex justify-center items-center shadow-sm text-amber-500 mx-auto mb-6">
                <FiTrendingUp size={28} />
              </div>
              <h3 className="font-display font-bold text-xl text-[var(--color-choco-900)] mb-3">{t('about.v2Title', 'Slow Proofing')}</h3>
              <p className="text-[var(--color-choco-600)] text-sm leading-relaxed">{t('about.v2Desc', 'Good bread takes time. Our authentic sourdough undergoes a 48-hour cold fermentation for complex flavor.')}</p>
            </div>

            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 shadow-sm text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 bg-white rounded-2xl flex justify-center items-center shadow-sm text-amber-500 mx-auto mb-6 relative z-10">
                <FiCheckCircle size={28} />
              </div>
              <h3 className="font-display font-bold text-xl text-[var(--color-choco-900)] mb-3 relative z-10">{t('about.v3Title', 'Community First')}</h3>
              <p className="text-[var(--color-choco-600)] text-sm leading-relaxed relative z-10">{t('about.v3Desc', 'We believe a bakery is the heart of a neighborhood. We donate our unsold evening bread to local shelters.')}</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
