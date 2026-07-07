import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Globe, Activity, TrendingUp, Shield, Zap, Target } from 'lucide-react-native';

export default function CSCCommandCenter() {
  const { theme } = useTheme();

  const cscMetrics = {
    globalOrdersInFlow: '8.4M',
    fulfillmentRate: '97.8%',
    inventoryHealth: '94%',
    supplierPerformance: '92%',
    costOptimizationSavings: '$284M',
  };

  const networkHealth = {
    endToEndVisibility: 96,
    operationalIntelligence: 94,
    executivePerformance: 92,
    networkHealthSummary: 95,
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Globe size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Chief Supply Chain Officer Command Center
        </Text>
      </View>

      {/* Main CSC Metrics */}
      <View style={styles.mainMetrics}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
          <View style={styles.metricIcon}>
            <Activity size={24} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Global Orders In Flow
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {cscMetrics.globalOrdersInFlow}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={14} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +12.4% vs last month
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }]}>
          <View style={styles.metricIcon}>
            <Target size={24} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Fulfillment Rate
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {cscMetrics.fulfillmentRate}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={14} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +2.4% improvement
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: '#06B6D4' }]}>
          <View style={styles.metricIcon}>
            <Shield size={24} color="#06B6D4" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Inventory Health
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {cscMetrics.inventoryHealth}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={14} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +3.2% vs target
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' }]}>
          <View style={styles.metricIcon}>
            <Activity size={24} color="#8B5CF6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Supplier Performance
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {cscMetrics.supplierPerformance}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={14} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +1.8% improvement
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' }]}>
          <View style={styles.metricIcon}>
            <Zap size={24} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Cost Optimization Savings
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {cscMetrics.costOptimizationSavings}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={14} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +$52M this quarter
            </Text>
          </View>
        </View>
      </View>

      {/* Network Health Summary */}
      <View style={styles.networkHealthSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Network Health Summary
        </Text>
        <View style={styles.networkHealthGrid}>
          <View style={styles.networkHealthCard}>
            <Text style={[styles.healthLabel, { color: theme.colors.textSecondary }]}>
              End-to-End Visibility
            </Text>
            <View style={styles.healthBar}>
              <View 
                style={[
                  styles.healthFill, 
                  { 
                    backgroundColor: '#10B981',
                    width: `${networkHealth.endToEndVisibility}%`
                  }
                ]} 
              />
            </View>
            <Text style={[styles.healthValue, { color: '#10B981' }]}>
              {networkHealth.endToEndVisibility}%
            </Text>
          </View>

          <View style={styles.networkHealthCard}>
            <Text style={[styles.healthLabel, { color: theme.colors.textSecondary }]}>
              Operational Intelligence
            </Text>
            <View style={styles.healthBar}>
              <View 
                style={[
                  styles.healthFill, 
                  { 
                    backgroundColor: '#3B82F6',
                    width: `${networkHealth.operationalIntelligence}%`
                  }
                ]} 
              />
            </View>
            <Text style={[styles.healthValue, { color: '#3B82F6' }]}>
              {networkHealth.operationalIntelligence}%
            </Text>
          </View>

          <View style={styles.networkHealthCard}>
            <Text style={[styles.healthLabel, { color: theme.colors.textSecondary }]}>
              Executive Performance
            </Text>
            <View style={styles.healthBar}>
              <View 
                style={[
                  styles.healthFill, 
                  { 
                    backgroundColor: '#06B6D4',
                    width: `${networkHealth.executivePerformance}%`
                  }
                ]} 
              />
            </View>
            <Text style={[styles.healthValue, { color: '#06B6D4' }]}>
              {networkHealth.executivePerformance}%
            </Text>
          </View>

          <View style={styles.networkHealthCard}>
            <Text style={[styles.healthLabel, { color: theme.colors.textSecondary }]}>
              Network Health Summary
            </Text>
            <View style={styles.healthBar}>
              <View 
                style={[
                  styles.healthFill, 
                  { 
                    backgroundColor: '#8B5CF6',
                    width: `${networkHealth.networkHealthSummary}%`
                  }
                ]} 
              />
            </View>
            <Text style={[styles.healthValue, { color: '#8B5CF6' }]}>
              {networkHealth.networkHealthSummary}%
            </Text>
          </View>
        </View>
      </View>

      {/* Executive Summary */}
      <View style={styles.executiveSummary}>
        <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
          Executive Summary
        </Text>
        <View style={styles.summaryContent}>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.summaryText, { color: theme.colors.textSecondary }]}>
              Global supply chain operating at optimal efficiency with 97.8% fulfillment rate
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={[styles.summaryText, { color: theme.colors.textSecondary }]}>
              AI-driven optimizations generated $284M in savings this quarter
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryDot, { backgroundColor: '#06B6D4' }]} />
            <Text style={[styles.summaryText, { color: theme.colors.textSecondary }]}>
              Supplier network performance improved by 1.8% through strategic partnerships
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.summaryText, { color: theme.colors.textSecondary }]}>
              End-to-end visibility at 96% enabling real-time decision making
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
  metricCard: {
    flex: 1,
    minWidth: 160,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
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
  networkHealthSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  networkHealthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  networkHealthCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  healthLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  healthBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
    borderRadius: 4,
  },
  healthValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  executiveSummary: {
    backgroundColor: 'rgba(139, 92, 246, 0.05)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.2)',
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryContent: {
    gap: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  summaryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  summaryText: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
    lineHeight: 18,
  },
});