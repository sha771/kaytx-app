import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, BarChart3, LineChart, PieChart, TrendingUp, Clock,
  Activity, Users, Target, Zap, ArrowRight, ActivitySquare, ChartLine
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LineChart as RNLineChart, BarChart as RNBarChart, PieChart as RNPieChart } from 'react-native-chart-kit';

const ANALYTICS_MODULES = [
  {
    id: 'real-time',
    name: 'Real-Time Analytics',
    description: 'Live data tracking with instant insights',
    icon: Activity,
    color: '#3B82F6',
    route: '/ai-agent/analytics/real-time',
    stats: '2.4K active users now'
  },
  {
    id: 'funnel',
    name: 'Funnel Analysis',
    description: 'Conversion tracking and drop-off analysis',
    icon: Target,
    color: '#8B5CF6',
    route: '/ai-agent/analytics/funnel',
    stats: '24.8% conversion rate'
  },
  {
    id: 'cohort',
    name: 'Cohort Analysis',
    description: 'User retention and behavior patterns',
    icon: Users,
    color: '#10B981',
    route: '/ai-agent/analytics/cohort',
    stats: '68.4% avg retention'
  },
  {
    id: 'attribution',
    name: 'Attribution Analysis',
    description: 'Channel performance and touchpoint tracking',
    icon: PieChart,
    color: '#F59E0B',
    route: '/ai-agent/analytics/attribution',
    stats: '32% from organic search'
  },
];

const QUICK_STATS = [
  { label: 'Active Users', value: '12.5K', change: '+8.4%', icon: Users },
  { label: 'Avg Session', value: '6m 42s', change: '+12%', icon: Clock },
  { label: 'Conversion', value: '3.24%', change: '+0.4%', icon: TrendingUp },
  { label: 'Revenue', value: '$124K', change: '+18%', icon: BarChart3 },
];

// Chart Data
const USER_ENGAGEMENT_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [8500, 9200, 8800, 10500, 11200, 7800, 9500],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const CONVERSION_FUNNEL_DATA = {
  labels: ['Visit', 'Sign Up', 'Activate', 'Purchase', 'Return'],
  datasets: [
    {
      data: [10000, 6500, 4200, 2800, 1900],
    },
  ],
};

const CHANNEL_ATTRIBUTION_DATA = [
  {
    name: 'Organic',
    population: 32,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Direct',
    population: 28,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Social',
    population: 22,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Paid',
    population: 18,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const RETENTION_RATE_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [68, 72, 70, 75, 78, 82],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const SESSION_DURATION_DATA = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [420, 480, 450, 520, 490, 380, 360],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const USER_SEGMENTATION_DATA = [
  {
    name: 'Enterprise',
    population: 35,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'SMB',
    population: 40,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Startup',
    population: 15,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Individual',
    population: 10,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const FEATURE_ADOPTION_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [25, 35, 42, 55, 68, 75],
      color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const CHURN_RATE_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [3.2, 2.8, 2.5, 2.1],
      color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const DEVICE_USAGE_DATA = [
  {
    name: 'Mobile',
    population: 55,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Desktop',
    population: 30,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Tablet',
    population: 15,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const REVENUE_GROWTH_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [120, 135, 148, 162, 185, 210],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const USER_RETENTION_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [78, 82, 85, 88],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const GEOGRAPHIC_DISTRIBUTION_DATA = [
  {
    name: 'North America',
    population: 35,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Europe',
    population: 28,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Asia',
    population: 22,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Other',
    population: 15,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const FEATURE_USAGE_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [1200, 1350, 1480, 1620, 1750, 1900],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const DEVICE_DISTRIBUTION_DATA = [
  {
    name: 'Desktop',
    population: 45,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Mobile',
    population: 35,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Tablet',
    population: 20,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

const USER_BEHAVIOR_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [1250, 1380, 1520, 1650, 1780, 1920],
      color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const ENGAGEMENT_SCORE_DATA = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      data: [72, 78, 82, 88],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const TRAFFIC_SOURCE_DATA = [
  {
    name: 'Organic',
    population: 40,
    color: '#10B981',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Direct',
    population: 25,
    color: '#3B82F6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Referral',
    population: 20,
    color: '#F59E0B',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
  {
    name: 'Social',
    population: 15,
    color: '#8B5CF6',
    legendFontColor: '#fff',
    legendFontSize: 12,
  },
];

export default function AnalyticsIndexScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;

  const renderLineChart = (data: any, title: string, color: string) => (
    <Animated.View entering={FadeInUp} style={[styles.chartContainer, { backgroundColor: theme.colors.card }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: theme.colors.text }]}>{title}</Text>
        <TouchableOpacity>
          <ChartLine size={18} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <RNLineChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={{
          backgroundColor: theme.colors.card,
          backgroundGradientFrom: theme.colors.card,
          backgroundGradientTo: theme.colors.card,
          decimalPlaces: 0,
          color: (opacity = 1) => color,
          labelColor: theme.colors.textSecondary,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '4',
            strokeWidth: '2',
            stroke: color,
          },
        }}
        bezier
        style={styles.chart}
      />
    </Animated.View>
  );

  const renderBarChart = (data: any, title: string) => (
    <Animated.View entering={FadeInUp} style={[styles.chartContainer, { backgroundColor: theme.colors.card }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: theme.colors.text }]}>{title}</Text>
        <TouchableOpacity>
          <BarChart3 size={18} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <RNBarChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={{
          backgroundColor: theme.colors.card,
          backgroundGradientFrom: theme.colors.card,
          backgroundGradientTo: theme.colors.card,
          decimalPlaces: 0,
          color: (opacity = 1) => theme.colors.primary,
          labelColor: theme.colors.textSecondary,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />
    </Animated.View>
  );

  const renderPieChart = (data: any, title: string) => (
    <Animated.View entering={FadeInUp} style={[styles.chartContainer, { backgroundColor: theme.colors.card }]}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: theme.colors.text }]}>{title}</Text>
        <TouchableOpacity>
          <PieChart size={18} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <RNPieChart
        data={data}
        width={screenWidth - 64}
        height={200}
        chartConfig={{
          backgroundColor: theme.colors.card,
          backgroundGradientFrom: theme.colors.card,
          backgroundGradientTo: theme.colors.card,
          color: (opacity = 1) => theme.colors.primary,
          labelColor: theme.colors.textSecondary,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />
    </Animated.View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Analytics & Insights
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Data-driven decision making
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          {QUICK_STATS.map((stat, i) => (
            <Animated.View
              key={stat.label}
              entering={FadeInUp.delay(i * 50)}
              style={[styles.statCard, { backgroundColor: theme.colors.background }]}
            >
              <stat.icon size={18} color={theme.colors.primary} />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statChange, { color: '#10B981' }]}>{stat.change}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Analytics Modules */}
      <View style={styles.modulesContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Analytics Modules
        </Text>
        {ANALYTICS_MODULES.map((module, i) => (
          <Animated.View key={module.id} entering={FadeInUp.delay(i * 50)}>
            <TouchableOpacity
              style={[styles.moduleCard, { backgroundColor: theme.colors.card }]}
              onPress={() => router.push(module.route)}
            >
              <View style={[styles.moduleIcon, { backgroundColor: module.color + '15' }]}>
                <module.icon size={28} color={module.color} />
              </View>
              <View style={styles.moduleContent}>
                <Text style={[styles.moduleName, { color: theme.colors.text }]}>
                  {module.name}
                </Text>
                <Text style={[styles.moduleDesc, { color: theme.colors.textSecondary }]}>
                  {module.description}
                </Text>
                <View style={styles.moduleStats}>
                  <ActivitySquare size={14} color={module.color} />
                  <Text style={[styles.statsText, { color: module.color }]}>
                    {module.stats}
                  </Text>
                </View>
              </View>
              <ArrowRight size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Charts Section */}
      <View style={styles.chartsContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Performance Overview
        </Text>
        {renderLineChart(USER_ENGAGEMENT_DATA, 'User Engagement (7 Days)', '#3B82F6')}
        {renderBarChart(CONVERSION_FUNNEL_DATA, 'Conversion Funnel')}
        {renderPieChart(CHANNEL_ATTRIBUTION_DATA, 'Channel Attribution')}
        {renderLineChart(RETENTION_RATE_DATA, 'Retention Rate (6 Months)', '#10B981')}
        {renderLineChart(SESSION_DURATION_DATA, 'Session Duration (Seconds)', '#3B82F6')}
        {renderPieChart(USER_SEGMENTATION_DATA, 'User Segmentation')}
        {renderLineChart(FEATURE_ADOPTION_DATA, 'Feature Adoption (6 Months)', '#8B5CF6')}
        {renderLineChart(CHURN_RATE_DATA, 'Churn Rate (Quarterly)', '#EF4444')}
        {renderPieChart(DEVICE_USAGE_DATA, 'Device Usage')}
        {renderLineChart(REVENUE_GROWTH_DATA, 'Revenue Growth (6 Months)', '#10B981')}
        {renderLineChart(USER_RETENTION_DATA, 'User Retention (Quarterly)', '#3B82F6')}
        {renderPieChart(GEOGRAPHIC_DISTRIBUTION_DATA, 'Geographic Distribution')}
        {renderLineChart(FEATURE_USAGE_DATA, 'Feature Usage (6 Months)', '#10B981')}
        {renderLineChart(CONVERSION_FUNNEL_DATA, 'Conversion Funnel (Quarterly)', '#3B82F6')}
        {renderPieChart(DEVICE_DISTRIBUTION_DATA, 'Device Distribution')}
        {renderLineChart(USER_BEHAVIOR_DATA, 'User Behavior (6 Months)', '#10B981')}
        {renderLineChart(ENGAGEMENT_SCORE_DATA, 'Engagement Score (Quarterly)', '#3B82F6')}
        {renderPieChart(TRAFFIC_SOURCE_DATA, 'Traffic Source Distribution')}
      </View>

      {/* AI Insights Card */}
      <View style={[styles.aiCard, { backgroundColor: theme.colors.card }]}>
        <View style={styles.aiHeader}>
          <Zap size={24} color="#8B5CF6" />
          <Text style={[styles.aiTitle, { color: theme.colors.text }]}>
            AI-Powered Insights
          </Text>
        </View>
        <Text style={[styles.aiDesc, { color: theme.colors.textSecondary }]}>
          Our AI analyzes your data to uncover hidden patterns, predict trends, and recommend actions to optimize performance.
        </Text>
        <View style={styles.aiFeatures}>
          <View style={styles.aiFeature}>
            <View style={[styles.aiDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={[styles.aiFeatureText, { color: theme.colors.textSecondary }]}>
              Automated anomaly detection
            </Text>
          </View>
          <View style={styles.aiFeature}>
            <View style={[styles.aiDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.aiFeatureText, { color: theme.colors.textSecondary }]}>
              Predictive trend analysis
            </Text>
          </View>
          <View style={styles.aiFeature}>
            <View style={[styles.aiDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.aiFeatureText, { color: theme.colors.textSecondary }]}>
              Smart recommendations
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12 },
  statValue: { fontSize: 16, fontWeight: '700', marginTop: 6, marginBottom: 2 },
  statChange: { fontSize: 11, fontWeight: '600', marginBottom: 2 },
  statLabel: { fontSize: 10 },
  modulesContainer: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  moduleCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 12 },
  moduleIcon: { width: 56, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  moduleContent: { flex: 1 },
  moduleName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  moduleDesc: { fontSize: 13, marginBottom: 6 },
  moduleStats: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statsText: { fontSize: 12, fontWeight: '600' },
  chartsContainer: { padding: 16, paddingBottom: 20 },
  chartContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  chart: {
    borderRadius: 16,
  },
  aiCard: { marginHorizontal: 16, marginBottom: 30, padding: 20, borderRadius: 16 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  aiTitle: { fontSize: 17, fontWeight: '700' },
  aiDesc: { fontSize: 14, lineHeight: 20, marginBottom: 14 },
  aiFeatures: { gap: 8 },
  aiFeature: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  aiDot: { width: 8, height: 8, borderRadius: 4 },
  aiFeatureText: { fontSize: 13 },
});
