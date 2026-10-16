import { Link } from 'react-router-dom';
import { Bot, User, Wrench, Star, ExternalLink, ShoppingBag } from 'lucide-react';
import FormattedMessage from './FormattedMessage';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Bot size={18} className="text-indigo-600" />
        </div>
      )}

      <div className={`max-w-[85%] md:max-w-[78%] ${isUser ? 'order-first' : ''}`}>
        {/* Tool steps (shown before AI response) */}
        {message.toolsUsed && message.toolsUsed.length > 0 && (
          <div className="mb-2 space-y-1">
            {message.toolsUsed.map((tool, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100/80 border border-gray-200/60 rounded-lg px-2.5 py-1"
              >
                <Wrench size={12} className="text-indigo-500" />
                <span className="font-medium text-gray-700">{tool.tool}</span>
                <span className="text-gray-400 truncate max-w-xs">
                  ({typeof tool.input === 'object' ? JSON.stringify(tool.input) : tool.input})
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Message bubble */}
        <div
          className={`rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-indigo-600 text-white rounded-tr-sm px-4 py-3 whitespace-pre-wrap'
              : 'bg-white border border-gray-200/90 shadow-sm text-gray-800 rounded-tl-sm p-4'
          }`}
        >
          {isUser ? (
            message.content
          ) : (
            <FormattedMessage content={message.content} />
          )}
        </div>

        {/* Product cards (shown after AI response) */}
        {message.products && message.products.length > 0 && (
          <div className="mt-3.5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold px-1">
              <ShoppingBag size={13} className="text-indigo-600" />
              <span>Recommended Products ({message.products.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {message.products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white border border-gray-200 hover:border-indigo-400 rounded-xl p-3 hover:shadow-md transition-all group"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-lg bg-gray-100 flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {product.brand} · {product.category}
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="font-bold text-gray-900 text-sm">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                        <Star size={12} fill="currentColor" /> {product.rating}
                      </span>
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-gray-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
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
