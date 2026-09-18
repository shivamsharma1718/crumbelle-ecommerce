import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut, FiMapPin, FiEdit2 } from 'react-icons/fi';
import { useAuthStore, useWishlistStore } from '@/store';
import ProductCard from '@/components/product/ProductCard/ProductCard';

export default function Account() {
  const { t } = useTranslation('account');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';

  const { user, logout, updateProfile } = useAuthStore();
  const wishItems = useWishlistStore(s => s.items);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });

  const TABS = [
    { id: 'profile', label: t('account.profile', 'Profile'), icon: <FiUser size={18} /> },
    { id: 'orders', label: t('account.orders', 'Orders'), icon: <FiPackage size={18} /> },
    { id: 'wishlist', label: t('account.wishlist', 'Wishlist'), icon: <FiHeart size={18} /> },
    { id: 'addresses', label: t('account.addresses', 'Addresses'), icon: <FiMapPin size={18} /> },
    { id: 'settings', label: t('account.settings', 'Settings'), icon: <FiSettings size={18} /> },
  ];

  useEffect(() => {
    // Sync if user updates from else where
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
    });
  }, [user]);

  const handleTabChange = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  if (!user) return null; // handled by private route

  return (
    <div className="bg-amber-50/30 min-h-screen py-10 xl:py-16">
      <div className="container-main max-w-6xl">

        {/* Header Banner */}
        <div className="bg-[var(--color-choco-900)] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-4 border-white/10 shadow-lg flex items-center justify-center text-4xl font-bold">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2">{user.firstName} {user.lastName}</h1>
              <p className="text-amber-200/80 mb-4">{user.email}</p>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                <span className="text-amber-400">⭐</span>
                <span className="font-bold text-lg">{user.loyaltyPoints}</span>
                <span className="text-sm text-white/70">{t('account.loyaltyPoints', 'Loyalty Points')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0 bg-white rounded-3xl p-4 shadow-sm border border-amber-100 lg:sticky lg:top-24">
            <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'bg-amber-100 text-amber-800 shadow-[var(--shadow-warm)]'
                      : 'text-[var(--color-choco-700)] hover:bg-amber-50 hover:text-amber-600'
                    }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}

              <div className="hidden lg:block h-px bg-amber-100 my-2 mx-4" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl font-semibold text-sm text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all whitespace-nowrap"
              >
                <FiLogOut size={18} /> {t('account.logout', 'Logout')}
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-amber-100 min-h-[500px]">
            <AnimatePresence mode="wait">

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                >
                  <div className="flex justify-between items-center mb-8 pb-4 border-b border-amber-100">
                    <h2 className="font-display font-bold text-2xl text-[var(--color-choco-900)]">{t('account.personalInfo', 'Personal Information')}</h2>
                    {!isEditing && (
                      <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-sm font-semibold text-amber-600 bg-amber-50 px-4 py-2 rounded-xl hover:bg-amber-100 transition-colors">
                        <FiEdit2 size={14} /> {t('account.edit', 'Edit')}
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleSaveProfile} className="max-w-xl space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-2 ml-1">{t('account.firstName', 'First Name')}</label>
                          <input type="text" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-400 focus:bg-white outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-2 ml-1">{t('account.lastName', 'Last Name')}</label>
                          <input type="text" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-400 focus:bg-white outline-none transition-all" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-2 ml-1">{t('account.phone', 'Phone Number')}</label>
                        <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-400 focus:bg-white outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-2 ml-1">{t('account.email', 'Email Address')} <span className="text-xs text-gray-400 font-normal">{t('account.emailNoChange', '(Cannot be changed)')}</span></label>
                        <input type="email" value={user.email} disabled className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button type="submit" className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-sm transition-colors">
                          {t('account.saveChanges', 'Save Changes')}
                        </button>
                        <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors">
                          {t('account.cancel', 'Cancel')}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="max-w-xl space-y-6">
                      <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                          <p className="text-sm font-medium text-[var(--color-choco-500)] mb-1">{t('account.firstName', 'First Name')}</p>
                          <p className="font-semibold text-[var(--color-choco-900)] text-lg">{user.firstName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--color-choco-500)] mb-1">{t('account.lastName', 'Last Name')}</p>
                          <p className="font-semibold text-[var(--color-choco-900)] text-lg">{user.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--color-choco-500)] mb-1">{t('account.email', 'Email Address')}</p>
                          <p className="font-semibold text-[var(--color-choco-900)] text-lg">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--color-choco-500)] mb-1">{t('account.phone', 'Phone Number')}</p>
                          <p className="font-semibold text-[var(--color-choco-900)] text-lg">{user.phone || t('account.notProvided', 'Not provided')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="font-display font-bold text-2xl text-[var(--color-choco-900)] mb-8 pb-4 border-b border-amber-100">{t('account.yourWishlist', 'Your Wishlist')}</h2>

                  {wishItems.length === 0 ? (
                    <div className="text-center py-16">
                      <span className="text-6xl mb-4 block opacity-50">💔</span>
                      <h3 className="text-xl font-bold text-[var(--color-choco-800)] mb-2">{t('account.wishlistEmpty', 'Wishlist is empty')}</h3>
                      <p className="text-[var(--color-choco-500)]">{t('account.wishlistEmptyDesc', 'Save your favourite treats here for later.')}</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishItems.map((item, i) => (
                        <ProductCard key={item.id} product={item} index={i} />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Placeholder for others */}
              {['orders', 'addresses', 'settings'].includes(activeTab) && (
                <motion.div
                  key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="font-display font-bold text-2xl text-[var(--color-choco-900)] mb-8 pb-4 border-b border-amber-100 capitalize">{t(`account.${activeTab}`, activeTab)}</h2>
                  <div className="text-center py-16 bg-amber-50/50 rounded-3xl border border-amber-100 border-dashed">
                    <span className="text-4xl mb-3 block">🚧</span>
                    <h3 className="text-lg font-bold text-[var(--color-choco-800)] mb-1">{t('account.comingSoon', 'Coming Soon')}</h3>
                    <p className="text-sm text-[var(--color-choco-500)]">{t('account.comingSoonDesc', "We're working hard to bring this feature to you.")}</p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </main>

        </div>
      </div>
    </div>
  );
}
