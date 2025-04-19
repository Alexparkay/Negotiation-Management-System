import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menu } from './data';
import MenuItem from './MenuItem';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { CgMenuLeft } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

interface MenuProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Menu: React.FC<MenuProps> = ({ isCollapsed = false, onToggleCollapse }) => {
  const [internalCollapsed, setInternalCollapsed] = useState(true); // Default to collapsed
  const location = useLocation();
  
  // Use either prop or internal state for collapse status
  const collapsed = isCollapsed !== undefined ? isCollapsed : internalCollapsed;
  
  // Track open/closed state for each section
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    // Initialize all sections as closed by default
    const initialState: Record<string, boolean> = {};
    menu.forEach(section => {
      initialState[section.catalog.toLowerCase()] = false;
    });
    return initialState;
  });
  
  const toggleSection = (sectionName: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName.toLowerCase()]: !prev[sectionName.toLowerCase()]
    }));
  };
  
  const openSection = (sectionName: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName.toLowerCase()]: true
    }));
  };
  
  const expandMenu = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed(false);
    }
  };
  
  const expandMenuAndOpenSection = (sectionName: string) => {
    expandMenu();
    // Wait for menu expansion to complete before opening section
    setTimeout(() => openSection(sectionName), 150);
  };
  
  const toggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed(!internalCollapsed);
    }
  };

  // Automatically open the section containing the current route
  useEffect(() => {
    if (location.pathname) {
      menu.forEach(section => {
        const hasActiveRoute = section.listItems.some(item => 
          item.url === location.pathname || 
          (location.pathname !== '/' && item.url && location.pathname.startsWith(item.url))
        );
        
        if (hasActiveRoute) {
          setOpenSections(prev => ({
            ...prev,
            [section.catalog.toLowerCase()]: true
          }));
        }
      });
    }
  }, [location.pathname]);

  return (
    <div className="h-full pt-1">
      <div className="flex flex-col h-full">
        {/* Menu Header - only toggle button */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-end'} px-4 py-3`}>
          <button 
            onClick={toggleCollapse}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E293B] hover:bg-black/5 transition-colors"
          >
            <CgMenuLeft className="text-lg" />
          </button>
        </div>
        
        {/* Menu Items */}
        <div className="px-4 py-2 flex-1">
          <AnimatePresence mode="wait">
            <div className="space-y-4">
              {menu.map((section, index) => (
                <MenuItem
                  key={index}
                  catalog={section.catalog}
                  listItems={section.listItems}
                  isCollapsed={collapsed}
                  isOpen={openSections[section.catalog.toLowerCase()]}
                  onToggleSection={() => toggleSection(section.catalog)}
                  onExpandMenu={() => expandMenuAndOpenSection(section.catalog)}
                  activePath={location.pathname}
                />
              ))}
            </div>
          </AnimatePresence>
        </div>
        
        {/* User Section */}
        <div className={`mt-auto px-4 py-4 bg-black/5 ${collapsed ? '' : 'mb-2 mx-4 rounded-xl'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#1cbceb] to-[#021e5f] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-medium">A</span>
            </div>
            
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-grow justify-between items-center"
              >
                <div>
                  <h3 className="font-medium text-[#1E293B]">Admin User</h3>
                  <p className="text-xs text-[#475569]">Administrator</p>
                </div>
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E293B] hover:bg-black/10 transition-colors">
                  <FiSettings className="text-lg" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
