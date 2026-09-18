import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShoppingCart, FiHeart, FiUser, FiSearch, FiMenu, FiX,
  FiChevronDown, FiLogOut, FiPackage, FiSettings
} from 'react-icons/fi';
import { useCartStore, useAuthStore, useUIStore, useWishlistStore } from '@/store';
import { CATEGORIES } from '@/constants/products';
import { useTranslation } from 'react-i18next';

const NAV_LINKS = [
  { key: 'home', to: '/' },
  { key: 'shop', to: '/shop' },
  { key: 'blog', to: '/blog' },
  { key: 'about', to: '/about' },
  { key: 'contact', to: '/contact' },
];

export default function Header() {
  const { t, i18n } = useTranslation('common');
  const navigate = useNavigate();

  const itemCount = useCartStore(s => s.getItemCount());
  const wishItems = useWishlistStore(s => s.items);
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);
  const { openMobileMenu, openCartSidebar, isCartSidebarOpen } = useUIStore();

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopDropdown, setShopDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-[0_2px_20px_rgba(28,10,0,0.1)]'
          : 'bg-[var(--color-cream)]/80 backdrop-blur-sm'
        }
      `}
    >
      {/* ── Promo bar ── */}
      <div className="bg-[var(--color-choco-900)] text-amber-200 text-xs text-center py-2 tracking-wider">
        🎁 {t('promoBar.text', 'Free delivery on orders over ₹499 · Use code')} {' '}
        <span className="font-bold text-amber-400">FRESH10</span> {t('promoBar.discount', 'for 10% off!')}
      </div>

      {/* ── Main nav ── */}
      <div className="container-main">
        <div className="flex items-center h-16 gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <motion.span
              whileHover={{ rotate: [0, -10, 10, 0] }}
              className="text-3xl"
            >
              🍰
            </motion.span>
            <div>
              <p className="font-accent font-bold text-xl leading-none text-[var(--color-choco-900)] group-hover:text-amber-600 transition-colors tracking-tight">
                {t('brand.name', 'Crumbelle')}
              </p>
              <p className="text-[10px] tracking-[0.2em] text-amber-600 uppercase font-bold leading-none mt-1">{t('brand.bakery', 'Bakery')}</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-6 flex-1">
            {NAV_LINKS.map(link =>
              link.key === 'shop' ? (
                <div
                  key="shop"
                  className="relative"
                  onMouseEnter={() => setShopDropdown(true)}
                  onMouseLeave={() => setShopDropdown(false)}
                >
                  <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold font-accent text-[var(--color-choco-700)] hover:text-amber-600 hover:bg-amber-50/80 transition-all">
                    {t('nav.shop')} <FiChevronDown size={14} className={`transition-transform duration-300 ${shopDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {shopDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-[var(--shadow-lg)] border border-amber-100 overflow-hidden py-2"
                      >
                        <Link
                          to="/shop"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-choco-800)] hover:bg-amber-50 hover:text-amber-700 transition-colors"
                          onClick={() => setShopDropdown(false)}
                        >
                          🛍️ <span className="font-medium">{t('nav.allProducts', 'All Products')}</span>
                        </Link>
                        <div className="h-px bg-amber-100 mx-4 my-1" />
                        {CATEGORIES.map(cat => (
                          <Link
                            key={cat.id}
                            to={`/shop/${cat.id}`}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--color-choco-700)] hover:bg-amber-50 hover:text-amber-700 transition-colors"
                            onClick={() => setShopDropdown(false)}
                          >
                            {cat.emoji} <span>{t(`nav.cat_${cat.id}`, cat.label)}</span>
                            <span className="ml-auto text-xs text-amber-400 bg-amber-50 px-1.5 py-0.5 rounded-full">{cat.count}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-sm font-semibold font-accent transition-all ${isActive
                      ? 'text-amber-600 bg-amber-50'
                      : 'text-[var(--color-choco-700)] hover:text-amber-600 hover:bg-amber-50/80'
                    }`
                  }
                >
                  {t(`nav.${link.key}`)}
                </NavLink>
              )
            )}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto">

            {/* Lang Toggle */}
            <button
              onClick={() => {
                const newLang = i18n.language === 'en' ? 'hi' : 'en';
                i18n.changeLanguage(newLang);
              }}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[var(--color-choco-700)] font-bold text-sm bg-amber-50 hover:bg-amber-100 transition-all border border-amber-200"
              aria-label="Toggle Language"
            >
              {i18n.language === 'en' ? 'HI' : 'EN'}
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(v => !v)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[var(--color-choco-700)] hover:text-amber-600 hover:bg-amber-50 transition-all"
              aria-label="Search"
            >
              <FiSearch size={18} />
            </button>

            {/* Wishlist */}
            <Link
              to="/account"
              className="relative w-9 h-9 flex items-center justify-center rounded-xl text-[var(--color-choco-700)] hover:text-rose-500 hover:bg-rose-50 transition-all"
              aria-label="Wishlist"
            >
              <FiHeart size={18} />
              {wishItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={openCartSidebar}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl text-[var(--color-choco-700)] hover:text-amber-600 hover:bg-amber-50 transition-all"
              aria-label="Cart"
            >
              <FiShoppingCart size={18} />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 1.6 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {itemCount > 99 ? '99+' : itemCount}
                </motion.span>
              )}
            </button>

            {/* User */}
            {user ? (
              <div className="relative hidden lg:block" onMouseLeave={() => setUserDropdown(false)}>
                <button
                  onMouseEnter={() => setUserDropdown(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-amber-50 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </div>
                  <span className="text-sm font-medium text-[var(--color-choco-800)]">{user.firstName}</span>
                </button>

                <AnimatePresence>
                  {userDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-48 bg-white rounded-2xl shadow-[var(--shadow-lg)] border border-amber-100 overflow-hidden py-2"
                    >
                      <div className="px-4 py-2 border-b border-amber-100">
                        <p className="text-sm font-semibold text-[var(--color-choco-900)]">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-amber-600">{user.loyaltyPoints} pts</p>
                      </div>
                      <Link to="/account" onClick={() => setUserDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-choco-700)] hover:bg-amber-50 transition-colors">
                        <FiUser size={15} /> {t('nav.account', 'My Account')}
                      </Link>
                      <Link to="/account?tab=orders" onClick={() => setUserDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-choco-700)] hover:bg-amber-50 transition-colors">
                        <FiPackage size={15} /> {t('nav.orders', 'Orders')}
                      </Link>
                      <Link to="/account?tab=settings" onClick={() => setUserDropdown(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-choco-700)] hover:bg-amber-50 transition-colors">
                        <FiSettings size={15} /> {t('nav.settings', 'Settings')}
                      </Link>
                      <div className="h-px bg-amber-100 mx-3 my-1" />
                      <button
                        onClick={() => { logout(); setUserDropdown(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <FiLogOut size={15} /> {t('nav.logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2 ml-1">
                <Link
                  to="/login"
                  className="px-4 py-1.5 text-sm font-medium text-[var(--color-choco-800)] hover:text-amber-600 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:shadow-[var(--shadow-warm)] hover:scale-105 transition-all"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={openMobileMenu}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-[var(--color-choco-700)] hover:bg-amber-50 transition-all"
              aria-label="Menu"
            >
              <FiMenu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Search overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-amber-100 bg-white overflow-hidden"
          >
            <div className="container-main py-4">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" size={18} />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t('nav.search')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none text-sm bg-amber-50"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-amber-200 text-[var(--color-choco-600)] hover:bg-amber-50"
                >
                  <FiX size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
