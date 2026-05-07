import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  Briefcase,
  Landmark,
  Headphones,
  Target,
  Megaphone,
  FlaskConical,
  Settings,
  Share2,
  ChartBarBig,
  Gauge,
  Users,
  Monitor,
  Scale,
  SquareCode,
  CircleUser,
  TrendingUp,
  ChevronRight,
  HeartHandshake,
  BarChart3,
  LayoutGrid,
  LineChart,
  Gift,
  ClipboardList,
  CreditCard,
  Handshake,
  Database,
  FileText,
  UserCheck,
  Shield,
  DollarSign,
  Eye,
  Search,
  Calendar,
  Mail,
  Zap,
  PenTool,
  Filter,
  Star,
  Send,
  PieChart,
  RefreshCw,
  CheckCircle,
  Building2,
  MapPin,
  TrendingDown,
  Globe,
  Award,
  Sparkles,
  Wrench,
  Palette,
  GitBranch,
  Compass,
  Rocket,
  Layers,
  Lightbulb,
  Image as ImageIcon,
  FlaskConical as FlaskIcon,
  ClipboardList as ClipboardIcon,
  UserPlus,
  Timer,
  BookOpen,
  Receipt,
  Calculator,
  Heart,
  Phone,
  MessageCircle,
  Ticket,
  MessageSquareWarning,
  ShieldCheck,
  Activity,
  AlertTriangle,
  HelpCircle,
  MessageSquare,
  Tag,
  Puzzle,
  CircleArrowUp,
  FolderTree,
  SquareCheck,
  Percent,
  CalendarClock,
  Crown,
  Fingerprint,
  RotateCcw,
  Megaphone as MegaphoneIcon,
  ClipboardCheck,
  Columns3,
  LayoutDashboard as LayoutIcon,
  SquareCheck as SquareCheckIcon,
  FileSearch2,
  ArrowRightLeft,
  LayoutGrid as LayoutGridIcon,
  BookOpen as BookOpenIcon,
  PhoneForward,
  Brain,
  CircleCheckBig,
  GraduationCap,
  Box,
  Clipboard,
  Building,
  Truck,
  Factory,
  HeartPulse,
  HardHat,
  Ruler,
  Trash2,
  Package,
  Link,
  ShieldAlert,
  Terminal,
  Cloud,
  Bot,
  Crown as CrownIcon,
  Sparkles as SparklesIcon,
  BarChart,
  Gavel,
  FileBarChart,
  Code,
  Key,
  ArrowUp,
  ArrowUpRight,
  FileWarning,
  Map,
  ListFilter,
  SlidersHorizontal,
  Microscope,
  Leaf,
  TestTube,
  History,
  Route,
  ArrowDown,
  List,
  Bell,
  Network,
  Ship,
  PackageCheck,
  Warehouse,
  ShoppingCart,
  Upload,
  FileCheck,
} from 'lucide-react-native';

interface SidebarCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  color: string;
  route: string;
  count: number;
}

// All 22 Departments - 1,108 Total Agents
const departmentCategories: SidebarCategory[] = [
  // Mind Map Visualization
  { id: 'mind-map', label: 'AI Workforce Map', icon: GitBranch, color: '#7C4DFF', route: '/ai-agent/mind-map', count: 1108 },
  // DEPT 1: Customer Experience (56 agents)
  { id: 'customer-experience', label: 'Customer Experience', icon: Headphones, color: '#00BCD4', route: '/ai-agent/customer-experience', count: 56 },
  // DEPT 2: Sales & Revenue (56 agents)
  { id: 'sales-revenue', label: 'Sales & Revenue', icon: Target, color: '#FFA000', route: '/ai-agent/sales-revenue', count: 56 },
  // DEPT 3: Marketing & Growth (60 agents)
  { id: 'marketing-growth', label: 'Marketing & Growth', icon: Megaphone, color: '#E91E63', route: '/ai-agent/marketing-growth', count: 60 },
  // DEPT 4: Operations & Management (52 agents)
  { id: 'operations-management', label: 'Operations & Management', icon: Settings, color: '#607D8B', route: '/ai-agent/operations', count: 52 },
  // DEPT 5: Finance & Accounting (52 agents)
  { id: 'finance-accounting', label: 'Finance & Accounting', icon: DollarSign, color: '#2E7D32', route: '/ai-agent/finance', count: 52 },
  // DEPT 6: Technology & Engineering (64 agents)
  { id: 'technology-engineering', label: 'Technology & Engineering', icon: Code, color: '#1565C0', route: '/ai-agent/engineering', count: 64 },
  // DEPT 7: Human Resources (44 agents)
  { id: 'human-resources', label: 'Human Resources', icon: Users, color: '#9C27B0', route: '/ai-agent/hr', count: 44 },
  // DEPT 8: Legal & Compliance (40 agents)
  { id: 'legal-compliance', label: 'Legal & Compliance', icon: Scale, color: '#3F51B5', route: '/ai-agent/legal', count: 40 },
  // DEPT 9: Data & Intelligence (52 agents)
  { id: 'data-intelligence', label: 'Data & Intelligence', icon: Database, color: '#AF52DE', route: '/ai-agent/data', count: 52 },
  // DEPT 10: Product Management (40 agents)
  { id: 'product-management', label: 'Product Management', icon: Box, color: '#FF5722', route: '/ai-agent/product', count: 40 },
  // DEPT 11: Security & Risk (48 agents)
  { id: 'security-risk', label: 'Security & Risk', icon: Shield, color: '#F44336', route: '/ai-agent/security', count: 48 },
  // DEPT 12: Research & Development (36 agents)
  { id: 'research-development', label: 'Research & Development', icon: FlaskConical, color: '#009688', route: '/ai-agent/research', count: 36 },
  // DEPT 13: Administrative (36 agents)
  { id: 'administrative', label: 'Administrative', icon: Clipboard, color: '#795548', route: '/ai-agent/administrative', count: 36 },
  // DEPT 14: Trading & Investments (72 agents)
  { id: 'trading-investments', label: 'Trading & Investments', icon: TrendingUp, color: '#10B981', route: '/ai-agent/trading', count: 72 },
  // DEPT 15: Real Estate & Property (56 agents)
  { id: 'real-estate', label: 'Real Estate & Property', icon: Building, color: '#8D6E63', route: '/ai-agent/realestate', count: 56 },
  // DEPT 16: Insurance & Risk (64 agents)
  { id: 'insurance-risk', label: 'Insurance & Risk', icon: ShieldCheck, color: '#FF7043', route: '/ai-agent/insurance', count: 64 },
  // DEPT 17: Healthcare & Medical (56 agents)
  { id: 'healthcare-medical', label: 'Healthcare & Medical', icon: HeartPulse, color: '#EC407A', route: '/ai-agent/healthcare', count: 56 },
  // DEPT 18: Manufacturing & Production (56 agents)
  { id: 'manufacturing', label: 'Manufacturing & Production', icon: Factory, color: '#5C6BC0', route: '/ai-agent/manufacturing', count: 56 },
  // DEPT 19: Transportation & Logistics (56 agents)
  { id: 'transportation', label: 'Transportation & Logistics', icon: Truck, color: '#26A69A', route: '/ai-agent/transportation', count: 56 },
  // DEPT 20: Government & Public Sector (48 agents)
  { id: 'government', label: 'Government & Public Sector', icon: Landmark, color: '#78909C', route: '/ai-agent/government', count: 48 },
  // DEPT 21: Supply Chain & Logistics (40 agents)
  { id: 'supply-chain', label: 'Supply Chain & Logistics', icon: Link, color: '#42A5F5', route: '/ai-agent/supply-chain', count: 40 },
  // DEPT 22: AI Management & Governance (24 agents)
  { id: 'ai-governance', label: 'AI Management & Governance', icon: Brain, color: '#7C4DFF', route: '/ai-agent/ai-mgmt', count: 24 },
];

// Legacy categories for backwards compatibility
const categories: SidebarCategory[] = [
  { id: 'executive-leadership', label: 'Executive & Leadership AI', icon: Briefcase, color: '#1E3A5F', route: '/ai-agent/executive-leadership-ai', count: 9 },
  { id: 'accounting-finance', label: 'Accounting & Finance AI', icon: Landmark, color: '#10B981', route: '/ai-agent/accounting-finance-ai', count: 10 },
  { id: 'customer-experience-ai', label: 'Customer Experience AI', icon: Headphones, color: '#007AFF', route: '/ai-agent/customer-experience-ai', count: 8 },
  { id: 'sales-revenue-ai', label: 'Sales & Revenue AI', icon: Target, color: '#34C759', route: '/ai-agent/sales-revenue-ai', count: 10 },
  { id: 'marketing-growth-ai', label: 'Marketing & Growth AI', icon: Megaphone, color: '#FF2D55', route: '/ai-agent/marketing-growth-ai', count: 10 },
  { id: 'product-rnd-ai', label: 'Product & R&D AI', icon: FlaskConical, color: '#7B1FA2', route: '/ai-agent/product-rnd-ai', count: 6 },
  { id: 'operations-management-ai', label: 'Operations & Management AI', icon: Settings, color: '#FF6B35', route: '/ai-agent/operations-management-ai', count: 10 },
  { id: 'social-media-management-ai', label: 'Social Media Management AI', icon: Share2, color: '#E1306C', route: '/ai-agent/social-media-management-ai', count: 8 },
  { id: 'data-intelligence-ai', label: 'Data & Intelligence AI', icon: ChartBarBig, color: '#9B59B6', route: '/ai-agent/data-intelligence-ai', count: 8 },
  { id: 'analysis-performance-ai', label: 'Analysis, Insights & Performance AI', icon: Gauge, color: '#E74C3C', route: '/ai-agent/analysis-performance-ai', count: 9 },
  { id: 'human-resources-ai', label: 'Human Resources AI', icon: Users, color: '#00897B', route: '/ai-agent/human-resources-ai', count: 7 },
  { id: 'it-technology-ai', label: 'IT & Technology AI', icon: Monitor, color: '#0288D1', route: '/ai-agent/it-technology-ai', count: 6 },
  { id: 'legal-compliance-ai', label: 'Legal & Compliance AI', icon: Scale, color: '#4E342E', route: '/ai-agent/legal-compliance-ai', count: 6 },
  { id: 'engineering-development-ai', label: 'Engineering & Development AI', icon: SquareCode, color: '#1565C0', route: '/ai-agent/engineering-development-ai', count: 7 },
  { id: 'ai-personal-assistant', label: 'AI Personal Assistant', icon: CircleUser, color: '#1976D2', route: '/ai-agent/ai-personal-assistant-ai', count: 7 },
  { id: 'trading-investment-ai', label: 'Trading & Investment AI', icon: TrendingUp, color: '#00C853', route: '/ai-agent/trading-investment-ai', count: 16 },
];

// New CX Sub-Agent Categories - Line 4
const cxSubAgentCategories: SidebarCategory[] = [
  { id: 'loyalty-engagement', label: 'AI Loyalty & Engagement', icon: Gift, color: '#AF52DE', route: '/ai-agent/customer-experience/loyalty-engagement', count: 3 },
  { id: 'feedback-survey', label: 'AI Feedback & Survey', icon: ClipboardList, color: '#5856D6', route: '/ai-agent/customer-experience/feedback-survey', count: 3 },
  { id: 'billing-support', label: 'AI Billing Support', icon: CreditCard, color: '#007AFF', route: '/ai-agent/customer-experience/billing-support', count: 3 },
];

// Sales & Revenue Sub-Agents - Agents 21-25 with 3-line entries
const salesSubAgentCategories: SidebarCategory[] = [
  { id: 'ai-sales-rep', label: 'AI Sales Rep', icon: UserCheck, color: '#FF9500', route: '/ai-agent/ai-sales-rep', count: 3 },
  { id: 'ai-sales-executive', label: 'AI Sales Executive', icon: Briefcase, color: '#007AFF', route: '/ai-agent/ai-sales-executive', count: 3 },
  { id: 'ai-crm-assistant', label: 'AI CRM Assistant', icon: Database, color: '#5856D6', route: '/ai-agent/ai-crm-assistant', count: 3 },
  { id: 'ai-proposal-generator', label: 'AI Proposal Generator', icon: FileText, color: '#8B5CF6', route: '/ai-agent/sales/ai-proposal-generator', count: 3 },
  { id: 'ai-negotiator', label: 'AI Negotiator', icon: Handshake, color: '#6366F1', route: '/ai-agent/ai-negotiator', count: 3 },
];

// Sales VP & Manager Sub-Agents - Agents 15-20 with 3-line entries
const salesVPSubAgentCategories: SidebarCategory[] = [
  { id: 'vp-sales', label: 'AI VP Sales', icon: Target, color: '#FF3B30', route: '/ai-agent/sales/vp-sales', count: 3 },
  { id: 'vp-revenue', label: 'AI VP Revenue', icon: DollarSign, color: '#34C759', route: '/ai-agent/sales/vp-revenue', count: 3 },
  { id: 'vp-business-dev', label: 'AI VP Business Dev', icon: TrendingUp, color: '#5856D6', route: '/ai-agent/sales/vp-business-development', count: 3 },
  { id: 'vp-channel-partners', label: 'AI VP Channel Partners', icon: Handshake, color: '#FF9500', route: '/ai-agent/sales/vp-channel-partners', count: 3 },
  { id: 'sales-ops-manager', label: 'AI Sales Ops Manager', icon: BarChart3, color: '#AF52DE', route: '/ai-agent/sales/sales-ops-manager', count: 3 },
  { id: 'ai-sdr', label: 'AI Lead Dev Rep (SDR)', icon: Send, color: '#007AFF', route: '/ai-agent/sales/ai-sdr', count: 3 },
];

// Marketing Sub-Agent Categories - Agents 36-41
const marketingSubAgentCategories: SidebarCategory[] = [
  { id: 'ai-content-marketing', label: 'AI Content Marketing', icon: PenTool, color: '#FF2D55', route: '/ai-agent/marketing/ai-content-marketing-agent', count: 3 },
  { id: 'ai-seo-specialist', label: 'AI SEO Specialist', icon: Search, color: '#06B6D4', route: '/ai-agent/marketing/ai-seo-specialist-agent', count: 3 },
  { id: 'ai-social-media-manager', label: 'AI Social Media Mgr', icon: Calendar, color: '#E1306C', route: '/ai-agent/marketing/ai-social-media-manager-agent', count: 3 },
  { id: 'ai-email-marketing', label: 'AI Email Marketing', icon: Mail, color: '#8B5CF6', route: '/ai-agent/marketing/ai-email-marketing-agent', count: 3 },
  { id: 'ai-ad-campaign-manager', label: 'AI Ad Campaign Mgr', icon: Zap, color: '#F59E0B', route: '/ai-agent/marketing/ai-ad-campaign-manager-agent', count: 3 },
  { id: 'ai-marketing-analytics', label: 'AI Marketing Analytics', icon: Filter, color: '#10B981', route: '/ai-agent/marketing/ai-marketing-analytics-agent', count: 3 },
];

// Marketing VP & Manager Hierarchy - Agents 29-35
const marketingVPHierarchy: SidebarCategory[] = [
  { id: 'cmo', label: 'AI Chief Marketing Officer', icon: Megaphone, color: '#C62828', route: '/ai-agent/marketing/cmo', count: 3 },
  { id: 'vp-marketing', label: 'AI VP Marketing', icon: BarChart3, color: '#D81B60', route: '/ai-agent/marketing/vp-marketing', count: 3 },
  { id: 'vp-brand', label: 'AI VP Brand', icon: Palette, color: '#9C27B0', route: '/ai-agent/marketing/vp-brand', count: 3 },
  { id: 'vp-growth', label: 'AI VP Growth', icon: TrendingUp, color: '#FF6B35', route: '/ai-agent/marketing/vp-growth', count: 3 },
  { id: 'vp-content', label: 'AI VP Content', icon: FileText, color: '#00897B', route: '/ai-agent/marketing/vp-content', count: 3 },
  { id: 'vp-digital', label: 'AI VP Digital', icon: Monitor, color: '#1565C0', route: '/ai-agent/marketing/vp-digital', count: 3 },
  { id: 'marketing-manager', label: 'AI Marketing Manager', icon: ClipboardIcon, color: '#E65100', route: '/ai-agent/marketing/marketing-manager', count: 3 },
];

// Operations & Finance Agent Hierarchy - Agents 55-59
const operationsFinanceCategories: SidebarCategory[] = [
  { id: 'ai-resource-planner', label: 'AI Resource Planner', icon: Calendar, color: '#FF6B35', route: '/ai-agent/operations/ai-resource-planner', count: 3 },
  { id: 'ai-quality-assurance', label: 'AI Quality Assurance', icon: CheckCircle, color: '#8B5CF6', route: '/ai-agent/operations/ai-quality-assurance', count: 3 },
  { id: 'ai-cfo', label: 'AI Chief Financial Officer', icon: Briefcase, color: '#10B981', route: '/ai-agent/finance/cfo', count: 3 },
  { id: 'ai-vp-finance', label: 'AI VP Finance', icon: ChartBarBig, color: '#4CAF50', route: '/ai-agent/finance/vp-finance', count: 3 },
  { id: 'ai-vp-accounting', label: 'AI VP Accounting', icon: Landmark, color: '#388E3C', route: '/ai-agent/finance/vp-accounting', count: 3 },
];

// Finance Sub-Agents - CFO, VP Finance, VP Accounting sub-agents
const financeSubAgentCategories: SidebarCategory[] = [
  { id: 'ai-financial-strategy-advisor', label: 'AI Financial Strategy Advisor', icon: DollarSign, color: '#2E7D32', route: '/ai-agent/finance/sub-agents/financial-strategy-advisor', count: 1 },
  { id: 'ai-capital-allocation-optimizer', label: 'AI Capital Allocation Optimizer', icon: BarChart3, color: '#007AFF', route: '/ai-agent/finance/sub-agents/capital-allocation-optimizer', count: 1 },
  { id: 'ai-risk-reward-analyst', label: 'AI Risk-Reward Analyst', icon: TrendingUp, color: '#FF9500', route: '/ai-agent/finance/sub-agents/risk-reward-analyst', count: 1 },
  { id: 'ai-financial-modeler', label: 'AI Financial Modeler', icon: Calculator, color: '#2E7D32', route: '/ai-agent/finance/sub-agents/financial-modeler', count: 1 },
  { id: 'ai-cash-flow-forecaster', label: 'AI Cash Flow Forecaster', icon: DollarSign, color: '#007AFF', route: '/ai-agent/finance/sub-agents/cash-flow-forecaster', count: 1 },
  { id: 'ai-investment-appraiser', label: 'AI Investment Appraiser', icon: TrendingUp, color: '#FF9500', route: '/ai-agent/finance/sub-agents/investment-appraiser', count: 1 },
  { id: 'ai-ledger-reconciler', label: 'AI Ledger Reconciler', icon: Receipt, color: '#2E7D32', route: '/ai-agent/finance/sub-agents/ledger-reconciler', count: 1 },
  { id: 'ai-accounting-standards-enforcer', label: 'AI Accounting Standards Enforcer', icon: Shield, color: '#007AFF', route: '/ai-agent/finance/sub-agents/accounting-standards-enforcer', count: 1 },
  { id: 'ai-close-process-coordinator', label: 'AI Close Process Coordinator', icon: BookOpen, color: '#FF9500', route: '/ai-agent/finance/sub-agents/close-process-coordinator', count: 1 },
];

// Finance VP & Manager Hierarchy - Agents 60-69
const financeVPHierarchy: SidebarCategory[] = [
  { id: 'vp-treasury', label: 'AI VP Treasury', icon: DollarSign, color: '#2E7D32', route: '/ai-agent/finance/vp-treasury', count: 3 },
  { id: 'vp-investor-relations', label: 'AI VP Investor Relations', icon: TrendingUp, color: '#007AFF', route: '/ai-agent/finance/vp-investor-relations', count: 3 },
  { id: 'controller', label: 'AI Controller', icon: Shield, color: '#4E342E', route: '/ai-agent/finance/controller', count: 3 },
  { id: 'finance-manager', label: 'AI Finance Manager', icon: ChartBarBig, color: '#388E3C', route: '/ai-agent/finance/finance-manager', count: 3 },
  { id: 'accounting-manager', label: 'AI Accounting Manager', icon: Landmark, color: '#1565C0', route: '/ai-agent/finance/accounting-manager', count: 3 },
  { id: 'financial-analyst', label: 'AI Financial Analyst', icon: BarChart3, color: '#FF9500', route: '/ai-agent/finance/ai-financial-analyst', count: 3 },
  { id: 'budget-manager', label: 'AI Budget Manager', icon: Calculator, color: '#7B1FA2', route: '/ai-agent/finance/ai-budget-manager', count: 3 },
  { id: 'tax-specialist', label: 'AI Tax Specialist', icon: Receipt, color: '#E65100', route: '/ai-agent/finance/ai-tax-specialist', count: 3 },
  { id: 'audit-manager', label: 'AI Audit Manager', icon: ClipboardCheck, color: '#00897B', route: '/ai-agent/finance/ai-audit-manager', count: 3 },
  { id: 'treasury-analyst', label: 'AI Treasury Analyst', icon: DollarSign, color: '#0288D1', route: '/ai-agent/finance/ai-treasury-analyst', count: 3 },
];

// Tech VP & Lead Hierarchy - Agents 70-80
const techVPHierarchy: SidebarCategory[] = [
  { id: 'cto', label: 'AI CTO', icon: Monitor, color: '#1565C0', route: '/ai-agent/tech/cto', count: 3 },
  { id: 'vp-engineering', label: 'AI VP Engineering', icon: SquareCode, color: '#0288D1', route: '/ai-agent/tech/vp-engineering', count: 3 },
  { id: 'vp-infrastructure', label: 'AI VP Infrastructure', icon: Cloud, color: '#00897B', route: '/ai-agent/tech/vp-infrastructure', count: 3 },
  { id: 'vp-ai-ml', label: 'AI VP AI/ML', icon: Brain, color: '#7B1FA2', route: '/ai-agent/tech/vp-ai-ml', count: 3 },
  { id: 'vp-security-tech', label: 'AI VP Security Tech', icon: Shield, color: '#C62828', route: '/ai-agent/tech/vp-security-tech', count: 3 },
  { id: 'lead-architect', label: 'AI Lead Architect', icon: LayoutIcon, color: '#E65100', route: '/ai-agent/tech/lead-architect', count: 3 },
  { id: 'devops-manager', label: 'AI DevOps Manager', icon: Settings, color: '#FF6B35', route: '/ai-agent/tech/devops-manager', count: 3 },
  { id: 'frontend-lead', label: 'AI Frontend Lead', icon: Palette, color: '#9C27B0', route: '/ai-agent/tech/frontend-lead', count: 3 },
  { id: 'backend-lead', label: 'AI Backend Lead', icon: Database, color: '#2E7D32', route: '/ai-agent/tech/backend-lead', count: 3 },
  { id: 'sre-lead', label: 'AI SRE Lead', icon: Activity, color: '#FF9500', route: '/ai-agent/tech/sre-lead', count: 3 },
  { id: 'frontend-developer', label: 'AI Frontend Developer', icon: Palette, color: '#AF52DE', route: '/ai-agent/tech/ai-frontend-developer', count: 3 },
];

// Operations Sub-Agents - Resource Planner & QA sub-agents
const operationsSubAgentCategories: SidebarCategory[] = [
  { id: 'ai-demand-forecaster', label: 'AI Demand Forecaster', icon: TrendingUp, color: '#2E7D32', route: '/ai-agent/operations/sub-agents/demand-forecaster', count: 1 },
  { id: 'ai-allocation-optimizer', label: 'AI Allocation Optimizer', icon: BarChart3, color: '#007AFF', route: '/ai-agent/operations/sub-agents/allocation-optimizer', count: 1 },
  { id: 'ai-utilization-tracker', label: 'AI Utilization Tracker', icon: Gauge, color: '#FF9500', route: '/ai-agent/operations/sub-agents/utilization-tracker', count: 1 },
  { id: 'ai-test-case-generator', label: 'AI Test Case Generator', icon: FileText, color: '#2E7D32', route: '/ai-agent/operations/sub-agents/test-case-generator', count: 1 },
  { id: 'ai-defect-logger', label: 'AI Defect Logger', icon: ClipboardList, color: '#007AFF', route: '/ai-agent/operations/sub-agents/defect-logger', count: 1 },
  { id: 'ai-regression-tracker', label: 'AI Regression Tracker', icon: RefreshCw, color: '#FF9500', route: '/ai-agent/operations/sub-agents/regression-tracker', count: 1 },
];

// Operations VP & Agent Hierarchy - Agents 48-54
const operationsVPHierarchy: SidebarCategory[] = [
  { id: 'vp-facilities', label: 'AI VP Facilities', icon: Building2, color: '#4E342E', route: '/ai-agent/operations/vp-facilities', count: 3 },
  { id: 'vp-project-management', label: 'AI VP Project Mgmt', icon: ClipboardList, color: '#1565C0', route: '/ai-agent/operations/vp-project-management', count: 3 },
  { id: 'ai-operations-manager', label: 'AI Ops Manager', icon: Settings, color: '#FF6B35', route: '/ai-agent/operations/ai-operations-manager', count: 3 },
  { id: 'ai-operations-manager-sub', label: 'AI Ops Manager (Sub)', icon: Gauge, color: '#607D8B', route: '/ai-agent/operations/ai-operations-manager-sub', count: 3 },
  { id: 'ai-workflow-automation', label: 'AI Workflow Auto', icon: Zap, color: '#7B1FA2', route: '/ai-agent/operations/ai-workflow-automation', count: 3 },
  { id: 'ai-task-coordinator', label: 'AI Task Coordinator', icon: ClipboardList, color: '#00897B', route: '/ai-agent/operations/ai-task-coordinator', count: 3 },
  { id: 'ai-process-optimization', label: 'AI Process Optimize', icon: Sparkles, color: '#FF9500', route: '/ai-agent/operations/ai-process-optimization', count: 3 },
];

// Customer VP & Executive Hierarchy - Agents 1-6
const customerVPHierarchy: SidebarCategory[] = [
  { id: 'chief-customer-officer', label: 'AI Chief Customer Officer', icon: Heart, color: '#E65100', route: '/ai-agent/customer/chief-customer-officer', count: 3 },
  { id: 'vp-customer-success', label: 'AI VP Customer Success', icon: UserCheck, color: '#34C759', route: '/ai-agent/customer/vp-customer-success', count: 3 },
  { id: 'vp-support', label: 'AI VP Support', icon: Headphones, color: '#007AFF', route: '/ai-agent/customer/vp-support', count: 3 },
  { id: 'vp-experience', label: 'AI VP Experience', icon: Sparkles, color: '#AF52DE', route: '/ai-agent/customer/vp-experience', count: 3 },
  { id: 'vp-retention', label: 'AI VP Retention', icon: RefreshCw, color: '#FF6B35', route: '/ai-agent/customer/vp-retention', count: 3 },
  { id: 'vp-loyalty', label: 'AI VP Loyalty', icon: Award, color: '#AF52DE', route: '/ai-agent/customer/vp-loyalty', count: 3 },
];

// Customer Agent Hierarchy - Agents 7-14
const customerAgentHierarchy: SidebarCategory[] = [
  { id: 'receptionist', label: 'AI Receptionist', icon: Phone, color: '#34C759', route: '/ai-agent/customer/receptionist', count: 3 },
  { id: 'customer-support', label: 'AI Customer Support', icon: Headphones, color: '#007AFF', route: '/ai-agent/customer/customer-support', count: 3 },
  { id: 'ticket-resolution', label: 'AI Ticket Resolution', icon: ClipboardList, color: '#8B5CF6', route: '/ai-agent/customer/ticket-resolution', count: 3 },
  { id: 'complaint-handling', label: 'AI Complaint Handling', icon: AlertTriangle, color: '#FF3B30', route: '/ai-agent/customer/complaint-handling', count: 3 },
  { id: 'retention-specialist', label: 'AI Retention Specialist', icon: Shield, color: '#10B981', route: '/ai-agent/customer/retention-specialist', count: 3 },
  { id: 'loyalty-engagement', label: 'AI Loyalty & Engagement', icon: Star, color: '#F59E0B', route: '/ai-agent/customer/loyalty-engagement', count: 3 },
  { id: 'feedback-survey', label: 'AI Feedback & Survey', icon: ClipboardList, color: '#5856D6', route: '/ai-agent/customer/feedback-survey', count: 3 },
  { id: 'billing-support', label: 'AI Billing Support', icon: CreditCard, color: '#007AFF', route: '/ai-agent/customer/billing-support', count: 3 },
];

// Sales VP & Executive Hierarchy - Agents 15-18
const salesVPHierarchy: SidebarCategory[] = [
  { id: 'vp-sales', label: 'AI VP Sales', icon: Target, color: '#FF3B30', route: '/ai-agent/sales/vp-sales', count: 3 },
  { id: 'vp-revenue', label: 'AI VP Revenue', icon: DollarSign, color: '#34C759', route: '/ai-agent/sales/vp-revenue', count: 3 },
  { id: 'vp-business-dev', label: 'AI VP Business Dev', icon: Globe, color: '#5856D6', route: '/ai-agent/sales/vp-business-development', count: 3 },
  { id: 'vp-channel-partners', label: 'AI VP Channel Partners', icon: Handshake, color: '#FF9500', route: '/ai-agent/sales/vp-channel-partners', count: 3 },
];

// Sales Manager & Agent Hierarchy - Agents 19-28
const salesManagerHierarchy: SidebarCategory[] = [
  { id: 'sales-ops-manager', label: 'AI Sales Ops Manager', icon: Settings, color: '#FF6B35', route: '/ai-agent/sales/sales-ops-manager', count: 3 },
  { id: 'ai-sdr', label: 'AI Lead Dev Rep (SDR)', icon: Send, color: '#007AFF', route: '/ai-agent/sales/ai-sdr', count: 3 },
  { id: 'ai-sales-rep', label: 'AI Sales Rep', icon: UserCheck, color: '#FF9500', route: '/ai-agent/sales/ai-sales-rep', count: 3 },
  { id: 'ai-sales-executive', label: 'AI Sales Executive', icon: Briefcase, color: '#007AFF', route: '/ai-agent/sales/ai-sales-executive', count: 3 },
  { id: 'ai-crm-assistant', label: 'AI CRM Assistant', icon: Database, color: '#5856D6', route: '/ai-agent/sales/ai-crm-assistant', count: 3 },
  { id: 'ai-proposal-generator', label: 'AI Proposal Generator', icon: FileText, color: '#8B5CF6', route: '/ai-agent/sales/ai-proposal-generator', count: 3 },
  { id: 'ai-negotiator', label: 'AI Negotiator', icon: Handshake, color: '#6366F1', route: '/ai-agent/sales/ai-negotiator', count: 3 },
  { id: 'ai-pricing-analyst', label: 'AI Pricing Analyst', icon: Tag, color: '#10B981', route: '/ai-agent/sales/ai-pricing-analyst', count: 3 },
  { id: 'ai-sales-forecasting', label: 'AI Sales Forecasting', icon: TrendingUp, color: '#F59E0B', route: '/ai-agent/sales/ai-sales-forecasting', count: 3 },
  { id: 'ai-sales-enablement', label: 'AI Sales Enablement', icon: Zap, color: '#7B1FA2', route: '/ai-agent/sales/ai-sales-enablement', count: 3 },
];

// New Feature Categories - Social CRM, Analytics, Performance, Collaboration, Team Management
const featureCategories: SidebarCategory[] = [
  { id: 'social-crm', label: 'Social CRM', icon: HeartHandshake, color: '#3B82F6', route: '/ai-agent/social-crm', count: 5 },
  { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3, color: '#8B5CF6', route: '/ai-agent/analytics', count: 4 },
  { id: 'performance', label: 'Performance & KPIs', icon: LineChart, color: '#10B981', route: '/ai-agent/performance', count: 3 },
  { id: 'collaboration', label: 'Team Collaboration', icon: LayoutGrid, color: '#F59E0B', route: '/ai-agent/collaboration', count: 4 },
  { id: 'team-management', label: 'Team Management', icon: Users, color: '#EC4899', route: '/ai-agent/team-management', count: 5 },
];

// HR VP & Specialist Hierarchy - Agents 90-96
const hrVPSpecialistHierarchy: SidebarCategory[] = [
  { id: 'vp-culture', label: 'AI VP Culture', icon: Heart, color: '#880E4F', route: '/ai-agent/hr/vp-culture', count: 3 },
  { id: 'vp-compensation', label: 'AI VP Compensation', icon: DollarSign, color: '#880E4F', route: '/ai-agent/hr/vp-compensation', count: 3 },
  { id: 'recruiting-manager', label: 'AI Recruiting Manager', icon: UserPlus, color: '#00897B', route: '/ai-agent/hr/recruiting-manager', count: 3 },
  { id: 'ai-recruiter', label: 'AI Recruiter', icon: UserPlus, color: '#007AFF', route: '/ai-agent/hr/ai-recruiter', count: 3 },
  { id: 'ai-hr-ops-specialist', label: 'AI HR Ops Specialist', icon: Settings, color: '#607D8B', route: '/ai-agent/hr/ai-hr-ops-specialist', count: 3 },
  { id: 'ai-learning-specialist', label: 'AI Learning Specialist', icon: BookOpen, color: '#1976D2', route: '/ai-agent/hr/ai-learning-specialist', count: 3 },
  { id: 'ai-compensation-analyst', label: 'AI Compensation Analyst', icon: Calculator, color: '#2E7D32', route: '/ai-agent/hr/ai-compensation-analyst', count: 3 },
];

// HR Sub-Agents - Agents 90-96 sub-agents
const hrSubAgentCategories: SidebarCategory[] = [
  { id: 'culture-survey-analyst', label: 'AI Culture Survey Analyst', icon: Users, color: '#9C27B0', route: '/ai-agent/hr/sub-agents/culture-survey-analyst', count: 1 },
  { id: 'engagement-booster', label: 'AI Engagement Booster', icon: Zap, color: '#FF9500', route: '/ai-agent/hr/sub-agents/engagement-booster', count: 1 },
  { id: 'values-alignment-checker', label: 'AI Values Alignment Checker', icon: CheckCircle, color: '#34C759', route: '/ai-agent/hr/sub-agents/values-alignment-checker', count: 1 },
  { id: 'market-compensation-researcher', label: 'AI Market Comp Researcher', icon: Search, color: '#007AFF', route: '/ai-agent/hr/sub-agents/market-compensation-researcher', count: 1 },
  { id: 'pay-equity-auditor', label: 'AI Pay Equity Auditor', icon: Scale, color: '#4E342E', route: '/ai-agent/hr/sub-agents/pay-equity-auditor', count: 1 },
  { id: 'incentive-plan-designer', label: 'AI Incentive Plan Designer', icon: Gift, color: '#AF52DE', route: '/ai-agent/hr/sub-agents/incentive-plan-designer', count: 1 },
  { id: 'requisition-prioritizer', label: 'AI Requisition Prioritizer', icon: ClipboardList, color: '#FF6B35', route: '/ai-agent/hr/sub-agents/requisition-prioritizer', count: 1 },
  { id: 'recruiter-performance-tracker', label: 'AI Recruiter Perf Tracker', icon: BarChart3, color: '#8B5CF6', route: '/ai-agent/hr/sub-agents/recruiter-performance-tracker', count: 1 },
  { id: 'hiring-budget-manager', label: 'AI Hiring Budget Manager', icon: Calculator, color: '#2E7D32', route: '/ai-agent/hr/sub-agents/hiring-budget-manager', count: 1 },
  { id: 'candidate-sourcer', label: 'AI Candidate Sourcer', icon: Search, color: '#06B6D4', route: '/ai-agent/hr/sub-agents/candidate-sourcer', count: 1 },
  { id: 'interview-scheduler', label: 'AI Interview Scheduler', icon: Calendar, color: '#FF9500', route: '/ai-agent/hr/sub-agents/interview-scheduler', count: 1 },
  { id: 'reference-checker', label: 'AI Reference Checker', icon: UserCheck, color: '#34C759', route: '/ai-agent/hr/sub-agents/reference-checker', count: 1 },
  { id: 'benefits-administrator', label: 'AI Benefits Administrator', icon: Shield, color: '#10B981', route: '/ai-agent/hr/sub-agents/benefits-administrator', count: 1 },
  { id: 'policy-update-communicator', label: 'AI Policy Update Comm', icon: Megaphone, color: '#FF2D55', route: '/ai-agent/hr/sub-agents/policy-update-communicator', count: 1 },
  { id: 'hr-ticket-resolver', label: 'AI HR Ticket Resolver', icon: Ticket, color: '#007AFF', route: '/ai-agent/hr/sub-agents/hr-ticket-resolver', count: 1 },
  { id: 'course-catalog-curator', label: 'AI Course Catalog Curator', icon: FolderTree, color: '#7B1FA2', route: '/ai-agent/hr/sub-agents/course-catalog-curator', count: 1 },
  { id: 'certification-tracker', label: 'AI Certification Tracker', icon: Award, color: '#F59E0B', route: '/ai-agent/hr/sub-agents/certification-tracker', count: 1 },
  { id: 'mentorship-matcher', label: 'AI Mentorship Matcher', icon: Handshake, color: '#EC4899', route: '/ai-agent/hr/sub-agents/mentorship-matcher', count: 1 },
  { id: 'salary-benchmarking-agent', label: 'AI Salary Benchmarking', icon: DollarSign, color: '#10B981', route: '/ai-agent/hr/sub-agents/salary-benchmarking-agent', count: 1 },
  { id: 'bonus-calculator', label: 'AI Bonus Calculator', icon: Percent, color: '#FF9500', route: '/ai-agent/hr/sub-agents/bonus-calculator', count: 1 },
  { id: 'equity-plan-administrator', label: 'AI Equity Plan Admin', icon: PieChart, color: '#8B5CF6', route: '/ai-agent/hr/sub-agents/equity-plan-administrator', count: 1 },
];

// Legal CLO & VP Hierarchy - Agents 97-100
const legalVPHierarchy: SidebarCategory[] = [
  { id: 'clo', label: 'AI Chief Legal Officer', icon: Scale, color: '#4E342E', route: '/ai-agent/legal/clo', count: 3 },
  { id: 'vp-legal', label: 'AI VP Legal', icon: FileText, color: '#1565C0', route: '/ai-agent/legal/vp-legal', count: 3 },
  { id: 'vp-compliance', label: 'AI VP Compliance', icon: ShieldCheck, color: '#0D47A1', route: '/ai-agent/legal/vp-compliance', count: 3 },
  { id: 'vp-contracts', label: 'AI VP Contracts', icon: FileText, color: '#33691E', route: '/ai-agent/legal/vp-contracts', count: 3 },
];

// Legal Sub-Agents - Agents 97-100 sub-agents
const legalSubAgentCategories: SidebarCategory[] = [
  { id: 'legal-strategy-advisor', label: 'AI Legal Strategy Advisor', icon: Briefcase, color: '#4E342E', route: '/ai-agent/legal/sub-agents/legal-strategy-advisor', count: 1 },
  { id: 'regulatory-change-monitor', label: 'AI Regulatory Change Monitor', icon: Eye, color: '#007AFF', route: '/ai-agent/legal/sub-agents/regulatory-change-monitor', count: 1 },
  { id: 'litigation-risk-assessor', label: 'AI Litigation Risk Assessor', icon: AlertTriangle, color: '#FF3B30', route: '/ai-agent/legal/sub-agents/litigation-risk-assessor', count: 1 },
  { id: 'case-portfolio-manager', label: 'AI Case Portfolio Manager', icon: FolderTree, color: '#1565C0', route: '/ai-agent/legal/sub-agents/case-portfolio-manager', count: 1 },
  { id: 'outside-counsel-coordinator', label: 'AI Outside Counsel Coord', icon: Users, color: '#00897B', route: '/ai-agent/legal/sub-agents/outside-counsel-coordinator', count: 1 },
  { id: 'legal-spend-analyst', label: 'AI Legal Spend Analyst', icon: Receipt, color: '#2E7D32', route: '/ai-agent/legal/sub-agents/legal-spend-analyst', count: 1 },
  { id: 'compliance-program-designer', label: 'AI Compliance Program Designer', icon: ClipboardList, color: '#0D47A1', route: '/ai-agent/legal/sub-agents/compliance-program-designer', count: 1 },
  { id: 'regulatory-scanner', label: 'AI Regulatory Scanner', icon: Search, color: '#FF6B35', route: '/ai-agent/legal/sub-agents/regulatory-scanner', count: 1 },
  { id: 'compliance-training-coordinator', label: 'AI Compliance Training Coord', icon: BookOpen, color: '#7B1FA2', route: '/ai-agent/legal/sub-agents/compliance-training-coordinator', count: 1 },
  { id: 'contract-lifecycle-manager', label: 'AI Contract Lifecycle Mgr', icon: RefreshCw, color: '#33691E', route: '/ai-agent/legal/sub-agents/contract-lifecycle-manager', count: 1 },
  { id: 'template-librarian', label: 'AI Template Librarian', icon: BookOpen, color: '#1565C0', route: '/ai-agent/legal/sub-agents/template-librarian', count: 1 },
  { id: 'obligation-tracker', label: 'AI Obligation Tracker', icon: SquareCheck, color: '#FF9500', route: '/ai-agent/legal/sub-agents/obligation-tracker', count: 1 },
];

// Legal & Governance VP Agents - Agents 101-106
const legalGovVPAgents: SidebarCategory[] = [
  { id: 'vp-ip', label: 'AI VP Intellectual Property', icon: Lightbulb, color: '#3E2723', route: '/ai-agent/legal/vp-ip', count: 3 },
  { id: 'vp-governance', label: 'AI VP Governance', icon: Gavel, color: '#5D4037', route: '/ai-agent/legal/vp-governance', count: 3 },
  { id: 'compliance-manager', label: 'AI Compliance Manager', icon: ShieldCheck, color: '#1B5E20', route: '/ai-agent/legal/compliance-manager', count: 3 },
  { id: 'legal-researcher', label: 'AI Legal Researcher', icon: Search, color: '#0D47A1', route: '/ai-agent/legal/legal-researcher', count: 3 },
  { id: 'contract-specialist', label: 'AI Contract Specialist', icon: FileText, color: '#4E342E', route: '/ai-agent/legal/contract-specialist', count: 3 },
  { id: 'compliance-analyst', label: 'AI Compliance Analyst', icon: ShieldAlert, color: '#E65100', route: '/ai-agent/legal/compliance-analyst', count: 3 },
];

// Administrative Division Hierarchy - Agents 151-159
const administrativeHierarchy: SidebarCategory[] = [
  // Executive Level (151)
  { id: 'chief-administrative-officer', label: 'AI Chief Administrative Officer', icon: Crown, color: '#5D4037', route: '/ai-agent/administrative/chief-administrative-officer', count: 3 },
  // VP Level (152-153)
  { id: 'vp-admin-operations', label: 'AI VP Admin Operations', icon: Settings, color: '#6D4C41', route: '/ai-agent/administrative/vp-admin-operations', count: 3 },
  { id: 'vp-facilities', label: 'AI VP Facilities', icon: Building2, color: '#795548', route: '/ai-agent/administrative/vp-facilities', count: 3 },
  // Manager Level (154)
  { id: 'admin-manager', label: 'AI Admin Manager', icon: Users, color: '#8D6E63', route: '/ai-agent/administrative/admin-manager', count: 3 },
  // Specialist Level (155-159)
  { id: 'ai-office-manager', label: 'AI Office Manager', icon: Briefcase, color: '#A1887F', route: '/ai-agent/administrative/ai-office-manager', count: 3 },
  { id: 'ai-executive-assistant', label: 'AI Executive Assistant', icon: Star, color: '#8D6E63', route: '/ai-agent/administrative/ai-executive-assistant', count: 3 },
  { id: 'ai-facilities-coordinator', label: 'AI Facilities Coordinator', icon: Shield, color: '#9E9E9E', route: '/ai-agent/administrative/ai-facilities-coordinator', count: 3 },
  { id: 'ai-travel-coordinator', label: 'AI Travel Coordinator', icon: TrendingUp, color: '#BDBDBD', route: '/ai-agent/administrative/ai-travel-coordinator', count: 3 },
  { id: 'ai-document-controller', label: 'AI Document Controller', icon: Clipboard, color: '#78909C', route: '/ai-agent/administrative/ai-document-controller', count: 3 },
];

// Data & AI Leadership Agents - Agents 107-109
const dataAILeadership: SidebarCategory[] = [
  { id: 'cdaio', label: 'AI Chief Data & AI Officer', icon: Brain, color: '#5E35B1', route: '/ai-agent/data/cdaio', count: 3 },
  { id: 'vp-data-science', label: 'AI VP Data Science', icon: FlaskConical, color: '#009688', route: '/ai-agent/data/vp-data-science', count: 3 },
  { id: 'vp-data-engineering', label: 'AI VP Data Engineering', icon: Database, color: '#1565C0', route: '/ai-agent/data/vp-data-engineering', count: 3 },
];

// IP Sub-Agents - Agent 101 sub-agents
const ipSubAgents: SidebarCategory[] = [
  { id: 'ip-portfolio-manager', label: 'AI IP Portfolio Manager', icon: Scale, color: '#3F51B5', route: '/ai-agent/legal/sub-agents/ip-portfolio-manager', count: 1 },
  { id: 'patent-filing-coordinator', label: 'AI Patent Filing Coordinator', icon: FileText, color: '#007AFF', route: '/ai-agent/legal/sub-agents/patent-filing-coordinator', count: 1 },
  { id: 'infringement-monitor', label: 'AI Infringement Monitor', icon: Eye, color: '#FF9500', route: '/ai-agent/legal/sub-agents/infringement-monitor', count: 1 },
];

// Governance Sub-Agents - Agent 102 sub-agents
const governanceSubAgents: SidebarCategory[] = [
  { id: 'board-meeting-coordinator', label: 'AI Board Meeting Coordinator', icon: Users, color: '#5D4037', route: '/ai-agent/legal/sub-agents/board-meeting-coordinator', count: 1 },
  { id: 'policy-framework-designer', label: 'AI Policy Framework Designer', icon: ClipboardList, color: '#1565C0', route: '/ai-agent/legal/sub-agents/policy-framework-designer', count: 1 },
  { id: 'governance-auditor', label: 'AI Governance Auditor', icon: ClipboardCheck, color: '#00897B', route: '/ai-agent/legal/sub-agents/governance-auditor', count: 1 },
];

// Compliance Manager Sub-Agents - Agent 103 sub-agents
const complianceMgrSubAgents: SidebarCategory[] = [
  { id: 'audit-scheduler', label: 'AI Audit Scheduler', icon: Calendar, color: '#1B5E20', route: '/ai-agent/legal/sub-agents/audit-scheduler', count: 1 },
  { id: 'compliance-finding-tracker', label: 'AI Compliance Finding Tracker', icon: Search, color: '#007AFF', route: '/ai-agent/legal/sub-agents/compliance-finding-tracker', count: 1 },
  { id: 'corrective-action-monitor', label: 'AI Corrective Action Monitor', icon: Activity, color: '#FF9500', route: '/ai-agent/legal/sub-agents/corrective-action-monitor', count: 1 },
];

// Legal Researcher Sub-Agents - Agent 104 sub-agents
const legalResearchSubAgents: SidebarCategory[] = [
  { id: 'precedent-finder', label: 'AI Precedent Finder', icon: Search, color: '#0D47A1', route: '/ai-agent/legal/sub-agents/precedent-finder', count: 1 },
  { id: 'statute-analyzer', label: 'AI Statute Analyzer', icon: BookOpen, color: '#7B1FA2', route: '/ai-agent/legal/sub-agents/statute-analyzer', count: 1 },
  { id: 'case-law-summarizer', label: 'AI Case Law Summarizer', icon: FileBarChart, color: '#FF9500', route: '/ai-agent/legal/sub-agents/case-law-summarizer', count: 1 },
];

// Contract Specialist Sub-Agents - Agent 105 sub-agents
const contractSubAgents: SidebarCategory[] = [
  { id: 'clause-librarian', label: 'AI Clause Librarian', icon: BookOpen, color: '#4E342E', route: '/ai-agent/legal/sub-agents/clause-librarian', count: 1 },
  { id: 'risk-spotter', label: 'AI Risk Spotter', icon: AlertTriangle, color: '#FF3B30', route: '/ai-agent/legal/sub-agents/risk-spotter', count: 1 },
  { id: 'amendment-drafter', label: 'AI Amendment Drafter', icon: PenTool, color: '#007AFF', route: '/ai-agent/legal/sub-agents/amendment-drafter', count: 1 },
];

// Compliance Analyst Sub-Agents - Agent 106 sub-agents
const complianceAnalystSubAgents: SidebarCategory[] = [
  { id: 'regulation-interpreter', label: 'AI Regulation Interpreter', icon: Scale, color: '#E65100', route: '/ai-agent/legal/sub-agents/regulation-interpreter', count: 1 },
  { id: 'gap-assessor', label: 'AI Gap Assessor', icon: Gauge, color: '#2E7D32', route: '/ai-agent/legal/sub-agents/gap-assessor', count: 1 },
  { id: 'evidence-collector', label: 'AI Evidence Collector', icon: ClipboardList, color: '#0D47A1', route: '/ai-agent/legal/sub-agents/evidence-collector', count: 1 },
];

// CDAIO Sub-Agents - Agent 107 sub-agents
const cdaioSubAgents: SidebarCategory[] = [
  { id: 'data-strategy-advisor', label: 'AI Data Strategy Advisor', icon: Database, color: '#6366F1', route: '/ai-agent/data/sub-agents/data-strategy-advisor', count: 1 },
  { id: 'ai-governance-enforcer', label: 'AI Governance Enforcer', icon: Shield, color: '#C62828', route: '/ai-agent/data/sub-agents/ai-governance-enforcer', count: 1 },
  { id: 'data-monetization-planner', label: 'AI Data Monetization Planner', icon: DollarSign, color: '#2E7D32', route: '/ai-agent/data/sub-agents/data-monetization-planner', count: 1 },
];

// VP Data Science Sub-Agents - Agent 108 sub-agents
const vpDataScienceSubAgents: SidebarCategory[] = [
  { id: 'research-direction-setter', label: 'AI Research Direction Setter', icon: FlaskConical, color: '#009688', route: '/ai-agent/data/sub-agents/research-direction-setter', count: 1 },
  { id: 'model-validation-overseer', label: 'AI Model Validation Overseer', icon: CheckCircle, color: '#34C759', route: '/ai-agent/data/sub-agents/model-validation-overseer', count: 1 },
  { id: 'publication-coordinator', label: 'AI Publication Coordinator', icon: BookOpen, color: '#1565C0', route: '/ai-agent/data/sub-agents/publication-coordinator', count: 1 },
];

// VP Data Engineering Sub-Agents - Agent 109 sub-agents
const vpDataEngSubAgents: SidebarCategory[] = [
  { id: 'pipeline-architect', label: 'AI Pipeline Architect', icon: GitBranch, color: '#1565C0', route: '/ai-agent/data/sub-agents/pipeline-architect', count: 1 },
  { id: 'data-platform-planner', label: 'AI Data Platform Planner', icon: Layers, color: '#00897B', route: '/ai-agent/data/sub-agents/data-platform-planner', count: 1 },
  { id: 'data-cost-optimizer', label: 'AI Data Cost Optimizer', icon: DollarSign, color: '#FF9500', route: '/ai-agent/data/sub-agents/data-cost-optimizer', count: 1 },
];

// Data & Intelligence VP/Manager/Agents - Agents 110-120
const dataIntelligenceAgents: SidebarCategory[] = [
  // VP Level (110-111)
  { id: 'vp-analytics', label: 'AI VP Analytics', icon: BarChart3, color: '#9C27B0', route: '/ai-agent/data/vp-analytics', count: 3 },
  { id: 'vp-business-intelligence', label: 'AI VP Business Intel', icon: PieChart, color: '#673AB7', route: '/ai-agent/data/vp-business-intelligence', count: 3 },
  // Manager Level (112-113)
  { id: 'data-manager', label: 'AI Data Manager', icon: Database, color: '#3F51B5', route: '/ai-agent/data/data-manager', count: 3 },
  { id: 'analytics-manager', label: 'AI Analytics Manager', icon: LineChart, color: '#2196F3', route: '/ai-agent/data/analytics-manager', count: 3 },
  // Specialist Level (114-120)
  { id: 'ai-data-scientist', label: 'AI Data Scientist', icon: FlaskConical, color: '#00BCD4', route: '/ai-agent/data/ai-data-scientist', count: 3 },
  { id: 'ai-data-analyst', label: 'AI Data Analyst', icon: BarChart, color: '#009688', route: '/ai-agent/data/ai-data-analyst', count: 3 },
  { id: 'ai-bi-developer', label: 'AI BI Developer', icon: LayoutGrid, color: '#4CAF50', route: '/ai-agent/data/ai-bi-developer', count: 3 },
  { id: 'ai-ml-engineer', label: 'AI ML Engineer', icon: Brain, color: '#8BC34A', route: '/ai-agent/data/ai-ml-engineer', count: 3 },
  { id: 'ai-data-steward', label: 'AI Data Steward', icon: Shield, color: '#009688', route: '/ai-agent/data/ai-data-steward', count: 3 },
  { id: 'ai-analytics-specialist', label: 'AI Analytics Specialist', icon: TrendingUp, color: '#F44336', route: '/ai-agent/data/ai-analytics-specialist', count: 3 },
  { id: 'vp-product', label: 'AI VP Product', icon: Box, color: '#FF5722', route: '/ai-agent/product/vp-product', count: 3 },
];

// VP Analytics Sub-Agents - Agent 110
const vpAnalyticsSubAgents: SidebarCategory[] = [
  { id: 'analytics-roadmap-planner', label: 'AI Analytics Roadmap Planner', icon: Map, color: '#9C27B0', route: '/ai-agent/data/sub-agents/analytics-roadmap-planner', count: 1 },
  { id: 'insight-delivery-manager', label: 'AI Insight Delivery Mgr', icon: Zap, color: '#9C27B0', route: '/ai-agent/data/sub-agents/insight-delivery-manager', count: 1 },
  { id: 'stakeholder-communicator', label: 'AI Stakeholder Communicator', icon: MessageSquare, color: '#9C27B0', route: '/ai-agent/data/sub-agents/stakeholder-communicator', count: 1 },
];

// VP Business Intelligence Sub-Agents - Agent 111
const vpBISubAgents: SidebarCategory[] = [
  { id: 'dashboard-architect', label: 'AI Dashboard Architect', icon: LayoutGrid, color: '#673AB7', route: '/ai-agent/data/sub-agents/dashboard-architect', count: 1 },
  { id: 'kpi-definition-specialist', label: 'AI KPI Definition Specialist', icon: Target, color: '#673AB7', route: '/ai-agent/data/sub-agents/kpi-definition-specialist', count: 1 },
  { id: 'report-scheduler', label: 'AI Report Scheduler', icon: Calendar, color: '#673AB7', route: '/ai-agent/data/sub-agents/report-scheduler', count: 1 },
];

// Data Manager Sub-Agents - Agent 112
const dataManagerSubAgents: SidebarCategory[] = [
  { id: 'data-catalog-curator', label: 'AI Data Catalog Curator', icon: FolderTree, color: '#3F51B5', route: '/ai-agent/data/sub-agents/data-catalog-curator', count: 1 },
  { id: 'metadata-enforcer', label: 'AI Metadata Enforcer', icon: Tag, color: '#3F51B5', route: '/ai-agent/data/sub-agents/metadata-enforcer', count: 1 },
  { id: 'data-lineage-tracker', label: 'AI Data Lineage Tracker', icon: GitBranch, color: '#3F51B5', route: '/ai-agent/data/sub-agents/data-lineage-tracker', count: 1 },
];

// Analytics Manager Sub-Agents - Agent 113
const analyticsManagerSubAgents: SidebarCategory[] = [
  { id: 'analytics-project-coordinator', label: 'AI Analytics Project Coord', icon: ClipboardList, color: '#2196F3', route: '/ai-agent/data/sub-agents/analytics-project-coordinator', count: 1 },
  { id: 'priority-planner', label: 'AI Priority Planner', icon: ListFilter, color: '#2196F3', route: '/ai-agent/data/sub-agents/priority-planner', count: 1 },
  { id: 'quality-reviewer', label: 'AI Quality Reviewer', icon: CheckCircle, color: '#2196F3', route: '/ai-agent/data/sub-agents/quality-reviewer', count: 1 },
];

// AI Data Scientist Sub-Agents - Agent 114
const dataScientistSubAgents: SidebarCategory[] = [
  { id: 'feature-engineer', label: 'AI Feature Engineer', icon: Wrench, color: '#00BCD4', route: '/ai-agent/data/sub-agents/feature-engineer', count: 1 },
  { id: 'experiment-designer', label: 'AI Experiment Designer', icon: FlaskConical, color: '#00BCD4', route: '/ai-agent/data/sub-agents/experiment-designer', count: 1 },
  { id: 'model-tuner', label: 'AI Model Tuner', icon: SlidersHorizontal, color: '#00BCD4', route: '/ai-agent/data/sub-agents/model-tuner', count: 1 },
];

// AI Data Analyst Sub-Agents - Agent 115
const dataAnalystSubAgents: SidebarCategory[] = [
  { id: 'query-builder', label: 'AI Query Builder', icon: Terminal, color: '#009688', route: '/ai-agent/data/sub-agents/query-builder', count: 1 },
  { id: 'visualization-creator', label: 'AI Visualization Creator', icon: Palette, color: '#009688', route: '/ai-agent/data/sub-agents/visualization-creator', count: 1 },
  { id: 'anomaly-detector', label: 'AI Anomaly Detector', icon: AlertTriangle, color: '#009688', route: '/ai-agent/data/sub-agents/anomaly-detector', count: 1 },
];

// AI BI Developer Sub-Agents - Agent 116
const biDeveloperSubAgents: SidebarCategory[] = [
  { id: 'report-builder', label: 'AI Report Builder', icon: FileBarChart, color: '#4CAF50', route: '/ai-agent/data/sub-agents/report-builder', count: 1 },
  { id: 'dashboard-tester', label: 'AI Dashboard Tester', icon: SquareCheck, color: '#4CAF50', route: '/ai-agent/data/sub-agents/dashboard-tester', count: 1 },
  { id: 'data-connector-builder', label: 'AI Data Connector Builder', icon: Link, color: '#4CAF50', route: '/ai-agent/data/sub-agents/data-connector-builder', count: 1 },
];

// AI ML Engineer Sub-Agents - Agent 117
const mlEngineerSubAgents: SidebarCategory[] = [
  { id: 'model-deployer', label: 'AI Model Deployer', icon: Rocket, color: '#8BC34A', route: '/ai-agent/data/sub-agents/model-deployer', count: 1 },
  { id: 'model-performance-monitor', label: 'AI Model Perf Monitor', icon: Activity, color: '#8BC34A', route: '/ai-agent/data/sub-agents/model-performance-monitor', count: 1 },
  { id: 'pipeline-automator', label: 'AI Pipeline Automator', icon: Zap, color: '#8BC34A', route: '/ai-agent/data/sub-agents/pipeline-automator', count: 1 },
];

// AI Data Steward Sub-Agents - Agent 118
const dataStewardSubAgents: SidebarCategory[] = [
  { id: 'data-quality-scorer', label: 'AI Data Quality Scorer', icon: Star, color: '#009688', route: '/ai-agent/data/sub-agents/data-quality-scorer', count: 1 },
  { id: 'standard-enforcer', label: 'AI Standard Enforcer', icon: CheckCircle, color: '#007AFF', route: '/ai-agent/data/sub-agents/standard-enforcer', count: 1 },
  { id: 'issue-resolver', label: 'AI Issue Resolver', icon: Wrench, color: '#FF9500', route: '/ai-agent/data/sub-agents/issue-resolver', count: 1 },
];

// AI Analytics Specialist Sub-Agents - Agent 119
const analyticsSpecialistSubAgents: SidebarCategory[] = [
  { id: 'advanced-statistician', label: 'AI Advanced Statistician', icon: Calculator, color: '#F44336', route: '/ai-agent/data/sub-agents/advanced-statistician', count: 1 },
  { id: 'segmentation-expert', label: 'AI Segmentation Expert', icon: Users, color: '#007AFF', route: '/ai-agent/data/sub-agents/segmentation-expert', count: 1 },
  { id: 'forecast-builder', label: 'AI Forecast Builder', icon: TrendingUp, color: '#FF9500', route: '/ai-agent/data/sub-agents/forecast-builder', count: 1 },
];

// AI VP Product Sub-Agents - Agent 120
const vpProductSubAgents: SidebarCategory[] = [
  { id: 'product-roadmap-planner', label: 'AI Product Roadmap Planner', icon: Map, color: '#FF6D00', route: '/ai-agent/product/sub-agents/product-roadmap-planner', count: 1 },
  { id: 'feature-prioritizer', label: 'AI Feature Prioritizer', icon: ListFilter, color: '#007AFF', route: '/ai-agent/product/sub-agents/feature-prioritizer', count: 1 },
  { id: 'market-alignment-checker', label: 'AI Market Alignment Checker', icon: Compass, color: '#FF9500', route: '/ai-agent/product/sub-agents/market-alignment-checker', count: 1 },
];

// Product VP & Manager Hierarchy - Agents 121-129
const productVPHierarchy: SidebarCategory[] = [
  { id: 'vp-product-strategy', label: 'AI VP Product Strategy', icon: Target, color: '#6A1B9A', route: '/ai-agent/product/vp-product-strategy', count: 3 },
  { id: 'vp-product-operations', label: 'AI VP Product Ops', icon: Settings, color: '#6A1B9A', route: '/ai-agent/product/vp-product-operations', count: 3 },
  { id: 'ai-product-manager', label: 'AI Product Manager', icon: LayoutIcon, color: '#6A1B9A', route: '/ai-agent/product/ai-product-manager', count: 3 },
  { id: 'ai-product-owner', label: 'AI Product Owner', icon: Briefcase, color: '#6A1B9A', route: '/ai-agent/product/ai-product-owner', count: 3 },
  { id: 'ai-product-manager-sub', label: 'AI Product Mgr (Sub)', icon: Layers, color: '#6A1B9A', route: '/ai-agent/product/ai-product-manager-sub', count: 3 },
  { id: 'ai-product-analyst', label: 'AI Product Analyst', icon: Search, color: '#6A1B9A', route: '/ai-agent/product/ai-product-analyst', count: 3 },
  { id: 'ai-ux-researcher', label: 'AI UX Researcher', icon: PenTool, color: '#6A1B9A', route: '/ai-agent/product/ai-ux-researcher', count: 3 },
  { id: 'ai-product-marketer', label: 'AI Product Marketer', icon: Megaphone, color: '#6A1B9A', route: '/ai-agent/product/ai-product-marketer', count: 3 },
  { id: 'ai-release-manager', label: 'AI Release Manager', icon: Rocket, color: '#6A1B9A', route: '/ai-agent/product/ai-release-manager', count: 3 },
];

// CISO Agent - Agent 130
const cisoAgent: SidebarCategory[] = [
  { id: 'ai-ciso', label: 'AI CISO', icon: Shield, color: '#581C84', route: '/ai-agent/security/ai-ciso', count: 3 },
];

// Product Sub-Agents - Agents 121-129
const productSubAgents121: SidebarCategory[] = [
  { id: 'competitive-analyst', label: 'AI Competitive Analyst', icon: Eye, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/competitive-analyst', count: 1 },
  { id: 'strategic-opportunity-scout', label: 'AI Strategic Opp Scout', icon: Compass, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/strategic-opportunity-scout', count: 1 },
  { id: 'vision-communicator', label: 'AI Vision Communicator', icon: MegaphoneIcon, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/vision-communicator', count: 1 },
  { id: 'process-standardizer', label: 'AI Process Standardizer', icon: ClipboardList, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/process-standardizer', count: 1 },
  { id: 'metric-tracker', label: 'AI Metric Tracker', icon: BarChart3, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/metric-tracker', count: 1 },
  { id: 'cross-functional-coordinator', label: 'AI Cross-func Coord', icon: Users, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/cross-functional-coordinator', count: 1 },
  { id: 'backlog-groomer', label: 'AI Backlog Groomer', icon: ClipboardList, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/backlog-groomer', count: 1 },
  { id: 'sprint-planner', label: 'AI Sprint Planner', icon: Calendar, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/sprint-planner', count: 1 },
  { id: 'stakeholder-communicator', label: 'AI Stakeholder Comm', icon: MessageSquare, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/stakeholder-communicator', count: 1 },
  { id: 'story-writer', label: 'AI Story Writer', icon: FileText, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/story-writer', count: 1 },
  { id: 'acceptance-criteria-definer', label: 'AI Acceptance Criteria', icon: CheckCircle, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/acceptance-criteria-definer', count: 1 },
  { id: 'sprint-reviewer', label: 'AI Sprint Reviewer', icon: Users, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/sprint-reviewer', count: 1 },
  { id: 'feature-spec-writer', label: 'AI Feature Spec Writer', icon: FileText, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/feature-spec-writer', count: 1 },
  { id: 'user-story-mapper', label: 'AI User Story Mapper', icon: GitBranch, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/user-story-mapper', count: 1 },
  { id: 'priority-adjuster', label: 'AI Priority Adjuster', icon: CircleArrowUp, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/priority-adjuster', count: 1 },
  { id: 'market-researcher', label: 'AI Market Researcher', icon: Search, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/market-researcher', count: 1 },
  { id: 'feature-usage-tracker', label: 'AI Feature Usage Tracker', icon: BarChart3, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/feature-usage-tracker', count: 1 },
  { id: 'feedback-aggregator', label: 'AI Feedback Aggregator', icon: MessageSquare, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/feedback-aggregator', count: 1 },
  { id: 'interview-scheduler', label: 'AI Interview Scheduler', icon: Calendar, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/interview-scheduler', count: 1 },
  { id: 'usability-test-designer', label: 'AI Usability Test Designer', icon: PenTool, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/usability-test-designer', count: 1 },
  { id: 'insight-synthesizer', label: 'AI Insight Synthesizer', icon: Lightbulb, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/insight-synthesizer', count: 1 },
  { id: 'launch-planner', label: 'AI Launch Planner', icon: Rocket, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/launch-planner', count: 1 },
  { id: 'messaging-crafter', label: 'AI Messaging Crafter', icon: PenTool, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/messaging-crafter', count: 1 },
  { id: 'competitive-differentiator', label: 'AI Competitive Diff', icon: Target, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/competitive-differentiator', count: 1 },
  { id: 'release-coordinator', label: 'AI Release Coordinator', icon: GitBranch, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/release-coordinator', count: 1 },
  { id: 'rollback-planner', label: 'AI Rollback Planner', icon: RotateCcw, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/rollback-planner', count: 1 },
  { id: 'change-communicator', label: 'AI Change Communicator', icon: MessageSquare, color: '#8B5CF6', route: '/ai-agent/product/sub-agents/change-communicator', count: 1 },
];

// CISO Sub-Agents - Agent 130
const cisoSubAgents: SidebarCategory[] = [
  { id: 'security-strategy-advisor', label: 'AI Security Strategy Adv', icon: Shield, color: '#581C84', route: '/ai-agent/security/sub-agents/security-strategy-advisor', count: 1 },
  { id: 'risk-appetite-definer', label: 'AI Risk Appetite Definer', icon: Gauge, color: '#581C84', route: '/ai-agent/security/sub-agents/risk-appetite-definer', count: 1 },
  { id: 'board-reporter', label: 'AI Board Reporter', icon: FileBarChart, color: '#581C84', route: '/ai-agent/security/sub-agents/board-reporter', count: 1 },
];

// Security VP & Agents (131-141) - 3 Line Sidebar Section
const securityVPHierarchy: SidebarCategory[] = [
  { id: 'vp-security-ops', label: 'AI VP Security Operations', icon: Shield, color: '#C62828', route: '/ai-agent/security/vp-security-ops', count: 3 },
  { id: 'vp-cybersecurity', label: 'AI VP Cybersecurity', icon: ShieldAlert, color: '#C62828', route: '/ai-agent/security/vp-cybersecurity', count: 3 },
  { id: 'vp-governance-risk', label: 'AI VP Governance & Risk', icon: Scale, color: '#C62828', route: '/ai-agent/security/vp-governance-risk', count: 3 },
  { id: 'vp-privacy', label: 'AI VP Privacy', icon: Eye, color: '#C62828', route: '/ai-agent/security/vp-privacy', count: 3 },
  { id: 'security-architect', label: 'AI Security Architect', icon: LayoutDashboard, color: '#C62828', route: '/ai-agent/security/security-architect', count: 3 },
  { id: 'soc-manager', label: 'AI SOC Manager', icon: Activity, color: '#C62828', route: '/ai-agent/security/soc-manager', count: 3 },
  { id: 'security-analyst', label: 'AI Security Analyst', icon: Search, color: '#C62828', route: '/ai-agent/security/security-analyst-1', count: 3 },
  { id: 'incident-responder', label: 'AI Incident Responder', icon: AlertTriangle, color: '#C62828', route: '/ai-agent/security/incident-responder-1', count: 3 },
  { id: 'compliance-security', label: 'AI Security Compliance', icon: ShieldCheck, color: '#C62828', route: '/ai-agent/security/compliance-security-1', count: 3 },
  { id: 'penetration-tester', label: 'AI Penetration Tester', icon: Target, color: '#C62828', route: '/ai-agent/security/penetration-tester-1', count: 3 },
  { id: 'identity-manager', label: 'AI Identity Manager', icon: Key, color: '#C62828', route: '/ai-agent/security/identity-manager-1', count: 3 },
];

// Security VP & Agents Sub-Agents (131-141)
const securityVPSubAgents: SidebarCategory[] = [
  // 131. VP Security Operations sub-agents
  { id: 'soc-workflow-optimizer', label: 'AI SOC Workflow Optimizer', icon: Zap, color: '#F44336', route: '/ai-agent/security/sub-agents/soc-workflow-optimizer', count: 1 },
  { id: 'alert-prioritizer', label: 'AI Alert Prioritizer', icon: AlertTriangle, color: '#F44336', route: '/ai-agent/security/sub-agents/alert-prioritizer', count: 1 },
  { id: 'incident-escalation-manager', label: 'AI Incident Escalation Mgr', icon: ArrowUp, color: '#F44336', route: '/ai-agent/security/sub-agents/incident-escalation-manager', count: 1 },
  // 132. VP Cybersecurity sub-agents
  { id: 'threat-landscape-monitor', label: 'AI Threat Landscape Monitor', icon: Globe, color: '#D32F2F', route: '/ai-agent/security/sub-agents/threat-landscape-monitor', count: 1 },
  { id: 'cyber-risk-quantifier', label: 'AI Cyber Risk Quantifier', icon: BarChart, color: '#D32F2F', route: '/ai-agent/security/sub-agents/cyber-risk-quantifier', count: 1 },
  { id: 'security-architecture-reviewer', label: 'AI Security Arch Reviewer', icon: LayoutDashboard, color: '#D32F2F', route: '/ai-agent/security/sub-agents/security-architecture-reviewer', count: 1 },
  // 133. VP Governance & Risk sub-agents
  { id: 'risk-register-manager', label: 'AI Risk Register Manager', icon: ClipboardList, color: '#B71C1C', route: '/ai-agent/security/sub-agents/risk-register-manager', count: 1 },
  { id: 'policy-drafter', label: 'AI Policy Drafter', icon: FileText, color: '#B71C1C', route: '/ai-agent/security/sub-agents/policy-drafter', count: 1 },
  { id: 'risk-appetite-monitor', label: 'AI Risk Appetite Monitor', icon: Gauge, color: '#B71C1C', route: '/ai-agent/security/sub-agents/risk-appetite-monitor', count: 1 },
  // 134. VP Privacy sub-agents
  { id: 'privacy-impact-assessor', label: 'AI Privacy Impact Assessor', icon: Eye, color: '#AD1457', route: '/ai-agent/security/sub-agents/privacy-impact-assessor', count: 1 },
  { id: 'data-classification-enforcer', label: 'AI Data Classification Enforcer', icon: Database, color: '#AD1457', route: '/ai-agent/security/sub-agents/data-classification-enforcer', count: 1 },
  { id: 'consent-manager', label: 'AI Consent Manager', icon: CheckCircle, color: '#AD1457', route: '/ai-agent/security/sub-agents/consent-manager', count: 1 },
  // 135. Security Architect sub-agents
  { id: 'security-design-reviewer', label: 'AI Security Design Reviewer', icon: LayoutDashboard, color: '#C2185B', route: '/ai-agent/security/sub-agents/security-design-reviewer', count: 1 },
  { id: 'threat-modeler', label: 'AI Threat Modeler', icon: Target, color: '#C2185B', route: '/ai-agent/security/sub-agents/threat-modeler', count: 1 },
  { id: 'control-mapper', label: 'AI Control Mapper', icon: MapPin, color: '#C2185B', route: '/ai-agent/security/sub-agents/control-mapper', count: 1 },
  // 136. SOC Manager sub-agents
  { id: 'shift-coordinator', label: 'AI Shift Coordinator', icon: CalendarClock, color: '#D81B60', route: '/ai-agent/security/sub-agents/shift-coordinator', count: 1 },
  { id: 'playbook-author', label: 'AI Playbook Author', icon: BookOpen, color: '#D81B60', route: '/ai-agent/security/sub-agents/playbook-author', count: 1 },
  { id: 'escalation-path-definer', label: 'AI Escalation Path Definer', icon: ArrowUpRight, color: '#D81B60', route: '/ai-agent/security/sub-agents/escalation-path-definer', count: 1 },
  // 137. Security Analyst sub-agents
  { id: 'log-reviewer', label: 'AI Log Reviewer', icon: FileText, color: '#E91E63', route: '/ai-agent/security/sub-agents/log-reviewer', count: 1 },
  { id: 'alert-triage-agent', label: 'AI Alert Triage Agent', icon: AlertTriangle, color: '#E91E63', route: '/ai-agent/security/sub-agents/alert-triage-agent', count: 1 },
  { id: 'ioc-collector', label: 'AI IoC Collector', icon: Database, color: '#E91E63', route: '/ai-agent/security/sub-agents/ioc-collector', count: 1 },
  // 138. Incident Responder sub-agents
  { id: 'containment-coordinator', label: 'AI Containment Coordinator', icon: Shield, color: '#EC407A', route: '/ai-agent/security/sub-agents/containment-coordinator', count: 1 },
  { id: 'evidence-collector', label: 'AI Evidence Collector', icon: ClipboardList, color: '#EC407A', route: '/ai-agent/security/sub-agents/evidence-collector', count: 1 },
  { id: 'timeline-reconstructor', label: 'AI Timeline Reconstructor', icon: Clock, color: '#EC407A', route: '/ai-agent/security/sub-agents/timeline-reconstructor', count: 1 },
  // 139. Security Compliance Specialist sub-agents
  { id: 'framework-mapper', label: 'AI Framework Mapper', icon: LayoutGrid, color: '#F06292', route: '/ai-agent/security/sub-agents/framework-mapper', count: 1 },
  { id: 'evidence-gatherer', label: 'AI Evidence Gatherer', icon: Search, color: '#F06292', route: '/ai-agent/security/sub-agents/evidence-gatherer', count: 1 },
  { id: 'audit-liaison', label: 'AI Audit Liaison', icon: Users, color: '#F06292', route: '/ai-agent/security/sub-agents/audit-liaison', count: 1 },
  // 140. Penetration Tester sub-agents
  { id: 'exploit-researcher', label: 'AI Exploit Researcher', icon: Zap, color: '#F48FB1', route: '/ai-agent/security/sub-agents/exploit-researcher', count: 1 },
  { id: 'vulnerability-reporter', label: 'AI Vulnerability Reporter', icon: FileWarning, color: '#F48FB1', route: '/ai-agent/security/sub-agents/vulnerability-reporter', count: 1 },
  { id: 'remediation-advisor', label: 'AI Remediation Advisor', icon: Wrench, color: '#F48FB1', route: '/ai-agent/security/sub-agents/remediation-advisor', count: 1 },
  // 141. Identity Manager sub-agents
  { id: 'access-reviewer', label: 'AI Access Reviewer', icon: Eye, color: '#F8BBD9', route: '/ai-agent/security/sub-agents/access-reviewer', count: 1 },
  { id: 'role-modeler', label: 'AI Role Modeler', icon: Users, color: '#F8BBD9', route: '/ai-agent/security/sub-agents/role-modeler', count: 1 },
  { id: 'privilege-escalation-monitor', label: 'AI Privilege Escalation Monitor', icon: ArrowUp, color: '#F8BBD9', route: '/ai-agent/security/sub-agents/privilege-escalation-monitor', count: 1 },
];

// AI Management & Governance Hierarchy - Agents 272-277
const aiMgmtHierarchy: SidebarCategory[] = [
  // C-Level (272)
  { id: 'cao-automation', label: 'AI Chief Automation Officer', icon: Briefcase, color: '#8B5CF6', route: '/ai-agent/ai-mgmt/cao-automation', count: 3 },
  // VP Level (273-274)
  { id: 'vp-automation', label: 'AI VP Automation', icon: Zap, color: '#7B1FA2', route: '/ai-agent/ai-mgmt/vp-automation', count: 3 },
  { id: 'vp-process-excellence', label: 'AI VP Process Excellence', icon: Target, color: '#6366F1', route: '/ai-agent/ai-mgmt/vp-process-excellence', count: 3 },
  // Director Level (275)
  { id: 'ai-automation-ops-director', label: 'AI Automation Ops Director', icon: Settings, color: '#EC4899', route: '/ai-agent/ai-mgmt/ai-automation-ops-director', count: 3 },
  // Manager Level (276-277)
  { id: 'ai-rpa-manager', label: 'AI RPA Manager', icon: Bot, color: '#14B8A6', route: '/ai-agent/ai-mgmt/ai-rpa-manager', count: 3 },
  { id: 'ai-workflow-specialist', label: 'AI Workflow Specialist', icon: Zap, color: '#F59E0B', route: '/ai-agent/ai-mgmt/ai-workflow-specialist', count: 3 },
];

// 272. CAO Sub-Agents
const caoSubAgents: SidebarCategory[] = [
  { id: 'automation-strategy-advisor', label: 'AI Automation Strategy Advisor', icon: Briefcase, color: '#8B5CF6', route: '/ai-agent/ai-mgmt/sub-agents/automation-strategy-advisor', count: 1 },
  { id: 'roi-calculator', label: 'AI ROI Calculator', icon: Calculator, color: '#8B5CF6', route: '/ai-agent/ai-mgmt/sub-agents/roi-calculator', count: 1 },
  { id: 'technology-evaluator', label: 'AI Technology Evaluator', icon: Zap, color: '#8B5CF6', route: '/ai-agent/ai-mgmt/sub-agents/technology-evaluator', count: 1 },
];

// 273. VP Automation Sub-Agents
const vpAutomationSubAgents: SidebarCategory[] = [
  { id: 'automation-pipeline-manager', label: 'AI Automation Pipeline Manager', icon: GitBranch, color: '#7B1FA2', route: '/ai-agent/ai-mgmt/sub-agents/automation-pipeline-manager', count: 1 },
  { id: 'tool-selector', label: 'AI Tool Selector', icon: Puzzle, color: '#7B1FA2', route: '/ai-agent/ai-mgmt/sub-agents/tool-selector', count: 1 },
  { id: 'implementation-planner', label: 'AI Implementation Planner', icon: Calendar, color: '#7B1FA2', route: '/ai-agent/ai-mgmt/sub-agents/implementation-planner', count: 1 },
];

// 274. VP Process Excellence Sub-Agents
const vpProcessSubAgents: SidebarCategory[] = [
  { id: 'process-miner', label: 'AI Process Miner', icon: Search, color: '#6366F1', route: '/ai-agent/ai-mgmt/sub-agents/process-miner', count: 1 },
  { id: 'maturity-assessor', label: 'AI Maturity Assessor', icon: Gauge, color: '#6366F1', route: '/ai-agent/ai-mgmt/sub-agents/maturity-assessor', count: 1 },
  { id: 'benchmark-analyzer', label: 'AI Benchmark Analyzer', icon: BarChart3, color: '#6366F1', route: '/ai-agent/ai-mgmt/sub-agents/benchmark-analyzer', count: 1 },
];

// 275. Automation Ops Director Sub-Agents
const automationOpsSubAgents: SidebarCategory[] = [
  { id: 'automation-runbook-author', label: 'AI Automation Runbook Author', icon: FileText, color: '#EC4899', route: '/ai-agent/ai-mgmt/sub-agents/automation-runbook-author', count: 1 },
  { id: 'exception-handler', label: 'AI Exception Handler', icon: AlertTriangle, color: '#EC4899', route: '/ai-agent/ai-mgmt/sub-agents/exception-handler', count: 1 },
  { id: 'performance-monitor', label: 'AI Performance Monitor', icon: Activity, color: '#EC4899', route: '/ai-agent/ai-mgmt/sub-agents/performance-monitor', count: 1 },
];

// 276. RPA Manager Sub-Agents
const rpaManagerSubAgents: SidebarCategory[] = [
  { id: 'bot-deployer', label: 'AI Bot Deployer', icon: Rocket, color: '#14B8A6', route: '/ai-agent/ai-mgmt/sub-agents/bot-deployer', count: 1 },
  { id: 'license-manager', label: 'AI License Manager', icon: Key, color: '#14B8A6', route: '/ai-agent/ai-mgmt/sub-agents/license-manager', count: 1 },
  { id: 'bot-health-monitor', label: 'AI Bot Health Monitor', icon: Heart, color: '#14B8A6', route: '/ai-agent/ai-mgmt/sub-agents/bot-health-monitor', count: 1 },
];

// 277. Workflow Specialist Sub-Agents
const workflowSpecialistSubAgents: SidebarCategory[] = [
  { id: 'workflow-designer', label: 'AI Workflow Designer', icon: LayoutGrid, color: '#F59E0B', route: '/ai-agent/ai-mgmt/sub-agents/workflow-designer', count: 1 },
  { id: 'integration-builder', label: 'AI Integration Builder', icon: Link, color: '#F59E0B', route: '/ai-agent/ai-mgmt/sub-agents/integration-builder', count: 1 },
  { id: 'trigger-configurator', label: 'AI Trigger Configurator', icon: Zap, color: '#F59E0B', route: '/ai-agent/ai-mgmt/sub-agents/trigger-configurator', count: 1 },
];

// Trading & Investments Hierarchy - Agents 160-177
const tradingHierarchy: SidebarCategory[] = [
  // C-Suite (160)
  { id: 'chief-investment-officer', label: 'AI Chief Investment Officer', icon: Briefcase, color: '#0277BD', route: '/ai-agent/trading/chief-investment-officer', count: 3 },
  // VP Level (161-162)
  { id: 'vp-trading', label: 'AI VP Trading', icon: TrendingUp, color: '#1565C0', route: '/ai-agent/trading/vp-trading', count: 3 },
  { id: 'vp-investments', label: 'AI VP Investments', icon: Briefcase, color: '#1565C0', route: '/ai-agent/trading/vp-investments', count: 3 },
  // Manager Level (163-165)
  { id: 'trading-desk-manager', label: 'AI Trading Desk Manager', icon: Monitor, color: '#0288D1', route: '/ai-agent/trading/trading-desk-manager', count: 3 },
  { id: 'portfolio-manager', label: 'AI Portfolio Manager', icon: PieChart, color: '#388E3C', route: '/ai-agent/trading/portfolio-manager', count: 3 },
  { id: 'trading-risk-manager', label: 'AI Trading Risk Manager', icon: ShieldAlert, color: '#C62828', route: '/ai-agent/trading/trading-risk-manager', count: 3 },
  // Specialist Level (166-169)
  { id: 'equity-trader', label: 'AI Equity Trader', icon: TrendingUp, color: '#7B1FA2', route: '/ai-agent/trading/equity-trader', count: 3 },
  { id: 'forex-trader', label: 'AI Forex Trader', icon: Globe, color: '#00897B', route: '/ai-agent/trading/forex-trader', count: 3 },
  { id: 'crypto-trader', label: 'AI Crypto Trader', icon: TrendingUp, color: '#F59E0B', route: '/ai-agent/trading/crypto-trader', count: 3 },
  { id: 'derivatives-specialist', label: 'AI Derivatives Specialist', icon: Calculator, color: '#E65100', route: '/ai-agent/trading/derivatives-specialist', count: 3 },
  // Analyst Level (170-172)
  { id: 'portfolio-analyst', label: 'AI Portfolio Analyst', icon: BarChart3, color: '#5C6BC0', route: '/ai-agent/trading/portfolio-analyst', count: 3 },
  { id: 'risk-analyst-trading', label: 'AI Trading Risk Analyst', icon: AlertTriangle, color: '#D32F2F', route: '/ai-agent/trading/risk-analyst-trading', count: 3 },
  { id: 'compliance-trading', label: 'AI Trading Compliance', icon: ShieldCheck, color: '#455A64', route: '/ai-agent/trading/compliance-trading', count: 3 },
  // Quant/Research Level (173-175)
  { id: 'quant-analyst', label: 'AI Quantitative Analyst', icon: Microscope, color: '#6A1B9A', route: '/ai-agent/trading/quant-analyst', count: 3 },
  { id: 'esg-analyst', label: 'AI ESG Analyst', icon: Leaf, color: '#2E7D32', route: '/ai-agent/trading/esg-analyst', count: 3 },
  { id: 'macro-analyst', label: 'AI Macro Analyst', icon: Globe, color: '#00838F', route: '/ai-agent/trading/macro-analyst', count: 3 },
  // Developer/Specialist Level (176-177)
  { id: 'algo-trading-dev', label: 'AI Algo Trading Developer', icon: Code, color: '#4527A0', route: '/ai-agent/trading/algo-trading-dev', count: 3 },
  { id: 'settlement-specialist', label: 'AI Settlement Specialist', icon: ClipboardCheck, color: '#78909C', route: '/ai-agent/trading/settlement-specialist', count: 3 },
];

// 160. CIO Sub-Agents
const cioSubAgents: SidebarCategory[] = [
  { id: 'investment-strategy-advisor', label: 'AI Investment Strategy Advisor', icon: TrendingUp, color: '#0277BD', route: '/ai-agent/trading/sub-agents/investment-strategy-advisor', count: 1 },
  { id: 'portfolio-allocation-director', label: 'AI Portfolio Allocation Director', icon: PieChart, color: '#0277BD', route: '/ai-agent/trading/sub-agents/portfolio-allocation-director', count: 1 },
  { id: 'market-outlook-analyst', label: 'AI Market Outlook Analyst', icon: BarChart3, color: '#0277BD', route: '/ai-agent/trading/sub-agents/market-outlook-analyst', count: 1 },
];

// 161. VP Trading Sub-Agents
const vpTradingSubAgents: SidebarCategory[] = [
  { id: 'trading-strategy-validator', label: 'AI Trading Strategy Validator', icon: Target, color: '#1565C0', route: '/ai-agent/trading/sub-agents/trading-strategy-validator', count: 1 },
  { id: 'desk-performance-monitor', label: 'AI Desk Performance Monitor', icon: Activity, color: '#1565C0', route: '/ai-agent/trading/sub-agents/desk-performance-monitor', count: 1 },
  { id: 'risk-limit-enforcer', label: 'AI Risk Limit Enforcer', icon: Shield, color: '#1565C0', route: '/ai-agent/trading/sub-agents/risk-limit-enforcer', count: 1 },
];

// 162. VP Investments Sub-Agents
const vpInvestmentsSubAgents: SidebarCategory[] = [
  { id: 'investment-committee-coordinator', label: 'AI Investment Committee Coord', icon: Users, color: '#1565C0', route: '/ai-agent/trading/sub-agents/investment-committee-coordinator', count: 1 },
  { id: 'deal-flow-manager', label: 'AI Deal Flow Manager', icon: TrendingUp, color: '#1565C0', route: '/ai-agent/trading/sub-agents/deal-flow-manager', count: 1 },
  { id: 'diligence-overseer', label: 'AI Diligence Overseer', icon: Search, color: '#1565C0', route: '/ai-agent/trading/sub-agents/diligence-overseer', count: 1 },
];

// 163. Trading Desk Manager Sub-Agents
const tradingDeskMgrSubAgents: SidebarCategory[] = [
  { id: 'order-flow-optimizer', label: 'AI Order Flow Optimizer', icon: Zap, color: '#0288D1', route: '/ai-agent/trading/sub-agents/order-flow-optimizer', count: 1 },
  { id: 'trader-performance-evaluator', label: 'AI Trader Performance Evaluator', icon: BarChart3, color: '#0288D1', route: '/ai-agent/trading/sub-agents/trader-performance-evaluator', count: 1 },
  { id: 'market-openclosing-coordinator', label: 'AI Market Open/Close Coord', icon: Clock, color: '#0288D1', route: '/ai-agent/trading/sub-agents/market-openclosing-coordinator', count: 1 },
];

// 164. Portfolio Manager Sub-Agents
const portfolioMgrSubAgents: SidebarCategory[] = [
  { id: 'asset-allocator', label: 'AI Asset Allocator', icon: PieChart, color: '#388E3C', route: '/ai-agent/trading/sub-agents/asset-allocator', count: 1 },
  { id: 'rebalancing-scheduler', label: 'AI Rebalancing Scheduler', icon: Calendar, color: '#388E3C', route: '/ai-agent/trading/sub-agents/rebalancing-scheduler', count: 1 },
  { id: 'performance-attribution-analyst', label: 'AI Performance Attribution', icon: BarChart3, color: '#388E3C', route: '/ai-agent/trading/sub-agents/performance-attribution-analyst', count: 1 },
];

// 165. Trading Risk Manager Sub-Agents
const tradingRiskMgrSubAgents: SidebarCategory[] = [
  { id: 'var-calculator', label: 'AI VaR Calculator', icon: Calculator, color: '#C62828', route: '/ai-agent/trading/sub-agents/var-calculator', count: 1 },
  { id: 'stress-test-designer', label: 'AI Stress Test Designer', icon: AlertTriangle, color: '#C62828', route: '/ai-agent/trading/sub-agents/stress-test-designer', count: 1 },
  { id: 'limit-breach-alerter', label: 'AI Limit Breach Alerter', icon: Zap, color: '#C62828', route: '/ai-agent/trading/sub-agents/limit-breach-alerter', count: 1 },
];

// 166. Equity Trader Sub-Agents
const equityTraderSubAgents: SidebarCategory[] = [
  { id: 'order-executor', label: 'AI Order Executor', icon: Zap, color: '#7B1FA2', route: '/ai-agent/trading/sub-agents/order-executor', count: 1 },
  { id: 'market-depth-analyzer', label: 'AI Market Depth Analyzer', icon: Search, color: '#7B1FA2', route: '/ai-agent/trading/sub-agents/market-depth-analyzer', count: 1 },
  { id: 'execution-quality-reporter', label: 'AI Execution Quality Reporter', icon: FileText, color: '#7B1FA2', route: '/ai-agent/trading/sub-agents/execution-quality-reporter', count: 1 },
];

// 167. Forex Trader Sub-Agents
const forexTraderSubAgents: SidebarCategory[] = [
  { id: 'currency-pair-analyzer', label: 'AI Currency Pair Analyzer', icon: Globe, color: '#00897B', route: '/ai-agent/trading/sub-agents/currency-pair-analyzer', count: 1 },
  { id: 'fx-hedging-coordinator', label: 'AI FX Hedging Coordinator', icon: Shield, color: '#00897B', route: '/ai-agent/trading/sub-agents/fx-hedging-coordinator', count: 1 },
  { id: 'cross-border-payment-optimizer', label: 'AI Cross-border Payment Opt', icon: DollarSign, color: '#00897B', route: '/ai-agent/trading/sub-agents/cross-border-payment-optimizer', count: 1 },
];

// 168. Crypto Trader Sub-Agents
const cryptoTraderSubAgents: SidebarCategory[] = [
  { id: 'on-chain-analyzer', label: 'AI On-chain Analyzer', icon: Eye, color: '#F59E0B', route: '/ai-agent/trading/sub-agents/on-chain-analyzer', count: 1 },
  { id: 'liquidity-pool-monitor', label: 'AI Liquidity Pool Monitor', icon: Activity, color: '#F59E0B', route: '/ai-agent/trading/sub-agents/liquidity-pool-monitor', count: 1 },
  { id: 'wallet-security-checker', label: 'AI Wallet Security Checker', icon: ShieldCheck, color: '#F59E0B', route: '/ai-agent/trading/sub-agents/wallet-security-checker', count: 1 },
];

// 169. Derivatives Specialist Sub-Agents
const derivativesSubAgents: SidebarCategory[] = [
  { id: 'options-pricer', label: 'AI Options Pricer', icon: Calculator, color: '#E65100', route: '/ai-agent/trading/sub-agents/options-pricer', count: 1 },
  { id: 'greeks-calculator', label: 'AI Greeks Calculator', icon: BarChart3, color: '#E65100', route: '/ai-agent/trading/sub-agents/greeks-calculator', count: 1 },
  { id: 'volatility-surface-mapper', label: 'AI Volatility Surface Mapper', icon: TrendingUp, color: '#E65100', route: '/ai-agent/trading/sub-agents/volatility-surface-mapper', count: 1 },
];

// 170. Portfolio Analyst Sub-Agents
const portfolioAnalystSubAgents: SidebarCategory[] = [
  { id: 'sector-analyzer', label: 'AI Sector Analyzer', icon: Search, color: '#5C6BC0', route: '/ai-agent/trading/sub-agents/sector-analyzer', count: 1 },
  { id: 'factor-modeler', label: 'AI Factor Modeler', icon: BarChart3, color: '#5C6BC0', route: '/ai-agent/trading/sub-agents/factor-modeler', count: 1 },
  { id: 'benchmark-comparator', label: 'AI Benchmark Comparator', icon: Scale, color: '#5C6BC0', route: '/ai-agent/trading/sub-agents/benchmark-comparator', count: 1 },
];

// 171. Trading Risk Analyst Sub-Agents
const tradingRiskAnalystSubAgents: SidebarCategory[] = [
  { id: 'scenario-modeler', label: 'AI Scenario Modeler', icon: Layers, color: '#D32F2F', route: '/ai-agent/trading/sub-agents/scenario-modeler', count: 1 },
  { id: 'correlation-tracker', label: 'AI Correlation Tracker', icon: Activity, color: '#D32F2F', route: '/ai-agent/trading/sub-agents/correlation-tracker', count: 1 },
  { id: 'tail-risk-assessor', label: 'AI Tail Risk Assessor', icon: AlertTriangle, color: '#D32F2F', route: '/ai-agent/trading/sub-agents/tail-risk-assessor', count: 1 },
];

// 172. Trading Compliance Sub-Agents
const tradingComplianceSubAgents: SidebarCategory[] = [
  { id: 'trade-surveillance-agent', label: 'AI Trade Surveillance Agent', icon: Eye, color: '#455A64', route: '/ai-agent/trading/sub-agents/trade-surveillance-agent', count: 1 },
  { id: 'regulatory-reporter', label: 'AI Regulatory Reporter', icon: FileText, color: '#455A64', route: '/ai-agent/trading/sub-agents/regulatory-reporter', count: 1 },
  { id: 'restricted-list-monitor', label: 'AI Restricted List Monitor', icon: Shield, color: '#455A64', route: '/ai-agent/trading/sub-agents/restricted-list-monitor', count: 1 },
];

// 173. Quant Analyst Sub-Agents
const quantAnalystSubAgents: SidebarCategory[] = [
  { id: 'alpha-researcher', label: 'AI Alpha Researcher', icon: Search, color: '#6A1B9A', route: '/ai-agent/trading/sub-agents/alpha-researcher', count: 1 },
  { id: 'backtest-engine', label: 'AI Backtest Engine', icon: History, color: '#6A1B9A', route: '/ai-agent/trading/sub-agents/backtest-engine', count: 1 },
  { id: 'signal-generator', label: 'AI Signal Generator', icon: Zap, color: '#6A1B9A', route: '/ai-agent/trading/sub-agents/signal-generator', count: 1 },
];

// 174. ESG Analyst Sub-Agents
const esgAnalystSubAgents: SidebarCategory[] = [
  { id: 'esg-data-collector', label: 'AI ESG Data Collector', icon: Database, color: '#2E7D32', route: '/ai-agent/trading/sub-agents/esg-data-collector', count: 1 },
  { id: 'sustainability-scorer', label: 'AI Sustainability Scorer', icon: Star, color: '#2E7D32', route: '/ai-agent/trading/sub-agents/sustainability-scorer', count: 1 },
  { id: 'impact-reporter', label: 'AI Impact Reporter', icon: FileText, color: '#2E7D32', route: '/ai-agent/trading/sub-agents/impact-reporter', count: 1 },
];

// 175. Macro Analyst Sub-Agents
const macroAnalystSubAgents: SidebarCategory[] = [
  { id: 'economic-indicator-tracker', label: 'AI Economic Indicator Tracker', icon: BarChart3, color: '#00838F', route: '/ai-agent/trading/sub-agents/economic-indicator-tracker', count: 1 },
  { id: 'central-bank-watcher', label: 'AI Central Bank Watcher', icon: Landmark, color: '#00838F', route: '/ai-agent/trading/sub-agents/central-bank-watcher', count: 1 },
  { id: 'geopolitical-risk-assessor', label: 'AI Geopolitical Risk Assessor', icon: Globe, color: '#00838F', route: '/ai-agent/trading/sub-agents/geopolitical-risk-assessor', count: 1 },
];

// 176. Algo Trading Developer Sub-Agents
const algoDevSubAgents: SidebarCategory[] = [
  { id: 'strategy-coder', label: 'AI Strategy Coder', icon: Code, color: '#4527A0', route: '/ai-agent/trading/sub-agents/strategy-coder', count: 1 },
  { id: 'latency-optimizer', label: 'AI Latency Optimizer', icon: Zap, color: '#4527A0', route: '/ai-agent/trading/sub-agents/latency-optimizer', count: 1 },
  { id: 'execution-algorithm-tester', label: 'AI Execution Algorithm Tester', icon: TestTube, color: '#4527A0', route: '/ai-agent/trading/sub-agents/execution-algorithm-tester', count: 1 },
];

// 177. Settlement Specialist Sub-Agents
const settlementSubAgents: SidebarCategory[] = [
  { id: 'trade-reconciler', label: 'AI Trade Reconciler', icon: ClipboardCheck, color: '#78909C', route: '/ai-agent/trading/sub-agents/trade-reconciler', count: 1 },
  { id: 'clearing-coordinator', label: 'AI Clearing Coordinator', icon: ArrowRightLeft, color: '#78909C', route: '/ai-agent/trading/sub-agents/clearing-coordinator', count: 1 },
  { id: 'fail-manager', label: 'AI Fail Manager', icon: AlertTriangle, color: '#78909C', route: '/ai-agent/trading/sub-agents/fail-manager', count: 1 },
];

// Real Estate & Property Hierarchy - Agents 178-191
const realestateHierarchy: SidebarCategory[] = [
  // C-Suite (178)
  { id: 'creo', label: 'AI Chief Real Estate Officer', icon: Briefcase, color: '#33691E', route: '/ai-agent/realestate/creo', count: 3 },
  // VP Level (179-180)
  { id: 'vp-property-management', label: 'AI VP Property Management', icon: Building, color: '#33691E', route: '/ai-agent/realestate/vp-property-management', count: 3 },
  { id: 'vp-real-estate-development', label: 'AI VP Real Estate Development', icon: Building2, color: '#33691E', route: '/ai-agent/realestate/vp-real-estate-development', count: 3 },
  // Manager Level (181-183)
  { id: 'property-manager', label: 'AI Property Manager', icon: Settings, color: '#33691E', route: '/ai-agent/realestate/property-manager', count: 3 },
  { id: 'leasing-manager', label: 'AI Leasing Manager', icon: Users, color: '#33691E', route: '/ai-agent/realestate/leasing-manager', count: 3 },
  { id: 'facilities-manager', label: 'AI Facilities Manager', icon: Shield, color: '#33691E', route: '/ai-agent/realestate/facilities-manager', count: 3 },
  // Specialist Level (184-187)
  { id: 'property-analyst', label: 'AI Property Analyst', icon: Search, color: '#33691E', route: '/ai-agent/realestate/property-analyst', count: 3 },
  { id: 'lease-administrator', label: 'AI Lease Administrator', icon: FileText, color: '#33691E', route: '/ai-agent/realestate/lease-administrator', count: 3 },
  { id: 'tenant-relations', label: 'AI Tenant Relations Specialist', icon: MessageSquare, color: '#33691E', route: '/ai-agent/realestate/tenant-relations', count: 3 },
  { id: 'maintenance-coordinator', label: 'AI Maintenance Coordinator', icon: Wrench, color: '#33691E', route: '/ai-agent/realestate/maintenance-coordinator', count: 3 },
  // Analyst/Coordinator Level (188-191)
  { id: 'acquisition-analyst', label: 'AI Acquisition Analyst', icon: Target, color: '#33691E', route: '/ai-agent/realestate/acquisition-analyst', count: 3 },
  { id: 'asset-manager', label: 'AI Asset Manager', icon: TrendingUp, color: '#33691E', route: '/ai-agent/realestate/asset-manager', count: 3 },
  { id: 'development-coordinator', label: 'AI Development Coordinator', icon: Calendar, color: '#33691E', route: '/ai-agent/realestate/development-coordinator', count: 3 },
  { id: 'property-marketing', label: 'AI Property Marketing', icon: Megaphone, color: '#33691E', route: '/ai-agent/realestate/property-marketing', count: 3 },
];

// 178. CREO Sub-Agents
const creoSubAgents: SidebarCategory[] = [
  { id: 'portfolio-strategy-advisor', label: 'AI Portfolio Strategy Advisor', icon: Briefcase, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/portfolio-strategy-advisor', count: 1 },
  { id: 'market-cycle-analyst', label: 'AI Market Cycle Analyst', icon: TrendingUp, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/market-cycle-analyst', count: 1 },
  { id: 'capital-deployment-planner', label: 'AI Capital Deployment Planner', icon: DollarSign, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/capital-deployment-planner', count: 1 },
];

// 179. VP Property Management Sub-Agents
const vpPropertyMgmtSubAgents: SidebarCategory[] = [
  { id: 'property-performance-monitor', label: 'AI Property Performance Monitor', icon: Activity, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/property-performance-monitor', count: 1 },
  { id: 'noi-optimizer', label: 'AI NOI Optimizer', icon: TrendingUp, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/noi-optimizer', count: 1 },
  { id: 'tenant-retention-strategist', label: 'AI Tenant Retention Strategist', icon: Users, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/tenant-retention-strategist', count: 1 },
];

// 180. VP Real Estate Development Sub-Agents
const vpRealEstateDevSubAgents: SidebarCategory[] = [
  { id: 'development-pipeline-manager', label: 'AI Development Pipeline Manager', icon: GitBranch, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/development-pipeline-manager', count: 1 },
  { id: 'feasibility-analyst', label: 'AI Feasibility Analyst', icon: Search, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/feasibility-analyst', count: 1 },
  { id: 'permit-tracker', label: 'AI Permit Tracker', icon: ClipboardCheck, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/permit-tracker', count: 1 },
];

// 181. Property Manager Sub-Agents
const propertyManagerSubAgents: SidebarCategory[] = [
  { id: 'rent-collector', label: 'AI Rent Collector', icon: DollarSign, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/rent-collector', count: 1 },
  { id: 'maintenance-dispatcher', label: 'AI Maintenance Dispatcher', icon: Wrench, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/maintenance-dispatcher', count: 1 },
  { id: 'lease-enforcer', label: 'AI Lease Enforcer', icon: Shield, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/lease-enforcer', count: 1 },
];

// 182. Leasing Manager Sub-Agents
const leasingManagerSubAgents: SidebarCategory[] = [
  { id: 'vacancy-minimizer', label: 'AI Vacancy Minimizer', icon: TrendingDown, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/vacancy-minimizer', count: 1 },
  { id: 'lease-negotiator', label: 'AI Lease Negotiator', icon: Handshake, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/lease-negotiator', count: 1 },
  { id: 'tenant-qualifier', label: 'AI Tenant Qualifier', icon: UserCheck, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/tenant-qualifier', count: 1 },
];

// 183. Facilities Manager Sub-Agents
const facilitiesManagerSubAgents: SidebarCategory[] = [
  { id: 'building-systems-monitor', label: 'AI Building Systems Monitor', icon: Monitor, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/building-systems-monitor', count: 1 },
  { id: 'energy-manager', label: 'AI Energy Manager', icon: Zap, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/energy-manager', count: 1 },
  { id: 'space-optimizer', label: 'AI Space Optimizer', icon: LayoutGrid, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/space-optimizer', count: 1 },
];

// 184. Property Analyst Sub-Agents
const propertyAnalystSubAgents: SidebarCategory[] = [
  { id: 'comparable-analyzer', label: 'AI Comparable Analyzer', icon: Search, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/comparable-analyzer', count: 1 },
  { id: 'value-estimator', label: 'AI Value Estimator', icon: Calculator, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/value-estimator', count: 1 },
  { id: 'market-trend-reporter', label: 'AI Market Trend Reporter', icon: BarChart3, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/market-trend-reporter', count: 1 },
];

// 185. Lease Administrator Sub-Agents
const leaseAdminSubAgents: SidebarCategory[] = [
  { id: 'lease-abstractor', label: 'AI Lease Abstractor', icon: FileText, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/lease-abstractor', count: 1 },
  { id: 'critical-date-tracker', label: 'AI Critical Date Tracker', icon: Calendar, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/critical-date-tracker', count: 1 },
  { id: 'rent-escalation-calculator', label: 'AI Rent Escalation Calculator', icon: Calculator, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/rent-escalation-calculator', count: 1 },
];

// 186. Tenant Relations Sub-Agents
const tenantRelationsSubAgents: SidebarCategory[] = [
  { id: 'issue-resolver', label: 'AI Issue Resolver', icon: Wrench, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/issue-resolver', count: 1 },
  { id: 'communication-coordinator', label: 'AI Communication Coordinator', icon: MessageSquare, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/communication-coordinator', count: 1 },
  { id: 'satisfaction-surveyor', label: 'AI Satisfaction Surveyor', icon: ClipboardList, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/satisfaction-surveyor', count: 1 },
];

// 187. Maintenance Coordinator Sub-Agents
const maintenanceCoordSubAgents: SidebarCategory[] = [
  { id: 'work-order-prioritizer', label: 'AI Work Order Prioritizer', icon: ListFilter, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/work-order-prioritizer', count: 1 },
  { id: 'vendor-dispatcher', label: 'AI Vendor Dispatcher', icon: Truck, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/vendor-dispatcher', count: 1 },
  { id: 'cost-estimator', label: 'AI Cost Estimator', icon: Calculator, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/cost-estimator', count: 1 },
];

// 188. Acquisition Analyst Sub-Agents
const acquisitionAnalystSubAgents: SidebarCategory[] = [
  { id: 'deal-screener', label: 'AI Deal Screener', icon: Search, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/deal-screener', count: 1 },
  { id: 'due-diligence-coordinator', label: 'AI Due Diligence Coordinator', icon: ClipboardCheck, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/due-diligence-coordinator', count: 1 },
  { id: 'underwriting-assistant', label: 'AI Underwriting Assistant', icon: FileText, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/underwriting-assistant', count: 1 },
];

// 189. Asset Manager Sub-Agents
const assetManagerSubAgents: SidebarCategory[] = [
  { id: 'asset-performance-tracker', label: 'AI Asset Performance Tracker', icon: Activity, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/asset-performance-tracker', count: 1 },
  { id: 'disposition-advisor', label: 'AI Disposition Advisor', icon: TrendingDown, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/disposition-advisor', count: 1 },
  { id: 'return-calculator', label: 'AI Return Calculator', icon: Calculator, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/return-calculator', count: 1 },
];

// 190. Development Coordinator Sub-Agents
const developmentCoordSubAgents: SidebarCategory[] = [
  { id: 'timeline-manager', label: 'AI Timeline Manager', icon: Calendar, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/timeline-manager', count: 1 },
  { id: 'contractor-coordinator', label: 'AI Contractor Coordinator', icon: Users, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/contractor-coordinator', count: 1 },
  { id: 'budget-tracker', label: 'AI Budget Tracker', icon: DollarSign, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/budget-tracker', count: 1 },
];

// 191. Property Marketing Sub-Agents
const propertyMarketingSubAgents: SidebarCategory[] = [
  { id: 'listing-creator', label: 'AI Listing Creator', icon: FileText, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/listing-creator', count: 1 },
  { id: 'virtual-tour-builder', label: 'AI Virtual Tour Builder', icon: ImageIcon, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/virtual-tour-builder', count: 1 },
  { id: 'lead-qualifier', label: 'AI Lead Qualifier', icon: Target, color: '#558B2F', route: '/ai-agent/realestate/sub-agents/lead-qualifier', count: 1 },
];

// Insurance & Risk VP & Executive Hierarchy - Agents 192-195
const insuranceVPHierarchy: SidebarCategory[] = [
  { id: 'cro', label: 'AI Chief Risk Officer', icon: ShieldAlert, color: '#FF7043', route: '/ai-agent/insurance/cro', count: 3 },
  { id: 'vp-underwriting', label: 'AI VP Underwriting', icon: ShieldCheck, color: '#FF5722', route: '/ai-agent/insurance/vp-underwriting', count: 3 },
  { id: 'vp-claims', label: 'AI VP Claims', icon: FileText, color: '#E64A19', route: '/ai-agent/insurance/vp-claims', count: 3 },
  { id: 'vp-risk-assessment', label: 'AI VP Risk Assessment', icon: ShieldAlert, color: '#BF360C', route: '/ai-agent/insurance/vp-risk-assessment', count: 3 },
];

// Insurance Manager & Agent Hierarchy - Agents 196-207
const insuranceAgentHierarchy: SidebarCategory[] = [
  { id: 'underwriting-mgr', label: 'AI Underwriting Manager', icon: BookOpen, color: '#FF7043', route: '/ai-agent/insurance/underwriting-manager', count: 3 },
  { id: 'claims-mgr', label: 'AI Claims Manager', icon: ClipboardList, color: '#FF5722', route: '/ai-agent/insurance/claims-manager', count: 3 },
  { id: 'policy-mgr', label: 'AI Policy Manager', icon: FileText, color: '#E64A19', route: '/ai-agent/insurance/policy-manager', count: 3 },
  { id: 'underwriter', label: 'AI Underwriter', icon: PenTool, color: '#FF7043', route: '/ai-agent/insurance/underwriter-1', count: 3 },
  { id: 'claims-adjuster', label: 'AI Claims Adjuster', icon: ClipboardList, color: '#FF5722', route: '/ai-agent/insurance/claims-adjuster', count: 3 },
  { id: 'fraud-detector', label: 'AI Fraud Detection Agent', icon: Search, color: '#E64A19', route: '/ai-agent/insurance/fraud-detector', count: 3 },
  { id: 'actuary-analyst', label: 'AI Actuary Analyst', icon: Calculator, color: '#FF7043', route: '/ai-agent/insurance/actuary-analyst', count: 3 },
  { id: 'risk-modeler', label: 'AI Risk Modeler', icon: ChartBarBig, color: '#FF5722', route: '/ai-agent/insurance/risk-modeler', count: 3 },
  { id: 'policy-admin', label: 'AI Policy Administrator', icon: FileText, color: '#E64A19', route: '/ai-agent/insurance/policy-admin', count: 3 },
  { id: 'customer-risk-analyst', label: 'AI Customer Risk Analyst', icon: UserCheck, color: '#FF7043', route: '/ai-agent/insurance/customer-risk-analyst', count: 3 },
  { id: 'catastrophe-modeler', label: 'AI Catastrophe Modeler', icon: AlertTriangle, color: '#FF5722', route: '/ai-agent/insurance/catastrophe-modeler', count: 3 },
  { id: 'reinsurance-spec', label: 'AI Reinsurance Specialist', icon: ShieldCheck, color: '#E64A19', route: '/ai-agent/insurance/reinsurance-specialist', count: 3 },
];

// 192. CRO Sub-Agents
const croSubAgents: SidebarCategory[] = [
  { id: 'enterprise-risk-strategy-advisor', label: 'AI Enterprise Risk Strategy Advisor', icon: Shield, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/enterprise-risk-strategy-advisor', count: 1 },
  { id: 'risk-appetite-definer', label: 'AI Risk Appetite Definer', icon: Gauge, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/risk-appetite-definer', count: 1 },
  { id: 'board-risk-reporter', label: 'AI Board Risk Reporter', icon: FileText, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/board-risk-reporter', count: 1 },
];

// 193. VP Underwriting Sub-Agents
const vpUnderwritingSubAgents: SidebarCategory[] = [
  { id: 'underwriting-guidelines-enforcer', label: 'AI Underwriting Guidelines Enforcer', icon: BookOpen, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/underwriting-guidelines-enforcer', count: 1 },
  { id: 'portfolio-mix-manager', label: 'AI Portfolio Mix Manager', icon: PieChart, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/portfolio-mix-manager', count: 1 },
  { id: 'pricing-strategy-advisor', label: 'AI Pricing Strategy Advisor', icon: DollarSign, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/pricing-strategy-advisor', count: 1 },
];

// 194. VP Claims Sub-Agents
const vpClaimsSubAgents: SidebarCategory[] = [
  { id: 'claims-process-optimizer', label: 'AI Claims Process Optimizer', icon: Zap, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/claims-process-optimizer', count: 1 },
  { id: 'settlement-authority-manager', label: 'AI Settlement Authority Manager', icon: Gavel, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/settlement-authority-manager', count: 1 },
  { id: 'litigation-coordinator', label: 'AI Litigation Coordinator', icon: Scale, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/litigation-coordinator', count: 1 },
];

// 195. VP Risk Assessment Sub-Agents
const vpRiskAssessmentSubAgents: SidebarCategory[] = [
  { id: 'risk-model-overseer', label: 'AI Risk Model Overseer', icon: Brain, color: '#BF360C', route: '/ai-agent/insurance/sub-agents/risk-model-overseer', count: 1 },
  { id: 'assessment-standards-enforcer', label: 'AI Assessment Standards Enforcer', icon: CheckCircle, color: '#BF360C', route: '/ai-agent/insurance/sub-agents/assessment-standards-enforcer', count: 1 },
  { id: 'emerging-risk-spotter', label: 'AI Emerging Risk Spotter', icon: Eye, color: '#BF360C', route: '/ai-agent/insurance/sub-agents/emerging-risk-spotter', count: 1 },
];

// 196. Underwriting Manager Sub-Agents
const underwritingMgrSubAgents: SidebarCategory[] = [
  { id: 'workflow-prioritizer', label: 'AI Workflow Prioritizer', icon: ClipboardList, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/workflow-prioritizer', count: 1 },
  { id: 'quality-reviewer', label: 'AI Quality Reviewer', icon: SquareCheck, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/quality-reviewer', count: 1 },
  { id: 'exception-approver', label: 'AI Exception Approver', icon: ShieldCheck, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/exception-approver', count: 1 },
];

// 197. Claims Manager Sub-Agents
const claimsMgrSubAgents: SidebarCategory[] = [
  { id: 'claims-assigner', label: 'AI Claims Assigner', icon: UserPlus, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/claims-assigner', count: 1 },
  { id: 'reserve-reviewer', label: 'AI Reserve Reviewer', icon: DollarSign, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/reserve-reviewer', count: 1 },
  { id: 'fraud-flag-coordinator', label: 'AI Fraud Flag Coordinator', icon: AlertTriangle, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/fraud-flag-coordinator', count: 1 },
];

// 198. Policy Manager Sub-Agents
const policyMgrSubAgents: SidebarCategory[] = [
  { id: 'policy-lifecycle-manager', label: 'AI Policy Lifecycle Manager', icon: RefreshCw, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/policy-lifecycle-manager', count: 1 },
  { id: 'renewal-tracker', label: 'AI Renewal Tracker', icon: CalendarClock, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/renewal-tracker', count: 1 },
  { id: 'endorsement-processor', label: 'AI Endorsement Processor', icon: FileText, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/endorsement-processor', count: 1 },
];

// 199. Underwriter Sub-Agents
const underwriterSubAgents: SidebarCategory[] = [
  { id: 'risk-evaluator', label: 'AI Risk Evaluator', icon: Search, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/risk-evaluator', count: 1 },
  { id: 'premium-calculator', label: 'AI Premium Calculator', icon: Calculator, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/premium-calculator', count: 1 },
  { id: 'coverage-analyzer', label: 'AI Coverage Analyzer', icon: Eye, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/coverage-analyzer', count: 1 },
];

// 200. Claims Adjuster Sub-Agents
const claimsAdjusterSubAgents: SidebarCategory[] = [
  { id: 'damage-assessor', label: 'AI Damage Assessor', icon: ClipboardList, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/damage-assessor', count: 1 },
  { id: 'liability-determiner', label: 'AI Liability Determiner', icon: Scale, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/liability-determiner', count: 1 },
  { id: 'settlement-negotiator', label: 'AI Settlement Negotiator', icon: Handshake, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/settlement-negotiator', count: 1 },
];

// 201. Fraud Detection Sub-Agents
const fraudDetectionSubAgents: SidebarCategory[] = [
  { id: 'pattern-detector', label: 'AI Pattern Detector', icon: Search, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/pattern-detector', count: 1 },
  { id: 'anomaly-scorer', label: 'AI Anomaly Scorer', icon: Activity, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/anomaly-scorer', count: 1 },
  { id: 'investigation-coordinator', label: 'AI Investigation Coordinator', icon: Eye, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/investigation-coordinator', count: 1 },
];

// 202. Actuary Analyst Sub-Agents
const actuaryAnalystSubAgents: SidebarCategory[] = [
  { id: 'loss-development-tracker', label: 'AI Loss Development Tracker', icon: TrendingUp, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/loss-development-tracker', count: 1 },
  { id: 'frequencyseverity-modeler', label: 'AI Frequency/Severity Modeler', icon: BarChart3, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/frequencyseverity-modeler', count: 1 },
  { id: 'rate-filing-preparer', label: 'AI Rate Filing Preparer', icon: FileText, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/rate-filing-preparer', count: 1 },
];

// 203. Risk Modeler Sub-Agents
const riskModelerSubAgents: SidebarCategory[] = [
  { id: 'scenario-builder', label: 'AI Scenario Builder', icon: GitBranch, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/scenario-builder', count: 1 },
  { id: 'correlation-analyst', label: 'AI Correlation Analyst', icon: BarChart3, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/correlation-analyst', count: 1 },
  { id: 'capital-requirement-calculator', label: 'AI Capital Requirement Calculator', icon: Landmark, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/capital-requirement-calculator', count: 1 },
];

// 204. Policy Admin Sub-Agents
const policyAdminSubAgents: SidebarCategory[] = [
  { id: 'policy-issuer', label: 'AI Policy Issuer', icon: FileText, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/policy-issuer', count: 1 },
  { id: 'document-generator', label: 'AI Document Generator', icon: FileText, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/document-generator', count: 1 },
  { id: 'compliance-checker', label: 'AI Compliance Checker', icon: ShieldCheck, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/compliance-checker', count: 1 },
];

// 205. Customer Risk Analyst Sub-Agents
const customerRiskAnalystSubAgents: SidebarCategory[] = [
  { id: 'risk-profiler', label: 'AI Risk Profiler', icon: UserCheck, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/risk-profiler', count: 1 },
  { id: 'behavioral-scorer', label: 'AI Behavioral Scorer', icon: Brain, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/behavioral-scorer', count: 1 },
  { id: 'segmentation-analyst', label: 'AI Segmentation Analyst', icon: PieChart, color: '#FF7043', route: '/ai-agent/insurance/sub-agents/segmentation-analyst', count: 1 },
];

// 206. Catastrophe Modeler Sub-Agents
const catastropheModelerSubAgents: SidebarCategory[] = [
  { id: 'event-simulator', label: 'AI Event Simulator', icon: Zap, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/event-simulator', count: 1 },
  { id: 'exposure-aggregator', label: 'AI Exposure Aggregator', icon: Globe, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/exposure-aggregator', count: 1 },
  { id: 'loss-estimator', label: 'AI Loss Estimator', icon: Calculator, color: '#FF5722', route: '/ai-agent/insurance/sub-agents/loss-estimator', count: 1 },
];

// 207. Reinsurance Specialist Sub-Agents
const reinsuranceSpecSubAgents: SidebarCategory[] = [
  { id: 'treaty-negotiator', label: 'AI Treaty Negotiator', icon: Handshake, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/treaty-negotiator', count: 1 },
  { id: 'ceding-calculator', label: 'AI Ceding Calculator', icon: DollarSign, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/ceding-calculator', count: 1 },
  { id: 'recoveries-tracker', label: 'AI Recoveries Tracker', icon: RotateCcw, color: '#E64A19', route: '/ai-agent/insurance/sub-agents/recoveries-tracker', count: 1 },
];

// Healthcare & Medical VP & Executive Hierarchy - Agents 208-210
const healthcareVPHierarchy: SidebarCategory[] = [
  { id: 'chief-medical-officer', label: 'AI Chief Medical Officer', icon: HeartPulse, color: '#EC407A', route: '/ai-agent/healthcare/chief-medical-officer', count: 3 },
  { id: 'vp-healthcare-operations', label: 'AI VP Healthcare Ops', icon: Settings, color: '#EC407A', route: '/ai-agent/healthcare/vp-healthcare-operations', count: 3 },
  { id: 'vp-patient-experience', label: 'AI VP Patient Experience', icon: Heart, color: '#EC407A', route: '/ai-agent/healthcare/vp-patient-experience', count: 3 },
];

// Healthcare Manager & Specialist Hierarchy - Agents 211-221
const healthcareManagerHierarchy: SidebarCategory[] = [
  { id: 'patient-services-manager', label: 'AI Patient Services Mgr', icon: Users, color: '#F06292', route: '/ai-agent/healthcare/patient-services-manager', count: 3 },
  { id: 'medical-billing-manager', label: 'AI Medical Billing Mgr', icon: DollarSign, color: '#F06292', route: '/ai-agent/healthcare/medical-billing-manager', count: 3 },
  { id: 'scheduling-manager', label: 'AI Scheduling Manager', icon: Calendar, color: '#F06292', route: '/ai-agent/healthcare/scheduling-manager', count: 3 },
  { id: 'patient-coordinator', label: 'AI Patient Coordinator', icon: GitBranch, color: '#F06292', route: '/ai-agent/healthcare/patient-coordinator', count: 3 },
  { id: 'medical-coder', label: 'AI Medical Coder', icon: Code, color: '#F06292', route: '/ai-agent/healthcare/medical-coder', count: 3 },
  { id: 'billing-specialist', label: 'AI Billing Specialist', icon: CreditCard, color: '#F06292', route: '/ai-agent/healthcare/billing-specialist', count: 3 },
  { id: 'care-coordinator', label: 'AI Care Coordinator', icon: HeartHandshake, color: '#F06292', route: '/ai-agent/healthcare/care-coordinator', count: 3 },
  { id: 'health-records-specialist', label: 'AI Health Records Spec', icon: FolderOpen, color: '#F06292', route: '/ai-agent/healthcare/health-records-specialist', count: 3 },
  { id: 'telehealth-support', label: 'AI Telehealth Support', icon: Monitor, color: '#F06292', route: '/ai-agent/healthcare/telehealth-support', count: 3 },
  { id: 'healthcare-compliance', label: 'AI Healthcare Compliance', icon: ShieldCheck, color: '#F06292', route: '/ai-agent/healthcare/healthcare-compliance', count: 3 },
  { id: 'quality-improvement-specialist', label: 'AI Quality Improvement', icon: TrendingUp, color: '#F06292', route: '/ai-agent/healthcare/quality-improvement-specialist', count: 3 },
];

// 208. CMO Sub-Agents
const cmoSubAgents: SidebarCategory[] = [
  { id: 'clinical-strategy-advisor', label: 'AI Clinical Strategy Advisor', icon: Heart, color: '#EC407A', route: '/ai-agent/healthcare/sub-agents/clinical-strategy-advisor', count: 1 },
  { id: 'quality-standards-enforcer', label: 'AI Quality Standards Enforcer', icon: ShieldCheck, color: '#EC407A', route: '/ai-agent/healthcare/sub-agents/quality-standards-enforcer', count: 1 },
  { id: 'medical-policy-reviewer', label: 'AI Medical Policy Reviewer', icon: FileText, color: '#EC407A', route: '/ai-agent/healthcare/sub-agents/medical-policy-reviewer', count: 1 },
];

// 209. VP Healthcare Ops Sub-Agents
const vpHealthcareOpsSubAgents: SidebarCategory[] = [
  { id: 'workflow-optimizer', label: 'AI Workflow Optimizer', icon: Zap, color: '#EC407A', route: '/ai-agent/healthcare/sub-agents/workflow-optimizer', count: 1 },
  { id: 'staff-scheduler', label: 'AI Staff Scheduler', icon: Calendar, color: '#EC407A', route: '/ai-agent/healthcare/sub-agents/staff-scheduler', count: 1 },
  { id: 'regulatory-compliance-monitor', label: 'AI Regulatory Compliance Monitor', icon: ShieldCheck, color: '#EC407A', route: '/ai-agent/healthcare/sub-agents/regulatory-compliance-monitor', count: 1 },
];

// 210. VP Patient Experience Sub-Agents
const vpPatientExpSubAgents: SidebarCategory[] = [
  { id: 'satisfaction-analyzer', label: 'AI Satisfaction Analyzer', icon: Star, color: '#EC407A', route: '/ai-agent/healthcare/sub-agents/satisfaction-analyzer', count: 1 },
  { id: 'service-improvement-planner', label: 'AI Service Improvement Planner', icon: TrendingUp, color: '#EC407A', route: '/ai-agent/healthcare/sub-agents/service-improvement-planner', count: 1 },
  { id: 'feedback-coordinator', label: 'AI Feedback Coordinator', icon: MessageSquare, color: '#EC407A', route: '/ai-agent/healthcare/sub-agents/feedback-coordinator', count: 1 },
];

// 211. Patient Services Manager Sub-Agents
const patientServicesMgrSubAgents: SidebarCategory[] = [
  { id: 'intake-coordinator', label: 'AI Intake Coordinator', icon: ClipboardList, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/intake-coordinator', count: 1 },
  { id: 'service-navigator', label: 'AI Service Navigator', icon: Compass, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/service-navigator', count: 1 },
  { id: 'discharge-planner', label: 'AI Discharge Planner', icon: ArrowRight, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/discharge-planner', count: 1 },
];

// 212. Medical Billing Manager Sub-Agents
const medBillingMgrSubAgents: SidebarCategory[] = [
  { id: 'claims-optimizer', label: 'AI Claims Optimizer', icon: Zap, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/claims-optimizer', count: 1 },
  { id: 'denial-manager', label: 'AI Denial Manager', icon: ShieldAlert, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/denial-manager', count: 1 },
  { id: 'revenue-cycle-analyst', label: 'AI Revenue Cycle Analyst', icon: TrendingUp, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/revenue-cycle-analyst', count: 1 },
];

// 213. Scheduling Manager Sub-Agents
const schedulingMgrSubAgents: SidebarCategory[] = [
  { id: 'appointment-optimizer', label: 'AI Appointment Optimizer', icon: Zap, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/appointment-optimizer', count: 1 },
  { id: 'no-show-predictor', label: 'AI No-Show Predictor', icon: Target, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/no-show-predictor', count: 1 },
  { id: 'provider-calendar-manager', label: 'AI Provider Calendar Mgr', icon: Calendar, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/provider-calendar-manager', count: 1 },
];

// 214. Patient Coordinator Sub-Agents
const patientCoordSubAgents: SidebarCategory[] = [
  { id: 'referral-processor', label: 'AI Referral Processor', icon: ArrowRight, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/referral-processor', count: 1 },
  { id: 'pre-authorization-agent', label: 'AI Pre-Authorization Agent', icon: ShieldCheck, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/pre-authorization-agent', count: 1 },
  { id: 'care-transition-coordinator', label: 'AI Care Transition Coord', icon: GitBranch, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/care-transition-coordinator', count: 1 },
];

// 215. Medical Coder Sub-Agents
const medCoderSubAgents: SidebarCategory[] = [
  { id: 'code-assigner', label: 'AI Code Assigner', icon: Code, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/code-assigner', count: 1 },
  { id: 'coding-compliance-auditor', label: 'AI Coding Compliance Auditor', icon: ShieldCheck, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/coding-compliance-auditor', count: 1 },
  { id: 'coding-update-tracker', label: 'AI Coding Update Tracker', icon: RefreshCw, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/coding-update-tracker', count: 1 },
];

// 216. Billing Specialist Sub-Agents
const billingSpecSubAgents: SidebarCategory[] = [
  { id: 'charge-capture-agent', label: 'AI Charge Capture Agent', icon: ClipboardList, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/charge-capture-agent', count: 1 },
  { id: 'payment-poster', label: 'AI Payment Poster', icon: DollarSign, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/payment-poster', count: 1 },
  { id: 'balance-collector', label: 'AI Balance Collector', icon: TrendingUp, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/balance-collector', count: 1 },
];

// 217. Care Coordinator Sub-Agents
const careCoordSubAgents: SidebarCategory[] = [
  { id: 'care-plan-manager', label: 'AI Care Plan Manager', icon: ClipboardList, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/care-plan-manager', count: 1 },
  { id: 'follow-up-scheduler', label: 'AI Follow-up Scheduler', icon: Calendar, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/follow-up-scheduler', count: 1 },
  { id: 'outcome-tracker', label: 'AI Outcome Tracker', icon: TrendingUp, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/outcome-tracker', count: 1 },
];

// 218. Health Records Specialist Sub-Agents
const healthRecordsSubAgents: SidebarCategory[] = [
  { id: 'record-organizer', label: 'AI Record Organizer', icon: FolderOpen, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/record-organizer', count: 1 },
  { id: 'release-manager', label: 'AI Release Manager', icon: FileText, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/release-manager', count: 1 },
  { id: 'data-integrity-checker', label: 'AI Data Integrity Checker', icon: ShieldCheck, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/data-integrity-checker', count: 1 },
];

// 219. Telehealth Support Sub-Agents
const telehealthSubAgents: SidebarCategory[] = [
  { id: 'virtual-visit-facilitator', label: 'AI Virtual Visit Facilitator', icon: Monitor, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/virtual-visit-facilitator', count: 1 },
  { id: 'tech-troubleshooter', label: 'AI Tech Troubleshooter', icon: Wrench, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/tech-troubleshooter', count: 1 },
  { id: 'remote-monitor', label: 'AI Remote Monitor', icon: Activity, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/remote-monitor', count: 1 },
];

// 220. Healthcare Compliance Sub-Agents
const healthcareComplianceSubAgents: SidebarCategory[] = [
  { id: 'regulation-tracker', label: 'AI Regulation Tracker', icon: Search, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/regulation-tracker', count: 1 },
  { id: 'audit-preparer', label: 'AI Audit Preparer', icon: FileText, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/audit-preparer', count: 1 },
  { id: 'compliance-training-coordinator', label: 'AI Compliance Training Coord', icon: GraduationCap, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/compliance-training-coordinator', count: 1 },
];

// 221. Quality Improvement Specialist Sub-Agents
const qualityImprovSubAgents: SidebarCategory[] = [
  { id: 'metric-analyzer', label: 'AI Metric Analyzer', icon: BarChart3, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/metric-analyzer', count: 1 },
  { id: 'improvement-planner', label: 'AI Improvement Planner', icon: Zap, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/improvement-planner', count: 1 },
  { id: 'benchmark-reporter', label: 'AI Benchmark Reporter', icon: TrendingUp, color: '#F06292', route: '/ai-agent/healthcare/sub-agents/benchmark-reporter', count: 1 },
];

// ═══════════════════════════════════════════════════════════════
// MANUFACTURING & PRODUCTION - Agents 222-235 (14 agents, 42 sub-agents)
// ═══════════════════════════════════════════════════════════════

// C-Suite & VP Level - Agents 222-224
const manufacturingCSuiteVP: SidebarCategory[] = [
  { id: 'cpo', label: 'AI Chief Production Officer', icon: HardHat, color: '#BF360C', route: '/ai-agent/manufacturing/cpo', count: 3 },
  { id: 'vp-manufacturing', label: 'AI VP Manufacturing', icon: Factory, color: '#5C6BC0', route: '/ai-agent/manufacturing/vp-manufacturing', count: 3 },
  { id: 'vp-quality-assurance', label: 'AI VP Quality Assurance', icon: Award, color: '#5C6BC0', route: '/ai-agent/manufacturing/vp-quality-assurance', count: 3 },
];

// Manager Level - Agents 225-227
const manufacturingManagers: SidebarCategory[] = [
  { id: 'production-manager', label: 'AI Production Manager', icon: Factory, color: '#BF360C', route: '/ai-agent/manufacturing/production-manager', count: 3 },
  { id: 'quality-manager', label: 'AI Quality Manager', icon: CircleCheckBig, color: '#BF360C', route: '/ai-agent/manufacturing/quality-manager', count: 3 },
  { id: 'safety-manager', label: 'AI Safety Manager', icon: Shield, color: '#BF360C', route: '/ai-agent/manufacturing/safety-manager', count: 3 },
];

// Specialist Level - Agents 228-235
const manufacturingSpecialists: SidebarCategory[] = [
  { id: 'production-planner', label: 'AI Production Planner', icon: ClipboardList, color: '#BF360C', route: '/ai-agent/manufacturing/production-planner', count: 3 },
  { id: 'quality-inspector', label: 'AI Quality Inspector', icon: Search, color: '#BF360C', route: '/ai-agent/manufacturing/quality-inspector', count: 3 },
  { id: 'supply-chain-coordinator', label: 'AI Supply Chain Coordinator', icon: Link, color: '#BF360C', route: '/ai-agent/manufacturing/supply-chain-coordinator', count: 3 },
  { id: 'maintenance-technician', label: 'AI Maintenance Technician', icon: Wrench, color: '#BF360C', route: '/ai-agent/manufacturing/maintenance-technician', count: 3 },
  { id: 'inventory-controller', label: 'AI Inventory Controller', icon: Database, color: '#BF360C', route: '/ai-agent/manufacturing/inventory-controller', count: 3 },
  { id: 'lean-specialist', label: 'AI Lean Specialist', icon: Zap, color: '#BF360C', route: '/ai-agent/manufacturing/lean-specialist', count: 3 },
  { id: 'safety-inspector', label: 'AI Safety Inspector', icon: ShieldCheck, color: '#BF360C', route: '/ai-agent/manufacturing/safety-inspector', count: 3 },
  { id: 'logistics-coordinator', label: 'AI Logistics Coordinator', icon: Truck, color: '#BF360C', route: '/ai-agent/manufacturing/logistics-coordinator', count: 3 },
];

// CPO Sub-Agents - Agent 222
const cpoSubAgents: SidebarCategory[] = [
  { id: 'production-strategy-advisor', label: 'AI Production Strategy Advisor', icon: Globe, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/production-strategy-advisor', count: 1 },
  { id: 'capacity-planner', label: 'AI Capacity Planner', icon: ChartBarBig, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/capacity-planner', count: 1 },
  { id: 'cost-reduction-analyst', label: 'AI Cost Reduction Analyst', icon: DollarSign, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/cost-reduction-analyst', count: 1 },
];

// VP Manufacturing Sub-Agents - Agent 223
const vpMfgSubAgents: SidebarCategory[] = [
  { id: 'production-line-optimizer', label: 'AI Production Line Optimizer', icon: Settings, color: '#5C6BC0', route: '/ai-agent/manufacturing/sub-agents/production-line-optimizer', count: 1 },
  { id: 'yield-tracker', label: 'AI Yield Tracker', icon: TrendingUp, color: '#5C6BC0', route: '/ai-agent/manufacturing/sub-agents/yield-tracker', count: 1 },
  { id: 'throughput-analyzer', label: 'AI Throughput Analyzer', icon: Gauge, color: '#5C6BC0', route: '/ai-agent/manufacturing/sub-agents/throughput-analyzer', count: 1 },
];

// VP Quality Assurance Sub-Agents - Agent 224
const vpQASubAgents: SidebarCategory[] = [
  { id: 'quality-standards-enforcer', label: 'AI Quality Standards Enforcer', icon: Shield, color: '#5C6BC0', route: '/ai-agent/manufacturing/sub-agents/quality-standards-enforcer', count: 1 },
  { id: 'audit-scheduler', label: 'AI Audit Scheduler', icon: Calendar, color: '#5C6BC0', route: '/ai-agent/manufacturing/sub-agents/audit-scheduler', count: 1 },
  { id: 'corrective-action-monitor', label: 'AI Corrective Action Monitor', icon: Activity, color: '#5C6BC0', route: '/ai-agent/manufacturing/sub-agents/corrective-action-monitor', count: 1 },
];

// Production Manager Sub-Agents - Agent 225
const prodMgrSubAgents: SidebarCategory[] = [
  { id: 'shift-coordinator', label: 'AI Shift Coordinator', icon: Clock, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/shift-coordinator', count: 1 },
  { id: 'production-scheduler', label: 'AI Production Scheduler', icon: Calendar, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/production-scheduler', count: 1 },
  { id: 'output-tracker', label: 'AI Output Tracker', icon: ChartBarBig, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/output-tracker', count: 1 },
];

// Quality Manager Sub-Agents - Agent 226
const qualMgrSubAgents: SidebarCategory[] = [
  { id: 'inspection-planner', label: 'AI Inspection Planner', icon: Search, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/inspection-planner', count: 1 },
  { id: 'defect-categorizer', label: 'AI Defect Categorizer', icon: AlertTriangle, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/defect-categorizer', count: 1 },
  { id: 'supplier-quality-auditor', label: 'AI Supplier Quality Auditor', icon: Users, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/supplier-quality-auditor', count: 1 },
];

// Safety Manager Sub-Agents - Agent 227
const safetyMgrSubAgents: SidebarCategory[] = [
  { id: 'hazard-identifier', label: 'AI Hazard Identifier', icon: AlertTriangle, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/hazard-identifier', count: 1 },
  { id: 'safety-trainer', label: 'AI Safety Trainer', icon: BookOpen, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/safety-trainer', count: 1 },
  { id: 'incident-investigator', label: 'AI Incident Investigator', icon: Search, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/incident-investigator', count: 1 },
];

// Specialist Sub-Agents - Agents 228-235
const mfgSpecialistSubAgents: SidebarCategory[] = [
  { id: 'material-requirements-planner', label: 'AI Material Requirements Planner', icon: Package, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/material-requirements-planner', count: 1 },
  { id: 'capacity-loader', label: 'AI Capacity Loader', icon: Gauge, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/capacity-loader', count: 1 },
  { id: 'order-sequencer', label: 'AI Order Sequencer', icon: Filter, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/order-sequencer', count: 1 },
  { id: 'measurement-analyst', label: 'AI Measurement Analyst', icon: Ruler, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/measurement-analyst', count: 1 },
  { id: 'specification-checker', label: 'AI Specification Checker', icon: FileText, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/specification-checker', count: 1 },
  { id: 'non-conformance-reporter', label: 'AI Non-conformance Reporter', icon: AlertTriangle, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/non-conformance-reporter', count: 1 },
  { id: 'supplier-scheduler', label: 'AI Supplier Scheduler', icon: Calendar, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/supplier-scheduler', count: 1 },
  { id: 'delivery-tracker', label: 'AI Delivery Tracker', icon: Truck, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/delivery-tracker', count: 1 },
  { id: 'inventory-buffer-manager', label: 'AI Inventory Buffer Manager', icon: Database, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/inventory-buffer-manager', count: 1 },
  { id: 'predictive-maintenance-monitor', label: 'AI Predictive Maintenance Monitor', icon: Activity, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/predictive-maintenance-monitor', count: 1 },
  { id: 'repair-scheduler', label: 'AI Repair Scheduler', icon: Calendar, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/repair-scheduler', count: 1 },
  { id: 'spare-parts-manager', label: 'AI Spare Parts Manager', icon: Package, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/spare-parts-manager', count: 1 },
  { id: 'stock-level-monitor', label: 'AI Stock Level Monitor', icon: BarChart3, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/stock-level-monitor', count: 1 },
  { id: 'reorder-point-calculator', label: 'AI Reorder Point Calculator', icon: Calculator, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/reorder-point-calculator', count: 1 },
  { id: 'cycle-count-coordinator', label: 'AI Cycle Count Coordinator', icon: ClipboardCheck, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/cycle-count-coordinator', count: 1 },
  { id: 'waste-identifier', label: 'AI Waste Identifier', icon: Trash2, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/waste-identifier', count: 1 },
  { id: 'value-stream-mapper', label: 'AI Value Stream Mapper', icon: GitBranch, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/value-stream-mapper', count: 1 },
  { id: 'kaizen-facilitator', label: 'AI Kaizen Facilitator', icon: Sparkles, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/kaizen-facilitator', count: 1 },
  { id: 'compliance-auditor', label: 'AI Compliance Auditor', icon: ClipboardCheck, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/compliance-auditor', count: 1 },
  { id: 'risk-assessor', label: 'AI Risk Assessor', icon: Gauge, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/risk-assessor', count: 1 },
  { id: 'corrective-action-tracker', label: 'AI Corrective Action Tracker', icon: CheckCircle, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/corrective-action-tracker', count: 1 },
  { id: 'shipment-planner', label: 'AI Shipment Planner', icon: Package, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/shipment-planner', count: 1 },
  { id: 'carrier-selector', label: 'AI Carrier Selector', icon: Globe, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/carrier-selector', count: 1 },
  { id: 'delivery-optimizer', label: 'AI Delivery Optimizer', icon: MapPin, color: '#BF360C', route: '/ai-agent/manufacturing/sub-agents/delivery-optimizer', count: 1 },
];

// ═══════════════════════════════════════════════════════════════
// TRANSPORTATION & LOGISTICS - Agents 236-249 (14 agents, 42 sub-agents)
// ═══════════════════════════════════════════════════════════════

// C-Suite & VP Level - Agents 236-238
const transportationVPHierarchy: SidebarCategory[] = [
  { id: 'clo-logistics', label: 'AI Chief Logistics Officer', icon: Briefcase, color: '#26A69A', route: '/ai-agent/transportation/clo-logistics', count: 3 },
  { id: 'vp-transportation', label: 'AI VP Transportation', icon: Truck, color: '#26A69A', route: '/ai-agent/transportation/vp-transportation', count: 3 },
  { id: 'vp-logistics-operations', label: 'AI VP Logistics Operations', icon: Settings, color: '#26A69A', route: '/ai-agent/transportation/vp-logistics-operations', count: 3 },
];

// CLO Sub-Agents - Agent 236
const cloLogisticsSubAgents: SidebarCategory[] = [
  { id: 'logistics-strategy-advisor', label: 'AI Logistics Strategy Advisor', icon: Globe, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/logistics-strategy-advisor', count: 1 },
  { id: 'network-optimizer', label: 'AI Network Optimizer', icon: MapPin, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/network-optimizer', count: 1 },
  { id: 'cost-to-serve-analyst', label: 'AI Cost-to-Serve Analyst', icon: BarChart3, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/cost-to-serve-analyst', count: 1 },
];

// VP Transportation Sub-Agents - Agent 237
const vpTransportSubAgents: SidebarCategory[] = [
  { id: 'fleet-strategy-planner', label: 'AI Fleet Strategy Planner', icon: Map, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/fleet-strategy-planner', count: 1 },
  { id: 'route-network-designer', label: 'AI Route Network Designer', icon: Route, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/route-network-designer', count: 1 },
  { id: 'capacity-planner', label: 'AI Capacity Planner', icon: BarChart3, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/capacity-planner', count: 1 },
];

// VP Logistics Operations Sub-Agents - Agent 238
const vpLogOpsSubAgents: SidebarCategory[] = [
  { id: 'hub-operations-optimizer', label: 'AI Hub Operations Optimizer', icon: Settings, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/hub-operations-optimizer', count: 1 },
  { id: 'throughput-monitor', label: 'AI Throughput Monitor', icon: Gauge, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/throughput-monitor', count: 1 },
  { id: 'sla-enforcer', label: 'AI SLA Enforcer', icon: FileText, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/sla-enforcer', count: 1 },
];

// Manager Level - Agents 239-241
const transportationManagerHierarchy: SidebarCategory[] = [
  { id: 'fleet-manager', label: 'AI Fleet Manager', icon: Truck, color: '#26A69A', route: '/ai-agent/transportation/fleet-manager', count: 3 },
  { id: 'warehouse-manager', label: 'AI Warehouse Manager', icon: Package, color: '#26A69A', route: '/ai-agent/transportation/warehouse-manager', count: 3 },
  { id: 'distribution-manager', label: 'AI Distribution Manager', icon: MapPin, color: '#26A69A', route: '/ai-agent/transportation/distribution-manager', count: 3 },
];

// Fleet Manager Sub-Agents - Agent 239
const fleetManagerSubAgents: SidebarCategory[] = [
  { id: 'vehicle-scheduler', label: 'AI Vehicle Scheduler', icon: Calendar, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/vehicle-scheduler', count: 1 },
  { id: 'fuel-efficiency-monitor', label: 'AI Fuel Efficiency Monitor', icon: Gauge, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/fuel-efficiency-monitor', count: 1 },
  { id: 'maintenance-planner', label: 'AI Maintenance Planner', icon: Wrench, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/maintenance-planner', count: 1 },
];

// Warehouse Manager Sub-Agents - Agent 240
const warehouseManagerSubAgents: SidebarCategory[] = [
  { id: 'slot-optimizer', label: 'AI Slot Optimizer', icon: LayoutGrid, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/slot-optimizer', count: 1 },
  { id: 'pick-path-planner', label: 'AI Pick Path Planner', icon: Route, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/pick-path-planner', count: 1 },
  { id: 'labor-scheduler', label: 'AI Labor Scheduler', icon: Users, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/labor-scheduler', count: 1 },
];

// Distribution Manager Sub-Agents - Agent 241
const distributionManagerSubAgents: SidebarCategory[] = [
  { id: 'zone-planner', label: 'AI Zone Planner', icon: MapPin, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/zone-planner', count: 1 },
  { id: 'delivery-window-manager', label: 'AI Delivery Window Manager', icon: Clock, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/delivery-window-manager', count: 1 },
  { id: 'carrier-allocator', label: 'AI Carrier Allocator', icon: Truck, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/carrier-allocator', count: 1 },
];

// Specialist Level - Agents 242-249
const transportationSpecialistHierarchy: SidebarCategory[] = [
  { id: 'ai-route-optimizer', label: 'AI Route Optimizer', icon: Route, color: '#26A69A', route: '/ai-agent/transportation/ai-route-optimizer', count: 3 },
  { id: 'ai-fleet-coordinator', label: 'AI Fleet Coordinator', icon: Zap, color: '#26A69A', route: '/ai-agent/transportation/ai-fleet-coordinator', count: 3 },
  { id: 'ai-warehouse-operator', label: 'AI Warehouse Operator', icon: Package, color: '#26A69A', route: '/ai-agent/transportation/ai-warehouse-operator', count: 3 },
  { id: 'ai-dispatcher', label: 'AI Dispatcher', icon: Layers, color: '#26A69A', route: '/ai-agent/transportation/ai-dispatcher', count: 3 },
  { id: 'ai-tracking-specialist', label: 'AI Tracking Specialist', icon: Eye, color: '#26A69A', route: '/ai-agent/transportation/ai-tracking-specialist', count: 3 },
  { id: 'ai-last-mile-coordinator', label: 'AI Last Mile Coordinator', icon: MapPin, color: '#26A69A', route: '/ai-agent/transportation/ai-last-mile-coordinator', count: 3 },
  { id: 'ai-freight-broker', label: 'AI Freight Broker', icon: DollarSign, color: '#26A69A', route: '/ai-agent/transportation/ai-freight-broker', count: 3 },
  { id: 'ai-customs-specialist', label: 'AI Customs Specialist', icon: Shield, color: '#26A69A', route: '/ai-agent/transportation/ai-customs-specialist', count: 3 },
];

// Route Optimizer Sub-Agents - Agent 242
const routeOptimizerSubAgents: SidebarCategory[] = [
  { id: 'traffic-predictor', label: 'AI Traffic Predictor', icon: Activity, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/traffic-predictor', count: 1 },
  { id: 'multi-stop-planner', label: 'AI Multi-stop Planner', icon: Map, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/multi-stop-planner', count: 1 },
  { id: 'real-time-rerouter', label: 'AI Real-time Rerouter', icon: RefreshCw, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/real-time-rerouter', count: 1 },
];

// Fleet Coordinator Sub-Agents - Agent 243
const fleetCoordinatorSubAgents: SidebarCategory[] = [
  { id: 'dispatch-optimizer', label: 'AI Dispatch Optimizer', icon: Zap, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/dispatch-optimizer', count: 1 },
  { id: 'driver-assignment-agent', label: 'AI Driver Assignment Agent', icon: UserCheck, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/driver-assignment-agent', count: 1 },
  { id: 'vehicle-tracker', label: 'AI Vehicle Tracker', icon: MapPin, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/vehicle-tracker', count: 1 },
];

// Warehouse Operator Sub-Agents - Agent 244
const warehouseOperatorSubAgents: SidebarCategory[] = [
  { id: 'inventory-put-away-agent', label: 'AI Inventory Put-away Agent', icon: ArrowDown, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/inventory-put-away-agent', count: 1 },
  { id: 'pick-pack-coordinator', label: 'AI Pick & Pack Coordinator', icon: Package, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/pick-pack-coordinator', count: 1 },
  { id: 'return-processor', label: 'AI Return Processor', icon: RotateCcw, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/return-processor', count: 1 },
];

// Dispatcher Sub-Agents - Agent 245
const dispatcherSubAgents: SidebarCategory[] = [
  { id: 'load-matcher', label: 'AI Load Matcher', icon: Layers, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/load-matcher', count: 1 },
  { id: 'driver-communicator', label: 'AI Driver Communicator', icon: MessageSquare, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/driver-communicator', count: 1 },
  { id: 'delivery-sequencer', label: 'AI Delivery Sequencer', icon: List, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/delivery-sequencer', count: 1 },
];

// Tracking Specialist Sub-Agents - Agent 246
const trackingSpecialistSubAgents: SidebarCategory[] = [
  { id: 'shipment-monitor', label: 'AI Shipment Monitor', icon: Eye, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/shipment-monitor', count: 1 },
  { id: 'eta-predictor', label: 'AI ETA Predictor', icon: Clock, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/eta-predictor', count: 1 },
  { id: 'exception-alerter', label: 'AI Exception Alerter', icon: AlertTriangle, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/exception-alerter', count: 1 },
];

// Last Mile Coordinator Sub-Agents - Agent 247
const lastMileSubAgents: SidebarCategory[] = [
  { id: 'delivery-window-negotiator', label: 'AI Delivery Window Negotiator', icon: Clock, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/delivery-window-negotiator', count: 1 },
  { id: 'proof-of-delivery-manager', label: 'AI Proof-of-delivery Manager', icon: CheckCircle, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/proof-of-delivery-manager', count: 1 },
  { id: 'customer-notifier', label: 'AI Customer Notifier', icon: Bell, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/customer-notifier', count: 1 },
];

// Freight Broker Sub-Agents - Agent 248
const freightBrokerSubAgents: SidebarCategory[] = [
  { id: 'rate-negotiator', label: 'AI Rate Negotiator', icon: DollarSign, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/rate-negotiator', count: 1 },
  { id: 'carrier-qualifier', label: 'AI Carrier Qualifier', icon: Shield, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/carrier-qualifier', count: 1 },
  { id: 'lane-optimizer', label: 'AI Lane Optimizer', icon: Route, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/lane-optimizer', count: 1 },
];

// Customs Specialist Sub-Agents - Agent 249
const customsSpecialistSubAgents: SidebarCategory[] = [
  { id: 'duty-calculator', label: 'AI Duty Calculator', icon: Calculator, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/duty-calculator', count: 1 },
  { id: 'document-preparer', label: 'AI Document Preparer', icon: FileText, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/document-preparer', count: 1 },
  { id: 'compliance-checker', label: 'AI Compliance Checker', icon: ShieldCheck, color: '#26A69A', route: '/ai-agent/transportation/sub-agents/compliance-checker', count: 1 },
];

// ═══════════════════════════════════════════════════════════════
// SUPPLY CHAIN & LOGISTICS - Agents 262-271 (10 agents, 30 sub-agents)
// ═══════════════════════════════════════════════════════════════

// VP Level - Agent 262
const supplyChainVPHierarchy: SidebarCategory[] = [
  { id: 'vp-supply-chain-ops', label: 'AI VP Supply Chain Operations', icon: User, color: '#42A5F5', route: '/ai-agent/supply-chain/vp-supply-chain-ops', count: 3 },
];

// VP Supply Chain Sub-Agents - Agent 262
const vpSupplyChainSubAgents: SidebarCategory[] = [
  { id: 'supply-chain-strategist', label: 'AI Supply Chain Strategist', icon: Globe, color: '#42A5F5', route: '/ai-agent/supply-chain/sub-agents/supply-chain-strategist', count: 1 },
  { id: 'network-designer', label: 'AI Network Designer', icon: Network, color: '#42A5F5', route: '/ai-agent/supply-chain/sub-agents/network-designer', count: 1 },
  { id: 'cost-optimizer', label: 'AI Cost Optimizer', icon: DollarSign, color: '#42A5F5', route: '/ai-agent/supply-chain/sub-agents/cost-optimizer', count: 1 },
];

// Manager Level - Agents 263-271
const supplyChainManagerHierarchy: SidebarCategory[] = [
  { id: 'procurement-manager', label: 'AI Procurement Manager', icon: ShoppingCart, color: '#0EA5E9', route: '/ai-agent/supply-chain/procurement-manager', count: 3 },
  { id: 'logistics-manager', label: 'AI Logistics Manager', icon: Truck, color: '#F59E0B', route: '/ai-agent/supply-chain/logistics-manager', count: 3 },
  { id: 'warehouse-lead', label: 'AI Warehouse Lead', icon: Warehouse, color: '#10B981', route: '/ai-agent/supply-chain/warehouse-lead', count: 3 },
  { id: 'procurement-buyer', label: 'AI Procurement Buyer', icon: ClipboardList, color: '#8B5CF6', route: '/ai-agent/supply-chain/procurement-buyer', count: 3 },
  { id: 'inventory-specialist', label: 'AI Inventory Specialist', icon: BarChart3, color: '#EC4899', route: '/ai-agent/supply-chain/inventory-specialist', count: 3 },
  { id: 'demand-planner', label: 'AI Demand Planner', icon: TrendingUp, color: '#06B6D4', route: '/ai-agent/supply-chain/ai-demand-planner', count: 3 },
  { id: 'supplier-relations', label: 'AI Supplier Relations', icon: Handshake, color: '#F97316', route: '/ai-agent/supply-chain/ai-supplier-relations', count: 3 },
  { id: 'shipping-coordinator', label: 'AI Shipping Coordinator', icon: Ship, color: '#84CC16', route: '/ai-agent/supply-chain/ai-shipping-coordinator', count: 3 },
  { id: 'fulfillment-specialist', label: 'AI Fulfillment Specialist', icon: PackageCheck, color: '#6366F1', route: '/ai-agent/supply-chain/ai-fulfillment-specialist', count: 3 },
];

// Procurement Manager Sub-Agents - Agent 263
const procurementMgrSubAgents: SidebarCategory[] = [
  { id: 'sourcing-strategist', label: 'AI Sourcing Strategist', icon: Search, color: '#0EA5E9', route: '/ai-agent/supply-chain/sub-agents/sourcing-strategist', count: 1 },
  { id: 'contract-negotiator', label: 'AI Contract Negotiator', icon: FileText, color: '#0EA5E9', route: '/ai-agent/supply-chain/sub-agents/contract-negotiator', count: 1 },
  { id: 'supplier-evaluator', label: 'AI Supplier Evaluator', icon: Star, color: '#0EA5E9', route: '/ai-agent/supply-chain/sub-agents/supplier-evaluator', count: 1 },
];

// Logistics Manager Sub-Agents - Agent 264
const logisticsMgrSubAgents: SidebarCategory[] = [
  { id: 'transport-mode-selector', label: 'AI Transport Mode Selector', icon: Route, color: '#F59E0B', route: '/ai-agent/supply-chain/sub-agents/transport-mode-selector', count: 1 },
  { id: 'cost-analyzer', label: 'AI Cost Analyzer', icon: BarChart3, color: '#F59E0B', route: '/ai-agent/supply-chain/sub-agents/cost-analyzer', count: 1 },
  { id: 'service-level-monitor', label: 'AI Service Level Monitor', icon: Gauge, color: '#F59E0B', route: '/ai-agent/supply-chain/sub-agents/service-level-monitor', count: 1 },
];

// Warehouse Lead Sub-Agents - Agent 265
const warehouseLeadSubAgents: SidebarCategory[] = [
  { id: 'layout-optimizer', label: 'AI Layout Optimizer', icon: LayoutGrid, color: '#10B981', route: '/ai-agent/supply-chain/sub-agents/layout-optimizer', count: 1 },
  { id: 'safety-enforcer', label: 'AI Safety Enforcer', icon: ShieldCheck, color: '#10B981', route: '/ai-agent/supply-chain/sub-agents/safety-enforcer', count: 1 },
  { id: 'productivity-tracker', label: 'AI Productivity Tracker', icon: Activity, color: '#10B981', route: '/ai-agent/supply-chain/sub-agents/productivity-tracker', count: 1 },
];

// Procurement Buyer Sub-Agents - Agent 266
const procurementBuyerSubAgents: SidebarCategory[] = [
  { id: 'rfq-issuer', label: 'AI RFQ Issuer', icon: Send, color: '#8B5CF6', route: '/ai-agent/supply-chain/sub-agents/rfq-issuer', count: 1 },
  { id: 'bid-analyzer', label: 'AI Bid Analyzer', icon: Search, color: '#8B5CF6', route: '/ai-agent/supply-chain/sub-agents/bid-analyzer', count: 1 },
  { id: 'order-placer', label: 'AI Order Placer', icon: ShoppingCart, color: '#8B5CF6', route: '/ai-agent/supply-chain/sub-agents/order-placer', count: 1 },
];

// Inventory Specialist Sub-Agents - Agent 267
const inventorySpecialistSubAgents: SidebarCategory[] = [
  { id: 'stock-optimizer', label: 'AI Stock Optimizer', icon: Package, color: '#EC4899', route: '/ai-agent/supply-chain/sub-agents/stock-optimizer', count: 1 },
  { id: 'abc-analyzer', label: 'AI ABC Analyzer', icon: BarChart3, color: '#EC4899', route: '/ai-agent/supply-chain/sub-agents/abc-analyzer', count: 1 },
  { id: 'obsolescence-tracker', label: 'AI Obsolescence Tracker', icon: TrendingDown, color: '#EC4899', route: '/ai-agent/supply-chain/sub-agents/obsolescence-tracker', count: 1 },
];

// Demand Planner Sub-Agents - Agent 268
const demandPlannerSubAgents: SidebarCategory[] = [
  { id: 'forecast-modeler', label: 'AI Forecast Modeler', icon: Brain, color: '#06B6D4', route: '/ai-agent/supply-chain/sub-agents/forecast-modeler', count: 1 },
  { id: 'seasonality-adjuster', label: 'AI Seasonality Adjuster', icon: Calendar, color: '#06B6D4', route: '/ai-agent/supply-chain/sub-agents/seasonality-adjuster', count: 1 },
  { id: 'bias-corrector', label: 'AI Bias Corrector', icon: RefreshCw, color: '#06B6D4', route: '/ai-agent/supply-chain/sub-agents/bias-corrector', count: 1 },
];

// Supplier Relations Sub-Agents - Agent 269
const supplierRelationsSubAgents: SidebarCategory[] = [
  { id: 'performance-scorer', label: 'AI Performance Scorer', icon: Star, color: '#F97316', route: '/ai-agent/supply-chain/sub-agents/performance-scorer', count: 1 },
  { id: 'risk-monitor', label: 'AI Risk Monitor', icon: AlertTriangle, color: '#F97316', route: '/ai-agent/supply-chain/sub-agents/risk-monitor', count: 1 },
  { id: 'relationship-manager', label: 'AI Relationship Manager', icon: Heart, color: '#F97316', route: '/ai-agent/supply-chain/sub-agents/relationship-manager', count: 1 },
];

// Shipping Coordinator Sub-Agents - Agent 270
const shippingCoordinatorSubAgents: SidebarCategory[] = [
  { id: 'carrier-booker', label: 'AI Carrier Booker', icon: Calendar, color: '#84CC16', route: '/ai-agent/supply-chain/sub-agents/carrier-booker', count: 1 },
  { id: 'document-preparer', label: 'AI Document Preparer', icon: FileText, color: '#84CC16', route: '/ai-agent/supply-chain/sub-agents/document-preparer', count: 1 },
  { id: 'tracking-monitor', label: 'AI Tracking Monitor', icon: Eye, color: '#84CC16', route: '/ai-agent/supply-chain/sub-agents/tracking-monitor', count: 1 },
];

// Fulfillment Specialist Sub-Agents - Agent 271
const fulfillmentSpecialistSubAgents: SidebarCategory[] = [
  { id: 'order-processor', label: 'AI Order Processor', icon: ClipboardList, color: '#6366F1', route: '/ai-agent/supply-chain/sub-agents/order-processor', count: 1 },
  { id: 'pick-list-generator', label: 'AI Pick List Generator', icon: List, color: '#6366F1', route: '/ai-agent/supply-chain/sub-agents/pick-list-generator', count: 1 },
  { id: 'packaging-optimizer', label: 'AI Packaging Optimizer', icon: Package, color: '#6366F1', route: '/ai-agent/supply-chain/sub-agents/packaging-optimizer', count: 1 },
];

// ═══════════════════════════════════════════════════════════════
// Government & Public Sector VP Level - Agents 250-261
const governmentVPHierarchy: SidebarCategory[] = [
  { id: 'chief-admin-officer', label: 'AI Chief Administrative Officer (Gov)', icon: Briefcase, color: '#78909C', route: '/ai-agent/government/chief-admin-officer', count: 3 },
  { id: 'vp-public-policy', label: 'AI VP Public Policy', icon: Landmark, color: '#78909C', route: '/ai-agent/government/vp-public-policy', count: 3 },
  { id: 'vp-regulatory-affairs', label: 'AI VP Regulatory Affairs', icon: FileCheck, color: '#78909C', route: '/ai-agent/government/vp-regulatory-affairs', count: 3 },
  { id: 'vp-public-engagement', label: 'AI VP Public Engagement', icon: Users, color: '#78909C', route: '/ai-agent/government/vp-public-engagement', count: 3 },
];

// Chief Admin Officer Sub-Agents - Agent 250
const chiefAdminSubAgents: SidebarCategory[] = [
  { id: 'public-sector-strategy-advisor', label: 'AI Public Sector Strategy Advisor', icon: Target, color: '#78909C', route: '/ai-agent/government/sub-agents/public-sector-strategy-advisor', count: 1 },
  { id: 'budget-allocator', label: 'AI Budget Allocator', icon: DollarSign, color: '#78909C', route: '/ai-agent/government/sub-agents/budget-allocator', count: 1 },
  { id: 'inter-agency-coordinator', label: 'AI Inter-agency Coordinator', icon: Handshake, color: '#78909C', route: '/ai-agent/government/sub-agents/inter-agency-coordinator', count: 1 },
];

// VP Public Policy Sub-Agents - Agent 251
const vpPublicPolicySubAgents: SidebarCategory[] = [
  { id: 'policy-researcher', label: 'AI Policy Researcher', icon: Search, color: '#78909C', route: '/ai-agent/government/sub-agents/policy-researcher', count: 1 },
  { id: 'stakeholder-mapper', label: 'AI Stakeholder Mapper', icon: Users, color: '#78909C', route: '/ai-agent/government/sub-agents/stakeholder-mapper', count: 1 },
  { id: 'impact-assessor', label: 'AI Impact Assessor', icon: BarChart3, color: '#78909C', route: '/ai-agent/government/sub-agents/impact-assessor', count: 1 },
];

// VP Regulatory Affairs Sub-Agents - Agent 252
const vpRegulatoryAffairsSubAgents: SidebarCategory[] = [
  { id: 'regulatory-tracker', label: 'AI Regulatory Tracker', icon: Activity, color: '#78909C', route: '/ai-agent/government/sub-agents/regulatory-tracker', count: 1 },
  { id: 'submission-coordinator', label: 'AI Submission Coordinator', icon: FileText, color: '#78909C', route: '/ai-agent/government/sub-agents/submission-coordinator', count: 1 },
  { id: 'comment-drafter', label: 'AI Comment Drafter', icon: PenTool, color: '#78909C', route: '/ai-agent/government/sub-agents/comment-drafter', count: 1 },
];

// VP Public Engagement Sub-Agents - Agent 253
const vpPublicEngagementSubAgents: SidebarCategory[] = [
  { id: 'community-outreach-planner', label: 'AI Community Outreach Planner', icon: Users, color: '#78909C', route: '/ai-agent/government/sub-agents/community-outreach-planner', count: 1 },
  { id: 'feedback-analyzer', label: 'AI Feedback Analyzer', icon: MessageCircle, color: '#78909C', route: '/ai-agent/government/sub-agents/feedback-analyzer', count: 1 },
  { id: 'communication-strategist', label: 'AI Communication Strategist', icon: Megaphone, color: '#78909C', route: '/ai-agent/government/sub-agents/communication-strategist', count: 1 },
];

// Government Manager & Specialist Level - Agents 254-261
const governmentAgentHierarchy: SidebarCategory[] = [
  { id: 'policy-manager', label: 'AI Policy Manager', icon: FileText, color: '#78909C', route: '/ai-agent/government/policy-manager', count: 3 },
  { id: 'grants-manager', label: 'AI Grants Manager', icon: DollarSign, color: '#78909C', route: '/ai-agent/government/grants-manager', count: 3 },
  { id: 'policy-analyst', label: 'AI Policy Analyst', icon: BarChart3, color: '#78909C', route: '/ai-agent/government/ai-policy-analyst', count: 3 },
  { id: 'regulatory-specialist', label: 'AI Regulatory Specialist', icon: ClipboardList, color: '#78909C', route: '/ai-agent/government/ai-regulatory-specialist', count: 3 },
  { id: 'public-affairs', label: 'AI Public Affairs Specialist', icon: MessageCircle, color: '#78909C', route: '/ai-agent/government/ai-public-affairs', count: 3 },
  { id: 'grants-specialist', label: 'AI Grants Specialist', icon: Handshake, color: '#78909C', route: '/ai-agent/government/ai-grants-specialist', count: 3 },
  { id: 'government-compliance', label: 'AI Government Compliance', icon: Shield, color: '#78909C', route: '/ai-agent/government/ai-government-compliance', count: 3 },
  { id: 'transparency-officer', label: 'AI Transparency Officer', icon: Eye, color: '#78909C', route: '/ai-agent/government/ai-transparency-officer', count: 3 },
];

// Policy Manager Sub-Agents - Agent 254
const policyManagerSubAgents: SidebarCategory[] = [
  { id: 'policy-drafter', label: 'AI Policy Drafter', icon: FileText, color: '#78909C', route: '/ai-agent/government/sub-agents/policy-drafter', count: 1 },
  { id: 'implementation-tracker', label: 'AI Implementation Tracker', icon: Activity, color: '#78909C', route: '/ai-agent/government/sub-agents/implementation-tracker', count: 1 },
  { id: 'review-scheduler', label: 'AI Review Scheduler', icon: Calendar, color: '#78909C', route: '/ai-agent/government/sub-agents/review-scheduler', count: 1 },
];

// Grants Manager Sub-Agents - Agent 255
const grantsManagerSubAgents: SidebarCategory[] = [
  { id: 'grant-opportunity-scanner', label: 'AI Grant Opportunity Scanner', icon: Search, color: '#78909C', route: '/ai-agent/government/sub-agents/grant-opportunity-scanner', count: 1 },
  { id: 'application-writer', label: 'AI Application Writer', icon: PenTool, color: '#78909C', route: '/ai-agent/government/sub-agents/application-writer', count: 1 },
  { id: 'compliance-reporter', label: 'AI Compliance Reporter', icon: FileText, color: '#78909C', route: '/ai-agent/government/sub-agents/compliance-reporter', count: 1 },
];

// Policy Analyst Sub-Agents - Agent 256
const policyAnalystSubAgents: SidebarCategory[] = [
  { id: 'data-analyst', label: 'AI Data Analyst', icon: BarChart3, color: '#78909C', route: '/ai-agent/government/sub-agents/data-analyst', count: 1 },
  { id: 'benchmark-researcher', label: 'AI Benchmark Researcher', icon: Search, color: '#78909C', route: '/ai-agent/government/sub-agents/benchmark-researcher', count: 1 },
  { id: 'recommendation-drafter', label: 'AI Recommendation Drafter', icon: FileText, color: '#78909C', route: '/ai-agent/government/sub-agents/recommendation-drafter', count: 1 },
];

// Regulatory Specialist Sub-Agents - Agent 257
const regulatorySpecialistSubAgents: SidebarCategory[] = [
  { id: 'regulation-interpreter', label: 'AI Regulation Interpreter', icon: BookOpen, color: '#78909C', route: '/ai-agent/government/sub-agents/regulation-interpreter', count: 1 },
  { id: 'compliance-gap-analyst', label: 'AI Compliance Gap Analyst', icon: Search, color: '#78909C', route: '/ai-agent/government/sub-agents/compliance-gap-analyst', count: 1 },
  { id: 'filing-coordinator', label: 'AI Filing Coordinator', icon: FileText, color: '#78909C', route: '/ai-agent/government/sub-agents/filing-coordinator', count: 1 },
];

// Public Affairs Specialist Sub-Agents - Agent 258
const publicAffairsSubAgents: SidebarCategory[] = [
  { id: 'press-release-writer', label: 'AI Press Release Writer', icon: PenTool, color: '#78909C', route: '/ai-agent/government/sub-agents/press-release-writer', count: 1 },
  { id: 'media-monitor', label: 'AI Media Monitor', icon: Eye, color: '#78909C', route: '/ai-agent/government/sub-agents/media-monitor', count: 1 },
  { id: 'crisis-communicator', label: 'AI Crisis Communicator', icon: Zap, color: '#78909C', route: '/ai-agent/government/sub-agents/crisis-communicator', count: 1 },
];

// Grants Specialist Sub-Agents - Agent 259
const grantsSpecialistSubAgents: SidebarCategory[] = [
  { id: 'budget-preparer', label: 'AI Budget Preparer', icon: DollarSign, color: '#78909C', route: '/ai-agent/government/sub-agents/budget-preparer', count: 1 },
  { id: 'performance-reporter', label: 'AI Performance Reporter', icon: FileText, color: '#78909C', route: '/ai-agent/government/sub-agents/performance-reporter', count: 1 },
  { id: 'audit-liaison', label: 'AI Audit Liaison', icon: UserCheck, color: '#78909C', route: '/ai-agent/government/sub-agents/audit-liaison', count: 1 },
];

// Government Compliance Sub-Agents - Agent 260
const governmentComplianceSubAgents: SidebarCategory[] = [
  { id: 'ethics-monitor', label: 'AI Ethics Monitor', icon: Shield, color: '#78909C', route: '/ai-agent/government/sub-agents/ethics-monitor', count: 1 },
  { id: 'reporting-automator', label: 'AI Reporting Automator', icon: RefreshCw, color: '#78909C', route: '/ai-agent/government/sub-agents/reporting-automator', count: 1 },
  { id: 'record-keeper', label: 'AI Record Keeper', icon: Database, color: '#78909C', route: '/ai-agent/government/sub-agents/record-keeper', count: 1 },
];

// Transparency Officer Sub-Agents - Agent 261
const transparencyOfficerSubAgents: SidebarCategory[] = [
  { id: 'data-publisher', label: 'AI Data Publisher', icon: Upload, color: '#78909C', route: '/ai-agent/government/sub-agents/data-publisher', count: 1 },
  { id: 'foia-responder', label: 'AI FOIA Responder', icon: FileText, color: '#78909C', route: '/ai-agent/government/sub-agents/foia-responder', count: 1 },
  { id: 'accountability-auditor', label: 'AI Accountability Auditor', icon: Search, color: '#78909C', route: '/ai-agent/government/sub-agents/accountability-auditor', count: 1 },
];

interface AIAgentsSidebarProps {
  activeCategory?: string;
  onCategoryPress?: (categoryId: string) => void;
  compact?: boolean;
}

export function AIAgentsSidebar({ activeCategory, onCategoryPress, compact }: AIAgentsSidebarProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = (category: SidebarCategory) => {
    if (onCategoryPress) {
      onCategoryPress(category.id);
    } else {
      router.push(category.route as any);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.card }]} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>AI Workforce</Text>
        <Text style={[styles.headerSubtitle, { color: colors.text + '80' }]}>1,108 Agents • 22 Departments</Text>
      </View>

      {/* 22 Departments - 1,108 Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>All 22 Departments</Text>
        {/* Line 1-3: Depts 1-9 */}
        <View style={styles.line}>
          {departmentCategories.slice(0, 3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {departmentCategories.slice(3, 6).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {departmentCategories.slice(6, 9).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Line 4-6: Depts 10-15 */}
        <View style={styles.line}>
          {departmentCategories.slice(9, 12).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {departmentCategories.slice(12, 15).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Line 7-8: Depts 16-22 */}
        <View style={styles.line}>
          {departmentCategories.slice(15, 18).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {departmentCategories.slice(18, 22).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Original Header */}
      <View style={[styles.header, { marginTop: 20 }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>AI Departments</Text>
        <Text style={[styles.headerSubtitle, { color: colors.text + '60' }]}>28+ Agent Categories</Text>
      </View>

      {/* Line 1: Executive, Accounting, Customer Experience */}
      <View style={styles.line}>
        {categories.slice(0, 3).map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryCard,
              { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
              activeCategory === cat.id && { borderWidth: 2 },
            ]}
            onPress={() => handlePress(cat)}
          >
            <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
              <cat.icon size={compact ? 20 : 24} color={cat.color} />
            </View>
            <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>
              {cat.label}
            </Text>
            <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
              <Text style={styles.countText}>{cat.count}</Text>
            </View>
            <ChevronRight size={14} color={colors.text + '60'} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Line 2: Sales, Marketing, Product */}
      <View style={styles.line}>
        {categories.slice(3, 6).map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryCard,
              { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
              activeCategory === cat.id && { borderWidth: 2 },
            ]}
            onPress={() => handlePress(cat)}
          >
            <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
              <cat.icon size={compact ? 20 : 24} color={cat.color} />
            </View>
            <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>
              {cat.label}
            </Text>
            <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
              <Text style={styles.countText}>{cat.count}</Text>
            </View>
            <ChevronRight size={14} color={colors.text + '60'} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Line 3: Operations, Social Media, Data */}
      <View style={styles.line}>
        {categories.slice(6, 9).map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryCard,
              { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
              activeCategory === cat.id && { borderWidth: 2 },
            ]}
            onPress={() => handlePress(cat)}
          >
            <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
              <cat.icon size={compact ? 20 : 24} color={cat.color} />
            </View>
            <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>
              {cat.label}
            </Text>
            <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
              <Text style={styles.countText}>{cat.count}</Text>
            </View>
            <ChevronRight size={14} color={colors.text + '60'} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Line 4: Loyalty & Engagement, Feedback & Survey, Billing Support */}
      <View style={styles.line}>
        {cxSubAgentCategories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryCard,
              { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
              activeCategory === cat.id && { borderWidth: 2 },
            ]}
            onPress={() => handlePress(cat)}
          >
            <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
              <cat.icon size={compact ? 20 : 24} color={cat.color} />
            </View>
            <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>
              {cat.label}
            </Text>
            <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
              <Text style={styles.countText}>{cat.count}</Text>
            </View>
            <ChevronRight size={14} color={colors.text + '60'} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Customer VP & Executive Hierarchy - Agents 1-6 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Customer VP & Executive Agents</Text>
        <View style={styles.line}>
          {customerVPHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {customerVPHierarchy.slice(3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Customer Agent Hierarchy - Agents 7-14 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Customer Agent Hierarchy</Text>
        <View style={styles.line}>
          {customerAgentHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {customerAgentHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {customerAgentHierarchy.slice(6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sales & Revenue Sub-Agents - Agents 21-25 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Sales & Revenue Agents</Text>
        <View style={styles.line}>
          {salesSubAgentCategories.slice(0, 3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {salesSubAgentCategories.slice(3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sales VP & Manager Sub-Agents - Agents 15-20 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Sales VP & Manager Agents</Text>
        <View style={styles.line}>
          {salesVPSubAgentCategories.slice(0, 3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {salesVPSubAgentCategories.slice(3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sales VP & Executive Hierarchy - Agents 15-18 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Sales VP & Executive Agents</Text>
        <View style={styles.line}>
          {salesVPHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {salesVPHierarchy.slice(3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sales Manager & Agent Hierarchy - Agents 19-28 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Sales Manager & Agent Hierarchy</Text>
        <View style={styles.line}>
          {salesManagerHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {salesManagerHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {salesManagerHierarchy.slice(6, 9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {salesManagerHierarchy.slice(9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Marketing Sub-Agents - Agents 36-41 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Marketing Agents</Text>
        <View style={styles.line}>
          {marketingSubAgentCategories.slice(0, 3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {marketingSubAgentCategories.slice(3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Marketing VP & Manager Hierarchy - Agents 29-35 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Marketing VP & Manager Agents</Text>
        <View style={styles.line}>
          {marketingVPHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {marketingVPHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {marketingVPHierarchy.slice(6).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Operations & Finance Agent Hierarchy - Agents 55-59 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Operations & Finance Agents</Text>
        <View style={styles.line}>
          {operationsFinanceCategories.slice(0, 3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {operationsFinanceCategories.slice(3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Finance Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Finance Sub-Agents</Text>
        <View style={styles.line}>
          {financeSubAgentCategories.slice(0, 3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {financeSubAgentCategories.slice(3, 6).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {financeSubAgentCategories.slice(6).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Operations Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Operations Sub-Agents</Text>
        <View style={styles.line}>
          {operationsSubAgentCategories.slice(0, 3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {operationsSubAgentCategories.slice(3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Operations VP & Agent Hierarchy - Agents 48-54 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Operations VP & Agent Hierarchy</Text>
        <View style={styles.line}>
          {operationsVPHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {operationsVPHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {operationsVPHierarchy.slice(6).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={compact ? 20 : 24} color={cat.color} />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.countText}>{cat.count}</Text>
              </View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Finance VP & Manager Hierarchy - Agents 60-69 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Finance VP & Manager Agents (60-69)</Text>
        <View style={styles.line}>
          {financeVPHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {financeVPHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {financeVPHierarchy.slice(6, 9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {financeVPHierarchy.slice(9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tech VP & Lead Hierarchy - Agents 70-80 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Tech VP & Lead Agents (70-80)</Text>
        <View style={styles.line}>
          {techVPHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {techVPHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {techVPHierarchy.slice(6, 9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {techVPHierarchy.slice(9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* New Features Section */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>New Features</Text>
        <View style={styles.featureGrid}>
          {featureCategories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.featureCard,
                { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
                activeCategory === cat.id && { borderWidth: 2 },
              ]}
              onPress={() => handlePress(cat)}
            >
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}>
                <cat.icon size={22} color={cat.color} />
              </View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>
                {cat.label}
              </Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}>
                <Text style={styles.featureCountText}>{cat.count}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* HR VP & Specialist Hierarchy - Agents 90-96 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>HR VP & Specialist Agents</Text>
        <View style={styles.line}>
          {hrVPSpecialistHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {hrVPSpecialistHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {hrVPSpecialistHierarchy.slice(6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* HR Sub-Agents - Agents 90-96 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>HR Sub-Agents</Text>
        <View style={styles.line}>
          {hrSubAgentCategories.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {hrSubAgentCategories.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {hrSubAgentCategories.slice(6, 9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {hrSubAgentCategories.slice(9, 12).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {hrSubAgentCategories.slice(12, 15).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {hrSubAgentCategories.slice(15, 18).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {hrSubAgentCategories.slice(18).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Legal CLO & VP Hierarchy - Agents 97-100 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Legal CLO & VP Agents</Text>
        <View style={styles.line}>
          {legalVPHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {legalVPHierarchy.slice(3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Legal Sub-Agents - Agents 97-100 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Legal Sub-Agents</Text>
        <View style={styles.line}>
          {legalSubAgentCategories.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {legalSubAgentCategories.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {legalSubAgentCategories.slice(6, 9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {legalSubAgentCategories.slice(9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Legal & Governance VP Agents - Agents 101-106 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Legal & Governance VP Agents (101-106)</Text>
        <View style={styles.line}>
          {legalGovVPAgents.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {legalGovVPAgents.slice(3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Administrative Division Hierarchy - Agents 151-159 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Administrative Division (151-159)</Text>
        <View style={styles.line}>
          {administrativeHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {administrativeHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {administrativeHierarchy.slice(6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Data & AI Leadership Agents - Agents 107-109 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Data & AI Leadership (107-109)</Text>
        <View style={styles.line}>
          {dataAILeadership.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* IP Sub-Agents - Agent 101 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>IP Sub-Agents (101)</Text>
        <View style={styles.line}>
          {ipSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Governance Sub-Agents - Agent 102 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Governance Sub-Agents (102)</Text>
        <View style={styles.line}>
          {governanceSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Compliance Manager Sub-Agents - Agent 103 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Compliance Mgr Sub-Agents (103)</Text>
        <View style={styles.line}>
          {complianceMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Legal Researcher Sub-Agents - Agent 104 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Legal Research Sub-Agents (104)</Text>
        <View style={styles.line}>
          {legalResearchSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Contract Specialist Sub-Agents - Agent 105 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Contract Sub-Agents (105)</Text>
        <View style={styles.line}>
          {contractSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Compliance Analyst Sub-Agents - Agent 106 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Compliance Analyst Sub-Agents (106)</Text>
        <View style={styles.line}>
          {complianceAnalystSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* CDAIO Sub-Agents - Agent 107 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>CDAIO Sub-Agents (107)</Text>
        <View style={styles.line}>
          {cdaioSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* VP Data Science Sub-Agents - Agent 108 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Data Science Sub-Agents (108)</Text>
        <View style={styles.line}>
          {vpDataScienceSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* VP Data Engineering Sub-Agents - Agent 109 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Data Eng Sub-Agents (109)</Text>
        <View style={styles.line}>
          {vpDataEngSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Data & Intelligence Agents - Agents 110-120 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Data & Intelligence Agents (110-120)</Text>
        <View style={styles.line}>
          {dataIntelligenceAgents.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {dataIntelligenceAgents.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {dataIntelligenceAgents.slice(6, 9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {dataIntelligenceAgents.slice(9, 11).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* VP Analytics Sub-Agents - Agent 110 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Analytics Sub-Agents (110)</Text>
        <View style={styles.line}>
          {vpAnalyticsSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* VP Business Intelligence Sub-Agents - Agent 111 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Business Intel Sub-Agents (111)</Text>
        <View style={styles.line}>
          {vpBISubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Data Manager Sub-Agents - Agent 112 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Data Manager Sub-Agents (112)</Text>
        <View style={styles.line}>
          {dataManagerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Analytics Manager Sub-Agents - Agent 113 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Analytics Mgr Sub-Agents (113)</Text>
        <View style={styles.line}>
          {analyticsManagerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI Data Scientist Sub-Agents - Agent 114 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Data Scientist Sub-Agents (114)</Text>
        <View style={styles.line}>
          {dataScientistSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI Data Analyst Sub-Agents - Agent 115 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Data Analyst Sub-Agents (115)</Text>
        <View style={styles.line}>
          {dataAnalystSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI BI Developer Sub-Agents - Agent 116 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>BI Developer Sub-Agents (116)</Text>
        <View style={styles.line}>
          {biDeveloperSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI ML Engineer Sub-Agents - Agent 117 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>ML Engineer Sub-Agents (117)</Text>
        <View style={styles.line}>
          {mlEngineerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI Data Steward Sub-Agents - Agent 118 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Data Steward Sub-Agents (118)</Text>
        <View style={styles.line}>
          {dataStewardSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI Analytics Specialist Sub-Agents - Agent 119 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Analytics Specialist Sub-Agents (119)</Text>
        <View style={styles.line}>
          {analyticsSpecialistSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AI VP Product Sub-Agents - Agent 120 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Product Sub-Agents (120)</Text>
        <View style={styles.line}>
          {vpProductSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Product VP & Manager Hierarchy - Agents 121-129 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Product Leadership (121-129)</Text>
        <View style={styles.line}>
          {productVPHierarchy.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* CISO Agent - Agent 130 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Security Leadership (130)</Text>
        <View style={styles.line}>
          {cisoAgent.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Product Sub-Agents - Agents 121-129 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Product Sub-Agents (121-129)</Text>
        <View style={styles.featureGrid}>
          {productSubAgents121.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* CISO Sub-Agents - Agent 130 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>CISO Sub-Agents (130)</Text>
        <View style={styles.featureGrid}>
          {cisoSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Security VP & Agents (131-141) - 3 Line Sidebar Section */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Security VP & Agents (131-141)</Text>
        {/* Line 1: VP Security Ops, VP Cybersecurity, VP Governance & Risk */}
        <View style={styles.line}>
          {securityVPHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Line 2: VP Privacy, Security Architect, SOC Manager */}
        <View style={styles.line}>
          {securityVPHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Line 3: Security Analyst, Incident Responder, Security Compliance */}
        <View style={styles.line}>
          {securityVPHierarchy.slice(6, 9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Line 4: Penetration Tester, Identity Manager */}
        <View style={styles.line}>
          {securityVPHierarchy.slice(9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Security VP & Agents Sub-Agents (131-141) - 3 Line Grid */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Security Sub-Agents (131-141)</Text>
        <View style={styles.featureGrid}>
          {securityVPSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Additional categories in scrollable list */}
      <View style={styles.moreSection}>
        <Text style={[styles.moreTitle, { color: colors.text + '60' }]}>More Departments</Text>
        {categories.slice(9).map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.moreCard,
              { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border },
              activeCategory === cat.id && { borderWidth: 2 },
            ]}
            onPress={() => handlePress(cat)}
          >
            <View style={[styles.moreIconContainer, { backgroundColor: cat.color + '15' }]}>
              <cat.icon size={20} color={cat.color} />
            </View>
            <View style={styles.moreInfo}>
              <Text style={[styles.moreLabel, { color: colors.text }]}>{cat.label}</Text>
              <Text style={[styles.moreSub, { color: colors.text + '60' }]}>{cat.count} AI Agents</Text>
            </View>
            <ChevronRight size={16} color={colors.text + '60'} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Real Estate & Property Hierarchy - Agents 178-191 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Real Estate & Property Agents (178-191)</Text>
        <View style={styles.line}>
          {realestateHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {realestateHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {realestateHierarchy.slice(6, 9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {realestateHierarchy.slice(9, 12).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {realestateHierarchy.slice(12).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 178. CREO Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>CREO Sub-Agents (178)</Text>
        <View style={styles.featureGrid}>
          {creoSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 179. VP Property Management Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Property Management Sub-Agents (179)</Text>
        <View style={styles.featureGrid}>
          {vpPropertyMgmtSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 180. VP Real Estate Development Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Real Estate Development Sub-Agents (180)</Text>
        <View style={styles.featureGrid}>
          {vpRealEstateDevSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 181. Property Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Property Manager Sub-Agents (181)</Text>
        <View style={styles.featureGrid}>
          {propertyManagerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 182. Leasing Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Leasing Manager Sub-Agents (182)</Text>
        <View style={styles.featureGrid}>
          {leasingManagerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 183. Facilities Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Facilities Manager Sub-Agents (183)</Text>
        <View style={styles.featureGrid}>
          {facilitiesManagerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 184. Property Analyst Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Property Analyst Sub-Agents (184)</Text>
        <View style={styles.featureGrid}>
          {propertyAnalystSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 185. Lease Administrator Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Lease Administrator Sub-Agents (185)</Text>
        <View style={styles.featureGrid}>
          {leaseAdminSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 186. Tenant Relations Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Tenant Relations Sub-Agents (186)</Text>
        <View style={styles.featureGrid}>
          {tenantRelationsSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 187. Maintenance Coordinator Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Maintenance Coordinator Sub-Agents (187)</Text>
        <View style={styles.featureGrid}>
          {maintenanceCoordSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 188. Acquisition Analyst Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Acquisition Analyst Sub-Agents (188)</Text>
        <View style={styles.featureGrid}>
          {acquisitionAnalystSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 189. Asset Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Asset Manager Sub-Agents (189)</Text>
        <View style={styles.featureGrid}>
          {assetManagerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 190. Development Coordinator Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Development Coordinator Sub-Agents (190)</Text>
        <View style={styles.featureGrid}>
          {developmentCoordSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 191. Property Marketing Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Property Marketing Sub-Agents (191)</Text>
        <View style={styles.featureGrid}>
          {propertyMarketingSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Trading & Investments Hierarchy - Agents 160-177 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Trading & Investments Agents (160-177)</Text>
        {/* Line 1: C-Suite + VP */}
        <View style={styles.line}>
          {tradingHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Line 2: Managers */}
        <View style={styles.line}>
          {tradingHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Line 3: Specialists */}
        <View style={styles.line}>
          {tradingHierarchy.slice(6, 9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Line 4: Derivatives + Analysts */}
        <View style={styles.line}>
          {tradingHierarchy.slice(9, 12).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Line 5: Compliance + Quant/Research */}
        <View style={styles.line}>
          {tradingHierarchy.slice(12, 15).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Line 6: Developer + Settlement */}
        <View style={styles.line}>
          {tradingHierarchy.slice(15, 18).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 160. CIO Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>CIO Sub-Agents (160)</Text>
        <View style={styles.featureGrid}>
          {cioSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 161. VP Trading Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Trading Sub-Agents (161)</Text>
        <View style={styles.featureGrid}>
          {vpTradingSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 162. VP Investments Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Investments Sub-Agents (162)</Text>
        <View style={styles.featureGrid}>
          {vpInvestmentsSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 163. Trading Desk Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Trading Desk Manager Sub-Agents (163)</Text>
        <View style={styles.featureGrid}>
          {tradingDeskMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 164. Portfolio Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Portfolio Manager Sub-Agents (164)</Text>
        <View style={styles.featureGrid}>
          {portfolioMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 165. Trading Risk Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Trading Risk Manager Sub-Agents (165)</Text>
        <View style={styles.featureGrid}>
          {tradingRiskMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 166. Equity Trader Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Equity Trader Sub-Agents (166)</Text>
        <View style={styles.featureGrid}>
          {equityTraderSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 167. Forex Trader Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Forex Trader Sub-Agents (167)</Text>
        <View style={styles.featureGrid}>
          {forexTraderSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 168. Crypto Trader Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Crypto Trader Sub-Agents (168)</Text>
        <View style={styles.featureGrid}>
          {cryptoTraderSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 169. Derivatives Specialist Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Derivatives Specialist Sub-Agents (169)</Text>
        <View style={styles.featureGrid}>
          {derivativesSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 170. Portfolio Analyst Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Portfolio Analyst Sub-Agents (170)</Text>
        <View style={styles.featureGrid}>
          {portfolioAnalystSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 171. Trading Risk Analyst Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Trading Risk Analyst Sub-Agents (171)</Text>
        <View style={styles.featureGrid}>
          {tradingRiskAnalystSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 172. Trading Compliance Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Trading Compliance Sub-Agents (172)</Text>
        <View style={styles.featureGrid}>
          {tradingComplianceSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 173. Quant Analyst Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Quantitative Analyst Sub-Agents (173)</Text>
        <View style={styles.featureGrid}>
          {quantAnalystSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 174. ESG Analyst Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>ESG Analyst Sub-Agents (174)</Text>
        <View style={styles.featureGrid}>
          {esgAnalystSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 175. Macro Analyst Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Macro Analyst Sub-Agents (175)</Text>
        <View style={styles.featureGrid}>
          {macroAnalystSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 176. Algo Trading Developer Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Algo Trading Developer Sub-Agents (176)</Text>
        <View style={styles.featureGrid}>
          {algoDevSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 177. Settlement Specialist Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Settlement Specialist Sub-Agents (177)</Text>
        <View style={styles.featureGrid}>
          {settlementSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Insurance & Risk VP & Executive Hierarchy - Agents 192-195 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Insurance & Risk VP & Executive Agents (192-195)</Text>
        <View style={styles.line}>
          {insuranceVPHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {insuranceVPHierarchy.slice(3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Insurance Manager & Agent Hierarchy - Agents 196-207 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Insurance Manager & Agent Hierarchy (196-207)</Text>
        <View style={styles.line}>
          {insuranceAgentHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {insuranceAgentHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {insuranceAgentHierarchy.slice(6, 9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {insuranceAgentHierarchy.slice(9, 12).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 192. CRO Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>CRO Sub-Agents (192)</Text>
        <View style={styles.featureGrid}>
          {croSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 193. VP Underwriting Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Underwriting Sub-Agents (193)</Text>
        <View style={styles.featureGrid}>
          {vpUnderwritingSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 194. VP Claims Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Claims Sub-Agents (194)</Text>
        <View style={styles.featureGrid}>
          {vpClaimsSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 195. VP Risk Assessment Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Risk Assessment Sub-Agents (195)</Text>
        <View style={styles.featureGrid}>
          {vpRiskAssessmentSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 196. Underwriting Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Underwriting Manager Sub-Agents (196)</Text>
        <View style={styles.featureGrid}>
          {underwritingMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 197. Claims Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Claims Manager Sub-Agents (197)</Text>
        <View style={styles.featureGrid}>
          {claimsMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 198. Policy Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Policy Manager Sub-Agents (198)</Text>
        <View style={styles.featureGrid}>
          {policyMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 199. Underwriter Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Underwriter Sub-Agents (199)</Text>
        <View style={styles.featureGrid}>
          {underwriterSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 200. Claims Adjuster Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Claims Adjuster Sub-Agents (200)</Text>
        <View style={styles.featureGrid}>
          {claimsAdjusterSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 201. Fraud Detection Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Fraud Detection Sub-Agents (201)</Text>
        <View style={styles.featureGrid}>
          {fraudDetectionSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 202. Actuary Analyst Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Actuary Analyst Sub-Agents (202)</Text>
        <View style={styles.featureGrid}>
          {actuaryAnalystSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 203. Risk Modeler Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Risk Modeler Sub-Agents (203)</Text>
        <View style={styles.featureGrid}>
          {riskModelerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 204. Policy Admin Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Policy Admin Sub-Agents (204)</Text>
        <View style={styles.featureGrid}>
          {policyAdminSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 205. Customer Risk Analyst Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Customer Risk Analyst Sub-Agents (205)</Text>
        <View style={styles.featureGrid}>
          {customerRiskAnalystSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 206. Catastrophe Modeler Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Catastrophe Modeler Sub-Agents (206)</Text>
        <View style={styles.featureGrid}>
          {catastropheModelerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 207. Reinsurance Specialist Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Reinsurance Specialist Sub-Agents (207)</Text>
        <View style={styles.featureGrid}>
          {reinsuranceSpecSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Healthcare & Medical VP & Executive Hierarchy - Agents 208-210 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Healthcare & Medical VP & Executive Agents (208-210)</Text>
        <View style={styles.line}>
          {healthcareVPHierarchy.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Healthcare Manager & Specialist Hierarchy - Agents 211-221 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Healthcare Manager & Specialist Agents (211-221)</Text>
        <View style={styles.line}>
          {healthcareManagerHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {healthcareManagerHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {healthcareManagerHierarchy.slice(6, 9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {healthcareManagerHierarchy.slice(9).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 208. CMO Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Chief Medical Officer Sub-Agents (208)</Text>
        <View style={styles.featureGrid}>
          {cmoSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 209. VP Healthcare Ops Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Healthcare Ops Sub-Agents (209)</Text>
        <View style={styles.featureGrid}>
          {vpHealthcareOpsSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 210. VP Patient Experience Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Patient Experience Sub-Agents (210)</Text>
        <View style={styles.featureGrid}>
          {vpPatientExpSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 211. Patient Services Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Patient Services Manager Sub-Agents (211)</Text>
        <View style={styles.featureGrid}>
          {patientServicesMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 212. Medical Billing Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Medical Billing Manager Sub-Agents (212)</Text>
        <View style={styles.featureGrid}>
          {medBillingMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 213. Scheduling Manager Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Scheduling Manager Sub-Agents (213)</Text>
        <View style={styles.featureGrid}>
          {schedulingMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 214. Patient Coordinator Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Patient Coordinator Sub-Agents (214)</Text>
        <View style={styles.featureGrid}>
          {patientCoordSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 215. Medical Coder Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Medical Coder Sub-Agents (215)</Text>
        <View style={styles.featureGrid}>
          {medCoderSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 216. Billing Specialist Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Billing Specialist Sub-Agents (216)</Text>
        <View style={styles.featureGrid}>
          {billingSpecSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 217. Care Coordinator Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Care Coordinator Sub-Agents (217)</Text>
        <View style={styles.featureGrid}>
          {careCoordSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 218. Health Records Specialist Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Health Records Specialist Sub-Agents (218)</Text>
        <View style={styles.featureGrid}>
          {healthRecordsSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 219. Telehealth Support Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Telehealth Support Sub-Agents (219)</Text>
        <View style={styles.featureGrid}>
          {telehealthSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 220. Healthcare Compliance Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Healthcare Compliance Sub-Agents (220)</Text>
        <View style={styles.featureGrid}>
          {healthcareComplianceSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 221. Quality Improvement Specialist Sub-Agents */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Quality Improvement Specialist Sub-Agents (221)</Text>
        <View style={styles.featureGrid}>
          {qualityImprovSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MANUFACTURING & PRODUCTION - Agents 222-235 */}
      {/* ═══════════════════════════════════════════════════════════ */}

      {/* Manufacturing C-Suite & VP Level - Agents 222-224 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Manufacturing C-Suite & VP Agents</Text>
        <View style={styles.line}>
          {manufacturingCSuiteVP.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Manufacturing Manager Level - Agents 225-227 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Manufacturing Manager Agents</Text>
        <View style={styles.line}>
          {manufacturingManagers.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Manufacturing Specialist Level - Agents 228-235 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Manufacturing Specialist Agents</Text>
        <View style={styles.line}>
          {manufacturingSpecialists.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {manufacturingSpecialists.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.line}>
          {manufacturingSpecialists.slice(6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.categoryCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.iconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={compact ? 20 : 24} color={cat.color} /></View>
              <Text style={[styles.categoryLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.countBadge, { backgroundColor: cat.color }]}><Text style={styles.countText}>{cat.count}</Text></View>
              <ChevronRight size={14} color={colors.text + '60'} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* CPO Sub-Agents - Agent 222 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>CPO Sub-Agents (222)</Text>
        <View style={styles.featureGrid}>
          {cpoSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* VP Manufacturing Sub-Agents - Agent 223 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Manufacturing Sub-Agents (223)</Text>
        <View style={styles.featureGrid}>
          {vpMfgSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* VP Quality Assurance Sub-Agents - Agent 224 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Quality Assurance Sub-Agents (224)</Text>
        <View style={styles.featureGrid}>
          {vpQASubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Production Manager Sub-Agents - Agent 225 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Production Manager Sub-Agents (225)</Text>
        <View style={styles.featureGrid}>
          {prodMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quality Manager Sub-Agents - Agent 226 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Quality Manager Sub-Agents (226)</Text>
        <View style={styles.featureGrid}>
          {qualMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Safety Manager Sub-Agents - Agent 227 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Safety Manager Sub-Agents (227)</Text>
        <View style={styles.featureGrid}>
          {safetyMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Manufacturing Specialist Sub-Agents - Agents 228-235 */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Manufacturing Specialist Sub-Agents (228-235)</Text>
        <View style={styles.featureGrid}>
          {mfgSpecialistSubAgents.slice(0, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.featureGrid}>
          {mfgSpecialistSubAgents.slice(6, 12).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.featureGrid}>
          {mfgSpecialistSubAgents.slice(12, 18).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.featureGrid}>
          {mfgSpecialistSubAgents.slice(18).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ═══════ TRANSPORTATION & LOGISTICS - Agents 236-249 ═══════ */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Transportation & Logistics (236-249)</Text>
        <View style={styles.featureGrid}>
          {transportationVPHierarchy.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>CLO Sub-Agents (236)</Text>
        <View style={styles.featureGrid}>
          {cloLogisticsSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Transportation Sub-Agents (237)</Text>
        <View style={styles.featureGrid}>
          {vpTransportSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Logistics Ops Sub-Agents (238)</Text>
        <View style={styles.featureGrid}>
          {vpLogOpsSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Transportation Managers (239-241)</Text>
        <View style={styles.featureGrid}>
          {transportationManagerHierarchy.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Fleet Manager Sub-Agents (239)</Text>
        <View style={styles.featureGrid}>
          {fleetManagerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Warehouse Manager Sub-Agents (240)</Text>
        <View style={styles.featureGrid}>
          {warehouseManagerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Distribution Manager Sub-Agents (241)</Text>
        <View style={styles.featureGrid}>
          {distributionManagerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Transportation Specialists (242-249)</Text>
        <View style={styles.featureGrid}>
          {transportationSpecialistHierarchy.slice(0, 4).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.featureGrid}>
          {transportationSpecialistHierarchy.slice(4).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Route Optimizer Sub-Agents (242)</Text>
        <View style={styles.featureGrid}>
          {routeOptimizerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Fleet Coordinator Sub-Agents (243)</Text>
        <View style={styles.featureGrid}>
          {fleetCoordinatorSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Warehouse Operator Sub-Agents (244)</Text>
        <View style={styles.featureGrid}>
          {warehouseOperatorSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Dispatcher Sub-Agents (245)</Text>
        <View style={styles.featureGrid}>
          {dispatcherSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Tracking Specialist Sub-Agents (246)</Text>
        <View style={styles.featureGrid}>
          {trackingSpecialistSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Last Mile Sub-Agents (247)</Text>
        <View style={styles.featureGrid}>
          {lastMileSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Freight Broker Sub-Agents (248)</Text>
        <View style={styles.featureGrid}>
          {freightBrokerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Customs Specialist Sub-Agents (249)</Text>
        <View style={styles.featureGrid}>
          {customsSpecialistSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ═══════ SUPPLY CHAIN & LOGISTICS - Agents 262-271 ═══════ */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Supply Chain & Logistics (262-271)</Text>
        <View style={styles.featureGrid}>
          {supplyChainVPHierarchy.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Supply Chain Managers (263-271)</Text>
        <View style={styles.featureGrid}>
          {supplyChainManagerHierarchy.slice(0, 3).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.featureGrid}>
          {supplyChainManagerHierarchy.slice(3, 6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.featureGrid}>
          {supplyChainManagerHierarchy.slice(6).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Supply Chain Sub-Agents (262)</Text>
        <View style={styles.featureGrid}>
          {vpSupplyChainSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Procurement Manager Sub-Agents (263)</Text>
        <View style={styles.featureGrid}>
          {procurementMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Logistics Manager Sub-Agents (264)</Text>
        <View style={styles.featureGrid}>
          {logisticsMgrSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Warehouse Lead Sub-Agents (265)</Text>
        <View style={styles.featureGrid}>
          {warehouseLeadSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Procurement Buyer Sub-Agents (266)</Text>
        <View style={styles.featureGrid}>
          {procurementBuyerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Inventory Specialist Sub-Agents (267)</Text>
        <View style={styles.featureGrid}>
          {inventorySpecialistSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Demand Planner Sub-Agents (268)</Text>
        <View style={styles.featureGrid}>
          {demandPlannerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Supplier Relations Sub-Agents (269)</Text>
        <View style={styles.featureGrid}>
          {supplierRelationsSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Shipping Coordinator Sub-Agents (270)</Text>
        <View style={styles.featureGrid}>
          {shippingCoordinatorSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Fulfillment Specialist Sub-Agents (271)</Text>
        <View style={styles.featureGrid}>
          {fulfillmentSpecialistSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ═══════ AI MANAGEMENT & GOVERNANCE - Agents 272-277 ═══════ */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>AI Management & Governance (272-277)</Text>
        <View style={styles.featureGrid}>
          {aiMgmtHierarchy.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>CAO Sub-Agents (272)</Text>
        <View style={styles.featureGrid}>
          {caoSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Automation Sub-Agents (273)</Text>
        <View style={styles.featureGrid}>
          {vpAutomationSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Process Excellence Sub-Agents (274)</Text>
        <View style={styles.featureGrid}>
          {vpProcessSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Automation Ops Director Sub-Agents (275)</Text>
        <View style={styles.featureGrid}>
          {automationOpsSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>RPA Manager Sub-Agents (276)</Text>
        <View style={styles.featureGrid}>
          {rpaManagerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Workflow Specialist Sub-Agents (277)</Text>
        <View style={styles.featureGrid}>
          {workflowSpecialistSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ═══════ GOVERNMENT & PUBLIC SECTOR - Agents 250-261 ═══════ */}
      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Government & Public Sector (250-261)</Text>
        <View style={styles.featureGrid}>
          {governmentVPHierarchy.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Government Managers & Specialists (254-261)</Text>
        <View style={styles.featureGrid}>
          {governmentAgentHierarchy.slice(0, 4).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.featureGrid}>
          {governmentAgentHierarchy.slice(4).map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
              <View style={[styles.featureCountBadge, { backgroundColor: cat.color }]}><Text style={styles.featureCountText}>{cat.count}</Text></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Chief Admin Officer Sub-Agents (250)</Text>
        <View style={styles.featureGrid}>
          {chiefAdminSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Public Policy Sub-Agents (251)</Text>
        <View style={styles.featureGrid}>
          {vpPublicPolicySubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Regulatory Affairs Sub-Agents (252)</Text>
        <View style={styles.featureGrid}>
          {vpRegulatoryAffairsSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>VP Public Engagement Sub-Agents (253)</Text>
        <View style={styles.featureGrid}>
          {vpPublicEngagementSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Policy Manager Sub-Agents (254)</Text>
        <View style={styles.featureGrid}>
          {policyManagerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Grants Manager Sub-Agents (255)</Text>
        <View style={styles.featureGrid}>
          {grantsManagerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Policy Analyst Sub-Agents (256)</Text>
        <View style={styles.featureGrid}>
          {policyAnalystSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Regulatory Specialist Sub-Agents (257)</Text>
        <View style={styles.featureGrid}>
          {regulatorySpecialistSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Public Affairs Specialist Sub-Agents (258)</Text>
        <View style={styles.featureGrid}>
          {publicAffairsSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Grants Specialist Sub-Agents (259)</Text>
        <View style={styles.featureGrid}>
          {grantsSpecialistSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Government Compliance Sub-Agents (260)</Text>
        <View style={styles.featureGrid}>
          {governmentComplianceSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.featureSection}>
        <Text style={[styles.featureTitle, { color: colors.text + '60' }]}>Transparency Officer Sub-Agents (261)</Text>
        <View style={styles.featureGrid}>
          {transparencyOfficerSubAgents.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.featureCard, { backgroundColor: colors.background, borderColor: activeCategory === cat.id ? cat.color : colors.border }, activeCategory === cat.id && { borderWidth: 2 }]} onPress={() => handlePress(cat)}>
              <View style={[styles.featureIconContainer, { backgroundColor: cat.color + '15' }]}><cat.icon size={20} color={cat.color} /></View>
              <Text style={[styles.featureLabel, { color: colors.text }]} numberOfLines={2}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  line: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  categoryCard: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
    marginBottom: 4,
  },
  countBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  featureSection: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureCard: {
    width: '31%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    position: 'relative',
  },
  featureIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
  featureCountBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureCountText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  moreSection: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 20,
  },
  moreTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  moreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 6,
  },
  moreIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreInfo: {
    flex: 1,
    marginLeft: 12,
  },
  moreLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  moreSub: {
    fontSize: 11,
    marginTop: 1,
  },
});
