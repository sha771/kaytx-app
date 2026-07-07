import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, AlertTriangle, TrendingDown, Activity } from 'lucide-react-native';

interface RiskMetric {
  id: string;
  label: string;
  value: number;
  max: number;
  color: string;
  icon: React.ElementType;
}

interface RiskEngineProps {
  metrics: RiskMetric[];
  overallRiskScore: number;
}

export default function RiskEngine({ metrics, overallRiskScore }: RiskEngineProps) {
  const { theme } = useTheme();

  const getRiskColor = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    if (percentage < 30) return '#10B981';
    if (percentage < 60) return '#F59E0B';
    return '#EF4444';
  };

  const getOverallRiskColor = (score: number) => {
    if (score < 30) return '#10B981';
    if (score < 60) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Shield size={20} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Risk Engine
          </Text>
        </View>
      </View>

      {/* Overall Risk Score */}
      <View style={[styles.overallRisk, { backgroundColor: theme.colors.background }]}>
        <View style={styles.overallRiskContent}>
          <Text style={[styles.overallRiskLabel, { color: theme.colors.textSecondary }]}>
            Overall Risk Score
          </Text>
          <View style={styles.overallRiskValue}>
            <Text style={[styles.overallRiskNumber, { color: getOverallRiskColor(overallRiskScore) }]}>
              {overallRiskScore}
            </Text>
            <Text style={[styles.overallRiskMax, { color: theme.colors.textSecondary }]}>
              /100
            </Text>
          </View>
          <Text style={[styles.overallRiskStatus, { color: getOverallRiskColor(overallRiskScore) }]}>
            {overallRiskScore < 30 ? 'LOW RISK' : overallRiskScore < 60 ? 'MODERATE RISK' : 'HIGH RISK'}
          </Text>
        </View>
      </View>

      {/* Risk Metrics Grid */}
      <View style={styles.metricsGrid}>
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const color = getRiskColor(metric.value, metric.max);
          const percentage = (metric.value / metric.max) * 100;

          return (
            <View key={metric.id} style={[styles.metricCard, { backgroundColor: theme.colors.background }]}>
              <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
                <Icon size={20} color={color} />
              </View>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                {metric.label}
              </Text>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                {metric.value}
              </Text>
              
              {/* Circular Progress Indicator */}
              <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: color,
                        width: `${percentage}%`
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          );
        })}
      </View>

      {/* Risk Alerts */}
      <View style={[styles.alertsSection, { backgroundColor: theme.colors.background }]}>
        <View style={styles.alertHeader}>
          <AlertTriangle size={16} color="#F59E0B" />
          <Text style={[styles.alertTitle, { color: theme.colors.text }]}>
            Active Risk Alerts
          </Text>
        </View>
        <View style={styles.alertItem}>
          <View style={[styles.alertDot, { backgroundColor: '#EF4444' }]} />
          <Text style={[styles.alertText, { color: theme.colors.text }]}>
            Portfolio exposure exceeds 85%
          </Text>
        </View>
        <View style={styles.alertItem}>
          <View style={[styles.alertDot, { backgroundColor: '#F59E0B' }]} />
          <Text style={[styles.alertText, { color: theme.colors.text }]}>
            VaR approaching daily limit
          </Text>
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
  overallRisk: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  overallRiskContent: {
    alignItems: 'center',
  },
  overallRiskLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  overallRiskValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  overallRiskNumber: {
    fontSize: 48,
    fontWeight: '700',
  },
  overallRiskMax: {
    fontSize: 16,
    marginLeft: 4,
  },
  overallRiskStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 16,
  },
  metricCard: {
    width: '50%',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    marginBottom: 12,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 4,
 textAlign: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  progressContainer: {
    width: '100%',
  },
  progressTrack: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  alertsSection: {
    padding: 16,
    borderRadius: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  alertText: {
    fontSize: 12,
    flex: 1,
  },
});
