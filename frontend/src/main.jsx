import { createRoot } from 'react-dom/client'
import './index.css';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import WishlistProvider from './context/WishListContext.jsx'
import CartProvider from './context/CartContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    }
  }
});

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </QueryClientProvider>
)