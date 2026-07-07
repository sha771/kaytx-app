import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Rocket, RotateCcw, CheckCircle, Clock, Zap, AlertCircle, GitBranch, Play } from 'lucide-react-native';

interface DeploymentStep {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending' | 'failed';
  duration?: string;
  description: string;
}

interface DeploymentControlCenterProps {
  metrics: {
    deployments: number;
    rollbacks: number;
    releaseStatus: string;
    buildSuccessRate: string;
    deploymentFrequency: string;
  };
  pipeline: DeploymentStep[];
  recentDeployments: {
    id: string;
    service: string;
    version: string;
    status: string;
    time: string;
    duration: string;
  }[];
}

export default function DeploymentControlCenter({ metrics, pipeline, recentDeployments }: DeploymentControlCenterProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'active':
        return '#3B82F6';
      case 'pending':
        return '#6B7280';
      case 'failed':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const deploymentCards = [
    {
      label: 'Deployments',
      value: metrics.deployments.toString(),
      icon: Rocket,
      color: '#3B82F6',
      subtitle: 'This week'
    },
    {
      label: 'Rollbacks',
      value: metrics.rollbacks.toString(),
      icon: RotateCcw,
      color: '#EF4444',
      subtitle: 'Failed releases'
    },
    {
      label: 'Build Success',
      value: metrics.buildSuccessRate,
      icon: CheckCircle,
      color: '#10B981',
      subtitle: 'CI/CD pipeline'
    },
    {
      label: 'Deploy Frequency',
      value: metrics.deploymentFrequency,
      icon: Zap,
      color: '#8B5CF6',
      subtitle: 'Per day'
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Deployment Control Center
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          CI/CD Pipeline Management
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardsRow}>
          {deploymentCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.card, { borderLeftColor: card.color }]}>
                <View style={[styles.cardIcon, { backgroundColor: card.color + '20' }]}>
                  <Icon size={20} color={card.color} />
                </View>
                <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
                  {card.label}
                </Text>
                <Text style={[styles.cardValue, { color: theme.colors.text }]}>
                  {card.value}
                </Text>
                <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
                  {card.subtitle}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.pipelineSection}>
        <View style={styles.pipelineHeader}>
          <Text style={[styles.pipelineTitle, { color: theme.colors.text }]}>
            CI/CD Pipeline
          </Text>
          <View style={[styles.pipelineStatus, { backgroundColor: '#3B82F6' + '20' }]}>
            <Play size={14} color="#3B82F6" />
            <Text style={[styles.pipelineStatusText, { color: '#3B82F6' }]}>
              Active
            </Text>
          </View>
        </View>

        <View style={styles.pipelineSteps}>
          {pipeline.map((step, index) => (
            <View key={step.id} style={styles.pipelineStep}>
              <View style={styles.stepConnector}>
                {index < pipeline.length - 1 && (
                  <View style={[styles.connectorLine, { backgroundColor: step.status === 'completed' ? '#10B981' : 'rgba(255,255,255,0.1)' }]} />
                )}
              </View>
              
              <View style={[styles.stepCard, { borderLeftColor: getStatusColor(step.status) }]}>
                <View style={styles.stepHeader}>
                  <View style={[styles.stepIndicator, { backgroundColor: getStatusColor(step.status) + '20' }]}>
                    {step.status === 'completed' && <CheckCircle size={16} color={getStatusColor(step.status)} />}
                    {step.status === 'active' && <Clock size={16} color={getStatusColor(step.status)} />}
                    {step.status === 'pending' && <GitBranch size={16} color={getStatusColor(step.status)} />}
                    {step.status === 'failed' && <AlertCircle size={16} color={getStatusColor(step.status)} />}
                  </View>
                  <View style={styles.stepInfo}>
                    <Text style={[styles.stepName, { color: theme.colors.text }]}>
                      {step.name}
                    </Text>
                    <Text style={[styles.stepDescription, { color: theme.colors.textSecondary }]}>
                      {step.description}
                    </Text>
                  </View>
                  {step.duration && (
                    <Text style={[styles.stepDuration, { color: theme.colors.textSecondary }]}>
                      {step.duration}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.recentDeployments}>
        <Text style={[styles.recentTitle, { color: theme.colors.text }]}>
          Recent Deployments
        </Text>

        {recentDeployments.map((deployment) => (
          <View key={deployment.id} style={[styles.deploymentCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
            <View style={styles.deploymentInfo}>
              <Rocket size={18} color="#3B82F6" />
              <View style={styles.deploymentDetails}>
                <Text style={[styles.deploymentService, { color: theme.colors.text }]}>
                  {deployment.service}
                </Text>
                <Text style={[styles.deploymentVersion, { color: theme.colors.textSecondary }]}>
                  {deployment.version}
                </Text>
              </View>
            </View>
            <View style={styles.deploymentMeta}>
              <View style={[styles.deploymentStatus, { backgroundColor: deployment.status === 'Success' ? '#10B981' + '20' : '#EF4444' + '20' }]}>
                <Text style={[styles.deploymentStatusText, { color: deployment.status === 'Success' ? '#10B981' : '#EF4444' }]}>
                  {deployment.status}
                </Text>
              </View>
              <Text style={[styles.deploymentTime, { color: theme.colors.textSecondary }]}>
                {deployment.time}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    width: 140,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
    opacity: 0.7,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 9,
    opacity: 0.6,
  },
  pipelineSection: {
    marginBottom: 20,
  },
  pipelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pipelineTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  pipelineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pipelineStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pipelineSteps: {
    paddingLeft: 8,
  },
  pipelineStep: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  stepConnector: {
    width: 24,
    alignItems: 'center',
  },
  connectorLine: {
    width: 2,
    flex: 1,
    minHeight: 40,
  },
  stepCard: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepIndicator: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepInfo: {
    flex: 1,
  },
  stepName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepDescription: {
    fontSize: 11,
    opacity: 0.7,
  },
  stepDuration: {
    fontSize: 11,
    fontWeight: '500',
    opacity: 0.7,
  },
  recentDeployments: {
    marginTop: 8,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  deploymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  deploymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deploymentDetails: {
    flex: 1,
  },
  deploymentService: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  deploymentVersion: {
    fontSize: 11,
    opacity: 0.7,
  },
  deploymentMeta: {
    alignItems: 'flex-end',
    gap: 6,
  },
  deploymentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deploymentStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  deploymentTime: {
    fontSize: 10,
    opacity: 0.7,
  }
});