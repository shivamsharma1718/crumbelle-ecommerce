import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiStar, FiEye, FiZap, FiAward } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useCartStore, useWishlistStore } from '@/store';

export default function ProductCard({ product, index = 0 }) {
  const { t } = useTranslation('common');
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const addItem = useCartStore(s => s.addItem);
  const toggle = useWishlistStore(s => s.toggle);
  const isWishlisted = useWishlistStore(s => s.isWishlisted(product.id));

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggle(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-amber-100/50 shadow-sm hover:shadow-2xl hover:shadow-warm/10 transition-all duration-700 flex flex-col"
    >
      {/* ── Image Container ── */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-[5/4] overflow-hidden bg-amber-50/20 shrink-0">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-all duration-[1s] ease-out ${hovered ? 'scale-110 rotate-1 brightness-[0.85]' : 'scale-100 rotate-0 brightness-100'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-amber-50 to-amber-100">
            🧁
          </div>
        )}

        {/* Action Bar Floating - Premium */}
        <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <div className="flex items-center gap-2 p-1.5 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/80">
            <span className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-choco-900)] text-white rounded-xl text-[10px] font-black font-accent uppercase tracking-widest hover:bg-amber-600 transition-all active:scale-95">
              <FiEye size={14} /> Quick View
            </span>
          </div>
        </div>

        {/* Premium Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
          <AnimatePresence>
            {product.badge === 'Best Seller' && (
              <motion.span
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                className="px-4 py-1.5 bg-amber-500 text-white text-[9px] font-black rounded-xl uppercase tracking-[0.2em] shadow-lg flex items-center gap-2"
              >
                <FiAward /> {t('labels.bestSeller')}
              </motion.span>
            )}
            {product.badge === 'New' && (
              <motion.span
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                className="px-4 py-1.5 bg-emerald-500 text-white text-[9px] font-black rounded-xl uppercase tracking-[0.2em] shadow-lg flex items-center gap-2"
              >
                <FiZap /> {t('labels.new')}
              </motion.span>
            )}
            {product.badge === 'Sale' && discountPct && (
              <motion.span
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                className="px-4 py-1.5 bg-rose-500 text-white text-[9px] font-black rounded-xl uppercase tracking-[0.2em] shadow-lg"
              >
                -{discountPct}% OFF
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Wishlist Heart - Premium */}
        <button
          onClick={handleWishlist}
          className={`absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-2xl backdrop-blur-xl border transition-all duration-500 z-10 ${isWishlisted
            ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-200'
            : 'bg-white/60 border-white/80 text-gray-400 hover:text-rose-500 hover:bg-white'
            }`}
        >
          <FiHeart size={18} fill={isWishlisted ? 'currentColor' : 'none'} className={isWishlisted ? 'scale-110' : 'scale-100'} />
        </button>
      </Link>

      {/* ── Info Container ── */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between relative">
        <Link to={`/product/${product.slug}`} className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-amber-200" />
            <p className="text-[9px] font-black text-amber-600 uppercase tracking-[0.25em] font-accent leading-none pt-0.5">{product.category}</p>
          </div>

          <h3 className="font-display font-black text-xl text-[var(--color-choco-900)] group-hover:text-amber-700 transition-colors tracking-tight leading-tight mb-3">
            {product.name}
          </h3>

          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[var(--color-choco-400)] font-accent">
            <span className="flex items-center gap-1.5"><FiStar size={12} className="text-amber-400 fill-amber-400" /> {product.rating}</span>
            <span className="w-1 h-1 rounded-full bg-amber-100" />
            <span>{product.serves} Serves</span>
          </div>
        </Link>

        <div className="mt-5 pt-5 border-t border-amber-50 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2 shrink-0">
            <span className="font-accent font-black text-2xl text-[var(--color-choco-900)] tracking-tighter">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-amber-900/35 line-through font-bold font-accent">₹{product.originalPrice}</span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`h-12 sm:h-13 px-4 sm:px-5 flex items-center justify-center gap-2 rounded-2xl transition-all shadow-md font-accent font-black text-[10px] uppercase tracking-wider shrink-0 whitespace-nowrap ${product.inStock
              ? 'bg-[var(--color-choco-900)] text-white hover:bg-amber-600 shadow-warm/20 hover:shadow-amber-200'
              : 'bg-gray-50 text-gray-300 cursor-not-allowed border border-gray-100'
              }`}
          >
            {product.inStock ? (
              <>
                <FiShoppingCart size={15} /> {t('buttons.addToCart', 'Add to Cart')}
              </>
            ) : t('labels.outOfStock')}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}



