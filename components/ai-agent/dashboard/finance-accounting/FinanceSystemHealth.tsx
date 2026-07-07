import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Server, 
  Database, 
  CreditCard, 
  Building2, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Activity,
  Zap,
  Shield,
  Clock
} from 'lucide-react-native';

interface FinanceSystem {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  latency: number;
  lastSync: string;
}

interface FinanceSystemHealthProps {
  systems: FinanceSystem[];
  overallHealth: 'healthy' | 'warning' | 'critical';
  apiConnectivity: number;
  dataQuality: number;
  agentHealth: number;
}

export default function FinanceSystemHealth({ 
  systems, 
  overallHealth,
  apiConnectivity,
  dataQuality,
  agentHealth
}: FinanceSystemHealthProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle size={14} color={getStatusColor(status)} />;
      case 'warning': return <AlertTriangle size={14} color={getStatusColor(status)} />;
      case 'critical': return <XCircle size={14} color={getStatusColor(status)} />;
      default: return <Activity size={14} color={getStatusColor(status)} />;
    }
  };

  const getSystemIcon = (name: string) => {
    if (name.includes('ERP') || name.includes('Oracle') || name.includes('SAP')) {
      return <Database size={16} color={theme.colors.primary} />;
    }
    if (name.includes('Bank') || name.includes('Stripe') || name.includes('Payment')) {
      return <Building2 size={16} color={theme.colors.primary} />;
    }
    if (name.includes('Processor') || name.includes('Gateway')) {
      return <CreditCard size={16} color={theme.colors.primary} />;
    }
    return <Server size={16} color={theme.colors.primary} />;
  };

  const getHealthScore = (value: number) => {
    if (value >= 90) return { color: '#10B981', label: 'Excellent' };
    if (value >= 75) return { color: '#3B82F6', label: 'Good' };
    if (value >= 60) return { color: '#F59E0B', label: 'Fair' };
    return { color: '#EF4444', label: 'Poor' };
  };

  const healthyCount = systems.filter(s => s.status === 'healthy').length;
  const warningCount = systems.filter(s => s.status === 'warning').length;
  const criticalCount = systems.filter(s => s.status === 'critical').length;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Activity size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Finance System Health
        </Text>
      </View>

      {/* Overall Health Status */}
      <View style={[styles.overallHealthCard, { backgroundColor: getStatusColor(overallHealth) + '20' }]}>
        <View style={[styles.healthIndicator, { backgroundColor: getStatusColor(overallHealth) }]} />
        <View style={styles.healthInfo}>
          <Text style={[styles.healthLabel, { color: getStatusColor(overallHealth) }]}>
            {overallHealth.charAt(0).toUpperCase() + overallHealth.slice(1)}
          </Text>
          <Text style={[styles.healthDescription, { color: theme.colors.textSecondary }]}>
            {healthyCount} healthy, {warningCount} warnings, {criticalCount} critical
          </Text>
        </View>
      </View>

      {/* Key Health Metrics */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Zap size={14} color={getHealthScore(apiConnectivity).color} />
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              API Connectivity
            </Text>
          </View>
          <Text style={[styles.metricValue, { color: getHealthScore(apiConnectivity).color }]}>
            {apiConnectivity}%
          </Text>
          <View style={[styles.metricBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.metricFill, 
                { 
                  backgroundColor: getHealthScore(apiConnectivity).color,
                  width: `${apiConnectivity}%`
                }
              ]} 
            />
          </View>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Database size={14} color={getHealthScore(dataQuality).color} />
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              Data Quality
            </Text>
          </View>
          <Text style={[styles.metricValue, { color: getHealthScore(dataQuality).color }]}>
            {dataQuality}%
          </Text>
          <View style={[styles.metricBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.metricFill, 
                { 
                  backgroundColor: getHealthScore(dataQuality).color,
                  width: `${dataQuality}%`
                }
              ]} 
            />
          </View>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Shield size={14} color={getHealthScore(agentHealth).color} />
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              AI Agent Health
            </Text>
          </View>
          <Text style={[styles.metricValue, { color: getHealthScore(agentHealth).color }]}>
            {agentHealth}%
          </Text>
          <View style={[styles.metricBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.metricFill, 
                { 
                  backgroundColor: getHealthScore(agentHealth).color,
                  width: `${agentHealth}%`
                }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Finance Systems List */}
      <View style={styles.systemsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Finance Systems
        </Text>
        <ScrollView style={styles.systemsList} showsVerticalScrollIndicator={false}>
          {systems.map((system, index) => (
            <View 
              key={index}
              style={[
                styles.systemItem, 
                { borderBottomColor: 'rgba(255,255,255,0.1)' }
              ]}
            >
              <View style={styles.systemLeft}>
                <View style={[styles.systemIcon, { backgroundColor: getStatusColor(system.status) + '20' }]}>
                  {getSystemIcon(system.name)}
                </View>
                <View style={styles.systemInfo}>
                  <Text style={[styles.systemName, { color: theme.colors.text }]}>
                    {system.name}
                  </Text>
                  <View style={styles.systemMeta}>
                    <Clock size={10} color="#6B7280" />
                    <Text style={[styles.systemMetaText, { color: theme.colors.textSecondary }]}>
                      {system.uptime} uptime
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.systemRight}>
                {getStatusIcon(system.status)}
                <Text style={[styles.systemLatency, { color: theme.colors.textSecondary }]}>
                  {system.latency}ms
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Integration Health */}
      <View style={styles.integrationSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Integration Status
        </Text>
        <View style={styles.integrationGrid}>
          <View style={styles.integrationItem}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.integrationText, { color: theme.colors.text }]}>
              ERP Systems
            </Text>
            <Text style={[styles.integrationStatus, { color: '#10B981' }]}>
              Connected
            </Text>
          </View>
          <View style={styles.integrationItem}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.integrationText, { color: theme.colors.text }]}>
              Banking APIs
            </Text>
            <Text style={[styles.integrationStatus, { color: '#10B981' }]}>
              Connected
            </Text>
          </View>
          <View style={styles.integrationItem}>
            <AlertTriangle size={12} color="#F59E0B" />
            <Text style={[styles.integrationText, { color: theme.colors.text }]}>
              Payment Processors
            </Text>
            <Text style={[styles.integrationStatus, { color: '#F59E0B' }]}>
              Degraded
            </Text>
          </View>
          <View style={styles.integrationItem}>
            <CheckCircle size={12} color="#10B981" />
            <Text style={[styles.integrationText, { color: theme.colors.text }]}>
              Data Pipelines
            </Text>
            <Text style={[styles.integrationStatus, { color: '#10B981' }]}>
              Operational
            </Text>
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
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  overallHealthCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  healthIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  healthInfo: {
    flex: 1,
  },
  healthLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  healthDescription: {
    fontSize: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  metricFill: {
    height: '100%',
    borderRadius: 2,
  },
  systemsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  systemsList: {
    maxHeight: 200,
  },
  systemItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  systemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  systemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemInfo: {
    flex: 1,
  },
  systemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  systemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  systemMetaText: {
    fontSize: 11,
  },
  systemRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  systemLatency: {
    fontSize: 11,
  },
  integrationSection: {
    marginBottom: 8,
  },
  integrationGrid: {
    gap: 8,
  },
  integrationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  integrationText: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
    marginLeft: 8,
  },
  integrationStatus: {
    fontSize: 11,
    fontWeight: '600',
  },
});
