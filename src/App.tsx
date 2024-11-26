import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ChatInterface from './components/ChatInterface';
import ChatToggle from './components/ChatToggle';
import { ChatMessage } from './types';
import { products } from './data/products';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatView, setIsChatView] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [blackJeansFlow, setBlackJeansFlow] = useState({
    inProgress: false,
    step: 0,
    gender: '',
    occasion: ''
  });

  const handleMessage = useCallback((query: string) => {
    const isOrderStatus = query.toLowerCase() === 'order status' || query.toLowerCase().includes('order status');
    const isOutfitReview = query.toLowerCase() === 'outfit reviews' || query.toLowerCase().includes('reviews');
    const isBlackJeans = query.toLowerCase().includes('black jeans');
    const isAllProducts = query.toLowerCase().includes('all products');
    const isGeneralQuery = query.toLowerCase().includes('what products') || 
                          query.toLowerCase().includes('show me');
    
    let responseText = '';
    let filteredProducts = products;
    let additionalInfo = '';

    // Handle Black Jeans conversation flow
    if (isBlackJeans && !blackJeansFlow.inProgress) {
      setBlackJeansFlow({ inProgress: true, step: 1, gender: '', occasion: '' });
      responseText = 'Is it for men or women?';
      filteredProducts = [];
    } else if (blackJeansFlow.inProgress) {
      if (blackJeansFlow.step === 1) {
        const gender = query.toLowerCase();
        if (gender.includes('men') || gender.includes('women')) {
          setBlackJeansFlow(prev => ({ ...prev, step: 2, gender }));
          responseText = 'Which occasion do you want it for?\n\n• Outdoor events\n• Formal events\n• Weddings';
          filteredProducts = [];
        }
      } else if (blackJeansFlow.step === 2) {
        setBlackJeansFlow({ inProgress: false, step: 0, gender: '', occasion: '' });
        responseText = 'Here are our top-rated black jeans:';
        filteredProducts = products.filter(p => p.category === 'Black Jeans');
        additionalInfo = `Black jeans are a versatile and stylish choice for ${query.toLowerCase()}, offering a sleek appearance. Here are some top-rated options in our store for men, all priced under $100:

Things to consider while buying:
        1. Fit: Choose a fit that complements your body type and ensures comfort throughout the event.
        2. Material: Opt for denim with a slight stretch to allow ease of movement.
        3. Styling: Pair your black jeans with a crisp white shirt or a casual tee, and consider layering with a jacket or blazer for cooler evenings.`;
      }
    } else if (isOrderStatus) {
      responseText = 'Here is your order status:';
      filteredProducts = [];
    } else if (isOutfitReview) {
      responseText = 'Here is the review summary:';
      filteredProducts = [];
    } else if (isAllProducts || isGeneralQuery) {
      responseText = 'Here are all our available products:';
      filteredProducts = products;
    } else {
      filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      responseText = `Here are some products that match "${query}":`;
      if (filteredProducts.length === 0) {
        filteredProducts = products;
        responseText = 'No exact matches found. Here are all our products:';
      }
    }

    const newMessages: ChatMessage[] = [
      {
        id: Date.now().toString(),
        text: query,
        type: 'user',
      },
      {
        id: (Date.now() + 1).toString(),
        text: responseText,
        type: 'assistant',
        products: filteredProducts,
        isOrderStatus: isOrderStatus,
        isOutfitReview: isOutfitReview,
        additionalInfo: additionalInfo
      },
    ];
    
    setMessages((prev) => [...prev, ...newMessages]);
    setIsChatView(true);
    setHasSearched(true);
  }, [blackJeansFlow]);

  const handleSearch = useCallback((query: string) => {
    handleMessage(query);
    setSearchQuery('');
  }, [handleMessage]);

  const handleExitChat = useCallback(() => {
    setIsChatView(false);
  }, []);

  const handleSwitchToChat = useCallback(() => {
    setIsChatView(true);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          isChatView={isChatView}
        />
        
        {isChatView ? (
          <>
            <ChatInterface messages={messages} onSend={handleMessage} />
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products searchQuery={searchQuery} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        )}
        
        {hasSearched && (
          <ChatToggle
            isChatView={isChatView}
            onToggle={handleExitChat}
            onSwitchToChat={handleSwitchToChat}
          />
        )}
      </div>
    </Router>
  );
}

export default App;