import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { FiMail, FiLock, FiChevronRight } from 'react-icons/fi';

export default function Login() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuthStore();

  const [data, setData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ email: data.email, password: data.password });
    if (res.success) {
      toast.success(t('login.success', 'Welcome back! 🍰'));
      const from = location.state?.from?.pathname || '/account';
      navigate(from, { replace: true });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-amber-50/50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-amber-100 relative z-10 transition-transform">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-16 h-16 bg-amber-100/50 text-4xl rounded-2xl mb-4 group hover:bg-amber-100 transition-colors">
            <span className="group-hover:scale-110 transition-transform">🍰</span>
          </Link>
          <h2 className="font-display font-bold text-3xl text-[var(--color-choco-900)]">{t('login.title', 'Welcome Back')}</h2>
          <p className="mt-2 text-sm text-[var(--color-choco-600)] leading-relaxed px-4">
            {t('login.subtitle', 'Log in to manage your orders, wishlist, and enjoy exclusive bakery rewards.')}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-1.5 ml-1">{t('login.emailLabel', 'Email Address')}</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 group-focus-within:text-amber-600 transition-colors" size={18} />
                <input
                  type="email" required value={data.email}
                  onChange={e => setData(d => ({ ...d, email: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-amber-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all placeholder:text-gray-400 text-[var(--color-choco-900)] bg-amber-50/30"
                  placeholder={t('login.emailPlaceholder', 'name@example.com')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--color-choco-800)] mb-1.5 ml-1 flex justify-between">
                {t('login.passwordLabel', 'Password')}
                <Link to="/forgot-password" className="text-amber-600 hover:text-amber-700 transition-colors">{t('login.forgotPassword', 'Forgot?')}</Link>
              </label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 group-focus-within:text-amber-600 transition-colors" size={18} />
                <input
                  type="password" required value={data.password}
                  onChange={e => setData(d => ({ ...d, password: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-amber-100 focus:border-amber-400 focus:ring-4 focus:ring-amber-50 outline-none transition-all placeholder:text-gray-400 text-[var(--color-choco-900)] bg-amber-50/30"
                  placeholder={t('login.passwordPlaceholder', '••••••••')}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me" name="remember-me" type="checkbox"
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-[var(--color-choco-600)] cursor-pointer select-none">
              {t('login.rememberMe', 'Keep me logged in')}
            </label>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full h-12 flex justify-center items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-2xl shadow-lg shadow-amber-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>{t('login.submitBtn', 'Sign In')} <FiChevronRight /> </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[var(--color-choco-600)]">
          {t('login.noAccount', "Don't have an account?")}{' '}
          <Link to="/register" className="font-bold text-amber-600 hover:text-amber-800 transition-colors">
            {t('login.createLink', 'Create one today')}
          </Link>
        </p>
      </div>
    </div>
  );
}
