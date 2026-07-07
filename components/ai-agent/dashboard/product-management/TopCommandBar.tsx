import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface CommandBarMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  color?: string;
  subtitle?: string;
  sparkline?: number[];
}

interface TopCommandBarProps {
  metrics: CommandBarMetric[];
  onSearch?: (query: string) => void;
}

export default function TopCommandBar({ metrics, onSearch }: TopCommandBarProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

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

  const timeframes = ['7d', '30d', '90d', '1y'];

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.95)' }]}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.titleSection}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Product Intelligence Command Center
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            AI-Powered Product Management Dashboard
          </Text>
        </View>
        
        {/* Timeframe Selector */}
        <View style={styles.timeframeSelector}>
          {timeframes.map((tf) => (
            <TouchableOpacity
              key={tf}
              style={[
                styles.timeframeChip,
                { 
                  backgroundColor: selectedTimeframe === tf ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.05)',
                  borderColor: selectedTimeframe === tf ? '#06B6D4' : 'rgba(255,255,255,0.1)'
                }
              ]}
              onPress={() => setSelectedTimeframe(tf)}
            >
              <Text style={[
                styles.timeframeText,
                { color: selectedTimeframe === tf ? '#06B6D4' : theme.colors.textSecondary }
              ]}>
                {tf}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchSection, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }]}>
        <Text style={[styles.searchIcon, { color: theme.colors.textSecondary }]}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search features, experiments, user feedback, roadmap items, releases..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={[styles.searchButtonText, { color: theme.colors.primary }]}>
            Search
          </Text>
        </TouchableOpacity>
      </View>

      {/* Metrics Scroll */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.metricsScroll}
        contentContainerStyle={styles.metricsContent}
      >
        {metrics.map((metric, index) => (
          <View 
            key={index}
            style={[
              styles.metricCard, 
              { 
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
                borderLeftColor: metric.color || '#06B6D4'
              }
            ]}
          >
            <View style={styles.metricHeader}>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                {metric.label}
              </Text>
              {metric.change && (
                <View style={[
                  styles.trendBadge,
                  { backgroundColor: `${getTrendColor(metric.trend)}20` }
                ]}>
                  <Text style={[styles.trendBadgeIcon, { color: getTrendColor(metric.trend) }]}>
                    {getTrendIcon(metric.trend)}
                  </Text>
                  <Text style={[styles.trendBadgeText, { color: getTrendColor(metric.trend) }]}>
                    {metric.change}
                  </Text>
                </View>
              )}
            </View>
            
            <Text style={[styles.metricValue, { color: metric.color || theme.colors.text }]}>
              {metric.value}
            </Text>
            
            {metric.subtitle && (
              <Text style={[styles.metricSubtitle, { color: theme.colors.textSecondary }]}>
                {metric.subtitle}
              </Text>
            )}

            {/* Mini Sparkline */}
            {metric.sparkline && (
              <View style={styles.sparklineContainer}>
                {metric.sparkline.map((value, i) => (
                  <View
                    key={i}
                    style={[
                      styles.sparklineBar,
                      {
                        height: `${value}%`,
                        backgroundColor: metric.color || '#06B6D4',
                        opacity: 0.6 + (value / 100) * 0.4
                      }
                    ]}
                  />
                ))}
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(10px)',
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  timeframeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  timeframeChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  timeframeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  searchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
  },
  searchButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  metricsScroll: {
    marginHorizontal: -10,
  },
  metricsContent: {
    paddingHorizontal: 10,
  },
  metricCard: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 10,
    minWidth: 140,
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  trendBadgeIcon: {
    fontSize: 10,
    marginRight: 4,
    fontWeight: '700',
  },
  trendBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: -1,
  },
  metricSubtitle: {
    fontSize: 10,
    marginBottom: 8,
    opacity: 0.7,
  },
  sparklineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 24,
    gap: 2,
  },
  sparklineBar: {
    flex: 1,
    borderRadius: 2,
    minWidth: 3,
  },
});