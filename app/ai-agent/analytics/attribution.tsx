import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, Share2, Target, MousePointer, Eye, Zap,
  TrendingUp, TrendingDown, PieChart, BarChart3, Users,
  Globe, Smartphone, Mail, Video, Funnel, ArrowRight
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const MODELS = ['First Touch', 'Last Touch', 'Linear', 'Time Decay', 'Position Based', 'Data Driven'];
const CHANNELS = ['Organic Search', 'Paid Social', 'Email', 'Direct', 'Referral', 'Display'];

const ATTRIBUTION_DATA = [
  { 
    channel: 'Organic Search', 
    conversions: 245, 
    revenue: 124500, 
    percentage: 32,
    touchpoints: 1250,
    trend: 'up',
    change: '+12%'
  },
  { 
    channel: 'Paid Social', 
    conversions: 189, 
    revenue: 98700, 
    percentage: 24,
    touchpoints: 890,
    trend: 'up',
    change: '+8%'
  },
  { 
    channel: 'Email', 
    conversions: 134, 
    revenue: 76500, 
    percentage: 17,
    touchpoints: 2100,
    trend: 'stable',
    change: '+2%'
  },
  { 
    channel: 'Direct', 
    conversions: 89, 
    revenue: 54300, 
    percentage: 12,
    touchpoints: 450,
    trend: 'up',
    change: '+5%'
  },
  { 
    channel: 'Referral', 
    conversions: 56, 
    revenue: 32100, 
    percentage: 7,
    touchpoints: 180,
    trend: 'down',
    change: '-3%'
  },
  { 
    channel: 'Display', 
    conversions: 45, 
    revenue: 18900, 
    percentage: 6,
    touchpoints: 3200,
    trend: 'stable',
    change: '0%'
  },
];

const TOUCHPOINT_JOURNEY = [
  { stage: 'Awareness', channels: ['Social Ad', 'Organic Search'], users: 5000 },
  { stage: 'Consideration', channels: ['Email', 'Retargeting'], users: 2500 },
  { stage: 'Decision', channels: ['Direct', 'Review Site'], users: 800 },
  { stage: 'Conversion', channels: ['Direct', 'Email'], users: 245 },
];

const INSIGHTS = [
  { type: 'opportunity', title: 'Email Nurturing', desc: 'Email has highest touchpoint efficiency', action: 'Scale up' },
  { type: 'warning', title: 'Display Ads', desc: 'High impressions, low conversion rate', action: 'Optimize' },
  { type: 'win', title: 'Organic Growth', desc: 'Best performing channel this month', action: 'Maintain' },
];

export default function AttributionAnalysisScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedModel, setSelectedModel] = useState('Data Driven');
  const [selectedChannel, setSelectedChannel] = useState('All');

  const getChannelIcon = (channel: string) => {
    switch(channel) {
      case 'Organic Search': return <Globe size={18} color="#10B981" />;
      case 'Paid Social': return <Share2 size={18} color="#3B82F6" />;
      case 'Email': return <Mail size={18} color="#F59E0B" />;
      case 'Direct': return <MousePointer size={18} color="#8B5CF6" />;
      case 'Referral': return <Users size={18} color="#EC4899" />;
      case 'Display': return <Eye size={18} color="#14B8A6" />;
      default: return <Zap size={18} color={theme.colors.primary} />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Attribution Analysis
          </Text>
          <TouchableOpacity style={styles.filterBtn}>
            <Funnel size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Model Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.modelScroll}>
          {MODELS.map((model) => (
            <TouchableOpacity
              key={model}
              onPress={() => setSelectedModel(model)}
              style={[
                styles.modelChip,
                selectedModel === model && { backgroundColor: '#8B5CF6' }
              ]}
            >
              <Text style={[
                styles.modelText,
                { color: selectedModel === model ? '#fff' : theme.colors.text }
              ]}>
                {model}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryRow}>
        <Animated.View entering={FadeInUp} style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#3B82F615' }]}>
            <Target size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>768</Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Conversions</Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(50)} style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#10B98115' }]}>
            <TrendingUp size={20} color="#10B981" />
          </View>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>$401K</Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Attributed Revenue</Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(100)} style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#F59E0B15' }]}>
            <PieChart size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>5.2</Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Avg Touchpoints</Text>
        </Animated.View>
      </View>

      {/* Channel Attribution */}
      <View style={[styles.channelsSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Attribution by Channel
        </Text>
        
        {/* Bar Chart */}
        <View style={styles.chartContainer}>
          {ATTRIBUTION_DATA.map((item, i) => (
            <Animated.View 
              key={item.channel}
              entering={FadeInUp.delay(i * 50)}
              style={styles.chartRow}
            >
              <View style={styles.chartLeft}>
                {getChannelIcon(item.channel)}
                <Text style={[styles.channelName, { color: theme.colors.text }]}>
                  {item.channel}
                </Text>
              </View>
              <View style={styles.chartCenter}>
                <View style={[styles.chartBarBg, { backgroundColor: theme.colors.background }]}>
                  <View 
                    style={[
                      styles.chartBar,
                      { width: `${item.percentage * 2.5}%` }
                    ]} 
                  />
                </View>
              </View>
              <View style={styles.chartRight}>
                <Text style={[styles.chartPercent, { color: theme.colors.text }]}>
                  {item.percentage}%
                </Text>
                <View style={styles.trendBadge}>
                  {item.trend === 'up' && <TrendingUp size={12} color="#10B981" />}
                  {item.trend === 'down' && <TrendingDown size={12} color="#EF4444" />}
                  <Text style={[
                    styles.trendText,
                    { color: item.trend === 'up' ? '#10B981' : item.trend === 'down' ? '#EF4444' : '#F59E0B' }
                  ]}>
                    {item.change}
                  </Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Channel Details */}
        <View style={styles.detailsGrid}>
          {ATTRIBUTION_DATA.slice(0, 3).map((item, i) => (
            <Animated.View 
              key={item.channel}
              entering={FadeInUp.delay(i * 50)}
              style={[styles.detailCard, { backgroundColor: theme.colors.background }]}
            >
              {getChannelIcon(item.channel)}
              <Text style={[styles.detailRevenue, { color: theme.colors.text }]}>
                {formatCurrency(item.revenue)}
              </Text>
              <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                {item.conversions} conversions
              </Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Customer Journey */}
      <View style={[styles.journeySection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Customer Journey
        </Text>
        <View style={styles.journeyFlow}>
          {TOUCHPOINT_JOURNEY.map((stage, i) => (
            <View key={stage.stage} style={styles.journeyStage}>
              <View style={[styles.stageCard, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.stageName, { color: theme.colors.text }]}>
                  {stage.stage}
                </Text>
                <Text style={[styles.stageUsers, { color: '#3B82F6' }]}>
                  {stage.users.toLocaleString()}
                </Text>
                <View style={styles.stageChannels}>
                  {stage.channels.map((ch, j) => (
                    <View key={j} style={styles.channelChip}>
                      <Text style={[styles.channelChipText, { color: theme.colors.textSecondary }]}>
                        {ch}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              {i < TOUCHPOINT_JOURNEY.length - 1 && (
                <View style={styles.arrowWrap}>
                  <ArrowRight size={20} color={theme.colors.textSecondary} />
                  <Text style={[styles.dropoffText, { color: '#EF4444' }]}>
                    -{Math.round((1 - (TOUCHPOINT_JOURNEY[i + 1].users / stage.users)) * 100)}%
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* AI Insights */}
      <View style={[styles.insightsSection, { backgroundColor: theme.colors.card }]}>
        <View style={styles.insightHeader}>
          <Zap size={18} color="#F59E0B" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            AI Insights
          </Text>
        </View>
        {INSIGHTS.map((insight, i) => (
          <Animated.View 
            key={insight.title}
            entering={FadeInUp.delay(i * 50)}
            style={[styles.insightCard, { backgroundColor: theme.colors.background }]}
          >
            <View style={[styles.insightIcon, { 
              backgroundColor: insight.type === 'opportunity' ? '#3B82F615' : insight.type === 'warning' ? '#EF444415' : '#10B98115' 
            }]}>
              {insight.type === 'opportunity' && <Target size={16} color="#3B82F6" />}
              {insight.type === 'warning' && <TrendingDown size={16} color="#EF4444" />}
              {insight.type === 'win' && <TrendingUp size={16} color="#10B981" />}
            </View>
            <View style={styles.insightContent}>
              <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
                {insight.title}
              </Text>
              <Text style={[styles.insightDesc, { color: theme.colors.textSecondary }]}>
                {insight.desc}
              </Text>
            </View>
            <TouchableOpacity style={[styles.insightAction, { 
              backgroundColor: insight.type === 'opportunity' ? '#3B82F6' : insight.type === 'warning' ? '#EF4444' : '#10B981' 
            }]}>
              <Text style={styles.insightActionText}>{insight.action}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', flex: 1, marginLeft: 12 },
  filterBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  modelScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  modelChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  modelText: { fontSize: 13, fontWeight: '600' },
  summaryRow: { flexDirection: 'row', padding: 16, gap: 10 },
  summaryCard: { flex: 1, alignItems: 'center', padding: 16, borderRadius: 16 },
  summaryIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  summaryValue: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  summaryLabel: { fontSize: 12 },
  channelsSection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 16 },
  chartContainer: { marginBottom: 16 },
  chartRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  chartLeft: { width: 100, flexDirection: 'row', alignItems: 'center', gap: 8 },
  channelName: { fontSize: 13, fontWeight: '500' },
  chartCenter: { flex: 1, marginHorizontal: 10 },
  chartBarBg: { height: 20, borderRadius: 10 },
  chartBar: { height: 20, borderRadius: 10, backgroundColor: '#8B5CF6' },
  chartRight: { width: 60, alignItems: 'flex-end' },
  chartPercent: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  trendBadge: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  trendText: { fontSize: 11, fontWeight: '600' },
  detailsGrid: { flexDirection: 'row', gap: 10 },
  detailCard: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 12 },
  detailRevenue: { fontSize: 15, fontWeight: '700', marginTop: 8, marginBottom: 4 },
  detailLabel: { fontSize: 11 },
  journeySection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  journeyFlow: {},
  journeyStage: { marginBottom: 16 },
  stageCard: { padding: 14, borderRadius: 12 },
  stageName: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  stageUsers: { fontSize: 20, fontWeight: '800', marginBottom: 8 },
  stageChannels: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  channelChip: { backgroundColor: 'rgba(0,0,0,0.05)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  channelChipText: { fontSize: 11 },
  arrowWrap: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 14 },
  dropoffText: { fontSize: 12, fontWeight: '600', marginLeft: 8 },
  insightsSection: { marginHorizontal: 16, marginBottom: 30, padding: 16, borderRadius: 16 },
  insightHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  insightCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  insightIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  insightContent: { flex: 1, marginLeft: 12 },
  insightTitle: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  insightDesc: { fontSize: 12 },
  insightAction: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  insightActionText: { color: '#fff', fontSize: 11, fontWeight: '700' },
});
