import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Users, Activity, Brain, Zap, Target, Settings, Layers, 
  TrendingUp, Shield, Briefcase, Award, ArrowRight 
} from 'lucide-react-native';

export default function WorkforcePage() {
  const { theme } = useTheme();
  const router = useRouter();

  const AGENT_TYPES = [
    {
      type: 'reactive',
      name: 'Reactive Agents',
      icon: Activity,
      color: '#3B82F6',
      description: 'Waits for requests and responds with intelligent answers',
      percentage: '100%',
      count: '199',
      examples: ['Customer Support', 'FAQ Agents', 'Information Retrieval'],
      features: [
        '24/7 Availability',
        'Instant Response',
        'Knowledge Base Integration',
        'Multi-language Support',
        'Context Awareness'
      ]
    },
    {
      type: 'learning',
      name: 'Learning Agents',
      icon: Brain,
      color: '#8B5CF6',
      description: 'Self-improves from every interaction for better accuracy',
      percentage: '60%',
      count: '120',
      examples: ['Sentiment Analysis', 'Pattern Recognition', 'Anomaly Detection'],
      features: [
        'Continuous Learning',
        'Performance Improvement',
        'Knowledge Accumulation',
        'Adaptive Responses',
        'Error Reduction'
      ]
    },
    {
      type: 'swarm',
      name: 'Swarm Agents',
      icon: Zap,
      color: '#F59E0B',
      description: 'Teams up dynamically for complex multi-agent tasks',
      percentage: 'On-demand',
      count: 'Unlimited',
      examples: ['Black Friday Surge', 'Crisis Response', 'Complex Analysis'],
      features: [
        'Dynamic Scaling',
        'Load Balancing',
        'Parallel Processing',
        'Self-Organization',
        'Fault Tolerance'
      ]
    }
  ];

  const WORKFORCE_LEVELS = [
    {
      level: 'VP & Directors',
      count: 45,
      color: '#8B5CF6',
      icon: Briefcase,
      description: 'Senior leadership managing departmental strategy'
    },
    {
      level: 'Managers',
      count: 68,
      color: '#3B82F6',
      icon: Users,
      description: 'Mid-level leaders driving team execution'
    },
    {
      level: 'Team Leads',
      count: 56,
      color: '#10B981',
      icon: Target,
      description: 'Technical leaders guiding daily activities'
    },
    {
      level: 'Specialists',
      count: 30,
      color: '#F59E0B',
      icon: Award,
      description: 'Domain experts executing specialized tasks'
    }
  ];

  const WORKFORCE_STATS = [
    { label: 'Total Agents', value: '199', icon: Users, color: '#3B82F6' },
    { label: 'Agent Types', value: '3', icon: Layers, color: '#8B5CF6' },
    { label: 'Hierarchy Levels', value: '4', icon: Target, color: '#10B981' },
    { label: 'Avg Efficiency', value: '18x', icon: TrendingUp, color: '#F59E0B' }
  ];

  const PERFORMANCE_METRICS = [
    { metric: 'Response Time', value: '&lt;1.5s', improvement: '+45%' },
    { metric: 'Accuracy Rate', value: '95%', improvement: '+12%' },
    { metric: 'Task Completion', value: '98.5%', improvement: '+8%' },
    { metric: 'Cost Savings', value: '89%', improvement: '+34%' }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#EC489920' }]}>
          <Users size={56} color="#EC4899" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Agent Workforce</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Tier 6 - 199 Specialized AI Agents
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#EC489922' }]}>
            <Users size={12} color="#EC4899" />
            <Text style={[styles.badgeText, { color: '#EC4899' }]}>199 Agents</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#3B82F622' }]}>
            <Activity size={12} color="#3B82F6" />
            <Text style={[styles.badgeText, { color: '#3B82F6' }]}>3 Types</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Zap size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>18x Efficiency</Text>
          </View>
        </View>
      </View>

      {/* Workforce Stats */}
      <View style={styles.statsContainer}>
        {WORKFORCE_STATS.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={24} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Overview */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Agent Workforce is the operational tier of the hierarchy, consisting of 199 specialized 
          AI agents organized across 4 hierarchy levels. Each agent has specific capabilities and is 
          designed for particular business functions. The workforce operates under three agent types - 
          Reactive, Learning, and Swarm - enabling intelligent, adaptive, and scalable operations.
        </Text>
      </View>

      {/* Agent Types */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Types</Text>
        {AGENT_TYPES.map((agentType) => (
          <View key={agentType.type} style={[styles.agentTypeCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentTypeHeader, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
              <View style={[styles.agentTypeIcon, { backgroundColor: agentType.color + '20' }]}>
                <agentType.icon size={32} color={agentType.color} />
              </View>
              <View style={styles.agentTypeTitle}>
                <Text style={[styles.agentTypeName, { color: theme.colors.text }]}>{agentType.name}</Text>
                <Text style={[styles.agentTypeDesc, { color: theme.colors.textSecondary }]}>{agentType.description}</Text>
              </View>
              <View style={[styles.percentageBadge, { backgroundColor: agentType.color + '20' }]}>
                <Text style={[styles.percentageText, { color: agentType.color }]}>{agentType.percentage}</Text>
              </View>
            </View>

            <View style={styles.agentTypeDetails}>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Count</Text>
                <Text style={[styles.detailValue, { color: agentType.color }]}>{agentType.count}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Type</Text>
                <Text style={[styles.detailValue, { color: agentType.color }]}>{agentType.type}</Text>
              </View>
            </View>

            <View style={styles.subsection}>
              <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Examples</Text>
              <View style={styles.examplesGrid}>
                {agentType.examples.map((example, i) => (
                  <View key={i} style={[styles.exampleChip, { backgroundColor: agentType.color + '15' }]}>
                    <Text style={[styles.exampleText, { color: agentType.color }]}>{example}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.subsection}>
              <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Key Features</Text>
              {agentType.features.map((feature, i) => (
                <View key={i} style={styles.listItem}>
                  <View style={[styles.bullet, { backgroundColor: agentType.color }]} />
                  <Text style={[styles.listText, { color: theme.colors.textSecondary }]}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Workforce Levels */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Workforce Levels</Text>
        {WORKFORCE_LEVELS.map((level) => (
          <TouchableOpacity
            key={level.level}
            onPress={() => router.push('/ai-agent/hierarchy')}
            style={[styles.levelCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
          >
            <View style={[styles.levelIcon, { backgroundColor: level.color + '20' }]}>
              <level.icon size={28} color={level.color} />
            </View>
            <View style={styles.levelInfo}>
              <View style={styles.levelHeader}>
                <Text style={[styles.levelName, { color: theme.colors.text }]}>{level.level}</Text>
                <View style={[styles.countBadge, { backgroundColor: level.color + '20' }]}>
                  <Text style={[styles.countText, { color: level.color }]}>{level.count}</Text>
                </View>
              </View>
              <Text style={[styles.levelDesc, { color: theme.colors.textSecondary }]}>{level.description}</Text>
            </View>
            <ArrowRight size={20} color={level.color} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Performance Metrics */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Aggregate performance across the entire AI workforce
        </Text>
        <View style={styles.metricsGrid}>
          {PERFORMANCE_METRICS.map((metric) => (
            <View key={metric.metric} style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricName, { color: theme.colors.textSecondary }]}>{metric.metric}</Text>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
              <View style={styles.improvementBadge}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.improvementText, { color: '#10B981' }]}>{metric.improvement}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy/departments')}
            style={[styles.actionButton, { backgroundColor: '#3B82F615' }]}
          >
            <Briefcase size={28} color="#3B82F6" />
            <Text style={[styles.actionText, { color: '#3B82F6' }]}>View Departments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/performance')}
            style={[styles.actionButton, { backgroundColor: '#10B98115' }]}
          >
            <TrendingUp size={28} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Performance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/team-management')}
            style={[styles.actionButton, { backgroundColor: '#8B5CF615' }]}
          >
            <Users size={28} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Management</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/ai-workforce-architecture')}
            style={[styles.actionButton, { backgroundColor: '#F59E0B15' }]}
          >
            <Layers size={28} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Architecture</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    padding: 24,
    borderBottomWidth: 1,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  agentTypeCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  agentTypeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
    gap: 16,
  },
  agentTypeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentTypeTitle: {
    flex: 1,
  },
  agentTypeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  agentTypeDesc: {
    fontSize: 14,
  },
  percentageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  agentTypeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  examplesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  exampleChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  exampleText: {
    fontSize: 12,
    fontWeight: '500',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  listText: {
    fontSize: 14,
    flex: 1,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 16,
  },
  levelIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelInfo: {
    flex: 1,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  levelName: {
    fontSize: 16,
    fontWeight: '600',
  },
  levelDesc: {
    fontSize: 14,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  metricName: {
    fontSize: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  improvementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  improvementText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});