import React, { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const suggestedQuestions = [
    "Order Status",
    "Outfit Reviews",
    "Show me dark wash jeans"
  ];

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
    onSend(question);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-50 to-transparent">
      {/* Suggested Questions */}
      <div className="max-w-3xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleSuggestedQuestion(question)}
            className="px-3 py-1.5 bg-white border border-gray-200 text-sm text-gray-700 rounded-full hover:bg-gray-50 whitespace-nowrap shadow-sm transition-all duration-200"
          >
            {question}
          </button>
        ))}
      </div>

      {/* Chat Input */}
      <div className="max-w-3xl mx-auto px-4 pb-4">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about products..."
            className="w-full px-4 pr-12 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-indigo-600 focus:outline-none"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}