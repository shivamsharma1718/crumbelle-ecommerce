import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store';
import PageTransition from '@/components/layout/PageTransition/PageTransition';

// ── Layouts ────────────────────────────────────────────────────────────────
import MainLayout from '@/components/layout/MainLayout';

// ── Eager pages ────────────────────────────────────────────────────────────
import Home from '@/pages/Home/Home';

// ── Lazy pages ─────────────────────────────────────────────────────────────
const Shop              = lazy(() => import('@/pages/Shop/Shop'));
const ProductDetail     = lazy(() => import('@/pages/ProductDetail/ProductDetail'));
const Cart              = lazy(() => import('@/pages/Cart/Cart'));
const Checkout          = lazy(() => import('@/pages/Checkout/Checkout'));
const OrderConfirmation = lazy(() => import('@/pages/OrderConfirmation/OrderConfirmation'));
const Login             = lazy(() => import('@/pages/Auth/Login'));
const Register          = lazy(() => import('@/pages/Auth/Register'));
const Account           = lazy(() => import('@/pages/Account/Account'));
const About             = lazy(() => import('@/pages/About/About'));
const Contact           = lazy(() => import('@/pages/Contact/Contact'));
const Blog              = lazy(() => import('@/pages/Blog/Blog'));
const BlogPost          = lazy(() => import('@/pages/Blog/BlogPost'));
const NotFound          = lazy(() => import('@/pages/NotFound/NotFound'));

// ── Fallback ───────────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full border-4 border-amber-100 border-t-amber-500 animate-spin shadow-inner" />
        <p className="text-amber-800 font-black font-accent text-xs uppercase tracking-widest animate-pulse">Loading Experience...</p>
      </div>
    </div>
  );
}

// ── Protected route ────────────────────────────────────────────────────────
function PrivateRoute({ children }) {
  const user = useAuthStore(s => s.user);
  return user ? children : <Navigate to="/login" replace />;
}

// ── Public-only route (redirect if logged in) ──────────────────────────────
function PublicRoute({ children }) {
  const user = useAuthStore(s => s.user);
  return !user ? children : <Navigate to="/account" replace />;
}

// ── Router ─────────────────────────────────────────────────────────────────
export default function AppRouter() {
  const location = useLocation();

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route index element={<PageTransition><Home /></PageTransition>} />

            {/* Shop */}
            <Route path="shop"           element={<PageTransition><Shop /></PageTransition>} />
            <Route path="shop/:category" element={<PageTransition><Shop /></PageTransition>} />
            <Route path="product/:slug"  element={<PageTransition><ProductDetail /></PageTransition>} />
            <Route path="search"         element={<PageTransition><Shop /></PageTransition>} />

            {/* Cart & Checkout */}
            <Route path="cart"     element={<PageTransition><Cart /></PageTransition>} />
            <Route path="checkout" element={<PageTransition><PrivateRoute><Checkout /></PrivateRoute></PageTransition>} />
            <Route path="order-confirmation/:id" element={<PageTransition><PrivateRoute><OrderConfirmation /></PrivateRoute></PageTransition>} />

            {/* Auth */}
            <Route path="login"    element={<PageTransition><PublicRoute><Login /></PublicRoute></PageTransition>} />
            <Route path="register" element={<PageTransition><PublicRoute><Register /></PublicRoute></PageTransition>} />
            <Route path="account"  element={<PageTransition><PrivateRoute><Account /></PrivateRoute></PageTransition>} />

            {/* Info pages */}
            <Route path="about"   element={<PageTransition><About /></PageTransition>} />
            <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="blog"    element={<PageTransition><Blog /></PageTransition>} />
            <Route path="blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />

            {/* 404 */}
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </MainLayout>
  );
}

