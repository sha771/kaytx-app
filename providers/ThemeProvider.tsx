import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';

interface Theme {
  colors: {
    primary: string;
    background: string;
    text: string;
    secondaryText: string;
    border: string;
    cardBackground: string;
    sidebarBackground: string;
    chatBackground: string;
    messageBackground: string;
    activeBackground: string;
    success: string;
    error: string;
    warning: string;
  };
}

const lightTheme: Theme = {
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    text: '#000000',
    secondaryText: '#8E8E93',
    border: '#E5E5EA',
    cardBackground: '#F2F2F7',
    sidebarBackground: '#FAFAFA',
    chatBackground: '#FFFFFF',
    messageBackground: '#E5E5EA',
    activeBackground: '#E8F0FE',
    success: '#34C759',
    error: '#FF3B30',
    warning: '#FF9500',
  },
};

const darkTheme: Theme = {
  colors: {
    primary: '#0A84FF',
    background: '#000000',
    text: '#FFFFFF',
    secondaryText: '#8E8E93',
    border: '#38383A',
    cardBackground: '#1C1C1E',
    sidebarBackground: '#0A0A0A',
    chatBackground: '#000000',
    messageBackground: '#2C2C2E',
    activeBackground: '#1C2C3E',
    success: '#32D74B',
    error: '#FF453A',
    warning: '#FF9F0A',
  },
};

export const [ThemeProvider, useTheme] = createContextHook(() => {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  return {
    theme,
    isDark,
    toggleTheme,
  };
});