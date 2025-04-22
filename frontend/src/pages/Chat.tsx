import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMic, FiChevronDown, FiClock, FiClipboard, FiBookmark, FiShare2, FiMessageSquare, FiFileText } from 'react-icons/fi';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [tone, setTone] = useState(false);

  // Suggestion cards data
  const suggestionCards = [
    {
      title: 'What is the average tender duration for Health & Beauty products in 2025?',
    },
    {
      title: 'How many "Organic" trait tenders are currently active in the system?',
    },
    {
      title: 'Compare frozen product pricing between Montenegro and Benin suppliers',
    },
    {
      title: 'Which product categories have the highest savings percentages in the last quarter?',
    },
    {
      title: 'What\'s the current delivery lead time for Coffee products from Angola?',
    },
    {
      title: 'How many suppliers are categorized as "Value" vs "Premium" in the system?',
    },
    {
      title: 'Show me all pending tenders for Chilled storage items with delivery in May 2025',
    },
    {
      title: 'Generate a list of all Pepperoni tender documents across Bosnia and Belgium suppliers',
    },
  ];

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.05,
        duration: 0.4,
        ease: "easeOut"
      } 
    })
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top navigation bar - outside the main content */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto py-2 px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6 items-center">
              <div className="relative flex items-center">
                <div className="flex items-center border border-gray-300 rounded-md px-4 py-2 w-[280px]">
                  <span className="text-gray-700">Negotiation Management System</span>
                  <FiChevronDown className="ml-2 text-gray-400" />
                </div>
              </div>
              
              <button className="flex items-center text-gray-700 hover:text-blue-600">
                <FiClock className="mr-2" />
                <span>Last 10 Queries</span>
              </button>
              <button className="flex items-center text-gray-700 hover:text-blue-600">
                <FiClipboard className="mr-2" />
                <span>Clipboard</span>
              </button>
              <button className="flex items-center text-gray-700 hover:text-blue-600">
                <FiBookmark className="mr-2" />
                <span>Bookmark</span>
              </button>
              <button className="flex items-center text-gray-700 hover:text-blue-600">
                <FiShare2 className="mr-2" />
                <span>Share History</span>
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex space-x-6">
                <button className="flex items-center text-gray-700 hover:text-blue-600">
                  <FiMessageSquare className="mr-2" />
                  <span>Feedback</span>
                </button>
                <button className="flex items-center text-gray-700 hover:text-blue-600">
                  <FiFileText className="mr-2" />
                  <span>Use Cases</span>
                </button>
              </div>
              
              <div className="flex gap-2">
                <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center bg-white shadow-sm">
                  <img src="https://via.placeholder.com/20" alt="User" className="rounded-full mr-2" />
                  <span className="text-gray-700">Talk</span>
                </button>
                <button className="border border-gray-300 rounded-md px-4 py-2 bg-white shadow-sm text-gray-700">
                  New Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content in white rounded box */}
      <div className="container mx-auto py-6 px-4">
        <div className="bg-white rounded-2xl shadow-sm p-8 min-h-[calc(100vh-160px)]">
          {/* Welcome message */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-[#1E6BB8] mb-4">Hi, Alex!</h1>
            <h2 className="text-5xl font-light text-gray-500">How may I assist you today?</h2>
          </div>
          
          {/* Suggestion cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 max-w-5xl mx-auto">
            {suggestionCards.slice(0, 6).map((card, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-gray-50 p-4 rounded-xl cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-300"
              >
                <p className="text-sm text-gray-700">{card.title}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Chat input */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-2">Set tone</span>
                <button 
                  onClick={() => setTone(!tone)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${tone ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${tone ? 'translate-x-6' : ''}`} />
                </button>
              </div>
              <div className="flex items-center text-xs text-gray-500 gap-2">
                <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                  <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                </svg>
                Sample Prompts
              </div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Anything..."
                className="w-full px-4 py-3 pr-20 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex">
                <button className="p-2 text-gray-500 hover:text-blue-600">
                  <FiMic />
                </button>
                <button className="p-2 text-gray-500 hover:text-blue-600">
                  <FiSend />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Accuracy of AI generated answers subject to deviate. Consider checking important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat; 