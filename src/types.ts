export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  type: 'user' | 'assistant';
  products?: Product[];
  isOrderStatus?: boolean;
  isOutfitReview?: boolean;
  additionalInfo?: string;
}