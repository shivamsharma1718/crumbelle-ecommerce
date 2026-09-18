import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiStar, FiMinus, FiPlus, FiShoppingCart, FiHeart, FiShare2, FiCheck, FiTruck, FiBox, FiX, FiShield, FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getProductBySlug } from '@/constants/products';
import { useCartStore, useWishlistStore } from '@/store';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { t } = useTranslation(['product', 'common']);
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);

  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  const addItem = useCartStore(s => s.addItem);
  const { isWishlisted, toggle } = useWishlistStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!product) {
      toast.error(t('common:messages.error', 'Product not found'));
      navigate('/shop');
    } else {
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedFlavor(product.flavours?.[0] || '');
    }
  }, [product, navigate, t]);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, qty, { size: selectedSize, flavor: selectedFlavor });
  };

  const handleWishlist = () => toggle(product);

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="container-main py-12">
      
      {/* ── Enhanced Breadcrumb ── */}
      <nav className="flex items-center gap-3 text-[10px] font-black font-accent uppercase tracking-[0.2em] mb-12 text-amber-600/60">
        <Link to="/" className="hover:text-amber-800 transition-colors">{t('common:nav.home')}</Link>
        <span className="w-1 h-1 rounded-full bg-amber-200" />
        <Link to="/shop" className="hover:text-amber-800 transition-colors uppercase">{t('common:nav.shop')}</Link>
        <span className="w-1 h-1 rounded-full bg-amber-200" />
        <span className="text-amber-900 line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
        
        {/* ── Immersive Image Section ── */}
        <div className="space-y-6 sticky top-28">
          <div className="relative group">
            <motion.div
              layoutId={`product-image-${product.id}`}
              className="aspect-square sm:aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white shadow-lg border border-amber-100 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  src={product.images[activeImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </motion.div>

            {/* Premium Badges Overlay */}
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              {product.badge === 'Best Seller' && (
                <span className="px-4 py-1.5 glass-dark text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-xl">
                  {t('common:labels.bestSeller')}
                </span>
              )}
              {discountPct && (
                <span className="px-4 py-1.5 bg-rose-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-xl">
                  -{discountPct}% OFF
                </span>
              )}
            </div>

            {/* Navigation Arrows for Images */}
            {product.images.length > 1 && (
              <>
                <button 
                  onClick={() => setActiveImage(p => (p === 0 ? product.images.length - 1 : p - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-amber-900 shadow-lg hover:bg-white hover:scale-110 transition-all active:scale-95 z-10"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button 
                   onClick={() => setActiveImage(p => (p === product.images.length - 1 ? 0 : p + 1))}
                   className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass rounded-full flex items-center justify-center text-amber-900 shadow-lg hover:bg-white hover:scale-110 transition-all active:scale-95 z-10"
                >
                  <FiChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Elegant Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all snap-start ${activeImage === i ? 'border-amber-600 scale-105 shadow-md' : 'border-amber-100/50 grayscale-[0.5] hover:grayscale-0 opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Details Section Refined ── */}
        <div className="flex flex-col">
          <div className="mb-8 pb-8 border-b border-amber-100/80">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1"
              >
                <p className="text-amber-600 font-black font-accent text-[11px] uppercase tracking-[0.25em] mb-3">{product.category}</p>
                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-choco-900)] leading-[1.05] tracking-tight">
                  {product.name}
                </h1>
              </motion.div>

              <div className="flex gap-3 shrink-0">
                <button
                  onClick={handleWishlist}
                  className={`w-12 h-12 rounded-2xl glass flex justify-center items-center shadow-sm text-lg ${isWishlisted(product.id) ? 'text-rose-500 shadow-rose-100' : 'text-amber-500 hover:text-rose-500 hover:shadow-rose-100 hover:bg-white'} transition-all active:scale-90`}
                >
                  <FiHeart fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success(t('common:messages.success', 'Link copied to clipboard!'));
                  }}
                  className="w-12 h-12 rounded-2xl glass text-amber-500 flex justify-center items-center shadow-sm hover:bg-white transition-all active:scale-90"
                >
                  <FiShare2 />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5 mb-8">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full border border-amber-100 shadow-sm">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={13} className={i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-amber-200'} />
                  ))}
                </div>
                <span className="font-accent font-black text-xs text-amber-900">{product.rating}</span>
                <span className="h-3 w-px bg-amber-200" />
                <span className="font-accent font-bold text-[10px] text-amber-600 uppercase tracking-widest">{product.reviewCount} {t('common:labels.reviews')}</span>
              </div>
              
              <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-accent font-black text-[10px] uppercase tracking-widest ${product.inStock ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-rose-50 text-rose-700 border border-rose-100'}`}>
                <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                {product.inStock ? t('common:labels.inStock') : t('common:labels.outOfStock')}
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-accent font-extrabold text-5xl text-amber-600 tracking-tighter">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-2xl text-[var(--color-choco-300)] line-through font-accent font-black tracking-tight">₹{product.originalPrice}</span>
              )}
            </div>

            <p className="text-[var(--color-choco-700)] text-lg leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleAddToCart(); }} className="space-y-10 pt-8">
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Flavors Refined */}
              {product.flavours && product.flavours.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-accent font-black text-xs uppercase tracking-widest text-amber-900 px-1">
                    {t('detail.selectFlavour')}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.flavours.map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setSelectedFlavor(f)}
                        className={`px-5 py-2.5 rounded-xl font-accent font-bold text-sm transition-all border-2 ${selectedFlavor === f ? 'bg-amber-600 border-amber-600 text-white shadow-md shadow-warm' : 'bg-white border-amber-100 text-[var(--color-choco-700)] hover:border-amber-400'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes Refined */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-accent font-black text-xs uppercase tracking-widest text-amber-900 px-1">
                    {t('detail.selectSize')}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((s, idx) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`px-5 py-2.5 rounded-xl font-accent font-bold text-sm transition-all border-2 relative group ${selectedSize === s ? 'bg-amber-600 border-amber-600 text-white shadow-md shadow-warm' : 'bg-white border-amber-100 text-[var(--color-choco-700)] hover:border-amber-400'}`}
                      >
                        {s}
                        {idx > 0 && (
                          <span className={`absolute -top-3 -right-3 px-2 py-0.5 rounded-md text-[9px] font-black shadow-sm ${selectedSize === s ? 'bg-white text-amber-700' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                            +₹{idx * 250}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Purchase Options */}
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="flex items-center justify-between bg-white rounded-2xl border-2 border-amber-100 w-full sm:w-44 h-16 px-2 shadow-sm focus-within:border-amber-500 transition-colors">
                  <button
                    type="button"
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-12 h-12 flex items-center justify-center text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                  >
                    <FiMinus size={20} />
                  </button>
                  <input
                    type="number"
                    value={qty}
                    readOnly
                    className="w-full text-center font-accent font-black text-xl text-[var(--color-choco-900)] focus:outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setQty(q => q + 1)}
                    className="w-12 h-12 flex items-center justify-center text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                  >
                    <FiPlus size={20} />
                  </button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!product.inStock}
                  className={`flex-1 h-16 flex items-center justify-center gap-4 font-accent font-extrabold text-lg rounded-2xl shadow-lg transition-all w-full tracking-tight
                    ${product.inStock
                      ? 'bg-[var(--color-choco-900)] hover:bg-amber-600 text-white shadow-warm'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-none'
                    }`}
                >
                  <FiShoppingCart size={22} />
                  {product.inStock ? t('common:buttons.addToCart') : t('common:labels.outOfStock')}
                </motion.button>
              </div>
              
              <button
                 type="button"
                 disabled={!product.inStock}
                 onClick={() => { handleAddToCart(); navigate('/cart'); }}
                 className={`w-full h-16 flex items-center justify-center gap-3 font-accent font-extrabold text-lg rounded-2xl transition-all border-2 tracking-tight
                    ${product.inStock
                      ? 'border-amber-600 text-amber-800 hover:bg-amber-50'
                      : 'border-gray-200 text-gray-400 hidden'
                    }`}
              >
                {t('common:buttons.buyNow')}
              </button>
            </div>
          </form>

          {/* Premium Trust Badges */}
          <div className="mt-12 lg:mt-20 pt-10 border-t border-amber-100">
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {[
                  { icon: <FiClock />, title: t('detail.fastDelivery'), desc: t('detail.fastDeliveryDesc', 'Same day in selected areas') },
                  { icon: <FiBox />, title: t('detail.freshlyBaked'), desc: t('detail.freshlyBakedDesc', 'Made to order everyday') },
                  { icon: <FiShield />, title: "Quality Check", desc: "100% Handcrafted" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-3 p-5 glass rounded-[2rem] shadow-sm border border-amber-50 group hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 text-2xl group-hover:bg-amber-500 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-accent font-black text-[10px] uppercase tracking-widest text-[var(--color-choco-900)]">{item.title}</p>
                      <p className="text-[10px] text-[var(--color-choco-500)] mt-1 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
             
             {/* Ingredients chips */}
             <section className="mt-10">
                <h4 className="font-accent font-black text-[10px] uppercase tracking-widest text-amber-900 mb-4 px-1">{t('detail.ingredients', 'Ingredients')}:</h4>
                <div className="flex flex-wrap gap-2.5">
                  {product.ingredients?.map(ing => (
                    <span key={ing} className="bg-white/60 backdrop-blur-sm px-4 py-1.5 text-[11px] font-bold text-[var(--color-choco-700)] rounded-full border border-amber-100 shadow-sm">{ing}</span>
                  ))}
                </div>
             </section>
          </div>
        </div>
      </div>
    </div>
  );
}
