import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Users, Crown, Network, Brain, Zap, Shield, Activity, 
  BarChart3, Target, Settings, Layers, TrendingUp, 
  Globe, Briefcase, Sparkles, ArrowRight, BarChart3, DollarSign, 
  MessageSquare 
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function AiAgentsEmployeesPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const HIERARCHY_TIERS = [
    {
      id: 'tier0',
      name: 'Governance & Ethics',
      icon: Crown,
      color: '#FFD700',
      count: 2,
      description: 'AI Ethics Board & CISO-AI oversight',
      components: ['AI Ethics Board', 'CISO-AI'],
      route: '/ai-agent/hierarchy/governance'
    },
    {
      id: 'tier1',
      name: 'C-Suite Executives',
      icon: Crown,
      color: '#8B5CF6',
      count: 17,
      description: '17 executives including CDAO & CAO',
      route: '/ai-agent/hierarchy/c-suite'
    },
    {
      id: 'tier2',
      name: 'Intelligence Layer',
      icon: Brain,
      color: '#7C3AED',
      count: 3,
      description: 'Predictive Engine, Sentiment Core, Anomaly Detector',
      components: ['Predictive Engine', 'Sentiment Core', 'Anomaly Detector'],
      route: '/ai-agent/hierarchy/intelligence'
    },
    {
      id: 'tier3',
      name: 'Layer Bridge',
      icon: Network,
      color: '#3B82F6',
      count: 1,
      description: 'Digital Interface for seamless communication',
      components: ['Digital Interface'],
      route: '/ai-agent/hierarchy/bridge'
    },
    {
      id: 'tier4',
      name: 'Advanced Command Center',
      icon: Zap,
      color: '#F59E0B',
      count: 7,
      description: 'CDOO, DDO, WOL, AOD, PRED, SWARM, LEARN',
      components: ['CDOO', 'DDO', 'WOL', 'AOD', 'PRED', 'SWARM', 'LEARN'],
      route: '/ai-agent/hierarchy/command-center'
    },
    {
      id: 'tier5',
      name: 'Departments',
      icon: Briefcase,
      color: '#10B981',
      count: 21,
      description: '21 major business functions',
      route: '/ai-agent/hierarchy/departments'
    },
    {
      id: 'tier6',
      name: 'AI Agent Workforce',
      icon: Users,
      color: '#EC4899',
      count: 199,
      description: '199 specialized agents with advanced capabilities',
      route: '/ai-agent/hierarchy/workforce'
    }
  ];

  const AGENT_TYPES = [
    {
      type: 'reactive',
      name: 'Reactive Agents',
      description: 'Waits for request and responds',
      percentage: '100%',
      icon: Activity,
      color: '#3B82F6'
    },
    {
      type: 'learning',
      name: 'Learning Agents',
      description: 'Improves from every interaction',
      percentage: '60%',
      icon: Brain,
      color: '#8B5CF6'
    },
    {
      type: 'swarm',
      name: 'Swarm Agents',
      description: 'Teams up dynamically for complex tasks',
      percentage: 'On-demand',
      icon: Zap,
      color: '#F59E0B'
    }
  ];

  const TOKEN_STATS = [
    { label: 'Cost per Request', value: '$0.0045', icon: DollarSign, color: '#10B981' },
    { label: 'Monthly Cost', value: '$450', icon: TrendingUp, color: '#3B82F6' },
    { label: 'Accuracy', value: '95%', icon: Target, color: '#8B5CF6' },
    { label: 'Token Savings', value: '89%', icon: Sparkles, color: '#F59E0B' }
  ];

  const WORKFORCE_STATS = [
    { label: 'Total Agents', value: '199+', icon: Users, color: '#34C759' },
    { label: 'Hierarchy Tiers', value: '7', icon: Layers, color: '#007AFF' },
    { label: 'Departments', value: '21', icon: Briefcase, color: '#FF9500' },
    { label: 'Active Now', value: '199', icon: Activity, color: '#8B5CF6' }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF620' }]}>
          <Users size={56} color="#8B5CF6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Agents & Employees</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Advanced AI Workforce with 7-Tier Hierarchy Architecture
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>199+ Agents</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <Layers size={12} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>7 Tiers</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Sparkles size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>89% Savings</Text>
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

      {/* Token Optimization Stats */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Token Optimization</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Advanced hierarchical architecture with intelligent routing, caching, and batching for maximum efficiency.
        </Text>
        <View style={styles.statsContainer}>
          {TOKEN_STATS.map((stat, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <stat.icon size={20} color={stat.color} />
              <Text style={[styles.statValueSmall, { color: theme.colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabelSmall, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Agent Types */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Types</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Three specialized agent types designed for different use cases and scenarios.
        </Text>
        {AGENT_TYPES.map((agentType) => (
          <View key={agentType.type} style={[styles.agentTypeCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentTypeIcon, { backgroundColor: agentType.color + '20' }]}>
              <agentType.icon size={32} color={agentType.color} />
            </View>
            <View style={styles.agentTypeInfo}>
              <Text style={[styles.agentTypeName, { color: theme.colors.text }]}>{agentType.name}</Text>
              <Text style={[styles.agentTypeDesc, { color: theme.colors.textSecondary }]}>{agentType.description}</Text>
              <View style={[styles.percentageBadge, { backgroundColor: agentType.color + '20' }]}>
                <Text style={[styles.percentageText, { color: agentType.color }]}>{agentType.percentage}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Hierarchy Tiers */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Hierarchy Tiers</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          7-tier organizational structure from governance down to individual agents.
        </Text>
        {HIERARCHY_TIERS.map((tier) => (
          <TouchableOpacity
            key={tier.id}
            onPress={() => router.push(tier.route as any)}
            style={[styles.tierCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
          >
            <View style={[styles.tierIcon, { backgroundColor: tier.color + '20' }]}>
              <tier.icon size={32} color={tier.color} />
            </View>
            <View style={styles.tierInfo}>
              <View style={styles.tierHeader}>
                <Text style={[styles.tierName, { color: theme.colors.text }]}>{tier.name}</Text>
                <View style={[styles.countBadge, { backgroundColor: tier.color + '20' }]}>
                  <Text style={[styles.countText, { color: tier.color }]}>{tier.count}</Text>
                </View>
              </View>
              <Text style={[styles.tierDesc, { color: theme.colors.textSecondary }]}>{tier.description}</Text>
              {tier.components && (
                <View style={styles.componentPreview}>
                  {tier.components.slice(0, 3).map((component, i) => (
                    <View key={i} style={[styles.componentChip, { backgroundColor: tier.color + '15' }]}>
                      <Text style={[styles.componentChipText, { color: tier.color }]}>{component}</Text>
                    </View>
                  ))}
                  {tier.components.length > 3 && (
                    <Text style={[styles.moreText, { color: theme.colors.textSecondary }]}>+{tier.components.length - 3} more</Text>
                  )}
                </View>
              )}
            </View>
            <ArrowRight size={24} color={tier.color} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/hierarchy')}
            style={[styles.actionButton, { backgroundColor: '#8B5CF615' }]}
          >
            <Network size={28} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Full Hierarchy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/workflow-automation')}
            style={[styles.actionButton, { backgroundColor: '#3B82F615' }]}
          >
            <Zap size={28} color="#3B82F6" />
            <Text style={[styles.actionText, { color: '#3B82F6' }]}>Workflows</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/analytics-dashboard')}
            style={[styles.actionButton, { backgroundColor: '#10B98115' }]}
          >
            <BarChart3 size={28} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/agent-collaboration')}
            style={[styles.actionButton, { backgroundColor: '#3B82F615' }]}
          >
            <MessageSquare size={28} color="#3B82F6" />
            <Text style={[styles.actionText, { color: '#3B82F6' }]}>Collaboration</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/ai-workforce-architecture')}
            style={[styles.actionButton, { backgroundColor: '#10B98115' }]}
          >
            <Layers size={28} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Architecture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/performance')}
            style={[styles.actionButton, { backgroundColor: '#F59E0B15' }]}
          >
            <BarChart3 size={28} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Performance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/team-management')}
            style={[styles.actionButton, { backgroundColor: '#EC489915' }]}
          >
            <Target size={28} color="#EC4899" />
            <Text style={[styles.actionText, { color: '#EC4899' }]}>Management</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Builder Setup CTA */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Build Your Own Agent</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Create custom AI agents tailored to your specific business needs using our advanced builder setup.
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/ai-agent/agent-builder-setup')}
          style={[styles.builderButton, { backgroundColor: '#8B5CF6' }]}
        >
          <Settings size={24} color="white" />
          <Text style={styles.builderButtonText}>Open Agent Builder Setup</Text>
          <Sparkles size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Agent Features */}
      <AgentFeatures agentId="" agentName="" />
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
  statValueSmall: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabelSmall: {
    fontSize: 11,
    textAlign: 'center',
  },
  section: {
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  agentTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 16,
  },
  agentTypeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentTypeInfo: {
    flex: 1,
    gap: 4,
  },
  agentTypeName: {
    fontSize: 16,
    fontWeight: '600',
  },
  agentTypeDesc: {
    fontSize: 14,
  },
  percentageBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 16,
  },
  tierIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tierInfo: {
    flex: 1,
    gap: 4,
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tierName: {
    fontSize: 16,
    fontWeight: '600',
  },
  tierDesc: {
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
  componentPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  componentChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  componentChipText: {
    fontSize: 11,
    fontWeight: '500',
  },
  moreText: {
    fontSize: 11,
    marginTop: 2,
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
  builderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  builderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
