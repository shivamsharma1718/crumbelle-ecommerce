import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('madhab_cart') || '[]'); }
    catch { return []; }
  });
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('madhab_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1, options = {}) => {
    setItems(prev => {
      const key = `${product.id}_${JSON.stringify(options)}`;
      const existing = prev.find(i => i.key === key);
      if (existing) {
        toast.success(`${product.name} quantity updated!`);
        return prev.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i);
      }
      toast.success(`${product.name} added to cart! 🛒`);
      return [...prev, { ...product, quantity, options, key }];
    });
  };

  const removeItem = (key) => {
    setItems(prev => prev.filter(i => i.key !== key));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (key, quantity) => {
    if (quantity < 1) { removeItem(key); return; }
    setItems(prev => prev.map(i => i.key === key ? { ...i, quantity } : i));
  };

  const clearCart = () => { setItems([]); setCoupon(null); };

  const applyCoupon = (code) => {
    const COUPONS = { FRESH10: 10, MADHAB20: 20, SWEET15: 15 };
    if (COUPONS[code.toUpperCase()]) {
      setCoupon({ code: code.toUpperCase(), percent: COUPONS[code.toUpperCase()] });
      toast.success(`Coupon applied! ${COUPONS[code.toUpperCase()]}% off 🎉`);
      return true;
    }
    toast.error('Invalid coupon code');
    return false;
  };

  const subtotal     = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount     = coupon ? Math.round(subtotal * coupon.percent / 100) : 0;
  const deliveryFee  = subtotal >= 499 ? 0 : 49;
  const tax          = Math.round((subtotal - discount) * 0.05);
  const total        = subtotal - discount + deliveryFee + tax;
  const itemCount    = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, itemCount, coupon, subtotal, discount, deliveryFee, tax, total,
      addItem, removeItem, updateQuantity, clearCart, applyCoupon,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
