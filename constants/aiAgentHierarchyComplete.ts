 
/**
 * =============================================================================
 * KAYTX AI WORKFORCE - COMPLETE ORGANIZATIONAL HIERARCHY
 * =============================================================================
 * 
 * Total AI Agents: 199 Specialized AI Agents
 * Departments: 21 Major Business Functions
 * Hierarchy Levels: 5 (C-Level → VP/Director → Manager → Team Lead → Specialist)
 * 
 * @version 4.0.0
 * @lastUpdated 2026-04-16
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
  ChartBarBig,
  ChartPie,
  ChartLine,
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
  SquareCheck,
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
  FingerprintPattern,
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
  FileChartColumn,
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
  TriangleAlert,
  CircleAlert,
  Info,
  LifeBuoy,
  Bell,
  Flag,
  Pin,
  Star,
  Trophy,
  Medal,
  Crown as KingIcon,
  Factory,
  Building,
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
  | 'administrative'      // Administrative & Support
  // NEW DEPARTMENTS
  | 'trading_investments'      // Trading & Investments
  | 'real_estate_property'     // Real Estate & Property
  | 'insurance_risk'           // Insurance & Risk
  | 'healthcare_medical'       // Healthcare & Medical
  | 'manufacturing_production' // Manufacturing & Production
  | 'transportation_logistics' // Transportation & Logistics
  | 'government_public'         // Government & Public Sector
  | 'customer_insights_analytics'; // Customer Insights & Analytics

export interface OrgChartPosition {
  id: string;
  level: HierarchyLevel;
  department: DepartmentId;
  title: string;
  reportsTo: string | null;  // null for CEO
  directReports: string[];
  peerPositions: string[];
}

// ============================================
// ADVANCED EMPLOYEE CAPABILITIES
// ============================================

export interface EmployeeSelfImprovementCapability {
  enabled: boolean;
  improvementAreas: string[];
  autoOptimization: boolean;
  performanceTargets: {
    metric: string;
    target: number;
    current: number;
  }[];
  feedbackLoop: boolean;
  iterationCycle: 'hourly' | 'daily' | 'weekly' | 'monthly';
  versionHistory: {
    version: string;
    improvements: string[];
    date: string;
  }[];
}

export interface EmployeeLearningCapability {
  enabled: boolean;
  learningMode: 'supervised' | 'unsupervised' | 'reinforcement' | 'self_supervised';
  knowledgeSources: string[];
  learningGoals: string[];
  skillAcquisitionRate: number; // 0.0 - 1.0
  knowledgeRetentionRate: number; // 0.0 - 1.0
  continuousLearning: boolean;
  adaptiveLearning: boolean;
  learningHistory: {
    skill: string;
    learnedAt: string;
    proficiency: number;
  }[];
  certifications: string[];
}

export interface EmployeeSensoryCapability {
  vision: {
    enabled: boolean;
    capabilities: ('image_recognition' | 'ocr' | 'object_detection' | 'scene_understanding' | 'facial_recognition' | 'document_analysis')[];
    supportedFormats: string[];
    resolution: string;
  };
  hand: {
    enabled: boolean;
    capabilities: ('gesture_recognition' | 'action_detection' | 'tool_usage' | 'manipulation')[];
    precision: number; // 0.0 - 1.0
  };
  ear: {
    enabled: boolean;
    capabilities: ('speech_recognition' | 'voice_identification' | 'tone_analysis' | 'ambient_sound_detection')[];
    supportedLanguages: string[];
    noiseCancellation: boolean;
  };
  sense: {
    enabled: boolean;
    capabilities: ('sentiment_detection' | 'emotion_recognition' | 'context_awareness' | 'anomaly_detection' | 'pattern_recognition')[];
    sensitivity: number; // 0.0 - 1.0
    intuition: number; // 0.0 - 1.0
  };
}

export interface EmployeeInsightsCapability {
  enabled: boolean;
  insightTypes: ('trend_analysis' | 'anomaly_detection' | 'correlation_analysis' | 'predictive_modeling' | 'prescriptive_analytics')[];
  realTimeInsights: boolean;
  predictiveInsights: {
    enabled: boolean;
    forecastHorizon: number; // days
    confidenceThreshold: number;
    models: string[];
  };
  insightHistory: {
    id: string;
    type: string;
    insight: string;
    confidence: number;
    createdAt: string;
    actedUpon: boolean;
  }[];
  recommendationEngine: boolean;
  proactiveSuggestions: boolean;
}

export interface EmployeeMemoryCapability {
  enabled: boolean;
  memoryType: 'short_term' | 'long_term' | 'unlimited';
  storageCapacity: 'limited' | 'standard' | 'high' | 'unlimited';
  retentionPolicy: {
    type: 'time_based' | 'capacity_based' | 'priority_based' | 'unlimited';
    duration?: number; // days
  };
  memoryCompression: boolean;
  contextWindow: number;
  episodicMemory: boolean;
  semanticMemory: boolean;
  proceduralMemory: boolean;
  crossConversationMemory: boolean;
}

export interface EmployeeNotesCapability {
  enabled: boolean;
  noteTypes: ('summary' | 'action_items' | 'decisions' | 'observations' | 'learnings')[];
  autoSummarization: boolean;
  summaryLength: 'brief' | 'detailed' | 'comprehensive';
  sharedNotes: boolean;
  notes: {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    sharedWith: string[];
  }[];
}

export interface D2DCommunicationConfig {
  enabled: boolean;
  supportedDepartments: string[];
  communicationModes: ('broadcast' | 'direct' | 'collaborative' | 'hierarchical')[];
  canBroadcastToAll: boolean;
  canReceiveDepartmentUpdates: boolean;
  departmentChannels: {
    departmentId: string;
    channelId: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
  }[];
  crossDepartmentProjects: boolean;
  sharedResources: boolean;
}

export interface TaskHistoryConfig {
  enabled: boolean;
  retentionPeriod: number; // days
  taskTypes: string[];
  history: {
    taskId: string;
    taskType: string;
    description: string;
    status: 'completed' | 'failed' | 'in_progress' | 'cancelled';
    startedAt: string;
    completedAt?: string;
    duration: number; // seconds
    outcome: string;
    learnings: string[];
  }[];
  performanceAnalytics: boolean;
  patternRecognition: boolean;
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

  // Advanced Capabilities - A2A, D2D, Self Improvement, Learning, Sensory, Insights, Memory, Notes
  selfImprovement?: EmployeeSelfImprovementCapability;
  learning?: EmployeeLearningCapability;
  sensory?: EmployeeSensoryCapability;
  insights?: EmployeeInsightsCapability;
  memory?: EmployeeMemoryCapability;
  notes?: EmployeeNotesCapability;
  d2dConfig?: D2DCommunicationConfig;
  taskHistory?: TaskHistoryConfig;
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
      directReports: ['cfo', 'cto', 'cmo', 'cco', 'coo', 'chro', 'clo', 'ciso', 'cio', 'creo', 'cro', 'cmo-healthcare', 'cpo', 'clo-logistics', 'cao', 'ccio'],
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
    canReceiveEscalationFrom: ['cfo', 'cto', 'cmo', 'cco', 'coo', 'chro', 'clo', 'ciso', 'vp-finance', 'vp-tech', 'vp-marketing', 'vp-sales', 'vp-ops', 'ccio'],
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
      peerPositions: ['cio', 'creo', 'cro', 'cmo-healthcare', 'cpo', 'clo-logistics', 'cao', 'cto', 'cmo', 'cco', 'coo', 'chro', 'clo', 'ciso']
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
      peerPositions: ['cio', 'creo', 'cro', 'cmo-healthcare', 'cpo', 'clo-logistics', 'cao', 'cfo', 'cmo', 'cco', 'coo', 'chro', 'clo', 'ciso']
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
      peerPositions: ['cio', 'creo', 'cro', 'cmo-healthcare', 'cpo', 'clo-logistics', 'cao', 'cfo', 'cto', 'cco', 'coo', 'chro', 'clo', 'ciso']
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
      peerPositions: ['cio', 'creo', 'cro', 'cmo-healthcare', 'cpo', 'clo-logistics', 'cao', 'cfo', 'cto', 'cmo', 'coo', 'chro', 'clo', 'ciso']
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
      peerPositions: ['cio', 'creo', 'cro', 'cmo-healthcare', 'cpo', 'clo-logistics', 'cao', 'cfo', 'cto', 'cmo', 'cco', 'chro', 'clo', 'ciso']
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
      peerPositions: ['cio', 'creo', 'cro', 'cmo-healthcare', 'cpo', 'clo-logistics', 'cao', 'cfo', 'cto', 'cmo', 'cco', 'coo', 'clo', 'ciso']
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
      peerPositions: ['cio', 'creo', 'cro', 'cmo-healthcare', 'cpo', 'clo-logistics', 'cao', 'cfo', 'cto', 'cmo', 'cco', 'coo', 'chro', 'ciso']
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
      peerPositions: ['cio', 'creo', 'cro', 'cmo-healthcare', 'cpo', 'clo-logistics', 'cao', 'cfo', 'cto', 'cmo', 'cco', 'coo', 'chro', 'clo']
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
  },
  // NEW C-SUITE ADDITIONS (7 Agents)
  {
    id: 'cio',
    name: 'AI Chief Investment Officer',
    title: 'CIO - Chief Investment Officer',
    level: 'c_level',
    department: 'trading_investments',
    description: 'Oversees all investment strategy, portfolio management, and trading operations. Responsible for asset allocation, risk management, and investment team leadership across equity, crypto, forex, and derivatives markets.',
    icon: TrendingUp,
    color: '#10B981',
    orgChart: {
      id: 'cio',
      level: 'c_level',
      department: 'trading_investments',
      title: 'Chief Investment Officer',
      reportsTo: 'ceo',
      directReports: ['vp-trading', 'vp-investments', 'vp-underwriting', 'vp-claims', 'vp-risk-assessment'],
      peerPositions: ['cfo', 'cto', 'cmo', 'coo', 'chro', 'clo', 'ciso', 'creo', 'cro', 'cmo-healthcare', 'cpo', 'clo-logistics', 'cao']
    },
    responsibilities: [
      'Investment Strategy & Vision',
      'Portfolio Management Oversight',
      'Asset Allocation Decisions',
      'Risk Management Framework',
      'Trading Desk Operations',
      'Investment Team Leadership',
      'Regulatory Compliance',
      'Stakeholder Reporting',
      'Multi-Asset Class Oversight'
    ],
    capabilities: [
      'Multi-Asset Portfolio Optimization',
      'Risk-Adjusted Return Analysis',
      'Macro-Economic Forecasting',
      'Alternative Investment Evaluation',
      'ESG Integration Strategies',
      'Quantitative Modeling Oversight',
      'Derivatives Strategy',
      'Global Market Analysis',
      'Algorithmic Trading Oversight'
    ],
    keyMetrics: ['Portfolio ROI', 'Sharpe Ratio', 'Maximum Drawdown', 'Alpha Generation', 'Risk-Adjusted Returns', 'Information Ratio'],
    humanCostEquivalent: '$450,000/year',
    aiCost: '$22,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/cio', '/investment/strategy', '/portfolio/optimize', '/trading/oversight'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-trading', 'vp-investments', 'cro'],
    consultationStyle: 'directive',
    route: '/ai-agent/executive/cio',
    apiEndpoint: '/api/agents/executive/cio',
    status: 'active',
    isPremium: true,
    dangerLevel: 'critical'
  },
  {
    id: 'creo',
    name: 'AI Chief Real Estate Officer',
    title: 'CREO - Chief Real Estate Officer',
    level: 'c_level',
    department: 'real_estate_property',
    description: 'Oversees all real estate operations, property portfolio management, and strategic real estate investments. Manages leasing strategy, facilities, and asset optimization.',
    icon: Building2,
    color: '#8B5CF6',
    orgChart: {
      id: 'creo',
      level: 'c_level',
      department: 'real_estate_property',
      title: 'Chief Real Estate Officer',
      reportsTo: 'ceo',
      directReports: ['vp-property-management', 'vp-real-estate-development'],
      peerPositions: ['cio', 'cfo', 'cto', 'cmo', 'coo', 'chro', 'clo', 'ciso', 'cro', 'cmo-healthcare', 'cpo', 'clo-logistics', 'cao']
    },
    responsibilities: [
      'Real Estate Strategy',
      'Portfolio Management',
      'Property Investment',
      'Asset Optimization',
      'Leasing Strategy',
      'Facilities Oversight',
      'Tenant Relations Strategy',
      'Property Development'
    ],
    capabilities: [
      'Real Estate Strategy',
      'Portfolio Analysis',
      'Investment Evaluation',
      'Asset Management',
      'Market Analysis',
      'Lease Optimization',
      'Property Valuation',
      'Development Planning'
    ],
    keyMetrics: ['Portfolio Value', 'Occupancy Rate', 'NOI', 'Cap Rate', 'Tenant Retention', 'Lease Renewal Rate'],
    humanCostEquivalent: '$320,000/year',
    aiCost: '$16,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/creo', '/realestate/strategy', '/portfolio/manage'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-property-management', 'vp-real-estate-development'],
    consultationStyle: 'directive',
    route: '/ai-agent/executive/creo',
    apiEndpoint: '/api/agents/executive/creo',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'cro',
    name: 'AI Chief Risk Officer',
    title: 'CRO - Chief Risk Officer',
    level: 'c_level',
    department: 'insurance_risk',
    description: 'Oversees enterprise risk management, insurance operations, underwriting strategy, and claims management. Ensures comprehensive risk mitigation across the organization.',
    icon: Shield,
    color: '#F59E0B',
    orgChart: {
      id: 'cro',
      level: 'c_level',
      department: 'insurance_risk',
      title: 'Chief Risk Officer',
      reportsTo: 'ceo',
      directReports: ['vp-underwriting', 'vp-claims', 'vp-risk-assessment'],
      peerPositions: ['cio', 'cfo', 'cto', 'cmo', 'coo', 'chro', 'clo', 'ciso', 'creo', 'cmo-healthcare', 'cpo', 'clo-logistics', 'cao']
    },
    responsibilities: [
      'Enterprise Risk Management',
      'Insurance Strategy',
      'Underwriting Oversight',
      'Claims Management',
      'Risk Assessment Framework',
      'Regulatory Compliance',
      'Fraud Prevention',
      'Policy Development'
    ],
    capabilities: [
      'Risk Management',
      'Insurance Operations',
      'Underwriting Strategy',
      'Claims Analysis',
      'Risk Modeling',
      'Fraud Detection',
      'Compliance Management',
      'Actuarial Analysis'
    ],
    keyMetrics: ['Risk Score', 'Loss Ratio', 'Combined Ratio', 'Fraud Detection Rate', 'Compliance Score', 'Risk Mitigation Rate'],
    humanCostEquivalent: '$380,000/year',
    aiCost: '$19,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/cro', '/risk/manage', '/insurance/oversight'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-underwriting', 'vp-claims', 'vp-risk-assessment'],
    consultationStyle: 'advisory',
    route: '/ai-agent/executive/cro',
    apiEndpoint: '/api/agents/executive/cro',
    status: 'active',
    isPremium: true,
    dangerLevel: 'critical'
  },
  {
    id: 'cmo-healthcare',
    name: 'AI Chief Medical Officer',
    title: 'CMO-Healthcare - Chief Medical Officer',
    level: 'c_level',
    department: 'healthcare_medical',
    description: 'Oversees healthcare operations, patient care coordination, medical billing, and clinical support. Ensures quality patient experience and healthcare compliance.',
    icon: Heart,
    color: '#EF4444',
    orgChart: {
      id: 'cmo-healthcare',
      level: 'c_level',
      department: 'healthcare_medical',
      title: 'Chief Medical Officer',
      reportsTo: 'ceo',
      directReports: ['vp-healthcare-operations', 'vp-patient-experience'],
      peerPositions: ['cio', 'cfo', 'cto', 'cmo', 'coo', 'chro', 'clo', 'ciso', 'creo', 'cro', 'cpo', 'clo-logistics', 'cao']
    },
    responsibilities: [
      'Healthcare Strategy',
      'Patient Care Oversight',
      'Medical Operations',
      'Patient Experience',
      'Healthcare Compliance',
      'Billing & Coding',
      'Telehealth Strategy',
      'Clinical Quality'
    ],
    capabilities: [
      'Healthcare Management',
      'Patient Care Coordination',
      'Medical Billing',
      'Healthcare Analytics',
      'Compliance Management',
      'Telehealth Operations',
      'Quality Assurance',
      'Health Records Management'
    ],
    keyMetrics: ['Patient Satisfaction', 'Treatment Success Rate', 'Compliance Score', 'Billing Accuracy', 'Wait Time', 'Readmission Rate'],
    humanCostEquivalent: '$400,000/year',
    aiCost: '$20,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/cmo-healthcare', '/healthcare/operations', '/patient/care'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-healthcare-operations', 'vp-patient-experience'],
    consultationStyle: 'directive',
    route: '/ai-agent/executive/cmo-healthcare',
    apiEndpoint: '/api/agents/executive/cmo-healthcare',
    status: 'active',
    isPremium: true,
    dangerLevel: 'critical'
  },
  {
    id: 'cpo',
    name: 'AI Chief Production Officer',
    title: 'CPO - Chief Production Officer',
    level: 'c_level',
    department: 'manufacturing_production',
    description: 'Oversees manufacturing operations, production planning, quality control, and supply chain management. Drives operational excellence in production environments.',
    icon: Factory,
    color: '#6366F1',
    orgChart: {
      id: 'cpo',
      level: 'c_level',
      department: 'manufacturing_production',
      title: 'Chief Production Officer',
      reportsTo: 'ceo',
      directReports: ['vp-manufacturing', 'vp-quality-assurance'],
      peerPositions: ['cio', 'cfo', 'cto', 'cmo', 'coo', 'chro', 'clo', 'ciso', 'creo', 'cro', 'cmo-healthcare', 'clo-logistics', 'cao']
    },
    responsibilities: [
      'Manufacturing Strategy',
      'Production Planning',
      'Quality Assurance',
      'Supply Chain Oversight',
      'Operational Efficiency',
      'Safety Management',
      'Equipment Maintenance',
      'Production Scheduling'
    ],
    capabilities: [
      'Manufacturing Operations',
      'Production Planning',
      'Quality Control',
      'Supply Chain Management',
      'Lean Manufacturing',
      'Safety Management',
      'Equipment Optimization',
      'Process Improvement'
    ],
    keyMetrics: ['Production Output', 'Quality Score', 'OEE', 'Safety Incidents', 'On-time Delivery', 'Cost Per Unit'],
    humanCostEquivalent: '$340,000/year',
    aiCost: '$17,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/cpo', '/production/strategy', '/manufacturing/oversight'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-manufacturing', 'vp-quality-assurance'],
    consultationStyle: 'directive',
    route: '/ai-agent/executive/cpo',
    apiEndpoint: '/api/agents/executive/cpo',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'clo-logistics',
    name: 'AI Chief Logistics Officer',
    title: 'CLO-Logistics - Chief Logistics Officer',
    level: 'c_level',
    department: 'transportation_logistics',
    description: 'Oversees transportation operations, logistics management, fleet operations, and supply chain logistics. Optimizes routing, warehousing, and delivery operations.',
    icon: Truck,
    color: '#0EA5E9',
    orgChart: {
      id: 'clo-logistics',
      level: 'c_level',
      department: 'transportation_logistics',
      title: 'Chief Logistics Officer',
      reportsTo: 'ceo',
      directReports: ['vp-supply-chain', 'vp-fleet-management'],
      peerPositions: ['cio', 'cfo', 'cto', 'cmo', 'coo', 'chro', 'clo', 'ciso', 'creo', 'cro', 'cmo-healthcare', 'cpo', 'cao']
    },
    responsibilities: [
      'Logistics Strategy',
      'Transportation Management',
      'Fleet Operations',
      'Route Optimization',
      'Warehouse Management',
      'Supply Chain Logistics',
      'Carrier Relations',
      'Delivery Operations'
    ],
    capabilities: [
      'Logistics Management',
      'Transportation Optimization',
      'Fleet Management',
      'Route Planning',
      'Warehouse Operations',
      'Supply Chain Coordination',
      'Carrier Management',
      'Delivery Optimization'
    ],
    keyMetrics: ['On-time Delivery', 'Cost Per Mile', 'Fleet Utilization', 'Route Efficiency', 'Warehouse Accuracy', 'Carrier Performance'],
    humanCostEquivalent: '$300,000/year',
    aiCost: '$15,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/clo-logistics', '/logistics/strategy', '/transportation/manage'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-supply-chain', 'vp-fleet-management'],
    consultationStyle: 'directive',
    route: '/ai-agent/executive/clo-logistics',
    apiEndpoint: '/api/agents/executive/clo-logistics',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  },
  {
    id: 'cao',
    name: 'AI Chief Administrative Officer',
    title: 'CAO - Chief Administrative Officer',
    level: 'c_level',
    department: 'government_public',
    description: 'Oversees public administration, citizen services, permit processing, licensing, and regulatory compliance for government operations. Manages public sector efficiency and transparency.',
    icon: Building,
    color: '#475569',
    orgChart: {
      id: 'cao',
      level: 'c_level',
      department: 'government_public',
      title: 'Chief Administrative Officer',
      reportsTo: 'ceo',
      directReports: ['vp-public-services', 'vp-regulatory-affairs'],
      peerPositions: ['cio', 'cfo', 'cto', 'cmo', 'coo', 'chro', 'clo', 'ciso', 'creo', 'cro', 'cmo-healthcare', 'cpo', 'clo-logistics']
    },
    responsibilities: [
      'Public Administration Strategy',
      'Citizen Services',
      'Permit Processing',
      'Licensing Management',
      'Regulatory Compliance',
      'Public Records',
      'Constituent Services',
      'Government Efficiency'
    ],
    capabilities: [
      'Public Administration',
      'Citizen Service Delivery',
      'Permit Management',
      'Licensing Operations',
      'Regulatory Management',
      'Records Management',
      'Constituent Relations',
      'Transparency Management'
    ],
    keyMetrics: ['Citizen Satisfaction', 'Permit Processing Time', 'Compliance Score', 'Service Delivery Rate', 'Transparency Score', 'Response Time'],
    humanCostEquivalent: '$280,000/year',
    aiCost: '$14,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/cao', '/administration/strategy', '/public/manage'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-public-services', 'vp-regulatory-affairs'],
    consultationStyle: 'advisory',
    route: '/ai-agent/executive/cao',
    apiEndpoint: '/api/agents/executive/cao',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  // Customer Insights & Analytics Department
  {
    id: 'ccio',
    name: 'AI Chief Customer Insights Officer',
    title: 'CCIO - Chief Customer Insights Officer',
    level: 'c_level',
    department: 'customer_insights_analytics',
    description: 'Leads customer insights and analytics strategy, driving data-driven decision making through deep customer understanding, behavioral analysis, predictive intelligence, and personalization across the organization.',
    icon: ChartBarBig,
    color: '#6366F1',
    orgChart: {
      id: 'ccio',
      level: 'c_level',
      department: 'customer_insights_analytics',
      title: 'Chief Customer Insights Officer',
      reportsTo: 'ceo',
      directReports: ['vp-customer-insights', 'vp-behavioral-analytics'],
      peerPositions: ['cco', 'cmo', 'cfo', 'cio']
    },
    responsibilities: [
      'Customer Insights Strategy',
      'Behavioral Intelligence Leadership',
      'Predictive Analytics Governance',
      'Personalization Strategy',
      'Voice of Customer Programs',
      'CLV Optimization',
      'Churn Prevention Strategy',
      'Sentiment Intelligence Oversight'
    ],
    capabilities: [
      'Customer Insights Strategy',
      'Behavioral Intelligence',
      'Predictive Analytics Leadership',
      'Personalization Governance',
      'Voice of Customer Programs',
      'CLV Optimization',
      'Churn Prevention Strategy',
      'Sentiment Intelligence',
      'Journey Optimization',
      'Insight-to-Action Orchestration'
    ],
    keyMetrics: [
      'Insight Generation Rate',
      'Prediction Accuracy',
      'CLV Growth',
      'Churn Reduction',
      'Personalization Impact',
      'Customer Understanding Score'
    ],
    humanCostEquivalent: '$350,000/year',
    aiCost: '$17,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/ccio', '/insights/strategy', '/analytics/lead', '/predict/customer'],
    canEscalateTo: ['ceo'],
    canReceiveEscalationFrom: ['vp-customer-insights', 'vp-behavioral-analytics', 'cco', 'cmo'],
    consultationStyle: 'analytical',
    route: '/ai-agent/insights/ccio',
    apiEndpoint: '/api/agents/insights/ccio',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  }
];

// ============================================
// LEVEL 2: VPs & DIRECTORS (23 Agents)
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
    icon: ChartBarBig,
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
  },
  // Customer Insights & Analytics Department
  {
    id: 'vp-customer-insights',
    name: 'AI VP of Customer Insights',
    title: 'VP Customer Insights & Journey Analytics',
    level: 'vp_director',
    department: 'customer_insights_analytics',
    description: 'Leads customer journey analysis, segmentation, personalization, and voice analytics. Transforms customer data into actionable insights that drive business strategy.',
    icon: SearchCheck,
    color: '#6366F1',
    orgChart: {
      id: 'vp-customer-insights',
      level: 'vp_director',
      department: 'customer_insights_analytics',
      title: 'VP of Customer Insights',
      reportsTo: 'ccio',
      directReports: ['customer-insights-manager', 'cia-journey-analyst', 'cia-segmentation', 'cia-personalization', 'cia-voice-analytics'],
      peerPositions: ['vp-behavioral-analytics']
    },
    responsibilities: [
      'Customer Journey Analytics',
      'Segmentation Strategy',
      'Personalization Architecture',
      'Voice Analytics Operations',
      'Insight Delivery',
      'Cross-channel Analysis'
    ],
    capabilities: [
      'Journey Analytics',
      'Segmentation Strategy',
      'Personalization Architecture',
      'Voice Analytics',
      'Touchpoint Optimization',
      'Customer Profiling',
      'Omnichannel Insights',
      'Insight Presentation'
    ],
    keyMetrics: [
      'Journey Completion Rate',
      'Segmentation Accuracy',
      'Personalization Uplift',
      'Voice Insight Quality',
      'Insight Adoption Rate'
    ],
    humanCostEquivalent: '$200,000/year',
    aiCost: '$10,000/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-customer-insights', '/insights/journey', '/analytics/segmentation'],
    canEscalateTo: ['ccio'],
    canReceiveEscalationFrom: ['customer-insights-manager', 'cia-journey-analyst', 'cia-segmentation', 'cia-personalization', 'cia-voice-analytics'],
    consultationStyle: 'collaborative',
    route: '/ai-agent/insights/vp-customer-insights',
    apiEndpoint: '/api/agents/insights/vp-insights',
    status: 'active',
    isPremium: true,
    dangerLevel: 'medium'
  },
  {
    id: 'vp-behavioral-analytics',
    name: 'AI VP of Behavioral Analytics',
    title: 'VP Behavioral Analytics & Predictive Intelligence',
    level: 'vp_director',
    department: 'customer_insights_analytics',
    description: 'Leads behavioral analysis, sentiment intelligence, CLV optimization, and churn prediction. Uses advanced ML models to predict customer behavior and drive retention.',
    icon: Brain,
    color: '#8B5CF6',
    orgChart: {
      id: 'vp-behavioral-analytics',
      level: 'vp_director',
      department: 'customer_insights_analytics',
      title: 'VP of Behavioral Analytics',
      reportsTo: 'ccio',
      directReports: ['behavioral-analytics-manager', 'cia-behavioral', 'cia-sentiment', 'cia-clv-analyst', 'cia-churn-prediction'],
      peerPositions: ['vp-customer-insights']
    },
    responsibilities: [
      'Behavioral Analytics Strategy',
      'Sentiment Intelligence',
      'CLV Optimization',
      'Churn Prediction & Prevention',
      'Predictive Modeling',
      'Retention Analytics'
    ],
    capabilities: [
      'Behavioral Modeling',
      'Sentiment Analysis',
      'CLV Forecasting',
      'Churn Prediction',
      'Predictive Analytics',
      'Retention Strategy',
      'Survival Analysis',
      'Decision Science'
    ],
    keyMetrics: [
      'Prediction Accuracy',
      'CLV Growth Rate',
      'Churn Reduction Rate',
      'Sentiment Score',
      'Retention ROI'
    ],
    humanCostEquivalent: '$210,000/year',
    aiCost: '$10,500/year',
    efficiency: '20x cost efficiency',
    a2aEndpoints: ['/consult/vp-behavioral-analytics', '/predict/behavior', '/analytics/churn'],
    canEscalateTo: ['ccio'],
    canReceiveEscalationFrom: ['behavioral-analytics-manager', 'cia-behavioral', 'cia-sentiment', 'cia-clv-analyst', 'cia-churn-prediction'],
    consultationStyle: 'analytical',
    route: '/ai-agent/insights/vp-behavioral-analytics',
    apiEndpoint: '/api/agents/insights/vp-behavioral',
    status: 'active',
    isPremium: true,
    dangerLevel: 'high'
  }
];
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
  totalAgents: 226,
  cSuiteCount: cSuiteExecutives.length, // 17 (9 original + 8 new)
  vpDirectorCount: vpDirectors.length,
  departments: 23,
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
