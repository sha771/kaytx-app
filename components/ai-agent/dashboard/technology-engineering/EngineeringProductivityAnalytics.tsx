import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Zap, Target, Clock, Code, GitMerge, Users, TrendingUp, Award } from 'lucide-react-native';

interface DeveloperMetric {
  id: string;
  name: string;
  role: string;
  velocity: number;
  commits: number;
  prsMerged: number;
  codeReviews: number;
  aiContribution: number;
}

interface EngineeringProductivityAnalyticsProps {
  metrics: {
    developerVelocity: string;
    sprintCompletion: string;
    teamEfficiency: string;
    codeThroughput: string;
    aiContribution: string;
  };
  developers: DeveloperMetric[];
}

export default function EngineeringProductivityAnalytics({ metrics, developers }: EngineeringProductivityAnalyticsProps) {
  const { theme } = useTheme();

  const productivityCards = [
    {
      label: 'Developer Velocity',
      value: metrics.developerVelocity,
      icon: Zap,
      color: '#3B82F6',
      subtitle: 'Story points/week'
    },
    {
      label: 'Sprint Completion',
      value: metrics.sprintCompletion,
      icon: Target,
      color: '#10B981',
      subtitle: 'Completion rate'
    },
    {
      label: 'Team Efficiency',
      value: metrics.teamEfficiency,
      icon: Clock,
      color: '#8B5CF6',
      subtitle: 'Time utilization'
    },
    {
      label: 'Code Throughput',
      value: metrics.codeThroughput,
      icon: Code,
      color: '#F59E0B',
      subtitle: 'Lines added/day'
    },
    {
      label: 'AI Contribution',
      value: metrics.aiContribution,
      icon: TrendingUp,
      color: '#06B6D4',
      subtitle: 'AI-assisted work'
    }
  ];

  const getVelocityColor = (velocity: number) => {
    if (velocity >= 80) return '#10B981';
    if (velocity >= 60) return '#3B82F6';
    if (velocity >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Engineering Productivity Analytics
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Team Performance & Velocity Tracking
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardsRow}>
          {productivityCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.card, { borderLeftColor: card.color }]}>
                <View style={[styles.cardIcon, { backgroundColor: card.color + '20' }]}>
                  <Icon size={20} color={card.color} />
                </View>
                <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
                  {card.label}
                </Text>
                <Text style={[styles.cardValue, { color: theme.colors.text }]}>
                  {card.value}
                </Text>
                <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
                  {card.subtitle}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.leaderboardSection}>
        <View style={styles.leaderboardHeader}>
          <Text style={[styles.leaderboardTitle, { color: theme.colors.text }]}>
            Productivity Leaderboard
          </Text>
          <Text style={[styles.leaderboardCount, { color: theme.colors.textSecondary }]}>
            {developers.length} developers
          </Text>
        </View>

        {developers.map((developer, index) => (
          <View key={developer.id} style={[styles.developerCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
            <View style={styles.rankBadge}>
              <Text style={[styles.rankText, { color: theme.colors.text }]}>
                #{index + 1}
              </Text>
            </View>

            <View style={styles.developerInfo}>
              <View style={styles.developerAvatar}>
                <Users size={24} color="#3B82F6" />
              </View>
              <View style={styles.developerDetails}>
                <Text style={[styles.developerName, { color: theme.colors.text }]}>
                  {developer.name}
                </Text>
                <Text style={[styles.developerRole, { color: theme.colors.textSecondary }]}>
                  {developer.role}
                </Text>
              </View>
            </View>

            <View style={styles.developerMetrics}>
              <View style={styles.metricPill}>
                <Zap size={12} color="#F59E0B" />
                <Text style={[styles.metricText, { color: theme.colors.text }]}>
                  {developer.velocity} SP
                </Text>
              </View>

              <View style={styles.metricPill}>
                <GitMerge size={12} color="#8B5CF6" />
                <Text style={[styles.metricText, { color: theme.colors.text }]}>
                  {developer.prsMerged} PRs
                </Text>
              </View>

              <View style={styles.metricPill}>
                <Code size={12} color="#10B981" />
                <Text style={[styles.metricText, { color: theme.colors.text }]}>
                  {developer.commits} commits
                </Text>
              </View>
            </View>

            <View style={styles.aiContribution}>
              <View style={[styles.aiBadge, { backgroundColor: '#06B6D4' + '20' }]}>
                <TrendingUp size={12} color="#06B6D4" />
                <Text style={[styles.aiText, { color: '#06B6D4' }]}>
                  {developer.aiContribution}% AI
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.trendsSection}>
        <Text style={[styles.trendsTitle, { color: theme.colors.text }]}>
          Performance Trends
        </Text>

        <View style={styles.trendsGrid}>
          <View style={[styles.trendCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
            <TrendingUp size={24} color="#10B981" />
            <Text style={[styles.trendLabel, { color: theme.colors.text }]}>
              Velocity Trend
            </Text>
            <Text style={[styles.trendValue, { color: '#10B981' }]}>
              +18.5%
            </Text>
            <Text style={[styles.trendPeriod, { color: theme.colors.textSecondary }]}>
              vs last month
            </Text>
          </View>

          <View style={[styles.trendCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }]}>
            <Award size={24} color="#3B82F6" />
            <Text style={[styles.trendLabel, { color: theme.colors.text }]}>
              Sprint Success
            </Text>
            <Text style={[styles.trendValue, { color: '#3B82F6' }]}>
              94.2%
            </Text>
            <Text style={[styles.trendPeriod, { color: theme.colors.textSecondary }]}>
              completion rate
            </Text>
          </View>

          <View style={[styles.trendCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' }]}>
            <Clock size={24} color="#8B5CF6" />
            <Text style={[styles.trendLabel, { color: theme.colors.text }]}>
              Cycle Time
            </Text>
            <Text style={[styles.trendValue, { color: '#8B5CF6' }]}>
              -12.3%
            </Text>
            <Text style={[styles.trendPeriod, { color: theme.colors.textSecondary }]}>
              improvement
            </Text>
          </View>

          <View style={[styles.trendCard, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: '#06B6D4' }]}>
            <Target size={24} color="#06B6D4" />
            <Text style={[styles.trendLabel, { color: theme.colors.text }]}>
              AI Adoption
            </Text>
            <Text style={[styles.trendValue, { color: '#06B6D4' }]}>
              +24.7%
            </Text>
            <Text style={[styles.trendPeriod, { color: theme.colors.textSecondary }]}>
              contribution growth
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.capacitySection}>
        <Text style={[styles.capacityTitle, { color: theme.colors.text }]}>
          Team Capacity Planning
        </Text>

        <View style={[styles.capacityCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
          <View style={styles.capacityHeader}>
            <Text style={[styles.capacityLabel, { color: theme.colors.textSecondary }]}>
              Current Sprint Capacity
            </Text>
            <Text style={[styles.capacityValue, { color: theme.colors.text }]}>
              85% Utilized
            </Text>
          </View>

          <View style={[styles.capacityBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[styles.capacityFill, { 
                backgroundColor: '#10B981',
                width: '85%' 
              }]} 
            />
          </View>

          <View style={styles.capacityBreakdown}>
            <View style={styles.capacityItem}>
              <View style={[styles.capacityDot, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.capacityItemText, { color: theme.colors.textSecondary }]}>
                Development: 45%
              </Text>
            </View>
            <View style={styles.capacityItem}>
              <View style={[styles.capacityDot, { backgroundColor: '#3B82F6' }]} />
              <Text style={[styles.capacityItemText, { color: theme.colors.textSecondary }]}>
                Code Review: 25%
              </Text>
            </View>
            <View style={styles.capacityItem}>
              <View style={[styles.capacityDot, { backgroundColor: '#8B5CF6' }]} />
              <Text style={[styles.capacityItemText, { color: theme.colors.textSecondary }]}>
                Planning: 15%
              </Text>
            </View>
            <View style={styles.capacityItem}>
              <View style={[styles.capacityDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={[styles.capacityItemText, { color: theme.colors.textSecondary }]}>
                Available: 15%
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    width: 130,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
    opacity: 0.7,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 9,
    opacity: 0.6,
  },
  leaderboardSection: {
    marginBottom: 20,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leaderboardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  leaderboardCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  developerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '700',
  },
  developerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  developerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  developerDetails: {
    flex: 1,
  },
  developerName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  developerRole: {
    fontSize: 11,
    opacity: 0.7,
  },
  developerMetrics: {
    flexDirection: 'row',
    gap: 8,
  },
  metricPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  metricText: {
    fontSize: 10,
    fontWeight: '600',
  },
  aiContribution: {
    marginLeft: 8,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  aiText: {
    fontSize: 10,
    fontWeight: '600',
  },
  trendsSection: {
    marginBottom: 20,
  },
  trendsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  trendsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  trendCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  trendLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  trendValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  trendPeriod: {
    fontSize: 11,
    opacity: 0.7,
  },
  capacitySection: {
    marginTop: 8,
  },
  capacityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  capacityCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  capacityLabel: {
    fontSize: 13,
    opacity: 0.7,
  },
  capacityValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  capacityBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 16,
  },
  capacityFill: {
    height: '100%',
    borderRadius: 5,
  },
  capacityBreakdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  capacityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  capacityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  capacityItemText: {
    fontSize: 11,
    opacity: 0.8,
  }
});