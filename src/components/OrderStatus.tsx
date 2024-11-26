import React from 'react';
import { Check, Package, Truck, Home } from 'lucide-react';
import { products } from '../data/products';

interface OrderStatusProps {
  status: 'ordered' | 'shipped' | 'out-for-delivery' | 'delivered';
}

export default function OrderStatus({ status }: OrderStatusProps) {
  const steps = [
    { id: 'ordered', label: 'Ordered', icon: Check },
    { id: 'shipped', label: 'Shipped', icon: Package },
    { id: 'out-for-delivery', label: 'Out for delivery', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: Home },
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === status);
  };

  // Get a sample product for the order preview
  const orderPreviewProduct = products[1];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Arriving November 22</h2>
        <a href="#" className="text-indigo-600 text-sm hover:text-indigo-700">See all orders</a>
      </div>

      {/* Product Preview */}
      <div className="mb-8">
        <img
          src={orderPreviewProduct.image}
          alt="Order preview"
          className="w-24 h-24 object-cover rounded-lg"
        />
      </div>

      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="h-0.5 w-full bg-gray-200">
            <div
              className="h-0.5 bg-indigo-600 transition-all duration-500"
              style={{ width: `${(getCurrentStepIndex() / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCurrent = step.id === status;
            const isComplete = getCurrentStepIndex() >= index;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isComplete ? 'bg-indigo-600' : 'bg-gray-200'
                  } ${isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2' : ''}`}
                >
                  <StepIcon className={`w-4 h-4 ${isComplete ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <span className="mt-2 text-sm font-medium text-gray-600">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-4">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Update delivery instructions
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Cancel order
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Buy again
        </button>
      </div>
    </div>
  );
}