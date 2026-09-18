import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiTag } from 'react-icons/fi';
import { useCartStore, useUIStore } from '@/store';

export default function CartSidebar() {
  const { t } = useTranslation(['cart', 'common']);
  const { isCartSidebarOpen, closeCartSidebar } = useUIStore();
  const {
    items, coupon, getSubtotal, getDiscount, getDeliveryFee, getTax, getTotal,
    removeItem, updateQuantity, applyCoupon, removeCoupon,
  } = useCartStore();

  const subtotal    = getSubtotal();
  const discount    = getDiscount();
  const deliveryFee = getDeliveryFee();
  const tax         = getTax();
  const total       = getTotal();

  const handleCoupon = (e) => {
    e.preventDefault();
    const code = e.target.elements['coupon-input'].value.trim();
    if (code) applyCoupon(code);
    e.target.reset();
  };

  return (
    <AnimatePresence>
      {isCartSidebarOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartSidebar}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 inset-y-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-amber-100 bg-amber-50">
              <div className="flex items-center gap-2">
                <FiShoppingBag className="text-amber-600" size={20} />
                <h2 className="font-display font-bold text-lg text-[var(--color-choco-900)]">
                  {t('cart.title', 'Your Cart')}
                </h2>
                {items.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={closeCartSidebar}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--color-choco-500)] hover:bg-amber-100 transition-all"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
                  <span className="text-6xl">🛒</span>
                  <p className="font-display font-bold text-xl text-[var(--color-choco-800)]">{t('cart.emptyBasket', 'Your cart is empty')}</p>
                  <p className="text-sm text-[var(--color-choco-500)]">{t('cart.emptyBasketDesc', 'Add some delicious treats to get started!')}</p>
                  <button
                    onClick={closeCartSidebar}
                    className="mt-2 px-6 py-2.5 bg-amber-500 text-white text-sm font-semibold rounded-xl hover:bg-amber-600 transition-colors"
                  >
                    {t('cart.startShopping', 'Browse Products')}
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <motion.div
                    key={item.key}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-3 p-3 bg-amber-50 rounded-2xl border border-amber-100"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[var(--color-choco-900)] truncate">{item.name}</p>
                      {item.options?.size && (
                        <p className="text-xs text-amber-600 mt-0.5">{item.options.size}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-white border border-amber-200 flex items-center justify-center text-[var(--color-choco-700)] hover:border-amber-400 transition-colors"
                          >
                            <FiMinus size={11} />
                          </button>
                          <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-white border border-amber-200 flex items-center justify-center text-[var(--color-choco-700)] hover:border-amber-400 transition-colors"
                          >
                            <FiPlus size={11} />
                          </button>
                        </div>
                        <p className="font-bold text-amber-600 text-sm">₹{(item.price * item.quantity).toFixed(0)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg text-rose-400 hover:bg-rose-50 transition-colors"
                      title={t('cart.remove')}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-amber-100 px-5 py-4 space-y-4 bg-white">
                {/* Coupon */}
                {coupon ? (
                  <div className="flex items-center justify-between px-3 py-2 bg-green-50 border border-green-200 rounded-xl">
                    <span className="flex items-center gap-2 text-sm text-green-700 font-medium">
                      <FiTag size={14} /> {coupon.code} ({coupon.percent}% off)
                    </span>
                    <button onClick={removeCoupon} title={t('cart.removeCoupon', 'Remove coupon')} className="text-rose-500 hover:text-rose-700">
                      <FiX size={15} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCoupon} className="flex gap-2">
                    <input
                      name="coupon-input"
                      placeholder={t('cart.couponPlaceholder', 'Coupon code')}
                      className="flex-1 px-3 py-2 text-sm border border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 bg-amber-50"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-semibold bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-colors"
                    >
                      {t('cart.apply', 'Apply')}
                    </button>
                  </form>
                )}

                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[var(--color-choco-600)]">
                    <span>{t('cart.subtotal', 'Subtotal')}</span><span>₹{subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>{t('cart.discount', 'Discount')}</span><span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[var(--color-choco-600)]">
                    <span>{t('cart.delivery', 'Delivery')}</span>
                    <span>{deliveryFee === 0 ? <span className="text-green-600 font-medium">{t('cart.free', 'Free')}</span> : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-[var(--color-choco-600)]">
                    <span>{t('cart.tax', 'Tax (5%)')}</span><span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-amber-100 text-[var(--color-choco-900)]">
                    <span>{t('cart.total', 'Total')}</span><span className="text-amber-600">₹{total}</span>
                  </div>
                </div>

                {deliveryFee > 0 && (
                  <p className="text-xs text-center text-amber-600 bg-amber-50 rounded-lg py-1.5">
                    {t('cart.freeDeliveryPrompt', 'Add ₹{{amount}} more for free delivery 🚚', { amount: 499 - subtotal })}
                  </p>
                )}

                <Link
                  to="/checkout"
                  onClick={closeCartSidebar}
                  className="block w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm rounded-xl text-center hover:shadow-[var(--shadow-warm)] hover:scale-[1.01] transition-all"
                >
                  {t('common:buttons.checkout', 'Proceed to Checkout')} · ₹{total}
                </Link>
                <button
                  onClick={closeCartSidebar}
                  className="block w-full py-2 text-sm text-[var(--color-choco-500)] hover:text-amber-600 transition-colors"
                >
                  {t('cart.continueShopping', 'Continue Shopping')}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
