import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useCounselingProgress, useUpdateCounselingMilestone } from '../../hooks/useEnhancedCounseling';
import { AnimatedCard, AnimatedButton, AnimatedProgressBar, Skeleton, StatusIndicator } from '@/components/ai-agent/CounselingAnimations';

export default function CounselingProgressScreen({ route }: { route: any }) {
  const { sessionId } = route.params;
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null);
  
  const { data: progress, isLoading, error } = useCounselingProgress(sessionId);
  const updateMilestoneMutation = useUpdateCounselingMilestone();

  const handleUpdateMilestone = async (milestoneId: string, updates: any) => {
    try {
      await updateMilestoneMutation.mutateAsync({
        sessionId,
        milestoneId,
        ...updates,
      });
      Alert.alert('Success', 'Milestone updated');
    } catch {
      Alert.alert('Error', 'Failed to update milestone');
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: '#9ca3af',
      in_progress: '#6366f1',
      completed: '#22c55e',
      skipped: '#f59e0b',
    };
    return colorMap[status] || '#6b7280';
  };

  const getProgressStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      not_started: '#9ca3af',
      in_progress: '#6366f1',
      on_track: '#22c55e',
      at_risk: '#f59e0b',
      completed: '#22c55e',
      stalled: '#ef4444',
    };
    return colorMap[status] || '#6b7280';
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Counseling Progress</Text>
        <Skeleton height={200} style={styles.skeleton} />
        <Skeleton height={120} style={styles.skeleton} />
        <Skeleton height={120} style={styles.skeleton} />
      </View>
    );
  }

  if (error || !progress) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load progress data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Counseling Progress</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: getProgressStatusColor(progress.status) }
        ]}>
          <Text style={styles.statusText}>
            {progress.status.replace(/_/g, ' ').toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Overall Progress */}
      <AnimatedCard style={styles.overallProgressCard}>
        <Text style={styles.sectionTitle}>Overall Progress</Text>
        <View style={styles.progressHeader}>
          <Text style={styles.progressPercentage}>
            {progress.overallProgress}%
          </Text>
          <StatusIndicator
            status={progress.status === 'completed' ? 'online' : 'busy'}
            size={16}
          />
        </View>
        <AnimatedProgressBar
          progress={progress.overallProgress}
          color={getProgressStatusColor(progress.status)}
          style={styles.progressBar}
        />
        <View style={styles.progressMetrics}>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>
              {progress.milestones.filter((m: any) => m.status === 'completed').length}
            </Text>
            <Text style={styles.metricLabel}>Completed</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>
              {progress.milestones.filter((m: any) => m.status === 'in_progress').length}
            </Text>
            <Text style={styles.metricLabel}>In Progress</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricValue}>
              {progress.milestones.filter((m: any) => m.status === 'pending').length}
            </Text>
            <Text style={styles.metricLabel}>Pending</Text>
          </View>
        </View>
      </AnimatedCard>

      {/* Milestones */}
      <ScrollView style={styles.milestonesSection}>
        <Text style={styles.sectionTitle}>Milestones</Text>
        {progress.milestones.map((milestone: any, index: number) => (
          <AnimatedCard
            key={milestone.id}
            style={[
              styles.milestoneCard,
              selectedMilestone?.id === milestone.id && styles.selectedMilestone,
            ]}
            onPress={() => setSelectedMilestone(milestone)}
          >
            <View style={styles.milestoneHeader}>
              <View style={styles.milestoneMeta}>
                <Text style={styles.milestoneNumber}>
                  {index + 1}
                </Text>
                <View style={[
                  styles.milestoneStatus,
                  { backgroundColor: getMilestoneStatusColor(milestone.status) }
                ]}>
                  <StatusIndicator
                    status={milestone.status === 'completed' ? 'online' : 
                           milestone.status === 'in_progress' ? 'busy' : 'offline'}
                    size={12}
                  />
                </View>
              </View>
              <Text style={styles.milestoneTitle}>{milestone.name}</Text>
            </View>

            <Text style={styles.milestoneDescription}>
              {milestone.description}
            </Text>

            <View style={styles.milestoneProgress}>
              <AnimatedProgressBar
                progress={milestone.progress}
                color={getMilestoneStatusColor(milestone.status)}
                style={styles.milestoneProgressBar}
              />
              <Text style={styles.milestoneProgressText}>
                {milestone.progress}% Complete
              </Text>
            </View>

            {milestone.criteria.length > 0 && (
              <View style={styles.criteriaSection}>
                <Text style={styles.criteriaTitle}>Criteria:</Text>
                {milestone.criteria.map((criterion: any, i: number) => (
                  <Text key={i} style={styles.criteriaItem}>
                    • {criterion}
                  </Text>
                ))}
              </View>
            )}

            <View style={styles.milestoneActions}>
              {milestone.status === 'pending' && (
                <AnimatedButton
                  title="Start Milestone"
                  onPress={() => handleUpdateMilestone(milestone.id, {
                    status: 'in_progress',
                    progress: 10,
                  })}
                  variant="primary"
                  size="small"
                />
              )}
              {milestone.status === 'in_progress' && (
                <>
                  <AnimatedButton
                    title="Update Progress"
                    onPress={() => {
                      // Show progress update modal
                    }}
                    variant="secondary"
                    size="small"
                  />
                  <AnimatedButton
                    title="Complete"
                    onPress={() => handleUpdateMilestone(milestone.id, {
                      status: 'completed',
                      progress: 100,
                    })}
                    variant="primary"
                    size="small"
                  />
                </>
              )}
            </View>
          </AnimatedCard>
        ))}
      </ScrollView>

      {/* Metrics */}
      <AnimatedCard style={styles.metricsCard}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>
              {Math.round(progress.metrics.responseTime)}h
            </Text>
            <Text style={styles.metricLabel}>Avg Response Time</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>
              {Math.round(progress.metrics.engagementScore)}%
            </Text>
            <Text style={styles.metricLabel}>Engagement Score</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>
              {Math.round(progress.metrics.goalCompletion)}%
            </Text>
            <Text style={styles.metricLabel}>Goal Completion</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>
              {Math.round(progress.metrics.skillImprovement)}%
            </Text>
            <Text style={styles.metricLabel}>Skill Improvement</Text>
          </View>
        </View>
      </AnimatedCard>

      {/* Blockers */}
      {progress.blockers.length > 0 && (
        <AnimatedCard style={styles.blockersCard}>
          <Text style={styles.sectionTitle}>Active Blockers</Text>
          {progress.blockers.map((blocker: any) => (
            <View key={blocker.id} style={styles.blockerItem}>
              <View style={styles.blockerHeader}>
                <Text style={styles.blockerType}>{blocker.type}</Text>
                <View style={[
                  styles.blockerSeverity,
                  { backgroundColor: getProgressStatusColor(blocker.severity) }
                ]}>
                  <Text style={styles.severityText}>
                    {blocker.severity}
                  </Text>
                </View>
              </View>
              <Text style={styles.blockerDescription}>
                {blocker.description}
              </Text>
              <AnimatedButton
                title="Resolve"
                onPress={() => {
                  // Handle blocker resolution
                }}
                variant="primary"
                size="small"
              />
            </View>
          ))}
        </AnimatedCard>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  overallProgressCard: {
    margin: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressPercentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  progressBar: {
    marginBottom: 16,
  },
  progressMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  milestonesSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  milestoneCard: {
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e5e7eb',
  },
  selectedMilestone: {
    borderLeftColor: '#6366f1',
    backgroundColor: '#f0f9ff',
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  milestoneMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 12,
  },
  milestoneNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  milestoneStatus: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  milestoneDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  milestoneProgress: {
    marginBottom: 12,
  },
  milestoneProgressBar: {
    marginBottom: 4,
  },
  milestoneProgressText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'right',
  },
  criteriaSection: {
    marginBottom: 12,
  },
  criteriaTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  criteriaItem: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  milestoneActions: {
    flexDirection: 'row',
    gap: 8,
  },
  metricsCard: {
    margin: 20,
    marginBottom: 10,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  blockersCard: {
    margin: 20,
    marginBottom: 20,
  },
  blockerItem: {
    padding: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    marginBottom: 8,
  },
  blockerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  blockerType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
  },
  blockerSeverity: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  severityText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  blockerDescription: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 40,
  },
  skeleton: {
    margin: 20,
    marginBottom: 10,
  },
});
