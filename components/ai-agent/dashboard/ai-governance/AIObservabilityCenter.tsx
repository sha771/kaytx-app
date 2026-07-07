import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Zap, DollarSign, TrendingUp, Clock, Cpu, HardDrive, Server, BarChart3, Target, CheckCircle, AlertTriangle } from 'lucide-react-native';

interface ObservabilityMetric {
  id: string;
  name: string;
  category: 'latency' | 'token_usage' | 'cost' | 'accuracy' | 'drift' | 'health';
  currentValue: string;
  targetValue: string;
  trend: 'improving' | 'degrading' | 'stable';
  status: 'optimal' | 'warning' | 'critical';
  historicalData: { value: string; timestamp: string }[];
}

interface AIObservabilityCenterProps {
  metrics: ObservabilityMetric[];
}

export default function AIObservabilityCenter({ metrics }: AIObservabilityCenterProps) {
  const { theme } = useTheme();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'latency': return '#06B6D4';
      case 'token_usage': return '#8B5CF6';
      case 'cost': return '#F59E0B';
      case 'accuracy': return '#10B981';
      case 'drift': return '#EF4444';
      case 'health': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getCategoryBackground = (category: string) => {
    const color = getCategoryColor(category);
    return color + '15';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp size={14} color="#10B981" />;
      case 'degrading': return <TrendingUp size={14} color="#EF4444" style={{ transform: [{ rotate: '180deg' }] }} />;
      case 'stable': return <Activity size={14} color="#6B7280" />;
      default: return <Activity size={14} color="#6B7280" />;
    }
  };

  const categoryIcon = {
    latency: Clock,
    token_usage: Zap,
    cost: DollarSign,
    accuracy: Target,
    drift: TrendingUp,
    health: Activity,
  };

  const usageHeatmapData = [
    { region: 'US-East', usage: 85, color: '#06B6D4' },
    { region: 'US-West', usage: 72, color: '#10B981' },
    { region: 'EU-West', usage: 68, color: '#8B5CF6' },
    { region: 'APAC', usage: 54, color: '#F59E0B' },
    { region: 'LATAM', usage: 41, color: '#EC4899' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Activity size={20} color="#06B6D4" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          AI Observability Center
        </Text>
      </View>

      {/* Real-time Inference Dashboard */}
      <View style={[styles.inferenceSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.inferenceHeader}>
          <BarChart3 size={18} color="#8B5CF6" />
          <Text style={[styles.inferenceTitle, { color: theme.colors.text }]}>
            Real-time Inference Dashboard
          </Text>
        </View>
        <View style={styles.inferenceGrid}>
          <View style={styles.inferenceCard}>
            <Text style={[styles.inferenceLabel, { color: theme.colors.textSecondary }]}>
              Requests/sec
            </Text>
            <Text style={[styles.inferenceValue, { color: '#06B6D4' }]}>
              1,248
            </Text>
            <View style={styles.inferenceTrend}>
              <TrendingUp size={12} color="#10B981" />
              <Text style={[styles.trendText, { color: '#10B981' }]}>
                +12.5%
              </Text>
            </View>
          </View>
          <View style={styles.inferenceCard}>
            <Text style={[styles.inferenceLabel, { color: theme.colors.textSecondary }]}>
              Avg Latency
            </Text>
            <Text style={[styles.inferenceValue, { color: '#10B981' }]}>
              245ms
            </Text>
            <View style={styles.inferenceTrend}>
              <TrendingUp size={12} color="#10B981" style={{ transform: [{ rotate: '180deg' }] }} />
              <Text style={[styles.trendText, { color: '#10B981' }]}>
                -8.3%
              </Text>
            </View>
          </View>
          <View style={styles.inferenceCard}>
            <Text style={[styles.inferenceLabel, { color: theme.colors.textSecondary }]}>
              Error Rate
            </Text>
            <Text style={[styles.inferenceValue, { color: '#F59E0B' }]}>
              0.12%
            </Text>
            <View style={styles.inferenceTrend}>
              <TrendingUp size={12} color="#EF4444" />
              <Text style={[styles.trendText, { color: '#EF4444' }]}>
                +0.02%
              </Text>
            </View>
          </View>
          <View style={styles.inferenceCard}>
            <Text style={[styles.inferenceLabel, { color: theme.colors.textSecondary }]}>
              Success Rate
            </Text>
            <Text style={[styles.inferenceValue, { color: '#10B981' }]}>
              99.88%
            </Text>
            <View style={styles.inferenceTrend}>
              <Activity size={12} color="#6B7280" />
              <Text style={[styles.trendText, { color: '#6B7280' }]}>
                Stable
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Observability Metric Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.metricsScroll}
      >
        {metrics.map((metric) => {
          const categoryColor = getCategoryColor(metric.category);
          const categoryBackground = getCategoryBackground(metric.category);
          const statusColor = getStatusColor(metric.status);
          const CategoryIcon = categoryIcon[metric.category];

          return (
            <View 
              key={metric.id} 
              style={[
                styles.metricCard, 
                { 
                  backgroundColor: categoryBackground,
                  borderColor: categoryColor + '30',
                  borderWidth: 1
                }
              ]}
            >
              <View style={styles.metricHeader}>
                <View style={[styles.metricIcon, { backgroundColor: categoryColor + '20' }]}>
                  <CategoryIcon size={24} color={categoryColor} />
                </View>
                <View style={styles.metricStatus}>
                  <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {metric.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={[styles.metricName, { color: theme.colors.text }]}>
                {metric.name}
              </Text>
              <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '20' }]}>
                <Text style={[styles.categoryText, { color: categoryColor }]}>
                  {metric.category.replace('_', ' ').toUpperCase()}
                </Text>
              </View>

              <View style={styles.metricValueSection}>
                <Text style={[styles.currentValue, { color: categoryColor }]}>
                  {metric.currentValue}
                </Text>
                <Text style={[styles.targetText, { color: theme.colors.textSecondary }]}>
                  Target: {metric.targetValue}
                </Text>
              </View>

              <View style={styles.trendRow}>
                <View style={styles.trendIconWrapper}>
                  {getTrendIcon(metric.trend)}
                </View>
                <Text style={[styles.trendText, { color: theme.colors.textSecondary }]}>
                  {metric.trend.toUpperCase()}
                </Text>
              </View>

              <View style={styles.historySection}>
                <Text style={[styles.historyLabel, { color: theme.colors.textSecondary }]}>
                  Historical Data
                </Text>
                <View style={styles.historyList}>
                  {metric.historicalData.slice(0, 3).map((data, index) => (
                    <View key={index} style={styles.historyItem}>
                      <Text style={[styles.historyValue, { color: theme.colors.text }]}>
                        {data.value}
                      </Text>
                      <Text style={[styles.historyTime, { color: theme.colors.textSecondary }]}>
                        {data.timestamp}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Usage Heatmap */}
      <View style={[styles.heatmapSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.heatmapHeader}>
          <BarChart3 size={18} color="#06B6D4" />
          <Text style={[styles.heatmapTitle, { color: theme.colors.text }]}>
            Usage Heatmap
          </Text>
        </View>
        <View style={styles.heatmapGrid}>
          {usageHeatmapData.map((region) => (
            <View key={region.region} style={styles.heatmapItem}>
              <Text style={[styles.regionLabel, { color: theme.colors.textSecondary }]}>
                {region.region}
              </Text>
              <View style={[styles.heatmapBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <View 
                  style={[
                    styles.heatmapFill, 
                    { backgroundColor: region.color, width: region.usage + '%' }
                  ]} 
                />
              </View>
              <Text style={[styles.usageValue, { color: region.color }]}>
                {region.usage}%
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Cost Optimization Analytics */}
      <View style={[styles.costSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.costHeader}>
          <DollarSign size={18} color="#F59E0B" />
          <Text style={[styles.costTitle, { color: theme.colors.text }]}>
            Cost Optimization Analytics
          </Text>
        </View>
        <View style={styles.costGrid}>
          <View style={styles.costCard}>
            <Text style={[styles.costLabel, { color: theme.colors.textSecondary }]}>
              Daily Cost
            </Text>
            <Text style={[styles.costValue, { color: '#F59E0B' }]}>
              $2,847
            </Text>
            <View style={styles.costTrend}>
              <TrendingUp size={12} color="#10B981" style={{ transform: [{ rotate: '180deg' }] }} />
              <Text style={[styles.trendText, { color: '#10B981' }]}>
                -5.2%
              </Text>
            </View>
          </View>
          <View style={styles.costCard}>
            <Text style={[styles.costLabel, { color: theme.colors.textSecondary }]}>
              Cost/1K Tokens
            </Text>
            <Text style={[styles.costValue, { color: '#06B6D4' }]}>
              $0.002
            </Text>
            <View style={styles.costTrend}>
              <Activity size={12} color="#6B7280" />
              <Text style={[styles.trendText, { color: '#6B7280' }]}>
                Stable
              </Text>
            </View>
          </View>
          <View style={styles.costCard}>
            <Text style={[styles.costLabel, { color: theme.colors.textSecondary }]}>
              Optimization Score
            </Text>
            <Text style={[styles.costValue, { color: '#10B981' }]}>
              94.2%
            </Text>
            <View style={styles.costTrend}>
              <TrendingUp size={12} color="#10B981" />
              <Text style={[styles.trendText, { color: '#10B981' }]}>
                +2.1%
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* System Health Overview */}
      <View style={[styles.healthSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.healthHeader}>
          <Server size={18} color="#3B82F6" />
          <Text style={[styles.healthTitle, { color: theme.colors.text }]}>
            System Health Overview
          </Text>
        </View>
        <View style={styles.healthList}>
          <View style={styles.healthItem}>
            <View style={[styles.healthIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <CheckCircle size={16} color="#10B981" />
            </View>
            <View style={styles.healthInfo}>
              <Text style={[styles.healthName, { color: theme.colors.text }]}>
                LLM Providers
              </Text>
              <Text style={[styles.healthStatus, { color: '#10B981' }]}>
                All operational
              </Text>
            </View>
            <Text style={[styles.healthUptime, { color: theme.colors.textSecondary }]}>
              99.99%
            </Text>
          </View>
          <View style={styles.healthItem}>
            <View style={[styles.healthIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <CheckCircle size={16} color="#10B981" />
            </View>
            <View style={styles.healthInfo}>
              <Text style={[styles.healthName, { color: theme.colors.text }]}>
                Vector Databases
              </Text>
              <Text style={[styles.healthStatus, { color: '#10B981' }]}>
                Healthy
              </Text>
            </View>
            <Text style={[styles.healthUptime, { color: theme.colors.textSecondary }]}>
              99.95%
            </Text>
          </View>
          <View style={styles.healthItem}>
            <View style={[styles.healthIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
              <AlertTriangle size={16} color="#F59E0B" />
            </View>
            <View style={styles.healthInfo}>
              <Text style={[styles.healthName, { color: theme.colors.text }]}>
                API Gateways
              </Text>
              <Text style={[styles.healthStatus, { color: '#F59E0B' }]}>
                Slight latency
              </Text>
            </View>
            <Text style={[styles.healthUptime, { color: theme.colors.textSecondary }]}>
              99.87%
            </Text>
          </View>
          <View style={styles.healthItem}>
            <View style={[styles.healthIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <CheckCircle size={16} color="#10B981" />
            </View>
            <View style={styles.healthInfo}>
              <Text style={[styles.healthName, { color: theme.colors.text }]}>
                Model Hosting
              </Text>
              <Text style={[styles.healthStatus, { color: '#10B981' }]}>
                Optimal
              </Text>
            </View>
            <Text style={[styles.healthUptime, { color: theme.colors.textSecondary }]}>
              99.92%
            </Text>
          </View>
        </View>
      </View>
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  inferenceSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  inferenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  inferenceTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  inferenceGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  inferenceCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  inferenceLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  inferenceValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  inferenceTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  metricsScroll: {
    gap: 16,
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  metricCard: {
    borderRadius: 16,
    padding: 20,
    minWidth: 240,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  metricName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  metricValueSection: {
    marginBottom: 12,
  },
  currentValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  targetText: {
    fontSize: 12,
    fontWeight: '500',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  trendIconWrapper: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historySection: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  historyLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  historyList: {
    gap: 6,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  historyTime: {
    fontSize: 11,
    fontWeight: '500',
  },
  heatmapSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  heatmapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  heatmapTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  heatmapGrid: {
    gap: 10,
  },
  heatmapItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  regionLabel: {
    width: 80,
    fontSize: 12,
    fontWeight: '500',
  },
  heatmapBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  heatmapFill: {
    height: '100%',
    borderRadius: 4,
  },
  usageValue: {
    width: 40,
    fontSize: 12,
    fontWeight: '600',
  },
  costSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  costHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  costTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  costGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  costCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  costLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  costValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  costTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  healthSection: {
    borderRadius: 12,
    padding: 16,
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  healthTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  healthList: {
    gap: 10,
  },
  healthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  healthIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthInfo: {
    flex: 1,
  },
  healthName: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  healthStatus: {
    fontSize: 11,
    fontWeight: '500',
  },
  healthUptime: {
    fontSize: 12,
    fontWeight: '600',
  },
});