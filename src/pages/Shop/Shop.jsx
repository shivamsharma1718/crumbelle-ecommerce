import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiFilter, FiX, FiChevronDown, FiGrid, FiList, FiSearch } from 'react-icons/fi';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/constants/products';

export default function Shop() {
  const { t } = useTranslation(['product', 'common']);
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [activeCat, setActiveCat] = useState(category || 'all');
  const [priceRange, setPriceRange] = useState(2000);
  const [filters, setFilters] = useState({ eggless: false, bestseller: false });

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    if (activeCat !== 'all') {
      result = result.filter(p => p.category === activeCat);
    }

    result = result.filter(p => p.price <= priceRange);
    if (filters.bestseller) result = result.filter(p => p.isBestSeller);

    switch (sortBy) {
      case 'price_low': result.sort((a, b) => a.price - b.price); break;
      case 'price_high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': default: result.sort((a, b) => (b.isNew - a.isNew) || (b.rating - a.rating)); break;
    }

    return result;
  }, [query, activeCat, priceRange, filters, sortBy]);

  return (
    <div className="container-main py-12">

      {/* ── Page Header Refined ── */}
      <div className="mb-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-3 text-amber-600 font-black font-accent text-[10px] uppercase tracking-[0.2em] mb-4">
            <span className="w-8 h-px bg-amber-200" />
            {t('common:nav.shop')} Collection
          </div>
          <h1 className="font-display font-black text-5xl sm:text-6xl text-[var(--color-choco-900)] mb-6 tracking-tight">
            {query ? `${t('filters.title')} "${query}"` : activeCat === 'all' ? t('heading', 'Our Menu') : t(`common:nav.cat_${activeCat}`, CATEGORIES.find(c => c.id === activeCat)?.label)}
          </h1>
          <p className="text-lg text-[var(--color-choco-600)] font-medium leading-relaxed">
            {t('product.description', 'Explore our handcrafted collection of artisanal bakes, made fresh daily with love and the finest ingredients.')}
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* ── Mobile Filter Drawer ── */}
        <AnimatePresence>
          {filterOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFilterOpen(false)}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-[var(--color-cream)] shadow-2xl lg:hidden flex flex-col overflow-hidden"
              >
                <div className="flex items-center justify-between px-6 py-5 bg-[var(--color-choco-900)] text-white">
                  <div className="flex items-center gap-2 font-accent font-black text-xs uppercase tracking-widest">
                    <FiFilter size={16} className="text-amber-400" /> Filters
                  </div>
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
                  >
                    <FiX size={18} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Categories */}
                  <section>
                    <h3 className="font-accent font-black text-xs uppercase tracking-widest text-amber-900 mb-4 flex items-center gap-2">
                      Categories <span className="w-2 h-2 rounded-full bg-amber-500" />
                    </h3>
                    <ul className="space-y-1.5 font-accent">
                      <li>
                        <button
                          onClick={() => { setActiveCat('all'); setFilterOpen(false); }}
                          className={`w-full text-left flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${activeCat === 'all' ? 'bg-amber-600 text-white font-bold shadow-md shadow-warm' : 'text-[var(--color-choco-600)] hover:bg-amber-50 hover:text-amber-700'}`}
                        >
                          <span className="text-sm">{t('common:nav.allProducts', 'All Items')}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCat === 'all' ? 'bg-white/20' : 'bg-amber-50'}`}>{PRODUCTS.length}</span>
                        </button>
                      </li>
                      {CATEGORIES.map(cat => (
                        <li key={cat.id}>
                          <button
                            onClick={() => { setActiveCat(cat.id); setFilterOpen(false); }}
                            className={`w-full text-left flex items-center gap-3 justify-between px-4 py-2.5 rounded-xl transition-all ${activeCat === cat.id ? 'bg-amber-600 text-white font-bold shadow-md shadow-warm' : 'text-[var(--color-choco-600)] hover:bg-amber-50 hover:text-amber-700'}`}
                          >
                            <span className="text-sm flex items-center gap-2">{cat.emoji} {t(`common:nav.cat_${cat.id}`, cat.label)}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCat === cat.id ? 'bg-white/20' : 'bg-amber-50'}`}>{cat.count}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Price Range */}
                  <section>
                    <h3 className="font-accent font-black text-xs uppercase tracking-widest text-amber-900 mb-4 flex items-center gap-2">
                      Price Budget <span className="w-2 h-2 rounded-full bg-amber-500" />
                    </h3>
                    <div className="px-1">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={priceRange}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        className="w-full accent-amber-600 h-1.5 bg-amber-100 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between font-accent font-black text-[10px] text-amber-600 uppercase tracking-widest mt-4 items-center">
                        <span className="bg-amber-50 px-2 py-1 rounded">Min ₹0</span>
                        <span className="bg-amber-600 text-white px-3 py-1 rounded shadow-sm">Max ₹{priceRange}</span>
                      </div>
                    </div>
                  </section>

                  {/* Preferences */}
                  <section>
                    <h3 className="font-accent font-black text-xs uppercase tracking-widest text-amber-900 mb-4 flex items-center gap-2">
                      Preferences <span className="w-2 h-2 rounded-full bg-amber-500" />
                    </h3>
                    <div className="space-y-3 px-1">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.bestseller}
                          onChange={(e) => setFilters(f => ({ ...f, bestseller: e.target.checked }))}
                          className="custom-input w-5 h-5 rounded-lg border-amber-200 focus:ring-amber-500"
                        />
                        <span className="text-sm font-semibold text-[var(--color-choco-700)] group-hover:text-amber-700 transition-colors">{t('common:labels.bestSeller')} Favorities</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.eggless}
                          onChange={(e) => setFilters(f => ({ ...f, eggless: e.target.checked }))}
                          className="custom-input w-5 h-5 rounded-lg border-amber-200 focus:ring-amber-500"
                        />
                        <span className="text-sm font-semibold text-[var(--color-choco-700)] group-hover:text-amber-700 transition-colors">Eggless Options Only</span>
                      </label>
                    </div>
                  </section>

                  {(activeCat !== 'all' || priceRange !== 2000 || filters.bestseller || filters.eggless) && (
                    <button
                      onClick={() => { setActiveCat('all'); setPriceRange(2000); setFilters({ eggless: false, bestseller: false }); }}
                      className="w-full py-4 text-xs font-black uppercase tracking-widest text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-2xl transition-all font-accent border border-rose-100"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>

                <div className="p-4 bg-white border-t border-amber-100">
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="w-full py-3.5 bg-[var(--color-choco-900)] text-white font-black font-accent text-xs uppercase tracking-widest rounded-xl hover:bg-amber-600 transition-all shadow-md"
                  >
                    View {filteredProducts.length} Treats
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── Sidebar Refined ── */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-28 space-y-10">

            {/* Search within shop */}
            <div className="relative group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 group-focus-within:text-amber-600 transition-colors" />
              <input
                type="text"
                placeholder="Search treats..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-amber-100/50 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-amber-400 transition-all text-sm font-medium"
              />
            </div>

            {/* Categories */}
            <section>
              <h3 className="font-accent font-black text-xs uppercase tracking-widest text-amber-900 mb-6 flex items-center gap-2">
                Categories <span className="w-2 h-2 rounded-full bg-amber-500" />
              </h3>
              <ul className="space-y-1.5 font-accent">
                <li>
                  <button
                    onClick={() => setActiveCat('all')}
                    className={`w-full text-left flex items-center justify-between px-4 py-2.5 rounded-xl transition-all ${activeCat === 'all' ? 'bg-amber-600 text-white font-bold shadow-md shadow-warm' : 'text-[var(--color-choco-600)] hover:bg-amber-50 hover:text-amber-700'}`}
                  >
                    <span className="text-sm">{t('common:nav.allProducts', 'All Items')}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCat === 'all' ? 'bg-white/20' : 'bg-amber-50'}`}>{PRODUCTS.length}</span>
                  </button>
                </li>
                {CATEGORIES.map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setActiveCat(cat.id)}
                      className={`w-full text-left flex items-center gap-3 justify-between px-4 py-2.5 rounded-xl transition-all ${activeCat === cat.id ? 'bg-amber-600 text-white font-bold shadow-md shadow-warm' : 'text-[var(--color-choco-600)] hover:bg-amber-50 hover:text-amber-700'}`}
                    >
                      <span className="text-sm flex items-center gap-2">{cat.emoji} {t(`common:nav.cat_${cat.id}`, cat.label)}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCat === cat.id ? 'bg-white/20' : 'bg-amber-50'}`}>{cat.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Price Range */}
            <section>
              <h3 className="font-accent font-black text-xs uppercase tracking-widest text-amber-900 mb-6 flex items-center gap-2">
                Price Budget <span className="w-2 h-2 rounded-full bg-amber-500" />
              </h3>
              <div className="px-1">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-amber-600 h-1.5 bg-amber-100 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between font-accent font-black text-[10px] text-amber-600 uppercase tracking-widest mt-4 items-center">
                  <span className="bg-amber-50 px-2 py-1 rounded">Min ₹0</span>
                  <span className="bg-amber-600 text-white px-3 py-1 rounded shadow-sm">Max ₹{priceRange}</span>
                </div>
              </div>
            </section>

            {/* Other Filters */}
            <section>
              <h3 className="font-accent font-black text-xs uppercase tracking-widest text-amber-900 mb-6 flex items-center gap-2">
                Preferences <span className="w-2 h-2 rounded-full bg-amber-500" />
              </h3>
              <div className="space-y-3 px-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.bestseller}
                    onChange={(e) => setFilters(f => ({ ...f, bestseller: e.target.checked }))}
                    className="custom-input w-5 h-5 rounded-lg border-amber-200 focus:ring-amber-500"
                  />
                  <span className="text-sm font-semibold text-[var(--color-choco-700)] group-hover:text-amber-700 transition-colors">{t('common:labels.bestSeller')} Favorities</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.eggless}
                    onChange={(e) => setFilters(f => ({ ...f, eggless: e.target.checked }))}
                    className="custom-input w-5 h-5 rounded-lg border-amber-200 focus:ring-amber-500"
                  />
                  <span className="text-sm font-semibold text-[var(--color-choco-700)] group-hover:text-amber-700 transition-colors">Eggless Options Only</span>
                </label>
              </div>
            </section>

            {(activeCat !== 'all' || priceRange !== 2000 || filters.bestseller || filters.eggless) && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => { setActiveCat('all'); setPriceRange(2000); setFilters({ eggless: false, bestseller: false }); }}
                className="w-full py-4 text-xs font-black uppercase tracking-widest text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-2xl transition-all font-accent border border-rose-100"
              >
                Reset All Filters
              </motion.button>
            )}
          </div>
        </aside>

        {/* ── Main Content Area ── */}
        <div className="flex-1">

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-8 pb-6 border-b border-amber-100/50">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold font-accent text-[var(--color-choco-900)] uppercase tracking-widest px-1">
                {filteredProducts.length} {t('results.found', 'Treats Found')}
              </p>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-amber-500 rounded-full" />
                <div className="h-1 w-2 bg-amber-200 rounded-full" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-5 py-3 bg-white border border-amber-100 rounded-2xl text-xs font-black font-accent uppercase tracking-widest text-amber-800 hover:shadow-md transition-all active:scale-95"
              >
                <FiFilter size={16} /> Filters
              </button>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border text-xs border-amber-100 rounded-2xl px-5 py-3 focus:outline-none focus:ring-4 focus:ring-amber-50 focus:border-amber-400 text-amber-900 font-extrabold font-accent appearance-none w-full sm:w-auto min-w-[160px] shadow-sm uppercase tracking-widest"
                  >
                    <option value="newest">{t('filters.newest')}</option>
                    <option value="price_low">{t('filters.priceAsc')}</option>
                    <option value="price_high">{t('filters.priceDesc')}</option>
                    <option value="rating">{t('filters.topRated')}</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-amber-600" />
                </div>

                <div className="hidden sm:flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-amber-100 shadow-sm">
                  <button onClick={() => setViewMode('grid')} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-[var(--color-choco-900)] text-white shadow-md' : 'text-amber-400 hover:bg-amber-50'}`}>
                    <FiGrid size={18} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-[var(--color-choco-900)] text-white shadow-md' : 'text-amber-400 hover:bg-amber-50'}`}>
                    <FiList size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Container */}
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center text-5xl mb-8 shadow-inner animate-bounce">🍩</div>
              <h3 className="font-display font-black text-3xl text-[var(--color-choco-900)] mb-4">{t('results.noProducts')}</h3>
              <p className="text-[var(--color-choco-500)] max-w-sm mb-10 font-medium">{t('results.noProductsHint')}</p>
              <button
                onClick={() => { setActiveCat('all'); setPriceRange(2000); setFilters({ eggless: false, bestseller: false }); }}
                className="px-10 py-4 bg-amber-600 text-white font-black font-accent text-sm uppercase tracking-widest rounded-2xl hover:bg-amber-700 shadow-warm transition-all"
              >
                View Full Menu
              </button>
            </motion.div>
          ) : (
            <motion.div layout className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} view={viewMode} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
