import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface RiskHeatmapItem {
  project: string;
  riskLevel: string;
  riskType: string;
}

interface DeliveryRiskHealthCenterProps {
  data: {
    projectDelays?: any;
    scopeCreep?: any;
    budgetOverruns?: any;
    resourceShortages?: any;
    clientEscalations?: any;
  };
}

export default function DeliveryRiskHealthCenter({ data }: DeliveryRiskHealthCenterProps) {
  const projectDelays = data.projectDelays || {};
  const scopeCreep = data.scopeCreep || {};
  const budgetOverruns = data.budgetOverruns || {};
  const resourceShortages = data.resourceShortages || {};
  const clientEscalations = data.clientEscalations || {};
  const { theme } = useTheme();

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getRiskTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'resource': return '#EF4444';
      case 'timeline': return '#F59E0B';
      case 'scope': return '#06B6D4';
      case 'budget': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const riskCategories = [
    { name: 'Project Delays', count: data.projectDelays, color: '#F59E0B', trend: '+2 vs last week' },
    { name: 'Scope Creep', count: data.scopeCreep, color: '#06B6D4', trend: 'Stable' },
    { name: 'Budget Overruns', count: data.budgetOverruns, color: '#EF4444', trend: '-1 vs last week' },
    { name: 'Resource Shortages', count: data.resourceShortages, color: '#8B5CF6', trend: '+1 vs last week' },
    { name: 'Client Escalations', count: data.clientEscalations, color: '#EF4444', trend: 'Stable' },
  ];

  const atRiskProjects = [
    { name: 'Cloud Migration', client: 'Global Bank', riskScore: 78, issues: ['Resource shortage', 'Timeline pressure'] },
    { name: 'Data Analytics Platform', client: 'Retail Chain', riskScore: 72, issues: ['Scope expansion', 'Budget variance'] },
    { name: 'AI Implementation', client: 'Healthcare System', riskScore: 65, issues: ['Technical complexity'] },
  ];

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Delivery Risk & Health Center
      </Text>

      {/* Risk Overview */}
      <View style={styles.riskGrid}>
        {riskCategories.map((category, index) => (
          <View key={index} style={[styles.riskCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: `${category.color}30`, borderWidth: 1 }]}>
            <Text style={[styles.riskCardLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>
              {category.name}
            </Text>
            <Text style={[styles.riskCardValue, { color: category.color }]}>
              {category.count}
            </Text>
            <Text style={[styles.riskCardTrend, { color: 'rgba(255, 255, 255, 0.4)' }]}>
              {category.trend}
            </Text>
          </View>
        ))}
      </View>

      {/* Delivery Health Score */}
      <View style={[styles.healthSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Delivery Health Score
        </Text>
        <View style={styles.healthScoreContainer}>
          <View style={styles.healthScoreVisual}>
            <View style={[styles.healthScoreRing, { borderColor: '#10B981' }]}>
              <Text style={[styles.healthScoreNumber, { color: '#10B981' }]}>87</Text>
              <Text style={[styles.healthScoreLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Good</Text>
            </View>
          </View>
          <View style={styles.healthScoreDetails}>
            <View style={styles.healthDetail}>
              <Text style={[styles.healthDetailLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>On-Time Delivery</Text>
              <Text style={[styles.healthDetailValue, { color: '#10B981' }]}>94%</Text>
            </View>
            <View style={styles.healthDetail}>
              <Text style={[styles.healthDetailLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Budget Adherence</Text>
              <Text style={[styles.healthDetailValue, { color: '#06B6D4' }]}>89%</Text>
            </View>
            <View style={styles.healthDetail}>
              <Text style={[styles.healthDetailLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Quality Score</Text>
              <Text style={[styles.healthDetailValue, { color: '#8B5CF6' }]}>92%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Risk Overview */}
      <View style={[styles.heatmapSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Risk Overview
        </Text>
        <View style={styles.riskGrid}>
          <View style={styles.riskMetric}>
            <Text style={[styles.riskMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Project Delays</Text>
            <Text style={[styles.riskMetricValue, { color: '#EF4444' }]}>{projectDelays.count || 12}</Text>
            <Text style={[styles.riskMetricSub, { color: '#EF4444' }]}>{projectDelays.impact || '$2.4M impact'}</Text>
          </View>
          <View style={styles.riskMetric}>
            <Text style={[styles.riskMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Scope Creep</Text>
            <Text style={[styles.riskMetricValue, { color: '#F59E0B' }]}>{scopeCreep.count || 8}</Text>
            <Text style={[styles.riskMetricSub, { color: '#F59E0B' }]}>{scopeCreep.impact || '$1.8M impact'}</Text>
          </View>
          <View style={styles.riskMetric}>
            <Text style={[styles.riskMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Budget Overruns</Text>
            <Text style={[styles.riskMetricValue, { color: '#EF4444' }]}>{budgetOverruns.count || 5}</Text>
            <Text style={[styles.riskMetricSub, { color: '#EF4444' }]}>{budgetOverruns.impact || '$3.2M impact'}</Text>
          </View>
          <View style={styles.riskMetric}>
            <Text style={[styles.riskMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Resource Shortages</Text>
            <Text style={[styles.riskMetricValue, { color: '#F59E0B' }]}>{resourceShortages.count || 15}</Text>
            <Text style={[styles.riskMetricSub, { color: '#F59E0B' }]}>{resourceShortages.impact || '42 positions'}</Text>
          </View>
        </View>
      </View>

      {/* Client Escalations */}
      <View style={[styles.atRiskSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Client Escalations
        </Text>
        <View style={styles.escalationGrid}>
          <View style={styles.escalationItem}>
            <Text style={[styles.escalationLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Active Escalations</Text>
            <Text style={[styles.escalationValue, { color: '#EF4444' }]}>{clientEscalations.active || 6}</Text>
          </View>
          <View style={styles.escalationItem}>
            <Text style={[styles.escalationLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Resolved This Week</Text>
            <Text style={[styles.escalationValue, { color: '#10B981' }]}>{clientEscalations.resolved || 12}</Text>
          </View>
          <View style={styles.escalationItem}>
            <Text style={[styles.escalationLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Avg Resolution Time</Text>
            <Text style={[styles.escalationValue, { color: '#06B6D4' }]}>{clientEscalations.avgTime || '2.3d'}</Text>
          </View>
        </View>
        
        {/* Escalation Tracking */}
      <View style={[styles.escalationSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Escalation Tracking
        </Text>
        <View style={styles.escalationList}>
          <View style={styles.escalationItem}>
            <View style={[styles.escalationPriority, { backgroundColor: '#EF4444' }]} />
            <View style={styles.escalationInfo}>
              <Text style={[styles.escalationProject, { color: '#FFFFFF' }]}>Cloud Migration</Text>
              <Text style={[styles.escalationReason, { color: 'rgba(255, 255, 255, 0.6)' }]}>Timeline slippage concern</Text>
            </View>
            <View style={styles.escalationMeta}>
              <Text style={[styles.escalationTime, { color: 'rgba(255, 255, 255, 0.6)' }]}>2 hours ago</Text>
              <View style={[styles.escalationStatus, { backgroundColor: '#F59E0B20' }]}>
                <Text style={[styles.escalationStatusText, { color: '#F59E0B' }]}>In Progress</Text>
              </View>
            </View>
          </View>
          <View style={styles.escalationItem}>
            <View style={[styles.escalationPriority, { backgroundColor: '#F59E0B' }]} />
            <View style={styles.escalationInfo}>
              <Text style={[styles.escalationProject, { color: '#FFFFFF' }]}>Data Analytics Platform</Text>
              <Text style={[styles.escalationReason, { color: 'rgba(255, 255, 255, 0.6)' }]}>Scope change request</Text>
            </View>
            <View style={styles.escalationMeta}>
              <Text style={[styles.escalationTime, { color: 'rgba(255, 255, 255, 0.6)' }]}>1 day ago</Text>
              <View style={[styles.escalationStatus, { backgroundColor: '#10B98120' }]}>
                <Text style={[styles.escalationStatusText, { color: '#10B981' }]}>Resolved</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Predictive Risk Alerts */}
      <View style={[styles.predictiveSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(245, 158, 11, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Predictive Risk Alerts
        </Text>
        <View style={styles.predictiveList}>
          <View style={styles.predictiveItem}>
            <View style={[styles.predictiveIcon, { backgroundColor: '#EF444420' }]}>
              <Text style={[styles.predictiveIconText, { color: '#EF4444' }]}>⚠️</Text>
            </View>
            <View style={styles.predictiveContent}>
              <Text style={[styles.predictiveTitle, { color: '#FFFFFF' }]}>
                Resource shortage predicted in Q3
              </Text>
              <Text style={[styles.predictiveDescription, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                AI predicts 15% resource gap for Cloud Engineering practice
              </Text>
            </View>
            <Text style={[styles.predictiveConfidence, { color: '#F59E0B' }]}>78% confidence</Text>
          </View>
          <View style={styles.predictiveItem}>
            <View style={[styles.predictiveIcon, { backgroundColor: '#F59E0B20' }]}>
              <Text style={[styles.predictiveIconText, { color: '#F59E0B' }]}>📊</Text>
            </View>
            <View style={styles.predictiveContent}>
              <Text style={[styles.predictiveTitle, { color: '#FFFFFF' }]}>
                Budget variance risk increasing
              </Text>
              <Text style={[styles.predictiveDescription, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                3 projects showing potential 10%+ budget overruns
              </Text>
            </View>
            <Text style={[styles.predictiveConfidence, { color: '#F59E0B' }]}>65% confidence</Text>
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
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  riskGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  riskCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
  },
  riskCardLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  riskCardValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 2,
  },
  riskCardTrend: {
    fontSize: 10,
  },
  healthSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  healthScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthScoreVisual: {
    marginRight: 20,
  },
  healthScoreRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthScoreNumber: {
    fontSize: 24,
    fontWeight: '700',
  },
  healthScoreLabel: {
    fontSize: 12,
  },
  healthScoreDetails: {
    flex: 1,
    gap: 8,
  },
  healthDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  healthDetailLabel: {
    fontSize: 12,
  },
  healthDetailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  heatmapSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  heatmapGrid: {
    gap: 8,
  },
  heatmapCell: {
    padding: 12,
    borderRadius: 8,
  },
  heatmapProject: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  heatmapMeta: {
    flexDirection: 'row',
    gap: 6,
  },
  heatmapRiskLevel: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  heatmapRiskLevelText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  heatmapRiskType: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  heatmapRiskTypeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  atRiskSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    maxHeight: 300,
  },
  atRiskScroll: {
    flex: 1,
  },
  atRiskCard: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    marginBottom: 8,
  },
  atRiskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  atRiskInfo: {
    flex: 1,
  },
  atRiskProjectName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  atRiskClient: {
    fontSize: 11,
  },
  riskScoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  riskScoreText: {
    fontSize: 11,
    fontWeight: '600',
  },
  atRiskIssues: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  issueTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  issueText: {
    fontSize: 10,
    fontWeight: '500',
  },
  escalationSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  escalationList: {
    gap: 8,
  },
  escalationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
  },
  escalationPriority: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 10,
  },
  escalationInfo: {
    flex: 1,
  },
  escalationProject: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  escalationReason: {
    fontSize: 11,
  },
  escalationMeta: {
    alignItems: 'flex-end',
  },
  escalationTime: {
    fontSize: 10,
    marginBottom: 4,
  },
  escalationStatus: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  escalationStatusText: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  predictiveSection: {
    padding: 16,
    borderRadius: 12,
  },
  predictiveList: {
    gap: 8,
  },
  predictiveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
  },
  predictiveIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  predictiveIconText: {
    fontSize: 16,
  },
  predictiveContent: {
    flex: 1,
  },
  predictiveTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  predictiveDescription: {
    fontSize: 10,
  },
  predictiveConfidence: {
    fontSize: 10,
    fontWeight: '600',
  },
});
