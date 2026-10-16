import { useState } from 'react';
import ChatWindow from '../components/ai/ChatWindow';
import ChatInput from '../components/ai/ChatInput';
import { sendAIChat } from '../services/api';
import { Bot } from 'lucide-react';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (query) => {
    // Add user message to chat
    const userMsg = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Build chat history for context (last 10 messages)
      const chatHistory = [...messages, userMsg].slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await sendAIChat(query, chatHistory);

      // Add AI response with tool steps and product cards
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: res.data.response,
          toolsUsed: res.data.toolsUsed,
          products: res.data.products,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: err.response?.data?.message || 'Sorry, something went wrong. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 text-white px-6 py-4 flex items-center gap-3">
        <Bot size={24} />
        <div>
          <h1 className="font-semibold">ShopWise AI Assistant</h1>
          <p className="text-xs text-indigo-200">Ask me to find, compare, or recommend products</p>
        </div>
      </div>

      {/* Chat area */}
      <ChatWindow messages={messages} loading={loading} />

      {/* Input area */}
      <div className="border-t border-gray-200 p-4">
        <ChatInput onSend={handleSend} loading={loading} />
      </div>
    </div>
  );
}
