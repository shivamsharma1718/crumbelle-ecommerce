import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiCheckCircle, FiTruck, FiHeart, FiStar } from 'react-icons/fi';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import { getFeaturedProducts, getBestSellers, CATEGORIES, TESTIMONIALS } from '@/constants/products';

export default function Home() {
  const { t } = useTranslation('home');
  const featured = getFeaturedProducts().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);

  return (
    <div className="flex flex-col gap-20 lg:gap-32 mb-32 bg-premium-gradient">
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-amber-200/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 mix-blend-multiply pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-rose-100/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 mix-blend-multiply pointer-events-none" />

        <div className="container-main relative z-10 pt-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-amber-200/50 text-amber-800 font-bold font-accent text-xs mb-8 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-600"></span>
                </span>
                {t('hero.badge')}
              </div>

              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl leading-[1.05] text-[var(--color-choco-900)] mb-8 tracking-tight">
                {t('hero.title1')} <br className="hidden sm:block" />
                <span className="text-gradient">
                  {t('hero.title2')}
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-[var(--color-choco-600)] mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-10 py-5 bg-[var(--color-choco-900)] text-white font-bold font-accent text-lg rounded-2xl shadow-lg hover:bg-amber-600 hover:shadow-warm hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group"
                >
                  {t('hero.ctaShop')}
                  <FiArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <Link
                  to="/shop/cakes"
                  className="w-full sm:w-auto px-10 py-5 glass text-[var(--color-choco-900)] font-bold font-accent text-lg rounded-2xl shadow-sm hover:border-amber-400 hover:bg-white/90 transition-all text-center"
                >
                  {t('hero.ctaCustom')}
                </Link>
              </div>

              {/* Stats with animation */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-amber-200/40 max-w-lg mx-auto lg:mx-0">
                {[
                  { val: '5k+', label: t('hero.statClients') },
                  { val: '100%', label: t('hero.statEggless') },
                  { val: '4.9', label: t('hero.statRating') }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1, duration: 0.8 }}
                  >
                    <p className="font-accent font-black text-4xl text-[var(--color-choco-900)] tracking-tighter">{stat.val}</p>
                    <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.15em] mt-2 opacity-70 leading-none">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Image Grid with refined shadows and layout */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6 mt-16">
                  <div className="overflow-hidden rounded-[2.5rem] shadow-lg hover-lift">
                    <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&fit=crop" alt="Chocolate cake" className="w-full h-[360px] object-cover transition-transform duration-1000 hover:scale-105" />
                  </div>
                  <div className="overflow-hidden rounded-3xl shadow-lg hover-lift">
                    <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&fit=crop" alt="Sourdough bread" className="w-full h-[240px] object-cover transition-transform duration-1000 hover:scale-105" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="overflow-hidden rounded-3xl shadow-lg hover-lift">
                    <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&fit=crop" alt="Croissants" className="w-full h-[260px] object-cover transition-transform duration-1000 hover:scale-105" />
                  </div>
                  <div className="overflow-hidden rounded-[2.5rem] shadow-lg hover-lift">
                    <img src="https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&fit=crop" alt="Cupcakes" className="w-full h-[380px] object-cover transition-transform duration-1000 hover:scale-105" />
                  </div>
                </div>
              </div>

              {/* Floating premium badge */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-xl p-5 rounded-[2rem] shadow-xl flex items-center gap-4 border border-amber-100/50"
              >
                <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-inner">
                  <FiHeart size={28} fill="currentColor" className="opacity-80" />
                </div>
                <div>
                  <p className="font-accent font-extrabold text-[var(--color-choco-900)] leading-tight text-lg tracking-tight">{t('hero.badgeFloatingTitle')}</p>
                  <p className="text-xs font-semibold text-rose-400 font-accent uppercase tracking-wider mt-1">{t('hero.badgeFloatingSub')}</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="container-main section-pad">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl sm:text-5xl font-black text-[var(--color-choco-900)] mb-5 tracking-tight">{t('categories.title')}</h2>
            <p className="text-lg text-[var(--color-choco-600)] font-medium">{t('categories.subtitle')}</p>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 font-black font-accent text-sm text-amber-600 hover:text-amber-700 transition-all uppercase tracking-widest">
            {t('categories.viewAll')} <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5 sm:gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <Link
                to={`/shop/${cat.id}`}
                className="group flex flex-col items-center gap-4 p-5 bg-white rounded-3xl border border-amber-100/50 shadow-card hover:shadow-lg hover:border-amber-300 transition-all text-center aspect-[4/5] justify-center relative overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-amber-100 group-hover:bg-amber-400 transition-colors" />
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl ${cat.color} group-hover:scale-115 group-hover:-rotate-6 transition-all duration-500 shadow-sm`}>
                  {cat.emoji}
                </div>
                <div>
                  <h3 className="font-accent font-bold text-sm text-[var(--color-choco-800)]">{cat.label}</h3>
                  <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest mt-1.5">{cat.count} Items</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="container-main">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl sm:text-6xl font-black text-[var(--color-choco-900)] mb-6 tracking-tight">{t('featured.title')}</h2>
          <p className="text-lg text-[var(--color-choco-600)] max-w-2xl mx-auto font-medium">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-12 py-5 bg-[var(--color-choco-900)] text-white font-black font-accent text-lg rounded-2xl hover:bg-amber-600 hover:scale-[1.03] transition-all shadow-lg active:scale-[0.98]"
          >
            {t('featured.explore')}
          </Link>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section-pad">
        <div className="container-main">
          <div className="bg-[var(--color-choco-900)] rounded-[3.5rem] p-10 lg:p-20 relative overflow-hidden shadow-2xl">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-brand-500) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
              {[
                { id: 1, title: t('whyUs.feat1Title'), desc: t('whyUs.feat1Desc') },
                { id: 2, title: t('whyUs.feat2Title'), desc: t('whyUs.feat2Desc') },
                { id: 3, title: t('whyUs.feat3Title'), desc: t('whyUs.feat3Desc') },
                { id: 4, title: t('whyUs.feat4Title'), desc: t('whyUs.feat4Desc') }
              ].map((item) => (
                <div key={item.id} className="text-center sm:text-left group">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-amber-400 text-3xl mx-auto sm:mx-0 mb-8 font-accent font-black group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-inner">
                    {item.id % 10}
                  </div>
                  <h3 className="font-accent font-extrabold text-xl text-white mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-amber-100/60 text-sm leading-relaxed font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      <section className="container-main">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl sm:text-5xl font-black text-[var(--color-choco-900)] mb-5 tracking-tight">{t('bestSellers.title')}</h2>
            <p className="text-lg text-[var(--color-choco-600)] font-medium">{t('bestSellers.subtitle')}</p>
          </div>
          <Link to="/shop" className="group flex items-center gap-3 font-black font-accent text-sm text-amber-600 hover:text-amber-700 transition-all uppercase tracking-widest">
            {t('bestSellers.viewAll')} <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-white/40 py-24 sm:py-32 relative overflow-hidden backdrop-blur-3xl">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

        <div className="container-main text-center mb-20">
          <h2 className="font-display text-5xl sm:text-6xl font-black text-[var(--color-choco-900)] mb-6 tracking-tight">{t('testimonials.title')}</h2>
          <p className="text-lg text-[var(--color-choco-600)] max-w-2xl mx-auto font-medium">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="flex overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar pl-4 sm:pl-8 lg:justify-center">
          <div className="flex gap-8 px-4">
            {TESTIMONIALS.map((tItem, i) => (
              <motion.div
                key={tItem.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="w-[340px] sm:w-[420px] shrink-0 snap-center bg-white p-10 rounded-[2.5rem] shadow-card hover:shadow-lg border border-amber-100/50 flex flex-col items-start transition-all"
              >
                <div className="flex items-center gap-1.5 mb-8 text-amber-400">
                  {[...Array(tItem.rating)].map((_, idx) => <FiStar key={idx} size={18} fill="currentColor" />)}
                </div>
                <p className="text-[var(--color-choco-800)] text-lg font-medium leading-relaxed flex-1 mb-10">
                  "{tItem.text}"
                </p>
                <div className="flex items-center gap-5 mt-auto w-full pt-6 border-t border-amber-50">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center font-accent font-black text-amber-700 text-xl shadow-inner">
                    {tItem.avatar}
                  </div>
                  <div>
                    <h4 className="font-accent font-black text-[var(--color-choco-900)] text-lg tracking-tight">{tItem.name}</h4>
                    <p className="text-xs font-black text-amber-500 uppercase tracking-widest mt-1 opacity-70">{tItem.location} • {t('testimonials.bought')} {tItem.product}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

