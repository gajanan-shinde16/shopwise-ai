import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSearchHistory, deleteSearchHistory, clearSearchHistory } from '../services/api';
import { History, Trash2, Search, ArrowRight, MessageSquare } from 'lucide-react';

export default function SearchHistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHistory = () => {
    setLoading(true);
    getSearchHistory()
      .then((res) => setHistory(res.data.history || []))
      .catch((err) => console.error('Failed to fetch search history', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSearchHistory(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Failed to delete history item', err);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear your entire search history?')) return;
    try {
      await clearSearchHistory();
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear search history', err);
    }
  };

  const handleSearchInCatalog = (query) => {
    navigate(`/products?q=${encodeURIComponent(query)}`);
  };

  const handleAskAssistant = (query) => {
    navigate('/ai-assistant');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Search History</h1>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 h-16 animate-pulse p-4" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Search History</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Your previous queries and product searches
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 size={13} />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <History size={26} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">No search history</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            When you search in the catalog or talk with the shopping assistant, your queries will appear here.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <Search size={15} />
              <span>Browse Catalog</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-xs">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 flex items-center justify-between hover:bg-gray-50/70 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="w-9 h-9 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <Search size={16} />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 text-sm truncate">
                    {item.query}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(item.created_at).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleSearchInCatalog(item.query)}
                  className="text-xs font-medium text-gray-600 hover:text-indigo-600 bg-gray-100 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  title="Search in catalog"
                >
                  <span>Search Catalog</span>
                  <ArrowRight size={12} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete entry"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
