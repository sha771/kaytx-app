import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Server, Rocket, Zap, TrendingUp, DollarSign, Activity, CheckCircle, AlertCircle } from 'lucide-react-native';

interface CTOCommandCenterProps {
  metrics: {
    activeServices: number;
    deploymentsToday: number;
    systemUptime: string;
    engineeringVelocity: string;
    monthlyInfraCost: string;
    healthScore: number;
  };
  trends: {
    deployments: string;
    uptime: string;
    velocity: string;
    costs: string;
  };
}

export default function CTOCommandCenter({ metrics, trends }: CTOCommandCenterProps) {
  const { theme } = useTheme();

  const largeMetricCards = [
    {
      label: 'Active Services',
      value: metrics.activeServices.toString(),
      change: trends.deployments,
      icon: Server,
      color: '#3B82F6',
      subtitle: 'Production environments'
    },
    {
      label: 'Deployments Today',
      value: metrics.deploymentsToday.toString(),
      change: trends.deployments,
      icon: Rocket,
      color: '#8B5CF6',
      subtitle: 'Successful releases'
    },
    {
      label: 'System Uptime',
      value: metrics.systemUptime,
      change: trends.uptime,
      icon: CheckCircle,
      color: '#10B981',
      subtitle: '30-day average'
    },
    {
      label: 'Engineering Velocity',
      value: metrics.engineeringVelocity,
      change: trends.velocity,
      icon: TrendingUp,
      color: '#F59E0B',
      subtitle: 'Sprint completion rate'
    },
    {
      label: 'Monthly Infra Cost',
      value: metrics.monthlyInfraCost,
      change: trends.costs,
      icon: DollarSign,
      color: '#EF4444',
      subtitle: 'Cloud spending'
    },
    {
      label: 'Platform Health',
      value: `${metrics.healthScore}%`,
      change: '+2.4%',
      icon: Activity,
      color: '#06B6D4',
      subtitle: 'Overall system health'
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          CTO Command Center
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Engineering Operations Overview
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          {largeMetricCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.metricCard, { borderLeftColor: card.color }]}>
                <View style={[styles.iconContainer, { backgroundColor: card.color + '20' }]}>
                  <Icon size={24} color={card.color} />
                </View>
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  {card.label}
                </Text>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                  {card.value}
                </Text>
                <View style={styles.metricChangeRow}>
                  <View style={[styles.changeBadge, { backgroundColor: card.change.startsWith('+') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }]}>
                    <Text style={[styles.changeText, { color: card.change.startsWith('+') ? '#10B981' : '#EF4444' }]}>
                      {card.change}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.metricSubtitle, { color: theme.colors.textSecondary }]}>
                  {card.subtitle}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.healthOverview}>
        <View style={styles.healthHeader}>
          <Text style={[styles.healthTitle, { color: theme.colors.text }]}>
            Engineering Health Overview
          </Text>
          <View style={[styles.healthBadge, { backgroundColor: '#10B981' + '20' }]}>
            <CheckCircle size={16} color="#10B981" />
            <Text style={[styles.healthBadgeText, { color: '#10B981' }]}>
              Optimal
            </Text>
          </View>
        </View>

        <View style={styles.healthMetrics}>
          <View style={styles.healthMetric}>
            <View style={styles.healthMetricIcon}>
              <Server size={20} color="#3B82F6" />
            </View>
            <View style={styles.healthMetricInfo}>
              <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>
                Service Health
              </Text>
              <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>
                98.7%
              </Text>
            </View>
          </View>

          <View style={styles.healthMetric}>
            <View style={styles.healthMetricIcon}>
              <Rocket size={20} color="#8B5CF6" />
            </View>
            <View style={styles.healthMetricInfo}>
              <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>
                Deployment Success
              </Text>
              <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>
                99.4%
              </Text>
            </View>
          </View>

          <View style={styles.healthMetric}>
            <View style={styles.healthMetricIcon}>
              <AlertCircle size={20} color="#F59E0B" />
            </View>
            <View style={styles.healthMetricInfo}>
              <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>
                Active Incidents
              </Text>
              <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>
                2
              </Text>
            </View>
          </View>

          <View style={styles.healthMetric}>
            <View style={styles.healthMetricIcon}>
              <Zap size={20} color="#06B6D4" />
            </View>
            <View style={styles.healthMetricInfo}>
              <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>
                MTTR
              </Text>
              <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>
                18m
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
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    width: 180,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 8,
    opacity: 0.7,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricChangeRow: {
    marginBottom: 8,
  },
  changeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricSubtitle: {
    fontSize: 10,
    opacity: 0.6,
  },
  healthOverview: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  healthTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  healthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  healthBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  healthMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  healthMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  healthMetricIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthMetricInfo: {
    flex: 1,
  },
  healthMetricLabel: {
    fontSize: 11,
    marginBottom: 4,
    opacity: 0.7,
  },
  healthMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  }
});