import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts, getCategories, addSearchHistory } from '../services/api';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import { useAuth } from '../context/AuthContext';
import { Search, X } from 'lucide-react';

export default function ProductListingPage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [products, setProducts] = useState([]);
  const [categories, setCategoriesList] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch categories once
  useEffect(() => {
    getCategories()
      .then((res) => setCategoriesList(res.data.categories))
      .catch(console.error);
  }, []);

  // Update searchTerm when URL query changes
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchTerm(q);
  }, [searchParams]);

  // Fetch products whenever filters or search term change
  useEffect(() => {
    setLoading(true);
    const params = { ...filters };
    if (searchTerm.trim()) {
      params.q = searchTerm.trim();
    }

    const timer = setTimeout(() => {
      getProducts(params)
        .then((res) => setProducts(res.data.products || []))
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timer);
  }, [filters, searchTerm]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
      if (user) {
        addSearchHistory(searchTerm.trim()).catch((err) =>
          console.error('Failed to log catalog search', err)
        );
      }
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  return (
    <div>
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Browse our catalog or filter by specs, category, and budget
          </p>
        </div>

        {/* Manual Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, brand, or specs..."
            className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-9 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs"
          />
          <Search size={16} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 p-0.5"
            >
              <X size={14} />
            </button>
          )}
        </form>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <div className="w-64 flex-shrink-0 hidden md:block">
          <ProductFilters filters={filters} setFilters={setFilters} categories={categories} />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {searchTerm && (
            <div className="mb-4 flex items-center justify-between text-sm text-gray-600 bg-white border border-gray-200 rounded-lg px-4 py-2">
              <span>
                Showing results for &ldquo;<strong>{searchTerm}</strong>&rdquo; ({products.length} found)
              </span>
              <button
                onClick={handleClearSearch}
                className="text-indigo-600 hover:text-indigo-800 font-medium text-xs cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}

          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
}
