'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard,
  Bot,
  Briefcase,
  Users,
  Building,
  BarChart3,
  FileText,
  ClipboardList,
  Shield,
  AlertTriangle,
  Database,
  Globe,
  LineChart,
  Settings,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Activity,
  Target,
  Zap,
  Brain,
  Sparkles,
  RefreshCw,
  Bell,
  ChevronRight,
  MoreVertical,
  Search,
  Filter,
  Download,
  Share2,
  Eye,
  Map,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  Flame,
  Heart,
  Flag,
  Code,
  Layers,
  Network,
  Info,
  Beaker,
  Route,
  ChevronLeft,
  Handshake,
  FileCheck,
  Timer,
  Receipt,
  Scale,
  ShieldCheck,
  BookOpen,
  Globe2,
  Building2,
  User,
  Users2,
  CreditCard,
  Wallet,
  PieChart,
  Gauge,
  Radar,
  ScatterChart,
} from 'lucide-react-native';

// Types
interface KPICard {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
  icon: any;
  forecast?: string;
  aiCommentary?: string;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline' | 'busy';
  confidenceScore: number;
  revenueContribution: string;
  metrics: {
    label: string;
    value: string;
  }[];
  color: string;
}

interface Project {
  id: string;
  name: string;
  client: string;
  status: 'on-track' | 'at-risk' | 'delayed';
  progress: number;
  margin: number;
  teamSize: number;
  riskLevel: 'low' | 'medium' | 'high';
  budget: string;
  timeline: string;
}

interface Client {
  id: string;
  name: string;
  healthScore: number;
  satisfaction: number;
  expansion: number;
  churnRisk: number;
  contractValue: string;
  tier: 'enterprise' | 'mid-market' | 'smb';
}

interface Insight {
  id: string;
  type: 'risk' | 'opportunity' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action: string;
}

interface Operation {
  event: string;
  project: string;
  impact: 'high' | 'medium' | 'low';
  time: string;
}

export default function ProfessionalServicesCommandCenter() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Color scheme
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
    glassBorder: 'rgba(255, 255, 255, 0.1)',
  };

  // Executive KPI Data
  const financialKPIs: KPICard[] = [
    { id: '1', title: 'Services Revenue', value: '$2.4B', change: '+12.5%', trend: 'up', color: colors.emeraldGreen, subtitle: 'Q4 2024', icon: DollarSign, forecast: '$2.7B Q1', aiCommentary: 'AI: On track to exceed Q4 target by 8%' },
    { id: '2', title: 'Gross Margin', value: '34.2%', change: '+2.1%', trend: 'up', color: colors.emeraldGreen, subtitle: 'Industry avg: 28%', icon: Activity, forecast: '35.5% Q1', aiCommentary: 'AI: Margin optimization gaining traction' },
    { id: '3', title: 'Pipeline Value', value: '$4.2B', change: '+18.3%', trend: 'up', color: colors.electricBlue, subtitle: 'Qualified opportunities', icon: BarChart3, forecast: '$4.8B Q1', aiCommentary: 'AI: Pipeline health at 94%' },
    { id: '4', title: 'Forecast Revenue', value: '$2.8B', change: '+8.7%', trend: 'up', color: colors.purple, subtitle: 'Next quarter', icon: TrendingUp, forecast: '$3.1B Q2', aiCommentary: 'AI: Forecast confidence: 92%' },
    { id: '5', title: 'Revenue at Risk', value: '$180M', change: '-5.2%', trend: 'down', color: colors.red, subtitle: 'Critical accounts', icon: AlertTriangle, forecast: '$120M Q1', aiCommentary: 'AI: Risk mitigation in progress' },
  ];

  const deliveryKPIs: KPICard[] = [
    { id: '6', title: 'Active Projects', value: '12,450', change: '+4.2%', trend: 'up', color: colors.electricBlue, subtitle: 'Global engagements', icon: Briefcase, forecast: '13,200 Q1', aiCommentary: 'AI: Capacity utilization optimal' },
    { id: '7', title: 'On-Time Delivery', value: '94.2%', change: '+3.8%', trend: 'up', color: colors.emeraldGreen, subtitle: 'SLA compliance', icon: CheckCircle2, forecast: '95.5% Q1', aiCommentary: 'AI: Delivery excellence improving' },
    { id: '8', title: 'Project Success Rate', value: '91.8%', change: '+2.4%', trend: 'up', color: colors.emeraldGreen, subtitle: 'Client acceptance', icon: Award, forecast: '93.2% Q1', aiCommentary: 'AI: Quality metrics strong' },
    { id: '9', title: 'SLA Compliance', value: '96.5%', change: '+1.9%', trend: 'up', color: colors.electricBlue, subtitle: 'Service level agreements', icon: ShieldCheck, forecast: '97.2% Q1', aiCommentary: 'AI: Compliance at record high' },
    { id: '10', title: 'Milestone Completion', value: '89.3%', change: '+4.1%', trend: 'up', color: colors.emeraldGreen, subtitle: 'On-schedule delivery', icon: Target, forecast: '91.5% Q1', aiCommentary: 'AI: Milestone tracking optimized' },
  ];

  const resourceKPIs: KPICard[] = [
    { id: '11', title: 'Utilization Rate', value: '86.4%', change: '+2.3%', trend: 'up', color: colors.electricBlue, subtitle: 'Billable hours', icon: Activity, forecast: '88.1% Q1', aiCommentary: 'AI: Utilization at optimal level' },
    { id: '12', title: 'Billable Utilization', value: '78.2%', change: '+3.1%', trend: 'up', color: colors.emeraldGreen, subtitle: 'Revenue-generating', icon: DollarSign, forecast: '79.8% Q1', aiCommentary: 'AI: Revenue efficiency improving' },
    { id: '13', title: 'Bench Capacity', value: '8.2%', change: '-1.4%', trend: 'down', color: colors.amber, subtitle: 'Available consultants', icon: Users, forecast: '7.5% Q1', aiCommentary: 'AI: Bench management optimized' },
    { id: '14', title: 'Resource Availability', value: '1,240', change: '+5.8%', trend: 'up', color: colors.electricBlue, subtitle: 'Ready to deploy', icon: User, forecast: '1,380 Q1', aiCommentary: 'AI: Staffing pipeline healthy' },
    { id: '15', title: 'Staffing Accuracy', value: '94.6%', change: '+2.7%', trend: 'up', color: colors.emeraldGreen, subtitle: 'Forecast vs actual', icon: Target, forecast: '95.8% Q1', aiCommentary: 'AI: Prediction accuracy improving' },
  ];

  const customerKPIs: KPICard[] = [
    { id: '16', title: 'CSAT Score', value: '4.6/5', change: '+0.3', trend: 'up', color: colors.emeraldGreen, subtitle: 'Customer satisfaction', icon: Heart, forecast: '4.7/5 Q1', aiCommentary: 'AI: Satisfaction trending upward' },
    { id: '17', title: 'NPS Score', value: '72', change: '+5', trend: 'up', color: colors.emeraldGreen, subtitle: 'Net promoter score', icon: Award, forecast: '75 Q1', aiCommentary: 'AI: Promoter growth accelerating' },
    { id: '18', title: 'Client Health Index', value: '91.2%', change: '+2.4%', trend: 'up', color: colors.electricBlue, subtitle: 'Overall portfolio health', icon: Activity, forecast: '92.8% Q1', aiCommentary: 'AI: Portfolio health excellent' },
    { id: '19', title: 'Renewal Probability', value: '87.5%', change: '+3.2%', trend: 'up', color: colors.emeraldGreen, subtitle: 'Upcoming renewals', icon: RefreshCw, forecast: '89.2% Q1', aiCommentary: 'AI: Renewal pipeline strong' },
    { id: '20', title: 'Expansion Value', value: '$840M', change: '+15.6%', trend: 'up', color: colors.purple, subtitle: 'Upsell opportunities', icon: TrendingUp, forecast: '$960M Q1', aiCommentary: 'AI: Expansion opportunities growing' },
  ];

  const aiKPIs: KPICard[] = [
    { id: '21', title: 'AI Productivity Gain', value: '+$180M', change: '+22.4%', trend: 'up', color: colors.emeraldGreen, subtitle: 'Annual impact', icon: Brain, forecast: '+$220M Q1', aiCommentary: 'AI: ROI accelerating rapidly' },
    { id: '22', title: 'Hours Automated', value: '2.4M', change: '+18.7%', trend: 'up', color: colors.electricBlue, subtitle: 'Monthly automation', icon: Zap, forecast: '2.8M Q1', aiCommentary: 'AI: Automation expanding' },
    { id: '23', title: 'Cost Savings', value: '$48M', change: '+14.2%', trend: 'up', color: colors.emeraldGreen, subtitle: 'Annual savings', icon: Wallet, forecast: '$55M Q1', aiCommentary: 'AI: Efficiency gains realized' },
    { id: '24', title: 'Delivery Acceleration', value: '+28%', change: '+5.3%', trend: 'up', color: colors.purple, subtitle: 'Time-to-delivery', icon: Rocket, forecast: '+32% Q1', aiCommentary: 'AI: Speed improvements sustained' },
    { id: '25', title: 'AI Recommendations', value: '48,200', change: '+24.8%', trend: 'up', color: colors.electricBlue, subtitle: 'Generated this month', icon: Sparkles, forecast: '58,500 Q1', aiCommentary: 'AI: Intelligence scaling' },
  ];

  // AI Professional Services Agents
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Agent Atlas',
      role: 'Project Delivery Agent',
      status: 'online',
      confidenceScore: 96,
      revenueContribution: '$2.4M',
      color: colors.electricBlue,
      metrics: [
        { label: 'Projects Managed', value: '842' },
        { label: 'Delivery Accuracy', value: '94%' },
        { label: 'Schedule Optimization', value: '+22%' },
      ],
    },
    {
      id: '2',
      name: 'Agent Forge',
      role: 'Proposal & SOW Agent',
      status: 'online',
      confidenceScore: 94,
      revenueContribution: '$1.8M',
      color: colors.emeraldGreen,
      metrics: [
        { label: 'Proposals Generated', value: '324' },
        { label: 'Win Rate Impact', value: '+18%' },
        { label: 'Turnaround Time', value: '-45%' },
      ],
    },
    {
      id: '3',
      name: 'Agent Nexus',
      role: 'Client Success Agent',
      status: 'online',
      confidenceScore: 92,
      revenueContribution: '$1.5M',
      color: colors.purple,
      metrics: [
        { label: 'Accounts Managed', value: '1,240' },
        { label: 'Client Health Score', value: '91%' },
        { label: 'Renewal Influence', value: '+15%' },
      ],
    },
    {
      id: '4',
      name: 'Agent Vector',
      role: 'Resource Allocation Agent',
      status: 'online',
      confidenceScore: 91,
      revenueContribution: '$1.2M',
      color: colors.amber,
      metrics: [
        { label: 'Resources Assigned', value: '4,820' },
        { label: 'Utilization Gain', value: '+19%' },
        { label: 'Forecast Accuracy', value: '96%' },
      ],
    },
    {
      id: '5',
      name: 'Agent Sentinel',
      role: 'Risk Management Agent',
      status: 'online',
      confidenceScore: 95,
      revenueContribution: '$980K',
      color: colors.red,
      metrics: [
        { label: 'Risks Prevented', value: '284' },
        { label: 'Budget Savings', value: '$2.4M' },
        { label: 'Prediction Accuracy', value: '94%' },
      ],
    },
  ];

  // Project Portfolio Data
  const projects: Project[] = [
    { id: '1', name: 'Cloud Migration', client: 'Global Bank', status: 'on-track', progress: 75, margin: 38, teamSize: 12, riskLevel: 'low', budget: '$2.4M', timeline: '6 months' },
    { id: '2', name: 'Data Analytics Platform', client: 'Retail Chain', status: 'at-risk', progress: 45, margin: 28, teamSize: 8, riskLevel: 'medium', budget: '$1.8M', timeline: '4 months' },
    { id: '3', name: 'AI Implementation', client: 'Healthcare System', status: 'delayed', progress: 30, margin: 42, teamSize: 15, riskLevel: 'high', budget: '$3.2M', timeline: '8 months' },
    { id: '4', name: 'Digital Transformation', client: 'Manufacturing Co', status: 'on-track', progress: 60, margin: 35, teamSize: 20, budget: '$4.2M', timeline: '12 months' },
    { id: '5', name: 'Cybersecurity Overhaul', client: 'Insurance Firm', status: 'on-track', progress: 85, margin: 40, teamSize: 10, budget: '$1.5M', timeline: '3 months' },
    { id: '6', name: 'ERP Implementation', client: 'Pharma Corp', status: 'at-risk', progress: 50, margin: 32, teamSize: 18, budget: '$5.8M', timeline: '14 months' },
  ];

  // Client Data
  const clients: Client[] = [
    { id: '1', name: 'Fortune 500 Tech', healthScore: 92, satisfaction: 94, expansion: 78, churnRisk: 8, contractValue: '$2.4M', tier: 'enterprise' },
    { id: '2', name: 'Global Bank', healthScore: 88, satisfaction: 91, expansion: 65, churnRisk: 12, contractValue: '$1.8M', tier: 'enterprise' },
    { id: '3', name: 'Healthcare System', healthScore: 85, satisfaction: 87, expansion: 72, churnRisk: 15, contractValue: '$1.2M', tier: 'enterprise' },
    { id: '4', name: 'Retail Chain', healthScore: 90, satisfaction: 92, expansion: 68, churnRisk: 10, contractValue: '$960K', tier: 'mid-market' },
    { id: '5', name: 'Manufacturing Co', healthScore: 82, satisfaction: 84, expansion: 55, churnRisk: 18, contractValue: '$720K', tier: 'mid-market' },
  ];

  // AI Insights
  const insights: Insight[] = [
    { id: '1', type: 'risk', title: 'Project Orion has 78% risk of budget overrun', description: 'Scope expansion detected in Cloud Migration project. Immediate client review recommended.', impact: 'high', action: 'Review Scope' },
    { id: '2', type: 'opportunity', title: 'Cloud Consulting practice utilization will exceed capacity within 14 days', description: 'Demand spike expected in Q2. Recommend hiring 3 senior cloud architects.', impact: 'medium', action: 'Initiate Hiring' },
    { id: '3', type: 'recommendation', title: 'Client ABC shows strong expansion opportunity worth $12M', description: 'AI analysis indicates strong expansion opportunity for AI/ML services.', impact: 'medium', action: 'Schedule Meeting' },
    { id: '4', type: 'risk', title: 'Proposal conversion rate dropped by 8% this week', description: 'Competitive pressure increasing in Healthcare vertical. Pricing review recommended.', impact: 'high', action: 'Review Pricing' },
    { id: '5', type: 'opportunity', title: 'Resource shortage predicted for Cybersecurity projects', description: 'Q3 demand forecast shows 40% gap in security consultant availability.', impact: 'high', action: 'Start Recruitment' },
  ];

  // Real-time Operations Feed
  const operations: Operation[] = [
    { event: 'Project milestone completed', project: 'Cloud Migration', impact: 'low', time: '2m ago' },
    { event: 'Client approval received', project: 'Data Analytics', impact: 'low', time: '5m ago' },
    { event: 'Resource reallocated', project: 'AI Implementation', impact: 'medium', time: '8m ago' },
    { event: 'Risk escalated', project: 'Cloud Migration', impact: 'high', time: '12m ago' },
    { event: 'Proposal submitted', project: 'New Opportunity', impact: 'medium', time: '15m ago' },
    { event: 'SOW generated', project: 'Digital Transformation', impact: 'low', time: '18m ago' },
    { event: 'Client meeting completed', project: 'Cybersecurity', impact: 'low', time: '22m ago' },
    { event: 'Revenue forecast updated', project: 'Portfolio', impact: 'medium', time: '25m ago' },
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Service Agents', icon: Bot },
    { id: 'projects', label: 'Project Portfolio', icon: Briefcase },
    { id: 'resources', label: 'Resource Management', icon: Users },
    { id: 'clients', label: 'Client Success', icon: Building },
    { id: 'forecasting', label: 'Revenue Forecasting', icon: BarChart3 },
    { id: 'proposals', label: 'Proposals & SOW', icon: FileText },
    { id: 'delivery', label: 'Delivery Operations', icon: ClipboardList },
    { id: 'pmo', label: 'PMO Command Center', icon: Shield },
    { id: 'risk', label: 'Risk & Compliance', icon: AlertTriangle },
    { id: 'knowledge', label: 'Knowledge Intelligence', icon: Database },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderKPICard = (kpi: KPICard) => (
    <div
      key={kpi.id}
      className="p-6 rounded-xl border backdrop-blur-sm transition-all hover:scale-105"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.cardBorder,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${kpi.color}20` }}
        >
          <kpi.icon size={24} color={kpi.color} />
        </div>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: kpi.trend === 'up' ? `${colors.emeraldGreen}20` : `${colors.red}20`,
            color: kpi.trend === 'up' ? colors.emeraldGreen : colors.red,
          }}
        >
          {kpi.trend === 'up' ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}
          {kpi.change}
        </div>
      </div>
      <div className="text-3xl font-bold mb-1" style={{ color: colors.text }}>
        {kpi.value}
      </div>
      <div className="text-sm mb-2" style={{ color: colors.textSecondary }}>
        {kpi.title}
      </div>
      <div className="text-xs mb-3" style={{ color: colors.textSecondary }}>
        {kpi.subtitle}
      </div>
      {kpi.forecast && (
        <div className="text-xs mb-2" style={{ color: colors.purple }}>
          Forecast: {kpi.forecast}
        </div>
      )}
      {kpi.aiCommentary && (
        <div
          className="flex items-center gap-2 p-2 rounded-lg text-xs"
          style={{
            backgroundColor: `${colors.purple}10`,
            border: `1px solid ${colors.purple}30`,
            color: colors.purple,
          }}
        >
          <Sparkles size={12} />
          {kpi.aiCommentary}
        </div>
      )}
    </div>
  );

  const renderAgentCard = (agent: Agent) => (
    <div
      key={agent.id}
      className="p-6 rounded-xl border backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
      style={{
        backgroundColor: `${agent.color}10`,
        borderColor: `${agent.color}40`,
        borderWidth: 1,
      }}
      onClick={() => setSelectedAgent(agent.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${agent.color}30` }}
          >
            <Bot size={32} color={agent.color} />
          </div>
          <div>
            <div className="font-bold text-lg" style={{ color: colors.text }}>
              {agent.name}
            </div>
            <div className="text-sm" style={{ color: colors.textSecondary }}>
              {agent.role}
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: agent.status === 'online' ? `${colors.emeraldGreen}30` : `${colors.amber}30`,
            color: agent.status === 'online' ? colors.emeraldGreen : colors.amber,
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: agent.status === 'online' ? colors.emeraldGreen : colors.amber,
            }}
          />
          {agent.status}
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {agent.metrics.map((metric, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-sm" style={{ color: colors.textSecondary }}>
              {metric.label}
            </span>
            <span className="text-sm font-medium" style={{ color: colors.text }}>
              {metric.value}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: colors.cardBorder }}>
        <div>
          <div className="text-xs" style={{ color: colors.textSecondary }}>
            Confidence Score
          </div>
          <div className="text-lg font-bold" style={{ color: agent.color }}>
            {agent.confidenceScore}%
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs" style={{ color: colors.textSecondary }}>
            Revenue Impact
          </div>
          <div className="text-lg font-bold" style={{ color: colors.emeraldGreen }}>
            {agent.revenueContribution}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjectCard = (project: Project) => (
    <div
      key={project.id}
      className="p-6 rounded-xl border backdrop-blur-sm transition-all hover:scale-105"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.cardBorder,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="font-bold text-lg mb-1" style={{ color: colors.text }}>
            {project.name}
          </div>
          <div className="text-sm" style={{ color: colors.textSecondary }}>
            {project.client}
          </div>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor:
              project.status === 'on-track'
                ? `${colors.emeraldGreen}20`
                : project.status === 'at-risk'
                ? `${colors.amber}20`
                : `${colors.red}20`,
            color:
              project.status === 'on-track'
                ? colors.emeraldGreen
                : project.status === 'at-risk'
                ? colors.amber
                : colors.red,
          }}
        >
          {project.status}
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm" style={{ color: colors.textSecondary }}>
            Progress
          </span>
          <span className="text-sm font-medium" style={{ color: colors.text }}>
            {project.progress}%
          </span>
        </div>
        <div
          className="w-full h-2 rounded-full"
          style={{ backgroundColor: colors.glass }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${project.progress}%`,
              backgroundColor:
                project.status === 'on-track'
                  ? colors.emeraldGreen
                  : project.status === 'at-risk'
                  ? colors.amber
                  : colors.red,
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-xs" style={{ color: colors.textSecondary }}>
            Margin
          </div>
          <div className="font-bold" style={{ color: colors.text }}>
            {project.margin}%
          </div>
        </div>
        <div>
          <div className="text-xs" style={{ color: colors.textSecondary }}>
            Team
          </div>
          <div className="font-bold" style={{ color: colors.text }}>
            {project.teamSize}
          </div>
        </div>
        <div>
          <div className="text-xs" style={{ color: colors.textSecondary }}>
            Risk
          </div>
          <div
            className="font-bold"
            style={{
              color:
                project.riskLevel === 'low'
                  ? colors.emeraldGreen
                  : project.riskLevel === 'medium'
                  ? colors.amber
                  : colors.red,
            }}
          >
            {project.riskLevel}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t" style={{ borderColor: colors.cardBorder }}>
        <div className="text-sm" style={{ color: colors.textSecondary }}>
          {project.budget}
        </div>
        <div className="text-sm" style={{ color: colors.textSecondary }}>
          {project.timeline}
        </div>
      </div>
    </div>
  );

  const renderInsightCard = (insight: Insight) => (
    <div
      key={insight.id}
      className="p-6 rounded-xl border backdrop-blur-sm transition-all hover:scale-105"
      style={{
        backgroundColor: colors.card,
        borderColor: colors.cardBorder,
        borderLeftWidth: 4,
        borderLeftColor:
          insight.type === 'risk'
            ? colors.red
            : insight.type === 'opportunity'
            ? colors.emeraldGreen
            : colors.electricBlue,
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div
          className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor:
              insight.type === 'risk'
                ? `${colors.red}20`
                : insight.type === 'opportunity'
                ? `${colors.emeraldGreen}20`
                : `${colors.electricBlue}20`,
            color:
              insight.type === 'risk'
                ? colors.red
                : insight.type === 'opportunity'
                ? colors.emeraldGreen
                : colors.electricBlue,
          }}
        >
          {insight.type === 'risk' && <AlertTriangle size={14} />}
          {insight.type === 'opportunity' && <TrendingUp size={14} />}
          {insight.type === 'recommendation' && <Sparkles size={14} />}
          {insight.type}
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor:
              insight.impact === 'high'
                ? `${colors.red}20`
                : insight.impact === 'medium'
                ? `${colors.amber}20`
                : `${colors.emeraldGreen}20`,
            color:
              insight.impact === 'high'
                ? colors.red
                : insight.impact === 'medium'
                ? colors.amber
                : colors.emeraldGreen,
          }}
        >
          {insight.impact} impact
        </div>
      </div>
      <div className="font-bold text-lg mb-2" style={{ color: colors.text }}>
        {insight.title}
      </div>
      <div className="text-sm mb-4" style={{ color: colors.textSecondary }}>
        {insight.description}
      </div>
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
        style={{
          backgroundColor: `${colors.emeraldGreen}20`,
          border: `1px solid ${colors.emeraldGreen}40`,
          color: colors.emeraldGreen,
        }}
      >
        {insight.action}
        <ChevronRight size={16} />
      </button>
    </div>
  );

  const renderOperationItem = (operation: Operation, index: number) => (
    <div
      key={index}
      className="flex items-center gap-4 p-4 border-b last:border-b-0 transition-all hover:scale-105"
      style={{ borderColor: colors.cardBorder }}
    >
      <div
        className="w-2 h-2 rounded-full"
        style={{
          backgroundColor:
            operation.impact === 'high'
              ? colors.red
              : operation.impact === 'medium'
              ? colors.amber
              : colors.emeraldGreen,
        }}
      />
      <div className="flex-1">
        <div className="font-medium" style={{ color: colors.text }}>
          {operation.event}
        </div>
        <div className="text-sm" style={{ color: colors.textSecondary }}>
          {operation.project}
        </div>
      </div>
      <div className="text-sm" style={{ color: colors.textSecondary }}>
        {operation.time}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: colors.background }}
    >
      {/* Left Navigation */}
      <div
        className="w-72 p-6 border-r flex flex-col"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
        }}
      >
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="p-3 rounded-xl"
              style={{ background: `linear-gradient(135deg, ${colors.electricBlue}, ${colors.emeraldGreen})` }}
            >
              <Briefcase size={28} color="#FFFFFF" />
            </div>
            <div>
              <div className="font-bold text-lg" style={{ color: colors.text }}>
                Professional Services
              </div>
              <div className="text-xs" style={{ color: colors.textSecondary }}>
                AI Command Center
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: colors.textSecondary }}>
          Navigation
        </div>

        <div className="space-y-2 flex-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-105 ${
                activeSection === item.id ? 'scale-105' : ''
              }`}
              style={{
                backgroundColor: activeSection === item.id ? `${colors.electricBlue}20` : colors.glass,
                border: activeSection === item.id ? `1px solid ${colors.electricBlue}40` : `1px solid ${colors.glassBorder}`,
              }}
            >
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: activeSection === item.id ? `${colors.electricBlue}30` : `${colors.electricBlue}20` }}
              >
                <item.icon size={20} color={colors.electricBlue} />
              </div>
              <span className="font-medium" style={{ color: colors.text }}>
                {item.label}
              </span>
              {activeSection === item.id && <ChevronRight size={16} color={colors.electricBlue} className="ml-auto" />}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t" style={{ borderColor: colors.cardBorder }}>
          <div className="text-xs mb-2" style={{ color: colors.textSecondary }}>
            System Status
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.emeraldGreen }} />
            <span className="text-sm" style={{ color: colors.emeraldGreen }}>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div
          className="p-6 border-b flex justify-between items-center"
          style={{
            background: `linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 11, 20, 0.9))`,
            borderColor: colors.cardBorder,
          }}
        >
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: colors.text }}>
              Professional Services AI Command Center
            </h1>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              Enterprise Consulting & Delivery Intelligence
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="p-3 rounded-lg transition-all hover:scale-105"
              style={{ backgroundColor: colors.glass, border: `1px solid ${colors.glassBorder}` }}
            >
              <RefreshCw size={20} color={colors.textSecondary} />
            </button>
            <button
              className="p-3 rounded-lg transition-all hover:scale-105 relative"
              style={{ backgroundColor: colors.glass, border: `1px solid ${colors.glassBorder}` }}
            >
              <Bell size={20} color={colors.textSecondary} />
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: colors.red }} />
            </button>
            <button
              className="p-3 rounded-lg transition-all hover:scale-105"
              style={{ backgroundColor: colors.glass, border: `1px solid ${colors.glassBorder}` }}
            >
              <Settings size={20} color={colors.textSecondary} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Executive KPI Bar */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Executive Performance Metrics
            </h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Financial KPIs
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {financialKPIs.map(renderKPICard)}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Delivery KPIs
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {deliveryKPIs.map(renderKPICard)}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Resource KPIs
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {resourceKPIs.map(renderKPICard)}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Customer KPIs
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {customerKPIs.map(renderKPICard)}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                AI KPIs
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {aiKPIs.map(renderKPICard)}
              </div>
            </div>
          </section>

          {/* AI Professional Services Agents */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                AI Professional Services Agents
              </h2>
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{
                  backgroundColor: `${colors.emeraldGreen}20`,
                  border: `1px solid ${colors.emeraldGreen}40`,
                  color: colors.emeraldGreen,
                }}
              >
                View All Agents
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {agents.map(renderAgentCard)}
            </div>
          </section>

          {/* Chief Services Officer Command Center */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Chief Services Officer Command Center
            </h2>
            <div
              className="p-8 rounded-xl border backdrop-blur-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <div className="grid grid-cols-6 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: colors.emeraldGreen }}>
                    $2.4B
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Total Revenue
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: colors.electricBlue }}>
                    12,450
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Active Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: colors.emeraldGreen }}>
                    48,000
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Consultants
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: colors.purple }}>
                    94%
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Client Satisfaction
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: colors.electricBlue }}>
                    86%
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Utilization
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: colors.emeraldGreen }}>
                    +$180M
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    AI Impact
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                    Regional Performance
                  </h3>
                  <div className="space-y-3">
                    {[
                      { region: 'North America', revenue: '$1.2B', margin: 36, satisfaction: 94 },
                      { region: 'Europe', revenue: '$840M', margin: 34, satisfaction: 92 },
                      { region: 'Asia Pacific', revenue: '$620M', margin: 32, satisfaction: 89 },
                      { region: 'Latin America', revenue: '$180M', margin: 28, satisfaction: 86 },
                    ].map((region, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-4 rounded-lg"
                        style={{ backgroundColor: colors.glass }}
                      >
                        <span className="font-medium" style={{ color: colors.text }}>
                          {region.region}
                        </span>
                        <span className="font-bold" style={{ color: colors.emeraldGreen }}>
                          {region.revenue}
                        </span>
                        <span
                          className="font-bold"
                          style={{ color: region.margin >= 35 ? colors.emeraldGreen : colors.amber }}
                        >
                          {region.margin}%
                        </span>
                        <span className="font-bold" style={{ color: colors.electricBlue }}>
                          {region.satisfaction}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                    Practice Performance
                  </h3>
                  <div className="space-y-3">
                    {[
                      { practice: 'Cloud Consulting', revenue: '$720M', growth: '+18%', margin: 38 },
                      { practice: 'Data Analytics', revenue: '$540M', growth: '+22%', margin: 35 },
                      { practice: 'AI/ML Services', revenue: '$480M', growth: '+28%', margin: 42 },
                      { practice: 'Cybersecurity', revenue: '$360M', growth: '+15%', margin: 40 },
                    ].map((practice, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-4 rounded-lg"
                        style={{ backgroundColor: colors.glass }}
                      >
                        <span className="font-medium" style={{ color: colors.text }}>
                          {practice.practice}
                        </span>
                        <span className="font-bold" style={{ color: colors.emeraldGreen }}>
                          {practice.revenue}
                        </span>
                        <span className="font-bold" style={{ color: colors.purple }}>
                          {practice.growth}
                        </span>
                        <span className="font-bold" style={{ color: colors.electricBlue }}>
                          {practice.margin}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Project Portfolio Command Center */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Project Portfolio Command Center
            </h2>
            
            <div
              className="p-6 rounded-xl border backdrop-blur-sm mb-6"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Project Lifecycle Workflow
              </h3>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {[
                  { stage: 'Lead', count: 245, value: '$1.2B', status: 'active' },
                  { stage: 'Opportunity', count: 182, value: '$960M', status: 'active' },
                  { stage: 'Proposal', count: 124, value: '$720M', status: 'active' },
                  { stage: 'SOW', count: 89, value: '$540M', status: 'completed' },
                  { stage: 'Staffing', count: 67, value: '$420M', status: 'active' },
                  { stage: 'Kickoff', count: 54, value: '$360M', status: 'completed' },
                  { stage: 'Delivery', count: 12450, value: '$2.4B', status: 'active' },
                  { stage: 'Closure', count: 324, value: '$180M', status: 'completed' },
                  { stage: 'Renewal', count: 156, value: '$480M', status: 'active' },
                ].map((stage, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 p-4 rounded-lg text-center min-w-[140px]"
                    style={{
                      backgroundColor: colors.glass,
                      border: `1px solid ${stage.status === 'completed' ? colors.emeraldGreen : colors.electricBlue}40`,
                    }}
                  >
                    <div
                      className="w-3 h-3 rounded-full mx-auto mb-2"
                      style={{
                        backgroundColor:
                          stage.status === 'completed'
                            ? colors.emeraldGreen
                            : stage.status === 'active'
                            ? colors.electricBlue
                            : colors.textSecondary,
                      }}
                    />
                    <div className="font-medium mb-1" style={{ color: colors.text }}>
                      {stage.stage}
                    </div>
                    <div className="text-2xl font-bold mb-1" style={{ color: colors.text }}>
                      {stage.count}
                    </div>
                    <div className="text-sm font-bold" style={{ color: colors.emeraldGreen }}>
                      {stage.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {projects.map(renderProjectCard)}
            </div>
          </section>

          {/* Resource Optimization Center */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Resource Optimization Center
            </h2>
            <div
              className="p-6 rounded-xl border backdrop-blur-sm mb-6"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.electricBlue }}>
                    48,000
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Total Consultants
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.emeraldGreen }}>
                    1,240
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Available
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.amber }}>
                    3,920
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    On Bench
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.purple }}>
                    86.4%
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Utilization
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-6 rounded-xl border backdrop-blur-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Skills Gap Analysis
              </h3>
              <div className="space-y-4">
                {[
                  { skill: 'Cloud Migration', demand: 85, supply: 70, gap: 15 },
                  { skill: 'AI/ML', demand: 92, supply: 65, gap: 27 },
                  { skill: 'Data Analytics', demand: 78, supply: 80, gap: -2 },
                  { skill: 'Cybersecurity', demand: 88, supply: 55, gap: 33 },
                  { skill: 'Strategy', demand: 72, supply: 75, gap: -3 },
                ].map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium" style={{ color: colors.text }}>
                        {skill.skill}
                      </span>
                      <div
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: skill.gap > 0 ? `${colors.red}20` : `${colors.emeraldGreen}20`,
                          color: skill.gap > 0 ? colors.red : colors.emeraldGreen,
                        }}
                      >
                        {skill.gap > 0 ? `+${skill.gap}` : skill.gap}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1" style={{ color: colors.textSecondary }}>
                          <span>Demand</span>
                          <span>{skill.demand}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.glass }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${skill.demand}%`, backgroundColor: colors.electricBlue }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1" style={{ color: colors.textSecondary }}>
                          <span>Supply</span>
                          <span>{skill.supply}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.glass }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${skill.supply}%`, backgroundColor: colors.emeraldGreen }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Client Success Command Center */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Client Success Command Center
            </h2>
            <div
              className="p-6 rounded-xl border backdrop-blur-sm mb-6"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.emeraldGreen }}>
                    91.2%
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Avg Health Score
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.electricBlue }}>
                    $7.2B
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Total Portfolio
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.purple }}>
                    $1.8B
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Renewal Pipeline
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.amber }}>
                    124
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    At Risk
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-6 rounded-xl border backdrop-blur-sm mb-6"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Client Health Distribution
              </h3>
              <div className="space-y-3">
                {[
                  { score: 'Excellent', count: 482, percentage: 38 },
                  { score: 'Good', count: 498, percentage: 40 },
                  { score: 'Fair', count: 186, percentage: 15 },
                  { score: 'Critical', count: 84, percentage: 7 },
                ].map((dist, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-24 font-medium" style={{ color: colors.text }}>
                      {dist.score}
                    </span>
                    <div className="flex-1 h-3 rounded-full" style={{ backgroundColor: colors.glass }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${dist.percentage}%`,
                          backgroundColor:
                            dist.score === 'Excellent'
                              ? colors.emeraldGreen
                              : dist.score === 'Good'
                              ? colors.electricBlue
                              : dist.score === 'Fair'
                              ? colors.amber
                              : colors.red,
                        }}
                      />
                    </div>
                    <span className="w-12 text-right font-medium" style={{ color: colors.text }}>
                      {dist.count}
                    </span>
                    <span className="w-16 text-right" style={{ color: colors.textSecondary }}>
                      {dist.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="p-4 rounded-xl border backdrop-blur-sm transition-all hover:scale-105"
                  style={{
                    backgroundColor: colors.card,
                    borderColor: colors.cardBorder,
                  }}
                >
                  <div className="font-bold mb-2" style={{ color: colors.text }}>
                    {client.name}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        Health
                      </span>
                      <span className="text-xs font-bold" style={{ color: colors.emeraldGreen }}>
                        {client.healthScore}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        CSAT
                      </span>
                      <span className="text-xs font-bold" style={{ color: colors.electricBlue }}>
                        {client.satisfaction}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        Expansion
                      </span>
                      <span className="text-xs font-bold" style={{ color: colors.purple }}>
                        {client.expansion}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs" style={{ color: colors.textSecondary }}>
                        Churn Risk
                      </span>
                      <span className="text-xs font-bold" style={{ color: colors.red }}>
                        {client.churnRisk}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: colors.cardBorder }}>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>
                      {client.contractValue}
                    </div>
                    <div
                      className="text-xs font-medium mt-1"
                      style={{ color: client.tier === 'enterprise' ? colors.emeraldGreen : colors.electricBlue }}
                    >
                      {client.tier}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Revenue Forecasting Engine */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Revenue Forecasting Engine
            </h2>
            <div
              className="p-6 rounded-xl border backdrop-blur-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                    Current Quarter Forecast
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: colors.glass }}>
                      <span style={{ color: colors.textSecondary }}>Forecast</span>
                      <span className="text-2xl font-bold" style={{ color: colors.emeraldGreen }}>$2.8B</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: colors.glass }}>
                      <span style={{ color: colors.textSecondary }}>Actual</span>
                      <span className="text-2xl font-bold" style={{ color: colors.text }}>$2.4B</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: colors.glass }}>
                      <span style={{ color: colors.textSecondary }}>Variance</span>
                      <span className="text-2xl font-bold" style={{ color: colors.purple }}>-14.3%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: colors.glass }}>
                      <span style={{ color: colors.textSecondary }}>Confidence</span>
                      <span className="text-2xl font-bold" style={{ color: colors.electricBlue }}>92%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                    Pipeline Conversion Funnel
                  </h3>
                  <div className="space-y-3">
                    {[
                      { stage: 'Qualified', value: '$4.2B', conversion: 100 },
                      { stage: 'Proposal', value: '$2.8B', conversion: 67 },
                      { stage: 'Negotiation', value: '$1.8B', conversion: 43 },
                      { stage: 'Closed', value: '$1.2B', conversion: 29 },
                    ].map((stage, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span style={{ color: colors.text }}>{stage.stage}</span>
                          <span className="font-bold" style={{ color: colors.emeraldGreen }}>{stage.value}</span>
                        </div>
                        <div className="w-full h-2 rounded-full" style={{ backgroundColor: colors.glass }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${stage.conversion}%`, backgroundColor: colors.electricBlue }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Proposal & SOW Intelligence Center */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Proposal & SOW Intelligence Center
            </h2>
            <div
              className="p-6 rounded-xl border backdrop-blur-sm mb-6"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.electricBlue }}>
                    24
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Active RFPs
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.emeraldGreen }}>
                    67%
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Win Rate
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.purple }}>
                    $4.2B
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Pipeline Value
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.amber }}>
                    12
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Pending Approval
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-6 rounded-xl border backdrop-blur-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Deal Pipeline Stages
              </h3>
              <div className="space-y-3">
                {[
                  { stage: 'Qualified', deals: 45, value: '$1.8B' },
                  { stage: 'Proposal', deals: 32, value: '$1.4B' },
                  { stage: 'Negotiation', deals: 18, value: '$720M' },
                  { stage: 'Closed', deals: 12, value: '$480M' },
                ].map((stage, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-32 font-medium" style={{ color: colors.text }}>
                      {stage.stage}
                    </span>
                    <div className="flex-1 h-3 rounded-full" style={{ backgroundColor: colors.glass }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(stage.deals / 45) * 100}%`, backgroundColor: colors.electricBlue }}
                      />
                    </div>
                    <span className="w-12 text-right font-medium" style={{ color: colors.text }}>
                      {stage.deals}
                    </span>
                    <span className="w-24 text-right font-bold" style={{ color: colors.emeraldGreen }}>
                      {stage.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PMO Command Center */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              PMO Command Center
            </h2>
            <div
              className="p-6 rounded-xl border backdrop-blur-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                  Executive Initiatives
                </h3>
                <span className="text-sm font-bold" style={{ color: colors.text }}>
                  8 Active
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Digital Transformation 2025', progress: 78, budget: '$12M', status: 'on-track' },
                  { name: 'AI Platform Integration', progress: 65, budget: '$8M', status: 'on-track' },
                  { name: 'Global Expansion', progress: 45, budget: '$15M', status: 'at-risk' },
                  { name: 'Sustainability Initiative', progress: 82, budget: '$6M', status: 'on-track' },
                  { name: 'Security Overhaul', progress: 92, budget: '$4M', status: 'on-track' },
                ].map((initiative, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-lg"
                    style={{ backgroundColor: colors.glass }}
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: initiative.status === 'on-track' ? colors.emeraldGreen : colors.amber,
                      }}
                    />
                    <div className="flex-1">
                      <div className="font-medium" style={{ color: colors.text }}>
                        {initiative.name}
                      </div>
                      <div className="text-sm" style={{ color: colors.textSecondary }}>
                        {initiative.progress}% complete
                      </div>
                    </div>
                    <span className="font-bold" style={{ color: colors.text }}>
                      {initiative.budget}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Risk & Compliance Center */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Risk & Compliance Center
            </h2>
            <div
              className="p-6 rounded-xl border backdrop-blur-sm mb-6"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.red }}>
                    8
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    At Risk Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.amber }}>
                    12
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Scope Creep
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.red }}>
                    5
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Over Budget
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.emeraldGreen }}>
                    156
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Escalations Resolved
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-6 rounded-xl border backdrop-blur-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Risk Impact Analysis
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Project Delays', impact: '12 days avg', count: 'Critical: 3' },
                  { label: 'Scope Creep', impact: '$1.2M', count: 'Revenue Impact' },
                  { label: 'Budget Overruns', impact: '8.4% avg', count: 'Impact: $4.8M' },
                ].map((risk, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-4 rounded-lg"
                    style={{ backgroundColor: colors.glass }}
                  >
                    <span className="font-medium" style={{ color: colors.text }}>
                      {risk.label}
                    </span>
                    <span className="font-bold" style={{ color: colors.red }}>
                      {risk.impact}
                    </span>
                    <span className="text-sm" style={{ color: colors.textSecondary }}>
                      {risk.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Knowledge Intelligence Hub */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Knowledge Intelligence Hub
            </h2>
            <div
              className="p-6 rounded-xl border backdrop-blur-sm mb-6"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.electricBlue }}>
                    1,240
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Case Studies
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.emeraldGreen }}>
                    860
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Best Practices
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.purple }}>
                    540
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    Templates
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: colors.amber }}>
                    128
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    AI Insights/Day
                  </div>
                </div>
              </div>
            </div>

            <div
              className="p-6 rounded-xl border backdrop-blur-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
                Top Knowledge Categories
              </h3>
              <div className="space-y-3">
                {[
                  { category: 'Cloud Migration', count: 284 },
                  { category: 'Data Analytics', count: 248 },
                  { category: 'AI/ML Implementation', count: 196 },
                  { category: 'Cybersecurity', count: 172 },
                  { category: 'Digital Transformation', count: 148 },
                ].map((cat, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-48 font-medium" style={{ color: colors.text }}>
                      {cat.category}
                    </span>
                    <div className="flex-1 h-3 rounded-full" style={{ backgroundColor: colors.glass }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(cat.count / 284) * 100}%`, backgroundColor: colors.electricBlue }}
                      />
                    </div>
                    <span className="w-12 text-right font-medium" style={{ color: colors.text }}>
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* AI Insights Center */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              AI Insights Center
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {insights.map(renderInsightCard)}
            </div>
          </section>

          {/* Real-Time Operations Feed */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Real-Time Operations Feed
            </h2>
            <div
              className="p-6 rounded-xl border backdrop-blur-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              {operations.map(renderOperationItem)}
            </div>
          </section>

          {/* Global Delivery Operations */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              Global Delivery Operations
            </h2>
            <div
              className="p-6 rounded-xl border backdrop-blur-sm"
              style={{
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold" style={{ color: colors.text }}>
                  Delivery Centers
                </h3>
                <span className="text-sm font-bold" style={{ color: colors.text }}>
                  8 Centers
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { center: 'New York', region: 'North America', consultants: 8420, utilization: 92, revenue: '$480M' },
                  { center: 'London', region: 'Europe', consultants: 6180, utilization: 88, revenue: '$360M' },
                  { center: 'Singapore', region: 'Asia Pacific', consultants: 4820, utilization: 86, revenue: '$240M' },
                  { center: 'Bangalore', region: 'Asia Pacific', consultants: 12400, utilization: 91, revenue: '$420M' },
                  { center: 'São Paulo', region: 'Latin America', consultants: 2240, utilization: 84, revenue: '$120M' },
                  { center: 'Dubai', region: 'Middle East', consultants: 1820, utilization: 89, revenue: '$96M' },
                ].map((center, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-4 rounded-lg"
                    style={{ backgroundColor: colors.glass }}
                  >
                    <span className="font-medium" style={{ color: colors.text }}>
                      {center.center}
                    </span>
                    <span className="text-sm" style={{ color: colors.textSecondary }}>
                      {center.region}
                    </span>
                    <span className="text-sm" style={{ color: colors.text }}>
                      {center.consultants} consultants
                    </span>
                    <span
                      className="font-bold"
                      style={{
                        color:
                          center.utilization >= 90
                            ? colors.emeraldGreen
                            : center.utilization >= 80
                            ? colors.electricBlue
                            : colors.amber,
                      }}
                    >
                      {center.utilization}%
                    </span>
                    <span className="font-bold" style={{ color: colors.emeraldGreen }}>
                      {center.revenue}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* System Health & AI Infrastructure */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{ color: colors.text }}>
              System Health & AI Infrastructure
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Project Management Tools', status: 'operational', uptime: 99.8, latency: 45 },
                { name: 'Time Tracking Systems', status: 'operational', uptime: 99.5, latency: 32 },
                { name: 'Billing Systems', status: 'operational', uptime: 99.9, latency: 28 },
                { name: 'CRM Systems', status: 'degraded', uptime: 97.2, latency: 85 },
                { name: 'AI Agent Platform', status: 'operational', uptime: 99.7, latency: 52 },
                { name: 'Data Pipelines', status: 'operational', uptime: 99.4, latency: 38 },
              ].map((system, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border backdrop-blur-sm transition-all hover:scale-105"
                  style={{
                    backgroundColor: colors.card,
                    borderColor: colors.cardBorder,
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="font-bold" style={{ color: colors.text }}>
                      {system.name}
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: system.status === 'operational' ? `${colors.emeraldGreen}20` : `${colors.red}20`,
                        color: system.status === 'operational' ? colors.emeraldGreen : colors.red,
                      }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: system.status === 'operational' ? colors.emeraldGreen : colors.red,
                        }}
                      />
                      {system.status}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                        Uptime
                      </div>
                      <div className="text-xl font-bold" style={{ color: colors.text }}>
                        {system.uptime}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: colors.textSecondary }}>
                        Latency
                      </div>
                      <div className="text-xl font-bold" style={{ color: colors.text }}>
                        {system.latency}ms
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
