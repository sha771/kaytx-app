import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { FileText, TrendingUp, TrendingDown, AlertTriangle, Shield, Activity } from 'lucide-react-native';
import { CreditIntelligenceConfig } from '../types';

interface CreditIntelligenceProps {
  config: CreditIntelligenceConfig;
}

export default function CreditIntelligence({ config }: CreditIntelligenceProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.creditBadge, { backgroundColor: '#3B82F620', borderColor: '#3B82F6' }]}>
            <FileText size={16} color="#3B82F6" />
            <Text style={styles.creditBadgeText}>CREDIT INTEL</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            Intelligence Engine
          </Text>
        </View>
        <View style={[styles.liveIndicator, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <Activity size={12} color="#10B981" />
          <Text style={styles.liveText}>ANALYZING</Text>
        </View>
      </View>
      
      <View style={[styles.metricsRow, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <View style={styles.metricItem}>
          <View style={[styles.metricIcon, { backgroundColor: '#3B82F620' }]}>
            <FileText size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Pending</Text>
          <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{config.loanApplications.pending}</Text>
        </View>
        <View style={styles.metricItem}>
          <View style={[styles.metricIcon, { backgroundColor: '#10B98120' }]}>
            <TrendingUp size={20} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Approved</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{config.loanApplications.approved}</Text>
        </View>
        <View style={styles.metricItem}>
          <View style={[styles.metricIcon, { backgroundColor: '#EF444420' }]}>
            <TrendingDown size={20} color="#EF4444" />
          </View>
          <Text style={[styles.metricLabel, { color: '#9CA3AF' }]}>Rejected</Text>
          <Text style={[styles.metricValue, { color: '#EF4444' }]}>{config.loanApplications.rejected}</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Credit Score Distribution</Text>
        <View style={styles.scoreRow}>
          <Text style={[styles.scoreLabel, { color: '#FFFFFF' }]}>Average Score</Text>
          <Text style={[styles.scoreValue, { color: '#10B981' }]}>{config.creditScores.average}</Text>
        </View>
        {config.creditScores.distribution.map((range, index) => (
          <View key={index} style={styles.distributionItem}>
            <Text style={[styles.rangeLabel, { color: '#FFFFFF' }]}>{range.range}</Text>
            <View style={styles.distributionBar}>
              <View style={[styles.distributionFill, { width: `${(range.count / 3456) * 100}%`, backgroundColor: '#3B82F6' }]} />
            </View>
            <Text style={[styles.rangeCount, { color: '#FFFFFF' }]}>{range.count}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Default Risk Assessment</Text>
        <View style={styles.defaultRow}>
          <Text style={[styles.defaultLabel, { color: '#9CA3AF' }]}>Probability</Text>
          <Text style={[styles.defaultValue, { color: config.defaultRisk.probability > 1 ? '#EF4444' : '#10B981' }]}>
            {config.defaultRisk.probability}%
          </Text>
        </View>
        <View style={styles.defaultRow}>
          <Text style={[styles.defaultLabel, { color: '#9CA3AF' }]}>High-Risk Loans</Text>
          <Text style={[styles.defaultValue, { color: '#FFFFFF' }]}>{config.defaultRisk.highRiskLoans}</Text>
        </View>
        <View style={styles.defaultRow}>
          <Text style={[styles.defaultLabel, { color: '#9CA3AF' }]}>Total Exposure</Text>
          <Text style={[styles.defaultValue, { color: '#FFFFFF' }]}>{config.defaultRisk.totalExposure}</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Exposure Limits</Text>
        {config.exposureLimits.map((limit, index) => (
          <View key={index} style={styles.limitItem}>
            <Shield size={14} color={limit.utilization > 85 ? '#EF4444' : limit.utilization > 70 ? '#F59E0B' : '#10B981'} />
            <Text style={[styles.limitLabel, { color: '#FFFFFF' }]}>{limit.category}</Text>
            <View style={styles.limitBar}>
              <View style={[styles.limitFill, { width: `${limit.utilization}%`, backgroundColor: limit.utilization > 85 ? '#EF4444' : limit.utilization > 70 ? '#F59E0B' : '#10B981' }]} />
            </View>
            <Text style={[styles.limitUtilization, { color: limit.utilization > 85 ? '#EF4444' : limit.utilization > 70 ? '#F59E0B' : '#10B981' }]}>
              {limit.utilization}%
            </Text>
            <Text style={[styles.limitAmount, { color: '#FFFFFF' }]}>{limit.current}</Text>
            <Text style={[styles.limitMax, { color: '#9CA3AF' }]}>/ {limit.limit}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  creditBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  creditBadgeText: {
    color: '#3B82F6',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  liveText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  metricItem: {
    alignItems: 'center',
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
    marginTop: 4,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  scoreLabel: {
    fontSize: 13,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  distributionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rangeLabel: {
    width: 80,
    fontSize: 12,
  },
  distributionBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#1F2937',
    borderRadius: 3,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  distributionFill: {
    height: '100%',
    borderRadius: 3,
  },
  rangeCount: {
    width: 40,
    fontSize: 12,
    textAlign: 'right',
  },
  defaultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  defaultLabel: {
    fontSize: 12,
  },
  defaultValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  limitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  limitLabel: {
    width: 80,
    fontSize: 12,
  },
  limitBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  limitFill: {
    height: '100%',
    borderRadius: 4,
  },
  limitUtilization: {
    width: 40,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  limitAmount: {
    width: 50,
    fontSize: 11,
    textAlign: 'right',
  },
  limitMax: {
    width: 50,
    fontSize: 11,
    textAlign: 'right',
  },
});
