import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Zap, CheckCircle, Clock, AlertTriangle, TrendingUp, BarChart3, Activity, ArrowRight, Play, Pause, MoreVertical, Sparkles, Target, Layers } from 'lucide-react-native';

interface WorkflowStep {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending' | 'escalated';
  count: number;
}

interface TaskMetrics {
  openTasks: number;
  automatedWorkflows: number;
  pendingActions: number;
  escalations: number;
  completionRate: number;
  avgCompletionTime: string;
  automationAccuracy: number;
  tasksProcessed: number;
}

interface TaskWorkflowAutomationHubProps {
  metrics: TaskMetrics;
  workflowPipeline: WorkflowStep[];
}

export default function TaskWorkflowAutomationHub({ metrics, workflowPipeline }: TaskWorkflowAutomationHubProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'active': return '#3B82F6';
      case 'pending': return '#F59E0B';
      case 'escalated': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={12} color="#10B981" />;
      case 'active': return <Activity size={12} color="#3B82F6" />;
      case 'pending': return <Clock size={12} color="#F59E0B" />;
      case 'escalated': return <AlertTriangle size={12} color="#EF4444" />;
      default: return <Clock size={12} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Zap size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Task & Workflow Automation Hub
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Automated process orchestration
            </Text>
          </View>
        </View>
        <View style={[styles.automationBadge, { backgroundColor: '#10B981' + '20' }]}>
          <Sparkles size={16} color="#10B981" />
          <Text style={[styles.automationBadgeText, { color: '#10B981' }]}>
            {metrics.automationAccuracy}% Auto
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#3B82F6' + '20' }]}>
            <Layers size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Open Tasks
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.openTasks.toLocaleString()}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +12.5%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#10B981' + '20' }]}>
            <Zap size={20} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Automated Workflows
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.automatedWorkflows.toLocaleString()}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +18.2%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#F59E0B' + '20' }]}>
            <Clock size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Pending Actions
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.pendingActions.toLocaleString()}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={12} color="#EF4444" />
            <Text style={[styles.trendText, { color: '#EF4444' }]}>
              +5.3%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#EF4444' + '20' }]}>
            <AlertTriangle size={20} color="#EF4444" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Escalations
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.escalations.toLocaleString()}
          </Text>
          <View style={styles.metricTrend}>
            <TrendingUp size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              -8.7%
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.pipelineSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.pipelineHeader}>
          <BarChart3 size={20} color="#8B5CF6" />
          <Text style={[styles.pipelineTitle, { color: theme.colors.text }]}>
            Workflow Pipeline
          </Text>
          <View style={[styles.pipelineBadge, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Target size={14} color="#8B5CF6" />
            <Text style={[styles.pipelineBadgeText, { color: '#8B5CF6' }]}>
              {metrics.completionRate}% Complete
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pipelineScroll}>
          {workflowPipeline.map((step, index) => (
            <View key={step.id} style={styles.pipelineStepContainer}>
              <View style={[styles.pipelineStep, { borderColor: getStatusColor(step.status) + '50', borderWidth: 2 }]}>
                <View style={[styles.stepHeader, { backgroundColor: getStatusColor(step.status) + '15' }]}>
                  {getStatusDot(step.status)}
                  <Text style={[styles.stepName, { color: theme.colors.text }]}>
                    {step.name}
                  </Text>
                  <View style={[styles.stepCount, { backgroundColor: getStatusColor(step.status) + '20' }]}>
                    <Text style={[styles.stepCountText, { color: getStatusColor(step.status) }]}>
                      {step.count}
                    </Text>
                  </View>
                </View>
                <View style={[styles.stepIndicator, { backgroundColor: getStatusColor(step.status) }]}>
                  <View style={[styles.stepIndicatorInner, { backgroundColor: 'rgba(255,255,255,0.3)' }]} />
                </View>
              </View>
              {index < workflowPipeline.length - 1 && (
                <View style={styles.pipelineArrow}>
                  <ArrowRight size={20} color="#6B7280" />
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.performanceSection}>
        <View style={styles.performanceHeader}>
          <Activity size={20} color="#8B5CF6" />
          <Text style={[styles.performanceTitle, { color: theme.colors.text }]}>
            Automation Performance
          </Text>
        </View>

        <View style={styles.performanceMetrics}>
          <View style={styles.performanceMetric}>
            <Text style={[styles.performanceMetricLabel, { color: theme.colors.textSecondary }]}>
              Tasks Processed
            </Text>
            <Text style={[styles.performanceMetricValue, { color: theme.colors.text }]}>
              {metrics.tasksProcessed.toLocaleString()}
            </Text>
            <View style={[styles.performanceBar, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
              <View style={[styles.performanceBarFill, { backgroundColor: '#3B82F6', width: '85%' }]} />
            </View>
          </View>

          <View style={styles.performanceMetric}>
            <Text style={[styles.performanceMetricLabel, { color: theme.colors.textSecondary }]}>
              Completion Rate
            </Text>
            <Text style={[styles.performanceMetricValue, { color: theme.colors.text }]}>
              {metrics.completionRate}%
            </Text>
            <View style={[styles.performanceBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <View style={[styles.performanceBarFill, { backgroundColor: '#10B981', width: `${metrics.completionRate}%` }]} />
            </View>
          </View>

          <View style={styles.performanceMetric}>
            <Text style={[styles.performanceMetricLabel, { color: theme.colors.textSecondary }]}>
              Avg Completion Time
            </Text>
            <Text style={[styles.performanceMetricValue, { color: theme.colors.text }]}>
              {metrics.avgCompletionTime}
            </Text>
            <View style={[styles.performanceBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
              <View style={[styles.performanceBarFill, { backgroundColor: '#8B5CF6', width: '72%' }]} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  automationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  automationBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
  pipelineSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  pipelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  pipelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  pipelineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pipelineBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  pipelineScroll: {
    gap: 8,
  },
  pipelineStepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pipelineStep: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.02)',
    minWidth: 140,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  stepName: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  stepCount: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  stepCountText: {
    fontSize: 11,
    fontWeight: '600',
  },
  stepIndicator: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  stepIndicatorInner: {
    height: '100%',
    width: '60%',
  },
  pipelineArrow: {
    paddingHorizontal: 8,
  },
  performanceSection: {
    marginBottom: 8,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  performanceTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  performanceMetrics: {
    gap: 12,
  },
  performanceMetric: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 12,
  },
  performanceMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  performanceMetricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  performanceBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  performanceBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});