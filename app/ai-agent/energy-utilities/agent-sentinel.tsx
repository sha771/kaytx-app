import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Shield, AlertTriangle, Lock, CheckCircle, Activity, TrendingUp,
  Clock, ArrowUpRight, FileCheck, Eye, Zap, Users
} from 'lucide-react-native';
import { ENERGY_COLORS } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function AgentSentinel() {
  const SENTINEL_METRICS = [
    { label: 'Threats Blocked', value: '12,400', icon: Shield, color: ENERGY_COLORS.emeraldGreen, trend: '+28.6%', trendUp: true },
    { label: 'Compliance Score', value: '98.4%', icon: FileCheck, color: ENERGY_COLORS.neonCyan, trend: '+2.4%', trendUp: true },
    { label: 'Security Incidents', value: '8', icon: AlertTriangle, color: ENERGY_COLORS.amber, trend: '-42%', trendUp: true },
    { label: 'Infrastructure Protection', value: '99.8%', icon: Lock, color: ENERGY_COLORS.electricBlue, trend: '+0.4%', trendUp: true },
    { label: 'Audit Completion', value: '96.8%', icon: CheckCircle, color: ENERGY_COLORS.purple, trend: '+6.8%', trendUp: true },
    { label: 'Risk Assessment', value: '94.2%', icon: Activity, color: ENERGY_COLORS.magenta, trend: '+4.2%', trendUp: true },
  ];

  const SECURITY_AREAS = [
    { area: 'Cybersecurity', incidents: '3', blocked: '8,400', compliance: '99.2%', color: ENERGY_COLORS.electricBlue },
    { area: 'Physical Security', incidents: '2', blocked: '2,400', compliance: '98.8%', color: ENERGY_COLORS.emeraldGreen },
    { area: 'Regulatory Compliance', incidents: '1', blocked: '1,200', compliance: '98.4%', color: ENERGY_COLORS.neonCyan },
    { area: 'Data Protection', incidents: '2', blocked: '400', compliance: '99.6%', color: ENERGY_COLORS.purple },
  ];

  const SENTINEL_ALERTS = [
    { type: 'alert', message: 'Unauthorized access attempt detected in control room sector 4 - blocked successfully', impact: 'Critical', time: '2h ago' },
    { type: 'opportunity', message: 'Security protocol upgrade could reduce incident response time by 40%', impact: 'High', time: '4h ago' },
    { type: 'success', message: 'Compliance audit passed with 98.4% score - all regulatory requirements met', impact: 'Positive', time: '6h ago' },
    { type: 'trend', message: 'Threat detection accuracy improved to 97.2% with new AI models', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Agent Sentinel Metrics</Text>
      <View style={styles.metricsGrid}>
        {SENTINEL_METRICS.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: metric.color + '10', borderColor: metric.color }]}>
            <metric.icon size={24} color={metric.color} />
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricTrend}>
              {metric.trendUp ? <ArrowUpRight size={12} color="#10B981" /> : <Activity size={12} color="#EF4444" />}
              <Text style={[styles.metricTrendText, { color: metric.trendUp ? '#10B981' : '#EF4444' }]}>{metric.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSecurityAreas = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Security Areas</Text>
      <View style={styles.areasList}>
        {SECURITY_AREAS.map((area) => (
          <View key={area.area} style={[styles.areaCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: area.color }]}>
            <View style={styles.areaHeader}>
              <Shield size={20} color={area.color} />
              <Text style={styles.areaName}>{area.area}</Text>
              <Text style={styles.areaIncidents}>{area.incidents} incidents</Text>
            </View>
            <View style={styles.areaMetrics}>
              <View style={styles.areaMetric}>
                <Eye size={12} color="#6B7280" />
                <Text style={styles.areaMetricLabel}>Blocked</Text>
                <Text style={styles.areaMetricValue}>{area.blocked}</Text>
              </View>
              <View style={styles.areaMetric}>
                <FileCheck size={12} color="#6B7280" />
                <Text style={styles.areaMetricLabel}>Compliance</Text>
                <Text style={styles.areaMetricValue}>{area.compliance}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sentinel Alerts</Text>
      {SENTINEL_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.type === 'alert' ? '#EF444415' : 
                       alert.type === 'opportunity' ? '#10B98115' : 
                       alert.type === 'success' ? '#10B98115' : '#8B5CF615',
          borderLeftColor: alert.type === 'alert' ? '#EF4444' : 
                          alert.type === 'opportunity' ? '#10B981' : 
                          alert.type === 'success' ? '#10B981' : '#8B5CF6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            {alert.type === 'alert' && <AlertTriangle size={20} color="#EF4444" />}
            {alert.type === 'opportunity' && <TrendingUp size={20} color="#10B981" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'trend' && <Activity size={20} color="#8B5CF6" />}
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
          <View style={styles.alertFooter}>
            <View style={[styles.impactBadge, { backgroundColor: alert.impact === 'Critical' ? '#EF444420' : alert.impact === 'High' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: alert.impact === 'Critical' ? '#EF4444' : alert.impact === 'High' ? '#F59E0B' : '#3B82F6' }]}>{alert.impact}</Text>
            </View>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.alertTime}>{alert.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Shield size={32} color={ENERGY_COLORS.red} />
        <View>
          <Text style={styles.headerTitle}>Agent Sentinel</Text>
          <Text style={styles.headerSubtitle}>Security & Compliance Agent - Cybersecurity, infrastructure protection, and regulatory compliance</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderSecurityAreas()}
      {renderAlerts()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ENERGY_COLORS.deepSpaceBlack,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 64) / 3 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  areasList: {
    gap: 12,
  },
  areaCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  areaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  areaName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  areaIncidents: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  areaMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  areaMetric: {
    alignItems: 'center',
  },
  areaMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  areaMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  alertCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertMessage: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  alertFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
  },
});
