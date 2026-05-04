import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, BarChart3, LineChart, PieChart, TrendingUp, Clock,
  Activity, Users, Target, Zap, ArrowRight, ActivitySquare
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

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

export default function AnalyticsIndexScreen() {
  const { theme } = useTheme();
  const router = useRouter();

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
  aiCard: { marginHorizontal: 16, marginBottom: 30, padding: 20, borderRadius: 16 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  aiTitle: { fontSize: 17, fontWeight: '700' },
  aiDesc: { fontSize: 14, lineHeight: 20, marginBottom: 14 },
  aiFeatures: { gap: 8 },
  aiFeature: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  aiDot: { width: 8, height: 8, borderRadius: 4 },
  aiFeatureText: { fontSize: 13 },
});
