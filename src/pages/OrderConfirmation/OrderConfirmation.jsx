import { useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiPackage, FiShoppingBag, FiArrowRight, FiHeart } from 'react-icons/fi';
import confetti from 'canvas-confetti';

export default function OrderConfirmation() {
  const { t } = useTranslation('common');
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;

  useEffect(() => {
    if (!orderData) {
      navigate('/account');
      return;
    }

    // High-end Confetti Sequence
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#1c0a00', '#FCD34D', '#10B981'],
      shapes: ['circle', 'square'],
      ticks: 300,
      gravity: 1.2,
      scalar: 1,
      drift: 0
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

  }, [orderData, navigate]);

  if (!orderData) return null;

  return (
    <div className="bg-premium-gradient min-h-screen py-24 flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="max-w-3xl w-full bg-white/80 backdrop-blur-2xl rounded-[4rem] p-10 sm:p-16 shadow-2xl border border-white shadow-warm/10 text-center relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-200 rotate-12 hover:rotate-0 transition-transform duration-500">
          <FiCheckCircle size={48} strokeWidth={2.5} />
        </div>
        
        <div className="pt-8 mb-12">
           <div className="flex items-center justify-center gap-3 text-amber-600 font-black font-accent text-[10px] uppercase tracking-[0.3em] mb-4">
              <span className="w-8 h-px bg-amber-200" />
              Success
              <span className="w-8 h-px bg-amber-200" />
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl text-[var(--color-choco-900)] mb-6 tracking-tight">
              Order Confirmed
            </h1>
            <p className="text-[var(--color-choco-600)] max-w-sm mx-auto text-lg font-medium leading-relaxed">
              Your sweet treats are officially on our baking schedule!
            </p>
        </div>

        <div className="bg-amber-50/50 rounded-[3rem] p-8 sm:p-12 mb-12 text-left border border-amber-100/50 shadow-inner">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 pb-8 border-b border-amber-200/50 border-dashed">
            <div>
              <p className="font-accent font-black text-[10px] text-amber-600 uppercase tracking-widest mb-2">Artisanal Code</p>
              <p className="font-accent font-black text-3xl text-[var(--color-choco-900)] tracking-tighter">#{id}</p>
            </div>
            <div className="sm:text-right">
              <p className="font-accent font-black text-[10px] text-amber-600 uppercase tracking-widest mb-2">Total Paid</p>
              <p className="font-accent font-black text-4xl text-[var(--color-choco-900)] tracking-tighter">₹{orderData.total.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-10">
            <div className="space-y-4">
              <p className="font-accent font-black text-[11px] text-[var(--color-choco-900)] uppercase tracking-widest flex items-center gap-2">
                <FiPackage className="text-amber-500" />
                Shipping To
              </p>
              <div className="pl-6 space-y-1">
                 <p className="font-accent font-black text-sm text-[var(--color-choco-900)]">{orderData.formData.firstName} {orderData.formData.lastName}</p>
                 <p className="text-xs font-bold text-[var(--color-choco-400)] leading-loose uppercase tracking-tight">
                   {orderData.formData.address}<br />
                   {orderData.formData.city}, {orderData.formData.pincode}
                 </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="font-accent font-black text-[11px] text-[var(--color-choco-900)] uppercase tracking-widest flex items-center gap-2">
                <FiShoppingBag className="text-amber-500" />
                Selection
              </p>
              <div className="pl-6 space-y-2">
                 <p className="font-accent font-black text-sm text-[var(--color-choco-900)]">{orderData.items.reduce((s,i) => s + i.quantity, 0)} Handcrafted Items</p>
                 <div className="flex flex-wrap gap-2">
                    {orderData.items.map((i, index) => (
                      <span key={index} className="px-3 py-1 bg-white rounded-lg border border-amber-100 text-[10px] font-black text-amber-600 uppercase tracking-tight">
                        {i.name} × {i.quantity}
                      </span>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
           <Link
             to="/shop"
             className="w-full sm:w-auto h-16 flex items-center justify-center px-10 gap-4 bg-[var(--color-choco-900)] text-white font-black font-accent text-[12px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-warm/20 hover:bg-amber-600 transition-all active:scale-95 group"
           >
             <FiShoppingBag /> Continue Selection
           </Link>
           <Link
             to="/account"
             className="w-full sm:w-auto h-16 flex items-center justify-center px-10 gap-4 bg-white text-amber-900 font-black font-accent text-[12px] uppercase tracking-[0.2em] rounded-2xl border-2 border-amber-100 hover:border-amber-400 transition-all active:scale-95 group"
           >
             Track Progress <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-amber-50 flex flex-col items-center gap-4">
           <div className="flex items-center gap-2 text-rose-500 font-accent font-black text-[10px] uppercase tracking-widest">
              <FiHeart /> Handcrafted with Love in Mumbai
           </div>
           <p className="text-[10px] font-bold text-[var(--color-choco-400)] uppercase tracking-widest">
             A confirmation email has been dispatched to <strong className="text-[var(--color-choco-900)]">{orderData.formData.email}</strong>
           </p>
        </div>

      </motion.div>
    </div>
  );
}
