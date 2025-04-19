import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { 
  MdOutlineSearch, 
  MdOutlineNotifications, 
  MdOutlineSettings,
  MdOutlineLogout, 
  MdOutlineHelp, 
  MdOutlinePerson, 
  MdOutlineEdit,
  MdOutlineDarkMode,
  MdOutlineLightMode 
} from 'react-icons/md';
import { RxEnterFullScreen, RxExitFullScreen } from 'react-icons/rx';
import ChangeThemes from './ChangesThemes';
import toast from 'react-hot-toast';
import { menu } from './menu/data';
import MenuItem from './menu/MenuItem';
import { motion } from 'framer-motion';
import ThemeContext from '../contexts/ThemeContext';

const Navbar = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme || 'aldi-light';
  const toggleTheme = themeContext?.toggleTheme || (() => {});
  
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const element = document.getElementById('root');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get current page name for mobile only
  const getCurrentPageName = () => {
    const path = location.pathname;
    
    if (path === '/') return '';
    
    const pageName = path.split('/').pop() || '';
    return pageName.charAt(0).toUpperCase() + pageName.slice(1).replace(/-/g, ' ');
  };

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  React.useEffect(() => {
    try {
      if (isFullScreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(err => {
            console.error('Error exiting fullscreen:', err);
          });
        }
      } else {
        if (element && !document.fullscreenElement) {
          element.requestFullscreen({ navigationUI: 'auto' }).catch(err => {
            console.error('Error requesting fullscreen:', err);
          });
        }
      }
    } catch (error) {
      console.error('Fullscreen API error:', error);
    }
  }, [element, isFullScreen]);

  return (
    // navbar screen
    <div className="fixed z-[3] top-0 left-0 right-0 w-full navbar-glass">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        {/* Left Section - Logo and Hamburger */}
        <div className="flex items-center">
          {/* Mobile menu toggle */}
          <div className="xl:hidden">
            <button 
              onClick={toggleDrawer}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <HiBars3CenterLeft className="text-2xl text-white" />
            </button>
            
            {/* Mobile Drawer */}
            {isDrawerOpen && (
              <div className="fixed inset-0 z-50 flex">
                {/* Backdrop */}
                <div 
                  className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                  onClick={toggleDrawer}
                ></div>
                
                {/* Drawer content */}
                <motion.div 
                  className="relative w-64 max-w-[80%] h-full bg-white shadow-xl sidebar-glass"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-6">
                      <img 
                        src="/Logo/170403-ALDI-Australia-Brand-Logo-Landscape-1024x409.png" 
                        alt="Aldi Logo" 
                        className="w-32 object-contain" 
                      />
                    </div>
                    
                    {menu.map((item, index) => (
                      <MenuItem
                        onClick={toggleDrawer}
                        key={index}
                        catalog={item.catalog}
                        listItems={item.listItems}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
          
          {/* Logo and Page Title */}
          <div className="flex items-center mt-1">
            <img 
              src="/Logo/170403-ALDI-Australia-Brand-Logo-Landscape-1024x409.png" 
              alt="Aldi Logo" 
              className="h-10 mr-3"
            />
            <div>
              <h1 className="text-xl font-semibold text-white">Negotiation Management System</h1>
              {getCurrentPageName() !== 'Dashboard' && (
                <p className="text-xs text-white/80">{getCurrentPageName()}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Section - Search, Controls, User */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block mr-2">
            <div className={`flex items-center bg-white/30 rounded-full px-3 py-1.5 transition-all duration-300 ${searchFocused ? 'w-64 ring-2 ring-white/40' : 'w-44'}`}>
              <MdOutlineSearch className="text-xl text-white" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full placeholder-white/80"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex items-center">
            {/* Fullscreen */}
            <button
              onClick={toggleFullScreen}
              className="p-2 rounded-full hover:bg-white/20 transition-colors hidden md:flex"
            >
              {isFullScreen ? (
                <RxEnterFullScreen className="text-xl text-white" />
              ) : (
                <RxExitFullScreen className="text-xl text-white" />
              )}
            </button>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/20 transition-colors hidden md:flex"
            >
              {theme === 'aldi-dark' ? (
                <MdOutlineLightMode className="text-xl text-white" />
              ) : (
                <MdOutlineDarkMode className="text-xl text-white" />
              )}
            </button>
            
            {/* Notifications */}
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-white/20 transition-colors">
                <MdOutlineNotifications className="text-xl text-white" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#d20002] rounded-full flex items-center justify-center text-xs text-white">
                  3
                </span>
              </button>
              
              {/* Notification dropdown would go here */}
            </div>
          </div>
          
          {/* User Menu */}
          <div className="relative ml-1">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#1cbceb] to-[#021e5f] flex items-center justify-center">
                  <span className="text-white font-medium text-sm">A</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm text-white">Admin User</p>
                  <p className="text-xs text-white/80">Administrator</p>
                </div>
              </div>
              
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] mt-2 p-2 shadow-xl glass-panel rounded-xl w-56"
              >
                <li className="mb-1">
                  <Link to="/profile" className="flex items-center gap-2 p-2 rounded-lg hover:bg-black/5 transition-colors">
                    <MdOutlinePerson className="text-lg text-[#475569]" />
                    <span className="text-sm text-[#1E293B]">My Profile</span>
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/profile/edit" className="flex items-center gap-2 p-2 rounded-lg hover:bg-black/5 transition-colors">
                    <MdOutlineEdit className="text-lg text-[#475569]" />
                    <span className="text-sm text-[#1E293B]">Edit Profile</span>
                  </Link>
                </li>
                <li className="mb-1">
                  <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-black/5 transition-colors">
                    <MdOutlineSettings className="text-lg text-[#475569]" />
                    <span className="text-sm text-[#1E293B]">Settings</span>
                  </button>
                </li>
                <li className="mb-1">
                  <button className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-black/5 transition-colors">
                    <MdOutlineHelp className="text-lg text-[#475569]" />
                    <span className="text-sm text-[#1E293B]">Help & Support</span>
                  </button>
                </li>
                <li className="border-t border-black/5 mt-1 pt-1">
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-[#d20002]/10 text-[#d20002] transition-colors"
                  >
                    <MdOutlineLogout className="text-lg" />
                    <span className="text-sm">Log Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
