import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Globe, 
  Map, 
  ArrowLeft,
  Activity,
  Target,
  BarChart3,
  DollarSign,
  Building2,
  TrendingUp,
  Users,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface GlobalMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

const globalMetrics: GlobalMetric[] = [
  { id: '1', label: 'Global Revenue', value: '$28.4B', change: '+12.5%', trend: 'up' },
  { id: '2', label: 'Enterprise Value', value: '$185B', change: '+18.7%', trend: 'up' },
  { id: '3', label: 'Global Offices', value: '67', change: '+4', trend: 'up' },
  { id: '4', label: 'Countries', value: '87', change: '+3', trend: 'up' },
  { id: '5', label: 'Strategic Investments', value: '$4.8B', change: '+22.4%', trend: 'up' },
  { id: '6', label: 'Market Expansion', value: '12', change: '+2', trend: 'up' }
];

const regionalPerformance = [
  { region: 'North America', revenue: '$12.4B', growth: '+8.5%', share: '43.7%', offices: 24 },
  { region: 'Europe', revenue: '$8.2B', growth: '+12.3%', share: '28.9%', offices: 18 },
  { region: 'Asia Pacific', revenue: '$5.8B', growth: '+18.7%', share: '20.4%', offices: 15 },
  { region: 'Latin America', revenue: '$1.4B', growth: '+15.2%', share: '4.9%', offices: 6 },
  { region: 'Middle East & Africa', revenue: '$0.6B', growth: '+22.1%', share: '2.1%', offices: 4 }
];

const businessUnits = [
  { unit: 'Technology Solutions', revenue: '$12.4B', growth: '+18.5%', regions: 45 },
  { unit: 'Financial Services', revenue: '$8.2B', growth: '+12.3%', regions: 32 },
  { unit: 'Healthcare Systems', revenue: '$4.8B', growth: '+15.2%', regions: 28 },
  { unit: 'Industrial Automation', revenue: '$2.1B', growth: '+8.7%', regions: 18 },
  { unit: 'Consumer Electronics', revenue: '$0.9B', growth: '-2.3%', regions: 12 }
];

const expansionProjects = [
  { project: 'Southeast Asia Expansion', progress: 78, investment: '$480M', timeline: '18 months' },
  { project: 'European Growth Initiative', progress: 65, investment: '$320M', timeline: '24 months' },
  { project: 'Latin America Market Entry', progress: 42, investment: '$240M', timeline: '36 months' },
  { project: 'Africa Strategic Partnership', progress: 28, investment: '$160M', timeline: '48 months' }
];

export default function GlobalCommandCenter() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'regions' | 'units' | 'expansion'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'regions', label: 'Regions', icon: Globe },
    { id: 'units', label: 'Business Units', icon: Building2 },
    { id: 'expansion', label: 'Expansion', icon: Target }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp size={14} color="#10B981" />;
      case 'down': return <ArrowDown size={14} color="#EF4444" />;
      default: return <Minus size={14} color="#6B7280" />;
    }
  };

  const MetricCard = ({ metric }: { metric: GlobalMetric }) => (
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

  const RegionalCard = ({ data }: { data: any }) => (
    <View style={[styles.regionalCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.regionName}>{data.region}</Text>
      <View style={styles.regionalMetrics}>
        <View style={styles.regionalMetric}>
          <DollarSign size={16} color="#9CA3AF" />
          <Text style={styles.regionalMetricLabel}>Revenue</Text>
          <Text style={[styles.regionalMetricValue, { color: '#10B981' }]}>{data.revenue}</Text>
        </View>
        <View style={styles.regionalMetric}>
          <TrendingUp size={16} color="#9CA3AF" />
          <Text style={styles.regionalMetricLabel}>Growth</Text>
          <Text style={[styles.regionalMetricValue, { color: '#3B82F6' }]}>{data.growth}</Text>
        </View>
        <View style={styles.regionalMetric}>
          <Map size={16} color="#9CA3AF" />
          <Text style={styles.regionalMetricLabel}>Offices</Text>
          <Text style={[styles.regionalMetricValue, { color: '#8B5CF6' }]}>{data.offices}</Text>
        </View>
      </View>
      <View style={styles.regionalShare}>
        <Text style={styles.regionalShareLabel}>Global Share</Text>
        <View style={styles.regionalShareBar}>
          <View style={[styles.regionalShareFill, { width: data.share, backgroundColor: '#06B6D4' }]} />
        </View>
        <Text style={styles.regionalShareValue}>{data.share}</Text>
      </View>
    </View>
  );

  const BusinessUnitCard = ({ unit }: { unit: any }) => (
    <View style={[styles.unitCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.unitName}>{unit.unit}</Text>
      <View style={styles.unitMetrics}>
        <View style={styles.unitMetric}>
          <DollarSign size={16} color="#9CA3AF" />
          <Text style={styles.unitMetricLabel}>Revenue</Text>
          <Text style={[styles.unitMetricValue, { color: '#10B981' }]}>{unit.revenue}</Text>
        </View>
        <View style={styles.unitMetric}>
          <TrendingUp size={16} color="#9CA3AF" />
          <Text style={styles.unitMetricLabel}>Growth</Text>
          <Text style={[styles.unitMetricValue, { color: unit.growth.includes('+') ? '#10B981' : '#EF4444' }]}>{unit.growth}</Text>
        </View>
        <View style={styles.unitMetric}>
          <Globe size={16} color="#9CA3AF" />
          <Text style={styles.unitMetricLabel}>Regions</Text>
          <Text style={[styles.unitMetricValue, { color: '#8B5CF6' }]}>{unit.regions}</Text>
        </View>
      </View>
    </View>
  );

  const ExpansionCard = ({ project }: { project: any }) => (
    <View style={[styles.expansionCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.expansionProject}>{project.project}</Text>
      <View style={styles.expansionProgress}>
        <View style={styles.expansionProgressBar}>
          <View style={[styles.expansionProgressFill, { width: `${project.progress}%`, backgroundColor: '#10B981' }]} />
        </View>
        <Text style={styles.expansionProgressText}>{project.progress}%</Text>
      </View>
      <View style={styles.expansionMeta}>
        <View style={styles.expansionMetaItem}>
          <DollarSign size={14} color="#9CA3AF" />
          <Text style={styles.expansionMetaText}>{project.investment}</Text>
        </View>
        <View style={styles.expansionMetaItem}>
          <Target size={14} color="#9CA3AF" />
          <Text style={styles.expansionMetaText}>{project.timeline}</Text>
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
          <Text style={styles.headerTitle}>Global Enterprise Command</Text>
          <Text style={styles.headerSubtitle}>Worldwide Operations Intelligence</Text>
        </View>
        <Globe size={20} color="#06B6D4" />
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
          <>
            <View style={styles.metricsSection}>
              <Text style={styles.sectionTitle}>Global Enterprise Metrics</Text>
              <View style={styles.metricsGrid}>
                {globalMetrics.map(metric => (
                  <MetricCard key={metric.id} metric={metric} />
                ))}
              </View>
            </View>

            <View style={[styles.mapCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Global Enterprise Map</Text>
              <View style={styles.mapPlaceholder}>
                <Map size={64} color="#3B82F6" />
                <Text style={styles.mapPlaceholderText}>Interactive Global Map</Text>
                <Text style={styles.mapPlaceholderSubtext}>87 Countries • 67 Offices • 126K Employees</Text>
              </View>
            </View>
          </>
        )}

        {selectedTab === 'regions' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Regional Performance</Text>
            {regionalPerformance.map((data, index) => (
              <RegionalCard key={index} data={data} />
            ))}
          </View>
        )}

        {selectedTab === 'units' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Unit Performance</Text>
            {businessUnits.map((unit, index) => (
              <BusinessUnitCard key={index} unit={unit} />
            ))}
          </View>
        )}

        {selectedTab === 'expansion' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Global Expansion Projects</Text>
            {expansionProjects.map((project, index) => (
              <ExpansionCard key={index} project={project} />
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
  mapCard: {
    margin: 20,
    marginTop: 0,
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
  regionalCard: {
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
  regionalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  regionalMetric: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  regionalMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  regionalMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  regionalShare: {
    marginTop: 8,
  },
  regionalShareLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  regionalShareBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 4,
    overflow: 'hidden',
  },
  regionalShareFill: {
    height: '100%',
    borderRadius: 2,
  },
  regionalShareValue: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  unitCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  unitName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  unitMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  unitMetric: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  unitMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  unitMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  expansionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  expansionProject: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  expansionProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  expansionProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  expansionProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  expansionProgressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  expansionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expansionMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  expansionMetaText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
