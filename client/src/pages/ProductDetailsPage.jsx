import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getProductReviews } from '../services/api';
import { Star, Package, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProductById(id), getProductReviews(id)])
      .then(([prodRes, revRes]) => {
        setProduct(prodRes.data.product);
        setReviews(revRes.data.reviews);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (!product) return <div className="text-center py-20 text-gray-500">Product not found.</div>;

  const specs = typeof product.specifications === 'string'
    ? JSON.parse(product.specifications)
    : product.specifications;

  return (
    <div>
      <Link to="/products" className="text-indigo-600 hover:underline text-sm flex items-center gap-1 mb-6">
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Image */}
          <img src={product.image_url} alt={product.name} className="w-full h-80 object-cover rounded-lg bg-gray-100" />

          {/* Info */}
          <div>
            <p className="text-sm text-indigo-600 font-medium uppercase">{product.category}</p>
            <h1 className="text-2xl font-bold text-gray-800 mt-1">{product.name}</h1>
            <p className="text-gray-500 mt-1">{product.brand}</p>

            <div className="flex items-center gap-4 mt-4">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
              <span className="flex items-center gap-1 text-yellow-600">
                <Star size={18} fill="currentColor" /> {product.rating}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Package size={16} className={product.stock > 0 ? 'text-green-600' : 'text-red-500'} />
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <p className="text-gray-600 mt-4 text-sm leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Specifications */}
        {specs && (
          <div className="border-t border-gray-200 p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Specifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase">{key.replace(/_/g, ' ')}</p>
                  <p className="text-sm font-medium text-gray-800 mt-1">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="border-t border-gray-200 p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Reviews ({reviews.length})</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-sm">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800 text-sm">{review.user_name}</span>
                    <span className="flex items-center gap-1 text-sm text-yellow-600">
                      <Star size={14} fill="currentColor" /> {review.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
