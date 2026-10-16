import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { addToWishlist, removeFromWishlist } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const [wished, setWished] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      alert('Please log in to add items to your wishlist.');
      return;
    }
    if (submitting) return;

    setSubmitting(true);
    try {
      if (wished) {
        await removeFromWishlist(product.id);
        setWished(false);
      } else {
        await addToWishlist(product.id);
        setWished(true);
      }
    } catch (err) {
      console.error('Wishlist error', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow relative flex flex-col justify-between"
    >
      <div>
        <div className="relative">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover bg-gray-100"
          />
          <button
            onClick={toggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-xs transition-colors cursor-pointer ${
              wished
                ? 'bg-red-50 text-red-500'
                : 'bg-white/90 hover:bg-white text-gray-400 hover:text-red-500'
            }`}
            title={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} fill={wished ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-xs text-indigo-600 font-medium uppercase">{product.category}</p>
          <h3 className="font-semibold text-gray-800 mt-1 line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-gray-900">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
            <span className="flex items-center gap-1 text-sm text-yellow-600">
              <Star size={14} fill="currentColor" />
              {product.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        {product.stock > 0 ? (
          <p className="text-xs text-green-600">In Stock ({product.stock} units)</p>
        ) : (
          <p className="text-xs text-red-500">Out of Stock</p>
        )}
      </div>
    </Link>
  );
}
