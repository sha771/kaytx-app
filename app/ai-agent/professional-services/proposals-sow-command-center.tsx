import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { professionalServicesDashboardConfig } from '@/constants/dashboardMetrics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  FileText,
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
  Send,
  Eye,
  Edit,
  Copy,
  Download,
  Share2,
  Percent,
  Users,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ProposalsSOWCommandCenter() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<'all' | 'draft' | 'submitted' | 'approved' | 'rejected'>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');

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

  const proposalMetrics = {
    activeRFPs: 24,
    proposalsSubmitted: 18,
    pendingReview: 8,
    approved: 12,
    rejected: 3,
    winRate: 67,
    avgTurnaround: '4.2 days',
    pipelineValue: '$4.2B',
    avgDealSize: '$840K'
  };

  const pipelineStages = [
    { stage: 'Qualified', count: 45, value: '$1.8B', conversion: 85 },
    { stage: 'Proposal', count: 32, value: '$1.2B', conversion: 72 },
    { stage: 'Negotiation', count: 18, value: '$840M', conversion: 67 },
    { stage: 'Closed', count: 12, value: '$360M', conversion: 100 }
  ];

  const proposals = [
    {
      id: 1,
      title: 'Cloud Migration Platform',
      client: 'Fortune 500 Tech',
      status: 'submitted',
      value: '$2.4M',
      probability: 75,
      stage: 'Negotiation',
      submitDate: '2024-01-15',
      dueDate: '2024-02-01',
      practice: 'Cloud Services',
      team: 4,
      pages: 45,
      pricingModel: 'Time & Materials',
      margin: 38,
      reviewer: 'Sarah Chen'
    },
    {
      id: 2,
      title: 'Data Analytics Implementation',
      client: 'Global Bank',
      status: 'approved',
      value: '$1.8M',
      probability: 85,
      stage: 'Closed',
      submitDate: '2024-01-10',
      dueDate: '2024-01-20',
      practice: 'Data & Analytics',
      team: 3,
      pages: 38,
      pricingModel: 'Fixed Price',
      margin: 42,
      reviewer: 'Michael Roberts'
    },
    {
      id: 3,
      title: 'AI/ML Transformation',
      client: 'Healthcare System',
      status: 'draft',
      value: '$3.2M',
      probability: 45,
      stage: 'Qualified',
      submitDate: null,
      dueDate: '2024-02-15',
      practice: 'AI & ML',
      team: 5,
      pages: 52,
      pricingModel: 'Performance-Based',
      margin: 45,
      reviewer: null
    },
    {
      id: 4,
      title: 'Cybersecurity Overhaul',
      client: 'Insurance Giant',
      status: 'pending',
      value: '$1.5M',
      probability: 60,
      stage: 'Proposal',
      submitDate: '2024-01-18',
      dueDate: '2024-01-25',
      practice: 'Cybersecurity',
      team: 3,
      pages: 32,
      pricingModel: 'Retainer',
      margin: 40,
      reviewer: 'Emily Watson'
    },
    {
      id: 5,
      title: 'Digital Twin Platform',
      client: 'Manufacturing Co',
      status: 'rejected',
      value: '$2.8M',
      probability: 0,
      stage: 'Proposal',
      submitDate: '2024-01-08',
      dueDate: '2024-01-18',
      practice: 'Digital Transformation',
      team: 4,
      pages: 48,
      pricingModel: 'Fixed Price',
      margin: 35,
      reviewer: 'David Kim'
    }
  ];

  const pricingModels = [
    { model: 'Fixed Price', count: 8, avgMargin: 38, winRate: 72 },
    { model: 'Time & Materials', count: 6, avgMargin: 42, winRate: 68 },
    { model: 'Retainer', count: 3, avgMargin: 45, winRate: 85 },
    { model: 'Performance-Based', count: 1, avgMargin: 48, winRate: 60 }
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

  const renderPipelineStage = (stage: any, index: number) => (
    <TouchableOpacity
      key={stage.stage}
      style={[
        styles.pipelineStage,
        selectedStage === stage.stage && styles.selectedStage,
        { borderColor: selectedStage === stage.stage ? colors.electricBlue : colors.cardBorder }
      ]}
      onPress={() => setSelectedStage(stage.stage)}
    >
      <Text style={[styles.stageName, { color: colors.text }]}>{stage.stage}</Text>
      <Text style={[styles.stageCount, { color: colors.text }]}>{stage.count}</Text>
      <Text style={[styles.stageValue, { color: colors.emeraldGreen }]}>{stage.value}</Text>
      <View style={[styles.conversionBadge, { backgroundColor: colors.purple + '20' }]}>
        <Text style={[styles.conversionText, { color: colors.purple }]}>{stage.conversion}%</Text>
      </View>
    </TouchableOpacity>
  );

  const renderProposalCard = (proposal: any) => (
    <View key={proposal.id} style={[styles.proposalCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={styles.proposalHeader}>
        <View style={styles.proposalInfo}>
          <Text style={[styles.proposalTitle, { color: colors.text }]}>{proposal.title}</Text>
          <Text style={[styles.proposalClient, { color: colors.textSecondary }]}>{proposal.client}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: proposal.status === 'approved' ? colors.emeraldGreen + '20' : proposal.status === 'submitted' ? colors.electricBlue + '20' : proposal.status === 'pending' ? colors.amber + '20' : proposal.status === 'rejected' ? colors.red + '20' : colors.glass }
        ]}>
          <Text style={[
            styles.statusText,
            { color: proposal.status === 'approved' ? colors.emeraldGreen : proposal.status === 'submitted' ? colors.electricBlue : proposal.status === 'pending' ? colors.amber : proposal.status === 'rejected' ? colors.red : colors.textSecondary }
          ]}>{proposal.status}</Text>
        </View>
      </View>

      <View style={styles.proposalMetrics}>
        <View style={styles.proposalMetric}>
          <DollarSign size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{proposal.value}</Text>
        </View>
        <View style={styles.proposalMetric}>
          <Percent size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: proposal.probability >= 70 ? colors.emeraldGreen : proposal.probability >= 50 ? colors.electricBlue : colors.amber }]}>{proposal.probability}%</Text>
        </View>
        <View style={styles.proposalMetric}>
          <Layers size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{proposal.stage}</Text>
        </View>
        <View style={styles.proposalMetric}>
          <Award size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: proposal.margin >= 40 ? colors.emeraldGreen : colors.amber }]}>{proposal.margin}%</Text>
        </View>
      </View>

      <View style={styles.proposalDetails}>
        <View style={styles.detailRow}>
          <Briefcase size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>{proposal.practice}</Text>
        </View>
        <View style={styles.detailRow}>
          <Users size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>Team: {proposal.team} • Pages: {proposal.pages}</Text>
        </View>
        <View style={styles.detailRow}>
          <FileText size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>{proposal.pricingModel}</Text>
        </View>
        {proposal.reviewer && (
          <View style={styles.detailRow}>
            <User size={12} color={colors.textSecondary} />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>Reviewer: {proposal.reviewer}</Text>
          </View>
        )}
      </View>

      <View style={styles.proposalDates}>
        <View style={styles.dateRow}>
          <Calendar size={12} color={colors.textSecondary} />
          <Text style={[styles.dateText, { color: colors.textSecondary }]}>
            {proposal.submitDate ? `Submitted: ${proposal.submitDate}` : 'Not submitted'}
          </Text>
        </View>
        <View style={styles.dateRow}>
          <Clock size={12} color={colors.textSecondary} />
          <Text style={[styles.dateText, { color: colors.textSecondary }]}>Due: {proposal.dueDate}</Text>
        </View>
      </View>

      <View style={styles.proposalActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
          <Eye size={16} color={colors.textSecondary} />
          <Text style={[styles.actionButtonText, { color: colors.textSecondary }]}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.electricBlue + '20', borderColor: colors.electricBlue + '40' }]}>
          <Edit size={16} color={colors.electricBlue} />
          <Text style={[styles.actionButtonText, { color: colors.electricBlue }]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.emeraldGreen + '20', borderColor: colors.emeraldGreen + '40' }]}>
          <Send size={16} color={colors.emeraldGreen} />
          <Text style={[styles.actionButtonText, { color: colors.emeraldGreen }]}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPricingRow = (model: any, index: number) => (
    <View key={index} style={[styles.pricingRow, { borderBottomColor: colors.cardBorder }]}>
      <Text style={[styles.pricingModel, { color: colors.text }]}>{model.model}</Text>
      <Text style={[styles.pricingCount, { color: colors.text }]}>{model.count}</Text>
      <Text style={[styles.pricingMargin, { color: model.avgMargin >= 40 ? colors.emeraldGreen : colors.amber }]}>{model.avgMargin}%</Text>
      <View style={styles.winRateBadge}>
        <TrendingUp size={12} color={colors.emeraldGreen} />
        <Text style={[styles.winRateText, { color: colors.emeraldGreen }]}>{model.winRate}%</Text>
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
            <FileText size={24} color="#FFFFFF" />
          </LinearGradient>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Proposals & SOW Intelligence Center</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Proposal Generation & Statement of Work Management</Text>
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
        {/* Proposal Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Proposal Overview</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Active RFPs', proposalMetrics.activeRFPs, Layers, colors.electricBlue)}
            {renderMetricCard('Submitted', proposalMetrics.proposalsSubmitted, Send, colors.electricBlue)}
            {renderMetricCard('Pending Review', proposalMetrics.pendingReview, Clock, colors.amber)}
            {renderMetricCard('Approved', proposalMetrics.approved, CheckCircle, colors.emeraldGreen)}
            {renderMetricCard('Rejected', proposalMetrics.rejected, XCircle, colors.red)}
            {renderMetricCard('Win Rate', `${proposalMetrics.winRate}%`, Award, colors.emeraldGreen)}
            {renderMetricCard('Avg Turnaround', proposalMetrics.avgTurnaround, Activity, colors.purple)}
            {renderMetricCard('Pipeline Value', proposalMetrics.pipelineValue, DollarSign, colors.emeraldGreen)}
          </View>
        </View>

        {/* Pipeline Stages */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Deal Pipeline</Text>
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
              <Filter size={16} color={colors.textSecondary} />
              <Text style={[styles.filterButtonText, { color: colors.textSecondary }]}>Filter: {selectedStage === 'all' ? 'All Stages' : selectedStage}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pipelineScroll}>
            <TouchableOpacity
              style={[
                styles.pipelineStage,
                selectedStage === 'all' && styles.selectedStage,
                { borderColor: selectedStage === 'all' ? colors.electricBlue : colors.cardBorder }
              ]}
              onPress={() => setSelectedStage('all')}
            >
              <Text style={[styles.stageName, { color: colors.text }]}>All</Text>
              <Text style={[styles.stageCount, { color: colors.text }]}>{pipelineStages.reduce((acc, s) => acc + s.count, 0)}</Text>
              <Text style={[styles.stageValue, { color: colors.emeraldGreen }]}>$4.2B</Text>
              <View style={[styles.conversionBadge, { backgroundColor: colors.purple + '20' }]}>
                <Text style={[styles.conversionText, { color: colors.purple }]}>76%</Text>
              </View>
            </TouchableOpacity>
            {pipelineStages.map((stage, index) => renderPipelineStage(stage, index))}
          </ScrollView>
        </View>

        {/* View Filters */}
        <View style={styles.section}>
          <View style={styles.filterTabs}>
            {['all', 'draft', 'submitted', 'approved', 'rejected'].map((view) => (
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

        {/* Proposals Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedView === 'all' ? 'All Proposals' : selectedView === 'draft' ? 'Draft Proposals' : selectedView === 'submitted' ? 'Submitted Proposals' : selectedView === 'approved' ? 'Approved Proposals' : 'Rejected Proposals'}
            </Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.emeraldGreen }]}>
              <Plus size={20} color="white" />
              <Text style={styles.addButtonText}>New Proposal</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.proposalsGrid}>
            {proposals
              .filter(p => selectedView === 'all' || p.status === selectedView)
              .map((proposal) => renderProposalCard(proposal))}
          </View>
        </View>

        {/* Pricing Models */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Pricing Model Performance</Text>
          <View style={[styles.pricingCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.pricingHeader}>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Pricing Model</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Count</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Avg Margin</Text>
              <Text style={[styles.columnHeader, { color: colors.textSecondary }]}>Win Rate</Text>
            </View>
            {pricingModels.map((model, index) => renderPricingRow(model, index))}
          </View>
        </View>

        {/* AI Proposal Insights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Proposal Intelligence</Text>
          <View style={[styles.insightsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.emeraldGreen + '20' }]}>
                <TrendingUp size={20} color={colors.emeraldGreen} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Win Rate Optimization</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  AI analysis shows proposals with performance-based pricing have 60% win rate. Consider for high-value deals.
                </Text>
              </View>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.amber + '20' }]}>
                <AlertTriangle size={20} color={colors.amber} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Pricing Adjustment Needed</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  Digital Twin Platform proposal margin at 35% is below practice average. AI recommends 5-8% increase.
                </Text>
              </View>
            </View>

            <View style={styles.insightItem}>
              <View style={[styles.insightIcon, { backgroundColor: colors.purple + '20' }]}>
                <Zap size={20} color={colors.purple} />
              </View>
              <View style={styles.insightContent}>
                <Text style={[styles.insightTitle, { color: colors.text }]}>Template Optimization</Text>
                <Text style={[styles.insightDescription, { color: colors.textSecondary }]}>
                  AI identifies 3 templates that could reduce proposal creation time by 40% while maintaining quality.
                </Text>
              </View>
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
  pipelineScroll: {
    flexDirection: 'row',
  },
  pipelineStage: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    minWidth: 100,
  },
  selectedStage: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  stageName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  stageCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  stageValue: {
    fontSize: 11,
    marginBottom: 4,
  },
  conversionBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  conversionText: {
    fontSize: 10,
    fontWeight: '600',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  filterButtonText: {
    fontSize: 14,
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
  proposalsGrid: {
    gap: 12,
  },
  proposalCard: {
    padding: 16,
    borderRadius: 12,
  },
  proposalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  proposalInfo: {
    flex: 1,
  },
  proposalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  proposalClient: {
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
  proposalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  proposalMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  proposalDetails: {
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
  proposalDates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 12,
  },
  proposalActions: {
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
  pricingCard: {
    padding: 16,
    borderRadius: 12,
  },
  pricingHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 8,
  },
  columnHeader: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  pricingModel: {
    flex: 1.5,
    fontSize: 13,
    fontWeight: '500',
  },
  pricingCount: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  pricingMargin: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  winRateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  winRateText: {
    fontSize: 11,
    fontWeight: '600',
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
  },
});
