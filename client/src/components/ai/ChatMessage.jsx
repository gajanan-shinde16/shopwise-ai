import { Link } from 'react-router-dom';
import { Bot, User, Wrench, Star, ExternalLink } from 'lucide-react';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
          <Bot size={18} className="text-indigo-600" />
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? 'order-first' : ''}`}>
        {/* Tool steps (shown before AI response) */}
        {message.toolsUsed && message.toolsUsed.length > 0 && (
          <div className="mb-2 space-y-1">
            {message.toolsUsed.map((tool, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-1.5">
                <Wrench size={12} />
                <span className="font-medium">{tool.tool}</span>
                <span className="text-gray-400">
                  ({typeof tool.input === 'object' ? JSON.stringify(tool.input) : tool.input})
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'bg-indigo-600 text-white rounded-tr-sm'
              : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
          }`}
        >
          {message.content}
        </div>

        {/* Product cards (shown after AI response) */}
        {message.products && message.products.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-xs text-gray-500 font-medium">Recommended Products:</p>
            <div className="grid grid-cols-1 gap-2">
              {message.products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-3 hover:border-indigo-300 hover:shadow-md transition-all group"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.brand} · {product.category}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="font-bold text-gray-900 text-sm">₹{product.price.toLocaleString('en-IN')}</span>
                      <span className="flex items-center gap-1 text-xs text-yellow-600">
                        <Star size={12} fill="currentColor" /> {product.rating}
                      </span>
                      {product.stock > 0 ? (
                        <span className="text-xs text-green-600">In Stock</span>
                      ) : (
                        <span className="text-xs text-red-500">Out of Stock</span>
                      )}
                    </div>
                  </div>
                  <ExternalLink size={16} className="text-indigo-400 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <User size={18} className="text-gray-600" />
        </div>
      )}
    </div>
  );
}
