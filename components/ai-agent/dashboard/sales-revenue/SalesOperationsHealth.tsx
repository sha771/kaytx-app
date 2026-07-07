import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, CheckCircle, AlertTriangle, XCircle, Zap, Database, MessageSquare, Phone, Mail, RefreshCw } from 'lucide-react-native';

interface SystemHealth {
  status: 'operational' | 'degraded' | 'down';
  latency: string;
  uptime: string;
}

interface OperationsHealth {
  crmSync: SystemHealth;
  emailDeliverability: SystemHealth;
  callSystem: SystemHealth;
  aiAgentPerformance: SystemHealth;
  workflowAutomation: SystemHealth;
  apiIntegrations: SystemHealth;
}

interface SalesOperationsHealthProps {
  health: OperationsHealth;
}

export default function SalesOperationsHealth({ health }: SalesOperationsHealthProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return '#10B981';
      case 'degraded':
        return '#F59E0B';
      case 'down':
        return '#EF4444';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return CheckCircle;
      case 'degraded':
        return AlertTriangle;
      case 'down':
        return XCircle;
    }
  };

  const getSystemIcon = (system: string) => {
    switch (system) {
      case 'crmSync':
        return Database;
      case 'emailDeliverability':
        return Mail;
      case 'callSystem':
        return Phone;
      case 'aiAgentPerformance':
        return Zap;
      case 'workflowAutomation':
        return RefreshCw;
      case 'apiIntegrations':
        return Activity;
      default:
        return Activity;
    }
  };

  const systems = [
    { key: 'crmSync', name: 'CRM Sync', icon: Database },
    { key: 'emailDeliverability', name: 'Email Deliverability', icon: Mail },
    { key: 'callSystem', name: 'Call System', icon: Phone },
    { key: 'aiAgentPerformance', name: 'AI Agent Performance', icon: Zap },
    { key: 'workflowAutomation', name: 'Workflow Automation', icon: RefreshCw },
    { key: 'apiIntegrations', name: 'API Integrations', icon: Activity }
  ];

  const overallHealth = Object.values(health).filter(system => system.status === 'operational').length / Object.values(health).length * 100;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Activity size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Sales Operations Health
        </Text>
        <View style={[styles.healthScore, { backgroundColor: getStatusColor(overallHealth >= 80 ? 'operational' : overallHealth >= 50 ? 'degraded' : 'down') + '20' }]}>
          <Text style={[styles.healthScoreText, { color: getStatusColor(overallHealth >= 80 ? 'operational' : overallHealth >= 50 ? 'degraded' : 'down') }]}>
            {Math.round(overallHealth)}% Healthy
          </Text>
        </View>
      </View>

      <View style={styles.systemsGrid}>
        {systems.map((system) => {
          const systemData = health[system.key as keyof OperationsHealth];
          const StatusIcon = getStatusIcon(systemData.status);
          const statusColor = getStatusColor(systemData.status);
          const SystemIcon = system.icon;

          return (
            <View 
              key={system.key} 
              style={[
                styles.systemCard, 
                { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: statusColor + '30' }
              ]}
            >
              <View style={styles.systemHeader}>
                <View style={[styles.systemIcon, { backgroundColor: statusColor + '20' }]}>
                  <SystemIcon size={14} color={statusColor} />
                </View>
                <View style={styles.statusIcon}>
                  <StatusIcon size={14} color={statusColor} />
                </View>
              </View>

              <Text style={[styles.systemName, { color: theme.colors.text }]}>
                {system.name}
              </Text>

              <View style={styles.systemMetrics}>
                <View style={styles.metric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Status
                  </Text>
                  <Text style={[styles.metricValue, { color: statusColor }]}>
                    {systemData.status.charAt(0).toUpperCase() + systemData.status.slice(1)}
                  </Text>
                </View>
                <View style={styles.metric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Latency
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {systemData.latency}
                  </Text>
                </View>
                <View style={styles.metric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Uptime
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {systemData.uptime}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
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
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  healthScore: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  healthScoreText: {
    fontSize: 11,
    fontWeight: '700',
  },
  systemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  systemCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  systemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  systemIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  systemMetrics: {
    gap: 6,
  },
  metric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
  },
  metricValue: {
    fontSize: 11,
    fontWeight: '600',
  }
});