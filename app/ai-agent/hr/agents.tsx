 
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Plus,
  Search,
  ListFilter,
  Users,
  DollarSign,
  Clock,
  Calendar,
  CircleCheck,
  MessageSquare,
  ChartBar,
  Star,
  Sparkles,
  UserPlus,
  UserCheck,
  Target,
  GraduationCap,
  Heart,
  Shield,
  Award,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Agent Types
interface SubAgent {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: any;
  status: 'active' | 'busy' | 'offline' | 'training';
  tasksCompleted: number;
  performance: number;
  capabilities: string[];
  lastActive: string;
  isOnline: boolean;
}

// HR Sub-Agents Data
const HR_SUB_AGENTS: SubAgent[] = [
  {
    id: 'recruiter',
    name: 'AI Recruiter',
    title: 'Talent Acquisition Specialist',
    description: 'Screens resumes, schedules interviews, and manages candidate pipeline',
    icon: UserPlus,
    status: 'active',
    tasksCompleted: 2847,
    performance: 94.2,
    capabilities: ['Resume Screening', 'Interview Scheduling', 'Candidate Ranking', 'JD Optimization'],
    lastActive: '2 min ago',
    isOnline: true,
  },
  {
    id: 'onboarding',
    name: 'Onboarding AI',
    title: 'New Hire Experience Manager',
    description: 'Manages new employee onboarding process and documentation',
    icon: UserCheck,
    status: 'active',
    tasksCompleted: 1563,
    performance: 96.8,
    capabilities: ['Welcome Packets', 'Document Collection', 'Training Coordination', 'Check-ins'],
    lastActive: '5 min ago',
    isOnline: true,
  },
  {
    id: 'payroll',
    name: 'Payroll AI',
    title: 'Compensation Specialist',
    description: 'Processes payroll, calculates taxes, and manages benefits',
    icon: DollarSign,
    status: 'active',
    tasksCompleted: 4521,
    performance: 99.1,
    capabilities: ['Payroll Processing', 'Tax Calculations', 'Benefits Admin', 'Compliance'],
    lastActive: 'Just now',
    isOnline: true,
  },
  {
    id: 'performance',
    name: 'Performance AI',
    title: 'Performance Review Manager',
    description: 'Tracks goals, manages reviews, and analyzes performance data',
    icon: Target,
    status: 'active',
    tasksCompleted: 987,
    performance: 91.5,
    capabilities: ['Goal Tracking', '360 Reviews', 'Feedback Analysis', 'Development Plans'],
    lastActive: '15 min ago',
    isOnline: true,
  },
  {
    id: 'learning',
    name: 'Learning & Development AI',
    title: 'Training Coordinator',
    description: 'Manages training programs, certifications, and skill development',
    icon: GraduationCap,
    status: 'active',
    tasksCompleted: 2156,
    performance: 93.7,
    capabilities: ['Course Management', 'Certification Tracking', 'Skill Gap Analysis', 'LMS Integration'],
    lastActive: '8 min ago',
    isOnline: true,
  },
  {
    id: 'engagement',
    name: 'Employee Engagement AI',
    title: 'Culture & Satisfaction Analyst',
    description: 'Monitors engagement, runs surveys, and suggests culture improvements',
    icon: Heart,
    status: 'active',
    tasksCompleted: 1245,
    performance: 89.3,
    capabilities: ['Pulse Surveys', 'Sentiment Analysis', 'Event Planning', 'Recognition Programs'],
    lastActive: '1 hour ago',
    isOnline: true,
  },
  {
    id: 'compliance',
    name: 'HR Compliance AI',
    title: 'Policy & Compliance Officer',
    description: 'Ensures HR compliance, manages policies, and tracks regulations',
    icon: Shield,
    status: 'active',
    tasksCompleted: 3421,
    performance: 97.5,
    capabilities: ['Policy Management', 'Audit Trails', 'Regulatory Updates', 'Risk Assessment'],
    lastActive: 'Just now',
    isOnline: true,
  },
  {
    id: 'leave',
    name: 'Leave & Attendance AI',
    title: 'Time & Absence Manager',
    description: 'Manages PTO requests, tracks attendance, and monitors patterns',
    icon: Calendar,
    status: 'active',
    tasksCompleted: 5678,
    performance: 95.8,
    capabilities: ['PTO Management', 'Attendance Tracking', 'Shift Planning', 'Overtime Calc'],
    lastActive: '3 min ago',
    isOnline: true,
  },
  {
    id: 'benefits',
    name: 'Benefits AI',
    title: 'Benefits Administration Specialist',
    description: 'Manages employee benefits, enrollment, and claims',
    icon: Award,
    status: 'active',
    tasksCompleted: 2134,
    performance: 92.6,
    capabilities: ['Enrollment', 'Claims Processing', 'Provider Management', 'Cost Analysis'],
    lastActive: '12 min ago',
    isOnline: true,
  },
  {
    id: 'analytics',
    name: 'HR Analytics AI',
    title: 'Workforce Intelligence Specialist',
    description: 'Analyzes HR metrics, generates reports, and provides insights',
    icon: ChartBar,
    status: 'active',
    tasksCompleted: 1876,
    performance: 94.9,
    capabilities: ['Turnover Analysis', 'Headcount Planning', 'Diversity Metrics', 'Cost Analytics'],
    lastActive: '20 min ago',
    isOnline: true,
  },
];

// HR Metrics
const HR_METRICS = [
  { label: 'Total Employees', value: '247', change: '+12 this month', positive: true },
  { label: 'Open Positions', value: '18', change: '-3 this week', positive: true },
  { label: 'Avg Time to Hire', value: '14 days', change: '-2 days', positive: true },
  { label: 'Employee Satisfaction', value: '4.6/5', change: '+0.2 this quarter', positive: true },
];

export default function HRAgentsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = HR_SUB_AGENTS.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.capabilities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeAgents = HR_SUB_AGENTS.filter(a => a.isOnline).length;
  const totalTasks = HR_SUB_AGENTS.reduce((sum, a) => sum + a.tasksCompleted, 0);
  const avgPerformance = HR_SUB_AGENTS.reduce((sum, a) => sum + a.performance, 0) / HR_SUB_AGENTS.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'busy': return '#F59E0B';
      case 'offline': return '#6B7280';
      case 'training': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const renderAgentCard = (agent: SubAgent, index: number) => {
    const Icon = agent.icon;

    return (
      <Animated.View
        key={agent.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.agentCard, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity
          style={styles.agentCardContent}
          onPress={() => router.push(`/ai-agent/hr/${agent.id}`)}
        >
          <View style={styles.agentHeader}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatar, { backgroundColor: colors.tint + '15' }]}>
                <Icon size={24} color={colors.tint} />
              </View>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: getStatusColor(agent.status) },
                ]}
              />
            </View>

            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: colors.text }]}>
                {agent.name}
              </Text>
              <Text style={[styles.agentTitle, { color: colors.icon }]}>
                {agent.title}
              </Text>
            </View>

            <View style={styles.performanceBadge}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={[styles.performanceText, { color: '#F59E0B' }]}>
                {agent.performance}%
              </Text>
            </View>
          </View>

          <Text style={[styles.agentDescription, { color: colors.icon }]}>
            {agent.description}
          </Text>

          <View style={styles.capabilitiesContainer}>
            {agent.capabilities.map((capability, idx) => (
              <View
                key={idx}
                style={[styles.capabilityBadge, { backgroundColor: colors.background }]}
              >
                <Text style={[styles.capabilityText, { color: colors.icon }]}>
                  {capability}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.agentStats, { borderTopColor: colors.border }]}>
            <View style={styles.stat}>
              <CircleCheck size={14} color={colors.tint} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {agent.tasksCompleted.toLocaleString()}
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>Tasks</Text>
            </View>
            <View style={styles.stat}>
              <Clock size={14} color={colors.tint} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {agent.lastActive}
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>Active</Text>
            </View>
            <TouchableOpacity
              style={[styles.chatButton, { backgroundColor: colors.tint }]}
              onPress={() => router.push(`/ai-agent/hr/${agent.id}/chat`)}
            >
              <MessageSquare size={16} color="white" />
              <Text style={styles.chatButtonText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={28} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Human Resources AI
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
            {HR_SUB_AGENTS.length} sub-agents available
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.tint }]}
          onPress={() => router.push('/ai-agent/hr/create')}
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main Agent Card */}
      <Animated.View entering={FadeIn} style={[styles.mainAgentCard, { backgroundColor: colors.tint }]}>
        <View style={styles.mainAgentHeader}>
          <View style={styles.mainAgentIcon}>
            <Users size={32} color="white" />
          </View>
          <View style={styles.mainAgentInfo}>
            <Text style={styles.mainAgentName}>HR & People Operations AI</Text>
            <Text style={styles.mainAgentTitle}>Chief People Officer AI</Text>
          </View>
          <View style={styles.mainAgentBadge}>
            <Sparkles size={16} color={colors.tint} />
            <Text style={[styles.mainAgentBadgeText, { color: colors.tint }]}>Lead</Text>
          </View>
        </View>

        <View style={styles.mainAgentStats}>
          <View style={styles.mainStat}>
            <Text style={styles.mainStatValue}>{activeAgents}</Text>
            <Text style={styles.mainStatLabel}>Active Agents</Text>
          </View>
          <View style={styles.mainStatDivider} />
          <View style={styles.mainStat}>
            <Text style={styles.mainStatValue}>{(totalTasks / 1000).toFixed(1)}K</Text>
            <Text style={styles.mainStatLabel}>Tasks Done</Text>
          </View>
          <View style={styles.mainStatDivider} />
          <View style={styles.mainStat}>
            <Text style={styles.mainStatValue}>{avgPerformance.toFixed(1)}%</Text>
            <Text style={styles.mainStatLabel}>Avg Performance</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.chatWithLeadButton}
          onPress={() => router.push('/ai-agent/hr/main/chat')}
        >
          <MessageSquare size={18} color={colors.tint} />
          <Text style={[styles.chatWithLeadText, { color: colors.tint }]}>
            Chat with HR Lead
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* HR Metrics */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.metricsContainer}
      >
        {HR_METRICS.map((metric, index) => (
          <Animated.View
            key={index}
            entering={FadeInUp.delay(index * 50)}
            style={[styles.metricCard, { backgroundColor: colors.card }]}
          >
            <Text style={[styles.metricValue, { color: colors.text }]}>{metric.value}</Text>
            <Text style={[styles.metricLabel, { color: colors.icon }]}>{metric.label}</Text>
            <Text
              style={[
                styles.metricChange,
                { color: metric.positive ? '#10B981' : '#EF4444' },
              ]}
            >
              {metric.change}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Search size={20} color={colors.icon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search HR agents, capabilities..."
          placeholderTextColor={colors.icon}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <ListFilter size={20} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Sub-Agents List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            HR Sub-Agents
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.icon }]}>
            {filteredAgents.length} agents
          </Text>
        </View>

        {filteredAgents.map((agent, index) => renderAgentCard(agent, index))}

        {filteredAgents.length === 0 && (
          <View style={styles.emptyState}>
            <User size={48} color={colors.icon} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No agents found
            </Text>
            <Text style={[styles.emptyText, { color: colors.icon }]}>
              Try adjusting your search
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainAgentCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  mainAgentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainAgentIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainAgentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  mainAgentName: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  mainAgentTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  mainAgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  mainAgentBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  mainAgentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  mainStat: {
    flex: 1,
    alignItems: 'center',
  },
  mainStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  mainStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  mainStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  chatWithLeadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 16,
  },
  chatWithLeadText: {
    fontSize: 15,
    fontWeight: '600',
  },
  metricsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  metricCard: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 11,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  agentCard: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  agentCardContent: {
    padding: 16,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'white',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentTitle: {
    fontSize: 13,
  },
  performanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  performanceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  capabilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  capabilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  capabilityText: {
    fontSize: 12,
  },
  agentStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  statLabel: {
    fontSize: 11,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
};
