import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProductListingPage from '../pages/ProductListingPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import AIAssistantPage from '../pages/AIAssistantPage';
import ProtectedRoute from '../components/common/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'products', element: <ProductListingPage /> },
      { path: 'products/:id', element: <ProductDetailsPage /> },

      // Protected routes
      { path: 'ai-assistant', element: <ProtectedRoute><AIAssistantPage /></ProtectedRoute> },
      // { path: 'compare', element: <ProtectedRoute><ComparisonPage /></ProtectedRoute> },
      // { path: 'wishlist', element: <ProtectedRoute><WishlistPage /></ProtectedRoute> },
      // { path: 'search-history', element: <ProtectedRoute><SearchHistoryPage /></ProtectedRoute> },
    ],
  },
]);

export default router;
