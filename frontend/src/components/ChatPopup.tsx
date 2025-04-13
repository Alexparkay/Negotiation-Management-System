import React, { useState, useRef, useEffect } from 'react';
import { MdChatBubbleOutline, MdClose, MdSupportAgent, MdOutlineSend, MdOutlineInfo, MdOutlineStorefront, MdOutlineShoppingCart, MdOutlineAssignment } from 'react-icons/md';
import { getChatResponse, ChatMessage as OpenAIChatMessage } from '../services/openaiService';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<OpenAIChatMessage[]>([
    {
      role: 'system',
      content: 'You are a helpful assistant for Marx Technology, a platform that manages global supplier relationships. You can provide information about suppliers, orders, contracts, and general inquiries. You should be conversational and helpful.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Focus input when chat is opened
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: query,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add user message to chat history for OpenAI
    const userChatMessage: OpenAIChatMessage = {
      role: 'user',
      content: query
    };
    
    const updatedChatHistory = [...chatHistory, userChatMessage];
    setChatHistory(updatedChatHistory);
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Get response from OpenAI with the full conversation history
      const response = await getChatResponse(updatedChatHistory);
      
      // Add assistant message to chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Add assistant response to chat history for context in future exchanges
      setChatHistory([...updatedChatHistory, { role: 'assistant', content: response }]);
    } catch (err) {
      console.error('Error in chat flow:', err);
      setError('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
      setQuery('');
      // Focus back on input after response
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Function to get message icon based on content
  const getMessageIcon = (content: string) => {
    if (content.toLowerCase().includes('supplier') || content.toLowerCase().includes('vendor')) {
      return <MdOutlineStorefront className="text-primary" />;
    } else if (content.toLowerCase().includes('contract') || content.toLowerCase().includes('order')) {
      return <MdOutlineShoppingCart className="text-secondary" />;
    } else if (content.toLowerCase().includes('task') || content.toLowerCase().includes('priority')) {
      return <MdOutlineAssignment className="text-accent" />;
    } else {
      return <MdOutlineInfo className="text-info" />;
    }
  };

  // Function to format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to handle suggestion clicks
  const handleSuggestion = (suggestionText: string) => {
    setQuery(suggestionText);
    setTimeout(() => handleSubmit(new Event('submit') as any), 100);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-8 right-8 z-50 rounded-full shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        } w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-800 p-0 border-0 overflow-hidden`}
        aria-label="Open Chat Assistant"
      >
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <MdChatBubbleOutline className="text-white text-5xl" />
        </div>
      </button>

      {/* Chat Widget - Larger Size */}
      <div
        className={`fixed bottom-8 right-8 z-50 w-[98vw] max-w-4xl h-[85vh] transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100 scale-100 shadow-2xl' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-xl h-full flex flex-col overflow-hidden border border-gray-200 shadow-2xl">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <MdSupportAgent className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Marx AI Assistant</h3>
                <div className="text-xs text-white/70 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="btn btn-sm btn-circle bg-white/20 hover:bg-white/30 border-none"
              aria-label="Close Chat Assistant"
            >
              <MdClose className="text-white text-xl" />
            </button>
          </div>

          {/* WhatsApp-style Chat Content Area */}
          <div className="flex-grow overflow-y-auto bg-gray-50 p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="bg-blue-100 p-6 rounded-full">
                  <MdSupportAgent className="text-blue-600 text-5xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Marx AI Assistant</h3>
                  <p className="text-gray-600 max-w-md">
                    I can help with information about suppliers, orders, compliance, and more. What would you like to know today?
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'assistant' && (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                        {getMessageIcon(message.content)}
                      </div>
                    )}
                    
                    <div 
                      className={`max-w-[80%] p-4 ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-xl rounded-bl-xl rounded-br-sm' 
                          : 'bg-white text-gray-800 rounded-t-xl rounded-br-xl rounded-bl-sm border border-gray-200 shadow-sm'
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs opacity-70 mt-2 text-right">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                
                {error && (
                  <div className="flex justify-center">
                    <div className="bg-red-100 text-red-600 p-4 rounded-lg text-sm max-w-[85%]">
                      {error}
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          
          {/* Input Section - Fixed at the bottom */}
          <div className="bg-white border-t border-gray-200 p-4 space-y-4">
            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2">
              <button 
                className="btn btn-sm btn-ghost bg-blue-50 hover:bg-blue-100 rounded-full text-blue-700"
                onClick={() => handleSuggestion("What's the status of our supplier Acme Corp?")}
              >
                <MdOutlineStorefront className="text-sm text-blue-600" />
                <span className="text-xs">Supplier Status</span>
              </button>
              <button 
                className="btn btn-sm btn-ghost bg-blue-50 hover:bg-blue-100 rounded-full text-blue-700"
                onClick={() => handleSuggestion("What are the overdue orders?")}
              >
                <MdOutlineAssignment className="text-sm text-blue-600" />
                <span className="text-xs">Overdue Orders</span>
              </button>
              <button 
                className="btn btn-sm btn-ghost bg-blue-50 hover:bg-blue-100 rounded-full text-blue-700"
                onClick={() => handleSuggestion("Which contracts are expiring soon?")}
              >
                <MdOutlineShoppingCart className="text-sm text-blue-600" />
                <span className="text-xs">Expiring Contracts</span>
              </button>
            </div>
            
            {/* Search input */}
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <div className="relative flex-grow">
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Type your message..." 
                  className="input bg-gray-50 border border-gray-200 w-full pr-12 focus:border-blue-500 text-gray-800 placeholder-gray-400" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-sm bg-blue-600 hover:bg-blue-700 border-none"
                  disabled={isLoading || !query.trim()}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <MdOutlineSend className="text-white text-xl" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPopup; 