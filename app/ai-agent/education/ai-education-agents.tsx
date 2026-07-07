/**
 * =============================================================================
 * AI EDUCATION AGENTS OVERVIEW
 * =============================================================================
 *
 * A dedicated page showcasing the 6 core AI Education Agents that power
 * the autonomous learning intelligence system.
 *
 * @version 1.0.0
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  ChevronLeft,
  GraduationCap,
  BookOpen,
  Target,
  BarChart3,
  Award,
  Brain,
  TrendingUp,
  Users,
  Clock,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';

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

// AI Education Agents
const EDUCATION_AGENTS = [
  {
    id: 'scholar',
    name: 'Agent Scholar',
    role: 'Student Success Agent',
    description: 'Autonomous AI agent responsible for learning analysis, progress monitoring, student interventions, and academic support. Continuously optimizes student success through predictive analytics and personalized interventions.',
    icon: GraduationCap,
    color: THEME.neonCyan,
    metrics: {
      studentsAssisted: '847K',
      successRate: 94,
      gpaImprovement: 0.34,
      interventions: '156K',
    },
    capabilities: [
      'Learning Pattern Analysis',
      'Progress Prediction',
      'Academic Risk Detection',
      'Personalized Intervention',
      'Success Optimization',
    ],
    responsibilities: [
      'Monitor student learning progress',
      'Identify at-risk students',
      'Deploy academic interventions',
      'Track GPA improvements',
      'Generate success reports',
    ],
    status: 'active',
    efficiency: 96,
  },
  {
    id: 'mentor',
    name: 'Agent Mentor',
    role: 'AI Tutor Agent',
    description: 'Intelligent tutoring system providing personalized learning guidance, question answering, lesson recommendations, and adaptive learning paths. Uses advanced NLP to deliver human-like tutoring experiences.',
    icon: BookOpen,
    color: THEME.electricBlue,
    metrics: {
      sessions: '12.5M',
      satisfaction: 96,
      retention: 89,
      knowledgeRetention: 87,
    },
    capabilities: [
      'Personalized Tutoring',
      'Question Answering',
      'Lesson Recommendations',
      'Learning Guidance',
      'Knowledge Assessment',
    ],
    responsibilities: [
      'Provide 24/7 tutoring support',
      'Answer student questions',
      'Recommend learning materials',
      'Track knowledge retention',
      'Adapt to learning styles',
    ],
    status: 'active',
    efficiency: 94,
  },
  {
    id: 'compass',
    name: 'Agent Compass',
    role: 'Admissions Agent',
    description: 'AI-powered admissions management system handling applicant screening, enrollment forecasting, recruitment optimization, and application analytics. Optimizes the entire student acquisition pipeline.',
    icon: Target,
    color: THEME.emeraldGreen,
    metrics: {
      applications: '2.4M',
      enrollmentGrowth: 15,
      conversionRate: 78,
      processingTime: '2.1 days',
    },
    capabilities: [
      'Applicant Screening',
      'Enrollment Forecasting',
      'Recruitment Optimization',
      'Application Analytics',
      'Conversion Intelligence',
    ],
    responsibilities: [
      'Screen applications efficiently',
      'Forecast enrollment trends',
      'Optimize recruitment campaigns',
      'Analyze application data',
      'Improve conversion rates',
    ],
    status: 'active',
    efficiency: 93,
  },
  {
    id: 'insight',
    name: 'Agent Insight',
    role: 'Academic Analytics Agent',
    description: 'Advanced analytics engine for performance analysis, curriculum optimization, assessment intelligence, and learning prediction. Provides data-driven insights for institutional decision-making.',
    icon: BarChart3,
    color: THEME.purple,
    metrics: {
      reports: '156K',
      accuracy: 94,
      improvements: 89,
      predictions: '2.1M',
    },
    capabilities: [
      'Performance Analysis',
      'Curriculum Optimization',
      'Assessment Intelligence',
      'Learning Prediction',
      'Data Visualization',
    ],
    responsibilities: [
      'Analyze academic performance',
      'Optimize curriculum design',
      'Generate assessment insights',
      'Predict learning outcomes',
      'Create executive reports',
    ],
    status: 'active',
    efficiency: 95,
  },
  {
    id: 'career',
    name: 'Agent Career',
    role: 'Career Readiness Agent',
    description: 'AI-powered career services platform for job matching, internship recommendations, career path planning, and industry intelligence. Connects students with opportunities and prepares them for the workforce.',
    icon: Award,
    color: THEME.amber,
    metrics: {
      placements: '425K',
      internships: '89K',
      successRate: 92,
      salaryIncrease: '18%',
    },
    capabilities: [
      'Job Matching',
      'Internship Recommendations',
      'Career Path Planning',
      'Industry Intelligence',
      'Resume Optimization',
    ],
    responsibilities: [
      'Match students with jobs',
      'Recommend internships',
      'Plan career paths',
      'Analyze industry trends',
      'Optimize student resumes',
    ],
    status: 'active',
    efficiency: 91,
  },
  {
    id: 'researcher',
    name: 'Agent Researcher',
    role: 'Research Intelligence Agent',
    description: 'Autonomous research platform for publication analysis, research trends, funding opportunities, and collaboration discovery. Accelerates academic research through AI-powered intelligence.',
    icon: Brain,
    color: THEME.magenta,
    metrics: {
      papers: '45K',
      opportunities: '12K',
      impact: 87,
      collaborations: '3.4K',
    },
    capabilities: [
      'Publication Analysis',
      'Research Trends',
      'Funding Opportunities',
      'Collaboration Discovery',
      'Impact Measurement',
    ],
    responsibilities: [
      'Analyze research publications',
      'Identify research trends',
      'Find funding opportunities',
      'Discover collaboration partners',
      'Measure research impact',
    ],
    status: 'active',
    efficiency: 93,
  },
];

export default function AIEducationAgents() {
  const router = useRouter();
  const [selectedAgent, setSelectedAgent] = useState<typeof EDUCATION_AGENTS[0] | null>(null);

  const renderAgentCard = (agent: typeof EDUCATION_AGENTS[0], index: number) => {
    const Icon = agent.icon;
    const isSelected = selectedAgent?.id === agent.id;

    return (
      <Animated.View entering={FadeInUp.delay(index * 100).springify()} key={agent.id}>
        <TouchableOpacity
          onPress={() => setSelectedAgent(agent)}
          style={[
            styles.agentCard,
            isSelected && styles.agentCardSelected,
            { borderColor: isSelected ? agent.color : THEME.border },
          ]}
        >
          <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
            <Icon size={32} color={agent.color} />
          </View>
          <View style={styles.agentInfo}>
            <Text style={styles.agentName}>{agent.name}</Text>
            <Text style={styles.agentRole}>{agent.role}</Text>
            <View style={styles.agentStatus}>
              <View style={[styles.statusDot, { backgroundColor: agent.status === 'active' ? THEME.emeraldGreen : THEME.amber }]} />
              <Text style={styles.statusText}>{agent.status === 'active' ? 'Active' : 'Standby'}</Text>
              <Text style={styles.efficiencyText}>{agent.efficiency}% efficiency</Text>
            </View>
          </View>
          <View style={styles.agentMetrics}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Students</Text>
              <Text style={[styles.metricValue, { color: agent.color }]}>
                {agent.metrics.studentsAssisted || agent.metrics.sessions || agent.metrics.applications || agent.metrics.reports || agent.metrics.placements || agent.metrics.papers}
              </Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>Success</Text>
              <Text style={[styles.metricValue, { color: agent.color }]}>
                {agent.metrics.successRate || agent.metrics.satisfaction || agent.metrics.enrollmentGrowth || agent.metrics.accuracy || agent.metrics.successRate || agent.metrics.impact}%
              </Text>
            </View>
          </View>
          <ArrowRight size={20} color={THEME.textMuted} style={styles.arrowIcon} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderAgentDetail = () => {
    if (!selectedAgent) return null;
    const Icon = selectedAgent.icon;

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.detailCard}>
        <BlurView intensity={20} tint="dark" style={styles.detailBlur}>
          <View style={styles.detailHeader}>
            <View style={[styles.detailIcon, { backgroundColor: selectedAgent.color + '20' }]}>
              <Icon size={48} color={selectedAgent.color} />
            </View>
            <View style={styles.detailTitle}>
              <Text style={styles.detailName}>{selectedAgent.name}</Text>
              <Text style={styles.detailRole}>{selectedAgent.role}</Text>
            </View>
            <TouchableOpacity onPress={() => setSelectedAgent(null)} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.detailDescription}>{selectedAgent.description}</Text>

          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>Key Metrics</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
              <View style={styles.metricsContainer}>
                {Object.entries(selectedAgent.metrics).map(([key, value]) => (
                  <View key={key} style={styles.detailMetric}>
                    <Text style={styles.detailMetricLabel}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Text>
                    <Text style={[styles.detailMetricValue, { color: selectedAgent.color }]}>{value}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>Capabilities</Text>
            <View style={styles.capabilitiesContainer}>
              {selectedAgent.capabilities.map((capability, index) => (
                <View key={index} style={styles.capabilityItem}>
                  <CheckCircle size={16} color={selectedAgent.color} />
                  <Text style={styles.capabilityText}>{capability}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.detailSection}>
            <Text style={styles.detailSectionTitle}>Responsibilities</Text>
            <View style={styles.responsibilitiesContainer}>
              {selectedAgent.responsibilities.map((responsibility, index) => (
                <View key={index} style={styles.responsibilityItem}>
                  <View style={[styles.responsibilityBullet, { backgroundColor: selectedAgent.color }]} />
                  <Text style={styles.responsibilityText}>{responsibility}</Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: selectedAgent.color + '20', borderColor: selectedAgent.color }]}
          >
            <Text style={[styles.actionButtonText, { color: selectedAgent.color }]}>View Agent Dashboard</Text>
            <ArrowRight size={16} color={selectedAgent.color} />
          </TouchableOpacity>
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
            <Brain size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>AI Education Agents</Text>
          </View>
          <Text style={styles.headerSubtitle}>6 Autonomous Intelligence Agents</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Overview */}
        <Animated.View entering={FadeInUp.springify()} style={styles.overviewCard}>
          <BlurView intensity={20} tint="dark" style={styles.overviewBlur}>
            <View style={styles.overviewStats}>
              <View style={styles.overviewStat}>
                <Users size={24} color={THEME.neonCyan} />
                <View>
                  <Text style={styles.overviewValue}>1.8M</Text>
                  <Text style={styles.overviewLabel}>Students Managed</Text>
                </View>
              </View>
              <View style={styles.overviewStat}>
                <Zap size={24} color={THEME.electricBlue} />
                <View>
                  <Text style={styles.overviewValue}>94%</Text>
                  <Text style={styles.overviewLabel}>Avg Efficiency</Text>
                </View>
              </View>
              <View style={styles.overviewStat}>
                <Clock size={24} color={THEME.emeraldGreen} />
                <View>
                  <Text style={styles.overviewValue}>24/7</Text>
                  <Text style={styles.overviewLabel}>Availability</Text>
                </View>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Agents List */}
        <View style={styles.agentsSection}>
          <Text style={styles.sectionTitle}>Autonomous Education Agents</Text>
          <View style={styles.agentsList}>
            {EDUCATION_AGENTS.map((agent, index) => renderAgentCard(agent, index))}
          </View>
        </View>

        {/* Agent Detail */}
        {renderAgentDetail()}

        {/* System Overview */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.systemCard}>
          <BlurView intensity={20} tint="dark" style={styles.systemBlur}>
            <Text style={styles.systemTitle}>AI Education Intelligence System</Text>
            <Text style={styles.systemDescription}>
              Our autonomous AI agents work in concert to optimize every aspect of the educational experience,
              from student success and learning analytics to career readiness and research innovation.
            </Text>
            <View style={styles.systemFeatures}>
              <View style={styles.systemFeature}>
                <TrendingUp size={20} color={THEME.neonCyan} />
                <Text style={styles.systemFeatureText}>Predictive Analytics</Text>
              </View>
              <View style={styles.systemFeature}>
                <Brain size={20} color={THEME.electricBlue} />
                <Text style={styles.systemFeatureText}>Neural Networks</Text>
              </View>
              <View style={styles.systemFeature}>
                <Zap size={20} color={THEME.emeraldGreen} />
                <Text style={styles.systemFeatureText}>Real-Time Processing</Text>
              </View>
              <View style={styles.systemFeature}>
                <CheckCircle size={20} color={THEME.purple} />
                <Text style={styles.systemFeatureText}>Continuous Learning</Text>
              </View>
            </View>
          </BlurView>
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
  headerSubtitle: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  overviewCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  overviewBlur: {
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overviewStat: {
    alignItems: 'center',
    gap: 8,
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
  },
  overviewLabel: {
    fontSize: 11,
    color: THEME.textMuted,
  },
  agentsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
    marginBottom: 16,
  },
  agentsList: {
    gap: 12,
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  agentCardSelected: {
    backgroundColor: THEME.cardLight,
  },
  agentIcon: {
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
    fontSize: 16,
    fontWeight: '700',
    color: THEME.text,
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 13,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    color: THEME.textMuted,
  },
  efficiencyText: {
    fontSize: 11,
    color: THEME.emeraldGreen,
    fontWeight: '600',
  },
  agentMetrics: {
    gap: 12,
    marginRight: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    color: THEME.textMuted,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  arrowIcon: {
    marginLeft: 8,
  },
  detailCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  detailBlur: {
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailTitle: {
    flex: 1,
  },
  detailName: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
    marginBottom: 4,
  },
  detailRole: {
    fontSize: 13,
    color: THEME.textMuted,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 18,
    color: THEME.textMuted,
  },
  detailDescription: {
    fontSize: 14,
    color: THEME.text,
    lineHeight: 22,
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  metricsScroll: {
    marginBottom: 0,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  detailMetric: {
    backgroundColor: THEME.card,
    borderRadius: 12,
    padding: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  detailMetricLabel: {
    fontSize: 10,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  detailMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  capabilitiesContainer: {
    gap: 8,
  },
  capabilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: THEME.card,
    padding: 12,
    borderRadius: 8,
  },
  capabilityText: {
    fontSize: 13,
    color: THEME.text,
  },
  responsibilitiesContainer: {
    gap: 8,
  },
  responsibilityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: THEME.card,
    padding: 12,
    borderRadius: 8,
  },
  responsibilityBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  responsibilityText: {
    fontSize: 13,
    color: THEME.text,
    flex: 1,
    lineHeight: 18,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  systemCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  systemBlur: {
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  systemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.text,
    marginBottom: 12,
  },
  systemDescription: {
    fontSize: 13,
    color: THEME.textMuted,
    lineHeight: 20,
    marginBottom: 16,
  },
  systemFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  systemFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: THEME.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  systemFeatureText: {
    fontSize: 12,
    color: THEME.text,
  },
});
