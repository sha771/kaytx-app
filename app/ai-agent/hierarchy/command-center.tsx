import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Zap, Crown, Target, Brain, Activity, Shield, Settings, TrendingUp, Award, Users, Briefcase } from 'lucide-react-native';

export default function CommandCenterPage() {
  const { theme } = useTheme();

  const COMMAND_COMPONENTS = [
    {
      id: 'cdoo',
      name: 'Chief Digital & Operations Officer',
      acronym: 'CDOO',
      icon: Crown,
      color: '#F59E0B',
      function: 'Orchestrates all digital operations and AI strategy',
      responsibilities: [
        'AI Strategy Execution',
        'Performance Management',
        'Cross-Department Coordination',
        'Digital Transformation',
        'Operational Excellence'
      ],
      reportsTo: 'CEO & Board',
      teamSize: '45 direct reports',
      status: 'Active'
    },
    {
      id: 'ddo',
      name: 'Digital Director of Operations',
      acronym: 'DDO',
      icon: Target,
      color: '#3B82F6',
      function: 'Manages day-to-day digital operations and workforce coordination',
      responsibilities: [
        'Daily Operations Oversight',
        'Workforce Scheduling',
        'Performance Monitoring',
        'Incident Response',
        'Resource Allocation'
      ],
      reportsTo: 'CDOO',
      teamSize: '28 direct reports',
      status: 'Active'
    },
    {
      id: 'wol',
      name: 'Workforce Optimization Lead',
      acronym: 'WOL',
      icon: Users,
      color: '#10B981',
      function: 'Optimizes AI workforce performance and efficiency',
      responsibilities: [
        'Performance Analytics',
        'Efficiency Optimization',
        'Capacity Planning',
        'Workload Balancing',
        'Skill Gap Analysis'
      ],
      reportsTo: 'DDO',
      teamSize: '12 direct reports',
      status: 'Active'
    },
    {
      id: 'aod',
      name: 'Automation Operations Director',
      acronym: 'AOD',
      icon: Activity,
      color: '#EC4899',
      function: 'Manages automation pipelines and workflow orchestration',
      responsibilities: [
        'Automation Pipeline Management',
        'Workflow Orchestration',
        'Process Optimization',
        'Automation Monitoring',
        'Integration Management'
      ],
      reportsTo: 'DDO',
      teamSize: '18 direct reports',
      status: 'Active'
    },
    {
      id: 'pred',
      name: 'Predictive Operations Director',
      acronym: 'PRED',
      icon: Brain,
      color: '#7C3AED',
      function: 'Leverages predictive intelligence for proactive operations',
      responsibilities: [
        'Predictive Analytics',
        'Forecast Management',
        'Proactive Planning',
        'Risk Assessment',
        'Trend Analysis'
      ],
      reportsTo: 'CDOO',
      teamSize: '15 direct reports',
      status: 'Active'
    },
    {
      id: 'swarm',
      name: 'Swarm Operations Director',
      acronym: 'SWARM',
      icon: Zap,
      color: '#F59E0B',
      function: 'Coordinates swarm intelligence for complex multi-agent tasks',
      responsibilities: [
        'Swarm Coordination',
        'Agent Teaming',
        'Complex Task Orchestration',
        'Dynamic Scaling',
        'Swarm Optimization'
      ],
      reportsTo: 'CDOO',
      teamSize: '8 direct reports',
      status: 'Active'
    },
    {
      id: 'learn',
      name: 'Learning Operations Director',
      acronym: 'LEARN',
      icon: Award,
      color: '#8B5CF6',
      function: 'Manages AI learning, training, and continuous improvement',
      responsibilities: [
        'Learning Management',
        'Training Coordination',
        'Knowledge Sharing',
        'Performance Improvement',
        'Model Updates'
      ],
      reportsTo: 'CDOO',
      teamSize: '10 direct reports',
      status: 'Active'
    }
  ];

  const COMMAND_STATS = [
    { label: 'Total Components', value: '7', icon: Briefcase, color: '#3B82F6' },
    { label: 'Direct Reports', value: '136', icon: Users, color: '#10B981' },
    { label: 'Commands Issued', value: '45.8M', icon: Zap, color: '#F59E0B' },
    { label: 'Efficiency Rate', value: '97.2%', icon: TrendingUp, color: '#8B5CF6' }
  ];

  const COMMAND_FLOW = [
    { level: 1, name: 'CDOO', description: 'Strategic oversight and AI strategy execution' },
    { level: 2, name: 'DDO', description: 'Daily operations and workforce coordination' },
    { level: 3, name: 'WOL/AOD', description: 'Workforce optimization and automation operations' },
    { level: 4, name: 'PRED/SWARM/LEARN', description: 'Specialized operations (predictive, swarm, learning)' }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F59E0B20' }]}>
          <Zap size={56} color="#F59E0B" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Advanced Command Center</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Tier 4 - Strategic Operations & Orchestration
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#F59E0B22' }]}>
            <Zap size={12} color="#F59E0B" />
            <Text style={[styles.badgeText, { color: '#F59E0B' }]}>7 Components</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Activity size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <Crown size={12} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>Command Hub</Text>
          </View>
        </View>
      </View>

      {/* Command Stats */}
      <View style={styles.statsContainer}>
        {COMMAND_STATS.map((stat, i) => (
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
          The Advanced Command Center serves as the strategic operations hub for the entire AI workforce. 
          It orchestrates digital operations, manages workforce coordination, and executes AI strategy across 
          all departments. The 7 specialized components work together to ensure optimal performance, 
          efficiency, and continuous improvement of the AI workforce.
        </Text>
      </View>

      {/* Command Flow */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Command Flow</Text>
        {COMMAND_FLOW.map((flow) => (
          <View key={flow.level} style={[styles.flowCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.flowLevel, { backgroundColor: '#F59E0B' }]}>
              <Text style={styles.flowLevelText}>{flow.level}</Text>
            </View>
            <View style={styles.flowInfo}>
              <Text style={[styles.flowName, { color: theme.colors.text }]}>{flow.name}</Text>
              <Text style={[styles.flowDesc, { color: theme.colors.textSecondary }]}>{flow.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Command Components */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Command Components</Text>
        {COMMAND_COMPONENTS.map((component) => (
          <View key={component.id} style={[styles.componentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.componentHeader, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
              <View style={[styles.componentIcon, { backgroundColor: component.color + '20' }]}>
                <component.icon size={32} color={component.color} />
              </View>
              <View style={styles.componentTitle}>
                <View style={styles.componentNameRow}>
                  <Text style={[styles.componentName, { color: theme.colors.text }]}>{component.name}</Text>
                  <View style={[styles.acronymBadge, { backgroundColor: component.color + '20' }]}>
                    <Text style={[styles.acronymText, { color: component.color }]}>{component.acronym}</Text>
                  </View>
                </View>
                <Text style={[styles.componentFunction, { color: theme.colors.textSecondary }]}>{component.function}</Text>
              </View>
            </View>

            <View style={styles.componentDetails}>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Reports To</Text>
                <Text style={[styles.detailValue, { color: theme.colors.text }]}>{component.reportsTo}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Team Size</Text>
                <Text style={[styles.detailValue, { color: theme.colors.text }]}>{component.teamSize}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>Status</Text>
                <View style={[styles.statusBadge, { backgroundColor: '#10B98120' }]}>
                  <Activity size={12} color="#10B981" />
                  <Text style={[styles.statusText, { color: '#10B981' }]}>{component.status}</Text>
                </View>
              </View>
            </View>

            <View style={styles.subsection}>
              <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
              {component.responsibilities.map((resp, i) => (
                <View key={i} style={styles.listItem}>
                  <View style={[styles.bullet, { backgroundColor: component.color }]} />
                  <Text style={[styles.listText, { color: theme.colors.textSecondary }]}>{resp}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Integration Overview */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Integration Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The Command Center integrates with all hierarchy tiers:
        </Text>
        <View style={styles.integrationList}>
          <View style={styles.integrationItem}>
            <Shield size={20} color="#DC2626" />
            <Text style={[styles.integrationText, { color: theme.colors.text }]}>
              <Text style={{ fontWeight: '600' }}>Governance:</Text> Receives ethics policies and security guidelines
            </Text>
          </View>
          <View style={styles.integrationItem}>
            <Crown size={20} color="#FFD700" />
            <Text style={[styles.integrationText, { color: theme.colors.text }]}>
              <Text style={{ fontWeight: '600' }}>C-Suite:</Text> Executes strategic directives and reports performance
            </Text>
          </View>
          <View style={styles.integrationItem}>
            <Brain size={20} color="#7C3AED" />
            <Text style={[styles.integrationText, { color: theme.colors.text }]}>
              <Text style={{ fontWeight: '600' }}>Intelligence Layer:</Text> Leverages predictive insights for operations
            </Text>
          </View>
          <View style={styles.integrationItem}>
            <Target size={20} color="#10B981" />
            <Text style={[styles.integrationText, { color: theme.colors.text }]}>
              <Text style={{ fontWeight: '600' }}>Departments:</Text> Coordinates operations across 21 departments
            </Text>
          </View>
          <View style={styles.integrationItem}>
            <Users size={20} color="#EC4899" />
            <Text style={[styles.integrationText, { color: theme.colors.text }]}>
              <Text style={{ fontWeight: '600' }}>AI Workforce:</Text> Manages and optimizes 199+ AI agents
            </Text>
          </View>
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
    marginBottom: 12,
  },
  flowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 16,
  },
  flowLevel: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flowLevelText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  flowInfo: {
    flex: 1,
  },
  flowName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  flowDesc: {
    fontSize: 14,
  },
  componentCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  componentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    marginBottom: 16,
    gap: 16,
  },
  componentIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentTitle: {
    flex: 1,
  },
  componentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  componentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  acronymBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  acronymText: {
    fontSize: 12,
    fontWeight: '600',
  },
  componentFunction: {
    fontSize: 14,
  },
  componentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  subsection: {
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
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
  integrationList: {
    gap: 12,
  },
  integrationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
  },
  integrationText: {
    fontSize: 14,
    flex: 1,
  },
});