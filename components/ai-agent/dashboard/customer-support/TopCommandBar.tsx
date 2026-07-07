import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface CommandBarMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  color?: string;
}

interface TopCommandBarProps {
  metrics: CommandBarMetric[];
  onSearch?: (query: string) => void;
}

export default function TopCommandBar({ metrics, onSearch }: TopCommandBarProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'stable': return '→';
      default: return '';
    }
  };

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up': return '#22C55E';
      case 'down': return '#EF4444';
      case 'stable': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderBottomColor: 'rgba(16, 185, 129, 0.2)' }]}>
      {/* Search Bar */}
      <View style={[styles.searchSection, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
        <Text style={[styles.searchIcon, { color: '#10B981' }]}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: '#FFFFFF' }]}
          placeholder="Search customer, ticket, conversation, issue, order..."
          placeholderTextColor='rgba(255, 255, 255, 0.5)'
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>

      {/* Metrics Scroll */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.metricsScroll}
      >
        {metrics.map((metric, index) => (
          <View 
            key={index}
            style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: `${metric.color || '#10B981'}30` }]}
          >
            <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>
              {metric.label}
            </Text>
            <Text style={[styles.metricValue, { color: metric.color || '#10B981' }]}>
              {metric.value}
            </Text>
            {metric.change && (
              <View style={styles.metricChange}>
                <Text style={[styles.changeIcon, { color: getTrendColor(metric.trend) }]}>
                  {getTrendIcon(metric.trend)}
                </Text>
                <Text style={[styles.changeText, { color: getTrendColor(metric.trend) }]}>
                  {metric.change}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  metricsScroll: {
    marginHorizontal: -8,
  },
  metricCard: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 8,
    minWidth: 130,
    borderWidth: 1,
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
  },
});