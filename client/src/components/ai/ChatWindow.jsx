import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { Loader2 } from 'lucide-react';

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-lg font-medium">Ask me anything about products!</p>
          <p className="text-sm mt-2">Try: "Find me a good laptop under ₹70,000 for programming"</p>
        </div>
      )}

      {messages.map((msg, i) => (
        <ChatMessage key={i} message={msg} />
      ))}

      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Loader2 size={16} className="animate-spin" />
          AI is thinking and searching products...
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
