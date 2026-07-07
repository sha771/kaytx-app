import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Users, 
  TrendingUp, 
  ArrowLeft,
  Activity,
  Target,
  BarChart3,
  CheckCircle,
  Clock,
  Award,
  Brain,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface TalentMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

const talentMetrics: TalentMetric[] = [
  { id: '1', label: 'Global Employees', value: '126,000', change: '+8.2%', trend: 'up' },
  { id: '2', label: 'Leadership Pipeline', value: '94%', change: '+2.4%', trend: 'up' },
  { id: '3', label: 'Skills Coverage', value: '87%', change: '+5.1%', trend: 'up' },
  { id: '4', label: 'Productivity Index', value: '94.2', change: '+3.5%', trend: 'up' },
  { id: '5', label: 'Employee Engagement', value: '89%', change: '+1.8%', trend: 'up' },
  { id: '6', label: 'Retention Rate', value: '92.4%', change: '+2.3%', trend: 'up' }
];

const talentDistribution = [
  { region: 'North America', employees: '54,000', percentage: 43 },
  { region: 'Europe', employees: '32,000', percentage: 25 },
  { region: 'Asia Pacific', employees: '28,000', percentage: 22 },
  { region: 'Latin America', employees: '8,000', percentage: 6 },
  { region: 'Middle East & Africa', employees: '4,000', percentage: 4 }
];

const leadershipPipeline = [
  { level: 'C-Suite', ready: 12, gap: 2, status: 'strong' },
  { level: 'VP Level', ready: 48, gap: 8, status: 'strong' },
  { level: 'Director', ready: 156, gap: 24, status: 'adequate' },
  { level: 'Manager', ready: 624, gap: 96, status: 'adequate' }
];

const skillsIntelligence = [
  { category: 'Technical', coverage: 92, demand: 'High', trend: 'up' },
  { category: 'Leadership', coverage: 87, demand: 'High', trend: 'stable' },
  { category: 'Digital', coverage: 84, demand: 'Very High', trend: 'up' },
  { category: 'Innovation', coverage: 78, demand: 'High', trend: 'up' }
];

export default function WorkforceStrategy() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'distribution' | 'leadership' | 'skills'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'distribution', label: 'Distribution', icon: Users },
    { id: 'leadership', label: 'Leadership', icon: Award },
    { id: 'skills', label: 'Skills', icon: Brain }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp size={14} color="#10B981" />;
      case 'down': return <ArrowDown size={14} color="#EF4444" />;
      default: return <Minus size={14} color="#6B7280" />;
    }
  };

  const MetricCard = ({ metric }: { metric: TalentMetric }) => (
    <View style={[styles.metricCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.metricLabel}>{metric.label}</Text>
      <Text style={styles.metricValue}>{metric.value}</Text>
      <View style={styles.metricTrend}>
        {getTrendIcon(metric.trend)}
        <Text style={[styles.metricChange, { color: metric.trend === 'up' ? '#10B981' : metric.trend === 'down' ? '#EF4444' : '#6B7280' }]}>
          {metric.change}
        </Text>
      </View>
    </View>
  );

  const DistributionCard = ({ data }: { data: any }) => (
    <View style={[styles.distributionCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.regionName}>{data.region}</Text>
      <View style={styles.distributionMetrics}>
        <View>
          <Text style={styles.distributionMetricLabel}>Employees</Text>
          <Text style={[styles.distributionMetricValue, { color: '#10B981' }]}>{data.employees}</Text>
        </View>
        <View>
          <Text style={styles.distributionMetricLabel}>Share</Text>
          <Text style={[styles.distributionMetricValue, { color: '#3B82F6' }]}>{data.percentage}%</Text>
        </View>
      </View>
      <View style={styles.distributionProgress}>
        <View style={[styles.distributionProgressFill, { width: `${data.percentage}%`, backgroundColor: '#8B5CF6' }]} />
      </View>
    </View>
  );

  const LeadershipCard = ({ data }: { data: any }) => (
    <View style={[styles.leadershipCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.leadershipLevel}>{data.level}</Text>
      <View style={styles.leadershipMetrics}>
        <View style={styles.leadershipMetric}>
          <CheckCircle size={16} color="#10B981" />
          <Text style={styles.leadershipMetricLabel}>Ready</Text>
          <Text style={[styles.leadershipMetricValue, { color: '#10B981' }]}>{data.ready}</Text>
        </View>
        <View style={styles.leadershipMetric}>
          <AlertTriangle size={16} color="#F59E0B" />
          <Text style={styles.leadershipMetricLabel}>Gap</Text>
          <Text style={[styles.leadershipMetricValue, { color: '#F59E0B' }]}>{data.gap}</Text>
        </View>
      </View>
      <View style={[styles.leadershipStatus, { backgroundColor: data.status === 'strong' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
        <Text style={[styles.leadershipStatusText, { color: data.status === 'strong' ? '#10B981' : '#F59E0B' }]}>
          {data.status.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  const SkillsCard = ({ skill }: { skill: any }) => (
    <View style={[styles.skillsCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.skillsCategory}>{skill.category}</Text>
      <View style={styles.skillsMetrics}>
        <View>
          <Text style={styles.skillsMetricLabel}>Coverage</Text>
          <Text style={[styles.skillsMetricValue, { color: '#10B981' }]}>{skill.coverage}%</Text>
        </View>
        <View>
          <Text style={styles.skillsMetricLabel}>Demand</Text>
          <Text style={[styles.skillsMetricValue, { color: skill.demand === 'Very High' ? '#EF4444' : '#F59E0B' }]}>
            {skill.demand}
          </Text>
        </View>
      </View>
      <View style={styles.skillsProgress}>
        <View style={styles.skillsProgressBar}>
          <View style={[styles.skillsProgressFill, { width: `${skill.coverage}%`, backgroundColor: '#3B82F6' }]} />
        </View>
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
          <Text style={styles.headerTitle}>Workforce Strategy</Text>
          <Text style={styles.headerSubtitle}>Talent & Leadership Analytics</Text>
        </View>
        <Users size={20} color="#8B5CF6" />
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
        {selectedTab === 'overview' && (
          <View style={styles.metricsSection}>
            <Text style={styles.sectionTitle}>Talent Metrics</Text>
            <View style={styles.metricsGrid}>
              {talentMetrics.map(metric => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </View>
          </View>
        )}

        {selectedTab === 'distribution' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Global Talent Distribution</Text>
            {talentDistribution.map((data, index) => (
              <DistributionCard key={index} data={data} />
            ))}
          </View>
        )}

        {selectedTab === 'leadership' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Leadership Pipeline</Text>
            {leadershipPipeline.map((data, index) => (
              <LeadershipCard key={index} data={data} />
            ))}
          </View>
        )}

        {selectedTab === 'skills' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills Intelligence</Text>
            {skillsIntelligence.map((skill, index) => (
              <SkillsCard key={index} skill={skill} />
            ))}
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
  metricsSection: { padding: 20 },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  metricLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  distributionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  regionName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  distributionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  distributionMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  distributionMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  distributionProgress: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  distributionProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  leadershipCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  leadershipLevel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  leadershipMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  leadershipMetric: {
    alignItems: 'center',
    gap: 8,
  },
  leadershipMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  leadershipMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  leadershipStatus: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  leadershipStatusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  skillsCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  skillsCategory: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  skillsMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  skillsMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  skillsMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  skillsProgress: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  skillsProgressBar: {
    flex: 1,
  },
  skillsProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
});
