 
import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Search,
  ListFilter,
  Clock,
  CircleCheck,
  CircleX,
  TriangleAlert,
  Phone,
  Mail,
  FileText,
  DollarSign,
  TrendingUp,
  Headphones,
  Target,
  ChevronRight,
  Download,
  RefreshCw,
  Shield,
  Sparkles,
  Brain,
  Activity,
  RotateCcw,
  Share2,
  Bookmark,
  ArrowUpRight,
  ArrowDownRight,
  Database,
  Zap,
  ChartBarBig,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

import { trpc } from '@/lib/trpc';

Dimensions.get('window');

interface HistoryItem {
  id: string;
  agentName: string;
  agentType: 'main' | 'sub';
  parentAgent?: string;
  action: string;
  description: string;
  status: 'success' | 'failed' | 'warning' | 'pending' | 'retried';
  timestamp: string;
  rawTime: number;
  duration: string;
  category: 'customer' | 'sales' | 'marketing' | 'operations' | 'data' | 'analysis';
  details: {
    input?: string;
    output?: string;
    metrics?: { label: string; value: string; trend?: 'up' | 'down' | 'neutral' }[];
    context?: string;
    resolution?: string;
  };
  icon: React.ComponentType<any>;
  color: string;
  confidence: number;
  tokensUsed: number;
  model: string;
  version: string;
  tags: string[];
  starred: boolean;
}

// TimelineGroup interface removed - was unused
// interface TimelineGroup {
//   date: string;
//   items: HistoryItem[];
// }

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    agentName: 'AI Receptionist',
    agentType: 'sub',
    parentAgent: 'Customer Experience AI',
    action: 'Handled incoming call',
    description: 'Successfully routed customer inquiry to support team with full context transfer',
    status: 'success',
    timestamp: '2 min ago',
    rawTime: Date.now() - 120000,
    duration: '3m 24s',
    category: 'customer',
    details: {
      input: 'Customer inquiry about order status for order #45892',
      output: 'Transferred to support with context, sentiment: positive',
      metrics: [
        { label: 'Wait Time', value: '12s', trend: 'down' },
        { label: 'Satisfaction', value: '4.8/5', trend: 'up' },
        { label: 'Resolution', value: '100%' }
      ],
      context: 'VIP customer, 3rd interaction this week',
      resolution: 'Order status provided, estimated delivery shared',
    },
    icon: Phone,
    color: '#007AFF',
    confidence: 98,
    tokensUsed: 1240,
    model: 'GPT-4 Turbo',
    version: '3.2.1',
    tags: ['call', 'vip', 'order-status'],
    starred: true,
  },
  {
    id: '2',
    agentName: 'AI Lead Development Rep',
    agentType: 'sub',
    parentAgent: 'Sales & Revenue AI',
    action: 'Qualified enterprise lead',
    description: 'Identified high-value prospect from website inquiry with 85% conversion probability',
    status: 'success',
    timestamp: '5 min ago',
    rawTime: Date.now() - 300000,
    duration: '8m 15s',
    category: 'sales',
    details: {
      input: 'Website form submission - Enterprise pricing inquiry',
      output: 'Lead score: 85/100, Priority: High, Assigned to: Sarah Chen',
      metrics: [
        { label: 'Lead Score', value: '85', trend: 'up' },
        { label: 'Fit Score', value: '92', trend: 'up' },
        { label: 'Intent', value: 'High' }
      ],
      context: 'Company: TechCorp Inc., 500+ employees, SaaS vertical',
      resolution: 'Scheduled demo for Tuesday 2pm',
    },
    icon: Target,
    color: '#34C759',
    confidence: 94,
    tokensUsed: 2150,
    model: 'GPT-4 Turbo',
    version: '3.1.0',
    tags: ['enterprise', 'high-value', 'demo-scheduled'],
    starred: true,
  },
  {
    id: '3',
    agentName: 'AI Campaign Optimizer',
    agentType: 'sub',
    parentAgent: 'Marketing & Growth AI',
    action: 'Optimized ad campaign',
    description: 'Adjusted bid strategy and creative rotation based on real-time performance data',
    status: 'success',
    timestamp: '12 min ago',
    rawTime: Date.now() - 720000,
    duration: '2m 45s',
    category: 'marketing',
    details: {
      output: 'Reduced CPA by 15%, increased conversions by 8%, reallocated $2,400 budget',
      metrics: [
        { label: 'CPA Change', value: '-15%', trend: 'up' },
        { label: 'Conv. Rate', value: '+8%', trend: 'up' },
        { label: 'ROAS', value: '4.2x', trend: 'up' }
      ],
      context: 'Q4 Holiday Campaign - Google Ads',
      resolution: 'Creative B now primary, increased mobile bid by 20%',
    },
    icon: TrendingUp,
    color: '#FF9500',
    confidence: 96,
    tokensUsed: 890,
    model: 'GPT-4 Vision',
    version: '2.8.5',
    tags: ['campaign', 'optimization', 'google-ads'],
    starred: false,
  },
  {
    id: '4',
    agentName: 'AI Customer Support Agent',
    agentType: 'sub',
    parentAgent: 'Customer Experience AI',
    action: 'Resolved support ticket',
    description: 'Automated resolution for password reset request with identity verification',
    status: 'success',
    timestamp: '18 min ago',
    rawTime: Date.now() - 1080000,
    duration: '1m 12s',
    category: 'customer',
    details: {
      input: 'Password reset request with security questions',
      output: 'Reset link sent, user verified via 2FA',
      metrics: [
        { label: 'Resolution Time', value: '1m 12s', trend: 'down' },
        { label: 'Auto-resolved', value: 'Yes' },
        { label: 'Security', value: 'Verified' }
      ],
      resolution: 'Password reset completed successfully',
    },
    icon: Headphones,
    color: '#007AFF',
    confidence: 99,
    tokensUsed: 450,
    model: 'GPT-4 Turbo',
    version: '3.2.1',
    tags: ['password-reset', 'auto-resolved', 'security'],
    starred: false,
  },
  {
    id: '5',
    agentName: 'AI Negotiator',
    agentType: 'sub',
    parentAgent: 'Sales & Revenue AI',
    action: 'Deal negotiation escalated',
    description: 'Negotiation attempt reached authority limit - escalated to human sales manager',
    status: 'warning',
    timestamp: '25 min ago',
    rawTime: Date.now() - 1500000,
    duration: '15m 30s',
    category: 'sales',
    details: {
      input: 'Enterprise contract negotiation - custom terms requested',
      output: 'Customer requested 25% discount + custom SLA beyond AI authority',
      metrics: [
        { label: 'Deal Value', value: '$125K' },
        { label: 'Discount Req', value: '25%' },
        { label: 'Escalation', value: 'Sales Manager' }
      ],
      context: 'Multi-year contract with existing customer',
      resolution: 'Scheduled call with Sales Manager for final negotiation',
    },
    icon: DollarSign,
    color: '#34C759',
    confidence: 72,
    tokensUsed: 3200,
    model: 'GPT-4 Turbo',
    version: '3.1.0',
    tags: ['negotiation', 'escalated', 'enterprise'],
    starred: true,
  },
  {
    id: '6',
    agentName: 'AI Email Marketing Agent',
    agentType: 'sub',
    parentAgent: 'Marketing & Growth AI',
    action: 'Email campaign sent',
    description: 'Promotional email blast to 15,000 subscribers with personalized content',
    status: 'success',
    timestamp: '32 min ago',
    rawTime: Date.now() - 1920000,
    duration: '5m 20s',
    category: 'marketing',
    details: {
      output: 'Open rate: 24.5%, Click rate: 3.8%, Unsubscribes: 12',
      metrics: [
        { label: 'Sent', value: '15,000' },
        { label: 'Open Rate', value: '24.5%', trend: 'up' },
        { label: 'CTR', value: '3.8%', trend: 'up' }
      ],
      context: 'Black Friday Early Access Campaign',
      resolution: 'Campaign completed, A/B winner identified',
    },
    icon: Mail,
    color: '#FF9500',
    confidence: 97,
    tokensUsed: 1800,
    model: 'GPT-4 Turbo',
    version: '2.8.5',
    tags: ['email', 'campaign', 'promotional'],
    starred: false,
  },
  {
    id: '7',
    agentName: 'AI Fraud Detection Agent',
    agentType: 'sub',
    parentAgent: 'Data & Intelligence AI',
    action: 'Flagged suspicious activity',
    description: 'Detected unusual transaction pattern matching known fraud signatures',
    status: 'warning',
    timestamp: '45 min ago',
    rawTime: Date.now() - 2700000,
    duration: '0m 45s',
    category: 'data',
    details: {
      input: 'Transaction monitoring - high-value purchase',
      output: 'Flagged for manual review - potential card testing fraud',
      metrics: [
        { label: 'Risk Score', value: '87/100' },
        { label: 'Action', value: 'Hold' },
        { label: 'Pattern', value: 'Card Testing' }
      ],
      context: 'New customer, first purchase, multiple failed attempts',
      resolution: 'Transaction held, verification email sent',
    },
    icon: Shield,
    color: '#FF2D55',
    confidence: 91,
    tokensUsed: 560,
    model: 'GPT-4 Analysis',
    version: '2.9.1',
    tags: ['fraud', 'security', 'flagged'],
    starred: true,
  },
  {
    id: '8',
    agentName: 'AI Proposal Generator',
    agentType: 'sub',
    parentAgent: 'Sales & Revenue AI',
    action: 'Generated proposal',
    description: 'Created custom proposal for enterprise client with tailored pricing',
    status: 'success',
    timestamp: '1 hour ago',
    rawTime: Date.now() - 3600000,
    duration: '4m 15s',
    category: 'sales',
    details: {
      output: 'Proposal document created with custom pricing and terms',
      metrics: [
        { label: 'Pages', value: '12' },
        { label: 'Custom Elements', value: '8' },
        { label: 'Deal Value', value: '$85K' }
      ],
      resolution: 'Proposal sent to client for review',
    },
    icon: FileText,
    color: '#34C759',
    confidence: 95,
    tokensUsed: 2800,
    model: 'GPT-4 Turbo',
    version: '3.1.0',
    tags: ['proposal', 'enterprise', 'custom'],
    starred: false,
  },
  {
    id: '9',
    agentName: 'Performance Monitoring AI',
    agentType: 'sub',
    parentAgent: 'Analysis & Performance AI',
    action: 'Daily report generated',
    description: 'Compiled daily KPI summary for all departments with anomaly detection',
    status: 'success',
    timestamp: '1 hour ago',
    rawTime: Date.now() - 4200000,
    duration: '2m 30s',
    category: 'analysis',
    details: {
      output: 'Report distributed to 12 stakeholders, 3 alerts generated',
      metrics: [
        { label: 'KPIs Tracked', value: '45' },
        { label: 'Alerts', value: '3' },
        { label: 'Anomalies', value: '2' }
      ],
      resolution: 'Report delivered, follow-up scheduled for anomalies',
    },
    icon: ChartBarBig,
    color: '#AF52DE',
    confidence: 99,
    tokensUsed: 1200,
    model: 'GPT-4 Executive',
    version: '3.0.0',
    tags: ['report', 'daily', 'kpi'],
    starred: false,
  },
  {
    id: '10',
    agentName: 'AI Ticket Resolution Agent',
    agentType: 'sub',
    parentAgent: 'Customer Experience AI',
    action: 'Ticket resolution failed',
    description: 'Unable to resolve complex technical integration issue automatically',
    status: 'failed',
    timestamp: '2 hours ago',
    rawTime: Date.now() - 7200000,
    duration: '8m 45s',
    category: 'customer',
    details: {
      input: 'Technical integration issue with API authentication',
      output: 'Escalated to L2 support team - requires developer assistance',
      metrics: [
        { label: 'Complexity', value: 'High' },
        { label: 'Escalation', value: 'L2 Support' },
        { label: 'Priority', value: 'P1' }
      ],
      context: 'Enterprise customer, production impacting issue',
      resolution: 'Ticket assigned to senior engineer',
    },
    icon: Headphones,
    color: '#007AFF',
    confidence: 45,
    tokensUsed: 2400,
    model: 'GPT-4 Turbo',
    version: '3.2.1',
    tags: ['technical', 'escalated', 'api'],
    starred: false,
  },
  {
    id: '11',
    agentName: 'AI Content Generator',
    agentType: 'sub',
    parentAgent: 'Marketing & Growth AI',
    action: 'Created blog content',
    description: 'Generated SEO-optimized blog post with images and meta descriptions',
    status: 'success',
    timestamp: '3 hours ago',
    rawTime: Date.now() - 10800000,
    duration: '6m 12s',
    category: 'marketing',
    details: {
      output: '2,500 word article with 5 images, SEO score: 92/100',
      metrics: [
        { label: 'Words', value: '2,500' },
        { label: 'SEO Score', value: '92' },
        { label: 'Readability', value: 'A+' }
      ],
      resolution: 'Published to blog, social shares scheduled',
    },
    icon: Sparkles,
    color: '#FF9500',
    confidence: 96,
    tokensUsed: 4500,
    model: 'GPT-4 Vision',
    version: '2.8.5',
    tags: ['content', 'blog', 'seo'],
    starred: false,
  },
  {
    id: '12',
    agentName: 'AI Risk Analyst',
    agentType: 'sub',
    parentAgent: 'Data & Intelligence AI',
    action: 'Risk assessment completed',
    description: 'Quarterly risk assessment with mitigation recommendations',
    status: 'success',
    timestamp: '4 hours ago',
    rawTime: Date.now() - 14400000,
    duration: '12m 30s',
    category: 'data',
    details: {
      output: 'Identified 5 medium risks, 2 high risks, mitigation plan created',
      metrics: [
        { label: 'High Risks', value: '2' },
        { label: 'Medium Risks', value: '5' },
        { label: 'Mitigated', value: '3' }
      ],
      resolution: 'Report shared with leadership, action items assigned',
    },
    icon: TriangleAlert,
    color: '#FF2D55',
    confidence: 94,
    tokensUsed: 3100,
    model: 'GPT-4 Analysis',
    version: '2.9.1',
    tags: ['risk', 'assessment', 'quarterly'],
    starred: true,
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

export default function AgentHistoryScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  
  // Fetch real history data from tRPC
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ 
    limit: 100 
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'time' | 'confidence' | 'duration'>('time');
  const [starredOnly, setStarredOnly] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const categories = ['all', 'customer', 'sales', 'marketing', 'operations', 'data', 'analysis'];
  const statuses = ['all', 'success', 'failed', 'warning', 'retried'];

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const filteredHistory = useMemo(() => {
    const historyToFilter = activityData?.activities.map((a: any) => ({
      id: a.id,
      agentName: a.agentName,
      agentType: 'sub' as const,
      action: a.action,
      description: a.details?.description || a.action,
      status: a.status as any,
      timestamp: new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rawTime: new Date(a.timestamp).getTime(),
      duration: a.details?.duration ? `${Math.floor(a.details.duration / 60)}m ${a.details.duration % 60}s` : '—',
      category: a.details?.category || 'customer',
      details: a.details || {},
      icon: Phone, // Default icon, would ideally map from agentName
      color: '#007AFF',
      confidence: a.details?.confidence || 95,
      tokensUsed: a.details?.tokensUsed || 0,
      model: a.details?.model || 'GPT-4',
      version: '1.0.0',
      tags: a.details?.tags || [],
      starred: false,
    })) || mockHistory;

    let results = historyToFilter.filter((item: any) => {
      const matchesSearch = item.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
      const matchesStarred = !starredOnly || item.starred;
      return matchesSearch && matchesCategory && matchesStatus && matchesStarred;
    });

    if (sortBy === 'confidence') {
      results = results.sort((a: any, b: any) => b.confidence - a.confidence);
    } else if (sortBy === 'duration') {
      results = results.sort((a: any, b: any) => {
        const aDuration = parseInt(a.duration.split('m')[0]) * 60 + parseInt(a.duration.split('m')[1]?.replace('s', '') || '0');
        const bDuration = parseInt(b.duration.split('m')[0]) * 60 + parseInt(b.duration.split('m')[1]?.replace('s', '') || '0');
        return bDuration - aDuration;
      });
    }

    return results;
  }, [searchQuery, selectedCategory, selectedStatus, sortBy, starredOnly, activityData?.activities]);

  const stats = useMemo(() => {
    const historyToUse = activityData?.activities.map((a: any) => ({
      status: a.status as any,
      confidence: a.details?.confidence || 95,
      tokensUsed: a.details?.tokensUsed || 0,
    })) || mockHistory;

    const total = historyToUse.length;
    const success = historyToUse.filter((h: any) => h.status === 'success' || h.status === 'completed').length;
    const failed = historyToUse.filter((h: any) => h.status === 'failed').length;
    const warnings = historyToUse.filter((h: any) => h.status === 'warning').length;
    const avgConfidence = Math.round(historyToUse.reduce((acc: number, h: any) => acc + (h.confidence || 0), 0) / total);
    const totalTokens = historyToUse.reduce((acc: number, h: any) => acc + (h.tokensUsed || 0), 0);
    return { total, success, failed, warnings, successRate: Math.round((success / total) * 100) || 0, avgConfidence, totalTokens };
  }, [activityData]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return CircleCheck;
      case 'failed': return CircleX;
      case 'warning': return TriangleAlert;
      case 'retried': return RotateCcw;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#34C759';
      case 'failed': return '#FF3B30';
      case 'warning': return '#FF9500';
      case 'retried': return '#007AFF';
      default: return '#8E8E93';
    }
  };

  const getTrendIcon = (trend?: string) => {
    if (trend === 'up') return ArrowUpRight;
    if (trend === 'down') return ArrowDownRight;
    return null;
  };

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => {
    const StatusIcon = getStatusIcon(item.status);
    const isExpanded = expandedItem === item.id;
    
    return (
      <TouchableOpacity 
        style={[styles.historyCard, { backgroundColor: theme.colors.cardBackground }]}
        onPress={() => setExpandedItem(isExpanded ? null : item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.historyHeader}>
          <View style={[styles.historyIcon, { backgroundColor: `${item.color}20` }]}>
            <item.icon size={20} color={item.color} />
          </View>
          <View style={styles.historyInfo}>
            <View style={styles.historyTitleRow}>
              <Text style={[styles.historyAgent, { color: theme.colors.text }]} numberOfLines={1}>
                {item.agentName}
              </Text>
              {item.starred && (
                <Bookmark size={12} color="#FF9500" fill="#FF9500" />
              )}
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
                <StatusIcon size={10} color={getStatusColor(item.status)} />
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <Text style={[styles.historyAction, { color: theme.colors.text }]}>{item.action}</Text>
            <Text style={[styles.historyDesc, { color: theme.colors.secondaryText }]} numberOfLines={2}>
              {item.description}
            </Text>
            <View style={styles.historyMeta}>
              <View style={[styles.categoryBadge, { backgroundColor: `${categoryColors[item.category]}15` }]}>
                <Text style={[styles.categoryText, { color: categoryColors[item.category] }]}>
                  {item.category}
                </Text>
              </View>
              <View style={styles.timeMeta}>
                <Clock size={10} color={theme.colors.secondaryText} />
                <Text style={[styles.timeText, { color: theme.colors.secondaryText }]}>{item.timestamp}</Text>
              </View>
              <Text style={[styles.durationText, { color: theme.colors.secondaryText }]}>
                {item.duration}
              </Text>
              <View style={styles.confidenceMeta}>
                <Brain size={10} color={theme.colors.secondaryText} />
                <Text style={[styles.confidenceText, { color: item.confidence > 90 ? '#34C759' : item.confidence > 70 ? '#FF9500' : '#FF3B30' }]}>
                  {item.confidence}%
                </Text>
              </View>
            </View>
          </View>
          <ChevronRight 
            size={18} 
            color={theme.colors.secondaryText} 
            style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }}
          />
        </View>
        
        {isExpanded && (
          <View style={[styles.expandedDetails, { borderTopColor: theme.colors.border }]}>
            {item.parentAgent && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Parent Agent</Text>
                <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.parentAgent}</Text>
              </View>
            )}
            {item.details.input && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Input</Text>
                <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.details.input}</Text>
              </View>
            )}
            {item.details.output && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Output</Text>
                <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.details.output}</Text>
              </View>
            )}
            {item.details.context && (
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Context</Text>
                <Text style={[styles.detailValue, { color: theme.colors.text }]}>{item.details.context}</Text>
              </View>
            )}
            {item.details.resolution && (
              <View style={[styles.resolutionBox, { backgroundColor: `${item.color}10` }]}>
                <CircleCheck size={14} color={item.color} />
                <Text style={[styles.resolutionText, { color: theme.colors.text }]}>{item.details.resolution}</Text>
              </View>
            )}
            {item.details.metrics && (
              <View style={styles.metricsRow}>
                {item.details.metrics.map((metric, index) => {
                  const TrendIcon = getTrendIcon(metric.trend);
                  return (
                    <View key={index} style={[styles.metricBadge, { backgroundColor: `${item.color}15` }]}>
                      <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>{metric.label}</Text>
                      <View style={styles.metricValueRow}>
                        <Text style={[styles.metricValue, { color: item.color }]}>{metric.value}</Text>
                        {TrendIcon && <TrendIcon size={12} color={metric.trend === 'up' ? '#34C759' : '#FF3B30'} />}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
            <View style={styles.techDetails}>
              <View style={styles.techItem}>
                <Database size={12} color={theme.colors.secondaryText} />
                <Text style={[styles.techText, { color: theme.colors.secondaryText }]}>{item.model} v{item.version}</Text>
              </View>
              <View style={styles.techItem}>
                <Zap size={12} color={theme.colors.secondaryText} />
                <Text style={[styles.techText, { color: theme.colors.secondaryText }]}>{item.tokensUsed.toLocaleString()} tokens</Text>
              </View>
            </View>
            <View style={styles.tagsRow}>
              {item.tags.map((tag, index) => (
                <View key={index} style={[styles.tagBadge, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                  <Text style={[styles.tagText, { color: theme.colors.secondaryText }]}>#{tag}</Text>
                </View>
              ))}
            </View>
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                <RotateCcw size={14} color={theme.colors.secondaryText} />
                <Text style={[styles.actionButtonText, { color: theme.colors.secondaryText }]}>Retry</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                <Share2 size={14} color={theme.colors.secondaryText} />
                <Text style={[styles.actionButtonText, { color: theme.colors.secondaryText }]}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: item.starred ? '#FF950020' : 'rgba(0,0,0,0.05)' }]}>
                <Bookmark size={14} color={item.starred ? '#FF9500' : theme.colors.secondaryText} fill={item.starred ? '#FF9500' : 'transparent'} />
                <Text style={[styles.actionButtonText, { color: item.starred ? '#FF9500' : theme.colors.secondaryText }]}>Save</Text>
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
          <Text style={[styles.title, { color: theme.colors.text }]}>Agent History</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Activity logs & action timeline
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.headerButton, { backgroundColor: theme.colors.cardBackground }]}
            onPress={() => setShowFilters(!showFilters)}
          >
            <ListFilter size={18} color={showFilters ? theme.colors.primary : theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: theme.colors.cardBackground }]}>
            <Download size={18} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.statsBar, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.statItem}>
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <Activity size={16} color="#007AFF" />
          </Animated.View>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{stats.total}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <CircleCheck size={16} color="#34C759" />
          <Text style={[styles.statValue, { color: '#34C759' }]}>{stats.success}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Success</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <TriangleAlert size={16} color="#FF9500" />
          <Text style={[styles.statValue, { color: '#FF9500' }]}>{stats.warnings}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Warnings</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <CircleX size={16} color="#FF3B30" />
          <Text style={[styles.statValue, { color: '#FF3B30' }]}>{stats.failed}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Failed</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Brain size={16} color="#AF52DE" />
          <Text style={[styles.statValue, { color: '#AF52DE' }]}>{stats.avgConfidence}%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Confidence</Text>
        </View>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.colors.cardBackground }]}>
        <Search size={18} color={theme.colors.secondaryText} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search history, agents, tags..."
          placeholderTextColor={theme.colors.secondaryText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <CircleX size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        )}
      </View>

      {showFilters && (
        <View style={[styles.filtersPanel, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: theme.colors.text }]}>Sort By</Text>
            <View style={styles.sortOptions}>
              {(['time', 'confidence', 'duration'] as const).map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.sortOption, sortBy === option && { backgroundColor: theme.colors.primary }]}
                  onPress={() => setSortBy(option)}
                >
                  <Text style={[styles.sortOptionText, { color: sortBy === option ? '#fff' : theme.colors.secondaryText }]}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity 
            style={styles.starredToggle}
            onPress={() => setStarredOnly(!starredOnly)}
          >
            <Bookmark size={16} color={starredOnly ? '#FF9500' : theme.colors.secondaryText} fill={starredOnly ? '#FF9500' : 'transparent'} />
            <Text style={[styles.starredText, { color: starredOnly ? '#FF9500' : theme.colors.secondaryText }]}>Starred Only</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContainer}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterChip,
              selectedCategory === cat && { backgroundColor: categoryColors[cat] || theme.colors.primary },
              selectedCategory !== cat && { backgroundColor: theme.colors.cardBackground },
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[
              styles.filterChipText,
              { color: selectedCategory === cat ? '#fff' : theme.colors.secondaryText }
            ]}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.statusFilter}>
        {statuses.map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusChip,
              selectedStatus === status && { backgroundColor: getStatusColor(status) + '30' },
            ]}
            onPress={() => setSelectedStatus(status)}
          >
            {status !== 'all' && React.createElement(getStatusIcon(status), { 
              size: 12, 
              color: selectedStatus === status ? getStatusColor(status) : theme.colors.secondaryText 
            })}
            <Text style={[
              styles.statusChipText,
              { color: selectedStatus === status ? getStatusColor(status) : theme.colors.secondaryText }
            ]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredHistory}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={[styles.resultsCount, { color: theme.colors.secondaryText }]}>
            {filteredHistory.length} results
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <RefreshCw size={48} color={theme.colors.secondaryText} />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No history found</Text>
            <Text style={[styles.emptyDesc, { color: theme.colors.secondaryText }]}>
              Try adjusting your filters
            </Text>
          </View>
        }
      />
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 10,
    borderRadius: 12,
  },
  statsBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 12,
    borderRadius: 14,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 9,
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
  filtersPanel: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 12,
    borderRadius: 12,
  },
  filterSection: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  sortOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  sortOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  sortOptionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  starredToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starredText: {
    fontSize: 13,
    fontWeight: '500',
  },
  filterScroll: {
    maxHeight: 40,
    marginBottom: 8,
  },
  filterContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusFilter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    gap: 8,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statusChipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  resultsCount: {
    fontSize: 12,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  historyCard: {
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  historyAgent: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  historyAction: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  historyDesc: {
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 8,
  },
  historyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
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
  durationText: {
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
  expandedDetails: {
    padding: 14,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  detailRow: {
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 12,
    lineHeight: 16,
  },
  resolutionBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 8,
    gap: 8,
    marginBottom: 10,
  },
  resolutionText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  metricBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
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
    fontSize: 13,
    fontWeight: '700',
  },
  techDetails: {
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
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  actionButtonText: {
    fontSize: 11,
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

