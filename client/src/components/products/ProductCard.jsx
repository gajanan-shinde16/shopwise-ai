import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 object-cover bg-gray-100"
      />
      <div className="p-4">
        <p className="text-xs text-indigo-600 font-medium uppercase">{product.category}</p>
        <h3 className="font-semibold text-gray-800 mt-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
          <span className="flex items-center gap-1 text-sm text-yellow-600">
            <Star size={14} fill="currentColor" />
            {product.rating}
          </span>
        </div>
        {product.stock > 0 ? (
          <p className="text-xs text-green-600 mt-2">In Stock</p>
        ) : (
          <p className="text-xs text-red-500 mt-2">Out of Stock</p>
        )}
      </div>
    </Link>
  );
}
