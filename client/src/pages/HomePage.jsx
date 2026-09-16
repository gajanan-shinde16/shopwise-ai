import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductGrid from '../components/products/ProductGrid';
import { MessageSquare, Search, Cpu } from 'lucide-react';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ sort: 'rating_desc', limit: 6 })
      .then((res) => setFeatured(res.data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-12 text-center">
        <h1 className="text-4xl font-bold">Shop Smarter with AI</h1>
        <p className="mt-3 text-lg text-indigo-100 max-w-2xl mx-auto">
          Tell our AI assistant what you need in plain language. It searches, filters, compares, and recommends the best products for you.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Link
            to="/ai-assistant"
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 flex items-center gap-2"
          >
            <MessageSquare size={20} />
            Try AI Assistant
          </Link>
          <Link
            to="/products"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 flex items-center gap-2"
          >
            <Search size={20} />
            Browse Products
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: MessageSquare, title: 'Natural Language Search', desc: 'Describe what you need and AI finds it' },
          { icon: Cpu, title: 'Smart Comparison', desc: 'AI compares products and explains trade-offs' },
          { icon: Search, title: 'Review Analysis', desc: 'AI summarizes what real users think' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <Icon size={32} className="mx-auto text-indigo-600" />
            <h3 className="font-semibold text-gray-800 mt-3">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{desc}</p>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Top Rated Products</h2>
          <Link to="/products" className="text-indigo-600 hover:underline text-sm font-medium">View All →</Link>
        </div>
        <ProductGrid products={featured} loading={loading} />
      </section>
    </div>
  );
}
