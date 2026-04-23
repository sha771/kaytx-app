/**
 * =============================================================================
 * AI AGENTS & EMPLOYEES - HIERARCHICAL DASHBOARD
 * =============================================================================
 *
 * Complete organizational hierarchy with 4 Tiers:
 * - Tier 1: C-Suite Executives (17 agents)
 * - Tier 2: Advanced Command Center
 * - Tier 3: Departments (21 teams)
 * - Tier 4: AI Agent Workforce (199 agents)
 *
 * Subsections:
 * 1. Executive and Leadership
 * 2. Command Center
 * 3. Main Agents
 * 4. Sub Agents
 * 5. AI Agents Builder
 *
 * @version 2.0.0
 * @lastUpdated 2026-04-21
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import {
  Crown,
  Zap,
  Users,
  Bot,
  ChevronLeft,
  Building2,
  Layers,
  Sparkles,
  Target,
  TrendingUp,
  Shield,
  Brain,
  Cpu,
  Network,
  Settings,
  Command,
  Workflow,
  Briefcase,
  DollarSign,
  Megaphone,
  Headphones,
  Scale,
  ChevronRight,
  Plus,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Server,
  Database,
  Cloud,
  Lock,
  ScanEye,
  Factory,
  Truck,
  Ship,
  Home,
  Landmark,
  HeartPulse,
  Stethoscope,
  ShoppingCart,
  Package,
  FileText,
  GraduationCap,
  Wrench,
  LineChart,
  Wallet,
  ShieldCheck,
  Siren,
  Fingerprint,
  Search,
  Eye,
  Telescope,
  Microscope,
  FlaskConical,
  BookOpen,
  Calendar,
  Clock,
  UserCheck,
  UserPlus,
  UsersRound,
  Lightbulb,
  Gauge,
  AlertTriangle,
  Bell,
  Flag,
  Pin,
  Star,
  Trophy,
  Medal,
  Handshake,
  Award,
  Receipt,
  PiggyBank,
  FileSpreadsheet,
  TrendingDown,
  Coins,
  Banknote,
  CreditCard,
  Calculator,
  Archive,
  FolderCog,
  GitBranch,
  Boxes,
  MapPin,
  Compass,
  Binoculars,
  SearchCheck,
  BadgeCheck,
  FileBadge,
  PenTool,
  Palette,
  Mail,
  Share2,
  Gift,
  Heart,
  MessageSquare,
  Phone,
  Ticket,
  HelpCircle,
  Info,
  AlertCircle,
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================
// HIERARCHY DATA
// ============================================

const HIERARCHY_STATS = {
  totalAgents: 199,
  totalDepartments: 21,
  cSuiteCount: 17,
  commandCenterRoles: 7,
  efficiency: '20x',
  costSavings: '89%',
};

// Tier 1: C-Suite Executives (17 agents)
const C_SUITE_EXECUTIVES = [
  {
    id: 'ceo',
    title: 'Chief Executive Officer',
    shortTitle: 'CEO',
    icon: Crown,
    color: '#FFD700',
    description: 'Ultimate AI leader responsible for overall business strategy and organizational alignment',
    reportsTo: null,
    directReports: 15,
    department: 'Executive',
    cost: '$25,000/year',
    efficiency: '20x',
    capabilities: ['Strategic Planning', 'Executive Decision Support', 'Cross-Functional Coordination'],
  },
  {
    id: 'cfo',
    title: 'Chief Financial Officer',
    shortTitle: 'CFO',
    icon: DollarSign,
    color: '#2E7D32',
    description: 'Oversees all financial operations, accounting, budgeting, forecasting, and investor relations',
    reportsTo: 'CEO',
    directReports: 5,
    department: 'Finance',
    cost: '$18,000/year',
    efficiency: '19x',
    capabilities: ['Financial Forecasting', 'Budget Optimization', 'Investment Analysis'],
  },
  {
    id: 'cto',
    title: 'Chief Technology Officer',
    shortTitle: 'CTO',
    icon: Cpu,
    color: '#1565C0',
    description: 'Leads technology strategy, engineering teams, infrastructure, and innovation',
    reportsTo: 'CEO',
    directReports: 5,
    department: 'Technology',
    cost: '$20,000/year',
    efficiency: '20x',
    capabilities: ['Technology Strategy', 'Architecture Design', 'AI/ML Strategy'],
  },
  {
    id: 'cmo',
    title: 'Chief Marketing Officer',
    shortTitle: 'CMO',
    icon: Megaphone,
    color: '#E91E63',
    description: 'Drives marketing strategy, brand management, growth initiatives, and customer acquisition',
    reportsTo: 'CEO',
    directReports: 5,
    department: 'Marketing',
    cost: '$15,000/year',
    efficiency: '20x',
    capabilities: ['Marketing Strategy', 'Brand Development', 'Growth Hacking'],
  },
  {
    id: 'cco',
    title: 'Chief Customer Officer',
    shortTitle: 'CCO',
    icon: Headphones,
    color: '#00BCD4',
    description: 'Champions customer experience across all touchpoints and satisfaction initiatives',
    reportsTo: 'CEO',
    directReports: 5,
    department: 'Customer Experience',
    cost: '$14,000/year',
    efficiency: '20x',
    capabilities: ['Experience Design', 'Customer Advocacy', 'Support Strategy'],
  },
  {
    id: 'coo',
    title: 'Chief Operating Officer',
    shortTitle: 'COO',
    icon: Settings,
    color: '#607D8B',
    description: 'Manages day-to-day operations, business processes, and operational efficiency',
    reportsTo: 'CEO',
    directReports: 5,
    department: 'Operations',
    cost: '$16,000/year',
    efficiency: '20x',
    capabilities: ['Operations Management', 'Process Optimization', 'Supply Chain'],
  },
  {
    id: 'chro',
    title: 'Chief Human Resources Officer',
    shortTitle: 'CHRO',
    icon: Users,
    color: '#9C27B0',
    description: 'Leads human capital strategy, talent acquisition, and organizational culture',
    reportsTo: 'CEO',
    directReports: 5,
    department: 'Human Resources',
    cost: '$13,000/year',
    efficiency: '20x',
    capabilities: ['Talent Strategy', 'Workforce Planning', 'AI Workforce Management'],
  },
  {
    id: 'clo',
    title: 'Chief Legal Officer',
    shortTitle: 'CLO',
    icon: Scale,
    color: '#3F51B5',
    description: 'Oversees all legal matters, compliance, risk management, and governance',
    reportsTo: 'CEO',
    directReports: 5,
    department: 'Legal & Compliance',
    cost: '$19,000/year',
    efficiency: '20x',
    capabilities: ['Legal Counsel', 'Compliance Management', 'Contract Review'],
  },
  {
    id: 'ciso',
    title: 'Chief Information Security Officer',
    shortTitle: 'CISO',
    icon: Shield,
    color: '#F44336',
    description: 'Leads cybersecurity strategy, information security programs, and risk management',
    reportsTo: 'CEO',
    directReports: 5,
    department: 'Security',
    cost: '$18,000/year',
    efficiency: '20x',
    capabilities: ['Security Strategy', 'Cybersecurity Operations', 'Threat Intelligence'],
  },
  {
    id: 'cio',
    title: 'Chief Investment Officer',
    shortTitle: 'CIO',
    icon: TrendingUp,
    color: '#10B981',
    description: 'Oversees all investment strategy, portfolio management, and trading operations',
    reportsTo: 'CEO',
    directReports: 5,
    department: 'Trading & Investments',
    cost: '$22,500/year',
    efficiency: '20x',
    capabilities: ['Portfolio Optimization', 'Risk-Adjusted Analysis', 'Derivatives Strategy'],
    isNew: true,
  },
  {
    id: 'cdao',
    title: 'Chief Data & AI Officer',
    shortTitle: 'CDAO',
    icon: Database,
    color: '#6366F1',
    description: 'Owns all AI/data strategy, governance, models, and ethics oversight',
    reportsTo: 'CEO',
    directReports: 5,
    department: 'Data & Intelligence',
    cost: '$21,000/year',
    efficiency: '20x',
    capabilities: ['AI Strategy', 'Data Governance', 'Model Management'],
    isNew: true,
  },
  {
    id: 'cao-automation',
    title: 'Chief Automation Officer',
    shortTitle: 'CAO',
    icon: Zap,
    color: '#F59E0B',
    description: 'RPA, workflow automation, and efficiency specialist across all operations',
    reportsTo: 'CEO',
    directReports: 4,
    department: 'Operations',
    cost: '$17,000/year',
    efficiency: '20x',
    capabilities: ['Automation Strategy', 'RPA', 'Process Optimization'],
    isNew: true,
  },
  {
    id: 'creo',
    title: 'Chief Real Estate Officer',
    shortTitle: 'CREO',
    icon: Home,
    color: '#8B5CF6',
    description: 'Manages real estate portfolio, property investments, and facility operations',
    reportsTo: 'CEO',
    directReports: 4,
    department: 'Real Estate & Property',
    cost: '$19,500/year',
    efficiency: '20x',
    capabilities: ['Property Management', 'Real Estate Strategy', 'Facility Operations'],
    isNew: true,
  },
  {
    id: 'cro-insurance',
    title: 'Chief Risk Officer',
    shortTitle: 'CRO',
    icon: AlertTriangle,
    color: '#EC4899',
    description: 'Oversees enterprise risk management, insurance strategy, and risk assessment',
    reportsTo: 'CEO',
    directReports: 4,
    department: 'Insurance & Risk',
    cost: '$20,000/year',
    efficiency: '20x',
    capabilities: ['Risk Management', 'Insurance Strategy', 'Claims Management'],
    isNew: true,
  },
  {
    id: 'cmo-healthcare',
    title: 'Chief Medical Officer',
    shortTitle: 'CMO',
    icon: HeartPulse,
    color: '#EF4444',
    description: 'Leads healthcare strategy, medical operations, and patient care initiatives',
    reportsTo: 'CEO',
    directReports: 4,
    department: 'Healthcare & Medical',
    cost: '$24,000/year',
    efficiency: '20x',
    capabilities: ['Healthcare Strategy', 'Medical Operations', 'Patient Care'],
    isNew: true,
  },
  {
    id: 'cpo',
    title: 'Chief Production Officer',
    shortTitle: 'CPO',
    icon: Factory,
    color: '#F97316',
    description: 'Manages manufacturing operations, production planning, and quality control',
    reportsTo: 'CEO',
    directReports: 4,
    department: 'Manufacturing & Production',
    cost: '$18,500/year',
    efficiency: '20x',
    capabilities: ['Production Planning', 'Quality Control', 'Supply Chain Optimization'],
    isNew: true,
  },
  {
    id: 'clo-logistics',
    title: 'Chief Logistics Officer',
    shortTitle: 'CLO',
    icon: Truck,
    color: '#06B6D4',
    description: 'Oversees transportation, logistics operations, and supply chain management',
    reportsTo: 'CEO',
    directReports: 4,
    department: 'Transportation & Logistics',
    cost: '$17,500/year',
    efficiency: '20x',
    capabilities: ['Logistics Operations', 'Transportation Management', 'Fleet Optimization'],
    isNew: true,
  },
];

// Tier 2: Advanced Command Center
const COMMAND_CENTER_ROLES = [
  {
    id: 'cdoo',
    title: 'Chief Digital & Operations Officer',
    shortTitle: 'CDOO',
    icon: Crown,
    color: '#8B5CF6',
    description: 'Commands the digital transformation and operational excellence across all departments',
    authority: 'Tier 2 Commander',
    responsibilities: ['Digital Strategy', 'Operations Oversight', 'Cross-Functional Coordination'],
  },
  {
    id: 'ddo',
    title: 'Digital Deployment Officer',
    shortTitle: 'DDO',
    icon: Zap,
    color: '#F59E0B',
    description: 'Manages deployment pipelines, release management, and digital infrastructure',
    authority: 'Tier 2 Operator',
    responsibilities: ['Deployment Management', 'Release Coordination', 'Infrastructure'],
  },
  {
    id: 'wol',
    title: 'Workforce Optimization Lead',
    shortTitle: 'WOL',
    icon: Users,
    color: '#10B981',
    description: 'Optimizes AI and human workforce allocation, productivity, and performance',
    authority: 'Tier 2 Operator',
    responsibilities: ['Workforce Planning', 'Performance Optimization', 'Resource Allocation'],
  },
  {
    id: 'aod',
    title: 'Automation Operations Director',
    shortTitle: 'AOD',
    icon: Bot,
    color: '#3B82F6',
    description: 'Directs all automation initiatives, RPA, and workflow optimization',
    authority: 'Tier 2 Operator',
    responsibilities: ['Automation Strategy', 'RPA Management', 'Workflow Optimization'],
  },
  {
    id: 'pred',
    title: 'Predictive Operations Controller',
    shortTitle: 'PRED',
    icon: Brain,
    color: '#EC4899',
    description: 'Translates predictive insights into actionable operational decisions',
    authority: 'Tier 2 Intelligence',
    responsibilities: ['Predictive Analytics', 'Trend Forecasting', 'Decision Support'],
    isNew: true,
  },
  {
    id: 'swarm',
    title: 'Swarm Intelligence Controller',
    shortTitle: 'SWARM',
    icon: Network,
    color: '#6366F1',
    description: 'Manages dynamic agent team formation and swarm coordination for complex tasks',
    authority: 'Tier 2 Intelligence',
    responsibilities: ['Swarm Coordination', 'Dynamic Teaming', 'Load Balancing'],
    isNew: true,
  },
  {
    id: 'learn',
    title: 'Learning & Adaptation Engine',
    shortTitle: 'LEARN',
    icon: Sparkles,
    color: '#8B5CF6',
    description: 'Drives continuous self-improvement and knowledge acquisition across the workforce',
    authority: 'Tier 2 Intelligence',
    responsibilities: ['Continuous Learning', 'Skill Acquisition', 'Knowledge Management'],
    isNew: true,
  },
];

// Tier 3: Departments (21 teams)
const DEPARTMENTS = [
  { id: 'executive', name: 'Executive Office', icon: Crown, color: '#FFD700', agentCount: 1, description: 'Strategic leadership and organizational oversight' },
  { id: 'accounting', name: 'Finance & Accounting', icon: DollarSign, color: '#2E7D32', agentCount: 12, description: 'Financial operations, budgeting, and reporting' },
  { id: 'engineering', name: 'Technology & Engineering', icon: Cpu, color: '#1565C0', agentCount: 15, description: 'Software development, infrastructure, and innovation' },
  { id: 'marketing', name: 'Marketing & Growth', icon: Megaphone, color: '#E91E63', agentCount: 10, description: 'Brand management, campaigns, and customer acquisition' },
  { id: 'sales', name: 'Sales & Revenue', icon: Target, color: '#F59E0B', agentCount: 11, description: 'Sales operations, pipeline management, and revenue growth' },
  { id: 'customer_experience', name: 'Customer Experience', icon: Headphones, color: '#00BCD4', agentCount: 14, description: 'Support, success, and customer satisfaction' },
  { id: 'operations', name: 'Operations & Management', icon: Settings, color: '#607D8B', agentCount: 13, description: 'Business processes and operational efficiency' },
  { id: 'hr', name: 'Human Resources', icon: Users, color: '#9C27B0', agentCount: 9, description: 'Talent acquisition, development, and culture' },
  { id: 'legal', name: 'Legal & Compliance', icon: Scale, color: '#3F51B5', agentCount: 8, description: 'Legal counsel, contracts, and regulatory compliance' },
  { id: 'data_intelligence', name: 'Data & Intelligence', icon: Database, color: '#6366F1', agentCount: 10, description: 'Analytics, insights, and data-driven decisions' },
  { id: 'product', name: 'Product Development', icon: Lightbulb, color: '#F97316', agentCount: 9, description: 'Product strategy, design, and lifecycle management' },
  { id: 'security', name: 'Security & Risk', icon: Shield, color: '#F44336', agentCount: 11, description: 'Cybersecurity, threat detection, and risk management' },
  { id: 'research', name: 'Research & Innovation', icon: Microscope, color: '#8B5CF6', agentCount: 7, description: 'R&D, innovation, and emerging technologies' },
  { id: 'administrative', name: 'Administrative & Support', icon: Briefcase, color: '#94A3B8', agentCount: 6, description: 'Administrative operations and support services' },
  { id: 'trading_investments', name: 'Trading & Investments', icon: TrendingUp, color: '#10B981', agentCount: 12, description: 'Portfolio management, trading, and investments', isNew: true },
  { id: 'real_estate', name: 'Real Estate & Property', icon: Home, color: '#8B5CF6', agentCount: 8, description: 'Property management and real estate operations', isNew: true },
  { id: 'insurance_risk', name: 'Insurance & Risk', icon: ShieldCheck, color: '#EC4899', agentCount: 9, description: 'Insurance operations and risk assessment', isNew: true },
  { id: 'healthcare', name: 'Healthcare & Medical', icon: HeartPulse, color: '#EF4444', agentCount: 14, description: 'Medical operations and patient care management', isNew: true },
  { id: 'manufacturing', name: 'Manufacturing & Production', icon: Factory, color: '#F97316', agentCount: 10, description: 'Production planning and quality control', isNew: true },
  { id: 'logistics', name: 'Transportation & Logistics', icon: Truck, color: '#06B6D4', agentCount: 11, description: 'Logistics and supply chain management', isNew: true },
  { id: 'government', name: 'Government & Public Sector', icon: Landmark, color: '#1E40AF', agentCount: 7, description: 'Public sector and government operations', isNew: true },
];

// Tier 4: AI Agent Workforce Types
const AGENT_WORKFORCE_TYPES = [
  {
    id: 'reactive',
    name: 'Reactive Agents',
    count: 199,
    icon: Zap,
    color: '#3B82F6',
    description: 'Respond to requests in real-time with 24/7 availability',
    availability: '100%',
    capabilities: ['Instant Response', '24/7 Availability', 'Request Processing'],
  },
  {
    id: 'learning',
    name: 'Learning Agents',
    count: 120,
    icon: Brain,
    color: '#10B981',
    description: 'Self-improving agents that learn from every interaction',
    availability: '60%',
    capabilities: ['Self-Improvement', 'Pattern Recognition', 'Knowledge Retention'],
  },
  {
    id: 'swarm',
    name: 'Swarm Agents',
    count: 'Unlimited',
    icon: Network,
    color: '#8B5CF6',
    description: 'Dynamic agent teams that self-organize for complex tasks',
    availability: 'On-Demand',
    capabilities: ['Dynamic Teaming', 'Load Balancing', 'Parallel Processing'],
  },
];

const AGENT_CATEGORIES = [
  { id: 'support', name: 'Support Agents', count: 45, icon: Headphones, color: '#00BCD4' },
  { id: 'sales', name: 'Sales Agents', count: 28, icon: Target, color: '#F59E0B' },
  { id: 'marketing', name: 'Marketing Agents', count: 22, icon: Megaphone, color: '#E91E63' },
  { id: 'technical', name: 'Technical Agents', count: 35, icon: Cpu, color: '#1565C0' },
  { id: 'analytical', name: 'Analytical Agents', count: 31, icon: BarChart3, color: '#6366F1' },
  { id: 'operations', name: 'Operations Agents', count: 24, icon: Settings, color: '#607D8B' },
  { id: 'compliance', name: 'Compliance Agents', count: 14, icon: Shield, color: '#F44336' },
];

// Intelligence Layer Components
const INTELLIGENCE_LAYER = [
  {
    id: 'predictive',
    name: 'Predictive Engine',
    icon: Brain,
    color: '#EC4899',
    description: 'Demand forecasting, churn prediction, trend analysis, revenue prediction',
    impact: '+30% retention',
    example: 'Customer X will churn in 7 days',
  },
  {
    id: 'sentiment',
    name: 'Sentiment Core',
    icon: Activity,
    color: '#10B981',
    description: 'Real-time emotion detection, satisfaction tracking, mood-based routing',
    impact: '+25% CSAT',
    example: 'Customer mood: 2/10 - escalate',
  },
  {
    id: 'anomaly',
    name: 'Anomaly Detector',
    icon: ScanEye,
    color: '#F59E0B',
    description: 'Fraud detection, security threats, pattern breaks, risk warnings',
    impact: '-90% fraud',
    example: 'Transaction flagged: 5x normal',
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export default function AIAgentsIndex() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Navigation helper to route executives to their dedicated pages
  const navigateToExecutive = (execId: string) => {
    const execRouteMap: { [key: string]: string } = {
      'ceo': '/ai-agent/executive/ceo-advisor',
      'cfo': '/ai-agent/executive/cfo-analyst',
      'coo': '/ai-agent/executive/coo-strategist',
      'cto': '/ai-agent/executive/cto-advisor',
      'cmo': '/ai-agent/executive/cmo-advisor',
      'cco': '/ai-agent/executive/cco-advisor',
      'chro': '/ai-agent/executive/chro-advisor',
      'clo': '/ai-agent/executive/clo-advisor',
      'ciso': '/ai-agent/executive/ciso-advisor',
      'cio': '/ai-agent/executive/cio-advisor',
      'cdao': '/ai-agent/executive/cdao-advisor',
      'cao-automation': '/ai-agent/executive/cao-automation',
      'creo': '/ai-agent/executive/creo-advisor',
      'cro-insurance': '/ai-agent/executive/cro-risk',
      'cmo-healthcare': '/ai-agent/executive/cmo-healthcare',
      'cpo': '/ai-agent/executive/cpo-production',
      'clo-logistics': '/ai-agent/executive/clo-logistics',
    };
    const route = execRouteMap[execId];
    if (route) {
      router.push(route);
    } else {
      router.push('/ai-agent/executive');
    }
  };

  // Navigation helper to route departments to their folders
  const navigateToDepartment = (deptId: string) => {
    const deptRouteMap: { [key: string]: string } = {
      'executive': '/ai-agent/executive',
      'accounting': '/ai-agent/accounting',
      'engineering': '/ai-agent/engineering',
      'marketing': '/ai-agent/marketing',
      'sales': '/ai-agent/sales',
      'operations': '/ai-agent/operations',
      'hr': '/ai-agent/hr',
      'legal': '/ai-agent/legal',
      'data_intelligence': '/ai-agent/data',
      'product': '/ai-agent/product',
      'security': '/ai-agent/it',
      'customer_experience': '/ai-agent/customer',
      'research': '/ai-agent/analysis',
      'administrative': '/ai-agent/operations',
      'trading_investments': '/ai-agent',
      'real_estate': '/ai-agent',
      'insurance_risk': '/ai-agent',
      'healthcare': '/ai-agent',
      'manufacturing': '/ai-agent/product',
      'logistics': '/ai-agent',
      'government': '/ai-agent',
    };
    const route = deptRouteMap[deptId];
    if (route) {
      router.push(route);
    } else {
      Alert.alert('Coming Soon', 'This department will be available in a future update.');
    }
  };

  // Navigation helper for agent categories
  const navigateToCategory = (categoryId: string) => {
    const catRouteMap: { [key: string]: string } = {
      'support': '/ai-agent',
      'sales': '/ai-agent/sales',
      'marketing': '/ai-agent/marketing',
      'technical': '/ai-agent/engineering',
      'analytical': '/ai-agent/data',
      'operations': '/ai-agent/operations',
      'compliance': '/ai-agent/legal',
    };
    const route = catRouteMap[categoryId];
    if (route) {
      router.push(route);
    } else {
      Alert.alert('Coming Soon', 'This category will be available in a future update.');
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <ChevronLeft size={28} color="#fff" />
      </TouchableOpacity>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>AI Agents & Employees</Text>
        <Text style={styles.headerSubtitle}>
          {HIERARCHY_STATS.totalAgents} Agents • {HIERARCHY_STATS.totalDepartments} Departments • {HIERARCHY_STATS.efficiency} Efficiency
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.builderButton}
        onPress={() => router.push('/ai-agents-employees-builder')}
      >
        <Plus size={20} color="#fff" />
        <Text style={styles.builderButtonText}>Builder</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHierarchyOverview = () => (
    <Animated.View entering={FadeInUp.delay(100)} style={styles.overviewContainer}>
      <Text style={styles.sectionTitle}>Organizational Hierarchy</Text>
      <View style={[styles.hierarchyFlow, isDesktop && styles.hierarchyFlowDesktop]}>
        {/* Tier 1 */}
        <View style={styles.tierNode}>
          <View style={[styles.tierBadge, { backgroundColor: '#FFD700' }]}>
            <Crown size={20} color="#fff" />
          </View>
          <Text style={styles.tierLabel}>Tier 1</Text>
          <Text style={styles.tierName}>C-Suite</Text>
          <Text style={styles.tierCount}>{HIERARCHY_STATS.cSuiteCount} Executives</Text>
        </View>

        <ChevronRight size={24} color="#64748b" />

        {/* Tier 2 */}
        <View style={styles.tierNode}>
          <View style={[styles.tierBadge, { backgroundColor: '#8B5CF6' }]}>
            <Command size={20} color="#fff" />
          </View>
          <Text style={styles.tierLabel}>Tier 2</Text>
          <Text style={styles.tierName}>Command Center</Text>
          <Text style={styles.tierCount}>{HIERARCHY_STATS.commandCenterRoles} Roles</Text>
        </View>

        <ChevronRight size={24} color="#64748b" />

        {/* Tier 3 */}
        <View style={styles.tierNode}>
          <View style={[styles.tierBadge, { backgroundColor: '#3B82F6' }]}>
            <Building2 size={20} color="#fff" />
          </View>
          <Text style={styles.tierLabel}>Tier 3</Text>
          <Text style={styles.tierName}>Departments</Text>
          <Text style={styles.tierCount}>{HIERARCHY_STATS.totalDepartments} Teams</Text>
        </View>

        <ChevronRight size={24} color="#64748b" />

        {/* Tier 4 */}
        <View style={styles.tierNode}>
          <View style={[styles.tierBadge, { backgroundColor: '#10B981' }]}>
            <Bot size={20} color="#fff" />
          </View>
          <Text style={styles.tierLabel}>Tier 4</Text>
          <Text style={styles.tierName}>Workforce</Text>
          <Text style={styles.tierCount}>{HIERARCHY_STATS.totalAgents} Agents</Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderExecutiveLeadership = () => (
    <Animated.View entering={FadeInUp.delay(200)} style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <Crown size={24} color="#FFD700" />
          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>1. Executive & Leadership</Text>
            <Text style={styles.sectionSubtitle}>Tier 1: C-Suite Executives ({C_SUITE_EXECUTIVES.length} Agents)</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => router.push('/ai-agent/executive')}
        >
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color="#6366F1" />
        </TouchableOpacity>
      </View>

      <View style={[styles.executiveGrid, isDesktop && styles.executiveGridDesktop]}>
        {C_SUITE_EXECUTIVES.slice(0, 8).map((exec, index) => {
          const Icon = exec.icon;
          return (
            <TouchableOpacity
              key={exec.id}
              style={[styles.executiveCard, { borderColor: exec.color }]}
              onPress={() => navigateToExecutive(exec.id)}
            >
              <View style={styles.executiveCardHeader}>
                <View style={[styles.executiveIcon, { backgroundColor: exec.color + '20' }]}>
                  <Icon size={24} color={exec.color} />
                </View>
                {exec.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.executiveShortTitle, { color: exec.color }]}>{exec.shortTitle}</Text>
              <Text style={styles.executiveTitle}>{exec.title}</Text>
              <Text style={styles.executiveDesc} numberOfLines={2}>{exec.description}</Text>
              <View style={styles.executiveMeta}>
                <Text style={styles.executiveCost}>{exec.cost}</Text>
                <Text style={styles.executiveEfficiency}>{exec.efficiency}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {C_SUITE_EXECUTIVES.length > 8 && (
        <TouchableOpacity 
          style={styles.showMoreButton}
          onPress={() => setActiveSection(activeSection === 'executive' ? null : 'executive')}
        >
          <Text style={styles.showMoreText}>
            {activeSection === 'executive' ? 'Show Less' : `Show ${C_SUITE_EXECUTIVES.length - 8} More Executives`}
          </Text>
          <ChevronRight size={16} color="#64748b" style={{ transform: [{ rotate: activeSection === 'executive' ? '90deg' : '0deg' }] }} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );

  const renderCommandCenter = () => (
    <Animated.View entering={FadeInUp.delay(300)} style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <Command size={24} color="#8B5CF6" />
          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>2. Command Center</Text>
            <Text style={styles.sectionSubtitle}>Tier 2: Advanced Command Center ({COMMAND_CENTER_ROLES.length} Roles)</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => router.push('/command-center')}
        >
          <Text style={styles.viewAllText}>Open Center</Text>
          <ChevronRight size={16} color="#6366F1" />
        </TouchableOpacity>
      </View>

      {/* Chain of Command Visual */}
      <View style={styles.chainOfCommand}>
        <View style={styles.chainRow}>
          <View style={[styles.chainNode, { borderColor: COMMAND_CENTER_ROLES[0].color }]}>
            <Crown size={16} color={COMMAND_CENTER_ROLES[0].color} />
            <Text style={[styles.chainNodeText, { color: COMMAND_CENTER_ROLES[0].color }]}>CDOO</Text>
          </View>
          <View style={styles.chainLine} />
          <View style={[styles.chainNode, { borderColor: COMMAND_CENTER_ROLES[1].color }]}>
            <Zap size={16} color={COMMAND_CENTER_ROLES[1].color} />
            <Text style={[styles.chainNodeText, { color: COMMAND_CENTER_ROLES[1].color }]}>DDO</Text>
          </View>
        </View>
        <View style={styles.chainConnector}>
          <View style={styles.chainLineVertical} />
        </View>
        <View style={styles.chainRow}>
          <View style={[styles.chainNode, { borderColor: COMMAND_CENTER_ROLES[2].color }]}>
            <Users size={16} color={COMMAND_CENTER_ROLES[2].color} />
            <Text style={[styles.chainNodeText, { color: COMMAND_CENTER_ROLES[2].color }]}>WOL</Text>
          </View>
          <View style={[styles.chainNode, { borderColor: COMMAND_CENTER_ROLES[3].color }]}>
            <Bot size={16} color={COMMAND_CENTER_ROLES[3].color} />
            <Text style={[styles.chainNodeText, { color: COMMAND_CENTER_ROLES[3].color }]}>AOD</Text>
          </View>
        </View>
        <View style={styles.chainConnector}>
          <View style={styles.chainLineVertical} />
        </View>
        <View style={styles.chainRow}>
          <View style={[styles.chainNode, { borderColor: COMMAND_CENTER_ROLES[4].color }]}>
            <Brain size={16} color={COMMAND_CENTER_ROLES[4].color} />
            <Text style={[styles.chainNodeText, { color: COMMAND_CENTER_ROLES[4].color }]}>PRED</Text>
          </View>
          <View style={[styles.chainNode, { borderColor: COMMAND_CENTER_ROLES[5].color }]}>
            <Network size={16} color={COMMAND_CENTER_ROLES[5].color} />
            <Text style={[styles.chainNodeText, { color: COMMAND_CENTER_ROLES[5].color }]}>SWARM</Text>
          </View>
          <View style={[styles.chainNode, { borderColor: COMMAND_CENTER_ROLES[6].color }]}>
            <Sparkles size={16} color={COMMAND_CENTER_ROLES[6].color} />
            <Text style={[styles.chainNodeText, { color: COMMAND_CENTER_ROLES[6].color }]}>LEARN</Text>
          </View>
        </View>
      </View>

      <View style={[styles.commandGrid, isDesktop && styles.commandGridDesktop]}>
        {COMMAND_CENTER_ROLES.map((role, index) => {
          const Icon = role.icon;
          return (
            <TouchableOpacity
              key={role.id}
              style={[styles.commandCard, { borderColor: role.color, backgroundColor: role.color + '10' }]}
              onPress={() => router.push('/command-center')}
            >
              <View style={styles.commandCardHeader}>
                <View style={[styles.commandIcon, { backgroundColor: role.color }]}>
                  <Icon size={20} color="#fff" />
                </View>
                {role.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.commandShortTitle, { color: role.color }]}>{role.shortTitle}</Text>
              <Text style={styles.commandTitle}>{role.title}</Text>
              <Text style={styles.commandDesc} numberOfLines={2}>{role.description}</Text>
              <View style={styles.commandResponsibilities}>
                {role.responsibilities.slice(0, 2).map((resp, idx) => (
                  <View key={idx} style={styles.responsibilityTag}>
                    <Text style={styles.responsibilityText}>{resp}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Intelligence Layer */}
      <View style={styles.intelligenceSection}>
        <Text style={styles.subSectionTitle}>Intelligence Layer</Text>
        <View style={[styles.intelligenceGrid, isDesktop && styles.intelligenceGridDesktop]}>
          {INTELLIGENCE_LAYER.map((component) => {
            const Icon = component.icon;
            return (
              <View key={component.id} style={[styles.intelligenceCard, { borderColor: component.color }]}>
                <View style={styles.intelligenceHeader}>
                  <View style={[styles.intelligenceIcon, { backgroundColor: component.color + '20' }]}>
                    <Icon size={20} color={component.color} />
                  </View>
                  <View style={styles.intelligenceImpact}>
                    <Text style={[styles.impactText, { color: component.color }]}>{component.impact}</Text>
                  </View>
                </View>
                <Text style={styles.intelligenceName}>{component.name}</Text>
                <Text style={styles.intelligenceDesc}>{component.description}</Text>
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleLabel}>Example:</Text>
                  <Text style={styles.exampleText}>{component.example}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </Animated.View>
  );

  const renderMainAgents = () => (
    <Animated.View entering={FadeInUp.delay(400)} style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <Building2 size={24} color="#3B82F6" />
          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>3. Main Agents</Text>
            <Text style={styles.sectionSubtitle}>Tier 3: Departments ({DEPARTMENTS.length} Teams)</Text>
          </View>
        </View>
      </View>

      <View style={[styles.departmentGrid, isDesktop && styles.departmentGridDesktop]}>
        {DEPARTMENTS.map((dept, index) => {
          const Icon = dept.icon;
          return (
            <TouchableOpacity
              key={dept.id}
              style={[styles.departmentCard, { borderColor: dept.color }]}
              onPress={() => navigateToDepartment(dept.id)}
            >
              <View style={styles.departmentCardHeader}>
                <View style={[styles.departmentIcon, { backgroundColor: dept.color + '20' }]}>
                  <Icon size={24} color={dept.color} />
                </View>
                {dept.isNew && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                  </View>
                )}
              </View>
              <Text style={styles.departmentName}>{dept.name}</Text>
              <Text style={styles.departmentDesc} numberOfLines={2}>{dept.description}</Text>
              <View style={styles.departmentStats}>
                <View style={styles.statItem}>
                  <Bot size={14} color="#64748b" />
                  <Text style={styles.statText}>{dept.agentCount} Agents</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );

  const renderSubAgents = () => (
    <Animated.View entering={FadeInUp.delay(500)} style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <Bot size={24} color="#10B981" />
          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>4. Sub Agents</Text>
            <Text style={styles.sectionSubtitle}>Tier 4: AI Agent Workforce ({HIERARCHY_STATS.totalAgents} Agents)</Text>
          </View>
        </View>
      </View>

      {/* Agent Types */}
      <View style={styles.agentTypesContainer}>
        <Text style={styles.subSectionTitle}>Agent Types</Text>
        <View style={[styles.agentTypesGrid, isDesktop && styles.agentTypesGridDesktop]}>
          {AGENT_WORKFORCE_TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <View key={type.id} style={[styles.agentTypeCard, { borderColor: type.color, backgroundColor: type.color + '10' }]}>
                <View style={[styles.agentTypeIcon, { backgroundColor: type.color }]}>
                  <Icon size={24} color="#fff" />
                </View>
                <View style={styles.agentTypeInfo}>
                  <Text style={[styles.agentTypeName, { color: type.color }]}>{type.name}</Text>
                  <Text style={styles.agentTypeCount}>{type.count} Agents</Text>
                  <Text style={styles.agentTypeDesc}>{type.description}</Text>
                  <View style={styles.agentTypeAvailability}>
                    <Text style={styles.availabilityLabel}>Availability:</Text>
                    <Text style={[styles.availabilityValue, { color: type.color }]}>{type.availability}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Agent Categories */}
      <View style={styles.agentCategoriesContainer}>
        <Text style={styles.subSectionTitle}>Agent Categories</Text>
        <View style={[styles.agentCategoriesGrid, isDesktop && styles.agentCategoriesGridDesktop]}>
          {AGENT_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { borderColor: category.color }]}
                onPress={() => navigateToCategory(category.id)}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <Icon size={20} color={category.color} />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>{category.count} Agents</Text>
                </View>
                <ChevronRight size={16} color="#64748b" />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Animated.View>
  );

  const renderAIAgentsBuilder = () => (
    <Animated.View entering={FadeInUp.delay(600)} style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <Sparkles size={24} color="#EC4899" />
          <View style={styles.sectionHeaderText}>
            <Text style={styles.sectionTitle}>5. AI Agents Builder</Text>
            <Text style={styles.sectionSubtitle}>Create Custom Agents, Employees & Departments</Text>
          </View>
        </View>
      </View>

      <View style={[styles.builderGrid, isDesktop && styles.builderGridDesktop]}>
        <TouchableOpacity
          style={[styles.builderCard, { backgroundColor: '#6366F1' }]}
          onPress={() => router.push('/ai-agents-employees-builder')}
        >
          <View style={styles.builderIconContainer}>
            <Bot size={32} color="#fff" />
          </View>
          <Text style={styles.builderCardTitle}>AI Agent Builder</Text>
          <Text style={styles.builderCardDesc}>Create custom AI agents with specific skills, capabilities, and intelligence features</Text>
          <View style={styles.builderFeatures}>
            <Text style={styles.builderFeature}>• Reactive, Learning & Swarm types</Text>
            <Text style={styles.builderFeature}>• Custom skill configuration</Text>
            <Text style={styles.builderFeature}>• Intelligence layer integration</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.builderCard, { backgroundColor: '#10B981' }]}
          onPress={() => router.push('/ai-agents-employees-builder')}
        >
          <View style={styles.builderIconContainer}>
            <Users size={32} color="#fff" />
          </View>
          <Text style={styles.builderCardTitle}>Employee Builder</Text>
          <Text style={styles.builderCardDesc}>Add employees to the hierarchy with AI collaboration capabilities</Text>
          <View style={styles.builderFeatures}>
            <Text style={styles.builderFeature}>• All hierarchy levels supported</Text>
            <Text style={styles.builderFeature}>• AI partnership configuration</Text>
            <Text style={styles.builderFeature}>• Performance metrics setup</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.builderCard, { backgroundColor: '#F59E0B' }]}
          onPress={() => router.push('/ai-agents-employees-builder')}
        >
          <View style={styles.builderIconContainer}>
            <Building2 size={32} color="#fff" />
          </View>
          <Text style={styles.builderCardTitle}>Department Builder</Text>
          <Text style={styles.builderCardDesc}>Create custom departments with agent allocation and KPIs</Text>
          <View style={styles.builderFeatures}>
            <Text style={styles.builderFeature}>• 21 department templates</Text>
            <Text style={styles.builderFeature}>• Custom function definition</Text>
            <Text style={styles.builderFeature}>• Agent workforce allocation</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.builderStats}>
        <View style={styles.builderStatItem}>
          <Text style={styles.builderStatValue}>{HIERARCHY_STATS.totalAgents}</Text>
          <Text style={styles.builderStatLabel}>Total Agents</Text>
        </View>
        <View style={styles.builderStatDivider} />
        <View style={styles.builderStatItem}>
          <Text style={styles.builderStatValue}>{HIERARCHY_STATS.totalDepartments}</Text>
          <Text style={styles.builderStatLabel}>Departments</Text>
        </View>
        <View style={styles.builderStatDivider} />
        <View style={styles.builderStatItem}>
          <Text style={styles.builderStatValue}>{HIERARCHY_STATS.efficiency}</Text>
          <Text style={styles.builderStatLabel}>Efficiency</Text>
        </View>
        <View style={styles.builderStatDivider} />
        <View style={styles.builderStatItem}>
          <Text style={styles.builderStatValue}>{HIERARCHY_STATS.costSavings}</Text>
          <Text style={styles.builderStatLabel}>Cost Savings</Text>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderHierarchyOverview()}
        {renderExecutiveLeadership()}
        {renderCommandCenter()}
        {renderMainAgents()}
        {renderSubAgents()}
        {renderAIAgentsBuilder()}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  builderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366F1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  builderButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },

  // Overview Section
  overviewContainer: {
    padding: 20,
  },
  hierarchyFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  hierarchyFlowDesktop: {
    justifyContent: 'center',
    gap: 16,
  },
  tierNode: {
    alignItems: 'center',
    minWidth: 70,
  },
  tierBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  tierLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
  tierName: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '700',
    marginTop: 2,
  },
  tierCount: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2,
  },

  // Section Styles
  sectionContainer: {
    padding: 20,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  subSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginTop: 16,
    marginBottom: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    color: '#6366F1',
    fontSize: 13,
    fontWeight: '600',
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop: 12,
    backgroundColor: '#1e293b',
    borderRadius: 10,
    gap: 6,
  },
  showMoreText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
  },

  // Executive Cards
  executiveGrid: {
    gap: 12,
  },
  executiveGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  executiveCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderLeftWidth: 4,
  },
  executiveCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  executiveIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
  executiveShortTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  executiveTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 4,
  },
  executiveDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 6,
    lineHeight: 18,
  },
  executiveMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  executiveCost: {
    fontSize: 12,
    color: '#64748b',
  },
  executiveEfficiency: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '700',
  },

  // Command Center
  chainOfCommand: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  chainRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  chainConnector: {
    alignItems: 'center',
    height: 20,
  },
  chainLine: {
    width: 30,
    height: 2,
    backgroundColor: '#475569',
  },
  chainLineVertical: {
    width: 2,
    height: 20,
    backgroundColor: '#475569',
  },
  chainNode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: '#0f172a',
    gap: 6,
  },
  chainNodeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  commandGrid: {
    gap: 12,
  },
  commandGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  commandCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderLeftWidth: 4,
  },
  commandCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  commandIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commandShortTitle: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  commandTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 4,
  },
  commandDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 6,
    lineHeight: 18,
  },
  commandResponsibilities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 12,
  },
  responsibilityTag: {
    backgroundColor: '#334155',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  responsibilityText: {
    fontSize: 11,
    color: '#94a3b8',
  },

  // Intelligence Section
  intelligenceSection: {
    marginTop: 16,
  },
  intelligenceGrid: {
    gap: 12,
  },
  intelligenceGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  intelligenceCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderLeftWidth: 4,
  },
  intelligenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  intelligenceIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  intelligenceImpact: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 12,
    fontWeight: '700',
  },
  intelligenceName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  intelligenceDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 6,
    lineHeight: 18,
  },
  exampleBox: {
    backgroundColor: '#0f172a',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  exampleLabel: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
  exampleText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
    fontStyle: 'italic',
  },

  // Department Cards
  departmentGrid: {
    gap: 12,
  },
  departmentGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  departmentCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderLeftWidth: 4,
  },
  departmentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  departmentIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  departmentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  departmentDesc: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 6,
    lineHeight: 18,
  },
  departmentStats: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    color: '#64748b',
  },

  // Agent Types
  agentTypesContainer: {
    marginTop: 8,
  },
  agentTypesGrid: {
    gap: 12,
  },
  agentTypesGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  agentTypeCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderLeftWidth: 4,
    gap: 14,
  },
  agentTypeIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentTypeInfo: {
    flex: 1,
  },
  agentTypeName: {
    fontSize: 16,
    fontWeight: '700',
  },
  agentTypeCount: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 2,
  },
  agentTypeDesc: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 6,
    lineHeight: 18,
  },
  agentTypeAvailability: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  availabilityLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  availabilityValue: {
    fontSize: 12,
    fontWeight: '700',
  },

  // Agent Categories
  agentCategoriesContainer: {
    marginTop: 16,
  },
  agentCategoriesGrid: {
    gap: 10,
  },
  agentCategoriesGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    gap: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  categoryCount: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },

  // Builder Section
  builderGrid: {
    gap: 12,
  },
  builderGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  builderCard: {
    borderRadius: 16,
    padding: 20,
  },
  builderIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  builderCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  builderCardDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    lineHeight: 20,
  },
  builderFeatures: {
    marginTop: 14,
    gap: 4,
  },
  builderFeature: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  builderStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  builderStatItem: {
    alignItems: 'center',
  },
  builderStatValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  builderStatLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
  builderStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#334155',
  },
});