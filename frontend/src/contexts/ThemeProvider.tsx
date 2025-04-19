import React, { useState, useEffect } from 'react';
import ThemeContext from './ThemeContext';

// Aldi Color Palette
const ALDI_COLORS = {
  lightBlue: '#1cbceb',
  darkBlue: '#021e5f',
  red: '#d20002',
  orange: '#f47d07',
  yellow: '#f7c202',
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState('aldi-light');

  const toggleTheme = () => {
    setTheme(theme === 'aldi-dark' ? 'aldi-light' : 'aldi-dark');
  };

  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      
      // Apply base theme
      root.setAttribute('data-theme', theme);
      
      // Set Aldi color variables
      root.style.setProperty('--color-aldi-light-blue', ALDI_COLORS.lightBlue);
      root.style.setProperty('--color-aldi-dark-blue', ALDI_COLORS.darkBlue);
      root.style.setProperty('--color-aldi-red', ALDI_COLORS.red);
      root.style.setProperty('--color-aldi-orange', ALDI_COLORS.orange);
      root.style.setProperty('--color-aldi-yellow', ALDI_COLORS.yellow);
      
      // Set theme-specific variables
      if (theme === 'aldi-dark') {
        root.style.setProperty('--background-primary', '#0A0A0A');
        root.style.setProperty('--background-secondary', '#1A1A1A');
        root.style.setProperty('--background-accent', '#2A2A2A');
        root.style.setProperty('--text-primary', '#FFFFFF');
        root.style.setProperty('--text-secondary', '#B3B3B3');
        root.style.setProperty('--text-muted', '#666666');
        root.style.setProperty('--accent-primary', ALDI_COLORS.lightBlue);
        root.style.setProperty('--accent-secondary', ALDI_COLORS.yellow);
        root.style.setProperty('--accent-warning', ALDI_COLORS.orange);
        root.style.setProperty('--accent-danger', ALDI_COLORS.red);
      } else {
        // Light theme with cleaner, modern aesthetic
        root.style.setProperty('--background-primary', '#F8F9FB');
        root.style.setProperty('--background-secondary', '#FFFFFF');
        root.style.setProperty('--background-accent', '#EEF1F5');
        root.style.setProperty('--text-primary', '#1E293B');
        root.style.setProperty('--text-secondary', '#475569');
        root.style.setProperty('--text-muted', '#94A3B8');
        root.style.setProperty('--accent-primary', ALDI_COLORS.lightBlue);
        root.style.setProperty('--accent-secondary', ALDI_COLORS.yellow);
        root.style.setProperty('--accent-warning', ALDI_COLORS.orange);
        root.style.setProperty('--accent-danger', ALDI_COLORS.red);
      }
    };

    applyTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: ALDI_COLORS }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
