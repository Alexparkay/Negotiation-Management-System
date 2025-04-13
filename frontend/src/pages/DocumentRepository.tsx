import React from 'react';
import { MdOutlineDescription, MdOutlineUpload, MdOutlineSearch } from 'react-icons/md';
import ChatPopup from '../components/ChatPopup';

const DocumentRepository: React.FC = () => {
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Document Repository</h1>
          <p className="text-text-secondary mt-1">Centralized storage for all negotiation-related documents</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary btn-sm flex items-center gap-2">
            <MdOutlineUpload className="text-lg" /> Upload Document
          </button>
        </div>
      </div>

      {/* Search Panel */}
      <div className="glass-panel p-4 rounded-xl mb-6">
        <div className="relative">
          <MdOutlineSearch className="absolute left-3 top-3 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search documents..." 
            className="input input-bordered w-full pl-10"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="glass-panel p-6 rounded-xl mb-6">
        <div className="flex items-center mb-4">
          <MdOutlineDescription className="text-accent-primary mr-2 text-xl" />
          <h2 className="text-lg font-semibold text-text-primary">
            Document Library
          </h2>
        </div>
        
        <div className="p-10 text-center">
          <p className="text-text-secondary">Document repository is being implemented.</p>
          <p className="text-text-muted mt-2">Check back soon for updates!</p>
        </div>
      </div>
      
      <ChatPopup />
    </div>
  );
};

export default DocumentRepository; 