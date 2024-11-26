import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatInterfaceProps {
  messages: ChatMessageType[];
  onSend: (message: string) => void;
}

export default function ChatInterface({ messages, onSend }: ChatInterfaceProps) {
  const handleOptionSelect = (option: string) => {
    onSend(option);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
      {messages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Start a conversation by typing in the search bar above.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLatestAssistantMessage={
                message.type === 'assistant' &&
                index === messages.length - 1
              }
              onOptionSelect={handleOptionSelect}
            />
          ))}
        </div>
      )}
      <ChatInput onSend={onSend} />
    </div>
  );
}