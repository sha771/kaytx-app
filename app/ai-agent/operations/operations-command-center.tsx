import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  Target,
  Briefcase,
  Shield,
  FileText,
  BarChart3,
  Zap,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  XCircle,
  Building,
  Calendar,
  MessageSquare,
  Brain,
  Bot,
  Sparkles,
  Star,
  Award,
  Settings,
  LayoutDashboard,
  Layers,
  RefreshCw,
  Eye,
  MoreVertical,
  Search,
  Bell,
  ChevronRight,
  Clock,
  GitBranch,
  Cpu,
  HardDrive,
  Server,
  Wifi,
  Database,
  Workflow,
  Network,
  Gauge,
  PieChart,
  LineChart,
  Timer,
  Flag,
  MapPin,
  Truck,
  Package,
  Factory,
  Wrench,
  ClipboardCheck,
  ListTodo,
  Kanban,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCw,
  AlertOctagon,
  FileCheck,
  Scale,
  Gavel,
  UserCheck,
  UserCog,
  Users2,
  BadgeCheck,
  Flame,
  Rocket,
  Lightbulb
} from 'lucide-react-native';

// Types
interface OperationsAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  confidenceScore: number;
  productivityImpact: string;
  activeAssignments: number;
  performanceTrend: 'up' | 'down' | 'stable';
  metrics: {
    activeProcesses?: number;
    automationRate?: number;
    tasksCompleted?: number;
    resourceUtilization?: number;
    costSavings?: string;
    slaCompliance?: number;
    escalationsPrevented?: number;
  };
}

interface OperationsMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  subtitle: string;
}

interface Workflow {
  id: string;
  name: string;
  department: string;
  status: 'green' | 'yellow' | 'red';
  owner: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
  slaStatus: 'on-track' | 'at-risk' | 'breached';
}

interface Resource {
  id: string;
  name: string;
  type: 'team' | 'equipment' | 'facility';
  capacity: number;
  utilized: number;
  department: string;
  status: 'available' | 'busy' | 'overloaded';
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'assigned' | 'completed' | 'delayed' | 'escalated';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  department: string;
}

interface ServiceRequest {
  id: string;
  type: string;
  status: 'open' | 'in-progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  responseTime: string;
  customerImpact: 'high' | 'medium' | 'low';
}

interface Process {
  id: string;
  name: string;
  type: 'automated' | 'manual';
  efficiency: number;
  savings: string;
  accuracy: number;
}

interface Risk {
  id: string;
  category: string;
  level: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  status: 'open' | 'mitigated' | 'resolved';
}

interface ProductivityMetric {
  id: string;
  team: string;
  department: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  capacityUtilization: number;
  overtimeRisk: boolean;
}

interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'recommendation' | 'optimization';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
}

interface Activity {
  id: string;
  event: string;
  entity: string;
  time: string;
  type: 'workflow' | 'resource' | 'task' | 'sla' | 'automation' | 'incident' | 'compliance';
}

interface HealthSystem {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'down';
  latency: string;
  uptime: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  route: string;
  badge?: number;
}

// Navigation Items
const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: '/dashboard' },
  { id: 'agents', label: 'AI Operations Agents', icon: Bot, route: '/agents', badge: 3 },
  { id: 'workflows', label: 'Workflows', icon: Workflow, route: '/workflows', badge: 238 },
  { id: 'resources', label: 'Resource Management', icon: Layers, route: '/resources' },
  { id: 'tasks', label: 'Task Management', icon: ListTodo, route: '/tasks', badge: 1420 },
  { id: 'service', label: 'Service Delivery', icon: Target, route: '/service' },
  { id: 'automation', label: 'Process Automation', icon: Zap, route: '/automation' },
  { id: 'analytics', label: 'Operations Analytics', icon: BarChart3, route: '/analytics' },
  { id: 'risk', label: 'Risk & Compliance', icon: Shield, route: '/risk', badge: 5 },
  { id: 'workforce', label: 'Workforce Insights', icon: Users2, route: '/workforce' },
  { id: 'settings', label: 'Settings', icon: Settings, route: '/settings' },
];

// Operations Agents Data
const operationsAgents: OperationsAgent[] = [
  {
    id: 'agent-atlas',
    name: 'Agent Atlas',
    role: 'Workflow Automation Agent',
    avatar: '🤖',
    status: 'online',
    confidenceScore: 94,
    productivityImpact: 'High',
    activeAssignments: 45,
    performanceTrend: 'up',
    metrics: {
      activeProcesses: 238,
      automationRate: 92,
      tasksCompleted: 14200,
    },
  },
  {
    id: 'agent-nexus',
    name: 'Agent Nexus',
    role: 'Resource Optimization Agent',
    avatar: '🎯',
    status: 'online',
    confidenceScore: 89,
    productivityImpact: 'High',
    activeAssignments: 32,
    performanceTrend: 'up',
    metrics: {
      resourceUtilization: 88,
      costSavings: '$1.4M',
    },
  },
  {
    id: 'agent-pulse',
    name: 'Agent Pulse',
    role: 'SLA Monitoring Agent',
    avatar: '📈',
    status: 'busy',
    confidenceScore: 91,
    productivityImpact: 'Critical',
    activeAssignments: 87,
    performanceTrend: 'stable',
    metrics: {
      slaCompliance: 98.7,
      escalationsPrevented: 342,
    },
  },
];

// Operations Metrics
const operationsMetrics: OperationsMetric[] = [
  {
    id: 'operational-efficiency',
    title: 'Operational Efficiency',
    value: '94.2%',
    change: '+3.2%',
    trend: 'up',
    icon: Gauge,
    color: '#10B981',
    subtitle: 'Overall efficiency'
  },
  {
    id: 'active-workflows',
    title: 'Active Workflows',
    value: '4,281',
    change: '+127',
    trend: 'up',
    icon: Workflow,
    color: '#3B82F6',
    subtitle: 'Currently running'
  },
  {
    id: 'tasks-completed',
    title: 'Tasks Completed Today',
    value: '14,200',
    change: '+840',
    trend: 'up',
    icon: CheckCircle,
    color: '#10B981',
    subtitle: 'Today\'s progress'
  },
  {
    id: 'sla-compliance',
    title: 'SLA Compliance',
    value: '98.4%',
    change: '+0.8%',
    trend: 'up',
    icon: Shield,
    color: '#10B981',
    subtitle: 'Service level'
  },
  {
    id: 'productivity-score',
    title: 'Productivity Score',
    value: '94%',
    change: '+2.4%',
    trend: 'up',
    icon: TrendingUp,
    color: '#10B981',
    subtitle: 'Team performance'
  },
  {
    id: 'automation-rate',
    title: 'Process Automation Rate',
    value: '92%',
    change: '+5.2%',
    trend: 'up',
    icon: Zap,
    color: '#8B5CF6',
    subtitle: 'Automated processes'
  },
  {
    id: 'resource-utilization',
    title: 'Resource Utilization',
    value: '87%',
    change: '+3.1%',
    trend: 'up',
    icon: Layers,
    color: '#06B6D4',
    subtitle: 'Capacity usage'
  },
  {
    id: 'cost-savings',
    title: 'Cost Savings Generated',
    value: '$2.8M',
    change: '+$420K',
    trend: 'up',
    icon: DollarSign,
    color: '#10B981',
    subtitle: 'Monthly savings'
  },
  {
    id: 'operational-risk',
    title: 'Operational Risk Score',
    value: '12',
    change: '-3',
    trend: 'down',
    icon: AlertTriangle,
    color: '#10B981',
    subtitle: 'Risk index (lower is better)'
  },
  {
    id: 'service-availability',
    title: 'Service Availability',
    value: '99.7%',
    change: '+0.2%',
    trend: 'up',
    icon: Server,
    color: '#10B981',
    subtitle: 'System uptime'
  },
];

// Live Workflows
const liveWorkflows: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Invoice Processing',
    department: 'Finance',
    status: 'green',
    owner: 'Sarah Chen',
    priority: 'high',
    progress: 92,
    slaStatus: 'on-track',
  },
  {
    id: 'wf-2',
    name: 'Customer Onboarding',
    department: 'Sales',
    status: 'green',
    owner: 'Mike Johnson',
    priority: 'high',
    progress: 78,
    slaStatus: 'on-track',
  },
  {
    id: 'wf-3',
    name: 'Inventory Replenishment',
    department: 'Supply Chain',
    status: 'yellow',
    owner: 'Emily Davis',
    priority: 'medium',
    progress: 45,
    slaStatus: 'at-risk',
  },
  {
    id: 'wf-4',
    name: 'Employee Onboarding',
    department: 'HR',
    status: 'green',
    owner: 'John Smith',
    priority: 'medium',
    progress: 88,
    slaStatus: 'on-track',
  },
  {
    id: 'wf-5',
    name: 'Quality Assurance',
    department: 'Manufacturing',
    status: 'red',
    owner: 'Lisa Wang',
    priority: 'high',
    progress: 23,
    slaStatus: 'breached',
  },
];

// Resources
const resources: Resource[] = [
  {
    id: 'res-1',
    name: 'Development Team A',
    type: 'team',
    capacity: 100,
    utilized: 88,
    department: 'Engineering',
    status: 'busy',
  },
  {
    id: 'res-2',
    name: 'Production Line 1',
    type: 'equipment',
    capacity: 100,
    utilized: 95,
    department: 'Manufacturing',
    status: 'overloaded',
  },
  {
    id: 'res-3',
    name: 'Server Cluster US-East',
    type: 'facility',
    capacity: 100,
    utilized: 72,
    department: 'IT',
    status: 'available',
  },
  {
    id: 'res-4',
    name: 'Customer Support Team',
    type: 'team',
    capacity: 100,
    utilized: 65,
    department: 'Support',
    status: 'available',
  },
];

// Tasks
const tasks: Task[] = [
  {
    id: 'task-1',
    title: 'Review automation proposal',
    assignee: 'Sarah Chen',
    status: 'assigned',
    priority: 'high',
    dueDate: 'Today',
    department: 'Finance',
  },
  {
    id: 'task-2',
    title: 'Update SLA documentation',
    assignee: 'Mike Johnson',
    status: 'completed',
    priority: 'medium',
    dueDate: 'Yesterday',
    department: 'Operations',
  },
  {
    id: 'task-3',
    title: 'Resource capacity planning',
    assignee: 'Emily Davis',
    status: 'delayed',
    priority: 'high',
    dueDate: '2 days ago',
    department: 'Supply Chain',
  },
  {
    id: 'task-4',
    title: 'Process optimization audit',
    assignee: 'John Smith',
    status: 'escalated',
    priority: 'high',
    dueDate: 'Today',
    department: 'Quality',
  },
];

// Service Requests
const serviceRequests: ServiceRequest[] = [
  {
    id: 'sr-1',
    type: 'Incident Resolution',
    status: 'in-progress',
    priority: 'high',
    responseTime: '15m',
    customerImpact: 'high',
  },
  {
    id: 'sr-2',
    type: 'Service Request',
    status: 'open',
    priority: 'medium',
    responseTime: '2h',
    customerImpact: 'medium',
  },
  {
    id: 'sr-3',
    type: 'Change Request',
    status: 'resolved',
    priority: 'low',
    responseTime: '4h',
    customerImpact: 'low',
  },
];

// Processes
const processes: Process[] = [
  {
    id: 'proc-1',
    name: 'Invoice Processing',
    type: 'automated',
    efficiency: 94,
    savings: '$420K/month',
    accuracy: 99.2,
  },
  {
    id: 'proc-2',
    name: 'Employee Onboarding',
    type: 'automated',
    efficiency: 88,
    savings: '$180K/month',
    accuracy: 96.5,
  },
  {
    id: 'proc-3',
    name: 'Inventory Management',
    type: 'manual',
    efficiency: 72,
    savings: '$0',
    accuracy: 89.0,
  },
  {
    id: 'proc-4',
    name: 'Quality Control',
    type: 'automated',
    efficiency: 91,
    savings: '$280K/month',
    accuracy: 97.8,
  },
];

// Risks
const risks: Risk[] = [
  {
    id: 'risk-1',
    category: 'SLA Breach',
    level: 'critical',
    description: '27 requests at risk of SLA breach',
    status: 'open',
  },
  {
    id: 'risk-2',
    category: 'Resource Shortage',
    level: 'high',
    description: 'Customer Support team capacity exceeded',
    status: 'open',
  },
  {
    id: 'risk-3',
    category: 'Process Bottleneck',
    level: 'medium',
    description: 'Approval process causing delays',
    status: 'mitigated',
  },
];

// Productivity Metrics
const productivityMetrics: ProductivityMetric[] = [
  {
    id: 'prod-1',
    team: 'Engineering',
    department: 'Technology',
    score: 94,
    trend: 'up',
    capacityUtilization: 88,
    overtimeRisk: false,
  },
  {
    id: 'prod-2',
    team: 'Sales',
    department: 'Revenue',
    score: 89,
    trend: 'up',
    capacityUtilization: 92,
    overtimeRisk: true,
  },
  {
    id: 'prod-3',
    team: 'Operations',
    department: 'Operations',
    score: 96,
    trend: 'stable',
    capacityUtilization: 85,
    overtimeRisk: false,
  },
];

// AI Insights
const aiInsights: AIInsight[] = [
  {
    id: 'insight-1',
    type: 'opportunity',
    title: 'Workflow approval process causing 14% delays',
    description: 'Automation opportunity identified in approval workflows',
    impact: 'high',
    actionable: true,
  },
  {
    id: 'insight-2',
    type: 'optimization',
    title: 'Automation opportunity in procurement',
    description: 'Potential annual savings of $1.2M through workflow automation',
    impact: 'high',
    actionable: true,
  },
  {
    id: 'insight-3',
    type: 'risk',
    title: 'Resource shortage predicted in Customer Support',
    description: 'Team capacity will be exceeded in 2 weeks based on current trends',
    impact: 'high',
    actionable: true,
  },
  {
    id: 'insight-4',
    type: 'risk',
    title: 'SLA breach risk detected for 27 requests',
    description: 'Immediate action required to prevent service level violations',
    impact: 'critical',
    actionable: true,
  },
  {
    id: 'insight-5',
    type: 'recommendation',
    title: 'Process efficiency improving 8%',
    description: 'Recent automation initiatives showing positive impact',
    impact: 'medium',
    actionable: false,
  },
];

// Activity Stream
const activityStream: Activity[] = [
  { id: 'act-1', event: 'Workflow completed', entity: 'Invoice Processing #4521', time: '2m ago', type: 'workflow' },
  { id: 'act-2', event: 'Resource allocated', entity: 'Development Team A', time: '5m ago', type: 'resource' },
  { id: 'act-3', event: 'Task escalated', entity: 'Quality audit #892', time: '8m ago', type: 'task' },
  { id: 'act-4', event: 'SLA risk detected', entity: 'Customer request #7834', time: '12m ago', type: 'sla' },
  { id: 'act-5', event: 'Automation executed', entity: 'Employee onboarding', time: '15m ago', type: 'automation' },
  { id: 'act-6', event: 'Incident resolved', entity: 'Server outage US-East', time: '22m ago', type: 'incident' },
  { id: 'act-7', event: 'Compliance alert triggered', entity: 'Data access policy', time: '28m ago', type: 'compliance' },
];

// Operations Health
const operationsHealth: HealthSystem[] = [
  { id: 'op-1', name: 'Workflow Engine', status: 'operational', latency: '45ms', uptime: '99.9%' },
  { id: 'op-2', name: 'AI Agent Health', status: 'operational', latency: '23ms', uptime: '99.8%' },
  { id: 'op-3', name: 'API Connectivity', status: 'operational', latency: '12ms', uptime: '99.9%' },
  { id: 'op-4', name: 'ERP Integration', status: 'degraded', latency: '156ms', uptime: '98.5%' },
  { id: 'op-5', name: 'CRM Integration', status: 'operational', latency: '34ms', uptime: '99.7%' },
  { id: 'op-6', name: 'Automation Services', status: 'operational', latency: '28ms', uptime: '99.8%' },
  { id: 'op-7', name: 'Data Pipelines', status: 'operational', latency: '67ms', uptime: '99.6%' },
];

// Components
function OperationsMetricCard({ metric }: { metric: OperationsMetric }) {
  const { theme } = useTheme();
  const Icon = metric.icon;

  return (
    <View style={[styles.metricCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIconContainer, { backgroundColor: metric.color + '20' }]}>
          <Icon size={20} color={metric.color} />
        </View>
        <View style={styles.metricTrend}>
          {metric.trend === 'up' && <TrendingUp size={16} color="#10B981" />}
          {metric.trend === 'down' && <TrendingDown size={16} color="#EF4444" />}
          {metric.trend === 'stable' && <Activity size={16} color="#6B7280" />}
        </View>
      </View>
      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
      <Text style={[styles.metricTitle, { color: theme.colors.textSecondary }]}>{metric.title}</Text>
      <Text style={[styles.metricChange, { color: metric.trend === 'up' ? '#10B981' : metric.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
        {metric.change}
      </Text>
      <Text style={[styles.metricSubtitle, { color: theme.colors.textSecondary }]}>{metric.subtitle}</Text>
    </View>
  );
}

function OperationsAgentCard({ agent }: { agent: OperationsAgent }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.agentCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.agentHeader}>
        <View style={styles.agentAvatarContainer}>
          <Text style={styles.agentAvatar}>{agent.avatar}</Text>
          <View style={[
            styles.agentStatusIndicator,
            { backgroundColor: agent.status === 'online' ? '#10B981' : agent.status === 'busy' ? '#F59E0B' : '#6B7280' }
          ]} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
          <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>{agent.role}</Text>
        </View>
        <View style={styles.agentConfidence}>
          <Text style={[styles.confidenceScore, { color: '#10B981' }]}>{agent.confidenceScore}%</Text>
          <Text style={[styles.confidenceLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
        </View>
      </View>
      
      <View style={styles.agentMetrics}>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>{agent.productivityImpact}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
        </View>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: theme.colors.text }]}>{agent.activeAssignments}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Active</Text>
        </View>
        <View style={styles.agentMetric}>
          {agent.performanceTrend === 'up' && <TrendingUp size={20} color="#10B981" />}
          {agent.performanceTrend === 'down' && <TrendingDown size={20} color="#EF4444" />}
          {agent.performanceTrend === 'stable' && <Activity size={20} color="#6B7280" />}
        </View>
      </View>

      {agent.metrics.activeProcesses && (
        <View style={styles.agentDetailedMetrics}>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.activeProcesses}</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Processes</Text>
          </View>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.automationRate}%</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Automation</Text>
          </View>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.tasksCompleted}</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Completed</Text>
          </View>
        </View>
      )}

      {agent.metrics.resourceUtilization && (
        <View style={styles.agentDetailedMetrics}>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.resourceUtilization}%</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Utilization</Text>
          </View>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: '#10B981' }]}>{agent.metrics.costSavings}</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Savings</Text>
          </View>
        </View>
      )}

      {agent.metrics.slaCompliance && (
        <View style={styles.agentDetailedMetrics}>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.slaCompliance}%</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>SLA</Text>
          </View>
          <View style={styles.detailedMetric}>
            <Text style={[styles.detailedMetricValue, { color: theme.colors.text }]}>{agent.metrics.escalationsPrevented}</Text>
            <Text style={[styles.detailedMetricLabel, { color: theme.colors.textSecondary }]}>Prevented</Text>
          </View>
        </View>
      )}
    </View>
  );
}

function WorkflowRow({ workflow }: { workflow: Workflow }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.workflowRow, { borderBottomColor: theme.colors.border }]}>
      <View style={styles.workflowInfo}>
        <Text style={[styles.workflowName, { color: theme.colors.text }]}>{workflow.name}</Text>
        <Text style={[styles.workflowDepartment, { color: theme.colors.textSecondary }]}>{workflow.department}</Text>
      </View>
      <View style={styles.workflowProgress}>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.card }]}>
          <View style={[
            styles.progressFill,
            { 
              backgroundColor: workflow.status === 'green' ? '#10B981' : workflow.status === 'yellow' ? '#F59E0B' : '#EF4444',
              width: `${workflow.progress}%`
            }
          ]} />
        </View>
        <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>{workflow.progress}%</Text>
      </View>
      <View style={styles.workflowOwner}>
        <Text style={[styles.workflowOwnerText, { color: theme.colors.text }]}>{workflow.owner}</Text>
      </View>
      <View style={[styles.workflowStatus, { backgroundColor: workflow.status === 'green' ? '#10B981' + '20' : workflow.status === 'yellow' ? '#F59E0B' + '20' : '#EF4444' + '20' }]}>
        <Text style={[styles.workflowStatusText, { color: workflow.status === 'green' ? '#10B981' : workflow.status === 'yellow' ? '#F59E0B' : '#EF4444' }]}>
          {workflow.slaStatus}
        </Text>
      </View>
    </View>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.resourceCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.resourceHeader}>
        <Text style={[styles.resourceName, { color: theme.colors.text }]}>{resource.name}</Text>
        <View style={[
          styles.resourceStatus,
          { backgroundColor: resource.status === 'available' ? '#10B981' + '20' : resource.status === 'busy' ? '#F59E0B' + '20' : '#EF4444' + '20' }
        ]}>
          <Text style={[
            styles.resourceStatusText,
            { color: resource.status === 'available' ? '#10B981' : resource.status === 'busy' ? '#F59E0B' : '#EF4444' }
          ]}>
            {resource.status}
          </Text>
        </View>
      </View>
      <Text style={[styles.resourceDepartment, { color: theme.colors.textSecondary }]}>{resource.department}</Text>
      <View style={styles.resourceCapacity}>
        <View style={[styles.capacityBar, { backgroundColor: theme.colors.background }]}>
          <View style={[
            styles.capacityFill,
            { 
              backgroundColor: resource.utilized >= 90 ? '#EF4444' : resource.utilized >= 70 ? '#F59E0B' : '#10B981',
              width: `${resource.utilized}%`
            }
          ]} />
        </View>
        <Text style={[styles.capacityText, { color: theme.colors.text }]}>{resource.utilized}% utilized</Text>
      </View>
    </View>
  );
}

function TaskRow({ task }: { task: Task }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.taskRow, { borderBottomColor: theme.colors.border }]}>
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, { color: theme.colors.text }]}>{task.title}</Text>
        <Text style={[styles.taskAssignee, { color: theme.colors.textSecondary }]}>{task.assignee}</Text>
      </View>
      <View style={styles.taskStatus}>
        <View style={[
          styles.taskStatusBadge,
          { backgroundColor: task.status === 'completed' ? '#10B981' + '20' : task.status === 'delayed' ? '#EF4444' + '20' : task.status === 'escalated' ? '#F59E0B' + '20' : '#3B82F6' + '20' }
        ]}>
          <Text style={[
            styles.taskStatusText,
            { color: task.status === 'completed' ? '#10B981' : task.status === 'delayed' ? '#EF4444' : task.status === 'escalated' ? '#F59E0B' : '#3B82F6' }
          ]}>
            {task.status}
          </Text>
        </View>
      </View>
      <View style={styles.taskDue}>
        <Text style={[styles.taskDueText, { color: theme.colors.textSecondary }]}>{task.dueDate}</Text>
      </View>
    </View>
  );
}

function ProcessCard({ process }: { process: Process }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.processCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.processHeader}>
        <Text style={[styles.processName, { color: theme.colors.text }]}>{process.name}</Text>
        <View style={[
          styles.processType,
          { backgroundColor: process.type === 'automated' ? '#10B981' + '20' : '#6B7280' + '20' }
        ]}>
          <Text style={[
            styles.processTypeText,
            { color: process.type === 'automated' ? '#10B981' : '#6B7280' }
          ]}>
            {process.type}
          </Text>
        </View>
      </View>
      <View style={styles.processMetrics}>
        <View style={styles.processMetric}>
          <Text style={[styles.processMetricValue, { color: theme.colors.text }]}>{process.efficiency}%</Text>
          <Text style={[styles.processMetricLabel, { color: theme.colors.textSecondary }]}>Efficiency</Text>
        </View>
        <View style={styles.processMetric}>
          <Text style={[styles.processMetricValue, { color: '#10B981' }]}>{process.savings}</Text>
          <Text style={[styles.processMetricLabel, { color: theme.colors.textSecondary }]}>Savings</Text>
        </View>
        <View style={styles.processMetric}>
          <Text style={[styles.processMetricValue, { color: theme.colors.text }]}>{process.accuracy}%</Text>
          <Text style={[styles.processMetricLabel, { color: theme.colors.textSecondary }]}>Accuracy</Text>
        </View>
      </View>
    </View>
  );
}

function RiskCard({ risk }: { risk: Risk }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.riskCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.riskHeader}>
        <Text style={[styles.riskCategory, { color: theme.colors.text }]}>{risk.category}</Text>
        <View style={[
          styles.riskLevel,
          { backgroundColor: risk.level === 'critical' ? '#EF4444' + '20' : risk.level === 'high' ? '#F59E0B' + '20' : risk.level === 'medium' ? '#3B82F6' + '20' : '#10B981' + '20' }
        ]}>
          <Text style={[
            styles.riskLevelText,
            { color: risk.level === 'critical' ? '#EF4444' : risk.level === 'high' ? '#F59E0B' : risk.level === 'medium' ? '#3B82F6' : '#10B981' }
          ]}>
            {risk.level}
          </Text>
        </View>
      </View>
      <Text style={[styles.riskDescription, { color: theme.colors.textSecondary }]}>{risk.description}</Text>
      <View style={[
        styles.riskStatus,
        { backgroundColor: risk.status === 'open' ? '#EF4444' + '20' : risk.status === 'mitigated' ? '#F59E0B' + '20' : '#10B981' + '20' }
      ]}>
        <Text style={[
          styles.riskStatusText,
          { color: risk.status === 'open' ? '#EF4444' : risk.status === 'mitigated' ? '#F59E0B' : '#10B981' }
        ]}>
          {risk.status}
        </Text>
      </View>
    </View>
  );
}

function ProductivityCard({ metric }: { metric: ProductivityMetric }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.productivityCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.productivityHeader}>
        <Text style={[styles.productivityTeam, { color: theme.colors.text }]}>{metric.team}</Text>
        <Text style={[styles.productivityDepartment, { color: theme.colors.textSecondary }]}>{metric.department}</Text>
      </View>
      <View style={styles.productivityScore}>
        <Text style={[styles.productivityScoreValue, { color: '#10B981' }]}>{metric.score}%</Text>
        {metric.trend === 'up' && <TrendingUp size={16} color="#10B981" />}
        {metric.trend === 'down' && <TrendingDown size={16} color="#EF4444" />}
        {metric.trend === 'stable' && <Activity size={16} color="#6B7280" />}
      </View>
      <View style={styles.productivityMetrics}>
        <View style={styles.productivityMetric}>
          <Text style={[styles.productivityMetricValue, { color: theme.colors.text }]}>{metric.capacityUtilization}%</Text>
          <Text style={[styles.productivityMetricLabel, { color: theme.colors.textSecondary }]}>Capacity</Text>
        </View>
        {metric.overtimeRisk && (
          <View style={styles.overtimeRisk}>
            <AlertTriangle size={12} color="#F59E0B" />
            <Text style={[styles.overtimeRiskText, { color: '#F59E0B' }]}>Overtime Risk</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function InsightCard({ insight }: { insight: AIInsight }) {
  const { theme } = useTheme();

  const getIcon = () => {
    switch (insight.type) {
      case 'opportunity': return <Target size={20} color="#10B981" />;
      case 'risk': return <AlertTriangle size={20} color="#EF4444" />;
      case 'recommendation': return <SparklesIcon size={20} color="#8B5CF6" />;
      case 'optimization': return <Zap size={20} color="#06B6D4" />;
      default: return <Brain size={20} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.insightCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.insightIcon}>
        {getIcon()}
      </View>
      <View style={styles.insightContent}>
        <Text style={[styles.insightTitle, { color: theme.colors.text }]}>{insight.title}</Text>
        <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>{insight.description}</Text>
      </View>
      <View style={[styles.insightImpact, { backgroundColor: insight.impact === 'high' || insight.impact === 'critical' ? '#EF4444' + '20' : insight.impact === 'medium' ? '#F59E0B' + '20' : '#10B981' + '20' }]}>
        <Text style={[styles.insightImpactText, { color: insight.impact === 'high' || insight.impact === 'critical' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#10B981' }]}>
          {insight.impact}
        </Text>
      </View>
    </View>
  );
}

function ActivityItem({ activity }: { activity: Activity }) {
  const { theme } = useTheme();

  const getIcon = () => {
    switch (activity.type) {
      case 'workflow': return <Workflow size={16} color="#3B82F6" />;
      case 'resource': return <Layers size={16} color="#10B981" />;
      case 'task': return <ListTodo size={16} color="#F59E0B" />;
      case 'sla': return <Shield size={16} color="#EF4444" />;
      case 'automation': return <Zap size={16} color="#8B5CF6" />;
      case 'incident': return <AlertCircle size={16} color="#EF4444" />;
      case 'compliance': return <Gavel size={16} color="#06B6D4" />;
      default: return <Activity size={16} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.activityItem, { borderBottomColor: theme.colors.border }]}>
      <View style={styles.activityIcon}>
        {getIcon()}
      </View>
      <View style={styles.activityContent}>
        <Text style={[styles.activityEvent, { color: theme.colors.text }]}>{activity.event}</Text>
        <Text style={[styles.activityEntity, { color: theme.colors.textSecondary }]}>{activity.entity}</Text>
      </View>
      <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{activity.time}</Text>
    </View>
  );
}

function HealthIndicator({ health }: { health: HealthSystem }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.healthItem, { borderBottomColor: theme.colors.border }]}>
      <View style={styles.healthInfo}>
        <Text style={[styles.healthName, { color: theme.colors.text }]}>{health.name}</Text>
        <Text style={[styles.healthLatency, { color: theme.colors.textSecondary }]}>{health.latency}</Text>
      </View>
      <View style={[
        styles.healthStatus,
        { backgroundColor: health.status === 'operational' ? '#10B981' + '20' : health.status === 'degraded' ? '#F59E0B' + '20' : '#EF4444' + '20' }
      ]}>
        <View style={[
          styles.healthStatusDot,
          { backgroundColor: health.status === 'operational' ? '#10B981' : health.status === 'degraded' ? '#F59E0B' : '#EF4444' }
        ]} />
        <Text style={[
          styles.healthStatusText,
          { color: health.status === 'operational' ? '#10B981' : health.status === 'degraded' ? '#F59E0B' : '#EF4444' }
        ]}>
          {health.status}
        </Text>
      </View>
    </View>
  );
}

function NavItem({ item, isActive }: { item: NavItem, isActive: boolean }) {
  const { theme } = useTheme();
  const Icon = item.icon;

  return (
    <TouchableOpacity style={[styles.navItem, isActive && styles.navItemActive]}>
      <View style={styles.navItemContent}>
        <Icon size={18} color={isActive ? '#10B981' : theme.colors.textSecondary} />
        <Text style={[styles.navItemText, { color: isActive ? '#10B981' : theme.colors.textSecondary }]}>
          {item.label}
        </Text>
      </View>
      {item.badge && (
        <View style={styles.navBadge}>
          <Text style={styles.navBadgeText}>{item.badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function OperationsCommandCenter() {
  const { theme } = useTheme();
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <View style={[styles.container, { backgroundColor: '#0B0F14' }]}>
      {/* Left Sidebar */}
      <View style={[styles.sidebar, { backgroundColor: '#111827', borderRightColor: theme.colors.border }]}>
        <View style={styles.sidebarHeader}>
          <Text style={[styles.sidebarTitle, { color: theme.colors.text }]}>Operations Command</Text>
          <Text style={[styles.sidebarSubtitle, { color: theme.colors.textSecondary }]}>Enterprise Management</Text>
        </View>
        
        <ScrollView style={styles.navScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.navSection}>
            {navigationItems.map((item) => (
              <NavItem 
                key={item.id} 
                item={item} 
                isActive={activeNav === item.id}
                onPress={() => setActiveNav(item.id)}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Executive KPI Bar */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Operations KPIs</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Real-time performance metrics</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            {operationsMetrics.map((metric) => (
              <OperationsMetricCard key={metric.id} metric={metric} />
            ))}
          </ScrollView>
        </View>

        {/* AI Operations Agents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Operations Agents</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Autonomous operations agents</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {operationsAgents.map((agent) => (
              <OperationsAgentCard key={agent.id} agent={agent} />
            ))}
          </ScrollView>
        </View>

        {/* Operations Command Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Operations Command Center</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Central performance dashboard</Text>
          </View>
          <View style={[styles.commandCenter, { backgroundColor: theme.colors.card }]}>
            <View style={styles.commandMetrics}>
              <View style={styles.commandMetric}>
                <Text style={[styles.commandMetricValue, { color: theme.colors.text }]}>4,281</Text>
                <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Active Operations</Text>
              </View>
              <View style={styles.commandMetric}>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>94%</Text>
                <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Productivity Score</Text>
              </View>
              <View style={styles.commandMetric}>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>98.4%</Text>
                <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>SLA Compliance</Text>
              </View>
              <View style={styles.commandMetric}>
                <Text style={[styles.commandMetricValue, { color: '#06B6D4' }]}>87%</Text>
                <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Resource Utilization</Text>
              </View>
              <View style={styles.commandMetric}>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>$2.8M</Text>
                <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Monthly Savings</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Live Operations Monitor */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Operations Monitor</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Real-time workflow tracking</Text>
          </View>
          <View style={[styles.monitorCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.monitorHeader}>
              <Text style={[styles.monitorHeaderTitle, { color: theme.colors.text }]}>Workflow</Text>
              <Text style={[styles.monitorHeaderTitle, { color: theme.colors.text }]}>Progress</Text>
              <Text style={[styles.monitorHeaderTitle, { color: theme.colors.text }]}>Owner</Text>
              <Text style={[styles.monitorHeaderTitle, { color: theme.colors.text }]}>SLA Status</Text>
            </View>
            {liveWorkflows.map((workflow) => (
              <WorkflowRow key={workflow.id} workflow={workflow} />
            ))}
          </View>
        </View>

        {/* Workflow Intelligence */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Workflow Intelligence</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Process analytics & insights</Text>
          </View>
          <View style={[styles.intelligenceCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.intelligenceMetrics}>
              <View style={styles.intelligenceMetric}>
                <Text style={[styles.intelligenceMetricValue, { color: theme.colors.text }]}>238</Text>
                <Text style={[styles.intelligenceMetricLabel, { color: theme.colors.textSecondary }]}>Active Workflows</Text>
              </View>
              <View style={styles.intelligenceMetric}>
                <Text style={[styles.intelligenceMetricValue, { color: '#10B981' }]}>92%</Text>
                <Text style={[styles.intelligenceMetricLabel, { color: theme.colors.textSecondary }]}>Automation Coverage</Text>
              </View>
              <View style={styles.intelligenceMetric}>
                <Text style={[styles.intelligenceMetricValue, { color: '#10B981' }]}>94%</Text>
                <Text style={[styles.intelligenceMetricLabel, { color: theme.colors.textSecondary }]}>Completion Rate</Text>
              </View>
              <View style={styles.intelligenceMetric}>
                <Text style={[styles.intelligenceMetricValue, { color: '#F59E0B' }]}>12</Text>
                <Text style={[styles.intelligenceMetricLabel, { color: theme.colors.textSecondary }]}>Bottlenecks</Text>
              </View>
              <View style={styles.intelligenceMetric}>
                <Text style={[styles.intelligenceMetricValue, { color: theme.colors.text }]}>2.4h</Text>
                <Text style={[styles.intelligenceMetricLabel, { color: theme.colors.textSecondary }]}>Avg Cycle Time</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Resource Management Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Resource Management Center</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Capacity & allocation tracking</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.resourcesScroll}>
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </ScrollView>
        </View>

        {/* Task Execution Dashboard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Task Execution Dashboard</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Task management & tracking</Text>
          </View>
          <View style={[styles.taskCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.taskHeader}>
              <Text style={[styles.taskHeaderTitle, { color: theme.colors.text }]}>Task</Text>
              <Text style={[styles.taskHeaderTitle, { color: theme.colors.text }]}>Status</Text>
              <Text style={[styles.taskHeaderTitle, { color: theme.colors.text }]}>Due Date</Text>
            </View>
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </View>
        </View>

        {/* Service Delivery Performance */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Service Delivery Performance</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Service level monitoring</Text>
          </View>
          <View style={[styles.serviceCard, { backgroundColor: theme.colors.card }]}>
            <View style={styles.serviceMetrics}>
              <View style={styles.serviceMetric}>
                <Text style={[styles.serviceMetricValue, { color: theme.colors.text }]}>1,247</Text>
                <Text style={[styles.serviceMetricLabel, { color: theme.colors.textSecondary }]}>Service Requests</Text>
              </View>
              <View style={styles.serviceMetric}>
                <Text style={[styles.serviceMetricValue, { color: '#10B981' }]}>892</Text>
                <Text style={[styles.serviceMetricLabel, { color: theme.colors.textSecondary }]}>Resolved</Text>
              </View>
              <View style={styles.serviceMetric}>
                <Text style={[styles.serviceMetricValue, { color: '#10B981' }]}>98.4%</Text>
                <Text style={[styles.serviceMetricLabel, { color: theme.colors.textSecondary }]}>SLA Compliance</Text>
              </View>
              <View style={styles.serviceMetric}>
                <Text style={[styles.serviceMetricValue, { color: '#F59E0B' }]}>23</Text>
                <Text style={[styles.serviceMetricLabel, { color: theme.colors.textSecondary }]}>High Impact</Text>
              </View>
              <View style={styles.serviceMetric}>
                <Text style={[styles.serviceMetricValue, { color: theme.colors.text }]}>18m</Text>
                <Text style={[styles.serviceMetricLabel, { color: theme.colors.textSecondary }]}>Avg Response</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Process Automation Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Process Automation Center</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Automation metrics & savings</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.processesScroll}>
            {processes.map((process) => (
              <ProcessCard key={process.id} process={process} />
            ))}
          </ScrollView>
        </View>

        {/* Risk & Compliance Control */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk & Compliance Control</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Risk monitoring & compliance</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.risksScroll}>
            {risks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </ScrollView>
        </View>

        {/* Workforce Productivity Analytics */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Workforce Productivity Analytics</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Team performance insights</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productivityScroll}>
            {productivityMetrics.map((metric) => (
              <ProductivityCard key={metric.id} metric={metric} />
            ))}
          </ScrollView>
        </View>

        {/* AI Insights Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights Center</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>AI-generated recommendations</Text>
          </View>
          <View style={styles.insightsContainer}>
            {aiInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </View>
        </View>

        {/* Real-Time Activity Stream */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-Time Activity Stream</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Live operational feed</Text>
          </View>
          <View style={[styles.activityCard, { backgroundColor: theme.colors.card }]}>
            {activityStream.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </View>
        </View>

        {/* Operations Health Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Operations Health Center</Text>
            <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>System health monitoring</Text>
          </View>
          <View style={[styles.healthCard, { backgroundColor: theme.colors.card }]}>
            {operationsHealth.map((health) => (
              <HealthIndicator key={health.id} health={health} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 280,
    borderRightWidth: 1,
    paddingTop: 20,
  },
  sidebarHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sidebarSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  navScroll: {
    flex: 1,
  },
  navSection: {
    paddingVertical: 10,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  navItemActive: {
    backgroundColor: '#10B981' + '10',
  },
  navItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navItemText: {
    fontSize: 14,
  },
  navBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  navBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  metricsScroll: {
    flexDirection: 'row',
  },
  metricCard: {
    width: 180,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricTrend: {
    padding: 4,
    borderRadius: 6,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 13,
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricSubtitle: {
    fontSize: 11,
  },
  agentsScroll: {
    flexDirection: 'row',
  },
  agentCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  agentAvatar: {
    fontSize: 32,
  },
  agentStatusIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#111827',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  agentRole: {
    fontSize: 13,
    marginTop: 2,
  },
  agentConfidence: {
    alignItems: 'flex-end',
  },
  confidenceScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  confidenceLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  agentMetric: {
    alignItems: 'center',
  },
  agentMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  agentMetricLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  agentDetailedMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  detailedMetric: {
    alignItems: 'center',
  },
  detailedMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailedMetricLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  commandCenter: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  commandMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commandMetric: {
    alignItems: 'center',
  },
  commandMetricValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  commandMetricLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  monitorCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    overflow: 'hidden',
  },
  monitorHeader: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  monitorHeaderTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
  },
  workflowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  workflowInfo: {
    flex: 2,
  },
  workflowName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  workflowDepartment: {
    fontSize: 12,
    marginTop: 2,
  },
  workflowProgress: {
    flex: 2,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
  },
  workflowOwner: {
    flex: 1,
  },
  workflowOwnerText: {
    fontSize: 13,
  },
  workflowStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  workflowStatusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  intelligenceCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  intelligenceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  intelligenceMetric: {
    alignItems: 'center',
  },
  intelligenceMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  intelligenceMetricLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  resourcesScroll: {
    flexDirection: 'row',
  },
  resourceCard: {
    width: 240,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resourceName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  resourceStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  resourceStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  resourceDepartment: {
    fontSize: 12,
    marginBottom: 12,
  },
  resourceCapacity: {
    marginTop: 8,
  },
  capacityBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  capacityFill: {
    height: '100%',
    borderRadius: 4,
  },
  capacityText: {
    fontSize: 12,
  },
  taskCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    overflow: 'hidden',
  },
  taskHeader: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  taskHeaderTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  taskInfo: {
    flex: 2,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskAssignee: {
    fontSize: 12,
    marginTop: 2,
  },
  taskStatus: {
    flex: 1,
  },
  taskStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  taskStatusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  taskDue: {
    flex: 1,
  },
  taskDueText: {
    fontSize: 12,
  },
  serviceCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  serviceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceMetric: {
    alignItems: 'center',
  },
  serviceMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  serviceMetricLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  processesScroll: {
    flexDirection: 'row',
  },
  processCard: {
    width: 220,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  processHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  processName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  processType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  processTypeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  processMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  processMetric: {
    alignItems: 'center',
  },
  processMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  processMetricLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  risksScroll: {
    flexDirection: 'row',
  },
  riskCard: {
    width: 260,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  riskCategory: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  riskLevel: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  riskLevelText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  riskDescription: {
    fontSize: 12,
    marginBottom: 12,
  },
  riskStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  riskStatusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  productivityScroll: {
    flexDirection: 'row',
  },
  productivityCard: {
    width: 240,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  productivityHeader: {
    marginBottom: 12,
  },
  productivityTeam: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productivityDepartment: {
    fontSize: 12,
    marginTop: 2,
  },
  productivityScore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  productivityScoreValue: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  productivityMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productivityMetric: {
    alignItems: 'center',
  },
  productivityMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productivityMetricLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  overtimeRisk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  overtimeRiskText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  insightIcon: {
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
  },
  insightImpact: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  activityCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  activityIcon: {
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityEvent: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activityEntity: {
    fontSize: 12,
    marginTop: 2,
  },
  activityTime: {
    fontSize: 11,
  },
  healthCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1F2937',
    overflow: 'hidden',
  },
  healthItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  healthInfo: {
    flex: 1,
  },
  healthName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  healthLatency: {
    fontSize: 12,
    marginTop: 2,
  },
  healthStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  healthStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  healthStatusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
