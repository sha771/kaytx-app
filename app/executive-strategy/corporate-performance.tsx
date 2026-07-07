import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  ArrowLeft,
  Activity,
  Award,
  Building2,
  Users,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Minus,
  PieChart,
  LineChart
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface BusinessUnit {
  id: string;
  name: string;
  revenue: string;
  growth: string;
  margin: string;
  performance: 'excellent' | 'good' | 'fair' | 'poor';
}

interface StrategicObjective {
  id: string;
  name: string;
  owner: string;
  progress: number;
  status: 'on-track' | 'ahead' | 'behind';
  impact: string;
}

const businessUnits: BusinessUnit[] = [
  { id: '1', name: 'Technology Solutions', revenue: '$12.4B', growth: '+18.5%', margin: '32.4%', performance: 'excellent' },
  { id: '2', name: 'Financial Services', revenue: '$8.2B', growth: '+12.3%', margin: '28.7%', performance: 'excellent' },
  { id: '3', name: 'Healthcare Systems', revenue: '$4.8B', growth: '+15.2%', margin: '24.1%', performance: 'good' },
  { id: '4', name: 'Industrial Automation', revenue: '$2.1B', growth: '+8.7%', margin: '19.8%', performance: 'good' },
  { id: '5', name: 'Consumer Electronics', revenue: '$0.9B', growth: '-2.3%', margin: '12.4%', performance: 'fair' }
];

const strategicObjectives: StrategicObjective[] = [
  { id: '1', name: 'Revenue Growth 15%', owner: 'CEO', progress: 87, status: 'ahead', impact: '$4.2B' },
  { id: '2', name: 'Margin Expansion 3%', owner: 'CFO', progress: 72, status: 'on-track', impact: '$0.8B' },
  { id: '3', name: 'Market Share +5%', owner: 'CMO', progress: 65, status: 'on-track', impact: '$1.4B' },
  { id: '4', name: 'Customer Satisfaction 90%', owner: 'CCO', progress: 82, status: 'ahead', impact: '$0.6B' },
  { id: '5', name: 'Employee Engagement 85%', owner: 'CHRO', progress: 58, status: 'behind', impact: '$0.3B' }
];

const okrData = [
  { category: 'Revenue', objective: 'Achieve $32B ARR', keyResult: 'Q4: $8.2B', progress: 94, status: 'ahead' },
  { category: 'Growth', objective: 'Expand to 12 new markets', keyResult: 'Q4: 3 markets', progress: 78, status: 'on-track' },
  { category: 'Efficiency', objective: 'Reduce OpEx by 10%', keyResult: 'Q4: 8% reduction', progress: 85, status: 'ahead' },
  { category: 'Innovation', objective: 'Launch 8 new products', keyResult: 'Q4: 3 products', progress: 67, status: 'on-track' },
  { category: 'Talent', objective: 'Hire 15,000 employees', keyResult: 'Q4: 4,000 hires', progress: 52, status: 'behind' }
];

export default function CorporatePerformance() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'units' | 'objectives' | 'okrs' | 'analytics'>('units');

  const tabs = [
    { id: 'units', label: 'Business Units', icon: Building2 },
    { id: 'objectives', label: 'Strategic Objectives', icon: Target },
    { id: 'okrs', label: 'OKRs', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return '#10B981';
      case 'good': return '#3B82F6';
      case 'fair': return '#F59E0B';
      default: return '#EF4444';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return '#10B981';
      case 'on-track': return '#3B82F6';
      default: return '#EF4444';
    }
  };

  const BusinessUnitCard = ({ unit }: { unit: BusinessUnit }) => (
    <View style={[styles.buCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.buHeader}>
        <Text style={styles.buName}>{unit.name}</Text>
        <View style={[styles.buPerformance, { backgroundColor: `${getPerformanceColor(unit.performance)}20` }]}>
          <Text style={[styles.buPerformanceText, { color: getPerformanceColor(unit.performance) }]}>
            {unit.performance.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.buMetrics}>
        <View style={styles.buMetric}>
          <DollarSign size={16} color="#9CA3AF" />
          <Text style={styles.buMetricLabel}>Revenue</Text>
          <Text style={[styles.buMetricValue, { color: '#10B981' }]}>{unit.revenue}</Text>
        </View>
        <View style={styles.buMetric}>
          <TrendingUp size={16} color="#9CA3AF" />
          <Text style={styles.buMetricLabel}>Growth</Text>
          <Text style={[styles.buMetricValue, { color: '#3B82F6' }]}>{unit.growth}</Text>
        </View>
        <View style={styles.buMetric}>
          <Activity size={16} color="#9CA3AF" />
          <Text style={styles.buMetricLabel}>Margin</Text>
          <Text style={[styles.buMetricValue, { color: '#8B5CF6' }]}>{unit.margin}</Text>
        </View>
      </View>
    </View>
  );

  const ObjectiveCard = ({ objective }: { objective: StrategicObjective }) => (
    <View style={[styles.objCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.objHeader}>
        <Text style={styles.objName}>{objective.name}</Text>
        <View style={[styles.objStatus, { backgroundColor: `${getStatusColor(objective.status)}20` }]}>
          <Text style={[styles.objStatusText, { color: getStatusColor(objective.status) }]}>
            {objective.status.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.objMeta}>
        <Users size={14} color="#9CA3AF" />
        <Text style={styles.objOwner}>{objective.owner}</Text>
        <Award size={14} color="#F59E0B" />
        <Text style={styles.objImpact}>{objective.impact}</Text>
      </View>
      <View style={styles.objProgress}>
        <View style={styles.objProgressBar}>
          <View style={[styles.objProgressFill, { width: `${objective.progress}%`, backgroundColor: getStatusColor(objective.status) }]} />
        </View>
        <Text style={styles.objProgressText}>{objective.progress}%</Text>
      </View>
    </View>
  );

  const OKRCard = ({ okr }: { okr: any }) => (
    <View style={[styles.okrCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.okrCategory}>
        <Text style={styles.okrCategoryText}>{okr.category}</Text>
      </View>
      <Text style={styles.okrObjective}>{okr.objective}</Text>
      <View style={styles.okrKeyResult}>
        <Target size={14} color="#9CA3AF" />
        <Text style={styles.okrKeyResultText}>{okr.keyResult}</Text>
      </View>
      <View style={styles.okrProgress}>
        <View style={styles.okrProgressBar}>
          <View style={[styles.okrProgressFill, { width: `${okr.progress}%`, backgroundColor: getStatusColor(okr.status) }]} />
        </View>
        <Text style={styles.okrProgressText}>{okr.progress}%</Text>
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
          <Text style={styles.headerTitle}>Corporate Performance</Text>
          <Text style={styles.headerSubtitle}>Business Unit & Strategic Tracking</Text>
        </View>
        <BarChart3 size={20} color="#3B82F6" />
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
        {selectedTab === 'units' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Unit Performance</Text>
            {businessUnits.map(unit => (
              <BusinessUnitCard key={unit.id} unit={unit} />
            ))}
          </View>
        )}

        {selectedTab === 'objectives' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Strategic Objectives</Text>
            {strategicObjectives.map(objective => (
              <ObjectiveCard key={objective.id} objective={objective} />
            ))}
          </View>
        )}

        {selectedTab === 'okrs' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>OKRs</Text>
            {okrData.map(okr => (
              <OKRCard key={okr.category} okr={okr} />
            ))}
          </View>
        )}

        {selectedTab === 'analytics' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Performance Analytics</Text>
            
            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.chartTitle}>Revenue by Business Unit</Text>
              <View style={styles.chartPlaceholder}>
                <PieChart size={48} color="#3B82F6" />
                <Text style={styles.chartPlaceholderText}>Interactive Chart</Text>
              </View>
            </View>

            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.chartTitle}>Performance Trend</Text>
              <View style={styles.chartPlaceholder}>
                <LineChart size={48} color="#10B981" />
                <Text style={styles.chartPlaceholderText}>Interactive Chart</Text>
              </View>
            </View>

            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.chartTitle}>Profitability Heatmap</Text>
              <View style={styles.chartPlaceholder}>
                <BarChart3 size={48} color="#8B5CF6" />
                <Text style={styles.chartPlaceholderText}>Interactive Heatmap</Text>
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
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 16, letterSpacing: -0.5 },
  buCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  buHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  buName: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  buPerformance: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  buPerformanceText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  buMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buMetric: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  buMetricLabel: { fontSize: 11, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.5 },
  buMetricValue: { fontSize: 16, fontWeight: '700' },
  objCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  objHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  objName: { fontSize: 15, fontWeight: '600', color: '#FFFFFF', flex: 1 },
  objStatus: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  objStatusText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  objMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  objOwner: { fontSize: 12, color: '#9CA3AF' },
  objImpact: { fontSize: 12, color: '#F59E0B', fontWeight: '600' },
  objProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  objProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  objProgressFill: { height: '100%', borderRadius: 3 },
  objProgressText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  okrCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  okrCategory: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    marginBottom: 12,
  },
  okrCategoryText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.5 },
  okrObjective: { fontSize: 15, fontWeight: '600', color: '#FFFFFF', marginBottom: 8 },
  okrKeyResult: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  okrKeyResultText: { fontSize: 13, color: '#9CA3AF', flex: 1 },
  okrProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  okrProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  okrProgressFill: { height: '100%', borderRadius: 3 },
  okrProgressText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  chartCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chartTitle: { fontSize: 15, fontWeight: '600', color: '#FFFFFF', marginBottom: 16 },
  chartPlaceholder: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 12,
  },
  chartPlaceholderText: { fontSize: 14, color: '#9CA3AF', marginTop: 12 },
});
