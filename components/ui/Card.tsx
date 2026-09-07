/**
 * Card Component
 * Consistent card styling across the app
 */

import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = 'elevated',
  padding = 'medium',
  style,
  titleStyle,
}) => {
  const theme = useTheme();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      overflow: 'hidden',
    };

    // Padding styles
    const paddingStyles = {
      small: { padding: 12 },
      medium: { padding: 16 },
      large: { padding: 20 },
    };

    // Variant styles
    const variantStyles = {
      elevated: {
        backgroundColor: theme.colors?.card || '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      outlined: {
        backgroundColor: theme.colors?.card || '#fff',
        borderWidth: 1,
        borderColor: theme.colors?.border || '#C6C6C8',
      },
      filled: {
        backgroundColor: '#F2F2F7',
      },
    };

    return {
      ...baseStyle,
      ...paddingStyles[padding],
      ...variantStyles[variant],
      ...style,
    };
  };

  const getTitleStyle = (): TextStyle => {
    return {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors?.text || '#000',
      marginBottom: subtitle ? 4 : 12,
      ...titleStyle,
    };
  };

  const getSubtitleStyle = (): TextStyle => {
    return {
      fontSize: 14,
      color: '#666',
      marginBottom: 12,
    };
  };

  return (
    <View style={getCardStyle()}>
      {(title || subtitle) && (
        <View style={{ marginBottom: 12 }}>
          {title && <Text style={getTitleStyle()}>{title}</Text>}
          {subtitle && <Text style={getSubtitleStyle()}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </View>
  );
};
