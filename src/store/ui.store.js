import { create } from 'zustand';

export const useUIStore = create((set) => ({
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isCartSidebarOpen: false,
  searchQuery: '',
  theme: 'light',

  openMobileMenu:  () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set(s => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),

  openSearch:  () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  openCartSidebar:  () => set({ isCartSidebarOpen: true }),
  closeCartSidebar: () => set({ isCartSidebarOpen: false }),
  toggleCartSidebar: () => set(s => ({ isCartSidebarOpen: !s.isCartSidebarOpen })),

  setSearchQuery: (q) => set({ searchQuery: q }),
  toggleTheme: () => set(s => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
}));
