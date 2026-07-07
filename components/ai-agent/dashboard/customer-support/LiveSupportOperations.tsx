import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface LiveSupportOperationsProps {
  metrics: {
    activeConversations: number;
    waitingCustomers: number;
    queueLength: number;
    aiResolutionRate: number;
    humanInterventionRate: number;
    avgWaitTime: string;
  };
}

export default function LiveSupportOperations({ metrics }: LiveSupportOperationsProps) {
  const { theme } = useTheme();

  const MetricCard = ({ title, value, subtitle, color }: any) => (
    <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: `${color || '#10B981'}30`, borderWidth: 1 }]}>
      <Text style={[styles.metricTitle, { color: 'rgba(255, 255, 255, 0.5)' }]}>
        {title}
      </Text>
      <Text style={[styles.metricValue, { color: color || '#10B981' }]}>
        {value}
      </Text>
      {subtitle && (
        <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Live Support Operations
      </Text>
      
      {/* Real-time Metrics Grid */}
      <View style={styles.metricsGrid}>
        <MetricCard 
          title="Active Conversations"
          value={metrics.activeConversations}
          subtitle="Live now"
          color="#10B981"
        />
        <MetricCard 
          title="Waiting Customers"
          value={metrics.waitingCustomers}
          subtitle="In queue"
          color="#F59E0B"
        />
        <MetricCard 
          title="Queue Length"
          value={metrics.queueLength}
          subtitle="Position"
          color="#3B82F6"
        />
        <MetricCard 
          title="AI Resolution Rate"
          value={`${metrics.aiResolutionRate}%`}
          subtitle="Auto-resolved"
          color="#22C55E"
        />
        <MetricCard 
          title="Human Intervention"
          value={`${metrics.humanInterventionRate}%`}
          subtitle="Escalated"
          color="#EF4444"
        />
        <MetricCard 
          title="Avg Wait Time"
          value={metrics.avgWaitTime}
          subtitle="Current"
          color="#8B5CF6"
        />
      </View>

      {/* Queue Visualization */}
      <View style={[styles.queueSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.queueTitle, { color: '#FFFFFF' }]}>
          Live Queue Status
        </Text>
        <View style={styles.queueVisual}>
          {Array.from({ length: Math.min(metrics.queueLength, 10) }).map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.queueItem, 
                { 
                  backgroundColor: index < 3 ? '#10B981' : index < 6 ? '#F59E0B' : '#EF4444',
                  opacity: 1 - (index * 0.1)
                }
              ]}
            />
          ))}
          {metrics.queueLength > 10 && (
            <Text style={[styles.queueMore, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              +{metrics.queueLength - 10} more
            </Text>
          )}
        </View>
      </View>

      {/* Support Load Distribution */}
      <View style={[styles.loadSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.loadTitle, { color: '#FFFFFF' }]}>
          Support Load Distribution
        </Text>
        <View style={styles.loadBars}>
          <View style={styles.loadBar}>
            <Text style={[styles.loadLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>AI Agents</Text>
            <View style={[styles.loadProgress, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <View style={[styles.loadFill, { backgroundColor: '#10B981', width: '78%' }]} />
            </View>
            <Text style={[styles.loadPercent, { color: '#FFFFFF' }]}>78%</Text>
          </View>
          <View style={styles.loadBar}>
            <Text style={[styles.loadLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Human Agents</Text>
            <View style={[styles.loadProgress, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <View style={[styles.loadFill, { backgroundColor: '#3B82F6', width: '22%' }]} />
            </View>
            <Text style={[styles.loadPercent, { color: '#FFFFFF' }]}>22%</Text>
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 16,
  },
  metricCard: {
    width: '50%',
    paddingHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  metricTitle: {
    fontSize: 12,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricSubtitle: {
    fontSize: 11,
  },
  queueSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  queueTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  queueVisual: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  queueItem: {
    width: 10,
    height: 36,
    borderRadius: 5,
    marginRight: 4,
    marginBottom: 4,
  },
  queueMore: {
    fontSize: 12,
    marginLeft: 8,
  },
  loadSection: {
    padding: 16,
    borderRadius: 12,
  },
  loadTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  loadBars: {
    gap: 12,
  },
  loadBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadLabel: {
    width: 100,
    fontSize: 12,
  },
  loadProgress: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 12,
  },
  loadFill: {
    height: '100%',
    borderRadius: 5,
  },
  loadPercent: {
    fontSize: 13,
    fontWeight: '700',
    width: 40,
    textAlign: 'right',
  },
});