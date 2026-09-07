import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { professionalServicesDashboardConfig } from '@/constants/dashboardMetrics';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Briefcase,
  Users,
  DollarSign,
  BarChart3,
  Activity,
  CheckCircle,
  TrendingUp,
  Target,
  Brain,
  Building,
  FileText,
  Clock,
  AlertTriangle,
  Shield,
  Database,
  PieChart,
  LineChart,
  Zap,
  Settings,
  Home,
  Layers,
  Grid3x3,
  LayoutDashboard,
  ClipboardList,
  ChevronRight,
  MoreHorizontal,
  Search,
  Bell,
  Plus,
  RefreshCw,
  Download,
  Share2,
  MoreVertical,
  Eye,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  Sparkles,
  Award,
  Radio,
  Star,
  Globe,
  Map,
  Calendar,
  User,
  Phone,
  Mail,
  Building2,
  CreditCard,
  Wallet,
  Receipt,
  Calculator,
  Percent,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Mic,
  Video,
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  Tv,
  Music,
  Image,
  File,
  Folder,
  Archive,
  Trash,
  Clipboard,
  ClipboardCopy,
  ClipboardCheck,
  Maximize2,
  Minimize2,
  RotateCw,
  RotateCcW,
  Crop,
  Sliders,
  Palette,
  Type,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Indent,
  Outdent,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  Quote,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  HelpCircle,
  Info,
  CheckCircle2,
  XCircle,
  PlusCircle,
  MinusCircle,
  LogIn,
  LogOut,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  Key,
  Fingerprint,
  EyeOff as EyeOffIcon,
  BellRing,
  BellOff,
  MessageSquare as MessageSquareIcon,
  MessageCircle as MessageCircleIcon,
  MessageSquareMore,
  Send,
  Paperclip,
  AtSign,
  Hash,
  Landmark,
  PiggyBank,
  Flame,
  Droplet,
  Wind,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Umbrella,
  Snowflake,
  Thermometer,
  Compass,
  MapPin,
  Navigation,
  Navigation2,
  Earth,
  Satellite,
  Rocket,
  Airplane,
  Car,
  Train,
  Bus,
  Truck as TruckIcon,
  Bike,
  Motorcycle,
  Ship,
  Anchor as AnchorIcon,
  Store,
  Warehouse,
  Factory as FactoryIcon,
  Move as MoveIcon,
  FlipHorizontal,
  FlipVertical,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Euro,
  PoundSterling,
  Yen,
  Bitcoin,
  Heart,
  UserCog
} from 'lucide-react-native';

// Import Professional Services Components
import AIProfessionalServicesAgents from '@/components/ai-agent/dashboard/professional-services/AIProfessionalServicesAgents';
import ChiefDeliveryOfficerDashboard from '@/components/ai-agent/dashboard/professional-services/ChiefDeliveryOfficerDashboard';
import ProjectDeliveryControlCenter from '@/components/ai-agent/dashboard/professional-services/ProjectDeliveryControlCenter';
import ResourceManagementCenter from '@/components/ai-agent/dashboard/professional-services/ResourceManagementCenter';
import TimeBillingIntelligence from '@/components/ai-agent/dashboard/professional-services/TimeBillingIntelligence';
import ClientIntelligenceHub from '@/components/ai-agent/dashboard/professional-services/ClientIntelligenceHub';
import ProposalsSalesEngine from '@/components/ai-agent/dashboard/professional-services/ProposalsSalesEngine';
import KnowledgeManagementSystem from '@/components/ai-agent/dashboard/professional-services/KnowledgeManagementSystem';
import DeliveryRiskHealthCenter from '@/components/ai-agent/dashboard/professional-services/DeliveryRiskHealthCenter';
import ProfitabilityFinancialIntelligence from '@/components/ai-agent/dashboard/professional-services/ProfitabilityFinancialIntelligence';
import AIProfessionalServicesInsights from '@/components/ai-agent/dashboard/professional-services/AIProfessionalServicesInsights';
import RealTimeDeliveryOperationsFeed from '@/components/ai-agent/dashboard/professional-services/RealTimeDeliveryOperationsFeed';
import PlatformHealthDeliverySystems from '@/components/ai-agent/dashboard/professional-services/PlatformHealthDeliverySystems';

// Types
interface ProfessionalServicesAgent {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'busy';
  confidenceScore: number;
  revenueContribution: string;
  projectsManaged?: number;
  deliveryEfficiency?: string;
  marginImprovement?: string;
  clientsAnalyzed?: number;
  satisfactionPrediction?: string;
  upsellOpportunities?: number;
  consultantsOptimized?: number;
  utilizationIncrease?: string;
  schedulingAccuracy?: string;
  hoursTracked?: string;
  billingAccuracy?: string;
  leakagePrevented?: string;
  knowledgeGraphNodes?: number;
  insightGeneration?: string;
  reuseEfficiency?: string;
  risksIdentified?: number;
  escalationsPrevented?: number;
  impactMitigated?: string;
  color: string;
}

export default function ProfessionalServicesCommandCenter() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');

  const config = professionalServicesDashboardConfig;
  const { width } = Dimensions.get('window');

  // Enhanced color scheme for enterprise theme
  const colors = {
    background: '#050B14',
    card: 'rgba(10, 20, 40, 0.8)',
    cardBorder: 'rgba(30, 58, 95, 0.5)',
    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    electricBlue: '#3B82F6',
    emeraldGreen: '#10B981',
    purple: '#8B5CF6',
    amber: '#F59E0B',
    red: '#EF4444',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)'
  };

  // Comprehensive Executive KPI Data
  const executiveKPIData = [
    // Financial KPIs
    {
      id: 'services-revenue',
      label: 'Services Revenue',
      value: '$2.4B',
      trend: 'up',
      trendValue: '+12%',
      icon: DollarSign,
      color: '#10B981',
      subtitle: 'Year to date',
      forecast: '$2.8B Q4',
      aiCommentary: 'AI forecasts 18% growth',
      category: 'financial'
    },
    {
      id: 'gross-margin',
      label: 'Gross Margin',
      value: '42.8%',
      trend: 'up',
      trendValue: '+2.4%',
      icon: BarChart3,
      color: '#10B981',
      subtitle: 'Average margin',
      forecast: '45% target',
      aiCommentary: 'Pricing optimization +3%',
      category: 'financial'
    },
    {
      id: 'pipeline-value',
      label: 'Pipeline Value',
      value: '$4.2B',
      trend: 'up',
      trendValue: '+8%',
      icon: TrendingUp,
      color: '#8B5CF6',
      subtitle: 'Opportunities',
      forecast: '$5.1B projected',
      aiCommentary: 'Conversion improving',
      category: 'financial'
    },
    {
      id: 'forecast-revenue',
      label: 'Forecast Revenue',
      value: '$2.8B',
      trend: 'up',
      trendValue: '+15%',
      icon: Target,
      color: '#8B5CF6',
      subtitle: 'Next quarter',
      forecast: '94% accuracy',
      aiCommentary: 'Demand modeling active',
      category: 'financial'
    },
    {
      id: 'revenue-risk',
      label: 'Revenue at Risk',
      value: '$180M',
      trend: 'down',
      trendValue: '-12%',
      icon: AlertTriangle,
      color: '#EF4444',
      subtitle: 'At-risk deals',
      forecast: '$120M projected',
      aiCommentary: 'Risk mitigation +22%',
      category: 'financial'
    },

    // Delivery KPIs
    {
      id: 'active-projects',
      label: 'Active Projects',
      value: '12,450',
      trend: 'up',
      trendValue: '+8%',
      icon: Briefcase,
      color: '#06B6D4',
      subtitle: 'Current engagements',
      forecast: '13,200 Q4',
      aiCommentary: 'Capacity at 87%',
      category: 'delivery'
    },
    {
      id: 'on-time-delivery',
      label: 'On-Time Delivery',
      value: '94%',
      trend: 'up',
      trendValue: '+3%',
      icon: CheckCircle,
      color: '#10B981',
      subtitle: 'Schedule adherence',
      forecast: '96% target',
      aiCommentary: 'Timeline optimization +18%',
      category: 'delivery'
    },
    {
      id: 'project-success',
      label: 'Project Success',
      value: '91%',
      trend: 'up',
      trendValue: '+4%',
      icon: Award,
      color: '#10B981',
      subtitle: 'Client acceptance',
      forecast: '94% target',
      aiCommentary: 'Quality AI +12%',
      category: 'delivery'
    },
    {
      id: 'sla-compliance',
      label: 'SLA Compliance',
      value: '96%',
      trend: 'stable',
      trendValue: '0%',
      icon: Shield,
      color: '#06B6D4',
      subtitle: 'Service levels',
      forecast: '98% target',
      aiCommentary: 'Monitoring active',
      category: 'delivery'
    },
    {
      id: 'milestone-completion',
      label: 'Milestone Completion',
      value: '89%',
      trend: 'up',
      trendValue: '+5%',
      icon: Target,
      color: '#10B981',
      subtitle: 'On-time milestones',
      forecast: '92% target',
      aiCommentary: 'Planning AI +8%',
      category: 'delivery'
    },

    // Resource KPIs
    {
      id: 'utilization-rate',
      label: 'Utilization Rate',
      value: '86%',
      trend: 'up',
      trendValue: '+4%',
      icon: Activity,
      color: '#8B5CF6',
      subtitle: 'Consultant capacity',
      forecast: '88% target',
      aiCommentary: 'Optimization +19%',
      category: 'resource'
    },
    {
      id: 'billable-utilization',
      label: 'Billable Utilization',
      value: '74%',
      trend: 'up',
      trendValue: '+6%',
      icon: DollarSign,
      color: '#10B981',
      subtitle: 'Revenue-generating',
      forecast: '78% target',
      aiCommentary: 'Scheduling AI +14%',
      category: 'resource'
    },
    {
      id: 'bench-capacity',
      label: 'Bench Capacity',
      value: '14%',
      trend: 'down',
      trendValue: '-3%',
      icon: Users,
      color: '#F59E0B',
      subtitle: 'Available consultants',
      forecast: '12% optimal',
      aiCommentary: 'Staffing AI active',
      category: 'resource'
    },
    {
      id: 'resource-availability',
      label: 'Resource Availability',
      value: '92%',
      trend: 'up',
      trendValue: '+8%',
      icon: UserCog,
      color: '#06B6D4',
      subtitle: 'Skill coverage',
      forecast: '95% target',
      aiCommentary: 'Skills matching +22%',
      category: 'resource'
    },
    {
      id: 'staffing-accuracy',
      label: 'Staffing Accuracy',
      value: '94%',
      trend: 'up',
      trendValue: '+5%',
      icon: Target,
      color: '#10B981',
      subtitle: 'Forecast vs actual',
      forecast: '96% target',
      aiCommentary: 'Prediction engine +12%',
      category: 'resource'
    },

    // Customer KPIs
    {
      id: 'csat-score',
      label: 'CSAT Score',
      value: '94%',
      trend: 'up',
      trendValue: '+3%',
      icon: Star,
      color: '#10B981',
      subtitle: 'Client satisfaction',
      forecast: '96% target',
      aiCommentary: 'Sentiment AI +18%',
      category: 'customer'
    },
    {
      id: 'nps-score',
      label: 'NPS Score',
      value: '72',
      trend: 'up',
      trendValue: '+8',
      icon: Star,
      color: '#10B981',
      subtitle: 'Net promoter',
      forecast: '75 target',
      aiCommentary: 'Experience AI +14%',
      category: 'customer'
    },
    {
      id: 'client-health',
      label: 'Client Health',
      value: '89%',
      trend: 'up',
      trendValue: '+4%',
      icon: Heart,
      color: '#06B6D4',
      subtitle: 'Overall health index',
      forecast: '92% target',
      aiCommentary: 'Health AI +16%',
      category: 'customer'
    },
    {
      id: 'renewal-probability',
      label: 'Renewal Probability',
      value: '87%',
      trend: 'up',
      trendValue: '+6%',
      icon: RefreshCw,
      color: '#10B981',
      subtitle: 'Contract renewals',
      forecast: '90% target',
      aiCommentary: 'Retention AI +20%',
      category: 'customer'
    },
    {
      id: 'expansion-value',
      label: 'Expansion Value',
      value: '$840M',
      trend: 'up',
      trendValue: '+24%',
      icon: TrendingUp,
      color: '#8B5CF6',
      subtitle: 'Upsell opportunities',
      forecast: '$1.2B projected',
      aiCommentary: 'Opportunity AI +28%',
      category: 'customer'
    },

    // AI KPIs
    {
      id: 'ai-productivity',
      label: 'AI Productivity',
      value: '+$180M',
      trend: 'up',
      trendValue: '+28%',
      icon: Sparkles,
      color: '#EC4899',
      subtitle: 'Productivity gain',
      forecast: '+$240M projected',
      aiCommentary: 'Automation scaling',
      category: 'ai'
    },
    {
      id: 'hours-automated',
      label: 'Hours Automated',
      value: '2.4M',
      trend: 'up',
      trendValue: '+42%',
      icon: Clock,
      color: '#EC4899',
      subtitle: 'AI-driven hours',
      forecast: '3.2M projected',
      aiCommentary: 'Process AI +35%',
      category: 'ai'
    },
    {
      id: 'cost-savings',
      label: 'Cost Savings',
      value: '$48M',
      trend: 'up',
      trendValue: '+18%',
      icon: DollarSign,
      color: '#10B981',
      subtitle: 'AI-driven savings',
      forecast: '$64M projected',
      aiCommentary: 'Efficiency AI +22%',
      category: 'ai'
    },
    {
      id: 'delivery-acceleration',
      label: 'Delivery Speed',
      value: '+34%',
      trend: 'up',
      trendValue: '+12%',
      icon: Zap,
      color: '#EC4899',
      subtitle: 'Time to delivery',
      forecast: '+40% target',
      aiCommentary: 'Acceleration AI +28%',
      category: 'ai'
    },
    {
      id: 'ai-recommendations',
      label: 'AI Recommendations',
      value: '48K',
      trend: 'up',
      trendValue: '+56%',
      icon: Brain,
      color: '#EC4899',
      subtitle: 'Generated this month',
      forecast: '60K projected',
      aiCommentary: 'Insight engine active',
      category: 'ai'
    }
  ];

  // Sample data for components
  const agentsData = [
    {
      id: '1',
      name: 'Agent Atlas',
      role: 'Project Delivery Agent',
      avatar: '🤖',
      performanceScore: 94,
      projectsManaged: '842',
      deliveryEfficiency: '+22%',
      marginImprovement: '+18%',
      status: 'active',
      lastActivity: 'Optimizing project timeline',
      confidenceScore: 96,
      engagementImpact: 'High',
      revenueContribution: '$2.4M',
      deliveryEfficiencyMetric: '+22% efficiency',
      color: '#3B82F6'
    },
    {
      id: '2',
      name: 'Agent Forge',
      role: 'Proposal & SOW Agent',
      avatar: '🎯',
      performanceScore: 91,
      proposalsGenerated: '2,480',
      winRateImpact: '+18%',
      turnaroundTime: '-45%',
      status: 'active',
      lastActivity: 'Generating client proposal',
      confidenceScore: 94,
      engagementImpact: 'High',
      revenueContribution: '$1.8M',
      deliveryEfficiencyMetric: '+18% win rate',
      color: '#8B5CF6'
    },
    {
      id: '3',
      name: 'Agent Nexus',
      role: 'Client Success Agent',
      avatar: '⚡',
      performanceScore: 89,
      clientsAnalyzed: '12,480',
      satisfactionPrediction: '94%',
      renewalInfluence: '+22%',
      status: 'active',
      lastActivity: 'Analyzing client sentiment',
      confidenceScore: 92,
      engagementImpact: 'High',
      revenueContribution: '$1.2M',
      deliveryEfficiencyMetric: '+18% satisfaction',
      color: '#10B981'
    },
    {
      id: '4',
      name: 'Agent Vector',
      role: 'Resource Allocation Agent',
      avatar: '🎨',
      performanceScore: 87,
      consultantsOptimized: '48,200',
      utilizationIncrease: '+19%',
      forecastAccuracy: '96%',
      status: 'active',
      lastActivity: 'Optimizing resource allocation',
      confidenceScore: 90,
      engagementImpact: 'Medium',
      revenueContribution: '$1.2M',
      deliveryEfficiencyMetric: '+19% utilization',
      color: '#F59E0B'
    },
    {
      id: '5',
      name: 'Agent Sentinel',
      role: 'Risk Management Agent',
      avatar: '🛡️',
      performanceScore: 92,
      risksPrevented: '1,240',
      budgetSavings: '$8.4M',
      predictionAccuracy: '94%',
      status: 'active',
      lastActivity: 'Monitoring delivery risks',
      confidenceScore: 93,
      engagementImpact: 'High',
      revenueContribution: '$2.8M',
      deliveryEfficiencyMetric: '+28% risk prevention',
      color: '#EF4444'
    }
  ];

  const cdoData = {
    activeEngagements: '2,480',
    utilizationRate: '87%',
    billableRevenue: '$1.8B',
    projectMargin: '34%',
    clientSatisfaction: '91%',
    deliveryOnTimeRate: '94%',
    pipelineValue: '$4.2B',
    resourceEfficiency: '89%',
    aiProductivityImpact: '+28%'
  };

  const projectsData = [
    { id: 1, name: 'Cloud Migration', client: 'Global Bank', status: 'On Track', progress: 75, margin: 38, team: 12 },
    { id: 2, name: 'Data Analytics Platform', client: 'Retail Chain', status: 'At Risk', progress: 45, margin: 28, team: 8 },
    { id: 3, name: 'AI Implementation', client: 'Healthcare System', status: 'Delayed', progress: 30, margin: 42, team: 15 },
    { id: 4, name: 'Digital Transformation', client: 'Manufacturing Co', status: 'On Track', progress: 60, margin: 35, team: 20 }
  ];

  const milestonesData = [
    { id: 1, project: 'Cloud Migration', milestone: 'Infrastructure Setup', status: 'Completed', dueDate: '2024-01-15' },
    { id: 2, project: 'Data Analytics', milestone: 'Data Integration', status: 'In-Progress', dueDate: '2024-01-20' },
    { id: 3, project: 'AI Implementation', milestone: 'Model Training', status: 'Pending', dueDate: '2024-01-25' }
  ];

  const consultantsData = [
    { id: 1, name: 'Sarah Chen', role: 'Senior Consultant', skills: ['Cloud', 'AI/ML', 'Strategy'], utilization: 92, availability: 'Limited' },
    { id: 2, name: 'Michael Roberts', role: 'Delivery Lead', skills: ['Project Management', 'Agile', 'Risk'], utilization: 88, availability: 'Available' },
    { id: 3, name: 'Emily Watson', role: 'Data Scientist', skills: ['Python', 'ML', 'Statistics'], utilization: 95, availability: 'Booked' }
  ];

  const skillsMatrix = {
    'Cloud Migration': { demand: 85, supply: 70 },
    'AI/ML': { demand: 92, supply: 65 },
    'Data Analytics': { demand: 78, supply: 80 },
    'Cybersecurity': { demand: 88, supply: 55 },
    'Strategy': { demand: 72, supply: 75 }
  };

  const timeBillingData = {
    billableHours: '1.2M',
    nonBillableTime: '18%',
    timeLeakage: '8%',
    billingAccuracy: '96%',
    revenueLeakageRisk: '$840K',
    utilizationBreakdown: { billable: 74, nonBillable: 18, unaccounted: 8 }
  };

  const clientsData = [
    { id: 1, name: 'Fortune 500 Tech', healthScore: 92, satisfaction: 94, expansion: 78, churnRisk: 8, contractValue: '$2.4M' },
    { id: 2, name: 'Global Bank', healthScore: 88, satisfaction: 91, expansion: 65, churnRisk: 12, contractValue: '$1.8M' },
    { id: 3, name: 'Healthcare System', healthScore: 85, satisfaction: 87, expansion: 72, churnRisk: 15, contractValue: '$1.2M' }
  ];

  const segmentationData = {
    enterprise: 45,
    midMarket: 35,
    smb: 20
  };

  const proposalsData = {
    rfps: 24,
    proposalsSubmitted: 18,
    winRate: '67%',
    dealPipeline: '$4.2B',
    pricingModels: ['Fixed Price', 'Time & Materials', 'Retainer', 'Performance-Based'],
    salesFunnel: { qualified: 45, proposal: 32, negotiation: 18, closed: 12 }
  };

  const knowledgeData = {
    caseStudies: 1240,
    bestPractices: 860,
    deliveryTemplates: 540,
    internalKnowledgeBase: '24,800 articles',
    aiGeneratedInsights: '3,200 insights',
    knowledgeGraph: { nodes: 12400, connections: 48200, expertiseAreas: 86 }
  };

  const riskData = {
    projectDelays: 8,
    scopeCreep: 12,
    budgetOverruns: 5,
    resourceShortages: 6,
    clientEscalations: 3,
    riskHeatmap: [
      { project: 'Cloud Migration', riskLevel: 'Medium', riskType: 'Timeline' },
      { project: 'Data Analytics', riskLevel: 'High', riskType: 'Scope' },
      { project: 'AI Implementation', riskLevel: 'Medium', riskType: 'Resource' }
    ]
  };

  const profitabilityData = {
    revenuePerEngagement: '$1.8M',
    costPerProject: '$1.2M',
    marginByClient: '34%',
    resourceCostEfficiency: '89%',
    profitLeakagePoints: 4,
    profitabilityHeatmap: [
      { client: 'Fortune 500 Tech', margin: 42, revenue: '$2.4M' },
      { client: 'Global Bank', margin: 38, revenue: '$1.8M' },
      { client: 'Healthcare System', margin: 28, revenue: '$1.2M' }
    ]
  };

  const insightsData = {
    insights: [
      {
        id: '1',
        type: 'risk',
        title: 'Project Alpha at risk of 12% margin erosion',
        description: 'Scope expansion detected in Cloud Migration project. Immediate client review recommended.',
        impact: 'high',
        action: 'Review Scope'
      },
      {
        id: '2',
        type: 'opportunity',
        title: 'Resource shortage predicted in Data Engineering',
        description: 'Demand spike expected in Q2. Recommend hiring 3 senior data engineers.',
        impact: 'medium',
        action: 'Initiate Hiring'
      },
      {
        id: '3',
        type: 'recommendation',
        title: 'Client X shows 34% upsell probability',
        description: 'AI analysis indicates strong expansion opportunity for AI/ML services.',
        impact: 'medium',
        action: 'Schedule Meeting'
      }
    ]
  };

  const operationsData = {
    operations: [
      { event: 'Project milestone completed', project: 'Cloud Migration', impact: 'low', time: '2m ago' },
      { event: 'Client approval received', project: 'Data Analytics', impact: 'low', time: '5m ago' },
      { event: 'Resource reallocated', project: 'AI Implementation', impact: 'medium', time: '8m ago' },
      { event: 'Risk detected', project: 'Cloud Migration', impact: 'high', time: '12m ago' },
      { event: 'Proposal submitted', project: 'New Opportunity', impact: 'medium', time: '15m ago' }
    ]
  };

  const platformHealthData = {
    systems: [
      { id: '1', name: 'Project Management Tools', status: 'operational', uptime: 99.8, latency: 45, lastIncident: '3 days ago' },
      { id: '2', name: 'Time Tracking Systems', status: 'operational', uptime: 99.5, latency: 32, lastIncident: '5 days ago' },
      { id: '3', name: 'Billing Systems', status: 'operational', uptime: 99.9, latency: 28, lastIncident: '7 days ago' },
      { id: '4', name: 'CRM Systems', status: 'degraded', uptime: 97.2, latency: 85, lastIncident: '1 day ago' }
    ],
    integrations: [
      { source: 'Project Mgmt', target: 'Time Tracking', status: 'healthy', dataFlow: 1200, latency: 15 },
      { source: 'Time Tracking', target: 'Billing', status: 'healthy', dataFlow: 980, latency: 20 },
      { source: 'CRM', target: 'Project Mgmt', status: 'warning', dataFlow: 450, latency: 45 }
    ],
    overallReliability: 98.9,
    avgDataLatency: 48
  };

  const renderNavigationItem = (icon: any, label: string, route: string) => (
    <TouchableOpacity style={[styles.navigationItem, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
      <View style={[styles.navIcon, { backgroundColor: colors.electricBlue + '20' }]}>
        {React.createElement(icon, { size: 20, color: colors.electricBlue })}
      </View>
      <Text style={[styles.navLabel, { color: colors.text }]}>{label}</Text>
      <ChevronRight size={16} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  const renderAgentCard = (agent: ProfessionalServicesAgent) => (
    <View key={agent.id} style={[styles.agentCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: agent.color + '40', borderWidth: 1 }]}>
      <View style={styles.agentHeader}>
        <View style={[styles.agentAvatar, { backgroundColor: agent.color + '30' }]}>
          <Bot size={32} color={agent.color} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
          <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>{agent.role}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: agent.status === 'online' ? '#10B981' + '30' : '#6B7280' + '30' }]}>
          <View style={[styles.statusDot, { backgroundColor: agent.status === 'online' ? '#10B981' : '#6B7280' }]} />
          <Text style={[styles.statusText, { color: agent.status === 'online' ? '#10B981' : '#6B7280' }]}>{agent.status}</Text>
        </View>
      </View>
      
      <View style={styles.agentMetrics}>
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
          <Text style={[styles.metricValue, { color: agent.color }]}>{agent.confidenceScore}%</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Revenue Impact</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.revenueContribution}</Text>
        </View>
        {agent.projectsManaged && (
          <View style={styles.metricRow}>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Projects</Text>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.projectsManaged.toLocaleString()}</Text>
          </View>
        )}
        {agent.deliveryEfficiency && (
          <View style={styles.metricRow}>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Efficiency</Text>
            <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.deliveryEfficiency}</Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderKPICard = (metric: any, index: number) => (
    <View key={metric.id} style={[styles.kpiCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={styles.kpiHeader}>
        <LinearGradient
          colors={[metric.color + '30', metric.color + '10']}
          style={styles.kpiIcon}
        >
          {React.createElement(metric.icon, { size: 24, color: metric.color })}
        </LinearGradient>
        <View style={[styles.trendBadge, { backgroundColor: metric.trend === 'up' ? colors.emeraldGreen + '20' : colors.red + '20' }]}>
          {React.createElement(metric.trend === 'up' ? ArrowUpRight : ArrowDownRight, { size: 16, color: metric.trend === 'up' ? colors.emeraldGreen : colors.red })}
          <Text style={[styles.trendText, { color: metric.trend === 'up' ? colors.emeraldGreen : colors.red }]}>{metric.change}</Text>
        </View>
      </View>
      <Text style={[styles.kpiValue, { color: colors.text }]}>{metric.value}</Text>
      <Text style={[styles.kpiTitle, { color: colors.textSecondary }]}>{metric.title}</Text>
      <Text style={[styles.kpiSubtitle, { color: colors.textSecondary + '80' }]}>{metric.subtitle}</Text>
      
      {/* AI Commentary */}
      <View style={[styles.aiCommentary, { backgroundColor: colors.purple + '10', borderColor: colors.purple + '30', borderWidth: 1 }]}>
        <Sparkles size={12} color={colors.purple} />
        <Text style={[styles.aiCommentaryText, { color: colors.purple }]}>
          {index < 5 ? 'AI: On track to exceed Q4 target' : 'AI: Forecasting +8% growth'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Glassmorphism */}
      <LinearGradient
        colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 11, 20, 0.9)']}
        style={[styles.header, { borderBottomColor: colors.cardBorder }]}
      >
        <View style={styles.headerLeft}>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.headerIcon}
          >
            <Briefcase size={28} color="#FFFFFF" />
          </LinearGradient>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Professional Services AI Command Center</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Enterprise Consulting & Delivery Intelligence</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <RefreshCw size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Bell size={20} color={colors.textSecondary} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Settings size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Sidebar Navigation with Glassmorphism */}
      <View style={[styles.sidebar, { backgroundColor: colors.card, borderRightColor: colors.cardBorder }]}>
        <Text style={[styles.sidebarTitle, { color: colors.textSecondary }]}>Navigation</Text>
        
        {renderNavigationItem(LayoutDashboard, 'Executive Dashboard', 'dashboard')}
        {renderNavigationItem(Bot, 'AI Service Agents', 'agents')}
        {renderNavigationItem(Briefcase, 'Project Portfolio', 'projects')}
        {renderNavigationItem(Users, 'Resource Management', 'resources')}
        {renderNavigationItem(Building, 'Client Success', 'clients')}
        {renderNavigationItem(BarChart3, 'Revenue Forecasting', 'forecasting')}
        {renderNavigationItem(FileText, 'Proposals & SOW', 'proposals')}
        {renderNavigationItem(ClipboardList, 'Delivery Operations', 'delivery')}
        {renderNavigationItem(Shield, 'PMO Command Center', 'pmo')}
        {renderNavigationItem(AlertTriangle, 'Risk & Compliance', 'risk')}
        {renderNavigationItem(Database, 'Knowledge Intelligence', 'knowledge')}
        {renderNavigationItem(Globe, 'Global Operations', 'operations')}
        {renderNavigationItem(LineChart, 'Analytics', 'analytics')}
        {renderNavigationItem(Settings, 'Settings', 'settings')}
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Executive KPI Bar */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Executive Performance Metrics</Text>
          <View style={styles.kpiGrid}>
            {config.metrics.slice(0, 15).map((metric, index) => renderKPICard(metric, index))}
          </View>
        </View>

        {/* AI Professional Services Agents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Professional Services Agents</Text>
            <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
              <Text style={[styles.viewAllText, { color: colors.emeraldGreen }]}>View All Agents</Text>
              <ChevronRight size={16} color={colors.emeraldGreen} />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {config.aiProfessionalServicesAgents?.agents.map((agent) => renderAgentCard(agent))}
          </ScrollView>
        </View>

        {/* Chief Services Officer Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Chief Services Officer Command Center</Text>
          <View style={[styles.cdoDashboard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.cdoMetrics}>
              <View style={styles.cdoMetric}>
                <Text style={[styles.cdoMetricValue, { color: colors.emeraldGreen }]}>$2.4B</Text>
                <Text style={[styles.cdoMetricLabel, { color: colors.textSecondary }]}>Total Revenue</Text>
              </View>
              <View style={styles.cdoMetric}>
                <Text style={[styles.cdoMetricValue, { color: colors.electricBlue }]}>12,450</Text>
                <Text style={[styles.cdoMetricLabel, { color: colors.textSecondary }]}>Active Projects</Text>
              </View>
              <View style={styles.cdoMetric}>
                <Text style={[styles.cdoMetricValue, { color: colors.emeraldGreen }]}>48,000</Text>
                <Text style={[styles.cdoMetricLabel, { color: colors.textSecondary }]}>Consultants</Text>
              </View>
              <View style={styles.cdoMetric}>
                <Text style={[styles.cdoMetricValue, { color: colors.purple }]}>94%</Text>
                <Text style={[styles.cdoMetricLabel, { color: colors.textSecondary }]}>Client Satisfaction</Text>
              </View>
              <View style={styles.cdoMetric}>
                <Text style={[styles.cdoMetricValue, { color: colors.electricBlue }]}>86%</Text>
                <Text style={[styles.cdoMetricLabel, { color: colors.textSecondary }]}>Utilization</Text>
              </View>
              <View style={styles.cdoMetric}>
                <Text style={[styles.cdoMetricValue, { color: colors.emeraldGreen }]}>+$180M</Text>
                <Text style={[styles.cdoMetricLabel, { color: colors.textSecondary }]}>AI Impact</Text>
              </View>
            </View>
            
            {config.chiefDeliveryOfficerDashboard?.engagementPerformance && (
              <View style={styles.engagementPerformance}>
                <Text style={[styles.subsectionTitle, { color: colors.text }]}>Regional Performance</Text>
                {config.chiefDeliveryOfficerDashboard.engagementPerformance.map((region, index) => (
                  <View key={index} style={[styles.regionRow, { borderBottomColor: colors.cardBorder }]}>
                    <Text style={[styles.regionName, { color: colors.text }]}>{region.region}</Text>
                    <Text style={[styles.regionRevenue, { color: colors.emeraldGreen }]}>{region.revenue}</Text>
                    <Text style={[styles.regionMargin, { color: region.margin >= 35 ? colors.emeraldGreen : colors.amber }]}>{region.margin}%</Text>
                    <Text style={[styles.regionSatisfaction, { color: colors.electricBlue }]}>{region.satisfaction}%</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* AI Professional Services Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Professional Services Insights</Text>
          <View style={styles.insightsContainer}>
            {config.aiProfessionalServicesInsights?.insights.map((insight) => (
              <View key={insight.id} style={[styles.insightCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1, borderLeftColor: insight.type === 'risk' ? colors.red : insight.type === 'opportunity' ? colors.emeraldGreen : colors.electricBlue, borderLeftWidth: 4 }]}>
                <View style={styles.insightHeader}>
                  <View style={[styles.insightTypeBadge, { backgroundColor: insight.type === 'risk' ? colors.red + '20' : insight.type === 'opportunity' ? colors.emeraldGreen + '20' : colors.electricBlue + '20' }]}>
                    {React.createElement(insight.type === 'risk' ? AlertTriangle : insight.type === 'opportunity' ? TrendingUp : Sparkles, { size: 16, color: insight.type === 'risk' ? colors.red : insight.type === 'opportunity' ? colors.emeraldGreen : colors.electricBlue })}
                    <Text style={[styles.insightTypeText, { color: insight.type === 'risk' ? colors.red : insight.type === 'opportunity' ? colors.emeraldGreen : colors.electricBlue }]}>{insight.type}</Text>
                  </View>
                  <View style={[styles.impactBadge, { backgroundColor: insight.impact === 'high' ? colors.red + '20' : insight.impact === 'medium' ? colors.amber + '20' : colors.emeraldGreen + '20' }]}>
                    <Text style={[styles.impactText, { color: insight.impact === 'high' ? colors.red : insight.impact === 'medium' ? colors.amber : colors.emeraldGreen }]}>{insight.impact}</Text>
                  </View>
                </View>
                <Text style={[styles.insightTitle, { color: colors.text }]}>{insight.title}</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>{insight.description}</Text>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                  <Text style={[styles.actionText, { color: colors.emeraldGreen }]}>{insight.action}</Text>
                  <ArrowRight size={16} color={colors.emeraldGreen} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Real-Time Delivery Operations Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Real-Time Delivery Operations Feed</Text>
          <View style={[styles.operationsFeed, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            {config.realTimeDeliveryOperationsFeed?.operations.map((operation, index) => (
              <View key={index} style={[styles.operationItem, { borderBottomColor: colors.cardBorder }]}>
                <View style={[styles.operationDot, { backgroundColor: operation.impact === 'high' ? colors.red : operation.impact === 'medium' ? colors.amber : colors.emeraldGreen }]} />
                <View style={styles.operationContent}>
                  <Text style={[styles.operationEvent, { color: colors.text }]}>{operation.event}</Text>
                  <Text style={[styles.operationProject, { color: colors.textSecondary }]}>{operation.project}</Text>
                </View>
                <Text style={[styles.operationTime, { color: colors.textSecondary }]}>{operation.time}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Platform Health & Delivery Systems */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Platform Health & Delivery Systems</Text>
          <View style={styles.systemsGrid}>
            {config.platformHealthDeliverySystems && Object.entries(config.platformHealthDeliverySystems).map(([key, system]: [string, any]) => (
              <View key={key} style={[styles.systemCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
                <View style={styles.systemHeader}>
                  <Text style={[styles.systemName, { color: colors.text }]}>{system.system}</Text>
                  <View style={[styles.systemStatus, { backgroundColor: system.status === 'operational' ? colors.emeraldGreen + '20' : colors.red + '20' }]}>
                    <View style={[styles.systemStatusDot, { backgroundColor: system.status === 'operational' ? colors.emeraldGreen : colors.red }]} />
                    <Text style={[styles.systemStatusText, { color: system.status === 'operational' ? colors.emeraldGreen : colors.red }]}>{system.status}</Text>
                  </View>
                </View>
                <View style={styles.systemMetrics}>
                  <View style={styles.systemMetric}>
                    <Text style={[styles.systemMetricLabel, { color: colors.textSecondary }]}>Uptime</Text>
                    <Text style={[styles.systemMetricValue, { color: colors.text }]}>{system.uptime}%</Text>
                  </View>
                  <View style={styles.systemMetric}>
                    <Text style={[styles.systemMetricLabel, { color: colors.textSecondary }]}>Latency</Text>
                    <Text style={[styles.systemMetricValue, { color: colors.text }]}>{system.latency}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Project Portfolio Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Project Portfolio Command Center</Text>
          
          {/* Workflow Visualization */}
          <View style={[styles.workflowContainer, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <Text style={[styles.subsectionTitle, { color: colors.text }]}>Project Lifecycle Workflow</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.workflowScroll}>
              {config.projectDeliveryControlCenter?.workflowStages.map((stage, index) => (
                <View key={stage.stage} style={styles.workflowStage}>
                  <View style={[styles.stageDot, { backgroundColor: stage.status === 'completed' ? colors.emeraldGreen : stage.status === 'active' ? colors.electricBlue : colors.textSecondary }]} />
                  <Text style={[styles.stageName, { color: colors.text }]}>{stage.stage}</Text>
                  <Text style={[styles.stageCount, { color: colors.textSecondary }]}>{stage.count}</Text>
                  <Text style={[styles.stageValue, { color: colors.emeraldGreen }]}>{stage.value}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Active Projects */}
          <View style={styles.projectsGrid}>
            {config.projectDeliveryControlCenter?.projects.map((project) => (
              <View key={project.id} style={[styles.projectCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
                <View style={styles.projectHeader}>
                  <Text style={[styles.projectName, { color: colors.text }]}>{project.name}</Text>
                  <View style={[styles.projectStatus, { backgroundColor: project.status === 'on-track' ? colors.emeraldGreen + '20' : project.status === 'at-risk' ? colors.red + '20' : colors.amber + '20' }]}>
                    <Text style={[styles.projectStatusText, { color: project.status === 'on-track' ? colors.emeraldGreen : project.status === 'at-risk' ? colors.red : colors.amber }]}>{project.status}</Text>
                  </View>
                </View>
                <Text style={[styles.projectClient, { color: colors.textSecondary }]}>{project.client}</Text>
                <View style={styles.projectProgress}>
                  <View style={[styles.progressBar, { backgroundColor: colors.glass }]}>
                    <View style={[styles.progressFill, { width: `${project.progress}%`, backgroundColor: project.status === 'on-track' ? colors.emeraldGreen : project.status === 'at-risk' ? colors.red : colors.amber }]} />
                  </View>
                  <Text style={[styles.progressText, { color: colors.text }]}>{project.progress}%</Text>
                </View>
                <View style={styles.projectMetrics}>
                  <View style={styles.projectMetric}>
                    <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Margin</Text>
                    <Text style={[styles.metricValue, { color: colors.text }]}>{project.margin}%</Text>
                  </View>
                  <View style={styles.projectMetric}>
                    <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Team</Text>
                    <Text style={[styles.metricValue, { color: colors.text }]}>{project.teamSize}</Text>
                  </View>
                  <View style={styles.projectMetric}>
                    <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Risk</Text>
                    <Text style={[styles.metricValue, { color: project.riskLevel === 'low' ? colors.emeraldGreen : project.riskLevel === 'medium' ? colors.amber : colors.red }]}>{project.riskLevel}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Resource Optimization Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Resource Optimization Center</Text>
          <View style={[styles.resourceOverview, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.resourceMetrics}>
              <View style={styles.resourceMetric}>
                <Text style={[styles.resourceMetricValue, { color: colors.electricBlue }]}>{config.resourceManagementCenter?.consultantAvailability.total.toLocaleString()}</Text>
                <Text style={[styles.resourceMetricLabel, { color: colors.textSecondary }]}>Total Consultants</Text>
              </View>
              <View style={styles.resourceMetric}>
                <Text style={[styles.resourceMetricValue, { color: colors.emeraldGreen }]}>{config.resourceManagementCenter?.consultantAvailability.available}</Text>
                <Text style={[styles.resourceMetricLabel, { color: colors.textSecondary }]}>Available</Text>
              </View>
              <View style={styles.resourceMetric}>
                <Text style={[styles.resourceMetricValue, { color: colors.amber }]}>{config.resourceManagementCenter?.consultantAvailability.onBench}</Text>
                <Text style={[styles.resourceMetricLabel, { color: colors.textSecondary }]}>On Bench</Text>
              </View>
              <View style={styles.resourceMetric}>
                <Text style={[styles.resourceMetricValue, { color: colors.purple }]}>{config.resourceManagementCenter?.consultantAvailability.utilization}%</Text>
                <Text style={[styles.resourceMetricLabel, { color: colors.textSecondary }]}>Utilization</Text>
              </View>
            </View>
          </View>

          {/* Skills Matrix */}
          <View style={[styles.skillsMatrix, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <Text style={[styles.subsectionTitle, { color: colors.text }]}>Skills Gap Analysis</Text>
            {config.resourceManagementCenter?.skillsMatrix.map((skill, index) => (
              <View key={index} style={styles.skillRow}>
                <Text style={[styles.skillName, { color: colors.text }]}>{skill.skill}</Text>
                <View style={styles.skillBars}>
                  <View style={styles.skillBar}>
                    <Text style={[styles.skillBarLabel, { color: colors.textSecondary }]}>Demand</Text>
                    <View style={[styles.skillBarTrack, { backgroundColor: colors.glass }]}>
                      <View style={[styles.skillBarFill, { width: `${skill.demand}%`, backgroundColor: colors.electricBlue }]} />
                    </View>
                    <Text style={[styles.skillBarValue, { color: colors.text }]}>{skill.demand}%</Text>
                  </View>
                  <View style={styles.skillBar}>
                    <Text style={[styles.skillBarLabel, { color: colors.textSecondary }]}>Supply</Text>
                    <View style={[styles.skillBarTrack, { backgroundColor: colors.glass }]}>
                      <View style={[styles.skillBarFill, { width: `${skill.supply}%`, backgroundColor: colors.emeraldGreen }]} />
                    </View>
                    <Text style={[styles.skillBarValue, { color: colors.text }]}>{skill.supply}%</Text>
                  </View>
                </View>
                <View style={[styles.gapBadge, { backgroundColor: skill.gap > 0 ? colors.red + '20' : colors.emeraldGreen + '20' }]}>
                  <Text style={[styles.gapText, { color: skill.gap > 0 ? colors.red : colors.emeraldGreen }]}>{skill.gap > 0 ? `+${skill.gap}` : skill.gap}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Client Success Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Client Success Command Center</Text>
          <View style={[styles.clientOverview, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.clientMetrics}>
              <View style={styles.clientMetric}>
                <Text style={[styles.clientMetricValue, { color: colors.emeraldGreen }]}>{config.clientIntelligenceHub?.clientHealthScore.average}</Text>
                <Text style={[styles.clientMetricLabel, { color: colors.textSecondary }]}>Avg Health Score</Text>
              </View>
              <View style={styles.clientMetric}>
                <Text style={[styles.clientMetricValue, { color: colors.electricBlue }]}>{config.clientIntelligenceHub?.contractValue.totalPortfolio}</Text>
                <Text style={[styles.clientMetricLabel, { color: colors.textSecondary }]}>Total Portfolio</Text>
              </View>
              <View style={styles.clientMetric}>
                <Text style={[styles.clientMetricValue, { color: colors.purple }]}>{config.clientIntelligenceHub?.contractValue.renewalPipeline}</Text>
                <Text style={[styles.clientMetricLabel, { color: colors.textSecondary }]}>Renewal Pipeline</Text>
              </View>
              <View style={styles.clientMetric}>
                <Text style={[styles.clientMetricValue, { color: colors.amber }]}>{config.clientIntelligenceHub?.churnRisk.length}</Text>
                <Text style={[styles.clientMetricLabel, { color: colors.textSecondary }]}>At Risk</Text>
              </View>
            </View>
          </View>

          {/* Client Health Distribution */}
          <View style={[styles.healthDistribution, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <Text style={[styles.subsectionTitle, { color: colors.text }]}>Client Health Distribution</Text>
            {config.clientIntelligenceHub?.clientHealthScore.distribution.map((dist, index) => (
              <View key={index} style={styles.healthRow}>
                <Text style={[styles.healthLabel, { color: colors.text }]}>{dist.score}</Text>
                <View style={[styles.healthBar, { backgroundColor: colors.glass }]}>
                  <View style={[styles.healthFill, { width: `${dist.percentage}%`, backgroundColor: dist.score === 'Excellent' ? colors.emeraldGreen : dist.score === 'Good' ? colors.electricBlue : dist.score === 'Fair' ? colors.amber : colors.red }]} />
                </View>
                <Text style={[styles.healthCount, { color: colors.text }]}>{dist.count}</Text>
                <Text style={[styles.healthPercent, { color: colors.textSecondary }]}>{dist.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Revenue Forecasting Engine */}
        {config.revenueForecastingEngine && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Revenue Forecasting Engine</Text>
            <View style={[styles.forecastCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
              <View style={styles.forecastRow}>
                <Text style={[styles.forecastLabel, { color: colors.textSecondary }]}>Current Quarter Forecast</Text>
                <Text style={[styles.forecastValue, { color: colors.emeraldGreen }]}>{config.revenueForecastingEngine.currentQuarter.forecast}</Text>
              </View>
              <View style={styles.forecastRow}>
                <Text style={[styles.forecastLabel, { color: colors.textSecondary }]}>Actual Revenue</Text>
                <Text style={[styles.forecastValue, { color: colors.text }]}>{config.revenueForecastingEngine.currentQuarter.actual}</Text>
              </View>
              <View style={styles.forecastRow}>
                <Text style={[styles.forecastLabel, { color: colors.textSecondary }]}>Variance</Text>
                <Text style={[styles.forecastValue, { color: colors.purple }]}>{config.revenueForecastingEngine.currentQuarter.variance}</Text>
              </View>
              <View style={styles.forecastRow}>
                <Text style={[styles.forecastLabel, { color: colors.textSecondary }]}>Confidence</Text>
                <Text style={[styles.forecastValue, { color: colors.electricBlue }]}>{config.revenueForecastingEngine.currentQuarter.confidence}%</Text>
              </View>
            </View>
          </View>
        )}

        {/* PMO Command Center */}
        {config.pmoCommandCenter && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>PMO Command Center</Text>
            <View style={[styles.pmoCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
              <View style={styles.pmoHeader}>
                <Text style={[styles.pmoSubtitle, { color: colors.textSecondary }]}>Executive Initiatives</Text>
                <Text style={[styles.pmoCount, { color: colors.text }]}>{config.pmoCommandCenter.executiveInitiatives.length} Active</Text>
              </View>
              {config.pmoCommandCenter.executiveInitiatives.map((initiative, index) => (
                <View key={index} style={[styles.initiativeRow, { borderBottomColor: colors.cardBorder }]}>
                  <View style={[styles.initiativeStatus, { backgroundColor: initiative.status === 'on-track' ? colors.emeraldGreen + '20' : colors.amber + '20' }]}>
                    <View style={[styles.initiativeStatusDot, { backgroundColor: initiative.status === 'on-track' ? colors.emeraldGreen : colors.amber }]} />
                  </View>
                  <View style={styles.initiativeInfo}>
                    <Text style={[styles.initiativeName, { color: colors.text }]}>{initiative.name}</Text>
                    <Text style={[styles.initiativeProgress, { color: colors.textSecondary }]}>{initiative.progress}% complete</Text>
                  </View>
                  <Text style={[styles.initiativeBudget, { color: colors.text }]}>{initiative.budget}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Global Delivery Operations */}
        {config.globalDeliveryOperations && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Global Delivery Operations</Text>
            <View style={[styles.globalCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
              <View style={styles.globalHeader}>
                <Text style={[styles.globalSubtitle, { color: colors.textSecondary }]}>Delivery Centers</Text>
                <Text style={[styles.globalCount, { color: colors.text }]}>{config.globalDeliveryOperations.deliveryCenters.length} Centers</Text>
              </View>
              {config.globalDeliveryOperations.deliveryCenters.map((center, index) => (
                <View key={index} style={[styles.centerRow, { borderBottomColor: colors.cardBorder }]}>
                  <Text style={[styles.centerName, { color: colors.text }]}>{center.center}</Text>
                  <Text style={[styles.centerRegion, { color: colors.textSecondary }]}>{center.region}</Text>
                  <Text style={[styles.centerConsultants, { color: colors.text }]}>{center.consultants} consultants</Text>
                  <Text style={[styles.centerUtilization, { color: center.utilization >= 90 ? colors.emeraldGreen : center.utilization >= 80 ? colors.electricBlue : colors.amber }]}>{center.utilization}%</Text>
                  <Text style={[styles.centerRevenue, { color: colors.emeraldGreen }]}>{center.revenue}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Proposal & SOW Intelligence Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Proposal & SOW Intelligence Center</Text>
          <View style={[styles.proposalOverview, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.proposalMetrics}>
              <View style={styles.proposalMetric}>
                <Text style={[styles.proposalMetricValue, { color: colors.electricBlue }]}>{config.proposalsSalesEngine?.rfps.active}</Text>
                <Text style={[styles.proposalMetricLabel, { color: colors.textSecondary }]}>Active RFPs</Text>
              </View>
              <View style={styles.proposalMetric}>
                <Text style={[styles.proposalMetricValue, { color: colors.emeraldGreen }]}>{config.proposalsSalesEngine?.winRate.overall}%</Text>
                <Text style={[styles.proposalMetricLabel, { color: colors.textSecondary }]}>Win Rate</Text>
              </View>
              <View style={styles.proposalMetric}>
                <Text style={[styles.proposalMetricValue, { color: colors.purple }]}>{config.proposalsSalesEngine?.dealPipeline.totalPipeline}</Text>
                <Text style={[styles.proposalMetricLabel, { color: colors.textSecondary }]}>Pipeline Value</Text>
              </View>
              <View style={styles.proposalMetric}>
                <Text style={[styles.proposalMetricValue, { color: colors.amber }]}>{config.proposalsSalesEngine?.rfps.pending}</Text>
                <Text style={[styles.proposalMetricLabel, { color: colors.textSecondary }]}>Pending</Text>
              </View>
            </View>
          </View>

          {/* Deal Pipeline Stages */}
          <View style={[styles.pipelineStages, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <Text style={[styles.subsectionTitle, { color: colors.text }]}>Deal Pipeline</Text>
            {config.proposalsSalesEngine?.dealPipeline.stages.map((stage, index) => (
              <View key={index} style={styles.pipelineStageRow}>
                <Text style={[styles.pipelineStageName, { color: colors.text }]}>{stage.stage}</Text>
                <View style={[styles.pipelineStageBar, { backgroundColor: colors.glass }]}>
                  <View style={[styles.pipelineStageFill, { width: `${(stage.deals / 234) * 100}%`, backgroundColor: colors.electricBlue }]} />
                </View>
                <Text style={[styles.pipelineStageDeals, { color: colors.text }]}>{stage.deals}</Text>
                <Text style={[styles.pipelineStageValue, { color: colors.emeraldGreen }]}>{stage.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Risk & Compliance Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Risk & Compliance Center</Text>
          <View style={[styles.riskOverview, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.riskMetrics}>
              <View style={styles.riskMetric}>
                <Text style={[styles.riskMetricValue, { color: colors.red }]}>{config.deliveryRiskHealthCenter?.projectDelays.atRisk}</Text>
                <Text style={[styles.riskMetricLabel, { color: colors.textSecondary }]}>At Risk Projects</Text>
              </View>
              <View style={styles.riskMetric}>
                <Text style={[styles.riskMetricValue, { color: colors.amber }]}>{config.deliveryRiskHealthCenter?.scopeCreep.projectsAffected}</Text>
                <Text style={[styles.riskMetricLabel, { color: colors.textSecondary }]}>Scope Creep</Text>
              </View>
              <View style={styles.riskMetric}>
                <Text style={[styles.riskMetricValue, { color: colors.red }]}>{config.deliveryRiskHealthCenter?.budgetOverruns.overBudget}</Text>
                <Text style={[styles.riskMetricLabel, { color: colors.textSecondary }]}>Over Budget</Text>
              </View>
              <View style={styles.riskMetric}>
                <Text style={[styles.riskMetricValue, { color: colors.emeraldGreen }]}>{config.deliveryRiskHealthCenter?.clientEscalations.resolved}</Text>
                <Text style={[styles.riskMetricLabel, { color: colors.textSecondary }]}>Escalations Resolved</Text>
              </View>
            </View>
          </View>

          {/* Risk Categories */}
          <View style={[styles.riskCategories, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <Text style={[styles.subsectionTitle, { color: colors.text }]}>Risk Impact Analysis</Text>
            <View style={styles.riskRow}>
              <Text style={[styles.riskLabel, { color: colors.text }]}>Project Delays</Text>
              <Text style={[styles.riskImpact, { color: colors.red }]}>{config.deliveryRiskHealthCenter?.projectDelays.avgDelay} avg</Text>
              <Text style={[styles.riskCount, { color: colors.textSecondary }]}>Critical: {config.deliveryRiskHealthCenter?.projectDelays.critical}</Text>
            </View>
            <View style={styles.riskRow}>
              <Text style={[styles.riskLabel, { color: colors.text }]}>Scope Creep</Text>
              <Text style={[styles.riskImpact, { color: colors.amber }]}>{config.deliveryRiskHealthCenter?.scopeCreep.avgImpact}</Text>
              <Text style={[styles.riskCount, { color: colors.textSecondary }]}>Revenue: {config.deliveryRiskHealthCenter?.scopeCreep.revenueImpact}</Text>
            </View>
            <View style={styles.riskRow}>
              <Text style={[styles.riskLabel, { color: colors.text }]}>Budget Overruns</Text>
              <Text style={[styles.riskImpact, { color: colors.red }]}>{config.deliveryRiskHealthCenter?.budgetOverruns.avgOverrun}</Text>
              <Text style={[styles.riskCount, { color: colors.textSecondary }]}>Impact: {config.deliveryRiskHealthCenter?.budgetOverruns.totalImpact}</Text>
            </View>
          </View>
        </View>

        {/* Knowledge Intelligence Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Knowledge Intelligence Hub</Text>
          <View style={[styles.knowledgeOverview, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.knowledgeMetrics}>
              <View style={styles.knowledgeMetric}>
                <Text style={[styles.knowledgeMetricValue, { color: colors.electricBlue }]}>{config.knowledgeManagementSystem?.caseStudies.total}</Text>
                <Text style={[styles.knowledgeMetricLabel, { color: colors.textSecondary }]}>Case Studies</Text>
              </View>
              <View style={styles.knowledgeMetric}>
                <Text style={[styles.knowledgeMetricValue, { color: colors.emeraldGreen }]}>{config.knowledgeManagementSystem?.bestPractices.total}</Text>
                <Text style={[styles.knowledgeMetricLabel, { color: colors.textSecondary }]}>Best Practices</Text>
              </View>
              <View style={styles.knowledgeMetric}>
                <Text style={[styles.knowledgeMetricValue, { color: colors.purple }]}>{config.knowledgeManagementSystem?.deliveryTemplates.total}</Text>
                <Text style={[styles.knowledgeMetricLabel, { color: colors.textSecondary }]}>Templates</Text>
              </View>
              <View style={styles.knowledgeMetric}>
                <Text style={[styles.knowledgeMetricValue, { color: colors.amber }]}>{config.knowledgeManagementSystem?.aiGeneratedInsights.dailyInsights}</Text>
                <Text style={[styles.knowledgeMetricLabel, { color: colors.textSecondary }]}>AI Insights/Day</Text>
              </View>
            </View>
          </View>

          {/* Knowledge Categories */}
          <View style={[styles.knowledgeCategories, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <Text style={[styles.subsectionTitle, { color: colors.text }]}>Top Knowledge Categories</Text>
            {config.knowledgeManagementSystem?.caseStudies.topCategories.map((category: any, index: number) => (
              <View key={index} style={styles.categoryRow}>
                <Text style={[styles.categoryName, { color: colors.text }]}>{category.category}</Text>
                <View style={[styles.categoryBar, { backgroundColor: colors.glass }]}>
                  <View style={[styles.categoryFill, { width: `${(category.count / 234) * 100}%`, backgroundColor: colors.electricBlue }]} />
                </View>
                <Text style={[styles.categoryCount, { color: colors.text }]}>{category.count}</Text>
              </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  navigationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
  },
  sidebar: {
    width: 280,
    padding: 20,
    borderRightWidth: 1,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  navIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  navLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    padding: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    width: 'calc(20% - 10px)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  kpiTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  kpiSubtitle: {
    fontSize: 12,
  },
  aiCommentary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
    gap: 6,
  },
  aiCommentaryText: {
    fontSize: 10,
    fontWeight: '500',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  workflowContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  workflowScroll: {
    flexDirection: 'row',
  },
  workflowStage: {
    alignItems: 'center',
    marginRight: 24,
    minWidth: 100,
  },
  stageDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  stageName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  stageCount: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  stageValue: {
    fontSize: 11,
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  projectCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  projectStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  projectStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  projectClient: {
    fontSize: 12,
    marginBottom: 12,
  },
  projectProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  projectMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectMetric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  resourceOverview: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  resourceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resourceMetric: {
    alignItems: 'center',
  },
  resourceMetricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resourceMetricLabel: {
    fontSize: 11,
  },
  skillsMatrix: {
    padding: 16,
    borderRadius: 12,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  skillName: {
    fontSize: 13,
    fontWeight: '500',
    width: 120,
  },
  skillBars: {
    flex: 1,
    marginLeft: 12,
  },
  skillBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  skillBarLabel: {
    fontSize: 10,
    width: 50,
  },
  skillBarTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 8,
  },
  skillBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  skillBarValue: {
    fontSize: 11,
    width: 30,
  },
  gapBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 12,
  },
  gapText: {
    fontSize: 11,
    fontWeight: '600',
  },
  clientOverview: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  clientMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clientMetric: {
    alignItems: 'center',
  },
  clientMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  clientMetricLabel: {
    fontSize: 11,
  },
  healthDistribution: {
    padding: 16,
    borderRadius: 12,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthLabel: {
    fontSize: 13,
    fontWeight: '500',
    width: 80,
  },
  healthBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  healthFill: {
    height: '100%',
    borderRadius: 4,
  },
  healthCount: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
  },
  healthPercent: {
    fontSize: 11,
    width: 40,
  },
  proposalOverview: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  proposalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  proposalMetric: {
    alignItems: 'center',
  },
  proposalMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  proposalMetricLabel: {
    fontSize: 11,
  },
  pipelineStages: {
    padding: 16,
    borderRadius: 12,
  },
  pipelineStageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pipelineStageName: {
    fontSize: 13,
    fontWeight: '500',
    width: 100,
  },
  pipelineStageBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  pipelineStageFill: {
    height: '100%',
    borderRadius: 4,
  },
  pipelineStageDeals: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
  },
  pipelineStageValue: {
    fontSize: 11,
    width: 60,
  },
  riskOverview: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  riskMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  riskMetric: {
    alignItems: 'center',
  },
  riskMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  riskMetricLabel: {
    fontSize: 11,
  },
  riskCategories: {
    padding: 16,
    borderRadius: 12,
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  riskLabel: {
    fontSize: 13,
    fontWeight: '500',
    width: 120,
  },
  riskImpact: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  riskCount: {
    fontSize: 11,
    width: 100,
  },
  knowledgeOverview: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  knowledgeMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  knowledgeMetric: {
    alignItems: 'center',
  },
  knowledgeMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  knowledgeMetricLabel: {
    fontSize: 11,
  },
  knowledgeCategories: {
    padding: 16,
    borderRadius: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '500',
    width: 150,
  },
  categoryBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  categoryFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
  },
  agentsScroll: {
    flexDirection: 'row',
    gap: 12,
  },
  agentCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
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
    marginBottom: 2,
  },
  agentRole: {
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  agentMetrics: {
    gap: 8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agentMetricLabel: {
    fontSize: 12,
  },
  agentMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  cdoDashboard: {
    padding: 20,
    borderRadius: 12,
  },
  cdoMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cdoMetric: {
    alignItems: 'center',
  },
  cdoMetricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cdoMetricLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  engagementPerformance: {
    borderTopWidth: 1,
    paddingTop: 16,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  regionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  regionName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  regionRevenue: {
    fontSize: 14,
    fontWeight: '600',
    width: 100,
    textAlign: 'right',
  },
  regionMargin: {
    fontSize: 14,
    fontWeight: '600',
    width: 60,
    textAlign: 'right',
  },
  regionSatisfaction: {
    fontSize: 14,
    fontWeight: '600',
    width: 60,
    textAlign: 'right',
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  insightTypeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  operationsFeed: {
    padding: 16,
    borderRadius: 12,
  },
  operationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  operationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  operationContent: {
    flex: 1,
  },
  operationEvent: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  operationProject: {
    fontSize: 12,
  },
  operationTime: {
    fontSize: 12,
  },
  systemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  systemCard: {
    width: 'calc(33.333% - 8px)',
    padding: 16,
    borderRadius: 12,
  },
  systemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemName: {
    fontSize: 14,
    fontWeight: '600',
  },
  systemStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  systemStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  systemStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  systemMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  systemMetric: {
    flex: 1,
  },
  systemMetricLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  systemMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  forecastCard: {
    padding: 20,
    borderRadius: 12,
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  forecastLabel: {
    fontSize: 14,
  },
  forecastValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pmoCard: {
    padding: 20,
    borderRadius: 12,
  },
  pmoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pmoSubtitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  pmoCount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  initiativeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  initiativeStatus: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initiativeStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  initiativeInfo: {
    flex: 1,
  },
  initiativeName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  initiativeProgress: {
    fontSize: 12,
  },
  initiativeBudget: {
    fontSize: 14,
    fontWeight: '600',
    width: 80,
    textAlign: 'right',
  },
  globalCard: {
    padding: 20,
    borderRadius: 12,
  },
  globalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  globalSubtitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  globalCount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  centerName: {
    fontSize: 14,
    fontWeight: '500',
    width: 120,
  },
  centerRegion: {
    fontSize: 12,
    width: 100,
  },
  centerConsultants: {
    fontSize: 12,
    width: 80,
  },
  centerUtilization: {
    fontSize: 14,
    fontWeight: '600',
    width: 50,
    textAlign: 'right',
  },
  centerRevenue: {
    fontSize: 14,
    fontWeight: '600',
    width: 80,
    textAlign: 'right',
  },
});
