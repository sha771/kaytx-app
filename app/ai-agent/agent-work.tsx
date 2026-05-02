import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Search,
  Clock,
  CircleCheck,
  CircleX,
  TriangleAlert,
  Users,
  Target,
  TrendingUp,
  DollarSign,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Shield,
  ChartBar,
  Zap,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ListTodo,
  Layers,
  Award,
  Timer,
  Activity,
  Cpu,
  Database,
  Brain,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  CircleDot,
  Star,
  Flag,
  Eye,
  GitBranch,
  Workflow,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface WorkItem {
  id: string;
  title: string;
  description: string;
  agentName: string;
  agentType: 'main' | 'sub';
  parentAgent?: string;
  category: string;
  status: 'in_progress' | 'completed' | 'failed' | 'queued' | 'paused' | 'reviewing';
  priority: 'critical' | 'high' | 'medium' | 'low';
  progress: number;
  startTime: string;
  estimatedDuration: string;
  actualDuration?: string;
  outputSummary?: string;
  metrics?: { label: string; value: string; trend?: 'up' | 'down' | 'neutral' }[];
  icon: React.ComponentType<any>;
  color: string;
  confidence: number;
  tokensUsed: number;
  dependencies?: string[];
  assignedBy: string;
  tags: string[];
}

interface WorkSummary {
  totalTasks: number;
  completed: number;
  inProgress: number;
  queued: number;
  failed: number;
  paused: number;
  avgCompletionTime: string;
  successRate: number;
  totalTokens: number;
  efficiency: number;
}

interface WorkflowStage {
  id: string;
  name: string;
  count: number;
  color: string;
}

const mockWorkItems: WorkItem[] = [
  {
    id: '1',
    title: 'Processing Customer Support Tickets',
    description: 'Automatically resolving and routing incoming support tickets with context-aware responses',
    agentName: 'AI Customer Support Agent',
    agentType: 'sub',
    parentAgent: 'Customer Experience AI',
    category: 'customer',
    status: 'in_progress',
    priority: 'high',
    progress: 65,
    startTime: '10 min ago',
    estimatedDuration: '25 min',
    metrics: [
      { label: 'Tickets', value: '24/37', trend: 'up' },
      { label: 'Resolved', value: '18', trend: 'up' },
      { label: 'Escalated', value: '3' }
    ],
    icon: MessageSquare,
    color: '#007AFF',
    confidence: 94,
    tokensUsed: 45600,
    dependencies: ['Knowledge Base Sync'],
    assignedBy: 'System Auto',
    tags: ['support', 'auto-resolution', 'high-volume'],
  },
  {
    id: '2',
    title: 'Lead Qualification Campaign - Q4',
    description: 'Scoring and qualifying 370 leads from latest marketing campaign with AI-powered analysis',
    agentName: 'AI Lead Development Rep',
    agentType: 'sub',
    parentAgent: 'Sales & Revenue AI',
    category: 'sales',
    status: 'in_progress',
    priority: 'critical',
    progress: 42,
    startTime: '25 min ago',
    estimatedDuration: '1 hour',
    metrics: [
      { label: 'Processed', value: '156/370', trend: 'up' },
      { label: 'Qualified', value: '89', trend: 'up' },
      { label: 'Score Avg', value: '72' }
    ],
    icon: Target,
    color: '#34C759',
    confidence: 91,
    tokensUsed: 78900,
    assignedBy: 'Marketing Team',
    tags: ['q4-campaign', 'enterprise', 'high-priority'],
  },
  {
    id: '3',
    title: 'Email Campaign A/B Optimization',
    description: 'Testing and optimizing email subject lines and content for Black Friday campaign',
    agentName: 'AI Email Marketing Agent',
    agentType: 'sub',
    parentAgent: 'Marketing & Growth AI',
    category: 'marketing',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    startTime: '2 hours ago',
    estimatedDuration: '45 min',
    actualDuration: '38 min',
    outputSummary: 'Variant B performed 23% better with higher open rates. Recommended for full rollout to 50K subscribers.',
    metrics: [
      { label: 'Open Rate', value: '+12%', trend: 'up' },
      { label: 'Click Rate', value: '+8%', trend: 'up' },
      { label: 'Winner', value: 'Variant B' }
    ],
    icon: Mail,
    color: '#FF9500',
    confidence: 97,
    tokensUsed: 23400,
    assignedBy: 'CMO Dashboard',
    tags: ['black-friday', 'a/b-test', 'email'],
  },
  {
    id: '4',
    title: 'Real-time Fraud Pattern Analysis',
    description: 'Analyzing transaction patterns for potential fraud indicators with ML detection',
    agentName: 'AI Fraud Detection Agent',
    agentType: 'sub',
    parentAgent: 'Data & Intelligence AI',
    category: 'data',
    status: 'in_progress',
    priority: 'critical',
    progress: 78,
    startTime: '35 min ago',
    estimatedDuration: '50 min',
    metrics: [
      { label: 'Scanned', value: '12.4K', trend: 'up' },
      { label: 'Flagged', value: '23' },
      { label: 'Risk Score', value: '87' }
    ],
    icon: Shield,
    color: '#FF2D55',
    confidence: 96,
    tokensUsed: 156700,
    assignedBy: 'Security Team',
    tags: ['fraud', 'real-time', 'security'],
  },
  {
    id: '5',
    title: 'Weekly Sales Pipeline Report',
    description: 'Compiling comprehensive sales pipeline analysis with forecasting and recommendations',
    agentName: 'AI Sales Data Analyst',
    agentType: 'sub',
    parentAgent: 'Data & Intelligence AI',
    category: 'analysis',
    status: 'queued',
    priority: 'medium',
    progress: 0,
    startTime: 'Queued',
    estimatedDuration: '20 min',
    icon: ChartBar,
    color: '#AF52DE',
    confidence: 0,
    tokensUsed: 0,
    dependencies: ['CRM Data Sync', 'Fraud Analysis'],
    assignedBy: 'VP Sales',
    tags: ['weekly', 'pipeline', 'forecast'],
  },
  {
    id: '6',
    title: 'Enterprise Contract Proposal',
    description: 'Creating custom proposal for TechCorp Inc. with tailored pricing and terms',
    agentName: 'AI Proposal Generator',
    agentType: 'sub',
    parentAgent: 'Sales & Revenue AI',
    category: 'sales',
    status: 'completed',
    priority: 'high',
    progress: 100,
    startTime: '1 hour ago',
    estimatedDuration: '30 min',
    actualDuration: '28 min',
    outputSummary: '12-page proposal with custom pricing, ROI calculator, and implementation timeline generated.',
    metrics: [
      { label: 'Pages', value: '12' },
      { label: 'Deal Value', value: '$85K', trend: 'up' },
      { label: 'Custom', value: '8 sections' }
    ],
    icon: FileText,
    color: '#34C759',
    confidence: 95,
    tokensUsed: 34500,
    assignedBy: 'Account Executive',
    tags: ['proposal', 'enterprise', 'techcorp'],
  },
  {
    id: '7',
    title: 'Incoming Call Management',
    description: 'Managing and routing incoming customer calls with intelligent IVR and context transfer',
    agentName: 'AI Receptionist',
    agentType: 'sub',
    parentAgent: 'Customer Experience AI',
    category: 'customer',
    status: 'in_progress',
    priority: 'high',
    progress: 100,
    startTime: 'Continuous',
    estimatedDuration: 'Ongoing',
    metrics: [
      { label: 'Calls Today', value: '142', trend: 'up' },
      { label: 'Avg Wait', value: '8s', trend: 'down' },
      { label: 'Routed', value: '98%' }
    ],
    icon: Phone,
    color: '#007AFF',
    confidence: 98,
    tokensUsed: 89200,
    assignedBy: 'System Auto',
    tags: ['calls', 'continuous', 'ivr'],
  },
  {
    id: '8',
    title: 'Deal Negotiation - Acme Corp',
    description: 'Negotiating contract terms with enterprise prospect including pricing and SLA',
    agentName: 'AI Negotiator',
    agentType: 'sub',
    parentAgent: 'Sales & Revenue AI',
    category: 'sales',
    status: 'paused',
    priority: 'high',
    progress: 60,
    startTime: '3 hours ago',
    estimatedDuration: '2 hours',
    outputSummary: 'Paused - awaiting customer response on revised 15% discount terms and custom SLA.',
    metrics: [
      { label: 'Deal Value', value: '$125K' },
      { label: 'Discount', value: '15%' },
      { label: 'Rounds', value: '3' }
    ],
    icon: DollarSign,
    color: '#34C759',
    confidence: 82,
    tokensUsed: 67800,
    assignedBy: 'Sales Director',
    tags: ['negotiation', 'enterprise', 'acme'],
  },
  {
    id: '9',
    title: 'Executive KPI Dashboard Update',
    description: 'Updating executive dashboard with latest performance metrics and anomaly alerts',
    agentName: 'Performance Monitoring AI',
    agentType: 'sub',
    parentAgent: 'Analysis & Performance AI',
    category: 'analysis',
    status: 'completed',
    priority: 'medium',
    progress: 100,
    startTime: '4 hours ago',
    estimatedDuration: '15 min',
    actualDuration: '12 min',
    outputSummary: '45 KPIs updated across 6 departments with 3 anomaly alerts generated.',
    metrics: [
      { label: 'KPIs', value: '45' },
      { label: 'Alerts', value: '3' },
      { label: 'Departments', value: '6' }
    ],
    icon: TrendingUp,
    color: '#AF52DE',
    confidence: 99,
    tokensUsed: 12300,
    assignedBy: 'CEO Dashboard',
    tags: ['kpi', 'daily', 'executive'],
  },
  {
    id: '10',
    title: 'Customer Churn Prediction Model',
    description: 'Running predictive churn model on customer base with risk scoring',
    agentName: 'AI Customer Insights Agent',
    agentType: 'sub',
    parentAgent: 'Data & Intelligence AI',
    category: 'data',
    status: 'failed',
    priority: 'medium',
    progress: 45,
    startTime: '2 hours ago',
    estimatedDuration: '1 hour',
    outputSummary: 'Failed - insufficient data for Q4 cohort. Missing 2,340 customer records. Manual data sync required.',
    icon: Users,
    color: '#FF2D55',
    confidence: 45,
    tokensUsed: 34500,
    assignedBy: 'Customer Success',
    tags: ['churn', 'prediction', 'failed'],
  },
  {
    id: '11',
    title: 'Social Media Content Generation',
    description: 'Creating engaging social media posts for upcoming product launch',
    agentName: 'AI Content Generator',
    agentType: 'sub',
    parentAgent: 'Marketing & Growth AI',
    category: 'marketing',
    status: 'reviewing',
    priority: 'medium',
    progress: 90,
    startTime: '1 hour ago',
    estimatedDuration: '40 min',
    metrics: [
      { label: 'Posts', value: '12' },
      { label: 'Platforms', value: '4' },
      { label: 'Scheduled', value: '8' }
    ],
    icon: Sparkles,
    color: '#FF9500',
    confidence: 93,
    tokensUsed: 45600,
    assignedBy: 'Social Media Manager',
    tags: ['social', 'product-launch', 'content'],
  },
  {
    id: '12',
    title: 'Workflow Optimization Analysis',
    description: 'Analyzing business workflows for bottleneck detection and efficiency improvements',
    agentName: 'AI Process Optimization Agent',
    agentType: 'sub',
    parentAgent: 'Operations & Management AI',
    category: 'operations',
    status: 'in_progress',
    priority: 'low',
    progress: 35,
    startTime: '45 min ago',
    estimatedDuration: '1.5 hours',
    metrics: [
      { label: 'Workflows', value: '8/24' },
      { label: 'Bottlenecks', value: '3' },
      { label: 'Savings', value: '~15%' }
    ],
    icon: Workflow,
    color: '#5856D6',
    confidence: 88,
    tokensUsed: 56700,
    assignedBy: 'COO',
    tags: ['optimization', 'workflows', 'efficiency'],
  },
];

const categoryColors: Record<string, string> = {
  customer: '#007AFF',
  sales: '#34C759',
  marketing: '#FF9500',
  operations: '#5856D6',
  data: '#FF2D55',
  analysis: '#AF52DE',
};

const workflowStages: WorkflowStage[] = [
  { id: 'queued', name: 'Queued', count: 1, color: '#8E8E93' },
  { id: 'in_progress', name: 'In Progress', count: 5, color: '#007AFF' },
  { id: 'reviewing', name: 'Reviewing', count: 1, color: '#FF9500' },
  { id: 'paused', name: 'Paused', count: 1, color: '#AF52DE' },
  { id: 'completed', name: 'Completed', count: 3, color: '#34C759' },
  { id: 'failed', name: 'Failed', count: 1, color: '#FF3B30' },
];

export default function AgentWorkScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const progressAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const categories = ['all', 'customer', 'sales', 'marketing', 'operations', 'data', 'analysis'];
  const priorities = ['all', 'critical', 'high', 'medium', 'low'];

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    );
    pulse.start();

    return () => pulse.stop();
  }, [progressAnim, pulseAnim]);

  const filteredWork = useMemo(() => {
    return mockWorkItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });
  }, [searchQuery, selectedStatus, selectedCategory, selectedPriority]);

  const summary: WorkSummary = useMemo(() => ({
    totalTasks: mockWorkItems.length,
    completed: mockWorkItems.filter(w => w.status === 'completed').length,
    inProgress: mockWorkItems.filter(w => w.status === 'in_progress').length,
    queued: mockWorkItems.filter(w => w.status === 'queued').length,
    failed: mockWorkItems.filter(w => w.status === 'failed').length,
    paused: mockWorkItems.filter(w => w.status === 'paused' || w.status === 'reviewing').length,
    avgCompletionTime: '24 min',
    successRate: 85,
    totalTokens: mockWorkItems.reduce((acc, w) => acc + w.tokensUsed, 0),
    efficiency: 92,
  }), []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#34C759';
      case 'in_progress': return '#007AFF';
      case 'queued': return '#8E8E93';
      case 'failed': return '#FF3B30';
      case 'paused': return '#AF52DE';
      case 'reviewing': return '#FF9500';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CircleCheck;
      case 'in_progress': return Play;
      case 'queued': return Clock;
      case 'failed': return CircleX;
      case 'paused': return Pause;
      case 'reviewing': return Eye;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#FF3B30';
      case 'high': return '#FF9500';
      case 'medium': return '#007AFF';
      case 'low': return '#34C759';
      default: return '#8E8E93';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return TriangleAlert;
      case 'high': return Flag;
      case 'medium': return CircleDot;
      case 'low': return Star;
      default: return CircleDot;
    }
  };

  const getTrendIcon = (trend?: string) => {
    if (trend === 'up') return ArrowUpRight;
    if (trend === 'down') return ArrowDownRight;
    return null;
  };

  const renderWorkflowPipeline = () => (
    <View style={[styles.pipelineContainer, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.pipelineHeader}>
        <GitBranch size={16} color={theme.colors.primary} />
        <Text style={[styles.pipelineTitle, { color: theme.colors.text }]}>Work Pipeline</Text>
      </View>
      <View style={styles.pipelineStages}>
        {workflowStages.map((stage, index) => (
          <TouchableOpacity 
            key={stage.id}
            style={[
              styles.pipelineStage,
              selectedStatus === stage.id && { borderColor: stage.color, borderWidth: 2 },
            ]}
            onPress={() => setSelectedStatus(selectedStatus === stage.id ? 'all' : stage.id)}
          >
            <View style={[styles.stageCount, { backgroundColor: stage.color }]}>
              <Text style={styles.stageCountText}>{stage.count}</Text>
            </View>
            <Text style={[styles.stageName, { color: theme.colors.secondaryText }]} numberOfLines={1}>{stage.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderWorkItem = (item: WorkItem) => {
    const StatusIcon = getStatusIcon(item.status);
    const PriorityIcon = getPriorityIcon(item.priority);
    const isExpanded = expandedItem === item.id;
    
    return (
      <TouchableOpacity 
        key={item.id}
        style={[styles.workCard, { backgroundColor: theme.colors.cardBackground }]}
        onPress={() => setExpandedItem(isExpanded ? null : item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.workHeader}>
          <View style={[styles.workIconBg, { backgroundColor: `${item.color}20` }]}>
            <item.icon size={20} color={item.color} />
          </View>
          <View style={styles.workInfo}>
            <View style={styles.workTitleRow}>
              <Text style={[styles.workTitle, { color: theme.colors.text }]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(item.priority)}15` }]}>
                <PriorityIcon size={10} color={getPriorityColor(item.priority)} />
                <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>{item.priority}</Text>
              </View>
            </View>
            <Text style={[styles.workAgent, { color: theme.colors.secondaryText }]}>
              {item.agentName}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
            {item.status === 'in_progress' ? (
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <StatusIcon size={12} color={getStatusColor(item.status)} />
              </Animated.View>
            ) : (
              <StatusIcon size={12} color={getStatusColor(item.status)} />
            )}
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.replace('_', ' ')}
            </Text>
          </View>
        </View>

        {(item.status === 'in_progress' || item.status === 'reviewing') && item.progress < 100 && (
          <View style={styles.progressSection}>
            <View style={styles.progressBarBg}>
              <Animated.View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', `${item.progress}%`]
                    }), 
                    backgroundColor: item.color 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: theme.colors.secondaryText }]}>
              {item.progress}%
            </Text>
          </View>
        )}

        <View style={styles.workMeta}>
          <View style={[styles.categoryBadge, { backgroundColor: `${categoryColors[item.category]}15` }]}>
            <Text style={[styles.categoryText, { color: categoryColors[item.category] }]}>
              {item.category}
            </Text>
          </View>
          <View style={styles.timeMeta}>
            <Clock size={10} color={theme.colors.secondaryText} />
            <Text style={[styles.timeText, { color: theme.colors.secondaryText }]}>
              {item.startTime}
            </Text>
          </View>
          <View style={styles.timeMeta}>
            <Timer size={10} color={theme.colors.secondaryText} />
            <Text style={[styles.timeText, { color: theme.colors.secondaryText }]}>
              {item.actualDuration || item.estimatedDuration}
            </Text>
          </View>
          {item.confidence > 0 && (
            <View style={styles.confidenceMeta}>
              <Brain size={10} color={item.confidence > 90 ? '#34C759' : item.confidence > 70 ? '#FF9500' : '#FF3B30'} />
              <Text style={[styles.confidenceText, { color: item.confidence > 90 ? '#34C759' : item.confidence > 70 ? '#FF9500' : '#FF3B30' }]}>
                {item.confidence}%
              </Text>
            </View>
          )}
          <ChevronRight 
            size={14} 
            color={theme.colors.secondaryText}
            style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }], marginLeft: 'auto' }}
          />
        </View>

        {isExpanded && (
          <View style={[styles.expandedSection, { borderTopColor: theme.colors.border }]}>
            <Text style={[styles.workDesc, { color: theme.colors.secondaryText }]}>
              {item.description}
            </Text>
            
            {item.outputSummary && (
              <View style={[styles.outputBox, { backgroundColor: `${item.color}10` }]}>
                <Zap size={14} color={item.color} />
                <Text style={[styles.outputText, { color: theme.colors.text }]}>
                  {item.outputSummary}
                </Text>
              </View>
            )}
            
            {item.metrics && (
              <View style={styles.metricsGrid}>
                {item.metrics.map((metric, index) => {
                  const TrendIcon = getTrendIcon(metric.trend);
                  return (
                    <View key={index} style={[styles.metricBox, { backgroundColor: `${item.color}10` }]}>
                      <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
                        {metric.label}
                      </Text>
                      <View style={styles.metricValueRow}>
                        <Text style={[styles.metricValue, { color: item.color }]}>
                          {metric.value}
                        </Text>
                        {TrendIcon && <TrendIcon size={12} color={metric.trend === 'up' ? '#34C759' : '#FF3B30'} />}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}

            {item.dependencies && item.dependencies.length > 0 && (
              <View style={styles.dependenciesRow}>
                <GitBranch size={12} color={theme.colors.secondaryText} />
                <Text style={[styles.dependenciesText, { color: theme.colors.secondaryText }]}>
                  Dependencies: {item.dependencies.join(', ')}
                </Text>
              </View>
            )}

            <View style={styles.techRow}>
              <View style={styles.techItem}>
                <Database size={12} color={theme.colors.secondaryText} />
                <Text style={[styles.techText, { color: theme.colors.secondaryText }]}>{(item.tokensUsed / 1000).toFixed(1)}K tokens</Text>
              </View>
              <View style={styles.techItem}>
                <Users size={12} color={theme.colors.secondaryText} />
                <Text style={[styles.techText, { color: theme.colors.secondaryText }]}>{item.assignedBy}</Text>
              </View>
            </View>

            <View style={styles.tagsRow}>
              {item.tags.map((tag, index) => (
                <View key={index} style={[styles.tagBadge, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                  <Text style={[styles.tagText, { color: theme.colors.secondaryText }]}>#{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.actionRow}>
              {item.status === 'in_progress' && (
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FF950020' }]}>
                  <Pause size={14} color="#FF9500" />
                  <Text style={[styles.actionBtnText, { color: '#FF9500' }]}>Pause</Text>
                </TouchableOpacity>
              )}
              {item.status === 'paused' && (
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#34C75920' }]}>
                  <Play size={14} color="#34C759" />
                  <Text style={[styles.actionBtnText, { color: '#34C759' }]}>Resume</Text>
                </TouchableOpacity>
              )}
              {item.status === 'failed' && (
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#007AFF20' }]}>
                  <RotateCcw size={14} color="#007AFF" />
                  <Text style={[styles.actionBtnText, { color: '#007AFF' }]}>Retry</Text>
                </TouchableOpacity>
              )}
              {item.status === 'queued' && (
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#34C75920' }]}>
                  <Play size={14} color="#34C759" />
                  <Text style={[styles.actionBtnText, { color: '#34C759' }]}>Start Now</Text>
                </TouchableOpacity>
              )}
              {item.status === 'reviewing' && (
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#34C75920' }]}>
                  <CircleCheck size={14} color="#34C759" />
                  <Text style={[styles.actionBtnText, { color: '#34C759' }]}>Approve</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={[styles.actionBtn, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                <Eye size={14} color={theme.colors.secondaryText} />
                <Text style={[styles.actionBtnText, { color: theme.colors.secondaryText }]}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Agent Work</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Tasks & Work Tracking
          </Text>
        </View>
        <TouchableOpacity 
          style={[styles.viewModeBtn, { backgroundColor: theme.colors.cardBackground }]}
          onPress={() => setViewMode(viewMode === 'list' ? 'kanban' : 'list')}
        >
          {viewMode === 'list' ? (
            <Layers size={20} color={theme.colors.primary} />
          ) : (
            <ListTodo size={20} color={theme.colors.primary} />
          )}
        </TouchableOpacity>
      </View>

      <View style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Animated.View style={[styles.summaryIconBg, { backgroundColor: '#007AFF20', transform: [{ scale: pulseAnim }] }]}>
              <Activity size={16} color="#007AFF" />
            </Animated.View>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{summary.inProgress}</Text>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Active</Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIconBg, { backgroundColor: '#34C75920' }]}>
              <CircleCheck size={16} color="#34C759" />
            </View>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{summary.completed}</Text>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Done</Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIconBg, { backgroundColor: '#8E8E9320' }]}>
              <ListTodo size={16} color="#8E8E93" />
            </View>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{summary.queued}</Text>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Queue</Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIconBg, { backgroundColor: '#FF3B3020' }]}>
              <CircleX size={16} color="#FF3B30" />
            </View>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{summary.failed}</Text>
            <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>Failed</Text>
          </View>
        </View>
        <View style={styles.summaryFooter}>
          <View style={styles.summaryFooterItem}>
            <Timer size={12} color={theme.colors.secondaryText} />
            <Text style={[styles.summaryFooterText, { color: theme.colors.secondaryText }]}>
              Avg: {summary.avgCompletionTime}
            </Text>
          </View>
          <View style={styles.summaryFooterItem}>
            <Award size={12} color="#34C759" />
            <Text style={[styles.summaryFooterText, { color: '#34C759' }]}>
              {summary.successRate}% Success
            </Text>
          </View>
          <View style={styles.summaryFooterItem}>
            <Cpu size={12} color={theme.colors.secondaryText} />
            <Text style={[styles.summaryFooterText, { color: theme.colors.secondaryText }]}>
              {summary.efficiency}% Eff
            </Text>
          </View>
          <View style={styles.summaryFooterItem}>
            <Database size={12} color={theme.colors.secondaryText} />
            <Text style={[styles.summaryFooterText, { color: theme.colors.secondaryText }]}>
              {(summary.totalTokens / 1000000).toFixed(1)}M tokens
            </Text>
          </View>
        </View>
      </View>

      {renderWorkflowPipeline()}

      <View style={[styles.searchContainer, { backgroundColor: theme.colors.cardBackground }]}>
        <Search size={18} color={theme.colors.secondaryText} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search tasks, agents, tags..."
          placeholderTextColor={theme.colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <CircleX size={16} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.priorityScroll}
        contentContainerStyle={styles.filterContainer}
      >
        {priorities.map((priority) => (
          <TouchableOpacity
            key={priority}
            style={[
              styles.priorityChip,
              selectedPriority === priority && { backgroundColor: getPriorityColor(priority) },
              selectedPriority !== priority && { backgroundColor: theme.colors.cardBackground },
            ]}
            onPress={() => setSelectedPriority(priority)}
          >
            {priority !== 'all' && React.createElement(getPriorityIcon(priority), {
              size: 10,
              color: selectedPriority === priority ? '#fff' : getPriorityColor(priority)
            })}
            <Text style={[
              styles.priorityChipText,
              { color: selectedPriority === priority ? '#fff' : theme.colors.secondaryText }
            ]}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.filterContainer}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              selectedCategory === cat && { backgroundColor: categoryColors[cat] || theme.colors.primary },
              selectedCategory !== cat && { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.border },
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[
              styles.categoryChipText,
              { color: selectedCategory === cat ? '#fff' : theme.colors.secondaryText }
            ]}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.resultsHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Active Work
          </Text>
          <Text style={[styles.resultsCount, { color: theme.colors.secondaryText }]}>{filteredWork.length} tasks</Text>
        </View>
        
        {filteredWork.map(renderWorkItem)}
        
        {filteredWork.length === 0 && (
          <View style={styles.emptyState}>
            <Layers size={48} color={theme.colors.secondaryText} />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No tasks found</Text>
            <Text style={[styles.emptyDesc, { color: theme.colors.secondaryText }]}>
              Try adjusting your filters
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerCenter: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  viewModeBtn: {
    padding: 10,
    borderRadius: 12,
  },
  summaryCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 14,
    borderRadius: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  summaryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  summaryFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  summaryFooterText: {
    fontSize: 11,
    fontWeight: '500',
  },
  pipelineContainer: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
  },
  pipelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  pipelineTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  pipelineStages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pipelineStage: {
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  stageCount: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stageCountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  stageName: {
    fontSize: 9,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  priorityScroll: {
    maxHeight: 36,
    marginBottom: 8,
  },
  categoryScroll: {
    maxHeight: 32,
    marginBottom: 12,
  },
  filterContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  priorityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  priorityChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  categoryChipText: {
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  resultsCount: {
    fontSize: 12,
  },
  workCard: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  workHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  workIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  workInfo: {
    flex: 1,
  },
  workTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  workTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  priorityText: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  workAgent: {
    fontSize: 11,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 10,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 3,
  },
  progressBarFill: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    width: 36,
    textAlign: 'right',
  },
  workMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  timeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  timeText: {
    fontSize: 10,
  },
  confidenceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: '600',
  },
  expandedSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  workDesc: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
  },
  outputBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 8,
    gap: 8,
    marginBottom: 10,
  },
  outputText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  metricBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 70,
  },
  metricLabel: {
    fontSize: 9,
    marginBottom: 2,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  dependenciesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  dependenciesText: {
    fontSize: 11,
  },
  techRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 10,
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  techText: {
    fontSize: 10,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptyDesc: {
    fontSize: 14,
    marginTop: 4,
  },
});
