import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) => {
        const { items } = get();
        const exists = items.some(i => i.id === product.id);
        if (exists) {
          set({ items: items.filter(i => i.id !== product.id) });
          toast('Removed from wishlist', { icon: '💔' });
        } else {
          set({ items: [...items, product] });
          toast.success('Added to wishlist!', { icon: '❤️' });
        }
      },

      isWishlisted: (productId) => get().items.some(i => i.id === productId),
      clear: () => set({ items: [] }),
    }),
    { name: 'madhab_wishlist', version: 1 }
  )
);
