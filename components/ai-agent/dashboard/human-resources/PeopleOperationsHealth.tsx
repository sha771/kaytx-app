import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, CheckCircle, AlertCircle, Zap, Database, Server, Clock, Users, Sparkles, Flame, Shield } from 'lucide-react-native';

interface SystemHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  lastCheck: string;
  metrics?: {
    responseTime?: number;
    errorRate?: number;
    throughput?: number;
  };
}

interface PeopleOperationsHealthProps {
  systems: SystemHealth[];
  overallHealth: 'healthy' | 'degraded' | 'down';
  dataQualityScore: number;
}

export default function PeopleOperationsHealth({ systems, overallHealth, dataQualityScore }: PeopleOperationsHealthProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return '#10B981';
      case 'degraded':
        return '#F59E0B';
      case 'down':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle size={16} color="#10B981" />;
      case 'degraded':
        return <AlertCircle size={16} color="#F59E0B" />;
      case 'down':
        return <AlertCircle size={16} color="#EF4444" />;
      default:
        return <Activity size={16} color="#6B7280" />;
    }
  };

  const getSystemIcon = (name: string) => {
    if (name.includes('HRIS')) return <Database size={18} color={theme.colors.text} />;
    if (name.includes('Payroll')) return <Zap size={18} color={theme.colors.text} />;
    if (name.includes('Recruitment')) return <Users size={18} color={theme.colors.text} />;
    if (name.includes('Learning')) return <Activity size={18} color={theme.colors.text} />;
    return <Server size={18} color={theme.colors.text} />;
  };

  const overallHealthColor = getStatusColor(overallHealth);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: '#10B981' + '20' }]}>
          <Shield size={24} color="#10B981" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            People Operations Health
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            System Monitoring & Status
          </Text>
        </View>
        <View style={[styles.overallBadge, { backgroundColor: overallHealthColor + '20', borderColor: overallHealthColor + '30', borderWidth: 1 }]}>
          {getStatusIcon(overallHealth)}
          <Text style={[styles.overallText, { color: overallHealthColor }]}>
            {overallHealth}
          </Text>
        </View>
      </View>

      <View style={styles.dataQualitySection}>
        <View style={[styles.dataQualityCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: '#3B82F6' + '30', borderWidth: 1 }]}>
          <View style={styles.dataQualityHeader}>
            <View style={[styles.dataQualityIcon, { backgroundColor: '#3B82F6' + '20' }]}>
              <Database size={20} color="#3B82F6" />
            </View>
            <View style={styles.dataQualityHeaderInfo}>
              <Text style={[styles.dataQualityLabel, { color: theme.colors.textSecondary }]}>
                Data Quality Score
              </Text>
              <Text style={[styles.dataQualitySubtitle, { color: theme.colors.textSecondary }]}>
                Overall data integrity
              </Text>
            </View>
          </View>
          <Text style={[styles.dataQualityValue, { color: dataQualityScore >= 90 ? '#10B981' : dataQualityScore >= 75 ? '#F59E0B' : '#EF4444' }]}>
            {dataQualityScore}%
          </Text>
          <View style={[styles.dataQualityBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.dataQualityFill, 
                { 
                  backgroundColor: dataQualityScore >= 90 ? '#10B981' : 
                               dataQualityScore >= 75 ? '#F59E0B' : '#EF4444',
                  width: `${dataQualityScore}%`,
                  shadowColor: dataQualityScore >= 90 ? '#10B981' : dataQualityScore >= 75 ? '#F59E0B' : '#EF4444',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={[styles.systemsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <Server size={20} color="#8B5CF6" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            System Health Status
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.systemsRow}>
            {systems.map((system, index) => (
              <View key={index} style={[styles.systemCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: getStatusColor(system.status) + '30', borderWidth: 1 }]}>
                <View style={styles.systemHeader}>
                  <View style={[styles.systemIcon, { backgroundColor: getStatusColor(system.status) + '15' }]}>
                    {getSystemIcon(system.name)}
                  </View>
                  {getStatusIcon(system.status)}
                </View>
                
                <Text style={[styles.systemName, { color: theme.colors.text }]}>
                  {system.name}
                </Text>
                
                <View style={styles.systemStatus}>
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(system.status) }]} />
                  <Text style={[styles.statusText, { color: getStatusColor(system.status) }]}>
                    {system.status}
                  </Text>
                </View>
                
                <View style={styles.systemMetrics}>
                  <View style={styles.systemMetric}>
                    <Clock size={12} color={theme.colors.textSecondary} />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Uptime
                    </Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {system.uptime}%
                    </Text>
                  </View>
                  
                  {system.metrics?.responseTime && (
                    <View style={styles.systemMetric}>
                      <Zap size={12} color={theme.colors.textSecondary} />
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Response
                      </Text>
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {system.metrics.responseTime}ms
                      </Text>
                    </View>
                  )}
                  
                  {system.metrics?.errorRate && (
                    <View style={styles.systemMetric}>
                      <AlertCircle size={12} color={theme.colors.textSecondary} />
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                        Errors
                      </Text>
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                        {system.metrics.errorRate}%
                      </Text>
                    </View>
                  )}
                </View>
                
                <Text style={[styles.lastCheck, { color: theme.colors.textSecondary }]}>
                  Last check: {system.lastCheck}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.operationalReadiness}>
        <View style={[styles.readinessCard, { backgroundColor: overallHealth === 'healthy' ? 'rgba(16, 185, 129, 0.08)' : overallHealth === 'degraded' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(239, 68, 68, 0.08)', borderColor: overallHealth === 'healthy' ? '#10B981' + '30' : overallHealth === 'degraded' ? '#F59E0B' + '30' : '#EF4444' + '30', borderWidth: 1 }]}>
          <View style={styles.readinessHeader}>
            <View style={[styles.readinessIcon, { backgroundColor: overallHealth === 'healthy' ? '#10B981' + '20' : overallHealth === 'degraded' ? '#F59E0B' + '20' : '#EF4444' + '20' }]}>
              <CheckCircle size={20} color={overallHealth === 'healthy' ? '#10B981' : overallHealth === 'degraded' ? '#F59E0B' : '#EF4444'} />
            </View>
            <View style={styles.readinessHeaderInfo}>
              <Text style={[styles.readinessLabel, { color: theme.colors.textSecondary }]}>
                Operational Readiness
              </Text>
              <Text style={[styles.readinessSubtitle, { color: theme.colors.textSecondary }]}>
                Systems operational status
              </Text>
            </View>
          </View>
          <Text style={[styles.readinessValue, { color: overallHealth === 'healthy' ? '#10B981' : overallHealth === 'degraded' ? '#F59E0B' : '#EF4444' }]}>
            {overallHealth === 'healthy' ? 'Fully Operational' : overallHealth === 'degraded' ? 'Partially Operational' : 'Critical Issues'}
          </Text>
          <Text style={[styles.readinessSubtext, { color: theme.colors.textSecondary }]}>
            {systems.filter(s => s.status === 'healthy').length} of {systems.length} systems healthy
          </Text>
        </View>
      </View>

      <View style={[styles.insightsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.insightItem}>
          <Flame size={14} color="#F59E0B" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            Payroll system scheduled maintenance in 2 hours
          </Text>
        </View>
        <View style={styles.insightItem}>
          <Sparkles size={14} color="#10B981" />
          <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
            All HRIS systems operating at 99.9% uptime
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  overallBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  overallText: {
    fontSize: 12,
    fontWeight: '700',
  },
  dataQualitySection: {
    marginBottom: 16,
  },
  dataQualityCard: {
    padding: 18,
    borderRadius: 16,
  },
  dataQualityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  dataQualityIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataQualityHeaderInfo: {
    flex: 1,
  },
  dataQualityLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dataQualitySubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  dataQualityValue: {
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 14,
  },
  dataQualityBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  dataQualityFill: {
    height: '100%',
    borderRadius: 5,
  },
  systemsSection: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  systemsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  systemCard: {
    width: 180,
    padding: 16,
    borderRadius: 14,
  },
  systemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  systemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  systemMetrics: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  systemMetric: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  metricLabel: {
    fontSize: 10,
    opacity: 0.7,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  lastCheck: {
    fontSize: 10,
    opacity: 0.6,
  },
  operationalReadiness: {
    marginBottom: 16,
  },
  readinessCard: {
    padding: 18,
    borderRadius: 16,
  },
  readinessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  readinessIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readinessHeaderInfo: {
    flex: 1,
  },
  readinessLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  readinessSubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  readinessValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  readinessSubtext: {
    fontSize: 12,
    opacity: 0.8,
  },
  insightsSection: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 12,
  },
  insightItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightText: {
    fontSize: 11,
    opacity: 0.8,
    flex: 1,
  },
});