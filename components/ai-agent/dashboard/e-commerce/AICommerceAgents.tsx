import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Zap, 
  Brain, 
  Target, 
  TrendingUp, 
  Activity,
  CheckCircle,
  Clock
} from 'lucide-react-native';

interface CommerceAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  performanceScore: number;
  revenueImpact: string;
  optimizationContribution: string;
  keyMetrics: {
    label: string;
    value: string;
  }[];
  status: 'active' | 'learning' | 'idle';
  activityLevel: 'high' | 'medium' | 'low';
}

const mockCommerceAgents: CommerceAgent[] = [
  {
    id: 'nova',
    name: 'Agent Nova',
    role: 'Revenue Optimization Agent',
    avatar: '🚀',
    performanceScore: 94,
    revenueImpact: '$2.8B',
    optimizationContribution: '+18%',
    keyMetrics: [
      { label: 'Revenue Managed', value: '$2.8B' },
      { label: 'Conversion Lift', value: '+18%' },
      { label: 'Optimization Actions', value: '842K' },
    ],
    status: 'active',
    activityLevel: 'high',
  },
  {
    id: 'pulse',
    name: 'Agent Pulse',
    role: 'Customer Behavior Agent',
    avatar: '📊',
    performanceScore: 91,
    revenueImpact: '$1.2B',
    optimizationContribution: '+12%',
    keyMetrics: [
      { label: 'Users Tracked', value: '48M' },
      { label: 'Predictions Made', value: '128M' },
      { label: 'Accuracy', value: '96%' },
    ],
    status: 'active',
    activityLevel: 'high',
  },
  {
    id: 'prism',
    name: 'Agent Prism',
    role: 'Pricing Intelligence Agent',
    avatar: '💎',
    performanceScore: 89,
    revenueImpact: '$890M',
    optimizationContribution: '+14%',
    keyMetrics: [
      { label: 'Prices Optimized', value: '82M SKUs' },
      { label: 'Margin Improvement', value: '+14%' },
      { label: 'Demand Sensitivity', value: 'High' },
    ],
    status: 'active',
    activityLevel: 'medium',
  },
  {
    id: 'orbit',
    name: 'Agent Orbit',
    role: 'Inventory Forecast Agent',
    avatar: '📦',
    performanceScore: 87,
    revenueImpact: '$650M',
    optimizationContribution: '+10%',
    keyMetrics: [
      { label: 'SKU Forecasted', value: '45M' },
      { label: 'Stockout Reduction', value: '-22%' },
      { label: 'Carry Cost Savings', value: '$12M' },
    ],
    status: 'active',
    activityLevel: 'medium',
  },
  {
    id: 'flux',
    name: 'Agent Flux',
    role: 'Marketing Optimization Agent',
    avatar: '🎯',
    performanceScore: 92,
    revenueImpact: '$1.5B',
    optimizationContribution: '+16%',
    keyMetrics: [
      { label: 'Campaigns Optimized', value: '12.4K' },
      { label: 'ROAS Improvement', value: '+28%' },
      { label: 'Budget Efficiency', value: '+18%' },
    ],
    status: 'active',
    activityLevel: 'high',
  },
  {
    id: 'catalyst',
    name: 'Agent Catalyst',
    role: 'Personalization Engine',
    avatar: '✨',
    performanceScore: 88,
    revenueImpact: '$980M',
    optimizationContribution: '+15%',
    keyMetrics: [
      { label: 'Recommendations Made', value: '284M' },
      { label: 'Click-through Rate', value: '+34%' },
      { label: 'Conversion Uplift', value: '+22%' },
    ],
    status: 'active',
    activityLevel: 'high',
  },
];

export default function AICommerceAgents() {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#22C55E';
      case 'learning': return '#F59E0B';
      case 'idle': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getActivityColor = (level: string) => {
    switch (level) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#22C55E';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>AI E-Commerce Agents</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>Autonomous commerce intelligence agents</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {mockCommerceAgents.map((agent) => (
          <View 
            key={agent.id}
            style={[styles.agentCard, { backgroundColor: theme.colors.background, borderColor: '#38BDF8' + '30' }]}
          >
            {/* Agent Header */}
            <View style={styles.agentHeader}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{agent.avatar}</Text>
                <View style={[
                  styles.statusIndicator, 
                  { backgroundColor: getStatusColor(agent.status) }
                ]} />
              </View>
              <View style={styles.agentInfo}>
                <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
                <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>{agent.role}</Text>
              </View>
              <View style={[
                styles.activityBadge, 
                { backgroundColor: getActivityColor(agent.activityLevel) + '20' }
              ]}>
                <View style={[
                  styles.activityDot, 
                  { backgroundColor: getActivityColor(agent.activityLevel) }
                ]} />
              </View>
            </View>

            {/* Performance Score */}
            <View style={styles.performanceSection}>
              <View style={styles.performanceHeader}>
                <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>Performance Score</Text>
                <Text style={[styles.performanceScore, { color: '#38BDF8' }]}>{agent.performanceScore}%</Text>
              </View>
              <View style={styles.performanceBar}>
                <View 
                  style={[
                    styles.performanceFill, 
                    { backgroundColor: '#38BDF8', width: `${agent.performanceScore}%` }
                  ]} 
                />
              </View>
            </View>

            {/* Revenue Impact */}
            <View style={styles.impactSection}>
              <Text style={[styles.impactLabel, { color: theme.colors.textSecondary }]}>Revenue Impact</Text>
              <Text style={[styles.impactValue, { color: '#22C55E' }]}>{agent.revenueImpact}</Text>
              <Text style={[styles.contribution, { color: '#38BDF8' }]}>{agent.optimizationContribution} contribution</Text>
            </View>

            {/* Key Metrics */}
            <View style={styles.metricsSection}>
              {agent.keyMetrics.map((metric, index) => (
                <View key={index} style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{metric.label}</Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
                </View>
              ))}
            </View>

            {/* Status */}
            <View style={styles.statusSection}>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: getStatusColor(agent.status) + '20' }
              ]}>
                <CheckCircle size={12} color={getStatusColor(agent.status)} />
                <Text style={[
                  styles.statusText, 
                  { color: getStatusColor(agent.status) }
                ]}>
                  {agent.status.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
  },
  agentCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 32,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#05070A',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 12,
  },
  activityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  performanceSection: {
    marginBottom: 16,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  performanceLabel: {
    fontSize: 12,
  },
  performanceScore: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  performanceBar: {
    height: 6,
    backgroundColor: '#1F2937',
    borderRadius: 3,
    overflow: 'hidden',
  },
  performanceFill: {
    height: '100%',
    borderRadius: 3,
  },
  impactSection: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#22C55E' + '10',
    borderRadius: 8,
  },
  impactLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  impactValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contribution: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsSection: {
    marginBottom: 16,
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  metricLabel: {
    fontSize: 12,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});