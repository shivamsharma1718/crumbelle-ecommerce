import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import AppRouter from '@/routes/AppRouter';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRouter />
        <Toaster
          position="top-center"
          gutter={10}
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: 'Inter, sans-serif',
              borderRadius: '12px',
              background: '#1c0a00',
              color: '#fffbf0',
              boxShadow: '0 8px 32px rgba(28,10,0,0.25)',
              fontSize: '14px',
              fontWeight: '500',
              padding: '12px 18px',
            },
            success: {
              iconTheme: { primary: '#f59e0b', secondary: '#1c0a00' },
            },
            error: {
              iconTheme: { primary: '#f43f5e', secondary: '#fff' },
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  );
}