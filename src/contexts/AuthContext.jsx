import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USER = {
  id: 'u1', firstName: 'Priya', lastName: 'Sharma',
  email: 'priya@example.com', phone: '9876543210',
  loyaltyPoints: 240, avatar: null,
};

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('madhab_user');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    // Mock – replace with real API call
    await new Promise(r => setTimeout(r, 800));
    if (email && password) {
      const u = { ...DEMO_USER, email };
      localStorage.setItem('madhab_user',  JSON.stringify(u));
      localStorage.setItem('madhab_token', 'mock-jwt-token');
      setUser(u);
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const register = async (data) => {
    await new Promise(r => setTimeout(r, 800));
    const u = { ...DEMO_USER, ...data, id: 'u_' + Date.now() };
    localStorage.setItem('madhab_user',  JSON.stringify(u));
    localStorage.setItem('madhab_token', 'mock-jwt-token');
    setUser(u);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('madhab_user');
    localStorage.removeItem('madhab_token');
    setUser(null);
  };

  const updateProfile = (data) => {
    const updated = { ...user, ...data };
    localStorage.setItem('madhab_user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
