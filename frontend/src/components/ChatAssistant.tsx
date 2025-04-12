import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineSearch, MdOutlineSend, MdOutlineInfo, MdOutlineStorefront, MdOutlineShoppingCart, MdOutlineAssignment } from 'react-icons/md';
import { getChatResponse, ChatMessage } from '../services/openaiService';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'system',
      content: 'You are a helpful assistant for Marx Technology, a platform that manages global store openings. You can provide information about stores, tasks, vendors, and general inquiries. You should be conversational and helpful.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
    const userChatMessage: ChatMessage = {
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
    if (content.toLowerCase().includes('store') || content.toLowerCase().includes('location') || content.toLowerCase().includes('opening')) {
      return <MdOutlineStorefront className="text-primary" />;
    } else if (content.toLowerCase().includes('vendor') || content.toLowerCase().includes('contract') || content.toLowerCase().includes('supplier')) {
      return <MdOutlineShoppingCart className="text-secondary" />;
    } else if (content.toLowerCase().includes('task') || content.toLowerCase().includes('checklist') || content.toLowerCase().includes('priority')) {
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
    <div className="w-full">
      {/* Search bar and suggestions - fixed at the top */}
      <div className="w-full space-y-4 sticky top-0 bg-base-100 pt-2 pb-4 z-10 border-b border-base-200">
        {/* Search input */}
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <div className="relative flex-grow">
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Ask me anything..." 
              className="input input-bordered w-full pr-12 focus:border-primary" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost btn-sm"
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <MdOutlineSend className="text-xl" />
              )}
            </button>
          </div>
        </form>

        {/* Suggestion chips */}
        <div className="flex flex-wrap gap-2">
          <button 
            className="btn btn-sm btn-outline rounded-full"
            onClick={() => handleSuggestion("What's the status of the Downtown Flagship Store in New York?")}
          >
            <MdOutlineStorefront className="text-sm" />
            NYC Store Status
          </button>
          <button 
            className="btn btn-sm btn-outline rounded-full"
            onClick={() => handleSuggestion("What are the overdue high priority tasks?")}
          >
            <MdOutlineAssignment className="text-sm" />
            Overdue Tasks
          </button>
          <button 
            className="btn btn-sm btn-outline rounded-full"
            onClick={() => handleSuggestion("Which contracts are expiring soon?")}
          >
            <MdOutlineShoppingCart className="text-sm" />
            Expiring Contracts
          </button>
          <button 
            className="btn btn-sm btn-outline rounded-full"
            onClick={() => handleSuggestion("Tell me a joke")}
          >
            <MdOutlineInfo className="text-sm" />
            Free Chat
          </button>
        </div>
      </div>

      {/* Messages - scrollable content below the fixed input */}
      <div className="mt-6">
        {messages.length > 0 && (
          <div className="space-y-4 animate-fadeIn">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {getMessageIcon(message.content)}
                  </div>
                )}
                
                <div 
                  className={`max-w-[85%] p-4 rounded-xl shadow-sm
                    ${message.sender === 'user' 
                      ? 'bg-primary text-primary-content ml-auto' 
                      : 'bg-base-200'
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
                <div className="bg-error/10 text-error p-4 rounded-lg text-sm max-w-[85%]">
                  {error}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAssistant; 