import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Lightbulb, 
  Zap, 
  ArrowLeft,
  Activity,
  Target,
  BarChart3,
  LineChart,
  CheckCircle,
  Clock,
  Rocket,
  Cpu,
  Brain,
  TrendingUp,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface InnovationProject {
  id: string;
  name: string;
  category: string;
  stage: 'ideation' | 'development' | 'testing' | 'launch';
  progress: number;
  impact: string;
  investment: string;
}

interface Technology {
  id: string;
  name: string;
  maturity: 'emerging' | 'growing' | 'mature';
  adoption: string;
  potential: string;
}

const innovationProjects: InnovationProject[] = [
  { id: '1', name: 'AI-Powered Analytics Platform', category: 'AI/ML', stage: 'development', progress: 72, impact: '$2.4B', investment: '$480M' },
  { id: '2', name: 'Quantum Computing Integration', category: 'Quantum', stage: 'ideation', progress: 28, impact: '$1.8B', investment: '$320M' },
  { id: '3', name: 'Sustainable Energy Solutions', category: 'Sustainability', stage: 'testing', progress: 65, impact: '$1.2B', investment: '$240M' },
  { id: '4', name: 'Blockchain Supply Chain', category: 'Blockchain', stage: 'development', progress: 54, impact: '$0.8B', investment: '$160M' },
  { id: '5', name: 'Autonomous Systems', category: 'Robotics', stage: 'launch', progress: 92, impact: '$0.6B', investment: '$120M' }
];

const technologies: Technology[] = [
  { id: '1', name: 'Generative AI', maturity: 'growing', adoption: '78%', potential: 'High' },
  { id: '2', name: 'Edge Computing', maturity: 'growing', adoption: '65%', potential: 'High' },
  { id: '3', name: 'Quantum Computing', maturity: 'emerging', adoption: '12%', potential: 'Very High' },
  { id: '4', name: '5G Networks', maturity: 'mature', adoption: '87%', potential: 'Medium' },
  { id: '5', name: 'Extended Reality', maturity: 'growing', adoption: '34%', potential: 'High' }
];

const rdPortfolio = [
  { area: 'AI & Machine Learning', budget: '$1.2B', projects: 24, roi: '+45.2%' },
  { area: 'Quantum Technologies', budget: '$0.8B', projects: 8, roi: '+28.7%' },
  { area: 'Sustainability', budget: '$0.6B', projects: 12, roi: '+32.4%' },
  { area: 'Advanced Materials', budget: '$0.4B', projects: 6, roi: '+18.9%' }
];

const digitalTransformation = [
  { initiative: 'Cloud Migration', progress: 87, status: 'on-track' },
  { initiative: 'AI Integration', progress: 72, status: 'on-track' },
  { initiative: 'Data Modernization', progress: 65, status: 'ahead' },
  { initiative: 'Security Enhancement', progress: 92, status: 'ahead' }
];

export default function InnovationLab() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'projects' | 'technologies' | 'portfolio' | 'transformation'>('projects');

  const tabs = [
    { id: 'projects', label: 'Projects', icon: Rocket },
    { id: 'technologies', label: 'Technologies', icon: Cpu },
    { id: 'portfolio', label: 'R&D Portfolio', icon: BarChart3 },
    { id: 'transformation', label: 'Transformation', icon: Zap }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'ideation': return '#6B7280';
      case 'development': return '#3B82F6';
      case 'testing': return '#F59E0B';
      case 'launch': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case 'emerging': return '#EC4899';
      case 'growing': return '#3B82F6';
      case 'mature': return '#10B981';
      default: return '#6B7280';
    }
  };

  const ProjectCard = ({ project }: { project: InnovationProject }) => (
    <View style={[styles.projectCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectName}>{project.name}</Text>
        <View style={[styles.projectStage, { backgroundColor: `${getStageColor(project.stage)}20` }]}>
          <Text style={[styles.projectStageText, { color: getStageColor(project.stage) }]}>
            {project.stage.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.projectMeta}>
        <View style={styles.projectMetaItem}>
          <Lightbulb size={14} color="#9CA3AF" />
          <Text style={styles.projectMetaText}>{project.category}</Text>
        </View>
        <View style={styles.projectMetaItem}>
          <DollarSign size={14} color="#9CA3AF" />
          <Text style={styles.projectMetaText}>{project.investment}</Text>
        </View>
      </View>
      <View style={styles.projectProgress}>
        <View style={styles.projectProgressBar}>
          <View style={[styles.projectProgressFill, { width: `${project.progress}%`, backgroundColor: getStageColor(project.stage) }]} />
        </View>
        <Text style={styles.projectProgressText}>{project.progress}%</Text>
      </View>
      <View style={styles.projectImpact}>
        <Target size={14} color="#F59E0B" />
        <Text style={styles.projectImpactText}>Impact: {project.impact}</Text>
      </View>
    </View>
  );

  const TechnologyCard = ({ tech }: { tech: Technology }) => (
    <View style={[styles.techCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.techHeader}>
        <Cpu size={20} color="#3B82F6" />
        <Text style={styles.techName}>{tech.name}</Text>
      </View>
      <View style={styles.techMetrics}>
        <View style={styles.techMetric}>
          <Text style={styles.techMetricLabel}>Maturity</Text>
          <View style={[styles.techMaturity, { backgroundColor: `${getMaturityColor(tech.maturity)}20` }]}>
            <Text style={[styles.techMaturityText, { color: getMaturityColor(tech.maturity) }]}>
              {tech.maturity.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={styles.techMetric}>
          <Text style={styles.techMetricLabel}>Adoption</Text>
          <Text style={[styles.techMetricValue, { color: '#10B981' }]}>{tech.adoption}</Text>
        </View>
        <View style={styles.techMetric}>
          <Text style={styles.techMetricLabel}>Potential</Text>
          <Text style={[styles.techMetricValue, { color: '#F59E0B' }]}>{tech.potential}</Text>
        </View>
      </View>
    </View>
  );

  const PortfolioCard = ({ rd }: { rd: any }) => (
    <View style={[styles.portfolioCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.portfolioArea}>{rd.area}</Text>
      <View style={styles.portfolioMetrics}>
        <View style={styles.portfolioMetric}>
          <DollarSign size={16} color="#9CA3AF" />
          <Text style={styles.portfolioMetricLabel}>Budget</Text>
          <Text style={[styles.portfolioMetricValue, { color: '#10B981' }]}>{rd.budget}</Text>
        </View>
        <View style={styles.portfolioMetric}>
          <Rocket size={16} color="#9CA3AF" />
          <Text style={styles.portfolioMetricLabel}>Projects</Text>
          <Text style={[styles.portfolioMetricValue, { color: '#3B82F6' }]}>{rd.projects}</Text>
        </View>
        <View style={styles.portfolioMetric}>
          <TrendingUp size={16} color="#9CA3AF" />
          <Text style={styles.portfolioMetricLabel}>ROI</Text>
          <Text style={[styles.portfolioMetricValue, { color: '#8B5CF6' }]}>{rd.roi}</Text>
        </View>
      </View>
    </View>
  );

  const TransformationCard = ({ item }: { item: any }) => (
    <View style={[styles.transformationCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.transformationInitiative}>{item.initiative}</Text>
      <View style={styles.transformationProgress}>
        <View style={styles.transformationProgressBar}>
          <View style={[styles.transformationProgressFill, { width: `${item.progress}%`, backgroundColor: item.status === 'ahead' ? '#10B981' : '#3B82F6' }]} />
        </View>
        <Text style={styles.transformationProgressText}>{item.progress}%</Text>
      </View>
      <View style={[styles.transformationStatus, { backgroundColor: item.status === 'ahead' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)' }]}>
        <Text style={[styles.transformationStatusText, { color: item.status === 'ahead' ? '#10B981' : '#3B82F6' }]}>
          {item.status.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#03050A' }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { backgroundColor: '#0A0F1A' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Innovation Lab</Text>
          <Text style={styles.headerSubtitle}>R&D & Digital Transformation</Text>
        </View>
        <Lightbulb size={20} color="#F59E0B" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, selectedTab === tab.id && styles.tabActive]}
            onPress={() => setSelectedTab(tab.id as any)}
          >
            <tab.icon size={18} color={selectedTab === tab.id ? '#FFFFFF' : '#9CA3AF'} />
            <Text style={[styles.tabText, selectedTab === tab.id && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {selectedTab === 'projects' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Innovation Projects</Text>
            {innovationProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </View>
        )}

        {selectedTab === 'technologies' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technology Scouting</Text>
            {technologies.map(tech => (
              <TechnologyCard key={tech.id} tech={tech} />
            ))}
          </View>
        )}

        {selectedTab === 'portfolio' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>R&D Portfolio</Text>
            {rdPortfolio.map((rd, index) => (
              <PortfolioCard key={index} rd={rd} />
            ))}
            
            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Portfolio Analysis</Text>
              <View style={styles.chartPlaceholder}>
                <BarChart3 size={48} color="#3B82F6" />
                <Text style={styles.chartPlaceholderText}>Interactive Chart</Text>
              </View>
            </View>
          </View>
        )}

        {selectedTab === 'transformation' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Digital Transformation</Text>
            {digitalTransformation.map((item, index) => (
              <TransformationCard key={index} item={item} />
            ))}
            
            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Transformation Roadmap</Text>
              <View style={styles.chartPlaceholder}>
                <LineChart size={48} color="#10B981" />
                <Text style={styles.chartPlaceholderText}>Interactive Roadmap</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  tabsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tabActive: { backgroundColor: '#3B82F6' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#9CA3AF' },
  tabTextActive: { color: '#FFFFFF' },
  content: { flex: 1 },
  section: { padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  projectCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  projectStage: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  projectStageText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  projectMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  projectMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  projectMetaText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  projectProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  projectProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  projectProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  projectProgressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  projectImpact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  projectImpactText: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  techCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  techHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  techName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  techMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  techMetric: {
    flex: 1,
    alignItems: 'center',
  },
  techMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  techMaturity: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  techMaturityText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  techMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  portfolioCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  portfolioArea: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  portfolioMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portfolioMetric: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  portfolioMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  portfolioMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  transformationCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  transformationInitiative: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  transformationProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  transformationProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  transformationProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  transformationProgressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  transformationStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  transformationStatusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  chartCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chartPlaceholder: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 12,
  },
  chartPlaceholderText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 12,
  },
});
