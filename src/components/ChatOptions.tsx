import React from 'react';
import { Calendar, Briefcase, PartyPopper } from 'lucide-react';

interface ChatOptionsProps {
  options: {
    icon: React.ElementType;
    label: string;
  }[];
  onSelect: (option: string) => void;
}

export default function ChatOptions({ options, onSelect }: ChatOptionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {options.map((option, index) => {
        const Icon = option.icon;
        return (
          <button
            key={index}
            onClick={() => onSelect(option.label)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
          >
            <Icon className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}