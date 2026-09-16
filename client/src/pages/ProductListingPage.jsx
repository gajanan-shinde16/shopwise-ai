import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';

export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategoriesList] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch categories once
  useEffect(() => {
    getCategories().then((res) => setCategoriesList(res.data.categories)).catch(console.error);
  }, []);

  // Fetch products whenever filters change
  useEffect(() => {
    setLoading(true);
    getProducts(filters)
      .then((res) => setProducts(res.data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Products</h1>
      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <div className="w-64 flex-shrink-0 hidden md:block">
          <ProductFilters filters={filters} setFilters={setFilters} categories={categories} />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
}
