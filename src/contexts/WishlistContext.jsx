import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('madhab_wishlist') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('madhab_wishlist', JSON.stringify(items));
  }, [items]);

  const toggle = (product) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        toast.success('Removed from wishlist');
        return prev.filter(i => i.id !== product.id);
      }
      toast.success('Added to wishlist ❤️');
      return [...prev, product];
    });
  };

  const isWishlisted = (id) => items.some(i => i.id === id);
  const clearWishlist = () => { setItems([]); };

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, clearWishlist, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
