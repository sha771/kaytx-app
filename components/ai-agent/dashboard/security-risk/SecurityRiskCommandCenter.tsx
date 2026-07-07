import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  LayoutDashboard,
  Shield,
  AlertTriangle,
  Activity,
  Target,
  Users,
  Zap,
  Lock,
  Eye,
  FileText,
  Briefcase,
  Globe,
  Network,
  Search,
  Bell,
  Filter,
  MoreVertical,
  RefreshCw,
  Download,
  Share2,
  Plus,
  X,
  Save,
  Edit2,
  Trash2,
  Copy,
  LineChart,
  PieChart,
  Calendar,
  Clock,
  Map,
  Radar,
  Flame,
  Award,
  Flag,
  Code,
  Layers,
  Sparkles,
  Info,
  Beaker,
  Route,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  Bug,
  Cpu,
  Database,
  Server,
  Wifi,
  Smartphone,
  Fingerprint,
  Key,
  UserCheck,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Settings,
  Monitor,
  LockKeyhole,
  FileCheck,
  Scale,
  Gavel,
  FileWarning,
  Ghost,
  Crosshair,
  Radio,
  Satellite,
  Globe2,
  ShieldHalf,
  Sword,
  HeartPulse,
  Skull,
  ZapOff,
  Ban,
  TriangleAlert,
  Megaphone,
  MessageSquareWarning,
  Cctv,
  Fingerprint as FingerprintIcon,
  BadgeCheck,
  ShieldEllipsis,
  ShieldX,
  ShieldQuestion,
  ShieldAlert as ShieldAlertIcon,
  ShieldCheck as ShieldCheckIcon,
  ShieldHalf as ShieldHalfIcon,
  Shield as ShieldIcon,
  ShieldEllipsis as ShieldEllipsisIcon,
  ShieldX as ShieldXIcon,
  ShieldQuestion as ShieldQuestionIcon,
  ShieldAlert as ShieldAlertIcon2,
  ShieldCheck as ShieldCheckIcon2,
  ShieldHalf as ShieldHalfIcon2,
  Shield as ShieldIcon2,
  ShieldEllipsis as ShieldEllipsisIcon2,
  ShieldX as ShieldXIcon2,
  ShieldQuestion as ShieldQuestionIcon2,
  ShieldAlert as ShieldAlertIcon3,
  ShieldCheck as ShieldCheckIcon3,
  ShieldHalf as ShieldHalfIcon3,
  Shield as ShieldIcon3,
  ShieldEllipsis as ShieldEllipsisIcon3,
  ShieldX as ShieldXIcon3,
  ShieldQuestion as ShieldQuestionIcon3,
} from 'lucide-react-native';

// Types
interface SecurityAgent {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'active' | 'monitoring' | 'paused' | 'error';
  confidenceScore: number;
  impactScore: number;
  metrics: {
    eventsMonitored?: number;
    threatsDetected?: number;
    assetsScanned?: number;
    criticalRisksFound?: number;
    riskAssessments?: number;
    riskReduction?: number;
    detectionAccuracy?: number;
    remediationRate?: number;
  };
  activeInvestigations: number;
  trend: 'up' | 'down' | 'stable';
}

interface SecurityKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
}

interface ThreatIntelligence {
  id: string;
  type: 'malware' | 'ransomware' | 'phishing' | 'insider' | 'nation-state' | 'emerging';
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  description: string;
  affectedAssets: number;
  timestamp: string;
  status: 'active' | 'mitigated' | 'monitoring';
}

interface SecurityAlert {
  id: string;
  type: 'threat' | 'incident' | 'vulnerability' | 'compliance' | 'fraud';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  source: string;
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved' | 'escalated';
  assignedTo?: string;
}

interface Vulnerability {
  id: string;
  cveId: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  affectedAssets: string[];
  cvssScore: number;
  exploitAvailable: boolean;
  patchAvailable: boolean;
  discoveredDate: string;
  remediationStatus: 'not-started' | 'in-progress' | 'completed' | 'deferred';
}

interface Incident {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  status: 'detected' | 'investigating' | 'contained' | 'remediated' | 'recovered' | 'closed';
  stage: 'threat-detected' | 'investigation' | 'containment' | 'remediation' | 'recovery' | 'post-incident';
  detectedAt: string;
  assignedTo: string;
  impact: 'critical' | 'high' | 'medium' | 'low';
}

interface IdentityEvent {
  id: string;
  type: 'login' | 'access' | 'privilege-escalation' | 'mfa' | 'violation';
  user: string;
  action: string;
  resource: string;
  location: string;
  riskScore: number;
  timestamp: string;
  status: 'success' | 'failed' | 'blocked' | 'flagged';
}

interface RiskAssessment {
  id: string;
  category: 'operational' | 'cyber' | 'third-party' | 'financial' | 'strategic';
  title: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  likelihood: number;
  impact: number;
  riskScore: number;
  mitigation: string;
  owner: string;
  lastUpdated: string;
}

interface ComplianceItem {
  id: string;
  framework: 'ISO-27001' | 'SOC-2' | 'GDPR' | 'HIPAA' | 'PCI-DSS';
  control: string;
  status: 'compliant' | 'non-compliant' | 'partial' | 'not-applicable';
  lastAudit: string;
  nextAudit: string;
  effectiveness: number;
}

interface FraudAlert {
  id: string;
  type: 'transaction' | 'behavioral' | 'insider' | 'account-takeover' | 'financial-pattern';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  amount?: string;
  confidence: number;
  timestamp: string;
  status: 'detected' | 'investigating' | 'blocked' | 'false-positive';
}

interface SecurityInsight {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'opportunity' | 'info' | 'success' | 'risk' | 'recommendation' | 'alert';
  impact: 'high' | 'medium' | 'low';
  confidence?: number;
  actionable: boolean;
  timestamp: string;
}

interface SecurityActivity {
  id: string;
  type: 'threat-detected' | 'incident-opened' | 'vulnerability-discovered' | 'access-violation' | 'compliance-alert' | 'fraud-blocked' | 'risk-assessment';
  title: string;
  description: string;
  timestamp: string;
  agent?: string;
}

interface PlatformHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'critical';
  uptime: number;
  lastCheck: string;
  metrics: {
    responseTime: number;
    errorRate: number;
    latency: number;
    detectionLatency?: number;
  };
}

export default function SecurityRiskCommandCenter() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI Security Agents', icon: Shield },
    { id: 'threat-intel', label: 'Threat Intelligence', icon: Radar },
    { id: 'soc', label: 'Security Operations', icon: Monitor },
    { id: 'vulnerability', label: 'Vulnerability Management', icon: Bug },
    { id: 'incident', label: 'Incident Response', icon: AlertTriangle },
    { id: 'identity', label: 'Identity & Access', icon: Fingerprint },
    { id: 'fraud', label: 'Fraud Detection', icon: Ghost },
    { id: 'risk', label: 'Risk Management', icon: Scale },
    { id: 'compliance', label: 'Compliance', icon: FileCheck },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Security KPIs
  const securityKPIs: SecurityKPI[] = [
    {
      id: 'security-posture',
      title: 'Security Posture Score',
      value: '96',
      change: '+2.4%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'Overall security health',
      severity: 'low',
    },
    {
      id: 'active-threats',
      title: 'Active Threats',
      value: '48',
      change: '+12',
      trend: 'up',
      color: '#EF4444',
      subtitle: 'Current threat count',
      severity: 'critical',
    },
    {
      id: 'critical-vulnerabilities',
      title: 'Critical Vulnerabilities',
      value: '142',
      change: '-18',
      trend: 'down',
      color: '#F59E0B',
      subtitle: 'Unpatched CVEs',
      severity: 'critical',
    },
    {
      id: 'open-incidents',
      title: 'Open Incidents',
      value: '23',
      change: '+5',
      trend: 'up',
      color: '#EF4444',
      subtitle: 'Active investigations',
      severity: 'high',
    },
    {
      id: 'mtd',
      title: 'Mean Time To Detect (MTTD)',
      value: '4.2h',
      change: '-18%',
      trend: 'down',
      color: '#10B981',
      subtitle: 'Detection speed',
      severity: 'medium',
    },
    {
      id: 'mttr',
      title: 'Mean Time To Respond (MTTR)',
      value: '8.5h',
      change: '-22%',
      trend: 'down',
      color: '#10B981',
      subtitle: 'Response speed',
      severity: 'medium',
    },
    {
      id: 'compliance-score',
      title: 'Compliance Score',
      value: '98',
      change: '+1.2%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'Regulatory compliance',
      severity: 'low',
    },
    {
      id: 'risk-exposure',
      title: 'Risk Exposure Index',
      value: '34',
      change: '-8.4%',
      trend: 'down',
      color: '#F59E0B',
      subtitle: 'Enterprise risk level',
      severity: 'high',
    },
    {
      id: 'fraud-alerts',
      title: 'Fraud Alerts',
      value: '12',
      change: '+3',
      trend: 'up',
      color: '#EF4444',
      subtitle: 'Fraud attempts',
      severity: 'high',
    },
    {
      id: 'third-party-risk',
      title: 'Third-Party Risk Score',
      value: '67',
      change: '+5.2%',
      trend: 'up',
      color: '#F59E0B',
      subtitle: 'Vendor risk level',
      severity: 'medium',
    },
  ];

  // AI Security Agents
  const securityAgents: SecurityAgent[] = [
    {
      id: 'agent-sentinel',
      name: 'Agent Sentinel',
      specialty: 'Threat Detection',
      avatar: '🛡️',
      status: 'active',
      confidenceScore: 98.4,
      impactScore: 94,
      metrics: {
        eventsMonitored: 480000000,
        threatsDetected: 24281,
        detectionAccuracy: 98.4,
      },
      activeInvestigations: 127,
      trend: 'up',
    },
    {
      id: 'agent-shield',
      name: 'Agent Shield',
      specialty: 'Vulnerability Management',
      avatar: '🔒',
      status: 'active',
      confidenceScore: 94,
      impactScore: 91,
      metrics: {
        assetsScanned: 18420,
        criticalRisksFound: 142,
        remediationRate: 94,
      },
      activeInvestigations: 84,
      trend: 'up',
    },
    {
      id: 'agent-guardian',
      name: 'Agent Guardian',
      specialty: 'Risk Intelligence',
      avatar: '👁️',
      status: 'active',
      confidenceScore: 97,
      impactScore: 88,
      metrics: {
        riskAssessments: 2841,
        riskReduction: 31,
      },
      activeInvestigations: 56,
      trend: 'up',
    },
    {
      id: 'agent-hunter',
      name: 'Agent Hunter',
      specialty: 'Threat Hunting',
      avatar: '🎯',
      status: 'monitoring',
      confidenceScore: 95,
      impactScore: 92,
      metrics: {
        threatsDetected: 18420,
        detectionAccuracy: 96,
      },
      activeInvestigations: 72,
      trend: 'stable',
    },
    {
      id: 'agent-responder',
      name: 'Agent Responder',
      specialty: 'Incident Response',
      avatar: '⚡',
      status: 'active',
      confidenceScore: 93,
      impactScore: 95,
      metrics: {
        threatsDetected: 8420,
        remediationRate: 92,
      },
      activeInvestigations: 23,
      trend: 'up',
    },
  ];

  // Threat Intelligence
  const threatIntelligence: ThreatIntelligence[] = [
    {
      id: 'ti-1',
      type: 'ransomware',
      severity: 'critical',
      source: 'Threat Intel Feed',
      description: 'New ransomware variant targeting healthcare sector',
      affectedAssets: 24,
      timestamp: '2m ago',
      status: 'active',
    },
    {
      id: 'ti-2',
      type: 'phishing',
      severity: 'high',
      source: 'Email Security',
      description: 'Sophisticated phishing campaign targeting executives',
      affectedAssets: 156,
      timestamp: '15m ago',
      status: 'active',
    },
    {
      id: 'ti-3',
      type: 'malware',
      severity: 'high',
      source: 'Endpoint Detection',
      description: 'Trojan variant detected in finance department',
      affectedAssets: 8,
      timestamp: '1h ago',
      status: 'mitigated',
    },
    {
      id: 'ti-4',
      type: 'nation-state',
      severity: 'critical',
      source: 'Government Intel',
      description: 'Nation-state actor targeting critical infrastructure',
      affectedAssets: 3,
      timestamp: '2h ago',
      status: 'monitoring',
    },
  ];

  // Security Alerts
  const securityAlerts: SecurityAlert[] = [
    {
      id: 'sa-1',
      type: 'threat',
      severity: 'critical',
      title: 'Critical vulnerability in production',
      description: 'CVE-2024-1234 detected in production environment',
      source: 'Vulnerability Scanner',
      timestamp: '2m ago',
      status: 'open',
      assignedTo: 'Security Team',
    },
    {
      id: 'sa-2',
      type: 'incident',
      severity: 'high',
      title: 'Suspicious login activity',
      description: 'Multiple failed login attempts from unknown IP',
      source: 'Identity Provider',
      timestamp: '15m ago',
      status: 'investigating',
      assignedTo: 'SOC Analyst',
    },
    {
      id: 'sa-3',
      type: 'compliance',
      severity: 'medium',
      title: 'Compliance gap detected',
      description: 'Access control policy not aligned with GDPR requirements',
      source: 'Compliance Monitor',
      timestamp: '1h ago',
      status: 'open',
    },
    {
      id: 'sa-4',
      type: 'fraud',
      severity: 'high',
      title: 'Fraud attempt blocked',
      description: 'Suspicious transaction pattern blocked by AI',
      source: 'Fraud Detection',
      timestamp: '2h ago',
      status: 'resolved',
    },
  ];

  // Vulnerabilities
  const vulnerabilities: Vulnerability[] = [
    {
      id: 'vuln-1',
      cveId: 'CVE-2024-1234',
      severity: 'critical',
      title: 'Remote Code Execution in Web Server',
      affectedAssets: ['prod-web-01', 'prod-web-02', 'staging-web'],
      cvssScore: 9.8,
      exploitAvailable: true,
      patchAvailable: true,
      discoveredDate: '2024-01-15',
      remediationStatus: 'in-progress',
    },
    {
      id: 'vuln-2',
      cveId: 'CVE-2024-5678',
      severity: 'critical',
      title: 'Privilege Escalation in Database',
      affectedAssets: ['prod-db-primary', 'prod-db-replica'],
      cvssScore: 9.1,
      exploitAvailable: true,
      patchAvailable: false,
      discoveredDate: '2024-01-14',
      remediationStatus: 'not-started',
    },
    {
      id: 'vuln-3',
      cveId: 'CVE-2024-9012',
      severity: 'high',
      title: 'SQL Injection in API',
      affectedAssets: ['api-gateway'],
      cvssScore: 8.5,
      exploitAvailable: false,
      patchAvailable: true,
      discoveredDate: '2024-01-13',
      remediationStatus: 'in-progress',
    },
  ];

  // Incidents
  const incidents: Incident[] = [
    {
      id: 'inc-1',
      type: 'Ransomware',
      severity: 'critical',
      title: 'Ransomware Attack Detected',
      description: 'Ransomware activity detected on file server',
      status: 'contained',
      stage: 'containment',
      detectedAt: '2024-01-15 14:30',
      assignedTo: 'Incident Response Team',
      impact: 'critical',
    },
    {
      id: 'inc-2',
      type: 'Data Breach',
      severity: 'high',
      title: 'Potential Data Exfiltration',
      description: 'Unusual data transfer patterns detected',
      status: 'investigating',
      stage: 'investigation',
      detectedAt: '2024-01-15 12:15',
      assignedTo: 'SOC Team',
      impact: 'high',
    },
    {
      id: 'inc-3',
      type: 'Phishing',
      severity: 'medium',
      title: 'Phishing Campaign',
      description: 'Internal phishing campaign detected',
      status: 'remediated',
      stage: 'remediation',
      detectedAt: '2024-01-14 09:45',
      assignedTo: 'Security Awareness',
      impact: 'medium',
    },
  ];

  // Identity Events
  const identityEvents: IdentityEvent[] = [
    {
      id: 'id-1',
      type: 'login',
      user: 'john.doe@company.com',
      action: 'Successful login',
      resource: 'VPN Portal',
      location: 'New York, US',
      riskScore: 12,
      timestamp: '2m ago',
      status: 'success',
    },
    {
      id: 'id-2',
      type: 'privilege-escalation',
      user: 'admin.user@company.com',
      action: 'Privilege escalation requested',
      resource: 'Admin Console',
      location: 'London, UK',
      riskScore: 78,
      timestamp: '15m ago',
      status: 'flagged',
    },
    {
      id: 'id-3',
      type: 'violation',
      user: 'unknown@external.com',
      action: 'Access denied',
      resource: 'Internal API',
      location: 'Unknown',
      riskScore: 95,
      timestamp: '1h ago',
      status: 'blocked',
    },
  ];

  // Risk Assessments
  const riskAssessments: RiskAssessment[] = [
    {
      id: 'risk-1',
      category: 'cyber',
      title: 'Supply Chain Attack Risk',
      riskLevel: 'high',
      likelihood: 72,
      impact: 85,
      riskScore: 61,
      mitigation: 'Implement vendor security assessments',
      owner: 'CISO',
      lastUpdated: '2024-01-15',
    },
    {
      id: 'risk-2',
      category: 'operational',
      title: 'Insider Threat Risk',
      riskLevel: 'medium',
      likelihood: 45,
      impact: 78,
      riskScore: 35,
      mitigation: 'Enhanced monitoring and training',
      owner: 'HR Director',
      lastUpdated: '2024-01-14',
    },
    {
      id: 'risk-3',
      category: 'third-party',
      title: 'Cloud Provider Dependency',
      riskLevel: 'medium',
      likelihood: 38,
      impact: 92,
      riskScore: 35,
      mitigation: 'Multi-cloud strategy',
      owner: 'CTO',
      lastUpdated: '2024-01-13',
    },
  ];

  // Compliance Items
  const complianceItems: ComplianceItem[] = [
    {
      id: 'comp-1',
      framework: 'ISO-27001',
      control: 'Access Control',
      status: 'compliant',
      lastAudit: '2024-01-15',
      nextAudit: '2024-07-15',
      effectiveness: 94,
    },
    {
      id: 'comp-2',
      framework: 'SOC-2',
      control: 'Security Monitoring',
      status: 'compliant',
      lastAudit: '2024-01-10',
      nextAudit: '2024-07-10',
      effectiveness: 91,
    },
    {
      id: 'comp-3',
      framework: 'GDPR',
      control: 'Data Privacy',
      status: 'partial',
      lastAudit: '2024-01-08',
      nextAudit: '2024-04-08',
      effectiveness: 78,
    },
    {
      id: 'comp-4',
      framework: 'PCI-DSS',
      control: 'Payment Security',
      status: 'compliant',
      lastAudit: '2024-01-05',
      nextAudit: '2024-07-05',
      effectiveness: 96,
    },
  ];

  // Fraud Alerts
  const fraudAlerts: FraudAlert[] = [
    {
      id: 'fraud-1',
      type: 'transaction',
      severity: 'high',
      description: 'Unusual transaction pattern detected',
      amount: '$125,000',
      confidence: 87,
      timestamp: '2m ago',
      status: 'investigating',
    },
    {
      id: 'fraud-2',
      type: 'account-takeover',
      severity: 'critical',
      description: 'Potential account takeover attempt',
      confidence: 94,
      timestamp: '15m ago',
      status: 'blocked',
    },
    {
      id: 'fraud-3',
      type: 'behavioral',
      severity: 'medium',
      description: 'Anomalous user behavior detected',
      confidence: 72,
      timestamp: '1h ago',
      status: 'detected',
    },
  ];

  // Security Insights
  const securityInsights: SecurityInsight[] = [
    {
      id: 'ins-1',
      title: 'Critical vulnerability detected in production',
      description: 'CVE-2024-1234 requires immediate patching',
      type: 'warning',
      impact: 'high',
      confidence: 98,
      actionable: true,
      timestamp: '2m ago',
    },
    {
      id: 'ins-2',
      title: 'Third-party vendor risk score increased',
      description: 'Vendor X risk score increased by 22% due to security incident',
      type: 'risk',
      impact: 'medium',
      confidence: 85,
      actionable: true,
      timestamp: '15m ago',
    },
    {
      id: 'ins-3',
      title: 'Suspicious login activity detected',
      description: 'Multiple login attempts from unusual geographic locations',
      type: 'alert',
      impact: 'high',
      confidence: 92,
      actionable: true,
      timestamp: '1h ago',
    },
    {
      id: 'ins-4',
      title: 'Compliance gap identified',
      description: 'Access control policy not aligned with GDPR requirements',
      type: 'warning',
      impact: 'medium',
      confidence: 88,
      actionable: true,
      timestamp: '2h ago',
    },
    {
      id: 'ins-5',
      title: 'Ransomware attack pattern matched',
      description: 'Activity matches known threat actor TTPs',
      type: 'alert',
      impact: 'critical',
      confidence: 95,
      actionable: true,
      timestamp: '3h ago',
    },
  ];

  // Security Activity Feed
  const securityActivities: SecurityActivity[] = [
    {
      id: 'act-1',
      type: 'threat-detected',
      title: 'Threat detected',
      description: 'New malware signature detected in email attachments',
      timestamp: '2m ago',
      agent: 'Agent Sentinel',
    },
    {
      id: 'act-2',
      type: 'incident-opened',
      title: 'Incident opened',
      description: 'INC-2024-001 opened for ransomware investigation',
      timestamp: '5m ago',
      agent: 'Agent Responder',
    },
    {
      id: 'act-3',
      type: 'vulnerability-discovered',
      title: 'Vulnerability discovered',
      description: 'CVE-2024-1234 discovered in production web server',
      timestamp: '12m ago',
      agent: 'Agent Shield',
    },
    {
      id: 'act-4',
      type: 'access-violation',
      title: 'Access violation',
      description: 'Unauthorized access attempt blocked on admin console',
      timestamp: '15m ago',
      agent: 'System',
    },
    {
      id: 'act-5',
      type: 'compliance-alert',
      title: 'Compliance alert triggered',
      description: 'GDPR compliance gap detected in data retention policy',
      timestamp: '20m ago',
      agent: 'Compliance Monitor',
    },
    {
      id: 'act-6',
      type: 'fraud-blocked',
      title: 'Fraud attempt blocked',
      description: 'Suspicious transaction blocked by fraud detection AI',
      timestamp: '30m ago',
      agent: 'Fraud Detection',
    },
    {
      id: 'act-7',
      type: 'risk-assessment',
      title: 'Risk assessment completed',
      description: 'Supply chain risk assessment updated with new findings',
      timestamp: '45m ago',
      agent: 'Agent Guardian',
    },
  ];

  // Platform Health
  const platformHealth: PlatformHealth[] = [
    {
      name: 'SIEM Systems',
      status: 'healthy',
      uptime: 99.9,
      lastCheck: '30s ago',
      metrics: { responseTime: 8, errorRate: 0.01, latency: 12, detectionLatency: 15 },
    },
    {
      name: 'Endpoint Security',
      status: 'healthy',
      uptime: 99.8,
      lastCheck: '30s ago',
      metrics: { responseTime: 12, errorRate: 0.02, latency: 18, detectionLatency: 25 },
    },
    {
      name: 'Identity Providers',
      status: 'healthy',
      uptime: 99.9,
      lastCheck: '1m ago',
      metrics: { responseTime: 5, errorRate: 0.01, latency: 8 },
    },
    {
      name: 'Firewalls',
      status: 'healthy',
      uptime: 99.9,
      lastCheck: '1m ago',
      metrics: { responseTime: 3, errorRate: 0.01, latency: 5 },
    },
    {
      name: 'Cloud Security Platforms',
      status: 'degraded',
      uptime: 99.5,
      lastCheck: '1m ago',
      metrics: { responseTime: 45, errorRate: 0.05, latency: 52, detectionLatency: 60 },
    },
    {
      name: 'Threat Intelligence Feeds',
      status: 'healthy',
      uptime: 99.7,
      lastCheck: '2m ago',
      metrics: { responseTime: 15, errorRate: 0.03, latency: 20 },
    },
    {
      name: 'AI Agent Health',
      status: 'healthy',
      uptime: 99.9,
      lastCheck: '2m ago',
      metrics: { responseTime: 25, errorRate: 0.01, latency: 30 },
    },
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
      case 'compliant':
      case 'success':
        return '#10B981';
      case 'offline':
      case 'critical':
      case 'error':
      case 'failed':
      case 'blocked':
      case 'non-compliant':
        return '#EF4444';
      case 'busy':
      case 'degraded':
      case 'in-progress':
      case 'investigating':
      case 'partial':
      case 'flagged':
      case 'monitoring':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#EF4444';
      case 'high':
        return '#F59E0B';
      case 'medium':
        return '#3B82F6';
      case 'low':
        return '#10B981';
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
        return <ShieldAlert size={20} color="#EF4444" />;
      case 'recommendation':
        return <Sparkles size={20} color="#8B5CF6" />;
      case 'alert':
        return <Bell size={20} color="#EF4444" />;
      default:
        return <Info size={20} color="#6B7280" />;
    }
  };

  const renderKPICard = (kpi: SecurityKPI) => (
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
      <View style={[styles.severityIndicator, { backgroundColor: getSeverityColor(kpi.severity) }]} />
    </View>
  );

  const renderAgentCard = (agent: SecurityAgent) => (
    <TouchableOpacity 
      key={agent.id} 
      style={[styles.agentCard, { backgroundColor: theme.colors.card, borderColor: selectedAgent === agent.id ? '#EF4444' : 'transparent' }]}
      onPress={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
    >
      <View style={styles.agentHeader}>
        <View style={styles.agentAvatar}>
          <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
          <View style={[styles.agentStatus, { backgroundColor: getStatusColor(agent.status) }]} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
          <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>{agent.specialty}</Text>
        </View>
        <View style={[styles.confidenceBadge, { backgroundColor: '#EF4444' + '20' }]}>
          <Text style={[styles.confidenceText, { color: '#EF4444' }]}>{agent.confidenceScore}%</Text>
        </View>
      </View>
      
      <View style={styles.agentMetrics}>
        {agent.metrics.eventsMonitored && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{(agent.metrics.eventsMonitored / 1000000).toFixed(0)}M</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Events</Text>
          </View>
        )}
        {agent.metrics.threatsDetected && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.metrics.threatsDetected.toLocaleString()}</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Threats</Text>
          </View>
        )}
        {agent.metrics.assetsScanned && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.metrics.assetsScanned.toLocaleString()}</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Assets</Text>
          </View>
        )}
        {agent.metrics.detectionAccuracy && (
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{agent.metrics.detectionAccuracy}%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Accuracy</Text>
          </View>
        )}
      </View>

      <View style={styles.agentImpact}>
        <Text style={[styles.impactLabel, { color: theme.colors.textSecondary }]}>Active Investigations</Text>
        <Text style={[styles.impactValue, { color: '#EF4444' }]}>{agent.activeInvestigations}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderThreatCard = (threat: ThreatIntelligence) => (
    <View key={threat.id} style={[styles.threatCard, { backgroundColor: theme.colors.card, borderLeftWidth: 4, borderLeftColor: getSeverityColor(threat.severity) }]}>
      <View style={styles.threatHeader}>
        <View style={[styles.threatTypeBadge, { backgroundColor: getSeverityColor(threat.severity) + '20' }]}>
          <Text style={[styles.threatTypeText, { color: getSeverityColor(threat.severity) }]}>{threat.type.toUpperCase()}</Text>
        </View>
        <Text style={[styles.threatTime, { color: theme.colors.textSecondary }]}>{threat.timestamp}</Text>
      </View>
      <Text style={[styles.threatTitle, { color: theme.colors.text }]}>{threat.description}</Text>
      <View style={styles.threatFooter}>
        <Text style={[styles.threatSource, { color: theme.colors.textSecondary }]}>Source: {threat.source}</Text>
        <Text style={[styles.threatAssets, { color: theme.colors.textSecondary }]}>Affected: {threat.affectedAssets}</Text>
      </View>
      <View style={[styles.threatStatus, { backgroundColor: getStatusColor(threat.status) + '20' }]}>
        <Text style={[styles.threatStatusText, { color: getStatusColor(threat.status) }]}>{threat.status.toUpperCase()}</Text>
      </View>
    </View>
  );

  const renderAlertCard = (alert: SecurityAlert) => (
    <View key={alert.id} style={[styles.alertCard, { backgroundColor: theme.colors.card, borderLeftWidth: 4, borderLeftColor: getSeverityColor(alert.severity) }]}>
      <View style={styles.alertHeader}>
        <View style={[styles.alertTypeBadge, { backgroundColor: getSeverityColor(alert.severity) + '20' }]}>
          <Text style={[styles.alertTypeText, { color: getSeverityColor(alert.severity) }]}>{alert.type.toUpperCase()}</Text>
        </View>
        <Text style={[styles.alertTime, { color: theme.colors.textSecondary }]}>{alert.timestamp}</Text>
      </View>
      <Text style={[styles.alertTitle, { color: theme.colors.text }]}>{alert.title}</Text>
      <Text style={[styles.alertDescription, { color: theme.colors.textSecondary }]}>{alert.description}</Text>
      <View style={styles.alertFooter}>
        <Text style={[styles.alertSource, { color: theme.colors.textSecondary }]}>Source: {alert.source}</Text>
        {alert.assignedTo && (
          <Text style={[styles.alertAssigned, { color: theme.colors.textSecondary }]}>Assigned: {alert.assignedTo}</Text>
        )}
      </View>
      <View style={[styles.alertStatus, { backgroundColor: getStatusColor(alert.status) + '20' }]}>
        <Text style={[styles.alertStatusText, { color: getStatusColor(alert.status) }]}>{alert.status.toUpperCase()}</Text>
      </View>
    </View>
  );

  const renderVulnerabilityCard = (vuln: Vulnerability) => (
    <View key={vuln.id} style={[styles.vulnCard, { backgroundColor: theme.colors.card, borderLeftWidth: 4, borderLeftColor: getSeverityColor(vuln.severity) }]}>
      <View style={styles.vulnHeader}>
        <Text style={[styles.vulnCVE, { color: '#EF4444' }]}>{vuln.cveId}</Text>
        <View style={[styles.vulnCVSS, { backgroundColor: getSeverityColor(vuln.severity) + '20' }]}>
          <Text style={[styles.vulnCVSSText, { color: getSeverityColor(vuln.severity) }]}>CVSS: {vuln.cvssScore}</Text>
        </View>
      </View>
      <Text style={[styles.vulnTitle, { color: theme.colors.text }]}>{vuln.title}</Text>
      <View style={styles.vulnFooter}>
        <View style={styles.vulnMeta}>
          {vuln.exploitAvailable && (
            <View style={[styles.vulnTag, { backgroundColor: '#EF4444' + '20' }]}>
              <Text style={[styles.vulnTagText, { color: '#EF4444' }]}>Exploit Available</Text>
            </View>
          )}
          {vuln.patchAvailable && (
            <View style={[styles.vulnTag, { backgroundColor: '#10B981' + '20' }]}>
              <Text style={[styles.vulnTagText, { color: '#10B981' }]}>Patch Available</Text>
            </View>
          )}
        </View>
        <View style={[styles.vulnStatus, { backgroundColor: getStatusColor(vuln.remediationStatus) + '20' }]}>
          <Text style={[styles.vulnStatusText, { color: getStatusColor(vuln.remediationStatus) }]}>{vuln.remediationStatus.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );

  const renderIncidentCard = (incident: Incident) => (
    <View key={incident.id} style={[styles.incidentCard, { backgroundColor: theme.colors.card, borderLeftWidth: 4, borderLeftColor: getSeverityColor(incident.severity) }]}>
      <View style={styles.incidentHeader}>
        <Text style={[styles.incidentType, { color: theme.colors.text }]}>{incident.type}</Text>
        <View style={[styles.incidentSeverity, { backgroundColor: getSeverityColor(incident.severity) + '20' }]}>
          <Text style={[styles.incidentSeverityText, { color: getSeverityColor(incident.severity) }]}>{incident.severity.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={[styles.incidentTitle, { color: theme.colors.text }]}>{incident.title}</Text>
      <Text style={[styles.incidentDescription, { color: theme.colors.textSecondary }]}>{incident.description}</Text>
      <View style={styles.incidentWorkflow}>
        {['threat-detected', 'investigation', 'containment', 'remediation', 'recovery', 'post-incident'].map((stage, index) => (
          <View key={stage} style={styles.workflowStep}>
            <View style={[styles.workflowDot, { backgroundColor: incident.stage === stage ? '#10B981' : '#374151' }]} />
            {index < 5 && <View style={[styles.workflowLine, { backgroundColor: incident.stage === stage || ['threat-detected', 'investigation', 'containment', 'remediation', 'recovery'].indexOf(incident.stage) > index ? '#10B981' : '#374151' }]} />}
          </View>
        ))}
      </View>
      <View style={styles.incidentFooter}>
        <Text style={[styles.incidentAssigned, { color: theme.colors.textSecondary }]}>Assigned: {incident.assignedTo}</Text>
        <Text style={[styles.incidentTime, { color: theme.colors.textSecondary }]}>{incident.detectedAt}</Text>
      </View>
    </View>
  );

  const renderIdentityEvent = (event: IdentityEvent) => (
    <View key={event.id} style={[styles.identityCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.identityHeader}>
        <View style={[styles.identityRisk, { backgroundColor: event.riskScore > 70 ? '#EF4444' + '20' : event.riskScore > 40 ? '#F59E0B' + '20' : '#10B981' + '20' }]}>
          <Text style={[styles.identityRiskText, { color: event.riskScore > 70 ? '#EF4444' : event.riskScore > 40 ? '#F59E0B' : '#10B981' }]}>
            Risk: {event.riskScore}
          </Text>
        </View>
        <Text style={[styles.identityTime, { color: theme.colors.textSecondary }]}>{event.timestamp}</Text>
      </View>
      <Text style={[styles.identityUser, { color: theme.colors.text }]}>{event.user}</Text>
      <Text style={[styles.identityAction, { color: theme.colors.textSecondary }]}>{event.action}</Text>
      <View style={styles.identityFooter}>
        <Text style={[styles.identityResource, { color: theme.colors.textSecondary }]}>{event.resource}</Text>
        <Text style={[styles.identityLocation, { color: theme.colors.textSecondary }]}>{event.location}</Text>
      </View>
      <View style={[styles.identityStatus, { backgroundColor: getStatusColor(event.status) + '20' }]}>
        <Text style={[styles.identityStatusText, { color: getStatusColor(event.status) }]}>{event.status.toUpperCase()}</Text>
      </View>
    </View>
  );

  const renderRiskCard = (risk: RiskAssessment) => (
    <View key={risk.id} style={[styles.riskCard, { backgroundColor: theme.colors.card, borderLeftWidth: 4, borderLeftColor: getSeverityColor(risk.riskLevel) }]}>
      <View style={styles.riskHeader}>
        <View style={[styles.riskCategory, { backgroundColor: '#3B82F6' + '20' }]}>
          <Text style={[styles.riskCategoryText, { color: '#3B82F6' }]}>{risk.category.toUpperCase()}</Text>
        </View>
        <View style={[styles.riskLevel, { backgroundColor: getSeverityColor(risk.riskLevel) + '20' }]}>
          <Text style={[styles.riskLevelText, { color: getSeverityColor(risk.riskLevel) }]}>{risk.riskLevel.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={[styles.riskTitle, { color: theme.colors.text }]}>{risk.title}</Text>
      <View style={styles.riskMetrics}>
        <View style={styles.riskMetric}>
          <Text style={[styles.riskMetricLabel, { color: theme.colors.textSecondary }]}>Likelihood</Text>
          <Text style={[styles.riskMetricValue, { color: theme.colors.text }]}>{risk.likelihood}%</Text>
        </View>
        <View style={styles.riskMetric}>
          <Text style={[styles.riskMetricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
          <Text style={[styles.riskMetricValue, { color: theme.colors.text }]}>{risk.impact}%</Text>
        </View>
        <View style={styles.riskMetric}>
          <Text style={[styles.riskMetricLabel, { color: theme.colors.textSecondary }]}>Risk Score</Text>
          <Text style={[styles.riskMetricValue, { color: getSeverityColor(risk.riskLevel) }]}>{risk.riskScore}</Text>
        </View>
      </View>
      <Text style={[styles.riskMitigation, { color: theme.colors.textSecondary }]}>{risk.mitigation}</Text>
      <View style={styles.riskFooter}>
        <Text style={[styles.riskOwner, { color: theme.colors.textSecondary }]}>Owner: {risk.owner}</Text>
        <Text style={[styles.riskUpdated, { color: theme.colors.textSecondary }]}>Updated: {risk.lastUpdated}</Text>
      </View>
    </View>
  );

  const renderComplianceCard = (compliance: ComplianceItem) => (
    <View key={compliance.id} style={[styles.complianceCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.complianceHeader}>
        <Text style={[styles.complianceFramework, { color: theme.colors.text }]}>{compliance.framework}</Text>
        <View style={[styles.complianceStatus, { backgroundColor: getStatusColor(compliance.status) + '20' }]}>
          <Text style={[styles.complianceStatusText, { color: getStatusColor(compliance.status) }]}>{compliance.status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={[styles.complianceControl, { color: theme.colors.textSecondary }]}>{compliance.control}</Text>
      <View style={styles.complianceMetrics}>
        <View style={styles.complianceMetric}>
          <Text style={[styles.complianceMetricLabel, { color: theme.colors.textSecondary }]}>Effectiveness</Text>
          <Text style={[styles.complianceMetricValue, { color: theme.colors.text }]}>{compliance.effectiveness}%</Text>
        </View>
      </View>
      <View style={styles.complianceFooter}>
        <Text style={[styles.complianceAudit, { color: theme.colors.textSecondary }]}>Last: {compliance.lastAudit}</Text>
        <Text style={[styles.complianceNext, { color: theme.colors.textSecondary }]}>Next: {compliance.nextAudit}</Text>
      </View>
    </View>
  );

  const renderFraudCard = (fraud: FraudAlert) => (
    <View key={fraud.id} style={[styles.fraudCard, { backgroundColor: theme.colors.card, borderLeftWidth: 4, borderLeftColor: getSeverityColor(fraud.severity) }]}>
      <View style={styles.fraudHeader}>
        <View style={[styles.fraudType, { backgroundColor: getSeverityColor(fraud.severity) + '20' }]}>
          <Text style={[styles.fraudTypeText, { color: getSeverityColor(fraud.severity) }]}>{fraud.type.toUpperCase()}</Text>
        </View>
        <Text style={[styles.fraudTime, { color: theme.colors.textSecondary }]}>{fraud.timestamp}</Text>
      </View>
      <Text style={[styles.fraudDescription, { color: theme.colors.text }]}>{fraud.description}</Text>
      {fraud.amount && (
        <Text style={[styles.fraudAmount, { color: '#EF4444' }]}>{fraud.amount}</Text>
      )}
      <View style={styles.fraudFooter}>
        <View style={[styles.fraudConfidence, { backgroundColor: '#8B5CF6' + '20' }]}>
          <Text style={[styles.fraudConfidenceText, { color: '#8B5CF6' }]}>Confidence: {fraud.confidence}%</Text>
        </View>
        <View style={[styles.fraudStatus, { backgroundColor: getStatusColor(fraud.status) + '20' }]}>
          <Text style={[styles.fraudStatusText, { color: getStatusColor(fraud.status) }]}>{fraud.status.toUpperCase()}</Text>
        </View>
      </View>
    </View>
  );

  const renderInsightCard = (insight: SecurityInsight) => (
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
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#EF4444' }]}>
            <Text style={styles.actionButtonText}>Action</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>{insight.description}</Text>
    </View>
  );

  const renderActivityItem = (activity: SecurityActivity) => (
    <View key={activity.id} style={styles.activityItem}>
      <View style={[styles.activityIcon, { backgroundColor: getActivityColor(activity.type) + '20' }]}>
        {getActivityIcon(activity.type)}
      </View>
      <View style={styles.activityContent}>
        <Text style={[styles.activityTitle, { color: theme.colors.text }]}>{activity.title}</Text>
        <Text style={[styles.activityDescription, { color: theme.colors.textSecondary }]}>{activity.description}</Text>
        <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{activity.timestamp}</Text>
        {activity.agent && (
          <Text style={[styles.activityAgent, { color: '#8B5CF6' }]}>Agent: {activity.agent}</Text>
        )}
      </View>
    </View>
  );

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'threat-detected':
        return <ShieldAlert size={16} color="#EF4444" />;
      case 'incident-opened':
        return <AlertTriangle size={16} color="#F59E0B" />;
      case 'vulnerability-discovered':
        return <Bug size={16} color="#EF4444" />;
      case 'access-violation':
        return <Lock size={16} color="#EF4444" />;
      case 'compliance-alert':
        return <FileCheck size={16} color="#F59E0B" />;
      case 'fraud-blocked':
        return <Ghost size={16} color="#10B981" />;
      case 'risk-assessment':
        return <Scale size={16} color="#3B82F6" />;
      default:
        return <Activity size={16} color="#6B7280" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'threat-detected':
        return '#EF4444';
      case 'incident-opened':
        return '#F59E0B';
      case 'vulnerability-discovered':
        return '#EF4444';
      case 'access-violation':
        return '#EF4444';
      case 'compliance-alert':
        return '#F59E0B';
      case 'fraud-blocked':
        return '#10B981';
      case 'risk-assessment':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const renderSystemHealthItem = (health: PlatformHealth) => (
    <View key={health.name} style={[styles.healthItem, { backgroundColor: theme.colors.card }]}>
      <View style={styles.healthHeader}>
        <Text style={[styles.healthName, { color: theme.colors.text }]}>{health.name}</Text>
        <View style={[styles.healthStatus, { backgroundColor: getStatusColor(health.status) + '20' }]}>
          <View style={[styles.healthDot, { backgroundColor: getStatusColor(health.status) }]} />
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
        {health.metrics.detectionLatency && (
          <View style={styles.healthMetric}>
            <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>Detection</Text>
            <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>{health.metrics.detectionLatency}ms</Text>
          </View>
        )}
      </View>
      <Text style={[styles.healthLastCheck, { color: theme.colors.textSecondary }]}>Last check: {health.lastCheck}</Text>
    </View>
  );

  const renderSidebarItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.sidebarItem, activeTab === item.id && styles.sidebarItemActive]}
      onPress={() => setActiveTab(item.id)}
    >
      <item.icon size={20} color={activeTab === item.id ? '#EF4444' : theme.colors.textSecondary} />
      {!sidebarCollapsed && <Text style={[styles.sidebarItemText, activeTab === item.id && styles.sidebarItemTextActive, { color: activeTab === item.id ? '#EF4444' : theme.colors.textSecondary }]}>{item.label}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      {/* Left Sidebar */}
      <View style={[styles.sidebar, { backgroundColor: '#0A0F16' }]}>
        <View style={styles.sidebarHeader}>
          <Shield size={28} color="#EF4444" />
          {!sidebarCollapsed && <Text style={[styles.sidebarTitle, { color: theme.colors.text }]}>Security Command</Text>}
        </View>
        <ScrollView style={styles.sidebarScroll}>
          {navigationItems.map(renderSidebarItem)}
        </ScrollView>
        <TouchableOpacity
          style={styles.sidebarCollapse}
          onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? <ChevronRight size={20} color={theme.colors.textSecondary} /> : <ChevronLeft size={20} color={theme.colors.textSecondary} />}
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent}>
        {/* Top Executive Bar - Security KPIs */}
        <View style={styles.executiveBar}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Security & Risk KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            {securityKPIs.map(renderKPICard)}
          </ScrollView>
        </View>

        {/* SECTION 1: AI Security Agents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Security Agents</Text>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#EF4444' + '20' }]}>
              <Text style={[styles.headerButtonTex, { color: '#EF4444' }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {securityAgents.map(renderAgentCard)}
          </ScrollView>
        </View>

        {/* SECTION 2: CISO Command Center */}
        <View style={[styles.section, styles.cisoSection]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>CISO Command Center</Text>
          <View style={styles.cisoGrid}>
            <View style={[styles.cisoCard, { backgroundColor: '#10B981' + '10', borderColor: '#10B981' }]}>
              <Text style={[styles.cisoLabel, { color: theme.colors.textSecondary }]}>Security Posture</Text>
              <Text style={[styles.cisoValue, { color: '#10B981' }]}>96%</Text>
            </View>
            <View style={[styles.cisoCard, { backgroundColor: '#EF4444' + '10', borderColor: '#EF4444' }]}>
              <Text style={[styles.cisoLabel, { color: theme.colors.textSecondary }]}>Active Threats</Text>
              <Text style={[styles.cisoValue, { color: '#EF4444' }]}>48</Text>
            </View>
            <View style={[styles.cisoCard, { backgroundColor: '#EF4444' + '10', borderColor: '#EF4444' }]}>
              <Text style={[styles.cisoLabel, { color: theme.colors.textSecondary }]}>Critical Incidents</Text>
              <Text style={[styles.cisoValue, { color: '#EF4444' }]}>3</Text>
            </View>
            <View style={[styles.cisoCard, { backgroundColor: '#10B981' + '10', borderColor: '#10B981' }]}>
              <Text style={[styles.cisoLabel, { color: theme.colors.textSecondary }]}>Compliance Score</Text>
              <Text style={[styles.cisoValue, { color: '#10B981' }]}>98%</Text>
            </View>
            <View style={[styles.cisoCard, { backgroundColor: '#F59E0B' + '10', borderColor: '#F59E0B' }]}>
              <Text style={[styles.cisoLabel, { color: theme.colors.textSecondary }]}>Enterprise Risk Level</Text>
              <Text style={[styles.cisoValue, { color: '#F59E0B' }]}>Moderate</Text>
            </View>
          </View>
        </View>

        {/* SECTION 3: Threat Intelligence Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Threat Intelligence Center</Text>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#EF4444' + '20' }]}>
              <Text style={[styles.headerButtonTex, { color: '#EF4444' }]}>View Map</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.threatScroll}>
            {threatIntelligence.map(renderThreatCard)}
          </ScrollView>
        </View>

        {/* SECTION 4: Security Operations Center (SOC) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Security Operations Center</Text>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#EF4444' + '20' }]}>
              <Text style={[styles.headerButtonTex, { color: '#EF4444' }]}>View Queue</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.alertsScroll}>
            {securityAlerts.map(renderAlertCard)}
          </ScrollView>
        </View>

        {/* SECTION 5: Vulnerability Management Hub */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Vulnerability Management Hub</Text>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#EF4444' + '20' }]}>
              <Text style={[styles.headerButtonTex, { color: '#EF4444' }]}>Scan Assets</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vulnScroll}>
            {vulnerabilities.map(renderVulnerabilityCard)}
          </ScrollView>
        </View>

        {/* SECTION 6: Incident Response War Room */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Incident Response War Room</Text>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#EF4444' + '20' }]}>
              <Text style={[styles.headerButtonTex, { color: '#EF4444' }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.incidentScroll}>
            {incidents.map(renderIncidentCard)}
          </ScrollView>
        </View>

        {/* SECTION 7: Identity & Access Security */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Identity & Access Security</Text>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#EF4444' + '20' }]}>
              <Text style={[styles.headerButtonTex, { color: '#EF4444' }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.identityScroll}>
            {identityEvents.map(renderIdentityEvent)}
          </ScrollView>
        </View>

        {/* SECTION 8: Enterprise Risk Management */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Risk Management</Text>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#EF4444' + '20' }]}>
              <Text style={[styles.headerButtonTex, { color: '#EF4444' }]}>Risk Matrix</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.riskScroll}>
            {riskAssessments.map(renderRiskCard)}
          </ScrollView>
        </View>

        {/* SECTION 9: Compliance Control Center */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Compliance Control Center</Text>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#EF4444' + '20' }]}>
              <Text style={[styles.headerButtonTex, { color: '#EF4444' }]}>Audit Report</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.complianceScroll}>
            {complianceItems.map(renderComplianceCard)}
          </ScrollView>
        </View>

        {/* SECTION 10: Fraud & Anomaly Detection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Fraud & Anomaly Detection</Text>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#EF4444' + '20' }]}>
              <Text style={[styles.headerButtonTex, { color: '#EF4444' }]}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fraudScroll}>
            {fraudAlerts.map(renderFraudCard)}
          </ScrollView>
        </View>

        {/* SECTION 11: AI Security Insights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Security Insights</Text>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#EF4444' + '20' }]}>
              <Text style={[styles.headerButtonTex, { color: '#EF4444' }]}>Generate Report</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.insightsGrid}>
            {securityInsights.map(renderInsightCard)}
          </View>
        </View>

        {/* SECTION 12: Real-Time Security Feed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-Time Security Feed</Text>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#EF4444' + '20' }]}>
              <RefreshCw size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
          <View style={styles.activityFeed}>
            {securityActivities.map(renderActivityItem)}
          </View>
        </View>

        {/* SECTION 13: Security Platform Health */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Security Platform Health</Text>
            <TouchableOpacity style={[styles.headerButton, { backgroundColor: '#EF4444' + '20' }]}>
              <Text style={[styles.headerButtonTex, { color: '#EF4444' }]}>System Status</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.healthGrid}>
            {platformHealth.map(renderSystemHealthItem)}
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
    width: 240,
    borderRightWidth: 1,
    borderRightColor: '#1F2937',
    paddingTop: 20,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  sidebarScroll: {
    flex: 1,
    paddingTop: 10,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sidebarItemActive: {
    backgroundColor: '#EF4444' + '10',
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  sidebarItemText: {
    fontSize: 14,
    marginLeft: 12,
  },
  sidebarItemTextActive: {
    fontWeight: '600',
  },
  sidebarCollapse: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1F2937',
  },
  mainContent: {
    flex: 1,
    padding: 20,
  },
  executiveBar: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  headerButtonTex: {
    fontSize: 14,
    fontWeight: '600',
  },
  kpiScroll: {
    flexDirection: 'row',
  },
  kpiCard: {
    width: 180,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    position: 'relative',
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  kpiFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  kpiChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  kpiSubtitle: {
    fontSize: 10,
  },
  severityIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  section: {
    marginBottom: 32,
  },
  cisoSection: {
    marginBottom: 32,
  },
  cisoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cisoCard: {
    width: 'calc(20% - 10px)',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  cisoLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  cisoValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  agentsScroll: {
    flexDirection: 'row',
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  agentAvatarText: {
    fontSize: 24,
  },
  agentStatus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1F2937',
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
    borderRadius: 6,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metricItem: {
    marginRight: 16,
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
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
  },
  impactLabel: {
    fontSize: 11,
  },
  impactValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  threatScroll: {
    flexDirection: 'row',
  },
  threatCard: {
    width: 300,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  threatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  threatTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  threatTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  threatTime: {
    fontSize: 11,
  },
  threatTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  threatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  threatSource: {
    fontSize: 11,
  },
  threatAssets: {
    fontSize: 11,
  },
  threatStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  threatStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  alertsScroll: {
    flexDirection: 'row',
  },
  alertCard: {
    width: 300,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  alertTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  alertTime: {
    fontSize: 11,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  alertSource: {
    fontSize: 11,
  },
  alertAssigned: {
    fontSize: 11,
  },
  alertStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  alertStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  vulnScroll: {
    flexDirection: 'row',
  },
  vulnCard: {
    width: 300,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  vulnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vulnCVE: {
    fontSize: 12,
    fontWeight: '600',
  },
  vulnCVSS: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  vulnCVSSText: {
    fontSize: 10,
    fontWeight: '600',
  },
  vulnTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  vulnFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vulnMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  vulnTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  vulnTagText: {
    fontSize: 9,
    fontWeight: '600',
  },
  vulnStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  vulnStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  incidentScroll: {
    flexDirection: 'row',
  },
  incidentCard: {
    width: 320,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  incidentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  incidentType: {
    fontSize: 12,
    fontWeight: '600',
  },
  incidentSeverity: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  incidentSeverityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  incidentTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  incidentDescription: {
    fontSize: 12,
    marginBottom: 12,
  },
  incidentWorkflow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  workflowStep: {
    alignItems: 'center',
  },
  workflowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  workflowLine: {
    width: 40,
    height: 2,
    marginTop: -4,
  },
  incidentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incidentAssigned: {
    fontSize: 11,
  },
  incidentTime: {
    fontSize: 11,
  },
  identityScroll: {
    flexDirection: 'row',
  },
  identityCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  identityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  identityRisk: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  identityRiskText: {
    fontSize: 10,
    fontWeight: '600',
  },
  identityTime: {
    fontSize: 11,
  },
  identityUser: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  identityAction: {
    fontSize: 12,
    marginBottom: 8,
  },
  identityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  identityResource: {
    fontSize: 11,
  },
  identityLocation: {
    fontSize: 11,
  },
  identityStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  identityStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  riskScroll: {
    flexDirection: 'row',
  },
  riskCard: {
    width: 320,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  riskCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  riskCategoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  riskLevel: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  riskLevelText: {
    fontSize: 10,
    fontWeight: '600',
  },
  riskTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  riskMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  riskMetric: {
    marginRight: 16,
  },
  riskMetricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  riskMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  riskMitigation: {
    fontSize: 12,
    marginBottom: 8,
  },
  riskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  riskOwner: {
    fontSize: 11,
  },
  riskUpdated: {
    fontSize: 11,
  },
  complianceScroll: {
    flexDirection: 'row',
  },
  complianceCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  complianceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  complianceFramework: {
    fontSize: 14,
    fontWeight: '600',
  },
  complianceStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  complianceStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  complianceControl: {
    fontSize: 12,
    marginBottom: 12,
  },
  complianceMetrics: {
    marginBottom: 12,
  },
  complianceMetric: {
    marginBottom: 8,
  },
  complianceMetricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  complianceMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  complianceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  complianceAudit: {
    fontSize: 11,
  },
  complianceNext: {
    fontSize: 11,
  },
  fraudScroll: {
    flexDirection: 'row',
  },
  fraudCard: {
    width: 300,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
  },
  fraudHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fraudType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  fraudTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  fraudTime: {
    fontSize: 11,
  },
  fraudDescription: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  fraudAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fraudFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fraudConfidence: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  fraudConfidenceText: {
    fontSize: 10,
    fontWeight: '600',
  },
  fraudStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  fraudStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  insightCard: {
    width: 'calc(50% - 6px)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  insightDescription: {
    fontSize: 12,
  },
  activityFeed: {
    maxHeight: 400,
  },
  activityItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
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
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 11,
    marginBottom: 2,
  },
  activityAgent: {
    fontSize: 11,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthItem: {
    width: 'calc(33.33% - 8px)',
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
    borderRadius: 6,
  },
  healthDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  healthStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  healthMetrics: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  healthMetric: {
    marginRight: 16,
  },
  healthMetricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  healthMetricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  healthLastCheck: {
    fontSize: 11,
  },
});
