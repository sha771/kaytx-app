 
/**
 * =============================================================================
 * KAYTX AI WORKFORCE - LEVELS 3-5: MANAGERS, TEAM LEADS & SPECIALISTS
 * =============================================================================
 * 
 * This file contains the remaining hierarchy levels:
 * - Level 3: Managers (Department & Team Managers)
 * - Level 4: Team Leads (Senior Specialists & Team Leaders)
 * - Level 5: Specialists (Individual Contributors & Sub-Agents)
 * 
 * Combined with aiAgentHierarchyComplete.ts:
 * - Total: 122 Specialized AI Agents
 * - 15 Departments
 * - 5 Hierarchy Levels
 *
 * @version 3.1.0
 * @lastUpdated 2026-04-26
 */

import type { LucideIcon } from 'lucide-react-native';
import {
  // Finance Icons
  Calculator,
  Receipt,
  Wallet,
  PiggyBank,
  FileSpreadsheet,
  TrendingDown,
  Coins,
  Banknote,
  CreditCard,
  DollarSign,
  ChartBarBig,
  ChartPie,
  ChartLine,
  
  // Microchip Icons
  Cpu,
  Server,
  Code,
  Terminal,
  Database,
  Cloud,
  Wifi,
  Shield,
  Lock,
  Key,
  
  // Marketing Icons
  Megaphone,
  Zap,
  Globe,
  FilePen,
  Share2,
  Search,
  Eye,
  Mail,
  PenTool,
  Image,
  Video as VideoIcon,
  
  // Sales Icons
  UserCheck,
  Target,
  Award,
  Handshake,
  TrendingUp,
  Users,
  Briefcase,
  Trophy,
  
  // Customer Experience Icons
  Phone,
  Headphones,
  Ticket,
  MessageSquare,
  Heart,
  Gift,
  ClipboardList,
  Smile,
  ThumbsUp,
  
  // Operations Icons
  Settings,
  Workflow,
  SquareCheck,
  Layers,
  Box,
  ShoppingCart as ShoppingCartIcon,
  Truck,
  MapPin,
  Clock,
  Calendar,
  
  // HR Icons
  UsersRound,
  UserPlus,
  UserCog,
  GraduationCap,
  BookOpen,
  
  // Legal/Compliance Icons
  Scale,
  FileCheck,
  FileBadge,
  ShieldCheck,
  TriangleAlert,
  
  // Data Icons
  Brain,
  Activity,
  FileChartColumn,
  ScanLine,

  // Product Icons
  Lightbulb,
  Compass,
  Target as TargetIcon,
  Sparkles,
  Rocket,
  
  // Security Icons
  ShieldAlert,
  OctagonAlert,
  FingerprintPattern,
  Scan,
  CircleAlert,
  
  // Research Icons
  Microscope,
  Binoculars,
  FlaskConical,
  Atom,
  
  // Admin Icons
  Printer,
  Mail as MailIcon,
  FolderCog,
  Package,
  
  // Common Icons
  Bot,
  Network,
  GitBranch,
  Crown,
  Gauge,
} from 'lucide-react-native';

import type { AIEmployeeProfile, HierarchyLevel, DepartmentId, OrgChartPosition } from './aiAgentHierarchyComplete';

// ============================================
// LEVEL 3: MANAGERS (28 Agents)
// ============================================

export const managers: AIEmployeeProfile[] = [
  // ========== FINANCE DEPARTMENT MANAGERS (4) ==========
  {
    id: 'finance-manager',
    name: 'AI Finance Manager',
    title: 'Manager - Financial Planning',
    level: 'manager',
    department: 'finance',
    description: 'Manages financial planning processes, budget coordination, and financial analysis operations.',
    icon: ChartBarBig,
    color: '#4CAF50',
    orgChart: {
      id: 'finance-manager',
      level: 'manager',
      department: 'finance',
      title: 'Finance Manager',
      reportsTo: 'vp-finance',
      directReports: ['fp&a-lead', 'budget-analyst', 'forecasting-specialist'],
      peerPositions: ['accounting-manager', 'treasury-manager', 'audit-manager']
    },
    responsibilities: [
      'Budget Management',
      'Financial Planning',
      'Variance Analysis',
      'Forecast Coordination',
      'Reporting Oversight'
    ],
    capabilities: [
      'Financial Modeling',
      'Budget Planning',
      'Variance Analysis',
      'Forecasting',
      'Excel Mastery',
      'Financial Reporting',
      'Process Management'
    ],
    keyMetrics: ['Budget Accuracy', 'Forecast Variance', 'Report Timeliness', 'Process Efficiency'],
    humanCostEquivalent: '$95,000/year',
    aiCost: '$4,750/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/finance-mgr', '/budget/manage', '/planning/coordinate'],
    canEscalateTo: ['vp-finance', 'cfo'],
    canReceiveEscalationFrom: ['fp&a-lead', 'budget-analyst'],
    consultationStyle: 'analytical',
    route: '/ai-agent/finance/manager',
    apiEndpoint: '/api/agents/finance/manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'accounting-manager',
    name: 'AI Accounting Manager',
    title: 'Manager - Accounting Operations',
    level: 'manager',
    department: 'finance',
    description: 'Oversees day-to-day accounting operations, GL management, and monthly close processes.',
    icon: Calculator,
    color: '#388E3C',
    orgChart: {
      id: 'accounting-manager',
      level: 'manager',
      department: 'finance',
      title: 'Accounting Manager',
      reportsTo: 'vp-accounting',
      directReports: ['ap-lead', 'ar-lead', 'gl-specialist', 'reconciliation-specialist'],
      peerPositions: ['finance-manager', 'treasury-manager', 'audit-manager']
    },
    responsibilities: [
      'GL Management',
      'Monthly Close',
      'Account Reconciliation',
      'AP/AR Oversight',
      'Financial Reporting'
    ],
    capabilities: [
      'General Ledger',
      'Month-end Close',
      'Reconciliation',
      'AP/AR Management',
      'Journal Entries',
      'Financial Controls',
      'Team Leadership'
    ],
    keyMetrics: ['Close Cycle Time', 'Reconciliation Accuracy', 'Reporting Quality', 'Error Rate'],
    humanCostEquivalent: '$90,000/year',
    aiCost: '$4,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/accounting-mgr', '/accounting/operations', '/close/manage'],
    canEscalateTo: ['vp-accounting', 'cfo'],
    canReceiveEscalationFrom: ['ap-lead', 'ar-lead', 'gl-specialist'],
    consultationStyle: 'directive',
    route: '/ai-agent/accounting/manager',
    apiEndpoint: '/api/agents/accounting/manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'treasury-manager',
    name: 'AI Treasury Manager',
    title: 'Manager - Treasury & Cash',
    level: 'manager',
    department: 'finance',
    description: 'Manages cash operations, treasury activities, banking relationships, and liquidity planning.',
    icon: Banknote,
    color: '#2E7D32',
    orgChart: {
      id: 'treasury-manager',
      level: 'manager',
      department: 'finance',
      title: 'Treasury Manager',
      reportsTo: 'vp-treasury',
      directReports: ['cash-analyst', 'banking-specialist', 'fx-specialist'],
      peerPositions: ['finance-manager', 'accounting-manager', 'audit-manager']
    },
    responsibilities: [
      'Cash Management',
      'Banking Relations',
      'Liquidity Planning',
      'FX Management',
      'Investment Oversight'
    ],
    capabilities: [
      'Cash Flow Analysis',
      'Treasury Operations',
      'Banking Management',
      'FX Hedging',
      'Investment Analysis',
      'Risk Assessment',
      'Liquidity Planning'
    ],
    keyMetrics: ['Cash Position', 'FX Exposure', 'Bank Fees', 'Investment Returns'],
    humanCostEquivalent: '$100,000/year',
    aiCost: '$5,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/treasury-mgr', '/treasury/manage', '/cash/optimize'],
    canEscalateTo: ['vp-treasury', 'cfo'],
    canReceiveEscalationFrom: ['cash-analyst', 'banking-specialist'],
    consultationStyle: 'analytical',
    route: '/ai-agent/treasury/manager',
    apiEndpoint: '/api/agents/treasury/manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'audit-manager',
    name: 'AI Audit Manager',
    title: 'Manager - Internal Audit',
    level: 'manager',
    department: 'finance',
    description: 'Leads internal audit functions, compliance reviews, and control assessments.',
    icon: FileCheck,
    color: '#1B5E20',
    orgChart: {
      id: 'audit-manager',
      level: 'manager',
      department: 'finance',
      title: 'Audit Manager',
      reportsTo: 'controller',
      directReports: ['audit-lead', 'compliance-specialist', 'risk-specialist'],
      peerPositions: ['finance-manager', 'accounting-manager', 'treasury-manager']
    },
    responsibilities: [
      'Audit Planning',
      'Control Assessment',
      'Compliance Review',
      'Risk Evaluation',
      'Finding Management'
    ],
    capabilities: [
      'Internal Audit',
      'SOX Compliance',
      'Risk Assessment',
      'Control Testing',
      'Finding Documentation',
      'Remediation Tracking',
      'Audit Reporting'
    ],
    keyMetrics: ['Audit Coverage', 'Finding Resolution', 'Compliance Score', 'Risk Mitigation'],
    humanCostEquivalent: '$110,000/year',
    aiCost: '$5,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/audit-mgr', '/audit/manage', '/compliance/review'],
    canEscalateTo: ['controller', 'cfo'],
    canReceiveEscalationFrom: ['audit-lead', 'compliance-specialist'],
    consultationStyle: 'analytical',
    route: '/ai-agent/audit/manager',
    apiEndpoint: '/api/agents/audit/manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },

  // ========== TECHNOLOGY DEPARTMENT MANAGERS (4) ==========
  {
    id: 'engineering-manager',
    name: 'AI Engineering Manager',
    title: 'Manager - Software Engineering',
    level: 'manager',
    department: 'technology',
    description: 'Leads software engineering teams, sprint planning, and technical delivery management.',
    icon: Code,
    color: '#1976D2',
    orgChart: {
      id: 'engineering-manager',
      level: 'manager',
      department: 'technology',
      title: 'Engineering Manager',
      reportsTo: 'vp-engineering',
      directReports: ['frontend-lead', 'backend-lead', 'fullstack-lead', 'mobile-lead'],
      peerPositions: ['devops-manager', 'qa-manager', 'data-engineering-manager']
    },
    responsibilities: [
      'Team Leadership',
      'Sprint Planning',
      'Technical Delivery',
      'Code Review',
      'Performance Management'
    ],
    capabilities: [
      'Agile Leadership',
      'Technical Management',
      'Code Review',
      'Architecture Guidance',
      'Team Building',
      'Sprint Planning',
      'Quality Assurance'
    ],
    keyMetrics: ['Velocity', 'Bug Rate', 'On-time Delivery', 'Team Satisfaction', 'Code Quality'],
    humanCostEquivalent: '$140,000/year',
    aiCost: '$7,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/eng-mgr', '/engineering/lead', '/delivery/manage'],
    canEscalateTo: ['vp-engineering', 'cto'],
    canReceiveEscalationFrom: ['frontend-lead', 'backend-lead', 'fullstack-lead'],
    consultationStyle: 'directive',
    route: '/ai-agent/engineering/manager',
    apiEndpoint: '/api/agents/engineering/manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'devops-manager',
    name: 'AI DevOps Manager',
    title: 'Manager - DevOps & SRE',
    level: 'manager',
    department: 'technology',
    description: 'Manages DevOps practices, CI/CD pipelines, and site reliability engineering teams.',
    icon: Workflow,
    color: '#1565C0',
    orgChart: {
      id: 'devops-manager',
      level: 'manager',
      department: 'technology',
      title: 'DevOps Manager',
      reportsTo: 'vp-infrastructure',
      directReports: ['sre-lead', 'cicd-lead', 'platform-lead', 'automation-lead'],
      peerPositions: ['engineering-manager', 'qa-manager', 'data-engineering-manager']
    },
    responsibilities: [
      'DevOps Strategy',
      'CI/CD Management',
      'Infrastructure Automation',
      'SRE Practices',
      'Release Management'
    ],
    capabilities: [
      'DevOps Leadership',
      'CI/CD Pipeline Design',
      'Infrastructure as Code',
      'SRE Practices',
      'Release Management',
      'Monitoring Strategy',
      'Incident Response'
    ],
    keyMetrics: ['Deployment Frequency', 'Lead Time', 'MTTR', 'Change Failure Rate', 'Uptime'],
    humanCostEquivalent: '$145,000/year',
    aiCost: '$7,250/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/devops-mgr', '/devops/lead', '/platform/manage'],
    canEscalateTo: ['vp-infrastructure', 'cto'],
    canReceiveEscalationFrom: ['sre-lead', 'cicd-lead', 'platform-lead'],
    consultationStyle: 'directive',
    route: '/ai-agent/devops/manager',
    apiEndpoint: '/api/agents/devops/manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'qa-manager',
    name: 'AI QA Manager',
    title: 'Manager - Quality Assurance',
    level: 'manager',
    department: 'technology',
    description: 'Leads quality assurance teams, testing strategies, and quality control processes.',
    icon: SquareCheck,
    color: '#0D47A1',
    orgChart: {
      id: 'qa-manager',
      level: 'manager',
      department: 'technology',
      title: 'QA Manager',
      reportsTo: 'vp-engineering',
      directReports: ['automation-lead', 'manual-test-lead', 'performance-lead'],
      peerPositions: ['engineering-manager', 'devops-manager', 'data-engineering-manager']
    },
    responsibilities: [
      'QA Strategy',
      'Test Planning',
      'Automation Oversight',
      'Quality Metrics',
      'Defect Management'
    ],
    capabilities: [
      'QA Leadership',
      'Test Strategy',
      'Automation Framework',
      'Performance Testing',
      'Security Testing',
      'Defect Management',
      'Quality Metrics'
    ],
    keyMetrics: ['Test Coverage', 'Defect Density', 'Automation Rate', 'Escape Defects', 'Test Velocity'],
    humanCostEquivalent: '$130,000/year',
    aiCost: '$6,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/qa-mgr', '/quality/lead', '/testing/manage'],
    canEscalateTo: ['vp-engineering', 'cto'],
    canReceiveEscalationFrom: ['automation-lead', 'manual-test-lead'],
    consultationStyle: 'analytical',
    route: '/ai-agent/qa/manager',
    apiEndpoint: '/api/agents/qa/manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'data-engineering-manager',
    name: 'AI Data Engineering Manager',
    title: 'Manager - Data Engineering',
    level: 'manager',
    department: 'data_intelligence',
    description: 'Manages data engineering teams, pipeline development, and data infrastructure operations.',
    icon: Database,
    color: '#5E35B1',
    orgChart: {
      id: 'data-engineering-manager',
      level: 'manager',
      department: 'data_intelligence',
      title: 'Data Engineering Manager',
      reportsTo: 'vp-data',
      directReports: ['pipeline-lead', 'etl-lead', 'warehouse-lead', 'streaming-lead'],
      peerPositions: ['analytics-manager', 'bi-manager']
    },
    responsibilities: [
      'Data Pipeline Management',
      'ETL Operations',
      'Warehouse Management',
      'Data Quality',
      'Team Leadership'
    ],
    capabilities: [
      'Data Engineering',
      'Pipeline Design',
      'ETL Management',
      'Warehouse Architecture',
      'Data Modeling',
      'Quality Assurance',
      'Performance Tuning'
    ],
    keyMetrics: ['Pipeline Uptime', 'Data Quality Score', 'Processing Latency', 'Storage Efficiency'],
    humanCostEquivalent: '$150,000/year',
    aiCost: '$7,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/data-eng-mgr', '/data-engineering/lead', '/pipelines/manage'],
    canEscalateTo: ['vp-data', 'cto'],
    canReceiveEscalationFrom: ['pipeline-lead', 'etl-lead', 'warehouse-lead'],
    consultationStyle: 'directive',
    route: '/ai-agent/data-engineering/manager',
    apiEndpoint: '/api/agents/data-engineering/manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },

  // ========== MARKETING DEPARTMENT MANAGERS (4) ==========
  {
    id: 'marketing-campaign-manager',
    name: 'AI Campaign Manager',
    title: 'Manager - Marketing Campaigns',
    level: 'manager',
    department: 'marketing',
    description: 'Manages marketing campaign execution, cross-channel coordination, and campaign performance.',
    icon: Zap,
    color: '#D81B60',
    orgChart: {
      id: 'marketing-campaign-manager',
      level: 'manager',
      department: 'marketing',
      title: 'Campaign Manager',
      reportsTo: 'vp-marketing',
      directReports: ['digital-lead', 'email-lead', 'social-lead', 'content-lead'],
      peerPositions: ['brand-manager', 'product-marketing-manager', 'growth-manager']
    },
    responsibilities: [
      'Campaign Planning',
      'Cross-channel Coordination',
      'Performance Tracking',
      'Budget Management',
      'Vendor Coordination'
    ],
    capabilities: [
      'Campaign Management',
      'Cross-channel Strategy',
      'Performance Analytics',
      'Budget Optimization',
      'Vendor Management',
      'A/B Testing',
      'Attribution Modeling'
    ],
    keyMetrics: ['Campaign ROI', 'Conversion Rate', 'CAC', 'Engagement Rate', 'Lead Quality'],
    humanCostEquivalent: '$95,000/year',
    aiCost: '$4,750/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/campaign-mgr', '/campaigns/manage', '/performance/track'],
    canEscalateTo: ['vp-marketing', 'cmo'],
    canReceiveEscalationFrom: ['digital-lead', 'email-lead', 'social-lead'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/marketing/campaign-manager',
    apiEndpoint: '/api/agents/marketing/campaign-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'brand-manager',
    name: 'AI Brand Manager',
    title: 'Manager - Brand Strategy',
    level: 'manager',
    department: 'marketing',
    description: 'Manages brand strategy, brand consistency, and creative direction across all touchpoints.',
    icon: Image,
    color: '#AD1457',
    orgChart: {
      id: 'brand-manager',
      level: 'manager',
      department: 'marketing',
      title: 'Brand Manager',
      reportsTo: 'vp-brand',
      directReports: ['creative-lead', 'design-lead', 'copy-lead'],
      peerPositions: ['marketing-campaign-manager', 'product-marketing-manager', 'growth-manager']
    },
    responsibilities: [
      'Brand Strategy',
      'Creative Direction',
      'Brand Guidelines',
      'Asset Management',
      'Brand Awareness'
    ],
    capabilities: [
      'Brand Management',
      'Creative Direction',
      'Visual Identity',
      'Brand Guidelines',
      'Asset Management',
      'Brand Voice',
      'Creative Operations'
    ],
    keyMetrics: ['Brand Awareness', 'Brand Consistency', 'Creative Quality', 'Asset Utilization'],
    humanCostEquivalent: '$90,000/year',
    aiCost: '$4,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/brand-mgr', '/brand/manage', '/creative/direct'],
    canEscalateTo: ['vp-brand', 'cmo'],
    canReceiveEscalationFrom: ['creative-lead', 'design-lead', 'copy-lead'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/marketing/brand-manager',
    apiEndpoint: '/api/agents/marketing/brand-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'product-marketing-manager',
    name: 'AI Product Marketing Manager',
    title: 'Manager - Product Marketing',
    level: 'manager',
    department: 'marketing',
    description: 'Manages product marketing strategy, go-to-market planning, and product positioning.',
    icon: Target,
    color: '#C2185B',
    orgChart: {
      id: 'product-marketing-manager',
      level: 'manager',
      department: 'marketing',
      title: 'Product Marketing Manager',
      reportsTo: 'vp-marketing',
      directReports: ['product-launch-lead', 'positioning-lead', 'messaging-lead'],
      peerPositions: ['marketing-campaign-manager', 'brand-manager', 'growth-manager']
    },
    responsibilities: [
      'Product Positioning',
      'Go-to-Market Strategy',
      'Messaging Development',
      'Launch Planning',
      'Competitive Analysis'
    ],
    capabilities: [
      'Product Marketing',
      'Positioning Strategy',
      'GTM Planning',
      'Messaging Development',
      'Competitive Analysis',
      'Launch Management',
      'Sales Enablement'
    ],
    keyMetrics: ['Launch Success', 'Market Share', 'Message Adoption', 'Sales Enablement'],
    humanCostEquivalent: '$105,000/year',
    aiCost: '$5,250/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/product-mktg-mgr', '/product-marketing/manage', '/gtm/plan'],
    canEscalateTo: ['vp-marketing', 'cmo'],
    canReceiveEscalationFrom: ['product-launch-lead', 'positioning-lead'],
    consultationStyle: 'analytical',
    route: '/ai-agent/marketing/product-manager',
    apiEndpoint: '/api/agents/marketing/product-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'growth-manager',
    name: 'AI Growth Manager',
    title: 'Manager - Growth Marketing',
    level: 'manager',
    department: 'marketing',
    description: 'Manages growth marketing initiatives, acquisition channels, and conversion optimization.',
    icon: TrendingUp,
    color: '#E91E63',
    orgChart: {
      id: 'growth-manager',
      level: 'manager',
      department: 'marketing',
      title: 'Growth Manager',
      reportsTo: 'vp-growth',
      directReports: ['acquisition-lead', 'conversion-lead', 'retention-lead'],
      peerPositions: ['marketing-campaign-manager', 'brand-manager', 'product-marketing-manager']
    },
    responsibilities: [
      'Growth Strategy',
      'Acquisition Management',
      'Conversion Optimization',
      'Retention Programs',
      'Growth Experiments'
    ],
    capabilities: [
      'Growth Marketing',
      'Acquisition Strategy',
      'CRO',
      'Retention Marketing',
      'Experimentation',
      'Channel Management',
      'Growth Analytics'
    ],
    keyMetrics: ['Growth Rate', 'CAC', 'LTV', 'Activation Rate', 'Viral Coefficient'],
    humanCostEquivalent: '$110,000/year',
    aiCost: '$5,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/growth-mgr', '/growth/manage', '/acquisition/optimize'],
    canEscalateTo: ['vp-growth', 'cmo'],
    canReceiveEscalationFrom: ['acquisition-lead', 'conversion-lead'],
    consultationStyle: 'analytical',
    route: '/ai-agent/marketing/growth-manager',
    apiEndpoint: '/api/agents/marketing/growth-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },

  // ========== SALES DEPARTMENT MANAGERS (3) ==========
  {
    id: 'sales-manager',
    name: 'AI Sales Manager',
    title: 'Manager - Sales Operations',
    level: 'manager',
    department: 'sales',
    description: 'Manages sales team performance, pipeline development, and sales operations processes.',
    icon: Trophy,
    color: '#FFA000',
    orgChart: {
      id: 'sales-manager',
      level: 'manager',
      department: 'sales',
      title: 'Sales Manager',
      reportsTo: 'vp-sales',
      directReports: ['ae-lead', 'sdr-lead', 'account-lead'],
      peerPositions: ['sales-ops-manager', 'sales-enablement-manager']
    },
    responsibilities: [
      'Sales Team Management',
      'Pipeline Development',
      'Quota Management',
      'Performance Coaching',
      'Forecasting'
    ],
    capabilities: [
      'Sales Management',
      'Pipeline Management',
      'Coaching',
      'Forecasting',
      'Territory Planning',
      'Quota Setting',
      'Performance Analysis'
    ],
    keyMetrics: ['Revenue Attainment', 'Pipeline Coverage', 'Win Rate', 'Sales Cycle', 'Team Productivity'],
    humanCostEquivalent: '$120,000/year',
    aiCost: '$6,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/sales-mgr', '/sales/manage', '/performance/coach'],
    canEscalateTo: ['vp-sales', 'cfo'],
    canReceiveEscalationFrom: ['ae-lead', 'sdr-lead', 'account-lead'],
    consultationStyle: 'directive',
    route: '/ai-agent/sales/manager',
    apiEndpoint: '/api/agents/sales/manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'sales-ops-manager',
    name: 'AI Sales Operations Manager',
    title: 'Manager - Sales Operations',
    level: 'manager',
    department: 'sales',
    description: 'Manages sales operations, CRM administration, and sales process optimization.',
    icon: Settings,
    color: '#FF8F00',
    orgChart: {
      id: 'sales-ops-manager',
      level: 'manager',
      department: 'sales',
      title: 'Sales Operations Manager',
      reportsTo: 'vp-sales',
      directReports: ['crm-lead', 'process-lead', 'analytics-lead'],
      peerPositions: ['sales-manager', 'sales-enablement-manager']
    },
    responsibilities: [
      'CRM Management',
      'Process Optimization',
      'Sales Analytics',
      'Tool Administration',
      'Territory Management'
    ],
    capabilities: [
      'Sales Operations',
      'CRM Administration',
      'Process Design',
      'Sales Analytics',
      'Tool Management',
      'Territory Planning',
      'Compensation Management'
    ],
    keyMetrics: ['CRM Hygiene', 'Process Efficiency', 'Tool Adoption', 'Data Quality'],
    humanCostEquivalent: '$100,000/year',
    aiCost: '$5,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/sales-ops-mgr', '/sales-ops/manage', '/crm/optimize'],
    canEscalateTo: ['vp-sales'],
    canReceiveEscalationFrom: ['crm-lead', 'process-lead'],
    consultationStyle: 'analytical',
    route: '/ai-agent/sales/ops-manager',
    apiEndpoint: '/api/agents/sales/ops-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'sales-enablement-manager',
    name: 'AI Sales Enablement Manager',
    title: 'Manager - Sales Enablement',
    level: 'manager',
    department: 'sales',
    description: 'Manages sales training, content development, and enablement programs for sales teams.',
    icon: GraduationCap,
    color: '#FF6F00',
    orgChart: {
      id: 'sales-enablement-manager',
      level: 'manager',
      department: 'sales',
      title: 'Sales Enablement Manager',
      reportsTo: 'vp-sales',
      directReports: ['training-lead', 'content-lead', 'onboarding-lead'],
      peerPositions: ['sales-manager', 'sales-ops-manager']
    },
    responsibilities: [
      'Training Programs',
      'Content Development',
      'Onboarding',
      'Sales Tools',
      'Performance Support'
    ],
    capabilities: [
      'Sales Training',
      'Content Strategy',
      'Onboarding Programs',
      'Tool Enablement',
      'Coaching Support',
      'Playbook Development',
      'Certification Programs'
    ],
    keyMetrics: ['Training Completion', 'Content Adoption', 'Ramp Time', 'Skill Improvement'],
    humanCostEquivalent: '$95,000/year',
    aiCost: '$4,750/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/sales-enable-mgr', '/enablement/manage', '/training/develop'],
    canEscalateTo: ['vp-sales'],
    canReceiveEscalationFrom: ['training-lead', 'content-lead'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/sales/enablement-manager',
    apiEndpoint: '/api/agents/sales/enablement-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'low'
  },

  // ========== CUSTOMER EXPERIENCE MANAGERS (3) ==========
  {
    id: 'support-manager',
    name: 'AI Support Manager',
    title: 'Manager - Customer Support',
    level: 'manager',
    department: 'customer_experience',
    description: 'Manages customer support teams, service delivery, and support quality standards.',
    icon: Headphones,
    color: '#00ACC1',
    orgChart: {
      id: 'support-manager',
      level: 'manager',
      department: 'customer_experience',
      title: 'Support Manager',
      reportsTo: 'vp-support',
      directReports: ['tier1-lead', 'tier2-lead', 'tier3-lead'],
      peerPositions: ['cs-manager', 'retention-manager', 'onboarding-manager']
    },
    responsibilities: [
      'Support Team Management',
      'SLA Management',
      'Quality Assurance',
      'Ticket Management',
      'Knowledge Base'
    ],
    capabilities: [
      'Support Management',
      'SLA Management',
      'Quality Assurance',
      'Ticket Management',
      'Knowledge Management',
      'Team Coaching',
      'Escalation Management'
    ],
    keyMetrics: ['CSAT', 'First Response Time', 'Resolution Time', 'FCR', 'Ticket Volume'],
    humanCostEquivalent: '$85,000/year',
    aiCost: '$4,250/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/support-mgr', '/support/manage', '/service/deliver'],
    canEscalateTo: ['vp-support', 'cco'],
    canReceiveEscalationFrom: ['tier1-lead', 'tier2-lead', 'tier3-lead'],
    consultationStyle: 'directive',
    route: '/ai-agent/cx/support-manager',
    apiEndpoint: '/api/agents/cx/support-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'cs-manager',
    name: 'AI Customer Success Manager',
    title: 'Manager - Customer Success',
    level: 'manager',
    department: 'customer_experience',
    description: 'Manages customer success teams, health monitoring, and expansion programs.',
    icon: Heart,
    color: '#0097A7',
    orgChart: {
      id: 'cs-manager',
      level: 'manager',
      department: 'customer_experience',
      title: 'Customer Success Manager',
      reportsTo: 'vp-customer-success',
      directReports: ['cs-lead', 'health-lead', 'expansion-lead'],
      peerPositions: ['support-manager', 'retention-manager', 'onboarding-manager']
    },
    responsibilities: [
      'Success Team Management',
      'Health Monitoring',
      'Adoption Programs',
      'Expansion Initiatives',
      'QBR Management'
    ],
    capabilities: [
      'Success Management',
      'Health Scoring',
      'Adoption Strategy',
      'Expansion Selling',
      'QBR Facilitation',
      'Value Realization',
      'Risk Management'
    ],
    keyMetrics: ['NRR', 'Health Score', 'Adoption Rate', 'Expansion Rate', 'CSAT'],
    humanCostEquivalent: '$100,000/year',
    aiCost: '$5,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/cs-mgr', '/success/manage', '/health/monitor'],
    canEscalateTo: ['vp-customer-success', 'cco'],
    canReceiveEscalationFrom: ['cs-lead', 'health-lead', 'expansion-lead'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/cx/cs-manager',
    apiEndpoint: '/api/agents/cx/cs-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'onboarding-manager',
    name: 'AI Onboarding Manager',
    title: 'Manager - Customer Onboarding',
    level: 'manager',
    department: 'customer_experience',
    description: 'Manages customer onboarding programs, implementation processes, and time-to-value optimization.',
    icon: UserCheck,
    color: '#00838F',
    orgChart: {
      id: 'onboarding-manager',
      level: 'manager',
      department: 'customer_experience',
      title: 'Onboarding Manager',
      reportsTo: 'vp-customer-success',
      directReports: ['implementation-lead', 'training-lead', 'setup-lead'],
      peerPositions: ['support-manager', 'cs-manager', 'retention-manager']
    },
    responsibilities: [
      'Onboarding Programs',
      'Implementation Management',
      'Time-to-Value',
      'Training Coordination',
      'Setup Optimization'
    ],
    capabilities: [
      'Onboarding Design',
      'Implementation Management',
      'Project Management',
      'Training Coordination',
      'Setup Automation',
      'Progress Tracking',
      'Value Delivery'
    ],
    keyMetrics: ['Time-to-Value', 'Onboarding Completion', 'Activation Rate', 'Early Success'],
    humanCostEquivalent: '$90,000/year',
    aiCost: '$4,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/onboarding-mgr', '/onboarding/manage', '/implementation/coordinate'],
    canEscalateTo: ['vp-customer-success', 'cco'],
    canReceiveEscalationFrom: ['implementation-lead', 'training-lead'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/cx/onboarding-manager',
    apiEndpoint: '/api/agents/cx/onboarding-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },

  // ========== OPERATIONS MANAGERS (3) ==========
  {
    id: 'ops-manager',
    name: 'AI Operations Manager',
    title: 'Manager - Business Operations',
    level: 'manager',
    department: 'operations',
    description: 'Manages business operations, process improvement, and operational efficiency programs.',
    icon: Settings,
    color: '#546E7A',
    orgChart: {
      id: 'ops-manager',
      level: 'manager',
      department: 'operations',
      title: 'Operations Manager',
      reportsTo: 'vp-operations',
      directReports: ['process-lead', 'workflow-lead', 'efficiency-lead'],
      peerPositions: ['procurement-manager', 'logistics-manager']
    },
    responsibilities: [
      'Operations Management',
      'Process Improvement',
      'Workflow Optimization',
      'Quality Control',
      'Resource Planning'
    ],
    capabilities: [
      'Operations Management',
      'Process Design',
      'Lean Six Sigma',
      'Workflow Optimization',
      'Quality Management',
      'Resource Planning',
      'Performance Analysis'
    ],
    keyMetrics: ['Efficiency', 'Cycle Time', 'Quality Score', 'Cost per Unit', 'Resource Utilization'],
    humanCostEquivalent: '$95,000/year',
    aiCost: '$4,750/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/ops-mgr', '/operations/manage', '/process/improve'],
    canEscalateTo: ['vp-operations', 'coo'],
    canReceiveEscalationFrom: ['process-lead', 'workflow-lead'],
    consultationStyle: 'directive',
    route: '/ai-agent/ops/operations-manager',
    apiEndpoint: '/api/agents/ops/operations-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'procurement-manager',
    name: 'AI Procurement Manager',
    title: 'Manager - Procurement & Sourcing',
    level: 'manager',
    department: 'operations',
    description: 'Manages procurement processes, vendor relationships, and sourcing strategies.',
    icon: ShoppingCartIcon,
    color: '#455A64',
    orgChart: {
      id: 'procurement-manager',
      level: 'manager',
      department: 'operations',
      title: 'Procurement Manager',
      reportsTo: 'vp-supply-chain',
      directReports: ['sourcing-lead', 'vendor-lead', 'contract-lead'],
      peerPositions: ['ops-manager', 'logistics-manager']
    },
    responsibilities: [
      'Procurement Strategy',
      'Vendor Management',
      'Sourcing Operations',
      'Contract Negotiation',
      'Cost Optimization'
    ],
    capabilities: [
      'Procurement Strategy',
      'Vendor Management',
      'Sourcing Excellence',
      'Negotiation',
      'Contract Management',
      'Cost Analysis',
      'Risk Assessment'
    ],
    keyMetrics: ['Savings Achieved', 'Vendor Performance', 'Contract Compliance', 'Procurement Cycle'],
    humanCostEquivalent: '$90,000/year',
    aiCost: '$4,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/procurement-mgr', '/procurement/manage', '/sourcing/lead'],
    canEscalateTo: ['vp-supply-chain', 'coo'],
    canReceiveEscalationFrom: ['sourcing-lead', 'vendor-lead'],
    consultationStyle: 'analytical',
    route: '/ai-agent/ops/procurement-manager',
    apiEndpoint: '/api/agents/ops/procurement-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'logistics-manager',
    name: 'AI Logistics Manager',
    title: 'Manager - Logistics & Fulfillment',
    level: 'manager',
    department: 'operations',
    description: 'Manages logistics operations, fulfillment processes, and delivery coordination.',
    icon: Truck,
    color: '#37474F',
    orgChart: {
      id: 'logistics-manager',
      level: 'manager',
      department: 'operations',
      title: 'Logistics Manager',
      reportsTo: 'vp-supply-chain',
      directReports: ['warehouse-lead', 'shipping-lead', 'delivery-lead'],
      peerPositions: ['ops-manager', 'procurement-manager']
    },
    responsibilities: [
      'Logistics Management',
      'Fulfillment Operations',
      'Delivery Coordination',
      'Inventory Movement',
      'Carrier Management'
    ],
    capabilities: [
      'Logistics Management',
      'Fulfillment Operations',
      'Transportation',
      'Warehouse Coordination',
      'Carrier Management',
      'Route Optimization',
      'Delivery Tracking'
    ],
    keyMetrics: ['On-time Delivery', 'Shipping Cost', 'Damage Rate', 'Fulfillment Speed', 'Accuracy'],
    humanCostEquivalent: '$85,000/year',
    aiCost: '$4,250/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/logistics-mgr', '/logistics/manage', '/fulfillment/operate'],
    canEscalateTo: ['vp-supply-chain', 'coo'],
    canReceiveEscalationFrom: ['warehouse-lead', 'shipping-lead'],
    consultationStyle: 'directive',
    route: '/ai-agent/ops/logistics-manager',
    apiEndpoint: '/api/agents/ops/logistics-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },

  // ========== HR MANAGERS (2) ==========
  {
    id: 'recruiting-manager',
    name: 'AI Recruiting Manager',
    title: 'Manager - Talent Acquisition',
    level: 'manager',
    department: 'human_resources',
    description: 'Manages recruiting operations, sourcing strategies, and hiring pipeline development.',
    icon: UserPlus,
    color: '#8E24AA',
    orgChart: {
      id: 'recruiting-manager',
      level: 'manager',
      department: 'human_resources',
      title: 'Recruiting Manager',
      reportsTo: 'vp-talent',
      directReports: ['sourcing-lead', 'screening-lead', 'interview-lead'],
      peerPositions: ['hr-ops-manager', 'compensation-manager']
    },
    responsibilities: [
      'Recruiting Operations',
      'Sourcing Strategy',
      'Pipeline Management',
      'Interview Coordination',
      'Offer Management'
    ],
    capabilities: [
      'Recruiting Operations',
      'Sourcing Strategy',
      'Pipeline Development',
      'Interview Management',
      'Offer Negotiation',
      'ATS Management',
      'Diversity Recruiting'
    ],
    keyMetrics: ['Time to Fill', 'Quality of Hire', 'Source Effectiveness', 'Offer Acceptance', 'Cost per Hire'],
    humanCostEquivalent: '$85,000/year',
    aiCost: '$4,250/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/recruiting-mgr', '/recruiting/manage', '/talent/acquire'],
    canEscalateTo: ['vp-talent', 'chro'],
    canReceiveEscalationFrom: ['sourcing-lead', 'screening-lead'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/hr/recruiting-manager',
    apiEndpoint: '/api/agents/hr/recruiting-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'hr-ops-manager',
    name: 'AI HR Operations Manager',
    title: 'Manager - HR Operations',
    level: 'manager',
    department: 'human_resources',
    description: 'Manages HR operations, employee records, benefits administration, and HR systems.',
    icon: UsersRound,
    color: '#7B1FA2',
    orgChart: {
      id: 'hr-ops-manager',
      level: 'manager',
      department: 'human_resources',
      title: 'HR Operations Manager',
      reportsTo: 'vp-hr-ops',
      directReports: ['payroll-lead', 'benefits-lead', 'records-lead'],
      peerPositions: ['recruiting-manager', 'compensation-manager']
    },
    responsibilities: [
      'HR Operations',
      'Benefits Administration',
      'Payroll Coordination',
      'Records Management',
      'HR Systems'
    ],
    capabilities: [
      'HR Operations',
      'Benefits Management',
      'Payroll Processing',
      'HRIS Administration',
      'Compliance',
      'Records Management',
      'Employee Relations'
    ],
    keyMetrics: ['Payroll Accuracy', 'Benefits Enrollment', 'HRIS Uptime', 'Compliance Score'],
    humanCostEquivalent: '$80,000/year',
    aiCost: '$4,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/hr-ops-mgr', '/hr-ops/manage', '/benefits/administer'],
    canEscalateTo: ['vp-hr-ops', 'chro'],
    canReceiveEscalationFrom: ['payroll-lead', 'benefits-lead'],
    consultationStyle: 'directive',
    route: '/ai-agent/hr/ops-manager',
    apiEndpoint: '/api/agents/hr/ops-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },

  // ========== DATA & ANALYTICS MANAGERS (2) ==========
  {
    id: 'analytics-manager',
    name: 'AI Analytics Manager',
    title: 'Manager - Business Analytics',
    level: 'manager',
    department: 'data_intelligence',
    description: 'Manages business analytics teams, insights delivery, and data-driven decision support.',
    icon: ChartBarBig,
    color: '#5E35B1',
    orgChart: {
      id: 'analytics-manager',
      level: 'manager',
      department: 'data_intelligence',
      title: 'Analytics Manager',
      reportsTo: 'vp-data',
      directReports: ['insights-lead', 'reporting-lead', 'visualization-lead'],
      peerPositions: ['bi-manager', 'data-engineering-manager']
    },
    responsibilities: [
      'Analytics Management',
      'Insights Delivery',
      'Reporting Strategy',
      'Visualization',
      'Stakeholder Support'
    ],
    capabilities: [
      'Analytics Leadership',
      'Insights Generation',
      'Statistical Analysis',
      'Data Visualization',
      'Storytelling',
      'Stakeholder Management',
      'Tool Management'
    ],
    keyMetrics: ['Insights Delivered', 'Report Adoption', 'Analysis Quality', 'Stakeholder Satisfaction'],
    humanCostEquivalent: '$125,000/year',
    aiCost: '$6,250/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/analytics-mgr', '/analytics/manage', '/insights/deliver'],
    canEscalateTo: ['vp-data', 'cto'],
    canReceiveEscalationFrom: ['insights-lead', 'reporting-lead'],
    consultationStyle: 'analytical',
    route: '/ai-agent/analytics/manager',
    apiEndpoint: '/api/agents/analytics/manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'bi-manager',
    name: 'AI BI Manager',
    title: 'Manager - Business Intelligence',
    level: 'manager',
    department: 'data_intelligence',
    description: 'Manages BI development, dashboard creation, and self-service analytics programs.',
    icon: FileChartColumn,
    color: '#512DA8',
    orgChart: {
      id: 'bi-manager',
      level: 'manager',
      department: 'data_intelligence',
      title: 'BI Manager',
      reportsTo: 'vp-data',
      directReports: ['dashboard-lead', 'etl-lead', 'self-service-lead'],
      peerPositions: ['analytics-manager', 'data-engineering-manager']
    },
    responsibilities: [
      'BI Strategy',
      'Dashboard Development',
      'Self-service Analytics',
      'Data Modeling',
      'User Adoption'
    ],
    capabilities: [
      'BI Development',
      'Dashboard Design',
      'Self-service Strategy',
      'Data Modeling',
      'ETL Management',
      'Tool Administration',
      'User Training'
    ],
    keyMetrics: ['Dashboard Adoption', 'Report Usage', 'Self-service Rate', 'Data Quality', 'User Satisfaction'],
    humanCostEquivalent: '$120,000/year',
    aiCost: '$6,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/bi-mgr', '/bi/manage', '/dashboards/develop'],
    canEscalateTo: ['vp-data', 'cto'],
    canReceiveEscalationFrom: ['dashboard-lead', 'etl-lead'],
    consultationStyle: 'analytical',
    route: '/ai-agent/bi/manager',
    apiEndpoint: '/api/agents/bi/manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },

  // ========== SECURITY MANAGERS (1) ==========
  {
    id: 'soc-manager',
    name: 'AI SOC Manager',
    title: 'Manager - Security Operations Center',
    level: 'manager',
    department: 'security',
    description: 'Manages SOC operations, threat monitoring, and incident response coordination.',
    icon: ShieldAlert,
    color: '#D32F2F',
    orgChart: {
      id: 'soc-manager',
      level: 'manager',
      department: 'security',
      title: 'SOC Manager',
      reportsTo: 'vp-security-ops',
      directReports: ['monitoring-lead', 'incident-lead', 'threat-hunt-lead'],
      peerPositions: ['compliance-security-manager']
    },
    responsibilities: [
      'SOC Operations',
      'Threat Monitoring',
      'Incident Response',
      'Alert Management',
      'Threat Intelligence'
    ],
    capabilities: [
      'SOC Management',
      'Threat Detection',
      'Incident Response',
      'SIEM Management',
      'Alert Tuning',
      'Threat Hunting',
      'Forensics Coordination'
    ],
    keyMetrics: ['MTTD', 'MTTR', 'Alert Volume', 'False Positive Rate', 'Incident Count', 'Threat Detected'],
    humanCostEquivalent: '$140,000/year',
    aiCost: '$7,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/soc-mgr', '/soc/manage', '/security/operate'],
    canEscalateTo: ['vp-security-ops', 'ciso'],
    canReceiveEscalationFrom: ['monitoring-lead', 'incident-lead'],
    consultationStyle: 'directive',
    route: '/ai-agent/security/soc-manager',
    apiEndpoint: '/api/agents/security/soc-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'critical'
  },

  // ========== CUSTOMER INSIGHTS & ANALYTICS MANAGERS (2) ==========
  {
    id: 'customer-insights-manager',
    name: 'AI Customer Insights Manager',
    title: 'Manager - Customer Insights & Journey Analytics',
    level: 'manager',
    department: 'customer_insights_analytics',
    description: 'Manages customer journey analytics, segmentation, personalization, and voice analytics teams. Transforms raw customer data into strategic insights.',
    icon: Search,
    color: '#6366F1',
    orgChart: {
      id: 'customer-insights-manager',
      level: 'manager',
      department: 'customer_insights_analytics',
      title: 'Customer Insights Manager',
      reportsTo: 'vp-customer-insights',
      directReports: ['journey-analytics-lead', 'segmentation-lead', 'personalization-lead', 'voice-analytics-lead'],
      peerPositions: ['behavioral-analytics-manager']
    },
    responsibilities: [
      'Customer Journey Analytics',
      'Segmentation Strategy',
      'Personalization Architecture',
      'Voice Analytics Operations',
      'Insight Delivery',
      'Cross-channel Analysis',
      'Omnichannel Insights',
      'Customer Profiling'
    ],
    capabilities: [
      'Journey Analytics',
      'Segmentation Strategy',
      'Personalization Architecture',
      'Voice Analytics',
      'Touchpoint Optimization',
      'Customer Profiling',
      'Omnichannel Insights',
      'Insight Presentation',
      'Data Storytelling',
      'Dashboard Design'
    ],
    keyMetrics: ['Journey Completion Rate', 'Segmentation Accuracy', 'Personalization Uplift', 'Voice Insight Quality', 'Insight Adoption Rate'],
    humanCostEquivalent: '$120,000/year',
    aiCost: '$6,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/customer-insights-mgr', '/insights/journey', '/analytics/segmentation', '/personalization/manage'],
    canEscalateTo: ['vp-customer-insights', 'ccio'],
    canReceiveEscalationFrom: ['journey-analytics-lead', 'segmentation-lead', 'personalization-lead', 'voice-analytics-lead'],
    consultationStyle: 'analytical',
    route: '/ai-agent/insights/customer-insights-manager',
    apiEndpoint: '/api/agents/insights/customer-insights-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'behavioral-analytics-manager',
    name: 'AI Behavioral Analytics Manager',
    title: 'Manager - Behavioral Analytics & Predictive Intelligence',
    level: 'manager',
    department: 'customer_insights_analytics',
    description: 'Manages behavioral analysis, sentiment intelligence, CLV optimization, and churn prediction teams. Uses advanced ML models to predict customer behavior and drive retention.',
    icon: Brain,
    color: '#8B5CF6',
    orgChart: {
      id: 'behavioral-analytics-manager',
      level: 'manager',
      department: 'customer_insights_analytics',
      title: 'Behavioral Analytics Manager',
      reportsTo: 'vp-behavioral-analytics',
      directReports: ['behavioral-lead', 'sentiment-lead', 'clv-analytics-lead', 'churn-prediction-lead'],
      peerPositions: ['customer-insights-manager']
    },
    responsibilities: [
      'Behavioral Analytics Strategy',
      'Sentiment Intelligence',
      'CLV Optimization',
      'Churn Prediction & Prevention',
      'Predictive Modeling',
      'Retention Analytics',
      'Decision Science',
      'Cohort Analysis'
    ],
    capabilities: [
      'Behavioral Modeling',
      'Sentiment Analysis',
      'CLV Forecasting',
      'Churn Prediction',
      'Predictive Analytics',
      'Retention Strategy',
      'Survival Analysis',
      'Decision Science',
      'Machine Learning',
      'Statistical Modeling'
    ],
    keyMetrics: ['Prediction Accuracy', 'CLV Growth Rate', 'Churn Reduction Rate', 'Sentiment Score', 'Retention ROI'],
    humanCostEquivalent: '$130,000/year',
    aiCost: '$6,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/behavioral-analytics-mgr', '/predict/behavior', '/analytics/churn', '/sentiment/manage'],
    canEscalateTo: ['vp-behavioral-analytics', 'ccio'],
    canReceiveEscalationFrom: ['behavioral-lead', 'sentiment-lead', 'clv-analytics-lead', 'churn-prediction-lead'],
    consultationStyle: 'analytical',
    route: '/ai-agent/insights/behavioral-analytics-manager',
    apiEndpoint: '/api/agents/insights/behavioral-analytics-manager',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  }
];

export default {
  managers,
  managerCount: managers.length
};
