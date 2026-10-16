import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWishlist, removeFromWishlist } from '../services/api';
import { Heart, Trash2, Star, ShoppingBag, ArrowRight } from 'lucide-react';

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = () => {
    setLoading(true);
    getWishlist()
      .then((res) => setItems(res.data.wishlist || []))
      .catch((err) => console.error('Failed to fetch wishlist', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await removeFromWishlist(productId);
      setItems((prev) => prev.filter((item) => item.id !== productId));
    } catch (err) {
      console.error('Failed to remove from wishlist', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 h-64 animate-pulse p-4" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
        {items.length > 0 && (
          <Link
            to="/products"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={14} />
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={26} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Your wishlist is empty</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Save items you like while browsing so you can easily review them later.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <ShoppingBag size={16} />
            <span>Explore Catalog</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover bg-gray-50"
                  />
                  <button
                    onClick={(e) => handleRemove(product.id, e)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 p-2 rounded-full shadow-sm transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="p-4">
                  <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="font-semibold text-gray-900 mt-1 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{product.brand}</p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                      <Star size={13} fill="currentColor" />
                      {product.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link
                  to={`/products/${product.id}`}
                  className="w-full text-center block bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 text-gray-700 text-sm font-medium py-2 rounded-lg border border-gray-200 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
