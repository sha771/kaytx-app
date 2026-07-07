import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Crown, Brain, Shield, CheckCircle, AlertTriangle, Activity, Zap, TrendingUp, PieChart, Lock, FileText } from 'lucide-react-native';

interface GovernanceMetrics {
  totalAISystems: number;
  compliantSystems: number;
  activePolicies: number;
  riskIncidents: number;
  criticalIncidents: number;
  aiSafetyScore: number;
}

interface ChiefAIGovernanceCommandCenterProps {
  metrics: GovernanceMetrics;
}

export default function ChiefAIGovernanceCommandCenter({ metrics }: ChiefAIGovernanceCommandCenterProps) {
  const { theme } = useTheme();

  const complianceRate = ((metrics.compliantSystems / metrics.totalAISystems) * 100).toFixed(1);
  const criticalIncidentRate = ((metrics.criticalIncidents / metrics.riskIncidents) * 100).toFixed(0);

  const getSafetyColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  };

  const getSafetyBackground = (score: number) => {
    if (score >= 90) return 'rgba(16, 185, 129, 0.1)';
    if (score >= 70) return 'rgba(245, 158, 11, 0.1)';
    return 'rgba(239, 68, 68, 0.1)';
  };

  const safetyColor = getSafetyColor(metrics.aiSafetyScore);
  const safetyBackground = getSafetyBackground(metrics.aiSafetyScore);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Crown size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Chief AI Governance Command Center
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Enterprise AI Oversight Summary
            </Text>
          </View>
        </View>
        <View style={[styles.healthBadge, { backgroundColor: safetyBackground }]}>
          <Shield size={16} color={safetyColor} />
          <Text style={[styles.healthText, { color: safetyColor }]}>
            {metrics.aiSafetyScore}% Safety
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainMetrics}>
          {/* Total AI Systems */}
          <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: '#06B6D4' + '30', borderWidth: 1 }]}>
            <View style={[styles.metricIcon, { backgroundColor: '#06B6D4' + '20' }]}>
              <Brain size={32} color="#06B6D4" />
            </View>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              Total AI Systems
            </Text>
            <Text style={[styles.metricValue, { color: '#06B6D4' }]}>
              {metrics.totalAISystems.toLocaleString()}
            </Text>
            <View style={styles.metricTrend}>
              <Activity size={14} color="#10B981" />
              <Text style={[styles.trendText, { color: '#10B981' }]}>
                +12.5% this month
              </Text>
            </View>
          </View>

          {/* Compliant Systems */}
          <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' + '30', borderWidth: 1 }]}>
            <View style={[styles.metricIcon, { backgroundColor: '#10B981' + '20' }]}>
              <CheckCircle size={32} color="#10B981" />
            </View>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              Compliant Systems
            </Text>
            <Text style={[styles.metricValue, { color: '#10B981' }]}>
              {complianceRate}%
            </Text>
            <View style={styles.metricTrend}>
              <TrendingUp size={14} color="#10B981" />
              <Text style={[styles.trendText, { color: '#10B981' }]}>
                +2.3% improvement
              </Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { backgroundColor: '#10B981', width: complianceRate + '%' }
                ]} 
              />
            </View>
          </View>

          {/* Active Policies */}
          <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' + '30', borderWidth: 1 }]}>
            <View style={[styles.metricIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
              <FileText size={32} color="#8B5CF6" />
            </View>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              Active Policies
            </Text>
            <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>
              {metrics.activePolicies.toLocaleString()}
            </Text>
            <View style={styles.metricTrend}>
              <TrendingUp size={14} color="#8B5CF6" />
              <Text style={[styles.trendText, { color: '#8B5CF6' }]}>
                +18 new policies
              </Text>
            </View>
          </View>

          {/* Risk Incidents */}
          <View style={[styles.mainMetricCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' + '30', borderWidth: 1 }]}>
            <View style={[styles.metricIcon, { backgroundColor: '#EF4444' + '20' }]}>
              <AlertTriangle size={32} color="#EF4444" />
            </View>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              Risk Incidents
            </Text>
            <Text style={[styles.metricValue, { color: '#EF4444' }]}>
              {metrics.riskIncidents}
            </Text>
            <View style={styles.incidentBreakdown}>
              <View style={styles.incidentItem}>
                <View style={[styles.incidentDot, { backgroundColor: '#EF4444' }]} />
                <Text style={[styles.incidentText, { color: theme.colors.textSecondary }]}>
                  {metrics.criticalIncidents} critical
                </Text>
              </View>
              <View style={styles.incidentItem}>
                <View style={[styles.incidentDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={[styles.incidentText, { color: theme.colors.textSecondary }]}>
                  {metrics.riskIncidents - metrics.criticalIncidents} warnings
                </Text>
              </View>
            </View>
          </View>

          {/* AI Safety Score */}
          <View style={[styles.mainMetricCard, { backgroundColor: safetyBackground, borderColor: safetyColor + '30', borderWidth: 1 }]}>
            <View style={[styles.metricIcon, { backgroundColor: safetyColor + '20' }]}>
              <Shield size={32} color={safetyColor} />
            </View>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              AI Safety Score
            </Text>
            <Text style={[styles.metricValue, { color: safetyColor }]}>
              {metrics.aiSafetyScore}%
            </Text>
            <View style={styles.metricTrend}>
              <Zap size={14} color={safetyColor} />
              <Text style={[styles.trendText, { color: safetyColor }]}>
                {metrics.aiSafetyScore >= 90 ? 'Excellent' : metrics.aiSafetyScore >= 70 ? 'Good' : 'Attention'}
              </Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { backgroundColor: safetyColor, width: metrics.aiSafetyScore + '%' }
                ]} 
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Executive Summary */}
      <View style={[styles.executiveSummary, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.summaryHeader}>
          <PieChart size={20} color="#8B5CF6" />
          <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
            Governance Intelligence Summary
          </Text>
        </View>
        
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              System-wide Compliance
            </Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>
              {complianceRate}%
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Model Governance Posture
            </Text>
            <Text style={[styles.summaryValue, { color: '#06B6D4' }]}>
              Strong
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Risk Exposure
            </Text>
            <Text style={[styles.summaryValue, { color: metrics.riskIncidents > 50 ? '#EF4444' : '#F59E0B' }]}>
              {metrics.riskIncidents > 50 ? 'Elevated' : 'Moderate'}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Policy Coverage
            </Text>
            <Text style={[styles.summaryValue, { color: '#8B5CF6' }]}>
              94.2%
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
    padding: 20,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  healthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  healthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  mainMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  mainMetricCard: {
    borderRadius: 16,
    padding: 20,
    minWidth: 180,
  },
  metricIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  incidentBreakdown: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  incidentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  incidentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  incidentText: {
    fontSize: 11,
    fontWeight: '500',
  },
  executiveSummary: {
    borderRadius: 12,
    padding: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  summaryItem: {
    flex: 1,
    minWidth: 120,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
});