import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('prepnexus-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('prepnexus-theme', theme);
    
    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'blue');
    root.classList.add(theme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (theme === 'dark') {
        metaThemeColor.setAttribute('content', '#1f2937');
      } else if (theme === 'blue') {
        metaThemeColor.setAttribute('content', '#3b82f6');
      } else {
        metaThemeColor.setAttribute('content', '#ffffff');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'blue';
      return 'light';
    });
  };

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');
  const setBlueTheme = () => setTheme('blue');

  const value = {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setBlueTheme,
    isLight: theme === 'light',
    isDark: theme === 'dark',
    isBlue: theme === 'blue'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
