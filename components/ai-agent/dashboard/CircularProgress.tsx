import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { CircularProgressProps } from './types';
import Svg, { Circle } from 'react-native-svg';

export default function CircularProgress({ 
  value, 
  size = 120, 
  strokeWidth = 8, 
  color, 
  label 
}: CircularProgressProps) {
  const { theme } = useTheme();
  const progressColor = color || theme.colors.primary;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(Math.max(value, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.colors.border}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      
      <View style={[styles.labelContainer, { width: size, height: size }]}>
        <Text style={[styles.value, { color: theme.colors.text }]}>
          {Math.round(progress)}%
        </Text>
        {label && (
          <Text style={[styles.label, { color: theme.colors.textSecondary }]} numberOfLines={2}>
            {label}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});
