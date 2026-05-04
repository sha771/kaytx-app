import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Users,
  Headphones,
  Phone,
  Ticket,
  CircleAlert,
  Heart,
  Gift,
  ClipboardList,
  CreditCard,
  TrendingUp,
  UserCheck,
  Briefcase,
  Building,
  FileText,
  Handshake,
  ArrowUpRight,
  DollarSign,
  Target,
  Megaphone,
  Palette,
  Share2,
  Search,
  Mail,
  Eye,
  Crosshair,
  Settings,
  Workflow,
  ListTodo,
  Cog,
  Package,
  Shield,
  Boxes,
  CircleCheck,
  ChartBar,
  ChartLine,
  ChartPie,
  Brain,
  Lightbulb,
  TriangleAlert,
  Lock,
  Activity,
  Gauge,
  Sparkles,
  Database,
  ChevronDown,
  ChevronRight,
  Zap,
  Power,
  RefreshCw,
  SquareCheck,
  Square,
  ToggleLeft,
  ToggleRight,
  Cpu,
  Network,
  Globe,
  Layers,
  Command,
  Wand,
  CircuitBoard,
  Rocket,
  Crown,
  Star,
  Clock,
  Play,
  Pause,
  User,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

interface SubAgent {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  status: 'active' | 'paused' | 'training' | 'inactive' | 'optimizing';
  tasksCompleted: number;
  successRate: number;
  lastActive: string;
  capabilities: string[];
  tier: 'standard' | 'premium' | 'enterprise';
  learningProgress: number;
  efficiency: number;
}

interface MainAgent {
  id: string;
  name: string;
  description: string;
  mainArea: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string[];
  enabled: boolean;
  status: 'active' | 'paused' | 'training' | 'inactive';
  subAgents: SubAgent[];
  totalTasks: number;
  avgSuccessRate: number;
  aiModel: string;
  version: string;
}

interface CoreCapability {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  category: 'memory' | 'learning' | 'intelligence' | 'adaptation';
  impact: 'critical' | 'high' | 'medium';
  performance: number;
}

const initialMainAgents: MainAgent[] = [
  {
    id: 'customer-experience',
    name: 'Customer Experience AI',
    description: 'Handles all customer interaction & support functions',
    mainArea: 'Customer Interaction & Support',
    icon: Headphones,
    color: '#007AFF',
    gradient: ['#007AFF', '#5856D6'],
    enabled: true,
    status: 'active',
    totalTasks: 15420,
    avgSuccessRate: 94,
    aiModel: 'GPT-4 Turbo',
    version: '3.2.1',
    subAgents: [
      { id: 'ce-1', name: 'AI Receptionist', description: 'First point of contact for all inquiries', icon: Phone, enabled: true, status: 'active', tasksCompleted: 3240, successRate: 96, lastActive: '2 min ago', capabilities: ['Call Handling', 'Appointment Scheduling', 'FAQ Response', 'Multi-language Support'], tier: 'premium', learningProgress: 92, efficiency: 98 },
      { id: 'ce-2', name: 'AI Customer Support Agent', description: 'Handles general support requests', icon: Headphones, enabled: true, status: 'active', tasksCompleted: 4520, successRate: 93, lastActive: '1 min ago', capabilities: ['Ticket Resolution', 'Live Chat', 'Email Support', 'Knowledge Base'], tier: 'enterprise', learningProgress: 88, efficiency: 95 },
      { id: 'ce-3', name: 'AI Ticket Resolution Agent', description: 'Resolves support tickets automatically', icon: Ticket, enabled: true, status: 'active', tasksCompleted: 2890, successRate: 91, lastActive: '5 min ago', capabilities: ['Auto-Resolution', 'Escalation', 'SLA Tracking', 'Priority Management'], tier: 'premium', learningProgress: 85, efficiency: 92 },
      { id: 'ce-4', name: 'AI Complaint Handling Agent', description: 'Manages and resolves customer complaints', icon: CircleAlert, enabled: true, status: 'training', tasksCompleted: 1560, successRate: 88, lastActive: '10 min ago', capabilities: ['Complaint Analysis', 'Resolution Suggestions', 'Follow-up', 'Sentiment Detection'], tier: 'enterprise', learningProgress: 78, efficiency: 86 },
      { id: 'ce-5', name: 'AI Retention Specialist', description: 'Prevents churn and retains customers', icon: Heart, enabled: true, status: 'active', tasksCompleted: 890, successRate: 95, lastActive: '3 min ago', capabilities: ['Churn Prediction', 'Win-back Campaigns', 'Loyalty Offers', 'Customer Journey'], tier: 'enterprise', learningProgress: 91, efficiency: 97 },
      { id: 'ce-6', name: 'AI Loyalty & Engagement Agent', description: 'Drives customer loyalty programs', icon: Gift, enabled: false, status: 'inactive', tasksCompleted: 650, successRate: 92, lastActive: '1 hour ago', capabilities: ['Rewards Management', 'Engagement Tracking', 'Program Optimization', 'Gamification'], tier: 'premium', learningProgress: 72, efficiency: 88 },
      { id: 'ce-7', name: 'AI Feedback & Survey Agent', description: 'Collects and analyzes feedback', icon: ClipboardList, enabled: true, status: 'active', tasksCompleted: 1120, successRate: 97, lastActive: '8 min ago', capabilities: ['Survey Creation', 'Sentiment Analysis', 'Insight Generation', 'NPS Tracking'], tier: 'standard', learningProgress: 94, efficiency: 99 },
      { id: 'ce-8', name: 'AI Billing Support Agent', description: 'Handles billing inquiries and issues', icon: CreditCard, enabled: true, status: 'active', tasksCompleted: 550, successRate: 94, lastActive: '15 min ago', capabilities: ['Invoice Queries', 'Payment Processing', 'Dispute Resolution', 'Subscription Management'], tier: 'premium', learningProgress: 89, efficiency: 93 },
    ],
  },
  {
    id: 'sales-revenue',
    name: 'Sales & Revenue AI',
    description: 'Manages lead generation through deal closing to revenue growth',
    mainArea: 'Lead Generation → Deal Closing → Revenue Growth',
    icon: TrendingUp,
    color: '#34C759',
    gradient: ['#34C759', '#30D158'],
    enabled: true,
    status: 'active',
    totalTasks: 8950,
    avgSuccessRate: 89,
    aiModel: 'GPT-4 Turbo',
    version: '3.1.0',
    subAgents: [
      { id: 'sr-1', name: 'AI Lead Development Rep (SDR)', description: 'Qualifies and nurtures leads', icon: UserCheck, enabled: true, status: 'active', tasksCompleted: 2340, successRate: 87, lastActive: '4 min ago', capabilities: ['Lead Scoring', 'Outreach Automation', 'Qualification', 'Nurturing Sequences'], tier: 'enterprise', learningProgress: 86, efficiency: 91 },
      { id: 'sr-2', name: 'AI Sales Rep', description: 'Handles sales conversations', icon: Briefcase, enabled: true, status: 'active', tasksCompleted: 1890, successRate: 85, lastActive: '2 min ago', capabilities: ['Product Demo', 'Objection Handling', 'Quote Generation', 'Follow-up'], tier: 'premium', learningProgress: 82, efficiency: 88 },
      { id: 'sr-3', name: 'AI Sales Executive', description: 'Full cycle sales management', icon: Building, enabled: true, status: 'active', tasksCompleted: 1120, successRate: 91, lastActive: '6 min ago', capabilities: ['Deal Management', 'Contract Negotiation', 'Account Planning', 'Revenue Forecasting'], tier: 'enterprise', learningProgress: 90, efficiency: 94 },
      { id: 'sr-4', name: 'AI CRM Assistant', description: 'Manages CRM data and insights', icon: Database, enabled: true, status: 'active', tasksCompleted: 1560, successRate: 94, lastActive: '1 min ago', capabilities: ['Data Entry', 'Pipeline Management', 'Reporting', 'Contact Enrichment'], tier: 'standard', learningProgress: 95, efficiency: 98 },
      { id: 'sr-5', name: 'AI Proposal Generator', description: 'Creates custom proposals', icon: FileText, enabled: true, status: 'active', tasksCompleted: 780, successRate: 92, lastActive: '12 min ago', capabilities: ['Template Creation', 'Personalization', 'Approval Workflow', 'Document Assembly'], tier: 'premium', learningProgress: 88, efficiency: 92 },
      { id: 'sr-6', name: 'AI Negotiator', description: 'Handles deal negotiations', icon: Handshake, enabled: true, status: 'training', tasksCompleted: 450, successRate: 86, lastActive: '20 min ago', capabilities: ['Price Negotiation', 'Term Discussion', 'Win-Win Solutions', 'Deal Structuring'], tier: 'enterprise', learningProgress: 75, efficiency: 84 },
      { id: 'sr-7', name: 'AI Upsell & Cross-sell Agent', description: 'Identifies upsell opportunities', icon: ArrowUpRight, enabled: true, status: 'active', tasksCompleted: 340, successRate: 88, lastActive: '9 min ago', capabilities: ['Opportunity Detection', 'Product Recommendations', 'Bundle Offers', 'Timing Optimization'], tier: 'premium', learningProgress: 84, efficiency: 90 },
      { id: 'sr-8', name: 'AI Account Manager', description: 'Manages key accounts', icon: Users, enabled: false, status: 'inactive', tasksCompleted: 290, successRate: 90, lastActive: '2 hours ago', capabilities: ['Relationship Management', 'Health Scoring', 'Growth Planning', 'QBR Preparation'], tier: 'enterprise', learningProgress: 79, efficiency: 87 },
      { id: 'sr-9', name: 'AI Pricing Strategist', description: 'Optimizes pricing strategies', icon: DollarSign, enabled: true, status: 'active', tasksCompleted: 180, successRate: 93, lastActive: '30 min ago', capabilities: ['Dynamic Pricing', 'Competitor Analysis', 'Margin Optimization', 'Discount Strategy'], tier: 'enterprise', learningProgress: 92, efficiency: 96 },
    ],
  },
  {
    id: 'marketing-growth',
    name: 'Marketing & Growth AI',
    description: 'Drives customer acquisition & brand growth',
    mainArea: 'Customer Acquisition & Brand Growth',
    icon: Megaphone,
    color: '#FF9500',
    gradient: ['#FF9500', '#FF6B00'],
    enabled: true,
    status: 'active',
    totalTasks: 12340,
    avgSuccessRate: 91,
    aiModel: 'GPT-4 Vision',
    version: '2.8.5',
    subAgents: [
      { id: 'mg-1', name: 'AI Chief Marketing Officer (AI-CMO)', description: 'Strategic marketing leadership', icon: Target, enabled: true, status: 'active', tasksCompleted: 890, successRate: 94, lastActive: '5 min ago', capabilities: ['Strategy Planning', 'Budget Allocation', 'Performance Review', 'Market Analysis'], tier: 'enterprise', learningProgress: 93, efficiency: 97 },
      { id: 'mg-2', name: 'AI Campaign Optimizer', description: 'Optimizes marketing campaigns', icon: Sparkles, enabled: true, status: 'active', tasksCompleted: 2340, successRate: 92, lastActive: '3 min ago', capabilities: ['A/B Testing', 'Bid Optimization', 'Creative Testing', 'Budget Reallocation'], tier: 'premium', learningProgress: 89, efficiency: 94 },
      { id: 'mg-3', name: 'AI Digital Marketer', description: 'Manages digital channels', icon: Share2, enabled: true, status: 'active', tasksCompleted: 3120, successRate: 89, lastActive: '1 min ago', capabilities: ['PPC Management', 'Display Ads', 'Retargeting', 'Attribution'], tier: 'premium', learningProgress: 85, efficiency: 91 },
      { id: 'mg-4', name: 'AI Content Generator', description: 'Creates marketing content', icon: Palette, enabled: true, status: 'active', tasksCompleted: 2890, successRate: 93, lastActive: '7 min ago', capabilities: ['Copywriting', 'Blog Posts', 'Social Content', 'Video Scripts'], tier: 'enterprise', learningProgress: 91, efficiency: 95 },
      { id: 'mg-5', name: 'AI Social Media Manager', description: 'Manages social presence', icon: Share2, enabled: true, status: 'active', tasksCompleted: 1560, successRate: 91, lastActive: '2 min ago', capabilities: ['Scheduling', 'Community Management', 'Analytics', 'Trend Detection'], tier: 'premium', learningProgress: 87, efficiency: 93 },
      { id: 'mg-6', name: 'AI SEO Agent', description: 'Optimizes search rankings', icon: Search, enabled: true, status: 'training', tasksCompleted: 670, successRate: 88, lastActive: '15 min ago', capabilities: ['Keyword Research', 'On-Page SEO', 'Link Building', 'Technical SEO'], tier: 'premium', learningProgress: 76, efficiency: 85 },
      { id: 'mg-7', name: 'AI Email Marketing Agent', description: 'Manages email campaigns', icon: Mail, enabled: true, status: 'active', tasksCompleted: 450, successRate: 90, lastActive: '10 min ago', capabilities: ['Campaign Creation', 'Segmentation', 'Automation', 'Deliverability'], tier: 'standard', learningProgress: 88, efficiency: 92 },
      { id: 'mg-8', name: 'AI Competitive Intelligence Agent', description: 'Monitors competition', icon: Eye, enabled: false, status: 'inactive', tasksCompleted: 230, successRate: 95, lastActive: '3 hours ago', capabilities: ['Competitor Tracking', 'Market Analysis', 'Trend Detection', 'Pricing Intel'], tier: 'enterprise', learningProgress: 81, efficiency: 89 },
      { id: 'mg-9', name: 'AI Audience Targeting Agent', description: 'Identifies target audiences', icon: Crosshair, enabled: true, status: 'active', tasksCompleted: 190, successRate: 87, lastActive: '20 min ago', capabilities: ['Audience Segmentation', 'Lookalike Creation', 'Persona Development', 'Intent Signals'], tier: 'premium', learningProgress: 83, efficiency: 88 },
    ],
  },
  {
    id: 'operations-management',
    name: 'Operations & Management AI',
    description: 'Handles business execution & internal operations',
    mainArea: 'Business Execution & Internal Operations',
    icon: Settings,
    color: '#5856D6',
    gradient: ['#5856D6', '#AF52DE'],
    enabled: true,
    status: 'active',
    totalTasks: 6780,
    avgSuccessRate: 96,
    aiModel: 'GPT-4 Turbo',
    version: '3.0.2',
    subAgents: [
      { id: 'om-1', name: 'AI Operations Manager', description: 'Oversees daily operations', icon: Cog, enabled: true, status: 'active', tasksCompleted: 1890, successRate: 97, lastActive: '4 min ago', capabilities: ['Process Monitoring', 'Resource Allocation', 'Performance Tracking', 'Incident Management'], tier: 'enterprise', learningProgress: 94, efficiency: 98 },
      { id: 'om-2', name: 'AI Workflow Automation Agent', description: 'Automates business workflows', icon: Workflow, enabled: true, status: 'active', tasksCompleted: 1560, successRate: 98, lastActive: '1 min ago', capabilities: ['Workflow Design', 'Trigger Management', 'Integration', 'Process Mining'], tier: 'enterprise', learningProgress: 96, efficiency: 99 },
      { id: 'om-3', name: 'AI Task Coordinator', description: 'Coordinates tasks and projects', icon: ListTodo, enabled: true, status: 'active', tasksCompleted: 1120, successRate: 95, lastActive: '6 min ago', capabilities: ['Task Assignment', 'Progress Tracking', 'Deadline Management', 'Dependency Mapping'], tier: 'premium', learningProgress: 90, efficiency: 95 },
      { id: 'om-4', name: 'AI Process Optimization Agent', description: 'Optimizes business processes', icon: RefreshCw, enabled: true, status: 'training', tasksCompleted: 780, successRate: 94, lastActive: '25 min ago', capabilities: ['Bottleneck Detection', 'Efficiency Analysis', 'Improvement Suggestions', 'Simulation'], tier: 'enterprise', learningProgress: 82, efficiency: 91 },
      { id: 'om-5', name: 'AI Resource Planner', description: 'Plans resource allocation', icon: Package, enabled: true, status: 'active', tasksCompleted: 560, successRate: 96, lastActive: '12 min ago', capabilities: ['Capacity Planning', 'Budget Forecasting', 'Resource Optimization', 'Demand Planning'], tier: 'premium', learningProgress: 91, efficiency: 96 },
      { id: 'om-6', name: 'AI Compliance Monitoring Agent', description: 'Ensures regulatory compliance', icon: Shield, enabled: true, status: 'active', tasksCompleted: 450, successRate: 99, lastActive: '8 min ago', capabilities: ['Policy Enforcement', 'Audit Trails', 'Risk Assessment', 'Regulatory Updates'], tier: 'enterprise', learningProgress: 97, efficiency: 99 },
      { id: 'om-7', name: 'AI Vendor Management Agent', description: 'Manages vendor relationships', icon: Boxes, enabled: false, status: 'inactive', tasksCompleted: 230, successRate: 93, lastActive: '4 hours ago', capabilities: ['Vendor Evaluation', 'Contract Management', 'Performance Review', 'Procurement'], tier: 'premium', learningProgress: 78, efficiency: 88 },
      { id: 'om-8', name: 'AI Quality Control Agent', description: 'Maintains quality standards', icon: CircleCheck, enabled: true, status: 'active', tasksCompleted: 190, successRate: 97, lastActive: '18 min ago', capabilities: ['Quality Audits', 'Defect Detection', 'Process Improvement', 'Standards Compliance'], tier: 'premium', learningProgress: 93, efficiency: 97 },
    ],
  },
  {
    id: 'data-intelligence',
    name: 'Data & Intelligence AI',
    description: 'Provides analytics, forecasting & decision support',
    mainArea: 'Analytics, Forecasting & Decision Support',
    icon: ChartBar,
    color: '#FF2D55',
    gradient: ['#FF2D55', '#FF6B8A'],
    enabled: true,
    status: 'active',
    totalTasks: 9450,
    avgSuccessRate: 93,
    aiModel: 'GPT-4 Analysis',
    version: '2.9.1',
    subAgents: [
      { id: 'di-1', name: 'AI Data Analyst', description: 'Analyzes business data', icon: ChartBar, enabled: true, status: 'active', tasksCompleted: 2340, successRate: 94, lastActive: '3 min ago', capabilities: ['Data Mining', 'Statistical Analysis', 'Report Generation', 'Data Visualization'], tier: 'enterprise', learningProgress: 92, efficiency: 96 },
      { id: 'di-2', name: 'AI Sales Data Analyst', description: 'Analyzes sales performance', icon: ChartLine, enabled: true, status: 'active', tasksCompleted: 1890, successRate: 92, lastActive: '5 min ago', capabilities: ['Pipeline Analysis', 'Win/Loss Analysis', 'Forecasting', 'Territory Planning'], tier: 'premium', learningProgress: 88, efficiency: 93 },
      { id: 'di-3', name: 'AI Financial Analyst', description: 'Analyzes financial data', icon: DollarSign, enabled: true, status: 'active', tasksCompleted: 1560, successRate: 95, lastActive: '10 min ago', capabilities: ['Financial Modeling', 'Budget Analysis', 'Cash Flow Forecasting', 'Variance Analysis'], tier: 'enterprise', learningProgress: 94, efficiency: 97 },
      { id: 'di-4', name: 'AI Customer Insights Agent', description: 'Extracts customer insights', icon: Users, enabled: true, status: 'active', tasksCompleted: 1120, successRate: 91, lastActive: '7 min ago', capabilities: ['Behavior Analysis', 'Segmentation', 'Journey Mapping', 'Voice of Customer'], tier: 'premium', learningProgress: 86, efficiency: 92 },
      { id: 'di-5', name: 'AI Forecasting Agent', description: 'Predicts future trends', icon: TrendingUp, enabled: true, status: 'training', tasksCompleted: 890, successRate: 89, lastActive: '20 min ago', capabilities: ['Demand Forecasting', 'Trend Prediction', 'Scenario Planning', 'Anomaly Detection'], tier: 'enterprise', learningProgress: 80, efficiency: 88 },
      { id: 'di-6', name: 'AI Risk Analyst', description: 'Identifies and assesses risks', icon: TriangleAlert, enabled: true, status: 'active', tasksCompleted: 670, successRate: 96, lastActive: '15 min ago', capabilities: ['Risk Assessment', 'Mitigation Planning', 'Impact Analysis', 'Early Warning'], tier: 'enterprise', learningProgress: 93, efficiency: 97 },
      { id: 'di-7', name: 'AI Fraud Detection Agent', description: 'Detects fraudulent activity', icon: Lock, enabled: true, status: 'active', tasksCompleted: 560, successRate: 98, lastActive: '2 min ago', capabilities: ['Anomaly Detection', 'Pattern Recognition', 'Alert Generation', 'Investigation Support'], tier: 'enterprise', learningProgress: 95, efficiency: 99 },
      { id: 'di-8', name: 'AI Competitive Analyst', description: 'Analyzes market competition', icon: Eye, enabled: false, status: 'inactive', tasksCompleted: 420, successRate: 90, lastActive: '5 hours ago', capabilities: ['Market Research', 'Competitor Benchmarking', 'SWOT Analysis', 'Market Sizing'], tier: 'premium', learningProgress: 77, efficiency: 86 },
    ],
  },
  {
    id: 'analysis-performance',
    name: 'Analysis, Insights & Performance AI',
    description: 'Comprehensive business intelligence and strategic insights',
    mainArea: 'Strategic Analysis & Executive Intelligence',
    icon: Brain,
    color: '#AF52DE',
    gradient: ['#AF52DE', '#BF5AF2'],
    enabled: true,
    status: 'active',
    totalTasks: 7890,
    avgSuccessRate: 95,
    aiModel: 'GPT-4 Executive',
    version: '3.0.0',
    subAgents: [
      { id: 'ap-1', name: 'Performance Monitoring AI', description: 'Monitors KPIs and metrics', icon: Gauge, enabled: true, status: 'active', tasksCompleted: 1890, successRate: 97, lastActive: '2 min ago', capabilities: ['KPI Tracking', 'Alert Management', 'Dashboard Generation', 'Real-time Analytics'], tier: 'enterprise', learningProgress: 95, efficiency: 98 },
      { id: 'ap-2', name: 'Business Intelligence AI', description: 'Generates business insights', icon: Lightbulb, enabled: true, status: 'active', tasksCompleted: 1560, successRate: 94, lastActive: '6 min ago', capabilities: ['Data Visualization', 'Trend Analysis', 'Insight Discovery', 'Self-Service BI'], tier: 'enterprise', learningProgress: 91, efficiency: 96 },
      { id: 'ap-3', name: 'Predictive Analytics AI', description: 'Predicts business outcomes', icon: TrendingUp, enabled: true, status: 'active', tasksCompleted: 1120, successRate: 91, lastActive: '8 min ago', capabilities: ['Predictive Modeling', 'Machine Learning', 'Outcome Forecasting', 'What-if Analysis'], tier: 'enterprise', learningProgress: 88, efficiency: 93 },
      { id: 'ap-4', name: 'Insight Generation AI', description: 'Generates actionable insights', icon: Sparkles, enabled: true, status: 'active', tasksCompleted: 890, successRate: 93, lastActive: '4 min ago', capabilities: ['Pattern Recognition', 'Recommendation Engine', 'Action Suggestions', 'Natural Language'], tier: 'enterprise', learningProgress: 90, efficiency: 95 },
      { id: 'ap-5', name: 'Customer Behavior Analysis AI', description: 'Analyzes customer behavior', icon: Activity, enabled: true, status: 'training', tasksCompleted: 780, successRate: 95, lastActive: '12 min ago', capabilities: ['Behavior Tracking', 'Cohort Analysis', 'Churn Prediction', 'LTV Modeling'], tier: 'premium', learningProgress: 84, efficiency: 91 },
      { id: 'ap-6', name: 'Customer & Market Insights AI', description: 'Market research and insights', icon: ChartPie, enabled: true, status: 'active', tasksCompleted: 560, successRate: 94, lastActive: '18 min ago', capabilities: ['Market Analysis', 'Customer Research', 'Competitive Intelligence', 'Trend Spotting'], tier: 'enterprise', learningProgress: 89, efficiency: 94 },
      { id: 'ap-7', name: 'ROI & Profitability Analysis AI', description: 'Analyzes ROI and margins', icon: DollarSign, enabled: true, status: 'active', tasksCompleted: 450, successRate: 96, lastActive: '25 min ago', capabilities: ['ROI Calculation', 'Margin Analysis', 'Cost Optimization', 'Investment Analysis'], tier: 'enterprise', learningProgress: 92, efficiency: 97 },
      { id: 'ap-8', name: 'Goal & OKR Tracking AI', description: 'Tracks goals and OKRs', icon: Target, enabled: true, status: 'active', tasksCompleted: 340, successRate: 98, lastActive: '9 min ago', capabilities: ['Goal Setting', 'Progress Tracking', 'Achievement Analysis', 'Alignment Check'], tier: 'premium', learningProgress: 96, efficiency: 99 },
      { id: 'ap-9', name: 'Executive Intelligence AI', description: 'Strategic advisor for executives', icon: Brain, enabled: false, status: 'inactive', tasksCompleted: 230, successRate: 97, lastActive: '6 hours ago', capabilities: ['Strategic Analysis', 'Board Reporting', 'Decision Support', 'Executive Summary'], tier: 'enterprise', learningProgress: 85, efficiency: 93 },
      { id: 'ap-10', name: 'AI Strategy Advisor', description: 'Provides strategic recommendations', icon: Lightbulb, enabled: true, status: 'active', tasksCompleted: 70, successRate: 99, lastActive: '30 min ago', capabilities: ['Strategy Formulation', 'Scenario Planning', 'Advisory Services', 'Best Practices'], tier: 'enterprise', learningProgress: 98, efficiency: 99 },
    ],
  },
];

const initialCoreCapabilities: CoreCapability[] = [
  { id: 'cc-1', name: 'Memory & Context Engine', description: 'Remembers customers, deals, objections, and learns from outcomes', icon: Database, enabled: true, category: 'memory', impact: 'critical', performance: 98 },
  { id: 'cc-2', name: 'Cross-Department Intelligence', description: 'Shares insights across all agents and departments', icon: Network, enabled: true, category: 'intelligence', impact: 'critical', performance: 95 },
  { id: 'cc-3', name: 'Personalized Responses', description: 'Tailors responses based on customer history', icon: Users, enabled: true, category: 'adaptation', impact: 'high', performance: 92 },
  { id: 'cc-4', name: 'Continuous Learning', description: 'Improves from every interaction outcome', icon: RefreshCw, enabled: true, category: 'learning', impact: 'critical', performance: 97 },
  { id: 'cc-5', name: 'Real-time Adaptation', description: 'Adapts strategies in real-time', icon: Zap, enabled: true, category: 'adaptation', impact: 'high', performance: 94 },
  { id: 'cc-6', name: 'Predictive Intelligence', description: 'Anticipates needs and outcomes proactively', icon: Brain, enabled: true, category: 'intelligence', impact: 'critical', performance: 91 },
  { id: 'cc-7', name: 'Natural Language Understanding', description: 'Deep comprehension of context and intent', icon: Lightbulb, enabled: true, category: 'intelligence', impact: 'critical', performance: 96 },
  { id: 'cc-8', name: 'Multi-channel Sync', description: 'Seamless experience across all channels', icon: Globe, enabled: true, category: 'adaptation', impact: 'high', performance: 93 },
  { id: 'cc-9', name: 'Autonomous Decision Making', description: 'Makes decisions within defined parameters', icon: Command, enabled: true, category: 'intelligence', impact: 'high', performance: 89 },
  { id: 'cc-10', name: 'Self-Optimization', description: 'Continuously improves own performance', icon: Wand, enabled: true, category: 'learning', impact: 'high', performance: 90 },
];

export default function AgentActivationScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [mainAgents, setMainAgents] = useState<MainAgent[]>(initialMainAgents);
  const [coreCapabilities, setCoreCapabilities] = useState<CoreCapability[]>(initialCoreCapabilities);
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'training'>('all');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedView, setSelectedView] = useState<'agents' | 'core'>('agents');
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const toggleMainAgent = useCallback((agentId: string) => {
    setMainAgents(prev => prev.map(agent => {
      if (agent.id === agentId) {
        const newEnabled = !agent.enabled;
        return {
          ...agent,
          enabled: newEnabled,
          status: newEnabled ? 'active' : 'inactive',
          subAgents: agent.subAgents.map(sub => ({
            ...sub,
            enabled: newEnabled ? sub.enabled : false,
            status: newEnabled ? sub.status : 'inactive',
          })),
        };
      }
      return agent;
    }));
  }, []);

  const toggleSubAgent = useCallback((mainAgentId: string, subAgentId: string) => {
    setMainAgents(prev => prev.map(agent => {
      if (agent.id === mainAgentId) {
        return {
          ...agent,
          subAgents: agent.subAgents.map(sub => {
            if (sub.id === subAgentId) {
              const newEnabled = !sub.enabled;
              return {
                ...sub,
                enabled: newEnabled,
                status: newEnabled ? 'active' : 'inactive',
              };
            }
            return sub;
          }),
        };
      }
      return agent;
    }));
  }, []);

  const toggleExpanded = useCallback((agentId: string) => {
    setExpandedAgents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(agentId)) {
        newSet.delete(agentId);
      } else {
        newSet.add(agentId);
      }
      return newSet;
    });
  }, []);

  const toggleCoreCapability = useCallback((capabilityId: string) => {
    setCoreCapabilities(prev => prev.map(cap => 
      cap.id === capabilityId ? { ...cap, enabled: !cap.enabled } : cap
    ));
  }, []);

  const activateAllAgents = useCallback(() => {
    setMainAgents(prev => prev.map(agent => ({
      ...agent,
      enabled: true,
      status: 'active',
      subAgents: agent.subAgents.map(sub => ({
        ...sub,
        enabled: true,
        status: 'active',
      })),
    })));
  }, []);

  const deactivateAllAgents = useCallback(() => {
    setMainAgents(prev => prev.map(agent => ({
      ...agent,
      enabled: false,
      status: 'inactive',
      subAgents: agent.subAgents.map(sub => ({
        ...sub,
        enabled: false,
        status: 'inactive',
      })),
    })));
  }, []);

  const activateAllSubAgents = useCallback((mainAgentId: string) => {
    setMainAgents(prev => prev.map(agent => {
      if (agent.id === mainAgentId && agent.enabled) {
        return {
          ...agent,
          subAgents: agent.subAgents.map(sub => ({
            ...sub,
            enabled: true,
            status: 'active',
          })),
        };
      }
      return agent;
    }));
  }, []);

  const deactivateAllSubAgents = useCallback((mainAgentId: string) => {
    setMainAgents(prev => prev.map(agent => {
      if (agent.id === mainAgentId) {
        return {
          ...agent,
          subAgents: agent.subAgents.map(sub => ({
            ...sub,
            enabled: false,
            status: 'inactive',
          })),
        };
      }
      return agent;
    }));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'paused': return '#FF9500';
      case 'training': return '#007AFF';
      case 'inactive': return '#8E8E93';
      case 'optimizing': return '#AF52DE';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Play;
      case 'paused': return Pause;
      case 'training': return RefreshCw;
      case 'inactive': return Power;
      case 'optimizing': return Sparkles;
      default: return Power;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return '#AF52DE';
      case 'premium': return '#FF9500';
      case 'standard': return '#007AFF';
      default: return '#8E8E93';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'enterprise': return Crown;
      case 'premium': return Star;
      default: return CircleCheck;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return '#FF3B30';
      case 'high': return '#FF9500';
      case 'medium': return '#34C759';
      default: return '#8E8E93';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'memory': return '#007AFF';
      case 'learning': return '#34C759';
      case 'intelligence': return '#AF52DE';
      case 'adaptation': return '#FF9500';
      default: return '#8E8E93';
    }
  };

  const filteredAgents = useMemo(() => {
    return mainAgents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.subAgents.some(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (filterStatus === 'all') return matchesSearch;
      return matchesSearch && agent.status === filterStatus;
    });
  }, [mainAgents, searchQuery, filterStatus]);

  const stats = useMemo(() => {
    const totalMainAgents = mainAgents.length;
    const activeMainAgents = mainAgents.filter(a => a.enabled).length;
    const totalSubAgents = mainAgents.reduce((acc, a) => acc + a.subAgents.length, 0);
    const activeSubAgents = mainAgents.reduce((acc, a) => acc + a.subAgents.filter(s => s.enabled).length, 0);
    const avgSuccessRate = Math.round(
      mainAgents.filter(a => a.enabled).reduce((acc, a) => acc + a.avgSuccessRate, 0) / 
      Math.max(activeMainAgents, 1)
    );
    const totalTasks = mainAgents.reduce((acc, a) => acc + a.totalTasks, 0);
    const coreEnabled = coreCapabilities.filter(c => c.enabled).length;
    return { totalMainAgents, activeMainAgents, totalSubAgents, activeSubAgents, avgSuccessRate, totalTasks, coreEnabled };
  }, [mainAgents, coreCapabilities]);

  const renderSubAgent = (mainAgent: MainAgent, subAgent: SubAgent) => {
    const StatusIcon = getStatusIcon(subAgent.status);
    const TierIcon = getTierIcon(subAgent.tier);
    
    return (
      <TouchableOpacity 
        key={subAgent.id} 
        style= [styles.subAgentCard, { backgroundColor: theme.colors.background }]}
        activeOpacity={0.7}
      >
        <View style={styles.subAgentLeft}>
          <View style= [styles.subAgentIcon, { backgroundColor: `${mainAgent.color}15` }]}>
            <subAgent.icon size={18} color={mainAgent.color} />
          </View>
          <View style={styles.subAgentInfo}>
            <View style={styles.subAgentNameRow}>
              <Text style= [styles.subAgentName, { color: theme.colors.text }]} numberOfLines={1}>{subAgent.name}</Text>
              <View style= [styles.tierBadge, { backgroundColor: `${getTierColor(subAgent.tier)}15` }]}>
                <TierIcon size={8} color={getTierColor(subAgent.tier)} />
                <Text style= [styles.tierText, { color: getTierColor(subAgent.tier) }]}>{subAgent.tier}</Text>
              </View>
            </View>
            <Text style= [styles.subAgentDesc, { color: theme.colors.secondaryText }]} numberOfLines={1}>
              {subAgent.description}
            </Text>
            <View style={styles.subAgentMeta}>
              <View style= [styles.statusDot, { backgroundColor: getStatusColor(subAgent.status) }]} />
              <Text style= [styles.subAgentStatus, { color: getStatusColor(subAgent.status) }]}>
                {subAgent.status}
              </Text>
              <Text style= [styles.subAgentStat, { color: theme.colors.secondaryText }]}>
                • {subAgent.successRate}% • {subAgent.efficiency}% eff
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style= [styles.progressBarBg, { backgroundColor: 'rgba(0,0,0,0.08)' }]}>
                <View style= [styles.progressBarFill, { width: `${subAgent.learningProgress}%`, backgroundColor: mainAgent.color }]} />
              </View>
              <Text style= [styles.progressText, { color: theme.colors.secondaryText }]}>{subAgent.learningProgress}%</Text>
            </View>
          </View>
        </View>
        <Switch
          value={subAgent.enabled && mainAgent.enabled}
          onValueChange={() => toggleSubAgent(mainAgent.id, subAgent.id)}
          trackColor={{ false: '#E5E5EA', true: `${mainAgent.color}50` }}
          thumbColor={subAgent.enabled ? mainAgent.color : '#fff'}
          disabled={!mainAgent.enabled}
        />
      </TouchableOpacity>
    );
  };

  const renderMainAgent = (agent: MainAgent) => {
    const isExpanded = expandedAgents.has(agent.id);
    const activeSubAgents = agent.subAgents.filter(s => s.enabled).length;
    const StatusIcon = getStatusIcon(agent.status);
    
    return (
      <View key={agent.id} style= [styles.mainAgentContainer, { backgroundColor: theme.colors.cardBackground }]}>
        <TouchableOpacity 
          style={styles.mainAgentHeader}
          onPress={() => toggleExpanded(agent.id)}
          activeOpacity={0.7}
        >
          <View style= [styles.mainAgentIcon, { backgroundColor: `${agent.color}20` }]}>
            <agent.icon size={24} color={agent.color} />
          </View>
          <View style={styles.mainAgentInfo}>
            <View style={styles.mainAgentTitleRow}>
              <Text style= [styles.mainAgentName, { color: theme.colors.text }]} numberOfLines={1}>
                {agent.name}
              </Text>
            </View>
            <Text style= [styles.mainAgentArea, { color: theme.colors.secondaryText }]} numberOfLines={1}>
              {agent.mainArea}
            </Text>
            <View style={styles.mainAgentStats}>
              <View style= [styles.statusBadge, { backgroundColor: `${getStatusColor(agent.status)}20` }]}>
                <StatusIcon size={10} color={getStatusColor(agent.status)} />
                <Text style= [styles.statusBadgeText, { color: getStatusColor(agent.status) }]}>{agent.status}</Text>
              </View>
              <Text style= [styles.mainAgentStatText, { color: theme.colors.secondaryText }]}>
                {activeSubAgents}/{agent.subAgents.length} active
              </Text>
              <Text style= [styles.mainAgentStatText, { color: theme.colors.secondaryText }]}>•</Text>
              <Text style= [styles.mainAgentStatText, { color: theme.colors.secondaryText }]}>
                {agent.avgSuccessRate}%
              </Text>
            </View>
            <View style={styles.modelInfo}>
              <CircuitBoard size={10} color={theme.colors.secondaryText} />
              <Text style= [styles.modelText, { color: theme.colors.secondaryText }]}>{agent.aiModel} v{agent.version}</Text>
            </View>
          </View>
          <View style={styles.mainAgentActions}>
            <Switch
              value={agent.enabled}
              onValueChange={() => toggleMainAgent(agent.id)}
              trackColor={{ false: '#E5E5EA', true: `${agent.color}50` }}
              thumbColor={agent.enabled ? agent.color : '#fff'}
            />
            {isExpanded ? (
              <ChevronDown size={20} color={theme.colors.secondaryText} />
            ) : (
              <ChevronRight size={20} color={theme.colors.secondaryText} />
            )}
          </View>
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.subAgentsContainer}>
            <View style= [styles.subAgentsDivider, { backgroundColor: `${agent.color}30` }]} />
            <View style={styles.bulkSubActions}>
              <TouchableOpacity 
                style= [styles.bulkSubButton, { backgroundColor: `${agent.color}15` }]}
                onPress={() => activateAllSubAgents(agent.id)}
              >
                <SquareCheck size={14} color={agent.color} />
                <Text style= [styles.bulkSubText, { color: agent.color }]}>Activate All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style= [styles.bulkSubButton, { backgroundColor: 'rgba(142, 142, 147, 0.15)' }]}
                onPress={() => deactivateAllSubAgents(agent.id)}
              >
                <Square size={14} color="#8E8E93" />
                <Text style= [styles.bulkSubText, { color: '#8E8E93' }]}>Deactivate All</Text>
              </TouchableOpacity>
            </View>
            {agent.subAgents.map(subAgent => renderSubAgent(agent, subAgent))}
          </View>
        )}
      </View>
    );
  };

  const renderCoreCapability = (cap: CoreCapability) => (
    <View 
      key={cap.id}
      style= [styles.coreCapCard, { backgroundColor: theme.colors.cardBackground }]}
    >
      <View style={styles.coreCapHeader}>
        <View style= [styles.coreCapIcon, { backgroundColor: `${getCategoryColor(cap.category)}20` }]}>
          <cap.icon size={18} color={getCategoryColor(cap.category)} />
        </View>
        <View style={styles.coreCapBadges}>
          <View style= [styles.impactBadge, { backgroundColor: `${getImpactColor(cap.impact)}15` }]}>
            <Text style= [styles.impactText, { color: getImpactColor(cap.impact) }]}>{cap.impact}</Text>
          </View>
        </View>
        <Switch
          value={cap.enabled}
          onValueChange={() => toggleCoreCapability(cap.id)}
          trackColor={{ false: '#E5E5EA', true: `${getCategoryColor(cap.category)}50` }}
          thumbColor={cap.enabled ? getCategoryColor(cap.category) : '#fff'}
        />
      </View>
      <Text style= [styles.coreCapName, { color: theme.colors.text }]}>{cap.name}</Text>
      <Text style= [styles.coreCapDesc, { color: theme.colors.secondaryText }]} numberOfLines={2}>
        {cap.description}
      </Text>
      <View style={styles.coreCapFooter}>
        <View style= [styles.categoryTag, { backgroundColor: `${getCategoryColor(cap.category)}15` }]}>
          <Text style= [styles.categoryTagText, { color: getCategoryColor(cap.category) }]}>{cap.category}</Text>
        </View>
        <View style={styles.performanceBar}>
          <View style= [styles.performanceBarBg, { backgroundColor: 'rgba(0,0,0,0.08)' }]}>
            <View style= [styles.performanceBarFill, { width: `${cap.performance}%`, backgroundColor: getCategoryColor(cap.category) }]} />
          </View>
          <Text style= [styles.performanceText, { color: theme.colors.secondaryText }]}>{cap.performance}%</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style= [styles.container, { backgroundColor: theme.colors.background }]}>
      <View style= [styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style= [styles.title, { color: theme.colors.text }]}>Agent Activation Center</Text>
          <Text style= [styles.subtitle, { color: theme.colors.secondaryText }]}>
            Manage AI workforce & capabilities
          </Text>
        </View>
        <TouchableOpacity 
          style= [styles.powerButton, { backgroundColor: showBulkActions ? '#FF3B3020' : theme.colors.cardBackground }]}
          onPress={() => setShowBulkActions(!showBulkActions)}
        >
          <Power size={20} color={showBulkActions ? '#FF3B30' : theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style= [styles.statsBar, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.statItem}>
          <Animated.View style= [styles.statIconBg, { backgroundColor: '#34C75920', transform: [{ scale: pulseAnim }] }]}>
            <User size={16} color="#34C759" />
          </Animated.View>
          <Text style= [styles.statValue, { color: theme.colors.text }]}>{stats.activeMainAgents}/{stats.totalMainAgents}</Text>
          <Text style= [styles.statLabel, { color: theme.colors.secondaryText }]}>Main Agents</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style= [styles.statIconBg, { backgroundColor: '#007AFF20' }]}>
            <Users size={16} color="#007AFF" />
          </View>
          <Text style= [styles.statValue, { color: theme.colors.text }]}>{stats.activeSubAgents}/{stats.totalSubAgents}</Text>
          <Text style= [styles.statLabel, { color: theme.colors.secondaryText }]}>Sub-Agents</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style= [styles.statIconBg, { backgroundColor: '#FF950020' }]}>
            <TrendingUp size={16} color="#FF9500" />
          </View>
          <Text style= [styles.statValue, { color: theme.colors.text }]}>{stats.avgSuccessRate}%</Text>
          <Text style= [styles.statLabel, { color: theme.colors.secondaryText }]}>Success</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style= [styles.statIconBg, { backgroundColor: '#AF52DE20' }]}>
            <Brain size={16} color="#AF52DE" />
          </View>
          <Text style= [styles.statValue, { color: theme.colors.text }]}>{stats.coreEnabled}/{coreCapabilities.length}</Text>
          <Text style= [styles.statLabel, { color: theme.colors.secondaryText }]}>Core AI</Text>
        </View>
      </View>

      {showBulkActions && (
        <View style= [styles.bulkActionsBar, { backgroundColor: theme.colors.cardBackground }]}>
          <TouchableOpacity 
            style= [styles.bulkActionButton, { backgroundColor: '#34C75920' }]}
            onPress={activateAllAgents}
          >
            <Rocket size={18} color="#34C759" />
            <Text style= [styles.bulkActionText, { color: '#34C759' }]}>Activate All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style= [styles.bulkActionButton, { backgroundColor: '#FF3B3020' }]}
            onPress={deactivateAllAgents}
          >
            <ToggleLeft size={18} color="#FF3B30" />
            <Text style= [styles.bulkActionText, { color: '#FF3B30' }]}>Deactivate All</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.viewToggle}>
        <TouchableOpacity
          style= [styles.viewTab, selectedView === 'agents' && { backgroundColor: theme.colors.primary }]}
          onPress={() => setSelectedView('agents')}
        >
          <User size={16} color={selectedView === 'agents' ? '#fff' : theme.colors.secondaryText} />
          <Text style= [styles.viewTabText, { color: selectedView === 'agents' ? '#fff' : theme.colors.secondaryText }]}>
            AI Agents
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style= [styles.viewTab, selectedView === 'core' && { backgroundColor: theme.colors.primary }]}
          onPress={() => setSelectedView('core')}
        >
          <CircuitBoard size={16} color={selectedView === 'core' ? '#fff' : theme.colors.secondaryText} />
          <Text style= [styles.viewTabText, { color: selectedView === 'core' ? '#fff' : theme.colors.secondaryText }]}>
            Core Intelligence
          </Text>
        </TouchableOpacity>
      </View>

      {selectedView === 'agents' && (
        <>
          <View style= [styles.searchContainer, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={18} color={theme.colors.secondaryText} />
            <TextInput
              style= [styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search agents..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <CircleAlert size={18} color={theme.colors.secondaryText} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.filterTabs}>
            {(['all', 'active', 'inactive', 'training'] as const).map((status) => (
              <TouchableOpacity
                key={status}
                style= [
                  styles.filterTab,
                  filterStatus === status && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setFilterStatus(status)}
              >
                <Text style= [
                  styles.filterTabText,
                  { color: filterStatus === status ? '#fff' : theme.colors.secondaryText }
                ]}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {selectedView === 'agents' ? (
          <>
            <View style={styles.sectionHeader}>
              <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>
                Main Agents & Sub-Agents
              </Text>
              <Text style= [styles.sectionCount, { color: theme.colors.primary }]}>{filteredAgents.length}</Text>
            </View>
            
            {filteredAgents.map(renderMainAgent)}
          </>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>
                Core Intelligence Layer
              </Text>
              <Text style= [styles.sectionCount, { color: theme.colors.primary }]}>{stats.coreEnabled} active</Text>
            </View>
            <Text style= [styles.sectionDesc, { color: theme.colors.secondaryText }]}>
              Universal capabilities that enhance all agents&apos; performance
            </Text>
            
            <View style={styles.coreCapabilitiesGrid}>
              {coreCapabilities.map(renderCoreCapability)}
            </View>

            <View style= [styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.infoHeader}>
                <Brain size={24} color={theme.colors.primary} />
                <Text style= [styles.infoTitle, { color: theme.colors.text }]}>Unified Intelligence</Text>
              </View>
              <Text style= [styles.infoText, { color: theme.colors.secondaryText }]}>
                The Core Intelligence Layer enables all agents to share knowledge, remember customer interactions, 
                learn from outcomes, and provide personalized experiences across departments. Each capability 
                builds on the others to create a cohesive AI workforce.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerCenter: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  powerButton: {
    padding: 10,
    borderRadius: 12,
  },
  statsBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 14,
    borderRadius: 14,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statIconBg: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginHorizontal: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  bulkActionsBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 10,
    borderRadius: 12,
    gap: 10,
  },
  bulkActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  bulkActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  viewToggle: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 4,
  },
  viewTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  viewTabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  filterTabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  sectionCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  sectionDesc: {
    fontSize: 13,
    marginBottom: 14,
    lineHeight: 18,
  },
  mainAgentContainer: {
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
  },
  mainAgentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  mainAgentIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mainAgentInfo: {
    flex: 1,
  },
  mainAgentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  mainAgentName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  mainAgentArea: {
    fontSize: 11,
    marginBottom: 4,
  },
  mainAgentStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  mainAgentStatText: {
    fontSize: 11,
  },
  modelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modelText: {
    fontSize: 10,
  },
  mainAgentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  subAgentsContainer: {
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  subAgentsDivider: {
    height: 2,
    borderRadius: 1,
    marginBottom: 10,
  },
  bulkSubActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  bulkSubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  bulkSubText: {
    fontSize: 12,
    fontWeight: '600',
  },
  subAgentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    marginBottom: 6,
  },
  subAgentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subAgentIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  subAgentInfo: {
    flex: 1,
    marginRight: 10,
  },
  subAgentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  subAgentName: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3,
  },
  tierText: {
    fontSize: 8,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  subAgentDesc: {
    fontSize: 10,
    marginBottom: 3,
  },
  subAgentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  subAgentStatus: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  subAgentStat: {
    fontSize: 9,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressBarBg: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  progressBarFill: {
    height: 4,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 9,
    fontWeight: '600',
    width: 28,
  },
  coreCapabilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  coreCapCard: {
    width: (width - 50) / 2,
    padding: 12,
    borderRadius: 12,
    minWidth: 150,
  },
  coreCapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  coreCapIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coreCapBadges: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 8,
  },
  impactBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  impactText: {
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  coreCapName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  coreCapDesc: {
    fontSize: 10,
    lineHeight: 14,
    marginBottom: 8,
  },
  coreCapFooter: {
    gap: 6,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  categoryTagText: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  performanceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  performanceBarBg: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  performanceBarFill: {
    height: 4,
    borderRadius: 2,
  },
  performanceText: {
    fontSize: 9,
    fontWeight: '600',
    width: 28,
  },
  infoCard: {
    padding: 16,
    borderRadius: 14,
    marginTop: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
  },
});

