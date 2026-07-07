import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Globe, 
  TrendingUp, 
  ArrowLeft,
  Activity,
  Users,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  AlertTriangle,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
  MapPin,
  Search
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Competitor {
  id: string;
  name: string;
  marketShare: string;
  revenue: string;
  growth: string;
  threat: 'high' | 'medium' | 'low';
}

interface MarketOpportunity {
  id: string;
  market: string;
  potential: string;
  confidence: number;
  timeline: string;
}

interface IndustryTrend {
  id: string;
  trend: string;
  impact: 'high' | 'medium' | 'low';
  growth: string;
}

const competitors: Competitor[] = [
  { id: '1', name: 'Competitor A', marketShare: '22.4%', revenue: '$18.2B', growth: '+8.5%', threat: 'high' },
  { id: '2', name: 'Competitor B', marketShare: '18.7%', revenue: '$15.4B', growth: '+12.3%', threat: 'high' },
  { id: '3', name: 'Competitor C', marketShare: '14.2%', revenue: '$11.8B', growth: '+6.7%', threat: 'medium' },
  { id: '4', name: 'Competitor D', marketShare: '9.8%', revenue: '$8.2B', growth: '+15.2%', threat: 'medium' },
  { id: '5', name: 'Competitor E', marketShare: '7.4%', revenue: '$6.2B', growth: '+4.3%', threat: 'low' }
];

const marketOpportunities: MarketOpportunity[] = [
  { id: '1', market: 'Southeast Asia Expansion', potential: '$1.4B', confidence: 87, timeline: '18 months' },
  { id: '2', market: 'Healthcare AI Solutions', potential: '$0.8B', confidence: 92, timeline: '12 months' },
  { id: '3', market: 'Sustainable Technology', potential: '$0.6B', confidence: 78, timeline: '24 months' },
  { id: '4', market: 'Enterprise Security', potential: '$0.5B', confidence: 85, timeline: '15 months' },
  { id: '5', market: 'Digital Payments', potential: '$0.4B', confidence: 73, timeline: '20 months' }
];

const industryTrends: IndustryTrend[] = [
  { id: '1', trend: 'AI-Powered Automation', impact: 'high', growth: '+45.2%' },
  { id: '2', trend: 'Cloud-Native Solutions', impact: 'high', growth: '+32.7%' },
  { id: '3', trend: 'Sustainability Focus', impact: 'high', growth: '+28.4%' },
  { id: '4', trend: 'Edge Computing', impact: 'medium', growth: '+24.1%' },
  { id: '5', trend: 'Quantum Computing', impact: 'medium', growth: '+18.9%' }
];

const customerDemand = [
  { segment: 'Enterprise', demand: 'High', growth: '+22.4%', satisfaction: 92 },
  { segment: 'SMB', demand: 'Medium', growth: '+15.7%', satisfaction: 87 },
  { segment: 'Government', demand: 'High', growth: '+18.2%', satisfaction: 89 },
  { segment: 'Healthcare', demand: 'High', growth: '+25.3%', satisfaction: 94 }
];

export default function MarketIntelligence() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'competitors' | 'opportunities' | 'trends'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'competitors', label: 'Competitors', icon: Users },
    { id: 'opportunities', label: 'Opportunities', icon: Target },
    { id: 'trends', label: 'Trends', icon: TrendingUp }
  ];

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      default: return '#10B981';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      default: return '#10B981';
    }
  };

  const CompetitorCard = ({ competitor }: { competitor: Competitor }) => (
    <View style={[styles.competitorCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.competitorHeader}>
        <Text style={styles.competitorName}>{competitor.name}</Text>
        <View style={[styles.competitorThreat, { backgroundColor: `${getThreatColor(competitor.threat)}20` }]}>
          <Text style={[styles.competitorThreatText, { color: getThreatColor(competitor.threat) }]}>
            {competitor.threat.toUpperCase()} THREAT
          </Text>
        </View>
      </View>
      <View style={styles.competitorMetrics}>
        <View style={styles.competitorMetric}>
          <PieChart size={16} color="#9CA3AF" />
          <Text style={styles.competitorMetricLabel}>Market Share</Text>
          <Text style={[styles.competitorMetricValue, { color: '#3B82F6' }]}>{competitor.marketShare}</Text>
        </View>
        <View style={styles.competitorMetric}>
          <DollarSign size={16} color="#9CA3AF" />
          <Text style={styles.competitorMetricLabel}>Revenue</Text>
          <Text style={[styles.competitorMetricValue, { color: '#10B981' }]}>{competitor.revenue}</Text>
        </View>
        <View style={styles.competitorMetric}>
          <TrendingUp size={16} color="#9CA3AF" />
          <Text style={styles.competitorMetricLabel}>Growth</Text>
          <Text style={[styles.competitorMetricValue, { color: '#8B5CF6' }]}>{competitor.growth}</Text>
        </View>
      </View>
    </View>
  );

  const OpportunityCard = ({ opportunity }: { opportunity: MarketOpportunity }) => (
    <View style={[styles.opportunityCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.opportunityHeader}>
        <Target size={20} color="#10B981" />
        <Text style={styles.opportunityMarket}>{opportunity.market}</Text>
      </View>
      <View style={styles.opportunityMetrics}>
        <View>
          <Text style={styles.opportunityMetricLabel}>Potential</Text>
          <Text style={[styles.opportunityMetricValue, { color: '#10B981' }]}>{opportunity.potential}</Text>
        </View>
        <View>
          <Text style={styles.opportunityMetricLabel}>Confidence</Text>
          <Text style={[styles.opportunityMetricValue, { color: '#3B82F6' }]}>{opportunity.confidence}%</Text>
        </View>
        <View>
          <Text style={styles.opportunityMetricLabel}>Timeline</Text>
          <Text style={[styles.opportunityMetricValue, { color: '#8B5CF6' }]}>{opportunity.timeline}</Text>
        </View>
      </View>
      <View style={styles.opportunityProgress}>
        <View style={styles.opportunityProgressBar}>
          <View style={[styles.opportunityProgressFill, { width: `${opportunity.confidence}%`, backgroundColor: '#10B981' }]} />
        </View>
      </View>
    </View>
  );

  const TrendCard = ({ trend }: { trend: IndustryTrend }) => (
    <View style={[styles.trendCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.trendHeader}>
        <Zap size={20} color="#F59E0B" />
        <Text style={styles.trendName}>{trend.trend}</Text>
      </View>
      <View style={styles.trendMetrics}>
        <View style={[styles.trendImpact, { backgroundColor: `${getImpactColor(trend.impact)}20` }]}>
          <Text style={[styles.trendImpactText, { color: getImpactColor(trend.impact) }]}>
            {trend.impact.toUpperCase()} IMPACT
          </Text>
        </View>
        <View style={styles.trendGrowth}>
          <TrendingUp size={16} color="#10B981" />
          <Text style={[styles.trendGrowthValue, { color: '#10B981' }]}>{trend.growth}</Text>
        </View>
      </View>
    </View>
  );

  const DemandCard = ({ demand }: { demand: any }) => (
    <View style={[styles.demandCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.demandSegment}>{demand.segment}</Text>
      <View style={styles.demandMetrics}>
        <View>
          <Text style={styles.demandMetricLabel}>Demand</Text>
          <Text style={[styles.demandMetricValue, { color: demand.demand === 'High' ? '#10B981' : '#F59E0B' }]}>
            {demand.demand}
          </Text>
        </View>
        <View>
          <Text style={styles.demandMetricLabel}>Growth</Text>
          <Text style={[styles.demandMetricValue, { color: '#3B82F6' }]}>{demand.growth}</Text>
        </View>
        <View>
          <Text style={styles.demandMetricLabel}>Satisfaction</Text>
          <Text style={[styles.demandMetricValue, { color: '#8B5CF6' }]}>{demand.satisfaction}%</Text>
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
          <Text style={styles.headerTitle}>Market Intelligence</Text>
          <Text style={styles.headerSubtitle}>Competitive & Market Analysis</Text>
        </View>
        <Globe size={20} color="#3B82F6" />
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
                <PieChart size={32} color="#3B82F6" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryValue}>18.7%</Text>
                  <Text style={styles.summaryLabel}>Market Share</Text>
                </View>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: '#0A0F1A' }]}>
                <Target size={32} color="#10B981" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryValue}>5</Text>
                  <Text style={styles.summaryLabel}>Opportunities</Text>
                </View>
              </View>
              <View style={[styles.summaryCard, { backgroundColor: '#0A0F1A' }]}>
                <AlertTriangle size={32} color="#F59E0B" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryValue}>2</Text>
                  <Text style={styles.summaryLabel}>High Threats</Text>
                </View>
              </View>
            </View>

            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Competitive Landscape</Text>
              <View style={styles.chartPlaceholder}>
                <BarChart3 size={48} color="#3B82F6" />
                <Text style={styles.chartPlaceholderText}>Interactive Chart</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Customer Demand</Text>
              {customerDemand.map((demand, index) => (
                <DemandCard key={index} demand={demand} />
              ))}
            </View>
          </>
        )}

        {selectedTab === 'competitors' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Competitor Analysis</Text>
            {competitors.map(competitor => (
              <CompetitorCard key={competitor.id} competitor={competitor} />
            ))}
          </View>
        )}

        {selectedTab === 'opportunities' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Market Opportunities</Text>
            {marketOpportunities.map(opportunity => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </View>
        )}

        {selectedTab === 'trends' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Industry Trends</Text>
            {industryTrends.map(trend => (
              <TrendCard key={trend.id} trend={trend} />
            ))}
            
            <View style={[styles.chartCard, { backgroundColor: '#0A0F1A' }]}>
              <Text style={styles.sectionTitle}>Trend Analysis</Text>
              <View style={styles.chartPlaceholder}>
                <LineChart size={48} color="#8B5CF6" />
                <Text style={styles.chartPlaceholderText}>Interactive Chart</Text>
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
  chartCard: {
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.5,
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
  section: { padding: 20 },
  competitorCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  competitorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  competitorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  competitorThreat: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  competitorThreatText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  competitorMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  competitorMetric: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  competitorMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  competitorMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  opportunityCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  opportunityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  opportunityMarket: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  opportunityMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  opportunityMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  opportunityMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  opportunityProgress: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  opportunityProgressBar: {
    flex: 1,
    height: '100%',
  },
  opportunityProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  trendCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  trendName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  trendMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendImpact: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendImpactText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  trendGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendGrowthValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  demandCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  demandSegment: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  demandMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  demandMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  demandMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
});
