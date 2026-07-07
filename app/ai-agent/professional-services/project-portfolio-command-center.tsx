import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { professionalServicesDashboardConfig } from '@/constants/dashboardMetrics';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  Briefcase,
  ChevronLeft,
  Target,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Calendar,
  Filter,
  Search,
  Plus,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
  Building,
  Globe,
  Activity,
  Layers,
  Zap,
  Shield,
  FileText,
  Settings,
  RefreshCw,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ProjectPortfolioCommandCenter() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedView, setSelectedView] = useState<'all' | 'active' | 'at-risk' | 'completed'>('all');
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

  const workflowStages = [
    { stage: 'Lead', count: 124, value: '$840M', status: 'active' },
    { stage: 'Opportunity', count: 89, value: '$1.2B', status: 'active' },
    { stage: 'Proposal', count: 67, value: '$980M', status: 'active' },
    { stage: 'SOW', count: 45, value: '$720M', status: 'active' },
    { stage: 'Staffing', count: 38, value: '$580M', status: 'active' },
    { stage: 'Kickoff', count: 32, value: '$480M', status: 'completed' },
    { stage: 'Delivery', count: 284, value: '$4.2B', status: 'active' },
    { stage: 'Closure', count: 18, value: '$240M', status: 'active' },
    { stage: 'Renewal', count: 12, value: '$180M', status: 'active' }
  ];

  const projects = [
    {
      id: 1,
      name: 'Cloud Migration Platform',
      client: 'Fortune 500 Tech',
      status: 'on-track',
      progress: 75,
      margin: 38,
      teamSize: 12,
      budget: '$2.4M',
      spent: '$1.8M',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      riskLevel: 'low',
      region: 'North America',
      practice: 'Cloud Services',
      stage: 'Delivery'
    },
    {
      id: 2,
      name: 'Data Analytics Implementation',
      client: 'Global Bank',
      status: 'at-risk',
      progress: 45,
      margin: 28,
      teamSize: 8,
      budget: '$1.8M',
      spent: '$1.1M',
      startDate: '2024-02-01',
      endDate: '2024-05-31',
      riskLevel: 'high',
      region: 'Europe',
      practice: 'Data & Analytics',
      stage: 'Delivery'
    },
    {
      id: 3,
      name: 'AI/ML Transformation',
      client: 'Healthcare System',
      status: 'delayed',
      progress: 30,
      margin: 42,
      teamSize: 15,
      budget: '$3.2M',
      spent: '$1.4M',
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      riskLevel: 'medium',
      region: 'North America',
      practice: 'AI & ML',
      stage: 'Delivery'
    },
    {
      id: 4,
      name: 'Digital Twin Platform',
      client: 'Manufacturing Co',
      status: 'on-track',
      progress: 60,
      margin: 35,
      teamSize: 20,
      budget: '$2.8M',
      spent: '$1.9M',
      startDate: '2024-01-20',
      endDate: '2024-07-15',
      riskLevel: 'low',
      region: 'Asia Pacific',
      practice: 'Digital Transformation',
      stage: 'Delivery'
    },
    {
      id: 5,
      name: 'Cybersecurity Overhaul',
      client: 'Insurance Giant',
      status: 'on-track',
      progress: 85,
      margin: 40,
      teamSize: 10,
      budget: '$1.5M',
      spent: '$1.3M',
      startDate: '2023-12-01',
      endDate: '2024-04-30',
      riskLevel: 'low',
      region: 'Europe',
      practice: 'Cybersecurity',
      stage: 'Closure'
    }
  ];

  const portfolioMetrics = {
    totalProjects: 1245,
    activeProjects: 284,
    atRiskProjects: 18,
    completedProjects: 943,
    totalValue: '$4.2B',
    avgMargin: '34.2%',
    avgDuration: '4.2 months',
    onTimeDelivery: '89%'
  };

  const renderWorkflowStage = (stage: any, index: number) => (
    <TouchableOpacity
      key={stage.stage}
      style={[
        styles.workflowStage,
        selectedStage === stage.stage && styles.selectedStage,
        { borderColor: selectedStage === stage.stage ? colors.electricBlue : colors.cardBorder }
      ]}
      onPress={() => setSelectedStage(stage.stage)}
    >
      <View style={[
        styles.stageDot,
        { backgroundColor: stage.status === 'completed' ? colors.emeraldGreen : stage.status === 'active' ? colors.electricBlue : colors.textSecondary }
      ]} />
      <Text style={[styles.stageName, { color: colors.text }]}>{stage.stage}</Text>
      <Text style={[styles.stageCount, { color: colors.text }]}>{stage.count}</Text>
      <Text style={[styles.stageValue, { color: colors.emeraldGreen }]}>{stage.value}</Text>
    </TouchableOpacity>
  );

  const renderProjectCard = (project: any) => (
    <View key={project.id} style={[styles.projectCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={styles.projectHeader}>
        <View style={styles.projectInfo}>
          <Text style={[styles.projectName, { color: colors.text }]}>{project.name}</Text>
          <Text style={[styles.projectClient, { color: colors.textSecondary }]}>{project.client}</Text>
        </View>
        <View style={[
          styles.projectStatus,
          { backgroundColor: project.status === 'on-track' ? colors.emeraldGreen + '20' : project.status === 'at-risk' ? colors.red + '20' : colors.amber + '20' }
        ]}>
          <Text style={[
            styles.projectStatusText,
            { color: project.status === 'on-track' ? colors.emeraldGreen : project.status === 'at-risk' ? colors.red : colors.amber }
          ]}>{project.status}</Text>
        </View>
      </View>

      <View style={styles.projectProgress}>
        <View style={[styles.progressBar, { backgroundColor: colors.glass }]}>
          <View style={[
            styles.progressFill,
            { width: `${project.progress}%`, backgroundColor: project.status === 'on-track' ? colors.emeraldGreen : project.status === 'at-risk' ? colors.red : colors.amber }
          ]} />
        </View>
        <Text style={[styles.progressText, { color: colors.text }]}>{project.progress}%</Text>
      </View>

      <View style={styles.projectMetrics}>
        <View style={styles.projectMetric}>
          <DollarSign size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{project.budget}</Text>
        </View>
        <View style={styles.projectMetric}>
          <Users size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: colors.text }]}>{project.teamSize}</Text>
        </View>
        <View style={styles.projectMetric}>
          <Target size={14} color={colors.textSecondary} />
          <Text style={[styles.metricValue, { color: project.margin >= 35 ? colors.emeraldGreen : colors.amber }]}>{project.margin}%</Text>
        </View>
        <View style={styles.projectMetric}>
          <Shield size={14} color={colors.textSecondary} />
          <Text style={[
            styles.metricValue,
            { color: project.riskLevel === 'low' ? colors.emeraldGreen : project.riskLevel === 'medium' ? colors.amber : colors.red }
          ]}>{project.riskLevel}</Text>
        </View>
      </View>

      <View style={styles.projectDetails}>
        <View style={styles.detailRow}>
          <Calendar size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {project.startDate} → {project.endDate}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <MapPin size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>{project.region}</Text>
        </View>
        <View style={styles.detailRow}>
          <Building size={12} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>{project.practice}</Text>
        </View>
      </View>

      <View style={styles.projectActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
          <FileText size={16} color={colors.textSecondary} />
          <Text style={[styles.actionButtonText, { color: colors.textSecondary }]}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.electricBlue + '20', borderColor: colors.electricBlue + '40' }]}>
          <Activity size={16} color={colors.electricBlue} />
          <Text style={[styles.actionButtonText, { color: colors.electricBlue }]}>Track</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMetricCard = (label: string, value: string, icon: any, color: string) => (
    <View style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
      <View style={[styles.metricIcon, { backgroundColor: color + '20' }]}>
        {React.createElement(icon, { size: 20, color: color })}
      </View>
      <Text style={[styles.metricCardValue, { color: color }]}>{value}</Text>
      <Text style={[styles.metricCardLabel, { color: colors.textSecondary }]}>{label}</Text>
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
            <Briefcase size={24} color="#FFFFFF" />
          </LinearGradient>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Project Portfolio Command Center</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Enterprise Project Management & Delivery Intelligence</Text>
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
        {/* Portfolio Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Portfolio Overview</Text>
          <View style={styles.metricsGrid}>
            {renderMetricCard('Total Projects', portfolioMetrics.totalProjects.toString(), Briefcase, colors.electricBlue)}
            {renderMetricCard('Active Projects', portfolioMetrics.activeProjects.toString(), Activity, colors.emeraldGreen)}
            {renderMetricCard('At Risk', portfolioMetrics.atRiskProjects.toString(), AlertTriangle, colors.red)}
            {renderMetricCard('Completed', portfolioMetrics.completedProjects.toString(), CheckCircle, colors.purple)}
            {renderMetricCard('Total Value', portfolioMetrics.totalValue, DollarSign, colors.emeraldGreen)}
            {renderMetricCard('Avg Margin', portfolioMetrics.avgMargin, BarChart3, colors.electricBlue)}
            {renderMetricCard('Avg Duration', portfolioMetrics.avgDuration, Clock, colors.amber)}
            {renderMetricCard('On-Time Delivery', portfolioMetrics.onTimeDelivery, Target, colors.emeraldGreen)}
          </View>
        </View>

        {/* Project Lifecycle Workflow */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Project Lifecycle Workflow</Text>
            <TouchableOpacity style={[styles.filterButton, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
              <Filter size={16} color={colors.textSecondary} />
              <Text style={[styles.filterButtonText, { color: colors.textSecondary }]}>Filter: {selectedStage === 'all' ? 'All Stages' : selectedStage}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.workflowScroll}>
            <TouchableOpacity
              style={[
                styles.workflowStage,
                selectedStage === 'all' && styles.selectedStage,
                { borderColor: selectedStage === 'all' ? selectedStage === 'all' ? colors.electricBlue : colors.cardBorder : colors.cardBorder }
              ]}
              onPress={() => setSelectedStage('all')}
            >
              <View style={[styles.stageDot, { backgroundColor: colors.electricBlue }]} />
              <Text style={[styles.stageName, { color: colors.text }]}>All</Text>
              <Text style={[styles.stageCount, { color: colors.text }]}>{workflowStages.reduce((acc, s) => acc + s.count, 0)}</Text>
              <Text style={[styles.stageValue, { color: colors.emeraldGreen }]}>$9.2B</Text>
            </TouchableOpacity>
            {workflowStages.map((stage, index) => renderWorkflowStage(stage, index))}
          </ScrollView>
        </View>

        {/* View Filters */}
        <View style={styles.section}>
          <View style={styles.filterTabs}>
            {['all', 'active', 'at-risk', 'completed'].map((view) => (
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
                  {view.charAt(0).toUpperCase() + view.slice(1).replace('-', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Projects Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedView === 'all' ? 'All Projects' : selectedView === 'active' ? 'Active Projects' : selectedView === 'at-risk' ? 'At-Risk Projects' : 'Completed Projects'}
            </Text>
            <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.emeraldGreen }]}>
              <Plus size={20} color="white" />
              <Text style={styles.addButtonText}>New Project</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.projectsGrid}>
            {projects
              .filter(p => selectedView === 'all' || p.status === selectedView || (selectedView === 'at-risk' && p.riskLevel === 'high'))
              .map((project) => renderProjectCard(project))}
          </View>
        </View>

        {/* Portfolio Analytics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Portfolio Analytics</Text>
          <View style={[styles.analyticsCard, { backgroundColor: colors.card, borderColor: colors.cardBorder, borderWidth: 1 }]}>
            <View style={styles.analyticsRow}>
              <Text style={[styles.analyticsLabel, { color: colors.textSecondary }]}>Practice Performance</Text>
              <View style={styles.practiceBars}>
                <View style={styles.practiceBar}>
                  <Text style={[styles.practiceName, { color: colors.text }]}>Cloud</Text>
                  <View style={[styles.practiceBarTrack, { backgroundColor: colors.glass }]}>
                    <View style={[styles.practiceBarFill, { width: '85%', backgroundColor: colors.electricBlue }]} />
                  </View>
                  <Text style={[styles.practiceValue, { color: colors.text }]}>85%</Text>
                </View>
                <View style={styles.practiceBar}>
                  <Text style={[styles.practiceName, { color: colors.text }]}>Data</Text>
                  <View style={[styles.practiceBarTrack, { backgroundColor: colors.glass }]}>
                    <View style={[styles.practiceBarFill, { width: '72%', backgroundColor: colors.emeraldGreen }]} />
                  </View>
                  <Text style={[styles.practiceValue, { color: colors.text }]}>72%</Text>
                </View>
                <View style={styles.practiceBar}>
                  <Text style={[styles.practiceName, { color: colors.text }]}>AI/ML</Text>
                  <View style={[styles.practiceBarTrack, { backgroundColor: colors.glass }]}>
                    <View style={[styles.practiceBarFill, { width: '68%', backgroundColor: colors.purple }]} />
                  </View>
                  <Text style={[styles.practiceValue, { color: colors.text }]}>68%</Text>
                </View>
                <View style={styles.practiceBar}>
                  <Text style={[styles.practiceName, { color: colors.text }]}>Security</Text>
                  <View style={[styles.practiceBarTrack, { backgroundColor: colors.glass }]}>
                    <View style={[styles.practiceBarFill, { width: '92%', backgroundColor: colors.amber }]} />
                  </View>
                  <Text style={[styles.practiceValue, { color: colors.text }]}>92%</Text>
                </View>
              </View>
            </View>

            <View style={styles.analyticsRow}>
              <Text style={[styles.analyticsLabel, { color: colors.textSecondary }]}>Regional Distribution</Text>
              <View style={styles.regionStats}>
                <View style={styles.regionStat}>
                  <Globe size={16} color={colors.electricBlue} />
                  <Text style={[styles.regionName, { color: colors.text }]}>North America</Text>
                  <Text style={[styles.regionValue, { color: colors.emeraldGreen }]}>$2.4B</Text>
                </View>
                <View style={styles.regionStat}>
                  <Globe size={16} color={colors.purple} />
                  <Text style={[styles.regionName, { color: colors.text }]}>Europe</Text>
                  <Text style={[styles.regionValue, { color: colors.emeraldGreen }]}>$1.2B</Text>
                </View>
                <View style={styles.regionStat}>
                  <Globe size={16} color={colors.amber} />
                  <Text style={[styles.regionName, { color: colors.text }]}>Asia Pacific</Text>
                  <Text style={[styles.regionValue, { color: colors.emeraldGreen }]}>$600M</Text>
                </View>
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
  workflowScroll: {
    flexDirection: 'row',
  },
  workflowStage: {
    alignItems: 'center',
    marginRight: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 100,
  },
  selectedStage: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  stageDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
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
  projectsGrid: {
    gap: 12,
  },
  projectCard: {
    padding: 16,
    borderRadius: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  projectClient: {
    fontSize: 14,
  },
  projectStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  projectStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  projectProgress: {
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
  projectMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  projectMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  projectDetails: {
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
  projectActions: {
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
    fontSize: 13,
    fontWeight: '500',
  },
  analyticsCard: {
    padding: 20,
    borderRadius: 12,
  },
  analyticsRow: {
    marginBottom: 20,
  },
  analyticsLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  practiceBars: {
    gap: 12,
  },
  practiceBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  practiceName: {
    width: 80,
    fontSize: 13,
  },
  practiceBarTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  practiceBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  practiceValue: {
    width: 40,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  regionStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  regionStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  regionName: {
    fontSize: 13,
  },
  regionValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
