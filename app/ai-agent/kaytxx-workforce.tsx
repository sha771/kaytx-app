import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import {
  ArrowLeft,
  Headphones,
  TrendingUp,
  Megaphone,
  Settings,
  Brain,
  Gauge,
  Calculator,
  ChevronRight,
  Activity,
  DollarSign,
  Plus,
  CircleCheck,
  Cpu,
  LayoutGrid,
  UsersRound,
  X,
  User,
} from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { useAIAssistant } from '@/providers/AIAssistantProvider';
import {
  AIAgent,
  AgentType,
  AgentStatus,
  AgentConfiguration,
  AgentCategory,
  customerExperienceSubAgents,
  salesRevenueSubAgents,
  marketingGrowthSubAgents,
  operationsManagementSubAgents,
  dataIntelligenceSubAgents,
  analysisInsightsPerformanceSubAgents,
  accountingFinanceSubAgents,
  createAgentConfiguration,
  agentConfigurationPresets,
} from '@/constants/aiAgentHierarchy';
import {
  operationsManagementSubAgents as operationsAgents,
  dataIntelligenceSubAgents as dataAgents,
} from '@/constants/aiAgentHierarchy_ext';

const { width } = Dimensions.get('window');

// ============================================
// KAYT_AI_WORKFORCE_SYSTEM AI AGENT & EMPLOYEE SYSTEM
// Main Management Dashboard
// ============================================

type ViewMode = 'grid' | 'list' | 'hierarchy';
type FilterType = 'all' | 'active' | 'standby' | 'main' | 'sub';
type SortType = 'name' | 'status' | 'performance' | 'category';

interface MainAgentCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  gradient: [string, string];
  subAgentCount: number;
  activeSubAgents: number;
  totalPerformance: number;
  costSavings: string;
  features: string[];
  agents: AIAgent[];
}

const KAYT_AI_WORKFORCE_SYSTEM = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  // State Management
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [sortType, setSortType] = useState<SortType>('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showA2AModal, setShowA2AModal] = useState(false);
  const [showEmployeeCollabModal, setShowEmployeeCollabModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'agents' | 'employees' | 'a2a' | 'analytics'>('agents');

  // Consolidate all sub-agents from different categories
  const allSubAgents = useMemo(() => {
    return [
      ...customerExperienceSubAgents,
      ...salesRevenueSubAgents,
      ...marketingGrowthSubAgents,
      ...operationsAgents,
      ...dataAgents,
      ...analysisInsightsPerformanceSubAgents,
      ...accountingFinanceSubAgents,
    ];
  }, []);

  // Define Main Agent Categories
  const mainAgentCategories: MainAgentCategory[] = useMemo(() => [
    {
      id: 'customer-experience',
      name: 'Customer Experience AI',
      description: 'Front-line customer interaction management with reception, support, ticket resolution, and retention',
      icon: Headphones,
      color: '#007AFF',
      gradient: ['#007AFF', '#5856D6'],
      subAgentCount: customerExperienceSubAgents.length,
      activeSubAgents: customerExperienceSubAgents.filter(a => a.status === 'active').length,
      totalPerformance: 96.5,
      costSavings: '$245,000/year',
      features: [
        'AI Receptionist - Front desk & call management',
        'AI Customer Support Agent - Tier 1 & 2 support',
        'AI Ticket Resolution Agent - Automated ticket management',
        'AI Complaint Handling Agent - Complaint resolution',
        'AI Retention Specialist - Customer retention & success',
      ],
      agents: customerExperienceSubAgents,
    },
    {
      id: 'sales-revenue',
      name: 'Sales & Revenue AI',
      description: 'Revenue generation and sales optimization with lead qualification and deal closing',
      icon: TrendingUp,
      color: '#34C759',
      gradient: ['#34C759', '#30D158'],
      subAgentCount: salesRevenueSubAgents.length,
      activeSubAgents: salesRevenueSubAgents.filter(a => a.status === 'active').length,
      totalPerformance: 94.2,
      costSavings: '$380,000/year',
      features: [
        'AI Sales Representative - Lead qualification & outreach',
        'AI Account Executive - Deal closing specialist',
        'AI Lead Qualifier - Prospect assessment & scoring',
        'AI Sales Coach - Sales training & improvement',
        'AI Proposal Generator - RFP & proposal creation',
      ],
      agents: salesRevenueSubAgents,
    },
    {
      id: 'marketing-growth',
      name: 'Marketing & Growth AI',
      description: 'Brand growth and customer acquisition with content creation and SEO optimization',
      icon: Megaphone,
      color: '#FF9500',
      gradient: ['#FF9500', '#FF6B35'],
      subAgentCount: marketingGrowthSubAgents.length,
      activeSubAgents: marketingGrowthSubAgents.filter(a => a.status === 'active').length,
      totalPerformance: 92.8,
      costSavings: '$295,000/year',
      features: [
        'AI Content Creator - Multi-channel content generation',
        'AI SEO Specialist - Search optimization expert',
        'AI Social Media Manager - Social engagement & management',
        'AI Email Marketing Agent - Campaign automation',
        'AI Growth Hacker - Viral growth strategies',
      ],
      agents: marketingGrowthSubAgents,
    },
    {
      id: 'operations-management',
      name: 'Operations & Management AI',
      description: 'Business operations and workflow optimization with automation and compliance',
      icon: Settings,
      color: '#5856D6',
      gradient: ['#5856D6', '#AF52DE'],
      subAgentCount: operationsAgents.length,
      activeSubAgents: operationsAgents.filter(a => a.status === 'active').length,
      totalPerformance: 97.1,
      costSavings: '$520,000/year',
      features: [
        'AI Operations Manager - Business operations leader',
        'AI Workflow Automation Agent - Process automation',
        'AI Task Coordinator - Task management & assignment',
        'AI Process Optimization Agent - Continuous improvement',
        'AI Resource Planner - Resource allocation specialist',
        'AI Compliance Monitoring Agent - Regulatory compliance',
        'AI Vendor Management Agent - Supplier & vendor coordinator',
        'AI Quality Control Agent - Quality assurance specialist',
      ],
      agents: operationsAgents,
      route: '/ai-agent/category/operations-management',
    },
    {
      id: 'data-intelligence',
      name: 'Data & Intelligence AI',
      description: 'Business intelligence and analytics with forecasting and risk assessment',
      icon: Brain,
      color: '#FF2D55',
      gradient: ['#FF2D55', '#FF6B9D'],
      subAgentCount: dataAgents.length,
      activeSubAgents: dataAgents.filter(a => a.status === 'active').length,
      totalPerformance: 95.8,
      costSavings: '$445,000/year',
      features: [
        'AI Data Analyst - Business intelligence analyst',
        'AI Sales Data Analyst - Sales intelligence specialist',
        'AI Financial Analyst - Financial intelligence specialist',
        'AI Customer Insights Agent - Customer behavior analyst',
        'AI Forecasting Agent - Predictive analytics specialist',
        'AI Risk Analyst - Risk assessment specialist',
        'AI Fraud Detection Agent - Security & fraud specialist',
      ],
      agents: dataAgents,
      route: '/ai-agent/category/data-intelligence',
    },
    {
      id: 'analysis-insights-performance',
      name: 'Analysis, Insights & Performance AI',
      description: 'Performance monitoring and strategic insights with competitive analysis',
      icon: Gauge,
      color: '#5AC8FA',
      gradient: ['#5AC8FA', '#64D2FF'],
      subAgentCount: analysisInsightsPerformanceSubAgents.length,
      activeSubAgents: analysisInsightsPerformanceSubAgents.filter(a => a.status === 'active').length,
      totalPerformance: 93.5,
      costSavings: '$340,000/year',
      features: [
        'AI Performance Analyst - KPI & metrics specialist',
        'AI Competitive Analyst - Market intelligence expert',
        'AI Research Agent - Deep research specialist',
        'AI Strategy Advisor - Strategic planning consultant',
        'AI Innovation Scout - Trend & innovation tracker',
      ],
      agents: analysisInsightsPerformanceSubAgents,
      route: '/ai-agent/category/analysis-insights-performance',
    },
    {
      id: 'accounting-finance',
      name: 'Accounting & Finance AI',
      description: 'Financial management and compliance with bookkeeping and tax advisory',
      icon: Calculator,
      color: '#FF3B30',
      gradient: ['#FF3B30', '#FF6B6B'],
      subAgentCount: accountingFinanceSubAgents.length,
      activeSubAgents: accountingFinanceSubAgents.filter(a => a.status === 'active').length,
      totalPerformance: 98.9,
      costSavings: '$485,000/year',
      features: [
        'AI Bookkeeper - Transaction recording specialist',
        'AI Accounts Payable Agent - AP management',
        'AI Accounts Receivable Agent - AR & collections',
        'AI Payroll Specialist - Payroll processing',
        'AI Tax Advisor - Tax compliance & optimization',
        'AI Financial Controller - Financial oversight',
        'AI Budget Analyst - Budget planning & tracking',
        'AI Audit Agent - Internal audit specialist',
      ],
      agents: accountingFinanceSubAgents,
      route: '/ai-agent/category/accounting-finance',
    },
  ], []);

  // Filter and sort agents
  const filteredAgents = useMemo(() => {
    let agents = allSubAgents;

    // Apply search Filter
    if (searchQuery) {
      agents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category Filter
    if (selectedCategory) {
      agents = agents.filter(agent => agent.category === selectedCategory);
    }

    // Apply status/type Filter
    switch (filterType) {
      case 'active':
        agents = agents.filter(agent => agent.status === 'active');
        break;
      case 'standby':
        agents = agents.filter(agent => agent.status === 'standby');
        break;
      case 'main':
        agents = agents.filter(agent => agent.type === 'main_agent');
        break;
      case 'sub':
        agents = agents.filter(agent => agent.type === 'subagent');
        break;
    }

    // Apply sorting
    switch (sortType) {
      case 'name':
        agents = [...agents].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'status':
        agents = [...agents].sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'performance':
        agents = [...agents].sort((a, b) => b.performance.successRate - a.performance.successRate);
        break;
      case 'category':
        agents = [...agents].sort((a, b) => a.category.localeCompare(b.category));
        break;
    }

    return agents;
  }, [allSubAgents, searchQuery, selectedCategory, filterType, sortType]);

  // Navigation to category detail
  const navigateToCategory = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    router.push(`/ai-agent/category/${categoryId}`);
  }, []);

  // Navigation to agent detail
  const navigateToAgent = useCallback((agent: AIAgent) => {
    setSelectedAgent(agent);
    router.push(`/ai-agent/${agent.id}`);
  }, []);

  // Toggle agent status
  const toggleAgentStatus = useCallback((agentId: string) => {
    // Implementation would update the agent status
    console.log(`Toggling status for agent: ${agentId}`);
  }, []);

  // Open configuration modal
  const openConfig = useCallback((agent: AIAgent) => {
    setSelectedAgent(agent);
    setShowConfigModal(true);
  }, []);

  // Open A2A communication modal
  const openA2A = useCallback((agent: AIAgent) => {
    setSelectedAgent(agent);
    setShowA2AModal(true);
  }, []);

  // Open Employee collaboration modal
  const openEmployeeCollab = useCallback((agent: AIAgent) => {
    setSelectedAgent(agent);
    setShowEmployeeCollabModal(true);
  }, []);

  // Render category card
  const renderCategoryCard = useCallback(({ item }: { item: MainAgentCategory }) => {
    const Icon = item.icon;
    const isSelected = selectedCategory === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          { backgroundColor: colors.card },
          isSelected && { borderColor: item.color, borderWidth: 2 },
        ]}
        onPress={() => navigateToCategory(item.id)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={item.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.categoryGradient}
        >
          <View style={styles.categoryIconContainer}>
            <Icon size={32} color="#FFFFFF" />
          </View>
        </LinearGradient>

        <View style={styles.categoryContent}>
          <Text style={[styles.categoryName, { color: colors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.categoryDescription, { color: colors.textSecondary }]} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.categoryStats}>
            <View style={styles.statItem}>
              <User size={14} color={item.color} />
              <Text style={[styles.statText, { color: colors.text }]}>
                {item.activeSubAgents}/{item.subAgentCount} Active
              </Text>
            </View>
            <View style={styles.statItem}>
              <User size={14} color={item.color} />
              <Text style={[styles.statText, { color: colors.text }]}>
                {item.totalPerformance}% Performance
              </Text>
            </View>
          </View>

          <View style={styles.categoryFooter}>
            <Text style={[styles.savingsText, { color: item.color }]}>
              💰 {item.costSavings} saved
            </Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }, [colors, selectedCategory, navigateToCategory]);

  // Render agent card
  const renderAgentCard = useCallback(({ item }: { item: AIAgent }) => {
    const Icon = item.icon;
    const isActive = item.status === 'active';
    const category = mainAgentCategories.find(c => c.id === item.category);
    const categoryColor = category?.color || '#007AFF';

    return (
      <TouchableOpacity
        style={[
          styles.agentCard,
          { backgroundColor: colors.card },
        ]}
        onPress={() => navigateToAgent(item)}
        activeOpacity={0.8}
      >
        <View style={styles.agentHeader}>
          <View style={[styles.agentIconContainer, { backgroundColor: `${categoryColor}20` }]}>
            <Icon size={24} color={categoryColor} />
          </View>
          <View style={styles.agentStatusContainer}>
            <View style={[
              styles.statusIndicator,
              { backgroundColor: isActive ? '#34C759' : '#FF9500' },
            ]} />
            <Switch
              value={isActive}
              onValueChange={() => toggleAgentStatus(item.id)}
              trackColor={{ false: '#767577', true: `${categoryColor}50` }}
              thumbColor={isActive ? categoryColor : '#f4f3f4'}
            />
          </View>
        </View>

        <Text style={[styles.agentName, { color: colors.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.agentTitle, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.title}
        </Text>

        <View style={styles.agentMetrics}>
          <View style={styles.metricItem}>
            <CircleCheck size={14} color={categoryColor} />
            <Text style={[styles.metricText, { color: colors.text }]}>
              {item.performance.successRate}%
            </Text>
          </View>
          <View style={styles.metricItem}>
            <CircleCheck size={14} color={categoryColor} />
            <Text style={[styles.metricText, { color: colors.text }]}>
              {item.performance.averageResponseTime}s
            </Text>
          </View>
          <View style={styles.metricItem}>
            <CircleCheck size={14} color={categoryColor} />
            <Text style={[styles.metricText, { color: colors.text }]}>
              {item.performance.customerSatisfaction}
            </Text>
          </View>
        </View>

        <View style={styles.agentActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: `${categoryColor}15` }]}
            onPress={() => openConfig(item)}
          >
            <Settings size={16} color={categoryColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: `${categoryColor}15` }]}
            onPress={() => openA2A(item)}
          >
            <Settings size={16} color={categoryColor} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: `${categoryColor}15` }]}
            onPress={() => openEmployeeCollab(item)}
          >
            <Settings size={16} color={categoryColor} />
          </TouchableOpacity>
        </View>

        {item.configuration && (
          <View style={styles.configPreview}>
            <View style={styles.configItem}>
              <Cpu size={12} color={colors.textSecondary} />
              <Text style={[styles.configText, { color: colors.textSecondary }]}>
                {item.configuration.model.primary}
              </Text>
            </View>
            <View style={styles.configItem}>
              <Cpu size={12} color={colors.textSecondary} />
              <Text style={[styles.configText, { color: colors.textSecondary }]}>
                {item.configuration.voice.enabled ? 'Voice On' : 'Voice Off'}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  }, [colors, mainAgentCategories, toggleAgentStatus, navigateToAgent, openConfig, openA2A, openEmployeeCollab]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              kaytxx AI Workforce
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
              7 Divisions • 50+ AI Agents • A2A Network
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/ai-agent/settings')}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
          <ChevronRight size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search agents, capabilities, or categories..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <LayoutGrid size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter & Sort Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContent}
        >
          {(['all', 'active', 'standby', 'main', 'sub'] as FilterType[]).map((Filter) => (
            <TouchableOpacity
              key={Funnel}
              style={[
                styles.filterChip,
                { backgroundColor: filterType === Filter ? '#007AFF' : colors.card },
              ]}
              onPress={() => setFilterType(Filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: filterType === Filter ? '#FFFFFF' : colors.text },
                ]}
              >
                {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* View Mode Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.viewButton,
              { backgroundColor: viewMode === 'grid' ? '#007AFF' : colors.card },
            ]}
            onPress={() => setViewMode('grid')}
          >
            <LayoutGrid size={18} color={viewMode === 'grid' ? '#FFFFFF' : colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewButton,
              { backgroundColor: viewMode === 'list' ? '#007AFF' : colors.card },
            ]}
            onPress={() => setViewMode('list')}
          >
            <LayoutGrid size={18} color={viewMode === 'list' ? '#FFFFFF' : colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewButton,
              { backgroundColor: viewMode === 'hierarchy' ? '#007AFF' : colors.card },
            ]}
            onPress={() => setViewMode('hierarchy')}
          >
            <LayoutGrid size={18} color={viewMode === 'hierarchy' ? '#FFFFFF' : colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {(['agents', 'employees', 'a2a', 'analytics'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && { borderBottomColor: '#007AFF', borderBottomWidth: 2 },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? '#007AFF' : colors.textSecondary },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {activeTab === 'agents' && (
          <>
            {/* Stats Overview */}
            <View style={styles.statsOverview}>
              <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                <User size={24} color="#007AFF" />
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {allSubAgents.length}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Total Agents
                </Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                <Activity size={24} color="#34C759" />
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {allSubAgents.filter(a => a.status === 'active').length}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Active Now
                </Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                <TrendingUp size={24} color="#FF9500" />
                <Text style={[styles.statValue, { color: colors.text }]}>
                  96.2%
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Avg Performance
                </Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                <DollarSign size={24} color="#FF2D55" />
                <Text style={[styles.statValue, { color: colors.text }]}>
                  $2.8M
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Annual Savings
                </Text>
              </View>
            </View>

            {/* Categories Section */}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Main Agent Categories
            </Text>
            <FlatList
              data={mainAgentCategories}
              renderItem={renderCategoryCard}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesList}
            />

            {/* All Agents Section */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                All AI Agents & Sub-Agents
              </Text>
              <TouchableOpacity onPress={() => router.push('/ai-agent/create')}>
                <View style={styles.addButton}>
                  <Plus size={18} color="#FFFFFF" />
                  <Text style={styles.addButtonText}>Create Agent</Text>
                </View>
              </TouchableOpacity>
            </View>

            {viewMode === 'grid' ? (
              <View style={styles.agentsList}>
                {filteredAgents.map((agent) => (
                  <View key={agent.id} style={styles.gridItem}>
                    {renderAgentCard({ item: agent })}
                  </View>
                ))}
              </View>
            ) : (
              <FlatList
                data={filteredAgents}
                renderItem={renderAgentCard}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.agentsList}
              />
            )}
          </>
        )}

        {activeTab === 'employees' && (
          <View style={styles.placeholderContent}>
            <UsersRound size={64} color={colors.textSecondary} />
            <Text style={[styles.placeholderTitle, { color: colors.text }]}>
              Employee-AI Bookkeeper
            </Text>
            <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
              Manage human employees working alongside AI agents. Configure HITL workflows, escalation rules, and collaboration protocols.
            </Text>
            <TouchableOpacity
              style={styles.placeholderButton}
              onPress={() => router.push('/ai-agent/employees')}
            >
              <Text style={styles.placeholderButtonText}>Manage Employees</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'a2a' && (
          <View style={styles.placeholderContent}>
            <UsersRound size={64} color={colors.textSecondary} />
            <Text style={[styles.placeholderTitle, { color: colors.text }]}>
              Agent-to-Agent Network
            </Text>
            <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
              Configure A2A communication channels, consultation protocols, and inter-agent workflows. View real-time agent interactions.
            </Text>
            <TouchableOpacity
              style={styles.placeholderButton}
              onPress={() => router.push('/ai-agent/a2a-network')}
            >
              <Text style={styles.placeholderButtonText}>Configure A2A</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'analytics' && (
          <View style={styles.placeholderContent}>
            <UsersRound size={64} color={colors.textSecondary} />
            <Text style={[styles.placeholderTitle, { color: colors.text }]}>
              Workforce Analytics
            </Text>
            <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
              View comprehensive analytics on AI agent performance, cost savings, ROI, and operational efficiency across all divisions.
            </Text>
            <TouchableOpacity
              style={styles.placeholderButton}
              onPress={() => router.push('/ai-agent/analytics')}
            >
              <Text style={styles.placeholderButtonText}>View Analytics</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
    comprehensiveFeatures: {
  "communicationChannels": {
    "call": {
      "enabled": true,
      "provider": "Twilio",
      "features": [
        "PBX Integration",
        "IVR Menu",
        "Call Routing",
        "Call Recording",
        "Transcriptions"
      ],
      "recordingRetention": "90 days",
      "consentLogging": true
    },
    "chatSystem": {
      "enabled": true,
      "platforms": [
        "Web Widget",
        "Slack",
        "Intercom",
        "Microsoft Teams"
      ],
      "persistentThreads": true,
      "transcriptExport": true
    },
    "sms": {
      "enabled": true,
      "provider": "Twilio",
      "features": [
        "Templated Messages",
        "Two-Way Support",
        "Opt-Out Handling"
      ],
      "number": "TBD"
    },
    "voice": {
      "enabled": true,
      "primaryDID": "TBD",
      "ttsVoice": "default",
      "failoverNumbers": [],
      "geoRouting": true
    },
    "recording": {
      "enabled": true,
      "autoRecording": true,
      "consentLogging": true,
      "transcriptGeneration": true,
      "scriptTemplates": []
    },
    "location": {
      "allowedRegions": [
        "Global"
      ],
      "timezoneAware": true,
      "localeFormats": [
        "en-US",
        "en-GB",
        "es-ES",
        "fr-FR",
        "de-DE"
      ]
    }
  },
  "companySetup": {
    "profile": {
      "enabled": true,
      "fields": [
        "Company Name",
        "Industry",
        "Size",
        "Location"
      ]
    },
    "products": {
      "enabled": true,
      "catalog": true,
      "pricingTiers": true
    },
    "negotiationRules": {
      "enabled": true,
      "templates": true,
      "maxConcession": "10%"
    }
  },
  "generalInfo": {
    "name": "",
    "role": "",
    "availability": "24/7",
    "personality": "professional",
    "tone": "conversational",
    "voice": "neutral"
  },
  "modelConfig": {
    "modelName": "LLM-X v2",
    "modelFamily": "GPT-4",
    "version": "latest",
    "primaryLanguage": "en-US",
    "fallbackLanguages": [
      "es",
      "fr",
      "de"
    ],
    "multilingualSupport": true
  },
  "timing": {
    "businessHours": {
      "enabled": true,
      "schedule": "Mon-Fri 09:00-18:00 local",
      "timezone": "UTC",
      "holidays": []
    },
    "waitingDuration": {
      "call": 120,
      "chat": 30,
      "sms": 0
    },
    "appointmentScheduling": {
      "enabled": true,
      "calendars": [
        "Google",
        "Outlook"
      ],
      "timezoneHandling": "automatic"
    }
  },
  "pricing": {
    "pricingModel": "fixed monthly",
    "priceLimit": "TBD",
    "negotiationRules": {
      "enabled": true,
      "maxConcession": "10%",
      "autoNegotiation": false
    }
  },
  "integrations": {
    "crm": [
      "Salesforce",
      "HubSpot",
      "Zendesk"
    ],
    "ticketing": [
      "Zendesk",
      "Freshdesk",
      "Jira"
    ],
    "calendar": [
      "Google Calendar",
      "Outlook Calendar"
    ],
    "telephony": [
      "Twilio",
      "Vonage",
      "RingCentral"
    ],
    "analytics": [
      "Google Analytics",
      "Mixpanel",
      "Amplitude"
    ],
    "mcpConnectors": []
  },
  "responsibilities": {
    "taskRouting": {
      "method": "intent-based",
      "escalationPath": "human after 3 failed handoffs",
      "slaEnforcement": true
    },
    "appointmentScheduling": {
      "enabled": true,
      "rules": []
    }
  },
  "taskManagement": {
    "assignedTasks": {
      "queue": true,
      "slaTimers": true,
      "dependencies": true
    },
    "progressTracking": {
      "enabled": true,
      "metrics": [
        "completion percentage",
        "time remaining"
      ]
    }
  },
  "behaviour": {
    "safetyFilters": {
      "enabled": true,
      "restrictedDomains": [
        "legal",
        "medical",
        "financial advice"
      ]
    },
    "refusalTemplates": {
      "enabled": true
    },
    "rateLimits": {
      "enabled": true,
      "requestsPerMinute": 60
    }
  },
  "performance": {
    "metrics": {
      "latency": true,
      "accuracy": true,
      "successRate": true,
      "userSatisfaction": true
    },
    "reporting": {
      "dashboards": true,
      "scheduledReports": true,
      "cadence": [
        "daily",
        "weekly",
        "monthly"
      ]
    }
  },
  "summary": {
    "enabled": true,
    "adminNotes": "",
    "handoverContext": true
  },
  "predictive": {
    "forecasting": {
      "enabled": true,
      "models": []
    },
    "anomalyDetection": {
      "enabled": true,
      "triggers": []
    }
  },
  "regulations": {
    "compliance": {
      "gdpr": true,
      "hipaa": false,
      "soc2": false,
      "regional": true
    },
    "dataResidency": {
      "enabled": true,
      "regions": []
    },
    "consentPolicies": {
      "enabled": true
    }
  },
  "memory": {
    "session": {
      "duration": "30 minutes",
      "retention": true
    },
    "longTerm": {
      "duration": "365 days",
      "retention": true
    },
    "piiRedaction": {
      "enabled": true
    },
    "purgeSchedule": "quarterly"
  },
  "detailedSetup": {
    "onboardingFlow": true,
    "productPricingSetup": true,
    "negotiationRulesSetup": true,
    "trainingPlan": true,
    "knowledgeBaseImport": true,
    "voicePersonalityTuning": true,
    "businessHoursSetup": true,
    "additionalConfigs": []
  },
  "twoStepVerification": {
    "enabled": true,
    "criticalActions": [
      "billing",
      "admin modifications",
      "data export"
    ],
    "deviceCheck": true
  },
  "importExport": {
    "endpoints": [
      "CSV",
      "JSON"
    ],
    "scheduledExports": true,
    "retentionPolicy": true,
    "complianceControls": true
  },
  "reports": {
    "types": [
      "performance",
      "usage",
      "errors",
      "compliance"
    ],
    "cadence": [
      "daily",
      "weekly",
      "monthly"
    ],
    "deliveryChannels": [
      "email",
      "dashboard",
      "webhook"
    ]
  },
  "mcpIntegrations": {
    "connectors": [],
    "apiSpecs": [],
    "mapping": []
  }
}};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  filterScroll: {
    marginBottom: 12,
  },
  filterContent: {
    paddingRight: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  viewToggle: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    padding: 8,
    borderRadius: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  statsOverview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: width / 2 - 24,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoriesList: {
    paddingRight: 16,
    gap: 12,
    marginBottom: 24,
  },
  categoryCard: {
    width: width * 0.75,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  categoryGradient: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  categoryStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  savingsText: {
    fontSize: 13,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  agentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: (width - 48) / 2,
  },
  agentsList: {
    gap: 12,
  },
  agentCard: {
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  agentTitle: {
    fontSize: 12,
    marginBottom: 12,
  },
  agentMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricText: {
    fontSize: 11,
    fontWeight: '600',
  },
  agentActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  configPreview: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  configItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  configText: {
    fontSize: 11,
  },
  placeholderContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  placeholderButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  placeholderButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default KAYT_AI_WORKFORCE_SYSTEM;
