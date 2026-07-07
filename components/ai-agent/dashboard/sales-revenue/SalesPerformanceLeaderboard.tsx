import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Award, TrendingUp, DollarSign, Target, Calendar, CheckCircle } from 'lucide-react-native';

interface Performer {
  name: string;
  role: string;
  revenueClosed: number;
  conversionRate: number;
  meetingsBooked: number;
  dealsWon: number;
  quotaAttainment: number;
}

interface SalesPerformanceConfig {
  performers: Performer[];
}

interface SalesPerformanceLeaderboardProps {
  config: SalesPerformanceConfig;
}

export default function SalesPerformanceLeaderboard({ config }: SalesPerformanceLeaderboardProps) {
  const { theme } = useTheme();

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const getRankBadge = (index: number) => {
    if (index === 0) return { color: '#FFD700', icon: '🥇' };
    if (index === 1) return { color: '#C0C0C0', icon: '🥈' };
    if (index === 2) return { color: '#CD7F32', icon: '🥉' };
    return { color: '#6B7280', icon: `#${index + 1}` };
  };

  const sortedPerformers = [...config.performers].sort((a, b) => b.revenueClosed - a.revenueClosed);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Award size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Sales Performance Leaderboard
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.leaderboardRow}>
          {sortedPerformers.map((performer, index) => {
            const rankBadge = getRankBadge(index);
            return (
              <View 
                key={performer.name} 
                style={[
                  styles.performerCard, 
                  index === 0 && styles.topPerformer,
                  { backgroundColor: 'rgba(255,255,255,0.03)' }
                ]}
              >
                <View style={styles.performerHeader}>
                  <View style={[styles.rankBadge, { backgroundColor: rankBadge.color + '30' }]}>
                    <Text style={styles.rankIcon}>{rankBadge.icon}</Text>
                  </View>
                  <View style={styles.performerInfo}>
                    <Text style={[styles.performerName, { color: theme.colors.text }]}>
                      {performer.name}
                    </Text>
                    <Text style={[styles.performerRole, { color: theme.colors.textSecondary }]}>
                      {performer.role}
                    </Text>
                  </View>
                  {index === 0 && (
                    <View style={styles.crownIcon}>
                      <Text style={styles.crownEmoji}>👑</Text>
                    </View>
                  )}
                </View>

                <View style={styles.mainMetric}>
                  <DollarSign size={14} color="#10B981" />
                  <Text style={[styles.mainMetricValue, { color: '#10B981' }]}>
                    {formatCurrency(performer.revenueClosed)}
                  </Text>
                  <Text style={[styles.mainMetricLabel, { color: theme.colors.textSecondary }]}>
                    Revenue Closed
                  </Text>
                </View>

                <View style={styles.metricsGrid}>
                  <View style={styles.metricItem}>
                    <Target size={12} color="#3B82F6" />
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {performer.conversionRate}%
                    </Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Conversion
                    </Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Calendar size={12} color="#8B5CF6" />
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {performer.meetingsBooked}
                    </Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Meetings
                    </Text>
                  </View>
                  <View style={styles.metricItem}>
                    <CheckCircle size={12} color="#10B981" />
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {performer.dealsWon}
                    </Text>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Deals Won
                    </Text>
                  </View>
                </View>

                <View style={styles.quotaSection}>
                  <View style={styles.quotaHeader}>
                    <Text style={[styles.quotaLabel, { color: theme.colors.textSecondary }]}>
                      Quota Attainment
                    </Text>
                    <Text style={[styles.quotaValue, { color: performer.quotaAttainment >= 100 ? '#10B981' : '#F59E0B' }]}>
                      {performer.quotaAttainment}%
                    </Text>
                  </View>
                  <View style={[styles.quotaBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View 
                      style={[
                        styles.quotaFill, 
                        { 
                          backgroundColor: performer.quotaAttainment >= 100 ? '#10B981' : 
                                       performer.quotaAttainment >= 80 ? '#3B82F6' : '#F59E0B',
                          width: `${Math.min(performer.quotaAttainment, 100)}%`
                        }
                      ]} 
                    />
                  </View>
                </View>

                {performer.quotaAttainment >= 100 && (
                  <View style={[styles.achievementBadge, { backgroundColor: '#10B981' + '20' }]}>
                    <TrendingUp size={12} color="#10B981" />
                    <Text style={[styles.achievementText, { color: '#10B981' }]}>
                      Quota Exceeded
                    </Text>
                  </View>
                )}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  leaderboardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  performerCard: {
    borderRadius: 12,
    padding: 12,
    minWidth: 220,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  topPerformer: {
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  performerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankIcon: {
    fontSize: 14,
    fontWeight: '700',
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
    fontSize: 11,
  },
  crownIcon: {
    marginLeft: 4,
  },
  crownEmoji: {
    fontSize: 16,
  },
  mainMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    padding: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 8,
  },
  mainMetricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  mainMetricLabel: {
    fontSize: 11,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
  },
  quotaSection: {
    marginBottom: 8,
  },
  quotaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  quotaLabel: {
    fontSize: 11,
  },
  quotaValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  quotaBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  quotaFill: {
    height: '100%',
    borderRadius: 2,
  },
  achievementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  achievementText: {
    fontSize: 10,
    fontWeight: '600',
  }
});