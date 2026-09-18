import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { FiX, FiChevronRight, FiUser, FiHeart, FiLogOut, FiHome, FiShoppingBag, FiInfo, FiMail, FiBook } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useUIStore, useAuthStore } from '@/store';
import { CATEGORIES } from '@/constants/products';

const NAV = [
  { key: 'home',    to: '/',        icon: <FiHome size={17} /> },
  { key: 'shop',    to: '/shop',    icon: <FiShoppingBag size={17} /> },
  { key: 'about',   to: '/about',   icon: <FiInfo size={17} /> },
  { key: 'blog',    to: '/blog',    icon: <FiBook size={17} /> },
  { key: 'contact', to: '/contact', icon: <FiMail size={17} /> },
];

export default function MobileMenu() {
  const { t, i18n } = useTranslation('common');
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const user   = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-[var(--color-cream)] shadow-2xl lg:hidden flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[var(--color-choco-900)] h-16">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🍰</span>
                <div>
                  <p className="font-display font-bold text-white leading-none">{t('brand.name', 'Crumbelle')}</p>
                  <p className="text-[10px] tracking-widest text-amber-400 uppercase leading-none">{t('brand.bakery', 'Bakery')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Lang Toggle for Mobile */}
                <button
                  onClick={() => {
                    const newLang = i18n.language === 'en' ? 'hi' : 'en';
                    i18n.changeLanguage(newLang);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-amber-200 hover:text-white hover:bg-white/10 font-bold text-xs transition-all border border-transparent hover:border-white/20"
                  aria-label="Toggle Language"
                >
                  {i18n.language === 'en' ? 'HI' : 'EN'}
                </button>
                <button
                  onClick={closeMobileMenu}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-amber-200 hover:text-white hover:bg-white/10 transition-all"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* User section */}
              {user ? (
                <div className="flex items-center gap-3 px-5 py-4 bg-amber-50 border-b border-amber-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-[var(--color-choco-900)]">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-amber-600">⭐ {user.loyaltyPoints} pts</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 px-5 py-4 border-b border-amber-100">
                  <Link to="/login" onClick={closeMobileMenu}
                    className="flex-1 py-2.5 text-center text-sm font-semibold border border-amber-300 rounded-xl text-amber-700 hover:bg-amber-50 transition-colors">
                    {t('nav.login', 'Login')}
                  </Link>
                  <Link to="/register" onClick={closeMobileMenu}
                    className="flex-1 py-2.5 text-center text-sm font-semibold bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors">
                    {t('nav.register', 'Sign Up')}
                  </Link>
                </div>
              )}

              {/* Nav links */}
              <nav className="px-3 py-4 border-b border-amber-100">
                {NAV.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center justify-between gap-3 px-3 py-3 rounded-xl mb-1 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-amber-100 text-amber-700'
                          : 'text-[var(--color-choco-700)] hover:bg-amber-50 hover:text-amber-700'
                      }`
                    }
                  >
                    <span className="flex items-center gap-3">{link.icon} {t(`nav.${link.key}`)}</span>
                    <FiChevronRight size={15} className="text-amber-300" />
                  </NavLink>
                ))}
              </nav>

              {/* Categories */}
              <div className="px-5 py-4 border-b border-amber-100">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-3">{t('nav.categories', 'Categories')}</p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat.id}
                      to={`/shop/${cat.id}`}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-amber-100 text-sm text-[var(--color-choco-700)] hover:border-amber-300 hover:bg-amber-50 transition-all"
                    >
                      <span>{cat.emoji}</span>
                      <span className="font-medium truncate">{t(`nav.cat_${cat.id}`, cat.label)}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Logout */}
              {user && (
                <div className="px-5 py-4">
                  <button
                    onClick={() => { logout(); closeMobileMenu(); }}
                    className="flex items-center gap-3 px-3 py-3 w-full rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <FiLogOut size={17} /> {t('nav.logout', 'Logout')}
                  </button>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
