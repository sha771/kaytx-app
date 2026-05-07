import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from 'lucide-react-native';
import {
  Bot,
  Activity,
  DollarSign,
  CircleCheck,
  Sparkles,
  Plug,
  SlidersHorizontal,
  Cpu,
  ChevronRight,
  Mic,
  Globe,
  Heart,
  BrainCircuit,
  ShieldCheck,
  TrendingUp,
  Star,
  ChartBarBig,
  Network,
  ArrowLeft,
  Settings2,
  MessagesSquare,
  Megaphone,
  Brain,
  GitBranch,
  TriangleAlert,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router, useLocalSearchParams } from 'expo-router';
import {
  AIAgent,
  AgentStatus,
  customerExperienceSubAgents,
  salesRevenueSubAgents,
  marketingGrowthSubAgents,
  accountingFinanceSubAgents,
  AgentCategory,
} from '@/constants/aiAgentHierarchy';
import {
  operationsManagementSubAgents,
  dataIntelligenceSubAgents,
  analysisInsightsPerformanceSubAgents,
} from '@/constants/aiAgentHierarchy_ext';

const { width } = Dimensions.get('window');

// ============================================
// AI AGENT CATEGORY DETAIL SCREEN
// Comprehensive screen for each Main Agent Division
// ============================================

type TabType = 'overview' | 'agents' | 'configuration' | 'analytics' | 'a2a';

interface CategoryData {
  id: AgentCategory;
  name: string;
  description: string;
  longDescription: string;
  icon: keyof typeof Icons;
  color: string;
  gradient: [string, string];
  agents: AIAgent[];
  features: string[];
  capabilities: string[];
  integrations: string[];
  metrics: {
    totalAgents: number;
    activeAgents: number;
    avgPerformance: number;
    tasksCompleted: number;
    costSavings: string;
    roi: string;
    uptime: string;
    customerSatisfaction: number;
  };
  configuration: {
    defaultModel: string;
    voiceEnabled: boolean;
    multiLanguage: boolean;
    emotionRecognition: boolean;
    autoTraining: boolean;
    auditLogging: boolean;
  };
}

const AIAgentCategoryScreen = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  // State
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [agentStatus, setAgentStatus] = useState<Record<string, AgentStatus>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'performance' | 'status'>('name');

  // Category Data Configuration
  const categoryData: Record<AgentCategory, CategoryData> = useMemo(() => ({
    'customer-experience': {
      id: 'customer-experience',
      name: 'Customer Experience AI',
      description: 'Front-line customer interaction management',
      longDescription: 'The Customer Experience AI division manages all customer-facing interactions including reception, support, ticket resolution, complaint handling, and retention. This division ensures exceptional customer satisfaction through intelligent automation and empathetic AI agents.',
      icon: 'Headphones',
      color: '#007AFF',
      gradient: ['#007AFF', '#5856D6'],
      agents: customerExperienceSubAgents,
      features: [
        'Multi-channel support (Voice, Chat, Email, Social)',
        'Sentiment analysis and emotion recognition',
        'Intelligent ticket routing and prioritization',
        'Automated complaint resolution workflows',
        'Customer retention and success management',
        'Real-time language translation',
        'Voice synthesis with natural tone',
        'Proactive issue detection',
      ],
      capabilities: [
        'Natural Language Understanding',
        'Sentiment Analysis',
        'Intent Recognition',
        'Entity Extraction',
        'Dialogue Management',
        'Context Preservation',
        'Multi-turn Conversations',
        'Emotion Detection',
        'Empathy Modeling',
        'De-escalation Techniques',
      ],
      integrations: [
        'Zendesk',
        'Freshdesk',
        'Salesforce Service Cloud',
        'Intercom',
        'Twilio',
        'WhatsApp Business',
        'Facebook Messenger',
        'Slack',
        'Microsoft Teams',
      ],
      metrics: {
        totalAgents: customerExperienceSubAgents.length,
        activeAgents: customerExperienceSubAgents.filter(a => a.status === 'active').length,
        avgPerformance: 96.5,
        tasksCompleted: 850420,
        costSavings: '$245,000/year',
        roi: '1,850%',
        uptime: '99.99%',
        customerSatisfaction: 4.8,
      },
      configuration: {
        defaultModel: 'gpt-4o',
        voiceEnabled: true,
        multiLanguage: true,
        emotionRecognition: true,
        autoTraining: true,
        auditLogging: true,
      },
    },
    'sales-revenue': {
      id: 'sales-revenue',
      name: 'Sales & Revenue AI',
      description: 'Revenue generation and sales optimization',
      longDescription: 'The Sales & Revenue AI division drives business growth through intelligent lead qualification, deal management, sales coaching, and proposal generation. These AI agents work alongside human sales teams to maximize conversion rates and revenue.',
      icon: 'TrendingUp',
      color: '#34C759',
      gradient: ['#34C759', '#30D158'],
      agents: salesRevenueSubAgents,
      features: [
        'Automated lead qualification and scoring',
        'Intelligent deal progression management',
        'Sales coaching and training automation',
        'RFP and proposal generation',
        'Sales forecasting and pipeline analysis',
        'Competitive intelligence integration',
        'Price optimization recommendations',
        'Commission tracking and reporting',
      ],
      capabilities: [
        'Lead Scoring Algorithms',
        'Predictive Deal Analytics',
        'Conversation Intelligence',
        'Sales Playbook Automation',
        'Objection Handling',
        'Closing Technique Recommendations',
        'Territory Management',
        'Quota Planning',
        'Win/Loss Analysis',
        'Sales Funnel Optimization',
      ],
      integrations: [
        'Salesforce Sales Cloud',
        'HubSpot CRM',
        'Pipedrive',
        'LinkedIn Sales Navigator',
        'ZoomInfo',
        'Apollo.io',
        'Outreach',
        'SalesLoft',
        'Gong',
        'Chorus',
      ],
      metrics: {
        totalAgents: salesRevenueSubAgents.length,
        activeAgents: salesRevenueSubAgents.filter(a => a.status === 'active').length,
        avgPerformance: 94.2,
        tasksCompleted: 425680,
        costSavings: '$380,000/year',
        roi: '2,340%',
        uptime: '99.95%',
        customerSatisfaction: 4.7,
      },
      configuration: {
        defaultModel: 'gpt-4o',
        voiceEnabled: true,
        multiLanguage: true,
        emotionRecognition: true,
        autoTraining: true,
        auditLogging: true,
      },
    },
    'marketing-growth': {
      id: 'marketing-growth',
      name: 'Marketing & Growth AI',
      description: 'Brand growth and customer acquisition',
      longDescription: 'The Marketing & Growth AI division accelerates brand awareness and customer acquisition through content creation, SEO optimization, social media management, and growth hacking strategies. These creative AI agents help scale marketing efforts efficiently.',
      icon: 'Megaphone',
      color: '#FF9500',
      gradient: ['#FF9500', '#FF6B35'],
      agents: marketingGrowthSubAgents,
      features: [
        'Multi-channel content generation',
        'SEO optimization and keyword research',
        'Social media scheduling and engagement',
        'Email marketing automation',
        'Growth hacking experiment tracking',
        'A/B testing and optimization',
        'Brand voice consistency monitoring',
        'Influencer outreach automation',
      ],
      capabilities: [
        'Content Generation',
        'SEO Analysis',
        'Social Listening',
        'Trend Detection',
        'Audience Segmentation',
        'Campaign Optimization',
        'Brand Sentiment Analysis',
        'Competitive Content Analysis',
        'Viral Content Prediction',
        'Marketing Attribution',
      ],
      integrations: [
        'HubSpot Marketing',
        'Marketo',
        'Mailchimp',
        'Hootsuite',
        'Buffer',
        'Sprout Social',
        'Google Analytics',
        'SEMrush',
        'Ahrefs',
        'Canva',
      ],
      metrics: {
        totalAgents: marketingGrowthSubAgents.length,
        activeAgents: marketingGrowthSubAgents.filter(a => a.status === 'active').length,
        avgPerformance: 92.8,
        tasksCompleted: 325940,
        costSavings: '$295,000/year',
        roi: '1,950%',
        uptime: '99.90%',
        customerSatisfaction: 4.6,
      },
      configuration: {
        defaultModel: 'claude-3-5-sonnet',
        voiceEnabled: true,
        multiLanguage: true,
        emotionRecognition: false,
        autoTraining: true,
        auditLogging: true,
      },
    },
    'operations-management': {
      id: 'operations-management',
      name: 'Operations & Management AI',
      description: 'Business operations and workflow optimization',
      longDescription: 'The Operations & Management AI division streamlines business processes through workflow automation, task coordination, resource planning, compliance monitoring, and quality control. These agents ensure operational excellence and efficiency.',
      icon: 'Settings',
      color: '#5856D6',
      gradient: ['#5856D6', '#AF52DE'],
      agents: operationsManagementSubAgents,
      features: [
        'End-to-end workflow automation',
        'Intelligent task assignment and tracking',
        'Resource allocation optimization',
        'Compliance monitoring and reporting',
        'Vendor performance management',
        'Quality assurance automation',
        'Process optimization recommendations',
        'Operational KPI tracking',
      ],
      capabilities: [
        'Workflow Orchestration',
        'Task Prioritization',
        'Resource Optimization',
        'Bottleneck Detection',
        'SLA Monitoring',
        'Compliance Checking',
        'Risk Assessment',
        'Quality Metrics Analysis',
        'Process Mining',
        'Continuous Improvement',
      ],
      integrations: [
        'ServiceNow',
        'Jira',
        'Asana',
        'Monday.com',
        'Workday',
        'SAP',
        'Oracle',
        'NetSuite',
        'QuickBooks',
        'Xero',
      ],
      metrics: {
        totalAgents: operationsManagementSubAgents.length,
        activeAgents: operationsManagementSubAgents.filter(a => a.status === 'active').length,
        avgPerformance: 97.1,
        tasksCompleted: 1245680,
        costSavings: '$520,000/year',
        roi: '2,890%',
        uptime: '99.99%',
        customerSatisfaction: 4.8,
      },
      configuration: {
        defaultModel: 'gpt-4o',
        voiceEnabled: false,
        multiLanguage: false,
        emotionRecognition: false,
        autoTraining: true,
        auditLogging: true,
      },
    },
    'data-intelligence': {
      id: 'data-intelligence',
      name: 'Data & Intelligence AI',
      description: 'Business intelligence and analytics',
      longDescription: 'The Data & Intelligence AI division transforms raw data into actionable insights through advanced analytics, forecasting, risk assessment, and fraud detection. These analytical agents support data-driven decision making across the organization.',
      icon: 'Brain',
      color: '#FF2D55',
      gradient: ['#FF2D55', '#FF6B9D'],
      agents: dataIntelligenceSubAgents,
      features: [
        'Comprehensive data analysis and reporting',
        'Predictive analytics and forecasting',
        'Real-time risk assessment',
        'Fraud detection and prevention',
        'Customer behavior analytics',
        'Sales intelligence dashboards',
        'Financial data modeling',
        'Anomaly detection and alerting',
      ],
      capabilities: [
        'Statistical Analysis',
        'Machine Learning',
        'Predictive Modeling',
        'Time Series Analysis',
        'Clustering Algorithms',
        'Regression Analysis',
        'Anomaly Detection',
        'Pattern Recognition',
        'Data Visualization',
        'Natural Language Querying',
      ],
      integrations: [
        'Tableau',
        'Power BI',
        'Looker',
        'Snowflake',
        'Databricks',
        'AWS Redshift',
        'Google BigQuery',
        'PostgreSQL',
        'MongoDB',
        'Elasticsearch',
      ],
      metrics: {
        totalAgents: dataIntelligenceSubAgents.length,
        activeAgents: dataIntelligenceSubAgents.filter(a => a.status === 'active').length,
        avgPerformance: 95.8,
        tasksCompleted: 685420,
        costSavings: '$445,000/year',
        roi: '2,120%',
        uptime: '99.95%',
        customerSatisfaction: 4.7,
      },
      configuration: {
        defaultModel: 'claude-3-opus',
        voiceEnabled: false,
        multiLanguage: false,
        emotionRecognition: false,
        autoTraining: true,
        auditLogging: true,
      },
    },
    'analysis-insights-performance': {
      id: 'analysis-insights-performance',
      name: 'Analysis, Insights & Performance AI',
      description: 'Performance monitoring and strategic insights',
      longDescription: 'The Analysis, Insights & Performance AI division monitors organizational KPIs, analyzes competitive landscapes, conducts deep research, provides strategic advisory, and tracks innovation trends to drive business excellence.',
      icon: 'Gauge',
      color: '#5AC8FA',
      gradient: ['#5AC8FA', '#64D2FF'],
      agents: analysisInsightsPerformanceSubAgents,
      features: [
        'Real-time KPI monitoring and alerting',
        'Competitive intelligence analysis',
        'Deep research and synthesis',
        'Strategic planning support',
        'Innovation trend tracking',
        'Benchmarking and gap analysis',
        'Performance scorecards',
        'Executive dashboard generation',
      ],
      capabilities: [
        'Performance Analytics',
        'Benchmarking',
        'Trend Analysis',
        'Research Synthesis',
        'Strategic Modeling',
        'Scenario Planning',
        'Competitive Analysis',
        'Innovation Scouting',
        'KPI Tracking',
        'Executive Reporting',
      ],
      integrations: [
        'Tableau',
        'Power BI',
        'Google Data Studio',
        'Crunchbase',
        'PitchBook',
        'CB Insights',
        'Gartner',
        'Forrester',
        'IDC',
        'Bloomberg Terminal',
      ],
      metrics: {
        totalAgents: analysisInsightsPerformanceSubAgents.length,
        activeAgents: analysisInsightsPerformanceSubAgents.filter(a => a.status === 'active').length,
        avgPerformance: 93.5,
        tasksCompleted: 285640,
        costSavings: '$340,000/year',
        roi: '1,780%',
        uptime: '99.90%',
        customerSatisfaction: 4.6,
      },
      configuration: {
        defaultModel: 'claude-3-5-sonnet',
        voiceEnabled: false,
        multiLanguage: false,
        emotionRecognition: false,
        autoTraining: true,
        auditLogging: true,
      },
    },
    'accounting-finance': {
      id: 'accounting-finance',
      name: 'Accounting & Finance AI',
      description: 'Financial management and compliance',
      longDescription: 'The Accounting & Finance AI division manages all financial operations including bookkeeping, accounts payable/receivable, payroll processing, tax compliance, budgeting, and internal audit. These agents ensure financial accuracy and regulatory compliance.',
      icon: 'Calculator',
      color: '#FF3B30',
      gradient: ['#FF3B30', '#FF6B6B'],
      agents: accountingFinanceSubAgents,
      features: [
        'Automated transaction recording and reconciliation',
        'Accounts payable workflow management',
        'Accounts receivable and collections',
        'Payroll processing and compliance',
        'Tax preparation and optimization',
        'Financial reporting and controls',
        'Budget planning and variance analysis',
        'Internal audit and compliance checking',
      ],
      capabilities: [
        'Double-Entry Accounting',
        'GAAP/IFRS Compliance',
        'Tax Code Interpretation',
        'Financial Analysis',
        'Audit Trail Management',
        'Fraud Detection',
        'Cash Flow Forecasting',
        'Cost Accounting',
        'Regulatory Reporting',
        'Risk Assessment',
      ],
      integrations: [
        'QuickBooks',
        'Xero',
        'Sage',
        'NetSuite',
        'SAP',
        'Oracle Financials',
        'Workday Financials',
        'Stripe',
        'Plaid',
        'Yodlee',
      ],
      metrics: {
        totalAgents: accountingFinanceSubAgents.length,
        activeAgents: accountingFinanceSubAgents.filter(a => a.status === 'active').length,
        avgPerformance: 98.9,
        tasksCompleted: 985420,
        costSavings: '$485,000/year',
        roi: '3,240%',
        uptime: '99.99%',
        customerSatisfaction: 4.9,
      },
      configuration: {
        defaultModel: 'gpt-4o',
        voiceEnabled: true,
        multiLanguage: true,
        emotionRecognition: false,
        autoTraining: true,
        auditLogging: true,
      },
    },
  }), []);

  const currentCategory = categoryData[categoryId as AgentCategory || 'customer-experience'];
  const CategoryIcon = Icons[currentCategory.icon] as React.ElementType;

  // Toggle agent status
  const toggleAgentStatus = useCallback((agentId: string) => {
    setAgentStatus(prev => ({
      ...prev,
      [agentId]: prev[agentId] === 'active' ? 'standby' : 'active',
    }));
  }, []);

  // Open agent detail modal
  const openAgentDetail = useCallback((agent: AIAgent) => {
    setSelectedAgent(agent);
    setShowAgentModal(true);
  }, []);

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <View style={styles.tabContent}>
            {/* Hero Section */}
            <LinearGradient
              colors={currentCategory.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroSection}
            >
              <View style={styles.heroIconContainer}>
                <CategoryIcon size={48} color="#FFFFFF" />
              </View>
              <Text style={styles.heroTitle}>{currentCategory.name}</Text>
              <Text style={styles.heroDescription}>{currentCategory.longDescription}</Text>
            </LinearGradient>

            {/* Quick Stats */}
            <View style={styles.quickStats}>
              <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                <Bot size={24} color={currentCategory.color} />
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {currentCategory.metrics.totalAgents}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  AI Agents
                </Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                <Activity size={24} color="#34C759" />
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {currentCategory.metrics.avgPerformance}%
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Avg Performance
                </Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                <DollarSign size={24} color="#FF9500" />
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {currentCategory.metrics.roi}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  ROI
                </Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: colors.card }]}>
                <CircleCheck size={24} color="#5856D6" />
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {(currentCategory.metrics.tasksCompleted / 1000000).toFixed(1)}M
                </Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                  Tasks Done
                </Text>
              </View>
            </View>

            {/* Features Section */}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Features</Text>
            <View style={[styles.featuresCard, { backgroundColor: colors.card }]}>
              {currentCategory.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={[styles.featureBullet, { backgroundColor: currentCategory.color }]} />
                  <Text style={[styles.featureText, { color: colors.text }]}>{feature}</Text>
                </View>
              ))}
            </View>

            {/* Capabilities Section */}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {currentCategory.capabilities.map((capability, index) => (
                <View key={index} style={[styles.capabilityBadge, { backgroundColor: `${currentCategory.color}15` }]}>
                  <Sparkles size={14} color={currentCategory.color} />
                  <Text style={[styles.capabilityText, { color: currentCategory.color }]}>
                    {capability}
                  </Text>
                </View>
              ))}
            </View>

            {/* Integrations Section */}
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Integrations</Text>
            <View style={styles.integrationsGrid}>
              {currentCategory.integrations.map((integration, index) => (
                <View key={index} style={[styles.integrationBadge, { backgroundColor: colors.card }]}>
                  <Plug size={14} color={colors.textSecondary} />
                  <Text style={[styles.integrationText, { color: colors.text }]}>
                    {integration}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        );

      case 'agents':
        return (
          <View style={styles.tabContent}>
            <View style={styles.agentsHeader}>
              <TextInput
                style={[styles.searchInput, { backgroundColor: colors.card, color: colors.text }]}
                placeholder="Search agents..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.sortButton}>
                <SlidersHorizontal size={20} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Sub-Agents ({currentCategory.metrics.totalAgents})
            </Text>

            {/* Sub-Agents List */}
            <FlatList
              data={currentCategory.agents.filter(agent =>
                agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                agent.title.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const AgentIcon = Icons[item.icon as keyof typeof Icons] as unknown as React.ComponentType<any>;
                return (
                  <TouchableOpacity
                    style={[styles.agentCard, { backgroundColor: colors.card }]}
                    onPress={() => openAgentDetail(item)}
                  >
                    <View style={styles.agentCardHeader}>
                      <View style={[styles.agentIconContainer, { backgroundColor: `${item.color}15` }]}>
                        {AgentIcon ? <AgentIcon size={24} color={item.color} /> : <Icons.Bot size={24} color={item.color} />}
                      </View>
                      <View style={styles.agentInfo}>
                        <Text style={[styles.agentName, { color: colors.text }]}>{item.name}</Text>
                        <Text style={[styles.agentTitle, { color: colors.textSecondary }]}>{item.title}</Text>
                      </View>
                      <View style={[
                        styles.statusBadge,
                        { backgroundColor: item.status === 'active' ? '#34C75915' : '#FF950015' }
                      ]}>
                        <Text style={[
                          styles.statusText,
                          { color: item.status === 'active' ? '#34C759' : '#FF9500' }
                        ]}>
                          {item.status.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.agentMetrics}>
                      <View style={styles.agentMetric}>
                        <Icons.Activity size={14} color={colors.textSecondary} />
                        <Text style={[styles.agentMetricValue, { color: colors.text }]}>
                          {item.performance.successRate}%
                        </Text>
                      </View>
                      <View style={styles.agentMetric}>
                        <Icons.Clock size={14} color={colors.textSecondary} />
                        <Text style={[styles.agentMetricValue, { color: colors.text }]}>
                          {item.performance.averageResponseTime}s
                        </Text>
                      </View>
                      <View style={styles.agentMetric}>
                        <Icons.CheckCircle size={14} color={colors.textSecondary} />
                        <Text style={[styles.agentMetricValue, { color: colors.text }]}>
                          {(item.performance.tasksCompleted / 1000).toFixed(1)}k
                        </Text>
                      </View>
                    </View>

                    <View style={styles.agentCardFooter}>
                      <TouchableOpacity
                        style={[styles.agentAction, { backgroundColor: `${item.color}10` }]}
                        onPress={() => toggleAgentStatus(item.id)}
                      >
                        <Icons.Power size={16} color={item.color} />
                        <Text style={[styles.agentActionText, { color: item.color }]}>
                          {item.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.agentAction, { backgroundColor: colors.background }]}
                        onPress={() => router.push({
                          pathname: '/ai-agent/configuration',
                          params: { agentId: item.id }
                        })}
                      >
                        <Icons.Settings2 size={16} color={colors.text} />
                        <Text style={[styles.agentActionText, { color: colors.text }]}>Configure</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              }}
              contentContainerStyle={styles.agentList}
              scrollEnabled={false}
            />
          </View>
        );

      case 'configuration':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Category Configuration</Text>

            <View style={[styles.configCard, { backgroundColor: colors.card }]}>
              <View style={styles.configRow}>
                <View style={styles.configInfo}>
                  <Cpu size={20} color={currentCategory.color} />
                  <View>
                    <Text style={[styles.configName, { color: colors.text }]}>Default AI Model</Text>
                    <Text style={[styles.configValue, { color: colors.textSecondary }]}>
                      {currentCategory.configuration.defaultModel}
                    </Text>
                  </View>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </View>

              <View style={styles.configDivider} />

              <View style={styles.configRow}>
                <View style={styles.configInfo}>
                  <Mic size={20} color={currentCategory.color} />
                  <View>
                    <Text style={[styles.configName, { color: colors.text }]}>Voice Synthesis</Text>
                    <Text style={[styles.configValue, { color: colors.textSecondary }]}>
                      {currentCategory.configuration.voiceEnabled ? 'Enabled' : 'Disabled'}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={currentCategory.configuration.voiceEnabled}
                  trackColor={{ false: '#767577', true: `${currentCategory.color}50` }}
                  thumbColor={currentCategory.configuration.voiceEnabled ? currentCategory.color : '#f4f3f4'}
                />
              </View>

              <View style={styles.configDivider} />

              <View style={styles.configRow}>
                <View style={styles.configInfo}>
                  <Globe size={20} color={currentCategory.color} />
                  <View>
                    <Text style={[styles.configName, { color: colors.text }]}>Multi-Language</Text>
                    <Text style={[styles.configValue, { color: colors.textSecondary }]}>
                      {currentCategory.configuration.multiLanguage ? 'Enabled' : 'Disabled'}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={currentCategory.configuration.multiLanguage}
                  trackColor={{ false: '#767577', true: `${currentCategory.color}50` }}
                  thumbColor={currentCategory.configuration.multiLanguage ? currentCategory.color : '#f4f3f4'}
                />
              </View>

              <View style={styles.configDivider} />

              <View style={styles.configRow}>
                <View style={styles.configInfo}>
                  <Heart size={20} color={currentCategory.color} />
                  <View>
                    <Text style={[styles.configName, { color: colors.text }]}>Emotion Recognition</Text>
                    <Text style={[styles.configValue, { color: colors.textSecondary }]}>
                      {currentCategory.configuration.emotionRecognition ? 'Enabled' : 'Disabled'}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={currentCategory.configuration.emotionRecognition}
                  trackColor={{ false: '#767577', true: `${currentCategory.color}50` }}
                  thumbColor={currentCategory.configuration.emotionRecognition ? currentCategory.color : '#f4f3f4'}
                />
              </View>

              <View style={styles.configDivider} />

              <View style={styles.configRow}>
                <View style={styles.configInfo}>
                  <BrainCircuit size={20} color={currentCategory.color} />
                  <View>
                    <Text style={[styles.configName, { color: colors.text }]}>Auto-Training</Text>
                    <Text style={[styles.configValue, { color: colors.textSecondary }]}>
                      {currentCategory.configuration.autoTraining ? 'Enabled' : 'Disabled'}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={currentCategory.configuration.autoTraining}
                  trackColor={{ false: '#767577', true: `${currentCategory.color}50` }}
                  thumbColor={currentCategory.configuration.autoTraining ? currentCategory.color : '#f4f3f4'}
                />
              </View>

              <View style={styles.configDivider} />

              <View style={styles.configRow}>
                <View style={styles.configInfo}>
                  <ShieldCheck size={20} color={currentCategory.color} />
                  <View>
                    <Text style={[styles.configName, { color: colors.text }]}>Audit Logging</Text>
                    <Text style={[styles.configValue, { color: colors.textSecondary }]}>
                      {currentCategory.configuration.auditLogging ? 'Enabled' : 'Disabled'}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={currentCategory.configuration.auditLogging}
                  trackColor={{ false: '#767577', true: `${currentCategory.color}50` }}
                  thumbColor={currentCategory.configuration.auditLogging ? currentCategory.color : '#f4f3f4'}
                />
              </View>
            </View>

            <TouchableOpacity style={[styles.saveButton, { backgroundColor: currentCategory.color }]}>
              <Text style={styles.saveButtonText}>Save Configuration</Text>
            </TouchableOpacity>
          </View>
        );

      case 'analytics':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance Analytics</Text>

            {/* Analytics Cards */}
            <View style={styles.analyticsGrid}>
              <View style={[styles.analyticsCard, { backgroundColor: colors.card }]}>
                <Text style={[styles.analyticsLabel, { color: colors.textSecondary }]}>
                  Cost Savings
                </Text>
                <Text style={[styles.analyticsValue, { color: currentCategory.color }]}>
                  {currentCategory.metrics.costSavings}
                </Text>
                <TrendingUp size={20} color="#34C759" />
              </View>

              <View style={[styles.analyticsCard, { backgroundColor: colors.card }]}>
                <Text style={[styles.analyticsLabel, { color: colors.textSecondary }]}>
                  Uptime
                </Text>
                <Text style={[styles.analyticsValue, { color: currentCategory.color }]}>
                  {currentCategory.metrics.uptime}
                </Text>
                <Activity size={20} color="#34C759" />
              </View>

              <View style={[styles.analyticsCard, { backgroundColor: colors.card }]}>
                <Text style={[styles.analyticsLabel, { color: colors.textSecondary }]}>
                  Satisfaction
                </Text>
                <Text style={[styles.analyticsValue, { color: currentCategory.color }]}>
                  {currentCategory.metrics.customerSatisfaction}/5
                </Text>
                <Star size={20} color="#FF9500" />
              </View>

              <View style={[styles.analyticsCard, { backgroundColor: colors.card }]}>
                <Text style={[styles.analyticsLabel, { color: colors.textSecondary }]}>
                  Active Now
                </Text>
                <Text style={[styles.analyticsValue, { color: currentCategory.color }]}>
                  {currentCategory.metrics.activeAgents}/{currentCategory.metrics.totalAgents}
                </Text>
                <CircleCheck size={20} color="#34C759" />
              </View>
            </View>

            {/* Performance Chart Placeholder */}
            <View style={[styles.chartCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.chartTitle, { color: colors.text }]}>
                30-Day Performance Trend
              </Text>
              <View style={styles.chartPlaceholder}>
                <ChartBarBig size={48} color={colors.textSecondary} />
                <Text style={[styles.chartPlaceholderText, { color: colors.textSecondary }]}>
                  Performance chart will be rendered here with real data from the analytics service.
                </Text>
              </View>
            </View>
          </View>
        );

      case 'a2a':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Agent-to-Agent Network</Text>

            <View style={[styles.a2aCard, { backgroundColor: colors.card }]}>
              <View style={styles.a2aHeader}>
                <Network size={32} color={currentCategory.color} />
                <View style={styles.a2aHeaderText}>
                  <Text style={[styles.a2aTitle, { color: colors.text }]}>
                    A2A Communication Hub
                  </Text>
                  <Text style={[styles.a2aSubtitle, { color: colors.textSecondary }]}>
                    Configure inter-agent consultations and collaborations
                  </Text>
                </View>
              </View>

              <View style={styles.a2aStats}>
                <View style={styles.a2aStat}>
                  <Text style={[styles.a2aStatValue, { color: currentCategory.color }]}>24</Text>
                  <Text style={[styles.a2aStatLabel, { color: colors.textSecondary }]}>
                    Active Consultations
                  </Text>
                </View>
                <View style={styles.a2aStat}>
                  <Text style={[styles.a2aStatValue, { color: currentCategory.color }]}>156</Text>
                  <Text style={[styles.a2aStatLabel, { color: colors.textSecondary }]}>
                    Today
                  </Text>
                </View>
                <View style={styles.a2aStat}>
                  <Text style={[styles.a2aStatValue, { color: currentCategory.color }]}>98.5%</Text>
                  <Text style={[styles.a2aStatLabel, { color: colors.textSecondary }]}>
                    Success Rate
                  </Text>
                </View>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text }]}>Consultation Types</Text>
            {[
              { type: 'Direct', desc: 'Peer-to-peer agent communication', icon: MessagesSquare },
              { type: 'Broadcast', desc: 'Team-wide announcements', icon: Megaphone },
              { type: 'Consultation', desc: 'Expert advice requests', icon: Brain },
              { type: 'Delegation', desc: 'Task handoff between agents', icon: GitBranch },
              { type: 'Escalation', desc: 'Critical issue routing', icon: TriangleAlert },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={[styles.consultationType, { backgroundColor: colors.card }]}>
                <View style={[styles.consultationIcon, { backgroundColor: `${currentCategory.color}15` }]}>
                  <item.icon size={20} color={currentCategory.color} />
                </View>
                <View style={styles.consultationInfo}>
                  <Text style={[styles.consultationName, { color: colors.text }]}>{item.type}</Text>
                  <Text style={[styles.consultationDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
                </View>
                <ChevronRight size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <CategoryIcon size={20} color={currentCategory.color} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              {currentCategory.name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/ai-agent/settings')}>
            <Settings2 size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {(['overview', 'agents', 'configuration', 'analytics', 'a2a'] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && {
                borderBottomColor: currentCategory.color,
                borderBottomWidth: 3,
              },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? currentCategory.color : colors.textSecondary },
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
        contentContainerStyle={styles.scrollContent}
      >
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};

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
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
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
    fontSize: 13,
    fontWeight: '600',
  },
  scrollContent: {
    flexGrow: 1,
  },
  tabContent: {
    padding: 16,
    paddingBottom: 100,
  },
  heroSection: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  heroIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
  quickStats: {
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
    marginBottom: 12,
    marginTop: 8,
  },
  featuresCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  capabilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  capabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  capabilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  integrationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  integrationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  integrationText: {
    fontSize: 12,
  },
  agentsHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 15,
  },
  sortButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#E5E5EA',
  },
  placeholderAgents: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  placeholderText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 13,
    textAlign: 'center',
  },
  configCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  configRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  configInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  configName: {
    fontSize: 15,
    fontWeight: '600',
  },
  configValue: {
    fontSize: 13,
    marginTop: 2,
  },
  configDivider: {
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  analyticsCard: {
    flex: 1,
    minWidth: width / 2 - 24,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  analyticsLabel: {
    fontSize: 12,
  },
  analyticsValue: {
    fontSize: 20,
    fontWeight: '700',
    position: 'absolute',
    left: 16,
    bottom: 12,
  },
  chartCard: {
    borderRadius: 16,
    padding: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholderText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 32,
  },
  agentList: {
    gap: 12,
  },
  agentCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  agentCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
  },
  agentTitle: {
    fontSize: 13,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
  },
  agentMetrics: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 20,
  },
  agentMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  agentMetricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  agentCardFooter: {
    flexDirection: 'row',
    gap: 12,
  },
  agentAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  agentActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  a2aCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  a2aHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  a2aHeaderText: {
    marginLeft: 16,
    flex: 1,
  },
  a2aTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  a2aSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  a2aStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  a2aStat: {
    alignItems: 'center',
  },
  a2aStatValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  a2aStatLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  consultationType: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  consultationIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  consultationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  consultationName: {
    fontSize: 15,
    fontWeight: '600',
  },
  consultationDesc: {
    fontSize: 13,
    marginTop: 2,
  },
});

export default AIAgentCategoryScreen;
