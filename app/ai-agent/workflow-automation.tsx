import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Zap, Workflow, Play, Pause, Settings, Plus, Trash2, Edit2, 
  ArrowRight, Clock, CheckCircle, AlertCircle, TrendingUp, 
  Users, Target, Layers, ChevronRight
} from 'lucide-react-native';

export default function WorkflowAutomationPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

  const WORKFLOW_TEMPLATES = [
    {
      id: 'customer-onboarding',
      name: 'Customer Onboarding',
      icon: Users,
      color: '#3B82F6',
      description: 'Automated customer onboarding process with multiple agents',
      steps: [
        { agent: 'Customer Experience Agent', action: 'Send welcome email' },
        { agent: 'Sales Agent', action: 'Schedule demo call' },
        { agent: 'Support Agent', action: 'Setup account access' },
        { agent: 'Training Agent', action: 'Assign training modules' }
      ],
      status: 'active',
      executionCount: 1247,
      avgDuration: '2.3 hours',
      successRate: '98.5%'
    },
    {
      id: 'lead-qualification',
      name: 'Lead Qualification',
      icon: Target,
      color: '#10B981',
      description: 'AI-powered lead scoring and qualification workflow',
      steps: [
        { agent: 'Marketing Agent', action: 'Analyze lead source' },
        { agent: 'Sales Agent', action: 'Score lead quality' },
        { agent: 'Data Agent', action: 'Enrich lead data' },
        { agent: 'Sales Agent', action: 'Route to appropriate rep' }
      ],
      status: 'active',
      executionCount: 3421,
      avgDuration: '45 minutes',
      successRate: '94.2%'
    },
    {
      id: 'incident-response',
      name: 'Incident Response',
      icon: AlertCircle,
      color: '#EF4444',
      description: 'Automated incident detection and response workflow',
      steps: [
        { agent: 'Security Agent', action: 'Detect security incident' },
        { agent: 'DevOps Agent', action: 'Assess impact level' },
        { agent: 'Communication Agent', action: 'Notify stakeholders' },
        { agent: 'Engineering Agent', action: 'Initiate remediation' }
      ],
      status: 'active',
      executionCount: 156,
      avgDuration: '15 minutes',
      successRate: '99.1%'
    },
    {
      id: 'report-generation',
      name: 'Report Generation',
      icon: TrendingUp,
      color: '#8B5CF6',
      description: 'Automated business intelligence and reporting workflow',
      steps: [
        { agent: 'Data Agent', action: 'Collect data from sources' },
        { agent: 'Analytics Agent', action: 'Process and analyze data' },
        { agent: 'Reporting Agent', action: 'Generate visualizations' },
        { agent: 'Communication Agent', action: 'Distribute reports' }
      ],
      status: 'paused',
      executionCount: 892,
      avgDuration: '1.2 hours',
      successRate: '96.8%'
    }
  ];

  const WORKFLOW_STATS = [
    { label: 'Active Workflows', value: '12', icon: Play, color: '#10B981' },
    { label: 'Total Executions', value: '5.7K', icon: Zap, color: '#3B82F6' },
    { label: 'Success Rate', value: '97.2%', icon: CheckCircle, color: '#8B5CF6' },
    { label: 'Avg Duration', value: '52m', icon: Clock, color: '#F59E0B' }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF620' }]}>
          <Workflow size={56} color="#8B5CF6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Workflow Automation</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          AI-powered workflow automation with multi-agent coordination
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Zap size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>12 Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#3B82F622' }]}>
            <Play size={12} color="#3B82F6" />
            <Text style={[styles.badgeText, { color: '#3B82F6' }]}>5.7K Runs</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <Layers size={12} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>Multi-Agent</Text>
          </View>
        </View>
      </View>

      {/* Workflow Stats */}
      <View style={styles.statsContainer}>
        {WORKFLOW_STATS.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={24} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Create New Workflow */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <TouchableOpacity 
          style={[styles.createWorkflowButton, { backgroundColor: '#8B5CF6' }]}
          onPress={() => router.push('/ai-agent/workflow-builder')}
        >
          <Plus size={24} color="white" />
          <Text style={styles.createWorkflowText}>Create New Workflow</Text>
          <ChevronRight size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Workflow Templates */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Workflow Templates</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Pre-built workflow templates for common business processes
        </Text>
        
        {WORKFLOW_TEMPLATES.map((workflow) => (
          <TouchableOpacity
            key={workflow.id}
            onPress={() => setSelectedWorkflow(selectedWorkflow === workflow.id ? null : workflow.id)}
            style={[styles.workflowCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
          >
            <View style={[styles.workflowHeader, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
              <View style={[styles.workflowIcon, { backgroundColor: workflow.color + '20' }]}>
                <workflow.icon size={32} color={workflow.color} />
              </View>
              <View style={styles.workflowInfo}>
                <View style={styles.workflowTitleRow}>
                  <Text style={[styles.workflowName, { color: theme.colors.text }]}>{workflow.name}</Text>
                  <View style={[
                    styles.statusBadge, 
                    { backgroundColor: workflow.status === 'active' ? '#10B98120' : '#F59E0B20' }
                  ]}>
                    <View style={[
                      styles.statusDot, 
                      { backgroundColor: workflow.status === 'active' ? '#10B981' : '#F59E0B' }
                    ]} />
                    <Text style={[
                      styles.statusText,
                      { color: workflow.status === 'active' ? '#10B981' : '#F59E0B' }
                    ]}>
                      {workflow.status}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.workflowDesc, { color: theme.colors.textSecondary }]}>{workflow.description}</Text>
              </View>
              <ChevronRight 
                size={24} 
                color={theme.colors.textSecondary} 
                style={[selectedWorkflow === workflow.id && styles.chevronRotated]}
              />
            </View>

            {selectedWorkflow === workflow.id && (
              <View style={styles.workflowDetails}>
                <View style={styles.subsection}>
                  <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Workflow Steps</Text>
                  {workflow.steps.map((step, index) => (
                    <View key={index} style={styles.stepItem}>
                      <View style={[styles.stepNumber, { backgroundColor: workflow.color }]}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                      </View>
                      <View style={styles.stepContent}>
                        <Text style={[styles.stepAgent, { color: theme.colors.text }]}>{step.agent}</Text>
                        <Text style={[styles.stepAction, { color: theme.colors.textSecondary }]}>{step.action}</Text>
                      </View>
                      {index < workflow.steps.length - 1 && (
                        <ArrowRight size={20} color={workflow.color} />
                      )}
                    </View>
                  ))}
                </View>

                <View style={styles.metricsGrid}>
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Executions</Text>
                    <Text style={[styles.metricValue, { color: workflow.color }]}>{workflow.executionCount}</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Avg Duration</Text>
                    <Text style={[styles.metricValue, { color: workflow.color }]}>{workflow.avgDuration}</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Success Rate</Text>
                    <Text style={[styles.metricValue, { color: workflow.color }]}>{workflow.successRate}</Text>
                  </View>
                </View>

                <View style={styles.workflowActions}>
                  <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
                    onPress={() => {}}
                  >
                    <Edit2 size={18} color="white" />
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: workflow.status === 'active' ? '#F59E0B' : '#10B981' }]}
                    onPress={() => {}}
                  >
                    {workflow.status === 'active' ? <Pause size={18} color="white" /> : <Play size={18} color="white" />}
                    <Text style={styles.actionButtonText}>
                      {workflow.status === 'active' ? 'Pause' : 'Start'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: '#EF4444' }]}
                    onPress={() => {}}
                  >
                    <Trash2 size={18} color="white" />
                    <Text style={styles.actionButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/workflow-builder')}
            style={[styles.quickActionButton, { backgroundColor: '#8B5CF615' }]}
          >
            <Workflow size={28} color="#8B5CF6" />
            <Text style={[styles.quickActionText, { color: '#8B5CF6' }]}>Workflow Builder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/ai-agents-employees')}
            style={[styles.quickActionButton, { backgroundColor: '#10B98115' }]}
          >
            <Users size={28} color="#10B981" />
            <Text style={[styles.quickActionText, { color: '#10B981' }]}>Manage Agents</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/performance')}
            style={[styles.quickActionButton, { backgroundColor: '#F59E0B15' }]}
          >
            <TrendingUp size={28} color="#F59E0B" />
            <Text style={[styles.quickActionText, { color: '#F59E0B' }]}>Analytics</Text>
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
    marginBottom: 16,
  },
  createWorkflowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  createWorkflowText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  workflowCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  workflowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    gap: 16,
  },
  workflowIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  workflowInfo: {
    flex: 1,
  },
  workflowTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  workflowName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  workflowDesc: {
    fontSize: 14,
  },
  chevronRotated: {
    transform: [{ rotate: '90deg' }],
  },
  workflowDetails: {
    marginTop: 16,
    gap: 20,
  },
  subsection: {
    gap: 12,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepAgent: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  stepAction: {
    fontSize: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  workflowActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});