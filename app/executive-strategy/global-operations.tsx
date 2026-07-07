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
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface RegionalMetric {
  id: string;
  region: string;
  revenue: string;
  growth: string;
  employees: string;
  offices: number;
}

const regionalMetrics: RegionalMetric[] = [
  { id: '1', region: 'North America', revenue: '$12.4B', growth: '+8.5%', employees: '54,000', offices: 24 },
  { id: '2', region: 'Europe', revenue: '$8.2B', growth: '+12.3%', employees: '32,000', offices: 18 },
  { id: '3', region: 'Asia Pacific', revenue: '$5.8B', growth: '+18.7%', employees: '28,000', offices: 15 },
  { id: '4', region: 'Latin America', revenue: '$1.4B', growth: '+15.2%', employees: '8,000', offices: 6 },
  { id: '5', region: 'Middle East & Africa', revenue: '$0.6B', growth: '+22.1%', employees: '4,000', offices: 4 }
];

const expansionProjects = [
  { project: 'Southeast Asia Expansion', progress: 78, investment: '$480M', timeline: '18 months' },
  { project: 'European Growth Initiative', progress: 65, investment: '$320M', timeline: '24 months' },
  { project: 'Latin America Market Entry', progress: 42, investment: '$240M', timeline: '36 months' },
  { project: 'Africa Strategic Partnership', progress: 28, investment: '$160M', timeline: '48 months' }
];

const supplyChainHealth = [
  { region: 'North America', status: 'Optimal', score: 94 },
  { region: 'Europe', status: 'Good', score: 87 },
  { region: 'Asia Pacific', status: 'Good', score: 82 },
  { region: 'Latin America', status: 'Fair', score: 76 },
  { region: 'Middle East & Africa', status: 'Fair', score: 71 }
];

export default function GlobalOperations() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'regions' | 'expansion' | 'supply'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'regions', label: 'Regions', icon: Globe },
    { id: 'expansion', label: 'Expansion', icon: Target },
    { id: 'supply', label: 'Supply Chain', icon: Building2 }
  ];

  const RegionalCard = ({ metric }: { metric: RegionalMetric }) => (
    <View style={[styles.regionalCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.regionName}>{metric.region}</Text>
      <View style={styles.regionalMetrics}>
        <View style={styles.regionalMetric}>
          <DollarSign size={16} color="#9CA3AF" />
          <Text style={styles.regionalMetricLabel}>Revenue</Text>
          <Text style={[styles.regionalMetricValue, { color: '#10B981' }]}>{metric.revenue}</Text>
        </View>
        <View style={styles.regionalMetric}>
          <TrendingUp size={16} color="#9CA3AF" />
          <Text style={styles.regionalMetricLabel}>Growth</Text>
          <Text style={[styles.regionalMetricValue, { color: '#3B82F6' }]}>{metric.growth}</Text>
        </View>
        <View style={styles.regionalMetric}>
          <Building2 size={16} color="#9CA3AF" />
          <Text style={styles.regionalMetricLabel}>Employees</Text>
          <Text style={[styles.regionalMetricValue, { color: '#8B5CF6' }]}>{metric.employees}</Text>
        </View>
      </View>
      <View style={styles.regionalOffices}>
        <Map size={14} color="#9CA3AF" />
        <Text style={styles.regionalOfficesText}>{metric.offices} Offices</Text>
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

  const SupplyCard = ({ supply }: { supply: any }) => (
    <View style={[styles.supplyCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.supplyRegion}>{supply.region}</Text>
      <View style={[styles.supplyStatus, { backgroundColor: supply.score >= 90 ? 'rgba(16, 185, 129, 0.2)' : supply.score >= 80 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(245, 158, 11, 0.2)' }]}>
        <Text style={[styles.supplyStatusText, { color: supply.score >= 90 ? '#10B981' : supply.score >= 80 ? '#3B82F6' : '#F59E0B' }]}>
          {supply.status}
        </Text>
      </View>
      <View style={styles.supplyScore}>
        <Text style={styles.supplyScoreLabel}>Health Score</Text>
        <Text style={[styles.supplyScoreValue, { color: supply.score >= 90 ? '#10B981' : supply.score >= 80 ? '#3B82F6' : '#F59E0B' }]}>
          {supply.score}/100
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
          <Text style={styles.headerTitle}>Global Operations</Text>
          <Text style={styles.headerSubtitle}>International Business Intelligence</Text>
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
            <View style={styles.summarySection}>
              <View style={[styles.summaryCard, { backgroundColor: '#0A0F1A' }]}>
                <Globe size={32} color="#06B6D4" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryValue}>87</Text>
                  <Text style={styles.summaryLabel}>Countries</Text>
                </View>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: '#0A0F1A' }]}>
                <Building2 size={32} color="#10B981" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryValue}>67</Text>
                  <Text style={styles.summaryLabel}>Offices</Text>
                </View>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: '#0A0F1A' }]}>
                <DollarSign size={32} color="#F59E0B" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryValue}>+$1.2B</Text>
                  <Text style={styles.summaryLabel}>Investment</Text>
                </View>
              </View>
            </View>

            <View style={[styles.mapCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Global Operations Map</Text>
              <View style={styles.mapPlaceholder}>
                <Map size={64} color="#3B82F6" />
                <Text style={styles.mapPlaceholderText}>Interactive Global Map</Text>
                <Text style={styles.mapPlaceholderSubtext}>87 Countries • 67 Offices</Text>
              </View>
            </View>
          </>
        )}

        {selectedTab === 'regions' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Regional Performance</Text>
            {regionalMetrics.map(metric => (
              <RegionalCard key={metric.id} metric={metric} />
            ))}
          </View>
        )}

        {selectedTab === 'expansion' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expansion Projects</Text>
            {expansionProjects.map((project, index) => (
              <ExpansionCard key={index} project={project} />
            ))}
          </View>
        )}

        {selectedTab === 'supply' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Supply Chain Health</Text>
            {supplyChainHealth.map((supply, index) => (
              <SupplyCard key={index} supply={supply} />
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
  summarySection: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  summaryInfo: { flex: 1 },
  summaryValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
  regionalOffices: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  regionalOfficesText: {
    fontSize: 12,
    color: '#9CA3AF',
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
  supplyCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  supplyRegion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  supplyStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  supplyStatusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  supplyScore: {
    alignItems: 'center',
  },
  supplyScoreLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  supplyScoreValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});
