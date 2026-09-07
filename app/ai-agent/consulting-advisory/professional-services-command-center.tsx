import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import {
  LayoutDashboard,
  Bot,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Users,
  Zap,
  DollarSign,
  Briefcase,
  Brain,
  Settings,
  Search,
  Bell,
  Filter,
  MoreVertical,
  RefreshCw,
  Download,
  Share2,
  Eye,
  Plus,
  Minus,
  X,
  Save,
  Edit2,
  Trash2,
  Copy,
  LineChart,
  PieChart,
  Calendar,
  Clock,
  Globe,
  FileText,
  Lightbulb,
  Rocket,
  GitBranch,
  Flame,
  Heart,
  Award,
  Flag,
  Code,
  Layers,
  Network,
  Sparkles,
  Info,
  Beaker,
  Route,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  User,
  Building2,
  Handshake,
  FileCheck,
  Timer,
  Receipt,
  Scale,
  ShieldCheck,
  BookOpen
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Types
interface ProfessionalServicesKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
  icon: any;
}

interface ServicesAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  deliveryImpact: number;
  metrics: {
    projectsManaged?: number;
    clientsAnalyzed?: number;
    consultantsOptimized?: number;
    deliveryEfficiency?: string;
    marginImprovement?: string;
    satisfactionPrediction?: number;
    upsellOpportunities?: number;
  };
  activeInsights: number;
  trend: 'up' | 'down' | 'stable';
}

interface ProjectEngagement {
  id: string;
  name: string;
  client: string;
  status: 'active' | 'at-risk' | 'completed' | 'on-hold';
  progress: number;
  margin: string;
  teamSize: number;
  deadline: string;
  health: 'healthy' | 'warning' | 'critical';
}

interface Consultant {
  id: string;
  name: string;
  role: string;
  utilization: number;
  skills: string[];
  availability: 'available' | 'booked' | 'on-leave';
  currentProject: string;
}

interface TimeBillingData {
  id: string;
  category: string;
  hours: number;
  billable: number;
  nonBillable: number;
  leakage: string;
}

interface ClientData {
  id: string;
  name: string;
  industry: string;
  healthScore: number;
  satisfaction: number;
  contractValue: string;
  expansionRisk: 'low' | 'medium' | 'high';
  upsellProbability: number;
}

interface ProposalData {
  id: string;
  name: string;
  client: string;
  value: string;
  stage: 'draft' | 'submitted' | 'review' | 'won' | 'lost';
  winProbability: number;
  team: string;
}

interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  type: 'case-study' | 'best-practice' | 'template' | 'insight';
  usage: number;
  rating: number;
}

interface RiskItem {
  id: string;
  project: string;
  type: string;
  severity: 'high' | 'medium' | 'low';
  status: 'detected' | 'mitigating' | 'resolved';
  impact: string;
}

interface ProfitabilityData {
  id: string;
  engagement: string;
  revenue: string;
  cost: string;
  margin: string;
  marginTrend: 'up' | 'down' | 'stable';
}

interface ServicesInsight {
  id: string;
  insight: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
  action: string;
}

interface DeliveryActivity {
  id: string;
  event: string;
  type: 'milestone' | 'approval' | 'resource' | 'risk' | 'proposal' | 'invoice' | 'escalation';
  timestamp: string;
  details: string;
}

interface SystemHealth {
  id: string;
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

const ProfessionalServicesCommandCenter = () => {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Delivery Agents', icon: Bot },
    { id: 'projects', label: 'Projects & Engagements', icon: Briefcase },
    { id: 'clients', label: 'Clients', icon: Building2 },
    { id: 'resources', label: 'Resource Management', icon: Users },
    { id: 'billing', label: 'Time & Billing', icon: Timer },
    { id: 'proposals', label: 'Proposals & Sales', icon: Handshake },
    { id: 'knowledge', label: 'Knowledge Management', icon: BookOpen },
    { id: 'risk', label: 'Risk & Delivery Health', icon: ShieldCheck },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Professional Services KPIs
  const servicesKPIs: ProfessionalServicesKPI[] = [
    { id: '1', title: 'Active Projects', value: '2,480', change: '+12.4%', trend: 'up', color: '#06B6D4', subtitle: 'Engagements active', icon: Briefcase },
    { id: '2', title: 'Utilization Rate', value: '87%', change: '+3.2%', trend: 'up', color: '#10B981', subtitle: 'Consultant utilization', icon: UtilizationIcon },
    { id: '3', title: 'Billable Hours', value: '842K', change: '+8.6%', trend: 'up', color: '#8B5CF6', subtitle: 'This month', icon: Timer },
    { id: '4', title: 'Revenue per Consultant', value: '$284K', change: '+6.4%', trend: 'up', color: '#EC4899', subtitle: 'Annual revenue', icon: ConsultantIcon },
    { id: '5', title: 'Project Margin', value: '34%', change: '+2.1%', trend: 'up', color: '#10B981', subtitle: 'Average margin', icon: MarginIcon },
    { id: '6', title: 'Client Satisfaction', value: '91', change: '+4.2%', trend: 'up', color: '#06B6D4', subtitle: 'NPS Score', icon: SatisfactionIcon },
    { id: '7', title: 'Delivery On-Time Rate', value: '94%', change: '+1.8%', trend: 'up', color: '#10B981', subtitle: 'On-time delivery', icon: OnTimeIcon },
    { id: '8', title: 'Pipeline Value', value: '$840M', change: '+14.2%', trend: 'up', color: '#8B5CF6', subtitle: 'Sales pipeline', icon: PipelineIcon },
    { id: '9', title: 'Resource Efficiency', value: '92%', change: '+5.6%', trend: 'up', color: '#F59E0B', subtitle: 'Allocation efficiency', icon: EfficiencyIcon },
    { id: '10', title: 'AI Productivity Impact', value: '+$184M', change: '+22.4%', trend: 'up', color: '#10B981', subtitle: 'AI-driven savings', icon: AIProductivityIcon },
  ];

  // AI Professional Services Agents
  const servicesAgents: ServicesAgent[] = [
    {
      id: '1',
      name: 'Agent Nexus',
      specialty: 'Project Delivery Optimization Agent',
      avatar: '🎯',
      status: 'active',
      confidenceScore: 97,
      deliveryImpact: 92,
      metrics: {
        projectsManaged: 842,
        deliveryEfficiency: '+22%',
        marginImprovement: '+18%',
      },
      activeInsights: 156,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Oracle',
      specialty: 'Client Intelligence Agent',
      avatar: '🔮',
      status: 'active',
      confidenceScore: 96,
      deliveryImpact: 88,
      metrics: {
        clientsAnalyzed: 12480,
        satisfactionPrediction: 94,
        upsellOpportunities: 3820,
      },
      activeInsights: 234,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Agent Vector',
      specialty: 'Resource Allocation Agent',
      avatar: '📊',
      status: 'active',
      confidenceScore: 95,
      deliveryImpact: 90,
      metrics: {
        consultantsOptimized: 48200,
        deliveryEfficiency: '+19%',
      },
      activeInsights: 89,
      trend: 'stable',
    },
    {
      id: '4',
      name: 'Agent Sentinel',
      specialty: 'Delivery Risk Monitoring Agent',
      avatar: '🛡️',
      status: 'active',
      confidenceScore: 94,
      deliveryImpact: 85,
      metrics: {
        projectsManaged: 1240,
        marginImprovement: '+12%',
      },
      activeInsights: 67,
      trend: 'up',
    },
    {
      id: '5',
      name: 'Agent Catalyst',
      specialty: 'Knowledge Management Agent',
      avatar: '📚',
      status: 'active',
      confidenceScore: 93,
      deliveryImpact: 82,
      metrics: {
        deliveryEfficiency: '+15%',
      },
      activeInsights: 123,
      trend: 'up',
    },
  ];

  // Project Engagements
  const projectEngagements: ProjectEngagement[] = [
    { id: '1', name: 'Digital Transformation Initiative', client: 'Fortune 500 Tech Corp', status: 'active', progress: 78, margin: '38%', teamSize: 24, deadline: '2024-03-15', health: 'healthy' },
    { id: '2', name: 'Cloud Migration Strategy', client: 'Global Financial Services', status: 'active', progress: 62, margin: '34%', teamSize: 18, deadline: '2024-04-01', health: 'healthy' },
    { id: '3', name: 'AI Implementation Program', client: 'Healthcare Systems Inc', status: 'at-risk', progress: 45, margin: '28%', teamSize: 32, deadline: '2024-02-28', health: 'warning' },
    { id: '4', name: 'Process Optimization Project', client: 'Manufacturing Leader', status: 'active', progress: 89, margin: '42%', teamSize: 12, deadline: '2024-02-15', health: 'healthy' },
    { id: '5', name: 'Data Analytics Platform', client: 'Retail Giant', status: 'on-hold', progress: 34, margin: '31%', teamSize: 16, deadline: '2024-05-01', health: 'critical' },
  ];

  // Consultants
  const consultants: Consultant[] = [
    { id: '1', name: 'Dr. Sarah Chen', role: 'Senior Strategy Consultant', utilization: 94, skills: ['Strategy', 'Digital Transformation', 'Change Management'], availability: 'booked', currentProject: 'Digital Transformation Initiative' },
    { id: '2', name: 'Michael Rodriguez', role: 'Technology Architect', utilization: 88, skills: ['Cloud Architecture', 'DevOps', 'Security'], availability: 'booked', currentProject: 'Cloud Migration Strategy' },
    { id: '3', name: 'Emily Watson', role: 'Data Science Lead', utilization: 76, skills: ['AI/ML', 'Data Analytics', 'Python'], availability: 'available', currentProject: 'AI Implementation Program' },
    { id: '4', name: 'James Park', role: 'Process Improvement Expert', utilization: 92, skills: ['Lean Six Sigma', 'Process Design', 'Automation'], availability: 'booked', currentProject: 'Process Optimization Project' },
    { id: '5', name: 'Aisha Johnson', role: 'Change Management Consultant', utilization: 82, skills: ['Change Management', 'Communication', 'Training'], availability: 'available', currentProject: 'Digital Transformation Initiative' },
  ];

  // Time & Billing Data
  const timeBillingData: TimeBillingData[] = [
    { id: '1', category: 'Strategy Consulting', hours: 12400, billable: 11800, nonBillable: 600, leakage: '4.8%' },
    { id: '2', category: 'Technology Implementation', hours: 8900, billable: 8200, nonBillable: 700, leakage: '7.9%' },
    { id: '3', category: 'Data Analytics', hours: 6200, billable: 5800, nonBillable: 400, leakage: '6.5%' },
    { id: '4', category: 'Change Management', hours: 4800, billable: 4500, nonBillable: 300, leakage: '6.3%' },
    { id: '5', category: 'Process Optimization', hours: 3600, billable: 3400, nonBillable: 200, leakage: '5.6%' },
  ];

  // Client Data
  const clientData: ClientData[] = [
    { id: '1', name: 'Fortune 500 Tech Corp', industry: 'Technology', healthScore: 94, satisfaction: 92, contractValue: '$12.4M', expansionRisk: 'low', upsellProbability: 78 },
    { id: '2', name: 'Global Financial Services', industry: 'Financial Services', healthScore: 89, satisfaction: 88, contractValue: '$8.9M', expansionRisk: 'medium', upsellProbability: 65 },
    { id: '3', name: 'Healthcare Systems Inc', industry: 'Healthcare', healthScore: 76, satisfaction: 82, contractValue: '$6.2M', expansionRisk: 'high', upsellProbability: 42 },
    { id: '4', name: 'Manufacturing Leader', industry: 'Manufacturing', healthScore: 91, satisfaction: 90, contractValue: '$4.8M', expansionRisk: 'low', upsellProbability: 72 },
    { id: '5', name: 'Retail Giant', industry: 'Retail', healthScore: 84, satisfaction: 86, contractValue: '$3.6M', expansionRisk: 'medium', upsellProbability: 58 },
  ];

  // Proposal Data
  const proposalData: ProposalData[] = [
    { id: '1', name: 'Enterprise AI Platform', client: 'Fortune 500 Tech Corp', value: '$4.2M', stage: 'submitted', winProbability: 78, team: 'Digital Transformation' },
    { id: '2', name: 'Supply Chain Optimization', client: 'Global Logistics', value: '$2.8M', stage: 'review', winProbability: 65, team: 'Operations Consulting' },
    { id: '3', name: 'Customer Experience Transformation', client: 'Retail Giant', value: '$3.4M', stage: 'draft', winProbability: 72, team: 'Customer Experience' },
    { id: '4', name: 'Cybersecurity Assessment', client: 'Healthcare Systems Inc', value: '$1.2M', stage: 'submitted', winProbability: 85, team: 'Security Consulting' },
    { id: '5', name: 'Sustainability Strategy', client: 'Manufacturing Leader', value: '$1.8M', stage: 'won', winProbability: 100, team: 'Sustainability' },
  ];

  // Knowledge Items
  const knowledgeItems: KnowledgeItem[] = [
    { id: '1', title: 'Digital Transformation Framework v3.0', category: 'Strategy', type: 'best-practice', usage: 284, rating: 4.8 },
    { id: '2', title: 'Cloud Migration Playbook', category: 'Technology', type: 'template', usage: 198, rating: 4.6 },
    { id: '3', title: 'AI Implementation Case Study: Healthcare', category: 'Case Studies', type: 'case-study', usage: 156, rating: 4.9 },
    { id: '4', title: 'Change Management Toolkit', category: 'Change Management', type: 'template', usage: 234, rating: 4.7 },
    { id: '5', title: 'Process Optimization Methodology', category: 'Operations', type: 'best-practice', usage: 178, rating: 4.5 },
  ];

  // Risk Items
  const riskItems: RiskItem[] = [
    { id: '1', project: 'AI Implementation Program', type: 'Scope Creep', severity: 'high', status: 'mitigating', impact: '12% margin erosion' },
    { id: '2', project: 'Cloud Migration Strategy', type: 'Resource Shortage', severity: 'medium', status: 'detected', impact: 'Timeline delay 2 weeks' },
    { id: '3', project: 'Digital Transformation Initiative', type: 'Client Escalation', severity: 'high', status: 'resolved', impact: 'Resolved - Client satisfied' },
    { id: '4', project: 'Data Analytics Platform', type: 'Budget Overrun', severity: 'medium', status: 'detected', impact: '8% over budget' },
  ];

  // Profitability Data
  const profitabilityData: ProfitabilityData[] = [
    { id: '1', engagement: 'Digital Transformation Initiative', revenue: '$4.2M', cost: '$2.6M', margin: '38%', marginTrend: 'up' },
    { id: '2', engagement: 'Cloud Migration Strategy', revenue: '$2.8M', cost: '$1.8M', margin: '36%', marginTrend: 'stable' },
    { id: '3', engagement: 'AI Implementation Program', revenue: '$3.4M', cost: '$2.4M', margin: '29%', marginTrend: 'down' },
    { id: '4', engagement: 'Process Optimization Project', revenue: '$1.8M', cost: '$1.0M', margin: '44%', marginTrend: 'up' },
  ];

  // Services Insights
  const servicesInsights: ServicesInsight[] = [
    { id: '1', insight: 'Project Alpha at risk of 12% margin erosion due to scope expansion. Recommend scope review with client.', category: 'Margin Risk', confidence: 94, impact: 'high', timestamp: '2h ago', action: 'Review scope' },
    { id: '2', insight: 'Resource shortage predicted in Data Engineering practice. Recommend hiring 3 senior consultants.', category: 'Resource Planning', confidence: 89, impact: 'high', timestamp: '4h ago', action: 'Initiate hiring' },
    { id: '3', insight: 'Client X shows 34% upsell probability for AI services. Recommend proactive engagement.', category: 'Revenue Growth', confidence: 87, impact: 'medium', timestamp: '6h ago', action: 'Engage client' },
    { id: '4', insight: 'Billable utilization below target in EU region. Recommend resource reallocation.', category: 'Utilization', confidence: 92, impact: 'medium', timestamp: '8h ago', action: 'Reallocate resources' },
    { id: '5', insight: 'Knowledge reuse could improve delivery efficiency by 18%. Recommend knowledge sharing initiative.', category: 'Efficiency', confidence: 88, impact: 'medium', timestamp: '12h ago', action: 'Launch initiative' },
  ];

  // Delivery Activities
  const deliveryActivities: DeliveryActivity[] = [
    { id: '1', event: 'Milestone completed: Phase 1 Delivery', type: 'milestone', timestamp: '2m ago', details: 'Digital Transformation Initiative' },
    { id: '2', event: 'Client approval received', type: 'approval', timestamp: '5m ago', details: 'Cloud Migration Strategy - Phase 2' },
    { id: '3', event: 'Resource reallocated', type: 'resource', timestamp: '8m ago', details: '2 consultants moved to AI project' },
    { id: '4', event: 'Risk detected: Scope expansion', type: 'risk', timestamp: '12m ago', details: 'AI Implementation Program' },
    { id: '5', event: 'Proposal submitted', type: 'proposal', timestamp: '18m ago', details: 'Enterprise AI Platform - $4.2M' },
    { id: '6', event: 'Invoice generated', type: 'invoice', timestamp: '25m ago', details: 'Digital Transformation - $840K' },
    { id: '7', event: 'Engagement escalated', type: 'escalation', timestamp: '32m ago', details: 'Data Analytics Platform - resolved' },
  ];

  // System Health
  const systemHealth: SystemHealth[] = [
    { id: '1', system: 'Project Management Tools', status: 'healthy', uptime: '99.9%', latency: '28ms' },
    { id: '2', system: 'Time Tracking Systems', status: 'healthy', uptime: '99.8%', latency: '32ms' },
    { id: '3', system: 'Billing Systems', status: 'healthy', uptime: '99.9%', latency: '45ms' },
    { id: '4', system: 'CRM Systems', status: 'healthy', uptime: '99.7%', latency: '38ms' },
    { id: '5', system: 'Knowledge Systems', status: 'healthy', uptime: '99.8%', latency: '52ms' },
    { id: '6', system: 'AI Agents', status: 'healthy', uptime: '99.9%', latency: '18ms' },
  ];

  // Render Functions
  const renderKPICard = (kpi: ProfessionalServicesKPI) => {
    const Icon = kpi.icon;
    return (
      <View key={kpi.id} style={[styles.kpiCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: kpi.color + '30' }]}>
        <View style={styles.kpiHeader}>
          <View style={styles.kpiIconContainer}>
            <Icon size={20} color={kpi.color} />
          </View>
          <Text style={[styles.kpiTitle, { color: 'rgba(255,255,255,0.7)' }]}>{kpi.title}</Text>
        </View>
        <View style={styles.kpiValueContainer}>
          <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
          <View style={[
            styles.kpiTrendBadge,
            { backgroundColor: kpi.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : kpi.trend === 'down' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)' }
          ]}>
            {kpi.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
             kpi.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
             <Activity size={12} color="rgba(255,255,255,0.6)" />}
            <Text style={[
              styles.kpiTrendText,
              { color: kpi.trend === 'up' ? '#10B981' : kpi.trend === 'down' ? '#EF4444' : 'rgba(255,255,255,0.6)' }
            ]}>{kpi.change}</Text>
          </View>
        </View>
        <Text style={[styles.kpiSubtitle, { color: 'rgba(255,255,255,0.5)' }]}>{kpi.subtitle}</Text>
      </View>
    );
  };

  const renderAgentCard = (agent: ServicesAgent) => (
    <View key={agent.id} style={[styles.agentCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: agent.status === 'active' ? '#06B6D4' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.agentAvatar}>
        <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
        <View style={[
          styles.agentStatusDot,
          { backgroundColor: agent.status === 'active' ? '#10B981' : agent.status === 'error' ? '#EF4444' : '#6B7280' }
        ]} />
      </View>
      <View style={styles.agentInfo}>
        <Text style={[styles.agentName, { color: '#FFFFFF' }]}>{agent.name}</Text>
        <Text style={[styles.agentSpecialty, { color: 'rgba(255,255,255,0.6)' }]}>{agent.specialty}</Text>
      </View>
      <View style={styles.agentMetrics}>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#06B6D4' }]}>{agent.confidenceScore}%</Text>
          <Text style={[styles.agentMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Confidence</Text>
        </View>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.deliveryImpact}</Text>
          <Text style={[styles.agentMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Impact</Text>
        </View>
      </View>
      <View style={styles.agentInsights}>
        <Text style={[styles.agentInsightsCount, { color: '#8B5CF6' }]}>{agent.activeInsights}</Text>
        <Text style={[styles.agentInsightsLabel, { color: 'rgba(255,255,255,0.5)' }]}>Insights</Text>
      </View>
    </View>
  );

  const renderProjectEngagement = (engagement: ProjectEngagement) => (
    <View key={engagement.id} style={[styles.engagementCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: engagement.health === 'healthy' ? '#10B981' + '30' : engagement.health === 'warning' ? '#F59E0B' + '30' : '#EF4444' + '30' }]}>
      <View style={styles.engagementHeader}>
        <View style={styles.engagementInfo}>
          <Text style={[styles.engagementName, { color: '#FFFFFF' }]}>{engagement.name}</Text>
          <Text style={[styles.engagementClient, { color: 'rgba(255,255,255,0.6)' }]}>{engagement.client}</Text>
        </View>
        <View style={[
          styles.engagementStatusBadge,
          { backgroundColor: engagement.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : engagement.status === 'at-risk' ? 'rgba(245, 158, 11, 0.2)' : engagement.status === 'completed' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
        ]}>
          <Text style={[
            styles.engagementStatusText,
            { color: engagement.status === 'active' ? '#10B981' : engagement.status === 'at-risk' ? '#F59E0B' : engagement.status === 'completed' ? '#06B6D4' : '#6B7280' }
          ]}>{engagement.status}</Text>
        </View>
      </View>
      <View style={styles.engagementProgress}>
        <View style={styles.engagementProgressBar}>
          <View style={[styles.engagementProgressFill, { width: `${engagement.progress}%`, backgroundColor: engagement.health === 'healthy' ? '#10B981' : engagement.health === 'warning' ? '#F59E0B' : '#EF4444' }]} />
        </View>
        <Text style={[styles.engagementProgressText, { color: 'rgba(255,255,255,0.6)' }]}>{engagement.progress}%</Text>
      </View>
      <View style={styles.engagementMetrics}>
        <View style={styles.engagementMetric}>
          <Text style={[styles.engagementMetricValue, { color: '#10B981' }]}>{engagement.margin}</Text>
          <Text style={[styles.engagementMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Margin</Text>
        </View>
        <View style={styles.engagementMetric}>
          <Text style={[styles.engagementMetricValue, { color: '#06B6D4' }]}>{engagement.teamSize}</Text>
          <Text style={[styles.engagementMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Team</Text>
        </View>
        <View style={styles.engagementMetric}>
          <Text style={[styles.engagementMetricValue, { color: '#8B5CF6' }]}>{engagement.deadline}</Text>
          <Text style={[styles.engagementMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Deadline</Text>
        </View>
      </View>
    </View>
  );

  const renderConsultant = (consultant: Consultant) => (
    <View key={consultant.id} style={[styles.consultantCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: consultant.availability === 'available' ? '#10B981' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.consultantInfo}>
        <Text style={[styles.consultantName, { color: '#FFFFFF' }]}>{consultant.name}</Text>
        <Text style={[styles.consultantRole, { color: 'rgba(255,255,255,0.6)' }]}>{consultant.role}</Text>
      </View>
      <View style={styles.consultantMetrics}>
        <View style={styles.consultantMetric}>
          <Text style={[styles.consultantMetricValue, { color: consultant.utilization >= 85 ? '#10B981' : consultant.utilization >= 70 ? '#06B6D4' : '#F59E0B' }]}>{consultant.utilization}%</Text>
          <Text style={[styles.consultantMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Utilization</Text>
        </View>
        <View style={styles.consultantMetric}>
          <Text style={[styles.consultantMetricValue, { color: '#8B5CF6' }]}>{consultant.skills.length}</Text>
          <Text style={[styles.consultantMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Skills</Text>
        </View>
      </View>
      <View style={[
        styles.consultantAvailabilityBadge,
        { backgroundColor: consultant.availability === 'available' ? 'rgba(16, 185, 129, 0.2)' : consultant.availability === 'booked' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
      ]}>
        <Text style={[
          styles.consultantAvailabilityText,
          { color: consultant.availability === 'available' ? '#10B981' : consultant.availability === 'booked' ? '#F59E0B' : '#6B7280' }
        ]}>{consultant.availability}</Text>
      </View>
    </View>
  );

  const renderTimeBilling = (data: TimeBillingData) => (
    <View key={data.id} style={[styles.billingCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: '#06B6D4' + '30' }]}>
      <View style={styles.billingInfo}>
        <Text style={[styles.billingCategory, { color: '#FFFFFF' }]}>{data.category}</Text>
        <Text style={[styles.billingHours, { color: 'rgba(255,255,255,0.6)' }]}>{data.hours.toLocaleString()} hours</Text>
      </View>
      <View style={styles.billingMetrics}>
        <View style={styles.billingMetric}>
          <Text style={[styles.billingMetricValue, { color: '#10B981' }]}>{data.billable.toLocaleString()}</Text>
          <Text style={[styles.billingMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Billable</Text>
        </View>
        <View style={styles.billingMetric}>
          <Text style={[styles.billingMetricValue, { color: '#F59E0B' }]}>{data.nonBillable.toLocaleString()}</Text>
          <Text style={[styles.billingMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Non-Billable</Text>
        </View>
        <View style={styles.billingMetric}>
          <Text style={[styles.billingMetricValue, { color: '#EF4444' }]}>{data.leakage}</Text>
          <Text style={[styles.billingMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Leakage</Text>
        </View>
      </View>
    </View>
  );

  const renderClient = (client: ClientData) => (
    <View key={client.id} style={[styles.clientCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: client.healthScore >= 85 ? '#10B981' + '30' : client.healthScore >= 70 ? '#06B6D4' + '30' : '#F59E0B' + '30' }]}>
      <View style={styles.clientInfo}>
        <Text style={[styles.clientName, { color: '#FFFFFF' }]}>{client.name}</Text>
        <Text style={[styles.clientIndustry, { color: 'rgba(255,255,255,0.6)' }]}>{client.industry}</Text>
      </View>
      <View style={styles.clientMetrics}>
        <View style={styles.clientMetric}>
          <Text style={[styles.clientMetricValue, { color: client.healthScore >= 85 ? '#10B981' : client.healthScore >= 70 ? '#06B6D4' : '#F59E0B' }]}>{client.healthScore}</Text>
          <Text style={[styles.clientMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Health</Text>
        </View>
        <View style={styles.clientMetric}>
          <Text style={[styles.clientMetricValue, { color: '#8B5CF6' }]}>{client.satisfaction}</Text>
          <Text style={[styles.clientMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>NPS</Text>
        </View>
        <View style={styles.clientMetric}>
          <Text style={[styles.clientMetricValue, { color: '#EC4899' }]}>{client.contractValue}</Text>
          <Text style={[styles.clientMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Contract</Text>
        </View>
      </View>
      <View style={styles.clientOpportunity}>
        <Text style={[styles.clientUpsell, { color: '#10B981' }]}>{client.upsellProbability}% upsell</Text>
      </View>
    </View>
  );

  const renderProposal = (proposal: ProposalData) => (
    <View key={proposal.id} style={[styles.proposalCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: proposal.stage === 'won' ? '#10B981' + '30' : proposal.stage === 'submitted' ? '#06B6D4' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.proposalInfo}>
        <Text style={[styles.proposalName, { color: '#FFFFFF' }]}>{proposal.name}</Text>
        <Text style={[styles.proposalClient, { color: 'rgba(255,255,255,0.6)' }]}>{proposal.client}</Text>
      </View>
      <View style={styles.proposalMetrics}>
        <View style={styles.proposalMetric}>
          <Text style={[styles.proposalMetricValue, { color: '#10B981' }]}>{proposal.value}</Text>
          <Text style={[styles.proposalMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Value</Text>
        </View>
        <View style={styles.proposalMetric}>
          <Text style={[styles.proposalMetricValue, { color: '#06B6D4' }]}>{proposal.winProbability}%</Text>
          <Text style={[styles.proposalMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Win Prob</Text>
        </View>
      </View>
      <View style={[
        styles.proposalStageBadge,
        { backgroundColor: proposal.stage === 'won' ? 'rgba(16, 185, 129, 0.2)' : proposal.stage === 'submitted' ? 'rgba(6, 182, 212, 0.2)' : proposal.stage === 'review' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(107, 114, 128, 0.2)' }
      ]}>
        <Text style={[
          styles.proposalStageText,
          { color: proposal.stage === 'won' ? '#10B981' : proposal.stage === 'submitted' ? '#06B6D4' : proposal.stage === 'review' ? '#8B5CF6' : '#6B7280' }
        ]}>{proposal.stage}</Text>
      </View>
    </View>
  );

  const renderKnowledgeItem = (item: KnowledgeItem) => (
    <View key={item.id} style={[styles.knowledgeCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: '#8B5CF6' + '30' }]}>
      <View style={styles.knowledgeInfo}>
        <Text style={[styles.knowledgeTitle, { color: '#FFFFFF' }]}>{item.title}</Text>
        <Text style={[styles.knowledgeCategory, { color: 'rgba(255,255,255,0.6)' }]}>{item.category}</Text>
      </View>
      <View style={styles.knowledgeMetrics}>
        <View style={styles.knowledgeMetric}>
          <Text style={[styles.knowledgeMetricValue, { color: '#06B6D4' }]}>{item.usage}</Text>
          <Text style={[styles.knowledgeMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Usage</Text>
        </View>
        <View style={styles.knowledgeMetric}>
          <Text style={[styles.knowledgeMetricValue, { color: '#F59E0B' }]}>{item.rating}</Text>
          <Text style={[styles.knowledgeMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Rating</Text>
        </View>
      </View>
      <View style={[
        styles.knowledgeTypeBadge,
        { backgroundColor: 'rgba(139, 92, 246, 0.2)' }
      ]}>
        <Text style={[styles.knowledgeTypeText, { color: '#8B5CF6' }]}>{item.type}</Text>
      </View>
    </View>
  );

  const renderRiskItem = (risk: RiskItem) => (
    <View key={risk.id} style={[styles.riskCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: risk.severity === 'high' ? '#EF4444' + '30' : risk.severity === 'medium' ? '#F59E0B' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.riskInfo}>
        <Text style={[styles.riskProject, { color: '#FFFFFF' }]}>{risk.project}</Text>
        <Text style={[styles.riskType, { color: 'rgba(255,255,255,0.6)' }]}>{risk.type}</Text>
      </View>
      <View style={styles.riskMetrics}>
        <Text style={[styles.riskImpact, { color: risk.severity === 'high' ? '#EF4444' : risk.severity === 'medium' ? '#F59E0B' : '#6B7280' }]}>{risk.impact}</Text>
      </View>
      <View style={[
        styles.riskStatusBadge,
        { backgroundColor: risk.status === 'resolved' ? 'rgba(16, 185, 129, 0.2)' : risk.status === 'mitigating' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(245, 158, 11, 0.2)' }
      ]}>
        <Text style={[
          styles.riskStatusText,
          { color: risk.status === 'resolved' ? '#10B981' : risk.status === 'mitigating' ? '#06B6D4' : '#F59E0B' }
        ]}>{risk.status}</Text>
      </View>
    </View>
  );

  const renderProfitability = (data: ProfitabilityData) => (
    <View key={data.id} style={[styles.profitabilityCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: data.marginTrend === 'up' ? '#10B981' + '30' : data.marginTrend === 'down' ? '#EF4444' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.profitabilityInfo}>
        <Text style={[styles.profitabilityEngagement, { color: '#FFFFFF' }]}>{data.engagement}</Text>
      </View>
      <View style={styles.profitabilityMetrics}>
        <View style={styles.profitabilityMetric}>
          <Text style={[styles.profitabilityMetricValue, { color: '#10B981' }]}>{data.revenue}</Text>
          <Text style={[styles.profitabilityMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Revenue</Text>
        </View>
        <View style={styles.profitabilityMetric}>
          <Text style={[styles.profitabilityMetricValue, { color: '#F59E0B' }]}>{data.cost}</Text>
          <Text style={[styles.profitabilityMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Cost</Text>
        </View>
        <View style={styles.profitabilityMetric}>
          <Text style={[styles.profitabilityMetricValue, { color: data.marginTrend === 'up' ? '#10B981' : data.marginTrend === 'down' ? '#EF4444' : '#06B6D4' }]}>{data.margin}</Text>
          <Text style={[styles.profitabilityMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Margin</Text>
        </View>
      </View>
    </View>
  );

  const renderInsight = (insight: ServicesInsight) => (
    <View key={insight.id} style={[styles.insightCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: insight.impact === 'high' ? '#EF4444' + '30' : insight.impact === 'medium' ? '#F59E0B' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.insightHeader}>
        <Brain size={16} color="#06B6D4" />
        <Text style={[styles.insightCategory, { color: '#06B6D4' }]}>{insight.category}</Text>
        <Text style={[styles.insightConfidence, { color: 'rgba(255,255,255,0.6)' }]}>{insight.confidence}% confidence</Text>
      </View>
      <Text style={[styles.insightText, { color: '#FFFFFF' }]}>{insight.insight}</Text>
      <View style={styles.insightFooter}>
        <Text style={[styles.insightTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{insight.timestamp}</Text>
        <View style={[styles.insightAction, { backgroundColor: 'rgba(6, 182, 212, 0.1)' }]}>
          <Text style={[styles.insightActionText, { color: '#06B6D4' }]}>{insight.action}</Text>
        </View>
      </View>
    </View>
  );

  const renderActivity = (activity: DeliveryActivity) => (
    <View key={activity.id} style={styles.activityItem}>
      <View style={[
        styles.activityDot,
        { backgroundColor: activity.type === 'milestone' ? '#10B981' : activity.type === 'approval' ? '#06B6D4' : activity.type === 'risk' ? '#EF4444' : activity.type === 'escalation' ? '#F59E0B' : '#8B5CF6' }
      ]} />
      <View style={styles.activityContent}>
        <Text style={[styles.activityEvent, { color: '#FFFFFF' }]}>{activity.event}</Text>
        <Text style={[styles.activityDetails, { color: 'rgba(255,255,255,0.6)' }]}>{activity.details}</Text>
        <Text style={[styles.activityTimestamp, { color: 'rgba(255,255,255,0.5)' }]}>{activity.timestamp}</Text>
      </View>
    </View>
  );

  const renderSystemHealth = (health: SystemHealth) => (
    <View key={health.id} style={[styles.healthCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: health.status === 'healthy' ? '#10B981' + '30' : health.status === 'degraded' ? '#F59E0B' + '30' : '#EF4444' + '30' }]}>
      <View style={styles.healthInfo}>
        <Text style={[styles.healthSystem, { color: '#FFFFFF' }]}>{health.system}</Text>
      </View>
      <View style={styles.healthMetrics}>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricValue, { color: health.status === 'healthy' ? '#10B981' : health.status === 'degraded' ? '#F59E0B' : '#EF4444' }]}>{health.uptime}</Text>
          <Text style={[styles.healthMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Uptime</Text>
        </View>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricValue, { color: '#06B6D4' }]}>{health.latency}</Text>
          <Text style={[styles.healthMetricLabel, { color: 'rgba(255,255,255,0.5)' }]}>Latency</Text>
        </View>
      </View>
      <View style={[
        styles.healthStatusBadge,
        { backgroundColor: health.status === 'healthy' ? 'rgba(16, 185, 129, 0.2)' : health.status === 'degraded' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)' }
      ]}>
        <Text style={[
          styles.healthStatusText,
          { color: health.status === 'healthy' ? '#10B981' : health.status === 'degraded' ? '#F59E0B' : '#EF4444' }
        ]}>{health.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(5, 7, 10, 0.8)', borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <LayoutDashboard size={32} color="#10B981" />
            <View style={styles.headerTitle}>
              <Text style={[styles.headerTitleText, { color: '#FFFFFF' }]}>AI Professional Services Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Global Consulting & Delivery Intelligence Operating System</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Search size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Bell size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
              <Settings size={20} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.mainContent}>
        {/* Left Sidebar */}
        <View style={[styles.sidebar, { backgroundColor: 'rgba(5, 7, 10, 0.6)', borderRightColor: 'rgba(255,255,255,0.1)' }]}>
          <TouchableOpacity 
            style={styles.sidebarToggle}
            onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight size={20} color="rgba(255,255,255,0.6)" /> : <ChevronLeft size={20} color="rgba(255,255,255,0.6)" />}
          </TouchableOpacity>
          
          {!sidebarCollapsed && (
            <View style={styles.sidebarContent}>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.sidebarItem,
                      isActive && { backgroundColor: 'rgba(16, 185, 129, 0.15)' }
                    ]}
                    onPress={() => setActiveTab(item.id)}
                  >
                    <Icon 
                      size={18} 
                      color={isActive ? '#10B981' : 'rgba(255,255,255,0.6)'} 
                    />
                    <Text style={[
                      styles.sidebarItemText,
                      { color: isActive ? '#10B981' : 'rgba(255,255,255,0.6)' }
                    ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* Main Content Area */}
        <ScrollView style={styles.content}>
        
        {/* Top Executive Bar - Professional Services KPIs */}
        <View style={[styles.topExecutiveBar, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <View style={styles.topBarHeader}>
            <View style={styles.topBarTitle}>
              <TrendingUp size={20} color="#10B981" />
              <Text style={[styles.topBarTitleText, { color: '#FFFFFF' }]}>Professional Services Performance Overview</Text>
            </View>
            <Text style={[styles.topBarPeriod, { color: 'rgba(255,255,255,0.6)' }]}>Last 24 hours</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topBarScroll}>
            <View style={styles.topBarKPIs}>
              {servicesKPIs.slice(0, 5).map((kpi) => (
                <View key={kpi.id} style={[styles.topBarKPI, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: kpi.color + '40' }]}>
                  <Text style={[styles.topBarKPITitle, { color: 'rgba(255,255,255,0.7)' }]}>{kpi.title}</Text>
                  <Text style={[styles.topBarKPIValue, { color: kpi.color }]}>{kpi.value}</Text>
                  <View style={styles.topBarKPIMetrics}>
                    <View style={[
                      styles.topBarKPITrend,
                      { backgroundColor: kpi.trend === 'up' ? 'rgba(16, 185, 129, 0.2)' : kpi.trend === 'down' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.1)' }
                    ]}>
                      {kpi.trend === 'up' ? <TrendingUp size={12} color="#10B981" /> : 
                       kpi.trend === 'down' ? <TrendingDown size={12} color="#EF4444" /> : 
                       <Activity size={12} color="rgba(255,255,255,0.6)" />}
                      <Text style={[
                        styles.topBarKPITrendText,
                        { color: kpi.trend === 'up' ? '#10B981' : kpi.trend === 'down' ? '#EF4444' : 'rgba(255,255,255,0.6)' }
                      ]}>{kpi.change}</Text>
                    </View>
                    <Text style={[styles.topBarKPISubtitle, { color: 'rgba(255,255,255,0.5)' }]}>{kpi.subtitle}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Professional Services KPIs */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Professional Services KPIs</Text>
          <View style={styles.kpiGrid}>
            {servicesKPIs.map(renderKPICard)}
          </View>
        </View>

        {/* AI Professional Services Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Professional Services Agents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {servicesAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* Chief Delivery Officer Dashboard - Large Centerpiece */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Chief Delivery Officer Dashboard</Text>
          <View style={[styles.commandCenter, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
            
            {/* Command Center Header */}
            <View style={styles.commandCenterHeader}>
              <View style={styles.commandCenterTitle}>
                <Briefcase size={24} color="#10B981" />
                <View>
                  <Text style={[styles.commandCenterTitleText, { color: '#FFFFFF' }]}>Delivery Intelligence Hub</Text>
                  <Text style={[styles.commandCenterSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Real-time professional services delivery monitoring</Text>
                </View>
              </View>
              <View style={styles.commandCenterActions}>
                <TouchableOpacity style={[styles.commandCenterButton, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <RefreshCw size={16} color="#10B981" />
                  <Text style={[styles.commandCenterButtonText, { color: '#10B981' }]}>Refresh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.commandCenterButton, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <Download size={16} color="rgba(255,255,255,0.7)" />
                  <Text style={[styles.commandCenterButtonText, { color: 'rgba(255,255,255,0.7)' }]}>Export</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Primary Metrics Grid */}
            <View style={styles.commandCenterMetrics}>
              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Briefcase size={20} color="#10B981" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Active Engagements</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>2,480</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+12.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Projects active</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(6, 182, 212, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Activity size={20} color="#06B6D4" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Utilization Rate</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#06B6D4' }]}>87%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+3.2%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Consultant utilization</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <DollarSign size={20} color="#8B5CF6" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Billable Revenue</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>$1.8B</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+18.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Annual revenue</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Target size={20} color="#10B981" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Project Margin</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>34%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+2.1%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Average margin</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(236, 72, 153, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Users size={20} color="#EC4899" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Client Satisfaction</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#EC4899' }]}>91</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+4.2%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>NPS Score</Text>
                </View>
              </View>
            </View>

            {/* Delivery Health Overview */}
            <View style={styles.commandCenterHealth}>
              <View style={styles.healthOverview}>
                <Text style={[styles.healthOverviewTitle, { color: '#FFFFFF' }]}>Delivery Health Score</Text>
                <View style={styles.healthScoreContainer}>
                  <Text style={[styles.healthScore, { color: '#10B981' }]}>92%</Text>
                  <View style={styles.healthScoreIndicator}>
                    <View style={[styles.healthScoreBar, { width: '92%', backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <Text style={[styles.healthScoreDescription, { color: 'rgba(255,255,255,0.6)' }]}>Excellent - All delivery systems optimal</Text>
              </View>

              <View style={styles.healthBreakdown}>
                <Text style={[styles.healthBreakdownTitle, { color: '#FFFFFF' }]}>Health Breakdown</Text>
                <View style={styles.healthBreakdownItems}>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Project Delivery</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#06B6D4' }]}>94%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Resource Utilization</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#10B981' }]}>91%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Client Satisfaction</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#8B5CF6' }]}>93%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Margin Performance</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#F59E0B' }]}>89%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Revenue Trend Visualization */}
            <View style={styles.growthTrendSection}>
              <View style={styles.growthTrendHeader}>
                <LineChart size={16} color="#10B981" />
                <Text style={[styles.growthTrendTitle, { color: '#FFFFFF' }]}>Revenue Trend Analytics</Text>
              </View>
              <View style={styles.growthTrendVisualization}>
                <View style={styles.growthTrendBars}>
                  {[
                    { month: 'Jan', value: 65 },
                    { month: 'Feb', value: 72 },
                    { month: 'Mar', value: 78 },
                    { month: 'Apr', value: 74 },
                    { month: 'May', value: 82 },
                    { month: 'Jun', value: 92 },
                  ].map((data, index) => (
                    <View key={index} style={styles.growthTrendBar}>
                      <View style={[
                        styles.growthTrendBarFill,
                        { 
                          height: `${data.value}%`,
                          backgroundColor: data.value >= 85 ? '#10B981' : data.value >= 75 ? '#06B6D4' : '#F59E0B'
                        }
                      ]} />
                      <Text style={[styles.growthTrendLabel, { color: 'rgba(255,255,255,0.6)' }]}>{data.month}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Margin by Service Line */}
            <View style={styles.revenueAttribution}>
              <View style={styles.revenueAttributionHeader}>
                <PieChart size={16} color="#8B5CF6" />
                <Text style={[styles.revenueAttributionTitle, { color: '#FFFFFF' }]}>Margin by Service Line</Text>
              </View>
              <View style={styles.revenueAttributionList}>
                {[
                  { feature: 'Strategy Consulting', value: '38%', percentage: 38, color: '#10B981' },
                  { feature: 'Technology Implementation', value: '34%', percentage: 34, color: '#06B6D4' },
                  { feature: 'Data Analytics', value: '32%', percentage: 32, color: '#8B5CF6' },
                  { feature: 'Change Management', value: '30%', percentage: 30, color: '#F59E0B' },
                  { feature: 'Process Optimization', value: '36%', percentage: 36, color: '#EC4899' },
                ].map((item, index) => (
                  <View key={index} style={styles.revenueAttributionItem}>
                    <View style={styles.revenueAttributionInfo}>
                      <View style={[styles.revenueAttributionDot, { backgroundColor: item.color }]} />
                      <Text style={[styles.revenueAttributionFeature, { color: 'rgba(255,255,255,0.8)' }]}>{item.feature}</Text>
                    </View>
                    <View style={styles.revenueAttributionMetrics}>
                      <Text style={[styles.revenueAttributionRevenue, { color: '#FFFFFF' }]}>{item.value}</Text>
                      <View style={[
                        styles.revenueAttributionBar,
                        { width: `${item.percentage}%`, backgroundColor: item.color }
                      ]} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Project Delivery Control Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Project Delivery Control Center</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.engagementsScroll}>
            {projectEngagements.map(renderProjectEngagement)}
          </ScrollView>
        </View>

        {/* Resource Management Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Resource Management Center</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.consultantsScroll}>
            {consultants.map(renderConsultant)}
          </ScrollView>
        </View>

        {/* Time & Billing Intelligence */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Time & Billing Intelligence</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.billingScroll}>
            {timeBillingData.map(renderTimeBilling)}
          </ScrollView>
        </View>

        {/* Client Intelligence Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Client Intelligence Hub</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.clientsScroll}>
            {clientData.map(renderClient)}
          </ScrollView>
        </View>

        {/* Proposals & Sales Engine */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Proposals & Sales Engine</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.proposalsScroll}>
            {proposalData.map(renderProposal)}
          </ScrollView>
        </View>

        {/* Knowledge Management System */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Knowledge Management System</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.knowledgeScroll}>
            {knowledgeItems.map(renderKnowledgeItem)}
          </ScrollView>
        </View>

        {/* Delivery Risk & Health Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Delivery Risk & Health Center</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.risksScroll}>
            {riskItems.map(renderRiskItem)}
          </ScrollView>
        </View>

        {/* Profitability & Financial Intelligence */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Profitability & Financial Intelligence</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profitabilityScroll}>
            {profitabilityData.map(renderProfitability)}
          </ScrollView>
        </View>

        {/* AI Professional Services Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Professional Services Insights</Text>
          <View style={styles.insightsContainer}>
            {servicesInsights.map(renderInsight)}
          </View>
        </View>

        {/* Real-time Delivery Operations Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Real-time Delivery Operations Feed</Text>
          <View style={[styles.activitiesContainer, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }]}>
            {deliveryActivities.map(renderActivity)}
          </View>
        </View>

        {/* Platform Health & Delivery Systems */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Platform Health & Delivery Systems</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.systemHealthScroll}>
            {systemHealth.map(renderSystemHealth)}
          </ScrollView>
        </View>

        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    gap: 4,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 240,
    borderRightWidth: 1,
    paddingVertical: 16,
  },
  sidebarToggle: {
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8,
  },
  sidebarContent: {
    gap: 4,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  sidebarItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  topExecutiveBar: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  topBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  topBarTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topBarTitleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  topBarPeriod: {
    fontSize: 12,
  },
  topBarScroll: {
    marginBottom: 8,
  },
  topBarKPIs: {
    flexDirection: 'row',
    gap: 12,
  },
  topBarKPI: {
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    minWidth: 160,
  },
  topBarKPITitle: {
    fontSize: 11,
    marginBottom: 4,
  },
  topBarKPIValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  topBarKPIMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topBarKPITrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  topBarKPITrendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  topBarKPISubtitle: {
    fontSize: 10,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    width: (SCREEN_WIDTH - 280 - 48) / 2,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  kpiIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  kpiTitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  kpiValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  kpiTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  kpiTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  kpiSubtitle: {
    fontSize: 11,
  },
  agentsScroll: {
    marginBottom: 8,
  },
  agentCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 280,
    marginRight: 12,
  },
  agentAvatar: {
    position: 'relative',
    marginBottom: 12,
  },
  agentAvatarText: {
    fontSize: 32,
  },
  agentStatusDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#05070A',
  },
  agentInfo: {
    marginBottom: 12,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  agentSpecialty: {
    fontSize: 12,
  },
  agentMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  agentMetric: {
    gap: 4,
  },
  agentMetricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  agentMetricLabel: {
    fontSize: 11,
  },
  agentInsights: {
    alignItems: 'center',
  },
  agentInsightsCount: {
    fontSize: 20,
    fontWeight: '700',
  },
  agentInsightsLabel: {
    fontSize: 11,
  },
  commandCenter: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  commandCenterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  commandCenterTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  commandCenterTitleText: {
    fontSize: 18,
    fontWeight: '700',
  },
  commandCenterSubtitle: {
    fontSize: 12,
  },
  commandCenterActions: {
    flexDirection: 'row',
    gap: 8,
  },
  commandCenterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  commandCenterButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  commandCenterMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  commandMetricCard: {
    flex: 1,
    minWidth: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  commandMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  commandMetricLabel: {
    fontSize: 13,
  },
  commandMetricValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  commandMetricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commandMetricTrendText: {
    fontSize: 14,
    fontWeight: '600',
  },
  commandMetricPeriod: {
    fontSize: 11,
  },
  commandCenterHealth: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
  },
  healthOverview: {
    flex: 1,
  },
  healthOverviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  healthScoreContainer: {
    marginBottom: 8,
  },
  healthScore: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 8,
  },
  healthScoreIndicator: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  healthScoreBar: {
    height: '100%',
  },
  healthScoreDescription: {
    fontSize: 12,
  },
  healthBreakdown: {
    flex: 1,
  },
  healthBreakdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  healthBreakdownItems: {
    gap: 12,
  },
  healthBreakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  healthBreakdownDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  healthBreakdownLabel: {
    fontSize: 13,
  },
  healthBreakdownValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  growthTrendSection: {
    marginBottom: 24,
  },
  growthTrendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  growthTrendTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  growthTrendVisualization: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 16,
  },
  growthTrendBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  growthTrendBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  growthTrendBarFill: {
    width: '100%',
    borderRadius: 4,
  },
  growthTrendLabel: {
    fontSize: 11,
    marginTop: 8,
  },
  revenueAttribution: {
    marginBottom: 8,
  },
  revenueAttributionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  revenueAttributionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  revenueAttributionList: {
    gap: 12,
  },
  revenueAttributionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  revenueAttributionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  revenueAttributionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  revenueAttributionFeature: {
    fontSize: 13,
  },
  revenueAttributionMetrics: {
    flex: 1,
    marginLeft: 24,
    alignItems: 'flex-end',
  },
  revenueAttributionRevenue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  revenueAttributionBar: {
    height: 6,
    borderRadius: 3,
  },
  engagementsScroll: {
    marginBottom: 8,
  },
  engagementCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 320,
    marginRight: 12,
  },
  engagementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  engagementInfo: {
    flex: 1,
  },
  engagementName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  engagementClient: {
    fontSize: 11,
  },
  engagementStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  engagementStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  engagementProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  engagementProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  engagementProgressFill: {
    height: '100%',
  },
  engagementProgressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  engagementMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  engagementMetric: {
    gap: 4,
  },
  engagementMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  engagementMetricLabel: {
    fontSize: 10,
  },
  consultantsScroll: {
    marginBottom: 8,
  },
  consultantCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 280,
    marginRight: 12,
  },
  consultantInfo: {
    marginBottom: 12,
  },
  consultantName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  consultantRole: {
    fontSize: 11,
  },
  consultantMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  consultantMetric: {
    gap: 4,
  },
  consultantMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  consultantMetricLabel: {
    fontSize: 10,
  },
  consultantAvailabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  consultantAvailabilityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  billingScroll: {
    marginBottom: 8,
  },
  billingCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 240,
    marginRight: 12,
  },
  billingInfo: {
    marginBottom: 12,
  },
  billingCategory: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  billingHours: {
    fontSize: 11,
  },
  billingMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  billingMetric: {
    gap: 4,
  },
  billingMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  billingMetricLabel: {
    fontSize: 10,
  },
  clientsScroll: {
    marginBottom: 8,
  },
  clientCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 280,
    marginRight: 12,
  },
  clientInfo: {
    marginBottom: 12,
  },
  clientName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  clientIndustry: {
    fontSize: 11,
  },
  clientMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  clientMetric: {
    gap: 4,
  },
  clientMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  clientMetricLabel: {
    fontSize: 10,
  },
  clientOpportunity: {
    alignItems: 'flex-start',
  },
  clientUpsell: {
    fontSize: 11,
    fontWeight: '600',
  },
  proposalsScroll: {
    marginBottom: 8,
  },
  proposalCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 260,
    marginRight: 12,
  },
  proposalInfo: {
    marginBottom: 12,
  },
  proposalName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  proposalClient: {
    fontSize: 11,
  },
  proposalMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  proposalMetric: {
    gap: 4,
  },
  proposalMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  proposalMetricLabel: {
    fontSize: 10,
  },
  proposalStageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  proposalStageText: {
    fontSize: 11,
    fontWeight: '600',
  },
  knowledgeScroll: {
    marginBottom: 8,
  },
  knowledgeCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 260,
    marginRight: 12,
  },
  knowledgeInfo: {
    marginBottom: 12,
  },
  knowledgeTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  knowledgeCategory: {
    fontSize: 11,
  },
  knowledgeMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  knowledgeMetric: {
    gap: 4,
  },
  knowledgeMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  knowledgeMetricLabel: {
    fontSize: 10,
  },
  knowledgeTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  knowledgeTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  risksScroll: {
    marginBottom: 8,
  },
  riskCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 280,
    marginRight: 12,
  },
  riskInfo: {
    marginBottom: 12,
  },
  riskProject: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  riskType: {
    fontSize: 11,
  },
  riskMetrics: {
    marginBottom: 12,
  },
  riskImpact: {
    fontSize: 12,
    fontWeight: '600',
  },
  riskStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  riskStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  profitabilityScroll: {
    marginBottom: 8,
  },
  profitabilityCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 260,
    marginRight: 12,
  },
  profitabilityInfo: {
    marginBottom: 12,
  },
  profitabilityEngagement: {
    fontSize: 13,
    fontWeight: '600',
  },
  profitabilityMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  profitabilityMetric: {
    gap: 4,
  },
  profitabilityMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  profitabilityMetricLabel: {
    fontSize: 10,
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  insightCategory: {
    fontSize: 13,
    fontWeight: '600',
  },
  insightConfidence: {
    fontSize: 11,
  },
  insightText: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightTimestamp: {
    fontSize: 11,
  },
  insightAction: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  insightActionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  activitiesContainer: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  activityItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  activityContent: {
    flex: 1,
  },
  activityEvent: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDetails: {
    fontSize: 12,
    marginBottom: 4,
  },
  activityTimestamp: {
    fontSize: 11,
  },
  systemHealthScroll: {
    marginBottom: 8,
  },
  healthCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 200,
    marginRight: 12,
  },
  healthInfo: {
    marginBottom: 12,
  },
  healthSystem: {
    fontSize: 13,
    fontWeight: '600',
  },
  healthMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  healthMetric: {
    gap: 4,
  },
  healthMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  healthMetricLabel: {
    fontSize: 10,
  },
  healthStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  healthStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default ProfessionalServicesCommandCenter;
