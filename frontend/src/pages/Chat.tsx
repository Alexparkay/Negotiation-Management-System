import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiRefreshCw, FiDownload, FiMaximize2 } from 'react-icons/fi';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your AI assistant. How can I help you with supplier negotiations today?'
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
          content: 'I\'m processing your request about "' + message + '". In a real implementation, this would connect to an AI service.'
        }
      ]);
    }, 1000);
    
    setMessage('');
  };

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      } 
    })
  };

  return (
    <div className="container mx-auto space-y-6 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#1E293B] mb-1">AI Chat Assistant</h1>
          <p className="text-[#475569]">Get real-time AI assistance for your supplier negotiations</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="px-4 py-2 rounded-xl bg-[#1cbceb]/10 text-[#1cbceb] border border-[#1cbceb]/20 flex items-center hover:bg-[#1cbceb]/20 transition-colors">
            <FiRefreshCw className="mr-2" /> Clear Chat
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <motion.div 
        className="glass-panel p-6 rounded-xl h-[calc(100vh-250px)] flex flex-col"
        custom={0}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-[#1E293B]">Chat History</h3>
          <div className="flex items-center">
            <button className="p-2 rounded-lg hover:bg-black/5 text-[#475569]">
              <FiDownload size={16} />
            </button>
            <button className="p-2 rounded-lg hover:bg-black/5 text-[#475569]">
              <FiMaximize2 size={16} />
            </button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-grow overflow-y-auto mb-4 space-y-4 pr-2">
          {chatHistory.map((chat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-4 rounded-xl ${
                  chat.role === 'user' 
                    ? 'bg-gradient-to-r from-[#1cbceb]/20 to-[#021e5f]/20 border border-[#1cbceb]/20' 
                    : 'bg-black/5 border border-black/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  {chat.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#1cbceb] to-[#021e5f] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium">AI</span>
                    </div>
                  )}
                  <div className={`${chat.role === 'user' ? 'text-[#1E293B]' : 'text-[#1E293B]'}`}>
                    {chat.content}
                  </div>
                  {chat.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-[#1E293B] flex items-center justify-center flex-shrink-0">
                      <FiUser className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Chat Input */}
        <div className="mt-auto">
          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message here..."
              className="w-full px-4 py-3 pr-12 rounded-xl border border-black/10 focus:border-[#1cbceb]/30 focus:ring focus:ring-[#1cbceb]/20 outline-none bg-white/50 backdrop-blur-sm"
            />
            <button 
              onClick={handleSendMessage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-[#1cbceb] text-white hover:bg-[#1cbceb]/80 transition-colors"
            >
              <FiSend />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat; 