import React from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme, isLight, isDark, isBlue } = useTheme();

  const getIcon = () => {
    if (isLight) return <Sun className="w-5 h-5" />;
    if (isDark) return <Moon className="w-5 h-5" />;
    if (isBlue) return <Palette className="w-5 h-5" />;
    return <Sun className="w-5 h-5" />;
  };

  const getLabel = () => {
    if (isLight) return 'Light';
    if (isDark) return 'Dark';
    if (isBlue) return 'Blue';
    return 'Light';
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      title={`Current theme: ${getLabel()}. Click to switch.`}
    >
      {getIcon()}
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {getLabel()}
      </span>
    </button>
  );
};

export default ThemeToggle;
