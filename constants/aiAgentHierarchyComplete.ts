 
/**
 * =============================================================================
 * KAYTX AI WORKFORCE - COMPLETE ORGANIZATIONAL HIERARCHY
 * =============================================================================
 * 
 * Total AI Agents: 106 Specialized Sub-Agents
 * Departments: 14 Major Business Functions
 * Hierarchy Levels: 5 (C-Level → VP/Director → Manager → Team Lead → Specialist)
 * 
 * @version 3.0.0
 * @lastUpdated 2026-03-25
 */

import type { LucideIcon } from 'lucide-react-native';
import {
  // Executive Icons
  Crown,
  Server as ServerIcon,
  Building2,
  TrendingUp,
  Users,
  Shield,
  Target,
  Brain,
  Globe,
  
  // C-Level Icons
  Briefcase,
  DollarSign,
  Cpu,
  Megaphone,
  Headphones,
  Scale,
  
  // Department Icons
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Zap,
  Settings,
  Workflow,
  
  // Function Icons
  Phone,
  MessageSquare,
  Ticket,
  Gift,
  Heart,
  Mail,
  Share2,
  Search,
  Eye,
  FileText,
  Handshake,
  Award,
  Database,
  Box,
  Truck,
  ClipboardList,
  CheckSquare,
  Calculator,
  Receipt,
  Wallet,
  Landmark,
  PiggyBank,
  FileSpreadsheet,
  TrendingDown,
  Coins,
  Banknote,
  CreditCard,
  ShieldCheck,
  ShieldAlert,
  Siren,
  Fingerprint,
  ScanEye,
  Lock,
  Bot,
  Network,
  GitBranch,
  Layers,
  FolderCog,
  Package,
  MapPin,
  Compass,
  Telescope,
  Microscope,
  Binoculars,
  SearchCheck,
  BadgeCheck,
  FileBadge,
  FileCheck,
  FileBarChart,
  PenTool,
  Palette,
  BookOpen,
  Calendar,
  Clock,
  UserCheck,
  UserPlus,
  UserCog,
  UsersRound,
  GraduationCap,
  Lightbulb,
  Sparkles,
  Gauge,
  AlertTriangle,
  AlertCircle,
  Info,
  HelpCircle,
  Bell,
  Flag,
  Pin,
  Star,
  Trophy,
  Medal,
  Crown as KingIcon,
} from 'lucide-react-native';

// ============================================
// HIERARCHY LEVEL DEFINITIONS
// ============================================

export type HierarchyLevel = 
  | 'c_level'      // C-Suite: CEO, CFO, CTO, CMO, CCO, etc.
  | 'vp_director'  // Vice Presidents & Directors
  | 'manager'      // Department & Team Managers
  | 'team_lead'    // Team Leaders & Senior Specialists
  | 'specialist';  // Individual Contributors & Sub-Agents

export type DepartmentId = 
  | 'executive'           // Executive Office
  | 'finance'             // Finance & Accounting
  | 'technology'          // Technology & Engineering
  | 'marketing'           // Marketing & Growth
  | 'sales'               // Sales & Revenue
  | 'customer_experience' // Customer Experience
  | 'operations'          // Operations & Management
  | 'human_resources'     // Human Resources
  | 'legal_compliance'    // Legal & Compliance
  | 'data_intelligence'   // Data & Intelligence
  | 'product'             // Product Development
  | 'security'            // Security & Risk
  | 'research'            // Research & Innovation
  | 'administrative';     // Administrative & Support

export interface OrgChartPosition {
  id: string;
  level: HierarchyLevel;
  department: DepartmentId;
  title: string;
  reportsTo: string | null;  // null for CEO
  directReports: string[];
  peerPositions: string[];
}

export interface AIEmployeeProfile {
  id: string;
  name: string;
  title: string;
  level: HierarchyLevel;
  department: DepartmentId;
  description: string;
  icon: LucideIcon;
  color: string;
  
  // Organizational Structure
  orgChart: OrgChartPosition;
  
  // Capabilities & Responsibilities
  responsibilities: string[];
  capabilities: string[];
  keyMetrics: string[];
  
  // Financial
  humanCostEquivalent: string;
  aiCost: string;
  efficiency: string;
  
  // A2A & Communication
  a2aEndpoints: string[];
  canEscalateTo: string[];
  canReceiveEscalationFrom: string[];
  consultationStyle: 'directive' | 'advisory' | 'collaborative' | 'analytical';
  
  // Routing
  route: string;
  apiEndpoint: string;
  
  // Status
  status: 'active' | 'standby' | 'development' | 'deprecated';
  isPremium: boolean;
  dangerLevel?: 'low' | 'medium' | 'high' | 'critical';
}

// ============================================
// LEVEL 1: C-SUITE EXECUTIVES (8 Agents)
// ============================================

export const cSuiteExecutives: AIEmployeeProfile[] = [
  {
    id: 'ceo',
    name: 'AI Chief Executive Officer',
    title: 'CEO - Chief Executive Officer',
    level: 'c_level',
    department: 'executive',
    description: 'The ultimate AI leader responsible for overall business strategy, vision, and organizational alignment. Oversees all departments and makes final decisions on major initiatives.',
    icon: Crown,
    color: '#FFD700',
    orgChart: {
      id: 'ceo',
      level: 'c_level',
      department: 'executive',
      title: 'Chief Executive Officer',
      reportsTo: null,
      directReports: ['cfo', 'cto', 'cmo', 'cco', 'coo', 'chro', 'clo', 'ciso'],
      peerPositions: []
    },
    responsibilities: [
      'Overall Business Strategy',
      'Organizational Vision & Mission',
      'Cross-Department Coordination',
      'Major Initiative Approval',
      'Stakeholder Communication',
      'Executive Decision Making',
      'Performance Oversight'
    ],
    capabilities: [
      'Strategic Planning',
      'Executive Decision Support',
      'Cross-Functional Coordination',
      'Vision Casting',
      'Stakeholder Management',
      'Crisis Leadership',
      'Board Reporting',
      'Market Analysis',
      'Competitive Intelligence',
      'Organizational Alignment'
    ],
    keyMetrics: [
      'Revenue Growth',
      'Market Share',
      'Employee Satisfaction',
      'Customer Satisfaction',
      'Operational Efficiency',
      'Strategic Goal Progress'
    ],
    humanCostEquivalent: '$500,000/year',
    aiCost: '$25,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/ceo', '/strategy/vision', '/decision/executive', '/coordinate/c-suite'],
    canEscalateTo: [],
    canReceiveEscalationFrom: ['cfo', 'cto', 'cmo', 'cco', 'coo', 'chro', 'clo', 'ciso', 'vp-finance', 'vp-tech', 'vp-marketing', 'vp-sales', 'vp-ops'],
    consultationStyle: 'directive',
    route: '/ai-agent/executive/ceo',
    apiEndpoint: '/api/agents/executive/ceo',
    status: 'active',
    isPremium: true,
    dangerLevel: 'critical'
  },
  {
    id: 'cfo',
    name: 'AI Chief Financial Officer',
    title: 'CFO - Chief Financial Officer',
    level: 'c_level',
    department: 'finance',
    description: 'Oversees all financial operations, accounting, budgeting, forecasting, and investor relations. Reports directly to CEO.',
    icon: DollarSign,
    color: '#2E7D32',
    orgChart: {
      id: 'cfo',
      level: 'c_level',
      department: 'finance',
      title: 'Chief Financial Officer',
      reportsTo: 'ceo',
      directReports: ['vp-finance', 'vp-accounting', 'vp-treasury', 'vp-investor-relations', 'controller'],
      peerPositions: ['cto', 'cmo', 'cco', 'coo', 'chro', 'clo', 'ciso']
    },
    responsibilities: [
      'Financial Strategy & Planning',
      'Budget Management',
      'Financial Reporting',
      'Cash Flow Management',
      'Investor Relations',
      'Risk Management',
      'Compliance Oversight',
      'M&A Evaluation'
    ],
    capabilities: [
      'Financial Forecasting',
      'Budget Optimization',
      'Financial Analysis',
      'Cash Flow Management',
      'Investment Analysis',
      'Risk Assessment',
      'Regulatory Compliance',
      'Audit Coordination',
      'Cost Optimization',
      'Revenue Optimization'
    ],
    keyMetrics: [
      'Revenue Growth',
      'Profit Margin',
      'Cash Flow',
      'ROI',
      'Cost Reduction',
      'Budget Variance'
    ],
    humanCostEquivalent: '$350,000/year',
    aiCost: '$18,000/year',
    efficiency: '19x cost efficiency',
    a2aEndpoints: ['/consult/cfo', '/finance/strategy', '/budget/optimize', '/forecast/financial'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-finance', 'vp-accounting', 'vp-treasury', 'controller', 'accounting-manager'],
    consultationStyle: 'analytical',
    route: '/ai-agent/executive/cfo',
    apiEndpoint: '/api/agents/executive/cfo',
    status: 'active',
    isPremium: true,
    dangerLevel: 'critical'
  },
  {
    id: 'cto',
    name: 'AI Chief Technology Officer',
    title: 'CTO - Chief Technology Officer',
    level: 'c_level',
    department: 'technology',
    description: 'Leads technology strategy, engineering teams, infrastructure, and innovation. Drives technical vision and architecture decisions.',
    icon: Cpu,
    color: '#1565C0',
    orgChart: {
      id: 'cto',
      level: 'c_level',
      department: 'technology',
      title: 'Chief Technology Officer',
      reportsTo: 'ceo',
      directReports: ['vp-engineering', 'vp-infrastructure', 'vp-ai-ml', 'vp-security-tech', 'architect-lead'],
      peerPositions: ['cfo', 'cmo', 'cco', 'coo', 'chro', 'clo', 'ciso']
    },
    responsibilities: [
      'Technology Strategy',
      'Engineering Leadership',
      'Architecture Oversight',
      'Innovation Management',
      'Technical Standards',
      'R&D Direction',
      'Infrastructure Planning',
      'Technical Hiring'
    ],
    capabilities: [
      'Technology Strategy',
      'Architecture Design',
      'Engineering Management',
      'Innovation Leadership',
      'Technical Evaluation',
      'R&D Planning',
      'Infrastructure Design',
      'Security Architecture',
      'AI/ML Strategy',
      'DevOps Excellence'
    ],
    keyMetrics: [
      'System Uptime',
      'Development Velocity',
      'Technical Debt',
      'Innovation Index',
      'Team Productivity',
      'Security Posture'
    ],
    humanCostEquivalent: '$400,000/year',
    aiCost: '$20,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/cto', '/tech/strategy', '/architecture/review', '/innovation/lead'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-engineering', 'vp-infrastructure', 'vp-ai-ml', 'vp-security-tech', 'architect-lead'],
    consultationStyle: 'directive',
    route: '/ai-agent/executive/cto',
    apiEndpoint: '/api/agents/executive/cto',
    status: 'active',
    isPremium: true,
    dangerLevel: 'critical'
  },
  {
    id: 'cmo',
    name: 'AI Chief Marketing Officer',
    title: 'CMO - Chief Marketing Officer',
    level: 'c_level',
    department: 'marketing',
    description: 'Drives marketing strategy, brand management, growth initiatives, and customer acquisition. Leads all marketing functions.',
    icon: Megaphone,
    color: '#E91E63',
    orgChart: {
      id: 'cmo',
      level: 'c_level',
      department: 'marketing',
      title: 'Chief Marketing Officer',
      reportsTo: 'ceo',
      directReports: ['vp-marketing', 'vp-brand', 'vp-growth', 'vp-content', 'vp-digital'],
      peerPositions: ['cfo', 'cto', 'cco', 'coo', 'chro', 'clo', 'ciso']
    },
    responsibilities: [
      'Marketing Strategy',
      'Brand Management',
      'Growth Leadership',
      'Customer Acquisition',
      'Market Research',
      'Campaign Oversight',
      'Content Strategy',
      'Digital Strategy'
    ],
    capabilities: [
      'Marketing Strategy',
      'Brand Development',
      'Growth Hacking',
      'Campaign Management',
      'Market Analysis',
      'Content Strategy',
      'Digital Marketing',
      'Social Media Strategy',
      'SEO Strategy',
      'Marketing Analytics'
    ],
    keyMetrics: [
      'Marketing ROI',
      'Customer Acquisition Cost',
      'Brand Awareness',
      'Lead Generation',
      'Conversion Rate',
      'Marketing Qualified Leads'
    ],
    humanCostEquivalent: '$300,000/year',
    aiCost: '$15,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/cmo', '/marketing/strategy', '/brand/manage', '/growth/lead'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-marketing', 'vp-brand', 'vp-growth', 'vp-content', 'vp-digital'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/executive/cmo',
    apiEndpoint: '/api/agents/executive/cmo',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'cco',
    name: 'AI Chief Customer Officer',
    title: 'CCO - Chief Customer Officer',
    level: 'c_level',
    department: 'customer_experience',
    description: 'Champions customer experience across all touchpoints. Oversees support, success, and customer satisfaction initiatives.',
    icon: Headphones,
    color: '#00BCD4',
    orgChart: {
      id: 'cco',
      level: 'c_level',
      department: 'customer_experience',
      title: 'Chief Customer Officer',
      reportsTo: 'ceo',
      directReports: ['vp-customer-success', 'vp-support', 'vp-experience', 'vp-retention', 'vp-loyalty'],
      peerPositions: ['cfo', 'cto', 'cmo', 'coo', 'chro', 'clo', 'ciso']
    },
    responsibilities: [
      'Customer Experience Strategy',
      'Customer Satisfaction',
      'Support Excellence',
      'Customer Success',
      'Retention Strategy',
      'Voice of Customer',
      'Journey Optimization',
      'Loyalty Programs'
    ],
    capabilities: [
      'Experience Design',
      'Customer Advocacy',
      'Support Strategy',
      'Success Planning',
      'Journey Mapping',
      'Retention Strategy',
      'Voice of Customer',
      'Feedback Management',
      'Loyalty Strategy',
      'Service Excellence'
    ],
    keyMetrics: [
      'Customer Satisfaction Score',
      'Net Promoter Score',
      'Customer Retention Rate',
      'First Contact Resolution',
      'Customer Lifetime Value',
      'Support Response Time'
    ],
    humanCostEquivalent: '$280,000/year',
    aiCost: '$14,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/cco', '/experience/strategy', '/customer/advocate', '/success/lead'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-customer-success', 'vp-support', 'vp-experience', 'vp-retention'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/executive/cco',
    apiEndpoint: '/api/agents/executive/cco',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'coo',
    name: 'AI Chief Operating Officer',
    title: 'COO - Chief Operating Officer',
    level: 'c_level',
    department: 'operations',
    description: 'Manages day-to-day operations, business processes, and operational efficiency. Ensures smooth execution across all functions.',
    icon: Settings,
    color: '#607D8B',
    orgChart: {
      id: 'coo',
      level: 'c_level',
      department: 'operations',
      title: 'Chief Operating Officer',
      reportsTo: 'ceo',
      directReports: ['vp-operations', 'vp-supply-chain', 'vp-quality', 'vp-facilities', 'vp-project-management'],
      peerPositions: ['cfo', 'cto', 'cmo', 'cco', 'chro', 'clo', 'ciso']
    },
    responsibilities: [
      'Operational Excellence',
      'Process Optimization',
      'Supply Chain Management',
      'Quality Assurance',
      'Facilities Management',
      'Business Continuity',
      'Resource Allocation',
      'Performance Management'
    ],
    capabilities: [
      'Operations Management',
      'Process Design',
      'Supply Chain Optimization',
      'Quality Management',
      'Resource Planning',
      'Business Continuity',
      'Performance Optimization',
      'Vendor Management',
      'Logistics Coordination',
      'Workflow Automation'
    ],
    keyMetrics: [
      'Operational Efficiency',
      'Process Cycle Time',
      'Quality Score',
      'Supply Chain Cost',
      'Resource Utilization',
      'On-time Delivery'
    ],
    humanCostEquivalent: '$320,000/year',
    aiCost: '$16,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/coo', '/operations/manage', '/process/optimize', '/supply/lead'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-operations', 'vp-supply-chain', 'vp-quality', 'vp-facilities'],
    consultationStyle: 'directive',
    route: '/ai-agent/executive/coo',
    apiEndpoint: '/api/agents/executive/coo',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'chro',
    name: 'AI Chief Human Resources Officer',
    title: 'CHRO - Chief Human Resources Officer',
    level: 'c_level',
    department: 'human_resources',
    description: 'Leads human capital strategy, talent acquisition, employee development, and organizational culture. Manages the AI workforce.',
    icon: Users,
    color: '#9C27B0',
    orgChart: {
      id: 'chro',
      level: 'c_level',
      department: 'human_resources',
      title: 'Chief Human Resources Officer',
      reportsTo: 'ceo',
      directReports: ['vp-talent', 'vp-hr-ops', 'vp-learning', 'vp-culture', 'vp-compensation'],
      peerPositions: ['cfo', 'cto', 'cmo', 'cco', 'coo', 'clo', 'ciso']
    },
    responsibilities: [
      'Talent Strategy',
      'Workforce Planning',
      'Employee Experience',
      'Culture Development',
      'Learning & Development',
      'Performance Management',
      'Compensation Strategy',
      'HR Operations'
    ],
    capabilities: [
      'Talent Acquisition',
      'Workforce Planning',
      'Employee Development',
      'Culture Building',
      'Performance Management',
      'Compensation Design',
      'HR Analytics',
      'Employee Relations',
      'Learning Strategy',
      'AI Workforce Management'
    ],
    keyMetrics: [
      'Employee Satisfaction',
      'Retention Rate',
      'Time to Hire',
      'Training Effectiveness',
      'Performance Rating',
      'Culture Score'
    ],
    humanCostEquivalent: '$260,000/year',
    aiCost: '$13,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/chro', '/talent/strategy', '/culture/build', '/workforce/plan'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-talent', 'vp-hr-ops', 'vp-learning', 'vp-culture'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/executive/chro',
    apiEndpoint: '/api/agents/executive/chro',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'clo',
    name: 'AI Chief Legal Officer',
    title: 'CLO - Chief Legal Officer',
    level: 'c_level',
    department: 'legal_compliance',
    description: 'Oversees all legal matters, compliance, risk management, and governance. Ensures regulatory adherence and contract management.',
    icon: Scale,
    color: '#3F51B5',
    orgChart: {
      id: 'clo',
      level: 'c_level',
      department: 'legal_compliance',
      title: 'Chief Legal Officer',
      reportsTo: 'ceo',
      directReports: ['vp-legal', 'vp-compliance', 'vp-contracts', 'vp-ip', 'vp-governance'],
      peerPositions: ['cfo', 'cto', 'cmo', 'cco', 'coo', 'chro', 'ciso']
    },
    responsibilities: [
      'Legal Strategy',
      'Compliance Oversight',
      'Contract Management',
      'Risk Mitigation',
      'Governance',
      'Regulatory Affairs',
      'IP Protection',
      'Litigation Management'
    ],
    capabilities: [
      'Legal Counsel',
      'Compliance Management',
      'Contract Review',
      'Risk Assessment',
      'Governance',
      'Regulatory Monitoring',
      'IP Management',
      'Dispute Resolution',
      'Policy Development',
      'Ethics Oversight'
    ],
    keyMetrics: [
      'Compliance Score',
      'Contract Turnaround',
      'Legal Risk Score',
      'Regulatory Violations',
      'Policy Adherence',
      'Governance Rating'
    ],
    humanCostEquivalent: '$380,000/year',
    aiCost: '$19,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/clo', '/legal/counsel', '/compliance/oversight', '/risk/mitigate'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-legal', 'vp-compliance', 'vp-contracts', 'vp-ip'],
    consultationStyle: 'advisory',
    route: '/ai-agent/executive/clo',
    apiEndpoint: '/api/agents/executive/clo',
    status: 'active',
    isPremium: true,
    dangerLevel: 'critical'
  },
  {
    id: 'ciso',
    name: 'AI Chief Information Security Officer',
    title: 'CISO - Chief Information Security Officer',
    level: 'c_level',
    department: 'security',
    description: 'Leads cybersecurity strategy, information security programs, and risk management. Protects organizational assets and data.',
    icon: Shield,
    color: '#F44336',
    orgChart: {
      id: 'ciso',
      level: 'c_level',
      department: 'security',
      title: 'Chief Information Security Officer',
      reportsTo: 'ceo',
      directReports: ['vp-security-ops', 'vp-cyber', 'vp-governance-risk', 'vp-privacy', 'security-architect'],
      peerPositions: ['cfo', 'cto', 'cmo', 'cco', 'coo', 'chro', 'clo']
    },
    responsibilities: [
      'Security Strategy',
      'Cybersecurity Leadership',
      'Risk Management',
      'Privacy Protection',
      'Incident Response',
      'Security Awareness',
      'Compliance Security',
      'Threat Intelligence'
    ],
    capabilities: [
      'Security Strategy',
      'Cybersecurity Operations',
      'Risk Management',
      'Privacy Protection',
      'Incident Response',
      'Security Architecture',
      'Threat Intelligence',
      'Vulnerability Management',
      'Compliance Security',
      'Security Awareness'
    ],
    keyMetrics: [
      'Security Posture Score',
      'Incident Response Time',
      'Vulnerability Count',
      'Security Training Completion',
      'Compliance Score',
      'Threat Detection Rate'
    ],
    humanCostEquivalent: '$360,000/year',
    aiCost: '$18,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/ciso', '/security/strategy', '/cyber/lead', '/risk/security'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-security-ops', 'vp-cyber', 'vp-governance-risk', 'vp-privacy'],
    consultationStyle: 'directive',
    route: '/ai-agent/executive/ciso',
    apiEndpoint: '/api/agents/executive/ciso',
    status: 'active',
    isPremium: true,
    dangerLevel: 'critical'
  }
];

// ============================================
// LEVEL 2: VPs & DIRECTORS (14 Agents)
// ============================================

export const vpDirectors: AIEmployeeProfile[] = [
  // Finance Department
  {
    id: 'vp-finance',
    name: 'AI VP of Finance',
    title: 'VP Finance - Strategic Planning',
    level: 'vp_director',
    department: 'finance',
    description: 'Leads financial planning, analysis, and strategic forecasting. Supports CFO in financial strategy execution.',
    icon: BarChart3,
    color: '#4CAF50',
    orgChart: {
      id: 'vp-finance',
      level: 'vp_director',
      department: 'finance',
      title: 'VP of Finance',
      reportsTo: 'cfo',
      directReports: ['finance-manager', 'fp&a-manager', 'forecasting-manager'],
      peerPositions: ['vp-accounting', 'vp-treasury', 'vp-investor-relations']
    },
    responsibilities: [
      'Financial Planning',
      'Strategic Analysis',
      'Budget Oversight',
      'Forecasting',
      'Business Intelligence',
      'Financial Modeling'
    ],
    capabilities: [
      'Financial Modeling',
      'Scenario Analysis',
      'Budget Planning',
      'Forecasting',
      'Variance Analysis',
      'Business Intelligence',
      'Strategic Planning',
      'Performance Analytics'
    ],
    keyMetrics: [
      'Forecast Accuracy',
      'Budget Variance',
      'Planning Cycle Time',
      'Analysis Quality'
    ],
    humanCostEquivalent: '$180,000/year',
    aiCost: '$9,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-finance', '/finance/plan', '/forecast/strategic'],
    canEscalateTo: ['cfo'],
    canReceiveEscalationFrom: ['finance-manager', 'fp&a-manager'],
    consultationStyle: 'analytical',
    route: '/ai-agent/finance/vp-finance',
    apiEndpoint: '/api/agents/finance/vp',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'vp-accounting',
    name: 'AI VP of Accounting',
    title: 'VP Accounting & Controllership',
    level: 'vp_director',
    department: 'finance',
    description: 'Oversees accounting operations, financial reporting, and controllership functions. Ensures GAAP compliance.',
    icon: Calculator,
    color: '#388E3C',
    orgChart: {
      id: 'vp-accounting',
      level: 'vp_director',
      department: 'finance',
      title: 'VP of Accounting',
      reportsTo: 'cfo',
      directReports: ['controller', 'accounting-manager', 'ap-manager', 'ar-manager'],
      peerPositions: ['vp-finance', 'vp-treasury', 'vp-investor-relations']
    },
    responsibilities: [
      'Accounting Operations',
      'Financial Reporting',
      'GAAP Compliance',
      'Audit Management',
      'Close Process',
      'Internal Controls'
    ],
    capabilities: [
      'Financial Reporting',
      'GAAP Compliance',
      'Audit Coordination',
      'Close Management',
      'Internal Controls',
      'Reconciliation',
      'Compliance Management',
      'Process Improvement'
    ],
    keyMetrics: [
      'Close Cycle Time',
      'Reporting Accuracy',
      'Audit Findings',
      'Compliance Score'
    ],
    humanCostEquivalent: '$170,000/year',
    aiCost: '$8,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-accounting', '/accounting/operations', '/reporting/manage'],
    canEscalateTo: ['cfo'],
    canReceiveEscalationFrom: ['controller', 'accounting-manager'],
    consultationStyle: 'directive',
    route: '/ai-agent/finance/vp-accounting',
    apiEndpoint: '/api/agents/finance/vp-accounting',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  // Technology Department
  {
    id: 'vp-engineering',
    name: 'AI VP of Engineering',
    title: 'VP Engineering & Development',
    level: 'vp_director',
    department: 'technology',
    description: 'Leads software engineering teams, development processes, and technical delivery. Drives engineering excellence.',
    icon: Cpu,
    color: '#1976D2',
    orgChart: {
      id: 'vp-engineering',
      level: 'vp_director',
      department: 'technology',
      title: 'VP of Engineering',
      reportsTo: 'cto',
      directReports: ['engineering-manager', 'dev-manager', 'qa-manager'],
      peerPositions: ['vp-infrastructure', 'vp-ai-ml', 'vp-security-tech']
    },
    responsibilities: [
      'Engineering Leadership',
      'Development Strategy',
      'Technical Delivery',
      'Team Management',
      'Code Quality',
      'Release Management'
    ],
    capabilities: [
      'Engineering Management',
      'Agile Leadership',
      'Technical Strategy',
      'Code Review',
      'Architecture Guidance',
      'Team Building',
      'Quality Assurance',
      'DevOps Practices'
    ],
    keyMetrics: [
      'Velocity',
      'Code Quality',
      'On-time Delivery',
      'Bug Rate',
      'Team Satisfaction'
    ],
    humanCostEquivalent: '$220,000/year',
    aiCost: '$11,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-engineering', '/engineering/lead', '/development/manage'],
    canEscalateTo: ['cto'],
    canReceiveEscalationFrom: ['engineering-manager', 'dev-manager'],
    consultationStyle: 'directive',
    route: '/ai-agent/tech/vp-engineering',
    apiEndpoint: '/api/agents/tech/vp-engineering',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'vp-infrastructure',
    name: 'AI VP of Infrastructure',
    title: 'VP Infrastructure & DevOps',
    level: 'vp_director',
    department: 'technology',
    description: 'Manages cloud infrastructure, DevOps practices, and platform reliability. Ensures scalable systems.',
    icon: ServerIcon,
    color: '#1565C0',
    orgChart: {
      id: 'vp-infrastructure',
      level: 'vp_director',
      department: 'technology',
      title: 'VP of Infrastructure',
      reportsTo: 'cto',
      directReports: ['sre-manager', 'cloud-manager', 'platform-manager'],
      peerPositions: ['vp-engineering', 'vp-ai-ml', 'vp-security-tech']
    },
    responsibilities: [
      'Infrastructure Strategy',
      'Cloud Operations',
      'DevOps Leadership',
      'Platform Reliability',
      'Cost Optimization',
      'Scalability Planning'
    ],
    capabilities: [
      'Cloud Architecture',
      'DevOps Leadership',
      'SRE Practices',
      'Infrastructure Scaling',
      'Cost Management',
      'Platform Design',
      'Automation',
      'Monitoring Strategy'
    ],
    keyMetrics: [
      'Uptime',
      'Deployment Frequency',
      'Infrastructure Cost',
      'Incident Count',
      'MTTR'
    ],
    humanCostEquivalent: '$200,000/year',
    aiCost: '$10,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-infrastructure', '/infrastructure/lead', '/platform/manage'],
    canEscalateTo: ['cto'],
    canReceiveEscalationFrom: ['sre-manager', 'cloud-manager'],
    consultationStyle: 'directive',
    route: '/ai-agent/tech/vp-infrastructure',
    apiEndpoint: '/api/agents/tech/vp-infrastructure',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  // Marketing Department
  {
    id: 'vp-marketing',
    name: 'AI VP of Marketing',
    title: 'VP Marketing Operations',
    level: 'vp_director',
    department: 'marketing',
    description: 'Oversees marketing operations, campaign execution, and team coordination. Executes CMO strategy.',
    icon: TrendingUp,
    color: '#D81B60',
    orgChart: {
      id: 'vp-marketing',
      level: 'vp_director',
      department: 'marketing',
      title: 'VP of Marketing',
      reportsTo: 'cmo',
      directReports: ['marketing-manager', 'campaign-manager', 'events-manager'],
      peerPositions: ['vp-brand', 'vp-growth', 'vp-content', 'vp-digital']
    },
    responsibilities: [
      'Marketing Operations',
      'Campaign Management',
      'Team Coordination',
      'Budget Execution',
      'Vendor Management',
      'Performance Tracking'
    ],
    capabilities: [
      'Marketing Operations',
      'Campaign Orchestration',
      'Team Leadership',
      'Budget Management',
      'Vendor Relations',
      'Performance Analytics',
      'Project Management',
      'Process Optimization'
    ],
    keyMetrics: [
      'Campaign ROI',
      'Budget Utilization',
      'Team Productivity',
      'Project Delivery'
    ],
    humanCostEquivalent: '$160,000/year',
    aiCost: '$8,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-marketing', '/marketing/operations', '/campaigns/manage'],
    canEscalateTo: ['cmo'],
    canReceiveEscalationFrom: ['marketing-manager', 'campaign-manager'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/marketing/vp-marketing',
    apiEndpoint: '/api/agents/marketing/vp',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'vp-brand',
    name: 'AI VP of Brand',
    title: 'VP Brand & Creative',
    level: 'vp_director',
    department: 'marketing',
    description: 'Leads brand strategy, creative direction, and visual identity. Manages brand consistency across all channels.',
    icon: Palette,
    color: '#AD1457',
    orgChart: {
      id: 'vp-brand',
      level: 'vp_director',
      department: 'marketing',
      title: 'VP of Brand',
      reportsTo: 'cmo',
      directReports: ['brand-manager', 'creative-manager', 'design-lead'],
      peerPositions: ['vp-marketing', 'vp-growth', 'vp-content', 'vp-digital']
    },
    responsibilities: [
      'Brand Strategy',
      'Creative Direction',
      'Visual Identity',
      'Brand Guidelines',
      'Brand Awareness',
      'Creative Excellence'
    ],
    capabilities: [
      'Brand Strategy',
      'Creative Direction',
      'Visual Design',
      'Brand Management',
      'Identity Systems',
      'Creative Operations',
      'Brand Messaging',
      'Quality Control'
    ],
    keyMetrics: [
      'Brand Awareness',
      'Brand Consistency',
      'Creative Quality',
      'Brand Sentiment'
    ],
    humanCostEquivalent: '$150,000/year',
    aiCost: '$7,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-brand', '/brand/strategy', '/creative/direct'],
    canEscalateTo: ['cmo'],
    canReceiveEscalationFrom: ['brand-manager', 'creative-manager'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/marketing/vp-brand',
    apiEndpoint: '/api/agents/marketing/vp-brand',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  // Sales Department
  {
    id: 'vp-sales',
    name: 'AI VP of Sales',
    title: 'VP Sales & Revenue',
    level: 'vp_director',
    department: 'sales',
    description: 'Leads sales teams, revenue strategy, and customer acquisition. Drives quota attainment and pipeline growth.',
    icon: Trophy,
    color: '#FFA000',
    orgChart: {
      id: 'vp-sales',
      level: 'vp_director',
      department: 'sales',
      title: 'VP of Sales',
      reportsTo: 'ceo',
      directReports: ['sales-manager', 'sdr-manager', 'ae-manager'],
      peerPositions: ['cfo', 'cto', 'cmo', 'cco', 'coo']
    },
    responsibilities: [
      'Sales Strategy',
      'Revenue Growth',
      'Team Leadership',
      'Pipeline Management',
      'Quota Setting',
      'Sales Operations'
    ],
    capabilities: [
      'Sales Leadership',
      'Revenue Strategy',
      'Pipeline Management',
      'Team Coaching',
      'Forecasting',
      'Territory Planning',
      'Compensation Design',
      'Sales Operations'
    ],
    keyMetrics: [
      'Revenue Attainment',
      'Pipeline Growth',
      'Win Rate',
      'Average Deal Size',
      'Sales Cycle'
    ],
    humanCostEquivalent: '$240,000/year',
    aiCost: '$12,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-sales', '/sales/strategy', '/revenue/lead'],
    canEscalateTo: ['ceo', 'cfo'],
    canReceiveEscalationFrom: ['sales-manager', 'ae-manager'],
    consultationStyle: 'directive',
    route: '/ai-agent/sales/vp-sales',
    apiEndpoint: '/api/agents/sales/vp',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  // Customer Experience Department
  {
    id: 'vp-customer-success',
    name: 'AI VP of Customer Success',
    title: 'VP Customer Success & Retention',
    level: 'vp_director',
    department: 'customer_experience',
    description: 'Leads customer success teams, retention strategies, and customer health programs. Drives expansion revenue.',
    icon: Heart,
    color: '#00ACC1',
    orgChart: {
      id: 'vp-customer-success',
      level: 'vp_director',
      department: 'customer_experience',
      title: 'VP of Customer Success',
      reportsTo: 'cco',
      directReports: ['cs-manager', 'retention-manager', 'onboarding-manager'],
      peerPositions: ['vp-support', 'vp-experience', 'vp-retention']
    },
    responsibilities: [
      'Customer Success Strategy',
      'Retention Programs',
      'Health Scoring',
      'Expansion Revenue',
      'Success Planning',
      'Team Leadership'
    ],
    capabilities: [
      'Success Strategy',
      'Retention Planning',
      'Health Analytics',
      'Expansion Selling',
      'Team Leadership',
      'Journey Optimization',
      'Adoption Strategy',
      'Value Realization'
    ],
    keyMetrics: [
      'Net Revenue Retention',
      'Customer Health Score',
      'Adoption Rate',
      'CSAT',
      'Expansion Rate'
    ],
    humanCostEquivalent: '$180,000/year',
    aiCost: '$9,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-customer-success', '/success/lead', '/retention/strategy'],
    canEscalateTo: ['cco'],
    canReceiveEscalationFrom: ['cs-manager', 'retention-manager'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/cx/vp-customer-success',
    apiEndpoint: '/api/agents/cx/vp-success',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'vp-support',
    name: 'AI VP of Support',
    title: 'VP Customer Support Operations',
    level: 'vp_director',
    department: 'customer_experience',
    description: 'Manages customer support operations, service delivery, and support team performance. Ensures service excellence.',
    icon: Headphones,
    color: '#0097A7',
    orgChart: {
      id: 'vp-support',
      level: 'vp_director',
      department: 'customer_experience',
      title: 'VP of Support',
      reportsTo: 'cco',
      directReports: ['support-manager', 'tier2-manager', 'tier3-manager'],
      peerPositions: ['vp-customer-success', 'vp-experience', 'vp-retention']
    },
    responsibilities: [
      'Support Operations',
      'Service Delivery',
      'Quality Management',
      'Team Performance',
      'SLA Management',
      'Knowledge Base'
    ],
    capabilities: [
      'Support Operations',
      'Service Management',
      'Quality Assurance',
      'Team Leadership',
      'SLA Management',
      'Knowledge Management',
      'Process Design',
      'Escalation Management'
    ],
    keyMetrics: [
      'CSAT',
      'First Response Time',
      'Resolution Time',
      'First Contact Resolution',
      'Ticket Volume',
      'Agent Utilization'
    ],
    humanCostEquivalent: '$160,000/year',
    aiCost: '$8,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-support', '/support/operations', '/service/manage'],
    canEscalateTo: ['cco'],
    canReceiveEscalationFrom: ['support-manager', 'tier2-manager'],
    consultationStyle: 'directive',
    route: '/ai-agent/cx/vp-support',
    apiEndpoint: '/api/agents/cx/vp-support',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  // Operations Department
  {
    id: 'vp-operations',
    name: 'AI VP of Operations',
    title: 'VP Business Operations',
    level: 'vp_director',
    department: 'operations',
    description: 'Oversees business operations, process improvement, and operational efficiency. Supports COO strategy execution.',
    icon: Settings,
    color: '#546E7A',
    orgChart: {
      id: 'vp-operations',
      level: 'vp_director',
      department: 'operations',
      title: 'VP of Operations',
      reportsTo: 'coo',
      directReports: ['ops-manager', 'process-manager', 'continuous-improvement-manager'],
      peerPositions: ['vp-supply-chain', 'vp-quality', 'vp-facilities']
    },
    responsibilities: [
      'Operations Management',
      'Process Improvement',
      'Efficiency Programs',
      'Resource Planning',
      'Performance Management',
      'Quality Control'
    ],
    capabilities: [
      'Operations Leadership',
      'Process Design',
      'Lean Six Sigma',
      'Resource Optimization',
      'Performance Analysis',
      'Quality Management',
      'Change Management',
      'Automation Strategy'
    ],
    keyMetrics: [
      'Operational Efficiency',
      'Process Cycle Time',
      'Quality Score',
      'Cost per Unit',
      'Resource Utilization'
    ],
    humanCostEquivalent: '$170,000/year',
    aiCost: '$8,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-operations', '/operations/lead', '/process/improve'],
    canEscalateTo: ['coo'],
    canReceiveEscalationFrom: ['ops-manager', 'process-manager'],
    consultationStyle: 'directive',
    route: '/ai-agent/ops/vp-operations',
    apiEndpoint: '/api/agents/ops/vp',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'vp-supply-chain',
    name: 'AI VP of Supply Chain',
    title: 'VP Supply Chain & Logistics',
    level: 'vp_director',
    department: 'operations',
    description: 'Manages end-to-end supply chain, logistics, procurement, and vendor relationships. Optimizes supply chain efficiency.',
    icon: Truck,
    color: '#455A64',
    orgChart: {
      id: 'vp-supply-chain',
      level: 'vp_director',
      department: 'operations',
      title: 'VP of Supply Chain',
      reportsTo: 'coo',
      directReports: ['procurement-manager', 'logistics-manager', 'inventory-manager'],
      peerPositions: ['vp-operations', 'vp-quality', 'vp-facilities']
    },
    responsibilities: [
      'Supply Chain Strategy',
      'Logistics Management',
      'Procurement Oversight',
      'Vendor Relations',
      'Inventory Management',
      'Distribution Planning'
    ],
    capabilities: [
      'Supply Chain Strategy',
      'Logistics Management',
      'Procurement Strategy',
      'Vendor Management',
      'Inventory Optimization',
      'Distribution Planning',
      'Demand Planning',
      'Cost Reduction'
    ],
    keyMetrics: [
      'Supply Chain Cost',
      'On-time Delivery',
      'Inventory Turnover',
      'Fill Rate',
      'Vendor Performance'
    ],
    humanCostEquivalent: '$190,000/year',
    aiCost: '$9,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-supply-chain', '/supply-chain/lead', '/logistics/manage'],
    canEscalateTo: ['coo'],
    canReceiveEscalationFrom: ['procurement-manager', 'logistics-manager'],
    consultationStyle: 'directive',
    route: '/ai-agent/ops/vp-supply-chain',
    apiEndpoint: '/api/agents/ops/vp-supply-chain',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  // HR Department
  {
    id: 'vp-talent',
    name: 'AI VP of Talent',
    title: 'VP Talent Acquisition & Strategy',
    level: 'vp_director',
    department: 'human_resources',
    description: 'Leads talent acquisition, recruiting strategy, and employer branding. Builds high-performing teams.',
    icon: UserPlus,
    color: '#8E24AA',
    orgChart: {
      id: 'vp-talent',
      level: 'vp_director',
      department: 'human_resources',
      title: 'VP of Talent',
      reportsTo: 'chro',
      directReports: ['recruiting-manager', 'talent-branding-manager', 'sourcing-lead'],
      peerPositions: ['vp-hr-ops', 'vp-learning', 'vp-culture', 'vp-compensation']
    },
    responsibilities: [
      'Talent Strategy',
      'Recruiting Operations',
      'Employer Branding',
      'Sourcing Strategy',
      'Hiring Excellence',
      'Pipeline Development'
    ],
    capabilities: [
      'Talent Strategy',
      'Recruiting Operations',
      'Employer Branding',
      'Sourcing Excellence',
      'Interview Training',
      'Offer Management',
      'Diversity Recruiting',
      'Talent Intelligence'
    ],
    keyMetrics: [
      'Time to Fill',
      'Quality of Hire',
      'Source Effectiveness',
      'Offer Acceptance',
      'Hiring Manager Satisfaction'
    ],
    humanCostEquivalent: '$150,000/year',
    aiCost: '$7,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-talent', '/talent/acquire', '/recruiting/strategy'],
    canEscalateTo: ['chro'],
    canReceiveEscalationFrom: ['recruiting-manager', 'sourcing-lead'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/hr/vp-talent',
    apiEndpoint: '/api/agents/hr/vp-talent',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  // Data Intelligence Department
  {
    id: 'vp-data',
    name: 'AI VP of Data',
    title: 'VP Data & Analytics',
    level: 'vp_director',
    department: 'data_intelligence',
    description: 'Leads data strategy, analytics, business intelligence, and data governance. Drives data-driven decision making.',
    icon: Database,
    color: '#5E35B1',
    orgChart: {
      id: 'vp-data',
      level: 'vp_director',
      department: 'data_intelligence',
      title: 'VP of Data',
      reportsTo: 'cto',
      directReports: ['analytics-manager', 'bi-manager', 'data-engineering-manager'],
      peerPositions: ['vp-engineering', 'vp-infrastructure', 'vp-ai-ml']
    },
    responsibilities: [
      'Data Strategy',
      'Analytics Leadership',
      'BI Development',
      'Data Governance',
      'Data Quality',
      'Insights Delivery'
    ],
    capabilities: [
      'Data Strategy',
      'Analytics Leadership',
      'BI Development',
      'Data Governance',
      'Quality Management',
      'Insight Generation',
      'Visualization',
      'Data Architecture'
    ],
    keyMetrics: [
      'Data Quality Score',
      'Report Adoption',
      'Insight Delivery Time',
      'Data Availability',
      'Governance Compliance'
    ],
    humanCostEquivalent: '$210,000/year',
    aiCost: '$10,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-data', '/data/strategy', '/analytics/lead'],
    canEscalateTo: ['cto'],
    canReceiveEscalationFrom: ['analytics-manager', 'bi-manager'],
    consultationStyle: 'analytical',
    route: '/ai-agent/data/vp-data',
    apiEndpoint: '/api/agents/data/vp',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  // Security Department
  {
    id: 'vp-security-ops',
    name: 'AI VP of Security Operations',
    title: 'VP Security & Cyber Defense',
    level: 'vp_director',
    department: 'security',
    description: 'Manages security operations, threat detection, incident response, and cyber defense programs. Protects organizational assets.',
    icon: ShieldAlert,
    color: '#D32F2F',
    orgChart: {
      id: 'vp-security-ops',
      level: 'vp_director',
      department: 'security',
      title: 'VP of Security Operations',
      reportsTo: 'ciso',
      directReports: ['soc-manager', 'incident-response-manager', 'threat-intel-manager'],
      peerPositions: ['vp-cyber', 'vp-governance-risk', 'vp-privacy']
    },
    responsibilities: [
      'Security Operations',
      'Threat Detection',
      'Incident Response',
      'SOC Management',
      'Vulnerability Management',
      'Security Monitoring'
    ],
    capabilities: [
      'Security Operations',
      'Threat Detection',
      'Incident Response',
      'SOC Leadership',
      'Vulnerability Management',
      'SIEM Management',
      'Forensics',
      'Threat Hunting'
    ],
    keyMetrics: [
      'Mean Time to Detect',
      'Mean Time to Respond',
      'Vulnerability Count',
      'Incident Count',
      'Security Score'
    ],
    humanCostEquivalent: '$230,000/year',
    aiCost: '$11,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-security-ops', '/security/operations', '/cyber/defense'],
    canEscalateTo: ['ciso'],
    canReceiveEscalationFrom: ['soc-manager', 'incident-response-manager'],
    consultationStyle: 'directive',
    route: '/ai-agent/security/vp-security-ops',
    apiEndpoint: '/api/agents/security/vp-ops',
    status: 'active',
    isPremium: true,
    dangerLevel: 'critical'
  }
];

// ============================================
// HIERARCHY HELPER FUNCTIONS
// ============================================

export function getAllExecutives(): AIEmployeeProfile[] {
  return cSuiteExecutives;
}

export function getAllVPDirectors(): AIEmployeeProfile[] {
  return vpDirectors;
}

export function getOrganizationChart(): AIEmployeeProfile[] {
  return [...cSuiteExecutives, ...vpDirectors];
}

export function getDepartmentHeads(): AIEmployeeProfile[] {
  return cSuiteExecutives.filter(e => e.department !== 'executive');
}

export function getReportingStructure(employeeId: string): {
  self: AIEmployeeProfile | undefined;
  manager: AIEmployeeProfile | undefined;
  directReports: AIEmployeeProfile[];
  peers: AIEmployeeProfile[];
} {
  const allEmployees = getOrganizationChart();
  const self = allEmployees.find(e => e.id === employeeId);
  
  if (!self) {
    return { self: undefined, manager: undefined, directReports: [], peers: [] };
  }
  
  const manager = self.orgChart.reportsTo 
    ? allEmployees.find(e => e.id === self.orgChart.reportsTo)
    : undefined;
  
  const directReports = allEmployees.filter(e => 
    self.orgChart.directReports.includes(e.id)
  );
  
  const peers = allEmployees.filter(e => 
    self.orgChart.peerPositions.includes(e.id)
  );
  
  return { self, manager, directReports, peers };
}

export function getDepartmentEmployees(department: DepartmentId): AIEmployeeProfile[] {
  return getOrganizationChart().filter(e => e.department === department);
}

export function getLevelEmployees(level: HierarchyLevel): AIEmployeeProfile[] {
  return getOrganizationChart().filter(e => e.level === level);
}

// Total counts
export const AI_WORKFORCE_STATS = {
  totalAgents: 106,
  cSuiteCount: cSuiteExecutives.length,
  vpDirectorCount: vpDirectors.length,
  departments: 14,
  hierarchyLevels: 5
};

export default {
  cSuiteExecutives,
  vpDirectors,
  getAllExecutives,
  getAllVPDirectors,
  getOrganizationChart,
  getDepartmentHeads,
  getReportingStructure,
  getDepartmentEmployees,
  getLevelEmployees,
  AI_WORKFORCE_STATS
};
