import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

const COUPONS = { FRESH10: 10, MADHAB20: 20, SWEET15: 15 };

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (product, quantity = 1, options = {}) => {
        const key = `${product.id}_${JSON.stringify(options)}`;
        const { items } = get();
        const existing = items.find(i => i.key === key);
        if (existing) {
          set({ items: items.map(i => i.key === key ? { ...i, quantity: i.quantity + quantity } : i) });
          toast.success(`Updated quantity for ${product.name}!`, { icon: '🛒' });
        } else {
          set({ items: [...items, { ...product, quantity, options, key }] });
          toast.success(`${product.name} added to cart!`, { icon: '🛒' });
        }
      },

      removeItem: (key) => {
        set({ items: get().items.filter(i => i.key !== key) });
        toast('Item removed from cart', { icon: '🗑️' });
      },

      updateQuantity: (key, quantity) => {
        if (quantity < 1) { get().removeItem(key); return; }
        set({ items: get().items.map(i => i.key === key ? { ...i, quantity } : i) });
      },

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (code) => {
        const pct = COUPONS[code.toUpperCase()];
        if (pct) {
          set({ coupon: { code: code.toUpperCase(), percent: pct } });
          toast.success(`Coupon applied! ${pct}% off 🎉`);
          return true;
        }
        toast.error('Invalid coupon code');
        return false;
      },

      removeCoupon: () => set({ coupon: null }),

      // Computed (accessed via selectors)
      getSubtotal: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
      getDiscount: () => {
        const { coupon } = get();
        const sub = get().getSubtotal();
        return coupon ? Math.round(sub * coupon.percent / 100) : 0;
      },
      getDeliveryFee: () => get().getSubtotal() >= 499 ? 0 : 49,
      getTax: () => Math.round((get().getSubtotal() - get().getDiscount()) * 0.05),
      getTotal: () => get().getSubtotal() - get().getDiscount() + get().getDeliveryFee() + get().getTax(),
      getItemCount: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: 'madhab_cart', version: 1 }
  )
);
