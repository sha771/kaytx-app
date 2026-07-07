import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  CheckCircle, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Clock, 
  Users, 
  Target, 
  Zap, 
  DollarSign,
  Activity,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react-native';

// Import all administrative components
import AIAgentOverview from '@/components/ai-agent/dashboard/administrative/AIAgentOverview';
import CAOCommandCenter from '@/components/ai-agent/dashboard/administrative/CAOCommandCenter';
import ExecutiveAssistantCenter from '@/components/ai-agent/dashboard/administrative/ExecutiveAssistantCenter';
import TaskWorkflowAutomationHub from '@/components/ai-agent/dashboard/administrative/TaskWorkflowAutomationHub';
import DocumentIntelligenceCenter from '@/components/ai-agent/dashboard/administrative/DocumentIntelligenceCenter';
import ApprovalManagementCenter from '@/components/ai-agent/dashboard/administrative/ApprovalManagementCenter';
import CommunicationsHub from '@/components/ai-agent/dashboard/administrative/CommunicationsHub';
import FacilitiesOperationsCenter from '@/components/ai-agent/dashboard/administrative/FacilitiesOperationsCenter';
import VendorProcurementCenter from '@/components/ai-agent/dashboard/administrative/VendorProcurementCenter';
import ProductivityAnalyticsCenter from '@/components/ai-agent/dashboard/administrative/ProductivityAnalyticsCenter';
import AIAdministrativeInsights from '@/components/ai-agent/dashboard/administrative/AIAdministrativeInsights';
import RealTimeOperationsFeed from '@/components/ai-agent/dashboard/administrative/RealTimeOperationsFeed';
import AdministrativeSystemHealth from '@/components/ai-agent/dashboard/administrative/AdministrativeSystemHealth';

export default function AdministrativeCommandCenter() {
  const { theme } = useTheme();

  // Sample data for components
  const adminAgents = [
    {
      id: '1',
      name: 'Agent Executive',
      role: 'Executive Assistant Agent',
      status: 'active' as const,
      confidence: 98,
      workload: 85,
      productivityGain: 31,
      accuracy: 97,
      tasksCompleted: 2842,
      icon: '👔',
      color: '#8B5CF6'
    },
    {
      id: '2',
      name: 'Agent Flow',
      role: 'Workflow Automation Agent',
      status: 'active' as const,
      confidence: 96,
      workload: 92,
      productivityGain: 42,
      accuracy: 98,
      tasksCompleted: 82420,
      icon: '⚡',
      color: '#10B981'
    },
    {
      id: '3',
      name: 'Agent Nexus',
      role: 'Document Intelligence Agent',
      status: 'active' as const,
      confidence: 97,
      workload: 78,
      productivityGain: 38,
      accuracy: 97,
      tasksCompleted: 248000,
      icon: '📄',
      color: '#3B82F6'
    }
  ];

  const caoMetrics = {
    activeWorkflows: 8420,
    meetingsToday: 284,
    documentsProcessed: 18482,
    administrativeEfficiency: 96,
    timeSavedByAI: 12840,
    tasksCompleted: 12450,
    approvalTurnaround: '2.4h',
    employeeSupportRequests: 342,
    executiveProductivityIndex: 94,
    aiAutomationSavings: '$847k'
  };

  const caoTrends = {
    workflows: '+12.5%',
    meetings: '+8.3%',
    documents: '+15.7%',
    efficiency: '+4.2%',
    timeSaved: '+18.9%'
  };

  const executives = [
    {
      executive: 'Sarah Johnson',
      title: 'CEO',
      meetingsToday: 8,
      availability: 25,
      priorityRequests: 3,
      actionItems: 12,
      travelScheduled: true,
      nextMeeting: 'Board Strategy Review - 14:00',
      utilizationRate: 85
    },
    {
      executive: 'Michael Chen',
      title: 'COO',
      meetingsToday: 12,
      availability: 15,
      priorityRequests: 5,
      actionItems: 18,
      travelScheduled: false,
      nextMeeting: 'Operations Review - 15:30',
      utilizationRate: 92
    },
    {
      executive: 'Emily Davis',
      title: 'CFO',
      meetingsToday: 6,
      availability: 45,
      priorityRequests: 2,
      actionItems: 8,
      travelScheduled: false,
      nextMeeting: 'Budget Planning - 16:00',
      utilizationRate: 78
    }
  ];

  const taskMetrics = {
    openTasks: 1247,
    automatedWorkflows: 14281,
    pendingActions: 842,
    escalations: 28,
    completionRate: 94,
    avgCompletionTime: '1.8h',
    automationAccuracy: 98,
    tasksProcessed: 82420
  };

  const workflowPipeline = [
    { id: '1', name: 'Request Created', status: 'completed' as const, count: 14281 },
    { id: '2', name: 'AI Classification', status: 'active' as const, count: 1247 },
    { id: '3', name: 'Approval Routing', status: 'active' as const, count: 842 },
    { id: '4', name: 'Task Assignment', status: 'pending' as const, count: 156 },
    { id: '5', name: 'Execution', status: 'pending' as const, count: 28 },
    { id: '6', name: 'Completion', status: 'completed' as const, count: 12450 }
  ];

  const documentMetrics = {
    documentsProcessed: 248000,
    contracts: 8420,
    policies: 1247,
    reports: 18482,
    knowledgeBaseAssets: 45620,
    approvalRouted: 18420,
    classificationAccuracy: 97,
    storageUtilization: 78,
    searchActivity: 28470
  };

  const documentCategories = [
    { name: 'Contracts', count: 8420, icon: '📋', color: '#3B82F6' },
    { name: 'Policies', count: 1247, icon: '📜', color: '#10B981' },
    { name: 'Reports', count: 18482, icon: '📊', color: '#F59E0B' },
    { name: 'Invoices', count: 45620, icon: '💰', color: '#8B5CF6' }
  ];

  const approvalMetrics = {
    pendingApprovals: 142,
    approvalTimes: '2.4h',
    escalatedRequests: 28,
    budgetRequests: 842,
    procurementRequests: 1247,
    approvalRate: 94,
    avgProcessingTime: '1.8h',
    slaCompliance: 96
  };

  const approvalRequests = [
    {
      id: '1',
      type: 'budget' as const,
      title: 'Q3 Marketing Budget Increase',
      amount: '$125,000',
      status: 'pending' as const,
      submitter: 'Marketing Team',
      timeInQueue: '2h',
      priority: 'high' as const
    },
    {
      id: '2',
      type: 'procurement' as const,
      title: 'Office Equipment Purchase',
      amount: '$45,000',
      status: 'approved' as const,
      submitter: 'Operations',
      timeInQueue: '1d',
      priority: 'medium' as const
    },
    {
      id: '3',
      type: 'contract' as const,
      title: 'Vendor Service Agreement',
      amount: '$250,000',
      status: 'pending' as const,
      submitter: 'Legal',
      timeInQueue: '4h',
      priority: 'urgent' as const
    }
  ];

  const commMetrics = {
    internalMessages: 28470,
    announcements: 142,
    employeeRequests: 842,
    teamCollaboration: 87,
    messageVolume: 28470,
    avgResponseTime: '1.2h',
    engagementRate: 94,
    satisfactionScore: 4.7
  };

  const commChannels = [
    { name: 'Slack', icon: '💬', volume: 12470, responseTime: '5m', engagement: 92, color: '#4A154B' },
    { name: 'Email', icon: '📧', volume: 8420, responseTime: '2h', engagement: 88, color: '#EA4335' },
    { name: 'Teams', icon: '👥', volume: 4580, responseTime: '15m', engagement: 95, color: '#6264A7' },
    { name: 'Intranet', icon: '🌐', volume: 3000, responseTime: '1h', engagement: 78, color: '#0078D4' }
  ];

  const facilityMetrics = {
    officeUtilization: 82,
    roomReservations: 142,
    maintenanceRequests: 28,
    assetTracking: 4560,
    visitorManagement: 84,
    spaceEfficiency: 89,
    energyConsumption: '2.4M kWh',
    cleaningSchedule: 95
  };

  const facilityAreas = [
    { name: 'Open Office', utilization: 85, capacity: 200, current: 170, icon: '🏢', color: '#3B82F6' },
    { name: 'Meeting Rooms', utilization: 72, capacity: 20, current: 14, icon: '🤝', color: '#10B981' },
    { name: 'Break Area', utilization: 68, capacity: 50, current: 34, icon: '☕', color: '#F59E0B' },
    { name: 'Parking', utilization: 71, capacity: 200, current: 142, icon: '🚗', color: '#8B5CF6' }
  ];

  const procurementMetrics = {
    activeVendors: 142,
    purchaseRequests: 1247,
    contractRenewals: 28,
    totalSpend: '$4.2M',
    avgProcessingTime: '2.1h',
    costSavings: '$847k',
    vendorPerformance: 94,
    procurementEfficiency: 92
  };

  const vendors = [
    {
      id: '1',
      name: 'TechCorp Solutions',
      category: 'IT Services',
      performance: 96,
      spend: '$1.2M',
      status: 'active' as const,
      contracts: 5
    },
    {
      id: '2',
      name: 'Office Supplies Co',
      category: 'Facilities',
      performance: 92,
      spend: '$450k',
      status: 'active' as const,
      contracts: 3
    },
    {
      id: '3',
      name: 'CloudNet Provider',
      category: 'Infrastructure',
      performance: 98,
      spend: '$890k',
      status: 'active' as const,
      contracts: 2
    }
  ];

  const productivityMetrics = {
    teamProductivity: 87,
    administrativeLoad: 42,
    workflowEfficiency: 94,
    timeSavings: 12840,
    resourceAllocation: 89,
    employeeSatisfaction: 92,
    taskCompletionRate: 94,
    collaborationScore: 88
  };

  const departments = [
    { name: 'Marketing', productivity: 92, efficiency: 89, timeSavings: '2.4k', trend: 'up' as const, color: '#EC4899' },
    { name: 'Sales', productivity: 88, efficiency: 86, timeSavings: '3.1k', trend: 'up' as const, color: '#10B981' },
    { name: 'Operations', productivity: 85, efficiency: 92, timeSavings: '4.2k', trend: 'stable' as const, color: '#3B82F6' },
    { name: 'HR', productivity: 82, efficiency: 84, timeSavings: '1.8k', trend: 'down' as const, color: '#F59E0B' }
  ];

  const insights = [
    {
      id: '1',
      type: 'optimization' as const,
      title: 'Approval Bottleneck Detected',
      description: 'Procurement workflow showing 28% longer processing times. Consider adding automated approval rules for requests under $10k.',
      impact: 'high' as const,
      action: 'Implement auto-approval rules',
      icon: '⚡'
    },
    {
      id: '2',
      type: 'warning' as const,
      title: 'Executive Calendar Overload',
      description: 'CEO calendar utilization at 85% - exceeds optimal capacity. Recommend delegating 3 recurring meetings to direct reports.',
      impact: 'high' as const,
      action: 'Review and delegate meetings',
      icon: '📅'
    },
    {
      id: '3',
      type: 'opportunity' as const,
      title: 'Document Processing Optimization',
      description: 'AI classification accuracy at 97% with room for improvement. Additional training could increase automation by 18%.',
      impact: 'medium' as const,
      action: 'Initiate ML model training',
      icon: '📄'
    },
    {
      id: '4',
      type: 'alert' as const,
      title: 'Vendor Contract Renewals',
      description: '3 vendor contracts expiring within 30 days. Immediate attention required to avoid service disruption.',
      impact: 'high' as const,
      action: 'Schedule renewal reviews',
      icon: '📋'
    }
  ];

  const operationsEvents = [
    {
      id: '1',
      type: 'meeting' as const,
      title: 'Board Strategy Meeting Scheduled',
      description: 'AI automatically scheduled quarterly board meeting with all attendees confirmed',
      timestamp: '2 min ago',
      status: 'completed' as const,
      icon: '📅'
    },
    {
      id: '2',
      type: 'task' as const,
      title: 'Invoice Processing Complete',
      description: '142 invoices automatically processed and routed for payment',
      timestamp: '5 min ago',
      status: 'completed' as const,
      icon: '✅'
    },
    {
      id: '3',
      type: 'workflow' as const,
      title: 'Approval Workflow Initiated',
      description: 'Marketing budget request entered automated approval pipeline',
      timestamp: '8 min ago',
      status: 'in_progress' as const,
      icon: '⚡'
    },
    {
      id: '4',
      type: 'document' as const,
      title: 'Contract Classification Complete',
      description: 'AI classified 28 documents with 97% accuracy',
      timestamp: '12 min ago',
      status: 'completed' as const,
      icon: '📄'
    },
    {
      id: '5',
      type: 'facility' as const,
      title: 'Maintenance Request Resolved',
      description: 'Conference room A HVAC issue fixed by facilities team',
      timestamp: '15 min ago',
      status: 'completed' as const,
      icon: '🔧'
    },
    {
      id: '6',
      type: 'vendor' as const,
      title: 'Purchase Order Created',
      description: 'PO #2847 generated for TechCorp Solutions',
      timestamp: '18 min ago',
      status: 'pending' as const,
      icon: '🛒'
    }
  ];

  const systemComponents = [
    { name: 'Calendar Systems', status: 'healthy' as const, uptime: '99.9%', latency: '45ms', lastCheck: '1m ago', icon: '📅' },
    { name: 'Email Platform', status: 'healthy' as const, uptime: '99.8%', latency: '120ms', lastCheck: '2m ago', icon: '📧' },
    { name: 'Document Management', status: 'healthy' as const, uptime: '99.7%', latency: '85ms', lastCheck: '1m ago', icon: '📄' },
    { name: 'Workflow Engine', status: 'healthy' as const, uptime: '99.9%', latency: '32ms', lastCheck: '30s ago', icon: '⚡' },
    { name: 'Collaboration Tools', status: 'degraded' as const, uptime: '98.5%', latency: '250ms', lastCheck: '5m ago', icon: '💬' },
    { name: 'AI Agents', status: 'healthy' as const, uptime: '99.9%', latency: '500ms', lastCheck: '10s ago', icon: '🤖' },
    { name: 'Enterprise Integrations', status: 'healthy' as const, uptime: '99.6%', latency: '180ms', lastCheck: '1m ago', icon: '🔗' }
  ];

  const topKPIs = [
    {
      label: 'Tasks Completed Today',
      value: '12,450',
      change: '+12.5%',
      icon: CheckCircle,
      color: '#10B981',
      trend: 'up' as const
    },
    {
      label: 'Workflow Automation Rate',
      value: '94%',
      change: '+4.2%',
      icon: Zap,
      color: '#8B5CF6',
      trend: 'up' as const
    },
    {
      label: 'Meetings Coordinated',
      value: '284',
      change: '+8.3%',
      icon: Calendar,
      color: '#3B82F6',
      trend: 'up' as const
    },
    {
      label: 'Documents Processed',
      value: '18,482',
      change: '+15.7%',
      icon: FileText,
      color: '#06B6D4',
      trend: 'up' as const
    },
    {
      label: 'Approval Turnaround',
      value: '2.4h',
      change: '-18.5%',
      icon: Clock,
      color: '#F59E0B',
      trend: 'down' as const
    },
    {
      label: 'Administrative Efficiency',
      value: '96%',
      change: '+4.2%',
      icon: Target,
      color: '#10B981',
      trend: 'up' as const
    },
    {
      label: 'Employee Support Requests',
      value: '342',
      change: '-12.3%',
      icon: Users,
      color: '#EC4899',
      trend: 'down' as const
    },
    {
      label: 'Executive Productivity',
      value: '94%',
      change: '+7.2%',
      icon: Activity,
      color: '#8B5CF6',
      trend: 'up' as const
    },
    {
      label: 'Vendor Requests Managed',
      value: '1,247',
      change: '+15.7%',
      icon: DollarSign,
      color: '#10B981',
      trend: 'up' as const
    },
    {
      label: 'AI Automation Savings',
      value: '$847k',
      change: '+18.9%',
      icon: Sparkles,
      color: '#F59E0B',
      trend: 'up' as const
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' 
      ? <ArrowUpRight size={16} color="#10B981" />
      : <ArrowDownRight size={16} color="#10B981" />;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      {/* TOP EXECUTIVE KPI BAR */}
      <View style={[styles.kpiBar, { backgroundColor: theme.colors.card }]}>
        <View style={styles.kpiHeader}>
          <View style={styles.kpiHeaderLeft}>
            <View style={[styles.kpiIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
              <Activity size={24} color="#8B5CF6" />
            </View>
            <View style={styles.kpiHeaderText}>
              <Text style={[styles.kpiTitle, { color: theme.colors.text }]}>
                Administrative Command Center
              </Text>
              <Text style={[styles.kpiSubtitle, { color: theme.colors.textSecondary }]}>
                Real-time enterprise operations
              </Text>
            </View>
          </View>
          <View style={[styles.kpiLiveBadge, { backgroundColor: '#EF4444' + '20' }]}>
            <View style={[styles.kpiLiveDot, { backgroundColor: '#EF4444' }]} />
            <Text style={[styles.kpiLiveText, { color: '#EF4444' }]}>
              LIVE
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.kpiScroll}>
          {topKPIs.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <View key={index} style={[styles.kpiCard, { borderColor: kpi.color + '30', borderWidth: 1 }]}>
                <View style={[styles.kpiCardIcon, { backgroundColor: kpi.color + '15' }]}>
                  <Icon size={24} color={kpi.color} />
                </View>
                <Text style={[styles.kpiCardLabel, { color: theme.colors.textSecondary }]}>
                  {kpi.label}
                </Text>
                <Text style={[styles.kpiCardValue, { color: kpi.color }]}>
                  {kpi.value}
                </Text>
                <View style={styles.kpiCardTrend}>
                  {getTrendIcon(kpi.trend)}
                  <Text style={[styles.kpiCardChange, { color: kpi.trend === 'up' ? '#10B981' : '#10B981' }]}>
                    {kpi.change}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* SECTION 1: AI ADMINISTRATIVE AGENTS */}
      <AIAgentOverview agents={adminAgents} />

      {/* SECTION 2: CHIEF ADMINISTRATIVE OFFICER COMMAND CENTER */}
      <CAOCommandCenter metrics={caoMetrics} trends={caoTrends} />

      {/* SECTION 3: EXECUTIVE ASSISTANT CENTER */}
      <ExecutiveAssistantCenter executives={executives} />

      {/* SECTION 4: TASK & WORKFLOW AUTOMATION HUB */}
      <TaskWorkflowAutomationHub metrics={taskMetrics} workflowPipeline={workflowPipeline} />

      {/* SECTION 5: DOCUMENT INTELLIGENCE CENTER */}
      <DocumentIntelligenceCenter metrics={documentMetrics} categories={documentCategories} />

      {/* SECTION 6: APPROVAL MANAGEMENT COMMAND CENTER */}
      <ApprovalManagementCenter metrics={approvalMetrics} recentRequests={approvalRequests} />

      {/* SECTION 7: COMMUNICATIONS HUB */}
      <CommunicationsHub metrics={commMetrics} channels={commChannels} />

      {/* SECTION 8: FACILITIES & OFFICE OPERATIONS */}
      <FacilitiesOperationsCenter metrics={facilityMetrics} areas={facilityAreas} />

      {/* SECTION 9: VENDOR & PROCUREMENT MANAGEMENT */}
      <VendorProcurementCenter metrics={procurementMetrics} vendors={vendors} />

      {/* SECTION 10: ORGANIZATIONAL PRODUCTIVITY ANALYTICS */}
      <ProductivityAnalyticsCenter metrics={productivityMetrics} departments={departments} />

      {/* SECTION 11: AI ADMINISTRATIVE INSIGHTS */}
      <AIAdministrativeInsights insights={insights} />

      {/* SECTION 12: REAL-TIME OPERATIONS FEED */}
      <RealTimeOperationsFeed events={operationsEvents} />

      {/* SECTION 13: ADMINISTRATIVE SYSTEM HEALTH */}
      <AdministrativeSystemHealth systems={systemComponents} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kpiBar: {
    padding: 16,
    marginBottom: 8,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  kpiHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  kpiIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiHeaderText: {
    flex: 1,
  },
  kpiTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  kpiSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  kpiLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  kpiLiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  kpiLiveText: {
    fontSize: 12,
    fontWeight: '700',
  },
  kpiScroll: {
    gap: 12,
  },
  kpiCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  kpiCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiCardLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  kpiCardValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  kpiCardTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpiCardChange: {
    fontSize: 12,
    fontWeight: '600',
  },
});
