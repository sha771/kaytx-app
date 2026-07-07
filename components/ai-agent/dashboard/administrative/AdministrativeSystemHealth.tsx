import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Server, Calendar, Mail, FileText, Zap, MessageSquare, Bot, Shield, CheckCircle, AlertTriangle, Clock, Activity, TrendingUp, Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

interface SystemComponent {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
  lastCheck: string;
  icon: string;
}

interface AdministrativeSystemHealthProps {
  systems: SystemComponent[];
}

export default function AdministrativeSystemHealth({ systems }: AdministrativeSystemHealthProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#10B981';
      case 'degraded': return '#F59E0B';
      case 'down': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle size={14} color="#10B981" />;
      case 'degraded': return <AlertTriangle size={14} color="#F59E0B" />;
      case 'down': return <AlertTriangle size={14} color="#EF4444" />;
      default: return <Clock size={14} color="#6B7280" />;
    }
  };

  const getSystemIcon = (name: string) => {
    if (name.includes('Calendar')) return <Calendar size={20} color="#3B82F6" />;
    if (name.includes('Email')) return <Mail size={20} color="#10B981" />;
    if (name.includes('Document')) return <FileText size={20} color="#F59E0B" />;
    if (name.includes('Workflow')) return <Zap size={20} color="#8B5CF6" />;
    if (name.includes('Collaboration')) return <MessageSquare size={20} color="#EC4899" />;
    if (name.includes('AI')) return <Bot size={20} color="#06B6D4" />;
    if (name.includes('Integration')) return <Shield size={20} color="#EF4444" />;
    return <Server size={20} color="#6B7280" />;
  };

  const healthyCount = systems.filter(s => s.status === 'healthy').length;
  const healthPercentage = Math.round((healthyCount / systems.length) * 100);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Server size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Administrative System Health
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Infrastructure monitoring
            </Text>
          </View>
        </View>
        <View style={[styles.healthBadge, { backgroundColor: healthPercentage >= 90 ? '#10B981' + '20' : healthPercentage >= 70 ? '#F59E0B' + '20' : '#EF4444' + '20' }]}>
          <Sparkles size={16} color={healthPercentage >= 90 ? '#10B981' : healthPercentage >= 70 ? '#F59E0B' : '#EF4444'} />
          <Text style={[styles.healthBadgeText, { color: healthPercentage >= 90 ? '#10B981' : healthPercentage >= 70 ? '#F59E0B' : '#EF4444' }]}>
            {healthPercentage}% Healthy
          </Text>
        </View>
      </View>

      <View style={styles.overviewGrid}>
        <View style={[styles.overviewCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' + '30' }]}>
          <View style={[styles.overviewIcon, { backgroundColor: '#10B981' + '20' }]}>
            <CheckCircle size={20} color="#10B981" />
          </View>
          <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
            Healthy Systems
          </Text>
          <Text style={[styles.overviewValue, { color: theme.colors.text }]}>
            {healthyCount}/{systems.length}
          </Text>
        </View>

        <View style={[styles.overviewCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' + '30' }]}>
          <View style={[styles.overviewIcon, { backgroundColor: '#F59E0B' + '20' }]}>
            <AlertTriangle size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
            Degraded
          </Text>
          <Text style={[styles.overviewValue, { color: theme.colors.text }]}>
            {systems.filter(s => s.status === 'degraded').length}
          </Text>
        </View>

        <View style={[styles.overviewCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' + '30' }]}>
          <View style={[styles.overviewIcon, { backgroundColor: '#EF4444' + '20' }]}>
            <Activity size={20} color="#EF4444" />
          </View>
          <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
            Down
          </Text>
          <Text style={[styles.overviewValue, { color: theme.colors.text }]}>
            {systems.filter(s => s.status === 'down').length}
          </Text>
        </View>

        <View style={[styles.overviewCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' + '30' }]}>
          <View style={[styles.overviewIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <TrendingUp size={20} color="#8B5CF6" />
          </View>
          <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
            Avg Uptime
          </Text>
          <Text style={[styles.overviewValue, { color: theme.colors.text }]}>
            99.7%
          </Text>
        </View>
      </View>

      <View style={[styles.systemsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.systemsHeader}>
          <Server size={20} color="#8B5CF6" />
          <Text style={[styles.systemsTitle, { color: theme.colors.text }]}>
            System Components
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.systemsScroll}>
          {systems.map((system, index) => (
            <View key={index} style={[styles.systemCard, { borderColor: getStatusColor(system.status) + '30', borderWidth: 1 }]}>
              <View style={styles.systemHeader}>
                <View style={[styles.systemIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
                  {getSystemIcon(system.name)}
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(system.status) + '20' }]}>
                  {getStatusIcon(system.status)}
                  <Text style={[styles.statusText, { color: getStatusColor(system.status) }]}>
                    {system.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={[styles.systemName, { color: theme.colors.text }]}>
                {system.name}
              </Text>

              <View style={styles.systemMetrics}>
                <View style={styles.systemMetric}>
                  <Clock size={12} color="#6B7280" />
                  <Text style={[styles.systemMetricLabel, { color: theme.colors.textSecondary }]}>
                    Uptime
                  </Text>
                  <Text style={[styles.systemMetricValue, { color: theme.colors.text }]}>
                    {system.uptime}
                  </Text>
                </View>

                <View style={styles.systemMetric}>
                  <Activity size={12} color="#6B7280" />
                  <Text style={[styles.systemMetricLabel, { color: theme.colors.textSecondary }]}>
                    Latency
                  </Text>
                  <Text style={[styles.systemMetricValue, { color: theme.colors.text }]}>
                    {system.latency}
                  </Text>
                </View>

                <View style={styles.systemMetric}>
                  <CheckCircle size={12} color="#6B7280" />
                  <Text style={[styles.systemMetricLabel, { color: theme.colors.textSecondary }]}>
                    Last Check
                  </Text>
                  <Text style={[styles.systemMetricValue, { color: theme.colors.text }]}>
                    {system.lastCheck}
                  </Text>
                </View>
              </View>

              <View style={[styles.systemProgress, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                <View 
                  style={[
                    styles.systemProgressFill, 
                    { 
                      backgroundColor: getStatusColor(system.status),
                      width: system.status === 'healthy' ? '95%' : system.status === 'degraded' ? '60%' : '20%'
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.performanceSection}>
        <View style={styles.performanceHeader}>
          <TrendingUp size={20} color="#8B5CF6" />
          <Text style={[styles.performanceTitle, { color: theme.colors.text }]}>
            Performance Metrics
          </Text>
        </View>

        <View style={styles.performanceGrid}>
          <View style={styles.performanceItem}>
            <View style={styles.performanceLeft}>
              <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
                Processing Speed
              </Text>
              <Text style={[styles.performanceValue, { color: theme.colors.text }]}>
                1.2s avg
              </Text>
            </View>
            <View style={styles.performanceTrend}>
              <ArrowDownRight size={12} color="#10B981" />
              <Text style={[styles.trendText, { color: '#10B981' }]}>
                -15%
              </Text>
            </View>
          </View>

          <View style={styles.performanceItem}>
            <View style={styles.performanceLeft}>
              <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
                Workflow Latency
              </Text>
              <Text style={[styles.performanceValue, { color: theme.colors.text }]}>
                0.8s avg
              </Text>
            </View>
            <View style={styles.performanceTrend}>
              <ArrowDownRight size={12} color="#10B981" />
              <Text style={[styles.trendText, { color: '#10B981' }]}>
                -22%
              </Text>
            </View>
          </View>

          <View style={styles.performanceItem}>
            <View style={styles.performanceLeft}>
              <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
                Integration Health
              </Text>
              <Text style={[styles.performanceValue, { color: theme.colors.text }]}>
                98.5%
              </Text>
            </View>
            <View style={styles.performanceTrend}>
              <ArrowUpRight size={12} color="#10B981" />
              <Text style={[styles.trendText, { color: '#10B981' }]}>
                +2.3%
              </Text>
            </View>
          </View>

          <View style={styles.performanceItem}>
            <View style={styles.performanceLeft}>
              <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
                Error Rate
              </Text>
              <Text style={[styles.performanceValue, { color: theme.colors.text }]}>
                0.02%
              </Text>
            </View>
            <View style={styles.performanceTrend}>
              <ArrowDownRight size={12} color="#10B981" />
              <Text style={[styles.trendText, { color: '#10B981' }]}>
                -45%
              </Text>
            </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  healthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  healthBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  overviewCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  overviewIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  overviewLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  systemsSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  systemsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  systemsTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  systemsScroll: {
    gap: 12,
  },
  systemCard: {
    width: 200,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  systemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  systemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  systemMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  systemMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  systemMetricLabel: {
    fontSize: 10,
    flex: 1,
  },
  systemMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  systemProgress: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  systemProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  performanceSection: {
    marginBottom: 8,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  performanceTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  performanceGrid: {
    gap: 8,
  },
  performanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 12,
  },
  performanceLeft: {
    flex: 1,
  },
  performanceLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  performanceTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
