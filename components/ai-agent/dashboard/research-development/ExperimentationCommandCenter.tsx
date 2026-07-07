import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { FlaskConical, TrendingUp, CheckCircle, AlertCircle, Zap, Activity, Target, Clock } from 'lucide-react-native';

export default function ExperimentationCommandCenter() {
  const { theme } = useTheme();

  const experimentMetrics = [
    {
      id: 'active-experiments',
      label: 'Active Experiments',
      value: '1,247',
      change: '+89',
      trend: 'up',
      icon: FlaskConical,
      color: '#0B8AFF'
    },
    {
      id: 'success-rate',
      label: 'Success Rate',
      value: '72.4%',
      change: '+3.2%',
      trend: 'up',
      icon: CheckCircle,
      color: '#10B981'
    },
    {
      id: 'avg-duration',
      label: 'Avg Duration',
      value: '14 days',
      change: '-2 days',
      trend: 'up',
      icon: Clock,
      color: '#8B5CF6'
    },
    {
      id: 'resource-efficiency',
      label: 'Resource Efficiency',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Zap,
      color: '#F59E0B'
    }
  ];

  const activeExperiments = [
    {
      id: 'exp-001',
      name: 'Quantum Computing Optimization',
      hypothesis: 'Qubit coherence time can be extended by 40%',
      status: 'running',
      progress: 67,
      successProbability: 78,
      daysRemaining: 12,
      team: 'Quantum Research Lab'
    },
    {
      id: 'exp-002',
      name: 'Neural Network Architecture',
      hypothesis: 'New architecture reduces training time by 60%',
      status: 'running',
      progress: 45,
      successProbability: 85,
      daysRemaining: 8,
      team: 'AI Research Team'
    },
    {
      id: 'exp-003',
      name: 'Material Science Testing',
      hypothesis: 'New alloy improves battery efficiency by 25%',
      status: 'analysis',
      progress: 92,
      successProbability: 92,
      daysRemaining: 3,
      team: 'Materials Lab'
    }
  ];

  const hypothesisTracking = [
    { category: 'Validated', count: 342, color: '#10B981' },
    { category: 'In Progress', count: 156, color: '#0B8AFF' },
    { category: 'Rejected', count: 89, color: '#EF4444' },
    { category: 'Pending', count: 67, color: '#F59E0B' }
  ];

  const resourceConsumption = [
    { resource: 'Compute Hours', used: 12400, total: 18000, color: '#0B8AFF' },
    { resource: 'Lab Equipment', used: 78, total: 100, color: '#8B5CF6' },
    { resource: 'Research Hours', used: 8900, total: 12000, color: '#10B981' },
    { resource: 'Budget Utilized', used: 67, total: 100, color: '#F59E0B' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <FlaskConical size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Experimentation Command Center
          </Text>
        </View>
      </View>

      {/* Experiment Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {experimentMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <View 
              key={metric.id}
              style={[
                styles.metricCard,
                { 
                  backgroundColor: metric.color + '15',
                  borderColor: metric.color + '30'
                }
              ]}
            >
              <View style={[styles.iconContainer, { backgroundColor: metric.color + '25' }]}>
                <Icon size={20} color={metric.color} />
              </View>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                {metric.label}
              </Text>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                {metric.value}
              </Text>
              <View style={styles.metricChange}>
                <Activity size={12} color="#22C55E" />
                <Text style={[styles.metricChangeText, { color: '#22C55E' }]}>
                  {metric.change}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Active Experiments */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Active Experiments
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {activeExperiments.map((experiment) => (
            <View 
              key={experiment.id}
              style={[
                styles.experimentCard,
                { 
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border
                }
              ]}
            >
              <View style={styles.experimentHeader}>
                <Text style={[styles.experimentName, { color: theme.colors.text }]}>
                  {experiment.name}
                </Text>
                <View style={[
                  styles.statusBadge,
                  { 
                    backgroundColor: experiment.status === 'running' ? '#0B8AFF' + '20' : '#F59E0B' + '20'
                  }
                ]}>
                  <Activity size={10} color={experiment.status === 'running' ? '#0B8AFF' : '#F59E0B'} />
                  <Text style={[
                    styles.statusText,
                    { 
                      color: experiment.status === 'running' ? '#0B8AFF' : '#F59E0B'
                    }
                  ]}>
                    {experiment.status}
                  </Text>
                </View>
              </View>

              <Text style={[styles.hypothesis, { color: theme.colors.textSecondary }]}>
                {experiment.hypothesis}
              </Text>

              <View style={styles.experimentMetrics}>
                <View style={styles.experimentMetric}>
                  <Target size={14} color="#0B8AFF" />
                  <Text style={[styles.metricText, { color: theme.colors.textSecondary }]}>
                    Progress
                  </Text>
                  <Text style={[styles.metricValueText, { color: theme.colors.text }]}>
                    {experiment.progress}%
                  </Text>
                </View>
                <View style={styles.experimentMetric}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.metricText, { color: theme.colors.textSecondary }]}>
                    Success Probability
                  </Text>
                  <Text style={[styles.metricValueText, { color: theme.colors.text }]}>
                    {experiment.successProbability}%
                  </Text>
                </View>
                <View style={styles.experimentMetric}>
                  <Clock size={14} color="#8B5CF6" />
                  <Text style={[styles.metricText, { color: theme.colors.textSecondary }]}>
                    Days Remaining
                  </Text>
                  <Text style={[styles.metricValueText, { color: theme.colors.text }]}>
                    {experiment.daysRemaining}
                  </Text>
                </View>
              </View>

              <View style={styles.progressSection}>
                <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                  <View 
                    style={[
                      styles.progressFill,
                      { 
                        backgroundColor: experiment.status === 'running' ? '#0B8AFF' : '#F59E0B',
                        width: `${experiment.progress}%`
                      }
                    ]} 
                  />
                </View>
              </View>

              <Text style={[styles.teamLabel, { color: theme.colors.textSecondary }]}>
                {experiment.team}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Hypothesis Tracking */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Hypothesis Tracking
        </Text>
        <View style={styles.hypothesisGrid}>
          {hypothesisTracking.map((item) => (
            <View key={item.category} style={styles.hypothesisCard}>
              <View style={[styles.hypothesisDot, { backgroundColor: item.color }]} />
              <Text style={[styles.hypothesisLabel, { color: theme.colors.textSecondary }]}>
                {item.category}
              </Text>
              <Text style={[styles.hypothesisCount, { color: theme.colors.text }]}>
                {item.count}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Resource Consumption */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Resource Consumption
        </Text>
        <View style={styles.resourceGrid}>
          {resourceConsumption.map((item) => {
            const percentage = Math.round((item.used / item.total) * 100);
            return (
              <View key={item.resource} style={styles.resourceItem}>
                <View style={styles.resourceHeader}>
                  <Text style={[styles.resourceLabel, { color: theme.colors.text }]}>
                    {item.resource}
                  </Text>
                  <Text style={[styles.resourcePercentage, { color: item.color }]}>
                    {percentage}%
                  </Text>
                </View>
                <View style={[styles.resourceBar, { backgroundColor: theme.colors.border }]}>
                  <View 
                    style={[
                      styles.resourceBarFill,
                      { 
                        backgroundColor: item.color,
                        width: `${percentage}%`
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.resourceDetail, { color: theme.colors.textSecondary }]}>
                  {item.used.toLocaleString()} / {item.total.toLocaleString()}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Research Efficiency */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Research Efficiency
        </Text>
        <View style={styles.efficiencyGrid}>
          <View style={[styles.efficiencyCard, { backgroundColor: theme.colors.background }]}>
            <Zap size={20} color="#F59E0B" />
            <Text style={[styles.efficiencyLabel, { color: theme.colors.textSecondary }]}>
              Experiment Velocity
            </Text>
            <Text style={[styles.efficiencyValue, { color: theme.colors.text }]}>
              2.8x
            </Text>
            <Text style={[styles.efficiencyTrend, { color: '#22C55E' }]}>
              +0.4x improvement
            </Text>
          </View>

          <View style={[styles.efficiencyCard, { backgroundColor: theme.colors.background }]}>
            <CheckCircle size={20} color="#10B981" />
            <Text style={[styles.efficiencyLabel, { color: theme.colors.textSecondary }]}>
              Hypothesis Validation Rate
            </Text>
            <Text style={[styles.efficiencyValue, { color: theme.colors.text }]}>
              67%
            </Text>
            <Text style={[styles.efficiencyTrend, { color: '#22C55E' }]}>
              +5% improvement
            </Text>
          </View>

          <View style={[styles.efficiencyCard, { backgroundColor: theme.colors.background }]}>
            <Target size={20} color="#8B5CF6" />
            <Text style={[styles.efficiencyLabel, { color: theme.colors.textSecondary }]}>
              Resource Optimization
            </Text>
            <Text style={[styles.efficiencyValue, { color: theme.colors.text }]}>
              87%
            </Text>
            <Text style={[styles.efficiencyTrend, { color: '#22C55E' }]}>
              +3% improvement
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
  iconContainer: {
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
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricChangeText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  section: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  experimentCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  experimentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  experimentName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  hypothesis: {
    fontSize: 12,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  experimentMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  experimentMetric: {
    flex: 1,
    alignItems: 'center',
  },
  metricText: {
    fontSize: 10,
    marginBottom: 4,
  },
  metricValueText: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressSection: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  teamLabel: {
    fontSize: 11,
  },
  hypothesisGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hypothesisCard: {
    width: '23%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  hypothesisDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  hypothesisLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  hypothesisCount: {
    fontSize: 18,
    fontWeight: '700',
  },
  resourceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resourceItem: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 16,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resourceLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  resourcePercentage: {
    fontSize: 14,
    fontWeight: '600',
  },
  resourceBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  resourceBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  resourceDetail: {
    fontSize: 11,
  },
  efficiencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  efficiencyCard: {
    width: '31%',
    marginRight: '2%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  efficiencyLabel: {
    fontSize: 11,
    marginTop: 8,
    marginBottom: 4,
  },
  efficiencyValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  efficiencyTrend: {
    fontSize: 11,
  },
});