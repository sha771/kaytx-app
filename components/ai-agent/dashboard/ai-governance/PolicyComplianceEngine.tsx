import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, FileText, CheckCircle, AlertTriangle, Scale, Globe, Lock, Eye, TrendingUp, Clock, Zap } from 'lucide-react-native';

interface Policy {
  id: string;
  name: string;
  category: 'usage' | 'regulatory' | 'internal' | 'ethical' | 'restricted';
  framework: string;
  complianceRate: number;
  violationsBlocked: number;
  enforcementStatus: 'active' | 'warning' | 'critical';
  lastUpdated: string;
}

interface PolicyComplianceEngineProps {
  policies: Policy[];
}

export default function PolicyComplianceEngine({ policies }: PolicyComplianceEngineProps) {
  const { theme } = useTheme();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'usage': return '#06B6D4';
      case 'regulatory': return '#8B5CF6';
      case 'internal': return '#10B981';
      case 'ethical': return '#F59E0B';
      case 'restricted': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getCategoryBackground = (category: string) => {
    const color = getCategoryColor(category);
    return color + '15';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case 'EU AI Act': return Globe;
      case 'ISO': return Scale;
      case 'SOC2': return Shield;
      case 'Internal': return Lock;
      default: return FileText;
    }
  };

  const complianceHeatmapData = [
    { region: 'EU', compliance: 96, color: '#10B981' },
    { region: 'US', compliance: 94, color: '#10B981' },
    { region: 'APAC', compliance: 89, color: '#F59E0B' },
    { region: 'LATAM', compliance: 92, color: '#10B981' },
    { region: 'MEA', compliance: 85, color: '#F59E0B' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Shield size={20} color="#8B5CF6" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Policy & Compliance Engine
        </Text>
      </View>

      {/* Compliance Heatmap */}
      <View style={[styles.heatmapSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.heatmapHeader}>
          <Globe size={18} color="#06B6D4" />
          <Text style={[styles.heatmapTitle, { color: theme.colors.text }]}>
            Regional Compliance Heatmap
          </Text>
        </View>
        <View style={styles.heatmapGrid}>
          {complianceHeatmapData.map((region) => (
            <View key={region.region} style={styles.heatmapItem}>
              <Text style={[styles.regionLabel, { color: theme.colors.textSecondary }]}>
                {region.region}
              </Text>
              <View style={[styles.heatmapBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <View 
                  style={[
                    styles.heatmapFill, 
                    { backgroundColor: region.color, width: region.compliance + '%' }
                  ]} 
                />
              </View>
              <Text style={[styles.complianceValue, { color: region.color }]}>
                {region.compliance}%
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Policy Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.policiesScroll}
      >
        {policies.map((policy) => {
          const categoryColor = getCategoryColor(policy.category);
          const categoryBackground = getCategoryBackground(policy.category);
          const statusColor = getStatusColor(policy.enforcementStatus);
          const FrameworkIcon = getFrameworkIcon(policy.framework);

          return (
            <View 
              key={policy.id} 
              style={[
                styles.policyCard, 
                { 
                  backgroundColor: categoryBackground,
                  borderColor: categoryColor + '30',
                  borderWidth: 1
                }
              ]}
            >
              <View style={styles.policyHeader}>
                <View style={[styles.policyIcon, { backgroundColor: categoryColor + '20' }]}>
                  <FrameworkIcon size={24} color={categoryColor} />
                </View>
                <View style={styles.policyStatus}>
                  <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {policy.enforcementStatus.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={[styles.policyName, { color: theme.colors.text }]}>
                {policy.name}
              </Text>
              <View style={styles.policyMeta}>
                <View style={[styles.frameworkBadge, { backgroundColor: categoryColor + '20' }]}>
                  <Text style={[styles.frameworkText, { color: categoryColor }]}>
                    {policy.framework}
                  </Text>
                </View>
                <View style={[styles.categoryBadge, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                  <Text style={[styles.categoryText, { color: theme.colors.textSecondary }]}>
                    {policy.category.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.policyMetrics}>
                <View style={styles.metricRow}>
                  <CheckCircle size={14} color="#10B981" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Compliance Rate
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {policy.complianceRate}%
                  </Text>
                </View>
                <View style={styles.metricRow}>
                  <AlertTriangle size={14} color="#EF4444" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Violations Blocked
                  </Text>
                  <Text style={[styles.metricValue, { color: '#EF4444' }]}>
                    {policy.violationsBlocked.toLocaleString()}
                  </Text>
                </View>
              </View>

              <View style={styles.complianceBar}>
                <View style={styles.complianceBarTrack}>
                  <View 
                    style={[
                      styles.complianceBarFill, 
                      { 
                        backgroundColor: policy.complianceRate >= 90 ? '#10B981' : policy.complianceRate >= 70 ? '#F59E0B' : '#EF4444',
                        width: policy.complianceRate + '%'
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.complianceText, { color: theme.colors.textSecondary }]}>
                  {policy.complianceRate >= 90 ? 'Excellent' : policy.complianceRate >= 70 ? 'Good' : 'Needs Attention'}
                </Text>
              </View>

              <View style={styles.policyFooter}>
                <Clock size={12} color={theme.colors.textSecondary} />
                <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                  Updated {policy.lastUpdated}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Violation Timeline */}
      <View style={[styles.timelineSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.timelineHeader}>
          <TrendingUp size={18} color="#8B5CF6" />
          <Text style={[styles.timelineTitle, { color: theme.colors.text }]}>
            Violation Timeline Tracker
          </Text>
        </View>
        <View style={styles.timelineContent}>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, { backgroundColor: '#EF4444' }]} />
            <View style={styles.timelineInfo}>
              <Text style={[styles.timelineEvent, { color: theme.colors.text }]}>
                Critical policy violation blocked
              </Text>
              <Text style={[styles.timelineTime, { color: theme.colors.textSecondary }]}>
                2 hours ago
              </Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, { backgroundColor: '#F59E0B' }]} />
            <View style={styles.timelineInfo}>
              <Text style={[styles.timelineEvent, { color: theme.colors.text }]}>
                Policy coverage gap identified
              </Text>
              <Text style={[styles.timelineTime, { color: theme.colors.textSecondary }]}>
                5 hours ago
              </Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, { backgroundColor: '#10B981' }]} />
            <View style={styles.timelineInfo}>
              <Text style={[styles.timelineEvent, { color: theme.colors.text }]}>
                New compliance policy deployed
              </Text>
              <Text style={[styles.timelineTime, { color: theme.colors.textSecondary }]}>
                1 day ago
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
    gap: 12,
  },
  heatmapItem: {
    gap: 6,
  },
  regionLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  heatmapBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  heatmapFill: {
    height: '100%',
    borderRadius: 4,
  },
  complianceValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  policiesScroll: {
    gap: 16,
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  policyCard: {
    borderRadius: 16,
    padding: 20,
    minWidth: 280,
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  policyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  policyStatus: {
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
  policyName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  policyMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  frameworkBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  frameworkText: {
    fontSize: 10,
    fontWeight: '600',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  policyMetrics: {
    gap: 8,
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  complianceBar: {
    marginBottom: 16,
    gap: 6,
  },
  complianceBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  complianceBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  complianceText: {
    fontSize: 11,
    fontWeight: '500',
  },
  policyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  footerText: {
    fontSize: 11,
    fontWeight: '500',
  },
  timelineSection: {
    borderRadius: 12,
    padding: 16,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  timelineContent: {
    gap: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 3,
  },
  timelineInfo: {
    flex: 1,
  },
  timelineEvent: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  timelineTime: {
    fontSize: 11,
    fontWeight: '500',
  },
});