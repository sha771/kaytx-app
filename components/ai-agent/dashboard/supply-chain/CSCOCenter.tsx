import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Box, CheckCircle, TrendingUp, DollarSign, Activity } from 'lucide-react-native';

interface CSCOMetrics {
  globalOrdersInFlow: string;
  fulfillmentRate: string;
  inventoryHealth: string;
  supplierPerformance: string;
  costOptimizationSavings: string;
}

interface CSCOCenterProps {
  metrics: CSCOMetrics;
}

export default function CSCOCenter({ metrics }: CSCOCenterProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Box size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Chief Supply Chain Officer Command Center
        </Text>
      </View>

      <View style={styles.mainMetrics}>
        <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }]}>
          <View style={styles.metricIcon}>
            <Activity size={24} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Global Orders In Flow
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.globalOrdersInFlow}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +12.4% YoY
            </Text>
          </View>
        </View>

        <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
          <View style={styles.metricIcon}>
            <CheckCircle size={24} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Fulfillment Rate
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.fulfillmentRate}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +2.3% QoQ
            </Text>
          </View>
        </View>

        <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: '#06B6D4' }]}>
          <View style={styles.metricIcon}>
            <Box size={24} color="#06B6D4" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Inventory Health
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.inventoryHealth}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +4.1% improvement
            </Text>
          </View>
        </View>

        <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' }]}>
          <View style={styles.metricIcon}>
            <Activity size={24} color="#8B5CF6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Supplier Performance
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.supplierPerformance}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +1.5% increase
            </Text>
          </View>
        </View>

        <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' }]}>
          <View style={styles.metricIcon}>
            <DollarSign size={24} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Cost Optimization Savings
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.costOptimizationSavings}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +$42M this quarter
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.executiveSummary}>
        <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
          End-to-End Supply Chain Intelligence
        </Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Network Visibility
            </Text>
            <Text style={[styles.summaryValue, { color: '#3B82F6' }]}>
              98.2%
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Risk Mitigation
            </Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>
              94.7%
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Demand Accuracy
            </Text>
            <Text style={[styles.summaryValue, { color: '#06B6D4' }]}>
              96.4%
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              AI Optimization
            </Text>
            <Text style={[styles.summaryValue, { color: '#8B5CF6' }]}>
              87.3%
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
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  mainMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  mainMetricCard: {
    flex: 1,
    minWidth: 160,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  executiveSummary: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  summaryItem: {
    flex: 1,
    minWidth: 100,
  },
  summaryLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
});