import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { MetricCardProps } from './types';

export default function MetricCard({ metric, onPress }: MetricCardProps) {
  const { theme } = useTheme();
  const Icon = metric.icon;

  const getTrendColor = () => {
    switch (metric.trend) {
      case 'up': return '#22C55E';
      case 'down': return '#EF4444';
      default: return theme.colors.textSecondary;
    }
  };

  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: theme.colors.card }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        {Icon && (
          <View style={[styles.iconContainer, { backgroundColor: (metric.color || theme.colors.primary) + '20' }]}>
            <Icon size={20} color={metric.color || theme.colors.primary} />
          </View>
        )}
        <Text style={[styles.title, { color: theme.colors.textSecondary }]} numberOfLines={1}>
          {metric.title}
        </Text>
      </View>
      
      <Text style={[styles.value, { color: theme.colors.text }]}>
        {metric.value}
      </Text>
      
      {metric.change && (
        <View style={styles.changeRow}>
          <Text style={[styles.change, { color: getTrendColor() }]}>
            {getTrendIcon()} {metric.change}
          </Text>
        </View>
      )}
      
      {metric.subtitle && (
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]} numberOfLines={1}>
          {metric.subtitle}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    minHeight: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    fontSize: 13,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 11,
    marginTop: 4,
  },
});
