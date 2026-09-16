import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, loading }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='e.g. "I need a laptop under ₹70,000 for coding with 16GB RAM"'
        disabled={loading}
        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={loading || !input.trim()}
        className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
      >
        <Send size={18} />
      </button>
    </form>
  );
}
