import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Scale,
  Gavel,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Briefcase,
  Globe,
  Building2,
  Users,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Bot,
  Settings,
  Home,
  ChevronRight,
  Search,
  Filter,
  MoreVertical,
  RefreshCw,
  Download,
  Share2,
  Eye,
  Bell,
  Plus,
  Minus,
  X,
  Save,
  Edit2,
  Trash2,
  Copy,
  LayoutDashboard,
  ClipboardList,
  Lock,
  Award,
  BookOpen,
  Zap,
  Star,
  Archive,
  FileCheck,
  BarChart3,
  Info,
} from 'lucide-react-native';

// Types
interface LegalAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  confidenceScore: number;
  contractsImpacted: number;
  productivityImpact: string;
  legalContribution: string;
  metrics: {
    contractsReviewed?: number;
    riskClausesDetected?: number;
    regulationsMonitored?: number;
    violationsPrevented?: number;
    legalReviewsCompleted?: number;
    researchQueriesResolved?: number;
  };
}

interface LegalKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface ContractLifecycleData {
  stage: string;
  count: number;
  value: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface ComplianceData {
  area: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  lastAudit: string;
}

interface RiskData {
  category: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  score: number;
  trend: 'up' | 'down' | 'stable';
}

interface RegulatoryData {
  region: string;
  newRegulations: number;
  upcomingDeadlines: number;
  complianceImpact: 'low' | 'medium' | 'high';
}

interface AuditData {
  type: 'internal' | 'external';
  status: 'in_progress' | 'completed' | 'scheduled';
  findings: number;
  remediationProgress: number;
}

interface PolicyData {
  name: string;
  status: 'active' | 'review' | 'outdated';
  acceptanceRate: number;
  lastUpdated: string;
}

interface PrivacyData {
  framework: string;
  complianceScore: number;
  requestsPending: number;
  breachRisk: 'low' | 'medium' | 'high';
}

interface LitigationData {
  caseId: string;
  type: string;
  status: 'active' | 'settled' | 'pending';
  value: number;
  outsideCounsel: string;
}

interface Insight {
  id: string;
  type: 'warning' | 'opportunity' | 'info' | 'success' | 'risk' | 'recommendation' | 'alert';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  confidence?: number;
}

interface LegalActivity {
  id: string;
  type: 'contract' | 'compliance' | 'audit' | 'policy' | 'regulation' | 'litigation' | 'risk';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  department?: string;
}

interface SystemHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'critical';
  uptime: number;
  lastCheck: string;
  metrics: {
    responseTime: number;
    errorRate: number;
  };
}

export default function LegalComplianceCommandCenter() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Executive KPIs
  const executiveKPIs: LegalKPI[] = [
    {
      id: 'compliance-score',
      title: 'Compliance Score',
      value: '97%',
      change: '+2%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'Overall compliance'
    },
    {
      id: 'open-legal-matters',
      title: 'Open Legal Matters',
      value: '124',
      change: '-8%',
      trend: 'down',
      color: '#10B981',
      subtitle: 'Active cases'
    },
    {
      id: 'active-contracts',
      title: 'Active Contracts',
      value: '14,382',
      change: '+12%',
      trend: 'up',
      color: '#3B82F6',
      subtitle: 'Under management'
    },
    {
      id: 'regulatory-alerts',
      title: 'Regulatory Alerts',
      value: '38',
      change: '+5',
      trend: 'up',
      color: '#F59E0B',
      subtitle: 'This month'
    },
    {
      id: 'audit-readiness',
      title: 'Audit Readiness',
      value: '94%',
      change: '+3%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'Prepared for audits'
    },
    {
      id: 'risk-exposure',
      title: 'Risk Exposure',
      value: 'Low',
      change: '-12%',
      trend: 'down',
      color: '#10B981',
      subtitle: 'Enterprise risk'
    },
    {
      id: 'policy-compliance',
      title: 'Policy Compliance',
      value: '96%',
      change: '+4%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'Governance metrics'
    },
    {
      id: 'privacy-score',
      title: 'Data Privacy Score',
      value: '98%',
      change: '+2%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'GDPR/CCPA compliance'
    },
    {
      id: 'litigation-cases',
      title: 'Litigation Cases',
      value: '28',
      change: '-3',
      trend: 'down',
      color: '#10B981',
      subtitle: 'Active lawsuits'
    },
    {
      id: 'contract-value',
      title: 'Contract Value',
      value: '$2.4B',
      change: '+18%',
      trend: 'up',
      color: '#3B82F6',
      subtitle: 'Under management'
    },
  ];

  // AI Legal Agents
  const legalAgents: LegalAgent[] = [
    {
      id: 'agent-lex',
      name: 'Agent Lex',
      role: 'Contract Intelligence Agent',
      avatar: '⚖️',
      status: 'online',
      confidenceScore: 98,
      contractsImpacted: 12842,
      productivityImpact: '+42%',
      legalContribution: '$4.2M',
      metrics: {
        contractsReviewed: 12842,
        riskClausesDetected: 3481,
      }
    },
    {
      id: 'agent-sentinel',
      name: 'Agent Sentinel',
      role: 'Compliance Monitoring Agent',
      avatar: '🛡️',
      status: 'online',
      confidenceScore: 97,
      contractsImpacted: 2340,
      productivityImpact: '+38%',
      legalContribution: '$2.8M',
      metrics: {
        regulationsMonitored: 2340,
        violationsPrevented: 812,
      }
    },
    {
      id: 'agent-juris',
      name: 'Agent Juris',
      role: 'Legal Research Agent',
      avatar: '📚',
      status: 'online',
      confidenceScore: 95,
      contractsImpacted: 4280,
      productivityImpact: '+35%',
      legalContribution: '$1.8M',
      metrics: {
        legalReviewsCompleted: 4280,
        researchQueriesResolved: 21400,
      }
    }
  ];

  // Contract Lifecycle Data
  const contractLifecycle: ContractLifecycleData[] = [
    { stage: 'Drafting', count: 342, value: 42000000, riskLevel: 'low' },
    { stage: 'Review', count: 528, value: 89000000, riskLevel: 'medium' },
    { stage: 'Negotiation', count: 284, value: 156000000, riskLevel: 'high' },
    { stage: 'Approval', count: 156, value: 68000000, riskLevel: 'medium' },
    { stage: 'Signature', count: 89, value: 34000000, riskLevel: 'low' },
    { stage: 'Renewal', count: 412, value: 280000000, riskLevel: 'high' },
  ];

  // Compliance Data
  const complianceData: ComplianceData[] = [
    { area: 'Regulatory Compliance', score: 97, trend: 'up', lastAudit: '2025-12-15' },
    { area: 'Internal Controls', score: 95, trend: 'up', lastAudit: '2025-12-10' },
    { area: 'Policy Adherence', score: 96, trend: 'stable', lastAudit: '2025-12-08' },
    { area: 'Data Privacy', score: 98, trend: 'up', lastAudit: '2025-12-01' },
    { area: 'Security Standards', score: 94, trend: 'up', lastAudit: '2025-11-28' },
  ];

  // Risk Data
  const riskData: RiskData[] = [
    { category: 'Operational Risk', level: 'low', score: 25, trend: 'down' },
    { category: 'Regulatory Risk', level: 'medium', score: 42, trend: 'stable' },
    { category: 'Legal Risk', level: 'low', score: 28, trend: 'down' },
    { category: 'Vendor Risk', level: 'medium', score: 38, trend: 'up' },
    { category: 'Privacy Risk', level: 'low', score: 22, trend: 'down' },
  ];

  // Regulatory Data
  const regulatoryData: RegulatoryData[] = [
    { region: 'United States', newRegulations: 12, upcomingDeadlines: 8, complianceImpact: 'medium' },
    { region: 'European Union', newRegulations: 8, upcomingDeadlines: 5, complianceImpact: 'high' },
    { region: 'United Kingdom', newRegulations: 6, upcomingDeadlines: 4, complianceImpact: 'medium' },
    { region: 'APAC', newRegulations: 10, upcomingDeadlines: 6, complianceImpact: 'medium' },
    { region: 'Global', newRegulations: 2, upcomingDeadlines: 15, complianceImpact: 'high' },
  ];

  // Audit Data
  const auditData: AuditData[] = [
    { type: 'internal', status: 'in_progress', findings: 12, remediationProgress: 67 },
    { type: 'external', status: 'scheduled', findings: 0, remediationProgress: 100 },
    { type: 'internal', status: 'completed', findings: 8, remediationProgress: 100 },
    { type: 'external', status: 'in_progress', findings: 5, remediationProgress: 45 },
  ];

  // Policy Data
  const policyData: PolicyData[] = [
    { name: 'Data Privacy Policy', status: 'active', acceptanceRate: 98, lastUpdated: '2025-11-15' },
    { name: 'Code of Conduct', status: 'active', acceptanceRate: 96, lastUpdated: '2025-10-20' },
    { name: 'Information Security', status: 'review', acceptanceRate: 94, lastUpdated: '2025-09-10' },
    { name: 'Anti-Corruption', status: 'active', acceptanceRate: 97, lastUpdated: '2025-08-05' },
    { name: 'Vendor Management', status: 'outdated', acceptanceRate: 89, lastUpdated: '2024-12-01' },
  ];

  // Privacy Data
  const privacyData: PrivacyData[] = [
    { framework: 'GDPR', complianceScore: 98, requestsPending: 142, breachRisk: 'low' },
    { framework: 'CCPA', complianceScore: 97, requestsPending: 89, breachRisk: 'low' },
    { framework: 'HIPAA', complianceScore: 96, requestsPending: 34, breachRisk: 'medium' },
    { framework: 'SOC 2', complianceScore: 95, requestsPending: 0, breachRisk: 'low' },
  ];

  // Litigation Data
  const litigationData: LitigationData[] = [
    { caseId: 'LIT-2025-001', type: 'Contract Dispute', status: 'active', value: 2400000, outsideCounsel: 'Smith & Associates' },
    { caseId: 'LIT-2025-002', type: 'IP Infringement', status: 'active', value: 5800000, outsideCounsel: 'Jones Legal Group' },
    { caseId: 'LIT-2025-003', type: 'Employment', status: 'settled', value: 450000, outsideCounsel: 'Brown & Partners' },
    { caseId: 'LIT-2025-004', type: 'Regulatory', status: 'pending', value: 1200000, outsideCounsel: 'Davis Law Firm' },
  ];

  // AI Insights
  const aiInsights: Insight[] = [
    {
      id: '1',
      type: 'risk',
      title: '14 contracts contain high-risk indemnification clauses',
      description: 'Review recommended for contracts with indemnification clauses exceeding standard thresholds. Potential exposure estimated at $2.4M.',
      impact: 'high',
      actionable: true,
      confidence: 92
    },
    {
      id: '2',
      type: 'alert',
      title: 'New regulation impacts customer onboarding workflow',
      description: 'EU Data Act changes require updates to customer data collection processes. Compliance deadline: March 2026.',
      impact: 'high',
      actionable: true,
      confidence: 95
    },
    {
      id: '3',
      type: 'warning',
      title: 'Privacy compliance gap detected in EU operations',
      description: 'GDPR compliance score dropped by 2% in EU region due to new data processing activities. Immediate review recommended.',
      impact: 'medium',
      actionable: true,
      confidence: 88
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Vendor agreement renewal requires legal review',
      description: '12 vendor contracts expiring in Q1 2026 contain auto-renewal clauses. Legal review recommended before renewal deadline.',
      impact: 'medium',
      actionable: true,
      confidence: 91
    },
    {
      id: '5',
      type: 'alert',
      title: 'Audit readiness score dropped by 4%',
      description: 'Internal audit readiness decreased due to outstanding documentation gaps. Remediation required before external audit.',
      impact: 'high',
      actionable: true,
      confidence: 89
    },
  ];

  // Legal Activity Feed
  const legalActivities: LegalActivity[] = [
    {
      id: '1',
      type: 'contract',
      title: 'Contract approved',
      description: 'Enterprise software agreement with TechCorp approved',
      timestamp: '2 minutes ago',
      user: 'Agent Lex',
    },
    {
      id: '2',
      type: 'compliance',
      title: 'Regulation updated',
      description: 'EU Data Act changes published in official journal',
      timestamp: '15 minutes ago',
      user: 'Agent Sentinel',
    },
    {
      id: '3',
      type: 'audit',
      title: 'Audit finding created',
      description: 'Internal audit identified 3 control gaps in AP process',
      timestamp: '1 hour ago',
      user: 'System',
    },
    {
      id: '4',
      type: 'policy',
      title: 'Policy accepted',
      description: '124 employees completed Data Privacy Policy training',
      timestamp: '2 hours ago',
      user: 'System',
    },
    {
      id: '5',
      type: 'compliance',
      title: 'Compliance alert triggered',
      description: 'Vendor risk score exceeded threshold for Global Services Inc',
      timestamp: '3 hours ago',
      user: 'Agent Sentinel',
    },
    {
      id: '6',
      type: 'contract',
      title: 'Legal review completed',
      description: 'MSA review for CloudTech Partners completed with 2 recommended changes',
      timestamp: '4 hours ago',
      user: 'Agent Juris',
    },
    {
      id: '7',
      type: 'risk',
      title: 'Risk assessment generated',
      description: 'Quarterly enterprise risk assessment completed',
      timestamp: '5 hours ago',
      user: 'System',
    },
  ];

  // System Health
  const systemHealth: SystemHealth[] = [
    { name: 'Contract Management System', status: 'healthy', uptime: 99.9, lastCheck: '2 min ago', metrics: { responseTime: 120, errorRate: 0.01 } },
    { name: 'Compliance Platform', status: 'healthy', uptime: 99.8, lastCheck: '2 min ago', metrics: { responseTime: 150, errorRate: 0.02 } },
    { name: 'Document Repository', status: 'healthy', uptime: 99.9, lastCheck: '2 min ago', metrics: { responseTime: 180, errorRate: 0.01 } },
    { name: 'Identity Systems', status: 'healthy', uptime: 99.7, lastCheck: '2 min ago', metrics: { responseTime: 200, errorRate: 0.03 } },
    { name: 'Regulatory Data Feeds', status: 'degraded', uptime: 98.5, lastCheck: '5 min ago', metrics: { responseTime: 450, errorRate: 0.08 } },
    { name: 'AI Agent Health', status: 'healthy', uptime: 99.9, lastCheck: '1 min ago', metrics: { responseTime: 100, errorRate: 0.01 } },
    { name: 'Workflow Automation', status: 'healthy', uptime: 99.8, lastCheck: '2 min ago', metrics: { responseTime: 130, errorRate: 0.02 } },
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Legal Agents', icon: Bot },
    { id: 'contracts', label: 'Contracts', icon: FileText },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'risk', label: 'Risk Management', icon: AlertTriangle },
    { id: 'policies', label: 'Policies', icon: BookOpen },
    { id: 'audits', label: 'Audits', icon: ClipboardList },
    { id: 'regulatory', label: 'Regulatory Intelligence', icon: Globe },
    { id: 'litigation', label: 'Litigation', icon: Gavel },
    { id: 'privacy', label: 'Privacy & Security', icon: Lock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
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
        return '#10B981';
      case 'offline':
      case 'critical':
        return '#EF4444';
      case 'busy':
      case 'degraded':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={20} color="#F59E0B" />;
      case 'opportunity':
        return <TrendingUp size={20} color="#10B981" />;
      case 'info':
        return <Info size={20} color="#3B82F6" />;
      case 'success':
        return <CheckCircle size={20} color="#10B981" />;
      case 'risk':
        return <AlertTriangle size={20} color="#EF4444" />;
      case 'recommendation':
        return <Star size={20} color="#8B5CF6" />;
      case 'alert':
        return <Bell size={20} color="#EF4444" />;
      default:
        return <Info size={20} color="#6B7280" />;
    }
  };

  const renderKPICard = (kpi: LegalKPI) => (
    <View key={kpi.id} style={[styles.kpiCard, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: kpi.color + '30', borderWidth: 1 }]}>
      <View style={styles.kpiHeader}>
        <Text style={[styles.kpiTitle, { color: 'rgba(255, 255, 255, 0.7)' }]}>{kpi.title}</Text>
        {getTrendIcon(kpi.trend)}
      </View>
      <Text style={[styles.kpiValue, { color: kpi.color }]}>{kpi.value}</Text>
      <View style={styles.kpiFooter}>
        <Text style={[styles.kpiChange, { color: kpi.trend === 'up' ? '#10B981' : kpi.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
          {kpi.change}
        </Text>
        <Text style={[styles.kpiSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>{kpi.subtitle}</Text>
      </View>
    </View>
  );

  const renderAgentCard = (agent: LegalAgent) => (
    <TouchableOpacity 
      key={agent.id} 
      style={[styles.agentCard, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: selectedAgent === agent.id ? '#10B981' : 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}
      onPress={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
    >
      <View style={styles.agentHeader}>
        <View style={styles.agentAvatar}>
          <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
          <View style={[styles.agentStatus, { backgroundColor: getStatusColor(agent.status) }]} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: '#FFFFFF' }]}>{agent.name}</Text>
          <Text style={[styles.agentRole, { color: 'rgba(255, 255, 255, 0.6)' }]}>{agent.role}</Text>
        </View>
        <View style={[styles.confidenceBadge, { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)', borderWidth: 1 }]}>
          <Text style={[styles.confidenceText, { color: '#10B981' }]}>{agent.confidenceScore}%</Text>
        </View>
      </View>
      
      <View style={styles.agentMetrics}>
        {agent.metrics.contractsReviewed && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{agent.metrics.contractsReviewed.toLocaleString()}</Text>
            <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Contracts Reviewed</Text>
          </View>
        )}
        {agent.metrics.riskClausesDetected && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{agent.metrics.riskClausesDetected.toLocaleString()}</Text>
            <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Risk Clauses</Text>
          </View>
        )}
        {agent.metrics.regulationsMonitored && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{agent.metrics.regulationsMonitored.toLocaleString()}</Text>
            <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Regulations</Text>
          </View>
        )}
        {agent.metrics.violationsPrevented && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{agent.metrics.violationsPrevented.toLocaleString()}</Text>
            <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Violations Prevented</Text>
          </View>
        )}
        {agent.metrics.legalReviewsCompleted && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{agent.metrics.legalReviewsCompleted.toLocaleString()}</Text>
            <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Reviews Completed</Text>
          </View>
        )}
        {agent.metrics.researchQueriesResolved && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{agent.metrics.researchQueriesResolved.toLocaleString()}</Text>
            <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Queries Resolved</Text>
          </View>
        )}
      </View>

      <View style={styles.agentImpact}>
        <View style={styles.impactItem}>
          <Text style={[styles.impactLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Productivity Impact</Text>
          <Text style={[styles.impactValue, { color: '#10B981' }]}>{agent.productivityImpact}</Text>
        </View>
        <View style={styles.impactItem}>
          <Text style={[styles.impactLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Legal Contribution</Text>
          <Text style={[styles.impactValue, { color: '#3B82F6' }]}>{agent.legalContribution}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderInsightCard = (insight: Insight) => (
    <View key={insight.id} style={[styles.insightCard, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderLeftWidth: 4, borderLeftColor: insight.type === 'risk' || insight.type === 'alert' ? '#EF4444' : insight.type === 'warning' ? '#F59E0B' : insight.type === 'opportunity' || insight.type === 'success' ? '#10B981' : '#3B82F6', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }]}>
      <View style={styles.insightHeader}>
        <View style={styles.insightIcon}>
          {getInsightIcon(insight.type)}
        </View>
        <View style={styles.insightMeta}>
          <Text style={[styles.insightTitle, { color: '#FFFFFF' }]}>{insight.title}</Text>
          <View style={styles.insightTags}>
            <View style={[styles.insightTag, { backgroundColor: insight.impact === 'high' ? 'rgba(239, 68, 68, 0.15)' : insight.impact === 'medium' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)', borderColor: insight.impact === 'high' ? 'rgba(239, 68, 68, 0.3)' : insight.impact === 'medium' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)', borderWidth: 1 }]}>
              <Text style={[styles.insightTagText, { color: insight.impact === 'high' ? '#EF4444' : insight.impact === 'medium' ? '#F59E0B' : '#10B981' }]}>{insight.impact} impact</Text>
            </View>
            {insight.confidence && (
              <View style={[styles.insightTag, { backgroundColor: 'rgba(139, 92, 246, 0.15)', borderColor: 'rgba(139, 92, 246, 0.3)', borderWidth: 1 }]}>
                <Text style={[styles.insightTagText, { color: '#8B5CF6' }]}>{insight.confidence}% confidence</Text>
              </View>
            )}
          </View>
        </View>
        {insight.actionable && (
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B981', borderColor: 'rgba(16, 185, 129, 0.3)', borderWidth: 1 }]}>
            <Text style={styles.actionButtonText}>Action</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={[styles.insightDescription, { color: 'rgba(255, 255, 255, 0.7)' }]}>{insight.description}</Text>
    </View>
  );

  const renderActivityItem = (activity: LegalActivity) => (
    <View key={activity.id} style={styles.activityItem}>
      <View style={[styles.activityIcon, { backgroundColor: getActivityColor(activity.type) + '20', borderColor: getActivityColor(activity.type) + '30', borderWidth: 1 }]}>
        {getActivityIcon(activity.type)}
      </View>
      <View style={styles.activityContent}>
        <Text style={[styles.activityTitle, { color: '#FFFFFF' }]}>{activity.title}</Text>
        <Text style={[styles.activityDescription, { color: 'rgba(255, 255, 255, 0.6)' }]}>{activity.description}</Text>
        <Text style={[styles.activityTime, { color: 'rgba(255, 255, 255, 0.5)' }]}>{activity.timestamp}</Text>
      </View>
    </View>
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'contract':
        return <FileText size={16} color="#3B82F6" />;
      case 'compliance':
        return <Shield size={16} color="#10B981" />;
      case 'audit':
        return <ClipboardList size={16} color="#F59E0B" />;
      case 'policy':
        return <BookOpen size={16} color="#8B5CF6" />;
      case 'regulation':
        return <Gavel size={16} color="#EF4444" />;
      case 'litigation':
        return <Scale size={16} color="#EC4899" />;
      case 'risk':
        return <AlertTriangle size={16} color="#F59E0B" />;
      default:
        return <Activity size={16} color="#6B7280" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'contract':
        return '#3B82F6';
      case 'compliance':
        return '#10B981';
      case 'audit':
        return '#F59E0B';
      case 'policy':
        return '#8B5CF6';
      case 'regulation':
        return '#EF4444';
      case 'litigation':
        return '#EC4899';
      case 'risk':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const renderSystemHealthItem = (health: SystemHealth) => (
    <View key={health.name} style={[styles.healthItem, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1 }]}>
      <View style={styles.healthHeader}>
        <Text style={[styles.healthName, { color: '#FFFFFF' }]}>{health.name}</Text>
        <View style={[styles.healthStatus, { backgroundColor: getStatusColor(health.status) + '20', borderColor: getStatusColor(health.status) + '30', borderWidth: 1 }]}>
          <View style={[styles.healthDot, { backgroundColor: getStatusColor(health.status) }]} />
          <Text style={[styles.healthStatusText, { color: getStatusColor(health.status) }]}>{health.status}</Text>
        </View>
      </View>
      <View style={styles.healthMetrics}>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Uptime</Text>
          <Text style={[styles.healthMetricValue, { color: '#FFFFFF' }]}>{health.uptime}%</Text>
        </View>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Response</Text>
          <Text style={[styles.healthMetricValue, { color: '#FFFFFF' }]}>{health.metrics.responseTime}ms</Text>
        </View>
        <View style={styles.healthMetric}>
          <Text style={[styles.healthMetricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Error Rate</Text>
          <Text style={[styles.healthMetricValue, { color: '#FFFFFF' }]}>{health.metrics.errorRate}%</Text>
        </View>
      </View>
      <Text style={[styles.healthLastCheck, { color: 'rgba(255, 255, 255, 0.5)' }]}>Last check: {health.lastCheck}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#0B0F14' }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: 'rgba(11, 15, 20, 0.95)', borderBottomColor: 'rgba(16, 185, 129, 0.2)' }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={[styles.headerIconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
              <Scale size={32} color="#10B981" />
            </View>
            <View style={styles.headerTitle}>
              <Text style={[styles.headerTitleText, { color: '#FFFFFF' }]}>Legal & Compliance Command Center</Text>
              <Text style={[styles.headerSubtitle, { color: 'rgba(255, 255, 255, 0.6)' }]}>AI-Powered Legal Operations & Governance</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <Search size={20} color="rgba(255, 255, 255, 0.7)" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <Bell size={20} color="rgba(255, 255, 255, 0.7)" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <Settings size={20} color="rgba(255, 255, 255, 0.7)" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.mainContent}>
        {/* Left Sidebar */}
        <View style={[styles.sidebar, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderRightColor: 'rgba(16, 185, 129, 0.15)' }]}>
          <ScrollView style={styles.sidebarScroll}>
            {navigationItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.sidebarItem,
                  activeTab === item.id && styles.sidebarItemActive,
                  { backgroundColor: activeTab === item.id ? 'rgba(16, 185, 129, 0.15)' : 'transparent' }
                ]}
                onPress={() => setActiveTab(item.id)}
              >
                <item.icon size={18} color={activeTab === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.6)'} />
                <Text style={[
                  styles.sidebarItemText,
                  { color: activeTab === item.id ? '#10B981' : 'rgba(255, 255, 255, 0.6)' }
                ]}>
                  {item.label}
                </Text>
                {activeTab === item.id && <ChevronRight size={16} color="#10B981" />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Main Content Area */}
        <ScrollView style={styles.content}>
        {/* Executive KPIs */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Executive KPIs</Text>
          <View style={styles.kpiGrid}>
            {executiveKPIs.map(renderKPICard)}
          </View>
        </View>

        {/* AI Legal Agents */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Legal Agents</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {legalAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* General Counsel Executive Scorecard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>General Counsel Executive Scorecard</Text>
          <View style={[styles.executiveScorecard, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
            {/* Primary Metrics */}
            <View style={styles.executivePrimary}>
              <View style={styles.executiveMetricLarge}>
                <View style={styles.executiveMetricHeader}>
                  <Scale size={24} color="#10B981" />
                  <Text style={[styles.executiveMetricTitle, { color: 'rgba(255, 255, 255, 0.7)' }]}>Compliance Score</Text>
                </View>
                <Text style={[styles.executiveMetricValueLarge, { color: '#10B981' }]}>97%</Text>
                <View style={styles.executiveMetricTrend}>
                  <ArrowUpRight size={16} color="#10B981" />
                  <Text style={[styles.executiveMetricTrendText, { color: '#10B981' }]}>+2% from last month</Text>
                </View>
              </View>
              
              <View style={styles.executiveMetricLarge}>
                <View style={styles.executiveMetricHeader}>
                  <FileText size={24} color="#3B82F6" />
                  <Text style={[styles.executiveMetricTitle, { color: 'rgba(255, 255, 255, 0.7)' }]}>Active Contracts</Text>
                </View>
                <Text style={[styles.executiveMetricValueLarge, { color: '#3B82F6' }]}>14,382</Text>
                <View style={styles.executiveMetricTrend}>
                  <ArrowUpRight size={16} color="#10B981" />
                  <Text style={[styles.executiveMetricTrendText, { color: '#10B981' }]}>+12% YTD</Text>
                </View>
              </View>
            </View>

            {/* Secondary Metrics */}
            <View style={styles.executiveSecondary}>
              <View style={styles.executiveMetricSmall}>
                <Text style={[styles.executiveMetricLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>Open Legal Matters</Text>
                <Text style={[styles.executiveMetricValue, { color: '#F59E0B' }]}>124</Text>
                <View style={styles.executiveMetricChange}>
                  <ArrowDownRight size={12} color="#10B981" />
                  <Text style={[styles.executiveMetricChangeText, { color: '#10B981' }]}>-8%</Text>
                </View>
              </View>
              
              <View style={styles.executiveMetricSmall}>
                <Text style={[styles.executiveMetricLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>Regulatory Changes</Text>
                <Text style={[styles.executiveMetricValue, { color: '#EF4444' }]}>38</Text>
                <View style={styles.executiveMetricChange}>
                  <ArrowUpRight size={12} color="#EF4444" />
                  <Text style={[styles.executiveMetricChangeText, { color: '#EF4444' }]}>+5</Text>
                </View>
              </View>
              
              <View style={styles.executiveMetricSmall}>
                <Text style={[styles.executiveMetricLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>Risk Exposure</Text>
                <Text style={[styles.executiveMetricValue, { color: '#10B981' }]}>Low</Text>
                <View style={styles.executiveMetricChange}>
                  <ArrowDownRight size={12} color="#10B981" />
                  <Text style={[styles.executiveMetricChangeText, { color: '#10B981' }]}>-12%</Text>
                </View>
              </View>
              
              <View style={styles.executiveMetricSmall}>
                <Text style={[styles.executiveMetricLabel, { color: 'rgba(255, 255, 255, 0.7)' }]}>Contract Value</Text>
                <Text style={[styles.executiveMetricValue, { color: '#3B82F6' }]}>$2.4B</Text>
                <View style={styles.executiveMetricChange}>
                  <ArrowUpRight size={12} color="#10B981" />
                  <Text style={[styles.executiveMetricChangeText, { color: '#10B981' }]}>+18%</Text>
                </View>
              </View>
            </View>

            {/* Compliance Trends */}
            <View style={styles.executiveTrends}>
              <Text style={[styles.executiveTrendsTitle, { color: '#FFFFFF' }]}>Compliance Trends (6 Months)</Text>
              <View style={styles.executiveTrendBars}>
                <View style={styles.trendBarContainer}>
                  <Text style={[styles.trendBarLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Jan</Text>
                  <View style={[styles.trendBar, { backgroundColor: '#10B981', height: '60%' }]} />
                </View>
                <View style={styles.trendBarContainer}>
                  <Text style={[styles.trendBarLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Feb</Text>
                  <View style={[styles.trendBar, { backgroundColor: '#10B981', height: '65%' }]} />
                </View>
                <View style={styles.trendBarContainer}>
                  <Text style={[styles.trendBarLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Mar</Text>
                  <View style={[styles.trendBar, { backgroundColor: '#10B981', height: '70%' }]} />
                </View>
                <View style={styles.trendBarContainer}>
                  <Text style={[styles.trendBarLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Apr</Text>
                  <View style={[styles.trendBar, { backgroundColor: '#10B981', height: '75%' }]} />
                </View>
                <View style={styles.trendBarContainer}>
                  <Text style={[styles.trendBarLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>May</Text>
                  <View style={[styles.trendBar, { backgroundColor: '#10B981', height: '85%' }]} />
                </View>
                <View style={styles.trendBarContainer}>
                  <Text style={[styles.trendBarLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Jun</Text>
                  <View style={[styles.trendBar, { backgroundColor: '#10B981', height: '97%' }]} />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Contract Lifecycle Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Contract Lifecycle Command Center</Text>
          <View style={[styles.lifecycleCommandCenter, { backgroundColor: theme.colors.card }]}>
            {/* Funnel Visualization */}
            <View style={styles.lifecycleFunnel}>
              <Text style={[styles.lifecycleFunnelTitle, { color: theme.colors.text }]}>Contract Funnel</Text>
              <View style={styles.funnelContainer}>
                {contractLifecycle.map((item, index) => {
                  const funnelWidth = 100 - (index * 15);
                  return (
                    <View key={item.stage} style={styles.funnelStage}>
                      <View style={[styles.funnelBar, { 
                        width: `${funnelWidth}%`,
                        backgroundColor: item.riskLevel === 'high' ? '#EF4444' : item.riskLevel === 'medium' ? '#F59E0B' : '#10B981'
                      }]} />
                      <View style={styles.funnelLabels}>
                        <Text style={[styles.funnelStageName, { color: theme.colors.text }]}>{item.stage}</Text>
                        <Text style={[styles.funnelStageCount, { color: theme.colors.textSecondary }]}>{item.count}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Contract Details */}
            <View style={styles.lifecycleDetails}>
              <Text style={[styles.lifecycleDetailsTitle, { color: theme.colors.text }]}>Active Contracts by Stage</Text>
              {contractLifecycle.map((item) => (
                <View key={item.stage} style={styles.lifecycleDetailItem}>
                  <View style={styles.lifecycleDetailHeader}>
                    <Text style={[styles.lifecycleDetailStage, { color: theme.colors.text }]}>{item.stage}</Text>
                    <View style={[styles.lifecycleDetailRisk, { backgroundColor: item.riskLevel === 'high' ? '#EF4444' + '20' : item.riskLevel === 'medium' ? '#F59E0B' + '20' : '#10B981' + '20' }]}>
                      <Text style={[styles.lifecycleDetailRiskText, { color: item.riskLevel === 'high' ? '#EF4444' : item.riskLevel === 'medium' ? '#F59E0B' : '#10B981' }]}>{item.riskLevel} risk</Text>
                    </View>
                  </View>
                  <View style={styles.lifecycleDetailMetrics}>
                    <View style={styles.lifecycleDetailMetric}>
                      <Text style={[styles.lifecycleDetailMetricValue, { color: theme.colors.text }]}>{item.count}</Text>
                      <Text style={[styles.lifecycleDetailMetricLabel, { color: theme.colors.textSecondary }]}>Contracts</Text>
                    </View>
                    <View style={styles.lifecycleDetailMetric}>
                      <Text style={[styles.lifecycleDetailMetricValue, { color: theme.colors.text }]}>${(item.value / 1000000).toFixed(1)}M</Text>
                      <Text style={[styles.lifecycleDetailMetricLabel, { color: theme.colors.textSecondary }]}>Value</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Renewal Timeline */}
            <View style={styles.renewalTimeline}>
              <Text style={[styles.renewalTimelineTitle, { color: theme.colors.text }]}>Upcoming Renewals</Text>
              <View style={styles.renewalTimelineItems}>
                <View style={styles.renewalItem}>
                  <View style={[styles.renewalDot, { backgroundColor: '#EF4444' }]} />
                  <View style={styles.renewalInfo}>
                    <Text style={[styles.renewalContract, { color: theme.colors.text }]}>Enterprise Software MSA</Text>
                    <Text style={[styles.renewalDate, { color: theme.colors.textSecondary }]}>Expires in 15 days</Text>
                  </View>
                  <Text style={[styles.renewalValue, { color: theme.colors.text }]}>$1.2M</Text>
                </View>
                <View style={styles.renewalItem}>
                  <View style={[styles.renewalDot, { backgroundColor: '#F59E0B' }]} />
                  <View style={styles.renewalInfo}>
                    <Text style={[styles.renewalContract, { color: theme.colors.text }]}>Cloud Services Agreement</Text>
                    <Text style={[styles.renewalDate, { color: theme.colors.textSecondary }]}>Expires in 30 days</Text>
                  </View>
                  <Text style={[styles.renewalValue, { color: theme.colors.text }]}>$840K</Text>
                </View>
                <View style={styles.renewalItem}>
                  <View style={[styles.renewalDot, { backgroundColor: '#10B981' }]} />
                  <View style={styles.renewalInfo}>
                    <Text style={[styles.renewalContract, { color: theme.colors.text }]}>Marketing Services Contract</Text>
                    <Text style={[styles.renewalDate, { color: theme.colors.textSecondary }]}>Expires in 45 days</Text>
                  </View>
                  <Text style={[styles.renewalValue, { color: theme.colors.text }]}>$560K</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Compliance Command Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Compliance Command Center</Text>
          <View style={[styles.complianceContainer, { backgroundColor: theme.colors.card }]}>
            {complianceData.map((item) => (
              <View key={item.area} style={styles.complianceItem}>
                <View style={styles.complianceHeader}>
                  <Text style={[styles.complianceArea, { color: theme.colors.text }]}>{item.area}</Text>
                  {getTrendIcon(item.trend)}
                </View>
                <View style={styles.complianceScoreContainer}>
                  <Text style={[styles.complianceScore, { color: item.score >= 95 ? '#10B981' : item.score >= 90 ? '#F59E0B' : '#EF4444' }]}>{item.score}%</Text>
                </View>
                <Text style={[styles.complianceAudit, { color: theme.colors.textSecondary }]}>Last audit: {item.lastAudit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Risk Intelligence Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk Intelligence Hub</Text>
          <View style={[styles.riskContainer, { backgroundColor: theme.colors.card }]}>
            {riskData.map((item) => (
              <View key={item.category} style={styles.riskItem}>
                <Text style={[styles.riskCategory, { color: theme.colors.text }]}>{item.category}</Text>
                <View style={styles.riskLevelContainer}>
                  <View style={[styles.riskLevelBar, { backgroundColor: item.level === 'critical' ? '#EF4444' : item.level === 'high' ? '#F59E0B' : item.level === 'medium' ? '#3B82F6' : '#10B981', width: `${item.score}%` }]} />
                  <Text style={[styles.riskScore, { color: theme.colors.text }]}>{item.score}</Text>
                </View>
                <View style={styles.riskTrend}>
                  {getTrendIcon(item.trend)}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Regulatory Monitoring Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Regulatory Monitoring Center</Text>
          <View style={[styles.regulatoryContainer, { backgroundColor: theme.colors.card }]}>
            {regulatoryData.map((item) => (
              <View key={item.region} style={styles.regulatoryItem}>
                <Text style={[styles.regulatoryRegion, { color: theme.colors.text }]}>{item.region}</Text>
                <View style={styles.regulatoryStats}>
                  <View style={styles.regulatoryStat}>
                    <Text style={[styles.regulatoryStatValue, { color: theme.colors.text }]}>{item.newRegulations}</Text>
                    <Text style={[styles.regulatoryStatLabel, { color: theme.colors.textSecondary }]}>New Regs</Text>
                  </View>
                  <View style={styles.regulatoryStat}>
                    <Text style={[styles.regulatoryStatValue, { color: theme.colors.text }]}>{item.upcomingDeadlines}</Text>
                    <Text style={[styles.regulatoryStatLabel, { color: theme.colors.textSecondary }]}>Deadlines</Text>
                  </View>
                </View>
                <View style={[styles.regulatoryImpact, { backgroundColor: item.complianceImpact === 'high' ? '#EF4444' + '20' : '#F59E0B' + '20' }]}>
                  <Text style={[styles.regulatoryImpactText, { color: item.complianceImpact === 'high' ? '#EF4444' : '#F59E0B' }]}>{item.complianceImpact} impact</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Audit Readiness Hub */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Audit Readiness Hub</Text>
          <View style={[styles.auditReadinessHub, { backgroundColor: theme.colors.card }]}>
            {/* Overall Readiness Score */}
            <View style={styles.auditReadinessScore}>
              <View style={styles.auditReadinessHeader}>
                <ClipboardList size={24} color="#10B981" />
                <Text style={[styles.auditReadinessTitle, { color: theme.colors.text }]}>Overall Audit Readiness</Text>
              </View>
              <View style={styles.auditReadinessValueContainer}>
                <Text style={[styles.auditReadinessValue, { color: '#10B981' }]}>94%</Text>
                <Text style={[styles.auditReadinessLabel, { color: theme.colors.textSecondary }]}>Ready for external audit</Text>
              </View>
              <View style={styles.auditReadinessTrend}>
                <ArrowUpRight size={16} color="#10B981" />
                <Text style={[styles.auditReadinessTrendText, { color: '#10B981' }]}>+3% from last quarter</Text>
              </View>
            </View>

            {/* Audit Readiness Heatmap */}
            <View style={styles.auditHeatmap}>
              <Text style={[styles.auditHeatmapTitle, { color: theme.colors.text }]}>Control Readiness Heatmap</Text>
              <View style={styles.heatmapGrid}>
                <View style={styles.heatmapRow}>
                  <Text style={[styles.heatmapRowLabel, { color: theme.colors.textSecondary }]}>Financial Controls</Text>
                  <View style={styles.heatmapCells}>
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#F59E0B' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <View style={styles.heatmapRow}>
                  <Text style={[styles.heatmapRowLabel, { color: theme.colors.textSecondary }]}>Compliance</Text>
                  <View style={styles.heatmapCells}>
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <View style={styles.heatmapRow}>
                  <Text style={[styles.heatmapRowLabel, { color: theme.colors.textSecondary }]}>IT Security</Text>
                  <View style={styles.heatmapCells}>
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#F59E0B' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#EF4444' }]} />
                  </View>
                </View>
                <View style={styles.heatmapRow}>
                  <Text style={[styles.heatmapRowLabel, { color: theme.colors.textSecondary }]}>Data Privacy</Text>
                  <View style={styles.heatmapCells}>
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                  </View>
                </View>
                <View style={styles.heatmapRow}>
                  <Text style={[styles.heatmapRowLabel, { color: theme.colors.textSecondary }]}>Operations</Text>
                  <View style={styles.heatmapCells}>
                    <View style={[styles.heatmapCell, { backgroundColor: '#F59E0B' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#F59E0B' }]} />
                    <View style={[styles.heatmapCell, { backgroundColor: '#10B981' }]} />
                  </View>
                </View>
              </View>
              <View style={styles.heatmapLegend}>
                <View style={styles.heatmapLegendItem}>
                  <View style={[styles.heatmapLegendDot, { backgroundColor: '#10B981' }]} />
                  <Text style={[styles.heatmapLegendText, { color: theme.colors.textSecondary }]}>Ready</Text>
                </View>
                <View style={styles.heatmapLegendItem}>
                  <View style={[styles.heatmapLegendDot, { backgroundColor: '#F59E0B' }]} />
                  <Text style={[styles.heatmapLegendText, { color: theme.colors.textSecondary }]}>Needs Attention</Text>
                </View>
                <View style={styles.heatmapLegendItem}>
                  <View style={[styles.heatmapLegendDot, { backgroundColor: '#EF4444' }]} />
                  <Text style={[styles.heatmapLegendText, { color: theme.colors.textSecondary }]}>Critical</Text>
                </View>
              </View>
            </View>

            {/* Active Audits */}
            <View style={styles.activeAudits}>
              <Text style={[styles.activeAuditsTitle, { color: theme.colors.text }]}>Active Audits</Text>
              {auditData.map((item, index) => (
                <View key={index} style={styles.activeAuditItem}>
                  <View style={styles.activeAuditHeader}>
                    <Text style={[styles.activeAuditType, { color: theme.colors.text }]}>{item.type === 'internal' ? 'Internal Audit' : 'External Audit'}</Text>
                    <View style={[styles.activeAuditStatus, { backgroundColor: item.status === 'in_progress' ? '#F59E0B' + '20' : item.status === 'completed' ? '#10B981' + '20' : '#3B82F6' + '20' }]}>
                      <Text style={[styles.activeAuditStatusText, { color: item.status === 'in_progress' ? '#F59E0B' : item.status === 'completed' ? '#10B981' : '#3B82F6' }]}>{item.status === 'in_progress' ? 'In Progress' : item.status === 'completed' ? 'Completed' : 'Scheduled'}</Text>
                    </View>
                  </View>
                  <View style={styles.activeAuditMetrics}>
                    <View style={styles.activeAuditMetric}>
                      <Text style={[styles.activeAuditMetricValue, { color: theme.colors.text }]}>{item.findings}</Text>
                      <Text style={[styles.activeAuditMetricLabel, { color: theme.colors.textSecondary }]}>Findings</Text>
                    </View>
                    <View style={styles.activeAuditMetric}>
                      <Text style={[styles.activeAuditMetricValue, { color: theme.colors.text }]}>{item.remediationProgress}%</Text>
                      <Text style={[styles.activeAuditMetricLabel, { color: theme.colors.textSecondary }]}>Remediation</Text>
                    </View>
                  </View>
                  <View style={styles.activeAuditProgress}>
                    <View style={styles.activeAuditProgressBar}>
                      <View style={[styles.activeAuditProgressFill, { width: `${item.remediationProgress}%`, backgroundColor: item.remediationProgress >= 80 ? '#10B981' : item.remediationProgress >= 50 ? '#F59E0B' : '#EF4444' }]} />
                    </View>
                    <Text style={[styles.activeAuditProgressText, { color: theme.colors.textSecondary }]}>{item.remediationProgress}% Complete</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Policy Governance Dashboard */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Policy Governance Dashboard</Text>
          <View style={[styles.policyContainer, { backgroundColor: theme.colors.card }]}>
            {policyData.map((item) => (
              <View key={item.name} style={styles.policyItem}>
                <View style={styles.policyHeader}>
                  <Text style={[styles.policyName, { color: theme.colors.text }]}>{item.name}</Text>
                  <View style={[styles.policyStatus, { backgroundColor: item.status === 'active' ? '#10B981' + '20' : item.status === 'review' ? '#F59E0B' + '20' : '#EF4444' + '20' }]}>
                    <Text style={[styles.policyStatusText, { color: item.status === 'active' ? '#10B981' : item.status === 'review' ? '#F59E0B' : '#EF4444' }]}>{item.status}</Text>
                  </View>
                </View>
                <View style={styles.policyMetrics}>
                  <View style={styles.policyMetric}>
                    <Text style={[styles.policyMetricValue, { color: theme.colors.text }]}>{item.acceptanceRate}%</Text>
                    <Text style={[styles.policyMetricLabel, { color: theme.colors.textSecondary }]}>Acceptance</Text>
                  </View>
                  <Text style={[styles.policyUpdated, { color: theme.colors.textSecondary }]}>Updated: {item.lastUpdated}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Data Privacy & Security Compliance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Data Privacy & Security Compliance</Text>
          <View style={[styles.privacyContainer, { backgroundColor: theme.colors.card }]}>
            {privacyData.map((item) => (
              <View key={item.framework} style={styles.privacyItem}>
                <Text style={[styles.privacyFramework, { color: theme.colors.text }]}>{item.framework}</Text>
                <View style={styles.privacyMetrics}>
                  <View style={styles.privacyMetric}>
                    <Text style={[styles.privacyMetricValue, { color: item.complianceScore >= 95 ? '#10B981' : '#F59E0B' }]}>{item.complianceScore}%</Text>
                    <Text style={[styles.privacyMetricLabel, { color: theme.colors.textSecondary }]}>Compliance</Text>
                  </View>
                  <View style={styles.privacyMetric}>
                    <Text style={[styles.privacyMetricValue, { color: theme.colors.text }]}>{item.requestsPending}</Text>
                    <Text style={[styles.privacyMetricLabel, { color: theme.colors.textSecondary }]}>Requests</Text>
                  </View>
                </View>
                <View style={[styles.privacyRisk, { backgroundColor: item.breachRisk === 'high' ? '#EF4444' + '20' : item.breachRisk === 'medium' ? '#F59E0B' + '20' : '#10B981' + '20' }]}>
                  <Text style={[styles.privacyRiskText, { color: item.breachRisk === 'high' ? '#EF4444' : item.breachRisk === 'medium' ? '#F59E0B' : '#10B981' }]}>{item.breachRisk} risk</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Litigation & Case Management */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Litigation & Case Management</Text>
          <View style={[styles.litigationContainer, { backgroundColor: theme.colors.card }]}>
            {litigationData.map((item) => (
              <View key={item.caseId} style={styles.litigationItem}>
                <View style={styles.litigationHeader}>
                  <Text style={[styles.litigationCaseId, { color: theme.colors.text }]}>{item.caseId}</Text>
                  <View style={[styles.litigationStatus, { backgroundColor: item.status === 'active' ? '#F59E0B' + '20' : item.status === 'settled' ? '#10B981' + '20' : '#3B82F6' + '20' }]}>
                    <Text style={[styles.litigationStatusText, { color: item.status === 'active' ? '#F59E0B' : item.status === 'settled' ? '#10B981' : '#3B82F6' }]}>{item.status}</Text>
                  </View>
                </View>
                <Text style={[styles.litigationType, { color: theme.colors.textSecondary }]}>{item.type}</Text>
                <View style={styles.litigationMetrics}>
                  <View style={styles.litigationMetric}>
                    <Text style={[styles.litigationMetricValue, { color: theme.colors.text }]}>${(item.value / 1000000).toFixed(2)}M</Text>
                    <Text style={[styles.litigationMetricLabel, { color: theme.colors.textSecondary }]}>Value</Text>
                  </View>
                  <Text style={[styles.litigationCounsel, { color: theme.colors.textSecondary }]}>{item.outsideCounsel}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* AI Legal Insights Center */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Legal Insights Center</Text>
          <View style={styles.insightsContainer}>
            {aiInsights.map(renderInsightCard)}
          </View>
        </View>

        {/* Real-time Legal Operations Feed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-time Legal Operations Feed</Text>
          <View style={[styles.feedContainer, { backgroundColor: theme.colors.card }]}>
            {legalActivities.map(renderActivityItem)}
          </View>
        </View>

        {/* Legal System Health */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Legal System Health</Text>
          <View style={styles.healthContainer}>
            {systemHealth.map(renderSystemHealthItem)}
          </View>
        </View>
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
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
    flex: 1,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    marginLeft: 12,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
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
    borderWidth: 1,
  },
  mainContent: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: 240,
    borderRightWidth: 1,
  },
  sidebarScroll: {
    flex: 1,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  sidebarItemActive: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  sidebarItemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    fontWeight: 'bold',
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
  agentsScroll: {
    flexDirection: 'row',
    gap: 12,
  },
  agentCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  agentAvatarText: {
    fontSize: 24,
  },
  agentStatus: {
    position: 'absolute',
    bottom: -2,
    right: -2,
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
    fontWeight: 'bold',
    marginBottom: 2,
  },
  agentRole: {
    fontSize: 12,
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  agentMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
    minWidth: '45%',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
  },
  agentImpact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  impactItem: {
    flex: 1,
  },
  impactLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  impactValue: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  executiveScorecard: {
    padding: 20,
    borderRadius: 12,
  },
  executivePrimary: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  executiveMetricLarge: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  executiveMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  executiveMetricTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  executiveMetricValueLarge: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  executiveMetricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  executiveMetricTrendText: {
    fontSize: 12,
    fontWeight: '500',
  },
  executiveSecondary: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  executiveMetricSmall: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  executiveMetricLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  executiveMetricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  executiveMetricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  executiveMetricChangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  executiveTrends: {
    marginTop: 16,
  },
  executiveTrendsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  executiveTrendBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 120,
  },
  trendBarContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  trendBar: {
    width: '100%',
    borderRadius: 4,
    marginTop: 8,
  },
  trendBarLabel: {
    fontSize: 10,
    marginTop: 8,
  },
  commandCenter: {
    padding: 20,
    borderRadius: 12,
  },
  commandCenterStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
  },
  commandStat: {
    alignItems: 'center',
    flex: 1,
    minWidth: '18%',
  },
  commandStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commandStatLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  lifecycleCommandCenter: {
    padding: 20,
    borderRadius: 12,
  },
  lifecycleFunnel: {
    marginBottom: 24,
  },
  lifecycleFunnelTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  funnelContainer: {
    height: 200,
    justifyContent: 'space-between',
  },
  funnelStage: {
    alignItems: 'center',
    marginVertical: 4,
  },
  funnelBar: {
    height: 24,
    borderRadius: 4,
    marginBottom: 8,
  },
  funnelLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  funnelStageName: {
    fontSize: 12,
    fontWeight: '500',
  },
  funnelStageCount: {
    fontSize: 12,
  },
  lifecycleDetails: {
    marginBottom: 24,
  },
  lifecycleDetailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  lifecycleDetailItem: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 12,
  },
  lifecycleDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  lifecycleDetailStage: {
    fontSize: 14,
    fontWeight: '600',
  },
  lifecycleDetailRisk: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  lifecycleDetailRiskText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  lifecycleDetailMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  lifecycleDetailMetric: {
    flex: 1,
  },
  lifecycleDetailMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lifecycleDetailMetricLabel: {
    fontSize: 12,
  },
  renewalTimeline: {
    marginTop: 16,
  },
  renewalTimelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  renewalTimelineItems: {
    gap: 12,
  },
  renewalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  renewalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  renewalInfo: {
    flex: 1,
  },
  renewalContract: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  renewalDate: {
    fontSize: 12,
  },
  renewalValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  lifecycleContainer: {
    padding: 16,
    borderRadius: 12,
  },
  lifecycleItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  lifecycleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lifecycleStage: {
    fontSize: 14,
    fontWeight: '600',
  },
  lifecycleRisk: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  lifecycleRiskText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  lifecycleCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  lifecycleValue: {
    fontSize: 12,
  },
  complianceContainer: {
    padding: 16,
    borderRadius: 12,
  },
  complianceItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  complianceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  complianceArea: {
    fontSize: 14,
    fontWeight: '600',
  },
  complianceScoreContainer: {
    marginBottom: 4,
  },
  complianceScore: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  complianceAudit: {
    fontSize: 10,
  },
  riskContainer: {
    padding: 16,
    borderRadius: 12,
  },
  riskItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  riskCategory: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  riskLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  riskLevelBar: {
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  riskScore: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  riskTrend: {
    alignSelf: 'flex-end',
  },
  regulatoryContainer: {
    padding: 16,
    borderRadius: 12,
  },
  regulatoryItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  regulatoryRegion: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  regulatoryStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  regulatoryStat: {
    flex: 1,
  },
  regulatoryStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  regulatoryStatLabel: {
    fontSize: 10,
  },
  regulatoryImpact: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  regulatoryImpactText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  auditContainer: {
    padding: 16,
    borderRadius: 12,
  },
  auditItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  auditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  auditType: {
    fontSize: 14,
    fontWeight: '600',
  },
  auditStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  auditStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  auditMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  auditMetric: {
    flex: 1,
  },
  auditMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  auditMetricLabel: {
    fontSize: 10,
  },
  policyContainer: {
    padding: 16,
    borderRadius: 12,
  },
  policyItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  policyName: {
    fontSize: 14,
    fontWeight: '600',
  },
  policyStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  policyStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  policyMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  policyMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  policyMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  policyMetricLabel: {
    fontSize: 10,
  },
  policyUpdated: {
    fontSize: 10,
  },
  privacyContainer: {
    padding: 16,
    borderRadius: 12,
  },
  privacyItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  privacyFramework: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  privacyMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  privacyMetric: {
    flex: 1,
  },
  privacyMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  privacyMetricLabel: {
    fontSize: 10,
  },
  privacyRisk: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  privacyRiskText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  litigationContainer: {
    padding: 16,
    borderRadius: 12,
  },
  litigationItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  litigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  litigationCaseId: {
    fontSize: 14,
    fontWeight: '600',
  },
  litigationStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  litigationStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  litigationType: {
    fontSize: 12,
    marginBottom: 8,
  },
  litigationMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  litigationMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  litigationMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  litigationMetricLabel: {
    fontSize: 10,
  },
  litigationCounsel: {
    fontSize: 10,
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
    alignItems: 'flex-start',
    marginBottom: 8,
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
    marginBottom: 4,
  },
  insightTags: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  insightTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightTagText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  insightDescription: {
    fontSize: 12,
    lineHeight: 18,
  },
  feedContainer: {
    padding: 16,
    borderRadius: 12,
  },
  activityItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 12,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 10,
  },
  healthContainer: {
    gap: 12,
  },
  healthItem: {
    padding: 16,
    borderRadius: 12,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthName: {
    fontSize: 14,
    fontWeight: '600',
  },
  healthStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  healthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  healthStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  healthMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
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
    fontWeight: 'bold',
  },
  healthLastCheck: {
    fontSize: 10,
  },
  auditReadinessHub: {
    padding: 20,
    borderRadius: 12,
  },
  auditReadinessScore: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    marginBottom: 20,
  },
  auditReadinessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  auditReadinessTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  auditReadinessValueContainer: {
    marginBottom: 12,
  },
  auditReadinessValue: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  auditReadinessLabel: {
    fontSize: 12,
  },
  auditReadinessTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  auditReadinessTrendText: {
    fontSize: 12,
    fontWeight: '500',
  },
  auditHeatmap: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  auditHeatmapTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  heatmapGrid: {
    gap: 12,
  },
  heatmapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heatmapRowLabel: {
    fontSize: 12,
    width: 120,
  },
  heatmapCells: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  heatmapCell: {
    flex: 1,
    height: 32,
    borderRadius: 4,
  },
  heatmapLegend: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 16,
  },
  heatmapLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heatmapLegendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  heatmapLegendText: {
    fontSize: 10,
  },
  activeAudits: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeAuditsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  activeAuditItem: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 12,
  },
  activeAuditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activeAuditType: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeAuditStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeAuditStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  activeAuditMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  activeAuditMetric: {
    flex: 1,
  },
  activeAuditMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  activeAuditMetricLabel: {
    fontSize: 10,
  },
  activeAuditProgress: {
    marginTop: 8,
  },
  activeAuditProgressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 4,
  },
  activeAuditProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  activeAuditProgressText: {
    fontSize: 10,
  },
});