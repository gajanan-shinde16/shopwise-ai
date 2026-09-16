export default function ProductFilters({ filters, setFilters, categories }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
      <h3 className="font-semibold text-gray-800">Filters</h3>

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-gray-600">Category</label>
        <select
          value={filters.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Min Price */}
      <div>
        <label className="text-sm font-medium text-gray-600">Min Price (₹)</label>
        <input
          type="number"
          value={filters.minPrice || ''}
          onChange={(e) => handleChange('minPrice', e.target.value)}
          placeholder="0"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Max Price */}
      <div>
        <label className="text-sm font-medium text-gray-600">Max Price (₹)</label>
        <input
          type="number"
          value={filters.maxPrice || ''}
          onChange={(e) => handleChange('maxPrice', e.target.value)}
          placeholder="100000"
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Sort */}
      <div>
        <label className="text-sm font-medium text-gray-600">Sort By</label>
        <select
          value={filters.sort || ''}
          onChange={(e) => handleChange('sort', e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating_desc">Rating: High to Low</option>
        </select>
      </div>

      {/* Clear */}
      <button
        onClick={() => setFilters({})}
        className="w-full text-sm text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
      >
        Clear Filters
      </button>
    </div>
  );
}
