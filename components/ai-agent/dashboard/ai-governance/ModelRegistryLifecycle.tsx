import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Database, Code, CheckCircle, Clock, AlertTriangle, TrendingUp, GitBranch, Zap, FileText, Shield, Activity } from 'lucide-react-native';

interface ModelVersion {
  id: string;
  name: string;
  version: string;
  status: 'training' | 'validation' | 'safety_review' | 'policy_check' | 'deployment_approval' | 'production' | 'monitoring';
  trainingDataSource: string;
  performanceMetrics: {
    accuracy: number;
    latency: string;
    throughput: string;
  };
  approvalStatus: 'pending' | 'approved' | 'rejected';
  driftScore: number;
}

interface ModelRegistryLifecycleProps {
  models: ModelVersion[];
}

export default function ModelRegistryLifecycle({ models }: ModelRegistryLifecycleProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'production': return '#10B981';
      case 'monitoring': return '#06B6D4';
      case 'deployment_approval': return '#8B5CF6';
      case 'policy_check': return '#F59E0B';
      case 'safety_review': return '#EF4444';
      case 'validation': return '#3B82F6';
      case 'training': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusBackground = (status: string) => {
    const color = getStatusColor(status);
    return color + '15';
  };

  const getApprovalColor = (status: string) => {
    switch (status) {
      case 'approved': return '#10B981';
      case 'rejected': return '#EF4444';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const workflowSteps = [
    { key: 'training', label: 'Training', icon: Code },
    { key: 'validation', label: 'Validation', icon: CheckCircle },
    { key: 'safety_review', label: 'Safety Review', icon: Shield },
    { key: 'policy_check', label: 'Policy Check', icon: FileText },
    { key: 'deployment_approval', label: 'Deployment Approval', icon: Zap },
    { key: 'production', label: 'Production', icon: Activity },
    { key: 'monitoring', label: 'Monitoring', icon: TrendingUp },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Database size={20} color="#06B6D4" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Model Registry & Lifecycle Management
        </Text>
      </View>

      {/* Workflow Pipeline */}
      <View style={[styles.workflowSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Model Lifecycle Pipeline
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.workflowScroll}>
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            const stepColor = getStatusColor(step.key);
            
            return (
              <View key={step.key} style={styles.workflowStep}>
                <View style={[styles.stepIcon, { backgroundColor: stepColor + '20' }]}>
                  <Icon size={20} color={stepColor} />
                </View>
                <Text style={[styles.stepLabel, { color: theme.colors.textSecondary }]}>
                  {step.label}
                </Text>
                {index < workflowSteps.length - 1 && (
                  <View style={[styles.stepConnector, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Model Registry */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.modelsScroll}
      >
        {models.map((model) => {
          const statusColor = getStatusColor(model.status);
          const statusBackground = getStatusBackground(model.status);
          const approvalColor = getApprovalColor(model.approvalStatus);

          return (
            <View 
              key={model.id} 
              style={[
                styles.modelCard, 
                { 
                  backgroundColor: statusBackground,
                  borderColor: statusColor + '30',
                  borderWidth: 1
                }
              ]}
            >
              <View style={styles.modelHeader}>
                <View style={styles.modelInfo}>
                  <Text style={[styles.modelName, { color: theme.colors.text }]}>
                    {model.name}
                  </Text>
                  <Text style={[styles.modelVersion, { color: theme.colors.textSecondary }]}>
                    v{model.version}
                  </Text>
                </View>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: statusColor + '20' }
                ]}>
                  <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {model.status.replace('_', ' ').toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.modelSection}>
                <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>
                  Training Data Source
                </Text>
                <View style={styles.dataSourceRow}>
                  <Database size={14} color="#06B6D4" />
                  <Text style={[styles.dataSourceText, { color: theme.colors.text }]}>
                    {model.trainingDataSource}
                  </Text>
                </View>
              </View>

              <View style={styles.modelSection}>
                <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>
                  Performance Metrics
                </Text>
                <View style={styles.metricsGrid}>
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Accuracy
                    </Text>
                    <Text style={[styles.metricValue, { color: '#10B981' }]}>
                      {model.performanceMetrics.accuracy}%
                    </Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Latency
                    </Text>
                    <Text style={[styles.metricValue, { color: '#06B6D4' }]}>
                      {model.performanceMetrics.latency}
                    </Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Throughput
                    </Text>
                    <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>
                      {model.performanceMetrics.throughput}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.modelSection}>
                <View style={styles.approvalRow}>
                  <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>
                    Approval Status
                  </Text>
                  <View style={[
                    styles.approvalBadge, 
                    { backgroundColor: approvalColor + '20' }
                  ]}>
                    <Text style={[styles.approvalText, { color: approvalColor }]}>
                      {model.approvalStatus.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.modelSection}>
                <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>
                  Model Drift Score
                </Text>
                <View style={styles.driftContainer}>
                  <View style={styles.driftBar}>
                    <View 
                      style={[
                        styles.driftFill, 
                        { 
                          backgroundColor: model.driftScore > 70 ? '#EF4444' : model.driftScore > 40 ? '#F59E0B' : '#10B981',
                          width: `${model.driftScore}%`
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[
                    styles.driftValue, 
                    { color: model.driftScore > 70 ? '#EF4444' : model.driftScore > 40 ? '#F59E0B' : '#10B981' }
                  ]}>
                    {model.driftScore}%
                  </Text>
                </View>
              </View>

              <View style={styles.modelFooter}>
                <GitBranch size={12} color={theme.colors.textSecondary} />
                <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
                  Version tracking active
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
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
  workflowSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  workflowScroll: {
    gap: 8,
  },
  workflowStep: {
    alignItems: 'center',
    minWidth: 80,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  stepConnector: {
    position: 'absolute',
    top: 20,
    right: -20,
    width: 40,
    height: 2,
  },
  modelsScroll: {
    gap: 16,
    paddingHorizontal: 4,
  },
  modelCard: {
    borderRadius: 16,
    padding: 20,
    minWidth: 300,
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modelInfo: {
    flex: 1,
  },
  modelName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  modelVersion: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
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
  modelSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  dataSourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dataSourceText: {
    fontSize: 13,
    fontWeight: '500',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  approvalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  approvalBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  approvalText: {
    fontSize: 10,
    fontWeight: '600',
  },
  driftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  driftBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  driftFill: {
    height: '100%',
    borderRadius: 3,
  },
  driftValue: {
    fontSize: 14,
    fontWeight: '600',
    width: 36,
    textAlign: 'right',
  },
  modelFooter: {
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
});