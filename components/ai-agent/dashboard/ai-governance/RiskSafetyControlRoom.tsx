import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, AlertTriangle, Skull, Zap, Lock, Eye, Target, TrendingUp, Activity, Ban, CheckCircle, Radio, Clock } from 'lucide-react-native';

interface RiskMetric {
  id: string;
  name: string;
  category: 'hallucination' | 'toxicity' | 'prompt_injection' | 'jailbreak' | 'bias';
  currentValue: number;
  threshold: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  status: 'safe' | 'warning' | 'critical';
  incidentsBlocked: number;
  lastIncident: string;
}

interface RiskSafetyControlRoomProps {
  riskMetrics: RiskMetric[];
}

export default function RiskSafetyControlRoom({ riskMetrics }: RiskSafetyControlRoomProps) {
  const { theme } = useTheme();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hallucination': return '#06B6D4';
      case 'toxicity': return '#EF4444';
      case 'prompt_injection': return '#F59E0B';
      case 'jailbreak': return '#8B5CF6';
      case 'bias': return '#EC4899';
      default: return '#6B7280';
    }
  };

  const getCategoryBackground = (category: string) => {
    const color = getCategoryColor(category);
    return color + '15';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp size={14} color="#EF4444" />;
      case 'decreasing': return <TrendingUp size={14} color="#10B981" style={{ transform: [{ rotate: '180deg' }] }} />;
      case 'stable': return <Activity size={14} color="#6B7280" />;
      default: return <Activity size={14} color="#6B7280" />;
    }
  };

  const riskRadarData = [
    { label: 'Hallucination', value: 23, color: '#06B6D4' },
    { label: 'Toxicity', value: 12, color: '#EF4444' },
    { label: 'Prompt Injection', value: 31, color: '#F59E0B' },
    { label: 'Jailbreak', value: 8, color: '#8B5CF6' },
    { label: 'Bias', value: 18, color: '#EC4899' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Shield size={20} color="#EF4444" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          AI Risk & Safety Control Room
        </Text>
      </View>

      {/* Risk Radar */}
      <View style={[styles.radarSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.radarHeader}>
          <Radio size={18} color="#8B5CF6" />
          <Text style={[styles.radarTitle, { color: theme.colors.text }]}>
            Risk Radar
          </Text>
        </View>
        <View style={styles.radarGrid}>
          {riskRadarData.map((risk) => (
            <View key={risk.label} style={styles.radarItem}>
              <Text style={[styles.radarLabel, { color: theme.colors.textSecondary }]}>
                {risk.label}
              </Text>
              <View style={[styles.radarBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <View 
                  style={[
                    styles.radarFill, 
                    { backgroundColor: risk.color, width: risk.value + '%' }
                  ]} 
                />
              </View>
              <Text style={[styles.radarValue, { color: risk.color }]}>
                {risk.value}%
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Risk Metric Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.metricsScroll}
      >
        {riskMetrics.map((metric) => {
          const categoryColor = getCategoryColor(metric.category);
          const categoryBackground = getCategoryBackground(metric.category);
          const statusColor = getStatusColor(metric.status);

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
                  <Shield size={24} color={categoryColor} />
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
                  {metric.currentValue}%
                </Text>
                <Text style={[styles.thresholdText, { color: theme.colors.textSecondary }]}>
                  Threshold: {metric.threshold}%
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

              <View style={styles.metricStats}>
                <View style={styles.statItem}>
                  <Ban size={14} color="#10B981" />
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                    Blocked
                  </Text>
                  <Text style={[styles.statValue, { color: '#10B981' }]}>
                    {metric.incidentsBlocked.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={14} color="#F59E0B" />
                  <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                    Last Incident
                  </Text>
                  <Text style={[styles.statValue, { color: '#F59E0B' }]}>
                    {metric.lastIncident}
                  </Text>
                </View>
              </View>

              <View style={styles.riskBar}>
                <View style={styles.riskBarTrack}>
                  <View 
                    style={[
                      styles.riskBarFill, 
                      { 
                        backgroundColor: metric.currentValue > metric.threshold ? '#EF4444' : metric.currentValue > metric.threshold * 0.7 ? '#F59E0B' : '#10B981',
                        width: `${(metric.currentValue / metric.threshold) * 100}%`
                      }
                    ]} 
                  />
                </View>
                <Text style={[
                  styles.riskBarText, 
                  { color: metric.currentValue > metric.threshold ? '#EF4444' : metric.currentValue > metric.threshold * 0.7 ? '#F59E0B' : '#10B981' }
                ]}>
                  {metric.currentValue > metric.threshold ? 'CRITICAL' : metric.currentValue > metric.threshold * 0.7 ? 'WARNING' : 'SAFE'}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Safety Scoring Dashboard */}
      <View style={[styles.safetySection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.safetyHeader}>
          <Target size={18} color="#10B981" />
          <Text style={[styles.safetyTitle, { color: theme.colors.text }]}>
            Safety Scoring Dashboard
          </Text>
        </View>
        <View style={styles.safetyGrid}>
          <View style={styles.safetyCard}>
            <Text style={[styles.safetyLabel, { color: theme.colors.textSecondary }]}>
              Overall Safety Score
            </Text>
            <Text style={[styles.safetyScore, { color: '#10B981' }]}>
              94.8%
            </Text>
            <View style={[styles.safetyBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <View style={[styles.safetyFill, { backgroundColor: '#10B981', width: '94.8%' }]} />
            </View>
          </View>
          <View style={styles.safetyCard}>
            <Text style={[styles.safetyLabel, { color: theme.colors.textSecondary }]}>
              Guardrail Effectiveness
            </Text>
            <Text style={[styles.safetyScore, { color: '#06B6D4' }]}>
              97.2%
            </Text>
            <View style={[styles.safetyBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={[styles.safetyFill, { backgroundColor: '#06B6D4', width: '97.2%' }]} />
            </View>
          </View>
          <View style={styles.safetyCard}>
            <Text style={[styles.safetyLabel, { color: theme.colors.textSecondary }]}>
              Threat Detection Rate
            </Text>
            <Text style={[styles.safetyScore, { color: '#8B5CF6' }]}>
              91.5%
            </Text>
            <View style={[styles.safetyBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
              <View style={[styles.safetyFill, { backgroundColor: '#8B5CF6', width: '91.5%' }]} />
            </View>
          </View>
        </View>
      </View>

      {/* Attack Simulation Monitor */}
      <View style={[styles.attackSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.attackHeader}>
          <Skull size={18} color="#EF4444" />
          <Text style={[styles.attackTitle, { color: theme.colors.text }]}>
            Attack Simulation Monitor
          </Text>
        </View>
        <View style={styles.attackList}>
          <View style={styles.attackItem}>
            <View style={[styles.attackIcon, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
              <Zap size={16} color="#EF4444" />
            </View>
            <View style={styles.attackInfo}>
              <Text style={[styles.attackType, { color: theme.colors.text }]}>
                Prompt Injection Attempt
              </Text>
              <Text style={[styles.attackStatus, { color: '#10B981' }]}>
                Blocked by guardrail
              </Text>
            </View>
            <Text style={[styles.attackTime, { color: theme.colors.textSecondary }]}>
              2m ago
            </Text>
          </View>
          <View style={styles.attackItem}>
            <View style={[styles.attackIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
              <Lock size={16} color="#F59E0B" />
            </View>
            <View style={styles.attackInfo}>
              <Text style={[styles.attackType, { color: theme.colors.text }]}>
                Jailbreak Pattern Detected
              </Text>
              <Text style={[styles.attackStatus, { color: '#F59E0B' }]}>
                Under review
              </Text>
            </View>
            <Text style={[styles.attackTime, { color: theme.colors.textSecondary }]}>
              15m ago
            </Text>
          </View>
          <View style={styles.attackItem}>
            <View style={[styles.attackIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <CheckCircle size={16} color="#10B981" />
            </View>
            <View style={styles.attackInfo}>
              <Text style={[styles.attackType, { color: theme.colors.text }]}>
                Bias Detection Test
              </Text>
              <Text style={[styles.attackStatus, { color: '#10B981' }]}>
                Passed
              </Text>
            </View>
            <Text style={[styles.attackTime, { color: theme.colors.textSecondary }]}>
              1h ago
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
  radarSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  radarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  radarTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  radarGrid: {
    gap: 10,
  },
  radarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radarLabel: {
    width: 100,
    fontSize: 12,
    fontWeight: '500',
  },
  radarBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  radarFill: {
    height: '100%',
    borderRadius: 4,
  },
  radarValue: {
    width: 40,
    fontSize: 12,
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
    minWidth: 260,
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
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  thresholdText: {
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
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  metricStats: {
    gap: 8,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  riskBar: {
    gap: 6,
  },
  riskBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  riskBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  riskBarText: {
    fontSize: 10,
    fontWeight: '600',
  },
  safetySection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  safetyTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  safetyGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  safetyCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  safetyLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  safetyScore: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  safetyBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  safetyFill: {
    height: '100%',
    borderRadius: 3,
  },
  attackSection: {
    borderRadius: 12,
    padding: 16,
  },
  attackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  attackTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  attackList: {
    gap: 10,
  },
  attackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  attackIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attackInfo: {
    flex: 1,
  },
  attackType: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  attackStatus: {
    fontSize: 11,
    fontWeight: '500',
  },
  attackTime: {
    fontSize: 11,
    fontWeight: '500',
  },
});