import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { AgentShell } from './AgentShell';
import { AgentChat } from './AgentChat';
import { AgentDashboard } from './AgentDashboard';
import { AgentSummaryNotes } from './AgentSummaryNotes';
import { AgentSettings } from './AgentSettings';
import { AIEmployee } from '@/constants/aiEmployees';
import { useTheme } from '@/providers/ThemeProvider';
import { useAgentCounseling } from '@/hooks/useAgentCounseling';
import { getAgentHierarchy } from '@/constants/aiAgentHierarchy';
import { 
  MessageSquare, Brain, LayoutDashboard, BarChart3, ChartBarBig, Target, 
  Clock, FileText, Activity, Settings, Bot, CircleCheckBig, TriangleAlert, 
  TrendingUp, Gauge, Network, Cpu, Database, Shield, Zap, Award, Sparkles,
  RefreshCw
} from 'lucide-react-native';

interface AgentPageWrapperProps {
  agent: Partial<AIEmployee> & Pick<AIEmployee, 'id' | 'name' | 'title' | 'description' | 'capabilities'>;
  customContent?: React.ReactNode;
  isActive?: boolean;
  onToggleActive?: (next: boolean) => void;
}

/**
 * AgentPageWrapper - A standardized wrapper for AI agent pages
 * 
 * This component provides all the comprehensive features for AI agent pages:
 * - Chat/Copilot system (WhatsApp/ChatGPT-like)
 * - Overview
 * - Dashboard
 * - Analytics
 * - Performance
 * - Capabilities
 * - History
 * - Summary & Notes
 * - Live Activity
 * - Counseling
 * - Settings (with all sub-sections: company setup, profile setup, negotiation rules, limits, voice, personality, experience goal, business hours, AI configurations, integrations, pricing, training, rules, regulations, behaviors)
 * 
 * Usage:
 * ```tsx
 * import { AgentPageWrapper } from '@/components/ai-agent/AgentPageWrapper';
 * 
 * export default function MyAgentPage() {
 *   const agent = {
 *     id: 'my-agent',
 *     name: 'My Agent',
 *     title: 'AI Specialist',
 *     description: 'Does amazing things',
 *     capabilities: ['Task 1', 'Task 2'],
 *     color: '#007AFF',
 *     // ... other agent properties
 *   };
 * 
 *   return <AgentPageWrapper agent={agent} />;
 * }
 * ```
 */
export const AgentPageWrapper: React.FC<AgentPageWrapperProps> = ({
  agent,
  customContent,
  isActive,
  onToggleActive,
}) => {
  const { theme } = useTheme();
  const [selectedRelatedAgentId, setSelectedRelatedAgentId] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);

  const {
    sessions: counselingSessions,
    loading: counselingLoading,
    error: counselingError,
    fetchSessions,
    mainToSub,
    subToMain,
    peer,
    employeeToAgent,
  } = useAgentCounseling();

  const hierarchyInfo = useMemo(() => {
    if (!agent?.id) return { mainAgent: undefined, subAgents: [] as any[] };
    return getAgentHierarchy(agent.id);
  }, [agent?.id]);

  // Generate contextual data for tabs
  const generateAnalyticsData = useMemo(() => {
    if (!agent) return null;
    
    const department = agent.hierarchy?.department?.toLowerCase() || agent.category?.toLowerCase() || '';
    const isMainAgent = agent.type === 'employee';
    
    // Contextual base values based on department
    const departmentMultipliers: Record<string, { tasks: number; revenue: number; savings: number; data: number; satisfaction: number; retention: number; nps: number; churn: number }> = {
      'customer experience': { tasks: 150, revenue: 25, savings: 5200, data: 3.2, satisfaction: 94, retention: 88, nps: 72, churn: 12 },
      'sales & revenue': { tasks: 200, revenue: 45, savings: 7500, data: 4.5, satisfaction: 89, retention: 82, nps: 65, churn: 18 },
      'marketing & growth': { tasks: 180, revenue: 35, savings: 6200, data: 5.8, satisfaction: 91, retention: 85, nps: 68, churn: 15 },
      'operations & management': { tasks: 130, revenue: 20, savings: 4800, data: 2.8, satisfaction: 87, retention: 90, nps: 70, churn: 10 },
      'finance & accounting': { tasks: 140, revenue: 30, savings: 6800, data: 3.5, satisfaction: 92, retention: 93, nps: 75, churn: 7 },
      'technology & engineering': { tasks: 160, revenue: 40, savings: 7200, data: 6.2, satisfaction: 88, retention: 86, nps: 66, churn: 14 },
      'human resources': { tasks: 110, revenue: 18, savings: 4200, data: 2.1, satisfaction: 95, retention: 91, nps: 78, churn: 9 },
      'legal & compliance': { tasks: 95, revenue: 35, savings: 8500, data: 2.9, satisfaction: 90, retention: 94, nps: 71, churn: 6 },
      'data & intelligence': { tasks: 175, revenue: 38, savings: 6500, data: 8.5, satisfaction: 86, retention: 84, nps: 63, churn: 16 },
      'product management': { tasks: 145, revenue: 32, savings: 5800, data: 4.1, satisfaction: 89, retention: 87, nps: 67, churn: 13 },
      'security & risk': { tasks: 120, revenue: 28, savings: 7100, data: 3.8, satisfaction: 93, retention: 95, nps: 76, churn: 5 },
      'research & development': { tasks: 135, revenue: 42, savings: 6900, data: 7.2, satisfaction: 85, retention: 83, nps: 62, churn: 17 },
      'administrative': { tasks: 85, revenue: 12, savings: 3200, data: 1.8, satisfaction: 96, retention: 92, nps: 79, churn: 8 },
      'trading & investments': { tasks: 220, revenue: 85, savings: 12000, data: 5.5, satisfaction: 82, retention: 78, nps: 58, churn: 22 },
      'real estate & property': { tasks: 115, revenue: 38, savings: 5900, data: 3.4, satisfaction: 88, retention: 85, nps: 69, churn: 15 },
      'insurance & risk': { tasks: 125, revenue: 32, savings: 7800, data: 3.6, satisfaction: 91, retention: 89, nps: 72, churn: 11 },
      'healthcare & medical': { tasks: 140, revenue: 45, savings: 8200, data: 4.8, satisfaction: 94, retention: 92, nps: 77, churn: 8 },
      'manufacturing & production': { tasks: 155, revenue: 28, savings: 5500, data: 4.2, satisfaction: 87, retention: 88, nps: 68, churn: 12 },
      'transportation & logistics': { tasks: 165, revenue: 22, savings: 5100, data: 3.9, satisfaction: 86, retention: 84, nps: 64, churn: 16 },
      'government & public sector': { tasks: 90, revenue: 15, savings: 3800, data: 2.4, satisfaction: 93, retention: 96, nps: 80, churn: 4 },
      'supply chain & logistics': { tasks: 170, revenue: 24, savings: 5300, data: 4.0, satisfaction: 85, retention: 83, nps: 65, churn: 17 },
      'ai management & governance': { tasks: 100, revenue: 20, savings: 4500, data: 2.6, satisfaction: 90, retention: 88, nps: 70, churn: 12 },
    };
    
    const multiplier = departmentMultipliers[department] || { tasks: 120, revenue: 20, savings: 4500, data: 2.5, satisfaction: 90, retention: 88, nps: 70, churn: 12 };
    const mainAgentBonus = isMainAgent ? 1.5 : 1.0;
    
    const baseTasks = Math.floor(multiplier.tasks * mainAgentBonus);
    const baseSuccess = 94 + Math.random() * 5;
    
    return {
      tasksCompleted: baseTasks * 7,
      averageResponseTime: agent.roiMetrics?.responseTime || '<1s',
      successRate: parseFloat(baseSuccess.toFixed(1)),
      revenueImpact: `$${Math.floor(baseTasks * multiplier.revenue * mainAgentBonus).toLocaleString()}`,
      costSavings: `$${Math.floor(multiplier.savings * mainAgentBonus).toLocaleString()}`,
      efficiencyGain: `${(baseSuccess * 0.98).toFixed(1)}%`,
      errorRate: `${(100 - baseSuccess).toFixed(1)}%`,
      uptime: agent.infrastructure?.uptime || '99.9%',
      dataProcessed: `${(baseTasks * multiplier.data * mainAgentBonus).toFixed(1)} MB`,
      apiCalls: Math.floor(baseTasks * 3.2),
      userInteractions: Math.floor(baseTasks * 1.8),
      customerSatisfaction: `${multiplier.satisfaction}%`,
      retentionRate: `${multiplier.retention}%`,
      npsScore: multiplier.nps,
      churnRate: `${multiplier.churn}%`,
      department,
      isMainAgent,
      peakHours: ['9AM-11AM', '2PM-4PM'],
      avgSessionDuration: `${Math.floor(3 + Math.random() * 5)} min`,
      conversionRate: `${(15 + Math.random() * 20).toFixed(1)}%`,
      bounceRate: `${(20 + Math.random() * 30).toFixed(1)}%`,
      timeToResolution: `${Math.floor(30 + Math.random() * 120)} min`,
      firstContactResolution: `${(60 + Math.random() * 30).toFixed(1)}%`,
      activeUsers: Math.floor(baseTasks * 0.8),
      newUsers: Math.floor(baseTasks * 0.15),
      returningUsers: Math.floor(baseTasks * 0.65),
    };
  }, [agent]);

  const generateCapabilitiesData = useMemo(() => {
    if (!agent) return [];
    
    const capabilities = agent.capabilities || [];
    const isMainAgent = agent.type === 'employee';
    const baseProficiency = isMainAgent ? 88 : 82;
    
    return capabilities.map((cap, idx) => {
      const proficiency = Math.floor(baseProficiency + Math.random() * 12);
      const usageMultiplier = isMainAgent ? 1.5 : 1.0;
      const hoursAgo = Math.floor(Math.random() * 48);
      
      return {
        name: cap,
        proficiency: Math.min(99, proficiency),
        usageCount: Math.floor((50 + Math.random() * 250) * usageMultiplier),
        lastUsed: hoursAgo < 1 ? 'Just now' : hoursAgo < 24 ? `${hoursAgo}h ago` : `${Math.floor(hoursAgo / 24)}d ago`,
        category: agent.hierarchy?.department || agent.category || 'General',
        tier: proficiency >= 95 ? 'Expert' : proficiency >= 88 ? 'Advanced' : proficiency >= 80 ? 'Proficient' : 'Learning',
        impact: proficiency >= 90 ? 'High' : proficiency >= 80 ? 'Medium' : 'Low',
        trainingProgress: Math.floor(70 + Math.random() * 30),
        certifications: proficiency >= 90 ? Math.floor(1 + Math.random() * 3) : 0,
        avgExecutionTime: `${Math.floor(0.5 + Math.random() * 2)}s`,
        successRate: `${Math.floor(85 + Math.random() * 14)}%`,
        lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      };
    });
  }, [agent]);

  const generateLiveData = useMemo(() => {
    if (!agent) return null;
    
    const department = agent.hierarchy?.department?.toLowerCase() || agent.category?.toLowerCase() || '';
    const isMainAgent = agent.type === 'employee';
    
    // Contextual task descriptions based on department
    const taskTemplates: Record<string, string[]> = {
      'customer experience': ['Processing customer inquiry', 'Analyzing feedback sentiment', 'Managing ticket escalation', 'Updating customer profile'],
      'sales & revenue': ['Qualifying lead opportunity', 'Generating proposal document', 'Analyzing sales pipeline', 'Updating CRM records'],
      'marketing & growth': ['Generating content draft', 'Analyzing campaign metrics', 'Optimizing SEO keywords', 'Scheduling social posts'],
      'operations & management': ['Coordinating workflow task', 'Optimizing process step', 'Monitoring resource allocation', 'Updating project timeline'],
      'finance & accounting': ['Processing transaction record', 'Generating financial report', 'Reconciling account balance', 'Analyzing budget variance'],
      'technology & engineering': ['Deploying code changes', 'Monitoring system metrics', 'Analyzing error logs', 'Managing infrastructure'],
      'human resources': ['Screening candidate application', 'Scheduling interview slot', 'Updating employee records', 'Analyzing retention data'],
      'legal & compliance': ['Reviewing contract clause', 'Analyzing compliance risk', 'Documenting policy update', 'Monitoring regulatory changes'],
      'data & intelligence': ['Processing data pipeline', 'Training ML model', 'Analyzing dataset patterns', 'Generating insights report'],
      'product management': ['Analyzing user feedback', 'Prioritizing feature backlog', 'Creating product spec', 'Monitoring adoption metrics'],
      'security & risk': ['Analyzing security alert', 'Scanning for vulnerabilities', 'Monitoring access logs', 'Updating threat intelligence'],
      'research & development': ['Conducting literature review', 'Analyzing experimental data', 'Documenting research findings', 'Evaluating technology options'],
      'administrative': ['Processing document request', 'Coordinating meeting schedule', 'Managing inventory records', 'Handling travel arrangements'],
      'trading & investments': ['Analyzing market data', 'Executing trade order', 'Monitoring portfolio risk', 'Generating trading signals'],
      'real estate & property': ['Processing lease application', 'Analyzing property valuation', 'Coordinating maintenance request', 'Generating market report'],
      'insurance & risk': ['Processing insurance claim', 'Calculating risk premium', 'Analyzing policy terms', 'Underwriting application'],
      'healthcare & medical': ['Processing patient record', 'Analyzing medical codes', 'Coordinating care schedule', 'Monitoring compliance metrics'],
      'manufacturing & production': ['Monitoring production line', 'Analyzing quality metrics', 'Coordinating inventory flow', 'Optimizing production schedule'],
      'transportation & logistics': ['Optimizing delivery route', 'Tracking shipment status', 'Coordinating fleet dispatch', 'Analyzing logistics data'],
      'government & public sector': ['Processing citizen request', 'Analyzing policy impact', 'Monitoring compliance metrics', 'Generating public reports'],
      'supply chain & logistics': ['Processing purchase order', 'Tracking supplier delivery', 'Analyzing inventory levels', 'Coordinating warehouse operations'],
      'ai management & governance': ['Monitoring AI performance', 'Analyzing automation metrics', 'Coordinating agent workflows', 'Optimizing resource allocation'],
    };
    
    const tasks = taskTemplates[department] || ['Processing task', 'Analyzing data', 'Generating report', 'Updating records'];
    const currentTask = isLive ? tasks[Math.floor(Math.random() * tasks.length)] : 'Idle';
    
    const baseConnections = isMainAgent ? 8 : 4;
    const baseIntegrations = isMainAgent ? 6 : 3;
    
    return {
      currentTask,
      activeConnections: isLive ? Math.floor(baseConnections + Math.random() * 12) : 0,
      memoryUsage: isLive ? `${(35 + Math.random() * 35).toFixed(1)}%` : '8%',
      cpuUsage: isLive ? `${(25 + Math.random() * 45).toFixed(1)}%` : '3%',
      queueSize: isLive ? Math.floor(Math.random() * 25) : 0,
      throughput: isLive ? `${Math.floor(80 + Math.random() * 220)} req/min` : '0 req/min',
      latency: isLive ? `${Math.floor(30 + Math.random() * 120)}ms` : '—',
      lastHeartbeat: isLive ? 'Just now' : `${Math.floor(1 + Math.random() * 5)}m ago`,
      activeIntegrations: Math.floor(baseIntegrations + Math.random() * 6),
      status: isLive ? 'Active' : 'Standby',
      department,
      isMainAgent,
      errorRate: isLive ? `${(0.1 + Math.random() * 0.5).toFixed(2)}%` : '0%',
      avgProcessingTime: isLive ? `${Math.floor(200 + Math.random() * 800)}ms` : '—',
      cacheHitRate: isLive ? `${(85 + Math.random() * 14).toFixed(1)}%` : '—',
      activeThreads: isLive ? Math.floor(2 + Math.random() * 8) : 0,
      memoryAllocated: isLive ? `${(512 + Math.random() * 1024).toFixed(0)} MB` : '128 MB',
      networkIO: isLive ? `${(10 + Math.random() * 50).toFixed(1)} MB/s` : '0 MB/s',
      diskIO: isLive ? `${(5 + Math.random() * 20).toFixed(1)} MB/s` : '0 MB/s',
      uptimeSeconds: isLive ? Math.floor(3600 + Math.random() * 86400) : 0,
    };
  }, [agent, isLive]);

  const generateHistoryData = useMemo(() => {
    if (!agent) return [];
    
    const history = [];
    for (let i = 0; i < 10; i++) {
      history.push({
        id: `hist-${i}`,
        action: `Completed task ${i + 1}`,
        description: 'Task completed successfully',
        status: i % 5 === 0 ? 'warning' : 'success',
        timestamp: new Date(Date.now() - i * 2 * 60 * 60 * 1000).toISOString(),
      });
    }
    return history;
  }, [agent]);

  // Render functions for each tab
  const renderChatTab = () => <AgentChat agent={agent} />;

  const renderDashboardTab = () => <AgentDashboard agent={agent} />;

  const renderSummaryNotesTab = () => <AgentSummaryNotes agent={agent} />;

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Brain size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>What this agent does</Text>
        </View>
        <Text style={[styles.cardText, { color: theme.colors.secondaryText }]}>
          {agent.description}
        </Text>
        <View style={[styles.sectionDivider, { borderBottomColor: theme.colors.border }]} />
        <View style={styles.overviewStats}>
          <View style={styles.overviewStat}>
            <Text style={[styles.overviewStatValue, { color: theme.colors.text }]}>{agent.humanCost || '$60k/year'}</Text>
            <Text style={[styles.overviewStatLabel, { color: theme.colors.secondaryText }]}>Human Cost</Text>
          </View>
          <View style={styles.overviewStat}>
            <Text style={[styles.overviewStatValue, { color: '#34C759' }]}>{agent.aiCost || '$1.2k/year'}</Text>
            <Text style={[styles.overviewStatLabel, { color: theme.colors.secondaryText }]}>AI Cost</Text>
          </View>
          <View style={styles.overviewStat}>
            <Text style={[styles.overviewStatValue, { color: agent.color || '#007AFF' }]}>{agent.infrastructure?.health || 96}%</Text>
            <Text style={[styles.overviewStatLabel, { color: theme.colors.secondaryText }]}>Health</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <CircleCheckBig size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Core capabilities</Text>
        </View>
        <View style={styles.tags}>
          {(agent.capabilities || []).map((cap, idx) => (
            <View key={idx} style={[styles.tag, { borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}>
              <Text style={[styles.tagText, { color: theme.colors.text }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderAnalyticsTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <BarChart3 size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Analytics Dashboard</Text>
        </View>

        {generateAnalyticsData && (
          <>
            <View style={styles.kpiRow}>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#34C759' }]}>{generateAnalyticsData.tasksCompleted.toLocaleString()}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Tasks (7d)</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#007AFF' }]}>{generateAnalyticsData.revenueImpact}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Revenue Impact</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#FF9500' }]}>{generateAnalyticsData.costSavings}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Monthly Savings</Text>
              </View>
            </View>

            <View style={styles.kpiRow}>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{generateAnalyticsData.efficiencyGain}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Efficiency Gain</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{generateAnalyticsData.errorRate}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Error Rate</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{generateAnalyticsData.uptime}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Uptime</Text>
              </View>
            </View>

            <View style={[styles.sectionDivider, { borderBottomColor: theme.colors.border }]} />

            <View style={styles.kpiRow}>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#FF3B30' }]}>{generateAnalyticsData.customerSatisfaction}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Satisfaction</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#5856D6' }]}>{generateAnalyticsData.retentionRate}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Retention Rate</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#FF9500' }]}>{generateAnalyticsData.conversionRate}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Conversion Rate</Text>
              </View>
            </View>

            <View style={styles.kpiRow}>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#34C759' }]}>{generateAnalyticsData.npsScore}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>NPS Score</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#FF3B30' }]}>{generateAnalyticsData.churnRate}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Churn Rate</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#007AFF' }]}>{generateAnalyticsData.bounceRate}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Bounce Rate</Text>
              </View>
            </View>

            <View style={[styles.sectionDivider, { borderBottomColor: theme.colors.border }]} />

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Database size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Data Processed</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateAnalyticsData.dataProcessed}</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <Network size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>API Calls</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateAnalyticsData.apiCalls.toLocaleString()}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Target size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>User Interactions</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{Math.floor(generateAnalyticsData.userInteractions || 0).toLocaleString()}</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <Zap size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Response</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateAnalyticsData.averageResponseTime}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Clock size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Session Duration</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateAnalyticsData.avgSessionDuration}</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <TrendingUp size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Peak Hours</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateAnalyticsData.peakHours?.join(', ')}</Text>
                </View>
              </View>
            </View>

            <View style={[styles.sectionDivider, { borderBottomColor: theme.colors.border }]} />

            <View style={styles.kpiRow}>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#007AFF' }]}>{generateAnalyticsData.timeToResolution}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Time to Resolution</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#34C759' }]}>{generateAnalyticsData.firstContactResolution}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>First Contact Resolution</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#FF9500' }]}>{generateAnalyticsData.activeUsers}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Active Users</Text>
              </View>
            </View>

            <View style={styles.kpiRow}>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#34C759' }]}>{generateAnalyticsData.newUsers}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>New Users</Text>
              </View>
              <View style={styles.kpiItem}>
                <Text style={[styles.kpiValue, { color: '#5856D6' }]}>{generateAnalyticsData.returningUsers}</Text>
                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Returning Users</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );

  const renderPerformanceTab = () => (
    <View style={styles.tabContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <ChartBarBig size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        </View>
        <View style={styles.kpiRow}>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiValue, { color: '#34C759' }]}>{agent.roiMetrics?.tasksAutomatedDaily || 120}</Text>
            <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Daily Tasks</Text>
          </View>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiValue, { color: '#007AFF' }]}>{agent.roiMetrics?.responseTime || '<1s'}</Text>
            <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Response Time</Text>
          </View>
          <View style={styles.kpiItem}>
            <Text style={[styles.kpiValue, { color: '#FF9500' }]}>{agent.roiMetrics?.accuracyRate || '96%'}</Text>
            <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Accuracy</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCapabilitiesTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Target size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Capabilities Breakdown</Text>
        </View>
        <View style={styles.capabilitiesList}>
          {generateCapabilitiesData.map((cap, idx) => (
            <View key={idx} style={[styles.capabilityItem, { borderBottomColor: theme.colors.border }]}>
              <View style={styles.capabilityHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.capabilityName, { color: theme.colors.text }]}>{cap.name}</Text>
                  <View style={styles.capabilityMeta}>
                    <View style={[styles.capabilityBadge, { backgroundColor: cap.tier === 'Expert' ? '#34C759' : cap.tier === 'Advanced' ? '#007AFF' : cap.tier === 'Proficient' ? '#FF9500' : '#8E8E93' }]}>
                      <Text style={[styles.capabilityBadgeText, { color: '#FFFFFF' }]}>{cap.tier}</Text>
                    </View>
                    <View style={[styles.capabilityBadge, { backgroundColor: cap.impact === 'High' ? '#FF3B30' : cap.impact === 'Medium' ? '#FF9500' : '#8E8E93' }]}>
                      <Text style={[styles.capabilityBadgeText, { color: '#FFFFFF' }]}>{cap.impact} Impact</Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.capabilityProficiency, { color: agent.color || '#007AFF' }]}>{cap.proficiency}%</Text>
              </View>
              <View style={[styles.capabilityBar, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
                <View style={[styles.capabilityFill, { width: `${cap.proficiency}%`, backgroundColor: agent.color || '#007AFF' }]} />
              </View>
              <View style={styles.capabilityStats}>
                <View style={styles.capabilityStat}>
                  <Text style={[styles.capabilityStatValue, { color: theme.colors.text }]}>{cap.usageCount.toLocaleString()}</Text>
                  <Text style={[styles.capabilityStatLabel, { color: theme.colors.secondaryText }]}>Uses</Text>
                </View>
                <View style={styles.capabilityStat}>
                  <Text style={[styles.capabilityStatValue, { color: theme.colors.text }]}>{cap.lastUsed}</Text>
                  <Text style={[styles.capabilityStatLabel, { color: theme.colors.secondaryText }]}>Last Used</Text>
                </View>
                <View style={styles.capabilityStat}>
                  <Text style={[styles.capabilityStatValue, { color: theme.colors.text }]}>{cap.successRate}</Text>
                  <Text style={[styles.capabilityStatLabel, { color: theme.colors.secondaryText }]}>Success</Text>
                </View>
                <View style={styles.capabilityStat}>
                  <Text style={[styles.capabilityStatValue, { color: theme.colors.text }]}>{cap.avgExecutionTime}</Text>
                  <Text style={[styles.capabilityStatLabel, { color: theme.colors.secondaryText }]}>Avg Time</Text>
                </View>
              </View>
              {cap.certifications > 0 && (
                <View style={styles.capabilityCertifications}>
                  <Award size={14} color="#FFD700" />
                  <Text style={[styles.capabilityCertText, { color: theme.colors.secondaryText }]}>
                    {cap.certifications} certification{cap.certifications > 1 ? 's' : ''} earned
                  </Text>
                </View>
              )}
              <View style={styles.capabilityTraining}>
                <Text style={[styles.capabilityTrainingLabel, { color: theme.colors.secondaryText }]}>Training Progress</Text>
                <View style={[styles.capabilityBar, { backgroundColor: 'rgba(0,0,0,0.1)', height: 4 }]}>
                  <View style={[styles.capabilityFill, { width: `${cap.trainingProgress}%`, backgroundColor: '#34C759' }]} />
                </View>
                <Text style={[styles.capabilityTrainingPercent, { color: theme.colors.text }]}>{cap.trainingProgress}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderHistoryTab = () => (
    <View style={styles.tabContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Clock size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Activity History</Text>
        </View>
        <View style={styles.historyList}>
          {generateHistoryData.map((h) => (
            <View key={h.id} style={[styles.historyRow, { borderBottomColor: theme.colors.border }]}>
              <View style={styles.historyLeft}>
                {h.status === 'success' ? (
                  <CircleCheckBig size={16} color="#34C759" />
                ) : (
                  <TriangleAlert size={16} color="#FF9500" />
                )}
                <View style={{ flex: 1 }}>
                  <Text style={[styles.historyTitle, { color: theme.colors.text }]}>{h.action}</Text>
                  <Text style={[styles.historySub, { color: theme.colors.secondaryText }]}>{h.description}</Text>
                </View>
              </View>
              <Text style={[styles.historyTime, { color: theme.colors.secondaryText }]}>
                {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderLiveActivityTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Activity size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Live Activity Monitor</Text>
          <Pressable
            style={[styles.liveToggle, { backgroundColor: isLive ? '#34C759' : '#8E8E93' }]}
            onPress={() => setIsLive(!isLive)}
          >
            <RefreshCw size={14} color="#FFFFFF" />
            <Text style={[styles.liveToggleText, { color: '#FFFFFF' }]}>
              {isLive ? 'Live' : 'Start'}
            </Text>
          </Pressable>
        </View>

        {generateLiveData && (
          <>
            <View style={styles.liveStatus}>
              <View style={[styles.liveStatusDot, { backgroundColor: isLive ? '#34C759' : '#8E8E93' }]} />
              <Text style={[styles.liveStatusText, { color: theme.colors.text }]}>
                Status: {generateLiveData.status}
              </Text>
              <Text style={[styles.liveStatusTime, { color: theme.colors.secondaryText }]}>
                Last heartbeat: {generateLiveData.lastHeartbeat}
              </Text>
            </View>

            <View style={[styles.sectionDivider, { borderBottomColor: theme.colors.border }]} />

            <View style={styles.terminalContainer}>
              <View style={styles.terminalHeader}>
                <Text style={[styles.terminalTitle, { color: theme.colors.text }]}>Terminal</Text>
                <Text style={[styles.terminalBadge, { color: '#34C759' }]}>●</Text>
              </View>
              <View style={[styles.terminalContent, { backgroundColor: '#1E1E1E' }]}>
                <Text style={[styles.terminalLine, { color: '#00FF00' }]}>
                  $ {generateLiveData.currentTask}
                </Text>
                <Text style={[styles.terminalLine, { color: '#00BFFF' }]}>
                  [{new Date().toLocaleTimeString()}] Processing request...
                </Text>
                <Text style={[styles.terminalLine, { color: '#FFD700' }]}>
                  [{new Date().toLocaleTimeString()}] CPU: {generateLiveData.cpuUsage} | Memory: {generateLiveData.memoryUsage}
                </Text>
                <Text style={[styles.terminalLine, { color: '#00BFFF' }]}>
                  [{new Date().toLocaleTimeString()}] Active connections: {generateLiveData.activeConnections}
                </Text>
                <Text style={[styles.terminalLine, { color: '#00FF00' }]}>
                  [{new Date().toLocaleTimeString()}] Queue size: {generateLiveData.queueSize}
                </Text>
                <Text style={[styles.terminalLine, { color: '#FFD700' }]}>
                  [{new Date().toLocaleTimeString()}] Throughput: {generateLiveData.throughput}
                </Text>
                <Text style={[styles.terminalLine, { color: '#00BFFF' }]}>
                  [{new Date().toLocaleTimeString()}] Latency: {generateLiveData.latency}
                </Text>
              </View>
            </View>

            <View style={[styles.sectionDivider, { borderBottomColor: theme.colors.border }]} />

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Cpu size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>CPU Usage</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.cpuUsage}</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <Database size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Memory Usage</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.memoryUsage}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Network size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Network I/O</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.networkIO}</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <Database size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Disk I/O</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.diskIO}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Zap size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Throughput</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.throughput}</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <Clock size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Latency</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.latency}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Target size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Queue Size</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.queueSize}</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <Shield size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Error Rate</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.errorRate}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Activity size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Active Threads</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.activeThreads}</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <Database size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Memory Allocated</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.memoryAllocated}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Network size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Active Connections</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.activeConnections}</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <Sparkles size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Active Integrations</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.activeIntegrations}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Clock size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Processing Time</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.avgProcessingTime}</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <Database size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Cache Hit Rate</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{generateLiveData.cacheHitRate}</Text>
                </View>
              </View>
            </View>

            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <TrendingUp size={16} color={agent.color || '#007AFF'} />
                <View style={styles.statContent}>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Uptime</Text>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>
                    {Math.floor(generateLiveData.uptimeSeconds / 3600)}h {Math.floor((generateLiveData.uptimeSeconds % 3600) / 60)}m
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );

  const renderCounselingTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.cardHeader}>
          <Brain size={20} color={agent.color || '#007AFF'} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Agent Counseling</Text>
        </View>
        <Text style={[styles.cardText, { color: theme.colors.secondaryText }]}>
          Agent-to-agent counseling and collaboration features enable agents to learn from each other, share knowledge, and improve performance through structured interactions.
        </Text>

        {hierarchyInfo.mainAgent && (
          <>
            <View style={[styles.sectionDivider, { borderBottomColor: theme.colors.border }]} />
            <View style={styles.counselingSection}>
              <View style={styles.counselingSectionHeader}>
                <Bot size={16} color={agent.color || '#007AFF'} />
                <Text style={[styles.counselingSectionTitle, { color: theme.colors.text }]}>Main Agent</Text>
              </View>
              <View style={[styles.counselingAgentCard, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
                <Text style={[styles.counselingAgentName, { color: theme.colors.text }]}>{hierarchyInfo.mainAgent.name}</Text>
                <Text style={[styles.counselingAgentRole, { color: theme.colors.secondaryText }]}>{hierarchyInfo.mainAgent.title}</Text>
                <Pressable
                  style={[styles.counselingButton, { backgroundColor: agent.color || '#007AFF' }]}
                  onPress={() => mainToSub(agent?.id, hierarchyInfo.mainAgent.id)}
                >
                  <Text style={[styles.counselingButtonText, { color: '#FFFFFF' }]}>Request Counseling</Text>
                </Pressable>
              </View>
            </View>
          </>
        )}

        {hierarchyInfo.subAgents && hierarchyInfo.subAgents.length > 0 && (
          <>
            <View style={[styles.sectionDivider, { borderBottomColor: theme.colors.border }]} />
            <View style={styles.counselingSection}>
              <View style={styles.counselingSectionHeader}>
                <Bot size={16} color={agent.color || '#007AFF'} />
                <Text style={[styles.counselingSectionTitle, { color: theme.colors.text }]}>Subordinate Agents</Text>
              </View>
              <View style={styles.counselingAgentList}>
                {hierarchyInfo.subAgents.map((subAgent: any) => (
                  <View key={subAgent.id} style={[styles.counselingAgentCard, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
                    <Text style={[styles.counselingAgentName, { color: theme.colors.text }]}>{subAgent.name}</Text>
                    <Text style={[styles.counselingAgentRole, { color: theme.colors.secondaryText }]}>{subAgent.title}</Text>
                    <View style={styles.counselingActions}>
                      <Pressable
                        style={[styles.counselingButton, { backgroundColor: '#34C759' }]}
                        onPress={() => subToMain(agent?.id, subAgent.id)}
                      >
                        <Text style={[styles.counselingButtonText, { color: '#FFFFFF' }]}>Counsel</Text>
                      </Pressable>
                      <Pressable
                        style={[styles.counselingButton, { backgroundColor: '#007AFF' }]}
                        onPress={() => peer(agent?.id, subAgent.id)}
                      >
                        <Text style={[styles.counselingButtonText, { color: '#FFFFFF' }]}>Peer</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        <View style={[styles.sectionDivider, { borderBottomColor: theme.colors.border }]} />
        <View style={styles.counselingSection}>
          <View style={styles.counselingSectionHeader}>
            <Clock size={16} color={agent.color || '#007AFF'} />
            <Text style={[styles.counselingSectionTitle, { color: theme.colors.text }]}>Recent Counseling Sessions</Text>
          </View>
          {counselingLoading ? (
            <Text style={[styles.cardText, { color: theme.colors.secondaryText }]}>Loading sessions...</Text>
          ) : counselingError ? (
            <Text style={[styles.cardText, { color: '#FF3B30' }]}>Error loading sessions</Text>
          ) : counselingSessions && counselingSessions.length > 0 ? (
            <View style={styles.counselingSessionsList}>
              {counselingSessions.map((session: any) => (
                <View key={session.id} style={[styles.counselingSessionItem, { borderBottomColor: theme.colors.border }]}>
                  <View style={styles.counselingSessionLeft}>
                    <Text style={[styles.counselingSessionType, { color: agent.color || '#007AFF' }]}>{session.type}</Text>
                    <Text style={[styles.counselingSessionAgents, { color: theme.colors.text }]}>
                      {session.agent1} ↔ {session.agent2}
                    </Text>
                  </View>
                  <Text style={[styles.counselingSessionTime, { color: theme.colors.secondaryText }]}>
                    {new Date(session.timestamp).toLocaleString()}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={[styles.cardText, { color: theme.colors.secondaryText }]}>No counseling sessions yet</Text>
          )}
        </View>

        <View style={[styles.sectionDivider, { borderBottomColor: theme.colors.border }]} />
        <View style={styles.counselingSection}>
          <View style={styles.counselingSectionHeader}>
            <Sparkles size={16} color={agent.color || '#007AFF'} />
            <Text style={[styles.counselingSectionTitle, { color: theme.colors.text }]}>Counseling Benefits</Text>
          </View>
          <View style={styles.counselingBenefits}>
            <View style={styles.counselingBenefit}>
              <CircleCheckBig size={16} color="#34C759" />
              <Text style={[styles.counselingBenefitText, { color: theme.colors.text }]}>Knowledge sharing</Text>
            </View>
            <View style={styles.counselingBenefit}>
              <CircleCheckBig size={16} color="#34C759" />
              <Text style={[styles.counselingBenefitText, { color: theme.colors.text }]}>Performance improvement</Text>
            </View>
            <View style={styles.counselingBenefit}>
              <CircleCheckBig size={16} color="#34C759" />
              <Text style={[styles.counselingBenefitText, { color: theme.colors.text }]}>Skill development</Text>
            </View>
            <View style={styles.counselingBenefit}>
              <CircleCheckBig size={16} color="#34C759" />
              <Text style={[styles.counselingBenefitText, { color: theme.colors.text }]}>Best practices exchange</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderSettingsTab = () => <AgentSettings agent={agent} />;

  const customTabs = [
    { id: 'chat', label: 'Chat', icon: MessageSquare, component: renderChatTab },
    { id: 'overview', label: 'Overview', icon: Brain, component: renderOverviewTab },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: renderDashboardTab },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: renderAnalyticsTab },
    { id: 'performance', label: 'Performance', icon: ChartBarBig, component: renderPerformanceTab },
    { id: 'capabilities', label: 'Capabilities', icon: Target, component: renderCapabilitiesTab },
    { id: 'history', label: 'History', icon: Clock, component: renderHistoryTab },
    { id: 'summary', label: 'Summary & Notes', icon: FileText, component: renderSummaryNotesTab },
    { id: 'activity', label: 'Live Activity', icon: Activity, component: renderLiveActivityTab },
    { id: 'counseling', label: 'Counseling', icon: Brain, component: renderCounselingTab },
    { id: 'settings', label: 'Settings', icon: Settings, component: renderSettingsTab },
  ];

  return (
    <AgentShell
      agent={agent}
      customTabs={customTabs}
      isActive={isActive}
      onToggleActive={onToggleActive}
    />
  );
};

const styles = StyleSheet.create({
  tabContent: { paddingHorizontal: 20 },
  card: { padding: 20, borderRadius: 16, marginBottom: 15 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  cardText: { fontSize: 14, lineHeight: 22 },
  sectionDivider: { borderBottomWidth: 1, marginVertical: 15 },
  overviewStats: { flexDirection: 'row', gap: 15, marginTop: 12 },
  overviewStat: { flex: 1, alignItems: 'center' },
  overviewStatValue: { fontSize: 18, fontWeight: '900' },
  overviewStatLabel: { fontSize: 11, fontWeight: '600', marginTop: 4 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: '600' },
  kpiRow: { flexDirection: 'row', gap: 10 },
  kpiItem: { flex: 1 },
  kpiValue: { fontSize: 20, fontWeight: '900' },
  kpiLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  capabilitiesList: { gap: 12 },
  capabilityItem: { paddingBottom: 12, borderBottomWidth: 1 },
  capabilityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  capabilityName: { fontSize: 14, fontWeight: '600' },
  capabilityProficiency: { fontSize: 14, fontWeight: '700' },
  capabilityBar: { height: 6, borderRadius: 3, marginBottom: 6 },
  capabilityFill: { height: '100%', borderRadius: 3 },
  historyList: { gap: 10 },
  historyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 },
  historyLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, paddingRight: 10 },
  historyTitle: { fontSize: 13, fontWeight: '700' },
  historySub: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  historyTime: { fontSize: 10, fontWeight: '600' },
  liveStatus: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 12 },
  liveStatusDot: { width: 8, height: 8, borderRadius: 4 },
  liveStatusText: { fontSize: 14, fontWeight: '700' },
  statRow: { flexDirection: 'row', gap: 15, marginTop: 10 },
  statItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  statContent: { flex: 1 },
  statLabel: { fontSize: 11, fontWeight: '600', marginBottom: 2 },
  statValue: { fontSize: 14, fontWeight: '700' },
  capabilityMeta: { flexDirection: 'row', gap: 6, marginTop: 4 },
  capabilityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  capabilityBadgeText: { fontSize: 10, fontWeight: '700' },
  capabilityStats: { flexDirection: 'row', gap: 12, marginTop: 8 },
  capabilityStat: { alignItems: 'center' },
  capabilityStatValue: { fontSize: 12, fontWeight: '700' },
  capabilityStatLabel: { fontSize: 9, fontWeight: '600', marginTop: 2 },
  capabilityCertifications: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  capabilityCertText: { fontSize: 11, fontWeight: '500' },
  capabilityTraining: { marginTop: 8 },
  capabilityTrainingLabel: { fontSize: 10, fontWeight: '600', marginBottom: 4 },
  capabilityTrainingPercent: { fontSize: 10, fontWeight: '700', marginTop: 2, alignSelf: 'flex-end' },
  liveToggle: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  liveToggleText: { fontSize: 12, fontWeight: '700' },
  liveStatusTime: { fontSize: 12, fontWeight: '500', marginLeft: 'auto' },
  terminalContainer: { marginTop: 12 },
  terminalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  terminalTitle: { fontSize: 13, fontWeight: '700' },
  terminalBadge: { fontSize: 12 },
  terminalContent: { padding: 12, borderRadius: 8, fontFamily: 'monospace' },
  terminalLine: { fontSize: 11, marginBottom: 4, fontFamily: 'monospace' },
  counselingSection: { marginTop: 12 },
  counselingSectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  counselingSectionTitle: { fontSize: 14, fontWeight: '700' },
  counselingAgentCard: { padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 10 },
  counselingAgentName: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  counselingAgentRole: { fontSize: 12, fontWeight: '500', marginBottom: 10 },
  counselingButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  counselingButtonText: { fontSize: 12, fontWeight: '700' },
  counselingActions: { flexDirection: 'row', gap: 8 },
  counselingAgentList: { gap: 10 },
  counselingSessionsList: { gap: 8 },
  counselingSessionItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1 },
  counselingSessionLeft: { flex: 1 },
  counselingSessionType: { fontSize: 12, fontWeight: '700', marginBottom: 2 },
  counselingSessionAgents: { fontSize: 11, fontWeight: '500' },
  counselingSessionTime: { fontSize: 10, fontWeight: '600' },
  counselingBenefits: { gap: 8, marginTop: 8 },
  counselingBenefit: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  counselingBenefitText: { fontSize: 13, fontWeight: '500' },
});
