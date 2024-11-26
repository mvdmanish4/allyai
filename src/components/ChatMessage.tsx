import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { Heart, MessageSquare, Calendar, Briefcase, PartyPopper } from 'lucide-react';
import OrderStatus from './OrderStatus';
import OutfitReview from './OutfitReview';
import ProductSummary from './ProductSummary';
import ChatOptions from './ChatOptions';
import ThinkingDots from './ThinkingDots';

interface ChatMessageProps {
  message: ChatMessageType;
  isLatestAssistantMessage: boolean;
  onOptionSelect?: (option: string) => void;
}

export default function ChatMessage({ message, isLatestAssistantMessage, onOptionSelect }: ChatMessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);
  const [streamedText, setStreamedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);
  const [isThinking, setIsThinking] = useState(true);

  useEffect(() => {
    if (isLatestAssistantMessage && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isLatestAssistantMessage]);

  useEffect(() => {
    if (message.type === 'assistant' && isLatestAssistantMessage) {
      setStreamedText('');
      setIsStreaming(true);
      setIsThinking(true);
      
      // Initial thinking delay
      const thinkingDelay = setTimeout(() => {
        setIsThinking(false);
        let index = 0;
        const text = message.text;
        
        const streamInterval = setInterval(() => {
          if (index < text.length) {
            setStreamedText(text.substring(0, index + 1));
            index++;
          } else {
            clearInterval(streamInterval);
            setIsStreaming(false);
          }
        }, 50); // Slowed down the streaming speed

        return () => clearInterval(streamInterval);
      }, 2000);

      return () => clearTimeout(thinkingDelay);
    }
  }, [message, isLatestAssistantMessage]);

  const occasionOptions = [
    { icon: PartyPopper, label: 'Outdoor events' },
    { icon: Briefcase, label: 'Formal events' },
    { icon: Calendar, label: 'Weddings' }
  ];

  const showOptions = message.type === 'assistant' && 
                     message.text.includes('Which occasion') && 
                     isLatestAssistantMessage && 
                     !isStreaming;

  return (
    <div className={`mb-6`} ref={messageRef}>
      <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`inline-block max-w-[80%] ${
            message.type === 'user'
              ? 'bg-indigo-600 text-white rounded-l-lg rounded-tr-lg'
              : 'bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg'
          } p-4 shadow-sm`}
        >
          {message.type === 'assistant' && isLatestAssistantMessage ? (
            isThinking ? (
              <ThinkingDots />
            ) : (
              <p>{streamedText}</p>
            )
          ) : (
            <p>{message.text}</p>
          )}
          {message.type === 'assistant' && message.additionalInfo && !isStreaming && !isThinking && (
            <div className="mt-4 prose prose-sm">
              <p className="whitespace-pre-line">{message.additionalInfo}</p>
            </div>
          )}
        </div>
      </div>

      {showOptions && (
        <ChatOptions options={occasionOptions} onSelect={onOptionSelect || (() => {})} />
      )}
      
      {message.type === 'assistant' && !isStreaming && !isThinking && (
        <div className="mt-6">
          {message.isOrderStatus ? (
            <OrderStatus status="shipped" />
          ) : message.isOutfitReview ? (
            <OutfitReview />
          ) : (
            message.products && message.products.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {message.products.map((product) => (
                  <div key={product.id} className="group relative bg-white rounded-lg shadow-sm overflow-visible">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-50">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                      <div className="mt-1.5 flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900">${product.price.toFixed(2)}</p>
                        <button className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200">
                          <MessageSquare className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Click for details</p>
                    </div>
                    <ProductSummary product={product} />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}