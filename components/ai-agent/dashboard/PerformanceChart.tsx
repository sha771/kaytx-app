import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { PerformanceChartProps } from './types';

export default function PerformanceChart({ 
  data, 
  type = 'line', 
  height = 200, 
  showGrid = true 
}: PerformanceChartProps) {
  const { theme } = useTheme();

  // Simple bar chart visualization (placeholder for actual chart library)
  const maxValue = Math.max(...data.datasets.flatMap(d => d.data));
  const minValue = Math.min(...data.datasets.flatMap(d => d.data));
  const range = maxValue - minValue || 1;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {data.datasets[0]?.label || 'Performance'}
        </Text>
      </View>
      
      <View style={[styles.chartArea, { height }]}>
        {type === 'bar' ? (
          <View style={styles.barContainer}>
            {data.labels.map((label, index) => {
              const value = data.datasets[0]?.data[index] || 0;
              const normalizedValue = ((value - minValue) / range) * 100;
              const color = data.datasets[0]?.color || theme.colors.primary;
              
              return (
                <View key={label} style={styles.barItem}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: `${Math.max(normalizedValue, 5)}%`,
                        backgroundColor: color,
                      }
                    ]} 
                  />
                  <Text style={[styles.barLabel, { color: theme.colors.textSecondary }]}>
                    {label}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text style={[styles.placeholderText, { color: theme.colors.textSecondary }]}>
              {type === 'line' ? 'Line Chart' : type === 'area' ? 'Area Chart' : 'Chart'} 
              {' - '}{data.labels.length} data points
            </Text>
            <Text style={[styles.placeholderSubtext, { color: theme.colors.textSecondary }]}>
              Max: {maxValue} | Min: {minValue}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  chartArea: {
    justifyContent: 'flex-end',
  },
  barContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
    paddingHorizontal: 4,
  },
  barItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: '500',
  },
  placeholderSubtext: {
    fontSize: 12,
    marginTop: 4,
  },
});
