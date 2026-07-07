import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import PMOCommandCenter from '@/components/ai-agent/dashboard/professional-services/PMOCommandCenter';
import GlobalDeliveryOperations from '@/components/ai-agent/dashboard/professional-services/GlobalDeliveryOperations';
import RevenueForecastingEngine from '@/components/ai-agent/dashboard/professional-services/RevenueForecastingEngine';
import ProfessionalServicesKPIBar from '@/components/ai-agent/dashboard/professional-services/ProfessionalServicesKPIBar';
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
  ChevronRight,
  RefreshCw,
  Bell,
  Target,
  DollarSign,
  Activity,
  CheckCircle2,
  Award,
  Sparkles,
  Zap,
  Calendar,
  Clock,
  User,
  Smile,
  Heart,
  ArrowUpRight,
  Wallet,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProfessionalServicesCommandCenter() {
  const [activeSection, setActiveSection] = useState('dashboard');

  // Navigation items for all 14 sections
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
    { id: 'global', label: 'Global Delivery', icon: Globe },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Executive KPI Data - Comprehensive with Categories, Forecasts, and AI Commentary
  const kpiData = [
    // Financial KPIs
    { id: 'servicesRevenue', label: 'Services Revenue', value: '$2.4B', trend: 'up', trendValue: '+12%', icon: DollarSign, color: '#10B981', subtitle: 'Year to date', forecast: '$2.8B Q4', aiCommentary: 'AI forecasts 18% growth', category: 'financial' },
    { id: 'grossMargin', label: 'Gross Margin', value: '42.8%', trend: 'up', trendValue: '+2.4%', icon: Target, color: '#10B981', subtitle: 'Average margin', forecast: '45% target', aiCommentary: 'Pricing optimization +3%', category: 'financial' },
    { id: 'pipelineValue', label: 'Pipeline Value', value: '$4.2B', trend: 'up', trendValue: '+8%', icon: BarChart3, color: '#8B5CF6', subtitle: 'Opportunities', forecast: '$5.1B projected', aiCommentary: 'Conversion improving', category: 'financial' },
    { id: 'forecastRevenue', label: 'Forecast Revenue', value: '$2.8B', trend: 'up', trendValue: '+15%', icon: TrendingUp, color: '#8B5CF6', subtitle: 'Next quarter', forecast: '94% accuracy', aiCommentary: 'Demand modeling active', category: 'financial' },
    { id: 'revenueAtRisk', label: 'Revenue at Risk', value: '$180M', trend: 'down', trendValue: '-12%', icon: AlertTriangle, color: '#EF4444', subtitle: 'At-risk deals', forecast: '$120M projected', aiCommentary: 'Risk mitigation +22%', category: 'financial' },
    // Delivery KPIs
    { id: 'activeProjects', label: 'Active Projects', value: '12,450', trend: 'up', trendValue: '+8%', icon: Briefcase, color: '#06B6D4', subtitle: 'Current engagements', forecast: '13,200 Q4', aiCommentary: 'Capacity at 87%', category: 'delivery' },
    { id: 'onTimeDelivery', label: 'On-Time Delivery', value: '94%', trend: 'up', trendValue: '+3%', icon: Award, color: '#10B981', subtitle: 'Schedule adherence', forecast: '96% target', aiCommentary: 'Timeline optimization +18%', category: 'delivery' },
    { id: 'projectSuccess', label: 'Project Success', value: '91%', trend: 'up', trendValue: '+4%', icon: CheckCircle2, color: '#10B981', subtitle: 'Client acceptance', forecast: '94% target', aiCommentary: 'Quality AI +12%', category: 'delivery' },
    { id: 'slaCompliance', label: 'SLA Compliance', value: '96%', trend: 'stable', trendValue: '0%', icon: Shield, color: '#06B6D4', subtitle: 'Service levels', forecast: '98% target', aiCommentary: 'Monitoring active', category: 'delivery' },
    { id: 'milestoneCompletion', label: 'Milestone Completion', value: '89%', trend: 'up', trendValue: '+5%', icon: Calendar, color: '#10B981', subtitle: 'On-time milestones', forecast: '92% target', aiCommentary: 'Planning AI +8%', category: 'delivery' },
    // Resource KPIs
    { id: 'utilizationRate', label: 'Utilization Rate', value: '86%', trend: 'up', trendValue: '+4%', icon: BarChart3, color: '#8B5CF6', subtitle: 'Consultant capacity', forecast: '88% target', aiCommentary: 'Optimization +19%', category: 'resource' },
    { id: 'billableUtilization', label: 'Billable Utilization', value: '74%', trend: 'up', trendValue: '+6%', icon: Clock, color: '#10B981', subtitle: 'Revenue-generating', forecast: '78% target', aiCommentary: 'Scheduling AI +14%', category: 'resource' },
    { id: 'benchCapacity', label: 'Bench Capacity', value: '14%', trend: 'down', trendValue: '-3%', icon: Users, color: '#F59E0B', subtitle: 'Available consultants', forecast: '12% optimal', aiCommentary: 'Staffing AI active', category: 'resource' },
    { id: 'resourceAvailability', label: 'Resource Availability', value: '92%', trend: 'up', trendValue: '+8%', icon: User, color: '#06B6D4', subtitle: 'Skill coverage', forecast: '95% target', aiCommentary: 'Skills matching +22%', category: 'resource' },
    { id: 'staffingAccuracy', label: 'Staffing Accuracy', value: '94%', trend: 'up', trendValue: '+5%', icon: Target, color: '#10B981', subtitle: 'Forecast vs actual', forecast: '96% target', aiCommentary: 'Prediction engine +12%', category: 'resource' },
    // Customer KPIs
    { id: 'csatScore', label: 'CSAT Score', value: '94%', trend: 'up', trendValue: '+3%', icon: Smile, color: '#10B981', subtitle: 'Client satisfaction', forecast: '96% target', aiCommentary: 'Sentiment AI +18%', category: 'customer' },
    { id: 'npsScore', label: 'NPS Score', value: '72', trend: 'up', trendValue: '+8', icon: Sparkles, color: '#10B981', subtitle: 'Net promoter', forecast: '75 target', aiCommentary: 'Experience AI +14%', category: 'customer' },
    { id: 'clientHealthIndex', label: 'Client Health', value: '89%', trend: 'up', trendValue: '+4%', icon: Heart, color: '#06B6D4', subtitle: 'Overall health index', forecast: '92% target', aiCommentary: 'Health AI +16%', category: 'customer' },
    { id: 'renewalProbability', label: 'Renewal Probability', value: '87%', trend: 'up', trendValue: '+6%', icon: RefreshCw, color: '#10B981', subtitle: 'Contract renewals', forecast: '90% target', aiCommentary: 'Retention AI +20%', category: 'customer' },
    { id: 'expansionOpportunity', label: 'Expansion Value', value: '$840M', trend: 'up', trendValue: '+24%', icon: ArrowUpRight, color: '#8B5CF6', subtitle: 'Upsell opportunities', forecast: '$1.2B projected', aiCommentary: 'Opportunity AI +28%', category: 'customer' },
    // AI KPIs
    { id: 'aiProductivityGain', label: 'AI Productivity', value: '+$180M', trend: 'up', trendValue: '+28%', icon: Zap, color: '#EC4899', subtitle: 'Productivity gain', forecast: '+$240M projected', aiCommentary: 'Automation scaling', category: 'ai' },
    { id: 'hoursAutomated', label: 'Hours Automated', value: '2.4M', trend: 'up', trendValue: '+42%', icon: Clock, color: '#EC4899', subtitle: 'AI-driven hours', forecast: '3.2M projected', aiCommentary: 'Process AI +35%', category: 'ai' },
    { id: 'costSavings', label: 'Cost Savings', value: '$48M', trend: 'up', trendValue: '+18%', icon: Wallet, color: '#10B981', subtitle: 'AI-driven savings', forecast: '$64M projected', aiCommentary: 'Efficiency AI +22%', category: 'ai' },
    { id: 'deliveryAcceleration', label: 'Delivery Speed', value: '+34%', trend: 'up', trendValue: '+12%', icon: TrendingUp, color: '#EC4899', subtitle: 'Time to delivery', forecast: '+40% target', aiCommentary: 'Acceleration AI +28%', category: 'ai' },
    { id: 'aiRecommendations', label: 'AI Recommendations', value: '48K', trend: 'up', trendValue: '+56%', icon: Sparkles, color: '#EC4899', subtitle: 'Generated this month', forecast: '60K projected', aiCommentary: 'Insight engine active', category: 'ai' }
  ];

  // AI Professional Services Agents - 5 Core Agent Types
  const agents = [
    {
      id: 'atlas',
      name: 'Agent Atlas',
      role: 'Project Delivery Agent',
      avatar: '🗺️',
      performanceScore: 96,
      projectsManaged: '2,450',
      deliveryEfficiency: '+28%',
      marginImprovement: '+22%',
      status: 'active',
      lastActivity: 'Optimizing project delivery schedules',
      confidenceScore: 98,
      engagementImpact: 'High',
      revenueContribution: '$4.2M',
      deliveryEfficiencyMetric: '+28% efficiency',
      color: '#10B981'
    },
    {
      id: 'forge',
      name: 'Agent Forge',
      role: 'Proposal & SOW Agent',
      avatar: '🔨',
      performanceScore: 94,
      proposalsGenerated: '1,240',
      winRateImpact: '+18%',
      turnaroundTime: '-42%',
      status: 'active',
      lastActivity: 'Generating proposal for Enterprise AI project',
      confidenceScore: 96,
      engagementImpact: 'High',
      revenueContribution: '$3.6M',
      deliveryEfficiencyMetric: '+18% win rate',
      color: '#8B5CF6'
    },
    {
      id: 'nexus',
      name: 'Agent Nexus',
      role: 'Client Success Agent',
      avatar: '🔮',
      performanceScore: 92,
      clientsAnalyzed: '12,480',
      satisfactionPrediction: '94%',
      renewalInfluence: '+24%',
      status: 'active',
      lastActivity: 'Analyzing client health scores',
      confidenceScore: 94,
      engagementImpact: 'High',
      revenueContribution: '$2.8M',
      deliveryEfficiencyMetric: '+24% renewal',
      color: '#06B6D4'
    },
    {
      id: 'vector',
      name: 'Agent Vector',
      role: 'Resource Allocation Agent',
      avatar: '⚡',
      performanceScore: 91,
      consultantsOptimized: '48,000',
      utilizationIncrease: '+19%',
      forecastAccuracy: '96%',
      status: 'active',
      lastActivity: 'Optimizing resource allocation across regions',
      confidenceScore: 93,
      engagementImpact: 'High',
      revenueContribution: '$2.4M',
      deliveryEfficiencyMetric: '+19% utilization',
      color: '#F59E0B'
    },
    {
      id: 'sentinel',
      name: 'Agent Sentinel',
      role: 'Risk Management Agent',
      avatar: '🛡️',
      performanceScore: 95,
      risksPrevented: '842',
      budgetSavings: '$4.2M',
      predictionAccuracy: '94%',
      status: 'active',
      lastActivity: 'Monitoring delivery risk indicators',
      confidenceScore: 97,
      engagementImpact: 'High',
      revenueContribution: '$4.2M',
      deliveryEfficiencyMetric: '+94% accuracy',
      color: '#EF4444'
    }
  ];

  // Chief Delivery Officer Dashboard - Enhanced
  const cdoData = {
    totalRevenue: '$2.4B',
    activeProjects: '12,450',
    consultants: '48,000',
    clientSatisfaction: '94%',
    utilization: '86%',
    aiProductivityImpact: '+$180M',
    activeEngagements: '12,450',
    utilizationRate: '86%',
    billableRevenue: '$2.4B',
    projectMargin: '42.8%',
    deliveryOnTimeRate: '94%',
    pipelineValue: '$4.2B',
    resourceEfficiency: '92%'
  };

  // Project Delivery Control Center - Enhanced
  const projectData = {
    projects: [
      { id: 1, name: 'Enterprise AI Transformation', client: 'Fortune 500 Tech', status: 'On Track', progress: 75, margin: 42, team: 24, budget: '$4.2M', timeline: '18 months' },
      { id: 2, name: 'Global Cloud Migration', client: 'Global Bank', status: 'At Risk', progress: 45, margin: 28, team: 36, budget: '$8.4M', timeline: '24 months' },
      { id: 3, name: 'Healthcare AI Platform', client: 'Healthcare System', status: 'On Track', progress: 60, margin: 38, team: 18, budget: '$2.8M', timeline: '12 months' },
      { id: 4, name: 'Data Analytics Platform', client: 'Retail Chain', status: 'Delayed', progress: 30, margin: 22, team: 12, budget: '$1.8M', timeline: '9 months' },
      { id: 5, name: 'Digital Customer Experience', client: 'Insurance Co', status: 'On Track', progress: 82, margin: 35, team: 15, budget: '$2.2M', timeline: '8 months' },
      { id: 6, name: 'Cybersecurity Assessment', client: 'Government Agency', status: 'At Risk', progress: 55, margin: 32, team: 8, budget: '$1.2M', timeline: '6 months' }
    ],
    workflowStages: [
      { stage: 'Lead', count: 2450, value: '$840M' },
      { stage: 'Opportunity', count: 1840, value: '$1.2B' },
      { stage: 'Proposal', count: 1240, value: '$1.8B' },
      { stage: 'SOW', count: 840, value: '$2.4B' },
      { stage: 'Staffing', count: 620, value: '$1.8B' },
      { stage: 'Kickoff', count: 480, value: '$1.4B' },
      { stage: 'Delivery', count: 12450, value: '$4.2B' },
      { stage: 'Closure', count: 180, value: '$420M' },
      { stage: 'Renewal', count: 340, value: '$840M' }
    ],
    milestones: [
      { id: 1, project: 'Enterprise AI Transformation', milestone: 'Phase 1 Complete', status: 'completed', dueDate: '2024-01-15' },
      { id: 2, project: 'Global Cloud Migration', milestone: 'Infrastructure Setup', status: 'in-progress', dueDate: '2024-02-01' },
      { id: 3, project: 'Healthcare AI Platform', milestone: 'Model Training', status: 'in-progress', dueDate: '2024-02-15' }
    ]
  };

  // Mock data for Resource Management Center
  const resourceData = {
    consultants: [
      { id: 1, name: 'Sarah Chen', role: 'Senior Consultant', skills: ['Strategy', 'Data Analysis'], utilization: 92, availability: 'Limited' },
      { id: 2, name: 'Michael Johnson', role: 'Principal Consultant', skills: ['Cloud', 'DevOps'], utilization: 85, availability: 'Available' },
      { id: 3, name: 'Emily Davis', role: 'Consultant', skills: ['AI/ML', 'Python'], utilization: 78, availability: 'Available' },
      { id: 4, name: 'James Wilson', role: 'Senior Consultant', skills: ['Security', 'Compliance'], utilization: 95, availability: 'Booked' }
    ],
    skillsMatrix: {
      'Strategy': { demand: 85, supply: 70 },
      'Cloud': { demand: 92, supply: 80 },
      'AI/ML': { demand: 95, supply: 60 },
      'Security': { demand: 88, supply: 75 },
      'Data Analysis': { demand: 82, supply: 85 }
    }
  };

  // Mock data for Time & Billing Intelligence
  const billingData = {
    billableHours: '1.2M',
    nonBillableTime: '18%',
    timeLeakage: '4.2%',
    billingAccuracy: '96%',
    revenueLeakageRisk: '$840K',
    utilizationBreakdown: {
      billable: 82,
      nonBillable: 12,
      unaccounted: 6
    }
  };

  // Mock data for Client Intelligence Hub
  const clientData = {
    clients: [
      { id: 1, name: 'Fortune 500 Tech', healthScore: 92, satisfaction: 94, expansion: 78, churnRisk: 8, contractValue: '$2.4M' },
      { id: 2, name: 'Global Bank', healthScore: 78, satisfaction: 82, expansion: 65, churnRisk: 22, contractValue: '$1.8M' },
      { id: 3, name: 'Healthcare System', healthScore: 88, satisfaction: 90, expansion: 72, churnRisk: 12, contractValue: '$1.2M' }
    ],
    segmentation: {
      enterprise: 45,
      midMarket: 35,
      smb: 20
    }
  };

  // Mock data for Proposals & Sales Engine
  const proposalsData = {
    rfps: 28,
    proposalsSubmitted: 24,
    winRate: '68%',
    dealPipeline: '$420M',
    pricingModels: ['Fixed Price', 'Time & Materials', 'Retainer', 'Success-Based'],
    salesFunnel: {
      qualified: 45,
      proposal: 32,
      negotiation: 18,
      closed: 12
    }
  };

  // Mock data for Knowledge Management System
  const knowledgeData = {
    caseStudies: 842,
    bestPractices: 1240,
    deliveryTemplates: 386,
    internalKnowledgeBase: '15,840 articles',
    aiGeneratedInsights: '4,280 insights',
    knowledgeGraph: {
      nodes: 8420,
      connections: 15600,
      expertiseAreas: 28
    }
  };

  // Mock data for Delivery Risk & Health Center
  const riskData = {
    projectDelays: 12,
    scopeCreep: 8,
    budgetOverruns: 6,
    resourceShortages: 4,
    clientEscalations: 3,
    riskHeatmap: [
      { project: 'Cloud Migration', riskLevel: 'high', riskType: 'Resource' },
      { project: 'Data Analytics Platform', riskLevel: 'high', riskType: 'Timeline' },
      { project: 'Digital Transformation', riskLevel: 'medium', riskType: 'Scope' }
    ]
  };

  // Mock data for Profitability & Financial Intelligence
  const profitabilityData = {
    revenuePerEngagement: '$1.2M',
    costPerProject: '$780K',
    marginByClient: '34%',
    resourceCostEfficiency: '92%',
    profitLeakagePoints: 6,
    profitabilityHeatmap: [
      { client: 'Fortune 500 Tech', margin: 38, revenue: '$2.4M' },
      { client: 'Healthcare System', margin: 41, revenue: '$1.2M' },
      { client: 'Global Bank', margin: 22, revenue: '$1.8M' }
    ]
  };

  // Mock data for AI Professional Services Insights
  const insightsData = [
    { id: 1, type: 'risk', title: 'Project Alpha Margin Risk', description: 'Project Alpha at risk of 12% margin erosion due to scope expansion.', impact: 'high', action: 'Review scope boundaries' },
    { id: 2, type: 'recommendation', title: 'Resource Shortage Alert', description: 'Resource shortage predicted in Data Engineering practice.', impact: 'medium', action: 'Initiate hiring pipeline' },
    { id: 3, type: 'opportunity', title: 'Client Upsell Opportunity', description: 'Client X shows 34% upsell probability for AI services.', impact: 'high', action: 'Schedule executive briefing' },
    { id: 4, type: 'recommendation', title: 'Utilization Optimization', description: 'Billable utilization below target in EU region.', impact: 'medium', action: 'Review resource allocation' },
    { id: 5, type: 'opportunity', title: 'Knowledge Efficiency Gain', description: 'Knowledge reuse could improve delivery efficiency by 18%.', impact: 'low', action: 'Implement knowledge sharing' }
  ];

  // Mock data for Real-time Delivery Operations Feed
  const operationsFeed = [
    { id: 1, event: 'Project milestone completed - Digital Transformation Phase 1', project: 'Digital Transformation', impact: 'medium', time: '2 min ago' },
    { id: 2, event: 'Client approval received - Cloud Migration architecture', project: 'Cloud Migration', impact: 'low', time: '15 min ago' },
    { id: 3, event: 'Resource reallocated - Sarah Chen to AI Implementation', project: 'AI Implementation', impact: 'medium', time: '32 min ago' },
    { id: 4, event: 'Risk detected - Timeline slippage in Data Analytics Platform', project: 'Data Analytics Platform', impact: 'high', time: '1 hour ago' },
    { id: 5, event: 'Proposal submitted - RFP for Enterprise AI Transformation', project: 'Enterprise AI', impact: 'medium', time: '2 hours ago' },
    { id: 6, event: 'Invoice generated - $480K for Q4 deliverables', project: 'Digital Transformation', impact: 'low', time: '3 hours ago' },
    { id: 7, event: 'Engagement escalated - Client concern on project timeline', project: 'Cloud Migration', impact: 'high', time: '4 hours ago' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
            <ProfessionalServicesKPIBar kpiData={kpiData} />
            <AIProfessionalServicesAgents agents={agents} />
            <ChiefDeliveryOfficerDashboard data={cdoData} />
            <ProjectDeliveryControlCenter data={projectData} />
            <ResourceManagementCenter consultants={resourceData.consultants} skillsMatrix={resourceData.skillsMatrix} />
            <TimeBillingIntelligence data={billingData} />
            <ClientIntelligenceHub clients={clientData.clients} segmentation={clientData.segmentation} />
            <ProposalsSalesEngine data={proposalsData} />
            <KnowledgeManagementSystem data={knowledgeData} />
            <DeliveryRiskHealthCenter data={riskData} />
            <ProfitabilityFinancialIntelligence data={profitabilityData} />
            <AIProfessionalServicesInsights insights={insightsData} />
            <RealTimeDeliveryOperationsFeed operations={operationsFeed} />
            <PlatformHealthDeliverySystems 
              systems={[
                { id: 'pm', name: 'Project Management Tools', status: 'operational', uptime: 99.9, latency: 45, lastIncident: '30 days ago' },
                { id: 'tt', name: 'Time Tracking Systems', status: 'operational', uptime: 99.8, latency: 120, lastIncident: '15 days ago' },
                { id: 'bs', name: 'Billing Systems', status: 'operational', uptime: 99.7, latency: 85, lastIncident: '7 days ago' },
                { id: 'crm', name: 'CRM Systems', status: 'operational', uptime: 99.9, latency: 55, lastIncident: '21 days ago' },
                { id: 'ks', name: 'Knowledge Systems', status: 'degraded', uptime: 99.6, latency: 180, lastIncident: '2 days ago' },
                { id: 'ai', name: 'AI Agents', status: 'operational', uptime: 99.9, latency: 35, lastIncident: '45 days ago' }
              ]}
              integrations={[
                { source: 'Project Management', target: 'Time Tracking', status: 'healthy', dataFlow: 95, latency: 45 },
                { source: 'Time Tracking', target: 'Billing', status: 'healthy', dataFlow: 92, latency: 85 },
                { source: 'CRM', target: 'Project Management', status: 'healthy', dataFlow: 88, latency: 55 },
                { source: 'Knowledge Systems', target: 'AI Agents', status: 'warning', dataFlow: 78, latency: 180 }
              ]}
              overallReliability={99.7}
              avgDataLatency={87}
            />
          </ScrollView>
        );
      case 'agents':
        return <AIProfessionalServicesAgents agents={agents} />;
      case 'projects':
        return <ProjectDeliveryControlCenter data={projectData} />;
      case 'resources':
        return <ResourceManagementCenter consultants={resourceData.consultants} skillsMatrix={resourceData.skillsMatrix} />;
      case 'clients':
        return <ClientIntelligenceHub clients={clientData.clients} segmentation={clientData.segmentation} />;
      case 'forecasting':
        return <RevenueForecastingEngine />;
      case 'proposals':
        return <ProposalsSalesEngine data={proposalsData} />;
      case 'delivery':
        return <TimeBillingIntelligence data={billingData} />;
      case 'pmo':
        return <PMOCommandCenter />;
      case 'risk':
        return <DeliveryRiskHealthCenter data={riskData} />;
      case 'knowledge':
        return <KnowledgeManagementSystem data={knowledgeData} />;
      case 'global':
        return <GlobalDeliveryOperations />;
      case 'analytics':
        return <ProfitabilityFinancialIntelligence data={profitabilityData} />;
      case 'settings':
        return (
          <View style={styles.placeholderContent}>
            <Text style={[styles.placeholderText, { color: '#FFFFFF' }]}>Settings</Text>
          </View>
        );
      default:
        return (
          <View style={styles.placeholderContent}>
            <Text style={[styles.placeholderText, { color: '#FFFFFF' }]}>Section coming soon</Text>
          </View>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#050B14' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderBottomColor: 'rgba(16, 185, 129, 0.3)', borderBottomWidth: 1 }]}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
            <Briefcase size={32} color="#10B981" />
          </View>
          <View>
            <Text style={[styles.headerTitle, { color: '#FFFFFF' }]}>
              Professional Services AI Command Center
            </Text>
            <Text style={[styles.headerSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>
              Global Consulting & Delivery Intelligence • $2.4B Revenue • 12,450 Projects
            </Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
            <RefreshCw size={20} color="rgba(255, 255, 255, 0.7)" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
            <Bell size={20} color="rgba(255, 255, 255, 0.7)" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255, 255, 255, 0.05)' }]}>
            <Settings size={20} color="rgba(255, 255, 255, 0.7)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area with Sidebar */}
      <View style={styles.mainContent}>
        {/* Left Sidebar Navigation */}
        <ScrollView style={[styles.sidebar, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderRightColor: 'rgba(16, 185, 129, 0.2)', borderRightWidth: 1 }]} showsVerticalScrollIndicator={false}>
          {navigationItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navItem,
                activeSection === item.id && styles.activeNavItem,
                { backgroundColor: activeSection === item.id ? 'rgba(16, 185, 129, 0.15)' : 'transparent' }
              ]}
              onPress={() => setActiveSection(item.id)}
            >
              <item.icon size={20} color={activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.6)'} />
              <Text style={[
                styles.navItemText,
                { color: activeSection === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.7)' }
              ]}>
                {item.label}
              </Text>
              {activeSection === item.id && <ChevronRight size={16} color="#10B981" />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content Area */}
        <View style={styles.contentArea}>
          {renderContent()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 240,
    paddingTop: 16,
    paddingBottom: 16,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    marginBottom: 4,
  },
  activeNavItem: {
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  navItemText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  contentArea: {
    flex: 1,
  },
  contentScroll: {
    flex: 1,
  },
  placeholderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
