import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
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
  Star,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
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
  Briefcase,
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
  Workflow,
  Cpu,
  Gauge,
  Shield,
  Timer,
  DollarSign,
  CheckSquare,
  Square,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  FileCheck,
  ClipboardList,
  Kanban,
  Map,
  Navigation,
  Compass,
  Radio,
  Server,
  Database,
  HardDrive,
  Wifi,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  Mountain,
  Waves,
  Anchor,
  Ship,
  Truck,
  Plane,
  Train,
  Car,
  Building2,
  Building,
  Factory,
  Store,
  Warehouse,
  Package,
  ShoppingCart,
  CreditCard,
  Receipt,
  FileSpreadsheet,
  FileCode,
  FileImage,
  FileVideo,
  FileMusic,
  FileArchive,
  FileQuestion,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  Microchip,
  CircuitBoard,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Headphones,
  Camera,
  Mic,
  Speaker,
  Volume2,
  VolumeX,
  PlayCircle,
  PauseCircle,
  StopCircle,
  SkipBack,
  Repeat,
  Repeat1,
  Shuffle,
  List,
  ListMusic,
  ListVideo,
  ListOrdered,
  ListChecks,
  ListTodo,
  Grid,
  Grid3x3,
  Columns,
  Rows,
  Layout,
  LayoutGrid,
  LayoutList,
  LayoutTemplate,
  Sidebar,
  SidebarOpen,
  SidebarClose,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  PanelLeftOpen,
  PanelRightOpen,
  PanelTopOpen,
  PanelBottomOpen,
  Maximize,
  Minimize,
  Expand,
  Shrink,
  Fullscreen,
  Crop,
  Scan,
  ScanLine,
  ScanBarcode,
  ScanQrCode,
  ScanFace,
  ScanText,
  ScanSearch,
} from 'lucide-react-native';

// Types
interface OperationsAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  metrics: {
    activeProcesses?: number;
    automationRate?: number;
    tasksCompleted?: number;
    resourceUtilization?: number;
    costSavings?: string;
    slaCompliance?: number;
    escalationsPrevented?: number;
  };
  productivityImpact: string;
  activeAssignments: number;
  performanceTrend: 'up' | 'down' | 'stable';
}

interface OperationsKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface Workflow {
  id: string;
  name: string;
  department: string;
  status: 'on-track' | 'at-risk' | 'delayed';
  owner: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  progress: number;
  slaStatus: 'compliant' | 'warning' | 'breach';
}

interface WorkflowMetric {
  id: string;
  name: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface Resource {
  id: string;
  name: string;
  type: 'team' | 'equipment' | 'facility' | 'software';
  capacity: number;
  allocated: number;
  utilization: number;
  department: string;
  status: 'available' | 'busy' | 'overloaded';
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'assigned' | 'completed' | 'delayed' | 'escalated';
  priority: 'critical' | 'high' | 'medium' | 'low';
  dueDate: string;
  progress: number;
}

interface ServiceMetric {
  id: string;
  name: string;
  value: string;
  target: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface AutomationProcess {
  id: string;
  name: string;
  type: 'automated' | 'manual' | 'hybrid';
  efficiency: number;
  savings: string;
  frequency: string;
  status: 'active' | 'inactive' | 'optimizing';
}

interface ComplianceMetric {
  id: string;
  name: string;
  value: string;
  threshold: string;
  status: 'compliant' | 'warning' | 'non-compliant';
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface ProductivityMetric {
  id: string;
  team: string;
  productivity: number;
  capacity: number;
  utilization: number;
  overtimeRisk: 'low' | 'medium' | 'high';
  trend: 'up' | 'down' | 'stable';
}

interface AIInsight {
  id: string;
  type: 'warning' | 'opportunity' | 'info' | 'success' | 'risk' | 'recommendation' | 'alert';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence?: number;
  actionable: boolean;
  timestamp: string;
}

interface OperationsActivity {
  id: string;
  type: 'workflow' | 'resource' | 'task' | 'sla' | 'automation' | 'incident' | 'compliance';
  title: string;
  description: string;
  timestamp: string;
  agent?: string;
}

interface SystemHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'critical';
  uptime: number;
  lastCheck: string;
  metrics: {
    responseTime: number;
    errorRate: number;
    latency: number;
  };
}

export default function OperationsCommandCenter() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Operations Agents', icon: Bot },
    { id: 'workflows', label: 'Workflows', icon: Workflow },
    { id: 'resources', label: 'Resource Management', icon: Cpu },
    { id: 'tasks', label: 'Task Management', icon: ClipboardList },
    { id: 'service', label: 'Service Delivery', icon: Target },
    { id: 'automation', label: 'Process Automation', icon: Zap },
    { id: 'analytics', label: 'Operations Analytics', icon: BarChart3 },
    { id: 'risk', label: 'Risk & Compliance', icon: Shield },
    { id: 'workforce', label: 'Workforce Insights', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Operations KPIs
  const operationsKPIs: OperationsKPI[] = [
    {
      id: 'operational-efficiency',
      title: 'Operational Efficiency',
      value: '94.2%',
      change: '+2.4%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'Overall performance'
    },
    {
      id: 'active-workflows',
      title: 'Active Workflows',
      value: '4,281',
      change: '+127',
      trend: 'up',
      color: '#06B6D4',
      subtitle: 'Running processes'
    },
    {
      id: 'tasks-completed',
      title: 'Tasks Completed Today',
      value: '12,847',
      change: '+842',
      trend: 'up',
      color: '#8B5CF6',
      subtitle: 'Daily output'
    },
    {
      id: 'sla-compliance',
      title: 'SLA Compliance',
      value: '98.4%',
      change: '+0.8%',
      trend: 'up',
      color: '#F59E0B',
      subtitle: 'Service level'
    },
    {
      id: 'productivity-score',
      title: 'Productivity Score',
      value: '94%',
      change: '+3.2%',
      trend: 'up',
      color: '#EC4899',
      subtitle: 'Team efficiency'
    },
    {
      id: 'automation-rate',
      title: 'Process Automation Rate',
      value: '92%',
      change: '+5.4%',
      trend: 'up',
      color: '#14B8A6',
      subtitle: 'Automated processes'
    },
    {
      id: 'resource-utilization',
      title: 'Resource Utilization',
      value: '87%',
      change: '+2.1%',
      trend: 'up',
      color: '#3B82F6',
      subtitle: 'Capacity usage'
    },
    {
      id: 'cost-savings',
      title: 'Monthly Cost Savings',
      value: '$2.8M',
      change: '+$420K',
      trend: 'up',
      color: '#22C55E',
      subtitle: 'Automation impact'
    },
    {
      id: 'operational-risk',
      title: 'Operational Risk Score',
      value: '12',
      change: '-3',
      trend: 'down',
      color: '#10B981',
      subtitle: 'Risk level (lower is better)'
    },
    {
      id: 'service-availability',
      title: 'Service Availability',
      value: '99.7%',
      change: '+0.2%',
      trend: 'up',
      color: '#A855F7',
      subtitle: 'Uptime metric'
    },
  ];

  // AI Operations Agents
  const operationsAgents: OperationsAgent[] = [
    {
      id: 'agent-atlas',
      name: 'Agent Atlas',
      role: 'Workflow Automation Agent',
      avatar: '🔄',
      status: 'active',
      confidenceScore: 94,
      metrics: {
        activeProcesses: 238,
        automationRate: 92,
        tasksCompleted: 14200,
      },
      productivityImpact: '+$842K',
      activeAssignments: 45,
      performanceTrend: 'up',
    },
    {
      id: 'agent-nexus',
      name: 'Agent Nexus',
      role: 'Resource Optimization Agent',
      avatar: '⚡',
      status: 'active',
      confidenceScore: 89,
      metrics: {
        resourceUtilization: 88,
        costSavings: '$1.4M',
      },
      productivityImpact: '+$1.4M',
      activeAssignments: 32,
      performanceTrend: 'up',
    },
    {
      id: 'agent-pulse',
      name: 'Agent Pulse',
      role: 'SLA Monitoring Agent',
      avatar: '📊',
      status: 'active',
      confidenceScore: 91,
      metrics: {
        slaCompliance: 98.7,
        escalationsPrevented: 342,
      },
      productivityImpact: '+$520K',
      activeAssignments: 28,
      performanceTrend: 'stable',
    },
    {
      id: 'agent-vanguard',
      name: 'Agent Vanguard',
      role: 'Process Intelligence Agent',
      avatar: '🧠',
      status: 'monitoring',
      confidenceScore: 87,
      metrics: {
        activeProcesses: 156,
        automationRate: 89,
        tasksCompleted: 9800,
      },
      productivityImpact: '+$380K',
      activeAssignments: 38,
      performanceTrend: 'up',
    },
    {
      id: 'agent-catalyst',
      name: 'Agent Catalyst',
      role: 'Task Orchestration Agent',
      avatar: '🎯',
      status: 'active',
      confidenceScore: 92,
      metrics: {
        activeProcesses: 312,
        automationRate: 95,
        tasksCompleted: 18500,
      },
      productivityImpact: '+$620K',
      activeAssignments: 52,
      performanceTrend: 'up',
    },
  ];

  // Live Workflows
  const liveWorkflows: Workflow[] = [
    { id: 'wf-1', name: 'Order Processing Pipeline', department: 'Operations', status: 'on-track', owner: 'Agent Atlas', priority: 'critical', progress: 87, slaStatus: 'compliant' },
    { id: 'wf-2', name: 'Customer Onboarding Flow', department: 'Customer Success', status: 'on-track', owner: 'Agent Catalyst', priority: 'high', progress: 72, slaStatus: 'compliant' },
    { id: 'wf-3', name: 'Inventory Replenishment', department: 'Supply Chain', status: 'at-risk', owner: 'Agent Nexus', priority: 'critical', progress: 45, slaStatus: 'warning' },
    { id: 'wf-4', name: 'Invoice Processing', department: 'Finance', status: 'on-track', owner: 'Agent Atlas', priority: 'medium', progress: 94, slaStatus: 'compliant' },
    { id: 'wf-5', name: 'Quality Assurance Workflow', department: 'Manufacturing', status: 'delayed', owner: 'Agent Vanguard', priority: 'high', progress: 38, slaStatus: 'breach' },
    { id: 'wf-6', name: 'Employee Onboarding', department: 'HR', status: 'on-track', owner: 'Agent Catalyst', priority: 'medium', progress: 65, slaStatus: 'compliant' },
    { id: 'wf-7', name: 'Vendor Approval Process', department: 'Procurement', status: 'at-risk', owner: 'Agent Pulse', priority: 'high', progress: 52, slaStatus: 'warning' },
    { id: 'wf-8', name: 'Compliance Audit Workflow', department: 'Legal', status: 'on-track', owner: 'Agent Pulse', priority: 'critical', progress: 78, slaStatus: 'compliant' },
  ];

  // Workflow Intelligence Metrics
  const workflowMetrics: WorkflowMetric[] = [
    { id: 'wm-1', name: 'Active Workflows', value: '4,281', change: '+127', trend: 'up', color: '#06B6D4' },
    { id: 'wm-2', name: 'Automation Coverage', value: '92%', change: '+5.4%', trend: 'up', color: '#10B981' },
    { id: 'wm-3', name: 'Process Completion Rate', value: '94.2%', change: '+2.1%', trend: 'up', color: '#8B5CF6' },
    { id: 'wm-4', name: 'Bottlenecks Detected', value: '23', change: '-8', trend: 'down', color: '#F59E0B' },
    { id: 'wm-5', name: 'Average Cycle Time', value: '2.4 days', change: '-12%', trend: 'down', color: '#10B981' },
  ];

  // Resources
  const resources: Resource[] = [
    { id: 'res-1', name: 'Customer Support Team', type: 'team', capacity: 100, allocated: 87, utilization: 87, department: 'Customer Success', status: 'busy' },
    { id: 'res-2', name: 'Development Team', type: 'team', capacity: 100, allocated: 92, utilization: 92, department: 'Engineering', status: 'overloaded' },
    { id: 'res-3', name: 'Sales Team', type: 'team', capacity: 100, allocated: 78, utilization: 78, department: 'Sales', status: 'available' },
    { id: 'res-4', name: 'Server Infrastructure', type: 'equipment', capacity: 100, allocated: 85, utilization: 85, department: 'IT', status: 'busy' },
    { id: 'res-5', name: 'Warehouse Capacity', type: 'facility', capacity: 100, allocated: 72, utilization: 72, department: 'Operations', status: 'available' },
    { id: 'res-6', name: 'CRM Software Licenses', type: 'software', capacity: 100, allocated: 95, utilization: 95, department: 'Sales', status: 'overloaded' },
  ];

  // Tasks
  const tasks: Task[] = [
    { id: 'task-1', title: 'Process urgent customer refund', assignee: 'Sarah Chen', status: 'assigned', priority: 'critical', dueDate: 'Today', progress: 45 },
    { id: 'task-2', title: 'Update inventory database', assignee: 'Mike Johnson', status: 'completed', priority: 'high', dueDate: 'Yesterday', progress: 100 },
    { id: 'task-3', title: 'Review vendor contracts', assignee: 'Emily Davis', status: 'delayed', priority: 'medium', dueDate: '2 days ago', progress: 30 },
    { id: 'task-4', title: 'Escalated: System performance issue', assignee: 'Alex Thompson', status: 'escalated', priority: 'critical', dueDate: 'Today', progress: 15 },
    { id: 'task-5', title: 'Complete Q2 compliance audit', assignee: 'Lisa Wang', status: 'assigned', priority: 'high', dueDate: 'Tomorrow', progress: 65 },
    { id: 'task-6', title: 'Onboard new employees', assignee: 'James Brown', status: 'completed', priority: 'medium', dueDate: 'Today', progress: 100 },
  ];

  // Service Metrics
  const serviceMetrics: ServiceMetric[] = [
    { id: 'sm-1', name: 'Service Requests', value: '2,847', target: '3,000', status: 'excellent', trend: 'up' },
    { id: 'sm-2', name: 'Incident Resolution', value: '94.2%', target: '95%', status: 'good', trend: 'up' },
    { id: 'sm-3', name: 'SLA Compliance', value: '98.4%', target: '99%', status: 'good', trend: 'up' },
    { id: 'sm-4', name: 'Customer Impact', value: 'Low', target: 'Minimal', status: 'excellent', trend: 'stable' },
    { id: 'sm-5', name: 'Response Time', value: '1.2h', target: '<2h', status: 'excellent', trend: 'down' },
  ];

  // Automation Processes
  const automationProcesses: AutomationProcess[] = [
    { id: 'auto-1', name: 'Invoice Processing', type: 'automated', efficiency: 96, savings: '$420K/month', frequency: 'Daily', status: 'active' },
    { id: 'auto-2', name: 'Customer Onboarding', type: 'automated', efficiency: 89, savings: '$280K/month', frequency: 'Real-time', status: 'active' },
    { id: 'auto-3', name: 'Inventory Management', type: 'hybrid', efficiency: 78, savings: '$180K/month', frequency: 'Hourly', status: 'optimizing' },
    { id: 'auto-4', name: 'Report Generation', type: 'automated', efficiency: 94, savings: '$95K/month', frequency: 'Daily', status: 'active' },
    { id: 'auto-5', name: 'Data Entry', type: 'manual', efficiency: 45, savings: '$0', frequency: 'Ad-hoc', status: 'inactive' },
  ];

  // Compliance Metrics
  const complianceMetrics: ComplianceMetric[] = [
    { id: 'comp-1', name: 'Compliance Status', value: '98.7%', threshold: '95%', status: 'compliant', trend: 'up', color: '#10B981' },
    { id: 'comp-2', name: 'Operational Risks', value: '12', threshold: '20', status: 'compliant', trend: 'down', color: '#10B981' },
    { id: 'comp-3', name: 'Policy Violations', value: '3', threshold: '5', status: 'warning', trend: 'stable', color: '#F59E0B' },
    { id: 'comp-4', name: 'Audit Readiness', value: '94%', threshold: '90%', status: 'compliant', trend: 'up', color: '#10B981' },
    { id: 'comp-5', name: 'Critical Alerts', value: '2', threshold: '0', status: 'non-compliant', trend: 'up', color: '#EF4444' },
  ];

  // Productivity Metrics
  const productivityMetrics: ProductivityMetric[] = [
    { id: 'prod-1', team: 'Customer Support', productivity: 94, capacity: 100, utilization: 87, overtimeRisk: 'low', trend: 'up' },
    { id: 'prod-2', team: 'Development', productivity: 89, capacity: 100, utilization: 92, overtimeRisk: 'medium', trend: 'stable' },
    { id: 'prod-3', team: 'Sales', productivity: 96, capacity: 100, utilization: 78, overtimeRisk: 'low', trend: 'up' },
    { id: 'prod-4', team: 'Marketing', productivity: 91, capacity: 100, utilization: 85, overtimeRisk: 'low', trend: 'up' },
    { id: 'prod-5', team: 'Operations', productivity: 88, capacity: 100, utilization: 95, overtimeRisk: 'high', trend: 'down' },
  ];

  // AI Insights
  const aiInsights: AIInsight[] = [
    { id: 'ins-1', type: 'warning', title: 'Workflow approval process causing 14% delays', description: 'The current multi-level approval workflow is adding unnecessary bottlenecks. Recommend implementing parallel approval paths for low-risk items.', impact: 'high', confidence: 87, actionable: true, timestamp: '15m ago' },
    { id: 'ins-2', type: 'opportunity', title: 'Automation opportunity identified in procurement operations', description: 'Vendor onboarding process can be 78% automated, potentially saving $180K annually in operational costs.', impact: 'high', confidence: 92, actionable: true, timestamp: '1h ago' },
    { id: 'ins-3', type: 'risk', title: 'Resource shortage predicted in Customer Support team', description: 'Based on current workload trends, the Customer Support team will be 25% understaffed within 2 weeks. Recommend hiring 4 additional agents.', impact: 'high', confidence: 84, actionable: true, timestamp: '2h ago' },
    { id: 'ins-4', type: 'alert', title: 'SLA breach risk detected for 27 requests', description: '27 service requests are at risk of missing their SLA deadlines within the next 24 hours. Immediate action required.', impact: 'high', confidence: 94, actionable: true, timestamp: '30m ago' },
    { id: 'ins-5', type: 'recommendation', title: 'Potential annual savings of $1.2M through workflow automation', description: 'Analysis reveals 12 manual processes that can be fully automated with AI, generating $1.2M in annual cost savings.', impact: 'high', confidence: 89, actionable: true, timestamp: '3h ago' },
  ];

  // Operations Activity Feed
  const operationsActivities: OperationsActivity[] = [
    { id: 'act-1', type: 'workflow', title: 'Workflow completed', description: 'Order Processing Pipeline completed successfully', timestamp: '2m ago', agent: 'Agent Atlas' },
    { id: 'act-2', type: 'resource', title: 'Resource allocated', description: 'Server capacity allocated to Development team', timestamp: '5m ago', agent: 'Agent Nexus' },
    { id: 'act-3', type: 'task', title: 'Task escalated', description: 'System performance issue escalated to critical', timestamp: '12m ago', agent: 'Agent Catalyst' },
    { id: 'act-4', type: 'sla', title: 'SLA risk detected', description: '27 requests at risk of SLA breach', timestamp: '15m ago', agent: 'Agent Pulse' },
    { id: 'act-5', type: 'automation', title: 'Automation executed', description: 'Invoice batch processing completed', timestamp: '20m ago', agent: 'Agent Atlas' },
    { id: 'act-6', type: 'incident', title: 'Incident resolved', description: 'Database connectivity issue resolved', timestamp: '30m ago', agent: 'System' },
    { id: 'act-7', type: 'compliance', title: 'Compliance alert triggered', description: 'Policy violation detected in Finance department', timestamp: '45m ago', agent: 'Agent Pulse' },
  ];

  // System Health
  const systemHealth: SystemHealth[] = [
    { name: 'Workflow Engine', status: 'healthy', uptime: 99.9, lastCheck: '30s ago', metrics: { responseTime: 8, errorRate: 0.01, latency: 12 } },
    { name: 'AI Agent Health', status: 'healthy', uptime: 99.8, lastCheck: '30s ago', metrics: { responseTime: 15, errorRate: 0.02, latency: 18 } },
    { name: 'API Connectivity', status: 'healthy', uptime: 99.9, lastCheck: '1m ago', metrics: { responseTime: 5, errorRate: 0.01, latency: 8 } },
    { name: 'ERP Integration', status: 'healthy', uptime: 99.9, lastCheck: '1m ago', metrics: { responseTime: 12, errorRate: 0.01, latency: 15 } },
    { name: 'CRM Integration', status: 'healthy', uptime: 99.7, lastCheck: '1m ago', metrics: { responseTime: 45, errorRate: 0.03, latency: 52 } },
    { name: 'Automation Services', status: 'degraded', uptime: 98.5, lastCheck: '2m ago', metrics: { responseTime: 120, errorRate: 0.08, latency: 135 } },
    { name: 'Data Pipelines', status: 'healthy', uptime: 99.8, lastCheck: '30s ago', metrics: { responseTime: 18, errorRate: 0.02, latency: 22 } },
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight size={16} color="#10B981" />;
      case 'down':
        return <ArrowDownRight size={16} color="#EF4444" />;
      case 'stable':
        return <Activity size={16} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'healthy':
      case 'active':
      case 'running':
      case 'completed':
      case 'on-track':
      case 'compliant':
      case 'available':
      case 'excellent':
      case 'good':
        return '#10B981';
      case 'offline':
      case 'critical':
      case 'error':
      case 'delayed':
      case 'breach':
      case 'overloaded':
      case 'non-compliant':
      case 'escalated':
        return '#EF4444';
      case 'busy':
      case 'degraded':
      case 'monitoring':
      case 'at-risk':
      case 'warning':
      case 'inactive':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle size={20} color="#F59E0B" />;
      case 'opportunity':
        return <TrendingUp size={20} color="#10B981" />;
      case 'info':
        return <Info size={20} color="#3B82F6" />;
      case 'success':
        return <CheckCircle size={20} color="#10B981" />;
      case 'risk':
        return <AlertCircle size={20} color="#EF4444" />;
      case 'recommendation':
        return <Star size={20} color="#8B5CF6" />;
      case 'alert':
        return <Bell size={20} color="#EF4444" />;
      default:
        return <Info size={20} color="#6B7280" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'workflow':
        return <Workflow size={16} color="#06B6D4" />;
      case 'resource':
        return <Cpu size={16} color="#8B5CF6" />;
      case 'task':
        return <ClipboardList size={16} color="#F59E0B" />;
      case 'sla':
        return <Target size={16} color="#EF4444" />;
      case 'automation':
        return <Zap size={16} color="#10B981" />;
      case 'incident':
        return <AlertTriangle size={16} color="#EC4899" />;
      case 'compliance':
        return <Shield size={16} color="#3B82F6" />;
      default:
        return <Activity size={16} color="#6B7280" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'workflow':
        return '#06B6D4';
      case 'resource':
        return '#8B5CF6';
      case 'task':
        return '#F59E0B';
      case 'sla':
        return '#EF4444';
      case 'automation':
        return '#10B981';
      case 'incident':
        return '#EC4899';
      case 'compliance':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const renderKPICard = (kpi: OperationsKPI) => (
    <View key={kpi.id} style={[styles.kpiCard, { backgroundColor: theme.colors.card, borderColor: kpi.color + '30' }]}>
      <View style={styles.kpiHeader}>
        <Text style={[styles.kpiTitle, { color: theme.colors.textSecondary }]}>{kpi.title}</Text>
        {getTrendIcon(kpi.trend)}
      </View>
      <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
      <View style={styles.kpiFooter}>
        <Text style={[styles.kpiChange, { color: kpi.trend === 'up' ? '#10B981' : kpi.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
          {kpi.change}
        </Text>
        <Text style={[styles.kpiSubtitle, { color: theme.colors.textSecondary }]}>{kpi.subtitle}</Text>
      </View>
    </View>
  );

  const renderAgentCard = (agent: OperationsAgent) => (
    <TouchableOpacity 
      key={agent.id} 
      style={[styles.agentCard, { backgroundColor: theme.colors.card, borderColor: selectedAgent === agent.id ? '#06B6D4' : 'transparent' }]}
      onPress={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
    >
      <View style={styles.agentHeader}>
        <View style={styles.agentAvatar}>
          <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
          <View style={[styles.agentStatus, { backgroundColor: getStatusColor(agent.status) }]} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
          <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>{agent.role}</Text>
        </View>
        <View style={[styles.confidenceBadge, { backgroundColor: '#06B6D4' + '20' }]}>
          <Text style={[styles.confidenceText, { color: '#06B6D4' }]}>{agent.confidenceScore}%</Text>
        </View>
      </View>
      
      <View style={styles.agentMetrics}>
        {agent.metrics.activeProcesses && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.metrics.activeProcesses}</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Processes</Text>
          </View>
        )}
        {agent.metrics.automationRate && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.metrics.automationRate}%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Automation</Text>
          </View>
        )}
        {agent.metrics.tasksCompleted && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.metrics.tasksCompleted.toLocaleString()}</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Tasks</Text>
          </View>
        )}
      </View>

      <View style={styles.agentImpact}>
        <Text style={[styles.impactValue, { color: '#06B6D4' }]}>{agent.productivityImpact}</Text>
        <Text style={[styles.impactLabel, { color: theme.colors.textSecondary }]}>{agent.activeAssignments} active</Text>
      </View>
    </TouchableOpacity>
  );

  const renderWorkflowRow = (workflow: Workflow) => (
    <View key={workflow.id} style={[styles.workflowRow, { backgroundColor: theme.colors.card }]}>
      <View style={styles.workflowInfo}>
        <Text style={[styles.workflowName, { color: theme.colors.text }]}>{workflow.name}</Text>
        <Text style={[styles.workflowDepartment, { color: theme.colors.textSecondary }]}>{workflow.department}</Text>
      </View>
      <View style={[styles.workflowStatus, { backgroundColor: getStatusColor(workflow.status) + '20' }]}>
        <Text style={[styles.workflowStatusText, { color: getStatusColor(workflow.status) }]}>{workflow.status}</Text>
      </View>
      <View style={styles.workflowOwner}>
        <Text style={[styles.workflowOwnerText, { color: theme.colors.textSecondary }]}>{workflow.owner}</Text>
      </View>
      <View style={[styles.workflowPriority, { backgroundColor: workflow.priority === 'critical' ? '#EF4444' + '20' : workflow.priority === 'high' ? '#F59E0B' + '20' : '#10B981' + '20' }]}>
        <Text style={[styles.workflowPriorityText, { color: workflow.priority === 'critical' ? '#EF4444' : workflow.priority === 'high' ? '#F59E0B' : '#10B981' }]}>{workflow.priority}</Text>
      </View>
      <View style={styles.workflowProgress}>
        <View style={[styles.progressBar, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.progressFill, { width: `${workflow.progress}%`, backgroundColor: getStatusColor(workflow.status) }]} />
        </View>
        <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>{workflow.progress}%</Text>
      </View>
      <View style={[styles.workflowSLA, { backgroundColor: getStatusColor(workflow.slaStatus) + '20' }]}>
        <Text style={[styles.workflowSLAText, { color: getStatusColor(workflow.slaStatus) }]}>{workflow.slaStatus}</Text>
      </View>
    </View>
  );

  const renderInsightCard = (insight: AIInsight) => (
    <View key={insight.id} style={[styles.insightCard, { backgroundColor: theme.colors.card, borderLeftWidth: 4, borderLeftColor: insight.type === 'risk' || insight.type === 'alert' ? '#EF4444' : insight.type === 'warning' ? '#F59E0B' : insight.type === 'opportunity' || insight.type === 'success' ? '#10B981' : '#3B82F6' }]}>
      <View style={styles.insightHeader}>
        <View style={styles.insightIcon}>
          {getInsightIcon(insight.type)}
        </View>
        <View style={styles.insightMeta}>
          <Text style={[styles.insightTitle, { color: theme.colors.text }]}>{insight.title}</Text>
          <View style={styles.insightTags}>
            <View style={[styles.insightTag, { backgroundColor: insight.impact === 'high' ? '#EF4444' + '20' : insight.impact === 'medium' ? '#F59E0B' + '20' : '#10B981' + '20' }]}>
              <Text style={[styles.insightTagText, { color: insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#10B981' }]}>{insight.impact} impact</Text>
            </View>
            {insight.confidence && (
              <View style={[styles.insightTag, { backgroundColor: '#8B5CF6' + '20' }]}>
                <Text style={[styles.insightTagText, { color: '#8B5CF6' }]}>{insight.confidence}% confidence</Text>
              </View>
            )}
          </View>
        </View>
        {insight.actionable && (
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#06B6D4' }]}>
            <Text style={styles.actionButtonText}>Action</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>{insight.description}</Text>
      <Text style={[styles.insightTime, { color: theme.colors.textSecondary }]}>{insight.timestamp}</Text>
    </View>
  );

  const renderActivityItem = (activity: OperationsActivity) => (
    <View key={activity.id} style={styles.activityItem}>
      <View style={[styles.activityIcon, { backgroundColor: getActivityColor(activity.type) + '20' }]}>
        {getActivityIcon(activity.type)}
      </View>
      <View style={styles.activityContent}>
        <Text style={[styles.activityTitle, { color: theme.colors.text }]}>{activity.title}</Text>
        <Text style={[styles.activityDescription, { color: theme.colors.textSecondary }]}>{activity.description}</Text>
        <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{activity.timestamp}</Text>
      </View>
    </View>
  );

  const renderSystemHealthItem = (health: SystemHealth) => (
    <View key={health.name} style={[styles.healthItem, { backgroundColor: theme.colors.card }]}>
      <View style={styles.healthHeader}>
        <Text style={[styles.healthName, { color: theme.colors.text }]}>{health.name}</Text>
        <View style={[styles.healthStatus, { backgroundColor: getStatusColor(health.status) + '20' }]}>
          <Text style={[styles.healthStatusText, { color: getStatusColor(health.status) }]}>{health.status}</Text>
        </View>
      </View>
      <View style={styles.healthMetrics}>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>Uptime</Text>
          <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>{health.uptime}%</Text>
        </View>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>Response</Text>
          <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>{health.metrics.responseTime}ms</Text>
        </View>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>Error Rate</Text>
          <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>{(health.metrics.errorRate * 100).toFixed(2)}%</Text>
        </View>
      </View>
      <Text style={[styles.healthLastCheck, { color: theme.colors.textSecondary }]}>{health.lastCheck}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Sidebar */}
      <View style={[styles.sidebar, { backgroundColor: theme.colors.card, width: sidebarCollapsed ? 60 : 240 }]}>
        <TouchableOpacity onPress={() => setSidebarCollapsed(!sidebarCollapsed)} style={styles.sidebarToggle}>
          {sidebarCollapsed ? <ChevronRight size={24} color={theme.colors.text} /> : <ChevronLeft size={24} color={theme.colors.text} />}
        </TouchableOpacity>
        
        {!sidebarCollapsed && (
          <View style={styles.sidebarHeader}>
            <Bot size={32} color="#06B6D4" />
            <Text style={[styles.sidebarTitle, { color: theme.colors.text }]}>Operations Command</Text>
          </View>
        )}

        <ScrollView style={styles.sidebarNav}>
          {navigationItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.navItem, activeTab === item.id && { backgroundColor: '#06B6D4' + '20' }]}
              onPress={() => setActiveTab(item.id)}
            >
              <item.icon size={20} color={activeTab === item.id ? '#06B6D4' : theme.colors.textSecondary} />
              {!sidebarCollapsed && <Text style={[styles.navLabel, { color: activeTab === item.id ? '#06B6D4' : theme.colors.textSecondary }]}>{item.label}</Text>}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent}>
        {/* Top Executive KPI Bar */}
        <View style={styles.kpiSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {operationsKPIs.map(renderKPICard)}
          </ScrollView>
        </View>

        {/* Section 1: AI Operations Agents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Operations Agents</Text>
            <TouchableOpacity style={[styles.sectionButton, { backgroundColor: '#06B6D4' + '20' }]}>
              <Plus size={16} color="#06B6D4" />
              <Text style={[styles.sectionButtonText, { color: '#06B6D4' }]}>Add Agent</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {operationsAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* Section 2: Operations Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Operations Command Center</Text>
          <View style={[styles.commandCenter, { backgroundColor: theme.colors.card }]}>
            <View style={styles.commandMetrics}>
              <View style={styles.commandMetric}>
                <Text style={[styles.commandMetricValue, { color: '#06B6D4' }]}>4,281</Text>
                <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Active Operations</Text>
              </View>
              <View style={styles.commandMetric}>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>94%</Text>
                <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Productivity Score</Text>
              </View>
              <View style={styles.commandMetric}>
                <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>98.4%</Text>
                <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>SLA Compliance</Text>
              </View>
              <View style={styles.commandMetric}>
                <Text style={[styles.commandMetricValue, { color: '#F59E0B' }]}>87%</Text>
                <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Resource Utilization</Text>
              </View>
              <View style={styles.commandMetric}>
                <Text style={[styles.commandMetricValue, { color: '#EC4899' }]}>$2.8M</Text>
                <Text style={[styles.commandMetricLabel, { color: theme.colors.textSecondary }]}>Monthly Savings</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section 3: Live Operations Monitor */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Operations Monitor</Text>
            <TouchableOpacity style={[styles.sectionButton, { backgroundColor: '#06B6D4' + '20' }]}>
              <RefreshCw size={16} color="#06B6D4" />
            </TouchableOpacity>
          </View>
          <View style={[styles.monitorContainer, { backgroundColor: theme.colors.card }]}>
            <View style={styles.monitorHeader}>
              <Text style={[styles.monitorHeaderText, { color: theme.colors.textSecondary }]}>Workflow</Text>
              <Text style={[styles.monitorHeaderText, { color: theme.colors.textSecondary }]}>Department</Text>
              <Text style={[styles.monitorHeaderText, { color: theme.colors.textSecondary }]}>Status</Text>
              <Text style={[styles.monitorHeaderText, { color: theme.colors.textSecondary }]}>Owner</Text>
              <Text style={[styles.monitorHeaderText, { color: theme.colors.textSecondary }]}>Priority</Text>
              <Text style={[styles.monitorHeaderText, { color: theme.colors.textSecondary }]}>Progress</Text>
              <Text style={[styles.monitorHeaderText, { color: theme.colors.textSecondary }]}>SLA</Text>
            </View>
            {liveWorkflows.map(renderWorkflowRow)}
          </View>
        </View>

        {/* Section 4: Workflow Intelligence */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Workflow Intelligence</Text>
          <View style={styles.metricsGrid}>
            {workflowMetrics.map((metric) => (
              <View key={metric.id} style={[styles.metricCard, { backgroundColor: theme.colors.card, borderColor: metric.color + '30' }]}>
                <Text style={[styles.metricCardName, { color: theme.colors.textSecondary }]}>{metric.name}</Text>
                <Text style={[styles.metricCardValue, { color: metric.color }]}>{metric.value}</Text>
                <View style={styles.metricCardFooter}>
                  {getTrendIcon(metric.trend)}
                  <Text style={[styles.metricCardChange, { color: metric.trend === 'up' ? '#10B981' : metric.trend === 'down' ? '#EF4444' : '#6B7280' }]}>{metric.change}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Section 5: Resource Management Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Resource Management Center</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {resources.map((resource) => (
              <View key={resource.id} style={[styles.resourceCard, { backgroundColor: theme.colors.card }]}>
                <View style={styles.resourceHeader}>
                  <Text style={[styles.resourceName, { color: theme.colors.text }]}>{resource.name}</Text>
                  <View style={[styles.resourceStatus, { backgroundColor: getStatusColor(resource.status) + '20' }]}>
                    <Text style={[styles.resourceStatusText, { color: getStatusColor(resource.status) }]}>{resource.status}</Text>
                  </View>
                </View>
                <Text style={[styles.resourceType, { color: theme.colors.textSecondary }]}>{resource.type} • {resource.department}</Text>
                <View style={styles.resourceCapacity}>
                  <View style={[styles.capacityBar, { backgroundColor: theme.colors.background }]}>
                    <View style={[styles.capacityFill, { width: `${resource.utilization}%`, backgroundColor: getStatusColor(resource.status) }]} />
                  </View>
                  <Text style={[styles.capacityText, { color: theme.colors.textSecondary }]}>{resource.utilization}% utilized</Text>
                </View>
                <Text style={[styles.resourceAllocation, { color: theme.colors.text }]}>Allocated: {resource.allocated}/{resource.capacity}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Section 6: Task Execution Dashboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Task Execution Dashboard</Text>
          <View style={[styles.taskStats, { backgroundColor: theme.colors.card }]}>
            <View style={styles.taskStat}>
              <Text style={[styles.taskStatValue, { color: '#06B6D4' }]}>156</Text>
              <Text style={[styles.taskStatLabel, { color: theme.colors.textSecondary }]}>Assigned</Text>
            </View>
            <View style={styles.taskStat}>
              <Text style={[styles.taskStatValue, { color: '#10B981' }]}>89</Text>
              <Text style={[styles.taskStatLabel, { color: theme.colors.textSecondary }]}>Completed</Text>
            </View>
            <View style={styles.taskStat}>
              <Text style={[styles.taskStatValue, { color: '#F59E0B' }]}>12</Text>
              <Text style={[styles.taskStatLabel, { color: theme.colors.textSecondary }]}>Delayed</Text>
            </View>
            <View style={styles.taskStat}>
              <Text style={[styles.taskStatValue, { color: '#EF4444' }]}>5</Text>
              <Text style={[styles.taskStatLabel, { color: theme.colors.textSecondary }]}>Escalated</Text>
            </View>
          </View>
          <ScrollView style={styles.taskList}>
            {tasks.map((task) => (
              <View key={task.id} style={[styles.taskItem, { backgroundColor: theme.colors.card }]}>
                <View style={styles.taskInfo}>
                  <Text style={[styles.taskTitle, { color: theme.colors.text }]}>{task.title}</Text>
                  <Text style={[styles.taskAssignee, { color: theme.colors.textSecondary }]}>{task.assignee}</Text>
                </View>
                <View style={[styles.taskStatus, { backgroundColor: getStatusColor(task.status) + '20' }]}>
                  <Text style={[styles.taskStatusText, { color: getStatusColor(task.status) }]}>{task.status}</Text>
                </View>
                <View style={[styles.taskPriority, { backgroundColor: task.priority === 'critical' ? '#EF4444' + '20' : task.priority === 'high' ? '#F59E0B' + '20' : '#10B981' + '20' }]}>
                  <Text style={[styles.taskPriorityText, { color: task.priority === 'critical' ? '#EF4444' : task.priority === 'high' ? '#F59E0B' : '#10B981' }]}>{task.priority}</Text>
                </View>
                <View style={styles.taskProgress}>
                  <View style={[styles.progressBar, { backgroundColor: theme.colors.background }]}>
                    <View style={[styles.progressFill, { width: `${task.progress}%`, backgroundColor: getStatusColor(task.status) }]} />
                  </View>
                  <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>{task.progress}%</Text>
                </View>
                <Text style={[styles.taskDueDate, { color: theme.colors.textSecondary }]}>{task.dueDate}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Section 7: Service Delivery Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Service Delivery Performance</Text>
          <View style={styles.metricsGrid}>
            {serviceMetrics.map((metric) => (
              <View key={metric.id} style={[styles.serviceMetricCard, { backgroundColor: theme.colors.card, borderColor: getStatusColor(metric.status) + '30' }]}>
                <Text style={[styles.serviceMetricName, { color: theme.colors.textSecondary }]}>{metric.name}</Text>
                <Text style={[styles.serviceMetricValue, { color: theme.colors.text }]}>{metric.value}</Text>
                <Text style={[styles.serviceMetricTarget, { color: theme.colors.textSecondary }]}>Target: {metric.target}</Text>
                <View style={[styles.serviceMetricStatus, { backgroundColor: getStatusColor(metric.status) + '20' }]}>
                  <Text style={[styles.serviceMetricStatusText, { color: getStatusColor(metric.status) }]}>{metric.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Section 8: Process Automation Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Process Automation Center</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {automationProcesses.map((process) => (
              <View key={process.id} style={[styles.automationCard, { backgroundColor: theme.colors.card }]}>
                <View style={styles.automationHeader}>
                  <Text style={[styles.automationName, { color: theme.colors.text }]}>{process.name}</Text>
                  <View style={[styles.automationType, { backgroundColor: process.type === 'automated' ? '#10B981' + '20' : process.type === 'manual' ? '#EF4444' + '20' : '#F59E0B' + '20' }]}>
                    <Text style={[styles.automationTypeText, { color: process.type === 'automated' ? '#10B981' : process.type === 'manual' ? '#EF4444' : '#F59E0B' }]}>{process.type}</Text>
                  </View>
                </View>
                <View style={styles.automationMetrics}>
                  <View style={styles.automationMetric}>
                    <Text style={[styles.automationMetricValue, { color: '#06B6D4' }]}>{process.efficiency}%</Text>
                    <Text style={[styles.automationMetricLabel, { color: theme.colors.textSecondary }]}>Efficiency</Text>
                  </View>
                  <View style={styles.automationMetric}>
                    <Text style={[styles.automationMetricValue, { color: '#10B981' }]}>{process.savings}</Text>
                    <Text style={[styles.automationMetricLabel, { color: theme.colors.textSecondary }]}>Savings</Text>
                  </View>
                </View>
                <Text style={[styles.automationFrequency, { color: theme.colors.textSecondary }]}>{process.frequency}</Text>
                <View style={[styles.automationStatus, { backgroundColor: process.status === 'active' ? '#10B981' + '20' : process.status === 'optimizing' ? '#F59E0B' + '20' : '#6B7280' + '20' }]}>
                  <Text style={[styles.automationStatusText, { color: process.status === 'active' ? '#10B981' : process.status === 'optimizing' ? '#F59E0B' : '#6B7280' }]}>{process.status}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Section 9: Risk & Compliance Control */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk & Compliance Control</Text>
          <View style={styles.metricsGrid}>
            {complianceMetrics.map((metric) => (
              <View key={metric.id} style={[styles.complianceCard, { backgroundColor: theme.colors.card, borderColor: metric.color + '30' }]}>
                <Text style={[styles.complianceName, { color: theme.colors.textSecondary }]}>{metric.name}</Text>
                <Text style={[styles.complianceValue, { color: metric.color }]}>{metric.value}</Text>
                <Text style={[styles.complianceThreshold, { color: theme.colors.textSecondary }]}>Threshold: {metric.threshold}</Text>
                <View style={[styles.complianceStatus, { backgroundColor: getStatusColor(metric.status) + '20' }]}>
                  <Text style={[styles.complianceStatusText, { color: getStatusColor(metric.status) }]}>{metric.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Section 10: Workforce Productivity Analytics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Workforce Productivity Analytics</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {productivityMetrics.map((metric) => (
              <View key={metric.id} style={[styles.productivityCard, { backgroundColor: theme.colors.card }]}>
                <Text style={[styles.productivityTeam, { color: theme.colors.text }]}>{metric.team}</Text>
                <View style={styles.productivityMetrics}>
                  <View style={styles.productivityMetric}>
                    <Text style={[styles.productivityMetricValue, { color: '#06B6D4' }]}>{metric.productivity}%</Text>
                    <Text style={[styles.productivityMetricLabel, { color: theme.colors.textSecondary }]}>Productivity</Text>
                  </View>
                  <View style={styles.productivityMetric}>
                    <Text style={[styles.productivityMetricValue, { color: '#10B981' }]}>{metric.utilization}%</Text>
                    <Text style={[styles.productivityMetricLabel, { color: theme.colors.textSecondary }]}>Utilization</Text>
                  </View>
                </View>
                <View style={[styles.productivityOvertime, { backgroundColor: metric.overtimeRisk === 'high' ? '#EF4444' + '20' : metric.overtimeRisk === 'medium' ? '#F59E0B' + '20' : '#10B981' + '20' }]}>
                  <Text style={[styles.productivityOvertimeText, { color: metric.overtimeRisk === 'high' ? '#EF4444' : metric.overtimeRisk === 'medium' ? '#F59E0B' : '#10B981' }]}>{metric.overtimeRisk} overtime risk</Text>
                </View>
                <View style={styles.productivityFooter}>
                  {getTrendIcon(metric.trend)}
                  <Text style={[styles.productivityTrend, { color: theme.colors.textSecondary }]}>Trend</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Section 11: AI Insights Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights Center</Text>
            <TouchableOpacity style={[styles.sectionButton, { backgroundColor: '#06B6D4' + '20' }]}>
              <RefreshCw size={16} color="#06B6D4" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.insightsList}>
            {aiInsights.map(renderInsightCard)}
          </ScrollView>
        </View>

        {/* Section 12: Real-Time Activity Stream */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-Time Activity Stream</Text>
            <TouchableOpacity style={[styles.sectionButton, { backgroundColor: '#06B6D4' + '20' }]}>
              <RefreshCw size={16} color="#06B6D4" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.activityList}>
            {operationsActivities.map(renderActivityItem)}
          </ScrollView>
        </View>

        {/* Section 13: Operations Health Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Operations Health Center</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {systemHealth.map(renderSystemHealthItem)}
          </ScrollView>
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
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  sidebarToggle: {
    padding: 16,
    alignItems: 'flex-end',
  },
  sidebarHeader: {
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sidebarNav: {
    flex: 1,
    padding: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 12,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 14,
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  kpiSection: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  kpiCard: {
    width: 180,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  kpiTitle: {
    fontSize: 12,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  kpiFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kpiChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  kpiSubtitle: {
    fontSize: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    gap: 8,
  },
  sectionButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentAvatar: {
    position: 'relative',
    marginRight: 12,
  },
  agentAvatarText: {
    fontSize: 32,
  },
  agentStatus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0B0F14',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentRole: {
    fontSize: 12,
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  metricItem: {
    flex: 1,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
  },
  agentImpact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  impactValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  impactLabel: {
    fontSize: 12,
  },
  commandCenter: {
    padding: 20,
    borderRadius: 12,
  },
  commandMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  commandMetric: {
    alignItems: 'center',
  },
  commandMetricValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  commandMetricLabel: {
    fontSize: 12,
  },
  monitorContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  monitorHeader: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  monitorHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  workflowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  workflowInfo: {
    flex: 2,
  },
  workflowName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  workflowDepartment: {
    fontSize: 11,
  },
  workflowStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  workflowStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  workflowOwner: {
    flex: 1,
  },
  workflowOwnerText: {
    fontSize: 11,
  },
  workflowPriority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  workflowPriorityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  workflowProgress: {
    flex: 1.5,
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
  },
  workflowSLA: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  workflowSLAText: {
    fontSize: 11,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  metricCardName: {
    fontSize: 12,
    marginBottom: 8,
  },
  metricCardValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricCardChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  resourceCard: {
    width: 220,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resourceName: {
    fontSize: 14,
    fontWeight: '600',
  },
  resourceStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  resourceStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  resourceType: {
    fontSize: 12,
    marginBottom: 12,
  },
  resourceCapacity: {
    marginBottom: 8,
  },
  capacityBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
    borderRadius: 4,
  },
  capacityText: {
    fontSize: 11,
  },
  resourceAllocation: {
    fontSize: 12,
    fontWeight: '600',
  },
  taskStats: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  taskStat: {
    flex: 1,
    alignItems: 'center',
  },
  taskStatValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  taskStatLabel: {
    fontSize: 12,
  },
  taskList: {
    maxHeight: 300,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  taskInfo: {
    flex: 2,
  },
  taskTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  taskAssignee: {
    fontSize: 11,
  },
  taskStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  taskStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  taskPriority: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  taskPriorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  taskProgress: {
    flex: 1.5,
    alignItems: 'center',
  },
  taskDueDate: {
    fontSize: 11,
    marginLeft: 12,
  },
  serviceMetricCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  serviceMetricName: {
    fontSize: 12,
    marginBottom: 8,
  },
  serviceMetricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  serviceMetricTarget: {
    fontSize: 11,
    marginBottom: 8,
  },
  serviceMetricStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  serviceMetricStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  automationCard: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  automationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  automationName: {
    fontSize: 13,
    fontWeight: '600',
  },
  automationType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  automationTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  automationMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  automationMetric: {
    flex: 1,
  },
  automationMetricValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  automationMetricLabel: {
    fontSize: 10,
  },
  automationFrequency: {
    fontSize: 11,
    marginBottom: 8,
  },
  automationStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  automationStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  complianceCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  complianceName: {
    fontSize: 12,
    marginBottom: 8,
  },
  complianceValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  complianceThreshold: {
    fontSize: 11,
    marginBottom: 8,
  },
  complianceStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  complianceStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  productivityCard: {
    width: 180,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  productivityTeam: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  productivityMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  productivityMetric: {
    flex: 1,
  },
  productivityMetricValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  productivityMetricLabel: {
    fontSize: 10,
  },
  productivityOvertime: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  productivityOvertimeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  productivityFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  productivityTrend: {
    fontSize: 11,
  },
  insightsList: {
    maxHeight: 400,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightIcon: {
    marginRight: 12,
  },
  insightMeta: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  insightTags: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  insightTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  insightTagText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  insightDescription: {
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18,
  },
  insightTime: {
    fontSize: 11,
  },
  activityList: {
    maxHeight: 300,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 12,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 11,
  },
  healthItem: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthName: {
    fontSize: 13,
    fontWeight: '600',
  },
  healthStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  healthStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  healthMetrics: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 12,
  },
  healthMetric: {
    flex: 1,
  },
  healthMetricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  healthMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  healthLastCheck: {
    fontSize: 11,
  },
});
