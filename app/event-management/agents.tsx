import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Calendar, MapPin, Ticket, Users, DollarSign, Shield,
  Zap, CheckCircle, TrendingUp, Activity, Clock, Target,
  ArrowRight, Brain, Network, Sparkles
} from 'lucide-react-native';

export default function EventManagementAgents() {
  const router = useRouter();

  const AGENTS = [
    {
      id: 'agent-planner',
      name: 'Agent Planner',
      role: 'Event Planning Agent',
      icon: Calendar,
      color: '#06B6D4',
      status: 'active',
      efficiency: '94%',
      responsibilities: [
        'Event scheduling',
        'Timeline management',
        'Resource allocation',
        'Planning automation'
      ],
      metrics: [
        { label: 'Events Planned', value: '847', trend: '+12%' },
        { label: 'Schedule Accuracy', value: '96%', trend: '+3%' },
        { label: 'Planning Efficiency', value: '89%', trend: '+5%' },
        { label: 'Tasks Completed', value: '12.4K', trend: '+18%' }
      ],
      recentActivity: [
        'Optimized Tech Summit 2026 timeline',
        'Allocated resources for Global Conference',
        'Automated 324 planning tasks'
      ]
    },
    {
      id: 'agent-venue',
      name: 'Agent Venue',
      role: 'Venue Operations Agent',
      icon: MapPin,
      color: '#8B5CF6',
      status: 'active',
      efficiency: '91%',
      responsibilities: [
        'Venue preparation',
        'Seating optimization',
        'Facility management',
        'Capacity monitoring'
      ],
      metrics: [
        { label: 'Venues Managed', value: '2,450', trend: '+5%' },
        { label: 'Capacity Utilization', value: '87%', trend: '+4%' },
        { label: 'Operational Success', value: '94%', trend: '+2%' },
        { label: 'Facility Readiness', value: '98%', trend: '+1%' }
      ],
      recentActivity: [
        'Optimized seating for Music Festival',
        'Completed facility prep for 47 venues',
        'Monitored capacity for 12 live events'
      ]
    },
    {
      id: 'agent-ticket',
      name: 'Agent Ticket',
      role: 'Ticketing Agent',
      icon: Ticket,
      color: '#10B981',
      status: 'active',
      efficiency: '96%',
      responsibilities: [
        'Ticket sales',
        'QR validation',
        'Registration automation',
        'Fraud prevention'
      ],
      metrics: [
        { label: 'Tickets Processed', value: '9.4M', trend: '+15%' },
        { label: 'Revenue Generated', value: '$5.8B', trend: '+18%' },
        { label: 'Check-in Accuracy', value: '99%', trend: '+1%' },
        { label: 'Fraud Prevented', value: '847', trend: '+22%' }
      ],
      recentActivity: [
        'Processed 124K tickets today',
        'Validated 89K QR codes',
        'Blocked 12 fraudulent attempts'
      ]
    },
    {
      id: 'agent-connect',
      name: 'Agent Connect',
      role: 'Attendee Experience Agent',
      icon: Users,
      color: '#F59E0B',
      status: 'active',
      efficiency: '92%',
      responsibilities: [
        'Networking recommendations',
        'Personalized agendas',
        'Notifications',
        'Satisfaction monitoring'
      ],
      metrics: [
        { label: 'Attendees Assisted', value: '4.2M', trend: '+8%' },
        { label: 'Engagement Score', value: '94%', trend: '+6%' },
        { label: 'Satisfaction Rate', value: '4.8/5', trend: '+5%' },
        { label: 'Connections Made', value: '1.2M', trend: '+14%' }
      ],
      recentActivity: [
        'Generated 8.4K networking matches',
        'Personalized 12K attendee agendas',
        'Sent 45K engagement notifications'
      ]
    },
    {
      id: 'agent-sponsor',
      name: 'Agent Sponsor',
      role: 'Sponsorship Agent',
      icon: DollarSign,
      color: '#FFD700',
      status: 'active',
      efficiency: '89%',
      responsibilities: [
        'Sponsor management',
        'ROI tracking',
        'Partnership analytics',
        'Brand visibility'
      ],
      metrics: [
        { label: 'Sponsors Managed', value: '3,240', trend: '+10%' },
        { label: 'Revenue Impact', value: '$920M', trend: '+22%' },
        { label: 'Sponsor ROI', value: '3.8x', trend: '+15%' },
        { label: 'Brand Exposure', value: '156M', trend: '+18%' }
      ],
      recentActivity: [
        'Optimized 47 sponsor activations',
        'Generated ROI reports for 120 sponsors',
        'Increased brand visibility by 18%'
      ]
    },
    {
      id: 'agent-guardian',
      name: 'Agent Guardian',
      role: 'Security & Risk Agent',
      icon: Shield,
      color: '#EC4899',
      status: 'active',
      efficiency: '97%',
      responsibilities: [
        'Crowd monitoring',
        'Emergency planning',
        'Access control',
        'Incident detection'
      ],
      metrics: [
        { label: 'Incidents Prevented', value: '12,847', trend: '+25%' },
        { label: 'Security Score', value: '98%', trend: '+2%' },
        { label: 'Response Time', value: '45s', trend: '-15%' },
        { label: 'Threats Detected', value: '847', trend: '+18%' }
      ],
      recentActivity: [
        'Prevented 124 potential incidents',
        'Monitored 847K attendees',
        'Responded to 12 alerts in 38s avg'
      ]
    }
  ];

  const AGENT_STATS = [
    { label: 'Total Agents', value: '6', icon: Brain, color: '#06B6D4' },
    { label: 'Active Now', value: '6', icon: Activity, color: '#10B981' },
    { label: 'Avg Efficiency', value: '93%', icon: Target, color: '#8B5CF6' },
    { label: 'Tasks Today', value: '124K', icon: Zap, color: '#F59E0B' },
  ];

  const SWARM_METRICS = [
    { label: 'Collaboration Score', value: '94%', icon: Network, color: '#8B5CF6', trend: '+8%' },
    { label: 'Tasks Coordinated', value: '847K', icon: Zap, color: '#06B6D4', trend: '+22%' },
    { label: 'Cross-Agent Events', value: '1,260', icon: Calendar, color: '#10B981', trend: '+12%' },
    { label: 'Response Time', value: '0.8s', icon: Clock, color: '#F59E0B', trend: '-15%' },
  ];

  const AGENT_COLLABORATION = [
    { from: 'Agent Planner', to: 'Agent Venue', strength: 87, type: 'Resource Allocation' },
    { from: 'Agent Planner', to: 'Agent Ticket', strength: 92, type: 'Schedule Sync' },
    { from: 'Agent Venue', to: 'Agent Guardian', strength: 95, type: 'Security Coord' },
    { from: 'Agent Ticket', to: 'Agent Connect', strength: 89, type: 'Attendee Data' },
    { from: 'Agent Sponsor', to: 'Agent Connect', strength: 84, type: 'Engagement Data' },
    { from: 'Agent Guardian', to: 'Agent Venue', strength: 91, type: 'Capacity Alerts' },
  ];

  const TASK_DISTRIBUTION = [
    { agent: 'Agent Planner', tasks: 324, completed: 298, color: '#06B6D4' },
    { agent: 'Agent Venue', tasks: 287, completed: 265, color: '#8B5CF6' },
    { agent: 'Agent Ticket', tasks: 412, completed: 398, color: '#10B981' },
    { agent: 'Agent Connect', tasks: 198, completed: 185, color: '#F59E0B' },
    { agent: 'Agent Sponsor', tasks: 156, completed: 142, color: '#FFD700' },
    { agent: 'Agent Guardian', tasks: 89, completed: 87, color: '#EC4899' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Brain size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>AI Event Agents</Text>
          <Text style={styles.headerSubtitle}>Autonomous Event Operations Agents</Text>
        </View>
      </View>

      {/* Agent Stats */}
      <View style={styles.statsContainer}>
        {AGENT_STATS.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderColor: stat.color + '40' }]}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Agents List */}
      <View style={styles.agentsSection}>
        <Text style={styles.sectionTitle}>Active Agents</Text>
        {AGENTS.map((agent) => (
          <View key={agent.id} style={[styles.agentCard, { borderColor: agent.color + '40' }]}>
            {/* Agent Header */}
            <View style={styles.agentHeader}>
              <View style={[styles.agentIconLarge, { backgroundColor: agent.color + '20' }]}>
                <agent.icon size={40} color={agent.color} />
              </View>
              <View style={styles.agentHeaderInfo}>
                <View style={styles.agentNameRow}>
                  <Text style={styles.agentName}>{agent.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: agent.color + '20' }]}>
                    <Activity size={12} color={agent.color} />
                    <Text style={[styles.statusText, { color: agent.color }]}>{agent.status}</Text>
                  </View>
                </View>
                <Text style={styles.agentRole}>{agent.role}</Text>
                <View style={styles.efficiencyRow}>
                  <Text style={styles.efficiencyLabel}>Efficiency:</Text>
                  <Text style={[styles.efficiencyValue, { color: agent.color }]}>{agent.efficiency}</Text>
                </View>
              </View>
            </View>

            {/* Responsibilities */}
            <View style={styles.responsibilitiesSection}>
              <Text style={styles.subsectionTitle}>Responsibilities</Text>
              <View style={styles.responsibilitiesList}>
                {agent.responsibilities.map((resp, index) => (
                  <View key={index} style={styles.responsibilityItem}>
                    <CheckCircle size={14} color={agent.color} />
                    <Text style={styles.responsibilityText}>{resp}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Metrics */}
            <View style={styles.metricsSection}>
              <Text style={styles.subsectionTitle}>Performance Metrics</Text>
              <View style={styles.metricsGrid}>
                {agent.metrics.map((metric, index) => (
                  <View key={index} style={[styles.metricCard, { backgroundColor: agent.color + '10' }]}>
                    <Text style={styles.metricValue}>{metric.value}</Text>
                    <Text style={styles.metricLabel}>{metric.label}</Text>
                    <View style={[styles.metricTrend, { backgroundColor: agent.color + '20' }]}>
                      <TrendingUp size={10} color={agent.color} />
                      <Text style={[styles.metricTrendText, { color: agent.color }]}>{metric.trend}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.activitySection}>
              <Text style={styles.subsectionTitle}>Recent Activity</Text>
              {agent.recentActivity.map((activity, index) => (
                <View key={index} style={styles.activityItem}>
                  <Clock size={14} color="#9CA3AF" />
                  <Text style={styles.activityText}>{activity}</Text>
                </View>
              ))}
            </View>

            {/* Action Button */}
            <TouchableOpacity
              style={[styles.agentButton, { backgroundColor: agent.color }]}
              onPress={() => router.push('/event-management/dashboard')}
            >
              <Text style={styles.agentButtonText}>View Agent Details</Text>
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Swarm Intelligence Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Swarm Intelligence Metrics</Text>
        <View style={styles.swarmMetricsGrid}>
          {SWARM_METRICS.map((metric, index) => (
            <View key={index} style={[styles.swarmMetricCard, { borderColor: metric.color + '40' }]}>
              <View style={[styles.swarmMetricIcon, { backgroundColor: metric.color + '20' }]}>
                <metric.icon size={24} color={metric.color} />
              </View>
              <Text style={styles.swarmMetricValue}>{metric.value}</Text>
              <Text style={styles.swarmMetricLabel}>{metric.label}</Text>
              <View style={[styles.swarmMetricTrend, { backgroundColor: metric.color + '20' }]}>
                <TrendingUp size={10} color={metric.color} />
                <Text style={[styles.swarmMetricTrendText, { color: metric.color }]}>{metric.trend}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Agent Collaboration Network */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Agent Collaboration Network</Text>
        <Text style={styles.sectionDescription}>Real-time cross-agent communication and coordination</Text>
        <View style={styles.collaborationCard}>
          {AGENT_COLLABORATION.map((collab, index) => (
            <View key={index} style={styles.collaborationItem}>
              <View style={styles.collaborationAgents}>
                <View style={[styles.collaborationAgentBadge, { backgroundColor: '#06B6D420' }]}>
                  <Text style={styles.collaborationAgentName}>{collab.from}</Text>
                </View>
                <ArrowRight size={16} color="#9CA3AF" />
                <View style={[styles.collaborationAgentBadge, { backgroundColor: '#8B5CF620' }]}>
                  <Text style={styles.collaborationAgentName}>{collab.to}</Text>
                </View>
              </View>
              <View style={styles.collaborationDetails}>
                <Text style={styles.collaborationType}>{collab.type}</Text>
                <View style={styles.collaborationStrength}>
                  <Text style={styles.collaborationStrengthLabel}>Strength:</Text>
                  <View style={styles.collaborationStrengthBar}>
                    <View 
                      style={[
                        styles.collaborationStrengthFill, 
                        { width: `${collab.strength}%`, backgroundColor: '#8B5CF6' }
                      ]} 
                    />
                  </View>
                  <Text style={styles.collaborationStrengthValue}>{collab.strength}%</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Task Distribution */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Distribution</Text>
        <Text style={styles.sectionDescription}>Real-time workload across autonomous agents</Text>
        {TASK_DISTRIBUTION.map((task, index) => (
          <View key={index} style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskAgent}>{task.agent}</Text>
              <View style={styles.taskStats}>
                <Text style={styles.taskCompleted}>{task.completed}/{task.tasks} completed</Text>
                <Text style={[styles.taskPercentage, { color: task.color }]}>
                  {Math.round((task.completed / task.tasks) * 100)}%
                </Text>
              </View>
            </View>
            <View style={styles.taskBar}>
              <View 
                style={[
                  styles.taskFill, 
                  { 
                    width: `${(task.completed / task.tasks) * 100}%`,
                    backgroundColor: task.color
                  } 
                ]} 
              />
            </View>
          </View>
        ))}
      </View>

      {/* Swarm Intelligence Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Swarm Intelligence Overview</Text>
        <Text style={styles.sectionDescription}>
          Agents collaborate dynamically for complex event operations
        </Text>
        <View style={styles.swarmCard}>
          <View style={styles.swarmIcon}>
            <Network size={48} color="#8B5CF6" />
          </View>
          <View style={styles.swarmContent}>
            <Text style={styles.swarmTitle}>Dynamic Agent Collaboration</Text>
            <Text style={styles.swarmDescription}>
              6 agents working in real-time coordination across 1,260 active events
            </Text>
            <View style={styles.swarmStats}>
              <View style={styles.swarmStat}>
                <Text style={styles.swarmStatValue}>1,260</Text>
                <Text style={styles.swarmStatLabel}>Events Monitored</Text>
              </View>
              <View style={styles.swarmStat}>
                <Text style={styles.swarmStatValue}>9.4M</Text>
                <Text style={styles.swarmStatLabel}>Attendees Tracked</Text>
              </View>
              <View style={styles.swarmStat}>
                <Text style={styles.swarmStatValue}>124K</Text>
                <Text style={styles.swarmStatLabel}>Tasks/Day</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#06B6D440',
    gap: 16,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#06B6D420',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
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
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  agentsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 16,
  },
  agentCard: {
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  agentIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentHeaderInfo: {
    flex: 1,
    gap: 6,
  },
  agentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  agentName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentRole: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  efficiencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  efficiencyLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  efficiencyValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  responsibilitiesSection: {
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  responsibilitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  responsibilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  responsibilityText: {
    fontSize: 13,
    color: '#E5E7EB',
  },
  metricsSection: {
    marginBottom: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricCard: {
    flex: 1,
    minWidth: 130,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 6,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  metricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  metricTrendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  activitySection: {
    marginBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  activityText: {
    flex: 1,
    fontSize: 13,
    color: '#E5E7EB',
  },
  agentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 12,
  },
  agentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
    marginTop: 8,
  },
  swarmMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  swarmMetricCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  swarmMetricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swarmMetricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  swarmMetricLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  swarmMetricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  swarmMetricTrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  collaborationCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
  },
  collaborationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 16,
  },
  collaborationAgents: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 280,
  },
  collaborationAgentBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  collaborationAgentName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  collaborationDetails: {
    flex: 1,
    gap: 6,
  },
  collaborationType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  collaborationStrength: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  collaborationStrengthLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  collaborationStrengthBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden',
  },
  collaborationStrengthFill: {
    height: '100%',
    borderRadius: 3,
  },
  collaborationStrengthValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  taskCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskAgent: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  taskStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  taskCompleted: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  taskPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskBar: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  taskFill: {
    height: '100%',
    borderRadius: 4,
  },
  swarmSection: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  swarmCard: {
    flexDirection: 'row',
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderColor: '#8B5CF640',
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
  swarmIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8B5CF620',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swarmContent: {
    flex: 1,
    gap: 12,
  },
  swarmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  swarmDescription: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  swarmStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  swarmStat: {
    alignItems: 'center',
  },
  swarmStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  swarmStatLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },
});
