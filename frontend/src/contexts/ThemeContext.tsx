import { createContext } from 'react';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  colors: {
    lightBlue: string;
    darkBlue: string;
    red: string;
    orange: string;
    yellow: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export default ThemeContext;
