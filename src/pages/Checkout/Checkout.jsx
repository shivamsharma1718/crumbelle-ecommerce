import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiCreditCard, FiMapPin, FiTruck, FiChevronRight, FiShield, FiLock, FiSmartphone, FiDollarSign, FiInfo } from 'react-icons/fi';
import { useCartStore, useAuthStore } from '@/store';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { t } = useTranslation('checkout');
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { items, getSubtotal, getDiscount, getDeliveryFee, getTax, getTotal, clearCart } = useCartStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.addresses?.[0]?.street || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    pincode: user?.addresses?.[0]?.pincode || '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !isProcessing) {
      navigate('/cart');
    }
  }, [items, navigate, isProcessing]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const toastId = toast.loading(t('checkout.processing', 'Securing your treat...'), {
      style: { background: 'var(--color-choco-900)', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
    });

    await new Promise(r => setTimeout(r, 2500));

    toast.success('Transaction Verified!', { id: toastId });

    const orderId = `MB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    clearCart();

    navigate(`/order-confirmation/${orderId}`, {
      state: { orderData: { items, total: getTotal(), formData, paymentMethod } }
    });
  };

  if (items.length === 0 && !isProcessing) return null;

  const total = getTotal();

  return (
    <div className="bg-premium-gradient min-h-screen py-16 lg:py-24">
      <div className="container-main max-w-7xl">

        {/* ── Premium Header ── */}
        <div className="mb-16 lg:mb-24 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-3 text-amber-600 font-black font-accent text-[10px] uppercase tracking-[0.3em] mb-4">
              <span className="w-8 h-px bg-amber-200" />
              Secure Checkout
              <span className="w-8 h-px bg-amber-200" />
            </div>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--color-choco-900)] mb-8 tracking-tight">
              Finalize Order
            </h1>
          </motion.div>

          {/* Enhanced Stepper */}
          <div className="flex items-center justify-center max-w-md mx-auto pt-4">
            <div className={`flex flex-col items-center gap-3 relative z-10 transition-all duration-500 ${step >= 1 ? 'scale-110' : 'opacity-40'}`}>
              <div className={`w-14 h-14 rounded-[1.25rem] flex justify-center items-center shadow-xl transition-all duration-500 font-accent font-black text-xl ${step >= 1 ? 'bg-[var(--color-choco-900)] text-white shadow-warm/20' : 'bg-white text-gray-300 border-2 border-amber-50'}`}>
                {step > 1 ? <FiCheckCircle size={24} className="text-emerald-400" /> : '01'}
              </div>
              <span className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-900)] whitespace-nowrap">{t('checkout.stepShipping')}</span>
            </div>

            <div className="flex-1 h-1 mx-4 rounded-full bg-amber-100 overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: step >= 2 ? '100%' : '0%' }}
                className="absolute inset-0 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              />
            </div>

            <div className={`flex flex-col items-center gap-3 relative z-10 transition-all duration-500 ${step >= 2 ? 'scale-110' : 'opacity-40'}`}>
              <div className={`w-14 h-14 rounded-[1.25rem] flex justify-center items-center shadow-xl transition-all duration-500 font-accent font-black text-xl ${step >= 2 ? 'bg-[var(--color-choco-900)] text-white shadow-warm/20' : 'bg-white text-gray-300 border-2 border-amber-50'}`}>
                02
              </div>
              <span className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-900)] whitespace-nowrap">{t('checkout.stepPayment')}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* ── Forms Area ── */}
          <div className="lg:col-span-7 xl:col-span-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30, transition: { duration: 0.3 } }}
                  className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 sm:p-12 shadow-xl border border-amber-100 shadow-warm/5"
                >
                  <div className="flex items-center gap-4 mb-10 pb-6 border-b border-amber-50">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
                      <FiMapPin size={24} />
                    </div>
                    <div>
                      <h2 className="font-display font-black text-3xl text-[var(--color-choco-900)] tracking-tight">{t('checkout.stepShipping')}</h2>
                      <p className="text-xs font-accent font-bold text-amber-600 uppercase tracking-widest mt-1">Delivery Destination</p>
                    </div>
                  </div>

                  <form onSubmit={handleNextStep} className="space-y-8">

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] block ml-1">Member First Name</label>
                        <input
                          type="text" required name="firstName" value={formData.firstName} onChange={handleInputChange}
                          className="premium-input w-full px-6 py-4 rounded-2xl bg-amber-50/50 border-2 border-transparent focus:border-amber-400 focus:bg-white outline-none transition-all font-accent font-bold text-[var(--color-choco-900)]"
                          placeholder="Ex: Rey"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] block ml-1">Family Name</label>
                        <input
                          type="text" required name="lastName" value={formData.lastName} onChange={handleInputChange}
                          className="premium-input w-full px-6 py-4 rounded-2xl bg-amber-50/50 border-2 border-transparent focus:border-amber-400 focus:bg-white outline-none transition-all font-accent font-bold text-[var(--color-choco-900)]"
                          placeholder="Ex: Skywalker"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] block ml-1">Notification Email</label>
                        <input
                          type="email" required name="email" value={formData.email} onChange={handleInputChange}
                          className="premium-input w-full px-6 py-4 rounded-2xl bg-amber-50/50 border-2 border-transparent focus:border-amber-400 focus:bg-white outline-none transition-all font-accent font-bold text-[var(--color-choco-900)]"
                          placeholder="Your treating email..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] block ml-1">Contact Coordinate</label>
                        <input
                          type="tel" required name="phone" value={formData.phone} onChange={handleInputChange}
                          className="premium-input w-full px-6 py-4 rounded-2xl bg-amber-50/50 border-2 border-transparent focus:border-amber-400 focus:bg-white outline-none transition-all font-accent font-bold text-[var(--color-choco-900)]"
                          placeholder="+91-XXXXX-XXXXX"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] block ml-1">Street Address & Landmark</label>
                      <input
                        type="text" required name="address" value={formData.address} onChange={handleInputChange}
                        className="premium-input w-full px-6 py-4 rounded-2xl bg-amber-50/50 border-2 border-transparent focus:border-amber-400 focus:bg-white outline-none transition-all font-accent font-bold text-[var(--color-choco-900)]"
                        placeholder="House no, Street Name, Near Landmark..."
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] block ml-1">City Hub</label>
                        <input
                          type="text" required name="city" value={formData.city} onChange={handleInputChange}
                          className="premium-input w-full px-6 py-4 rounded-2xl bg-amber-50/50 border-2 border-transparent focus:border-amber-400 focus:bg-white outline-none transition-all font-accent font-bold text-[var(--color-choco-900)]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] block ml-1">Territory</label>
                        <input
                          type="text" required name="state" value={formData.state} onChange={handleInputChange}
                          className="premium-input w-full px-6 py-4 rounded-2xl bg-amber-50/50 border-2 border-transparent focus:border-amber-400 focus:bg-white outline-none transition-all font-accent font-bold text-[var(--color-choco-900)]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] block ml-1">Postal Code</label>
                        <input
                          type="text" required name="pincode" value={formData.pincode} onChange={handleInputChange}
                          className="premium-input w-full px-6 py-4 rounded-2xl bg-amber-50/50 border-2 border-transparent focus:border-amber-400 focus:bg-white outline-none transition-all font-accent font-bold text-[var(--color-choco-900)]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] block ml-1">Culinary Notes</label>
                      <textarea
                        name="notes" value={formData.notes} onChange={handleInputChange} rows={3}
                        className="premium-input w-full px-6 py-4 rounded-2xl bg-amber-50/50 border-2 border-transparent focus:border-amber-400 focus:bg-white outline-none transition-all font-accent font-bold text-[var(--color-choco-900)] resize-none"
                        placeholder="Any dietary preferences or delivery instruction?"
                      />
                    </div>

                    <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <Link to="/cart" className="inline-flex items-center gap-3 font-accent font-black text-[10px] uppercase tracking-[0.25em] text-amber-600 hover:text-amber-800 transition-all">
                        ← {t('checkout.editCart')}
                      </Link>
                      <button
                        type="submit"
                        className="w-full sm:w-auto h-16 flex items-center justify-center px-10 gap-4 bg-[var(--color-choco-900)] text-white font-black font-accent text-[12px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-warm/20 hover:bg-amber-600 transition-all active:scale-95 group"
                      >
                        {t('checkout.continuePay')}
                        <FiChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, transition: { duration: 0.3 } }}
                  className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-8 sm:p-12 shadow-xl border border-amber-100 shadow-warm/5"
                >
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-amber-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-inner">
                        <FiCreditCard size={24} />
                      </div>
                      <div>
                        <h2 className="font-display font-black text-3xl text-[var(--color-choco-900)] tracking-tight">{t('checkout.stepPayment')}</h2>
                        <p className="text-xs font-accent font-bold text-amber-600 uppercase tracking-widest mt-1">Transaction Gateway</p>
                      </div>
                    </div>
                    <button onClick={() => setStep(1)} className="text-[10px] font-black font-accent uppercase tracking-widest text-amber-600 bg-amber-50 px-4 py-2 rounded-xl border border-amber-100/50 hover:bg-amber-100 transition-all">
                      Change Details
                    </button>
                  </div>

                  <form onSubmit={handlePlaceOrder} className="space-y-8">
                    <div className="grid gap-4">
                      {[
                        { id: 'card', name: t('checkout.card'), icon: <FiCreditCard />, desc: t('checkout.payDesc') },
                        { id: 'upi', name: "Unified Payments", icon: <FiSmartphone />, desc: "PhonePe, Google Pay, Razorpay" },
                        { id: 'cod', name: t('checkout.cod'), icon: <FiDollarSign />, desc: t('checkout.codDesc') }
                      ].map(method => (
                        <label
                          key={method.id}
                          className={`relative flex items-center p-6 rounded-[2rem] cursor-pointer transition-all border-2 ${paymentMethod === method.id ? 'border-amber-600 bg-amber-50/50 shadow-md shadow-warm/5' : 'border-amber-50 hover:border-amber-200 bg-white'}`}
                        >
                          <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-amber-600 border-amber-200 focus:ring-amber-500" />
                          <div className="ml-5 flex-1">
                            <span className="block font-accent font-black text-xs uppercase tracking-widest text-[var(--color-choco-900)]">{method.name}</span>
                            <span className="block text-[10px] font-bold text-[var(--color-choco-400)] mt-1 uppercase tracking-tight">{method.desc}</span>
                          </div>
                          <div className={`text-2xl ${paymentMethod === method.id ? 'text-amber-600' : 'text-amber-200 opacity-40'}`}>
                            {method.icon}
                          </div>
                        </label>
                      ))}
                    </div>

                    <AnimatePresence>
                      {paymentMethod === 'card' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-amber-50/30 border border-amber-100 rounded-[2rem] p-8 space-y-6 overflow-hidden"
                        >
                          <div className="space-y-2">
                            <label className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] ml-2">{t('checkout.cardNum')}</label>
                            <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full px-6 py-4 bg-white rounded-2xl border border-amber-100/50 focus:border-amber-400 outline-none font-accent font-bold tracking-[0.2em]" />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] ml-2">{t('checkout.expiry')}</label>
                              <input type="text" placeholder="MM/YY" className="w-full px-6 py-4 bg-white rounded-2xl border border-amber-100/50 focus:border-amber-400 outline-none font-accent font-bold tracking-widest" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black font-accent uppercase tracking-widest text-[var(--color-choco-400)] ml-2">{t('checkout.cvv')}</label>
                              <input type="text" placeholder="XXX" className="w-full px-6 py-4 bg-white rounded-2xl border border-amber-100/50 focus:border-amber-400 outline-none font-accent font-bold tracking-widest" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 flex items-start gap-4">
                      <FiInfo size={20} className="text-amber-600 mt-0.5 shrink-0" />
                      <p className="text-[11px] font-medium text-amber-800 leading-relaxed uppercase tracking-tight">
                        By placing this order, you agree to our <strong className="font-black">Artisanal Promise</strong>. We guarantee 100% freshness and safe delivery for every handcrafted treat.
                      </p>
                    </div>

                    <div className="pt-8">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full h-20 bg-[var(--color-choco-900)] text-white font-black font-accent text-sm uppercase tracking-[0.25em] rounded-[2rem] shadow-2xl shadow-warm/20 hover:bg-amber-600 transition-all disabled:opacity-70 flex items-center justify-center gap-4 group"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-6 h-6 rounded-full border-4 border-white/20 border-t-white animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          <>
                            <FiLock className="group-hover:scale-110 transition-transform" />
                            Submit Payment • ₹{total.toLocaleString()}
                          </>
                        )}
                      </button>

                      <div className="mt-8 flex justify-center items-center gap-8 opacity-40">
                        <div className="flex items-center gap-2 text-[10px] font-black font-accent uppercase tracking-widest">
                          <FiShield /> Encrypted
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black font-accent uppercase tracking-widest">
                          <FiCheckCircle /> Verified
                        </div>
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Summary Sidebar ── */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-[3rem] p-8 sm:p-10 shadow-xl border border-amber-100"
            >
              <h3 className="font-display font-black text-2xl text-[var(--color-choco-900)] mb-8 pb-6 border-b border-amber-50">
                Summary
              </h3>

              <div className="space-y-6 mb-10 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                {items.map(item => (
                  <div key={item.key} className="flex gap-5 group">
                    <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden flex-shrink-0 bg-white border border-amber-50 p-1 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 rounded-[1.25rem]" />
                      <span className="absolute -top-1 -right-1 w-6 h-6 bg-[var(--color-choco-900)] text-white text-[10px] font-accent font-black rounded-full flex justify-center items-center shadow-lg border-2 border-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <p className="font-accent font-black text-xs text-[var(--color-choco-900)] uppercase tracking-tight truncate line-clamp-2">{item.name}</p>
                      {item.options?.size && <p className="text-[10px] font-bold text-amber-500 mt-1 uppercase tracking-widest">{item.options.size}</p>}
                      <p className="font-accent font-black text-sm text-amber-600 mt-2">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 font-accent font-black text-[10px] uppercase tracking-widest mb-10 px-2 opacity-60">
                <div className="flex justify-between items-center">
                  <span>{t('checkout.subtotal')}</span>
                  <span className="text-[var(--color-choco-900)] text-sm tracking-tight font-black">₹{getSubtotal().toLocaleString()}</span>
                </div>
                {getDiscount() > 0 && (
                  <div className="flex justify-between items-center text-emerald-600">
                    <span>{t('checkout.discount')}</span>
                    <span className="text-sm tracking-tight">-₹{getDiscount().toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>{t('checkout.delivery')}</span>
                  <span className="text-[var(--color-choco-900)] text-sm tracking-tight font-black">{getDeliveryFee() === 0 ? "FREE" : `₹${getDeliveryFee()}`}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t('checkout.tax')}</span>
                  <span className="text-[var(--color-choco-900)] text-sm tracking-tight font-black">₹{getTax().toLocaleString()}</span>
                </div>
              </div>

              <div className="p-8 bg-amber-50/50 rounded-[2.5rem] border border-amber-100 flex flex-col gap-1 shadow-inner relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl" />
                <span className="font-accent font-black text-[10px] text-amber-600 uppercase tracking-[0.3em]">{t('checkout.total')}</span>
                <span className="font-accent font-black text-4xl text-[var(--color-choco-900)] tracking-tighter">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white/50 backdrop-blur-sm p-5 rounded-[2rem] border border-amber-100/50 flex flex-col items-center text-center gap-2">
                <FiTruck className="text-amber-500" size={20} />
                <span className="font-accent font-black text-[9px] uppercase tracking-widest text-amber-900">Swift Delivery</span>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-5 rounded-[2rem] border border-amber-100/50 flex flex-col items-center text-center gap-2">
                <FiShield className="text-emerald-500" size={20} />
                <span className="font-accent font-black text-[9px] uppercase tracking-widest text-emerald-900">100% Secure</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

