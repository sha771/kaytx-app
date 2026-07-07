import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Database, Cpu, HardDrive, Activity, CheckCircle, AlertTriangle, Server, Zap } from 'lucide-react-native';

interface SystemHealthMetric {
  id: string;
  label: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
  icon: any;
  color: string;
}

export default function RDSystemHealth() {
  const { theme } = useTheme();

  const systemMetrics: SystemHealthMetric[] = [
    {
      id: 'research-databases',
      label: 'Research Databases',
      value: '99.9%',
      status: 'healthy',
      icon: Database,
      color: '#10B981'
    },
    {
      id: 'knowledge-systems',
      label: 'Knowledge Systems',
      value: '98.7%',
      status: 'healthy',
      icon: Server,
      color: '#0B8AFF'
    },
    {
      id: 'ai-models',
      label: 'AI Models',
      value: '97.2%',
      status: 'healthy',
      icon: Cpu,
      color: '#8B5CF6'
    },
    {
      id: 'experiment-platforms',
      label: 'Experiment Platforms',
      value: '96.8%',
      status: 'healthy',
      icon: Zap,
      color: '#06B6D4'
    },
    {
      id: ' data-pipelines',
      label: 'Data Pipelines',
      value: '94.5%',
      status: 'warning',
      icon: HardDrive,
      color: '#F59E0B'
    },
    {
      id: 'innovation-tools',
      label: 'Innovation Tools',
      value: '99.2%',
      status: 'healthy',
      icon: Zap,
      color: '#EC4899'
    }
  ];

  const systemDetails = [
    {
      category: 'Uptime',
      metrics: [
        { label: 'Research Databases', value: '99.9%', trend: '+0.1%' },
        { label: 'Knowledge Systems', value: '99.8%', trend: '+0.2%' },
        { label: 'AI Models', value: '99.5%', trend: '+0.3%' },
        { label: 'Experiment Platforms', value: '98.9%', trend: '+0.1%' }
      ]
    },
    {
      category: 'Data Freshness',
      metrics: [
        { label: 'Research Papers', value: '2 min ago', trend: 'Real-time' },
        { label: 'Patent Data', value: '15 min ago', trend: 'Updated' },
        { label: 'Market Intelligence', value: '5 min ago', trend: 'Live' },
        { label: 'Technology Trends', value: '10 min ago', trend: 'Current' }
      ]
    },
    {
      category: 'Processing Throughput',
      metrics: [
        { label: 'Paper Analysis', value: '1.2K/hr', trend: '+12%' },
        { label: 'Experiment Runs', value: '842/day', trend: '+8%' },
        { label: 'Knowledge Graph Updates', value: '15K/hr', trend: '+15%' },
        { label: 'Patent Scanning', value: '5K/hr', trend: '+10%' }
      ]
    },
    {
      category: 'Platform Reliability',
      metrics: [
        { label: 'API Response Time', value: '45ms', trend: '-5ms' },
        { label: 'Error Rate', value: '0.02%', trend: '-0.01%' },
        { label: 'System Availability', value: '99.9%', trend: '+0.1%' },
        { label: 'Recovery Time', value: '2.1s', trend: '-0.3s' }
      ]
    }
  ];

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
      case 'healthy': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'critical': return AlertTriangle;
      default: return Activity;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Activity size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            R&D System Health
          </Text>
        </View>
        <View style={[styles.overallStatus, { backgroundColor: '#10B981' + '20' }]}>
          <CheckCircle size={16} color="#10B981" />
          <Text style={[styles.overallStatusText, { color: '#10B981' }]}>
            All Systems Operational
          </Text>
        </View>
      </View>

      {/* System Health Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {systemMetrics.map((metric) => {
          const Icon = metric.icon;
          const StatusIcon = getStatusIcon(metric.status);
          const statusColor = getStatusColor(metric.status);
          
          return (
            <View 
              key={metric.id}
              style={[
                styles.metricCard,
                { 
                  backgroundColor: metric.color + '10',
                  borderColor: metric.color + '30'
                }
              ]}
            >
              <View style={[styles.metricIconContainer, { backgroundColor: metric.color + '25' }]}>
                <Icon size={20} color={metric.color} />
              </View>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                {metric.label}
              </Text>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                {metric.value}
              </Text>
              <View style={styles.metricStatus}>
                <StatusIcon size={12} color={statusColor} />
                <Text style={[styles.metricStatusText, { color: statusColor }]}>
                  {metric.status}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* System Details */}
      <View style={styles.detailsContainer}>
        {systemDetails.map((section, index) => (
          <View key={section.category} style={styles.detailSection}>
            <Text style={[styles.detailSectionTitle, { color: theme.colors.text }]}>
              {section.category}
            </Text>
            <View style={styles.detailGrid}>
              {section.metrics.map((metric, metricIndex) => (
                <View 
                  key={metricIndex}
                  style={[styles.detailCard, { backgroundColor: theme.colors.background }]}
                >
                  <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                    {metric.label}
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                    {metric.value}
                  </Text>
                  <Text style={[styles.detailTrend, { color: '#10B981' }]}>
                    {metric.trend}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* System Alerts */}
      <View style={styles.alertsSection}>
        <Text style={[styles.alertsTitle, { color: theme.colors.text }]}>
          System Alerts
        </Text>
        <View style={[styles.alertCard, { backgroundColor: '#F59E0B' + '15', borderColor: '#F59E0B' + '30' }]}>
          <AlertTriangle size={20} color="#F59E0B" />
          <View style={styles.alertContent}>
            <Text style={[styles.alertTitle, { color: theme.colors.text }]}>
              Data Pipeline Latency
            </Text>
            <Text style={[styles.alertMessage, { color: theme.colors.textSecondary }]}>
              Slight increase in data pipeline processing time. Monitoring in progress.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
  overallStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  overallStatusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  metricsScroll: {
    marginBottom: 20,
  },
  metricCard: {
    width: 140,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  metricIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricStatusText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailCard: {
    width: '48%',
    marginRight: '2%',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  detailTrend: {
    fontSize: 10,
  },
  alertsSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  alertsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  alertCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  alertContent: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 12,
  },
});
