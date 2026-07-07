/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Shield, Brain, Globe, Lock, AlertTriangle, CheckCircle, 
  Activity, Database, FileText, Settings, BarChart3, 
  Eye, GitBranch, Network, Zap, TrendingUp, ArrowLeft,
  Cpu, Server, HardDrive, Clock, Users, Target, Award,
  Radio, Radar, ShieldAlert, FileCheck, Layers, Workflow,
  Sparkles, AlertCircle, ChevronRight, Play, Pause, Crown
} from 'lucide-react-native';
// import { useTheme } from '@/providers/ThemeProvider';

const { width } = Dimensions.get('window');

interface GovernanceKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
}

interface GovernanceAgent {
  id: string;
  name: string;
  role: string;
  status: 'safe' | 'warning' | 'critical';
  confidence: number;
  systemsUnderControl: number;
  riskImpact: number;
  complianceContribution: number;
  metrics: {
    label: string;
    value: string;
  }[];
}

interface GovernanceEvent {
  id: string;
  type: 'deployment' | 'violation' | 'injection' | 'dataset' | 'audit' | 'risk' | 'override';
  title: string;
  description: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
}

const mockKPIs: GovernanceKPI[] = [
  { id: '1', title: 'Active AI Models', value: '8,420', change: '+124', trend: 'up', icon: Brain, color: '#06b6d4' },
  { id: '2', title: 'Deployed AI Agents', value: '4,820', change: '+32', trend: 'up', icon: Users, color: '#8b5cf6' },
  { id: '3', title: 'Policy Compliance Rate', value: '97.4%', change: '+0.8%', trend: 'up', icon: FileCheck, color: '#10b981' },
  { id: '4', title: 'Model Risk Score', value: '2.4', change: '-0.3', trend: 'down', icon: ShieldAlert, color: '#f59e0b' },
  { id: '5', title: 'Safety Violations', value: '48', change: '+5', trend: 'up', icon: AlertTriangle, color: '#ef4444' },
  { id: '6', title: 'Data Governance Score', value: '94.2%', change: '+1.2%', trend: 'up', icon: Database, color: '#06b6d4' },
  { id: '7', title: 'Prompt Injections Blocked', value: '18,420', change: '+2,340', trend: 'up', icon: Shield, color: '#10b981' },
  { id: '8', title: 'Audit Coverage', value: '99.8%', change: '+0.2%', trend: 'up', icon: FileText, color: '#8b5cf6' },
  { id: '9', title: 'Model Drift Index', value: '0.12', change: '-0.02', trend: 'down', icon: TrendingUp, color: '#f59e0b' },
  { id: '10', title: 'Human Override Rate', value: '3.2%', change: '-0.5%', trend: 'down', icon: Activity, color: '#06b6d4' },
];

const governanceAgents: GovernanceAgent[] = [
  {
    id: 'sentinel',
    name: 'Agent Sentinel',
    role: 'AI Risk Monitoring Agent',
    status: 'safe',
    confidence: 96,
    systemsUnderControl: 4820,
    riskImpact: 8.2,
    complianceContribution: 94,
    metrics: [
      { label: 'Models Monitored', value: '4,820' },
      { label: 'Anomalies Detected', value: '1,284' },
      { label: 'Risk Precision', value: '96%' },
    ]
  },
  {
    id: 'guardian',
    name: 'Agent Guardian',
    role: 'Policy Enforcement Agent',
    status: 'safe',
    confidence: 98,
    systemsUnderControl: 842,
    riskImpact: 6.8,
    complianceContribution: 98,
    metrics: [
      { label: 'Policies Enforced', value: '842' },
      { label: 'Violations Blocked', value: '18,420' },
      { label: 'Compliance Accuracy', value: '98%' },
    ]
  },
  {
    id: 'atlas',
    name: 'Agent Atlas',
    role: 'Model Lifecycle Agent',
    status: 'warning',
    confidence: 95,
    systemsUnderControl: 2481,
    riskImpact: 12.4,
    complianceContribution: 92,
    metrics: [
      { label: 'Models Registered', value: '2,481' },
      { label: 'Deployments Managed', value: '18,240' },
      { label: 'Drift Detection', value: '95%' },
    ]
  },
  {
    id: 'oracle',
    name: 'Agent Oracle',
    role: 'Data Governance Agent',
    status: 'safe',
    confidence: 94,
    systemsUnderControl: 1250,
    riskImpact: 5.6,
    complianceContribution: 96,
    metrics: [
      { label: 'Datasets Tracked', value: '1,250' },
      { label: 'PII Detected', value: '842' },
      { label: 'Data Quality', value: '94%' },
    ]
  },
  {
    id: 'watchtower',
    name: 'Agent Watchtower',
    role: 'Audit & Compliance Agent',
    status: 'safe',
    confidence: 97,
    systemsUnderControl: 3200,
    riskImpact: 4.2,
    complianceContribution: 99,
    metrics: [
      { label: 'Audit Logs', value: '3.2M' },
      { label: 'Compliance Checks', value: '12,840' },
      { label: 'Audit Coverage', value: '99.8%' },
    ]
  },
  {
    id: 'aegis',
    name: 'Agent Aegis',
    role: 'Safety & Alignment Agent',
    status: 'safe',
    confidence: 98,
    systemsUnderControl: 8420,
    riskImpact: 3.8,
    complianceContribution: 97,
    metrics: [
      { label: 'Safety Checks', value: '842K/hr' },
      { label: 'Alignment Score', value: '97%' },
      { label: 'Guardrails Active', value: '1,284' },
    ]
  },
];

const mockEvents: GovernanceEvent[] = [
  { id: '1', type: 'deployment', title: 'Model deployed', description: 'GPT-4-Turbo v2 deployed to production cluster', timestamp: '2 min ago', severity: 'info' },
  { id: '2', type: 'violation', title: 'Policy violation blocked', description: 'Unauthorized data access attempt prevented', timestamp: '5 min ago', severity: 'warning' },
  { id: '3', type: 'injection', title: 'Prompt injection detected', description: 'Jailbreak attempt blocked in customer service', timestamp: '8 min ago', severity: 'critical' },
  { id: '4', type: 'dataset', title: 'Dataset updated', description: 'Training dataset v3.2 validated and approved', timestamp: '12 min ago', severity: 'info' },
  { id: '5', type: 'audit', title: 'Audit log recorded', description: 'Model decision trace archived for compliance', timestamp: '15 min ago', severity: 'info' },
  { id: '6', type: 'risk', title: 'Risk threshold exceeded', description: 'Model drift detected in finance cluster', timestamp: '18 min ago', severity: 'warning' },
  { id: '7', type: 'override', title: 'Human override triggered', description: 'Manual intervention required for edge case', timestamp: '22 min ago', severity: 'warning' },
];

const governanceInsights = [
  { id: '1', type: 'warning', title: 'Model drift detected in production LLM cluster', action: 'Review model performance metrics' },
  { id: '2', type: 'critical', title: 'Policy coverage gap identified in customer-facing agents', action: 'Update policy enforcement rules' },
  { id: '3', type: 'warning', title: 'High-risk prompt patterns increasing in external traffic', action: 'Strengthen guardrail filters' },
  { id: '4', type: 'info', title: 'Dataset contains unverified sensitive information', action: 'Run data validation pipeline' },
  { id: '5', type: 'warning', title: 'Recommended tightening access controls for finance-related models', action: 'Review permission matrix' },
  { id: '6', type: 'critical', title: 'Unusual API rate limiting detected in EU region', action: 'Investigate traffic patterns' },
  { id: '7', type: 'info', title: 'New compliance requirement: EU AI Act Article 5', action: 'Update compliance framework' },
  { id: '8', type: 'warning', title: 'Model latency exceeding SLA in APAC region', action: 'Optimize model deployment' },
];

export default function AIGovernanceDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMonitoring, setIsMonitoring] = useState(true);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, route: '/ai-governance/index' },
    { id: 'agents', label: 'AI Agents Registry', icon: Brain, route: '/ai-governance/ai-agents-registry' },
    { id: 'models', label: 'Model Governance', icon: Cpu, route: '/ai-governance/model-governance' },
    { id: 'policy', label: 'Policy Center', icon: FileCheck, route: '/ai-governance/policy-center' },
    { id: 'data', label: 'Data Governance', icon: Database, route: '/ai-governance/data-governance' },
    { id: 'risk', label: 'Risk & Safety', icon: ShieldAlert, route: '/ai-governance/risk-safety' },
    { id: 'audit', label: 'Audit Logs', icon: FileText, route: '/ai-governance/audit-logs' },
    { id: 'evaluations', label: 'Evaluations', icon: Target, route: '/ai-governance/evaluations' },
    { id: 'permissions', label: 'Permissions & Access', icon: Lock, route: '/ai-governance/permissions' },
    { id: 'observability', label: 'Observability', icon: Eye, route: '/ai-governance/observability' },
    { id: 'compliance', label: 'Compliance', icon: Award, route: '/ai-governance/compliance' },
    { id: 'settings', label: 'Settings', icon: Settings, route: '/ai-governance/settings' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#8b5cf6';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'info': return '#06b6d4';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#8b5cf6';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'deployment': return <Play size={16} color="#06b6d4" />;
      case 'violation': return <ShieldAlert size={16} color="#f59e0b" />;
      case 'injection': return <AlertTriangle size={16} color="#ef4444" />;
      case 'dataset': return <Database size={16} color="#06b6d4" />;
      case 'audit': return <FileText size={16} color="#8b5cf6" />;
      case 'risk': return <Radar size={16} color="#f59e0b" />;
      case 'override': return <Activity size={16} color="#f59e0b" />;
      default: return <Radio size={16} color="#8b5cf6" />;
    }
  };

  const KPICard = ({ kpi }: { kpi: GovernanceKPI }) => {
    const Icon = kpi.icon;
    return (
      <View style={[styles.kpiCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: `${kpi.color}30` }]}>
        <View style={styles.kpiHeader}>
          <View style={[styles.kpiIcon, { backgroundColor: `${kpi.color}20` }]}>
            <Icon size={20} color={kpi.color} />
          </View>
          <Text style={[styles.kpiTitle, { color: '#9ca3af' }]}>{kpi.title}</Text>
        </View>
        <View style={styles.kpiContent}>
          <Text style={[styles.kpiValue, { color: '#f9fafb' }]}>{kpi.value}</Text>
          <Text style={[styles.kpiChange, { color: kpi.trend === 'up' ? '#10b981' : kpi.trend === 'down' ? '#ef4444' : '#9ca3af' }]}>
            {kpi.change}
          </Text>
        </View>
      </View>
    );
  };

  const AgentCard = ({ agent }: { agent: GovernanceAgent }) => (
    <View style={[styles.agentCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: `${getStatusColor(agent.status)}30` }]}>
      <View style={styles.agentHeader}>
        <View style={[styles.agentAvatar, { backgroundColor: `${getStatusColor(agent.status)}20` }]}>
          <Brain size={24} color={getStatusColor(agent.status)} />
        </View>
        <View style={styles.agentInfo}>
          <Text style={[styles.agentName, { color: '#f9fafb' }]}>{agent.name}</Text>
          <Text style={[styles.agentRole, { color: '#9ca3af' }]}>{agent.role}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(agent.status)}20` }]}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(agent.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(agent.status) }]}>{agent.status}</Text>
        </View>
      </View>
      <View style={styles.agentMetrics}>
        {agent.metrics.map((metric, idx) => (
          <View key={idx} style={styles.agentMetric}>
            <Text style={[styles.metricLabel, { color: '#9ca3af' }]}>{metric.label}</Text>
            <Text style={[styles.metricValue, { color: '#f9fafb' }]}>{metric.value}</Text>
          </View>
        ))}
      </View>
      <View style={styles.agentStats}>
        <View style={styles.statRow}>
          <Text style={[styles.statLabel, { color: '#9ca3af' }]}>Confidence</Text>
          <Text style={[styles.statValue, { color: '#f9fafb' }]}>{agent.confidence}%</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={[styles.statLabel, { color: '#9ca3af' }]}>Systems</Text>
          <Text style={[styles.statValue, { color: '#f9fafb' }]}>{agent.systemsUnderControl.toLocaleString()}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={[styles.statLabel, { color: '#9ca3af' }]}>Risk Impact</Text>
          <Text style={[styles.statValue, { color: agent.riskImpact > 10 ? '#ef4444' : '#f59e0b' }]}>{agent.riskImpact}%</Text>
        </View>
      </View>
    </View>
  );

  const EventCard = ({ event }: { event: GovernanceEvent }) => (
    <View style={[styles.eventCard, { backgroundColor: 'rgba(10, 15, 25, 0.6)', borderLeftWidth: 3, borderLeftColor: getSeverityColor(event.severity) }]}>
      <View style={styles.eventHeader}>
        <View style={[styles.eventIcon, { backgroundColor: `${getSeverityColor(event.severity)}20` }]}>
          {getEventIcon(event.type)}
        </View>
        <View style={styles.eventContent}>
          <Text style={[styles.eventTitle, { color: '#f9fafb' }]}>{event.title}</Text>
          <Text style={[styles.eventDescription, { color: '#9ca3af' }]}>{event.description}</Text>
        </View>
        <Text style={[styles.eventTime, { color: '#6b7280' }]}>{event.timestamp}</Text>
      </View>
    </View>
  );

  const InsightCard = ({ insight }: { insight: typeof governanceInsights[0] }) => (
    <View style={[styles.insightCard, { backgroundColor: `${insight.type === 'critical' ? 'rgba(239, 68, 68, 0.1)' : insight.type === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(6, 182, 212, 0.1)'}`, borderColor: `${insight.type === 'critical' ? '#ef4444' : insight.type === 'warning' ? '#f59e0b' : '#06b6d4'}30` }]}>
      <View style={styles.insightHeader}>
        {insight.type === 'critical' && <AlertTriangle size={20} color="#ef4444" />}
        {insight.type === 'warning' && <AlertCircle size={20} color="#f59e0b" />}
        {insight.type === 'info' && <Sparkles size={20} color="#06b6d4" />}
        <Text style={[styles.insightTitle, { color: '#f9fafb' }]}>{insight.title}</Text>
      </View>
      <TouchableOpacity style={styles.insightAction}>
        <Text style={[styles.insightActionText, { color: '#06b6d4' }]}>{insight.action}</Text>
        <ChevronRight size={16} color="#06b6d4" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#05070A' }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.mainContainer}>
        {/* Left Sidebar */}
        <View style={[styles.sidebar, { backgroundColor: 'rgba(10, 15, 25, 0.95)', borderRightWidth: 1, borderRightColor: 'rgba(6, 182, 212, 0.1)' }]}>
          <View style={styles.sidebarHeader}>
            <Shield size={32} color="#06b6d4" />
            <View>
              <Text style={[styles.sidebarTitle, { color: '#f9fafb' }]}>AI Governance</Text>
              <Text style={[styles.sidebarSubtitle, { color: '#9ca3af' }]}>Command Center</Text>
            </View>
          </View>
          
          <ScrollView style={styles.sidebarScroll} showsVerticalScrollIndicator={false}>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.sidebarItem, activeSection === item.id && { backgroundColor: 'rgba(6, 182, 212, 0.15)' }]}
                  onPress={() => {
                    if (item.route && item.route !== '/ai-governance/index') {
                      router.push(item.route);
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                >
                  <Icon size={20} color={activeSection === item.id ? '#06b6d4' : '#9ca3af'} />
                  <Text style={[styles.sidebarItemText, { color: activeSection === item.id ? '#06b6d4' : '#9ca3af' }]}>
                    {item.label}
                  </Text>
                  {activeSection === item.id && <ChevronRight size={16} color="#06b6d4" />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Top Executive Bar */}
          <View style={[styles.executiveBar, { backgroundColor: 'rgba(10, 15, 25, 0.95)', borderBottomWidth: 1, borderBottomColor: 'rgba(6, 182, 212, 0.1)' }]}>
            <View style={styles.executiveHeader}>
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft size={24} color="#f9fafb" />
              </TouchableOpacity>
              <View style={styles.executiveTitle}>
                <Text style={[styles.executiveTitleText, { color: '#f9fafb' }]}>AI Management & Governance</Text>
                <Text style={[styles.executiveSubtitle, { color: '#9ca3af' }]}>Global AI Control Plane & Model Governance Command Center</Text>
              </View>
              <TouchableOpacity 
                style={[styles.monitoringButton, { backgroundColor: isMonitoring ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)' }]}
                onPress={() => setIsMonitoring(!isMonitoring)}
              >
                {isMonitoring ? <Pause size={16} color="#10b981" /> : <Play size={16} color="#ef4444" />}
                <Text style={[styles.monitoringButtonText, { color: isMonitoring ? '#10b981' : '#ef4444' }]}>
                  {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Executive KPI Cards */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>AI Governance KPIs</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
              {mockKPIs.map(kpi => (
                <View key={kpi.id} style={styles.kpiScrollItem}>
                  <KPICard kpi={kpi} />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Chief AI Officer Scorecard */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Chief AI Officer Scorecard</Text>
            <View style={[styles.caioContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.caioHeader}>
                <View style={styles.caioProfile}>
                  <View style={[styles.caioAvatar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                    <Crown size={32} color="#06b6d4" />
                  </View>
                  <View style={styles.caioInfo}>
                    <Text style={[styles.caioName, { color: '#f9fafb' }]}>Enterprise AI Governance</Text>
                    <Text style={[styles.caioRole, { color: '#9ca3af' }]}>Global Control Plane Status</Text>
                  </View>
                </View>
                <View style={[styles.caioBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <Text style={[styles.caioBadgeText, { color: '#10b981' }]}>OPERATIONAL</Text>
                </View>
              </View>
              <View style={styles.caioMetrics}>
                <View style={styles.caioMetric}>
                  <Text style={[styles.caioMetricValue, { color: '#06b6d4' }]}>8,420</Text>
                  <Text style={[styles.caioMetricLabel, { color: '#9ca3af' }]}>AI Systems</Text>
                </View>
                <View style={styles.caioMetric}>
                  <Text style={[styles.caioMetricValue, { color: '#10b981' }]}>97.4%</Text>
                  <Text style={[styles.caioMetricLabel, { color: '#9ca3af' }]}>Compliance</Text>
                </View>
                <View style={styles.caioMetric}>
                  <Text style={[styles.caioMetricValue, { color: '#8b5cf6' }]}>94.8%</Text>
                  <Text style={[styles.caioMetricLabel, { color: '#9ca3af' }]}>Safety Score</Text>
                </View>
                <View style={styles.caioMetric}>
                  <Text style={[styles.caioMetricValue, { color: '#f59e0b' }]}>48</Text>
                  <Text style={[styles.caioMetricLabel, { color: '#9ca3af' }]}>Risk Incidents</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Enterprise AI Risk Overview */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Enterprise AI Risk Overview</Text>
            <View style={[styles.riskOverviewContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.riskOverviewGrid}>
                <View style={styles.riskOverviewCard}>
                  <View style={styles.riskOverviewHeader}>
                    <ShieldAlert size={20} color="#ef4444" />
                    <Text style={[styles.riskOverviewTitle, { color: '#f9fafb' }]}>Critical Risks</Text>
                  </View>
                  <Text style={[styles.riskOverviewValue, { color: '#ef4444' }]}>12</Text>
                  <Text style={[styles.riskOverviewSub, { color: '#9ca3af' }]}>Immediate action required</Text>
                </View>
                <View style={styles.riskOverviewCard}>
                  <View style={styles.riskOverviewHeader}>
                    <AlertTriangle size={20} color="#f59e0b" />
                    <Text style={[styles.riskOverviewTitle, { color: '#f9fafb' }]}>High Risks</Text>
                  </View>
                  <Text style={[styles.riskOverviewValue, { color: '#f59e0b' }]}>24</Text>
                  <Text style={[styles.riskOverviewSub, { color: '#9ca3af' }]}>Under investigation</Text>
                </View>
                <View style={styles.riskOverviewCard}>
                  <View style={styles.riskOverviewHeader}>
                    <Shield size={20} color="#06b6d4" />
                    <Text style={[styles.riskOverviewTitle, { color: '#f9fafb' }]}>Medium Risks</Text>
                  </View>
                  <Text style={[styles.riskOverviewValue, { color: '#06b6d4' }]}>62</Text>
                  <Text style={[styles.riskOverviewSub, { color: '#9ca3af' }]}>Monitoring in progress</Text>
                </View>
                <View style={styles.riskOverviewCard}>
                  <View style={styles.riskOverviewHeader}>
                    <CheckCircle size={20} color="#10b981" />
                    <Text style={[styles.riskOverviewTitle, { color: '#f9fafb' }]}>Resolved</Text>
                  </View>
                  <Text style={[styles.riskOverviewValue, { color: '#10b981' }]}>1,284</Text>
                  <Text style={[styles.riskOverviewSub, { color: '#9ca3af' }]}>This month</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Chief AI Governance Command Center */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Chief AI Governance Command Center</Text>
            <View style={[styles.commandCenter, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.commandMetrics}>
                <View style={styles.commandMetric}>
                  <Text style={[styles.commandMetricValue, { color: '#06b6d4' }]}>8,420</Text>
                  <Text style={[styles.commandMetricLabel, { color: '#9ca3af' }]}>Total AI Systems</Text>
                </View>
                <View style={styles.commandDivider} />
                <View style={styles.commandMetric}>
                  <Text style={[styles.commandMetricValue, { color: '#10b981' }]}>97.4%</Text>
                  <Text style={[styles.commandMetricLabel, { color: '#9ca3af' }]}>Compliant Systems</Text>
                </View>
                <View style={styles.commandDivider} />
                <View style={styles.commandMetric}>
                  <Text style={[styles.commandMetricValue, { color: '#8b5cf6' }]}>1,284</Text>
                  <Text style={[styles.commandMetricLabel, { color: '#9ca3af' }]}>Active Policies</Text>
                </View>
                <View style={styles.commandDivider} />
                <View style={styles.commandMetric}>
                  <Text style={[styles.commandMetricValue, { color: '#f59e0b' }]}>48</Text>
                  <Text style={[styles.commandMetricLabel, { color: '#9ca3af' }]}>Risk Incidents</Text>
                  <Text style={[styles.commandMetricSub, { color: '#ef4444' }]}>12 critical</Text>
                </View>
                <View style={styles.commandDivider} />
                <View style={styles.commandMetric}>
                  <Text style={[styles.commandMetricValue, { color: '#10b981' }]}>94.8%</Text>
                  <Text style={[styles.commandMetricLabel, { color: '#9ca3af' }]}>AI Safety Score</Text>
                </View>
              </View>
            </View>
          </View>

          {/* AI Governance Agents */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>AI Governance Agents</Text>
            <View style={styles.agentsGrid}>
              {governanceAgents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </View>
          </View>

          {/* Real-time Governance Events Feed */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Real-time Governance Events</Text>
              <View style={[styles.liveIndicator, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <View style={[styles.liveDot, { backgroundColor: '#10b981' }]} />
                <Text style={[styles.liveText, { color: '#10b981' }]}>LIVE</Text>
              </View>
            </View>
            <View style={styles.eventsContainer}>
              {mockEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </View>
          </View>

          {/* AI Governance Insights */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>AI Governance Insights</Text>
            <View style={styles.insightsContainer}>
              {governanceInsights.map(insight => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </View>
          </View>

          {/* Global AI Control Plane Map */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Global AI Control Plane</Text>
            <View style={[styles.controlPlaneContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.controlPlaneHeader}>
                <Globe size={20} color="#06b6d4" />
                <Text style={[styles.controlPlaneTitle, { color: '#f9fafb' }]}>Enterprise AI Systems Topology</Text>
                <View style={[styles.controlPlaneBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <Text style={[styles.controlPlaneBadgeText, { color: '#10b981' }]}>8,420 Systems</Text>
                </View>
              </View>
              <View style={styles.controlPlaneGrid}>
                <View style={[styles.controlRegion, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)' }]}>
                  <View style={styles.regionHeader}>
                    <Text style={[styles.regionName, { color: '#06b6d4' }]}>North America</Text>
                    <View style={[styles.regionStatus, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <Text style={[styles.regionStatusText, { color: '#10b981' }]}>98.2%</Text>
                    </View>
                  </View>
                  <View style={styles.regionStats}>
                    <View style={styles.regionStat}>
                      <Text style={[styles.regionStatLabel, { color: '#9ca3af' }]}>Models</Text>
                      <Text style={[styles.regionStatValue, { color: '#f9fafb' }]}>3,420</Text>
                    </View>
                    <View style={styles.regionStat}>
                      <Text style={[styles.regionStatLabel, { color: '#9ca3af' }]}>Agents</Text>
                      <Text style={[styles.regionStatValue, { color: '#f9fafb' }]}>1,842</Text>
                    </View>
                    <View style={styles.regionStat}>
                      <Text style={[styles.regionStatLabel, { color: '#9ca3af' }]}>Policies</Text>
                      <Text style={[styles.regionStatValue, { color: '#f9fafb' }]}>482</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.controlRegion, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                  <View style={styles.regionHeader}>
                    <Text style={[styles.regionName, { color: '#8b5cf6' }]}>Europe</Text>
                    <View style={[styles.regionStatus, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <Text style={[styles.regionStatusText, { color: '#10b981' }]}>97.8%</Text>
                    </View>
                  </View>
                  <View style={styles.regionStats}>
                    <View style={styles.regionStat}>
                      <Text style={[styles.regionStatLabel, { color: '#9ca3af' }]}>Models</Text>
                      <Text style={[styles.regionStatValue, { color: '#f9fafb' }]}>2,840</Text>
                    </View>
                    <View style={styles.regionStat}>
                      <Text style={[styles.regionStatLabel, { color: '#9ca3af' }]}>Agents</Text>
                      <Text style={[styles.regionStatValue, { color: '#f9fafb' }]}>1,428</Text>
                    </View>
                    <View style={styles.regionStat}>
                      <Text style={[styles.regionStatLabel, { color: '#9ca3af' }]}>Policies</Text>
                      <Text style={[styles.regionStatValue, { color: '#f9fafb' }]}>384</Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.controlRegion, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                  <View style={styles.regionHeader}>
                    <Text style={[styles.regionName, { color: '#10b981' }]}>Asia Pacific</Text>
                    <View style={[styles.regionStatus, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                      <Text style={[styles.regionStatusText, { color: '#f59e0b' }]}>96.5%</Text>
                    </View>
                  </View>
                  <View style={styles.regionStats}>
                    <View style={styles.regionStat}>
                      <Text style={[styles.regionStatLabel, { color: '#9ca3af' }]}>Models</Text>
                      <Text style={[styles.regionStatValue, { color: '#f9fafb' }]}>1,860</Text>
                    </View>
                    <View style={styles.regionStat}>
                      <Text style={[styles.regionStatLabel, { color: '#9ca3af' }]}>Agents</Text>
                      <Text style={[styles.regionStatValue, { color: '#f9fafb' }]}>942</Text>
                    </View>
                    <View style={styles.regionStat}>
                      <Text style={[styles.regionStatLabel, { color: '#9ca3af' }]}>Policies</Text>
                      <Text style={[styles.regionStatValue, { color: '#f9fafb' }]}>284</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.controlPlaneConnections}>
                <View style={styles.connectionLine} />
                <Text style={[styles.connectionLabel, { color: '#9ca3af' }]}>Active Global Connections: 8,420 | Latency: 42ms avg</Text>
              </View>
            </View>
          </View>

          {/* Model Dependency Network Graph */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9faff' }]}>Model Dependency Network</Text>
            <View style={[styles.dependencyContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.dependencyGraph}>
                <View style={[styles.dependencyNode, { backgroundColor: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4' }]}>
                  <Text style={[styles.dependencyNodeText, { color: '#06b6d4' }]}>GPT-4</Text>
                  <Text style={[styles.dependencyNodeSub, { color: '#9ca3af' }]}>Base Model</Text>
                </View>
                <View style={[styles.dependencyConnector, { backgroundColor: '#06b6d4' }]} />
                <View style={[styles.dependencyNode, { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6' }]}>
                  <Text style={[styles.dependencyNodeText, { color: '#8b5cf6' }]}>Fine-tuned</Text>
                  <Text style={[styles.dependencyNodeSub, { color: '#9ca3af' }]}>12 Variants</Text>
                </View>
                <View style={[styles.dependencyConnector, { backgroundColor: '#8b5cf6' }]} />
                <View style={[styles.dependencyNode, { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981' }]}>
                  <Text style={[styles.dependencyNodeText, { color: '#10b981' }]}>Production</Text>
                  <Text style={[styles.dependencyNodeSub, { color: '#9ca3af' }]}>48 Deployments</Text>
                </View>
              </View>
              <View style={styles.dependencyNetwork}>
                <View style={styles.networkRow}>
                  <View style={[styles.networkNode, { backgroundColor: 'rgba(6, 182, 212, 0.15)', borderColor: '#06b6d4' }]}>
                    <Text style={[styles.networkNodeText, { color: '#06b6d4' }]}>Claude-3</Text>
                    <Text style={[styles.networkNodeCount, { color: '#9ca3af' }]}>8 deps</Text>
                  </View>
                  <View style={[styles.networkNode, { backgroundColor: 'rgba(139, 92, 246, 0.15)', borderColor: '#8b5cf6' }]}>
                    <Text style={[styles.networkNodeText, { color: '#8b5cf6' }]}>Llama-2</Text>
                    <Text style={[styles.networkNodeCount, { color: '#9ca3af' }]}>15 deps</Text>
                  </View>
                  <View style={[styles.networkNode, { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderColor: '#10b981' }]}>
                    <Text style={[styles.networkNodeText, { color: '#10b981' }]}>Mistral</Text>
                    <Text style={[styles.networkNodeCount, { color: '#9ca3af' }]}>6 deps</Text>
                  </View>
                </View>
                <View style={styles.networkRow}>
                  <View style={[styles.networkNode, { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: '#f59e0b' }]}>
                    <Text style={[styles.networkNodeText, { color: '#f59e0b' }]}>Gemini</Text>
                    <Text style={[styles.networkNodeCount, { color: '#9ca3af' }]}>4 deps</Text>
                  </View>
                  <View style={[styles.networkNode, { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: '#ef4444' }]}>
                    <Text style={[styles.networkNodeText, { color: '#ef4444' }]}>Custom-1</Text>
                    <Text style={[styles.networkNodeCount, { color: '#9ca3af' }]}>22 deps</Text>
                  </View>
                  <View style={[styles.networkNode, { backgroundColor: 'rgba(6, 182, 212, 0.15)', borderColor: '#06b6d4' }]}>
                    <Text style={[styles.networkNodeText, { color: '#06b6d4' }]}>Custom-2</Text>
                    <Text style={[styles.networkNodeCount, { color: '#9ca3af' }]}>18 deps</Text>
                  </View>
                </View>
              </View>
              <View style={styles.dependencyLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#06b6d4' }]} />
                  <Text style={[styles.legendText, { color: '#9ca3af' }]}>Base Models</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#8b5cf6' }]} />
                  <Text style={[styles.legendText, { color: '#9ca3af' }]}>Fine-tuned</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#10b981' }]} />
                  <Text style={[styles.legendText, { color: '#9ca3af' }]}>Production</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: '#f59e0b' }]} />
                  <Text style={[styles.legendText, { color: '#9ca3af' }]}>Custom</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Risk Propagation Visualization */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Risk Propagation Radar</Text>
            <View style={[styles.riskPropagationContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.riskQuadrants}>
                <View style={[styles.riskQuadrant, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }]}>
                  <Text style={[styles.quadrantTitle, { color: '#ef4444' }]}>Critical Risk</Text>
                  <Text style={[styles.quadrantValue, { color: '#f9fafb' }]}>12 Systems</Text>
                </View>
                <View style={[styles.riskQuadrant, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                  <Text style={[styles.quadrantTitle, { color: '#f59e0b' }]}>High Risk</Text>
                  <Text style={[styles.quadrantValue, { color: '#f9fafb' }]}>24 Systems</Text>
                </View>
                <View style={[styles.riskQuadrant, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)' }]}>
                  <Text style={[styles.quadrantTitle, { color: '#06b6d4' }]}>Medium Risk</Text>
                  <Text style={[styles.quadrantValue, { color: '#f9fafb' }]}>48 Systems</Text>
                </View>
                <View style={[styles.riskQuadrant, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                  <Text style={[styles.quadrantTitle, { color: '#10b981' }]}>Low Risk</Text>
                  <Text style={[styles.quadrantValue, { color: '#f9fafb' }]}>8,336 Systems</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Risk Propagation Radar */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Risk Propagation Radar</Text>
            <View style={[styles.radarContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.radarHeader}>
                <Radar size={20} color="#06b6d4" />
                <Text style={[styles.radarTitle, { color: '#f9fafb' }]}>Enterprise Risk Propagation Analysis</Text>
              </View>
              <View style={styles.radarGrid}>
                <View style={styles.radarRow}>
                  <View style={styles.radarCategory}>
                    <Text style={[styles.radarCategoryName, { color: '#f9fafb' }]}>Model Drift</Text>
                    <View style={[styles.radarSeverity, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                      <Text style={[styles.radarSeverityText, { color: '#f59e0b' }]}>Medium</Text>
                    </View>
                  </View>
                  <View style={styles.radarBarContainer}>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                      <View style={[styles.radarFill, { width: '65%', backgroundColor: '#f59e0b' }]} />
                    </View>
                    <Text style={[styles.radarValue, { color: '#f59e0b' }]}>65%</Text>
                  </View>
                </View>
                <View style={styles.radarRow}>
                  <View style={styles.radarCategory}>
                    <Text style={[styles.radarCategoryName, { color: '#f9fafb' }]}>Data Quality</Text>
                    <View style={[styles.radarSeverity, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <Text style={[styles.radarSeverityText, { color: '#10b981' }]}>Low</Text>
                    </View>
                  </View>
                  <View style={styles.radarBarContainer}>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                      <View style={[styles.radarFill, { width: '25%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.radarValue, { color: '#10b981' }]}>25%</Text>
                  </View>
                </View>
                <View style={styles.radarRow}>
                  <View style={styles.radarCategory}>
                    <Text style={[styles.radarCategoryName, { color: '#f9fafb' }]}>Security Threats</Text>
                    <View style={[styles.radarSeverity, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                      <Text style={[styles.radarSeverityText, { color: '#ef4444' }]}>Critical</Text>
                    </View>
                  </View>
                  <View style={styles.radarBarContainer}>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                      <View style={[styles.radarFill, { width: '82%', backgroundColor: '#ef4444' }]} />
                    </View>
                    <Text style={[styles.radarValue, { color: '#ef4444' }]}>82%</Text>
                  </View>
                </View>
                <View style={styles.radarRow}>
                  <View style={styles.radarCategory}>
                    <Text style={[styles.radarCategoryName, { color: '#f9fafb' }]}>Compliance Gap</Text>
                    <View style={[styles.radarSeverity, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                      <Text style={[styles.radarSeverityText, { color: '#06b6d4' }]}>Low</Text>
                    </View>
                  </View>
                  <View style={styles.radarBarContainer}>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                      <View style={[styles.radarFill, { width: '18%', backgroundColor: '#06b6d4' }]} />
                    </View>
                    <Text style={[styles.radarValue, { color: '#06b6d4' }]}>18%</Text>
                  </View>
                </View>
                <View style={styles.radarRow}>
                  <View style={styles.radarCategory}>
                    <Text style={[styles.radarCategoryName, { color: '#f9fafb' }]}>Performance Degradation</Text>
                    <View style={[styles.radarSeverity, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                      <Text style={[styles.radarSeverityText, { color: '#f59e0b' }]}>Medium</Text>
                    </View>
                  </View>
                  <View style={styles.radarBarContainer}>
                    <View style={[styles.radarBar, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                      <View style={[styles.radarFill, { width: '48%', backgroundColor: '#f59e0b' }]} />
                    </View>
                    <Text style={[styles.radarValue, { color: '#f59e0b' }]}>48%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Policy Enforcement Heatmap */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Policy Enforcement Heatmap</Text>
            <View style={[styles.heatmapContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.heatmapGrid}>
                <View style={[styles.heatmapCell, { backgroundColor: 'rgba(16, 185, 129, 0.3)' }]}>
                  <Text style={[styles.heatmapCellLabel, { color: '#10b981' }]}>Data Privacy</Text>
                  <Text style={[styles.heatmapCellValue, { color: '#f9fafb' }]}>98%</Text>
                </View>
                <View style={[styles.heatmapCell, { backgroundColor: 'rgba(16, 185, 129, 0.3)' }]}>
                  <Text style={[styles.heatmapCellLabel, { color: '#10b981' }]}>Security</Text>
                  <Text style={[styles.heatmapCellValue, { color: '#f9faff' }]}>96%</Text>
                </View>
                <View style={[styles.heatmapCell, { backgroundColor: 'rgba(6, 182, 212, 0.3)' }]}>
                  <Text style={[styles.heatmapCellLabel, { color: '#06b6d4' }]}>Compliance</Text>
                  <Text style={[styles.heatmapCellValue, { color: '#f9faff' }]}>94%</Text>
                </View>
                <View style={[styles.heatmapCell, { backgroundColor: 'rgba(245, 158, 11, 0.3)' }]}>
                  <Text style={[styles.heatmapCellLabel, { color: '#f59e0b' }]}>Ethics</Text>
                  <Text style={[styles.heatmapCellValue, { color: '#f9faff' }]}>89%</Text>
                </View>
                <View style={[styles.heatmapCell, { backgroundColor: 'rgba(16, 185, 129, 0.3)' }]}>
                  <Text style={[styles.heatmapCellLabel, { color: '#10b981' }]}>Safety</Text>
                  <Text style={[styles.heatmapCellValue, { color: '#f9faff' }]}>95%</Text>
                </View>
                <View style={[styles.heatmapCell, { backgroundColor: 'rgba(6, 182, 212, 0.3)' }]}>
                  <Text style={[styles.heatmapCellLabel, { color: '#06b6d4' }]}>Transparency</Text>
                  <Text style={[styles.heatmapCellValue, { color: '#f9faff' }]}>92%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Governance Score Dashboard */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Governance Score Dashboard</Text>
            <View style={[styles.governanceScoreContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.governanceScoreGrid}>
                <View style={styles.governanceScoreCard}>
                  <View style={styles.governanceScoreHeader}>
                    <Award size={20} color="#06b6d4" />
                    <Text style={[styles.governanceScoreTitle, { color: '#f9fafb' }]}>Overall Score</Text>
                  </View>
                  <Text style={[styles.governanceScoreValue, { color: '#06b6d4' }]}>94.8</Text>
                  <View style={[styles.governanceScoreBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                    <Text style={[styles.governanceScoreBadgeText, { color: '#10b981' }]}>Excellent</Text>
                  </View>
                  <View style={styles.governanceScoreTrend}>
                    <TrendingUp size={12} color="#10b981" />
                    <Text style={[styles.governanceScoreTrendText, { color: '#10b981' }]}>+2.4% this month</Text>
                  </View>
                </View>
                <View style={styles.governanceScoreCard}>
                  <View style={styles.governanceScoreHeader}>
                    <Shield size={20} color="#8b5cf6" />
                    <Text style={[styles.governanceScoreTitle, { color: '#f9fafb' }]}>Compliance</Text>
                  </View>
                  <Text style={[styles.governanceScoreValue, { color: '#8b5cf6' }]}>97.4</Text>
                  <View style={[styles.governanceScoreBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                    <Text style={[styles.governanceScoreBadgeText, { color: '#10b981' }]}>Compliant</Text>
                  </View>
                  <View style={styles.governanceScoreTrend}>
                    <TrendingUp size={12} color="#10b981" />
                    <Text style={[styles.governanceScoreTrendText, { color: '#10b981' }]}>+1.8% this month</Text>
                  </View>
                </View>
                <View style={styles.governanceScoreCard}>
                  <View style={styles.governanceScoreHeader}>
                    <ShieldAlert size={20} color="#f59e0b" />
                    <Text style={[styles.governanceScoreTitle, { color: '#f9fafb' }]}>Risk Management</Text>
                  </View>
                  <Text style={[styles.governanceScoreValue, { color: '#f59e0b' }]}>88.2</Text>
                  <View style={[styles.governanceScoreBadge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                    <Text style={[styles.governanceScoreBadgeText, { color: '#f59e0b' }]}>Needs Attention</Text>
                  </View>
                  <View style={styles.governanceScoreTrend}>
                    <TrendingUp size={12} color="#ef4444" style={{ transform: [{ rotate: '180deg' }] }} />
                    <Text style={[styles.governanceScoreTrendText, { color: '#ef4444' }]}>-3.2% this month</Text>
                  </View>
                </View>
                <View style={styles.governanceScoreCard}>
                  <View style={styles.governanceScoreHeader}>
                    <CheckCircle size={20} color="#10b981" />
                    <Text style={[styles.governanceScoreTitle, { color: '#f9fafb' }]}>Safety</Text>
                  </View>
                  <Text style={[styles.governanceScoreValue, { color: '#10b981' }]}>96.8</Text>
                  <View style={[styles.governanceScoreBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                    <Text style={[styles.governanceScoreBadgeText, { color: '#10b981' }]}>Safe</Text>
                  </View>
                  <View style={styles.governanceScoreTrend}>
                    <TrendingUp size={12} color="#10b981" />
                    <Text style={[styles.governanceScoreTrendText, { color: '#10b981' }]}>+1.2% this month</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* AI System Health */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>AI System Health</Text>
            <View style={[styles.healthGrid, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.healthItem}>
                <View style={[styles.healthIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                  <Server size={24} color="#10b981" />
                </View>
                <View style={styles.healthInfo}>
                  <Text style={[styles.healthTitle, { color: '#f9fafb' }]}>LLM Providers</Text>
                  <Text style={[styles.healthStatus, { color: '#10b981' }]}>99.9% Uptime</Text>
                </View>
              </View>
              <View style={styles.healthItem}>
                <View style={[styles.healthIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                  <Database size={24} color="#06b6d4" />
                </View>
                <View style={styles.healthInfo}>
                  <Text style={[styles.healthTitle, { color: '#f9fafb' }]}>Vector Databases</Text>
                  <Text style={[styles.healthStatus, { color: '#06b6d4' }]}>99.8% Uptime</Text>
                </View>
              </View>
              <View style={styles.healthItem}>
                <View style={[styles.healthIcon, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                  <Network size={24} color="#8b5cf6" />
                </View>
                <View style={styles.healthInfo}>
                  <Text style={[styles.healthTitle, { color: '#f9fafb' }]}>Agent Frameworks</Text>
                  <Text style={[styles.healthStatus, { color: '#8b5cf6' }]}>Operational</Text>
                </View>
              </View>
              <View style={styles.healthItem}>
                <View style={[styles.healthIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                  <Zap size={24} color="#f59e0b" />
                </View>
                <View style={styles.healthInfo}>
                  <Text style={[styles.healthTitle, { color: '#f9fafb' }]}>API Gateways</Text>
                  <Text style={[styles.healthStatus, { color: '#f59e0b' }]}>85% Capacity</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Agent Interaction Graph */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Agent Interaction Graph</Text>
            <View style={[styles.interactionContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.interactionGrid}>
                <View style={[styles.interactionNode, { backgroundColor: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4' }]}>
                  <Brain size={20} color="#06b6d4" />
                  <Text style={[styles.interactionNodeText, { color: '#06b6d4' }]}>Sentinel</Text>
                  <Text style={[styles.interactionNodeSub, { color: '#9ca3af' }]}>Risk Monitor</Text>
                </View>
                <View style={[styles.interactionConnector, { backgroundColor: '#06b6d4' }]} />
                <View style={[styles.interactionNode, { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981' }]}>
                  <Shield size={20} color="#10b981" />
                  <Text style={[styles.interactionNodeText, { color: '#10b981' }]}>Guardian</Text>
                  <Text style={[styles.interactionNodeSub, { color: '#9ca3af' }]}>Policy Enforcer</Text>
                </View>
                <View style={[styles.interactionConnector, { backgroundColor: '#10b981' }]} />
                <View style={[styles.interactionNode, { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6' }]}>
                  <Cpu size={20} color="#8b5cf6" />
                  <Text style={[styles.interactionNodeText, { color: '#8b5cf6' }]}>Atlas</Text>
                  <Text style={[styles.interactionNodeSub, { color: '#9ca3af' }]}>Lifecycle</Text>
                </View>
              </View>
              <View style={styles.interactionStats}>
                <View style={styles.interactionStat}>
                  <Text style={[styles.interactionStatLabel, { color: '#9ca3af' }]}>Active Interactions</Text>
                  <Text style={[styles.interactionStatValue, { color: '#f9fafb' }]}>1,284/sec</Text>
                </View>
                <View style={styles.interactionStat}>
                  <Text style={[styles.interactionStatLabel, { color: '#9ca3af' }]}>Agent Handoffs</Text>
                  <Text style={[styles.interactionStatValue, { color: '#f9fafb' }]}>842/min</Text>
                </View>
              </View>
            </View>
          </View>

          {/* AI Lifecycle Orchestration Pipeline */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>AI Lifecycle Orchestration Pipeline</Text>
            <View style={[styles.pipelineContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.pipelineStages}>
                <View style={styles.pipelineStage}>
                  <View style={[styles.pipelineStageIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                    <Layers size={24} color="#06b6d4" />
                  </View>
                  <Text style={[styles.pipelineStageName, { color: '#f9fafb' }]}>Model Creation</Text>
                  <Text style={[styles.pipelineStageCount, { color: '#06b6d4' }]}>124 active</Text>
                </View>
                <View style={styles.pipelineArrow}>
                  <ChevronRight size={20} color="#9ca3af" />
                </View>
                <View style={styles.pipelineStage}>
                  <View style={[styles.pipelineStageIcon, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                    <TrendingUp size={24} color="#8b5cf6" />
                  </View>
                  <Text style={[styles.pipelineStageName, { color: '#f9fafb' }]}>Training</Text>
                  <Text style={[styles.pipelineStageCount, { color: '#8b5cf6' }]}>48 in progress</Text>
                </View>
                <View style={styles.pipelineArrow}>
                  <ChevronRight size={20} color="#9ca3af" />
                </View>
                <View style={styles.pipelineStage}>
                  <View style={[styles.pipelineStageIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                    <Shield size={24} color="#10b981" />
                  </View>
                  <Text style={[styles.pipelineStageName, { color: '#f9fafb' }]}>Safety Review</Text>
                  <Text style={[styles.pipelineStageCount, { color: '#10b981' }]}>32 pending</Text>
                </View>
                <View style={styles.pipelineArrow}>
                  <ChevronRight size={20} color="#9ca3af" />
                </View>
                <View style={styles.pipelineStage}>
                  <View style={[styles.pipelineStageIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                    <CheckCircle size={24} color="#f59e0b" />
                  </View>
                  <Text style={[styles.pipelineStageName, { color: '#f9fafb' }]}>Deployment</Text>
                  <Text style={[styles.pipelineStageCount, { color: '#f59e0b' }]}>18 approved</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Governance Score Dashboard */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Governance Score Dashboard</Text>
            <View style={[styles.governanceScoreContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.governanceScoreGrid}>
                <View style={styles.governanceScoreCard}>
                  <View style={styles.governanceScoreHeader}>
                    <Text style={[styles.governanceScoreTitle, { color: '#f9fafb' }]}>Overall Score</Text>
                    <View style={[styles.governanceScoreBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <Text style={[styles.governanceScoreBadgeText, { color: '#10b981' }]}>A+</Text>
                    </View>
                  </View>
                  <Text style={[styles.governanceScoreValue, { color: '#10b981' }]}>94.8%</Text>
                  <Text style={[styles.governanceScoreTrend, { color: '#10b981' }]}>+2.4% this month</Text>
                </View>
                <View style={styles.governanceScoreCard}>
                  <View style={styles.governanceScoreHeader}>
                    <Text style={[styles.governanceScoreTitle, { color: '#f9fafb' }]}>Compliance</Text>
                    <View style={[styles.governanceScoreBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <Text style={[styles.governanceScoreBadgeText, { color: '#10b981' }]}>A</Text>
                    </View>
                  </View>
                  <Text style={[styles.governanceScoreValue, { color: '#10b981' }]}>97.4%</Text>
                  <Text style={[styles.governanceScoreTrend, { color: '#10b981' }]}>+1.2% this month</Text>
                </View>
                <View style={styles.governanceScoreCard}>
                  <View style={styles.governanceScoreHeader}>
                    <Text style={[styles.governanceScoreTitle, { color: '#f9fafb' }]}>Safety</Text>
                    <View style={[styles.governanceScoreBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <Text style={[styles.governanceScoreBadgeText, { color: '#10b981' }]}>A</Text>
                    </View>
                  </View>
                  <Text style={[styles.governanceScoreValue, { color: '#10b981' }]}>94.8%</Text>
                  <Text style={[styles.governanceScoreTrend, { color: '#10b981' }]}>+0.8% this month</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Real-time Safety Monitoring Wall */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Real-time Safety Monitoring Wall</Text>
              <View style={[styles.liveIndicator, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <View style={[styles.liveDot, { backgroundColor: '#10b981' }]} />
                <Text style={[styles.liveText, { color: '#10b981' }]}>LIVE</Text>
              </View>
            </View>
            <View style={[styles.safetyWallContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.safetyWallGrid}>
                <View style={[styles.safetyWallPanel, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                  <Text style={[styles.safetyWallPanelTitle, { color: '#10b981' }]}>Prompt Injection</Text>
                  <Text style={[styles.safetyWallPanelValue, { color: '#f9fafb' }]}>12 blocked</Text>
                  <Text style={[styles.safetyWallPanelSub, { color: '#9ca3af' }]}>Last: 2s ago</Text>
                </View>
                <View style={[styles.safetyWallPanel, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                  <Text style={[styles.safetyWallPanelTitle, { color: '#f59e0b' }]}>Jailbreak Attempts</Text>
                  <Text style={[styles.safetyWallPanelValue, { color: '#f9fafb' }]}>8 blocked</Text>
                  <Text style={[styles.safetyWallPanelSub, { color: '#9ca3af' }]}>Last: 15s ago</Text>
                </View>
                <View style={[styles.safetyWallPanel, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                  <Text style={[styles.safetyWallPanelTitle, { color: '#10b981' }]}>PII Exposure</Text>
                  <Text style={[styles.safetyWallPanelValue, { color: '#f9fafb' }]}>0 detected</Text>
                  <Text style={[styles.safetyWallPanelSub, { color: '#9ca3af' }]}>Last: 1h ago</Text>
                </View>
                <View style={[styles.safetyWallPanel, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)' }]}>
                  <Text style={[styles.safetyWallPanelTitle, { color: '#ef4444' }]}>Data Exfiltration</Text>
                  <Text style={[styles.safetyWallPanelValue, { color: '#f9fafb' }]}>1 investigating</Text>
                  <Text style={[styles.safetyWallPanelSub, { color: '#9ca3af' }]}>Last: 1m ago</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Model Registry & Lifecycle Management */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Model Registry & Lifecycle Management</Text>
            <View style={[styles.lifecycleContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.lifecycleHeader}>
                <Text style={[styles.lifecycleSubtitle, { color: '#9ca3af' }]}>Track model versions, training data, deployment status, and approval workflow</Text>
              </View>
              
              {/* Model Lifecycle Pipeline */}
              <View style={styles.lifecyclePipeline}>
                <View style={styles.pipelineStep}>
                  <View style={[styles.pipelineStepIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4' }]}>
                    <Layers size={20} color="#06b6d4" />
                  </View>
                  <Text style={[styles.pipelineStepTitle, { color: '#f9fafb' }]}>Model Created</Text>
                  <Text style={[styles.pipelineStepCount, { color: '#06b6d4' }]}>124</Text>
                  <View style={[styles.pipelineStepStatus, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                    <Text style={[styles.pipelineStepStatusText, { color: '#10b981' }]}>Active</Text>
                  </View>
                </View>
                <View style={styles.pipelineConnector}>
                  <ChevronRight size={16} color="#9ca3af" />
                </View>
                <View style={styles.pipelineStep}>
                  <View style={[styles.pipelineStepIcon, { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6' }]}>
                    <TrendingUp size={20} color="#8b5cf6" />
                  </View>
                  <Text style={[styles.pipelineStepTitle, { color: '#f9fafb' }]}>Training Validation</Text>
                  <Text style={[styles.pipelineStepCount, { color: '#8b5cf6' }]}>48</Text>
                  <View style={[styles.pipelineStepStatus, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                    <Text style={[styles.pipelineStepStatusText, { color: '#f59e0b' }]}>In Progress</Text>
                  </View>
                </View>
                <View style={styles.pipelineConnector}>
                  <ChevronRight size={16} color="#9ca3af" />
                </View>
                <View style={styles.pipelineStep}>
                  <View style={[styles.pipelineStepIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981' }]}>
                    <Shield size={20} color="#10b981" />
                  </View>
                  <Text style={[styles.pipelineStepTitle, { color: '#f9fafb' }]}>Safety Review</Text>
                  <Text style={[styles.pipelineStepCount, { color: '#10b981' }]}>32</Text>
                  <View style={[styles.pipelineStepStatus, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                    <Text style={[styles.pipelineStepStatusText, { color: '#f59e0b' }]}>Pending</Text>
                  </View>
                </View>
                <View style={styles.pipelineConnector}>
                  <ChevronRight size={16} color="#9ca3af" />
                </View>
                <View style={styles.pipelineStep}>
                  <View style={[styles.pipelineStepIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)', borderColor: '#f59e0b' }]}>
                    <FileCheck size={20} color="#f59e0b" />
                  </View>
                  <Text style={[styles.pipelineStepTitle, { color: '#f9fafb' }]}>Policy Check</Text>
                  <Text style={[styles.pipelineStepCount, { color: '#f59e0b' }]}>18</Text>
                  <View style={[styles.pipelineStepStatus, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                    <Text style={[styles.pipelineStepStatusText, { color: '#10b981' }]}>Approved</Text>
                  </View>
                </View>
                <View style={styles.pipelineConnector}>
                  <ChevronRight size={16} color="#9ca3af" />
                </View>
                <View style={styles.pipelineStep}>
                  <View style={[styles.pipelineStepIcon, { backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444' }]}>
                    <Play size={20} color="#ef4444" />
                  </View>
                  <Text style={[styles.pipelineStepTitle, { color: '#f9fafb' }]}>Deployment</Text>
                  <Text style={[styles.pipelineStepCount, { color: '#ef4444' }]}>12</Text>
                  <View style={[styles.pipelineStepStatus, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                    <Text style={[styles.pipelineStepStatusText, { color: '#10b981' }]}>Production</Text>
                  </View>
                </View>
                <View style={styles.pipelineConnector}>
                  <ChevronRight size={16} color="#9ca3af" />
                </View>
                <View style={styles.pipelineStep}>
                  <View style={[styles.pipelineStepIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4' }]}>
                    <Activity size={20} color="#06b6d4" />
                  </View>
                  <Text style={[styles.pipelineStepTitle, { color: '#f9fafb' }]}>Monitoring</Text>
                  <Text style={[styles.pipelineStepCount, { color: '#06b6d4' }]}>842</Text>
                  <View style={[styles.pipelineStepStatus, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                    <Text style={[styles.pipelineStepStatusText, { color: '#10b981' }]}>Live</Text>
                  </View>
                </View>
              </View>

              {/* Model Version Comparison */}
              <View style={styles.modelVersionsSection}>
                <Text style={[styles.modelVersionsTitle, { color: '#f9fafb' }]}>Model Version Comparison</Text>
                <View style={styles.modelVersionsGrid}>
                  <View style={[styles.modelVersionCard, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)' }]}>
                    <View style={styles.modelVersionHeader}>
                      <Text style={[styles.modelVersionName, { color: '#06b6d4' }]}>GPT-4-Turbo v2.1</Text>
                      <View style={[styles.modelVersionBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                        <Text style={[styles.modelVersionBadgeText, { color: '#10b981' }]}>Production</Text>
                      </View>
                    </View>
                    <View style={styles.modelVersionMetrics}>
                      <View style={styles.modelVersionMetric}>
                        <Text style={[styles.modelVersionMetricLabel, { color: '#9ca3af' }]}>Accuracy</Text>
                        <Text style={[styles.modelVersionMetricValue, { color: '#f9fafb' }]}>96.8%</Text>
                      </View>
                      <View style={styles.modelVersionMetric}>
                        <Text style={[styles.modelVersionMetricLabel, { color: '#9ca3af' }]}>Latency</Text>
                        <Text style={[styles.modelVersionMetricValue, { color: '#f9faff' }]}>42ms</Text>
                      </View>
                      <View style={styles.modelVersionMetric}>
                        <Text style={[styles.modelVersionMetricLabel, { color: '#9ca3af' }]}>Cost/1K</Text>
                        <Text style={[styles.modelVersionMetricValue, { color: '#f9faff' }]}>$0.01</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.modelVersionCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                    <View style={styles.modelVersionHeader}>
                      <Text style={[styles.modelVersionName, { color: '#8b5cf6' }]}>GPT-4-Turbo v2.0</Text>
                      <View style={[styles.modelVersionBadge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                        <Text style={[styles.modelVersionBadgeText, { color: '#f59e0b' }]}>Staging</Text>
                      </View>
                    </View>
                    <View style={styles.modelVersionMetrics}>
                      <View style={styles.modelVersionMetric}>
                        <Text style={[styles.modelVersionMetricLabel, { color: '#9ca3af' }]}>Accuracy</Text>
                        <Text style={[styles.modelVersionMetricValue, { color: '#f9fafb' }]}>95.2%</Text>
                      </View>
                      <View style={styles.modelVersionMetric}>
                        <Text style={[styles.modelVersionMetricLabel, { color: '#9ca3af' }]}>Latency</Text>
                        <Text style={[styles.modelVersionMetricValue, { color: '#f9faff' }]}>38ms</Text>
                      </View>
                      <View style={styles.modelVersionMetric}>
                        <Text style={[styles.modelVersionMetricLabel, { color: '#9ca3af' }]}>Cost/1K</Text>
                        <Text style={[styles.modelVersionMetricValue, { color: '#f9faff' }]}>$0.008</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.modelVersionCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                    <View style={styles.modelVersionHeader}>
                      <Text style={[styles.modelVersionName, { color: '#10b981' }]}>Claude-3.5-Sonnet</Text>
                      <View style={[styles.modelVersionBadge, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                        <Text style={[styles.modelVersionBadgeText, { color: '#06b6d4' }]}>Testing</Text>
                      </View>
                    </View>
                    <View style={styles.modelVersionMetrics}>
                      <View style={styles.modelVersionMetric}>
                        <Text style={[styles.modelVersionMetricLabel, { color: '#9ca3af' }]}>Accuracy</Text>
                        <Text style={[styles.modelVersionMetricValue, { color: '#f9fafb' }]}>97.4%</Text>
                      </View>
                      <View style={styles.modelVersionMetric}>
                        <Text style={[styles.modelVersionMetricLabel, { color: '#9ca3af' }]}>Latency</Text>
                        <Text style={[styles.modelVersionMetricValue, { color: '#f9faff' }]}>45ms</Text>
                      </View>
                      <View style={styles.modelVersionMetric}>
                        <Text style={[styles.modelVersionMetricLabel, { color: '#9ca3af' }]}>Cost/1K</Text>
                        <Text style={[styles.modelVersionMetricValue, { color: '#f9faff' }]}>$0.015</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Deployment Readiness Matrix */}
              <View style={styles.deploymentMatrixSection}>
                <Text style={[styles.deploymentMatrixTitle, { color: '#f9fafb' }]}>Deployment Readiness Matrix</Text>
                <View style={styles.deploymentMatrixGrid}>
                  <View style={styles.deploymentMatrixRow}>
                    <Text style={[styles.deploymentMatrixLabel, { color: '#9ca3af' }]}>Safety Validation</Text>
                    <View style={[styles.deploymentMatrixBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.deploymentMatrixFill, { width: '98%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.deploymentMatrixValue, { color: '#10b981' }]}>98%</Text>
                  </View>
                  <View style={styles.deploymentMatrixRow}>
                    <Text style={[styles.deploymentMatrixLabel, { color: '#9ca3af' }]}>Policy Compliance</Text>
                    <View style={[styles.deploymentMatrixBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.deploymentMatrixFill, { width: '96%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.deploymentMatrixValue, { color: '#10b981' }]}>96%</Text>
                  </View>
                  <View style={styles.deploymentMatrixRow}>
                    <Text style={[styles.deploymentMatrixLabel, { color: '#9ca3af' }]}>Performance Benchmarks</Text>
                    <View style={[styles.deploymentMatrixBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                      <View style={[styles.deploymentMatrixFill, { width: '94%', backgroundColor: '#06b6d4' }]} />
                    </View>
                    <Text style={[styles.deploymentMatrixValue, { color: '#06b6d4' }]}>94%</Text>
                  </View>
                  <View style={styles.deploymentMatrixRow}>
                    <Text style={[styles.deploymentMatrixLabel, { color: '#9ca3af' }]}>Data Quality</Text>
                    <View style={[styles.deploymentMatrixBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.deploymentMatrixFill, { width: '92%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.deploymentMatrixValue, { color: '#10b981' }]}>92%</Text>
                  </View>
                  <View style={styles.deploymentMatrixRow}>
                    <Text style={[styles.deploymentMatrixLabel, { color: '#9ca3af' }]}>Infrastructure Ready</Text>
                    <View style={[styles.deploymentMatrixBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                      <View style={[styles.deploymentMatrixFill, { width: '88%', backgroundColor: '#f59e0b' }]} />
                    </View>
                    <Text style={[styles.deploymentMatrixValue, { color: '#f59e0b' }]}>88%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Policy & Compliance Engine */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Policy & Compliance Engine</Text>
            <View style={[styles.policyContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.policyHeader}>
                <Text style={[styles.policySubtitle, { color: '#9ca3af' }]}>Monitor AI usage policies, regulatory requirements, and compliance enforcement</Text>
              </View>

              {/* Policy Enforcement Graph */}
              <View style={styles.policyEnforcementSection}>
                <Text style={[styles.policyEnforcementTitle, { color: '#f9fafb' }]}>Policy Enforcement Graph</Text>
                <View style={styles.policyEnforcementGrid}>
                  <View style={styles.policyEnforcementCard}>
                    <View style={styles.policyEnforcementHeader}>
                      <FileCheck size={20} color="#10b981" />
                      <Text style={[styles.policyEnforcementCardTitle, { color: '#f9fafb' }]}>Data Privacy</Text>
                    </View>
                    <Text style={[styles.policyEnforcementValue, { color: '#10b981' }]}>98.2%</Text>
                    <Text style={[styles.policyEnforcementSub, { color: '#9ca3af' }]}>1,284 checks/hr</Text>
                  </View>
                  <View style={styles.policyEnforcementCard}>
                    <View style={styles.policyEnforcementHeader}>
                      <Shield size={20} color="#06b6d4" />
                      <Text style={[styles.policyEnforcementCardTitle, { color: '#f9fafb' }]}>Security</Text>
                    </View>
                    <Text style={[styles.policyEnforcementValue, { color: '#06b6d4' }]}>96.8%</Text>
                    <Text style={[styles.policyEnforcementSub, { color: '#9ca3af' }]}>842 checks/hr</Text>
                  </View>
                  <View style={styles.policyEnforcementCard}>
                    <View style={styles.policyEnforcementHeader}>
                      <Award size={20} color="#8b5cf6" />
                      <Text style={[styles.policyEnforcementCardTitle, { color: '#f9fafb' }]}>Compliance</Text>
                    </View>
                    <Text style={[styles.policyEnforcementValue, { color: '#8b5cf6' }]}>94.5%</Text>
                    <Text style={[styles.policyEnforcementSub, { color: '#9ca3af' }]}>624 checks/hr</Text>
                  </View>
                  <View style={styles.policyEnforcementCard}>
                    <View style={styles.policyEnforcementHeader}>
                      <Sparkles size={20} color="#f59e0b" />
                      <Text style={[styles.policyEnforcementCardTitle, { color: '#f9fafb' }]}>Ethics</Text>
                    </View>
                    <Text style={[styles.policyEnforcementValue, { color: '#f59e0b' }]}>89.2%</Text>
                    <Text style={[styles.policyEnforcementSub, { color: '#9ca3af' }]}>412 checks/hr</Text>
                  </View>
                </View>
              </View>

              {/* Regulatory Compliance Monitor */}
              <View style={styles.regulatorySection}>
                <Text style={[styles.regulatoryTitle, { color: '#f9fafb' }]}>Regulatory Compliance Monitor</Text>
                <View style={styles.regulatoryGrid}>
                  <View style={[styles.regulatoryCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
                    <View style={styles.regulatoryCardHeader}>
                      <Text style={[styles.regulatoryCardName, { color: '#10b981' }]}>EU AI Act</Text>
                      <View style={[styles.regulatoryCardBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                        <Text style={[styles.regulatoryCardBadgeText, { color: '#10b981' }]}>Compliant</Text>
                      </View>
                    </View>
                    <View style={styles.regulatoryCardMetrics}>
                      <View style={styles.regulatoryCardMetric}>
                        <Text style={[styles.regulatoryCardMetricLabel, { color: '#9ca3af' }]}>Article 5</Text>
                        <Text style={[styles.regulatoryCardMetricValue, { color: '#f9fafb' }]}>100%</Text>
                      </View>
                      <View style={styles.regulatoryCardMetric}>
                        <Text style={[styles.regulatoryCardMetricLabel, { color: '#9ca3af' }]}>Risk Classification</Text>
                        <Text style={[styles.regulatoryCardMetricValue, { color: '#f9faff' }]}>98%</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.regulatoryCard, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)' }]}>
                    <View style={styles.regulatoryCardHeader}>
                      <Text style={[styles.regulatoryCardName, { color: '#06b6d4' }]}>ISO 42001</Text>
                      <View style={[styles.regulatoryCardBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                        <Text style={[styles.regulatoryCardBadgeText, { color: '#10b981' }]}>Certified</Text>
                      </View>
                    </View>
                    <View style={styles.regulatoryCardMetrics}>
                      <View style={styles.regulatoryCardMetric}>
                        <Text style={[styles.regulatoryCardMetricLabel, { color: '#9ca3af' }]}>AI Management</Text>
                        <Text style={[styles.regulatoryCardMetricValue, { color: '#f9fafb' }]}>96%</Text>
                      </View>
                      <View style={styles.regulatoryCardMetric}>
                        <Text style={[styles.regulatoryCardMetricLabel, { color: '#9ca3af' }]}>Risk Assessment</Text>
                        <Text style={[styles.regulatoryCardMetricValue, { color: '#f9faff' }]}>94%</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.regulatoryCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.3)' }]}>
                    <View style={styles.regulatoryCardHeader}>
                      <Text style={[styles.regulatoryCardName, { color: '#8b5cf6' }]}>SOC 2 AI</Text>
                      <View style={[styles.regulatoryCardBadge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                        <Text style={[styles.regulatoryCardBadgeText, { color: '#f59e0b' }]}>In Progress</Text>
                      </View>
                    </View>
                    <View style={styles.regulatoryCardMetrics}>
                      <View style={styles.regulatoryCardMetric}>
                        <Text style={[styles.regulatoryCardMetricLabel, { color: '#9ca3af' }]}>Security</Text>
                        <Text style={[styles.regulatoryCardMetricValue, { color: '#f9fafb' }]}>92%</Text>
                      </View>
                      <View style={styles.regulatoryCardMetric}>
                        <Text style={[styles.regulatoryCardMetricLabel, { color: '#9ca3af' }]}>Availability</Text>
                        <Text style={[styles.regulatoryCardMetricValue, { color: '#f9faff' }]}>88%</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Violation Timeline Tracker */}
              <View style={styles.violationSection}>
                <Text style={[styles.violationTitle, { color: '#f9fafb' }]}>Violation Timeline Tracker</Text>
                <View style={styles.violationTimeline}>
                  <View style={styles.violationTimelineItem}>
                    <View style={[styles.violationTimelineDot, { backgroundColor: '#10b981' }]} />
                    <View style={styles.violationTimelineContent}>
                      <Text style={[styles.violationTimelineTitle, { color: '#f9fafb' }]}>Policy violation blocked</Text>
                      <Text style={[styles.violationTimelineTime, { color: '#9ca3af' }]}>2 min ago</Text>
                    </View>
                  </View>
                  <View style={styles.violationTimelineItem}>
                    <View style={[styles.violationTimelineDot, { backgroundColor: '#f59e0b' }]} />
                    <View style={styles.violationTimelineContent}>
                      <Text style={[styles.violationTimelineTitle, { color: '#f9fafb' }]}>Compliance gap detected</Text>
                      <Text style={[styles.violationTimelineTime, { color: '#9ca3af' }]}>15 min ago</Text>
                    </View>
                  </View>
                  <View style={styles.violationTimelineItem}>
                    <View style={[styles.violationTimelineDot, { backgroundColor: '#ef4444' }]} />
                    <View style={styles.violationTimelineContent}>
                      <Text style={[styles.violationTimelineTitle, { color: '#f9fafb' }]}>Critical policy violation</Text>
                      <Text style={[styles.violationTimelineTime, { color: '#9ca3af' }]}>1 hr ago</Text>
                    </View>
                  </View>
                  <View style={styles.violationTimelineItem}>
                    <View style={[styles.violationTimelineDot, { backgroundColor: '#06b6d4' }]} />
                    <View style={styles.violationTimelineContent}>
                      <Text style={[styles.violationTimelineTitle, { color: '#f9fafb' }]}>Policy updated successfully</Text>
                      <Text style={[styles.violationTimelineTime, { color: '#9ca3af' }]}>2 hr ago</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Rule Coverage Matrix */}
              <View style={styles.ruleCoverageSection}>
                <Text style={[styles.ruleCoverageTitle, { color: '#f9fafb' }]}>Rule Coverage Matrix</Text>
                <View style={styles.ruleCoverageGrid}>
                  <View style={styles.ruleCoverageRow}>
                    <Text style={[styles.ruleCoverageLabel, { color: '#9ca3af' }]}>Data Access Controls</Text>
                    <View style={[styles.ruleCoverageBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.ruleCoverageFill, { width: '98%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.ruleCoverageValue, { color: '#10b981' }]}>98%</Text>
                  </View>
                  <View style={styles.ruleCoverageRow}>
                    <Text style={[styles.ruleCoverageLabel, { color: '#9ca3af' }]}>Output Filtering</Text>
                    <View style={[styles.ruleCoverageBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.ruleCoverageFill, { width: '96%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.ruleCoverageValue, { color: '#10b981' }]}>96%</Text>
                  </View>
                  <View style={styles.ruleCoverageRow}>
                    <Text style={[styles.ruleCoverageLabel, { color: '#9ca3af' }]}>Rate Limiting</Text>
                    <View style={[styles.ruleCoverageBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                      <View style={[styles.ruleCoverageFill, { width: '94%', backgroundColor: '#06b6d4' }]} />
                    </View>
                    <Text style={[styles.ruleCoverageValue, { color: '#06b6d4' }]}>94%</Text>
                  </View>
                  <View style={styles.ruleCoverageRow}>
                    <Text style={[styles.ruleCoverageLabel, { color: '#9ca3af' }]}>Audit Logging</Text>
                    <View style={[styles.ruleCoverageBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.ruleCoverageFill, { width: '100%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.ruleCoverageValue, { color: '#10b981' }]}>100%</Text>
                  </View>
                  <View style={styles.ruleCoverageRow}>
                    <Text style={[styles.ruleCoverageLabel, { color: '#9ca3af' }]}>Ethical Guardrails</Text>
                    <View style={[styles.ruleCoverageBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                      <View style={[styles.ruleCoverageFill, { width: '89%', backgroundColor: '#f59e0b' }]} />
                    </View>
                    <Text style={[styles.ruleCoverageValue, { color: '#f59e0b' }]}>89%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Data Governance Center */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Data Governance Center</Text>
            <View style={[styles.dataGovernanceContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.dataGovernanceHeader}>
                <Text style={[styles.dataGovernanceSubtitle, { color: '#9ca3af' }]}>Track training datasets, data lineage, quality scores, and PII exposure risk</Text>
              </View>

              {/* Training Datasets Overview */}
              <View style={styles.datasetsSection}>
                <Text style={[styles.datasetsTitle, { color: '#f9fafb' }]}>Training Datasets Overview</Text>
                <View style={styles.datasetsGrid}>
                  <View style={styles.datasetCard}>
                    <View style={styles.datasetHeader}>
                      <Database size={20} color="#06b6d4" />
                      <Text style={[styles.datasetTitle, { color: '#f9fafb' }]}>Corporate Data</Text>
                    </View>
                    <View style={styles.datasetMetrics}>
                      <View style={styles.datasetMetric}>
                        <Text style={[styles.datasetMetricLabel, { color: '#9ca3af' }]}>Datasets</Text>
                        <Text style={[styles.datasetMetricValue, { color: '#f9fafb' }]}>482</Text>
                      </View>
                      <View style={styles.datasetMetric}>
                        <Text style={[styles.datasetMetricLabel, { color: '#9ca3af' }]}>Quality</Text>
                        <Text style={[styles.datasetMetricValue, { color: '#10b981' }]}>94%</Text>
                      </View>
                      <View style={styles.datasetMetric}>
                        <Text style={[styles.datasetMetricLabel, { color: '#9ca3af' }]}>PII Risk</Text>
                        <Text style={[styles.datasetMetricValue, { color: '#f59e0b' }]}>Low</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.datasetCard}>
                    <View style={styles.datasetHeader}>
                      <HardDrive size={20} color="#8b5cf6" />
                      <Text style={[styles.datasetTitle, { color: '#f9fafb' }]}>Public Data</Text>
                    </View>
                    <View style={styles.datasetMetrics}>
                      <View style={styles.datasetMetric}>
                        <Text style={[styles.datasetMetricLabel, { color: '#9ca3af' }]}>Datasets</Text>
                        <Text style={[styles.datasetMetricValue, { color: '#f9fafb' }]}>1,284</Text>
                      </View>
                      <View style={styles.datasetMetric}>
                        <Text style={[styles.datasetMetricLabel, { color: '#9ca3af' }]}>Quality</Text>
                        <Text style={[styles.datasetMetricValue, { color: '#06b6d4' }]}>88%</Text>
                      </View>
                      <View style={styles.datasetMetric}>
                        <Text style={[styles.datasetMetricLabel, { color: '#9ca3af' }]}>PII Risk</Text>
                        <Text style={[styles.datasetMetricValue, { color: '#10b981' }]}>None</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.datasetCard}>
                    <View style={styles.datasetHeader}>
                      <Server size={20} color="#10b981" />
                      <Text style={[styles.datasetTitle, { color: '#f9fafb' }]}>Synthetic Data</Text>
                    </View>
                    <View style={styles.datasetMetrics}>
                      <View style={styles.datasetMetric}>
                        <Text style={[styles.datasetMetricLabel, { color: '#9ca3af' }]}>Datasets</Text>
                        <Text style={[styles.datasetMetricValue, { color: '#f9fafb' }]}>324</Text>
                      </View>
                      <View style={styles.datasetMetric}>
                        <Text style={[styles.datasetMetricLabel, { color: '#9ca3af' }]}>Quality</Text>
                        <Text style={[styles.datasetMetricValue, { color: '#10b981' }]}>96%</Text>
                      </View>
                      <View style={styles.datasetMetric}>
                        <Text style={[styles.datasetMetricLabel, { color: '#9ca3af' }]}>PII Risk</Text>
                        <Text style={[styles.datasetMetricValue, { color: '#10b981' }]}>None</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Data Lineage Graph */}
              <View style={styles.lineageSection}>
                <Text style={[styles.lineageTitle, { color: '#f9fafb' }]}>Data Lineage Graph</Text>
                <View style={styles.lineageGraph}>
                  <View style={styles.lineageFlow}>
                    <View style={[styles.lineageNode, { backgroundColor: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4' }]}>
                      <Text style={[styles.lineageNodeText, { color: '#06b6d4' }]}>Raw Data</Text>
                      <Text style={[styles.lineageNodeSub, { color: '#9ca3af' }]}>842 sources</Text>
                    </View>
                    <View style={[styles.lineageConnector, { backgroundColor: '#06b6d4' }]} />
                    <View style={[styles.lineageNode, { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6' }]}>
                      <Text style={[styles.lineageNodeText, { color: '#8b5cf6' }]}>Processing</Text>
                      <Text style={[styles.lineageNodeSub, { color: '#9ca3af' }]}>124 pipelines</Text>
                    </View>
                    <View style={[styles.lineageConnector, { backgroundColor: '#8b5cf6' }]} />
                    <View style={[styles.lineageNode, { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981' }]}>
                      <Text style={[styles.lineageNodeText, { color: '#10b981' }]}>Validation</Text>
                      <Text style={[styles.lineageNodeSub, { color: '#9ca3af' }]}>48 checks</Text>
                    </View>
                    <View style={[styles.lineageConnector, { backgroundColor: '#10b981' }]} />
                    <View style={[styles.lineageNode, { backgroundColor: 'rgba(245, 158, 11, 0.2)', borderColor: '#f59e0b' }]}>
                      <Text style={[styles.lineageNodeText, { color: '#f59e0b' }]}>Training</Text>
                      <Text style={[styles.lineageNodeSub, { color: '#9ca3af' }]}>32 models</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Dataset Trust Scoring */}
              <View style={styles.trustSection}>
                <Text style={[styles.trustTitle, { color: '#f9fafb' }]}>Dataset Trust Scoring</Text>
                <View style={styles.trustGrid}>
                  <View style={styles.trustCard}>
                    <View style={styles.trustHeader}>
                      <Text style={[styles.trustName, { color: '#f9fafb' }]}>Customer Data</Text>
                      <View style={[styles.trustScore, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                        <Text style={[styles.trustScoreText, { color: '#10b981' }]}>A+</Text>
                      </View>
                    </View>
                    <View style={styles.trustMetrics}>
                      <View style={styles.trustMetric}>
                        <Text style={[styles.trustMetricLabel, { color: '#9ca3af' }]}>Completeness</Text>
                        <View style={[styles.trustMetricBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.trustMetricFill, { width: '98%', backgroundColor: '#10b981' }]} />
                        </View>
                      </View>
                      <View style={styles.trustMetric}>
                        <Text style={[styles.trustMetricLabel, { color: '#9ca3af' }]}>Accuracy</Text>
                        <View style={[styles.trustMetricBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.trustMetricFill, { width: '96%', backgroundColor: '#10b981' }]} />
                        </View>
                      </View>
                      <View style={styles.trustMetric}>
                        <Text style={[styles.trustMetricLabel, { color: '#9ca3af' }]}>Consistency</Text>
                        <View style={[styles.trustMetricBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.trustMetricFill, { width: '94%', backgroundColor: '#10b981' }]} />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.trustCard}>
                    <View style={styles.trustHeader}>
                      <Text style={[styles.trustName, { color: '#f9fafb' }]}>Financial Data</Text>
                      <View style={[styles.trustScore, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                        <Text style={[styles.trustScoreText, { color: '#06b6d4' }]}>A</Text>
                      </View>
                    </View>
                    <View style={styles.trustMetrics}>
                      <View style={styles.trustMetric}>
                        <Text style={[styles.trustMetricLabel, { color: '#9ca3af' }]}>Completeness</Text>
                        <View style={[styles.trustMetricBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.trustMetricFill, { width: '94%', backgroundColor: '#06b6d4' }]} />
                        </View>
                      </View>
                      <View style={styles.trustMetric}>
                        <Text style={[styles.trustMetricLabel, { color: '#9ca3af' }]}>Accuracy</Text>
                        <View style={[styles.trustMetricBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.trustMetricFill, { width: '92%', backgroundColor: '#06b6d4' }]} />
                        </View>
                      </View>
                      <View style={styles.trustMetric}>
                        <Text style={[styles.trustMetricLabel, { color: '#9ca3af' }]}>Consistency</Text>
                        <View style={[styles.trustMetricBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.trustMetricFill, { width: '90%', backgroundColor: '#06b6d4' }]} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* PII Exposure Risk */}
              <View style={styles.piiSection}>
                <Text style={[styles.piiTitle, { color: '#f9fafb' }]}>PII Exposure Risk</Text>
                <View style={styles.piiGrid}>
                  <View style={styles.piiCard}>
                    <View style={styles.piiHeader}>
                      <AlertTriangle size={20} color="#ef4444" />
                      <Text style={[styles.piiCardTitle, { color: '#f9fafb' }]}>High Risk</Text>
                    </View>
                    <Text style={[styles.piiValue, { color: '#ef4444' }]}>12 datasets</Text>
                    <Text style={[styles.piiSub, { color: '#9ca3af' }]}>Immediate action required</Text>
                  </View>
                  <View style={styles.piiCard}>
                    <View style={styles.piiHeader}>
                      <AlertCircle size={20} color="#f59e0b" />
                      <Text style={[styles.piiCardTitle, { color: '#f9fafb' }]}>Medium Risk</Text>
                    </View>
                    <Text style={[styles.piiValue, { color: '#f59e0b' }]}>48 datasets</Text>
                    <Text style={[styles.piiSub, { color: '#9ca3af' }]}>Under review</Text>
                  </View>
                  <View style={styles.piiCard}>
                    <View style={styles.piiHeader}>
                      <CheckCircle size={20} color="#10b981" />
                      <Text style={[styles.piiCardTitle, { color: '#f9fafb' }]}>Low Risk</Text>
                    </View>
                    <Text style={[styles.piiValue, { color: '#10b981' }]}>1,842 datasets</Text>
                    <Text style={[styles.piiSub, { color: '#9ca3af' }]}>Compliant</Text>
                  </View>
                  <View style={styles.piiCard}>
                    <View style={styles.piiHeader}>
                      <Shield size={20} color="#06b6d4" />
                      <Text style={[styles.piiCardTitle, { color: '#f9fafb' }]}>No PII</Text>
                    </View>
                    <Text style={[styles.piiValue, { color: '#06b6d4' }]}>6,518 datasets</Text>
                    <Text style={[styles.piiSub, { color: '#9ca3af' }]}>Safe</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* AI Risk & Safety Control Room */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>AI Risk & Safety Control Room</Text>
            <View style={[styles.riskControlContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.riskControlHeader}>
                <Text style={[styles.riskControlSubtitle, { color: '#9ca3af' }]}>Track hallucinations, toxic outputs, prompt injections, jailbreaks, and bias detection</Text>
              </View>

              {/* Risk Radar */}
              <View style={styles.riskRadarSection}>
                <Text style={[styles.riskRadarTitle, { color: '#f9fafb' }]}>Risk Radar</Text>
                <View style={styles.riskRadarGrid}>
                  <View style={styles.riskRadarCard}>
                    <View style={styles.riskRadarHeader}>
                      <Brain size={20} color="#ef4444" />
                      <Text style={[styles.riskRadarCardTitle, { color: '#f9fafb' }]}>Hallucination Rate</Text>
                    </View>
                    <Text style={[styles.riskRadarValue, { color: '#ef4444' }]}>2.4%</Text>
                    <Text style={[styles.riskRadarSub, { color: '#9ca3af' }]}>+0.3% from last week</Text>
                  </View>
                  <View style={styles.riskRadarCard}>
                    <View style={styles.riskRadarHeader}>
                      <AlertTriangle size={20} color="#f59e0b" />
                      <Text style={[styles.riskRadarCardTitle, { color: '#f9fafb' }]}>Toxic Output</Text>
                    </View>
                    <Text style={[styles.riskRadarValue, { color: '#f59e0b' }]}>0.8%</Text>
                    <Text style={[styles.riskRadarSub, { color: '#9ca3af' }]}>-0.2% from last week</Text>
                  </View>
                  <View style={styles.riskRadarCard}>
                    <View style={styles.riskRadarHeader}>
                      <Shield size={20} color="#06b6d4" />
                      <Text style={[styles.riskRadarCardTitle, { color: '#f9fafb' }]}>Prompt Injection</Text>
                    </View>
                    <Text style={[styles.riskRadarValue, { color: '#06b6d4' }]}>124 blocked</Text>
                    <Text style={[styles.riskRadarSub, { color: '#9ca3af' }]}>Last 24 hours</Text>
                  </View>
                  <View style={styles.riskRadarCard}>
                    <View style={styles.riskRadarHeader}>
                      <Lock size={20} color="#8b5cf6" />
                      <Text style={[styles.riskRadarCardTitle, { color: '#f9fafb' }]}>Jailbreak Attempts</Text>
                    </View>
                    <Text style={[styles.riskRadarValue, { color: '#8b5cf6' }]}>42 blocked</Text>
                    <Text style={[styles.riskRadarSub, { color: '#9ca3af' }]}>Last 24 hours</Text>
                  </View>
                </View>
              </View>

              {/* Safety Scoring Dashboard */}
              <View style={styles.safetyScoreSection}>
                <Text style={[styles.safetyScoreTitle, { color: '#f9fafb' }]}>Safety Scoring Dashboard</Text>
                <View style={styles.safetyScoreGrid}>
                  <View style={styles.safetyScoreCard}>
                    <View style={styles.safetyScoreHeader}>
                      <Text style={[styles.safetyScoreName, { color: '#f9fafb' }]}>GPT-4-Turbo</Text>
                      <View style={[styles.safetyScoreBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                        <Text style={[styles.safetyScoreBadgeText, { color: '#10b981' }]}>98.2</Text>
                      </View>
                    </View>
                    <View style={styles.safetyScoreMetrics}>
                      <View style={styles.safetyScoreMetric}>
                        <Text style={[styles.safetyScoreMetricLabel, { color: '#9ca3af' }]}>Safety</Text>
                        <View style={[styles.safetyScoreMetricBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.safetyScoreMetricFill, { width: '98%', backgroundColor: '#10b981' }]} />
                        </View>
                      </View>
                      <View style={styles.safetyScoreMetric}>
                        <Text style={[styles.safetyScoreMetricLabel, { color: '#9ca3af' }]}>Helpfulness</Text>
                        <View style={[styles.safetyScoreMetricBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.safetyScoreMetricFill, { width: '96%', backgroundColor: '#10b981' }]} />
                        </View>
                      </View>
                      <View style={styles.safetyScoreMetric}>
                        <Text style={[styles.safetyScoreMetricLabel, { color: '#9ca3af' }]}>Honesty</Text>
                        <View style={[styles.safetyScoreMetricBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.safetyScoreMetricFill, { width: '94%', backgroundColor: '#10b981' }]} />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.safetyScoreCard}>
                    <View style={styles.safetyScoreHeader}>
                      <Text style={[styles.safetyScoreName, { color: '#f9fafb' }]}>Claude-3.5</Text>
                      <View style={[styles.safetyScoreBadge, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                        <Text style={[styles.safetyScoreBadgeText, { color: '#06b6d4' }]}>97.8</Text>
                      </View>
                    </View>
                    <View style={styles.safetyScoreMetrics}>
                      <View style={styles.safetyScoreMetric}>
                        <Text style={[styles.safetyScoreMetricLabel, { color: '#9ca3af' }]}>Safety</Text>
                        <View style={[styles.safetyScoreMetricBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.safetyScoreMetricFill, { width: '97%', backgroundColor: '#06b6d4' }]} />
                        </View>
                      </View>
                      <View style={styles.safetyScoreMetric}>
                        <Text style={[styles.safetyScoreMetricLabel, { color: '#9ca3af' }]}>Helpfulness</Text>
                        <View style={[styles.safetyScoreMetricBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.safetyScoreMetricFill, { width: '95%', backgroundColor: '#06b6d4' }]} />
                        </View>
                      </View>
                      <View style={styles.safetyScoreMetric}>
                        <Text style={[styles.safetyScoreMetricLabel, { color: '#9ca3af' }]}>Honesty</Text>
                        <View style={[styles.safetyScoreMetricBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.safetyScoreMetricFill, { width: '98%', backgroundColor: '#06b6d4' }]} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Attack Simulation Monitor */}
              <View style={styles.attackSimSection}>
                <Text style={[styles.attackSimTitle, { color: '#f9fafb' }]}>Attack Simulation Monitor</Text>
                <View style={styles.attackSimGrid}>
                  <View style={styles.attackSimCard}>
                    <View style={styles.attackSimHeader}>
                      <Zap size={20} color="#ef4444" />
                      <Text style={[styles.attackSimCardTitle, { color: '#f9fafb' }]}>Prompt Injection</Text>
                    </View>
                    <View style={styles.attackSimStats}>
                      <View style={styles.attackSimStat}>
                        <Text style={[styles.attackSimStatLabel, { color: '#9ca3af' }]}>Attempted</Text>
                        <Text style={[styles.attackSimStatValue, { color: '#f9fafb' }]}>1,284</Text>
                      </View>
                      <View style={styles.attackSimStat}>
                        <Text style={[styles.attackSimStatLabel, { color: '#9ca3af' }]}>Blocked</Text>
                        <Text style={[styles.attackSimStatValue, { color: '#10b981' }]}>1,242</Text>
                      </View>
                      <View style={styles.attackSimStat}>
                        <Text style={[styles.attackSimStatLabel, { color: '#9ca3af' }]}>Success Rate</Text>
                        <Text style={[styles.attackSimStatValue, { color: '#ef4444' }]}>3.3%</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.attackSimCard}>
                    <View style={styles.attackSimHeader}>
                      <Unlock size={20} color="#f59e0b" />
                      <Text style={[styles.attackSimCardTitle, { color: '#f9fafb' }]}>Jailbreak</Text>
                    </View>
                    <View style={styles.attackSimStats}>
                      <View style={styles.attackSimStat}>
                        <Text style={[styles.attackSimStatLabel, { color: '#9ca3af' }]}>Attempted</Text>
                        <Text style={[styles.attackSimStatValue, { color: '#f9fafb' }]}>482</Text>
                      </View>
                      <View style={styles.attackSimStat}>
                        <Text style={[styles.attackSimStatLabel, { color: '#9ca3af' }]}>Blocked</Text>
                        <Text style={[styles.attackSimStatValue, { color: '#10b981' }]}>440</Text>
                      </View>
                      <View style={styles.attackSimStat}>
                        <Text style={[styles.attackSimStatLabel, { color: '#9ca3af' }]}>Success Rate</Text>
                        <Text style={[styles.attackSimStatValue, { color: '#f59e0b' }]}>8.7%</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.attackSimCard}>
                    <View style={styles.attackSimHeader}>
                      <Eye size={20} color="#8b5cf6" />
                      <Text style={[styles.attackSimCardTitle, { color: '#f9fafb' }]}>Data Exfiltration</Text>
                    </View>
                    <View style={styles.attackSimStats}>
                      <View style={styles.attackSimStat}>
                        <Text style={[styles.attackSimStatLabel, { color: '#9ca3af' }]}>Attempted</Text>
                        <Text style={[styles.attackSimStatValue, { color: '#f9fafb' }]}>124</Text>
                      </View>
                      <View style={styles.attackSimStat}>
                        <Text style={[styles.attackSimStatLabel, { color: '#9ca3af' }]}>Blocked</Text>
                        <Text style={[styles.attackSimStatValue, { color: '#10b981' }]}>122</Text>
                      </View>
                      <View style={styles.attackSimStat}>
                        <Text style={[styles.attackSimStatLabel, { color: '#9ca3af' }]}>Success Rate</Text>
                        <Text style={[styles.attackSimStatValue, { color: '#10b981' }]}>1.6%</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Guardrail Effectiveness */}
              <View style={styles.guardrailSection}>
                <Text style={[styles.guardrailTitle, { color: '#f9fafb' }]}>Guardrail Effectiveness</Text>
                <View style={styles.guardrailGrid}>
                  <View style={styles.guardrailRow}>
                    <Text style={[styles.guardrailLabel, { color: '#9ca3af' }]}>Content Filtering</Text>
                    <View style={[styles.guardrailBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.guardrailFill, { width: '98%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.guardrailValue, { color: '#10b981' }]}>98%</Text>
                  </View>
                  <View style={styles.guardrailRow}>
                    <Text style={[styles.guardrailLabel, { color: '#9ca3af' }]}>PII Detection</Text>
                    <View style={[styles.guardrailBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.guardrailFill, { width: '96%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.guardrailValue, { color: '#10b981' }]}>96%</Text>
                  </View>
                  <View style={styles.guardrailRow}>
                    <Text style={[styles.guardrailLabel, { color: '#9ca3af' }]}>Bias Detection</Text>
                    <View style={[styles.guardrailBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                      <View style={[styles.guardrailFill, { width: '94%', backgroundColor: '#06b6d4' }]} />
                    </View>
                    <Text style={[styles.guardrailValue, { color: '#06b6d4' }]}>94%</Text>
                  </View>
                  <View style={styles.guardrailRow}>
                    <Text style={[styles.guardrailLabel, { color: '#9ca3af' }]}>Toxicity Filter</Text>
                    <View style={[styles.guardrailBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.guardrailFill, { width: '92%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.guardrailValue, { color: '#10b981' }]}>92%</Text>
                  </View>
                  <View style={styles.guardrailRow}>
                    <Text style={[styles.guardrailLabel, { color: '#9ca3af' }]}>Rate Limiting</Text>
                    <View style={[styles.guardrailBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.guardrailFill, { width: '100%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.guardrailValue, { color: '#10b981' }]}>100%</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* AI Observability Center */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>AI Observability Center</Text>
            <View style={[styles.observabilityContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.observabilityHeader}>
                <Text style={[styles.observabilitySubtitle, { color: '#9ca3af' }]}>Monitor latency, token usage, cost, accuracy, drift metrics, and system health</Text>
              </View>

              {/* Real-time Inference Dashboard */}
              <View style={styles.inferenceSection}>
                <Text style={[styles.inferenceTitle, { color: '#f9fafb' }]}>Real-time Inference Dashboard</Text>
                <View style={styles.inferenceGrid}>
                  <View style={styles.inferenceCard}>
                    <View style={styles.inferenceHeader}>
                      <Clock size={20} color="#06b6d4" />
                      <Text style={[styles.inferenceCardTitle, { color: '#f9fafb' }]}>Latency</Text>
                    </View>
                    <Text style={[styles.inferenceValue, { color: '#06b6d4' }]}>42ms</Text>
                    <Text style={[styles.inferenceSub, { color: '#9ca3af' }]}>P95: 68ms</Text>
                  </View>
                  <View style={styles.inferenceCard}>
                    <View style={styles.inferenceHeader}>
                      <Zap size={20} color="#8b5cf6" />
                      <Text style={[styles.inferenceCardTitle, { color: '#f9fafb' }]}>Token Usage</Text>
                    </View>
                    <Text style={[styles.inferenceValue, { color: '#8b5cf6' }]}>1.2M/hr</Text>
                    <Text style={[styles.inferenceSub, { color: '#9ca3af' }]}>+12% from yesterday</Text>
                  </View>
                  <View style={styles.inferenceCard}>
                    <View style={styles.inferenceHeader}>
                      <DollarSign size={20} color="#10b981" />
                      <Text style={[styles.inferenceCardTitle, { color: '#f9fafb' }]}>Cost/Request</Text>
                    </View>
                    <Text style={[styles.inferenceValue, { color: '#10b981' }]}>$0.008</Text>
                    <Text style={[styles.inferenceSub, { color: '#9ca3af' }]}>-5% from yesterday</Text>
                  </View>
                  <View style={styles.inferenceCard}>
                    <View style={styles.inferenceHeader}>
                      <Target size={20} color="#f59e0b" />
                      <Text style={[styles.inferenceCardTitle, { color: '#f9fafb' }]}>Accuracy</Text>
                    </View>
                    <Text style={[styles.inferenceValue, { color: '#f59e0b' }]}>96.8%</Text>
                    <Text style={[styles.inferenceSub, { color: '#9ca3af' }]}>+0.4% from yesterday</Text>
                  </View>
                </View>
              </View>

              {/* Model Performance Graphs */}
              <View style={styles.performanceSection}>
                <Text style={[styles.performanceTitle, { color: '#f9fafb' }]}>Model Performance Graphs</Text>
                <View style={styles.performanceGrid}>
                  <View style={styles.performanceCard}>
                    <View style={styles.performanceHeader}>
                      <Text style={[styles.performanceName, { color: '#f9fafb' }]}>GPT-4-Turbo</Text>
                      <View style={[styles.performanceBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                        <Text style={[styles.performanceBadgeText, { color: '#10b981' }]}>Stable</Text>
                      </View>
                    </View>
                    <View style={styles.performanceMetrics}>
                      <View style={styles.performanceMetric}>
                        <Text style={[styles.performanceMetricLabel, { color: '#9ca3af' }]}>Requests/min</Text>
                        <View style={[styles.performanceMetricBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.performanceMetricFill, { width: '85%', backgroundColor: '#10b981' }]} />
                        </View>
                        <Text style={[styles.performanceMetricValue, { color: '#10b981' }]}>8,420</Text>
                      </View>
                      <View style={styles.performanceMetric}>
                        <Text style={[styles.performanceMetricLabel, { color: '#9ca3af' }]}>Error Rate</Text>
                        <View style={[styles.performanceMetricBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.performanceMetricFill, { width: '2%', backgroundColor: '#10b981' }]} />
                        </View>
                        <Text style={[styles.performanceMetricValue, { color: '#10b981' }]}>0.2%</Text>
                      </View>
                      <View style={styles.performanceMetric}>
                        <Text style={[styles.performanceMetricLabel, { color: '#9ca3af' }]}>Drift Score</Text>
                        <View style={[styles.performanceMetricBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.performanceMetricFill, { width: '12%', backgroundColor: '#f59e0b' }]} />
                        </View>
                        <Text style={[styles.performanceMetricValue, { color: '#f59e0b' }]}>12%</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.performanceCard}>
                    <View style={styles.performanceHeader}>
                      <Text style={[styles.performanceName, { color: '#f9fafb' }]}>Claude-3.5</Text>
                      <View style={[styles.performanceBadge, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                        <Text style={[styles.performanceBadgeText, { color: '#06b6d4' }]}>Optimal</Text>
                      </View>
                    </View>
                    <View style={styles.performanceMetrics}>
                      <View style={styles.performanceMetric}>
                        <Text style={[styles.performanceMetricLabel, { color: '#9ca3af' }]}>Requests/min</Text>
                        <View style={[styles.performanceMetricBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.performanceMetricFill, { width: '72%', backgroundColor: '#06b6d4' }]} />
                        </View>
                        <Text style={[styles.performanceMetricValue, { color: '#06b6d4' }]}>6,240</Text>
                      </View>
                      <View style={styles.performanceMetric}>
                        <Text style={[styles.performanceMetricLabel, { color: '#9ca3af' }]}>Error Rate</Text>
                        <View style={[styles.performanceMetricBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.performanceMetricFill, { width: '1%', backgroundColor: '#06b6d4' }]} />
                        </View>
                        <Text style={[styles.performanceMetricValue, { color: '#06b6d4' }]}>0.1%</Text>
                      </View>
                      <View style={styles.performanceMetric}>
                        <Text style={[styles.performanceMetricLabel, { color: '#9ca3af' }]}>Drift Score</Text>
                        <View style={[styles.performanceMetricBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.performanceMetricFill, { width: '8%', backgroundColor: '#10b981' }]} />
                        </View>
                        <Text style={[styles.performanceMetricValue, { color: '#10b981' }]}>8%</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Cost Optimization Analytics */}
              <View style={styles.costSection}>
                <Text style={[styles.costTitle, { color: '#f9fafb' }]}>Cost Optimization Analytics</Text>
                <View style={styles.costGrid}>
                  <View style={styles.costCard}>
                    <View style={styles.costHeader}>
                      <Text style={[styles.costName, { color: '#f9fafb' }]}>Daily Spend</Text>
                      <Text style={[styles.costValue, { color: '#06b6d4' }]}>$1,284</Text>
                    </View>
                    <View style={styles.costBreakdown}>
                      <View style={styles.costBreakdownItem}>
                        <View style={[styles.costBreakdownDot, { backgroundColor: '#06b6d4' }]} />
                        <Text style={[styles.costBreakdownLabel, { color: '#9ca3af' }]}>Inference</Text>
                        <Text style={[styles.costBreakdownValue, { color: '#f9fafb' }]}>68%</Text>
                      </View>
                      <View style={styles.costBreakdownItem}>
                        <View style={[styles.costBreakdownDot, { backgroundColor: '#8b5cf6' }]} />
                        <Text style={[styles.costBreakdownLabel, { color: '#9ca3af' }]}>Storage</Text>
                        <Text style={[styles.costBreakdownValue, { color: '#f9faff' }]}>22%</Text>
                      </View>
                      <View style={styles.costBreakdownItem}>
                        <View style={[styles.costBreakdownDot, { backgroundColor: '#10b981' }]} />
                        <Text style={[styles.costBreakdownLabel, { color: '#9ca3af' }]}>Monitoring</Text>
                        <Text style={[styles.costBreakdownValue, { color: '#f9faff' }]}>10%</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.costCard}>
                    <View style={styles.costHeader}>
                      <Text style={[styles.costName, { color: '#f9fafb' }]}>Projected Monthly</Text>
                      <Text style={[styles.costValue, { color: '#8b5cf6' }]}>$38,520</Text>
                    </View>
                    <View style={styles.costInsight}>
                      <Text style={[styles.costInsightText, { color: '#10b981' }]}>12% under budget</Text>
                      <Text style={[styles.costInsightSub, { color: '#9ca3af' }]}>Optimization saved $4,820</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Usage Heatmaps */}
              <View style={styles.heatmapSection}>
                <Text style={[styles.heatmapTitle, { color: '#f9fafb' }]}>Usage Heatmaps</Text>
                <View style={styles.heatmapGrid}>
                  <View style={styles.heatmapCard}>
                    <Text style={[styles.heatmapCardTitle, { color: '#f9fafb' }]}>Peak Hours</Text>
                    <View style={styles.heatmapBars}>
                      <View style={styles.heatmapBarRow}>
                        <Text style={[styles.heatmapBarLabel, { color: '#9ca3af' }]}>00-04</Text>
                        <View style={[styles.heatmapBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.heatmapBarFill, { width: '20%', backgroundColor: '#06b6d4' }]} />
                        </View>
                      </View>
                      <View style={styles.heatmapBarRow}>
                        <Text style={[styles.heatmapBarLabel, { color: '#9ca3af' }]}>04-08</Text>
                        <View style={[styles.heatmapBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.heatmapBarFill, { width: '35%', backgroundColor: '#06b6d4' }]} />
                        </View>
                      </View>
                      <View style={styles.heatmapBarRow}>
                        <Text style={[styles.heatmapBarLabel, { color: '#9ca3af' }]}>08-12</Text>
                        <View style={[styles.heatmapBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                          <View style={[styles.heatmapBarFill, { width: '85%', backgroundColor: '#8b5cf6' }]} />
                        </View>
                      </View>
                      <View style={styles.heatmapBarRow}>
                        <Text style={[styles.heatmapBarLabel, { color: '#9ca3af' }]}>12-16</Text>
                        <View style={[styles.heatmapBar, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                          <View style={[styles.heatmapBarFill, { width: '95%', backgroundColor: '#ef4444' }]} />
                        </View>
                      </View>
                      <View style={styles.heatmapBarRow}>
                        <Text style={[styles.heatmapBarLabel, { color: '#9ca3af' }]}>16-20</Text>
                        <View style={[styles.heatmapBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                          <View style={[styles.heatmapBarFill, { width: '78%', backgroundColor: '#8b5cf6' }]} />
                        </View>
                      </View>
                      <View style={styles.heatmapBarRow}>
                        <Text style={[styles.heatmapBarLabel, { color: '#9ca3af' }]}>20-24</Text>
                        <View style={[styles.heatmapBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.heatmapBarFill, { width: '45%', backgroundColor: '#06b6d4' }]} />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.heatmapCard}>
                    <Text style={[styles.heatmapCardTitle, { color: '#f9fafb' }]}>Regional Usage</Text>
                    <View style={styles.heatmapBars}>
                      <View style={styles.heatmapBarRow}>
                        <Text style={[styles.heatmapBarLabel, { color: '#9ca3af' }]}>US-East</Text>
                        <View style={[styles.heatmapBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.heatmapBarFill, { width: '65%', backgroundColor: '#10b981' }]} />
                        </View>
                      </View>
                      <View style={styles.heatmapBarRow}>
                        <Text style={[styles.heatmapBarLabel, { color: '#9ca3af' }]}>US-West</Text>
                        <View style={[styles.heatmapBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.heatmapBarFill, { width: '48%', backgroundColor: '#10b981' }]} />
                        </View>
                      </View>
                      <View style={styles.heatmapBarRow}>
                        <Text style={[styles.heatmapBarLabel, { color: '#9ca3af' }]}>EU-West</Text>
                        <View style={[styles.heatmapBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.heatmapBarFill, { width: '38%', backgroundColor: '#06b6d4' }]} />
                        </View>
                      </View>
                      <View style={styles.heatmapBarRow}>
                        <Text style={[styles.heatmapBarLabel, { color: '#9ca3af' }]}>Asia-Pacific</Text>
                        <View style={[styles.heatmapBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                          <View style={[styles.heatmapBarFill, { width: '28%', backgroundColor: '#8b5cf6' }]} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Audit & Traceability Logs */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Audit & Traceability Logs</Text>
            <View style={[styles.auditContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.auditHeader}>
                <Text style={[styles.auditSubtitle, { color: '#9ca3af' }]}>Track AI decisions, prompt logs, model outputs, human overrides, and policy violations</Text>
              </View>

              {/* Immutable Audit Timeline */}
              <View style={styles.auditTimelineSection}>
                <Text style={[styles.auditTimelineTitle, { color: '#f9fafb' }]}>Immutable Audit Timeline</Text>
                <View style={styles.auditTimelineGrid}>
                  <View style={styles.auditTimelineCard}>
                    <View style={styles.auditTimelineHeader}>
                      <FileText size={20} color="#06b6d4" />
                      <Text style={[styles.auditTimelineCardTitle, { color: '#f9fafb' }]}>Model Decision</Text>
                    </View>
                    <Text style={[styles.auditTimelineValue, { color: '#06b6d4' }]}>124,842</Text>
                    <Text style={[styles.auditTimelineSub, { color: '#9ca3af' }]}>Decisions logged today</Text>
                  </View>
                  <View style={styles.auditTimelineCard}>
                    <View style={styles.auditTimelineHeader}>
                      <MessageSquare size={20} color="#8b5cf6" />
                      <Text style={[styles.auditTimelineCardTitle, { color: '#f9fafb' }]}>Prompt Logs</Text>
                    </View>
                    <Text style={[styles.auditTimelineValue, { color: '#8b5cf6' }]}>842,120</Text>
                    <Text style={[styles.auditTimelineSub, { color: '#9ca3af' }]}>Prompts recorded</Text>
                  </View>
                  <View style={styles.auditTimelineCard}>
                    <View style={styles.auditTimelineHeader}>
                      <User size={20} color="#10b981" />
                      <Text style={[styles.auditTimelineCardTitle, { color: '#f9fafb' }]}>Human Overrides</Text>
                    </View>
                    <Text style={[styles.auditTimelineValue, { color: '#10b981' }]}>1,284</Text>
                    <Text style={[styles.auditTimelineSub, { color: '#9ca3af' }]}>Overrides this week</Text>
                  </View>
                  <View style={styles.auditTimelineCard}>
                    <View style={styles.auditTimelineHeader}>
                      <AlertTriangle size={20} color="#ef4444" />
                      <Text style={[styles.auditTimelineCardTitle, { color: '#f9fafb' }]}>Policy Violations</Text>
                    </View>
                    <Text style={[styles.auditTimelineValue, { color: '#ef4444' }]}>48</Text>
                    <Text style={[styles.auditTimelineSub, { color: '#9ca3af' }]}>Violations detected</Text>
                  </View>
                </View>
              </View>

              {/* Decision Trace Graphs */}
              <View style={styles.decisionTraceSection}>
                <Text style={[styles.decisionTraceTitle, { color: '#f9fafb' }]}>Decision Trace Graphs</Text>
                <View style={styles.decisionTraceGrid}>
                  <View style={styles.decisionTraceCard}>
                    <View style={styles.decisionTraceHeader}>
                      <Text style={[styles.decisionTraceName, { color: '#f9fafb' }]}>Customer Service Agent</Text>
                      <View style={[styles.decisionTraceBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                        <Text style={[styles.decisionTraceBadgeText, { color: '#10b981' }]}>Compliant</Text>
                      </View>
                    </View>
                    <View style={styles.decisionTraceFlow}>
                      <View style={[styles.decisionTraceNode, { backgroundColor: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4' }]}>
                        <Text style={[styles.decisionTraceNodeText, { color: '#06b6d4' }]}>Input</Text>
                      </View>
                      <View style={[styles.decisionTraceConnector, { backgroundColor: '#06b6d4' }]} />
                      <View style={[styles.decisionTraceNode, { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6' }]}>
                        <Text style={[styles.decisionTraceNodeText, { color: '#8b5cf6' }]}>Process</Text>
                      </View>
                      <View style={[styles.decisionTraceConnector, { backgroundColor: '#8b5cf6' }]} />
                      <View style={[styles.decisionTraceNode, { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981' }]}>
                        <Text style={[styles.decisionTraceNodeText, { color: '#10b981' }]}>Output</Text>
                      </View>
                    </View>
                    <View style={styles.decisionTraceStats}>
                      <Text style={[styles.decisionTraceStat, { color: '#9ca3af' }]}>42,840 traces</Text>
                    </View>
                  </View>
                  <View style={styles.decisionTraceCard}>
                    <View style={styles.decisionTraceHeader}>
                      <Text style={[styles.decisionTraceName, { color: '#f9fafb' }]}>Financial Advisor</Text>
                      <View style={[styles.decisionTraceBadge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                        <Text style={[styles.decisionTraceBadgeText, { color: '#f59e0b' }]}>Review</Text>
                      </View>
                    </View>
                    <View style={styles.decisionTraceFlow}>
                      <View style={[styles.decisionTraceNode, { backgroundColor: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4' }]}>
                        <Text style={[styles.decisionTraceNodeText, { color: '#06b6d4' }]}>Input</Text>
                      </View>
                      <View style={[styles.decisionTraceConnector, { backgroundColor: '#06b6d4' }]} />
                      <View style={[styles.decisionTraceNode, { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6' }]}>
                        <Text style={[styles.decisionTraceNodeText, { color: '#8b5cf6' }]}>Process</Text>
                      </View>
                      <View style={[styles.decisionTraceConnector, { backgroundColor: '#8b5cf6' }]} />
                      <View style={[styles.decisionTraceNode, { backgroundColor: 'rgba(245, 158, 11, 0.2)', borderColor: '#f59e0b' }]}>
                        <Text style={[styles.decisionTraceNodeText, { color: '#f59e0b' }]}>Override</Text>
                      </View>
                    </View>
                    <View style={styles.decisionTraceStats}>
                      <Text style={[styles.decisionTraceStat, { color: '#9ca3af' }]}>12,420 traces</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Explainability Paths */}
              <View style={styles.explainabilitySection}>
                <Text style={[styles.explainabilityTitle, { color: '#f9fafb' }]}>Explainability Paths</Text>
                <View style={styles.explainabilityGrid}>
                  <View style={styles.explainabilityCard}>
                    <View style={styles.explainabilityHeader}>
                      <Text style={[styles.explainabilityCardTitle, { color: '#f9fafb' }]}>Feature Importance</Text>
                      <Text style={[styles.explainabilityScore, { color: '#10b981' }]}>94.2%</Text>
                    </View>
                    <View style={styles.explainabilityBars}>
                      <View style={styles.explainabilityBarRow}>
                        <Text style={[styles.explainabilityBarLabel, { color: '#9ca3af' }]}>User Intent</Text>
                        <View style={[styles.explainabilityBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.explainabilityBarFill, { width: '85%', backgroundColor: '#10b981' }]} />
                        </View>
                      </View>
                      <View style={styles.explainabilityBarRow}>
                        <Text style={[styles.explainabilityBarLabel, { color: '#9ca3af' }]}>Context</Text>
                        <View style={[styles.explainabilityBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.explainabilityBarFill, { width: '72%', backgroundColor: '#06b6d4' }]} />
                        </View>
                      </View>
                      <View style={styles.explainabilityBarRow}>
                        <Text style={[styles.explainabilityBarLabel, { color: '#9ca3af' }]}>History</Text>
                        <View style={[styles.explainabilityBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                          <View style={[styles.explainabilityBarFill, { width: '58%', backgroundColor: '#8b5cf6' }]} />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.explainabilityCard}>
                    <View style={styles.explainabilityHeader}>
                      <Text style={[styles.explainabilityCardTitle, { color: '#f9fafb' }]}>Decision Confidence</Text>
                      <Text style={[styles.explainabilityScore, { color: '#06b6d4' }]}>96.8%</Text>
                    </View>
                    <View style={styles.explainabilityBars}>
                      <View style={styles.explainabilityBarRow}>
                        <Text style={[styles.explainabilityBarLabel, { color: '#9ca3af' }]}>High Confidence</Text>
                        <View style={[styles.explainabilityBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.explainabilityBarFill, { width: '92%', backgroundColor: '#10b981' }]} />
                        </View>
                      </View>
                      <View style={styles.explainabilityBarRow}>
                        <Text style={[styles.explainabilityBarLabel, { color: '#9ca3af' }]}>Medium</Text>
                        <View style={[styles.explainabilityBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                          <View style={[styles.explainabilityBarFill, { width: '6%', backgroundColor: '#f59e0b' }]} />
                        </View>
                      </View>
                      <View style={styles.explainabilityBarRow}>
                        <Text style={[styles.explainabilityBarLabel, { color: '#9ca3af' }]}>Low</Text>
                        <View style={[styles.explainabilityBar, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                          <View style={[styles.explainabilityBarFill, { width: '2%', backgroundColor: '#ef4444' }]} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Governance Audit Ledger */}
              <View style={styles.ledgerSection}>
                <Text style={[styles.ledgerTitle, { color: '#f9fafb' }]}>Governance Audit Ledger</Text>
                <View style={styles.ledgerGrid}>
                  <View style={styles.ledgerRow}>
                    <View style={styles.ledgerIcon}>
                      <CheckCircle size={16} color="#10b981" />
                    </View>
                    <View style={styles.ledgerContent}>
                      <Text style={[styles.ledgerTitleText, { color: '#f9fafb' }]}>Model deployment approved</Text>
                      <Text style={[styles.ledgerSub, { color: '#9ca3af' }]}>GPT-4-Turbo v2.1 • 2 hours ago</Text>
                    </View>
                    <View style={[styles.ledgerStatus, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <Text style={[styles.ledgerStatusText, { color: '#10b981' }]}>Approved</Text>
                    </View>
                  </View>
                  <View style={styles.ledgerRow}>
                    <View style={styles.ledgerIcon}>
                      <AlertTriangle size={16} color="#f59e0b" />
                    </View>
                    <View style={styles.ledgerContent}>
                      <Text style={[styles.ledgerTitleText, { color: '#f9fafb' }]}>Policy violation detected</Text>
                      <Text style={[styles.ledgerSub, { color: '#9ca3af' }]}>Data access • 4 hours ago</Text>
                    </View>
                    <View style={[styles.ledgerStatus, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                      <Text style={[styles.ledgerStatusText, { color: '#f59e0b' }]}>Warning</Text>
                    </View>
                  </View>
                  <View style={styles.ledgerRow}>
                    <View style={styles.ledgerIcon}>
                      <Shield size={16} color="#06b6d4" />
                    </View>
                    <View style={styles.ledgerContent}>
                      <Text style={[styles.ledgerTitleText, { color: '#f9fafb' }]}>Safety review completed</Text>
                      <Text style={[styles.ledgerSub, { color: '#9ca3af' }]}>Claude-3.5 • 6 hours ago</Text>
                    </View>
                    <View style={[styles.ledgerStatus, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                      <Text style={[styles.ledgerStatusText, { color: '#06b6d4' }]}>Safe</Text>
                    </View>
                  </View>
                  <View style={styles.ledgerRow}>
                    <View style={styles.ledgerIcon}>
                      <User size={16} color="#8b5cf6" />
                    </View>
                    <View style={styles.ledgerContent}>
                      <Text style={[styles.ledgerTitleText, { color: '#f9fafb' }]}>Human override triggered</Text>
                      <Text style={[styles.ledgerSub, { color: '#9ca3af' }]}>Financial advisor • 8 hours ago</Text>
                    </View>
                    <View style={[styles.ledgerStatus, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                      <Text style={[styles.ledgerStatusText, { color: '#8b5cf6' }]}>Override</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Permissions & Access Control */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Permissions & Access Control</Text>
            <View style={[styles.permissionsContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.permissionsHeader}>
                <Text style={[styles.permissionsSubtitle, { color: '#9ca3af' }]}>Track user roles, AI agent permissions, data access levels, and model execution rights</Text>
              </View>

              {/* Role-based Access Matrix */}
              <View style={styles.rbacSection}>
                <Text style={[styles.rbacTitle, { color: '#f9fafb' }]}>Role-based Access Matrix</Text>
                <View style={styles.rbacGrid}>
                  <View style={styles.rbacCard}>
                    <View style={styles.rbacHeader}>
                      <Shield size={20} color="#06b6d4" />
                      <Text style={[styles.rbacCardTitle, { color: '#f9fafb' }]}>Admin</Text>
                    </View>
                    <View style={styles.rbacStats}>
                      <View style={styles.rbacStat}>
                        <Text style={[styles.rbacStatLabel, { color: '#9ca3af' }]}>Users</Text>
                        <Text style={[styles.rbacStatValue, { color: '#f9fafb' }]}>12</Text>
                      </View>
                      <View style={styles.rbacStat}>
                        <Text style={[styles.rbacStatLabel, { color: '#9ca3af' }]}>Permissions</Text>
                        <Text style={[styles.rbacStatValue, { color: '#06b6d4' }]}>Full</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rbacCard}>
                    <View style={styles.rbacHeader}>
                      <User size={20} color="#8b5cf6" />
                      <Text style={[styles.rbacCardTitle, { color: '#f9fafb' }]}>Developer</Text>
                    </View>
                    <View style={styles.rbacStats}>
                      <View style={styles.rbacStat}>
                        <Text style={[styles.rbacStatLabel, { color: '#9ca3af' }]}>Users</Text>
                        <Text style={[styles.rbacStatValue, { color: '#f9fafb' }]}>48</Text>
                      </View>
                      <View style={styles.rbacStat}>
                        <Text style={[styles.rbacStatLabel, { color: '#9ca3af' }]}>Permissions</Text>
                        <Text style={[styles.rbacStatValue, { color: '#8b5cf6' }]}>High</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rbacCard}>
                    <View style={styles.rbacHeader}>
                      <Eye size={20} color="#10b981" />
                      <Text style={[styles.rbacCardTitle, { color: '#f9fafb' }]}>Analyst</Text>
                    </View>
                    <View style={styles.rbacStats}>
                      <View style={styles.rbacStat}>
                        <Text style={[styles.rbacStatLabel, { color: '#9ca3af' }]}>Users</Text>
                        <Text style={[styles.rbacStatValue, { color: '#f9fafb' }]}>124</Text>
                      </View>
                      <View style={styles.rbacStat}>
                        <Text style={[styles.rbacStatLabel, { color: '#9ca3af' }]}>Permissions</Text>
                        <Text style={[styles.rbacStatValue, { color: '#10b981' }]}>Medium</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.rbacCard}>
                    <View style={styles.rbacHeader}>
                      <Lock size={20} color="#f59e0b" />
                      <Text style={[styles.rbacCardTitle, { color: '#f9fafb' }]}>Viewer</Text>
                    </View>
                    <View style={styles.rbacStats}>
                      <View style={styles.rbacStat}>
                        <Text style={[styles.rbacStatLabel, { color: '#9ca3af' }]}>Users</Text>
                        <Text style={[styles.rbacStatValue, { color: '#f9fafb' }]}>842</Text>
                      </View>
                      <View style={styles.rbacStat}>
                        <Text style={[styles.rbacStatLabel, { color: '#9ca3af' }]}>Permissions</Text>
                        <Text style={[styles.rbacStatValue, { color: '#f59e0b' }]}>Read-only</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Permission Dependency Graph */}
              <View style={styles.permissionGraphSection}>
                <Text style={[styles.permissionGraphTitle, { color: '#f9fafb' }]}>Permission Dependency Graph</Text>
                <View style={styles.permissionGraphGrid}>
                  <View style={styles.permissionGraphCard}>
                    <View style={styles.permissionGraphHeader}>
                      <Text style={[styles.permissionGraphName, { color: '#f9fafb' }]}>Model Execution</Text>
                      <View style={[styles.permissionGraphBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                        <Text style={[styles.permissionGraphBadgeText, { color: '#10b981' }]}>Active</Text>
                      </View>
                    </View>
                    <View style={styles.permissionGraphFlow}>
                      <View style={[styles.permissionGraphNode, { backgroundColor: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4' }]}>
                        <Text style={[styles.permissionGraphNodeText, { color: '#06b6d4' }]}>Request</Text>
                      </View>
                      <View style={[styles.permissionGraphConnector, { backgroundColor: '#06b6d4' }]} />
                      <View style={[styles.permissionGraphNode, { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6' }]}>
                        <Text style={[styles.permissionGraphNodeText, { color: '#8b5cf6' }]}>Validate</Text>
                      </View>
                      <View style={[styles.permissionGraphConnector, { backgroundColor: '#8b5cf6' }]} />
                      <View style={[styles.permissionGraphNode, { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981' }]}>
                        <Text style={[styles.permissionGraphNodeText, { color: '#10b981' }]}>Execute</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.permissionGraphCard}>
                    <View style={styles.permissionGraphHeader}>
                      <Text style={[styles.permissionGraphName, { color: '#f9fafb' }]}>Data Access</Text>
                      <View style={[styles.permissionGraphBadge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                        <Text style={[styles.permissionGraphBadgeText, { color: '#f59e0b' }]}>Review</Text>
                      </View>
                    </View>
                    <View style={styles.permissionGraphFlow}>
                      <View style={[styles.permissionGraphNode, { backgroundColor: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4' }]}>
                        <Text style={[styles.permissionGraphNodeText, { color: '#06b6d4' }]}>Request</Text>
                      </View>
                      <View style={[styles.permissionGraphConnector, { backgroundColor: '#06b6d4' }]} />
                      <View style={[styles.permissionGraphNode, { backgroundColor: 'rgba(245, 158, 11, 0.2)', borderColor: '#f59e0b' }]}>
                        <Text style={[styles.permissionGraphNodeText, { color: '#f59e0b' }]}>Pending</Text>
                      </View>
                      <View style={[styles.permissionGraphConnector, { backgroundColor: '#f59e0b' }]} />
                      <View style={[styles.permissionGraphNode, { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6' }]}>
                        <Text style={[styles.permissionGraphNodeText, { color: '#8b5cf6' }]}>Approve</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Least-privilege Enforcement Dashboard */}
              <View style={styles.privilegeSection}>
                <Text style={[styles.privilegeTitle, { color: '#f9fafb' }]}>Least-privilege Enforcement Dashboard</Text>
                <View style={styles.privilegeGrid}>
                  <View style={styles.privilegeCard}>
                    <View style={styles.privilegeHeader}>
                      <Text style={[styles.privilegeCardTitle, { color: '#f9fafb' }]}>Over-provisioned Access</Text>
                      <Text style={[styles.privilegeValue, { color: '#ef4444' }]}>24</Text>
                    </View>
                    <Text style={[styles.privilegeSub, { color: '#9ca3af' }]}>Users with excessive permissions</Text>
                  </View>
                  <View style={styles.privilegeCard}>
                    <View style={styles.privilegeHeader}>
                      <Text style={[styles.privilegeCardTitle, { color: '#f9fafb' }]}>Compliant Access</Text>
                      <Text style={[styles.privilegeValue, { color: '#10b981' }]}>982</Text>
                    </View>
                    <Text style={[styles.privilegeSub, { color: '#9ca3af' }]}>Users with correct permissions</Text>
                  </View>
                  <View style={styles.privilegeCard}>
                    <View style={styles.privilegeHeader}>
                      <Text style={[styles.privilegeCardTitle, { color: '#f9fafb' }]}>Pending Reviews</Text>
                      <Text style={[styles.privilegeValue, { color: '#f59e0b' }]}>18</Text>
                    </View>
                    <Text style={[styles.privilegeSub, { color: '#9ca3af' }]}>Access requests awaiting approval</Text>
                  </View>
                  <View style={styles.privilegeCard}>
                    <View style={styles.privilegeHeader}>
                      <Text style={[styles.privilegeCardTitle, { color: '#f9fafb' }]}>Revoked Access</Text>
                      <Text style={[styles.privilegeValue, { color: '#8b5cf6' }]}>42</Text>
                    </View>
                    <Text style={[styles.privilegeSub, { color: '#9ca3af' }]}>Access revoked this month</Text>
                  </View>
                </View>
              </View>

              {/* Access Request Queue */}
              <View style={styles.accessQueueSection}>
                <Text style={[styles.accessQueueTitle, { color: '#f9fafb' }]}>Access Request Queue</Text>
                <View style={styles.accessQueueGrid}>
                  <View style={styles.accessQueueRow}>
                    <View style={styles.accessQueueIcon}>
                      <User size={16} color="#06b6d4" />
                    </View>
                    <View style={styles.accessQueueContent}>
                      <Text style={[styles.accessQueueTitleText, { color: '#f9fafb' }]}>Model execution access</Text>
                      <Text style={[styles.accessQueueSub, { color: '#9ca3af' }]}>John Smith • Finance team</Text>
                    </View>
                    <View style={[styles.accessQueueStatus, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                      <Text style={[styles.accessQueueStatusText, { color: '#f59e0b' }]}>Pending</Text>
                    </View>
                  </View>
                  <View style={styles.accessQueueRow}>
                    <View style={styles.accessQueueIcon}>
                      <Database size={16} color="#8b5cf6" />
                    </View>
                    <View style={styles.accessQueueContent}>
                      <Text style={[styles.accessQueueTitleText, { color: '#f9fafb' }]}>Dataset read access</Text>
                      <Text style={[styles.accessQueueSub, { color: '#9ca3af' }]}>Sarah Johnson • Research team</Text>
                    </View>
                    <View style={[styles.accessQueueStatus, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <Text style={[styles.accessQueueStatusText, { color: '#10b981' }]}>Approved</Text>
                    </View>
                  </View>
                  <View style={styles.accessQueueRow}>
                    <View style={styles.accessQueueIcon}>
                      <Shield size={16} color="#ef4444" />
                    </View>
                    <View style={styles.accessQueueContent}>
                      <Text style={[styles.accessQueueTitleText, { color: '#f9fafb' }]}>Admin privileges</Text>
                      <Text style={[styles.accessQueueSub, { color: '#9ca3af' }]}>Mike Davis • IT team</Text>
                    </View>
                    <View style={[styles.accessQueueStatus, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
                      <Text style={[styles.accessQueueStatusText, { color: '#ef4444' }]}>Denied</Text>
                    </View>
                  </View>
                  <View style={styles.accessQueueRow}>
                    <View style={styles.accessQueueIcon}>
                      <Lock size={16} color="#10b981" />
                    </View>
                    <View style={styles.accessQueueContent}>
                      <Text style={[styles.accessQueueTitleText, { color: '#f9fafb' }]}>API key access</Text>
                      <Text style={[styles.accessQueueSub, { color: '#9ca3af' }]}>Emily Chen • DevOps team</Text>
                    </View>
                    <View style={[styles.accessQueueStatus, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                      <Text style={[styles.accessQueueStatusText, { color: '#06b6d4' }]}>Review</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* AI Evaluation & Benchmarking */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>AI Evaluation & Benchmarking</Text>
            <View style={[styles.evaluationContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.evaluationHeader}>
                <Text style={[styles.evaluationSubtitle, { color: '#9ca3af' }]}>Monitor model accuracy, hallucination benchmarks, safety benchmarks, bias scores, and performance drift</Text>
              </View>

              {/* Model Comparison Leaderboard */}
              <View style={styles.leaderboardSection}>
                <Text style={[styles.leaderboardTitle, { color: '#f9fafb' }]}>Model Comparison Leaderboard</Text>
                <View style={styles.leaderboardGrid}>
                  <View style={styles.leaderboardCard}>
                    <View style={styles.leaderboardHeader}>
                      <View style={styles.leaderboardRank}>
                        <Text style={[styles.leaderboardRankText, { color: '#f9fafb' }]}>1</Text>
                      </View>
                      <Text style={[styles.leaderboardName, { color: '#f9fafb' }]}>GPT-4-Turbo</Text>
                      <View style={[styles.leaderboardBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                        <Text style={[styles.leaderboardBadgeText, { color: '#10b981' }]}>98.2</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.leaderboardCard}>
                    <View style={styles.leaderboardHeader}>
                      <View style={styles.leaderboardRank}>
                        <Text style={[styles.leaderboardRankText, { color: '#f9fafb' }]}>2</Text>
                      </View>
                      <Text style={[styles.leaderboardName, { color: '#f9fafb' }]}>Claude-3.5</Text>
                      <View style={[styles.leaderboardBadge, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                        <Text style={[styles.leaderboardBadgeText, { color: '#06b6d4' }]}>97.8</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.leaderboardCard}>
                    <View style={styles.leaderboardHeader}>
                      <View style={styles.leaderboardRank}>
                        <Text style={[styles.leaderboardRankText, { color: '#f9fafb' }]}>3</Text>
                      </View>
                      <Text style={[styles.leaderboardName, { color: '#f9fafb' }]}>Gemini-Pro</Text>
                      <View style={[styles.leaderboardBadge, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                        <Text style={[styles.leaderboardBadgeText, { color: '#8b5cf6' }]}>96.4</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.leaderboardCard}>
                    <View style={styles.leaderboardHeader}>
                      <View style={styles.leaderboardRank}>
                        <Text style={[styles.leaderboardRankText, { color: '#f9fafb' }]}>4</Text>
                      </View>
                      <Text style={[styles.leaderboardName, { color: '#f9fafb' }]}>Llama-3-70B</Text>
                      <View style={[styles.leaderboardBadge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                        <Text style={[styles.leaderboardBadgeText, { color: '#f59e0b' }]}>94.8</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Evaluation Scorecards */}
              <View style={styles.scorecardSection}>
                <Text style={[styles.scorecardTitle, { color: '#f9fafb' }]}>Evaluation Scorecards</Text>
                <View style={styles.scorecardGrid}>
                  <View style={styles.scorecardCard}>
                    <View style={styles.scorecardHeader}>
                      <Text style={[styles.scorecardName, { color: '#f9fafb' }]}>Accuracy</Text>
                      <Text style={[styles.scorecardScore, { color: '#10b981' }]}>96.8%</Text>
                    </View>
                    <View style={styles.scorecardMetrics}>
                      <View style={styles.scorecardMetric}>
                        <Text style={[styles.scorecardMetricLabel, { color: '#9ca3af' }]}>GPT-4-Turbo</Text>
                        <View style={[styles.scorecardMetricBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.scorecardMetricFill, { width: '98%', backgroundColor: '#10b981' }]} />
                        </View>
                        <Text style={[styles.scorecardMetricValue, { color: '#10b981' }]}>98%</Text>
                      </View>
                      <View style={styles.scorecardMetric}>
                        <Text style={[styles.scorecardMetricLabel, { color: '#9ca3af' }]}>Claude-3.5</Text>
                        <View style={[styles.scorecardMetricBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.scorecardMetricFill, { width: '96%', backgroundColor: '#06b6d4' }]} />
                        </View>
                        <Text style={[styles.scorecardMetricValue, { color: '#06b6d4' }]}>96%</Text>
                      </View>
                      <View style={styles.scorecardMetric}>
                        <Text style={[styles.scorecardMetricLabel, { color: '#9ca3af' }]}>Gemini-Pro</Text>
                        <View style={[styles.scorecardMetricBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                          <View style={[styles.scorecardMetricFill, { width: '94%', backgroundColor: '#8b5cf6' }]} />
                        </View>
                        <Text style={[styles.scorecardMetricValue, { color: '#8b5cf6' }]}>94%</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.scorecardCard}>
                    <View style={styles.scorecardHeader}>
                      <Text style={[styles.scorecardName, { color: '#f9fafb' }]}>Hallucination</Text>
                      <Text style={[styles.scorecardScore, { color: '#06b6d4' }]}>2.4%</Text>
                    </View>
                    <View style={styles.scorecardMetrics}>
                      <View style={styles.scorecardMetric}>
                        <Text style={[styles.scorecardMetricLabel, { color: '#9ca3af' }]}>GPT-4-Turbo</Text>
                        <View style={[styles.scorecardMetricBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.scorecardMetricFill, { width: '2%', backgroundColor: '#06b6d4' }]} />
                        </View>
                        <Text style={[styles.scorecardMetricValue, { color: '#06b6d4' }]}>2%</Text>
                      </View>
                      <View style={styles.scorecardMetric}>
                        <Text style={[styles.scorecardMetricLabel, { color: '#9ca3af' }]}>Claude-3.5</Text>
                        <View style={[styles.scorecardMetricBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.scorecardMetricFill, { width: '3%', backgroundColor: '#06b6d4' }]} />
                        </View>
                        <Text style={[styles.scorecardMetricValue, { color: '#06b6d4' }]}>3%</Text>
                      </View>
                      <View style={styles.scorecardMetric}>
                        <Text style={[styles.scorecardMetricLabel, { color: '#9ca3af' }]}>Gemini-Pro</Text>
                        <View style={[styles.scorecardMetricBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                          <View style={[styles.scorecardMetricFill, { width: '4%', backgroundColor: '#f59e0b' }]} />
                        </View>
                        <Text style={[styles.scorecardMetricValue, { color: '#f59e0b' }]}>4%</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Benchmark Performance Curves */}
              <View style={styles.benchmarkSection}>
                <Text style={[styles.benchmarkTitle, { color: '#f9fafb' }]}>Benchmark Performance Curves</Text>
                <View style={styles.benchmarkGrid}>
                  <View style={styles.benchmarkCard}>
                    <View style={styles.benchmarkHeader}>
                      <Text style={[styles.benchmarkCardTitle, { color: '#f9fafb' }]}>Safety Benchmarks</Text>
                      <Text style={[styles.benchmarkScore, { color: '#10b981' }]}>94.8%</Text>
                    </View>
                    <View style={styles.benchmarkBars}>
                      <View style={styles.benchmarkBarRow}>
                        <Text style={[styles.benchmarkBarLabel, { color: '#9ca3af' }]}>Toxicity</Text>
                        <View style={[styles.benchmarkBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.benchmarkBarFill, { width: '96%', backgroundColor: '#10b981' }]} />
                        </View>
                        <Text style={[styles.benchmarkBarValue, { color: '#10b981' }]}>96%</Text>
                      </View>
                      <View style={styles.benchmarkBarRow}>
                        <Text style={[styles.benchmarkBarLabel, { color: '#9ca3af' }]}>Bias</Text>
                        <View style={[styles.benchmarkBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.benchmarkBarFill, { width: '94%', backgroundColor: '#10b981' }]} />
                        </View>
                        <Text style={[styles.benchmarkBarValue, { color: '#10b981' }]}>94%</Text>
                      </View>
                      <View style={styles.benchmarkBarRow}>
                        <Text style={[styles.benchmarkBarLabel, { color: '#9ca3af' }]}>Fairness</Text>
                        <View style={[styles.benchmarkBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.benchmarkBarFill, { width: '92%', backgroundColor: '#06b6d4' }]} />
                        </View>
                        <Text style={[styles.benchmarkBarValue, { color: '#06b6d4' }]}>92%</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.benchmarkCard}>
                    <View style={styles.benchmarkHeader}>
                      <Text style={[styles.benchmarkCardTitle, { color: '#f9fafb' }]}>Performance Drift</Text>
                      <Text style={[styles.benchmarkScore, { color: '#f59e0b' }]}>8.2%</Text>
                    </View>
                    <View style={styles.benchmarkBars}>
                      <View style={styles.benchmarkBarRow}>
                        <Text style={[styles.benchmarkBarLabel, { color: '#9ca3af' }]}>Accuracy</Text>
                        <View style={[styles.benchmarkBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                          <View style={[styles.benchmarkBarFill, { width: '6%', backgroundColor: '#10b981' }]} />
                        </View>
                        <Text style={[styles.benchmarkBarValue, { color: '#10b981' }]}>6%</Text>
                      </View>
                      <View style={styles.benchmarkBarRow}>
                        <Text style={[styles.benchmarkBarLabel, { color: '#9ca3af' }]}>Latency</Text>
                        <View style={[styles.benchmarkBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                          <View style={[styles.benchmarkBarFill, { width: '12%', backgroundColor: '#f59e0b' }]} />
                        </View>
                        <Text style={[styles.benchmarkBarValue, { color: '#f59e0b' }]}>12%</Text>
                      </View>
                      <View style={styles.benchmarkBarRow}>
                        <Text style={[styles.benchmarkBarLabel, { color: '#9ca3af' }]}>Cost</Text>
                        <View style={[styles.benchmarkBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                          <View style={[styles.benchmarkBarFill, { width: '8%', backgroundColor: '#06b6d4' }]} />
                        </View>
                        <Text style={[styles.benchmarkBarValue, { color: '#06b6d4' }]}>8%</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* Bias Scores */}
              <View style={styles.biasSection}>
                <Text style={[styles.biasTitle, { color: '#f9fafb' }]}>Bias Scores</Text>
                <View style={styles.biasGrid}>
                  <View style={styles.biasCard}>
                    <View style={styles.biasHeader}>
                      <Text style={[styles.biasCardTitle, { color: '#f9fafb' }]}>Gender Bias</Text>
                      <Text style={[styles.biasValue, { color: '#10b981' }]}>Low</Text>
                    </View>
                    <View style={[styles.biasBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.biasFill, { width: '12%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.biasSub, { color: '#9ca3af' }]}>12% bias detected</Text>
                  </View>
                  <View style={styles.biasCard}>
                    <View style={styles.biasHeader}>
                      <Text style={[styles.biasCardTitle, { color: '#f9fafb' }]}>Racial Bias</Text>
                      <Text style={[styles.biasValue, { color: '#10b981' }]}>Low</Text>
                    </View>
                    <View style={[styles.biasBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                      <View style={[styles.biasFill, { width: '8%', backgroundColor: '#10b981' }]} />
                    </View>
                    <Text style={[styles.biasSub, { color: '#9ca3af' }]}>8% bias detected</Text>
                  </View>
                  <View style={styles.biasCard}>
                    <View style={styles.biasHeader}>
                      <Text style={[styles.biasCardTitle, { color: '#f9fafb' }]}>Age Bias</Text>
                      <Text style={[styles.biasValue, { color: '#06b6d4' }]}>Minimal</Text>
                    </View>
                    <View style={[styles.biasBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                      <View style={[styles.biasFill, { width: '5%', backgroundColor: '#06b6d4' }]} />
                    </View>
                    <Text style={[styles.biasSub, { color: '#9ca3af' }]}>5% bias detected</Text>
                  </View>
                  <View style={styles.biasCard}>
                    <View style={styles.biasHeader}>
                      <Text style={[styles.biasCardTitle, { color: '#f9fafb' }]}>Cultural Bias</Text>
                      <Text style={[styles.biasValue, { color: '#f59e0b' }]}>Medium</Text>
                    </View>
                    <View style={[styles.biasBar, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                      <View style={[styles.biasFill, { width: '24%', backgroundColor: '#f59e0b' }]} />
                    </View>
                    <Text style={[styles.biasSub, { color: '#9ca3af' }]}>24% bias detected</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Enterprise AI Registry System */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Enterprise AI Registry System</Text>
            <View style={[styles.registryContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={styles.registryStats}>
                <View style={styles.registryStat}>
                  <Text style={[styles.registryStatValue, { color: '#06b6d4' }]}>8,420</Text>
                  <Text style={[styles.registryStatLabel, { color: '#9ca3af' }]}>Total AI Systems</Text>
                </View>
                <View style={styles.registryStat}>
                  <Text style={[styles.registryStatValue, { color: '#10b981' }]}>4,820</Text>
                  <Text style={[styles.registryStatLabel, { color: '#9ca3af' }]}>Deployed Agents</Text>
                </View>
                <View style={styles.registryStat}>
                  <Text style={[styles.registryStatValue, { color: '#8b5cf6' }]}>2,481</Text>
                  <Text style={[styles.registryStatLabel, { color: '#9ca3af' }]}>Registered Models</Text>
                </View>
                <View style={styles.registryStat}>
                  <Text style={[styles.registryStatValue, { color: '#f59e0b' }]}>1,284</Text>
                  <Text style={[styles.registryStatLabel, { color: '#9ca3af' }]}>Active Policies</Text>
                </View>
              </View>
              <View style={styles.registryCategories}>
                <View style={styles.registryCategory}>
                  <View style={[styles.registryCategoryBar, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                    <View style={[styles.registryCategoryFill, { width: '65%', backgroundColor: '#06b6d4' }]} />
                  </View>
                  <Text style={[styles.registryCategoryLabel, { color: '#9ca3af' }]}>LLM Models (65%)</Text>
                </View>
                <View style={styles.registryCategory}>
                  <View style={[styles.registryCategoryBar, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                    <View style={[styles.registryCategoryFill, { width: '25%', backgroundColor: '#8b5cf6' }]} />
                  </View>
                  <Text style={[styles.registryCategoryLabel, { color: '#9ca3af' }]}>AI Agents (25%)</Text>
                </View>
                <View style={styles.registryCategory}>
                  <View style={[styles.registryCategoryBar, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                    <View style={[styles.registryCategoryFill, { width: '10%', backgroundColor: '#10b981' }]} />
                  </View>
                  <Text style={[styles.registryCategoryLabel, { color: '#9ca3af' }]}>Workflows (10%)</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 260,
    paddingTop: 20,
    paddingBottom: 20,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  sidebarSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  sidebarScroll: {
    flex: 1,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  sidebarItemText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  executiveBar: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
  },
  executiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  executiveTitle: {
    flex: 1,
  },
  executiveTitleText: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  executiveSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  monitoringButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  monitoringButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  kpiScroll: {
    flexDirection: 'row',
  },
  kpiScrollItem: {
    marginRight: 12,
  },
  kpiCard: {
    width: 180,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'rgba(10, 15, 25, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  kpiIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiTitle: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  kpiContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  kpiChange: {
    fontSize: 13,
    fontWeight: '600',
  },
  commandCenter: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  commandMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commandMetric: {
    alignItems: 'center',
    flex: 1,
  },
  commandMetricValue: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  commandMetricLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  commandMetricSub: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  commandDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  agentsGrid: {
    gap: 16,
  },
  agentCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'rgba(10, 15, 25, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 13,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  agentMetrics: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 24,
  },
  agentMetric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  agentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  statRow: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  eventsContainer: {
    gap: 12,
  },
  eventCard: {
    padding: 16,
    borderRadius: 12,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  eventIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  eventDescription: {
    fontSize: 12,
    fontWeight: '400',
  },
  eventTime: {
    fontSize: 11,
    fontWeight: '500',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'rgba(10, 15, 25, 0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  insightAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
  },
  insightActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  healthGrid: {
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  healthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  healthIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthInfo: {
    flex: 1,
  },
  healthTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  healthStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  controlPlaneContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  controlPlaneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  controlPlaneTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  controlPlaneGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  controlRegion: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'rgba(10, 15, 25, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  regionName: {
    fontSize: 14,
    fontWeight: '700',
  },
  regionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  regionStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  regionStatusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  regionStats: {
    gap: 12,
  },
  regionStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  regionStatLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  regionStatValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  controlPlaneBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  controlPlaneBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  controlPlaneConnections: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  connectionLine: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(6, 182, 212, 0.3)',
  },
  connectionLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  dependencyContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  dependencyGraph: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dependencyNode: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 100,
    backgroundColor: 'rgba(10, 15, 25, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  dependencyNodeText: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  dependencyNodeSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  dependencyNetwork: {
    marginTop: 16,
    gap: 12,
  },
  networkRow: {
    flexDirection: 'row',
    gap: 12,
  },
  networkNode: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(10, 15, 25, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  networkNodeText: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  networkNodeCount: {
    fontSize: 10,
    fontWeight: '500',
  },
  dependencyConnector: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
  },
  dependencyLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '500',
  },
  riskPropagationContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  riskQuadrants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  riskQuadrant: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(10, 15, 25, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  quadrantTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  quadrantValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  heatmapContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  heatmapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  heatmapCell: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(10, 15, 25, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  heatmapCellLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  heatmapCellValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  caioContainer: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  caioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  caioProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  caioAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caioInfo: {
    flex: 1,
  },
  caioName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  caioRole: {
    fontSize: 13,
    fontWeight: '500',
  },
  caioBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  caioBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  caioMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  caioMetric: {
    alignItems: 'center',
    flex: 1,
  },
  caioMetricValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  caioMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  riskOverviewContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  riskOverviewGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  riskOverviewCard: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  riskOverviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  riskOverviewTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  riskOverviewValue: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
  },
  riskOverviewSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  radarContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  radarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  radarTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  radarGrid: {
    gap: 12,
  },
  radarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 8,
  },
  radarCategory: {
    width: 140,
  },
  radarCategoryName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  radarSeverity: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  radarSeverityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  radarBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  radarBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  radarFill: {
    height: '100%',
    borderRadius: 4,
  },
  radarValue: {
    fontSize: 14,
    fontWeight: '700',
    width: 40,
    textAlign: 'right',
  },
  interactionContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  interactionGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  interactionNode: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 100,
  },
  interactionNodeText: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  interactionNodeSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  interactionConnector: {
    flex: 1,
    height: 2,
    marginHorizontal: 8,
  },
  interactionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  interactionStat: {
    alignItems: 'center',
  },
  interactionStatLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  interactionStatValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  pipelineContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  pipelineStages: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pipelineStage: {
    alignItems: 'center',
    flex: 1,
  },
  pipelineStageIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  pipelineStageName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  pipelineStageCount: {
    fontSize: 11,
    fontWeight: '500',
  },
  pipelineArrow: {
    paddingHorizontal: 8,
  },
  safetyWallContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  safetyWallGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  safetyWallPanel: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  safetyWallPanelTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  safetyWallPanelValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  safetyWallPanelSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  registryContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  registryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  registryStat: {
    alignItems: 'center',
  },
  registryStatValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  registryStatLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  registryCategories: {
    gap: 12,
  },
  registryCategory: {
    gap: 6,
  },
  registryCategoryBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  registryCategoryFill: {
    height: '100%',
    borderRadius: 4,
  },
  registryCategoryLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  lifecycleContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  lifecycleHeader: {
    marginBottom: 20,
  },
  lifecycleSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  lifecyclePipeline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  pipelineStep: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  pipelineStepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
  },
  pipelineStepTitle: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  pipelineStepCount: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  pipelineStepStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pipelineStepStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  pipelineConnector: {
    paddingHorizontal: 4,
  },
  modelVersionsSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  modelVersionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  modelVersionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  modelVersionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  modelVersionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modelVersionName: {
    fontSize: 14,
    fontWeight: '700',
  },
  modelVersionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  modelVersionBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  modelVersionMetrics: {
    gap: 8,
  },
  modelVersionMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modelVersionMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  modelVersionMetricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  deploymentMatrixSection: {
    marginTop: 24,
  },
  deploymentMatrixTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  deploymentMatrixGrid: {
    gap: 12,
  },
  deploymentMatrixRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deploymentMatrixLabel: {
    fontSize: 12,
    fontWeight: '500',
    width: 140,
  },
  deploymentMatrixBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  deploymentMatrixFill: {
    height: '100%',
    borderRadius: 4,
  },
  deploymentMatrixValue: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  policyContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  policyHeader: {
    marginBottom: 20,
  },
  policySubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  policyEnforcementSection: {
    marginBottom: 24,
  },
  policyEnforcementTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  policyEnforcementGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  policyEnforcementCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  policyEnforcementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  policyEnforcementCardTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  policyEnforcementValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  policyEnforcementSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  regulatorySection: {
    marginBottom: 24,
  },
  regulatoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  regulatoryGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  regulatoryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  regulatoryCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  regulatoryCardName: {
    fontSize: 14,
    fontWeight: '700',
  },
  regulatoryCardBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  regulatoryCardBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  regulatoryCardMetrics: {
    gap: 8,
  },
  regulatoryCardMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  regulatoryCardMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  regulatoryCardMetricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  violationSection: {
    marginBottom: 24,
  },
  violationTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  violationTimeline: {
    gap: 12,
  },
  violationTimelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  violationTimelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  violationTimelineContent: {
    flex: 1,
  },
  violationTimelineTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  violationTimelineTime: {
    fontSize: 11,
    fontWeight: '500',
  },
  ruleCoverageSection: {
    marginTop: 24,
  },
  ruleCoverageTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  ruleCoverageGrid: {
    gap: 12,
  },
  ruleCoverageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ruleCoverageLabel: {
    fontSize: 12,
    fontWeight: '500',
    width: 140,
  },
  ruleCoverageBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  ruleCoverageFill: {
    height: '100%',
    borderRadius: 4,
  },
  ruleCoverageValue: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  dataGovernanceContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  dataGovernanceHeader: {
    marginBottom: 20,
  },
  dataGovernanceSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  datasetsSection: {
    marginBottom: 24,
  },
  datasetsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  datasetsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  datasetCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  datasetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  datasetTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  datasetMetrics: {
    gap: 8,
  },
  datasetMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datasetMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  datasetMetricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  lineageSection: {
    marginBottom: 24,
  },
  lineageTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  lineageGraph: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  lineageFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineageNode: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 80,
  },
  lineageNodeText: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  lineageNodeSub: {
    fontSize: 10,
    fontWeight: '500',
  },
  lineageConnector: {
    width: 40,
    height: 2,
    borderRadius: 1,
  },
  trustSection: {
    marginBottom: 24,
  },
  trustTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  trustGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  trustCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  trustHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  trustName: {
    fontSize: 13,
    fontWeight: '600',
  },
  trustScore: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trustScoreText: {
    fontSize: 12,
    fontWeight: '700',
  },
  trustMetrics: {
    gap: 8,
  },
  trustMetric: {
    gap: 4,
  },
  trustMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  trustMetricBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  trustMetricFill: {
    height: '100%',
    borderRadius: 3,
  },
  piiSection: {
    marginBottom: 24,
  },
  piiTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  piiGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  piiCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  piiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  piiCardTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  piiValue: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  piiSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  riskControlContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  riskControlHeader: {
    marginBottom: 20,
  },
  riskControlSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  riskRadarSection: {
    marginBottom: 24,
  },
  riskRadarTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  riskRadarGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  riskRadarCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  riskRadarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  riskRadarCardTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  riskRadarValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  riskRadarSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  safetyScoreSection: {
    marginBottom: 24,
  },
  safetyScoreTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  safetyScoreGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  safetyScoreCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  safetyScoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  safetyScoreName: {
    fontSize: 13,
    fontWeight: '600',
  },
  safetyScoreBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  safetyScoreBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  safetyScoreMetrics: {
    gap: 8,
  },
  safetyScoreMetric: {
    gap: 4,
  },
  safetyScoreMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  safetyScoreMetricBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  safetyScoreMetricFill: {
    height: '100%',
    borderRadius: 3,
  },
  attackSimSection: {
    marginBottom: 24,
  },
  attackSimTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  attackSimGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  attackSimCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  attackSimHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  attackSimCardTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  attackSimStats: {
    gap: 8,
  },
  attackSimStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attackSimStatLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  attackSimStatValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  guardrailSection: {
    marginTop: 24,
  },
  guardrailTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  guardrailGrid: {
    gap: 12,
  },
  guardrailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  guardrailLabel: {
    fontSize: 12,
    fontWeight: '500',
    width: 140,
  },
  guardrailBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  guardrailFill: {
    height: '100%',
    borderRadius: 4,
  },
  guardrailValue: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  observabilityContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  observabilityHeader: {
    marginBottom: 20,
  },
  observabilitySubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  inferenceSection: {
    marginBottom: 24,
  },
  inferenceTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  inferenceGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  inferenceCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  inferenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  inferenceCardTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  inferenceValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  inferenceSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  performanceSection: {
    marginBottom: 24,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  performanceGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  performanceCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  performanceName: {
    fontSize: 13,
    fontWeight: '600',
  },
  performanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  performanceBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  performanceMetrics: {
    gap: 8,
  },
  performanceMetric: {
    gap: 4,
  },
  performanceMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  performanceMetricBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  performanceMetricFill: {
    height: '100%',
    borderRadius: 3,
  },
  performanceMetricValue: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  costSection: {
    marginBottom: 24,
  },
  costTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  costGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  costCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  costHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  costName: {
    fontSize: 13,
    fontWeight: '600',
  },
  costValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  costBreakdown: {
    gap: 8,
  },
  costBreakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  costBreakdownDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  costBreakdownLabel: {
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
  },
  costBreakdownValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  costInsight: {
    marginTop: 8,
    gap: 4,
  },
  costInsightText: {
    fontSize: 13,
    fontWeight: '600',
  },
  costInsightSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  heatmapSection: {
    marginTop: 24,
  },
  heatmapTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  heatmapGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  heatmapCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  heatmapCardTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  heatmapBars: {
    gap: 8,
  },
  heatmapBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heatmapBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    width: 70,
  },
  heatmapBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  heatmapBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  auditContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  auditHeader: {
    marginBottom: 20,
  },
  auditSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  auditTimelineSection: {
    marginBottom: 24,
  },
  auditTimelineTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  auditTimelineGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  auditTimelineCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  auditTimelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  auditTimelineCardTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  auditTimelineValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  auditTimelineSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  decisionTraceSection: {
    marginBottom: 24,
  },
  decisionTraceTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  decisionTraceGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  decisionTraceCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  decisionTraceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  decisionTraceName: {
    fontSize: 13,
    fontWeight: '600',
  },
  decisionTraceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  decisionTraceBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  decisionTraceFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  decisionTraceNode: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 60,
  },
  decisionTraceNodeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  decisionTraceConnector: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
  },
  decisionTraceStats: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  decisionTraceStat: {
    fontSize: 11,
    fontWeight: '500',
  },
  explainabilitySection: {
    marginBottom: 24,
  },
  explainabilityTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  explainabilityGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  explainabilityCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  explainabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  explainabilityCardTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  explainabilityScore: {
    fontSize: 14,
    fontWeight: '700',
  },
  explainabilityBars: {
    gap: 8,
  },
  explainabilityBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  explainabilityBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    width: 80,
  },
  explainabilityBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  explainabilityBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  ledgerSection: {
    marginTop: 24,
  },
  ledgerTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  ledgerGrid: {
    gap: 8,
  },
  ledgerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  ledgerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ledgerContent: {
    flex: 1,
  },
  ledgerTitleText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  ledgerSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  ledgerStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ledgerStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  permissionsContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  permissionsHeader: {
    marginBottom: 20,
  },
  permissionsSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  rbacSection: {
    marginBottom: 24,
  },
  rbacTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  rbacGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  rbacCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  rbacHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  rbacCardTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  rbacStats: {
    gap: 8,
  },
  rbacStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rbacStatLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  rbacStatValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  permissionGraphSection: {
    marginBottom: 24,
  },
  permissionGraphTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  permissionGraphGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  permissionGraphCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  permissionGraphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  permissionGraphName: {
    fontSize: 13,
    fontWeight: '600',
  },
  permissionGraphBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  permissionGraphBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  permissionGraphFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  permissionGraphNode: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 60,
  },
  permissionGraphNodeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  permissionGraphConnector: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
  },
  privilegeSection: {
    marginBottom: 24,
  },
  privilegeTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  privilegeGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  privilegeCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  privilegeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  privilegeCardTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  privilegeValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  privilegeSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  accessQueueSection: {
    marginTop: 24,
  },
  accessQueueTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  accessQueueGrid: {
    gap: 8,
  },
  accessQueueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
  },
  accessQueueIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accessQueueContent: {
    flex: 1,
  },
  accessQueueTitleText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  accessQueueSub: {
    fontSize: 11,
    fontWeight: '500',
  },
  accessQueueStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  accessQueueStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  evaluationContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
  },
  evaluationHeader: {
    marginBottom: 20,
  },
  evaluationSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  leaderboardSection: {
    marginBottom: 24,
  },
  leaderboardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  leaderboardGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  leaderboardCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  leaderboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  leaderboardRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderboardRankText: {
    fontSize: 14,
    fontWeight: '700',
  },
  leaderboardName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
  },
  leaderboardBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  leaderboardBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  scorecardSection: {
    marginBottom: 24,
  },
  scorecardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  scorecardGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  scorecardCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  scorecardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  scorecardName: {
    fontSize: 13,
    fontWeight: '600',
  },
  scorecardScore: {
    fontSize: 16,
    fontWeight: '700',
  },
  scorecardMetrics: {
    gap: 8,
  },
  scorecardMetric: {
    gap: 4,
  },
  scorecardMetricLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  scorecardMetricBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  scorecardMetricFill: {
    height: '100%',
    borderRadius: 3,
  },
  scorecardMetricValue: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'right',
  },
  benchmarkSection: {
    marginBottom: 24,
  },
  benchmarkTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  benchmarkGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  benchmarkCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  benchmarkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  benchmarkCardTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  benchmarkScore: {
    fontSize: 16,
    fontWeight: '700',
  },
  benchmarkBars: {
    gap: 8,
  },
  benchmarkBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benchmarkBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    width: 60,
  },
  benchmarkBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  benchmarkBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  benchmarkBarValue: {
    fontSize: 11,
    fontWeight: '600',
    width: 30,
    textAlign: 'right',
  },
  biasSection: {
    marginTop: 24,
  },
  biasTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  biasGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  biasCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  biasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  biasCardTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  biasValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  biasBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  biasFill: {
    height: '100%',
    borderRadius: 4,
  },
  biasSub: {
    fontSize: 11,
    fontWeight: '500',
  },
});
