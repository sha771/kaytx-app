import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Trophy, TrendingUp, Target, Award } from 'lucide-react-native';
import { SalesPerformanceConfig } from './types';

interface SalesPerformanceProps {
  config: SalesPerformanceConfig;
}

export default function SalesPerformance({ config }: SalesPerformanceProps) {
  const { theme } = useTheme();

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return Trophy;
      case 1: return Award;
      case 2: return Award;
      default: return TrendingUp;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return '#F59E0B';
      case 1: return '#9CA3AF';
      case 2: return '#B45309';
      default: return '#6B7280';
    }
  };

  const maxRevenue = Math.max(...config.performers.map(p => p.revenueClosed));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Trophy size={20} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Sales Performance Leaderboard
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.leaderboardContainer}>
          {config.performers.map((performer, index) => {
            const RankIcon = getRankIcon(index);
            const rankColor = getRankColor(index);
            
            return (
              <View key={index} style={[styles.performerCard, { backgroundColor: theme.colors.background }]}>
                <View style={styles.performerHeader}>
                  <View style={[styles.rankBadge, { backgroundColor: rankColor + '20' }]}>
                    <RankIcon size={16} color={rankColor} />
                  </View>
                  <View style={styles.performerInfo}>
                    <Text style={[styles.performerName, { color: theme.colors.text }]}>
                      {performer.name}
                    </Text>
                    <Text style={[styles.performerRole, { color: theme.colors.textSecondary }]}>
                      {performer.role}
                    </Text>
                  </View>
                </View>

                <View style={styles.metricsGrid}>
                  <View style={styles.metric}>
                    <Target size={14} color={theme.colors.primary} />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Revenue
                    </Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      ${(performer.revenueClosed / 1000).toFixed(0)}K
                    </Text>
                  </View>
                  <View style={styles.metric}>
                    <TrendingUp size={14} color={theme.colors.primary} />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Conversion
                    </Text>
                    <Text style={[styles.metricValue, { color: '#10B981' }]}>
                      {performer.conversionRate.toFixed(1)}%
                    </Text>
                  </View>
                  <View style={styles.metric}>
                    <Award size={14} color={theme.colors.primary} />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Deals Won
                    </Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {performer.dealsWon}
                    </Text>
                  </View>
                </View>

                <View style={styles.quotaSection}>
                  <Text style={[styles.quotaLabel, { color: theme.colors.textSecondary }]}>
                    Quota Attainment
                  </Text>
                  <View style={styles.quotaBar}>
                    <View style={[styles.quotaTrack, { backgroundColor: theme.colors.card }]}>
                      <View 
                        style={[
                          styles.quotaFill, 
                          { 
                            backgroundColor: performer.quotaAttainment >= 100 ? '#10B981' : performer.quotaAttainment >= 80 ? '#3B82F6' : '#F59E0B',
                            width: `${Math.min(performer.quotaAttainment, 100)}%`
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[
                      styles.quotaValue, 
                      { 
                        color: performer.quotaAttainment >= 100 ? '#10B981' : performer.quotaAttainment >= 80 ? '#3B82F6' : '#F59E0B'
                      }
                    ]}>
                      {performer.quotaAttainment.toFixed(0)}%
                    </Text>
                  </View>
                </View>

                <View style={styles.revenueBar}>
                  <View style={[styles.revenueTrack, { backgroundColor: theme.colors.card }]}>
                    <View 
                      style={[
                        styles.revenueFill, 
                        { 
                          backgroundColor: theme.colors.primary,
                          width: `${(performer.revenueClosed / maxRevenue) * 100}%`
                        }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  leaderboardContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  performerCard: {
    width: 200,
    padding: 12,
    borderRadius: 12,
  },
  performerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  performerInfo: {
    flex: 1,
  },
  performerName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  performerRole: {
    fontSize: 10,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  metric: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  metricLabel: {
    fontSize: 9,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  quotaSection: {
    marginBottom: 12,
  },
  quotaLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  quotaBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quotaTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  quotaFill: {
    height: '100%',
    borderRadius: 3,
  },
  quotaValue: {
    fontSize: 11,
    fontWeight: '700',
  },
  revenueBar: {
    width: '100%',
  },
  revenueTrack: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  revenueFill: {
    height: '100%',
    borderRadius: 2,
  },
});
