import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Briefcase,
  Search,
  SlidersHorizontal,
  Settings,
  Database,
  Brain,
  Mic,
  User,
  Zap,
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  ListFilter,
  ChevronRight,
  Award,
  Target,
  Clock,
  Shield,
  FileText,
  Globe,
  Building,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  LayoutDashboard,
  Rocket,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import {
  AIAgent,
  professionalServicesSubAgents,
  professionalServicesMainAgents,
  getMainAgentByCategory,
} from '@/constants/aiAgentHierarchy';

const { width } = Dimensions.get('window');

// Executive KPI Data
const EXECUTIVE_KPIS = [
  { label: 'Services Revenue', value: '$2.4B', trend: '+18.4%', icon: DollarSign, color: '#10B981' },
  { label: 'Active Projects', value: '12,450', trend: '+12%', icon: Briefcase, color: '#3B82F6' },
  { label: 'Consultants', value: '48,000', trend: '+8%', icon: Users, color: '#8B5CF6' },
  { label: 'Client Satisfaction', value: '94%', trend: '+2%', icon: Award, color: '#10B981' },
  { label: 'Utilization', value: '86%', trend: '+5%', icon: BarChart3, color: '#06B6D4' },
  { label: 'AI Productivity', value: '+$180M', trend: '+22%', icon: Zap, color: '#F59E0B' },
];

// AI Professional Services Agents
const AI_AGENTS = [
  {
    id: 'atlas',
    name: 'Agent Atlas',
    role: 'Project Delivery Agent',
    icon: Target,
    color: '#3B82F6',
    metrics: { projects: '842', accuracy: '94%', optimization: '+22%' },
    status: 'active',
  },
  {
    id: 'forge',
    name: 'Agent Forge',
    role: 'Proposal & SOW Agent',
    icon: FileText,
    color: '#10B981',
    metrics: { proposals: '324', winRate: '+18%', turnaround: '-45%' },
    status: 'active',
  },
  {
    id: 'nexus',
    name: 'Agent Nexus',
    role: 'Client Success Agent',
    icon: Building,
    color: '#8B5CF6',
    metrics: { accounts: '1,240', health: '91%', renewal: '+15%' },
    status: 'active',
  },
  {
    id: 'vector',
    name: 'Agent Vector',
    role: 'Resource Allocation Agent',
    icon: Users,
    color: '#F59E0B',
    metrics: { assigned: '4,820', utilization: '+19%', accuracy: '96%' },
    status: 'active',
  },
  {
    id: 'sentinel',
    name: 'Agent Sentinel',
    role: 'Risk Management Agent',
    icon: Shield,
    color: '#EF4444',
    metrics: { prevented: '284', savings: '$2.4M', accuracy: '94%' },
    status: 'active',
  },
];

export default function ProfessionalServicesAgentsScreen() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'main' | 'sub'>('main');

  const mainAgent = getMainAgentByCategory('professional-services');
  
  const filteredMainAgents = professionalServicesMainAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubAgents = professionalServicesSubAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfigureAgent = (agentId: string) => {
    router.push(`/ai-agent/agent-configuration?id=${agentId}`);
  };

  const handleDataUpload = (agentId: string) => {
    router.push(`/ai-agent/agent-data-upload?id=${agentId}`);
  };

  const stats = {
    total: professionalServicesMainAgents.length + professionalServicesSubAgents.length,
    active: [...professionalServicesMainAgents, ...professionalServicesSubAgents].filter(a => a.status === 'active').length,
    withVoice: [...professionalServicesMainAgents, ...professionalServicesSubAgents].filter(a => a.configuration?.voice.enabled).length,
    withTraining: [...professionalServicesMainAgents, ...professionalServicesSubAgents].filter(a => a.configuration?.training.enabled).length,
  };

  const renderAgentCard = (agent: AIAgent, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 50)}
      style={[styles.agentCard, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
    >
      <View style={styles.agentHeader}>
        <View style={[styles.iconContainer, { backgroundColor: agent.color + '20' }]}>
          <agent.icon size={28} color={agent.color} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: '#FFFFFF' }]}>{agent.name}</Text>
          <Text style={[styles.agentTitle, { color: 'rgba(255, 255, 255, 0.7)' }]} numberOfLines={2}>
            {agent.title}
          </Text>
        </View>
        <View style={[styles.statusBadge, { 
          backgroundColor: agent.status === 'active' ? '#10B981' : '#F59E0B' 
        }]}>
          <Text style={styles.statusText}>{agent.status}</Text>
        </View>
      </View>

      <Text style={[styles.description, { color: 'rgba(255, 255, 255, 0.6)' }]} numberOfLines={2}>
        {agent.description}
      </Text>

      {/* Configuration Summary */}
      <View style={styles.configRow}>
        {agent.configuration?.model && (
          <View style={styles.configBadge}>
            <Brain size={14} color="#10B981" />
            <Text style={[styles.configText, { color: '#FFFFFF' }]}>
              {agent.configuration.model.primary}
            </Text>
          </View>
        )}
        {agent.configuration?.voice.enabled && (
          <View style={styles.configBadge}>
            <Mic size={14} color="#3B82F6" />
            <Text style={[styles.configText, { color: '#FFFFFF' }]}>Voice</Text>
          </View>
        )}
        {agent.configuration?.training.enabled && (
          <View style={styles.configBadge}>
            <Database size={14} color="#8B5CF6" />
            <Text style={[styles.configText, { color: '#FFFFFF' }]}>Training</Text>
          </View>
        )}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
          onPress={() => handleConfigureAgent(agent.id)}
        >
          <Settings size={16} color="#FFFFFF" />
          <Text style={[styles.actionButtonText, { color: '#FFFFFF' }]}>Configure</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
          onPress={() => handleDataUpload(agent.id)}
        >
          <Database size={16} color="#FFFFFF" />
          <Text style={[styles.actionButtonText, { color: '#FFFFFF' }]}>Data</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderKPI = (kpi: any, index: number) => (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={[styles.kpiCard, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
    >
      <View style={[styles.kpiIcon, { backgroundColor: kpi.color + '15' }]}>
        <kpi.icon size={24} color={kpi.color} />
      </View>
      <Text style={[styles.kpiValue, { color: '#FFFFFF' }]}>{kpi.value}</Text>
      <Text style={[styles.kpiLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>{kpi.label}</Text>
      <View style={styles.kpiTrend}>
        <TrendingUp size={12} color="#10B981" />
        <Text style={[styles.kpiTrendText, { color: '#10B981' }]}>{kpi.trend}</Text>
      </View>
    </Animated.View>
  );

  const renderAIAgent = (agent: any, index: number) => (
    <Animated.View
      entering={FadeInRight.delay(index * 100)}
      style={[styles.aiAgentCard, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
    >
      <View style={[styles.aiAgentIcon, { backgroundColor: agent.color + '20' }]}>
        <agent.icon size={32} color={agent.color} />
      </View>
      <View style={styles.aiAgentInfo}>
        <Text style={[styles.aiAgentName, { color: '#FFFFFF' }]}>{agent.name}</Text>
        <Text style={[styles.aiAgentRole, { color: 'rgba(255, 255, 255, 0.6)' }]}>{agent.role}</Text>
        <View style={styles.aiAgentMetrics}>
          <Text style={[styles.aiAgentMetric, { color: 'rgba(255, 255, 255, 0.5)' }]}>
            {Object.entries(agent.metrics).map(([key, value]) => `${key}: ${value}`).join(' • ')}
          </Text>
        </View>
      </View>
      <View style={[styles.aiAgentStatus, { backgroundColor: '#10B981' + '20' }]}>
        <View style={[styles.aiAgentDot, { backgroundColor: '#10B981' }]} />
        <Text style={[styles.aiAgentStatusText, { color: '#10B981' }]}>Active</Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#050B14' }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderBottomColor: 'rgba(16, 185, 129, 0.3)', borderBottomWidth: 1 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={[styles.headerIcon, { backgroundColor: '#0D9488' + '15' }]}>
            <Briefcase size={28} color="#0D9488" />
          </View>
          <View>
            <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>Professional Services AI Agents</Text>
            <Text style={[styles.headerSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>
              Consulting • Project Management • Business Services
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
          onPress={() => router.push('/ai-agent/professional-services/professional-services-command-center')}
        >
          <LayoutDashboard size={20} color="#10B981" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Executive KPI Bar */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Executive KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            {EXECUTIVE_KPIS.map((kpi, index) => renderKPI(kpi, index))}
          </ScrollView>
        </View>

        {/* AI Professional Services Agents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Professional Services Agents</Text>
            <TouchableOpacity
              onPress={() => router.push('/ai-agent/professional-services/professional-services-command-center')}
            >
              <Text style={[styles.seeAllText, { color: '#10B981' }]}>View Command Center →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.aiAgentsContainer}>
            {AI_AGENTS.map((agent, index) => renderAIAgent(agent, index))}
          </View>
        </View>

        {/* Stats Overview */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Agent Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <Text style={[styles.statValue, { color: '#FFFFFF' }]}>{stats.total}</Text>
              <Text style={[styles.statLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Agents</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <Text style={[styles.statValue, { color: '#10B981' }]}>{stats.active}</Text>
              <Text style={[styles.statLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Active</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <Text style={[styles.statValue, { color: '#3B82F6' }]}>{stats.withVoice}</Text>
              <Text style={[styles.statLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Voice Enabled</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <Text style={[styles.statValue, { color: '#8B5CF6' }]}>{stats.withTraining}</Text>
              <Text style={[styles.statLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Training Enabled</Text>
            </View>
          </View>
        </View>

        {/* Search and Filters */}
        <View style={styles.section}>
          <View style={[styles.searchBar, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
            <Search size={20} color="rgba(255, 255, 255, 0.5)" />
            <TextInput
              style={[styles.searchInput, { color: '#FFFFFF' }]}
              placeholder="Search agents..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal size={20} color="rgba(255, 255, 255, 0.5)" />
            </TouchableOpacity>
          </View>

          {/* Tab Selector */}
          <View style={[styles.tabSelector, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'main' && styles.activeTab, { borderColor: 'rgba(16, 185, 129, 0.2)' }]}
              onPress={() => setSelectedTab('main')}
            >
              <Text style={[styles.tabText, selectedTab === 'main' && styles.activeTabText, { color: '#FFFFFF' }]}>
                Main Agents ({professionalServicesMainAgents.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, selectedTab === 'sub' && styles.activeTab, { borderColor: 'rgba(16, 185, 129, 0.2)' }]}
              onPress={() => setSelectedTab('sub')}
            >
              <Text style={[styles.tabText, selectedTab === 'sub' && styles.activeTabText, { color: '#FFFFFF' }]}>
                Sub Agents ({professionalServicesSubAgents.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Agents List */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
            {selectedTab === 'main' ? 'Main Professional Services Agents' : 'Sub Professional Services Agents'}
          </Text>
          <FlatList
            data={selectedTab === 'main' ? filteredMainAgents : filteredSubAgents}
            renderItem={({ item, index }) => renderAgentCard(item, index)}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.agentsList}
          />
        </View>

        {/* Command Center CTA */}
        <TouchableOpacity
          style={[styles.commandCenterCTA, { backgroundColor: '#0D9488' }]}
          onPress={() => router.push('/ai-agent/professional-services/professional-services-command-center')}
        >
          <LayoutDashboard size={24} color="white" />
          <View style={styles.ctaContent}>
            <Text style={styles.ctaTitle}>Open Professional Services Command Center</Text>
            <Text style={styles.ctaSubtitle}>Full enterprise dashboard with AI agents, project portfolio, resource management, and more</Text>
          </View>
          <ChevronRight size={24} color="white" />
        </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerButton: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  kpiScroll: {
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  kpiCard: {
    width: 140,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  kpiIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  kpiLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  kpiTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpiTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  aiAgentsContainer: {
    gap: 12,
  },
  aiAgentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  aiAgentIcon: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  aiAgentInfo: {
    flex: 1,
  },
  aiAgentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  aiAgentRole: {
    fontSize: 14,
    marginBottom: 6,
  },
  aiAgentMetrics: {
    marginTop: 4,
  },
  aiAgentMetric: {
    fontSize: 12,
  },
  aiAgentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  aiAgentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  aiAgentStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 64) / 4,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  tabSelector: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#0D9488',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  agentsList: {
    gap: 12,
  },
  agentCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  agentTitle: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  configRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  configBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  configText: {
    fontSize: 11,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  commandCenterCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    margin: 16,
    gap: 16,
  },
  ctaContent: {
    flex: 1,
  },
  ctaTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ctaSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
});
