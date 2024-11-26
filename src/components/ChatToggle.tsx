import React from 'react';
import { Store, MessageSquare } from 'lucide-react';

interface ChatToggleProps {
  isChatView: boolean;
  onToggle: () => void;
  onSwitchToChat: () => void;
}

export default function ChatToggle({ isChatView, onToggle, onSwitchToChat }: ChatToggleProps) {
  return (
    <div className="fixed bottom-6 right-6">
      <div className="bg-white rounded-full shadow-lg p-1 flex items-center">
        <button
          onClick={onToggle}
          className={`p-3 rounded-full transition-colors duration-200 ${
            !isChatView ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Return to shopping"
        >
          <Store className="h-6 w-6" />
        </button>
        <button
          onClick={onSwitchToChat}
          className={`p-3 rounded-full transition-colors duration-200 ${
            isChatView ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Continue chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}