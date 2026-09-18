import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag, FiTag, FiTruck, FiShield, FiChevronRight } from 'react-icons/fi';
import { useCartStore } from '@/store';

export default function Cart() {
  const { t } = useTranslation('cart');
  const {
    items, coupon, getSubtotal, getDiscount, getDeliveryFee, getTax, getTotal,
    removeItem, updateQuantity, applyCoupon, removeCoupon, clearCart
  } = useCartStore();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const deliveryFee = getDeliveryFee();
  const tax = getTax();
  const total = getTotal();

  const handleCoupon = (e) => {
    e.preventDefault();
    const code = e.target.elements['coupon-input'].value.trim();
    if (code) applyCoupon(code);
    e.target.reset();
  };

  if (items.length === 0) {
    return (
      <div className="container-main py-24 flex flex-col items-center justify-center min-h-[70vh] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-9xl mb-8 bg-amber-50 p-10 rounded-full inline-block text-amber-500 shadow-inner border-4 border-white"
        >
          🥯
        </motion.div>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-[var(--color-choco-900)] mb-5 tracking-tight">{t('cart.emptyBasket')}</h1>
        <p className="text-[var(--color-choco-600)] max-w-sm mb-12 text-lg font-medium leading-relaxed">{t('cart.emptyBasketDesc')}</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--color-choco-900)] text-white font-black font-accent text-sm uppercase tracking-widest rounded-2xl shadow-warm hover:shadow-xl hover:scale-105 transition-all group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          {t('cart.startShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="container-main py-16 lg:py-24">

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3 text-amber-600 font-black font-accent text-[10px] uppercase tracking-[0.2em] mb-4">
            <span className="w-8 h-px bg-amber-200" />
            Selection Summary
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-choco-900)] flex items-center gap-5 tracking-tight">
            {t('cart.title')}
          </h1>
        </motion.div>

        <div className="flex flex-wrap gap-4 font-accent font-black text-[10px] uppercase tracking-widest">
          <div className="bg-amber-600 text-white px-5 py-2.5 rounded-full shadow-md shadow-warm">
            {items.reduce((s, i) => s + i.quantity, 0)} {t('cart.itemsSelected', 'Items').toUpperCase()}
          </div>
          <button
            onClick={clearCart}
            className="text-rose-500 bg-rose-50 hover:bg-rose-100 px-5 py-2.5 rounded-full transition-all border border-rose-100"
          >
            {t('cart.clearBasket')}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

        {/* ── Items List Refined ── */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={item.key}
                className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-amber-100/50 shadow-sm hover:shadow-md hover:border-amber-200/50 transition-all group pointer-events-auto"
              >
                {/* Product Image */}
                <Link to={`/product/${item.slug}`} className="block w-full sm:w-40 h-40 flex-shrink-0 bg-white rounded-[2rem] overflow-hidden border border-amber-50 group-hover:shadow-lg transition-all duration-500">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </Link>

                {/* Product Info */}
                <div className="flex-1 flex flex-col pt-2">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <p className="text-amber-600 font-black font-accent text-[9px] uppercase tracking-widest mb-1">{item.category}</p>
                      <Link to={`/product/${item.slug}`} className="font-display font-black text-2xl text-[var(--color-choco-900)] hover:text-amber-600 transition-colors leading-[1.1] tracking-tight">
                        {item.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-400 hover:text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-all flex-shrink-0"
                      title={t('cart.remove')}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <span className="font-accent font-black text-sm text-amber-600 pr-2 border-r border-amber-100 leading-none">₹{item.price}</span>
                    {item.options?.size && (
                      <span className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] bg-amber-50 px-3 py-1 rounded-lg">
                        {item.options.size}
                      </span>
                    )}
                    {item.options?.flavor && (
                      <span className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] bg-amber-50 px-3 py-1 rounded-lg">
                        {item.options.flavor}
                      </span>
                    )}
                  </div>

                  {/* Adjust Qty & Total Refined */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 bg-white border-2 border-amber-50 rounded-[1.25rem] px-2 py-1.5 shadow-inner">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="w-8 h-8 flex justify-center items-center text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="w-10 text-center text-base font-black font-accent text-[var(--color-choco-900)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="w-8 h-8 flex justify-center items-center text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-accent font-black text-[10px] text-amber-600/50 uppercase tracking-widest mb-1 leading-none">{t('cart.subtotal')}</p>
                      <p className="font-accent font-black text-2xl text-[var(--color-choco-900)] tracking-tighter leading-none">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="pt-8">
            <Link to="/shop" className="inline-flex items-center gap-3 font-accent font-black text-[10px] uppercase tracking-[0.2em] text-amber-600 hover:text-amber-800 group transition-all">
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              {t('cart.continueShopping')}
            </Link>
          </div>
        </div>

        {/* ── Order Summary Refined ── */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-28 space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[3rem] shadow-xl border border-amber-100 shadow-warm/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full -ml-16 -mb-16 blur-2xl pointer-events-none" />

              <h2 className="font-display font-black text-3xl text-[var(--color-choco-900)] mb-10 pb-6 border-b border-amber-100/50 flex items-center justify-between">
                Order Total
                <FiShoppingBag className="text-amber-200" size={24} />
              </h2>

              {/* Coupon Code Section */}
              <div className="mb-10">
                {coupon ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-5 flex items-center gap-4 relative overflow-hidden"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200/50 shrink-0">
                      <FiTag size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-accent font-black text-xs text-emerald-900 uppercase tracking-widest">{coupon.code} {t('cart.applied')}</p>
                      <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-tight">{t('cart.saving', "You're saving {{amount}}%").replace("{{amount}}", coupon.percent)}</p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center shadow-sm"
                    >
                      <FiMinus size={14} />
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCoupon} className="flex gap-3">
                    <div className="relative flex-1">
                      <FiTag className="absolute left-5 top-1/2 -translate-y-1/2 text-amber-300" size={18} />
                      <input
                        name="coupon-input"
                        placeholder={t('cart.couponPlaceholder', 'Promo Code')}
                        className="w-full pl-12 pr-6 py-4 bg-amber-50/50 border-2 border-amber-100/50 focus:border-amber-400 focus:bg-white rounded-2xl outline-none text-sm font-black font-accent tracking-widest transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-8 py-4 bg-[var(--color-choco-900)] text-white text-xs font-black font-accent uppercase tracking-widest rounded-2xl hover:bg-amber-600 transition-all shadow-md active:scale-95"
                    >
                      {t('cart.apply')}
                    </button>
                  </form>
                )}
              </div>

              <div className="space-y-6 mb-10 px-2 font-accent uppercase tracking-widest">
                <div className="flex justify-between items-center text-[var(--color-choco-400)] text-[11px] font-black">
                  <span>{t('cart.subtotal')}</span>
                  <span className="text-[var(--color-choco-900)] text-sm tracking-tight">₹{subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center text-emerald-600 text-[11px] font-black">
                    <span>{t('cart.discount')} ({coupon.percent}%)</span>
                    <span className="text-sm tracking-tight">-₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-[var(--color-choco-400)] text-[11px] font-black">
                  <span>{t('cart.delivery')}</span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-500 font-black tracking-tight text-sm tracking-tight">{t('cart.free')}</span>
                  ) : (
                    <span className="text-[var(--color-choco-900)] text-sm tracking-tight">₹{deliveryFee}</span>
                  )}
                </div>

                <div className="flex justify-between items-center text-[var(--color-choco-400)] text-[11px] font-black">
                  <span>{t('cart.tax')}</span>
                  <span className="text-[var(--color-choco-900)] text-sm tracking-tight">₹{tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-8 bg-[var(--color-choco-900)] rounded-[2.5rem] flex flex-col gap-1 mb-8 shadow-2xl shadow-warm/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                <span className="font-accent font-black text-[10px] text-amber-200/50 uppercase tracking-[0.3em]">{t('cart.total')}</span>
                <span className="font-accent font-black text-5xl text-white tracking-tighter">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              {deliveryFee > 0 && (
                <div className="mb-8 p-5 bg-amber-50/50 rounded-2xl border border-amber-100 border-dashed">
                  <div className="flex justify-between items-end mb-3 font-accent font-black text-[9px] uppercase tracking-widest text-amber-800">
                    <span>{t('cart.freeDeliveryPrompt', "Add ₹{{amount}} for FREE Delivery").replace("{{amount}}", (499 - subtotal).toLocaleString())}</span>
                    <span>{Math.round((subtotal / 499) * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (subtotal / 499) * 100)}%` }}
                      className="h-full bg-amber-500 rounded-full shadow-sm"
                    />
                  </div>
                </div>
              )}

              <Link
                to="/checkout"
                className="w-full h-20 flex justify-center items-center px-10 gap-4 bg-amber-500 text-white font-black font-accent text-sm uppercase tracking-[0.2em] rounded-[2rem] shadow-xl shadow-amber-200 hover:bg-amber-600 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all outline-none group"
              >
                {t('cart.secureCheckout')}
                <FiChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>

              <div className="mt-8 flex items-center justify-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center gap-1.5 text-[9px] font-black font-accent uppercase tracking-widest text-amber-900">
                  <FiShield size={14} /> Secure
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-black font-accent uppercase tracking-widest text-amber-900">
                  <FiTruck size={14} /> Fast
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

