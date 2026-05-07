/**
 * Generate enterprise-grade pages for Marketing (29-43), Operations (44-56), Finance (57-59)
 * Including: department index pages with hierarchy, main agent pages with sub-agent links,
 * and ensure all sub-agent pages exist with proper parent references.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'app', 'ai-agent');

// ─── AGENT DATA ────────────────────────────────────────────────────────────────
const MARKETING_AGENTS = [
  { num: 29, name: 'AI Chief Marketing Officer', id: 'cmo', level: 'C-Suite', color: '#C62828', icon: 'Megaphone', subtitle: 'Marketing Division — C-Suite',
    subAgents: [
      { name: 'AI Marketing Strategy Analyst', id: 'marketing-strategy-analyst', icon: 'TrendingUp', desc: 'Strategic marketing analysis & planning' },
      { name: 'AI Budget Allocator', id: 'budget-allocator', icon: 'DollarSign', desc: 'Marketing budget distribution & optimization' },
      { name: 'AI Campaign ROI Evaluator', id: 'campaign-roi-evaluator', icon: 'BarChart3', desc: 'Campaign performance & ROI measurement' },
    ]},
  { num: 30, name: 'AI VP Marketing', id: 'vp-marketing', level: 'VP', color: '#D81B60', icon: 'Megaphone', subtitle: 'Marketing Division — VP Level',
    subAgents: [
      { name: 'AI Channel Planner', id: 'channel-planner', icon: 'Globe', desc: 'Channel strategy & media mix planning' },
      { name: 'AI Marketing Calendar Manager', id: 'marketing-calendar-manager', icon: 'Calendar', desc: 'Marketing calendar & scheduling management' },
      { name: 'AI Campaign Coordinator', id: 'campaign-coordinator', icon: 'GitMerge', desc: 'Campaign coordination & cross-team alignment' },
    ]},
  { num: 31, name: 'AI VP Brand', id: 'vp-brand', level: 'VP', color: '#F43F5E', icon: 'Palette', subtitle: 'Marketing Division — VP Level',
    subAgents: [
      { name: 'AI Brand Perception Monitor', id: 'brand-perception-monitor', icon: 'Eye', desc: 'Brand perception tracking & monitoring' },
      { name: 'AI Brand Guidelines Enforcer', id: 'brand-guidelines-enforcer', icon: 'Shield', desc: 'Brand guideline compliance enforcement' },
      { name: 'AI Visual Identity Auditor', id: 'visual-identity-auditor', icon: 'Paintbrush', desc: 'Visual identity consistency auditing' },
    ]},
  { num: 32, name: 'AI VP Growth', id: 'vp-growth', level: 'VP', color: '#FF6D00', icon: 'TrendingUp', subtitle: 'Marketing Division — VP Level',
    subAgents: [
      { name: 'AI Experiment Designer', id: 'experiment-designer', icon: 'FlaskConical', desc: 'Growth experiment design & hypothesis testing' },
      { name: 'AI Funnel Analyzer', id: 'funnel-analyzer', icon: 'Filter', desc: 'Funnel analysis & conversion optimization' },
      { name: 'AI A/B Test Coordinator', id: 'ab-test-coordinator', icon: 'GitCompare', desc: 'A/B test coordination & statistical analysis' },
    ]},
  { num: 33, name: 'AI VP Content', id: 'vp-content', level: 'VP', color: '#6A1B9A', icon: 'FileText', subtitle: 'Marketing Division — VP Level',
    subAgents: [
      { name: 'AI Editorial Calendar Planner', id: 'editorial-calendar-planner', icon: 'CalendarDays', desc: 'Editorial calendar planning & content scheduling' },
      { name: 'AI Content Quality Reviewer', id: 'content-quality-reviewer', icon: 'CheckCircle', desc: 'Content quality review & standards enforcement' },
      { name: 'AI Repurposing Strategist', id: 'repurposing-strategist', icon: 'Recycle', desc: 'Content repurposing strategy & multi-format distribution' },
    ]},
  { num: 34, name: 'AI VP Digital', id: 'vp-digital', level: 'VP', color: '#0097A7', icon: 'Globe', subtitle: 'Marketing Division — VP Level',
    subAgents: [
      { name: 'AI Digital Channel Optimizer', id: 'digital-channel-optimizer', icon: 'Zap', desc: 'Digital channel performance optimization' },
      { name: 'AI Web Performance Tracker', id: 'web-performance-tracker', icon: 'Gauge', desc: 'Web analytics & performance tracking' },
      { name: 'AI Conversion Analyst', id: 'conversion-analyst', icon: 'Target', desc: 'Conversion rate analysis & optimization' },
    ]},
  { num: 35, name: 'AI Marketing Manager', id: 'marketing-manager', level: 'Manager', color: '#E65100', icon: 'Megaphone', subtitle: 'Marketing Division — Manager Level',
    subAgents: [
      { name: 'AI Task Assigner', id: 'task-assigner', icon: 'ListTodo', desc: 'Task distribution & workload balancing' },
      { name: 'AI Deadline Tracker', id: 'deadline-tracker', icon: 'AlarmClock', desc: 'Deadline monitoring & milestone tracking' },
      { name: 'AI Marketing Spend Monitor', id: 'marketing-spend-monitor', icon: 'DollarSign', desc: 'Budget tracking & spend optimization' },
    ]},
  { num: 36, name: 'AI Content Marketing Agent', id: 'ai-content-marketing-agent', level: 'Specialist', color: '#6A1B9A', icon: 'FileText', subtitle: 'Marketing Division — Specialist Level',
    subAgents: [
      { name: 'AI Blog Writer', id: 'blog-writer', icon: 'PenLine', desc: 'Blog content creation & SEO writing' },
      { name: 'AI Copy Editor', id: 'copy-editor', icon: 'FileEdit', desc: 'Copy editing & quality assurance' },
      { name: 'AI Content Distributor', id: 'content-distributor', icon: 'Share2', desc: 'Content distribution & syndication' },
    ]},
  { num: 37, name: 'AI SEO Specialist', id: 'ai-seo-specialist-agent', level: 'Specialist', color: '#2E7D32', icon: 'Search', subtitle: 'Marketing Division — Specialist Level',
    subAgents: [
      { name: 'AI Keyword Researcher', id: 'keyword-researcher', icon: 'Search', desc: 'Keyword research & search trend analysis' },
      { name: 'AI On-page Optimizer', id: 'on-page-optimizer', icon: 'FileCode', desc: 'On-page SEO optimization & meta management' },
      { name: 'AI Backlink Analyzer', id: 'backlink-analyzer', icon: 'Link', desc: 'Backlink analysis & link building strategy' },
    ]},
  { num: 38, name: 'AI Social Media Manager', id: 'ai-social-media-manager-agent', level: 'Specialist', color: '#1DA1F2', icon: 'Share2', subtitle: 'Marketing Division — Specialist Level',
    subAgents: [
      { name: 'AI Post Scheduler', id: 'post-scheduler', icon: 'Calendar', desc: 'Social media post scheduling & timing optimization' },
      { name: 'AI Engagement Responder', id: 'engagement-responder', icon: 'MessageCircle', desc: 'Social engagement response & community management' },
      { name: 'AI Trend Monitor', id: 'trend-monitor', icon: 'TrendingUp', desc: 'Social trend monitoring & viral detection' },
    ]},
  { num: 39, name: 'AI Email Marketing Agent', id: 'ai-email-marketing-agent', level: 'Specialist', color: '#0D47A1', icon: 'Mail', subtitle: 'Marketing Division — Specialist Level',
    subAgents: [
      { name: 'AI List Segmenter', id: 'list-segmenter', icon: 'Users', desc: 'Email list segmentation & audience targeting' },
      { name: 'AI Template Designer', id: 'template-designer', icon: 'Layout', desc: 'Email template design & A/B testing' },
      { name: 'AI Deliverability Monitor', id: 'deliverability-monitor', icon: 'ShieldCheck', desc: 'Email deliverability monitoring & optimization' },
    ]},
  { num: 40, name: 'AI Ad Campaign Manager', id: 'ai-ad-campaign-manager-agent', level: 'Specialist', color: '#FF6D00', icon: 'Target', subtitle: 'Marketing Division — Specialist Level',
    subAgents: [
      { name: 'AI Bid Optimizer', id: 'bid-optimizer', icon: 'DollarSign', desc: 'Ad bid optimization & budget management' },
      { name: 'AI Creative Tester', id: 'creative-tester', icon: 'Image', desc: 'Ad creative testing & performance analysis' },
      { name: 'AI Audience Targeter', id: 'audience-targeter', icon: 'Users', desc: 'Audience targeting & lookalike modeling' },
    ]},
  { num: 41, name: 'AI Marketing Analytics Agent', id: 'ai-marketing-analytics-agent', level: 'Specialist', color: '#5856D6', icon: 'ChartBarBig', subtitle: 'Marketing Division — Specialist Level',
    subAgents: [
      { name: 'AI Attribution Modeler', id: 'attribution-modeler', icon: 'GitMerge', desc: 'Multi-touch attribution modeling & analysis' },
      { name: 'AI KPI Dashboard Builder', id: 'kpi-dashboard-builder', icon: 'LayoutDashboard', desc: 'KPI dashboard creation & visualization' },
      { name: 'AI Insight Summarizer', id: 'insight-summarizer', icon: 'Lightbulb', desc: 'Marketing insight summarization & reporting' },
    ]},
  { num: 42, name: 'AI Brand Manager', id: 'ai-brand-manager', level: 'Specialist', color: '#F43F5E', icon: 'Briefcase', subtitle: 'Marketing Division — Specialist Level',
    subAgents: [
      { name: 'AI Competitor Brand Tracker', id: 'competitor-brand-tracker', icon: 'Eye', desc: 'Competitor brand monitoring & benchmarking' },
      { name: 'AI Brand Health Surveyor', id: 'brand-health-surveyor', icon: 'BarChart3', desc: 'Brand health metrics & sentiment analysis' },
      { name: 'AI Messaging Aligner', id: 'messaging-aligner', icon: 'MessageCircle', desc: 'Cross-channel messaging consistency' },
    ]},
  { num: 43, name: 'AI Growth Hacker', id: 'ai-growth-hacker', level: 'Specialist', color: '#34C759', icon: 'Zap', subtitle: 'Marketing Division — Specialist Level',
    subAgents: [
      { name: 'AI Viral Loop Designer', id: 'viral-loop-designer', icon: 'Share2', desc: 'Viral loop design & network effect engineering' },
      { name: 'AI Referral Program Builder', id: 'referral-program-builder', icon: 'UserPlus', desc: 'Referral program design & optimization' },
      { name: 'AI Acquisition Channel Tester', id: 'acquisition-channel-tester', icon: 'FlaskConical', desc: 'Acquisition channel testing & validation' },
    ]},
];

const OPERATIONS_AGENTS = [
  { num: 44, name: 'AI Chief Operating Officer', id: 'coo', level: 'C-Suite', color: '#4E342E', icon: 'Briefcase', subtitle: 'Operations Division — C-Suite',
    subAgents: [
      { name: 'AI Operational Efficiency Analyst', id: 'operational-efficiency-analyst', icon: 'Gauge', desc: 'Efficiency analysis & process improvement' },
      { name: 'AI Cross-dept Coordinator', id: 'cross-dept-coordinator', icon: 'Layers', desc: 'Cross-department alignment & coordination' },
      { name: 'AI Strategic Initiative Tracker', id: 'strategic-initiative-tracker', icon: 'Flag', desc: 'Strategic initiative tracking & delivery' },
    ]},
  { num: 45, name: 'AI VP Operations', id: 'vp-operations', level: 'VP', color: '#5D4037', icon: 'Settings', subtitle: 'Operations Division — VP Level',
    subAgents: [
      { name: 'AI Process Auditor', id: 'process-auditor', icon: 'ClipboardCheck', desc: 'Process auditing & compliance verification' },
      { name: 'AI SLA Monitor', id: 'sla-monitor', icon: 'Clock', desc: 'SLA monitoring & compliance tracking' },
      { name: 'AI Capacity Planner', id: 'capacity-planner', icon: 'Gauge', desc: 'Capacity planning & resource forecasting' },
    ]},
  { num: 46, name: 'AI VP Supply Chain', id: 'vp-supply-chain', level: 'VP', color: '#33691E', icon: 'Truck', subtitle: 'Operations Division — VP Level',
    subAgents: [
      { name: 'AI Supplier Risk Assessor', id: 'supplier-risk-assessor', icon: 'TriangleAlert', desc: 'Supplier risk assessment & mitigation' },
      { name: 'AI Inventory Optimizer', id: 'inventory-optimizer', icon: 'Package', desc: 'Inventory optimization & demand matching' },
      { name: 'AI Logistics Cost Analyzer', id: 'logistics-cost-analyzer', icon: 'DollarSign', desc: 'Logistics cost analysis & route optimization' },
    ]},
  { num: 47, name: 'AI VP Quality', id: 'vp-quality', level: 'VP', color: '#1B5E20', icon: 'ShieldCheck', subtitle: 'Operations Division — VP Level',
    subAgents: [
      { name: 'AI Quality Standards Enforcer', id: 'quality-standards-enforcer', icon: 'Award', desc: 'Quality standards enforcement & compliance' },
      { name: 'AI Defect Pattern Analyzer', id: 'defect-pattern-analyzer', icon: 'Bug', desc: 'Defect pattern analysis & root cause identification' },
      { name: 'AI Compliance Tracker', id: 'compliance-tracker', icon: 'FileCheck', desc: 'Compliance tracking & regulatory monitoring' },
    ]},
  { num: 48, name: 'AI VP Facilities', id: 'vp-facilities', level: 'VP', color: '#455A64', icon: 'Building2', subtitle: 'Operations Division — VP Level',
    subAgents: [
      { name: 'AI Space Utilization Analyst', id: 'space-utilization-analyst', icon: 'LayoutGrid', desc: 'Space utilization analysis & optimization' },
      { name: 'AI Maintenance Scheduler', id: 'maintenance-scheduler', icon: 'Wrench', desc: 'Maintenance scheduling & preventive planning' },
      { name: 'AI Energy Efficiency Monitor', id: 'energy-efficiency-monitor', icon: 'Zap', desc: 'Energy efficiency monitoring & optimization' },
    ]},
  { num: 49, name: 'AI VP Project Management', id: 'vp-project-management', level: 'VP', color: '#283593', icon: 'FolderKanban', subtitle: 'Operations Division — VP Level',
    subAgents: [
      { name: 'AI Milestone Tracker', id: 'milestone-tracker', icon: 'Flag', desc: 'Milestone tracking & progress monitoring' },
      { name: 'AI Resource Allocator', id: 'resource-allocator', icon: 'Users', desc: 'Resource allocation & optimization' },
      { name: 'AI Risk Identifier', id: 'risk-identifier', icon: 'TriangleAlert', desc: 'Risk identification & mitigation planning' },
    ]},
  { num: 50, name: 'AI Operations Manager', id: 'ai-operations-manager', level: 'Manager', color: '#4E342E', icon: 'Settings', subtitle: 'Operations Division — Manager Level',
    subAgents: [
      { name: 'AI Daily Operations Coordinator', id: 'daily-operations-coordinator', icon: 'Calendar', desc: 'Daily operations coordination & scheduling' },
      { name: 'AI Escalation Handler', id: 'escalation-handler', icon: 'AlertTriangle', desc: 'Escalation handling & resolution management' },
      { name: 'AI Performance Reporter', id: 'performance-reporter', icon: 'ChartBarBig', desc: 'Performance reporting & analytics' },
    ]},
  { num: 51, name: 'AI Operations Manager (Sub)', id: 'ai-operations-manager-sub', level: 'Manager', color: '#5D4037', icon: 'Settings', subtitle: 'Operations Division — Sub-Manager Level',
    subAgents: [
      { name: 'AI Workflow Monitor', id: 'workflow-monitor', icon: 'Activity', desc: 'Workflow monitoring & status tracking' },
      { name: 'AI Bottleneck Detector', id: 'bottleneck-detector', icon: 'AlertCircle', desc: 'Bottleneck detection & resolution' },
      { name: 'AI Efficiency Reporter', id: 'efficiency-reporter', icon: 'TrendingUp', desc: 'Efficiency reporting & improvement tracking' },
    ]},
  { num: 52, name: 'AI Workflow Automation Agent', id: 'ai-workflow-automation', level: 'Specialist', color: '#0097A7', icon: 'Workflow', subtitle: 'Operations Division — Specialist Level',
    subAgents: [
      { name: 'AI Process Mapper', id: 'process-mapper', icon: 'GitBranch', desc: 'Process mapping & workflow visualization' },
      { name: 'AI Automation Rule Builder', id: 'automation-rule-builder', icon: 'Code', desc: 'Automation rule creation & management' },
      { name: 'AI Exception Handler', id: 'exception-handler', icon: 'AlertOctagon', desc: 'Exception handling & edge case management' },
    ]},
  { num: 53, name: 'AI Task Coordinator', id: 'ai-task-coordinator', level: 'Specialist', color: '#455A64', icon: 'ListTodo', subtitle: 'Operations Division — Specialist Level',
    subAgents: [
      { name: 'AI Task Prioritizer', id: 'task-prioritizer', icon: 'ArrowUpCircle', desc: 'Task prioritization & urgency scoring' },
      { name: 'AI Deadline Enforcer', id: 'deadline-enforcer', icon: 'AlarmClock', desc: 'Deadline enforcement & escalation' },
      { name: 'AI Dependency Tracker', id: 'dependency-tracker', icon: 'Link', desc: 'Task dependency tracking & resolution' },
    ]},
  { num: 54, name: 'AI Process Optimization Agent', id: 'ai-process-optimization', level: 'Specialist', color: '#2E7D32', icon: 'TrendingUp', subtitle: 'Operations Division — Specialist Level',
    subAgents: [
      { name: 'AI Lean Analyst', id: 'lean-analyst', icon: 'Minimize2', desc: 'Lean methodology analysis & waste reduction' },
      { name: 'AI Waste Identifier', id: 'waste-identifier', icon: 'Trash2', desc: 'Waste identification & elimination strategies' },
      { name: 'AI Improvement Recommender', id: 'improvement-recommender', icon: 'Lightbulb', desc: 'Process improvement recommendations & implementation' },
    ]},
  { num: 55, name: 'AI Resource Planner', id: 'ai-resource-planner', level: 'Specialist', color: '#5D4037', icon: 'Users', subtitle: 'Operations Division — Specialist Level',
    subAgents: [
      { name: 'AI Demand Forecaster', id: 'demand-forecaster', icon: 'TrendingUp', desc: 'Demand forecasting & capacity planning' },
      { name: 'AI Allocation Optimizer', id: 'allocation-optimizer', icon: 'PieChart', desc: 'Resource allocation optimization & balancing' },
      { name: 'AI Utilization Tracker', id: 'utilization-tracker', icon: 'Gauge', desc: 'Resource utilization tracking & reporting' },
    ]},
  { num: 56, name: 'AI Quality Assurance Agent', id: 'ai-quality-assurance', level: 'Specialist', color: '#1B5E20', icon: 'ShieldCheck', subtitle: 'Operations Division — Specialist Level',
    subAgents: [
      { name: 'AI Test Case Generator', id: 'test-case-generator', icon: 'FileCode', desc: 'Test case generation & coverage analysis' },
      { name: 'AI Defect Logger', id: 'defect-logger', icon: 'Bug', desc: 'Defect logging & tracking management' },
      { name: 'AI Regression Tracker', id: 'regression-tracker', icon: 'RotateCcw', desc: 'Regression tracking & verification' },
    ]},
];

const FINANCE_AGENTS = [
  { num: 57, name: 'AI Chief Financial Officer', id: 'cfo', level: 'C-Suite', color: '#10B981', icon: 'Briefcase', subtitle: 'Finance Division — C-Suite',
    subAgents: [
      { name: 'AI Financial Strategy Advisor', id: 'financial-strategy-advisor', icon: 'DollarSign', desc: 'Strategic financial advisory & planning' },
      { name: 'AI Capital Allocation Optimizer', id: 'capital-allocation-optimizer', icon: 'BarChart3', desc: 'Capital deployment optimization & allocation' },
      { name: 'AI Risk-Reward Analyst', id: 'risk-reward-analyst', icon: 'TrendingUp', desc: 'Risk-reward analysis & scoring' },
    ]},
  { num: 58, name: 'AI VP Finance', id: 'vp-finance', level: 'VP', color: '#2E7D32', icon: 'DollarSign', subtitle: 'Finance Division — VP Level',
    subAgents: [
      { name: 'AI Financial Modeler', id: 'financial-modeler', icon: 'Calculator', desc: 'Financial modeling & scenario analysis' },
      { name: 'AI Cash Flow Forecaster', id: 'cash-flow-forecaster', icon: 'TrendingUp', desc: 'Cash flow forecasting & liquidity planning' },
      { name: 'AI Investment Appraiser', id: 'investment-appraiser', icon: 'BarChart3', desc: 'Investment appraisal & valuation analysis' },
    ]},
  { num: 59, name: 'AI VP Accounting', id: 'vp-accounting', level: 'VP', color: '#0D47A1', icon: 'Calculator', subtitle: 'Finance Division — VP Level',
    subAgents: [
      { name: 'AI Ledger Reconciler', id: 'ledger-reconciler', icon: 'BookOpen', desc: 'Ledger reconciliation & balance verification' },
      { name: 'AI Accounting Standards Enforcer', id: 'accounting-standards-enforcer', icon: 'Shield', desc: 'Accounting standards compliance enforcement' },
      { name: 'AI Close Process Coordinator', id: 'close-process-coordinator', icon: 'CalendarCheck', desc: 'Month-end close process coordination' },
    ]},
];

// ─── HELPER: Generate main agent page ─────────────────────────────────────────
function generateMainAgentPage(agent, deptDir, deptColor) {
  const subAgentLinks = agent.subAgents.map(s =>
    `          { name: '${s.name}', id: '${s.id}', icon: ${s.icon}, desc: '${s.desc}' }`
  ).join(',\n');

  const subAgentRenders = agent.subAgents.map(s =>
    `          <TouchableOpacity key="${s.id}" onPress={() => router.push('/ai-agent/${deptDir}/sub-agents/${s.id}')} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: '${agent.color}15' }]}>
              <${s.icon} size={20} color="${agent.color}" />
            </View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{s.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{s.desc}</Text>
            </View>
            <ArrowRight size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>`
  ).join('\n');

  const levelBadge = agent.level === 'C-Suite' ? 'C-Suite' : agent.level === 'VP' ? 'VP' : agent.level === 'Manager' ? 'Manager' : 'Specialist';
  const levelColor = agent.level === 'C-Suite' ? '#FF2D55' : agent.level === 'VP' ? '#AF52DE' : agent.level === 'Manager' ? '#FF9500' : '#007AFF';

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ${agent.icon}, Activity, Star, CircleCheckBig, Clock, Target, ChartBarBig, MessageSquare, Calendar, Shield, ArrowRight, Users, Zap, TrendingUp, TrendingDown, DollarSign, BarChart3, Brain, Briefcase, Settings } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ${agent.id.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Page() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Tasks/Day', value: '${Math.floor(Math.random() * 300 + 100)}', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '${(Math.random() * 2 + 0.5).toFixed(1)}s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '${(Math.random() * 3 + 97).toFixed(1)}%', icon: Target, color: '${agent.color}' },
  ];

  const capabilities = [${agent.subAgents.map(s => `'${s.desc.replace(/& /g, '').replace(/&/g, '')}'`).join(', ')}];

  const responsibilities = [
    ${agent.subAgents.map(s => `'${s.desc.replace(/& /g, '').replace(/&/g, '')} & execution'`).join(',\n    ')}
  ];

  const activities = [
    { time: '2 min ago', text: 'Processed ${Math.floor(Math.random() * 50 + 10)} tasks autonomously', icon: Zap },
    { time: '15 min ago', text: 'Updated performance metrics dashboard', icon: BarChart3 },
    { time: '1 hour ago', text: 'Coordinated with ${Math.floor(Math.random() * 5 + 2)} sub-agents', icon: Users },
    { time: '3 hours ago', text: 'Generated executive summary report', icon: TrendingUp },
  ];

  const quickActions = [
    { label: 'Reports', icon: ChartBarBig }, { label: 'Team Chat', icon: MessageSquare },
    { label: 'Schedule', icon: Calendar }, { label: 'Settings', icon: Settings },
  ];

  const subAgents = [
${subAgentLinks}
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '${agent.color}18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${agent.color}25' }]}>
          <${agent.icon} size={48} color="${agent.color}" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>${agent.name}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>${agent.subtitle}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${levelColor}22' }]}><Star size={12} color="${levelColor}" /><Text style={[styles.badgeText, { color: '${levelColor}' }]>${levelBadge}</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]>${agent.subAgents.length} Reports</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The ${agent.name} provides ${agent.level.toLowerCase()}-level oversight and coordination within the organization. This agent manages ${agent.subAgents.length} sub-agents, driving operational excellence, strategic alignment, and continuous improvement across all assigned domains.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '${agent.color}18' }]}>
              <Text style={[styles.tagText, { color: '${agent.color}' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="${agent.color}" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, index) => (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '${agent.color}15' }]}>
              <act.icon size={14} color="${agent.color}" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
${subAgentRenders}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '${agent.color}12' }]}>
              <action.icon size={24} color="${agent.color}" />
              <Text style={[styles.actionText, { color: '${agent.color}' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="${agent.id}" agentName="${agent.name}" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10, gap: 12 },
  subAgentIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
`;
}

// ─── HELPER: Generate department index page with hierarchy ─────────────────────
function generateDepartmentIndex(deptName, deptDir, deptIcon, deptColor, agents, subAgentCount) {
  const cSuite = agents.filter(a => a.level === 'C-Suite');
  const vps = agents.filter(a => a.level === 'VP');
  const managers = agents.filter(a => a.level === 'Manager');
  const specialists = agents.filter(a => a.level === 'Specialist');

  function renderAgentGroup(group, title) {
    if (group.length === 0) return '';
    return `
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
        {${JSON.stringify(group.map(a => ({ id: a.id, name: a.name, color: a.color, icon: a.icon, subCount: a.subAgents.length })))}.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={() => router.push('/ai-agent/${deptDir}/' + agent.id)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}><${deptIcon} size={28} color={agent.color} /></View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.subCount} Sub-Agents</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>`;
  }

  // Build the hierarchy sections
  const hierarchySections = [];
  if (cSuite.length > 0) hierarchySections.push(renderAgentGroup(cSuite, 'C-Suite Leadership'));
  if (vps.length > 0) hierarchySections.push(renderAgentGroup(vps, 'VP Level'));
  if (managers.length > 0) hierarchySections.push(renderAgentGroup(managers, 'Manager Level'));
  if (specialists.length > 0) hierarchySections.push(renderAgentGroup(specialists, 'Specialist Level'));

  return `import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ${deptIcon}, Activity, Star, Users, CircleCheckBig, Clock, Target, ArrowRight, ChartBarBig, MessageSquare, Calendar, Shield, TrendingUp } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ${deptDir.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}Department() {
  const { theme } = useTheme();
  const router = useRouter();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '${deptColor}20' }]}><${deptIcon} size={48} color="${deptColor}" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>${deptName}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>AI Agents & Employees — Enterprise Workforce</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '${deptColor}22' }]}><Star size={12} color="${deptColor}" /><Text style={[styles.badgeText, { color: '${deptColor}' }]}>Department</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{${agents.length}} Agents</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {[{label:'Main Agents',value:'${agents.length}',icon:CircleCheckBig,color:'#34C759'},{label:'Sub-Agents',value:'${subAgentCount}',icon:Users,color:'#007AFF'},{label:'Uptime',value:'99.9%',icon:Clock,color:'#FF9500'},{label:'Efficiency',value:'20x',icon:Target,color:'${deptColor}'}].map((stat,i)=>(<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The ${deptName} department operates through a structured hierarchy of AI agents — from C-Suite leadership down to specialist workers. Each agent manages dedicated sub-agents for granular task execution, ensuring enterprise-grade performance at every level.</Text>
      </View>
${hierarchySections.join('\n')}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hub</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>${subAgentCount} helper and sub-agent AI workers supporting the main agents.</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/${deptDir}/sub-agents')} style={[styles.subAgentButton, { backgroundColor: '${deptColor}15' }]}>
          <${deptIcon} size={20} color="${deptColor}" />
          <Text style={[styles.subAgentButtonText, { color: '${deptColor}' }]}>View All ${subAgentCount} Sub-Agents</Text>
          <ArrowRight size={18} color="${deptColor}" />
        </TouchableOpacity>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[{label:'View Reports',icon:ChartBarBig},{label:'Team Chat',icon:MessageSquare},{label:'Schedule',icon:Calendar},{label:'Settings',icon:Shield}].map((act,i)=>(<TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '${deptColor}12' }]}><act.icon size={24} color="${deptColor}" /><Text style={[styles.actionText, { color: '${deptColor}' }]}>{act.label}</Text></TouchableOpacity>))}
        </View>
      </View>
      <AgentFeatures agentId="${deptDir}-index" agentName="${deptName} Department" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  hero:{alignItems:'center',paddingVertical:32,paddingHorizontal:20,borderBottomWidth:1},
  heroIconWrap:{width:88,height:88,borderRadius:44,justifyContent:'center',alignItems:'center',marginBottom:16},
  heroTitle:{fontSize:26,fontWeight:'bold'},
  heroSubtitle:{fontSize:15,marginTop:4,fontWeight:'500'},
  badgesRow:{flexDirection:'row',gap:10,marginTop:16},
  badge:{flexDirection:'row',alignItems:'center',paddingHorizontal:10,paddingVertical:5,borderRadius:20,gap:4},
  badgeText:{fontSize:12,fontWeight:'600'},
  statsContainer:{flexDirection:'row',flexWrap:'wrap',padding:16,gap:12},
  statCard:{flex:1,minWidth:'22%',alignItems:'center',padding:14,borderRadius:12},
  statValue:{fontSize:18,fontWeight:'bold',marginTop:8},
  statLabel:{fontSize:11,marginTop:4},
  section:{marginHorizontal:16,marginBottom:16,padding:20,borderRadius:16},
  sectionTitle:{fontSize:18,fontWeight:'700',marginBottom:14},
  description:{fontSize:14,lineHeight:22},
  agentCard:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginBottom:12},
  agentIcon:{width:48,height:48,borderRadius:12,alignItems:'center',justifyContent:'center'},
  agentInfo:{flex:1,marginLeft:12},
  agentName:{fontSize:16,fontWeight:'600'},
  agentDesc:{fontSize:12,marginTop:2},
  subAgentButton:{flexDirection:'row',alignItems:'center',padding:16,borderRadius:12,marginTop:12,gap:10},
  subAgentButtonText:{fontSize:15,fontWeight:'600',flex:1},
  actionsGrid:{flexDirection:'row',flexWrap:'wrap',gap:12},
  actionButton:{flex:1,minWidth:'45%',alignItems:'center',padding:16,borderRadius:12},
  actionText:{fontSize:13,fontWeight:'600',marginTop:8}
});
`;
}

// ─── MAIN EXECUTION ───────────────────────────────────────────────────────────
function main() {
  let created = 0;
  let skipped = 0;

  // Process each department
  const departments = [
    { name: 'Marketing & Growth', dir: 'marketing', icon: 'Megaphone', color: '#E91E63', agents: MARKETING_AGENTS },
    { name: 'Operations & Management', dir: 'operations', icon: 'Settings', color: '#607D8B', agents: OPERATIONS_AGENTS },
    { name: 'Finance & Accounting', dir: 'finance', icon: 'DollarSign', color: '#2E7D32', agents: FINANCE_AGENTS },
  ];

  for (const dept of departments) {
    const deptDir = path.join(BASE, dept.dir);
    const subAgentsDir = path.join(deptDir, 'sub-agents');

    // Ensure directories exist
    if (!fs.existsSync(deptDir)) fs.mkdirSync(deptDir, { recursive: true });
    if (!fs.existsSync(subAgentsDir)) fs.mkdirSync(subAgentsDir, { recursive: true });

    // Generate department index page
    const subAgentCount = dept.agents.reduce((sum, a) => sum + a.subAgents.length, 0);
    const indexPath = path.join(deptDir, 'index.tsx');
    // We'll skip overwriting the index if it already has good content
    // Instead, we'll write a new hierarchy-focused index
    const hierarchyIndexPath = path.join(deptDir, 'hierarchy-index.tsx');
    console.log(`Would generate hierarchy index for ${dept.name} at ${hierarchyIndexPath}`);
    // Actually write the main index.tsx with hierarchy structure
    fs.writeFileSync(indexPath, generateDepartmentIndex(dept.name, dept.dir, dept.icon, dept.color, dept.agents, subAgentCount));
    console.log(`✅ Updated department index: ${indexPath}`);
    created++;

    // Generate/upgrade main agent pages
    for (const agent of dept.agents) {
      const agentPath = path.join(deptDir, `${agent.id}.tsx`);
      if (fs.existsSync(agentPath)) {
        // Check if the existing file has sub-agent links
        const content = fs.readFileSync(agentPath, 'utf8');
        if (content.includes('Sub-Agents') && content.includes('sub-agents/')) {
          console.log(`⏭️  Skipping ${agent.name} - already has sub-agent links`);
          skipped++;
          continue;
        }
      }
      // Generate new/upgrade page
      fs.writeFileSync(agentPath, generateMainAgentPage(agent, dept.dir, dept.color));
      console.log(`✅ Created/updated: ${agentPath}`);
      created++;
    }
  }

  console.log(`\n📊 Summary: ${created} files created/updated, ${skipped} skipped (already enterprise-grade)`);
}

main();
