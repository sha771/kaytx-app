/**
 * Input Component
 * Consistent input styling and behavior across the app
 */

import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'outlined',
  size = 'medium',
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  const getInputStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
    };

    // Size styles
    const sizeStyles = {
      small: { paddingHorizontal: 12, paddingVertical: 8, minHeight: 36 },
      medium: { paddingHorizontal: 16, paddingVertical: 12, minHeight: 44 },
      large: { paddingHorizontal: 20, paddingVertical: 16, minHeight: 52 },
    };

    // Variant styles
    const variantStyles = {
      outlined: {
        borderWidth: 1,
        borderColor: error 
          ? '#FF3B30' 
          : isFocused 
            ? (theme.colors?.primary || '#007AFF')
            : (theme.colors?.border || '#C6C6C8'),
        backgroundColor: theme.colors?.background || '#fff',
      },
      filled: {
        backgroundColor: theme.colors?.backgroundSecondary || '#F2F2F7',
        borderBottomWidth: 1,
        borderBottomColor: error 
          ? '#FF3B30' 
          : isFocused 
            ? (theme.colors?.primary || '#007AFF')
            : (theme.colors?.border || '#C6C6C8'),
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...style,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      flex: 1,
      color: theme.colors?.text || '#000',
    };

    // Size styles
    const sizeStyles = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
    };
  };

  const getLabelStyle = (): TextStyle => {
    return {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors?.text || '#000',
      marginBottom: 8,
    };
  };

  const getErrorStyle = (): TextStyle => {
    return {
      fontSize: 14,
      color: '#FF3B30',
      marginTop: 4,
    };
  };

  const getHelperTextStyle = (): TextStyle => {
    return {
      fontSize: 14,
      color: theme.colors?.textSecondary || '#666',
      marginTop: 4,
    };
  };

  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}
      
      <View style={getInputStyle()}>
        {leftIcon && <View style={{ marginRight: 12 }}>{leftIcon}</View>}
        
        <TextInput
          style={getTextStyle()}
          placeholderTextColor={theme.colors?.textSecondary || '#666'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {rightIcon && <View style={{ marginLeft: 12 }}>{rightIcon}</View>}
      </View>
      
      {error && <Text style={getErrorStyle()}>{error}</Text>}
      {helperText && !error && <Text style={getHelperTextStyle()}>{helperText}</Text>}
    </View>
  );
};
