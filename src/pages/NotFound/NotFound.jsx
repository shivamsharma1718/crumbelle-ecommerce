import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiHome, FiSearch } from 'react-icons/fi';

export default function NotFound() {
  const { t } = useTranslation('notFound');

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="relative inline-block mb-6">
          <span className="text-[120px] leading-none block drop-shadow-lg">🍩</span>
          <span className="absolute -bottom-2 -right-2 bg-rose-500 text-white font-bold text-xl px-4 py-1 rounded-xl shadow-lg transform rotate-12 indent-1 tracking-widest border-2 border-white">404</span>
        </div>
      </motion.div>
      
      <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-choco-900)] mb-4">
        {t('notFound.title', 'Oops! We ate that page.')}
      </h1>
      <p className="text-lg text-[var(--color-choco-600)] max-w-md mx-auto mb-10 leading-relaxed">
        {t('notFound.desc', 'The page you are looking for might have been removed, had its name changed, or is temporarily out of stock.')}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link
          to="/"
          className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-[var(--shadow-warm)] hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <FiHome size={18} /> {t('notFound.homeBtn', 'Back to Home')}
        </Link>
        <Link
          to="/shop"
          className="w-full sm:w-auto px-8 py-3.5 bg-white border border-amber-200 text-amber-700 font-bold rounded-2xl hover:bg-amber-50 hover:border-amber-300 transition-all flex items-center justify-center gap-2"
        >
          <FiSearch size={18} /> {t('notFound.shopBtn', 'Browse Shop')}
        </Link>
      </div>
    </div>
  );
}
