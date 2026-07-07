import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/providers/ThemeProvider';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  borderRadius?: number;
}

export default function GlassmorphismCard({ 
  children, 
  style, 
  intensity = 100,
  borderRadius = 16 
}: GlassmorphismCardProps) {
  const { theme } = useTheme();

  return (
    <BlurView
      intensity={intensity}
      tint="dark"
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card + '80',
          borderRadius,
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        style,
      ]}
    >
      <View style={styles.innerContainer}>
        {children}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  innerContainer: {
    flex: 1,
  },
});