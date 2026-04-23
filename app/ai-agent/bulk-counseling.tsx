import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { useExecuteBulkOperation, useQuickBulkPerformanceReview } from '../hooks/useEnhancedCounseling';
import { AnimatedCard, AnimatedButton, AnimatedProgressBar } from '@/components/ai-agent/CounselingAnimations';

export default function BulkCounselingScreen() {
  const [selectedOperation, setSelectedOperation] = useState<any>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const executeOperationMutation = useExecuteBulkOperation();
  const quickReviewMutation = useQuickBulkPerformanceReview();

  const operationTypes = [
    {
      type: 'performance_review',
      title: 'Performance Review',
      description: 'Conduct performance reviews for multiple subagents',
      icon: '📊',
      color: '#6366f1',
    },
    {
      type: 'development_planning',
      title: 'Development Planning',
      description: 'Create development plans for skill improvement',
      icon: '🎯',
      color: '#22c55e',
    },
    {
      type: 'team_coordination',
      title: 'Team Coordination',
      description: 'Align team efforts and coordinate responsibilities',
      icon: '🤝',
      color: '#8b5cf6',
    },
    {
      type: 'crisis_management',
      title: 'Crisis Management',
      description: 'Handle urgent crisis situations across the team',
      icon: '🚨',
      color: '#ef4444',
    },
    {
      type: 'routine_checkin',
      title: 'Routine Check-in',
      description: 'Regular check-ins with all team members',
      icon: '📅',
      color: '#f59e0b',
    },
  ];

  const handleQuickPerformanceReview = async (options?: any) => {
    try {
      const operation = await quickReviewMutation.mutateAsync(options);
      Alert.alert('Success', 'Performance review operation created');
      setSelectedOperation(operation);
    } catch {
      Alert.alert('Error', 'Failed to create performance review');
    }
  };

  const handleExecuteOperation = async (operationId: string) => {
    try {
      const updatedOperation = await executeOperationMutation.mutateAsync({ operationId });
      setSelectedOperation(updatedOperation);
      Alert.alert('Success', 'Operation executed successfully');
    } catch {
      Alert.alert('Error', 'Failed to execute operation');
    }
  };

  const getOperationStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: '#f59e0b',
      in_progress: '#6366f1',
      completed: '#22c55e',
      partial: '#f59e0b',
      failed: '#ef4444',
    };
    return colorMap[status] || '#6b7280';
  };

  const getOperationProgress = (operation: any) => {
    if (!operation.results) return 0;
    const { totalTargeted, sessionsCreated } = operation.results;
    return totalTargeted > 0 ? (sessionsCreated / totalTargeted) * 100 : 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bulk Counseling Operations</Text>
        <AnimatedButton
          title="Quick Performance Review"
          onPress={() => handleQuickPerformanceReview()}
          variant="primary"
          size="small"
        />
      </View>

      {/* Operation Types */}
      <ScrollView style={styles.operationTypes}>
        <Text style={styles.sectionTitle}>Choose Operation Type</Text>
        {operationTypes.map(operation => (
          <AnimatedCard
            key={operation.type}
            style={styles.operationCard}
            onPress={() => setShowCreateModal(true)}
          >
            <View style={styles.operationHeader}>
              <Text style={styles.operationIcon}>{operation.icon}</Text>
              <View style={styles.operationInfo}>
                <Text style={styles.operationTitle}>{operation.title}</Text>
                <Text style={styles.operationDescription}>{operation.description}</Text>
              </View>
            </View>
          </AnimatedCard>
        ))}
      </ScrollView>

      {/* Current Operations */}
      <ScrollView style={styles.currentOperations}>
        <Text style={styles.sectionTitle}>Current Operations</Text>
        {selectedOperation ? (
          <AnimatedCard style={styles.operationDetailCard}>
            <View style={styles.operationDetailHeader}>
              <Text style={styles.operationDetailTitle}>
                {operationTypes.find(op => op.type === selectedOperation.type)?.title}
              </Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getOperationStatusColor(selectedOperation.status) }
              ]}>
                <Text style={styles.statusText}>
                  {selectedOperation.status.replace(/_/g, ' ').toUpperCase()}
                </Text>
              </View>
            </View>

            <AnimatedProgressBar
              progress={getOperationProgress(selectedOperation)}
              color={getOperationStatusColor(selectedOperation.status)}
              style={styles.progressBar}
            />

            <View style={styles.operationMetrics}>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>
                  {selectedOperation.results?.sessionsCreated || 0}
                </Text>
                <Text style={styles.metricLabel}>Sessions Created</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>
                  {selectedOperation.results?.totalTargeted || 0}
                </Text>
                <Text style={styles.metricLabel}>Total Targeted</Text>
              </View>
              <View style={styles.metric}>
                <Text style={styles.metricValue}>
                  {selectedOperation.results?.failedTargets?.length || 0}
                </Text>
                <Text style={styles.metricLabel}>Failed</Text>
              </View>
            </View>

            <View style={styles.operationActions}>
              {selectedOperation.status === 'pending' && (
                <AnimatedButton
                  title="Execute Operation"
                  onPress={() => handleExecuteOperation(selectedOperation.id)}
                  variant="primary"
                />
              )}
              <AnimatedButton
                title="View Details"
                onPress={() => {
                  // Show detailed operation view
                }}
                variant="secondary"
              />
            </View>
          </AnimatedCard>
        ) : (
          <View style={styles.noOperations}>
            <Text style={styles.noOperationsText}>No active operations</Text>
            <Text style={styles.noOperationsSubtext}>
              Create a bulk operation to get started
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Create Operation Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create Bulk Operation</Text>
            <TouchableOpacity onPress={() => setShowCreateModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalDescription}>
              Configure your bulk counseling operation parameters
            </Text>
            
            {/* Form fields would go here */}
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Target Subagents</Text>
              <Text style={styles.formPlaceholder}>Select subagents to target...</Text>
            </View>
            
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Scheduling</Text>
              <Text style={styles.formPlaceholder}>Configure scheduling options...</Text>
            </View>
            
            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Template</Text>
              <Text style={styles.formPlaceholder}>Select counseling template...</Text>
            </View>
          </ScrollView>
          
          <View style={styles.modalActions}>
            <AnimatedButton
              title="Cancel"
              onPress={() => setShowCreateModal(false)}
              variant="ghost"
            />
            <AnimatedButton
              title="Create Operation"
              onPress={() => {
                // Handle form submission
                setShowCreateModal(false);
              }}
              variant="primary"
            />
          </View>
        </View>
      </Modal>
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
  operationTypes: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  operationCard: {
    marginBottom: 12,
  },
  operationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  operationIcon: {
    fontSize: 24,
  },
  operationInfo: {
    flex: 1,
  },
  operationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  operationDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  currentOperations: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  operationDetailCard: {
    marginBottom: 20,
  },
  operationDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  operationDetailTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
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
  progressBar: {
    marginBottom: 16,
  },
  operationMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  metric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  operationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  noOperations: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noOperationsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  noOperationsSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    fontSize: 24,
    color: '#6b7280',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  formSection: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  formPlaceholder: {
    fontSize: 14,
    color: '#9ca3af',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
});
