import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import MobileMenu from './MobileMenu/MobileMenu';
import CartSidebar from './CartSidebar/CartSidebar';

export default function MainLayout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-premium-gradient selection:bg-amber-100 selection:text-amber-900 overflow-x-hidden">
      <Header />
      <MobileMenu />
      <CartSidebar />
      <main className="flex-1 flex flex-col pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}

