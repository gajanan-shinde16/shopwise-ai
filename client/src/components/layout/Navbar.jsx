import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, LogOut, Heart, History, MessageSquare, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
          <ShoppingBag size={24} />
          ShopWise AI
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/products" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
            Products
          </Link>
          <Link to="/ai-assistant" className="text-gray-600 hover:text-indigo-600 text-sm font-medium flex items-center gap-1">
            <MessageSquare size={16} />
            AI Assistant
          </Link>

          {user ? (
            <>
              <Link to="/wishlist" className="text-gray-600 hover:text-indigo-600">
                <Heart size={20} />
              </Link>
              <Link to="/search-history" className="text-gray-600 hover:text-indigo-600">
                <History size={20} />
              </Link>
              <div className="flex items-center gap-3 ml-2">
                <span className="text-sm text-gray-700 flex items-center gap-1">
                  <User size={16} />
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
