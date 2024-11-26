import React, { useState, useRef, useEffect } from 'react';
import { Shirt, Palette, Users, Sun, ShoppingCart } from 'lucide-react';
import StreamingText from './StreamingText';
import { Product } from '../types';

interface ProductSummaryProps {
  product: Product;
}

export default function ProductSummary({ product }: ProductSummaryProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && containerRef.current && popupRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // Calculate initial position from the center of the product card
      let top = rect.top + scrollTop + (rect.height / 2);
      let left = rect.left + rect.width + 20; // 20px offset from the card

      // Check if the popup would go below the viewport
      if (rect.top + (popupRect.height / 2) > viewportHeight) {
        top = scrollTop + viewportHeight - popupRect.height - 20; // 20px padding from bottom
      }
      // Check if the popup would go above the viewport
      else if (rect.top - (popupRect.height / 2) < 0) {
        top = scrollTop + 20; // 20px padding from top
      }

      // Check if the popup would go beyond the right edge of the viewport
      if (left + popupRect.width > viewportWidth) {
        left = rect.left - popupRect.width - 20; // Show on the left side of the card
      }

      setPosition({ top, left });
    }
  }, [isVisible]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic here
    console.log('Added to cart:', product.name);
  };

  const summaryData = {
    title: `Explore ${product.name}`,
    details: [
      {
        icon: Shirt,
        label: 'Styles Available:',
        text: 'Classic fit, slim fit, and regular options.'
      },
      {
        icon: Palette,
        label: 'Available Colors:',
        text: 'Multiple color variations to choose from.'
      },
      {
        icon: Users,
        label: 'Outfit Ideas:',
        text: 'Perfect for casual and semi-formal occasions.'
      },
      {
        icon: Sun,
        label: 'Seasonal Options:',
        text: 'Available in different weights and styles.'
      }
    ]
  };

  return (
    <>
      <div 
        ref={containerRef}
        className="absolute inset-0 cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
      {isVisible && (
        <div 
          ref={popupRef}
          className="fixed z-[9999] w-72 bg-white rounded-lg shadow-xl p-4 animate-fadeIn"
          style={{
            top: position.top,
            left: position.left,
            transform: 'translate(0, -50%)',
            maxHeight: 'calc(100vh - 40px)', // Ensure some padding from viewport edges
            overflowY: 'auto'
          }}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <div className="relative">
            {/* Arrow */}
            <div 
              className="absolute w-3 h-3 bg-white transform rotate-45"
              style={{
                left: '-6px',
                top: '50%',
                marginTop: '-6px'
              }}
            />
            
            {/* Content */}
            <div className="relative bg-white rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-4">
                <StreamingText key={`title-${product.id}-${isVisible}`} text={summaryData.title} speed={50} />
              </h3>
              <div className="space-y-3">
                {summaryData.details.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <div key={`${product.id}-${index}-${isVisible}`} className="flex items-start gap-2">
                      <Icon className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                      <div>
                        <span className="font-medium text-sm text-gray-900">{detail.label} </span>
                        <span className="text-sm text-gray-600">
                          <StreamingText 
                            key={`detail-${product.id}-${index}-${isVisible}`} 
                            text={detail.text} 
                            speed={30} 
                          />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="font-medium">Add to Cart - ${product.price.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}