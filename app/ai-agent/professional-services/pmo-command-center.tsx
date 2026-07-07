import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { professionalServicesDashboardConfig } from '@/constants/dashboardMetrics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ClipboardList,
  ChevronLeft,
  Target,
  TrendingUp,
  DollarSign,
  BarChart3,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Layers,
  Zap,
  Settings,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  Briefcase,
  Building,
  Globe,
  MapPin,
  AlertTriangle,
  Flag,
  Shield,
  FileText,
  Users,
  Kanban,
  LayoutDashboard,
  PieChart,
  LineChart,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function PMOCommandCenter() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<'all' | 'strategic' | 'operational' | 'transformation'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const colors = {
    background: '#050B14',
    card: 'rgba(10, 20, 40, 0.8)',
    cardBorder: 'rgba(30, 58, 95, 0.5)',
    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    electricBlue: '#3B82F6',
    emeraldGreen: '#10B981',
    purple: '#8B5CF6',
    amber: '#F59E0B',
    red: '#EF4444',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)'
  };

  const pmoMetrics = {
    totalInitiatives: 48,
    strategicInitiatives: 12,
    operationalInitiatives: 24,
    transformationInitiatives: 12,
    onTrack: 32,
    atRisk: 12,
    delayed: 4,
    totalBudget: '$4.8B',
    spentBudget: '$2.1B',
    avgCompletion: 67,
    benefitsRealized: '$1.8B'
  };

  const initiatives = [
    {
      id: 1,
      name: 'Digital Transformation 2024',
      type: 'Strategic',
      status: 'on-track',
      progress: 78,
      budget: '$1.2B',
      spent: '$840M',
      owner: 'CIO',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      benefits: '$480M',
      priority: 'High',
      milestones: 12,
      completed: 9,
      dependencies: 3,
      risks: 2
    },
    {
      id: 2,
      name: 'Cloud Migration Program',
      type: 'Transformation',
      status: 'at-risk',
      progress: 52,
      budget: '$800M',
      spent: '$480M',
      owner: 'CTO',
      startDate: '2023-07-01',
      endDate: '2024-06-30',
      benefits: '$320M',
      priority: 'Critical',
      milestones: 18,
      completed: 9,
      dependencies: 5,
      risks: 4
    },
    {
      id: 3,
      name: 'AI/ML Platform Implementation',
      type: 'Strategic',
      status: 'on-track',
      progress: 65,
      budget: '$600M',
      spent: '$360M',
      owner: 'CDO',
      startDate: '2024-01-15',
      endDate: '2024-09-30',
      benefits: '$480M',
      priority: 'High',
      milestones: 15,
      completed: 10,
      dependencies: 2,
      risks: 3
    },
    {
      id: 4,
      name: 'Security Enhancement Program',
      type: 'Operational',
      status: 'delayed',
      progress: 35,
      budget: '$400M',
      spent: '$180M',
      owner: 'CISO',
      startDate: '2023-10-01',
      endDate: '2024-04-30',
      benefits: '$240M',
      priority: 'Critical',
      milestones: 10,
      completed: 3,
      dependencies: 4,
      risks: 5
    },
    {
      id: 5,
      name: 'Customer Experience Optimization',
      type: 'Operational',
      status: 'on-track',
      progress: 82,
      budget: '$500M',
      spent: '$420M',
      owner: 'CCO',
      startDate: '2023-09-01',
      endDate: '2024-03-31',
      benefits: '$360M',
      priority: 'High',
      milestones: 8,
      completed: 7,
      dependencies: 2,
      risks: 1
    }
  ];

  const portfolioHealth = [
    { category: 'Strategic Alignment', score: 92, trend: '+5%' },
    { category: 'Benefits Realization', score: 78, trend: '+8%' },
    { category: 'Resource Utilization', score: 85, trend: '+3%' },
    { category: 'Risk Management', score: 88, trend: '+6%' },
    { category: 'Stakeholder Satisfaction', score: 91, trend: '+4%' },
    { category: 'Governance Compliance', score: 95, trend: '+2%' }
  ];

  const renderMetricCard = (label: string, value: string | number, icon: any, color: string, subtitle?: string) => (
    <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
        {React.createElement(icon, { size: 20, color: color })}
      </View>
      <Text style={[styles.metricCardValue, { color: color }]}>{typeof value === 'number' ? value.toLocaleString() : value}</Text>
      <Text style={[styles.metricCardLabel, { color: colors.textSecondary }]}>{label}</Text>
      {subtitle && <Text style={[styles.metricCardSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
    </View>
  );

  const renderHealthRow = (health: any, index: number) => (
    <View key={index} style={styles.healthRow}>
      <Text style={[styles.healthLabel, { color: colors.text }]}>{health.category}</Text>
      <View style={[styles.healthBar, { backgroundColor: colors.glass }]}>
        <View style={[styles.healthFill, { width: `${health.score}%`, backgroundColor: health.score >= 90 ? colors.emeraldGreen : health.score >= 80 ? colors.electricBlue : health.score >= 70 ? colors.amber : colors.red }]} />
      </View>
      <Text style={[styles.healthScore, { color: health.score >= 90 ? colors.emeraldGreen : health.score >= 80 ? colors.electricBlue : health.score >= 70 ? colors.amber : colors.red }]}>{health.score}%</Text>
      <View style={styles.trendBadge}>
        <TrendingUp size={12} color={colors.emeraldGreen} />
        <Text style={[styles.trendText, { color: colors.emeraldGreen }]}>{health.trend}</Text>
      </View>
    </View>
  );

  const renderInitiativeCard = (initiative: any) => (
    <View key={initiative.id} style={[styles.initiativeCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={styles.initiativeHeader}>
        <View style={styles.initiativeInfo}>
          <View style={styles.initiativeNameRow}>
            <Text style={[styles.initiativeName, { color: colors.text }]}>{initiative.name}</Text>
            <View style={[
              styles.priorityBadge,
              { backgroundColor: initiative.priority === 'Critical' ? colors.red + '20' : colors.amber + '20' }
            ]}>
              <Flag size={12} color={initiative.priority === 'Critical' ? colors.red : colors.amber} />
              <Text style={[
                styles.priorityText,
                { color: initiative.priority === 'Critical' ? colors.red : colors.amber }
              ]}>{initiative.priority}</Text>
            </View>
          </View>
          <Text style={[styles.initiativeType, { color: colors.textSecondary }]}>{initiative.type} Initiative • Owner: {initiative.owner}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: initiative.status === 'on-track' ? colors.emeraldGreen + '20' : initiative.status === 'at-risk' ? colors.red + '20' : colors.amber + '20' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: initiative.status === 'on-track' ? colors.emeraldGreen : initiative.status === 'at-risk' ? colors.red : colors.amber }
          ]}>{initiative.status}</Text>
        </View>
      </View>

      <View style={styles.initiativeProgress}>
        <View style={[styles.progressBar, { backgroundColor: colors.glass }]}>
          <View style={[styles.progressFill, { width: `${initiative.progress}%`, backgroundColor: initiative.status === 'on-track' ? colors.emeraldGreen : initiative.status === 'at-risk' ? colors.red : colors.amber }]} />
        </View>
        <Text style={[styles.progressText, { color: colors.text }]}>{initiative.progress}% Complete</Text>
      </View>

      <View style={styles.initiativeMetrics}>
        <View style={styles.initiativeMetric}>
          <DollarSign size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{initiative.budget}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Budget</Text>
        </View>
        <View style={styles.initiativeMetric}>
          <Activity size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{initiative.spent}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Spent</Text>
        </View>
        <View style={styles.initiativeMetric}>
          <Award size={14} color={colors.emeraldGreen} />
          <Text style={[styles.metricValue, { color: colors.emeraldGreen }]}>{initiative.benefits}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Benefits</Text>
        </View>
        <View style={styles.initiativeMetric}>
          <Target size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{initiative.completed}/{initiative.milestones}</Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Milestones</Text>
        </View>
      </View>

      <View style={styles.initiativeDetails}>
        <View style={styles.detailRow}>
          <Calendar size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {initiative.startDate} → {initiative.endDate}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Layers size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            Dependencies: {initiative.dependencies} • Risks: {initiative.risks}
          </Text>
        </View>
      </View>

      <View style={styles.initiativeActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
          <FileText size={16} color={colors.textSecondary} />
          <Text style={[styles.actionButtonText, { color: colors.textSecondary }]}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.electricBlue + '20', borderColor: colors.electricBlue + '40' }]}>
          <Calendar size={16} color={colors.electricBlue} />
          <Text style={[styles.actionButtonText, { color: colors.electricBlue }]}>Timeline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40' }]}>
          <Kanban size={16} color={colors.emeraldGreen} />
          <Text style={[styles.actionButtonText, { color: colors.emeraldGreen }]}>Board</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 11, 20, 0.9)']}
        style={[styles.header, { borderBottomColor: colors.cardBorder, borderBottomWidth: 1 }]}
      >
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <LinearGradient
            colors={['#10B981', '#059669']}
            style={styles.headerIcon}
          >
            <ClipboardList size={24} color="#FFFFFF" />
          </LinearGradient>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>PMO Command Center</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Program Management & Strategic Portfolio Governance</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Search size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <Filter size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
            <RefreshCw size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* PMO Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Portfolio Overview</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Total Initiatives', pmoMetrics.totalInitiatives, Flag, colors.electricBlue)}
            {renderMetricCard('Strategic', pmoMetrics.strategicInitiatives, Target, colors.purple)}
            {renderMetricCard('Operational', pmoMetrics.operationalInitiatives, Activity, colors.electricBlue)}
            {renderMetricCard('Transformation', pmoMetrics.transformationInitiatives, Zap, colors.amber)}
            {renderMetricCard('On Track', pmoMetrics.onTrack, CheckCircle, colors.emeraldGreen)}
            {renderMetricCard('At Risk', pmoMetrics.atRisk, AlertTriangle, colors.red)}
            {renderMetricCard('Total Budget', pmoMetrics.totalBudget, DollarSign, colors.emeraldGreen)}
            {renderMetricCard('Benefits Realized', pmoMetrics.benefitsRealized, Award, colors.emeraldGreen)}
          </View>
        </View>

        {/* Portfolio Health */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Portfolio Health Score</Text>
          <View style={[styles.healthCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            {portfolioHealth.map((health, index) => renderHealthRow(health, index))}
          </View>
        </View>

        {/* View Filters */}
        <View style={styles.section}>
          <View style={styles.filterTabs}>
            {['all', 'strategic', 'operational', 'transformation'].map((view) => (
              <TouchableOpacity
                key={view}
                style={[
                  styles.filterTab,
                  selectedView === view && styles.activeFilterTab,
                  { backgroundColor: selectedView === view ? colors.electricBlue : colors.glass }
                ]}
                onPress={() => setSelectedView(view as any)}
              >
                <Text style={[
                  styles.filterTabText,
                  { color: selectedView === view ? '#FFFFFF' : colors.textSecondary }
                ]}>
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Initiatives Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedView === 'all' ? 'All Initiatives' : selectedView === 'strategic' ? 'Strategic Initiatives' : selectedView === 'operational' ? 'Operational Initiatives' : 'Transformation Initiatives'}
            </Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.emeraldGreen }]}>
              <Plus size={20} color="white" />
              <Text style={styles.addButtonText}>New Initiative</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.initiativesGrid}>
            {initiatives
              .filter(i => selectedView === 'all' || i.type.toLowerCase() === selectedView)
              .map((initiative) => renderInitiativeCard(initiative))}
          </View>
        </View>

        {/* AI PMO Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>AI PMO Intelligence</Text>
          <View style={[styles.insightsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.red + '20' }]}>
                <AlertTriangle size={20} color={colors.red} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Cloud Migration at Risk</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  4 critical risks identified in Cloud Migration Program. AI recommends immediate executive intervention and resource reallocation.
                </Text>
              </View>
              <TouchableOpacity style={[styles.insightAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.insightActionText, { color: colors.emeraldGreen }]}>Intervene</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.emeraldGreen + '20' }]}>
                <TrendingUp size={20} color={colors.emeraldGreen} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Benefits Optimization</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  AI identifies $120M additional benefits opportunity in Digital Transformation initiative through accelerated timeline.
                </Text>
              </View>
              <TouchableOpacity style={[styles.insightAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.insightActionText, { color: colors.emeraldGreen }]}>Optimize</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.purple + '20' }]}>
                <Shield size={20} color={colors.purple} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Governance Improvement</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  Portfolio governance score at 95% exceeds industry benchmark. AI recommends sharing best practices across organization.
                </Text>
              </View>
              <TouchableOpacity style={[styles.insightAction, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40', borderWidth: 1 }]}>
                <Text style={[styles.insightActionText, { color: colors.emeraldGreen }]}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 64) / 4,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricCardLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  metricCardSubtitle: {
    fontSize: 10,
    marginTop: 2,
  },
  healthCard: {
    padding: 16,
    borderRadius: 12,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthLabel: {
    fontSize: 13,
    fontWeight: '500',
    width: 140,
  },
  healthBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  healthFill: {
    height: '100%',
    borderRadius: 4,
  },
  healthScore: {
    fontSize: 14,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  trendText: {
    fontSize: 11,
    fontWeight: '600',
  },
  filterTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeFilterTab: {
    backgroundColor: '#3B82F6',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  initiativesGrid: {
    gap: 12,
  },
  initiativeCard: {
    padding: 16,
    borderRadius: 12,
  },
  initiativeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  initiativeInfo: {
    flex: 1,
  },
  initiativeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  initiativeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  initiativeType: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  initiativeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
  },
  initiativeMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  initiativeMetric: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 10,
  },
  initiativeDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
  },
  initiativeActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  insightsCard: {
    padding: 16,
    borderRadius: 12,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  insightAction: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  insightActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
