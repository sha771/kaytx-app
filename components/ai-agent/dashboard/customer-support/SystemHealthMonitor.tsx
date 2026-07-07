import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface SystemComponent {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  lastCheck: string;
}

interface SystemHealthMonitorProps {
  components: SystemComponent[];
  overallStatus: 'healthy' | 'warning' | 'critical';
}

export default function SystemHealthMonitor({ components, overallStatus }: SystemHealthMonitorProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'healthy': return 'Healthy';
      case 'warning': return 'Warning';
      case 'critical': return 'Critical';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return '✓';
      case 'warning': return '⚠';
      case 'critical': return '✗';
      default: return '';
    }
  };

  const healthyCount = components.filter(c => c.status === 'healthy').length;
  const warningCount = components.filter(c => c.status === 'warning').length;
  const criticalCount = components.filter(c => c.status === 'critical').length;

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        System Health
      </Text>

      {/* Overall Status */}
      <View style={[styles.overallStatus, { backgroundColor: `${getStatusColor(overallStatus)}20`, borderColor: `${getStatusColor(overallStatus)}40`, borderWidth: 1 }]}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(overallStatus) }]} />
        <View style={styles.statusInfo}>
          <Text style={[styles.statusLabel, { color: getStatusColor(overallStatus) }]}>
            {getStatusLabel(overallStatus)}
          </Text>
          <Text style={[styles.statusDescription, { color: 'rgba(255, 255, 255, 0.5)' }]}>
            {healthyCount} healthy, {warningCount} warnings, {criticalCount} critical
          </Text>
        </View>
      </View>

      {/* System Components */}
      <View style={[styles.componentsSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          System Components
        </Text>
        <ScrollView style={styles.componentsScroll} showsVerticalScrollIndicator={false}>
          {components.map((component, index) => (
            <View 
              key={index}
              style={[
                styles.componentItem, 
                { borderBottomColor: 'rgba(16, 185, 129, 0.2)' }
              ]}
            >
              <View style={styles.componentInfo}>
                <View style={[
                  styles.componentStatus, 
                  { backgroundColor: getStatusColor(component.status) }
                ]}>
                  <Text style={styles.componentStatusText}>
                    {getStatusIcon(component.status)}
                  </Text>
                </View>
                <View style={styles.componentDetails}>
                  <Text style={[styles.componentName, { color: '#FFFFFF' }]}>
                    {component.name}
                  </Text>
                  <Text style={[styles.componentUptime, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                    Uptime: {component.uptime}
                  </Text>
                </View>
              </View>
              <View style={styles.componentMeta}>
                <Text style={[
                  styles.componentStatusLabel, 
                  { color: getStatusColor(component.status) }
                ]}>
                  {getStatusLabel(component.status)}
                </Text>
                <Text style={[styles.componentLastCheck, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  {component.lastCheck}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Health Summary */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <View style={[styles.summaryDot, { backgroundColor: '#10B981' }]} />
          <Text style={[styles.summaryLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
            Healthy
          </Text>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>
            {healthyCount}
          </Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <View style={[styles.summaryDot, { backgroundColor: '#F59E0B' }]} />
          <Text style={[styles.summaryLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
            Warning
          </Text>
          <Text style={[styles.summaryValue, { color: '#F59E0B' }]}>
            {warningCount}
          </Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <View style={[styles.summaryDot, { backgroundColor: '#EF4444' }]} />
          <Text style={[styles.summaryLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
            Critical
          </Text>
          <Text style={[styles.summaryValue, { color: '#EF4444' }]}>
            {criticalCount}
          </Text>
        </View>
      </View>

      {/* Recent Incidents */}
      <View style={[styles.incidentsSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Recent Incidents
        </Text>
        <View style={styles.incidentItem}>
          <View style={[styles.incidentDot, { backgroundColor: '#F59E0B' }]} />
          <View style={styles.incidentInfo}>
            <Text style={[styles.incidentTitle, { color: '#FFFFFF' }]}>
              Model Cache High Memory Usage
            </Text>
            <Text style={[styles.incidentTime, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              15 minutes ago • Resolved
            </Text>
          </View>
        </View>
        <View style={styles.incidentItem}>
          <View style={[styles.incidentDot, { backgroundColor: '#10B981' }]} />
          <View style={styles.incidentInfo}>
            <Text style={[styles.incidentTitle, { color: '#FFFFFF' }]}>
              API Gateway Latency Spike
            </Text>
            <Text style={[styles.incidentTime, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              1 hour ago • Resolved
            </Text>
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
  overallStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 12,
  },
  componentsSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    maxHeight: 250,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  componentsScroll: {
    flex: 1,
  },
  componentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  componentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  componentStatus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  componentStatusText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  componentDetails: {
    flex: 1,
  },
  componentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  componentUptime: {
    fontSize: 11,
  },
  componentMeta: {
    alignItems: 'flex-end',
  },
  componentStatusLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  componentLastCheck: {
    fontSize: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
  },
  summaryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  incidentsSection: {
    padding: 16,
    borderRadius: 12,
  },
  incidentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  incidentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  incidentInfo: {
    flex: 1,
  },
  incidentTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  incidentTime: {
    fontSize: 10,
  },
});