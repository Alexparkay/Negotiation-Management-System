import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiUser, FiX, FiMaximize2, FiMinimize2, FiSettings, FiHelpCircle, FiMessageSquare, FiRefreshCw } from 'react-icons/fi';
import { MdOutlineChat } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

// Example questions to suggest to the user
const exampleQuestions = [
  "What suppliers have the best performance ratings?",
  "How do I compare prices between vendors?",
  "Show me contract expiration dates for this quarter",
  "Summarize the latest negotiation with Tech Solutions Inc",
  "Which suppliers are at high risk of delivery delays?",
  "What's the forecasted price trend for raw materials?"
];

// ALDI colors
const ALDI_COLORS = {
  lightBlue: '#1cbceb',
  darkBlue: '#021e5f',
  red: '#d20002',
  orange: '#f67506',
  yellow: '#f7c202',
};

const ChatPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('default');
  const location = useLocation();
  
  // Don't show the chat popup on the Chat page
  const isOnChatPage = location.pathname === '/chat';
  
  const [chatHistory, setChatHistory] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your ALDI Assistant for supplier negotiations and vendor management. How can I help you today?'
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'I\'m processing your request about "' + message + '". In a real implementation, this would connect to our AI service.'
        }
      ]);
    }, 1000);
    
    setMessage('');
  };

  const handleUseExample = (question: string) => {
    setMessage(question);
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setIsSettingsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setIsSettingsOpen(false);
    }
  };
  
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  
  const clearChat = () => {
    setChatHistory([
      { 
        role: 'assistant', 
        content: 'Chat history has been cleared. How can I help you today?'
      }
    ]);
  };

  if (isOnChatPage) {
    return null; // Don't render the chat popup on the Chat page
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chat toggle button - extra large size */}
      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          className="w-24 h-24 rounded-full bg-gradient-to-r from-[#1cbceb] to-[#021e5f] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MdOutlineChat className="text-5xl" />
        </motion.button>
      )}

      {/* Chat window - very large size */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`glass-panel rounded-2xl overflow-hidden shadow-2xl flex flex-col ${
              isMinimized ? 'w-96 h-20' : 'w-[800px] h-[750px]'
            }`}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              boxShadow: '0 10px 60px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Chat header with ALDI styling */}
            <div className="py-5 px-6 bg-gradient-to-r from-[#1cbceb]/30 to-[#021e5f]/30 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#1cbceb] to-[#021e5f] flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                {!isMinimized && (
                  <div>
                    <h3 className="text-[#1E293B] font-bold text-2xl">ALDI Assistant</h3>
                    <p className="text-sm text-[#475569]">Supplier Negotiation Expert</p>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                {!isMinimized && (
                  <>
                    <button 
                      onClick={clearChat} 
                      className="p-3 rounded-full hover:bg-black/5 text-[#475569] mr-2 transition-colors"
                      title="Clear chat"
                    >
                      <FiRefreshCw size={20} />
                    </button>
                    <button 
                      onClick={toggleSettings} 
                      className={`p-3 rounded-full hover:bg-black/5 text-[#475569] mr-2 transition-colors ${isSettingsOpen ? 'bg-black/10' : ''}`}
                      title="Settings"
                    >
                      <FiSettings size={20} />
                    </button>
                  </>
                )}
                <button 
                  onClick={toggleMinimize} 
                  className="p-3 rounded-full hover:bg-black/5 text-[#475569] mr-2 transition-colors"
                  title={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? <FiMaximize2 size={20} /> : <FiMinimize2 size={20} />}
                </button>
                <button 
                  onClick={toggleChat} 
                  className="p-3 rounded-full hover:bg-black/5 text-[#475569] transition-colors"
                  title="Close"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>

            {/* Chat content - only shown when not minimized */}
            {!isMinimized && (
              <>
                {/* Settings dropdown */}
                <AnimatePresence>
                  {isSettingsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-b border-black/5 overflow-hidden"
                    >
                      <div className="p-6 bg-black/5">
                        <h4 className="text-base font-bold text-[#1E293B] mb-4">Assistant Settings</h4>
                        <div className="mb-5 grid grid-cols-2 gap-6">
                          <div>
                            <label className="text-sm font-semibold text-[#475569] block mb-2">Response Style</label>
                            <select 
                              value={selectedModel}
                              onChange={(e) => setSelectedModel(e.target.value)}
                              className="w-full p-3 rounded-xl border border-black/10 bg-white/70 text-base"
                            >
                              <option value="default">Balanced (Default)</option>
                              <option value="concise">Concise</option>
                              <option value="detailed">Detailed</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-[#475569] block mb-2">Topic Focus</label>
                            <select 
                              className="w-full p-3 rounded-xl border border-black/10 bg-white/70 text-base"
                            >
                              <option>All Topics</option>
                              <option>Supplier Management</option>
                              <option>Price Negotiations</option>
                              <option>Contract Management</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-[#475569] block mb-2">Enhanced Features</label>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                            <div className="flex items-center">
                              <input type="checkbox" id="detailed" className="mr-2 w-4 h-4" />
                              <label htmlFor="detailed" className="text-[#1E293B]">Include data visualization</label>
                            </div>
                            <div className="flex items-center">
                              <input type="checkbox" id="citations" className="mr-2 w-4 h-4" />
                              <label htmlFor="citations" className="text-[#1E293B]">Include data citations</label>
                            </div>
                            <div className="flex items-center">
                              <input type="checkbox" id="suggestions" className="mr-2 w-4 h-4" checked />
                              <label htmlFor="suggestions" className="text-[#1E293B]">Show follow-up suggestions</label>
                            </div>
                            <div className="flex items-center">
                              <input type="checkbox" id="historicalData" className="mr-2 w-4 h-4" />
                              <label htmlFor="historicalData" className="text-[#1E293B]">Access historical data</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              
                {/* Messages */}
                <div className="flex-grow p-6 overflow-y-auto">
                  <div className="space-y-6">
                    {chatHistory.map((chat, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] p-4 rounded-2xl ${
                            chat.role === 'user' 
                              ? 'bg-gradient-to-r from-[#1cbceb]/20 to-[#021e5f]/20 border border-[#1cbceb]/20' 
                              : 'bg-black/5 border border-black/10'
                          }`}
                          style={{
                            boxShadow: chat.role === 'user' 
                              ? '0 4px 20px rgba(28, 188, 235, 0.15)' 
                              : '0 4px 20px rgba(0, 0, 0, 0.05)'
                          }}
                        >
                          <div className="flex items-start gap-4">
                            {chat.role === 'assistant' && (
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1cbceb] to-[#021e5f] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                                <span className="text-white font-bold">A</span>
                              </div>
                            )}
                            <p className="text-[#1E293B] text-base leading-relaxed">{chat.content}</p>
                            {chat.role === 'user' && (
                              <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                                <FiUser className="text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Example questions */}
                {chatHistory.length === 1 && (
                  <div className="px-6 pb-5">
                    <div className="mb-3">
                      <span className="text-base font-semibold text-[#475569] flex items-center">
                        <FiHelpCircle className="mr-2" /> Example questions to get started
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {exampleQuestions.map((question, index) => (
                        <button 
                          key={index}
                          onClick={() => handleUseExample(question)}
                          className="text-left p-4 rounded-xl border border-[#1cbceb]/20 bg-gradient-to-r from-[#1cbceb]/5 to-[#021e5f]/5 hover:from-[#1cbceb]/10 hover:to-[#021e5f]/10 transition-colors text-[#1E293B] shadow-sm"
                          style={{ transition: "all 0.2s ease" }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                        >
                          <div className="flex items-center">
                            <FiMessageSquare className="mr-2 flex-shrink-0 text-[#1cbceb]" />
                            <span className="text-base">{question}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input area */}
                <div className="p-6 border-t border-black/5 bg-white/20">
                  <div className="relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="w-full px-5 py-4 pr-16 rounded-xl border border-black/10 focus:border-[#1cbceb]/30 focus:ring-2 focus:ring-[#1cbceb]/20 outline-none bg-white/50 backdrop-blur-sm text-lg"
                    />
                    <button 
                      onClick={handleSendMessage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-[#1cbceb] to-[#021e5f] text-white hover:shadow-lg transition-all"
                      disabled={!message.trim()}
                      style={{ transition: "all 0.2s ease" }}
                    >
                      <FiSend size={20} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatPopup; 