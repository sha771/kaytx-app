import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/providers/ThemeProvider';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Heart,
  Briefcase,
  Shield,
  GraduationCap,
  Target,
  DollarSign,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Bot,
  Settings,
  Home,
  ChevronRight,
  Building2,
  Search,
  Filter,
  MoreVertical,
  RefreshCw,
  Download,
  Share2,
  Eye,
  Bell,
  Plus,
  Minus,
  X,
  Save,
  Edit2,
  Trash2,
  Copy,
  LayoutDashboard,
  ClipboardList,
  UserCheck,
  Award,
  BookOpen,
  FileText,
  CheckCircle,
  AlertCircle,
  Zap,
  Star
} from 'lucide-react-native';
import HumanResourcesCommandCenter from '@/components/ai-agent/dashboard/human-resources/HumanResourcesCommandCenter';

// Types
interface HRAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  confidenceScore: number;
  employeesImpacted: number;
  productivityImpact: string;
  hrContribution: string;
  metrics: {
    candidatesScreened?: number;
    interviewsScheduled?: number;
    hiringAccuracy?: number;
    coursesAssigned?: number;
    completionRate?: number;
    skillGapsIdentified?: number;
    engagementScore?: number;
    surveysAnalyzed?: number;
    retentionPredictions?: number;
  };
}

interface HRKPI {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  subtitle: string;
}

interface Insight {
  id: string;
  type: 'warning' | 'opportunity' | 'info' | 'success' | 'risk' | 'recommendation' | 'alert';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  confidence?: number;
}

interface HRActivity {
  id: string;
  type: 'application' | 'candidate' | 'onboarding' | 'performance' | 'training' | 'survey' | 'promotion';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  department?: string;
}

interface SystemHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'critical';
  uptime: number;
  lastCheck: string;
  metrics: {
    responseTime: number;
    errorRate: number;
  };
}

export default function HRCommandCenter() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Executive KPIs
  const executiveKPIs: HRKPI[] = [
    {
      id: 'total-employees',
      title: 'Total Employees',
      value: '5,482',
      change: '+12%',
      trend: 'up',
      color: '#3B82F6',
      subtitle: 'Active headcount'
    },
    {
      id: 'engagement-score',
      title: 'Engagement Score',
      value: '89%',
      change: '+5%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'Employee satisfaction'
    },
    {
      id: 'retention-rate',
      title: 'Retention Rate',
      value: '94%',
      change: '+2%',
      trend: 'up',
      color: '#8B5CF6',
      subtitle: '12-month rate'
    },
    {
      id: 'open-positions',
      title: 'Open Positions',
      value: '128',
      change: '-12%',
      trend: 'down',
      color: '#F59E0B',
      subtitle: 'Active job postings'
    },
    {
      id: 'hiring-velocity',
      title: 'Hiring Velocity',
      value: '18d',
      change: '-3d',
      trend: 'up',
      color: '#06B6D4',
      subtitle: 'Time to hire'
    },
    {
      id: 'productivity',
      title: 'Productivity',
      value: '87%',
      change: '+4%',
      trend: 'up',
      color: '#10B981',
      subtitle: 'Workforce efficiency'
    },
    {
      id: 'diversity-score',
      title: 'Diversity Score',
      value: '78%',
      change: '+6%',
      trend: 'up',
      color: '#EC4899',
      subtitle: 'Inclusivity metric'
    },
    {
      id: 'training-rate',
      title: 'Training Rate',
      value: '91%',
      change: '+8%',
      trend: 'up',
      color: '#3B82F6',
      subtitle: 'Completion rate'
    },
    {
      id: 'attrition-risk',
      title: 'Attrition Risk',
      value: '8%',
      change: '-5%',
      trend: 'down',
      color: '#EF4444',
      subtitle: 'Flight risk employees'
    },
  ];

  // AI HR Agents
  const hrAgents: HRAgent[] = [
    {
      id: 'recruitment',
      name: 'Agent Talent',
      role: 'Recruitment Agent',
      avatar: '🎯',
      status: 'online',
      confidenceScore: 94,
      employeesImpacted: 842,
      productivityImpact: '+28%',
      hrContribution: '$2.4M',
      metrics: {
        candidatesScreened: 8420,
        interviewsScheduled: 842,
        hiringAccuracy: 94
      }
    },
    {
      id: 'learning',
      name: 'Agent Growth',
      role: 'Learning & Development',
      avatar: '📚',
      status: 'online',
      confidenceScore: 91,
      employeesImpacted: 5482,
      productivityImpact: '+22%',
      hrContribution: '$1.8M',
      metrics: {
        coursesAssigned: 12800,
        completionRate: 91,
        skillGapsIdentified: 182
      }
    },
    {
      id: 'engagement',
      name: 'Agent Pulse',
      role: 'Employee Experience',
      avatar: '💚',
      status: 'online',
      confidenceScore: 96,
      employeesImpacted: 5482,
      productivityImpact: '+34%',
      hrContribution: '$3.2M',
      metrics: {
        engagementScore: 88,
        surveysAnalyzed: 14200,
        retentionPredictions: 96
      }
    }
  ];

  // AI Insights
  const aiInsights: Insight[] = [
    {
      id: '1',
      type: 'risk',
      title: 'Engineering team attrition risk increased',
      description: 'Engineering department shows 14% increase in attrition risk over the past quarter. Recommended action: Review compensation and career development opportunities.',
      impact: 'high',
      actionable: true,
      confidence: 89
    },
    {
      id: '2',
      type: 'recommendation',
      title: 'Leadership training recommended',
      description: '23 managers identified as needing leadership development training. Program recommended within next 60 days.',
      impact: 'medium',
      actionable: true,
      confidence: 85
    },
    {
      id: '3',
      type: 'opportunity',
      title: 'Recruitment cycle time optimization',
      description: 'AI analysis suggests recruitment cycle time can be reduced by 18% through automated screening and interview scheduling.',
      impact: 'medium',
      actionable: true,
      confidence: 92
    },
    {
      id: '4',
      type: 'alert',
      title: 'Marketing department capacity limits',
      description: 'Marketing team approaching capacity limits. Current utilization at 94%. Consider hiring additional resources or workload redistribution.',
      impact: 'high',
      actionable: true,
      confidence: 88
    }
  ];

  // Activity Feed
  const hrActivities: HRActivity[] = [
    {
      id: '1',
      type: 'application',
      title: 'New application received',
      description: 'Senior Software Engineer position received 15 new applications',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      department: 'Engineering'
    },
    {
      id: '2',
      type: 'candidate',
      title: 'Candidate advanced to final round',
      description: 'Jane Doe advanced to final interview for Product Manager role',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      user: 'Recruitment Agent',
      department: 'Product'
    },
    {
      id: '3',
      type: 'onboarding',
      title: 'New employee onboarded',
      description: 'John Smith completed onboarding for Software Engineer position',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      user: 'HR Team',
      department: 'Engineering'
    },
    {
      id: '4',
      type: 'performance',
      title: 'Performance review completed',
      description: 'Q4 performance reviews completed for Sales team (45 reviews)',
      timestamp: new Date(Date.now() - 45 * 60000).toISOString(),
      department: 'Sales'
    },
    {
      id: '5',
      type: 'training',
      title: 'Training completed',
      description: 'Leadership Academy program completed by 12 employees',
      timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
      department: 'All Departments'
    },
    {
      id: '6',
      type: 'survey',
      title: 'Employee survey submitted',
      description: 'Employee engagement survey received 890 responses',
      timestamp: new Date(Date.now() - 90 * 60000).toISOString(),
      department: 'All Departments'
    }
  ];

  // System Health
  const systemHealths: SystemHealth[] = [
    {
      name: 'HRIS System',
      status: 'healthy',
      uptime: 99.9,
      lastCheck: '2 min ago',
      metrics: { responseTime: 120, errorRate: 0.1 }
    },
    {
      name: 'Payroll System',
      status: 'healthy',
      uptime: 99.8,
      lastCheck: '5 min ago',
      metrics: { responseTime: 200, errorRate: 0.05 }
    },
    {
      name: 'Recruitment Platform',
      status: 'healthy',
      uptime: 99.5,
      lastCheck: '3 min ago',
      metrics: { responseTime: 150, errorRate: 0.2 }
    },
    {
      name: 'Learning Platform',
      status: 'degraded',
      uptime: 97.5,
      lastCheck: '1 min ago',
      metrics: { responseTime: 450, errorRate: 2.5 }
    },
    {
      name: 'Employee Experience Tools',
      status: 'healthy',
      uptime: 99.2,
      lastCheck: '4 min ago',
      metrics: { responseTime: 180, errorRate: 0.3 }
    }
  ];

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agents', label: 'AI HR Agents', icon: Bot },
    { id: 'recruitment', label: 'Recruitment', icon: UserCheck },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'onboarding', label: 'Onboarding', icon: Briefcase },
    { id: 'performance', label: 'Performance', icon: Award },
    { id: 'learning', label: 'Learning & Development', icon: BookOpen },
    { id: 'workforce', label: 'Workforce Planning', icon: Building2 },
    { id: 'compensation', label: 'Compensation', icon: DollarSign },
    { id: 'engagement', label: 'Employee Engagement', icon: Heart },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderKPIBar = () => (
    <View style={[styles.kpiBar, { backgroundColor: theme.colors.card }]}>
      <View style={styles.kpiBarHeader}>
        <Text style={[styles.kpiBarTitle, { color: theme.colors.text }]}>People KPIs</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <RefreshCwIcon size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
        {executiveKPIs.map((kpi) => (
          <View key={kpi.id} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.kpiIconContainer, { backgroundColor: kpi.color + '20' }]}>
              {kpi.id === 'total-employees' && <UsersIcon size={24} color={kpi.color} />}
              {kpi.id === 'engagement-score' && <HeartIcon size={24} color={kpi.color} />}
              {kpi.id === 'retention-rate' && <ShieldIcon size={24} color={kpi.color} />}
              {kpi.id === 'open-positions' && <TargetIcon size={24} color={kpi.color} />}
              {kpi.id === 'hiring-velocity' && <ClockIcon size={24} color={kpi.color} />}
              {kpi.id === 'productivity' && <ActivityIcon size={24} color={kpi.color} />}
              {kpi.id === 'diversity-score' && <StarIcon size={24} color={kpi.color} />}
              {kpi.id === 'training-rate' && <GraduationCapIcon size={24} color={kpi.color} />}
              {kpi.id === 'attrition-risk' && <AlertCircleIcon size={24} color={kpi.color} />}
            </View>
            <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
            <Text style={[styles.kpiTitle, { color: theme.colors.textSecondary }]}>{kpi.title}</Text>
            <View style={styles.kpiChangeContainer}>
              {kpi.trend === 'up' ? (
                <ArrowUpRightIcon size={16} color={kpi.color} />
              ) : (
                <ArrowDownRightIcon size={16} color={kpi.color} />
              )}
              <Text style={[styles.kpiChange, { color: kpi.color }]}>{kpi.change}</Text>
            </View>
            <Text style={[styles.kpiSubtitle, { color: theme.colors.textSecondary }]}>{kpi.subtitle}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderSidebar = () => (
    <View style={[styles.sidebar, { backgroundColor: theme.colors.card }]}>
      <View style={styles.sidebarHeader}>
        <View style={[styles.sidebarLogo, { backgroundColor: '#8B5CF6' + '20' }]}>
          <UsersIcon size={32} color="#8B5CF6" />
        </View>
        <View>
          <Text style={[styles.sidebarTitle, { color: theme.colors.text }]}>HR Command Center</Text>
          <Text style={[styles.sidebarSubtitle, { color: theme.colors.textSecondary }]}>People Operations</Text>
        </View>
      </View>
      <ScrollView style={styles.sidebarNav}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.navItem,
              activeTab === item.id && styles.navItemActive,
              { backgroundColor: activeTab === item.id ? '#8B5CF6' + '20' : 'transparent' }
            ]}
            onPress={() => setActiveTab(item.id)}
          >
            <item.icon size={20} color={activeTab === item.id ? '#8B5CF6' : theme.colors.textSecondary} />
            <Text style={[
              styles.navItemText,
              { color: activeTab === item.id ? '#8B5CF6' : theme.colors.textSecondary }
            ]}>
              {item.label}
            </Text>
            {activeTab === item.id && <ChevronRightIcon size={20} color="#8B5CF6" />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderAgentsOverview = () => (
    <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI HR Agents</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={[styles.viewAllText, { color: '#8B5CF6' }]}>View All</Text>
          <ChevronRightIcon size={16} color="#8B5CF6" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
        {hrAgents.map((agent) => (
          <TouchableOpacity
            key={agent.id}
            style={[
              styles.agentCard,
              { backgroundColor: theme.colors.background },
              selectedAgent === agent.id && { borderColor: '#8B5CF6', borderWidth: 2 }
            ]}
            onPress={() => setSelectedAgent(agent.id)}
          >
            <View style={styles.agentAvatar}>
              <Text style={styles.agentAvatarText}>{agent.avatar}</Text>
              <View style={[
                styles.agentStatus,
                { backgroundColor: agent.status === 'online' ? '#10B981' : agent.status === 'busy' ? '#F59E0B' : '#6B7280' }
              ]} />
            </View>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
            <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>{agent.role}</Text>
            <View style={styles.agentMetrics}>
              <View style={styles.agentMetric}>
                <Text style={[styles.agentMetricValue, { color: '#8B5CF6' }]}>{agent.confidenceScore}%</Text>
                <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Confidence</Text>
              </View>
              <View style={styles.agentMetric}>
                <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.employeesImpacted}</Text>
                <Text style={[styles.agentMetricLabel, { color: theme.colors.textSecondary }]}>Impacted</Text>
              </View>
            </View>
            <View style={styles.agentHRContribution}>
              <Text style={[styles.agentContributionLabel, { color: theme.colors.textSecondary }]}>HR Contribution</Text>
              <Text style={[styles.agentContributionValue, { color: theme.colors.text }]}>{agent.hrContribution}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderAIInsights = () => (
    <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <BrainIcon size={24} color="#8B5CF6" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI People Insights</Text>
        </View>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={[styles.viewAllText, { color: '#8B5CF6' }]}>View All</Text>
          <ChevronRightIcon size={16} color="#8B5CF6" />
        </TouchableOpacity>
      </View>
      <View style={styles.insightsContainer}>
        {aiInsights.map((insight) => (
          <View key={insight.id} style={[styles.insightCard, { backgroundColor: theme.colors.background }]}>
            <View style={styles.insightHeader}>
              <View style={[
                styles.insightTypeBadge,
                { backgroundColor: insight.type === 'risk' ? '#EF4444' + '20' : 
                           insight.type === 'alert' ? '#F59E0B' + '20' :
                           insight.type === 'opportunity' ? '#10B981' + '20' :
                           insight.type === 'recommendation' ? '#3B82F6' + '20' : '#6B7280' + '20' }
              ]}>
                {insight.type === 'risk' && <AlertCircleIcon size={16} color="#EF4444" />}
                {insight.type === 'alert' && <BellIcon size={16} color="#F59E0B" />}
                {insight.type === 'opportunity' && <TrendingUpIcon size={16} color="#10B981" />}
                {insight.type === 'recommendation' && <BrainIcon size={16} color="#3B82F6" />}
                <Text style={[
                  styles.insightTypeText,
                  { color: insight.type === 'risk' ? '#EF4444' : 
                          insight.type === 'alert' ? '#F59E0B' :
                          insight.type === 'opportunity' ? '#10B981' :
                          insight.type === 'recommendation' ? '#3B82F6' : '#6B7280' }
                ]}>
                  {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                </Text>
              </View>
              {insight.confidence && (
                <View style={styles.confidenceBadge}>
                  <Text style={[styles.confidenceText, { color: theme.colors.textSecondary }]}>
                    {insight.confidence}% confidence
                  </Text>
                </View>
              )}
            </View>
            <Text style={[styles.insightTitle, { color: theme.colors.text }]}>{insight.title}</Text>
            <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>{insight.description}</Text>
            <View style={styles.insightFooter}>
              <View style={[
                styles.impactBadge,
                { backgroundColor: insight.impact === 'high' ? '#EF4444' + '20' : 
                           insight.impact === 'medium' ? '#F59E0B' + '20' : '#10B981' + '20' }
              ]}>
                <Text style={[
                  styles.impactText,
                  { color: insight.impact === 'high' ? '#EF4444' : 
                          insight.impact === 'medium' ? '#F59E0B' : '#10B981' }
                ]}>
                  {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
                </Text>
              </View>
              {insight.actionable && (
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Take Action</Text>
                  <ArrowUpRightIcon size={16} color="#8B5CF6" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderActivityFeed = () => (
    <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <ActivityIcon size={24} color="#8B5CF6" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-Time HR Activity</Text>
        </View>
        <TouchableOpacity style={styles.refreshButton}>
          <RefreshCwIcon size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.activityContainer}>
        {hrActivities.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <View style={[
              styles.activityIcon,
              { backgroundColor: activity.type === 'application' ? '#3B82F6' + '20' :
                         activity.type === 'candidate' ? '#10B981' + '20' :
                         activity.type === 'onboarding' ? '#8B5CF6' + '20' :
                         activity.type === 'performance' ? '#F59E0B' + '20' :
                         activity.type === 'training' ? '#06B6D4' + '20' :
                         activity.type === 'survey' ? '#EC4899' + '20' : '#6B7280' + '20' }
            ]}>
              {activity.type === 'application' && <FileTextIcon size={20} color="#3B82F6" />}
              {activity.type === 'candidate' && <UserCheckIcon size={20} color="#10B981" />}
              {activity.type === 'onboarding' && <BriefcaseIcon size={20} color="#8B5CF6" />}
              {activity.type === 'performance' && <AwardIcon size={20} color="#F59E0B" />}
              {activity.type === 'training' && <BookOpenIcon size={20} color="#06B6D4" />}
              {activity.type === 'survey' && <ClipboardListIcon size={20} color="#EC4899" />}
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: theme.colors.text }]}>{activity.title}</Text>
              <Text style={[styles.activityDescription, { color: theme.colors.textSecondary }]}>{activity.description}</Text>
              <View style={styles.activityMeta}>
                <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </Text>
                {activity.department && (
                  <Text style={[styles.activityDepartment, { color: '#8B5CF6' }]}>
                    {activity.department}
                  </Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSystemHealth = () => (
    <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <ShieldIcon size={24} color="#8B5CF6" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>People Operations Health</Text>
        </View>
        <TouchableOpacity style={styles.refreshButton}>
          <RefreshCwIcon size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.healthGrid}>
        {systemHealths.map((system) => (
          <View key={system.name} style={[styles.healthCard, { backgroundColor: theme.colors.background }]}>
            <View style={styles.healthHeader}>
              <Text style={[styles.healthName, { color: theme.colors.text }]}>{system.name}</Text>
              <View style={[
                styles.healthStatus,
                { backgroundColor: system.status === 'healthy' ? '#10B981' + '20' : 
                           system.status === 'degraded' ? '#F59E0B' + '20' : '#EF4444' + '20' }
              ]}>
                <View style={[
                  styles.healthStatusDot,
                  { backgroundColor: system.status === 'healthy' ? '#10B981' : 
                               system.status === 'degraded' ? '#F59E0B' : '#EF4444' }
                ]} />
                <Text style={[
                  styles.healthStatusText,
                  { color: system.status === 'healthy' ? '#10B981' : 
                          system.status === 'degraded' ? '#F59E0B' : '#EF4444' }
                ]}>
                  {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                </Text>
              </View>
            </View>
            <View style={styles.healthMetrics}>
              <View style={styles.healthMetric}>
                <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>{system.uptime}%</Text>
                <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>Uptime</Text>
              </View>
              <View style={styles.healthMetric}>
                <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>{system.metrics.responseTime}ms</Text>
                <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>Response</Text>
              </View>
              <View style={styles.healthMetric}>
                <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>{system.metrics.errorRate}%</Text>
                <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>Error Rate</Text>
              </View>
            </View>
            <Text style={[styles.healthLastCheck, { color: theme.colors.textSecondary }]}>
              Last check: {system.lastCheck}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {renderKPIBar()}
      <View style={styles.mainContent}>
        {renderSidebar()}
        <ScrollView style={styles.contentArea} showsVerticalScrollIndicator={false}>
          {renderAgentsOverview()}
          <HumanResourcesCommandCenter />
          {renderAIInsights()}
          {renderActivityFeed()}
          {renderSystemHealth()}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kpiBar: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  kpiBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  kpiBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: 8,
  },
  kpiScroll: {
    flexDirection: 'row',
  },
  kpiCard: {
    width: 140,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  kpiIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  kpiTitle: {
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  kpiChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  kpiChange: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  kpiSubtitle: {
    fontSize: 10,
    textAlign: 'center',
  },
  mainContent: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: 250,
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.1)',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sidebarLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sidebarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sidebarSubtitle: {
    fontSize: 12,
  },
  sidebarNav: {
    flex: 1,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  navItemActive: {
    borderRadius: 8,
  },
  navItemText: {
    fontSize: 14,
    marginLeft: 12,
    flex: 1,
  },
  contentArea: {
    flex: 1,
    padding: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  agentsScroll: {
    flexDirection: 'row',
  },
  agentCard: {
    width: 200,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  agentAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#8B5CF6' + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  agentAvatarText: {
    fontSize: 32,
  },
  agentStatus: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1F2937',
  },
  agentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 12,
    marginBottom: 12,
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  agentMetric: {
    alignItems: 'center',
  },
  agentMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  agentMetricLabel: {
    fontSize: 10,
  },
  agentHRContribution: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12,
  },
  agentContributionLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  agentContributionValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  insightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  insightCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginRight: '2%',
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  insightTypeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  confidenceText: {
    fontSize: 10,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  insightDescription: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#8B5CF6',
    marginRight: 4,
  },
  activityContainer: {
    maxHeight: 400,
  },
  activityItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityTime: {
    fontSize: 10,
    marginRight: 8,
  },
  activityDepartment: {
    fontSize: 10,
    fontWeight: '600',
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  healthCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginRight: '2%',
    marginBottom: 12,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthName: {
    fontSize: 14,
    fontWeight: '600',
  },
  healthStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  healthStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  healthStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  healthMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  healthMetric: {
    alignItems: 'center',
  },
  healthMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  healthMetricLabel: {
    fontSize: 10,
  },
  healthLastCheck: {
    fontSize: 10,
    textAlign: 'center',
  },
});