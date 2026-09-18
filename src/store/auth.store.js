import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEMO_USER = {
  id: 'u1',
  firstName: 'Priya',
  lastName: 'Sharma',
  email: 'priya@example.com',
  phone: '9876543210',
  loyaltyPoints: 240,
  avatar: null,
  addresses: [
    { id: 'a1', label: 'Home', street: '42, Park Street', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', isDefault: true },
  ],
  orders: [],
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,
      error: null,

      login: async ({ email, password }) => {
        set({ loading: true, error: null });
        await new Promise(r => setTimeout(r, 900));
        if (email && password) {
          const user = { ...DEMO_USER, email };
          set({ user, token: 'mock-jwt-token', loading: false });
          return { success: true };
        }
        set({ loading: false, error: 'Invalid credentials' });
        return { success: false, message: 'Invalid credentials' };
      },

      register: async (data) => {
        set({ loading: true, error: null });
        await new Promise(r => setTimeout(r, 900));
        const user = { ...DEMO_USER, ...data, id: 'u_' + Date.now(), loyaltyPoints: 50 };
        set({ user, token: 'mock-jwt-token', loading: false });
        return { success: true };
      },

      logout: () => set({ user: null, token: null }),

      updateProfile: (data) => {
        const updated = { ...get().user, ...data };
        set({ user: updated });
      },

      isAuthenticated: () => !!get().user,
    }),
    { name: 'madhab_auth', version: 1 }
  )
);
