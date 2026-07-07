import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface EscalationStep {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending' | 'escalated';
  count?: number;
}

interface EscalationReason {
  reason: string;
  count: number;
  percentage: number;
}

interface EscalationManagementProps {
  pipeline: EscalationStep[];
  reasons: EscalationReason[];
  pendingEscalations: number;
  avgEscalationTime: string;
}

export default function EscalationManagement({ 
  pipeline, 
  reasons, 
  pendingEscalations,
  avgEscalationTime 
}: EscalationManagementProps) {
  const { theme } = useTheme();

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'active': return '#3B82F6';
      case 'pending': return '#F59E0B';
      case 'escalated': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Escalation Management
      </Text>

      {/* Escalation Pipeline */}
      <View style={[styles.pipelineSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Escalation Pipeline
        </Text>
        <View style={styles.pipelineContainer}>
          {pipeline.map((step, index) => (
            <View key={step.id} style={styles.pipelineStep}>
              <View style={styles.stepContent}>
                <View style={[styles.stepDot, { backgroundColor: getStepColor(step.status) }]} />
                <View style={styles.stepInfo}>
                  <Text style={[styles.stepName, { color: '#FFFFFF' }]}>
                    {step.name}
                  </Text>
                  {step.count && (
                    <Text style={[styles.stepCount, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                      {step.count} conversations
                    </Text>
                  )}
                </View>
              </View>
              {index < pipeline.length - 1 && (
                <View style={[styles.stepConnector, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]} />
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Escalation Reasons */}
      <View style={[styles.reasonsSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Escalation Reasons
        </Text>
        <ScrollView style={styles.reasonsScroll} showsVerticalScrollIndicator={false}>
          {reasons.map((reason, index) => (
            <View key={index} style={styles.reasonItem}>
              <View style={styles.reasonInfo}>
                <Text style={[styles.reasonText, { color: '#FFFFFF' }]}>
                  {reason.reason}
                </Text>
                <Text style={[styles.reasonCount, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  {reason.count} escalations
                </Text>
              </View>
              <View style={styles.reasonBarContainer}>
                <View style={[styles.reasonBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                  <View 
                    style={[
                      styles.reasonFill, 
                      { backgroundColor: '#EF4444', width: `${reason.percentage}%` }
                    ]} 
                  />
                </View>
                <Text style={[styles.reasonPercent, { color: '#FFFFFF' }]}>
                  {reason.percentage}%
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Escalation Metrics */}
      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
            Pending Escalations
          </Text>
          <Text style={[styles.metricValue, { color: '#F59E0B' }]}>
            {pendingEscalations}
          </Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
            Avg Escalation Time
          </Text>
          <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>
            {avgEscalationTime}
          </Text>
        </View>
      </View>

      {/* Human Response Queue */}
      <View style={[styles.queueSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Human Response Queue
        </Text>
        <View style={styles.queueStatus}>
          <View style={[styles.queueIndicator, { backgroundColor: '#10B981' }]} />
          <Text style={[styles.queueText, { color: '#FFFFFF' }]}>
            {pendingEscalations} agents available • Avg response: 2m 30s
          </Text>
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
  pipelineSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  pipelineContainer: {
    paddingLeft: 8,
  },
  pipelineStep: {
    marginBottom: 8,
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 12,
  },
  stepInfo: {
    flex: 1,
  },
  stepName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepCount: {
    fontSize: 11,
  },
  stepConnector: {
    width: 2,
    height: 16,
    marginLeft: 5,
    marginTop: 4,
  },
  reasonsSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    maxHeight: 200,
  },
  reasonsScroll: {
    flex: 1,
  },
  reasonItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  reasonInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  reasonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  reasonCount: {
    fontSize: 11,
  },
  reasonBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reasonBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  reasonFill: {
    height: '100%',
    borderRadius: 4,
  },
  reasonPercent: {
    fontSize: 11,
    fontWeight: '600',
    width: 35,
    textAlign: 'right',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  queueSection: {
    padding: 16,
    borderRadius: 12,
  },
  queueStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  queueIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  queueText: {
    fontSize: 12,
  },
});