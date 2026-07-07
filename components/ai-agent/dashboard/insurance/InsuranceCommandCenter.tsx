import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  LayoutDashboard,
  Shield,
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
  DollarSign,
  FileCheck,
  AlertTriangle,
  Scale,
  Calculator,
  TrendingUp as TrendingUpIcon,
  ShieldCheck,
  FileShield,
  PieChart as PieChartIcon,
  BarChart,
  UserCheck,
  Building2,
  Globe2,
  Lock,
  ClipboardCheck,
  FileSearch,
  AlertOctagon,
  Radar,
  Gavel,
} from 'lucide-react-native';

// Types
interface InsuranceAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  insuranceImpactScore: number;
  metrics: {
    applicationsEvaluated?: number;
    riskAccuracy?: number;
    premiumOptimization?: string;
    claimsProcessed?: number;
    automationRate?: string;
    resolutionTimeReduced?: string;
    casesInvestigated?: number;
    fraudPrevented?: string;
    detectionAccuracy?: number;
  };
  activeInsights: number;
  trend: 'up' | 'down' | 'stable';
}

interface InsuranceKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface Policy {
  id: string;
  policyNumber: string;
  customer: string;
  type: string;
  value: string;
  status: 'active' | 'pending' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
}

interface Claim {
  id: string;
  claimNumber: string;
  policyNumber: string;
  customer: string;
  type: string;
  amount: string;
  status: 'open' | 'investigating' | 'approved' | 'denied' | 'settled';
  dateSubmitted: string;
}

interface FraudCase {
  id: string;
  caseNumber: string;
  claimNumber: string;
  riskScore: number;
  status: 'investigating' | 'confirmed' | 'dismissed';
  amountAtRisk: string;
  detectionDate: string;
}

interface UnderwritingApplication {
  id: string;
  applicationNumber: string;
  customer: string;
  type: string;
  riskScore: number;
  recommendedPremium: string;
  status: 'received' | 'assessing' | 'underwriting' | 'approved' | 'denied';
}

interface InsuranceInsight {
  id: string;
  insight: string;
  category: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timestamp: string;
}

interface InsuranceActivity {
  id: string;
  event: string;
  type: 'policy' | 'claim' | 'fraud' | 'underwriting' | 'compliance' | 'customer' | 'risk';
  timestamp: string;
  details?: string;
}

interface SystemHealth {
  id: string;
  system: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
}

const InsuranceCommandCenter = () => {
  const theme = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation Items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Insurance Agents', icon: Shield },
    { id: 'underwriting', label: 'Underwriting', icon: FileCheck },
    { id: 'policies', label: 'Policies', icon: FileShield },
    { id: 'claims', label: 'Claims', icon: AlertTriangle },
    { id: 'fraud', label: 'Fraud Detection', icon: ShieldCheck },
    { id: 'risk', label: 'Risk Analytics', icon: Radar },
    { id: 'actuarial', label: 'Actuarial Intelligence', icon: Calculator },
    { id: 'compliance', label: 'Compliance', icon: Scale },
    { id: 'customer', label: 'Customer Intelligence', icon: UserCheck },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Insurance KPIs
  const insuranceKPIs: InsuranceKPI[] = [
    { id: '1', title: 'Gross Written Premium', value: '$4.8B', change: '+12.4%', trend: 'up', color: '#10B981', subtitle: 'Annual GWP' },
    { id: '2', title: 'Claims Ratio', value: '61%', change: '-2.3%', trend: 'down', color: '#06B6D4', subtitle: 'Loss ratio' },
    { id: '3', title: 'Combined Ratio', value: '92%', change: '-1.8%', trend: 'down', color: '#F59E0B', subtitle: 'Underwriting profit' },
    { id: '4', title: 'Active Policies', value: '2.4M', change: '+8.7%', trend: 'up', color: '#8B5CF6', subtitle: 'Policies in force' },
    { id: '5', title: 'Open Claims', value: '42,800', change: '+3.2%', trend: 'up', color: '#EF4444', subtitle: 'Active claims' },
    { id: '6', title: 'Underwriting Profit', value: '$384M', change: '+14.2%', trend: 'up', color: '#10B981', subtitle: 'Annual profit' },
    { id: '7', title: 'Fraud Detection Rate', value: '96%', change: '+4.1%', trend: 'up', color: '#06B6D4', subtitle: 'Detection accuracy' },
    { id: '8', title: 'Customer Retention Rate', value: '87%', change: '+3.5%', trend: 'up', color: '#8B5CF6', subtitle: 'Retention rate' },
    { id: '9', title: 'Risk Exposure Index', value: '72', change: '-5.2%', trend: 'down', color: '#F59E0B', subtitle: 'Risk score' },
    { id: '10', title: 'AI Prediction Accuracy', value: '94%', change: '+2.8%', trend: 'up', color: '#EC4899', subtitle: 'Model accuracy' },
  ];

  // AI Insurance Agents
  const insuranceAgents: InsuranceAgent[] = [
    {
      id: '1',
      name: 'Agent Atlas',
      specialty: 'Underwriting Intelligence Agent',
      avatar: '🔍',
      status: 'active',
      confidenceScore: 97,
      insuranceImpactScore: 94,
      metrics: {
        applicationsEvaluated: 148200,
        riskAccuracy: 97,
        premiumOptimization: '+18%',
      },
      activeInsights: 156,
      trend: 'up',
    },
    {
      id: '2',
      name: 'Agent Sentinel',
      specialty: 'Claims Automation Agent',
      avatar: '📋',
      status: 'active',
      confidenceScore: 95,
      insuranceImpactScore: 91,
      metrics: {
        claimsProcessed: 82400,
        automationRate: '92%',
        resolutionTimeReduced: '48%',
      },
      activeInsights: 124,
      trend: 'up',
    },
    {
      id: '3',
      name: 'Agent Shield',
      specialty: 'Fraud Detection Agent',
      avatar: '🛡️',
      status: 'active',
      confidenceScore: 96,
      insuranceImpactScore: 88,
      metrics: {
        casesInvestigated: 18200,
        fraudPrevented: '$42M',
        detectionAccuracy: 96,
      },
      activeInsights: 89,
      trend: 'stable',
    },
    {
      id: '4',
      name: 'Actuary Prime',
      specialty: 'Actuarial Forecasting Agent',
      avatar: '📊',
      status: 'active',
      confidenceScore: 94,
      insuranceImpactScore: 90,
      metrics: {
        applicationsEvaluated: 84200,
        riskAccuracy: 94,
        premiumOptimization: '+14%',
      },
      activeInsights: 67,
      trend: 'up',
    },
  ];

  // Policies
  const policies: Policy[] = [
    { id: '1', policyNumber: 'POL-2024-001', customer: 'Acme Corp', type: 'Commercial Property', value: '$2.4M', status: 'active', startDate: '2024-01-01', endDate: '2025-01-01' },
    { id: '2', policyNumber: 'POL-2024-002', customer: 'Tech Solutions Inc', type: 'General Liability', value: '$1.8M', status: 'active', startDate: '2024-02-15', endDate: '2025-02-15' },
    { id: '3', policyNumber: 'POL-2024-003', customer: 'Global Logistics', type: 'Cargo Insurance', value: '$3.2M', status: 'pending', startDate: '2024-03-01', endDate: '2025-03-01' },
  ];

  // Claims
  const claims: Claim[] = [
    { id: '1', claimNumber: 'CLM-2024-001', policyNumber: 'POL-2024-001', customer: 'Acme Corp', type: 'Property Damage', amount: '$125,000', status: 'investigating', dateSubmitted: '2024-01-15' },
    { id: '2', claimNumber: 'CLM-2024-002', policyNumber: 'POL-2024-002', customer: 'Tech Solutions Inc', type: 'Liability', amount: '$85,000', status: 'approved', dateSubmitted: '2024-02-20' },
    { id: '3', claimNumber: 'CLM-2024-003', policyNumber: 'POL-2024-001', customer: 'Acme Corp', type: 'Business Interruption', amount: '$340,000', status: 'open', dateSubmitted: '2024-03-10' },
  ];

  // Fraud Cases
  const fraudCases: FraudCase[] = [
    { id: '1', caseNumber: 'FRD-2024-001', claimNumber: 'CLM-2024-004', riskScore: 94, status: 'investigating', amountAtRisk: '$180,000', detectionDate: '2024-01-20' },
    { id: '2', caseNumber: 'FRD-2024-002', claimNumber: 'CLM-2024-005', riskScore: 87, status: 'confirmed', amountAtRisk: '$65,000', detectionDate: '2024-02-25' },
    { id: '3', caseNumber: 'FRD-2024-003', claimNumber: 'CLM-2024-006', riskScore: 72, status: 'dismissed', amountAtRisk: '$42,000', detectionDate: '2024-03-05' },
  ];

  // Underwriting Applications
  const underwritingApplications: UnderwritingApplication[] = [
    { id: '1', applicationNumber: 'APP-2024-001', customer: 'Innovate Tech', type: 'Professional Liability', riskScore: 45, recommendedPremium: '$48,000', status: 'assessing' },
    { id: '2', applicationNumber: 'APP-2024-002', customer: 'Metro Construction', type: 'Workers Comp', riskScore: 62, recommendedPremium: '$156,000', status: 'underwriting' },
    { id: '3', applicationNumber: 'APP-2024-003', customer: 'Healthcare Plus', type: 'Medical Malpractice', riskScore: 78, recommendedPremium: '$285,000', status: 'approved' },
  ];

  // Insurance Insights
  const insuranceInsights: InsuranceInsight[] = [
    { id: '1', insight: 'Commercial property claims frequency increased 14% in Q1, requiring premium adjustment.', category: 'Claims Analytics', confidence: 94, impact: 'high', timestamp: '2h ago' },
    { id: '2', insight: 'High-value customer segment shows elevated retention risk - proactive outreach recommended.', category: 'Customer Intelligence', confidence: 89, impact: 'high', timestamp: '4h ago' },
    { id: '3', insight: 'Fraud detection model identified unusual claim patterns in auto insurance segment.', category: 'Fraud Detection', confidence: 96, impact: 'high', timestamp: '6h ago' },
    { id: '4', insight: 'Premium pricing adjustment recommended for coastal regions due to climate risk models.', category: 'Underwriting', confidence: 87, impact: 'medium', timestamp: '8h ago' },
    { id: '5', insight: 'Reserve adequacy forecast below target threshold for workers compensation line.', category: 'Actuarial', confidence: 92, impact: 'high', timestamp: '10h ago' },
  ];

  // Insurance Activities
  const insuranceActivities: InsuranceActivity[] = [
    { id: '1', event: 'Policy issued - POL-2024-004', type: 'policy', timestamp: '2m ago', details: 'Commercial Auto - $85,000 premium' },
    { id: '2', event: 'Claim submitted - CLM-2024-007', type: 'claim', timestamp: '15m ago', details: 'Property Damage - $45,000' },
    { id: '3', event: 'Claim approved - CLM-2024-002', type: 'claim', timestamp: '32m ago', details: 'Liability - $85,000 settlement' },
    { id: '4', event: 'Fraud alert generated - FRD-2024-004', type: 'fraud', timestamp: '1h ago', details: 'Risk score: 91 - $120,000 at risk' },
    { id: '5', event: 'Risk assessment completed - APP-2024-004', type: 'underwriting', timestamp: '2h ago', details: 'Risk score: 52 - Premium: $62,000' },
    { id: '6', event: 'Compliance event triggered - Audit', type: 'compliance', timestamp: '3h ago', details: 'Regulatory reporting deadline approaching' },
    { id: '7', event: 'Customer renewal completed - POL-2024-005', type: 'customer', timestamp: '4h ago', details: 'Renewal rate: 94% - Premium: +8%' },
  ];

  // System Health
  const systemHealth: SystemHealth[] = [
    { id: '1', system: 'Policy Administration System', status: 'healthy', uptime: '99.9%', latency: '45ms' },
    { id: '2', system: 'Claims Processing Platform', status: 'healthy', uptime: '99.8%', latency: '52ms' },
    { id: '3', system: 'Underwriting Engine', status: 'healthy', uptime: '99.7%', latency: '38ms' },
    { id: '4', system: 'Fraud Detection System', status: 'healthy', uptime: '99.9%', latency: '28ms' },
    { id: '5', system: 'Data Pipelines', status: 'healthy', uptime: '99.6%', latency: '67ms' },
    { id: '6', system: 'AI Agents', status: 'healthy', uptime: '99.8%', latency: '42ms' },
    { id: '7', system: 'Regulatory Reporting Systems', status: 'healthy', uptime: '99.5%', latency: '89ms' },
  ];

  // Render Functions
  const renderKPICard = (kpi: InsuranceKPI) => (
    <View key={kpi.id} style={[styles.kpiCard, { backgroundColor: theme.colors.card, borderColor: kpi.color + '30' }]}>
      <View style={styles.kpiHeader}>
        <Text style={[styles.kpiTitle, { color: theme.colors.text }]}>{kpi.title}</Text>
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
      <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
      <Text style={[styles.kpiSubtitle, { color: theme.colors.textSecondary }]}>{kpi.subtitle}</Text>
    </View>
  );

  const renderAgentCard = (agent: InsuranceAgent) => (
    <View key={agent.id} style={[styles.agentCard, { backgroundColor: theme.colors.card, borderColor: agent.status === 'active' ? '#06B6D4' + '30' : '#6B7280' + '30' }]}>
      <View style={styles.agentAvatar}>
        <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
        <View style={[
          styles.agentStatusDot,
          { backgroundColor: agent.status === 'active' ? '#10B981' : agent.status === 'error' ? '#EF4444' : '#6B7280' }
        ]} />
      </View>
      <View style={styles.agentInfo}>
        <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
        <Text style={[styles.agentSpecialty, { color: theme.colors.textSecondary }]}>{agent.specialty}</Text>
      </View>
      <View style={styles.agentMetrics}>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#06B6D4' }]}>{agent.confidenceScore}%</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
        </View>
        <View style={styles.agentMetric}>
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.insuranceImpactScore}</Text>
          <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
        </View>
      </View>
      <View style={styles.agentInsights}>
        <Text style={[styles.agentInsightsCount, { color: '#8B5CF6' }]}>{agent.activeInsights}</Text>
        <Text style={[styles.agentInsightsLabel, { color: theme.colors.textSecondary }]}>Insights</Text>
      </View>
    </View>
  );

  const renderPolicyCard = (policy: Policy) => (
    <View key={policy.id} style={[styles.policyCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.policyHeader}>
        <FileShield size={20} color="#06B6D4" />
        <View style={styles.policyInfo}>
          <Text style={[styles.policyNumber, { color: theme.colors.text }]}>{policy.policyNumber}</Text>
          <Text style={[styles.policyCustomer, { color: theme.colors.textSecondary }]}>{policy.customer}</Text>
        </View>
      </View>
      <View style={styles.policyMetrics}>
        <View style={styles.policyMetric}>
          <Text style={[styles.policyMetricValue, { color: '#10B981' }]}>{policy.value}</Text>
          <Text style={[styles.policyMetricLabel, { color: theme.colors.textSecondary }]}>Coverage</Text>
        </View>
        <View style={styles.policyMetric}>
          <Text style={[styles.policyMetricValue, { color: '#06B6D4' }]}>{policy.type}</Text>
          <Text style={[styles.policyMetricLabel, { color: theme.colors.textSecondary }]}>Type</Text>
        </View>
      </View>
      <View style={[styles.policyStatusBadge, { backgroundColor: policy.status === 'active' ? 'rgba(16, 185, 129, 0.15)' : policy.status === 'pending' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
        <Text style={[styles.policyStatusText, { color: policy.status === 'active' ? '#10B981' : policy.status === 'pending' ? '#F59E0B' : '#EF4444' }]}>{policy.status}</Text>
      </View>
    </View>
  );

  const renderClaimCard = (claim: Claim) => (
    <View key={claim.id} style={[styles.claimCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.claimHeader}>
        <AlertTriangle size={20} color="#F59E0B" />
        <View style={styles.claimInfo}>
          <Text style={[styles.claimNumber, { color: theme.colors.text }]}>{claim.claimNumber}</Text>
          <Text style={[styles.claimCustomer, { color: theme.colors.textSecondary }]}>{claim.customer}</Text>
        </View>
      </View>
      <View style={styles.claimMetrics}>
        <View style={styles.claimMetric}>
          <Text style={[styles.claimMetricValue, { color: '#EF4444' }]}>{claim.amount}</Text>
          <Text style={[styles.claimMetricLabel, { color: theme.colors.textSecondary }]}>Claim Amount</Text>
        </View>
        <View style={styles.claimMetric}>
          <Text style={[styles.claimMetricValue, { color: '#06B6D4' }]}>{claim.type}</Text>
          <Text style={[styles.claimMetricLabel, { color: theme.colors.textSecondary }]}>Type</Text>
        </View>
      </View>
      <View style={[styles.claimStatusBadge, { backgroundColor: claim.status === 'approved' ? 'rgba(16, 185, 129, 0.15)' : claim.status === 'investigating' ? 'rgba(245, 158, 11, 0.15)' : claim.status === 'open' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(239, 68, 68, 0.15)' }]}>
        <Text style={[styles.claimStatusText, { color: claim.status === 'approved' ? '#10B981' : claim.status === 'investigating' ? '#F59E0B' : claim.status === 'open' ? '#06B6D4' : '#EF4444' }]}>{claim.status}</Text>
      </View>
    </View>
  );

  const renderFraudCard = (fraud: FraudCase) => (
    <View key={fraud.id} style={[styles.fraudCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.fraudHeader}>
        <ShieldCheck size={20} color="#EF4444" />
        <View style={styles.fraudInfo}>
          <Text style={[styles.fraudNumber, { color: theme.colors.text }]}>{fraud.caseNumber}</Text>
          <Text style={[styles.fraudClaim, { color: theme.colors.textSecondary }]}>{fraud.claimNumber}</Text>
        </View>
      </View>
      <View style={styles.fraudMetrics}>
        <View style={styles.fraudMetric}>
          <Text style={[styles.fraudMetricValue, { color: fraud.riskScore >= 90 ? '#EF4444' : fraud.riskScore >= 70 ? '#F59E0B' : '#10B981' }]}>{fraud.riskScore}</Text>
          <Text style={[styles.fraudMetricLabel, { color: theme.colors.textSecondary }]}>Risk Score</Text>
        </View>
        <View style={styles.fraudMetric}>
          <Text style={[styles.fraudMetricValue, { color: '#EC4899' }]}>{fraud.amountAtRisk}</Text>
          <Text style={[styles.fraudMetricLabel, { color: theme.colors.textSecondary }]}>At Risk</Text>
        </View>
      </View>
      <View style={[styles.fraudStatusBadge, { backgroundColor: fraud.status === 'confirmed' ? 'rgba(239, 68, 68, 0.15)' : fraud.status === 'investigating' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)' }]}>
        <Text style={[styles.fraudStatusText, { color: fraud.status === 'confirmed' ? '#EF4444' : fraud.status === 'investigating' ? '#F59E0B' : '#10B981' }]}>{fraud.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#0B0F14' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderBottomColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Shield size={32} color="#06B6D4" />
            <View style={styles.headerTitle}>
              <Text style={[styles.headerTitleText, { color: '#FFFFFF' }]}>AI Insurance & Risk Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Autonomous Insurance Operations & Risk Intelligence</Text>
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
        <View style={[styles.sidebar, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderRightColor: 'rgba(255,255,255,0.1)' }]}>
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
                      isActive && { backgroundColor: 'rgba(6, 182, 212, 0.15)' }
                    ]}
                    onPress={() => setActiveTab(item.id)}
                  >
                    <Icon 
                      size={18} 
                      color={isActive ? '#06B6D4' : 'rgba(255,255,255,0.6)'} 
                    />
                    <Text style={[
                      styles.sidebarItemText,
                      { color: isActive ? '#06B6D4' : 'rgba(255,255,255,0.6)' }
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
        
        {/* Top Executive Bar - Prominent KPI Display */}
        <View style={[styles.topExecutiveBar, { backgroundColor: 'rgba(6, 182, 212, 0.08)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <View style={styles.topBarHeader}>
            <View style={styles.topBarTitle}>
              <TrendingUpIcon size={20} color="#06B6D4" />
              <Text style={[styles.topBarTitleText, { color: '#FFFFFF' }]}>Insurance Executive Overview</Text>
            </View>
            <Text style={[styles.topBarPeriod, { color: 'rgba(255,255,255,0.6)' }]}>Last 24 hours</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topBarScroll}>
            <View style={styles.topBarKPIs}>
              {insuranceKPIs.slice(0, 5).map((kpi) => (
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

        {/* Insurance KPIs */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Insurance KPIs</Text>
          <View style={styles.kpiGrid}>
            {insuranceKPIs.map(renderKPICard)}
          </View>
        </View>

        {/* AI Insurance Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insurance Agents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {insuranceAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* Chief Risk Officer Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Chief Risk Officer Command Center</Text>
          <View style={[styles.commandCenter, { backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            
            {/* Command Center Header */}
            <View style={styles.commandCenterHeader}>
              <View style={styles.commandCenterTitle}>
                <Brain size={24} color="#06B6D4" />
                <View>
                  <Text style={[styles.commandCenterTitleText, { color: '#FFFFFF' }]}>Insurance Intelligence Hub</Text>
                  <Text style={[styles.commandCenterSubtitle, { color: 'rgba(255,255,255,0.6)' }]}>Real-time insurance operations monitoring</Text>
                </View>
              </View>
              <View style={styles.commandCenterActions}>
                <TouchableOpacity style={[styles.commandCenterButton, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <RefreshCw size={16} color="#06B6D4" />
                  <Text style={[styles.commandCenterButtonText, { color: '#06B6D4' }]}>Refresh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.commandCenterButton, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <Download size={16} color="rgba(255,255,255,0.7)" />
                  <Text style={[styles.commandCenterButtonText, { color: 'rgba(255,255,255,0.7)' }]}>Export</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Primary Metrics Grid */}
            <View style={styles.commandCenterMetrics}>
              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(6, 182, 212, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <DollarSign size={20} color="#06B6D4" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Gross Written Premium</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#06B6D4' }]}>$4.8B</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+12.4%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Annual GWP</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <FileShield size={20} color="#10B981" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Active Policies</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#10B981' }]}>2.4M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+8.7%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Policies in force</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <AlertTriangle size={20} color="#F59E0B" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Claims Ratio</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#F59E0B' }]}>61%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingDown size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>-2.3%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Loss ratio</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <Calculator size={20} color="#8B5CF6" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Combined Ratio</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#8B5CF6' }]}>92%</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingDown size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>-1.8%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Underwriting profit</Text>
                </View>
              </View>

              <View style={[styles.commandMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(236, 72, 153, 0.3)' }]}>
                <View style={styles.commandMetricHeader}>
                  <ShieldCheck size={20} color="#EC4899" />
                  <Text style={[styles.commandMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Fraud Savings</Text>
                </View>
                <Text style={[styles.commandMetricValue, { color: '#EC4899' }]}>$84M</Text>
                <View style={styles.commandMetricTrend}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.commandMetricTrendText, { color: '#10B981' }]}>+18.2%</Text>
                  <Text style={[styles.commandMetricPeriod, { color: 'rgba(255,255,255,0.5)' }]}>Annual savings</Text>
                </View>
              </View>
            </View>

            {/* Insurance Health Overview */}
            <View style={styles.commandCenterHealth}>
              <View style={styles.healthOverview}>
                <Text style={[styles.healthOverviewTitle, { color: '#FFFFFF' }]}>Insurance Portfolio Health</Text>
                <View style={styles.healthScoreContainer}>
                  <Text style={[styles.healthScore, { color: '#10B981' }]}>91%</Text>
                  <View style={styles.healthScoreIndicator}>
                    <View style={[styles.healthScoreBar, { width: '91%', backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <Text style={[styles.healthScoreDescription, { color: 'rgba(255,255,255,0.6)' }]}>Excellent - All insurance systems optimal</Text>
              </View>

              <View style={styles.healthBreakdown}>
                <Text style={[styles.healthBreakdownTitle, { color: '#FFFFFF' }]}>Health Breakdown</Text>
                <View style={styles.healthBreakdownItems}>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Underwriting</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#06B6D4' }]}>94%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Claims</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#10B981' }]}>89%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#8B5CF6' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Risk</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#8B5CF6' }]}>92%</Text>
                  </View>
                  <View style={styles.healthBreakdownItem}>
                    <View style={[styles.healthBreakdownDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.healthBreakdownLabel, { color: 'rgba(255,255,255,0.7)' }]}>Compliance</Text>
                    <Text style={[styles.healthBreakdownValue, { color: '#F59E0B' }]}>95%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Premium Trend Visualization */}
            <View style={styles.growthTrendSection}>
              <View style={styles.growthTrendHeader}>
                <LineChart size={16} color="#06B6D4" />
                <Text style={[styles.growthTrendTitle, { color: '#FFFFFF' }]}>Premium Growth Trend</Text>
              </View>
              <View style={styles.growthTrendVisualization}>
                <View style={styles.growthTrendBars}>
                  {[
                    { month: 'Jan', value: 72 },
                    { month: 'Feb', value: 78 },
                    { month: 'Mar', value: 82 },
                    { month: 'Apr', value: 85 },
                    { month: 'May', value: 88 },
                    { month: 'Jun', value: 91 },
                  ].map((data, index) => (
                    <View key={index} style={styles.growthTrendBar}>
                      <View style={[
                        styles.growthTrendBarFill,
                        { 
                          height: `${data.value}%`,
                          backgroundColor: data.value >= 90 ? '#10B981' : data.value >= 85 ? '#06B6D4' : '#F59E0B'
                        }
                      ]} />
                      <Text style={[styles.growthTrendLabel, { color: 'rgba(255,255,255,0.6)' }]}>{data.month}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Portfolio Composition */}
            <View style={styles.revenueAttribution}>
              <View style={styles.revenueAttributionHeader}>
                <PieChartIcon size={16} color="#EC4899" />
                <Text style={[styles.revenueAttributionTitle, { color: '#FFFFFF' }]}>Portfolio Composition by Line of Business</Text>
              </View>
              <View style={styles.revenueAttributionList}>
                {[
                  { feature: 'Commercial Property', value: '$1.8B', percentage: 38, color: '#06B6D4' },
                  { feature: 'General Liability', value: '$1.2B', percentage: 25, color: '#10B981' },
                  { feature: 'Workers Compensation', value: '$0.9B', percentage: 19, color: '#8B5CF6' },
                  { feature: 'Auto Insurance', value: '$0.5B', percentage: 10, color: '#F59E0B' },
                  { feature: 'Other Lines', value: '$0.4B', percentage: 8, color: '#EC4899' },
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

        {/* Underwriting Intelligence Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Underwriting Intelligence Hub</Text>
          <View style={[styles.underwritingHub, { backgroundColor: theme.colors.card }]}>
            <View style={styles.underwritingHeader}>
              <FileCheck size={20} color="#06B6D4" />
              <Text style={[styles.underwritingTitle, { color: '#FFFFFF' }]}>Underwriting Workflow</Text>
            </View>
            
            <View style={styles.underwritingWorkflow}>
              {[
                { step: 'Application Received', icon: FileText, status: 'completed' },
                { step: 'AI Risk Assessment', icon: Brain, status: 'completed' },
                { step: 'Underwriting Review', icon: FileCheck, status: 'active' },
                { step: 'Pricing Optimization', icon: Calculator, status: 'pending' },
                { step: 'Approval', icon: CheckCircle, status: 'pending' },
                { step: 'Policy Issued', icon: FileShield, status: 'pending' },
              ].map((item, index) => (
                <View key={index} style={styles.workflowStep}>
                  <View style={[
                    styles.workflowStepIcon,
                    { backgroundColor: item.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' : item.status === 'active' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.1)' }
                  ]}>
                    <item.icon size={16} color={item.status === 'completed' ? '#10B981' : item.status === 'active' ? '#06B6D4' : 'rgba(255,255,255,0.4)'} />
                  </View>
                  <Text style={[
                    styles.workflowStepText,
                    { color: item.status === 'completed' ? '#10B981' : item.status === 'active' ? '#06B6D4' : 'rgba(255,255,255,0.4)' }
                  ]}>{item.step}</Text>
                  {index < 5 && <View style={[styles.workflowConnector, { backgroundColor: item.status === 'completed' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.1)' }]} />}
                </View>
              ))}
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.applicationsScroll}>
              {underwritingApplications.map((app) => (
                <View key={app.id} style={[styles.applicationCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                  <Text style={[styles.applicationNumber, { color: theme.colors.text }]}>{app.applicationNumber}</Text>
                  <Text style={[styles.applicationCustomer, { color: theme.colors.textSecondary }]}>{app.customer}</Text>
                  <Text style={[styles.applicationType, { color: '#06B6D4' }]}>{app.type}</Text>
                  <View style={styles.applicationRisk}>
                    <Text style={[styles.applicationRiskLabel, { color: theme.colors.textSecondary }]}>Risk Score</Text>
                    <Text style={[styles.applicationRiskValue, { color: app.riskScore >= 70 ? '#EF4444' : app.riskScore >= 50 ? '#F59E0B' : '#10B981' }]}>{app.riskScore}</Text>
                  </View>
                  <View style={styles.applicationPremium}>
                    <Text style={[styles.applicationPremiumLabel, { color: theme.colors.textSecondary }]}>Premium</Text>
                    <Text style={[styles.applicationPremiumValue, { color: '#10B981' }]}>{app.recommendedPremium}</Text>
                  </View>
                  <View style={[styles.applicationStatusBadge, { backgroundColor: app.status === 'approved' ? 'rgba(16, 185, 129, 0.15)' : app.status === 'underwriting' ? 'rgba(6, 182, 212, 0.15)' : app.status === 'assessing' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.1)' }]}>
                    <Text style={[styles.applicationStatusText, { color: app.status === 'approved' ? '#10B981' : app.status === 'underwriting' ? '#06B6D4' : app.status === 'assessing' ? '#F59E0B' : 'rgba(255,255,255,0.6)' }]}>{app.status}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Policy Management Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Policy Management Center</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.policiesScroll}>
            {policies.map(renderPolicyCard)}
          </ScrollView>
        </View>

        {/* Claims Operations Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Claims Operations Command Center</Text>
          <View style={[styles.claimsCenter, { backgroundColor: theme.colors.card }]}>
            <View style={styles.claimsMetrics}>
              <View style={[styles.claimsMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.claimsMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Open Claims</Text>
                <Text style={[styles.claimsMetricValue, { color: '#EF4444' }]}>42,800</Text>
              </View>
              <View style={[styles.claimsMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.claimsMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Settled Claims</Text>
                <Text style={[styles.claimsMetricValue, { color: '#10B981' }]}>124,500</Text>
              </View>
              <View style={[styles.claimsMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.claimsMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Avg Processing Time</Text>
                <Text style={[styles.claimsMetricValue, { color: '#06B6D4' }]}>4.2 days</Text>
              </View>
              <View style={[styles.claimsMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.claimsMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Automation Rate</Text>
                <Text style={[styles.claimsMetricValue, { color: '#8B5CF6' }]}>92%</Text>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.claimsListScroll}>
              {claims.map(renderClaimCard)}
            </ScrollView>
          </View>
        </View>

        {/* Fraud Detection & Investigation Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Fraud Detection & Investigation Hub</Text>
          <View style={[styles.fraudHub, { backgroundColor: theme.colors.card }]}>
            <View style={styles.fraudMetrics}>
              <View style={[styles.fraudMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.fraudMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Suspicious Claims</Text>
                <Text style={[styles.fraudMetricValue, { color: '#F59E0B' }]}>1,842</Text>
              </View>
              <View style={[styles.fraudMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.fraudMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Confirmed Fraud</Text>
                <Text style={[styles.fraudMetricValue, { color: '#EF4444' }]}>324</Text>
              </View>
              <View style={[styles.fraudMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.fraudMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Fraud Prevented</Text>
                <Text style={[styles.fraudMetricValue, { color: '#10B981' }]}>$42M</Text>
              </View>
              <View style={[styles.fraudMetricCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
                <Text style={[styles.fraudMetricLabel, { color: 'rgba(255,255,255,0.7)' }]}>Detection Accuracy</Text>
                <Text style={[styles.fraudMetricValue, { color: '#06B6D4' }]}>96%</Text>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fraudListScroll}>
              {fraudCases.map(renderFraudCard)}
            </ScrollView>
          </View>
        </View>

        {/* Enterprise Risk Analytics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Risk Analytics</Text>
          <View style={[styles.riskAnalytics, { backgroundColor: theme.colors.card }]}>
            <View style={styles.riskGrid}>
              {[
                { title: 'Catastrophic Risk', value: 'High', color: '#EF4444', trend: '+5%' },
                { title: 'Market Risk', value: 'Medium', color: '#F59E0B', trend: '-2%' },
                { title: 'Operational Risk', value: 'Low', color: '#10B981', trend: '-8%' },
                { title: 'Customer Risk', value: 'Medium', color: '#F59E0B', trend: '+3%' },
                { title: 'Geographic Exposure', value: 'Low', color: '#10B981', trend: '-4%' },
              ].map((risk, index) => (
                <View key={index} style={[styles.riskCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: risk.color + '30' }]}>
                  <Text style={[styles.riskTitle, { color: theme.colors.text }]}>{risk.title}</Text>
                  <Text style={[styles.riskValue, { color: risk.color }]}>{risk.value}</Text>
                  <View style={styles.riskTrend}>
                    <Text style={[styles.riskTrendText, { color: risk.trend.startsWith('+') ? '#EF4444' : '#10B981' }]}>{risk.trend}</Text>
                    <Text style={[styles.riskTrendLabel, { color: theme.colors.textSecondary }]}>Change</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Actuarial Intelligence Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Actuarial Intelligence Center</Text>
          <View style={[styles.actuarialCenter, { backgroundColor: theme.colors.card }]}>
            <View style={styles.actuarialGrid}>
              {[
                { title: 'Loss Forecast', value: '$1.2B', color: '#06B6D4', subtitle: 'Annual projection' },
                { title: 'Claim Frequency', value: '4.2%', color: '#F59E0B', subtitle: 'Monthly rate' },
                { title: 'Reserve Adequacy', value: '94%', color: '#10B981', subtitle: 'Coverage ratio' },
                { title: 'Profitability Forecast', value: '+12%', color: '#8B5CF6', subtitle: 'YoY growth' },
              ].map((item, index) => (
                <View key={index} style={[styles.actuarialCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: item.color + '30' }]}>
                  <Text style={[styles.actuarialTitle, { color: theme.colors.text }]}>{item.title}</Text>
                  <Text style={[styles.actuarialValue, { color: item.color }]}>{item.value}</Text>
                  <Text style={[styles.actuarialSubtitle, { color: theme.colors.textSecondary }]}>{item.subtitle}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Customer Intelligence Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Customer Intelligence Hub</Text>
          <View style={[styles.customerHub, { backgroundColor: theme.colors.card }]}>
            <View style={styles.customerGrid}>
              {[
                { title: 'Customer Lifetime Value', value: '$12,400', color: '#10B981', subtitle: 'Average CLV' },
                { title: 'Retention Risk', value: '8.2%', color: '#F59E0B', subtitle: 'At-risk customers' },
                { title: 'Satisfaction Score', value: '87', color: '#06B6D4', subtitle: 'CSAT score' },
                { title: 'Cross-Sell Opportunities', value: '18,420', color: '#8B5CF6', subtitle: 'Potential upsells' },
              ].map((item, index) => (
                <View key={index} style={[styles.customerCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: item.color + '30' }]}>
                  <Text style={[styles.customerTitle, { color: theme.colors.text }]}>{item.title}</Text>
                  <Text style={[styles.customerValue, { color: item.color }]}>{item.value}</Text>
                  <Text style={[styles.customerSubtitle, { color: theme.colors.textSecondary }]}>{item.subtitle}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Compliance & Regulatory Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Compliance & Regulatory Center</Text>
          <View style={[styles.complianceCenter, { backgroundColor: theme.colors.card }]}>
            <View style={styles.complianceGrid}>
              {[
                { title: 'Regulatory Compliance', value: '96%', color: '#10B981', subtitle: 'Compliance score' },
                { title: 'Audit Readiness', value: 'Ready', color: '#06B6D4', subtitle: 'Next audit: 45 days' },
                { title: 'Policy Compliance', value: '98%', color: '#8B5CF6', subtitle: 'Policy adherence' },
                { title: 'Licensing Status', value: 'Active', color: '#10B981', subtitle: 'All jurisdictions' },
              ].map((item, index) => (
                <View key={index} style={[styles.complianceCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: item.color + '30' }]}>
                  <Text style={[styles.complianceTitle, { color: theme.colors.text }]}>{item.title}</Text>
                  <Text style={[styles.complianceValue, { color: item.color }]}>{item.value}</Text>
                  <Text style={[styles.complianceSubtitle, { color: theme.colors.textSecondary }]}>{item.subtitle}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* AI Insurance Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insurance Insights</Text>
          <View style={[styles.insightsContainer, { backgroundColor: theme.colors.card }]}>
            {insuranceInsights.map((insight) => (
              <View key={insight.id} style={[styles.insightCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: insight.impact === 'high' ? '#EF4444' + '30' : insight.impact === 'medium' ? '#F59E0B' + '30' : '#10B981' + '30' }]}>
                <View style={styles.insightHeader}>
                  <Brain size={16} color={insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#10B981'} />
                  <Text style={[styles.insightCategory, { color: theme.colors.textSecondary }]}>{insight.category}</Text>
                  <View style={[styles.insightConfidence, { backgroundColor: 'rgba(6, 182, 212, 0.15)' }]}>
                    <Text style={[styles.insightConfidenceText, { color: '#06B6D4' }]}>{insight.confidence}%</Text>
                  </View>
                </View>
                <Text style={[styles.insightText, { color: theme.colors.text }]}>{insight.insight}</Text>
                <View style={styles.insightFooter}>
                  <Text style={[styles.insightTimestamp, { color: theme.colors.textSecondary }]}>{insight.timestamp}</Text>
                  <View style={[styles.insightImpactBadge, { backgroundColor: insight.impact === 'high' ? 'rgba(239, 68, 68, 0.15)' : insight.impact === 'medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)' }]}>
                    <Text style={[styles.insightImpactText, { color: insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#10B981' }]}>{insight.impact}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Real-Time Insurance Operations Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-Time Insurance Operations Feed</Text>
          <View style={[styles.operationsFeed, { backgroundColor: theme.colors.card }]}>
            {insuranceActivities.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[
                  styles.activityIcon,
                  { backgroundColor: activity.type === 'policy' ? 'rgba(16, 185, 129, 0.15)' : 
                                 activity.type === 'claim' ? 'rgba(239, 68, 68, 0.15)' :
                                 activity.type === 'fraud' ? 'rgba(245, 158, 11, 0.15)' :
                                 activity.type === 'underwriting' ? 'rgba(6, 182, 212, 0.15)' :
                                 activity.type === 'compliance' ? 'rgba(139, 92, 246, 0.15)' :
                                 activity.type === 'customer' ? 'rgba(236, 72, 153, 0.15)' :
                                 'rgba(255,255,255,0.1)' }
                ]}>
                  {activity.type === 'policy' ? <FileShield size={14} color="#10B981" /> :
                   activity.type === 'claim' ? <AlertTriangle size={14} color="#EF4444" /> :
                   activity.type === 'fraud' ? <ShieldCheck size={14} color="#F59E0B" /> :
                   activity.type === 'underwriting' ? <FileCheck size={14} color="#06B6D4" /> :
                   activity.type === 'compliance' ? <Scale size={14} color="#8B5CF6" /> :
                   activity.type === 'customer' ? <UserCheck size={14} color="#EC4899" /> :
                   <Activity size={14} color="rgba(255,255,255,0.6)" />}
                </View>
                <View style={styles.activityContent}>
                  <Text style={[styles.activityEvent, { color: theme.colors.text }]}>{activity.event}</Text>
                  {activity.details && <Text style={[styles.activityDetails, { color: theme.colors.textSecondary }]}>{activity.details}</Text>}
                  <Text style={[styles.activityTimestamp, { color: theme.colors.textSecondary }]}>{activity.timestamp}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Insurance Platform Health */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Insurance Platform Health</Text>
          <View style={styles.platformHealth}>
            {systemHealth.map((health) => (
              <View key={health.id} style={[styles.healthCard, { backgroundColor: theme.colors.card, borderColor: health.status === 'healthy' ? '#10B981' + '30' : health.status === 'degraded' ? '#F59E0B' + '30' : '#EF4444' + '30' }]}>
                <View style={styles.healthCardHeader}>
                  <View style={[
                    styles.healthStatusDot,
                    { backgroundColor: health.status === 'healthy' ? '#10B981' : health.status === 'degraded' ? '#F59E0B' : '#EF4444' }
                  ]} />
                  <Text style={[styles.healthSystemName, { color: theme.colors.text }]}>{health.system}</Text>
                </View>
                <View style={styles.healthCardMetrics}>
                  <View style={styles.healthCardMetric}>
                    <Text style={[styles.healthCardMetricValue, { color: '#10B981' }]}>{health.uptime}</Text>
                    <Text style={[styles.healthCardMetricLabel, { color: theme.colors.textSecondary }]}>Uptime</Text>
                  </View>
                  <View style={styles.healthCardMetric}>
                    <Text style={[styles.healthCardMetricValue, { color: '#06B6D4' }]}>{health.latency}</Text>
                    <Text style={[styles.healthCardMetricLabel, { color: theme.colors.textSecondary }]}>Latency</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
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
  headerTitle: {},
  headerTitleText: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
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
    paddingHorizontal: 16,
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
  },
  sidebarItemText: {
    fontSize: 14,
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
    marginBottom: 12,
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
  topBarScroll: {},
  topBarKPIs: {
    flexDirection: 'row',
    gap: 12,
  },
  topBarKPI: {
    borderRadius: 8,
    padding: 12,
    minWidth: 140,
    borderWidth: 1,
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
    fontSize: 10,
    fontWeight: '600',
  },
  topBarKPISubtitle: {
    fontSize: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    width: 'calc(20% - 10px)',
    minWidth: 180,
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
  kpiTrendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  kpiTrendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  kpiSubtitle: {
    fontSize: 11,
  },
  agentsScroll: {},
  agentCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    minWidth: 280,
    marginRight: 12,
  },
  agentAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  agentAvatarText: {
    fontSize: 24,
  },
  agentStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  agentInfo: {
    marginBottom: 12,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentSpecialty: {
    fontSize: 11,
  },
  agentMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  agentMetric: {},
  agentMetricValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  agentMetricLabel: {
    fontSize: 10,
  },
  agentInsights: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  agentInsightsCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  agentInsightsLabel: {
    fontSize: 10,
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
    fontWeight: '600',
  },
  commandCenterSubtitle: {
    fontSize: 12,
    marginTop: 2,
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
    borderRadius: 6,
  },
  commandCenterButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  commandCenterMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  commandMetricCard: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
  },
  commandMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  commandMetricLabel: {
    fontSize: 12,
  },
  commandMetricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  commandMetricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  commandMetricTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  commandMetricPeriod: {
    fontSize: 10,
  },
  commandCenterHealth: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  healthOverview: {
    flex: 1,
  },
  healthOverviewTitle: {
    fontSize: 14,
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
    fontSize: 11,
  },
  healthBreakdown: {
    flex: 1,
  },
  healthBreakdownTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  healthBreakdownItems: {
    gap: 12,
  },
  healthBreakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  healthBreakdownDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  healthBreakdownLabel: {
    flex: 1,
    fontSize: 12,
  },
  healthBreakdownValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  growthTrendSection: {
    marginBottom: 20,
  },
  growthTrendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  growthTrendTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  growthTrendVisualization: {},
  growthTrendBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 8,
  },
  growthTrendBar: {
    alignItems: 'center',
    width: 40,
  },
  growthTrendBarFill: {
    width: '100%',
    borderRadius: 4,
    marginBottom: 8,
  },
  growthTrendLabel: {
    fontSize: 10,
  },
  revenueAttribution: {},
  revenueAttributionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  revenueAttributionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  revenueAttributionList: {
    gap: 12,
  },
  revenueAttributionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  revenueAttributionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 180,
  },
  revenueAttributionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  revenueAttributionFeature: {
    fontSize: 12,
  },
  revenueAttributionMetrics: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  revenueAttributionRevenue: {
    fontSize: 12,
    fontWeight: '600',
    width: 60,
  },
  revenueAttributionBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  underwritingHub: {
    borderRadius: 12,
    padding: 20,
  },
  underwritingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  underwritingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  underwritingWorkflow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  workflowStep: {
    alignItems: 'center',
    position: 'relative',
  },
  workflowStepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  workflowStepText: {
    fontSize: 10,
    textAlign: 'center',
    width: 80,
  },
  workflowConnector: {
    position: 'absolute',
    top: 20,
    left: 40,
    width: 60,
    height: 2,
  },
  applicationsScroll: {},
  applicationCard: {
    borderRadius: 10,
    padding: 16,
    minWidth: 200,
    marginRight: 12,
  },
  applicationNumber: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  applicationCustomer: {
    fontSize: 11,
    marginBottom: 8,
  },
  applicationType: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
  },
  applicationRisk: {
    marginBottom: 8,
  },
  applicationRiskLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  applicationRiskValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  applicationPremium: {
    marginBottom: 8,
  },
  applicationPremiumLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  applicationPremiumValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  applicationStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  applicationStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  policiesScroll: {},
  policyCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    marginRight: 12,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  policyInfo: {},
  policyNumber: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  policyCustomer: {
    fontSize: 11,
  },
  policyMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  policyMetric: {},
  policyMetricValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  policyMetricLabel: {
    fontSize: 10,
  },
  policyStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  policyStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  claimsCenter: {
    borderRadius: 12,
    padding: 20,
  },
  claimsMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  claimsMetricCard: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
  },
  claimsMetricLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  claimsMetricValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  claimsListScroll: {},
  claimCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    marginRight: 12,
  },
  claimHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  claimInfo: {},
  claimNumber: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  claimCustomer: {
    fontSize: 11,
  },
  claimMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  claimMetric: {},
  claimMetricValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  claimMetricLabel: {
    fontSize: 10,
  },
  claimStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  claimStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  fraudHub: {
    borderRadius: 12,
    padding: 20,
  },
  fraudMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  fraudMetricCard: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
  },
  fraudMetricLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  fraudMetricValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  fraudListScroll: {},
  fraudCard: {
    borderRadius: 12,
    padding: 16,
    minWidth: 280,
    marginRight: 12,
  },
  fraudHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  fraudInfo: {},
  fraudNumber: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  fraudClaim: {
    fontSize: 11,
  },
  fraudMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  fraudMetric: {},
  fraudMetricValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  fraudMetricLabel: {
    fontSize: 10,
  },
  fraudStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  fraudStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  riskAnalytics: {
    borderRadius: 12,
    padding: 20,
  },
  riskGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  riskCard: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
  },
  riskTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  riskValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  riskTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  riskTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  riskTrendLabel: {
    fontSize: 10,
  },
  actuarialCenter: {
    borderRadius: 12,
    padding: 20,
  },
  actuarialGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actuarialCard: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
  },
  actuarialTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  actuarialValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  actuarialSubtitle: {
    fontSize: 10,
  },
  customerHub: {
    borderRadius: 12,
    padding: 20,
  },
  customerGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  customerCard: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
  },
  customerTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  customerValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  customerSubtitle: {
    fontSize: 10,
  },
  complianceCenter: {
    borderRadius: 12,
    padding: 20,
  },
  complianceGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  complianceCard: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
  },
  complianceTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  complianceValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  complianceSubtitle: {
    fontSize: 10,
  },
  insightsContainer: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  insightCard: {
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  insightCategory: {
    fontSize: 11,
    flex: 1,
  },
  insightConfidence: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  insightConfidenceText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightText: {
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insightTimestamp: {
    fontSize: 10,
  },
  insightImpactBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  operationsFeed: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityEvent: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDetails: {
    fontSize: 11,
    marginBottom: 2,
  },
  activityTimestamp: {
    fontSize: 10,
  },
  platformHealth: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthCard: {
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    width: 'calc(33.33% - 8px)',
    minWidth: 250,
  },
  healthCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  healthStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  healthSystemName: {
    fontSize: 13,
    fontWeight: '600',
  },
  healthCardMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  healthCardMetric: {},
  healthCardMetricValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  healthCardMetricLabel: {
    fontSize: 10,
  },
});

export default InsuranceCommandCenter;
