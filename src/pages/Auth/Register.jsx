import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { FiMail, FiLock, FiUser, FiPhone, FiChevronRight } from 'react-icons/fi';

export default function Register() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { register, loading } = useAuthStore();

  const [data, setData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(data);
    if (res.success) {
      toast.success(t('register.success', 'Account created successfully! 🎉'));
      navigate('/account', { replace: true });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-amber-50/50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-amber-100 relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-amber-100/50 text-4xl rounded-2xl mb-4 group hover:bg-amber-100 transition-colors">
            <span className="group-hover:scale-110 transition-transform">🎂</span>
          </Link>
          <h2 className="font-display font-bold text-3xl text-[var(--color-choco-900)]">{t('register.title', 'Create an Account')}</h2>
          <p className="mt-2 text-sm text-[var(--color-choco-600)] leading-relaxed px-4">
            {t('register.subtitle', 'Join the Crumbelle family. Earn loyalty points, manage orders, and save your favourite bakes.')}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-1.5 ml-1">{t('register.firstName', 'First Name')}</label>
              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 group-focus-within:text-amber-600 transition-colors" size={18} />
                <input
                  type="text" required value={data.firstName}
                  onChange={e => setData(d => ({ ...d, firstName: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-amber-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all placeholder:text-gray-400 text-[var(--color-choco-900)] bg-amber-50/30"
                  placeholder={t('register.firstNamePlaceholder', 'John')}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-1.5 ml-1">{t('register.lastName', 'Last Name')}</label>
              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 group-focus-within:text-amber-600 transition-colors" size={18} />
                <input
                  type="text" required value={data.lastName}
                  onChange={e => setData(d => ({ ...d, lastName: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-amber-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all placeholder:text-gray-400 text-[var(--color-choco-900)] bg-amber-50/30"
                  placeholder={t('register.lastNamePlaceholder', 'Doe')}
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-1.5 ml-1">{t('register.emailLabel', 'Email Address')}</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 group-focus-within:text-amber-600 transition-colors" size={18} />
                <input
                  type="email" required value={data.email}
                  onChange={e => setData(d => ({ ...d, email: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-amber-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all placeholder:text-gray-400 text-[var(--color-choco-900)] bg-amber-50/30"
                  placeholder={t('register.emailPlaceholder', 'name@example.com')}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-1.5 ml-1">{t('register.phoneLabel', 'Phone Number')}</label>
              <div className="relative group">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 group-focus-within:text-amber-600 transition-colors" size={18} />
                <input
                  type="tel" required value={data.phone}
                  onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-amber-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all placeholder:text-gray-400 text-[var(--color-choco-900)] bg-amber-50/30"
                  placeholder={t('register.phonePlaceholder', '+91 98765 43210')}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-1.5 ml-1">{t('register.passwordLabel', 'Password')}</label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 group-focus-within:text-amber-600 transition-colors" size={18} />
              <input
                type="password" required value={data.password} minLength={6}
                onChange={e => setData(d => ({ ...d, password: e.target.value }))}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-amber-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all placeholder:text-gray-400 text-[var(--color-choco-900)] bg-amber-50/30"
                placeholder={t('register.passwordPlaceholder', 'Minimum 6 characters')}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms" name="terms" type="checkbox" required
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded cursor-pointer"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-[var(--color-choco-600)] cursor-pointer select-none">
              {t('register.termsText', 'I agree to the')} <span className="text-amber-600 hover:text-amber-800 transition-colors">{t('register.termsLink', 'Terms of Service')}</span> {t('register.privacyText', 'and')} <span className="text-amber-600 hover:text-amber-800 transition-colors">{t('register.privacyLink', 'Privacy Policy')}</span>.
            </label>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full h-12 mt-2 flex justify-center items-center gap-2 bg-[var(--color-choco-900)] hover:bg-[#3d210f] text-white font-bold rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>{t('register.submitBtn', 'Sign Up')} <FiChevronRight /> </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[var(--color-choco-600)]">
          {t('register.hasAccount', 'Already have an account?')} {' '}
          <Link to="/login" className="font-bold text-amber-600 hover:text-amber-800 transition-colors">
            {t('register.loginLink', 'Log in here')}
          </Link>
        </p>
      </div>
    </div>
  );
}
