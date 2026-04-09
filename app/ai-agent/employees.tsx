import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Phone,
  MessageSquare,
  Video,
  Mail,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Briefcase,
  Users,
  Zap,
  Bot,
  ChevronRight,
  Grid3X3,
  List,
  Crown,
  ArrowRight,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useCommandCenter, ROLE_CONFIGS } from '@/providers/CommandCenterProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Agent Types
interface Agent {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  department: string;
  status: 'active' | 'busy' | 'offline' | 'training';
  role: 'main' | 'sub';
  parentAgentId?: string;
  parentAgentName?: string;
  skills: string[];
  performance: number;
  tasksCompleted: number;
  availability: number;
  lastActive: string;
  isOnline: boolean;
}

// Mock Data - AI Agents Directory
const AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Accounting & Finance AI',
    title: 'Chief Financial Officer',
    department: 'Finance',
    status: 'active',
    role: 'main',
    skills: ['Accounting', 'Finance', 'Budgeting', 'Reporting'],
    performance: 94.5,
    tasksCompleted: 12847,
    availability: 100,
    lastActive: 'now',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Bookkeeper AI',
    title: 'General Ledger Manager',
    department: 'Finance',
    status: 'active',
    role: 'sub',
    parentAgentId: '1',
    parentAgentName: 'Accounting & Finance AI',
    skills: ['Bookkeeping', 'Transactions', 'Reconciliation'],
    performance: 99.2,
    tasksCompleted: 3420,
    availability: 100,
    lastActive: '2 min ago',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Accounts Payable AI',
    title: 'AP Manager',
    department: 'Finance',
    status: 'active',
    role: 'sub',
    parentAgentId: '1',
    parentAgentName: 'Accounting & Finance AI',
    skills: ['Invoice Processing', 'Payments', 'Vendor Management'],
    performance: 98.8,
    tasksCompleted: 2156,
    availability: 100,
    lastActive: '5 min ago',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Sales & Revenue AI',
    title: 'Chief Revenue Officer',
    department: 'Sales',
    status: 'active',
    role: 'main',
    skills: ['Sales', 'Lead Generation', 'Pipeline Management', 'CRM'],
    performance: 91.3,
    tasksCompleted: 8934,
    availability: 95,
    lastActive: 'now',
    isOnline: true,
  },
  {
    id: '5',
    name: 'AI Sales Rep',
    title: 'Senior Sales Representative',
    department: 'Sales',
    status: 'busy',
    role: 'sub',
    parentAgentId: '4',
    parentAgentName: 'Sales & Revenue AI',
    skills: ['Cold Calling', 'Demos', 'Closing', 'Follow-up'],
    performance: 88.5,
    tasksCompleted: 4521,
    availability: 60,
    lastActive: 'now',
    isOnline: true,
  },
  {
    id: '6',
    name: 'Lead Qualifier AI',
    title: 'Lead Qualification Specialist',
    department: 'Sales',
    status: 'active',
    role: 'sub',
    parentAgentId: '4',
    parentAgentName: 'Sales & Revenue AI',
    skills: ['Lead Scoring', 'Qualification', 'Research'],
    performance: 92.1,
    tasksCompleted: 3210,
    availability: 100,
    lastActive: '10 min ago',
    isOnline: true,
  },
  {
    id: '7',
    name: 'Marketing & Growth AI',
    title: 'Chief Marketing Officer',
    department: 'Marketing',
    status: 'active',
    role: 'main',
    skills: ['Campaigns', 'Analytics', 'Content', 'Social Media'],
    performance: 89.7,
    tasksCompleted: 6789,
    availability: 100,
    lastActive: 'now',
    isOnline: true,
  },
  {
    id: '8',
    name: 'Content Creator AI',
    title: 'Content Strategist',
    department: 'Marketing',
    status: 'training',
    role: 'sub',
    parentAgentId: '7',
    parentAgentName: 'Marketing & Growth AI',
    skills: ['Writing', 'SEO', 'Blogging', 'Copywriting'],
    performance: 85.4,
    tasksCompleted: 1876,
    availability: 80,
    lastActive: '1 hour ago',
    isOnline: false,
  },
  {
    id: '9',
    name: 'Social Media AI',
    title: 'Social Media Manager',
    department: 'Marketing',
    status: 'active',
    role: 'sub',
    parentAgentId: '7',
    parentAgentName: 'Marketing & Growth AI',
    skills: ['Social Posts', 'Engagement', 'Analytics', 'Scheduling'],
    performance: 90.2,
    tasksCompleted: 4521,
    availability: 100,
    lastActive: '15 min ago',
    isOnline: true,
  },
  {
    id: '10',
    name: 'Customer Experience AI',
    title: 'VP of Customer Success',
    department: 'Support',
    status: 'active',
    role: 'main',
    skills: ['Support', 'Tickets', 'Chat', 'Email'],
    performance: 93.8,
    tasksCompleted: 23456,
    availability: 100,
    lastActive: 'now',
    isOnline: true,
  },
  {
    id: '11',
    name: 'Support Agent AI',
    title: 'Customer Support Specialist',
    department: 'Support',
    status: 'busy',
    role: 'sub',
    parentAgentId: '10',
    parentAgentName: 'Customer Experience AI',
    skills: ['Ticket Resolution', 'Chat', 'FAQ', 'Escalation'],
    performance: 91.5,
    tasksCompleted: 9876,
    availability: 70,
    lastActive: 'now',
    isOnline: true,
  },
  {
    id: '12',
    name: 'Receptionist AI',
    title: 'Front Desk Assistant',
    department: 'Support',
    status: 'active',
    role: 'sub',
    parentAgentId: '10',
    parentAgentName: 'Customer Experience AI',
    skills: ['Calls', 'Scheduling', 'Greeting', 'Routing'],
    performance: 95.3,
    tasksCompleted: 5432,
    availability: 100,
    lastActive: 'now',
    isOnline: true,
  },
];

const DEPARTMENTS = [
  { id: 'all', name: 'All Departments', count: AGENTS.length },
  { id: 'finance', name: 'Finance', count: AGENTS.filter(a => a.department === 'Finance').length },
  { id: 'sales', name: 'Sales', count: AGENTS.filter(a => a.department === 'Sales').length },
  { id: 'marketing', name: 'Marketing', count: AGENTS.filter(a => a.department === 'Marketing').length },
  { id: 'support', name: 'Support', count: AGENTS.filter(a => a.department === 'Support').length },
];

export default function AgentsEmployeesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const { activeRole, setActiveRole } = useCommandCenter();

  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const filteredAgents = AGENTS.filter(agent => {
    const matchesDepartment = selectedDepartment === 'all' || agent.department.toLowerCase() === selectedDepartment;
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDepartment && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'busy': return '#F59E0B';
      case 'offline': return '#6B7280';
      case 'training': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getRoleIcon = (role: string) => {
    return role === 'main' ? Briefcase : Bot;
  };

  const renderDepartmentChip = (dept: typeof DEPARTMENTS[0]) => {
    const isSelected = selectedDepartment === dept.id;
    return (
      <TouchableOpacity
        key={dept.id}
        style={[
          styles.deptChip,
          { backgroundColor: isSelected ? colors.tint : colors.card },
        ]}
        onPress={() => setSelectedDepartment(dept.id)}
      >
        <Text
          style={[
            styles.deptChipText,
            { color: isSelected ? 'white' : colors.text },
          ]}
        >
          {dept.name}
        </Text>
        <View
          style={[
            styles.deptChipBadge,
            { backgroundColor: isSelected ? 'rgba(255,255,255,0.3)' : colors.background },
          ]}
        >
          <Text
            style={[
              styles.deptChipBadgeText,
              { color: isSelected ? 'white' : colors.icon },
            ]}
          >
            {dept.count}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAgentCard = (agent: Agent, index: number) => {
    const RoleIcon = getRoleIcon(agent.role);
    const isMain = agent.role === 'main';

    return (
      <Animated.View
        key={agent.id}
        entering={FadeInUp.delay(index * 30)}
        style={[styles.agentCard, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity
          style={styles.agentCardContent}
          onPress={() => router.push(`/ai-agent/employees/${agent.id}`)}
        >
          <View style={styles.agentHeader}>
            <View style={styles.avatarContainer}>
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: isMain ? colors.tint : colors.background },
                ]}
              >
                <RoleIcon size={24} color={isMain ? 'white' : colors.tint} />
              </View>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: getStatusColor(agent.status) },
                ]}
              />
            </View>

            <View style={styles.agentInfo}>
              <View style={styles.nameRow}>
                <Text style={[styles.agentName, { color: colors.text }]}>
                  {agent.name}
                </Text>
                {isMain && (
                  <View style={[styles.mainBadge, { backgroundColor: colors.tint + '20' }]}>
                    <Text style={[styles.mainBadgeText, { color: colors.tint }]}>Lead</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.agentTitle, { color: colors.icon }]}>
                {agent.title}
              </Text>
              {agent.parentAgentName && (
                <Text style={[styles.parentAgent, { color: colors.icon }]}>
                  Reports to {agent.parentAgentName}
                </Text>
              )}
            </View>

            <TouchableOpacity style={styles.moreButton}>
              <MoreVertical size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.skillsContainer}>
            {agent.skills.slice(0, 3).map((skill, idx) => (
              <View
                key={idx}
                style={[styles.skillBadge, { backgroundColor: colors.background }]}
              >
                <Text style={[styles.skillText, { color: colors.icon }]}>
                  {skill}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <TrendingUp size={14} color={colors.tint} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {agent.performance}%
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>Perf</Text>
            </View>
            <View style={styles.stat}>
              <CheckCircle size={14} color={colors.tint} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {agent.tasksCompleted > 1000
                  ? `${(agent.tasksCompleted / 1000).toFixed(1)}K`
                  : agent.tasksCompleted}
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>Tasks</Text>
            </View>
            <View style={styles.stat}>
              <Clock size={14} color={colors.tint} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {agent.availability}%
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>Avail</Text>
            </View>
            <View style={styles.stat}>
              <Zap size={14} color={getStatusColor(agent.status)} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {agent.lastActive}
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>Active</Text>
            </View>
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.tint + '10' }]}
              onPress={() => router.push(`/ai-agent/employees/${agent.id}/chat`)}
            >
              <MessageSquare size={18} color={colors.tint} />
              <Text style={[styles.actionText, { color: colors.tint }]}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#10B981' + '10' }]}
              onPress={() => router.push(`/ai-agent/employees/${agent.id}/call`)}
            >
              <Phone size={18} color="#10B981" />
              <Text style={[styles.actionText, { color: '#10B981' }]}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: '#8B5CF6' + '10' }]}
              onPress={() => router.push(`/ai-agent/employees/${agent.id}/assign`)}
            >
              <Briefcase size={18} color="#8B5CF6" />
              <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Assign</Text>
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
            AI Agents & Employees
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
            {AGENTS.length} agents across {DEPARTMENTS.length - 1} departments
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.tint }]}
          onPress={() => router.push('/ai-agent/create')}
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={[styles.commandBanner, { backgroundColor: colors.card }]}>
        <View style={styles.commandBannerLeft}>
          <View
            style={[
              styles.commandBadge,
              {
                backgroundColor: ROLE_CONFIGS.WOL.bgColor,
                borderColor: ROLE_CONFIGS.WOL.color,
              },
            ]}
          >
            <Users size={16} color={ROLE_CONFIGS.WOL.color} />
            <Text style={[styles.commandBadgeText, { color: ROLE_CONFIGS.WOL.color }]}>WOL</Text>
          </View>
          <View style={styles.commandBannerMeta}>
            <Text style={[styles.commandBannerTitle, { color: colors.text }]}>Workforce Operations Lead</Text>
            <Text style={[styles.commandBannerSub, { color: colors.icon }]}>
              {activeRole ? `Active Operator: ${activeRole}` : 'No active operator selected'}
            </Text>
          </View>
        </View>

        <View style={styles.commandBannerRight}>
          <TouchableOpacity
            style={[styles.commandLinkBtn, { borderColor: colors.border }]}
            onPress={() => router.push('/command-center')}
          >
            <Crown size={16} color={colors.text} />
            <Text style={[styles.commandLinkText, { color: colors.text }]}>Command</Text>
            <ArrowRight size={14} color={colors.icon} />
          </TouchableOpacity>

          {activeRole !== 'WOL' && (
            <TouchableOpacity
              style={[styles.commandActivateBtn, { backgroundColor: ROLE_CONFIGS.WOL.color }]}
              onPress={() => setActiveRole('WOL')}
            >
              <Text style={styles.commandActivateText}>Activate</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Search size={20} color={colors.icon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search agents, skills, or roles..."
          placeholderTextColor={colors.icon}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <Filter size={20} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Departments */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.departmentsContainer}
      >
        {DEPARTMENTS.map(renderDepartmentChip)}
      </ScrollView>

      {/* Stats Overview */}
      <View style={styles.statsOverview}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statCardValue, { color: colors.tint }]}>
            {AGENTS.filter(a => a.role === 'main').length}
          </Text>
          <Text style={[styles.statCardLabel, { color: colors.icon }]}>Main Agents</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statCardValue, { color: colors.tint }]}>
            {AGENTS.filter(a => a.role === 'sub').length}
          </Text>
          <Text style={[styles.statCardLabel, { color: colors.icon }]}>Sub Agents</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statCardValue, { color: '#10B981' }]}>
            {AGENTS.filter(a => a.isOnline).length}
          </Text>
          <Text style={[styles.statCardLabel, { color: colors.icon }]}>Online</Text>
        </View>
      </View>

      {/* View Toggle */}
      <View style={styles.viewToggle}>
        <Text style={[styles.resultsText, { color: colors.icon }]}>
          {filteredAgents.length} agents found
        </Text>
        <View style={styles.toggleButtons}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && { backgroundColor: colors.tint + '20' }]}
            onPress={() => setViewMode('list')}
          >
            <List size={18} color={viewMode === 'list' ? colors.tint : colors.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'grid' && { backgroundColor: colors.tint + '20' }]}
            onPress={() => setViewMode('grid')}
          >
            <Grid3X3 size={18} color={viewMode === 'grid' ? colors.tint : colors.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Agents List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredAgents.map((agent, index) => renderAgentCard(agent, index))}

        {filteredAgents.length === 0 && (
          <View style={styles.emptyState}>
            <Bot size={48} color={colors.icon} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No agents found
            </Text>
            <Text style={[styles.emptyText, { color: colors.icon }]}>
              Try adjusting your search or department filter
            </Text>
          </View>
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
  commandBanner: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  commandBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  commandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    gap: 6,
  },
  commandBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  commandBannerMeta: {
    flex: 1,
  },
  commandBannerTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  commandBannerSub: {
    fontSize: 11,
    marginTop: 2,
  },
  commandBannerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  commandLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  commandLinkText: {
    fontSize: 12,
    fontWeight: '700',
  },
  commandActivateBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  commandActivateText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '800',
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
  departmentsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
  },
  deptChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  deptChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  deptChipBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  deptChipBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statsOverview: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statCardLabel: {
    fontSize: 12,
  },
  viewToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  resultsText: {
    fontSize: 14,
  },
  toggleButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  agentCard: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  agentCardContent: {
    padding: 16,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  agentName: {
    fontSize: 17,
    fontWeight: '700',
  },
  mainBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  mainBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  agentTitle: {
    fontSize: 14,
    marginBottom: 2,
  },
  parentAgent: {
    fontSize: 12,
  },
  moreButton: {
    padding: 4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  skillBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  skillText: {
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 11,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  actionText: {
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
});
