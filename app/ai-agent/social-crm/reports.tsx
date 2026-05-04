import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, Download, Share2, Calendar, TrendingUp, TrendingDown,
  PieChart, BarChart3, LineChart, Users, Target, DollarSign, 
  FileText, Funnel, ChevronDown, ArrowUpRight
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const REPORT_PERIODS = ['Today', 'This Week', 'This Month', 'This Quarter', 'This Year', 'Custom'];
const REPORT_TYPES = ['Overview', 'Sales', 'Pipeline', 'Activity', 'Conversion'];

const SUMMARY_METRICS = [
  { label: 'Total Revenue', value: '$1.24M', change: '+18.5%', trend: 'up', icon: DollarSign },
  { label: 'New Customers', value: '142', change: '+24', trend: 'up', icon: Users },
  { label: 'Conversion Rate', value: '24.8%', change: '+2.1%', trend: 'up', icon: Target },
  { label: 'Avg Deal Size', value: '$8,720', change: '-3.2%', trend: 'down', icon: BarChart3 },
];

const SALES_PERFORMANCE = [
  { name: 'Sarah Chen', sales: 124500, deals: 12, target: 95 },
  { name: 'Mike Johnson', sales: 98700, deals: 9, target: 82 },
  { name: 'David Lee', sales: 87600, deals: 8, target: 78 },
  { name: 'Emma Wilson', sales: 76500, deals: 7, target: 70 },
];

const PIPELINE_STAGES = [
  { stage: 'Lead', count: 156, value: 890000, conversion: 100 },
  { stage: 'Qualified', count: 89, value: 567000, conversion: 57 },
  { stage: 'Proposal', count: 45, value: 345000, conversion: 29 },
  { stage: 'Negotiation', count: 23, value: 234000, conversion: 15 },
  { stage: 'Closed Won', count: 67, value: 1200000, conversion: 43 },
];

const TOP_DEALS = [
  { name: 'Enterprise License', company: 'TechCorp', value: 145000, probability: 85, closeDate: '2026-06-15' },
  { name: 'Cloud Migration', company: 'GlobalSol', value: 89000, probability: 70, closeDate: '2026-05-30' },
  { name: 'AI Integration', company: 'FutureSys', value: 234000, probability: 60, closeDate: '2026-06-01' },
  { name: 'Analytics Platform', company: 'DataCo', value: 67000, probability: 75, closeDate: '2026-07-01' },
];

export default function CRMReportsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [selectedType, setSelectedType] = useState('Overview');
  const [expandedSection, setExpandedSection] = useState<string | null>('summary');

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
            CRM Reports
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Download size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Share2 size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          <Calendar size={18} color={theme.colors.textSecondary} />
          <Text style={[styles.periodText, { color: theme.colors.text }]}>{selectedPeriod}</Text>
          <ChevronDown size={18} color={theme.colors.textSecondary} />
        </View>

        {/* Report Type Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
          {REPORT_TYPES.map((type) => (
            <TouchableOpacity
              key={type}
              onPress={() => setSelectedType(type)}
              style={[
                styles.typeChip,
                selectedType === type && { backgroundColor: '#3B82F6' }
              ]}
            >
              <Text style={[
                styles.typeText,
                { color: selectedType === type ? '#fff' : theme.colors.text }
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Summary Metrics */}
      <View style={styles.summaryGrid}>
        {SUMMARY_METRICS.map((metric, i) => (
          <Animated.View
            key={metric.label}
            entering={FadeInUp.delay(i * 50)}
            style={[styles.metricCard, { backgroundColor: theme.colors.card }]}
          >
            <View style={[styles.metricIcon, { backgroundColor: metric.trend === 'up' ? '#10B98115' : '#EF444415' }]}>
              <metric.icon size={20} color={metric.trend === 'up' ? '#10B981' : '#EF4444'} />
            </View>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{metric.label}</Text>
            <View style={styles.metricTrend}>
              {metric.trend === 'up' ? (
                <TrendingUp size={14} color="#10B981" />
              ) : (
                <TrendingDown size={14} color="#EF4444" />
              )}
              <Text style={[styles.changeText, { color: metric.trend === 'up' ? '#10B981' : '#EF4444' }]}>
                {metric.change}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Sales Performance */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => setExpandedSection(expandedSection === 'sales' ? null : 'sales')}
        >
          <View style={styles.sectionTitleRow}>
            <LineChart size={20} color="#3B82F6" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Sales Performance
            </Text>
          </View>
          <ChevronDown 
            size={20} 
            color={theme.colors.textSecondary}
            style={{ transform: [{ rotate: expandedSection === 'sales' ? '180deg' : '0deg' }] }}
          />
        </TouchableOpacity>
        
        {expandedSection === 'sales' && (
          <View style={styles.salesList}>
            {SALES_PERFORMANCE.map((rep, i) => (
              <View key={rep.name} style={[styles.salesRow, { backgroundColor: theme.colors.background }]}>
                <View style={styles.salesLeft}>
                  <View style={[styles.repAvatar, { backgroundColor: '#3B82F6' }]}>
                    <Text style={styles.repInitial}>{rep.name.charAt(0)}</Text>
                  </View>
                  <View>
                    <Text style={[styles.repName, { color: theme.colors.text }]}>{rep.name}</Text>
                    <Text style={[styles.repDeals, { color: theme.colors.textSecondary }]}>
                      {rep.deals} deals
                    </Text>
                  </View>
                </View>
                <View style={styles.salesRight}>
                  <Text style={[styles.repSales, { color: '#10B981' }]}>
                    {formatCurrency(rep.sales)}
                  </Text>
                  <View style={styles.targetBar}>
                    <View style={[styles.targetFill, { width: `${rep.target}%`, backgroundColor: rep.target >= 90 ? '#10B981' : '#F59E0B' }]} />
                  </View>
                  <Text style={[styles.targetText, { color: theme.colors.textSecondary }]}>
                    {rep.target}% of target
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Pipeline Analysis */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => setExpandedSection(expandedSection === 'pipeline' ? null : 'pipeline')}
        >
          <View style={styles.sectionTitleRow}>
            <BarChart3 size={20} color="#8B5CF6" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Pipeline Analysis
            </Text>
          </View>
          <ChevronDown 
            size={20} 
            color={theme.colors.textSecondary}
            style={{ transform: [{ rotate: expandedSection === 'pipeline' ? '180deg' : '0deg' }] }}
          />
        </TouchableOpacity>

        {expandedSection === 'pipeline' && (
          <View style={styles.pipelineList}>
            {PIPELINE_STAGES.map((stage, i) => (
              <View key={stage.stage} style={styles.pipelineRow}>
                <View style={styles.pipelineLeft}>
                  <Text style={[styles.stageName, { color: theme.colors.text }]}>{stage.stage}</Text>
                  <Text style={[styles.stageCount, { color: theme.colors.textSecondary }]}>
                    {stage.count} deals
                  </Text>
                </View>
                <View style={styles.pipelineCenter}>
                  <View style={[styles.stageBar, { backgroundColor: theme.colors.background }]}>
                    <View 
                      style={[
                        styles.stageFill, 
                        { width: `${stage.conversion}%`, backgroundColor: i === 4 ? '#10B981' : '#3B82F6' }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.conversionText, { color: theme.colors.textSecondary }]}>
                    {stage.conversion}% conversion
                  </Text>
                </View>
                <Text style={[styles.stageValue, { color: '#10B981' }]}>
                  {formatCurrency(stage.value)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Top Deals */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => setExpandedSection(expandedSection === 'deals' ? null : 'deals')}
        >
          <View style={styles.sectionTitleRow}>
            <Target size={20} color="#F59E0B" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Top Deals
            </Text>
          </View>
          <ChevronDown 
            size={20} 
            color={theme.colors.textSecondary}
            style={{ transform: [{ rotate: expandedSection === 'deals' ? '180deg' : '0deg' }] }}
          />
        </TouchableOpacity>

        {expandedSection === 'deals' && (
          <View style={styles.dealsList}>
            {TOP_DEALS.map((deal, i) => (
              <View key={deal.name} style={[styles.dealRow, { backgroundColor: theme.colors.background }]}>
                <View style={styles.dealInfo}>
                  <Text style={[styles.dealName, { color: theme.colors.text }]}>{deal.name}</Text>
                  <Text style={[styles.dealCompany, { color: theme.colors.textSecondary }]}>{deal.company}</Text>
                </View>
                <View style={styles.dealStats}>
                  <Text style={[styles.dealValue, { color: '#10B981' }]}>
                    {formatCurrency(deal.value)}
                  </Text>
                  <View style={styles.probBadge}>
                    <Text style={[styles.probText, { color: theme.colors.textSecondary }]}>
                      {deal.probability}% prob
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={[styles.actionsSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Report Actions
        </Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#3B82F615' }]}>
            <FileText size={24} color="#3B82F6" />
            <Text style={[styles.actionText, { color: '#3B82F6' }]}>Export PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#10B98115' }]}>
            <BarChart3 size={24} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#8B5CF615' }]}>
            <ArrowUpRight size={24} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', flex: 1, marginLeft: 12 },
  headerActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  periodSelector: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  periodText: { fontSize: 16, fontWeight: '600' },
  typeScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  typeChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  typeText: { fontSize: 13, fontWeight: '600' },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  metricCard: { width: '47%', padding: 16, borderRadius: 16 },
  metricIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  metricValue: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  metricLabel: { fontSize: 13, marginBottom: 6 },
  metricTrend: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  changeText: { fontSize: 13, fontWeight: '700' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 17, fontWeight: '700' },
  salesList: { gap: 8 },
  salesRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 12 },
  salesLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  repAvatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  repInitial: { color: '#fff', fontSize: 16, fontWeight: '700' },
  repName: { fontSize: 14, fontWeight: '600' },
  repDeals: { fontSize: 12, marginTop: 2 },
  salesRight: { alignItems: 'flex-end' },
  repSales: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  targetBar: { width: 80, height: 4, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 2, marginBottom: 4 },
  targetFill: { height: 4, borderRadius: 2 },
  targetText: { fontSize: 11 },
  pipelineList: { gap: 12 },
  pipelineRow: { flexDirection: 'row', alignItems: 'center' },
  pipelineLeft: { width: 90 },
  stageName: { fontSize: 14, fontWeight: '600' },
  stageCount: { fontSize: 12, marginTop: 2 },
  pipelineCenter: { flex: 1, marginHorizontal: 12 },
  stageBar: { height: 8, borderRadius: 4, marginBottom: 4 },
  stageFill: { height: 8, borderRadius: 4 },
  conversionText: { fontSize: 11 },
  stageValue: { fontSize: 14, fontWeight: '700', width: 70, textAlign: 'right' },
  dealsList: { gap: 8 },
  dealRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 12 },
  dealInfo: { flex: 1 },
  dealName: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  dealCompany: { fontSize: 12 },
  dealStats: { alignItems: 'flex-end' },
  dealValue: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  probBadge: { backgroundColor: 'rgba(0,0,0,0.05)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  probText: { fontSize: 11 },
  actionsSection: { marginHorizontal: 16, marginBottom: 30, padding: 16, borderRadius: 16 },
  actionsGrid: { flexDirection: 'row', gap: 10 },
  actionCard: { flex: 1, alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
