/**
 * =============================================================================
 * RESEARCH & INNOVATION CENTER
 * =============================================================================
 *
 * A comprehensive research dashboard that monitors research projects, publications,
 * funding grants, collaborations, and academic impact with AI-powered insights and
 * optimization recommendations.
 *
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  ChevronLeft,
  BookOpen,
  TrendingUp,
  Activity,
  Zap,
  Clock,
  Target,
  Award,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Flame,
  Shield,
  Users,
  DollarSign,
  FileText,
  Globe,
  Network,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line, Rect } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  neonCyan: '#00F0FF',
  electricBlue: '#3B82F6',
  emeraldGreen: '#10B981',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Research Data
const RESEARCH_DATA = {
  totalProjects: 1247,
  publications: '45K',
  fundingGrants: '$8.9B',
  collaborations: 289,
  academicImpact: 87,
  trend: [1200, 1210, 1220, 1230, 1240, 1247],
};

// Active Research Projects
const ACTIVE_PROJECTS = [
  { name: 'AI in Healthcare', researchers: 45, funding: '$2.4M', status: 'Active', progress: 78 },
  { name: 'Quantum Computing', researchers: 38, funding: '$3.2M', status: 'Active', progress: 65 },
  { name: 'Climate Modeling', researchers: 52, funding: '$1.8M', status: 'Active', progress: 84 },
  { name: 'Neural Networks', researchers: 41, funding: '$2.1M', status: 'Active', progress: 72 },
];

// Recent Publications
const RECENT_PUBLICATIONS = [
  { title: 'Deep Learning for Medical Diagnosis', journal: 'Nature Medicine', citations: 847, impact: 94 },
  { title: 'Quantum Machine Learning Algorithms', journal: 'Science', citations: 623, impact: 91 },
  { title: 'Climate Change Prediction Models', journal: 'Nature Climate Change', citations: 512, impact: 89 },
  { title: 'Neural Architecture Search', journal: 'IEEE TPAMI', citations: 389, impact: 87 },
];

// Funding Opportunities
const FUNDING_OPPORTUNITIES = [
  { agency: 'NSF', amount: '$5.2M', deadline: '2024-03-15', focus: 'AI Research' },
  { agency: 'NIH', amount: '$3.8M', deadline: '2024-04-01', focus: 'Healthcare AI' },
  { agency: 'DARPA', amount: '$7.5M', deadline: '2024-05-15', focus: 'Defense AI' },
  { agency: 'DOE', amount: '$4.1M', deadline: '2024-06-01', focus: 'Energy AI' },
];

// Collaboration Network
const COLLABORATION_NETWORK = [
  { institution: 'MIT', projects: 45, jointPublications: 127, funding: '$12.4M' },
  { institution: 'Stanford', projects: 38, jointPublications: 98, funding: '$9.8M' },
  { institution: 'Harvard', projects: 52, jointPublications: 145, funding: '$15.2M' },
  { institution: 'Berkeley', projects: 41, jointPublications: 112, funding: '$11.1M' },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'collaboration',
    title: 'Collaboration Opportunity',
    message: 'Interdisciplinary research projects show 45% higher citation rates. Promote cross-department collaboration.',
    impact: 'High',
    action: 'Launch interdisciplinary research initiative',
  },
  {
    type: 'funding',
    title: 'Funding Optimization',
    message: 'Projects with industry partnerships secure 67% more funding. Expand industry collaboration.',
    impact: 'Medium',
    action: 'Develop industry partnership program',
  },
  {
    type: 'publication',
    title: 'Publication Strategy',
    message: 'Open access publications show 34% higher citation impact. Encourage open access publishing.',
    impact: 'Medium',
    action: 'Implement open access incentives',
  },
];

export default function ResearchInnovationCenter() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderTrendIndicator = (change: number, trend: string) => {
    if (trend === 'up') {
      return (
        <View style={styles.trendUp}>
          <ArrowUpRight size={12} color={THEME.emeraldGreen} />
          <Text style={[styles.trendText, { color: THEME.emeraldGreen }]}>{change}%</Text>
        </View>
      );
    } else if (trend === 'down') {
      return (
        <View style={styles.trendDown}>
          <ArrowDownRight size={12} color={THEME.red} />
          <Text style={[styles.trendText, { color: THEME.red }]}>{change}%</Text>
        </View>
      );
    }
    return null;
  };

  const renderSparkline = (data: number[], color: string) => {
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal || 1;
    const chartWidth = 100;
    const chartHeight = 40;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((val - minVal) / range) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    return (
      <Svg width={chartWidth} height={chartHeight}>
        <Defs>
          <LinearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.3" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Path
          d={`M 0,${chartHeight} L ${points} L ${chartWidth},${chartHeight} Z`}
          fill={`url(#gradient-${color})`}
        />
        <Path
          d={`M ${points}`}
          stroke={color}
          strokeWidth={2}
          fill="none"
        />
      </Svg>
    );
  };

  const renderMetricCard = (title: string, value: string, color: string, subtitle?: string) => (
    <BlurView intensity={20} tint="dark" style={styles.metricCard}>
      <Text style={styles.metricLabel}>{title}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </BlurView>
  );

  const renderProjectCard = (project: typeof ACTIVE_PROJECTS[0]) => (
    <BlurView key={project.name} intensity={20} tint="dark" style={styles.projectCard}>
      <Text style={styles.projectName}>{project.name}</Text>
      <View style={styles.projectMetrics}>
        <View style={styles.projectMetric}>
          <Text style={styles.projectMetricLabel}>Researchers</Text>
          <Text style={[styles.projectMetricValue, { color: THEME.neonCyan }]}>{project.researchers}</Text>
        </View>
        <View style={styles.projectMetric}>
          <Text style={styles.projectMetricLabel}>Funding</Text>
          <Text style={[styles.projectMetricValue, { color: THEME.emeraldGreen }]}>{project.funding}</Text>
        </View>
        <View style={styles.projectMetric}>
          <Text style={styles.projectMetricLabel}>Status</Text>
          <Text style={[styles.projectMetricValue, { color: THEME.electricBlue }]}>{project.status}</Text>
        </View>
      </View>
      <View style={styles.projectProgress}>
        <Text style={styles.projectProgressLabel}>Progress</Text>
        <Text style={[styles.projectProgressValue, { color: THEME.purple }]}>{project.progress}%</Text>
      </View>
      <View style={styles.projectBar}>
        <View style={[styles.projectBarFill, { width: `${project.progress}%`, backgroundColor: THEME.purple }]} />
      </View>
    </BlurView>
  );

  const renderPublicationCard = (pub: typeof RECENT_PUBLICATIONS[0]) => (
    <BlurView key={pub.title} intensity={20} tint="dark" style={styles.pubCard}>
      <Text style={styles.pubTitle}>{pub.title}</Text>
      <Text style={styles.pubJournal}>{pub.journal}</Text>
      <View style={styles.pubMetrics}>
        <View style={styles.pubMetric}>
          <Text style={styles.pubMetricLabel}>Citations</Text>
          <Text style={[styles.pubMetricValue, { color: THEME.neonCyan }]}>{pub.citations}</Text>
        </View>
        <View style={styles.pubMetric}>
          <Text style={styles.pubMetricLabel}>Impact</Text>
          <Text style={[styles.pubMetricValue, { color: THEME.amber }]}>{pub.impact}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderFundingCard = (funding: typeof FUNDING_OPPORTUNITIES[0]) => (
    <BlurView key={funding.agency} intensity={20} tint="dark" style={styles.fundingCard}>
      <View style={styles.fundingHeader}>
        <Text style={styles.fundingAgency}>{funding.agency}</Text>
        <DollarSign size={16} color={THEME.emeraldGreen} />
      </View>
      <View style={styles.fundingDetails}>
        <View style={styles.fundingDetail}>
          <Text style={styles.fundingDetailLabel}>Amount</Text>
          <Text style={[styles.fundingDetailValue, { color: THEME.emeraldGreen }]}>{funding.amount}</Text>
        </View>
        <View style={styles.fundingDetail}>
          <Text style={styles.fundingDetailLabel}>Deadline</Text>
          <Text style={styles.fundingDetailValue}>{funding.deadline}</Text>
        </View>
        <View style={styles.fundingDetail}>
          <Text style={styles.fundingDetailLabel}>Focus</Text>
          <Text style={[styles.fundingDetailValue, { color: THEME.purple }]}>{funding.focus}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderCollaborationCard = (collab: typeof COLLABORATION_NETWORK[0]) => (
    <BlurView key={collab.institution} intensity={20} tint="dark" style={styles.collabCard}>
      <View style={styles.collabHeader}>
        <Text style={styles.collabInstitution}>{collab.institution}</Text>
        <Network size={16} color={THEME.neonCyan} />
      </View>
      <View style={styles.collabMetrics}>
        <View style={styles.collabMetric}>
          <Text style={styles.collabMetricLabel}>Projects</Text>
          <Text style={[styles.collabMetricValue, { color: THEME.neonCyan }]}>{collab.projects}</Text>
        </View>
        <View style={styles.collabMetric}>
          <Text style={styles.collabMetricLabel}>Publications</Text>
          <Text style={[styles.collabMetricValue, { color: THEME.electricBlue }]}>{collab.jointPublications}</Text>
        </View>
        <View style={styles.collabMetric}>
          <Text style={styles.collabMetricLabel}>Funding</Text>
          <Text style={[styles.collabMetricValue, { color: THEME.emeraldGreen }]}>{collab.funding}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      collaboration: THEME.neonCyan,
      funding: THEME.emeraldGreen,
      publication: THEME.purple,
    };
    const typeIcons = {
      collaboration: Network,
      funding: DollarSign,
      publication: FileText,
    };
    const Icon = typeIcons[insight.type as keyof typeof typeIcons];
    const color = typeColors[insight.type as keyof typeof typeColors];

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.insightCard}>
        <BlurView intensity={20} tint="dark" style={styles.insightCardBlur}>
          <View style={styles.insightHeader}>
            <View style={[styles.insightIcon, { backgroundColor: color + '20' }]}>
              <Icon size={20} color={color} />
            </View>
            <View style={styles.insightMeta}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <View style={[styles.insightImpact, { backgroundColor: color + '30' }]}>
                <Text style={[styles.insightImpactText, { color }]}>{insight.impact}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.insightMessage}>{insight.message}</Text>
          <View style={styles.insightAction}>
            <Text style={styles.insightActionLabel}>Suggested Action:</Text>
            <Text style={styles.insightActionText}>{insight.action}</Text>
          </View>
        </BlurView>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <BookOpen size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Research & Innovation Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Research Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Research Metrics</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsContainer}>
              {renderMetricCard('Total Projects', RESEARCH_DATA.totalProjects.toString(), THEME.neonCyan, 'Active projects')}
              {renderMetricCard('Publications', RESEARCH_DATA.publications, THEME.electricBlue, 'All time')}
              {renderMetricCard('Funding Grants', RESEARCH_DATA.fundingGrants, THEME.emeraldGreen, 'Total awarded')}
              {renderMetricCard('Collaborations', RESEARCH_DATA.collaborations.toString(), THEME.purple, 'Active partnerships')}
              {renderMetricCard('Academic Impact', `${RESEARCH_DATA.academicImpact}%`, THEME.amber, 'Citation impact')}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Active Projects */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Active Research Projects</Text>
          </View>
          <View style={styles.projectsContainer}>
            {ACTIVE_PROJECTS.map((project) => renderProjectCard(project))}
          </View>
        </Animated.View>

        {/* Recent Publications */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Recent Publications</Text>
          </View>
          <View style={styles.pubsContainer}>
            {RECENT_PUBLICATIONS.map((pub) => renderPublicationCard(pub))}
          </View>
        </Animated.View>

        {/* Funding Opportunities */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <DollarSign size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Funding Opportunities</Text>
          </View>
          <View style={styles.fundingContainer}>
            {FUNDING_OPPORTUNITIES.map((funding) => renderFundingCard(funding))}
          </View>
        </Animated.View>

        {/* Collaboration Network */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Network size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Collaboration Network</Text>
          </View>
          <View style={styles.collabContainer}>
            {COLLABORATION_NETWORK.map((collab) => renderCollaborationCard(collab))}
          </View>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Insights</Text>
          </View>
          <View style={styles.insightsContainer}>
            {AI_INSIGHTS.map((insight) => renderInsightCard(insight))}
          </View>
        </Animated.View>
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
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
  },
  timeText: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
  },
  metricsScroll: {
    marginBottom: 0,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  metricCard: {
    width: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  metricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricSubtitle: {
    fontSize: 11,
    color: THEME.textMuted,
  },
  projectsContainer: {
    gap: 12,
  },
  projectCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  projectMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  projectMetric: {
    alignItems: 'center',
  },
  projectMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  projectMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  projectProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  projectProgressLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  projectProgressValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  projectBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  projectBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  pubsContainer: {
    gap: 12,
  },
  pubCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  pubTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  pubJournal: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 12,
  },
  pubMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pubMetric: {
    alignItems: 'center',
  },
  pubMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  pubMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  fundingContainer: {
    gap: 12,
  },
  fundingCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  fundingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  fundingAgency: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  fundingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fundingDetail: {
    flex: 1,
  },
  fundingDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  fundingDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  collabContainer: {
    gap: 12,
  },
  collabCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  collabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  collabInstitution: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  collabMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collabMetric: {
    alignItems: 'center',
  },
  collabMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  collabMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  insightCardBlur: {
    padding: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightMeta: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  insightImpact: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  insightMessage: {
    fontSize: 14,
    color: THEME.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  insightAction: {
    backgroundColor: THEME.card,
    padding: 12,
    borderRadius: 8,
  },
  insightActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textMuted,
    marginBottom: 4,
  },
  insightActionText: {
    fontSize: 13,
    color: THEME.text,
  },
  trendUp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendDown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
