import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Brain, 
  TrendingUp, 
  Globe, 
  Shield, 
  Building2, 
  Zap, 
  Lightbulb,
  ArrowLeft,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  BarChart3,
  LineChart,
  ArrowRight
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface StrategyAgent {
  id: string;
  name: string;
  codename: string;
  icon: any;
  color: string;
  status: 'active' | 'processing' | 'idle';
  responsibilities: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  recentActivity: string;
  efficiency: number;
}

const strategyAgents: StrategyAgent[] = [
  {
    id: '1',
    name: 'Chief Strategy Agent',
    codename: 'Agent Vision',
    icon: Brain,
    color: '#3B82F6',
    status: 'active',
    responsibilities: [
      'Corporate strategy development',
      'Business planning & execution',
      'Growth initiatives management',
      'Long-term forecasting & modeling'
    ],
    metrics: [
      { label: 'Strategic Initiatives', value: '24' },
      { label: 'Growth Opportunities', value: '18' },
      { label: 'Forecast Accuracy', value: '94.2%' }
    ],
    recentActivity: 'Q3 strategic roadmap updated',
    efficiency: 96
  },
  {
    id: '2',
    name: 'Financial Intelligence Agent',
    codename: 'Agent Capital',
    icon: TrendingUp,
    color: '#10B981',
    status: 'active',
    responsibilities: [
      'Financial analysis & modeling',
      'Budget optimization & allocation',
      'Capital deployment strategy',
      'Profitability analysis'
    ],
    metrics: [
      { label: 'Financial Models', value: '156' },
      { label: 'Savings Identified', value: '$2.4B' },
      { label: 'ROI Improvements', value: '+18.7%' }
    ],
    recentActivity: 'Capital allocation optimization completed',
    efficiency: 94
  },
  {
    id: '3',
    name: 'Market Intelligence Agent',
    codename: 'Agent Horizon',
    icon: Globe,
    color: '#8B5CF6',
    status: 'processing',
    responsibilities: [
      'Competitive analysis & monitoring',
      'Industry trend forecasting',
      'Market opportunity identification',
      'Customer demand analysis'
    ],
    metrics: [
      { label: 'Markets Analyzed', value: '47' },
      { label: 'Opportunities Identified', value: '32' },
      { label: 'Competitive Alerts', value: '89' }
    ],
    recentActivity: 'Competitor activity detected in APAC',
    efficiency: 92
  },
  {
    id: '4',
    name: 'Enterprise Risk Agent',
    codename: 'Agent Sentinel',
    icon: Shield,
    color: '#F59E0B',
    status: 'active',
    responsibilities: [
      'Enterprise risk monitoring',
      'Compliance & governance',
      'Crisis management & response',
      'Risk assessment & mitigation'
    ],
    metrics: [
      { label: 'Risks Detected', value: '23' },
      { label: 'Compliance Score', value: '98.5%' },
      { label: 'Issues Mitigated', value: '19' }
    ],
    recentActivity: 'Supply chain risk assessment updated',
    efficiency: 97
  },
  {
    id: '5',
    name: 'M&A Intelligence Agent',
    codename: 'Agent Fusion',
    icon: Building2,
    color: '#EC4899',
    status: 'idle',
    responsibilities: [
      'Acquisition target screening',
      'Valuation modeling & analysis',
      'Synergy identification',
      'Due diligence management'
    ],
    metrics: [
      { label: 'Deals Evaluated', value: '34' },
      { label: 'Synergies Identified', value: '$6.8B' },
      { label: 'Investment Returns', value: '+24.5%' }
    ],
    recentActivity: 'Target company analysis completed',
    efficiency: 91
  },
  {
    id: '6',
    name: 'Innovation Agent',
    codename: 'Agent Catalyst',
    icon: Lightbulb,
    color: '#06B6D4',
    status: 'active',
    responsibilities: [
      'Product innovation strategy',
      'R&D intelligence & scouting',
      'Technology trend monitoring',
      'Digital transformation roadmap'
    ],
    metrics: [
      { label: 'Ideas Generated', value: '287' },
      { label: 'Innovations Launched', value: '12' },
      { label: 'R&D Efficiency', value: '+31.2%' }
    ],
    recentActivity: 'New technology opportunity identified',
    efficiency: 95
  },
  {
    id: '7',
    name: 'Decision Intelligence Agent',
    codename: 'Agent Oracle',
    icon: Zap,
    color: '#EF4444',
    status: 'processing',
    responsibilities: [
      'Executive decision support',
      'Scenario modeling & simulation',
      'Decision impact analysis',
      'Strategic recommendation engine'
    ],
    metrics: [
      { label: 'Decisions Supported', value: '847' },
      { label: 'Recommendation Accuracy', value: '96.4%' },
      { label: 'Impact Measured', value: '$12.4B' }
    ],
    recentActivity: 'Strategic decision analysis in progress',
    efficiency: 98
  }
];

export default function AIStrategyAgents() {
  const { theme } = useTheme();
  const [selectedAgent, setSelectedAgent] = useState<StrategyAgent | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'processing': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} color="#10B981" />;
      case 'processing': return <Clock size={16} color="#F59E0B" />;
      default: return <AlertCircle size={16} color="#6B7280" />;
    }
  };

  const AgentCard = ({ agent }: { agent: StrategyAgent }) => (
    <TouchableOpacity
      style={[styles.agentCard, { backgroundColor: '#0A0F1A', borderColor: selectedAgent?.id === agent.id ? agent.color : 'rgba(255,255,255,0.1)' }]}
      onPress={() => setSelectedAgent(agent)}
    >
      <View style={styles.agentCardHeader}>
        <View style={[styles.agentIcon, { backgroundColor: `${agent.color}20` }]}>
          <agent.icon size={28} color={agent.color} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={styles.agentName}>{agent.name}</Text>
          <Text style={[styles.agentCodename, { color: agent.color }]}>{agent.codename}</Text>
        </View>
        <View style={styles.agentStatus}>
          {getStatusIcon(agent.status)}
          <Text style={[styles.agentStatusText, { color: getStatusColor(agent.status) }]}>
            {agent.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.agentMetrics}>
        {agent.metrics.map((metric, index) => (
          <View key={index} style={styles.agentMetric}>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <Text style={styles.metricValue}>{metric.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.agentFooter}>
        <View style={styles.efficiencyBar}>
          <Text style={styles.efficiencyLabel}>Efficiency</Text>
          <View style={styles.efficiencyTrack}>
            <View style={[styles.efficiencyFill, { width: `${agent.efficiency}%`, backgroundColor: agent.color }]} />
          </View>
          <Text style={styles.efficiencyValue}>{agent.efficiency}%</Text>
        </View>
        <ArrowRight size={20} color={theme.colors.secondaryText} />
      </View>
    </TouchableOpacity>
  );

  const AgentDetail = ({ agent }: { agent: StrategyAgent }) => (
    <View style={[styles.agentDetail, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.agentDetailHeader}>
        <View style={[styles.agentDetailIcon, { backgroundColor: `${agent.color}20` }]}>
          <agent.icon size={40} color={agent.color} />
        </View>
        <View style={styles.agentDetailInfo}>
          <Text style={styles.agentDetailName}>{agent.name}</Text>
          <Text style={[styles.agentDetailCodename, { color: agent.color }]}>{agent.codename}</Text>
          <View style={styles.agentDetailStatus}>
            {getStatusIcon(agent.status)}
            <Text style={[styles.agentDetailStatusText, { color: getStatusColor(agent.status) }]}>
              {agent.status.toUpperCase()}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setSelectedAgent(null)}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.agentDetailSection}>
        <Text style={styles.agentDetailSectionTitle}>Responsibilities</Text>
        <View style={styles.responsibilitiesList}>
          {agent.responsibilities.map((resp, index) => (
            <View key={index} style={styles.responsibilityItem}>
              <CheckCircle size={16} color={agent.color} />
              <Text style={styles.responsibilityText}>{resp}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.agentDetailSection}>
        <Text style={styles.agentDetailSectionTitle}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>
          {agent.metrics.map((metric, index) => (
            <View key={index} style={[styles.metricCard, { backgroundColor: `${agent.color}10`, borderColor: agent.color }]}>
              <Activity size={20} color={agent.color} />
              <Text style={styles.metricCardLabel}>{metric.label}</Text>
              <Text style={[styles.metricCardValue, { color: agent.color }]}>{metric.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.agentDetailSection}>
        <Text style={styles.agentDetailSectionTitle}>Recent Activity</Text>
        <View style={[styles.activityCard, { backgroundColor: `${agent.color}10`, borderColor: agent.color }]}>
          <Clock size={20} color={agent.color} />
          <Text style={styles.activityText}>{agent.recentActivity}</Text>
        </View>
      </View>

      <View style={styles.agentDetailSection}>
        <Text style={styles.agentDetailSectionTitle}>Efficiency Score</Text>
        <View style={styles.efficiencyDisplay}>
          <Text style={[styles.efficiencyDisplayValue, { color: agent.color }]}>{agent.efficiency}%</Text>
          <View style={styles.efficiencyDisplayTrack}>
            <View style={[styles.efficiencyDisplayFill, { width: `${agent.efficiency}%`, backgroundColor: agent.color }]} />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#03050A' }]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#0A0F1A' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>AI Strategy Agents</Text>
          <Text style={styles.headerSubtitle}>Autonomous Executive Intelligence</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.statusText}>7 Active</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {selectedAgent ? (
          <AgentDetail agent={selectedAgent} />
        ) : (
          <>
            <View style={styles.summarySection}>
              <View style={[styles.summaryCard, { backgroundColor: '#0A0F1A' }]}>
                <Brain size={32} color="#3B82F6" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryValue}>7</Text>
                  <Text style={styles.summaryLabel}>Active Agents</Text>
                </View>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: '#0A0F1A' }]}>
                <Target size={32} color="#10B981" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryValue}>847</Text>
                  <Text style={styles.summaryLabel}>Decisions Supported</Text>
                </View>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: '#0A0F1A' }]}>
                <BarChart3 size={32} color="#8B5CF6" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryValue}>94.7%</Text>
                  <Text style={styles.summaryLabel}>Avg Efficiency</Text>
                </View>
              </View>
            </View>

            <View style={styles.agentsSection}>
              <Text style={styles.sectionTitle}>Autonomous Strategy Agents</Text>
              {strategyAgents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  content: {
    flex: 1,
  },
  summarySection: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  summaryInfo: {
    flex: 1,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  agentsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  agentCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
  },
  agentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  agentCodename: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  agentStatusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  agentMetrics: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  agentMetric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  agentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  efficiencyBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  efficiencyLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  efficiencyTrack: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  efficiencyFill: {
    height: '100%',
    borderRadius: 3,
  },
  efficiencyValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  agentDetail: {
    margin: 20,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  agentDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  agentDetailIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentDetailInfo: {
    flex: 1,
    marginLeft: 16,
  },
  agentDetailName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  agentDetailCodename: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  agentDetailStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  agentDetailStatusText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  agentDetailSection: {
    marginBottom: 24,
  },
  agentDetailSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  responsibilitiesList: {
    gap: 12,
  },
  responsibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  responsibilityText: {
    flex: 1,
    fontSize: 14,
    color: '#E5E7EB',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  metricCardLabel: {
    flex: 1,
    fontSize: 12,
    color: '#9CA3AF',
  },
  metricCardValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: '#E5E7EB',
  },
  efficiencyDisplay: {
    alignItems: 'center',
  },
  efficiencyDisplayValue: {
    fontSize: 48,
    fontWeight: '800',
    marginBottom: 12,
  },
  efficiencyDisplayTrack: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  efficiencyDisplayFill: {
    height: '100%',
    borderRadius: 4,
  },
});
