import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  TrendingUp, 
  DollarSign, 
  ArrowLeft,
  Activity,
  Target,
  BarChart3,
  LineChart,
  CheckCircle,
  AlertTriangle,
  Award,
  Users,
  Globe,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface InvestorMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

const investorMetrics: InvestorMetric[] = [
  { id: '1', label: 'Shareholder Value', value: '$185B', change: '+18.7%', trend: 'up' },
  { id: '2', label: 'Stock Price', value: '$1,247.50', change: '+12.4%', trend: 'up' },
  { id: '3', label: 'Market Cap', value: '$185B', change: '+18.7%', trend: 'up' },
  { id: '4', label: 'Dividend Yield', value: '2.4%', change: '+0.2%', trend: 'up' },
  { id: '5', label: 'P/E Ratio', value: '28.4', change: '+1.2', trend: 'up' },
  { id: '6', label: 'Total Shareholders', value: '12,450', change: '+8.2%', trend: 'up' }
];

const quarterlyResults = [
  { quarter: 'Q4 2025', revenue: '$7.8B', eps: '$2.84', growth: '+15.2%', beat: true },
  { quarter: 'Q3 2025', revenue: '$7.2B', eps: '$2.62', growth: '+12.8%', beat: true },
  { quarter: 'Q2 2025', revenue: '$6.8B', eps: '$2.48', growth: '+10.4%', beat: true },
  { quarter: 'Q1 2025', revenue: '$6.4B', eps: '$2.34', growth: '+8.7%', beat: false }
];

const investorSentiment = [
  { metric: 'Overall Sentiment', value: 'Positive', score: 87, change: '+5.2%' },
  { metric: 'Analyst Rating', value: 'Buy', score: 92, change: '+2.4%' },
  { metric: 'Institutional Ownership', value: '78%', score: 78, change: '+1.8%' },
  { metric: 'Retail Interest', value: 'High', score: 82, change: '+3.6%' }
];

const esgScores = [
  { category: 'Environmental', score: 94, trend: 'up' },
  { category: 'Social', score: 91, trend: 'up' },
  { category: 'Governance', score: 96, trend: 'stable' },
  { category: 'Overall ESG', score: 94, trend: 'up' }
];

export default function InvestorRelations() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'results' | 'sentiment' | 'esg'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'results', label: 'Results', icon: BarChart3 },
    { id: 'sentiment', label: 'Sentiment', icon: Users },
    { id: 'esg', label: 'ESG', icon: Award }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp size={14} color="#10B981" />;
      case 'down': return <ArrowDown size={14} color="#EF4444" />;
      default: return <Minus size={14} color="#6B7280" />;
    }
  };

  const MetricCard = ({ metric }: { metric: InvestorMetric }) => (
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

  const ResultCard = ({ result }: { result: any }) => (
    <View style={[styles.resultCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.resultHeader}>
        <Text style={styles.resultQuarter}>{result.quarter}</Text>
        {result.beat ? (
          <CheckCircle size={20} color="#10B981" />
        ) : (
          <AlertTriangle size={20} color="#F59E0B" />
        )}
      </View>
      <View style={styles.resultMetrics}>
        <View style={styles.resultMetric}>
          <DollarSign size={16} color="#9CA3AF" />
          <Text style={styles.resultMetricLabel}>Revenue</Text>
          <Text style={[styles.resultMetricValue, { color: '#10B981' }]}>{result.revenue}</Text>
        </View>
        <View style={styles.resultMetric}>
          <TrendingUp size={16} color="#9CA3AF" />
          <Text style={styles.resultMetricLabel}>EPS</Text>
          <Text style={[styles.resultMetricValue, { color: '#3B82F6' }]}>{result.eps}</Text>
        </View>
        <View style={styles.resultMetric}>
          <Activity size={16} color="#9CA3AF" />
          <Text style={styles.resultMetricLabel}>Growth</Text>
          <Text style={[styles.resultMetricValue, { color: '#8B5CF6' }]}>{result.growth}</Text>
        </View>
      </View>
    </View>
  );

  const SentimentCard = ({ sentiment }: { sentiment: any }) => (
    <View style={[styles.sentimentCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.sentimentMetric}>{sentiment.metric}</Text>
      <View style={styles.sentimentValue}>
        <Text style={[styles.sentimentValueText, { color: sentiment.score >= 85 ? '#10B981' : sentiment.score >= 75 ? '#F59E0B' : '#EF4444' }]}>
          {sentiment.value}
        </Text>
        <Text style={styles.sentimentScore}>{sentiment.score}/100</Text>
      </View>
      <View style={styles.sentimentChange}>
        <ArrowUp size={14} color="#10B981" />
        <Text style={[styles.sentimentChangeText, { color: '#10B981' }]}>{sentiment.change}</Text>
      </View>
    </View>
  );

  const ESGCard = ({ esg }: { esg: any }) => (
    <View style={[styles.esgCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.esgCategory}>{esg.category}</Text>
      <View style={styles.esgScore}>
        <Text style={[styles.esgScoreValue, { color: '#10B981' }]}>{esg.score}</Text>
        <View style={styles.esgProgress}>
          <View style={[styles.esgProgressFill, { width: `${esg.score}%`, backgroundColor: '#10B981' }]} />
        </View>
      </View>
      <View style={styles.esgTrend}>
        {esg.trend === 'up' ? (
          <ArrowUp size={14} color="#10B981" />
        ) : (
          <Minus size={14} color="#6B7280" />
        )}
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
          <Text style={styles.headerTitle}>Investor Relations</Text>
          <Text style={styles.headerSubtitle}>Shareholder & Market Intelligence</Text>
        </View>
        <TrendingUp size={20} color="#10B981" />
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
            <Text style={styles.sectionTitle}>Investor Metrics</Text>
            <View style={styles.metricsGrid}>
              {investorMetrics.map(metric => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </View>
          </View>
        )}

        {selectedTab === 'results' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quarterly Results</Text>
            {quarterlyResults.map((result, index) => (
              <ResultCard key={index} result={result} />
            ))}
          </View>
        )}

        {selectedTab === 'sentiment' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Investor Sentiment</Text>
            {investorSentiment.map((sentiment, index) => (
              <SentimentCard key={index} sentiment={sentiment} />
            ))}
          </View>
        )}

        {selectedTab === 'esg' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ESG Performance</Text>
            {esgScores.map((esg, index) => (
              <ESGCard key={index} esg={esg} />
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
  resultCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultQuarter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resultMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultMetric: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  resultMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  resultMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  sentimentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sentimentMetric: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  sentimentValue: {
    alignItems: 'center',
  },
  sentimentValueText: {
    fontSize: 18,
    fontWeight: '800',
  },
  sentimentScore: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  sentimentChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sentimentChangeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  esgCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  esgCategory: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  esgScore: {
    alignItems: 'center',
    gap: 8,
  },
  esgScoreValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  esgProgress: {
    width: 60,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  esgProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  esgTrend: {
    width: 32,
    alignItems: 'center',
  },
});
