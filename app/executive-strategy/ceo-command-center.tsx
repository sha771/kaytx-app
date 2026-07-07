import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Globe, 
  Target,
  ArrowLeft,
  TrendingUp,
  Activity,
  Zap,
  Brain,
  BarChart3,
  LineChart,
  PieChart,
  Map,
  Award,
  Briefcase,
  CheckCircle,
  AlertTriangle
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

const { width } = Dimensions.get('window');

interface EnterpriseMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
}

const enterpriseMetrics: EnterpriseMetric[] = [
  {
    id: '1',
    label: 'Enterprise Revenue',
    value: '$28.4B',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: '#10B981'
  },
  {
    id: '2',
    label: 'Enterprise Value',
    value: '$185B',
    change: '+18.7%',
    trend: 'up',
    icon: TrendingUp,
    color: '#3B82F6'
  },
  {
    id: '3',
    label: 'Global Employees',
    value: '126,000',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: '#8B5CF6'
  },
  {
    id: '4',
    label: 'Countries Operating',
    value: '87',
    change: '+3',
    trend: 'up',
    icon: Globe,
    color: '#06B6D4'
  },
  {
    id: '5',
    label: 'Strategic Initiatives',
    value: '146',
    change: '+12',
    trend: 'up',
    icon: Target,
    color: '#F59E0B'
  },
  {
    id: '6',
    label: 'AI Value Created',
    value: '+$7.9B',
    change: '+31.2%',
    trend: 'up',
    icon: Brain,
    color: '#EC4899'
  }
];

const regionalPerformance = [
  { region: 'North America', revenue: '$12.4B', growth: '+8.5%', share: '43.7%' },
  { region: 'Europe', revenue: '$8.2B', growth: '+12.3%', share: '28.9%' },
  { region: 'Asia Pacific', revenue: '$5.8B', growth: '+18.7%', share: '20.4%' },
  { region: 'Latin America', revenue: '$1.4B', growth: '+15.2%', share: '4.9%' },
  { region: 'Middle East & Africa', revenue: '$0.6B', growth: '+22.1%', share: '2.1%' }
];

const strategicInitiatives = [
  { id: '1', name: 'Digital Transformation 2026', status: 'On Track', progress: 78, impact: '$2.4B' },
  { id: '2', name: 'Global Market Expansion', status: 'Ahead', progress: 65, impact: '$1.8B' },
  { id: '3', name: 'AI-Powered Operations', status: 'On Track', progress: 82, impact: '$1.2B' },
  { id: '4', name: 'Sustainability Initiative', status: 'On Track', progress: 54, impact: '$0.8B' },
  { id: '5', name: 'Talent Acquisition Program', status: 'Behind', progress: 42, impact: '$0.6B' }
];

const recentMilestones = [
  { id: '1', title: 'Q4 Revenue Target Achieved', time: '2 hours ago', type: 'success' },
  { id: '2', title: 'New Strategic Partnership Signed', time: '5 hours ago', type: 'success' },
  { id: '3', title: 'AI Agent Deployment Complete', time: '8 hours ago', type: 'success' },
  { id: '4', title: 'Market Expansion Initiative Launched', time: '12 hours ago', type: 'info' },
  { id: '5', title: 'Risk Assessment Updated', time: '1 day ago', type: 'warning' }
];

export default function CEOCommandCenter() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'performance' | 'initiatives' | 'global'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'initiatives', label: 'Initiatives', icon: Target },
    { id: 'global', label: 'Global', icon: Globe }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return '#10B981';
      case 'Ahead': return '#3B82F6';
      case 'Behind': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} color="#10B981" />;
      case 'warning': return <AlertTriangle size={16} color="#F59E0B" />;
      default: return <Activity size={16} color="#3B82F6" />;
    }
  };

  const MetricCard = ({ metric }: { metric: EnterpriseMetric }) => (
    <View style={[styles.metricCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={[styles.metricIcon, { backgroundColor: `${metric.color}20` }]}>
        <metric.icon size={24} color={metric.color} />
      </View>
      <Text style={styles.metricLabel}>{metric.label}</Text>
      <Text style={[styles.metricValue, { color: metric.color }]}>{metric.value}</Text>
      <View style={styles.metricTrend}>
        <TrendingUp size={14} color={metric.trend === 'up' ? '#10B981' : '#EF4444'} />
        <Text style={[styles.metricChange, { color: metric.trend === 'up' ? '#10B981' : '#EF4444' }]}>
          {metric.change}
        </Text>
      </View>
    </View>
  );

  const RegionalCard = ({ data }: { data: any }) => (
    <View style={[styles.regionalCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.regionName}>{data.region}</Text>
      <View style={styles.regionMetrics}>
        <View>
          <Text style={styles.regionMetricLabel}>Revenue</Text>
          <Text style={[styles.regionMetricValue, { color: '#10B981' }]}>{data.revenue}</Text>
        </View>
        <View>
          <Text style={styles.regionMetricLabel}>Growth</Text>
          <Text style={[styles.regionMetricValue, { color: '#3B82F6' }]}>{data.growth}</Text>
        </View>
        <View>
          <Text style={styles.regionMetricLabel}>Share</Text>
          <Text style={[styles.regionMetricValue, { color: '#8B5CF6' }]}>{data.share}</Text>
        </View>
      </View>
      <View style={styles.regionProgressBar}>
        <View style={[styles.regionProgressFill, { width: data.share, backgroundColor: '#06B6D4' }]} />
      </View>
    </View>
  );

  const InitiativeCard = ({ initiative }: { initiative: any }) => (
    <View style={[styles.initiativeCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.initiativeHeader}>
        <Text style={styles.initiativeName}>{initiative.name}</Text>
        <View style={[styles.initiativeStatus, { backgroundColor: `${getStatusColor(initiative.status)}20` }]}>
          <Text style={[styles.initiativeStatusText, { color: getStatusColor(initiative.status) }]}>
            {initiative.status}
          </Text>
        </View>
      </View>
      <View style={styles.initiativeProgress}>
        <View style={styles.initiativeProgressBar}>
          <View style={[styles.initiativeProgressFill, { width: `${initiative.progress}%`, backgroundColor: getStatusColor(initiative.status) }]} />
        </View>
        <Text style={styles.initiativeProgressText}>{initiative.progress}%</Text>
      </View>
      <View style={styles.initiativeImpact}>
        <Briefcase size={16} color="#9CA3AF" />
        <Text style={styles.initiativeImpactText}>Impact: {initiative.impact}</Text>
      </View>
    </View>
  );

  const MilestoneItem = ({ milestone }: { milestone: any }) => (
    <View style={styles.milestoneItem}>
      <View style={styles.milestoneIcon}>
        {getMilestoneIcon(milestone.type)}
      </View>
      <View style={styles.milestoneContent}>
        <Text style={styles.milestoneTitle}>{milestone.title}</Text>
        <Text style={styles.milestoneTime}>{milestone.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#03050A' }]}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: '#0A0F1A' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>CEO Command Center</Text>
          <Text style={styles.headerSubtitle}>Enterprise Overview & Intelligence</Text>
        </View>
        <View style={styles.headerRight}>
          <Award size={20} color="#F59E0B" />
        </View>
      </View>

      {/* Tabs */}
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
          <>
            {/* Enterprise Metrics Grid */}
            <View style={styles.metricsSection}>
              <Text style={styles.sectionTitle}>Enterprise Metrics</Text>
              <View style={styles.metricsGrid}>
                {enterpriseMetrics.map(metric => (
                  <MetricCard key={metric.id} metric={metric} />
                ))}
              </View>
            </View>

            {/* Executive Summary */}
            <View style={[styles.summarySection, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Executive Summary</Text>
              <View style={styles.summaryContent}>
                <View style={styles.summaryItem}>
                  <Activity size={24} color="#10B981" />
                  <View style={styles.summaryInfo}>
                    <Text style={styles.summaryLabel}>Overall Health</Text>
                    <Text style={[styles.summaryValue, { color: '#10B981' }]}>Excellent</Text>
                  </View>
                </View>
                <View style={styles.summaryItem}>
                  <Zap size={24} color="#3B82F6" />
                  <View style={styles.summaryInfo}>
                    <Text style={styles.summaryLabel}>Growth Velocity</Text>
                    <Text style={[styles.summaryValue, { color: '#3B82F6' }]}>Accelerating</Text>
                  </View>
                </View>
                <View style={styles.summaryItem}>
                  <Shield size={24} color="#F59E0B" />
                  <View style={styles.summaryInfo}>
                    <Text style={styles.summaryLabel}>Risk Profile</Text>
                    <Text style={[styles.summaryValue, { color: '#F59E0B' }]}>Low</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Recent Milestones */}
            <View style={styles.milestonesSection}>
              <Text style={styles.sectionTitle}>Recent Milestones</Text>
              <View style={[styles.milestonesList, { backgroundColor: '#0A0F1A' }]}>
                {recentMilestones.map(milestone => (
                  <MilestoneItem key={milestone.id} milestone={milestone} />
                ))}
              </View>
            </View>
          </>
        )}

        {selectedTab === 'performance' && (
          <>
            <View style={styles.metricsSection}>
              <Text style={styles.sectionTitle}>Regional Performance</Text>
              {regionalPerformance.map((region, index) => (
                <RegionalCard key={index} data={region} />
              ))}
            </View>

            <View style={[styles.chartSection, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Revenue Trend</Text>
              <View style={styles.chartPlaceholder}>
                <LineChart size={48} color="#3B82F6" />
                <Text style={styles.chartPlaceholderText}>Interactive Chart</Text>
              </View>
            </View>
          </>
        )}

        {selectedTab === 'initiatives' && (
          <View style={styles.initiativesSection}>
            <Text style={styles.sectionTitle}>Strategic Initiatives</Text>
            {strategicInitiatives.map(initiative => (
              <InitiativeCard key={initiative.id} initiative={initiative} />
            ))}
          </View>
        )}

        {selectedTab === 'global' && (
          <>
            <View style={[styles.mapSection, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Global Operations</Text>
              <View style={styles.mapPlaceholder}>
                <Map size={64} color="#3B82F6" />
                <Text style={styles.mapPlaceholderText}>Interactive Global Map</Text>
                <Text style={styles.mapPlaceholderSubtext}>87 Countries • 126K Employees</Text>
              </View>
            </View>

            <View style={styles.metricsSection}>
              <Text style={styles.sectionTitle}>Regional Breakdown</Text>
              {regionalPerformance.map((region, index) => (
                <RegionalCard key={index} data={region} />
              ))}
            </View>
          </>
        )}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  headerRight: {
    padding: 8,
  },
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
  tabActive: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  metricsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
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
  summarySection: {
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  summaryContent: {
    gap: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  milestonesSection: {
    padding: 20,
  },
  milestonesList: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: 16,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  milestoneIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  milestoneTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  regionalCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  regionName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  regionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  regionMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  regionMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  regionProgressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  regionProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  chartSection: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chartPlaceholder: {
    height: 200,
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
  initiativesSection: {
    padding: 20,
  },
  initiativeCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  initiativeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  initiativeName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  initiativeStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  initiativeStatusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  initiativeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  initiativeProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  initiativeProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  initiativeProgressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  initiativeImpact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  initiativeImpactText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  mapSection: {
    margin: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  mapPlaceholder: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 12,
  },
  mapPlaceholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF',
    marginTop: 16,
  },
  mapPlaceholderSubtext: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 4,
  },
});
