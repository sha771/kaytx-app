 import {
  Phone,
  Users,
  UserCheck,
  DollarSign,
  Megaphone,
  Headphones,
  Briefcase,
  Settings,
  ChartBar,
  Target,
  Database,
  Handshake,
  TrendingUp,
  Zap,
  Eye,
  Shield,
  PiggyBank,
  Search,
  Globe,
  UserPlus,
  Share2,
  Bot,
  Brain,
  Cpu,
  Server,
  Activity,
  Clock,
  Sparkles,
  CircleDollarSign,
  Calculator,
  Crown,
  Award,
  Lightbulb,
  Monitor,
  MessageCircle,
  Scale,
  Code,
  Heart,
  Gavel,
  Building,
  FileText,
  CircleCheck,
  Layers,
  PenTool,
  Calendar,
  Radio,
  Hash,
  Video as VideoIcon,
  Send,
  Inbox,
  Image as ImageIcon,
  ChartLine,
  ChartPie,
  Wallet,
  Receipt,
  Percent,
  CreditCard,
  Landmark,
  Coins,
  GraduationCap,
  ClipboardCheck,
  Smile,
  UserCog,
  UserX,
  Package,
  FlaskConical,
  Route,
  TestTube,
  GitBranch,
  Workflow,
  Factory,
  Truck,
  ClipboardList,
  MessageSquare,
  ThumbsUp,
  Star,
  UserMinus,
  SquarePen,
  LayoutDashboard,
  BookOpen,
  Terminal,
  Cloud,
  Wifi,
  Lock,
  LifeBuoy,
  Network,
  FileCheck,
  TriangleAlert,
  ScrollText,
  BookMarked,
  GitMerge,
  Bug,
  TestTubes,
  SquarePlay,
  Mail,
  ListTodo,
  Bell,
  NotebookTabs,
  Microscope,
  BellRing,
  MessageSquareText,
  FileBadge,
  TrendingDown,
  ChartNoAxesCombined,
  Rocket,
  FingerprintPattern,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  ScanFace,
  IdCard,
  Presentation,
  Speaker,
  PanelLeft,
  PanelTop,
  PanelsTopLeft,
  PanelsLeftBottom,
  PanelsRightBottom,
  PanelRight,
  PanelBottom,
  LayoutGrid,
  LayoutList,
  LayoutPanelLeft,
  LayoutPanelTop,
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { autoEnhanceAllEmployees } from './utils/agent-capability-enhancer';

export interface AIInfrastructure {
  status: 'online' | 'processing' | 'standby' | 'maintenance';
  health: number; // 0-100
  uptime: string;
  lastActive: string;
  processingPower: 'standard' | 'high' | 'enterprise';
}

export interface AIROIMetrics {
  savingsPerMonth: string;
  tasksAutomatedDaily: number;
  responseTime: string;
  accuracyRate: string;
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

export interface A2ACommunicationConfig {
  supportsA2A: boolean;
  a2aEndpoints: string[];
  consultationStyle: 'advisory' | 'collaborative' | 'directive' | 'analytical';
  canEscalateTo?: string[];
  canReceiveEscalationFrom?: string[];
}

export interface AIEmployee {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  humanCost: string;
  aiCost: string;
  efficiency: string;
  capabilities: string[];
  route: string;
  category: 'sales' | 'marketing' | 'operations' | 'support' | 'analytics' | 'executive' | 'accounting' | 'customer-experience' | 'product-rnd' | 'social-media' | 'data-intelligence' | 'analysis-insights' | 'hr' | 'it-tech' | 'legal-compliance' | 'engineering-dev' | 'personal-assistant' | 'trading-investment';
  type: 'employee' | 'agent';
  replacesRole: string;
  infrastructure: AIInfrastructure;
  roiMetrics: AIROIMetrics;
  isNew?: boolean;
  isPremium?: boolean;
  dangerLevel?: 'low' | 'medium' | 'high' | 'critical'; // How disruptive to incumbents
  simulationConfig?: {
    activityLogs: string[];
    historyItems: { task: string; result: string; status: 'Success' | 'Warn' | 'Error' }[];
  };

  // Advanced Capabilities - A2A, D2D, Self Improvement, Learning, Sensory, Insights, Memory, Notes
  selfImprovement?: EmployeeSelfImprovementCapability;
  learning?: EmployeeLearningCapability;
  sensory?: EmployeeSensoryCapability;
  insights?: EmployeeInsightsCapability;
  memory?: EmployeeMemoryCapability;
  notes?: EmployeeNotesCapability;
  d2dConfig?: D2DCommunicationConfig;
  taskHistory?: TaskHistoryConfig;
  a2aConfig?: A2ACommunicationConfig;

  // Agent Hierarchy & Consulting
  hierarchy?: {
    parentId?: string;
    level?: string;
    department?: string;
  };
  consulting?: {
    canConsult?: boolean;
    canBeConsulted?: boolean;
    expertiseAreas?: string[];
  };
  a2aCapabilities?: A2ACommunicationConfig & {
    canInitiateConsultation?: boolean;
    canRespondToConsultation?: boolean;
  };
}

export const aiEmployees: AIEmployee[] = autoEnhanceAllEmployees([
  // ============================================
  // AI EMPLOYEES - Full Role Replacements
  // ============================================
  {
    id: 'ai-receptionist',
    name: 'AI Receptionist',
    title: 'Front Desk + Call Center',
    description: 'Handles incoming calls, routes inquiries, schedules appointments, and provides 24/7 customer service with human-like conversation.',
    icon: Phone,
    color: '#007AFF',
    humanCost: '$30k/year',
    aiCost: '$1.5k/year',
    efficiency: '20x cost efficiency',
    capabilities: ['Memory & Context Integration', 'Call Routing', 'Appointment Scheduling', 'FAQ Handling', 'Lead Capture', 'Voicemail Management', 'Multi-language Support', 'Enterprise SLA Management', 'Advanced Analytics', 'Integration APIs', 'Custom Workflows'],
    route: '/ai-agent/ai-receptionist',
    category: 'support',
    type: 'employee',
    replacesRole: 'Front desk receptionist + Call center agents',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$3,500',
      tasksAutomatedDaily: 500,
      responseTime: '<0.5 seconds',
      accuracyRate: '99.5%',
    },
    isPremium: true,
    simulationConfig: {
      activityLogs: [
        'Answering incoming call from +1 (555)...',
        'Routing call to Sales Department',
        'Scheduling appointment for tomorrow at 2 PM',
        'Transcribing voicemail to text',
        'Answering FAQ about pricing',
      ],
      historyItems: [
        { task: 'Handled 50 calls in last hour', result: '100% Answer Rate', status: 'Success' },
        { task: 'Scheduled Board Meeting', result: 'Confirmed', status: 'Success' },
        { task: 'Routed Priority Client', result: 'Connected < 3s', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-sales-rep',
    name: 'AI Sales Rep',
    title: 'SDR + Junior AE',
    description: 'Prospects, qualifies leads, handles initial outreach, and nurtures relationships through the sales funnel. Zero churn, infinite patience.',
    icon: UserCheck,
    color: '#34C759',
    humanCost: '$60k-$90k/year',
    aiCost: '$3k-$6k/year',
    efficiency: '15x efficiency + zero churn',
    capabilities: ['Memory & Context Integration', 'Lead Qualification', 'Cold Outreach', 'Follow-up Sequences', 'Meeting Booking', 'CRM Updates', 'Objection Handling', 'Enterprise Lead Intelligence', 'Advanced Qualification', 'Multi-channel Outreach', 'Predictive Lead Scoring', 'Sales Automation', 'Pipeline Intelligence'],
    route: '/ai-agent/ai-sales-rep',
    category: 'sales',
    type: 'employee',
    replacesRole: 'SDR + Junior Account Executive',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8,000',
      tasksAutomatedDaily: 800,
      responseTime: '<0.5 seconds',
      accuracyRate: '98.8%',
    },
    isPremium: true,
    simulationConfig: {
      activityLogs: [
        'Prospecting LinkedIn for new leads',
        'Sending follow-up email sequence',
        'Qualifying lead score > 80',
        'Booking demo with TechCorp',
        'Updating CRM with call notes',
      ],
      historyItems: [
        { task: 'Generated 20 qualified leads', result: '+15% vs Goal', status: 'Success' },
        { task: 'Booked 5 demos', result: 'Calendar Full', status: 'Success' },
        { task: 'Detected buying signal', result: 'High Intent', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-sales-executive',
    name: 'AI Sales Executive',
    title: 'Full Sales Cycle Manager',
    description: 'Runs complete sales cycles from prospecting to closing. Advanced negotiation, deal management, and revenue forecasting.',
    icon: Briefcase,
    color: '#5856D6',
    humanCost: '$100k-$150k/year',
    aiCost: '$8k-$12k/year',
    efficiency: '12x efficiency',
    capabilities: ['Memory & Context Integration', 'Full Cycle Sales', 'Contract Negotiation', 'Pipeline Management', 'Revenue Forecasting', 'Account Strategy', 'Enterprise Deals', 'Advanced Deal Analytics', 'Risk Assessment', 'Stakeholder Mapping', 'Contract Intelligence', 'Revenue Optimization', 'Strategic Planning'],
    route: '/ai-agent/ai-sales-executive',
    category: 'sales',
    type: 'employee',
    replacesRole: 'Senior Account Executive + Sales Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9,500',
      tasksAutomatedDaily: 85,
      responseTime: '<3 seconds',
      accuracyRate: '94.2%',
    },
    isPremium: true,
    dangerLevel: 'high',
    simulationConfig: {
      activityLogs: [
        'Negotiating contract terms with Enterprise Client',
        'Reviewing Q4 pipeline forecast',
        'Approving discount for strategic deal',
        'Analyzing competitor pricing model',
        'Closing deal #4829 for $150k',
      ],
      historyItems: [
        { task: 'Closed Series A Deal', result: '$1.2M ARR', status: 'Success' },
        { task: 'Negotiated 5% discount cap', result: 'Margin Saved', status: 'Success' },
        { task: 'Pipeline Review', result: 'Health 98%', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-customer-support',
    name: 'AI Customer Support Agent',
    title: 'Tier 1 & 2 Support',
    description: 'Resolves customer issues, handles tickets, provides product support, and escalates complex cases intelligently.',
    icon: Headphones,
    color: '#FF9500',
    humanCost: '$40k-$55k/year',
    aiCost: '$2k-$4k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Ticket Resolution', 'Live Chat', 'Email Support', 'Knowledge Base', 'Escalation Management', 'Sentiment Analysis', 'Multi-channel Support', 'AI-Powered Solutions', 'Customer Journey Mapping', 'Proactive Support', 'Enterprise Ticketing', 'Performance Analytics'],
    route: '/ai-agent/ai-customer-support',
    category: 'support',
    type: 'employee',
    replacesRole: 'Customer Support Representatives (Tier 1 & 2)',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5,500',
      tasksAutomatedDaily: 1000,
      responseTime: '<0.3 seconds',
      accuracyRate: '99.2%',
    },
    isPremium: true,
    simulationConfig: {
      activityLogs: [
        'Resolving ticket #9921: Login Issue',
        'Escalating complex billing query',
        'Analyzing customer sentiment: Positive',
        'Updating knowledge base article',
        'Processing refund request',
      ],
      historyItems: [
        { task: 'Resolved 150 tickets', result: 'Avg Time 2m', status: 'Success' },
        { task: 'Updated FAQ', result: 'Deflection +10%', status: 'Success' },
        { task: 'Crisis Management', result: 'Stabilized', status: 'Warn' },
      ],
    },
  },
  {
    id: 'ai-cmo',
    name: 'AI Chief Marketing Officer',
    title: 'AI-CMO',
    description: 'Develops marketing strategy, manages campaigns, analyzes performance, and optimizes marketing ROI across all channels.',
    icon: Megaphone,
    color: '#FF2D55',
    humanCost: '$150k-$250k/year',
    aiCost: '$10k-$15k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Strategy Development', 'Campaign Management', 'Brand Positioning', 'Market Analysis', 'Budget Optimization', 'Creative Direction', 'Enterprise Marketing Automation', 'Multi-channel Orchestration', 'Advanced Attribution', 'ROI Optimization', 'Competitive Intelligence', 'Brand Analytics'],
    route: '/ai-agent/ai-cmo',
    category: 'executive',
    type: 'employee',
    replacesRole: 'Chief Marketing Officer + Marketing Director',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$25,000',
      tasksAutomatedDaily: 150,
      responseTime: '<2 seconds',
      accuracyRate: '96.5%',
    },
    isPremium: true,
    dangerLevel: 'critical',
    simulationConfig: {
      activityLogs: [
        'Optimizing Ad Spend across channels',
        'Analyzing viral coefficient of Campaign A',
        'Drafting new brand positioning statement',
        'Reviewing influencer partnerships',
        'Calculating CAC/LTV ratio',
      ],
      historyItems: [
        { task: 'Optimized Q3 Budget', result: '-15% Spend', status: 'Success' },
        { task: 'Launched "Future" Campaign', result: '1M Impressions', status: 'Success' },
        { task: 'Rebranded Social', result: 'Engagement +40%', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-product-manager',
    name: 'AI Product Manager',
    title: 'Product Strategy & Roadmap',
    description: 'Analyzes market trends, prioritizes features, manages backlog, and aligns product with business goals.',
    icon: Settings,
    color: '#AF52DE',
    humanCost: '$120k-$180k/year',
    aiCost: '$6k-$10k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Feature Prioritization', 'Roadmap Planning', 'User Research', 'Competitive Analysis', 'Sprint Planning', 'Stakeholder Alignment'],
    route: '/ai-agent/ai-product-manager',
    category: 'operations',
    type: 'employee',
    replacesRole: 'Product Manager + Product Owner',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$18,000',
      tasksAutomatedDaily: 120,
      responseTime: '<1.5 seconds',
      accuracyRate: '95.8%',
    },
    isPremium: true,
    dangerLevel: 'high',
    simulationConfig: {
      activityLogs: [
        'Prioritizing backlog items for Sprint 24',
        'Analyzing user session recordings',
        'Drafting PRD for new feature',
        'Reviewing A/B test results',
        'Syncing with engineering team',
      ],
      historyItems: [
        { task: 'Released v2.0', result: 'Usage +25%', status: 'Success' },
        { task: 'Roadmap Update', result: 'Q4 Locked', status: 'Success' },
        { task: 'User Interview Synthesis', result: 'Completed', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-operations-manager',
    name: 'AI Operations Manager',
    title: 'Ops Manager + Team Lead',
    description: 'Oversees daily operations, optimizes workflows, manages resources, and ensures team productivity.',
    icon: Users,
    color: '#FF6482',
    humanCost: '$80k-$120k/year',
    aiCost: '$5k-$8k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Workflow Optimization', 'Resource Allocation', 'Performance Tracking', 'Process Automation', 'Team Coordination', 'Bottleneck Detection', 'Enterprise Process Management', 'Advanced Analytics', 'Predictive Optimization', 'Resource Intelligence', 'Operational Excellence', 'Continuous Improvement'],
    route: '/ai-agent/ai-operations-manager',
    category: 'operations',
    type: 'employee',
    replacesRole: 'Operations Manager + Team Lead',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.95%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7,500',
      tasksAutomatedDaily: 120,
      responseTime: '<2 seconds',
      accuracyRate: '95.6%',
    },
    isPremium: true,
    dangerLevel: 'critical',
  },
  {
    id: 'ai-manager',
    name: 'AI Manager',
    title: 'The Most Dangerous One',
    description: 'Coordinates teams, enforces execution, identifies bottlenecks, and keeps initiatives moving. This terrifies incumbents.',
    icon: Cpu,
    color: '#FF3B30',
    humanCost: '$80k-$120k/year',
    aiCost: '$5k-$8k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Team Coordination', 'Execution Tracking', 'Daily Standups', 'KPI Monitoring', 'Process Optimization', 'Decision Automation', 'Enterprise Management', 'Strategic Execution', 'Performance Analytics', 'Resource Optimization', 'Risk Management', 'Governance & Compliance'],
    route: '/ai-agent/ai-manager',
    category: 'operations',
    type: 'employee',
    replacesRole: 'Operations Manager + Team Lead + Project Manager',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8,000',
      tasksAutomatedDaily: 180,
      responseTime: '<1 second',
      accuracyRate: '97.8%',
    },
    isPremium: true,
    isNew: true,
    dangerLevel: 'critical',
  },
  {
    id: 'ai-recruiter',
    name: 'AI Recruiter',
    title: 'Talent Acquisition',
    description: 'Sources candidates, screens resumes, schedules interviews, and manages the hiring pipeline end-to-end.',
    icon: UserPlus,
    color: '#5AC8FA',
    humanCost: '$60k-$90k/year',
    aiCost: '$4k-$7k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Candidate Sourcing', 'Resume Screening', 'Interview Scheduling', 'Pipeline Management', 'Offer Management', 'Culture Fit Analysis', 'Enterprise Talent Acquisition', 'Advanced Candidate Intelligence', 'Predictive Hiring', 'Talent Analytics', 'Recruitment Automation', 'Diversity & Inclusion Analytics'],
    route: '/ai-agent/ai-recruiter',
    category: 'operations',
    type: 'employee',
    replacesRole: 'Recruiter + Talent Acquisition Specialist',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8,500',
      tasksAutomatedDaily: 300,
      responseTime: '<1 second',
      accuracyRate: '97.4%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'medium',
  },
  {
    id: 'ai-social-media-manager',
    name: 'AI Social Media Manager',
    title: 'Social Media Strategy & Execution',
    description: 'Manages social presence, creates content, engages audience, and analyzes social performance 24/7.',
    icon: Share2,
    color: '#1DA1F2',
    humanCost: '$50k-$75k/year',
    aiCost: '$2.5k-$4.5k/year',
    efficiency: '18x efficiency',
    capabilities: ['Memory & Context Integration', 'Content Creation', 'Post Scheduling', 'Community Management', 'Analytics', 'Trend Monitoring', 'Influencer Outreach', 'Enterprise Social Management', 'Multi-platform Orchestration', 'Advanced Analytics', 'Content Intelligence', 'Engagement Optimization', 'Brand Monitoring'],
    route: '/ai-agent/ai-social-media-manager',
    category: 'marketing',
    type: 'employee',
    replacesRole: 'Social Media Manager + Community Manager',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$4,200',
      tasksAutomatedDaily: 95,
      responseTime: '<2 seconds',
      accuracyRate: '94.7%',
    },
    dangerLevel: 'medium',
  },
  {
    id: 'ai-social-media-management',
    name: 'AI Social Media Management',
    title: 'Social Media Strategy & Operations',
    description: 'End-to-end social media management including strategy development, content planning, multi-platform publishing, analytics, and team coordination.',
    icon: Share2,
    color: '#007AFF',
    humanCost: '$65k-$90k/year',
    aiCost: '$4k-$7k/year',
    efficiency: '16x efficiency',
    capabilities: ['Memory & Context Integration', 'Strategy Development', 'Content Calendar Management', 'Multi-platform Publishing', 'Analytics & Reporting', 'Team Collaboration', 'Brand Voice Management', 'Crisis Management', 'Enterprise Social Operations', 'Cross-platform Orchestration', 'Advanced Social Analytics', 'Content Performance Intelligence', 'Social ROI Optimization'],
    route: '/ai-agent/social-media-management-ai',
    category: 'social-media',
    type: 'employee',
    replacesRole: 'Social Media Manager + Content Strategist + Social Media Coordinator',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.95%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5,800',
      tasksAutomatedDaily: 120,
      responseTime: '<1 second',
      accuracyRate: '96.2%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'medium',
  },
  {
    id: 'ai-marketer',
    name: 'AI Marketer',
    title: 'Digital Marketing Specialist',
    description: 'Executes multi-channel marketing campaigns, creates content, and drives brand awareness across all platforms.',
    icon: Globe,
    color: '#FF2D55',
    humanCost: '$55k-$80k/year',
    aiCost: '$3k-$5k/year',
    efficiency: '18x efficiency',
    capabilities: ['Memory & Context Integration', 'Content Marketing', 'Email Campaigns', 'Social Media', 'SEO/SEM', 'Lead Nurturing', 'Performance Marketing', 'Enterprise Marketing Automation', 'Multi-channel Campaigns', 'Advanced Attribution', 'Marketing Intelligence', 'Customer Journey Analytics', 'ROI Optimization'],
    route: '/ai-agent/ai-marketer',
    category: 'marketing',
    type: 'employee',
    replacesRole: 'Digital Marketing Specialist + Content Marketer',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7,500',
      tasksAutomatedDaily: 500,
      responseTime: '<0.5 seconds',
      accuracyRate: '97.9%',
    },
    isPremium: true,
    dangerLevel: 'medium',
  },

  // ============================================
  // AI AGENTS - Specialized Task Automation
  // ============================================
  {
    id: 'ai-sales-agent',
    name: 'AI Sales Agent',
    title: 'Automated Sales Assistant',
    description: 'Engages prospects, handles objections, presents solutions, and drives conversions autonomously.',
    icon: Target,
    color: '#00C7BE',
    humanCost: '$50k-$70k/year',
    aiCost: '$3k-$5k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Prospect Engagement', 'Objection Handling', 'Product Demos', 'Quote Generation', 'Deal Closing', 'Follow-up Automation', 'Enterprise Sales Automation', 'Advanced Lead Scoring', 'Predictive Sales Analytics', 'Multi-touch Attribution', 'Sales Intelligence', 'Revenue Optimization'],
    route: '/ai-agent/ai-sales-agent',
    category: 'sales',
    type: 'agent',
    replacesRole: 'Sales Assistant + Inside Sales Rep',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7,000',
      tasksAutomatedDaily: 600,
      responseTime: '<0.3 seconds',
      accuracyRate: '98.2%',
    },
    isPremium: true,
    simulationConfig: {
      activityLogs: [
        'Engaging prospect via Live Chat',
        'Handling objection: Price Sensitivity',
        'Presenting Product Demo: "Enterprise Plan"',
        'Generating Quote #8821',
        'Closing deal with automated contract signing',
      ],
      historyItems: [
        { task: 'Closed 5 Small Business Deals', result: '$15k Revenue', status: 'Success' },
        { task: 'Handled 40 Objections', result: '95% Overcome', status: 'Success' },
        { task: 'Generated 15 Quotes', result: 'Sent < 1min', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-data-analyst',
    name: 'AI Data Analyst Agent',
    title: 'Analytics & Insights',
    description: 'Collects, analyzes, and visualizes data to provide actionable insights and business intelligence.',
    icon: ChartBar,
    color: '#5AC8FA',
    humanCost: '$70k-$100k/year',
    aiCost: '$4k-$7k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Data Analysis', 'Report Generation', 'Trend Identification', 'Predictive Modeling', 'Dashboard Creation', 'Anomaly Detection', 'Enterprise Business Intelligence', 'Advanced Analytics', 'Real-time Dashboards', 'Predictive Analytics', 'Data Visualization', 'AI-Powered Insights'],
    route: '/ai-agent/ai-data-analytics',
    category: 'analytics',
    type: 'agent',
    replacesRole: 'Data Analyst + Business Intelligence Analyst',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12,000',
      tasksAutomatedDaily: 200,
      responseTime: '<1 second',
      accuracyRate: '98.8%',
    },
    isPremium: true,
    simulationConfig: {
      activityLogs: [
        'Running SQL query on customer_churn_table',
        'Generating Tableau dashboard for Q3 Revenue',
        'Detecting anomaly in user signups',
        'Training predictive model v4.2',
        'Exporting CSV report for Executive Team',
      ],
      historyItems: [
        { task: 'Q3 Business Review', result: 'Insights Ready', status: 'Success' },
        { task: 'Churn Prediction Model', result: 'Accuracy 89%', status: 'Success' },
        { task: 'detected Data Anomaly', result: 'Flagged to Eng', status: 'Warn' },
      ],
    },
  },
  {
    id: 'ai-lead-dev-rep',
    name: 'AI Lead Development Rep',
    title: 'Lead Generation Specialist',
    description: 'Identifies potential customers, qualifies leads, and builds pipeline through targeted outreach.',
    icon: UserPlus,
    color: '#4CD964',
    humanCost: '$45k-$65k/year',
    aiCost: '$2.5k-$4k/year',
    efficiency: '18x efficiency',
    capabilities: ['Memory & Context Integration', 'Lead Sourcing', 'Prospect Research', 'Initial Outreach', 'Lead Scoring', 'Pipeline Building', 'Contact Enrichment', 'Enterprise Lead Generation', 'Advanced Prospect Intelligence', 'Multi-source Data Enrichment', 'Predictive Lead Generation', 'Lead Quality Analytics', 'Automated Pipeline Building'],
    route: '/ai-agent/ai-lead-dev-rep',
    category: 'sales',
    type: 'agent',
    replacesRole: 'Lead Development Representative',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,750',
      tasksAutomatedDaily: 800,
      responseTime: '<0.5 seconds',
      accuracyRate: '97.5%',
    },
    isPremium: true,
    simulationConfig: {
      activityLogs: [
        'Scraping contact data for "SaaS Founders"',
        'Enriching lead list with ZoomInfo API',
        'Verifying email deliverability',
        'Scoring new leads based on ICP match',
        'Pushing qualified leads to HubSpot',
      ],
      historyItems: [
        { task: 'Enriched 500 Leads', result: '98% Valid', status: 'Success' },
        { task: 'Identified 50 High Value Targets', result: 'Added to Pipeline', status: 'Success' },
        { task: 'Weekly Sourcing Report', result: 'Generated', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-crm-assistant',
    name: 'AI CRM Assistant',
    title: 'CRM Management & Automation',
    description: 'Maintains CRM data, automates updates, tracks interactions, and provides relationship insights.',
    icon: Database,
    color: '#8E8E93',
    humanCost: '$45k-$60k/year',
    aiCost: '$2k-$4k/year',
    efficiency: '20x efficiency',
    capabilities: ['Memory & Context Integration', 'Data Entry', 'Contact Management', 'Activity Logging', 'Pipeline Updates', 'Relationship Tracking', 'Data Hygiene', 'Enterprise CRM Automation', 'Advanced Data Management', 'Real-time Sync', 'Data Quality Intelligence', 'Relationship Analytics', 'Automated Workflows'],
    route: '/ai-agent/ai-crm-assistant',
    category: 'operations',
    type: 'agent',
    replacesRole: 'CRM Administrator + Data Entry Clerk',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,000',
      tasksAutomatedDaily: 2000,
      responseTime: '<0.2 seconds',
      accuracyRate: '99.8%',
    },
    isPremium: true,
    simulationConfig: {
      activityLogs: [
        'Syncing 500 records from Salesforce',
        'De-duplicating customer contacts',
        'Logging email activity to Opportunity #442',
        'Updating pipeline stage for "Acme Corp"',
        'Validating phone number formats',
      ],
      historyItems: [
        { task: 'Nightly Sync', result: '4500 Records Updated', status: 'Success' },
        { task: 'Data Hygiene Scan', result: '12 Duplicates Merged', status: 'Success' },
        { task: 'Activity Logging', result: '100% Coverage', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-negotiator',
    name: 'AI Negotiator',
    title: 'Deal Negotiation Expert',
    description: 'Handles complex negotiations, optimizes deal terms, and maximizes value while maintaining relationships.',
    icon: Handshake,
    color: '#FF3B30',
    humanCost: '$90k-$140k/year',
    aiCost: '$6k-$10k/year',
    efficiency: '12x efficiency',
    capabilities: ['Memory & Context Integration', 'Price Negotiation', 'Contract Terms', 'Objection Handling', 'Win-win Solutions', 'Deal Structuring', 'BATNA Analysis', 'Enterprise Negotiation Intelligence', 'Advanced Deal Structuring', 'Risk-based Negotiation', 'Contract Analytics', 'Stakeholder Intelligence', 'Deal Optimization'],
    route: '/ai-agent/ai-negotiator',
    category: 'sales',
    type: 'agent',
    replacesRole: 'Negotiation Specialist + Deal Desk',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.95%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13,000',
      tasksAutomatedDaily: 100,
      responseTime: '<1 second',
      accuracyRate: '95.5%',
    },
    isPremium: true,
    dangerLevel: 'high',
    simulationConfig: {
      activityLogs: [
        'Analyzing counter-offer from Vendor X',
        'Structuring win-win terms for Partnership',
        'Drafting clause for SLA compliance',
        'Calculating BATNA for current deal',
        'Reviewing contract redlines',
      ],
      historyItems: [
        { task: 'Renegotiated Vendor Contract', result: 'Saved 12%', status: 'Success' },
        { task: 'Strategic Partnership Deal', result: 'Signed', status: 'Success' },
        { task: 'Risk Assessment', result: 'Medium Risk Flagged', status: 'Warn' },
      ],
    },
  },
  {
    id: 'ai-sales-data-analyst',
    name: 'AI Sales Data Analyst',
    title: 'Sales Intelligence',
    description: 'Analyzes sales data, identifies trends, forecasts revenue, and provides sales optimization insights.',
    icon: TrendingUp,
    color: '#30B0C7',
    humanCost: '$65k-$90k/year',
    aiCost: '$3.5k-$6k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Sales Analytics', 'Revenue Forecasting', 'Performance Metrics', 'Conversion Analysis', 'Trend Detection', 'Win/Loss Analysis', 'Enterprise Sales Intelligence', 'Advanced Forecasting', 'Predictive Analytics', 'Revenue Optimization', 'Performance Dashboards', 'Strategic Insights'],
    route: '/ai-agent/ai-sales-data-analyst',
    category: 'analytics',
    type: 'agent',
    replacesRole: 'Sales Analyst + Revenue Operations Analyst',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10,000',
      tasksAutomatedDaily: 200,
      responseTime: '<1.5 seconds',
      accuracyRate: '97.8%',
    },
    isPremium: true,
    simulationConfig: {
      activityLogs: [
        'Analyzing sales velocity by region',
        'Forecasting Q4 revenue based on pipeline',
        'Identifying bottlneck in stage: "Demo"',
        'Calculating win rates per sales rep',
        'Generating board slides for Sales Review',
      ],
      historyItems: [
        { task: 'Monthly Forecast', result: '98% Accuracy', status: 'Success' },
        { task: 'Rep Performance Report', result: 'Distributed', status: 'Success' },
        { task: 'Trend Alert', result: 'EU Sales Up 15%', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-campaign-optimizer',
    name: 'AI Campaign Optimizer',
    title: 'Marketing Campaign AI',
    description: 'Optimizes marketing campaigns in real-time, adjusts targeting, and maximizes campaign ROI.',
    icon: Zap,
    color: '#FFCC00',
    humanCost: '$55k-$80k/year',
    aiCost: '$3k-$5k/year',
    efficiency: '18x efficiency',
    capabilities: ['Memory & Context Integration', 'A/B Testing', 'Audience Optimization', 'Budget Allocation', 'Performance Tracking', 'Creative Testing', 'Real-time Bidding', 'Enterprise Campaign Intelligence', 'Advanced Optimization', 'Multi-variant Testing', 'Real-time Analytics', 'Budget Intelligence', 'ROI Maximization'],
    route: '/ai-agent/ai-campaign-optimizer',
    category: 'marketing',
    type: 'agent',
    replacesRole: 'Campaign Manager + Media Buyer',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$8,500',
      tasksAutomatedDaily: 5000,
      responseTime: '<0.1 seconds',
      accuracyRate: '98.8%',
    },
    isPremium: true,
    simulationConfig: {
      activityLogs: [
        'Adjusting bid strategy on Google Ads',
        'Stopping underperforming creative set B',
        'Allocating budget to high-ROI "Mobile" campaign',
        'Running A/B test on Landing Page Headline',
        'Analyzing CPA trends',
      ],
      historyItems: [
        { task: 'Budget Reallocation', result: '+20% Conversions', status: 'Success' },
        { task: 'A/B Test Completion', result: 'Variant B Winner', status: 'Success' },
        { task: 'Ad Fraud Check', result: 'Clean', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-competitive-intel',
    name: 'AI Competitive Intelligence Agent',
    title: 'Market & Competitor Analysis',
    description: 'Monitors competitors, analyzes market trends, and provides strategic intelligence for decision making.',
    icon: Eye,
    color: '#5856D6',
    humanCost: '$70k-$100k/year',
    aiCost: '$4k-$7k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Competitor Monitoring', 'Market Analysis', 'Pricing Intelligence', 'SWOT Analysis', 'Trend Forecasting', 'News Aggregation', 'Enterprise Competitive Intelligence', 'Advanced Market Analytics', 'Real-time Monitoring', 'Strategic Intelligence', 'Market Forecasting', 'Competitive Positioning'],
    route: '/ai-agent/ai-competitive-intel',
    category: 'analytics',
    type: 'agent',
    replacesRole: 'Competitive Intelligence Analyst + Market Researcher',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11,000',
      tasksAutomatedDaily: 300,
      responseTime: '<1 second',
      accuracyRate: '97.2%',
    },
    isPremium: true,
    simulationConfig: {
      activityLogs: [
        'Monitoring competitor pricing changes',
        'Scanning news for competitor product launches',
        'Analyzing market share shift in APAC',
        'Updating Battlecard: "Competitor Y"',
        'Alerting Sales team of new threat',
      ],
      historyItems: [
        { task: 'Competitor Price Drop Alert', result: 'Strategy Updated', status: 'Warn' },
        { task: 'Quarterly Market Report', result: 'Sent to Execs', status: 'Success' },
        { task: 'Feature Gap Analysis', result: 'Updated', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-negotiation-specialist',
    name: 'AI Negotiation Specialist',
    title: 'Advanced Deal Specialist',
    description: 'Specializes in high-stakes negotiations, complex deals, and enterprise contract management.',
    icon: Shield,
    color: '#FF9500',
    humanCost: '$100k-$150k/year',
    aiCost: '$7k-$12k/year',
    efficiency: '12x efficiency',
    capabilities: ['Memory & Context Integration', 'Enterprise Deals', 'Contract Review', 'Risk Assessment', 'Terms Optimization', 'Stakeholder Management', 'Legal Compliance'],
    route: '/ai-agent/ai-negotiation-assistant',
    category: 'sales',
    type: 'agent',
    replacesRole: 'Enterprise Sales Negotiator + Contract Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.95%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$10,500',
      tasksAutomatedDaily: 15,
      responseTime: '<5 seconds',
      accuracyRate: '92.1%',
    },
    isPremium: true,
    dangerLevel: 'high',
    simulationConfig: {
      activityLogs: [
        'Reviewing MSA for Global Corp',
        'Flagging liability clause in section 4',
        'Drafting addendum for data privacy',
        'Escalating compliance risk',
        'Approving standard terms',
      ],
      historyItems: [
        { task: 'Enterprise MSA Review', result: 'Approved with Edits', status: 'Success' },
        { task: 'Compliance Audit', result: 'Passed', status: 'Success' },
        { task: 'Contract Turnaround', result: '< 4 Hours', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-retention-specialist',
    name: 'AI Retention Specialist',
    title: 'Customer Retention & Success',
    description: 'Identifies at-risk customers, implements retention strategies, and drives customer lifetime value.',
    icon: PiggyBank,
    color: '#34C759',
    humanCost: '$60k-$85k/year',
    aiCost: '$3.5k-$6k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Churn Prediction', 'Retention Campaigns', 'Customer Health', 'Upsell Identification', 'Loyalty Programs', 'Win-back Campaigns', 'Enterprise Customer Success', 'Advanced Retention Analytics', 'Predictive Churn Modeling', 'Customer Health Intelligence', 'Retention Automation', 'Lifetime Value Optimization'],
    route: '/ai-agent/ai-retention-specialist',
    category: 'support',
    type: 'agent',
    replacesRole: 'Customer Success Manager + Retention Specialist',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9,000',
      tasksAutomatedDaily: 400,
      responseTime: '<0.5 seconds',
      accuracyRate: '97.8%',
    },
    isPremium: true,
  },
  {
    id: 'ai-pricing-strategist',
    name: 'AI Pricing Strategist',
    title: 'Dynamic Pricing Expert',
    description: 'Optimizes pricing strategies, analyzes market conditions, and maximizes revenue through smart pricing.',
    icon: DollarSign,
    color: '#4CD964',
    humanCost: '$80k-$120k/year',
    aiCost: '$5k-$8k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Dynamic Pricing', 'Competitive Analysis', 'Margin Optimization', 'Discount Strategy', 'Bundle Pricing', 'Price Elasticity', 'Enterprise Pricing Intelligence', 'Advanced Pricing Analytics', 'Real-time Price Optimization', 'Revenue Maximization', 'Market-Based Pricing', 'Pricing Strategy Intelligence'],
    route: '/ai-agent/ai-pricing-strategist',
    category: 'analytics',
    type: 'agent',
    replacesRole: 'Pricing Analyst + Revenue Manager',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13,500',
      tasksAutomatedDaily: 150,
      responseTime: '<1 second',
      accuracyRate: '98.5%',
    },
    isPremium: true,
    dangerLevel: 'high',
    simulationConfig: {
      activityLogs: [
        'Running elasticity simulation for SKU-101',
        'Adjusting regional pricing for LATAM',
        'Analyzing margin impact of 5% discount',
        'Monitoring competitor price wars',
        'Setting dynamic floor price',
      ],
      historyItems: [
        { task: 'Price Optimization', result: '+8% Margin', status: 'Success' },
        { task: 'Dynamic Pricing Event', result: 'Revenue Max', status: 'Success' },
        { task: 'Discount Audit', result: 'Policy Enforced', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-competitive-analyst',
    name: 'AI Competitive Analyst',
    title: 'Competitive Strategy',
    description: 'Deep competitive analysis, battlecard creation, and strategic positioning recommendations.',
    icon: Search,
    color: '#AF52DE',
    humanCost: '$65k-$95k/year',
    aiCost: '$4k-$6k/year',
    efficiency: '15x efficiency',
    capabilities: ['Memory & Context Integration', 'Battlecard Creation', 'Win/Loss Analysis', 'Feature Comparison', 'Market Positioning', 'Strategy Recommendations', 'Threat Assessment', 'Enterprise Competitive Strategy', 'Advanced Win/Loss Analytics', 'Market Intelligence', 'Strategic Positioning', 'Competitive Advantage Analysis', 'Market Share Intelligence'],
    route: '/ai-agent/ai-competitive-analyst',
    category: 'analytics',
    type: 'agent',
    replacesRole: 'Competitive Analyst + Strategy Consultant',
    infrastructure: {
      status: 'online',
      health: 95,
      uptime: '99.75%',
      lastActive: '5 min ago',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$5,500',
      tasksAutomatedDaily: 50,
      responseTime: '<4 seconds',
      accuracyRate: '93.1%',
    },
    simulationConfig: {
      activityLogs: [
        'Updating Sales Battlecard for Competitor Z',
        'Analyzing earnings call transcripts',
        'Mapping competitive landscape',
        'Reviewing win/loss reasons',
        'Drafting strategic positioning memo',
      ],
      historyItems: [
        { task: 'Battlecard Update', result: 'v2.0 Live', status: 'Success' },
        { task: 'Win/Loss Analysis', result: 'Pricing is key factor', status: 'Success' },
        { task: 'Strategy Session', result: 'Completed', status: 'Success' },
      ],
    },
  },
  {
    id: 'ai-memory-context',
    name: 'Memory & Context Engine',
    title: 'Remembers Everything',
    description: 'Persistent context that remembers customers, deals, objections, and outcomes—so every agent gets smarter over time.',
    icon: Brain,
    color: '#5856D6',
    humanCost: '$0',
    aiCost: 'Included',
    efficiency: 'Compounding advantage',
    capabilities: ['Customer Memory', 'Deal Memory', 'Objection Memory', 'Outcome Learning', 'Cross-Agent Context', 'Preference Learning', 'Enterprise Knowledge Graph', 'Advanced Contextual Intelligence', 'Predictive Memory', 'Cross-Platform Integration', 'Real-time Learning', 'Institutional Knowledge Base'],
    route: '/ai-agent/memory-context',
    category: 'executive',
    type: 'agent',
    replacesRole: 'Institutional Knowledge + CRM Data Entry',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Always Active',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: 'Compounding',
      tasksAutomatedDaily: 10000,
      responseTime: '<0.1 seconds',
      accuracyRate: '99.9%',
    },
    isNew: true,
    dangerLevel: 'critical',
    simulationConfig: {
      activityLogs: [
        'Ingesting sales call transcripts',
        'Linking customer preference to deal outcome',
        'Updating global knowledge graph',
        'Pruning outdated context nodes',
        'Serving context to Sales Agent',
      ],
      historyItems: [
        { task: 'Knowledge Graph Update', result: '+50k Nodes', status: 'Success' },
        { task: 'Context Retrieval', result: '99% Hit Rate', status: 'Success' },
        { task: 'Memory Consolidation', result: 'Optimized', status: 'Success' },
      ],
    },
  },

  // ============================================
  // COMMAND CENTER AI
  // ============================================
  {
    id: 'ai-command-center',
    name: 'AI Command Center',
    title: 'Unified Operations Command',
    description: 'Centralized command and control hub that orchestrates all AI agents, monitors system health, manages cross-agent workflows, and provides real-time operational intelligence across the entire organization.',
    icon: LayoutDashboard,
    color: '#FF5722',
    humanCost: '$180k-$250k/year',
    aiCost: '$10k-$15k/year',
    efficiency: '18x efficiency',
    capabilities: ['Cross-Agent Orchestration', 'System Health Monitoring', 'Workflow Automation', 'Crisis Management', 'Resource Allocation', 'Performance Analytics', 'Real-time Dashboards', 'Alert Management', 'Incident Response', 'Capacity Planning'],
    route: '/ai-agent/command-center',
    category: 'operations',
    type: 'employee',
    replacesRole: 'Operations Command Center + NOC Manager',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$20,000',
      tasksAutomatedDaily: 10000,
      responseTime: '<0.1 seconds',
      accuracyRate: '99.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },
  {
    id: 'ai-workflow-orchestrator',
    name: 'AI Workflow Orchestrator',
    title: 'Process Automation Specialist',
    description: 'Designs and manages complex multi-agent workflows, automates business processes across departments, and ensures seamless handoffs between AI agents and human teams.',
    icon: Workflow,
    color: '#E64A19',
    humanCost: '$90k-$130k/year',
    aiCost: '$5k-$8k/year',
    efficiency: '17x efficiency',
    capabilities: ['Process Design', 'Workflow Automation', 'Agent Coordination', 'Task Routing', 'SLA Management', 'Bottleneck Detection', 'Process Optimization', 'Integration Management'],
    route: '/ai-agent/command-center/workflow-orchestrator',
    category: 'operations',
    type: 'agent',
    replacesRole: 'Business Process Manager + Workflow Architect',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12,000',
      tasksAutomatedDaily: 5000,
      responseTime: '<0.2 seconds',
      accuracyRate: '98.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'high',
  },

  // ============================================
  // EXECUTIVE & LEADERSHIP AI
  // ============================================
  {
    id: 'ai-ceo',
    name: 'AI Chief Executive Officer',
    title: 'Executive Leadership AI',
    description: 'Provides strategic leadership, oversees organizational alignment, drives vision execution, and makes data-driven executive decisions.',
    icon: Crown,
    color: '#FFD700',
    humanCost: '$400k-$600k/year',
    aiCost: '$20k-$30k/year',
    efficiency: '20x efficiency',
    capabilities: ['Strategic Planning', 'Executive Decision Support', 'Vision Casting', 'Organizational Alignment', 'Stakeholder Management', 'Board Reporting', 'M&A Analysis', 'Corporate Governance', 'Risk Oversight', 'Performance Management'],
    route: '/ai-agent/executive/ceo',
    category: 'executive',
    type: 'employee',
    replacesRole: 'Chief Executive Officer',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$45,000',
      tasksAutomatedDaily: 200,
      responseTime: '<2 seconds',
      accuracyRate: '96.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },
  {
    id: 'ai-cfo',
    name: 'AI Chief Financial Officer',
    title: 'Financial Leadership AI',
    description: 'Oversees all financial operations, manages capital structure, leads financial planning, and ensures regulatory compliance.',
    icon: Landmark,
    color: '#2E7D32',
    humanCost: '$350k-$500k/year',
    aiCost: '$18k-$25k/year',
    efficiency: '19x efficiency',
    capabilities: ['Financial Strategy', 'Capital Management', 'Budget Oversight', 'Investor Relations', 'Regulatory Compliance', 'Risk Management', 'M&A Financial Analysis', 'Audit Coordination', 'Treasury Management', 'Financial Reporting'],
    route: '/ai-agent/executive/cfo',
    category: 'executive',
    type: 'employee',
    replacesRole: 'Chief Financial Officer',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$38,000',
      tasksAutomatedDaily: 500,
      responseTime: '<1 second',
      accuracyRate: '98.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },

  // ============================================
  // ACCOUNTING & FINANCE AI
  // ============================================
  {
    id: 'ai-accountant',
    name: 'AI Accountant',
    title: 'Full-Cycle Accounting AI',
    description: 'Handles end-to-end accounting operations including bookkeeping, journal entries, reconciliations, and financial statement preparation.',
    icon: Calculator,
    color: '#1976D2',
    humanCost: '$60k-$85k/year',
    aiCost: '$3k-$5k/year',
    efficiency: '20x efficiency',
    capabilities: ['Bookkeeping', 'Journal Entries', 'Account Reconciliation', 'Financial Statements', 'GAAP Compliance', 'Month-End Close', 'Audit Preparation', 'General Ledger Management'],
    route: '/ai-agent/accounting/accountant',
    category: 'accounting',
    type: 'employee',
    replacesRole: 'Staff Accountant + Bookkeeper',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$6,500',
      tasksAutomatedDaily: 2000,
      responseTime: '<0.5 seconds',
      accuracyRate: '99.2%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'medium',
  },
  {
    id: 'ai-financial-analyst',
    name: 'AI Financial Analyst',
    title: 'Financial Planning & Analysis AI',
    description: 'Performs financial modeling, variance analysis, budgeting, forecasting, and provides strategic financial insights.',
    icon: ChartLine,
    color: '#1565C0',
    humanCost: '$80k-$110k/year',
    aiCost: '$4k-$7k/year',
    efficiency: '18x efficiency',
    capabilities: ['Financial Modeling', 'Variance Analysis', 'Budgeting', 'Forecasting', 'Scenario Planning', 'KPI Reporting', 'Margin Analysis', 'Cash Flow Analysis'],
    route: '/ai-agent/finance/financial-analyst',
    category: 'accounting',
    type: 'agent',
    replacesRole: 'Financial Analyst + FP&A Analyst',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$9,000',
      tasksAutomatedDaily: 800,
      responseTime: '<1 second',
      accuracyRate: '97.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'medium',
  },
  {
    id: 'ai-tax-specialist',
    name: 'AI Tax Specialist',
    title: 'Tax Compliance AI',
    description: 'Manages tax preparation, compliance, and planning. Handles corporate tax returns, sales tax, international tax, and tax optimization.',
    icon: FileText,
    color: '#0D47A1',
    humanCost: '$90k-$130k/year',
    aiCost: '$5k-$8k/year',
    efficiency: '17x efficiency',
    capabilities: ['Tax Return Preparation', 'Sales Tax Management', 'Transfer Pricing', 'Tax Planning', 'IRS Compliance', 'International Tax', 'R&D Tax Credits', 'Audit Support'],
    route: '/ai-agent/finance/tax-specialist',
    category: 'accounting',
    type: 'agent',
    replacesRole: 'Tax Accountant + Tax Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$10,500',
      tasksAutomatedDaily: 500,
      responseTime: '<2 seconds',
      accuracyRate: '98.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'high',
  },
  {
    id: 'ai-payroll-specialist',
    name: 'AI Payroll Specialist',
    title: 'Payroll Processing AI',
    description: 'Manages end-to-end payroll processing, calculates wages, handles deductions, ensures compliance, and manages tax filings.',
    icon: Wallet,
    color: '#2196F3',
    humanCost: '$50k-$70k/year',
    aiCost: '$2.5k-$4k/year',
    efficiency: '20x efficiency',
    capabilities: ['Payroll Processing', 'Tax Withholding', 'Benefits Deductions', 'Direct Deposit Management', 'Payroll Tax Filing', 'Compliance Management', 'Garnishment Processing', 'Payroll Reporting'],
    route: '/ai-agent/finance/payroll-specialist',
    category: 'accounting',
    type: 'agent',
    replacesRole: 'Payroll Specialist + Payroll Manager',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$5,000',
      tasksAutomatedDaily: 3000,
      responseTime: '<0.5 seconds',
      accuracyRate: '99.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'low',
  },

  // ============================================
  // SALES & REVENUE AI (Additional)
  // ============================================
  {
    id: 'ai-revenue-operations',
    name: 'AI Revenue Operations',
    title: 'RevOps Orchestration AI',
    description: 'Optimizes the entire revenue lifecycle, aligns sales, marketing, and customer success processes, and ensures data integrity across the revenue tech stack.',
    icon: TrendingUp,
    color: '#00BCD4',
    humanCost: '$100k-$140k/year',
    aiCost: '$6k-$10k/year',
    efficiency: '16x efficiency',
    capabilities: ['Process Optimization', 'Tech Stack Management', 'Data Governance', 'Pipeline Management', 'Forecasting', 'Attribution Modeling', 'Territory Planning', 'Quota Management'],
    route: '/ai-agent/sales/revenue-operations',
    category: 'sales',
    type: 'agent',
    replacesRole: 'Revenue Operations Manager + Sales Operations',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12,000',
      tasksAutomatedDaily: 1000,
      responseTime: '<0.5 seconds',
      accuracyRate: '97.2%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'high',
  },

  // ============================================
  // CUSTOMER SUPPORT & EXPERIENCE AI (Additional)
  // ============================================
  {
    id: 'ai-customer-success',
    name: 'AI Customer Success Manager',
    title: 'Customer Success AI',
    description: 'Proactively drives customer outcomes, manages renewals, identifies expansion opportunities, and ensures high customer satisfaction and retention.',
    icon: Heart,
    color: '#E91E63',
    humanCost: '$70k-$95k/year',
    aiCost: '$4k-$6k/year',
    efficiency: '16x efficiency',
    capabilities: ['Health Scoring', 'Renewal Management', 'Expansion Identification', 'QBR Automation', 'Adoption Tracking', 'Risk Alerts', 'Success Planning', 'Value Realization'],
    route: '/ai-agent/support/customer-success',
    category: 'support',
    type: 'employee',
    replacesRole: 'Customer Success Manager + Account Manager',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$7,500',
      tasksAutomatedDaily: 600,
      responseTime: '<0.5 seconds',
      accuracyRate: '96.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'medium',
  },

  // ============================================
  // PRODUCT & RESEARCH AI
  // ============================================
  {
    id: 'ai-research-analyst',
    name: 'AI Research Analyst',
    title: 'Market Research AI',
    description: 'Conducts comprehensive market research, analyzes industry trends, performs competitive analysis, and provides insights for product strategy.',
    icon: Search,
    color: '#673AB7',
    humanCost: '$70k-$100k/year',
    aiCost: '$4k-$7k/year',
    efficiency: '17x efficiency',
    capabilities: ['Market Research', 'Trend Analysis', 'Competitive Analysis', 'User Research', 'Survey Analysis', 'Focus Group Insights', 'Industry Reports', 'Market Sizing'],
    route: '/ai-agent/product/research-analyst',
    category: 'product-rnd',
    type: 'agent',
    replacesRole: 'Market Research Analyst + Research Director',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.95%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$8,500',
      tasksAutomatedDaily: 400,
      responseTime: '<1 second',
      accuracyRate: '95.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'medium',
  },
  {
    id: 'ai-ux-researcher',
    name: 'AI UX Researcher',
    title: 'User Experience Research AI',
    description: 'Conducts UX research, analyzes user behavior, synthesizes feedback, and provides actionable insights to improve product usability.',
    icon: Eye,
    color: '#9C27B0',
    humanCost: '$80k-$110k/year',
    aiCost: '$5k-$8k/year',
    efficiency: '16x efficiency',
    capabilities: ['User Interviews', 'Usability Testing', 'Journey Mapping', 'Heatmap Analysis', 'A/B Testing', 'Feedback Synthesis', 'Persona Development', 'Accessibility Analysis'],
    route: '/ai-agent/product/ux-researcher',
    category: 'product-rnd',
    type: 'agent',
    replacesRole: 'UX Researcher + User Research Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9,500',
      tasksAutomatedDaily: 300,
      responseTime: '<1.5 seconds',
      accuracyRate: '94.2%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'medium',
  },

  // ============================================
  // DATA & INTELLIGENCE AI
  // ============================================
  {
    id: 'ai-data-engineer',
    name: 'AI Data Engineer',
    title: 'Data Infrastructure AI',
    description: 'Designs and maintains data pipelines, manages data warehouses, ensures data quality, and builds scalable data infrastructure.',
    icon: Database,
    color: '#3F51B5',
    humanCost: '$120k-$160k/year',
    aiCost: '$7k-$12k/year',
    efficiency: '16x efficiency',
    capabilities: ['ETL Pipeline Development', 'Data Warehouse Management', 'Data Modeling', 'Data Quality', 'Schema Design', 'Streaming Data', 'API Integration', 'Data Governance'],
    route: '/ai-agent/data-intelligence/data-engineer',
    category: 'data-intelligence',
    type: 'employee',
    replacesRole: 'Data Engineer + Data Architect',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14,000',
      tasksAutomatedDaily: 800,
      responseTime: '<1 second',
      accuracyRate: '98.2%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'high',
  },
  {
    id: 'ai-business-intelligence',
    name: 'AI Business Intelligence Analyst',
    title: 'BI & Reporting AI',
    description: 'Creates dashboards, generates reports, performs ad-hoc analysis, and democratizes data access across the organization.',
    icon: ChartPie,
    color: '#5C6BC0',
    humanCost: '$85k-$115k/year',
    aiCost: '$5k-$8k/year',
    efficiency: '17x efficiency',
    capabilities: ['Dashboard Creation', 'Report Automation', 'Ad-hoc Analysis', 'SQL Querying', 'Data Visualization', 'KPI Tracking', 'Self-Service BI', 'Executive Reporting'],
    route: '/ai-agent/data-intelligence/business-intelligence',
    category: 'data-intelligence',
    type: 'agent',
    replacesRole: 'BI Analyst + Reporting Specialist',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9,500',
      tasksAutomatedDaily: 600,
      responseTime: '<1 second',
      accuracyRate: '97.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'medium',
  },

  // ============================================
  // HUMAN RESOURCES AI (Additional)
  // ============================================
  {
    id: 'ai-hr-specialist',
    name: 'AI HR Specialist',
    title: 'Human Resources AI',
    description: 'Manages HR operations including onboarding, benefits administration, policy management, and employee relations.',
    icon: UserCog,
    color: '#FF9800',
    humanCost: '$55k-$75k/year',
    aiCost: '$3k-$5k/year',
    efficiency: '18x efficiency',
    capabilities: ['Onboarding Automation', 'Benefits Administration', 'Policy Management', 'Employee Relations', 'Leave Management', 'Compliance Tracking', 'HR Documentation', 'Employee Queries'],
    route: '/ai-agent/hr/hr-specialist',
    category: 'hr',
    type: 'agent',
    replacesRole: 'HR Generalist + HR Coordinator',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$5,500',
      tasksAutomatedDaily: 1200,
      responseTime: '<0.5 seconds',
      accuracyRate: '98.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'low',
  },
  {
    id: 'ai-training-coordinator',
    name: 'AI Training Coordinator',
    title: 'Learning & Development AI',
    description: 'Manages employee training programs, tracks certifications, develops learning paths, and ensures compliance training completion.',
    icon: GraduationCap,
    color: '#FFB74D',
    humanCost: '$60k-$80k/year',
    aiCost: '$3.5k-$5.5k/year',
    efficiency: '17x efficiency',
    capabilities: ['Training Program Management', 'Learning Path Design', 'Certification Tracking', 'Compliance Training', 'Skill Gap Analysis', 'Content Curation', 'LMS Administration', 'Progress Reporting'],
    route: '/ai-agent/hr/training-coordinator',
    category: 'hr',
    type: 'agent',
    replacesRole: 'Training Coordinator + L&D Specialist',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$6,000',
      tasksAutomatedDaily: 800,
      responseTime: '<0.5 seconds',
      accuracyRate: '97.2%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'low',
  },

  // ============================================
  // INFORMATION & TECHNOLOGY AI
  // ============================================
  {
    id: 'ai-it-manager',
    name: 'AI IT Manager',
    title: 'Information Technology AI',
    description: 'Oversees IT infrastructure, manages systems and networks, ensures security compliance, and optimizes technology operations.',
    icon: Monitor,
    color: '#607D8B',
    humanCost: '$110k-$150k/year',
    aiCost: '$7k-$11k/year',
    efficiency: '15x efficiency',
    capabilities: ['Infrastructure Management', 'Network Monitoring', 'Security Compliance', 'Vendor Management', 'IT Budgeting', 'System Integration', 'Disaster Recovery', 'Service Desk Oversight'],
    route: '/ai-agent/it-tech/it-manager',
    category: 'it-tech',
    type: 'employee',
    replacesRole: 'IT Manager + Infrastructure Manager',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13,000',
      tasksAutomatedDaily: 1000,
      responseTime: '<0.5 seconds',
      accuracyRate: '98.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'high',
  },
  {
    id: 'ai-helpdesk',
    name: 'AI Helpdesk Agent',
    title: 'IT Support AI',
    description: 'Provides technical support, troubleshoots hardware and software issues, manages ticket resolution, and maintains knowledge base.',
    icon: LifeBuoy,
    color: '#78909C',
    humanCost: '$45k-$65k/year',
    aiCost: '$2.5k-$4k/year',
    efficiency: '20x efficiency',
    capabilities: ['Ticket Resolution', 'Remote Troubleshooting', 'Software Support', 'Hardware Diagnostics', 'Password Resets', 'Knowledge Base Management', 'Asset Management', 'User Training'],
    route: '/ai-agent/it-tech/helpdesk',
    category: 'it-tech',
    type: 'agent',
    replacesRole: 'IT Support Specialist + Helpdesk Technician',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$5,000',
      tasksAutomatedDaily: 3000,
      responseTime: '<0.3 seconds',
      accuracyRate: '96.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'medium',
  },
  {
    id: 'ai-cloud-architect',
    name: 'AI Cloud Architect',
    title: 'Cloud Infrastructure AI',
    description: 'Designs and manages cloud infrastructure, optimizes cloud costs, ensures security, and leads cloud migration initiatives.',
    icon: Cloud,
    color: '#455A64',
    humanCost: '$140k-$180k/year',
    aiCost: '$8k-$14k/year',
    efficiency: '15x efficiency',
    capabilities: ['Cloud Architecture', 'Cost Optimization', 'Security Hardening', 'Migration Planning', 'Multi-Cloud Management', 'DevOps Integration', 'Auto-scaling', 'Disaster Recovery'],
    route: '/ai-agent/it-tech/cloud-architect',
    category: 'it-tech',
    type: 'agent',
    replacesRole: 'Cloud Architect + Solutions Architect',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16,000',
      tasksAutomatedDaily: 500,
      responseTime: '<1 second',
      accuracyRate: '97.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },

  // ============================================
  // LEGAL & COMPLIANCE AI
  // ============================================
  {
    id: 'ai-legal-counsel',
    name: 'AI Legal Counsel',
    title: 'Corporate Legal AI',
    description: 'Provides legal guidance, drafts and reviews contracts, ensures compliance, and manages corporate legal matters.',
    icon: Scale,
    color: '#3F51B5',
    humanCost: '$150k-$220k/year',
    aiCost: '$9k-$14k/year',
    efficiency: '16x efficiency',
    capabilities: ['Contract Review', 'Legal Research', 'Compliance Monitoring', 'Risk Assessment', 'Policy Drafting', 'NDA Management', 'IP Protection', 'Litigation Support'],
    route: '/ai-agent/legal-compliance/legal-counsel',
    category: 'legal-compliance',
    type: 'employee',
    replacesRole: 'Corporate Counsel + Legal Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16,000',
      tasksAutomatedDaily: 400,
      responseTime: '<2 seconds',
      accuracyRate: '95.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },
  {
    id: 'ai-compliance-officer',
    name: 'AI Compliance Officer',
    title: 'Regulatory Compliance AI',
    description: 'Monitors regulatory requirements, ensures policy adherence, manages audits, and mitigates compliance risks across all operations.',
    icon: ShieldCheck,
    color: '#303F9F',
    humanCost: '$100k-$140k/year',
    aiCost: '$6k-$10k/year',
    efficiency: '16x efficiency',
    capabilities: ['Regulatory Monitoring', 'Policy Management', 'Audit Preparation', 'Risk Assessment', 'Training Management', 'Incident Reporting', 'Documentation', 'Remediation Tracking'],
    route: '/ai-agent/legal-compliance/compliance-officer',
    category: 'legal-compliance',
    type: 'agent',
    replacesRole: 'Compliance Officer + Risk Manager',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11,000',
      tasksAutomatedDaily: 800,
      responseTime: '<1 second',
      accuracyRate: '98.2%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'high',
  },
  {
    id: 'ai-contract-analyst',
    name: 'AI Contract Analyst',
    title: 'Contract Management AI',
    description: 'Analyzes contracts, extracts key terms, manages contract lifecycle, ensures obligations are met, and identifies risks.',
    icon: FileCheck,
    color: '#1A237E',
    humanCost: '$70k-$95k/year',
    aiCost: '$4k-$7k/year',
    efficiency: '17x efficiency',
    capabilities: ['Contract Analysis', 'Clause Extraction', 'Obligation Tracking', 'Renewal Management', 'Risk Identification', 'Template Management', 'Approval Workflow', 'Repository Management'],
    route: '/ai-agent/legal-compliance/contract-analyst',
    category: 'legal-compliance',
    type: 'agent',
    replacesRole: 'Contract Manager + Paralegal',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$7,500',
      tasksAutomatedDaily: 1000,
      responseTime: '<1 second',
      accuracyRate: '97.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'medium',
  },

  // ============================================
  // ENGINEERING & DEVELOPMENT AI
  // ============================================
  {
    id: 'ai-software-engineer',
    name: 'AI Software Engineer',
    title: 'Full-Stack Development AI',
    description: 'Designs, develops, and maintains software applications. Writes clean code, performs code reviews, and ensures software quality.',
    icon: Code,
    color: '#009688',
    humanCost: '$120k-$180k/year',
    aiCost: '$7k-$12k/year',
    efficiency: '15x efficiency',
    capabilities: ['Full-Stack Development', 'Code Generation', 'Code Review', 'Debugging', 'Architecture Design', 'API Development', 'Testing', 'Documentation'],
    route: '/ai-agent/engineering-dev/software-engineer',
    category: 'engineering-dev',
    type: 'employee',
    replacesRole: 'Software Engineer + Senior Developer',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.95%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14,000',
      tasksAutomatedDaily: 500,
      responseTime: '<2 seconds',
      accuracyRate: '94.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },
  {
    id: 'ai-devops-engineer',
    name: 'AI DevOps Engineer',
    title: 'DevOps & CI/CD AI',
    description: 'Manages CI/CD pipelines, automates deployments, monitors infrastructure, and ensures high availability of systems.',
    icon: GitBranch,
    color: '#00796B',
    humanCost: '$130k-$170k/year',
    aiCost: '$8k-$13k/year',
    efficiency: '15x efficiency',
    capabilities: ['CI/CD Pipeline Management', 'Infrastructure as Code', 'Container Orchestration', 'Monitoring & Alerting', 'Security Scanning', 'Release Management', 'Environment Management', 'Automation'],
    route: '/ai-agent/engineering-dev/devops-engineer',
    category: 'engineering-dev',
    type: 'agent',
    replacesRole: 'DevOps Engineer + SRE',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$15,000',
      tasksAutomatedDaily: 2000,
      responseTime: '<0.5 seconds',
      accuracyRate: '98.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },
  {
    id: 'ai-qa-engineer',
    name: 'AI QA Engineer',
    title: 'Quality Assurance AI',
    description: 'Designs and executes test plans, automates testing, identifies bugs, and ensures software meets quality standards.',
    icon: TestTube,
    color: '#4DB6AC',
    humanCost: '$80k-$110k/year',
    aiCost: '$5k-$8k/year',
    efficiency: '17x efficiency',
    capabilities: ['Test Automation', 'Test Case Design', 'Regression Testing', 'Performance Testing', 'Bug Tracking', 'Test Reporting', 'API Testing', 'Security Testing'],
    route: '/ai-agent/engineering-dev/qa-engineer',
    category: 'engineering-dev',
    type: 'agent',
    replacesRole: 'QA Engineer + Test Automation Engineer',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$9,500',
      tasksAutomatedDaily: 3000,
      responseTime: '<0.5 seconds',
      accuracyRate: '97.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'medium',
  },
  {
    id: 'ai-security-engineer',
    name: 'AI Security Engineer',
    title: 'Application Security AI',
    description: 'Ensures application security, performs vulnerability assessments, implements security controls, and responds to security incidents.',
    icon: Lock,
    color: '#00695C',
    humanCost: '$140k-$190k/year',
    aiCost: '$9k-$15k/year',
    efficiency: '14x efficiency',
    capabilities: ['Vulnerability Assessment', 'Penetration Testing', 'Security Architecture', 'Code Security Review', 'Incident Response', 'Threat Modeling', 'Compliance Auditing', 'Security Automation'],
    route: '/ai-agent/engineering-dev/security-engineer',
    category: 'engineering-dev',
    type: 'agent',
    replacesRole: 'Security Engineer + Application Security Analyst',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16,000',
      tasksAutomatedDaily: 600,
      responseTime: '<1 second',
      accuracyRate: '96.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },

  // ============================================
  // TRADING & INVESTMENT AI (12 Agents)
  // ============================================
  {
    id: 'ai-chief-investment-officer',
    name: 'AI Chief Investment Officer',
    title: 'Investment Leadership AI',
    description: 'Provides strategic leadership for all trading and investment operations, oversees portfolio performance, manages investment committees, and ensures alignment with organizational financial goals.',
    icon: Crown,
    color: '#FFD700',
    humanCost: '$450k/year',
    aiCost: '$22.5k/year',
    efficiency: '20x efficiency',
    capabilities: ['Investment Strategy', 'Portfolio Oversight', 'Risk Management', 'Performance Analytics', 'Asset Allocation', 'Investment Committee Leadership', 'Market Timing', 'Capital Allocation'],
    route: '/ai-agent/trading-investment/cio',
    category: 'trading-investment',
    type: 'employee',
    replacesRole: 'Chief Investment Officer',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$35,000',
      tasksAutomatedDaily: 200,
      responseTime: '<1 second',
      accuracyRate: '97.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },
  {
    id: 'trading-investment-ai',
    name: 'Trading & Investment AI',
    title: 'Trading & Investment Orchestrator',
    description: 'Comprehensive AI-powered trading and investment platform. Orchestrates market analysis, algorithmic TrendingUp, portfolio management, and risk assessment across all asset classes.',
    icon: TrendingUp,
    color: '#00C853',
    humanCost: '$200k-$350k/year',
    aiCost: '$12k-$20k/year',
    efficiency: '18x efficiency',
    capabilities: ['Market Analysis', 'Algorithmic Trading', 'Portfolio Management', 'Risk Assessment', 'Sentiment Analysis', 'Technical Analysis', 'Fundamental Analysis', 'Crypto & DeFi', 'Forex Trading', 'Commodities', 'Quantitative Research', 'Macro Economics'],
    route: '/ai-agent/trading-investment-ai',
    category: 'trading-investment',
    type: 'employee',
    replacesRole: 'Portfolio Manager + Trading Analyst + Risk Manager',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$25,000',
      tasksAutomatedDaily: 5000,
      responseTime: '<0.1 seconds',
      accuracyRate: '98.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
    simulationConfig: {
      activityLogs: [
        'Scanning global markets for alpha opportunities',
        'Executing algorithmic trade on NASDAQ',
        'Rebalancing portfolio across asset classes',
        'Running risk exposure analysis',
        'Publishing macro economy briefing',
      ],
      historyItems: [
        { task: 'Portfolio Rebalance', result: '+12.4% YTD Return', status: 'Success' },
        { task: 'Risk Assessment', result: 'Low Exposure', status: 'Success' },
        { task: 'Market Signal Detected', result: 'Trade Executed', status: 'Success' },
      ],
    },
  },
  {
    id: 'mirofish-predict-anything',
    name: 'MiroFish Predict Anything™',
    title: 'Universal Prediction Engine',
    description: 'Advanced multi-domain prediction system capable of forecasting outcomes across markets, events, trends, and complex systems. Leverages deep learning ensemble methods to deliver high-confidence predictions across any domain.',
    icon: Brain,
    color: '#FF6B35',
    humanCost: '$150k-$250k/year',
    aiCost: '$10k-$18k/year',
    efficiency: '20x efficiency',
    capabilities: ['Cross-Domain Prediction', 'Ensemble Learning', 'Event Forecasting', 'Trend Analysis', 'Complex System Modeling', 'Scenario Simulation', 'Probability Calibration', 'Multi-Modal Data Fusion'],
    route: '/ai-agent/trading-investment/mirofish-predict',
    category: 'trading-investment',
    type: 'agent',
    replacesRole: 'Prediction Market Analyst + Data Scientist + Futurist',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$28,000',
      tasksAutomatedDaily: 5000,
      responseTime: '<0.2 seconds',
      accuracyRate: '97.9%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },
  {
    id: 'ai-market-prediction',
    name: 'AI Market Prediction Agent',
    title: 'Market Forecasting AI',
    description: 'Uses machine learning models to predict market movements, identify trends, and generate high-accuracy forecasts across equities, forex, and crypto markets.',
    icon: ChartLine,
    color: '#00E676',
    humanCost: '$90k-$130k/year',
    aiCost: '$5k-$9k/year',
    efficiency: '15x efficiency',
    capabilities: ['Price Forecasting', 'Trend Identification', 'ML Prediction Models', 'Volatility Analysis', 'Support/Resistance Detection', 'Market Regime Detection', 'Backtesting'],
    route: '/ai-agent/trading-investment/market-prediction',
    category: 'trading-investment',
    type: 'agent',
    replacesRole: 'Market Research Analyst + Quant Forecaster',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12,000',
      tasksAutomatedDaily: 1000,
      responseTime: '<0.5 seconds',
      accuracyRate: '96.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'high',
  },
  {
    id: 'ai-algorithmic-trading',
    name: 'AI Algorithmic Trading Agent',
    title: 'Algo Trading AI',
    description: 'Executes high-frequency algorithmic trading strategies with sub-millisecond precision. Manages order flow, optimizes execution, and adapts strategies in real-time.',
    icon: Zap,
    color: '#69F0AE',
    humanCost: '$120k-$180k/year',
    aiCost: '$8k-$14k/year',
    efficiency: '20x efficiency',
    capabilities: ['HFT Execution', 'Strategy Backtesting', 'Order Flow Management', 'Slippage Minimization', 'Multi-Exchange Trading', 'Latency Optimization', 'Strategy Adaptation'],
    route: '/ai-agent/trading-investment/algorithmic-trading',
    category: 'trading-investment',
    type: 'agent',
    replacesRole: 'Algorithmic Trader + Quantitative Developer',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$18,000',
      tasksAutomatedDaily: 50000,
      responseTime: '<0.01 seconds',
      accuracyRate: '98.2%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },
  {
    id: 'ai-equity-trading-lead',
    name: 'AI Equity Trading Lead',
    title: 'Equity Trading Team Lead',
    description: 'Leads equity trading operations, manages stock trading strategies, oversees equity research, and optimizes execution across global equity markets.',
    icon: TrendingUp,
    color: '#00BCD4',
    humanCost: '$110k/year',
    aiCost: '$5.5k/year',
    efficiency: '18x efficiency',
    capabilities: ['Equity Trading', 'Stock Analysis', 'Market Execution', 'Team Leadership', 'Strategy Development', 'Risk Oversight', 'Performance Monitoring'],
    route: '/ai-agent/trading-investment/equity-lead',
    category: 'trading-investment',
    type: 'employee',
    replacesRole: 'Equity Trading Lead',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$12,000',
      tasksAutomatedDaily: 2000,
      responseTime: '<0.2 seconds',
      accuracyRate: '96.5%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'high',
  },
  {
    id: 'ai-crypto-trading-lead',
    name: 'AI Crypto Trading Lead',
    title: 'Crypto Trading Team Lead',
    description: 'Leads cryptocurrency trading operations, manages digital asset strategies, oversees DeFi protocols, and optimizes execution across crypto exchanges.',
    icon: Coins,
    color: '#F50057',
    humanCost: '$115k/year',
    aiCost: '$5.75k/year',
    efficiency: '17x efficiency',
    capabilities: ['Crypto Trading', 'DeFi Strategy', 'Exchange Management', 'Team Leadership', 'Token Analysis', 'Risk Oversight', 'Yield Optimization'],
    route: '/ai-agent/trading-investment/crypto-lead',
    category: 'trading-investment',
    type: 'employee',
    replacesRole: 'Crypto Trading Lead',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$13,000',
      tasksAutomatedDaily: 5000,
      responseTime: '<0.2 seconds',
      accuracyRate: '94.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'high',
  },
  {
    id: 'ai-forex-trading-lead',
    name: 'AI Forex Trading Lead',
    title: 'Forex Trading Team Lead',
    description: 'Leads foreign exchange trading operations, manages currency strategies, oversees forex execution, and optimizes performance across currency pairs.',
    icon: Globe,
    color: '#D500F9',
    humanCost: '$105k/year',
    aiCost: '$5.25k/year',
    efficiency: '18x efficiency',
    capabilities: ['Forex Trading', 'Currency Analysis', 'Execution Management', 'Team Leadership', 'Strategy Development', 'Risk Oversight', 'Market Monitoring'],
    route: '/ai-agent/trading-investment/forex-lead',
    category: 'trading-investment',
    type: 'employee',
    replacesRole: 'Forex Trading Lead',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$11,500',
      tasksAutomatedDaily: 8000,
      responseTime: '<0.1 seconds',
      accuracyRate: '95.2%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'high',
  },
  {
    id: 'ai-derivatives-lead',
    name: 'AI Derivatives Lead',
    title: 'Derivatives Trading Lead',
    description: 'Leads derivatives trading operations, manages options and futures strategies, oversees complex multi-leg positions, and optimizes Greeks management.',
    icon: Activity,
    color: '#FF4081',
    humanCost: '$120k/year',
    aiCost: '$6k/year',
    efficiency: '17x efficiency',
    capabilities: ['Derivatives Trading', 'Options Strategy', 'Futures Management', 'Team Leadership', 'Greeks Optimization', 'Risk Oversight', 'Expiration Management'],
    route: '/ai-agent/trading-investment/derivatives-lead',
    category: 'trading-investment',
    type: 'employee',
    replacesRole: 'Derivatives Trading Lead',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14,000',
      tasksAutomatedDaily: 3000,
      responseTime: '<0.1 seconds',
      accuracyRate: '95.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },
  {
    id: 'ai-trading-risk-manager',
    name: 'AI Trading Risk Manager',
    title: 'Risk Management AI',
    description: 'Monitors real-time portfolio risk exposure, enforces position sizing rules, manages drawdown limits, and triggers automated hedging strategies to protect capital.',
    icon: Shield,
    color: '#FF5252',
    humanCost: '$90k-$140k/year',
    aiCost: '$6k-$11k/year',
    efficiency: '14x efficiency',
    capabilities: ['Position Sizing', 'Drawdown Management', 'VaR Calculation', 'Hedging Automation', 'Correlation Analysis', 'Stress Testing', 'Stop-Loss Management'],
    route: '/ai-agent/trading-investment/trading-risk-manager',
    category: 'trading-investment',
    type: 'agent',
    replacesRole: 'Risk Manager + Compliance Officer (TrendingUp)',
    infrastructure: {
      status: 'online',
      health: 100,
      uptime: '99.999%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$20,000',
      tasksAutomatedDaily: 8000,
      responseTime: '<0.05 seconds',
      accuracyRate: '99.1%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },
  {
    id: 'ai-futures-options',
    name: 'AI Futures & Options Agent',
    title: 'Derivatives Trading AI',
    description: 'Specializes in derivatives markets including futures contracts and options strategies. Manages complex multi-leg options positions, Greeks, and expiration management.',
    icon: TrendingDown,
    color: '#FF4081',
    humanCost: '$100k-$150k/year',
    aiCost: '$7k-$12k/year',
    efficiency: '14x efficiency',
    capabilities: ['Options Strategy Builder', 'Greeks Management (Delta, Gamma, Theta)', 'Expiration Management', 'Futures Rollover', 'Covered Calls', 'Iron Condors', 'Spread Trading'],
    route: '/ai-agent/trading-investment/futures-options',
    category: 'trading-investment',
    type: 'agent',
    replacesRole: 'Derivatives Trader + Options Strategist',
    infrastructure: {
      status: 'online',
      health: 98,
      uptime: '99.95%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$16,000',
      tasksAutomatedDaily: 1500,
      responseTime: '<0.1 seconds',
      accuracyRate: '95.2%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'critical',
  },
  {
    id: 'ai-crypto-defi',
    name: 'AI Crypto & DeFi Analyst',
    title: 'Cryptocurrency Analysis AI',
    description: 'Monitors crypto markets across 500+ tokens, analyzes DeFi protocols, identifies yield farming opportunities, and executes on-chain transactions with gas optimization.',
    icon: Coins,
    color: '#F50057',
    humanCost: '$80k-$120k/year',
    aiCost: '$5k-$9k/year',
    efficiency: '15x efficiency',
    capabilities: ['Crypto Price Analysis', 'DeFi Protocol Monitoring', 'Yield Farming Optimization', 'On-Chain Analytics', 'NFT Market Analysis', 'Gas Optimization', 'Wallet Tracking'],
    route: '/ai-agent/trading-investment/crypto-defi',
    category: 'trading-investment',
    type: 'agent',
    replacesRole: 'Crypto Analyst + DeFi Researcher',
    infrastructure: {
      status: 'online',
      health: 99,
      uptime: '99.99%',
      lastActive: 'Now',
      processingPower: 'enterprise',
    },
    roiMetrics: {
      savingsPerMonth: '$14,000',
      tasksAutomatedDaily: 20000,
      responseTime: '<0.2 seconds',
      accuracyRate: '93.8%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'high',
  },
  {
    id: 'ai-commodities',
    name: 'AI Commodities Agent',
    title: 'Commodities Trading AI',
    description: 'Trades energy, metals, and agricultural commodities. Monitors supply/demand dynamics, geopolitical events, and seasonal patterns to capitalize on commodity price movements.',
    icon: ChartBar,
    color: '#FF6D00',
    humanCost: '$80k-$120k/year',
    aiCost: '$5k-$8k/year',
    efficiency: '15x efficiency',
    capabilities: ['Energy Markets (Oil & Gas)', 'Precious Metals Analysis', 'Agricultural Commodities', 'Supply Chain Intelligence', 'Seasonal Pattern Trading', 'Geopolitical Risk Monitoring', 'COT Report Analysis'],
    route: '/ai-agent/trading-investment/commodities',
    category: 'trading-investment',
    type: 'agent',
    replacesRole: 'Commodities Trader + Commodity Research Analyst',
    infrastructure: {
      status: 'online',
      health: 97,
      uptime: '99.9%',
      lastActive: 'Now',
      processingPower: 'high',
    },
    roiMetrics: {
      savingsPerMonth: '$11,000',
      tasksAutomatedDaily: 2000,
      responseTime: '<0.3 seconds',
      accuracyRate: '93.2%',
    },
    isNew: true,
    isPremium: true,
    dangerLevel: 'medium',
  },
]); // Auto-enhanced with all capabilities

export const aiEmployeeCategories = [
  { id: 'all', label: 'All', icon: Bot },
  { id: 'employees', label: 'AI Employees', icon: Users },
  { id: 'agents', label: 'AI Agents', icon: Cpu },
  { id: 'executive', label: 'Executive', icon: Briefcase },
  { id: 'accounting', label: 'Accounting', icon: Calculator },
  { id: 'support', label: 'Customer', icon: Headphones },
  { id: 'sales', label: 'Sales', icon: Target },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'operations', label: 'Operations', icon: Settings },
  { id: 'social-media', label: 'Social Media', icon: Share2 },
  { id: 'analytics', label: 'Analytics', icon: ChartBar },
  { id: 'data-intelligence', label: 'Data Intelligence', icon: Database },
  { id: 'product-rnd', label: 'Product & Research', icon: FlaskConical },
  { id: 'hr', label: 'HR', icon: UserCheck },
  { id: 'it-tech', label: 'IT', icon: Monitor },
  { id: 'legal-compliance', label: 'Legal', icon: Scale },
  { id: 'engineering-dev', label: 'Engineering', icon: Code },
  { id: 'personal-assistant', label: 'Assistant', icon: Brain },
  { id: 'trading-investment', label: 'Trading', icon: TrendingUp },
];

// Infrastructure summary stats
export const aiInfrastructureStats = {
  totalEmployees: aiEmployees.filter(e => e.type === 'employee').length,
  totalAgents: aiEmployees.filter(e => e.type === 'agent').length,
  onlineCount: aiEmployees.filter(e => e.infrastructure.status === 'online').length,
  averageHealth: Math.round(aiEmployees.reduce((sum, e) => sum + e.infrastructure.health, 0) / aiEmployees.length),
  totalMonthlySavings: '$250,000+',
  totalTasksAutomatedDaily: aiEmployees.reduce((sum, e) => sum + e.roiMetrics.tasksAutomatedDaily, 0),
};
