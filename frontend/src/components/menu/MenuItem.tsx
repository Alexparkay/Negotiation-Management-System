import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconType } from 'react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';

interface MenuItemProps {
  onClick?: () => void;
  catalog: string;
  listItems: Array<{
    isLink: boolean;
    url?: string;
    icon: IconType;
    label: string;
    onClick?: () => void;
  }>;
  isCollapsed?: boolean;
  isOpen?: boolean;
  onToggleSection?: () => void;
  onExpandMenu?: () => void;
  activePath?: string;
}

// Define colors for different sections
const getSectionStyles = (catalog: string) => {
  const lowerCatalog = catalog.toLowerCase();
  
  if (lowerCatalog === 'main') {
    return {
      activeGradient: 'from-[#00015f]/10 to-transparent',
      stripeColor: 'bg-[#00015f]',
      textColor: 'text-[#00015f]',
      hoverBg: 'hover:bg-[#00015f]/5',
      sectionHeaderBg: 'bg-[#00015f]/5',
      iconBg: 'bg-[#00015f]/10'
    };
  } else if (lowerCatalog === 'negotiations') {
    return {
      activeGradient: 'from-[#1ab5e5]/10 to-transparent',
      stripeColor: 'bg-[#1ab5e5]',
      textColor: 'text-[#1ab5e5]',
      hoverBg: 'hover:bg-[#1ab5e5]/5',
      sectionHeaderBg: 'bg-[#1ab5e5]/5',
      iconBg: 'bg-[#1ab5e5]/10'
    };
  } else if (lowerCatalog === 'vendor management') {
    return {
      activeGradient: 'from-[#be010c]/10 to-transparent',
      stripeColor: 'bg-[#be010c]',
      textColor: 'text-[#be010c]',
      hoverBg: 'hover:bg-[#be010c]/5',
      sectionHeaderBg: 'bg-[#be010c]/5',
      iconBg: 'bg-[#be010c]/10'
    };
  } else if (lowerCatalog === 'market analytics') {
    return {
      activeGradient: 'from-[#f67506]/10 to-transparent',
      stripeColor: 'bg-[#f67506]',
      textColor: 'text-[#f67506]',
      hoverBg: 'hover:bg-[#f67506]/5',
      sectionHeaderBg: 'bg-[#f67506]/5',
      iconBg: 'bg-[#f67506]/10'
    };
  } else {
    return {
      activeGradient: 'from-[#f7c202]/10 to-transparent',
      stripeColor: 'bg-[#f7c202]',
      textColor: 'text-[#f7c202]',
      hoverBg: 'hover:bg-[#f7c202]/5',
      sectionHeaderBg: 'bg-[#f7c202]/5',
      iconBg: 'bg-[#f7c202]/10'
    };
  }
};

// Get first icon from a section's list items to use in collapsed view
const getSectionIcon = (listItems: MenuItemProps['listItems']) => {
  return listItems[0]?.icon;
};

// Check if any item in this section is active
const isSectionActive = (listItems: MenuItemProps['listItems'], activePath?: string) => {
  if (!activePath) return false;
  return listItems.some(item => item.url === activePath);
};

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  catalog,
  listItems,
  isCollapsed = false,
  isOpen = false,
  onToggleSection,
  onExpandMenu,
  activePath
}) => {
  const { activeGradient, stripeColor, textColor, hoverBg, sectionHeaderBg, iconBg } = getSectionStyles(catalog);
  const SectionIcon = getSectionIcon(listItems);
  const isActive = isSectionActive(listItems, activePath);
  
  // Animation variants for the dropdown
  const dropdownVariants = {
    hidden: { 
      height: 0, 
      opacity: 0,
      transition: {
        duration: 0.15
      }
    },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const handleSectionClick = () => {
    if (isCollapsed && onExpandMenu) {
      // If menu is collapsed, expand it and open the section
      // This is handled in the parent with expandMenuAndOpenSection
      onExpandMenu();
    } else if (onToggleSection) {
      // Otherwise just toggle the section
      onToggleSection();
    }
  };
  
  return (
    <div className="w-full flex flex-col items-stretch">
      {/* Section header - always visible */}
      <button
        onClick={handleSectionClick}
        className={`flex items-center justify-between ${isCollapsed ? 'py-1.5 mb-1' : 'py-1.5 mb-1'} px-3 rounded-xl ${
          isOpen && !isCollapsed ? sectionHeaderBg : ''
        } ${hoverBg} transition-colors duration-200`}
      >
        {isCollapsed ? (
          // In collapsed view, just show section icon with colored background
          <div className="flex items-center justify-center relative w-full">
            <div className={`w-10 h-10 ${iconBg} rounded-xl flex items-center justify-center ${isActive ? 'ring-2 ring-opacity-70 ' + stripeColor.replace('bg-', 'ring-') : ''}`}>
              {SectionIcon && <SectionIcon className={`text-xl ${textColor}`} />}
            </div>
          </div>
        ) : (
          // In expanded view, show section header with text
          <>
            <div className="flex items-center">
              <div className={`w-1 h-5 rounded mr-2 ${stripeColor}`}></div>
              <span className={`text-sm font-medium whitespace-nowrap ${textColor}`}>
                {catalog}
              </span>
            </div>
            <span className="text-[#475569]">
              {isOpen ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
            </span>
          </>
        )}
      </button>
      
      {/* Collapsible menu items - only show when section is open AND menu is expanded */}
      <AnimatePresence>
        {isOpen && !isCollapsed && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            className="overflow-hidden ml-3"
          >
            <div className="space-y-0.5">
              {listItems.map((listItem, index) => (
                listItem.isLink ? (
                  <NavLink
                    key={index}
                    onClick={onClick}
                    to={listItem.url || ''}
                    className={({ isActive }) =>
                      `relative overflow-hidden rounded-xl transition-all duration-300 flex items-center py-1.5 px-3 justify-start ${
                        isActive
                          ? `bg-gradient-to-r ${activeGradient} ${textColor}`
                          : `text-[#475569] hover:text-[#1E293B] ${hoverBg}`
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            className={`absolute left-0 top-0 bottom-0 w-1 ${stripeColor}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        <listItem.icon className="text-xl mr-3" />
                        <span className="text-sm font-medium whitespace-nowrap">
                          {listItem.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                ) : (
                  <button
                    key={index}
                    onClick={listItem.onClick}
                    className={`relative overflow-hidden rounded-xl transition-all duration-300 flex items-center py-1.5 px-3 justify-start text-[#475569] hover:text-[#1E293B] ${hoverBg}`}
                  >
                    <listItem.icon className="text-xl mr-3" />
                    <span className="text-sm font-medium whitespace-nowrap">
                      {listItem.label}
                    </span>
                  </button>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuItem;
