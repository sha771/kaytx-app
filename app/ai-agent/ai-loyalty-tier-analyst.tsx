import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';
import {
  Layers,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  Star,
  Award,
  Target,
  Zap,
  Settings,
  Lock,
  ChartBarBig,
  BarChart3,
  PieChart,
  Activity,
  ChevronRight,
  Filter,
  Search,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  MoreHorizontal,
  Minus,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AILoyaltyTierAnalystScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-loyalty-tier-analyst')!;

  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const isPremiumLocked = useMemo(() => {
    return (
      agent.isPremium &&
      (subscription?.plan === 'free' || subscription?.plan === 'starter')
    );
  }, [agent.isPremium, subscription]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPremiumLocked) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [isPremiumLocked, fadeAnim]);

  // Tier Performance Data
  const tierData = [
    {
      tier: 'Platinum',
      members: 1240,
      avgSpend: '$4,250',
      retentionRate: '94.2%',
      upgradeRate: '0%',
      downgradeRate: '2.1%',
      revenue: '$5.27M',
      trend: 'up',
      color: '#E5E4E2',
    },
    {
      tier: 'Gold',
      members: 5680,
      avgSpend: '$2,180',
      retentionRate: '87.5%',
      upgradeRate: '8.4%',
      downgradeRate: '5.2%',
      revenue: '$12.38M',
      trend: 'up',
      color: '#FFD700',
    },
    {
      tier: 'Silver',
      members: 7240,
      avgSpend: '$980',
      retentionRate: '78.3%',
      upgradeRate: '12.7%',
      downgradeRate: '8.9%',
      revenue: '$7.09M',
      trend: 'stable',
      color: '#C0C0C0',
    },
    {
      tier: 'Bronze',
      members: 1840,
      avgSpend: '$320',
      retentionRate: '64.2%',
      upgradeRate: '18.5%',
      downgradeRate: '0%',
      revenue: '$588K',
      trend: 'down',
      color: '#CD7F32',
    },
  ];

  // Migration Funnel
  const migrationData = {
    upgrading: {
      silverToGold: 920,
      goldToPlatinum: 145,
      bronzeToSilver: 340,
    },
    downgrading: {
      goldToSilver: 295,
      platinumToGold: 26,
      silverToBronze: 644,
    },
    atRisk: 450,
  };

  // AI Insights
  const insights = [
    {
      id: 1,
      type: 'opportunity',
      title: 'Silver → Gold Migration Opportunity',
      description: '920 Silver members (12.7%) are ready for Gold upgrade based on spend patterns.',
      impact: '+$340K potential revenue',
      icon: TrendingUp,
      color: '#10B981',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Bronze Tier At-Risk',
      description: '450 Bronze members showing decreased engagement. Churn risk: 35%.',
      impact: 'Immediate action needed',
      icon: AlertTriangle,
      color: '#F59E0B',
    },
    {
      id: 3,
      type: 'success',
      title: 'Gold Tier Performing Strong',
      description: 'Gold tier showing 8.4% upgrade rate and 87.5% retention.',
      impact: 'Exceeding targets',
      icon: CheckCircle,
      color: '#3B82F6',
    },
  ];

  // Member Journey Stages
  const journeyStages = [
    { stage: 'New Member', count: 450, conversionRate: '68%' },
    { stage: 'Active Engager', count: 3840, conversionRate: '45%' },
    { stage: 'Regular Buyer', count: 7200, conversionRate: '32%' },
    { stage: 'Loyal Customer', count: 2560, conversionRate: '18%' },
    { stage: 'Brand Advocate', count: 1240, conversionRate: 'N/A' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Layers size={20} color="#fff" />
            <Text style={styles.metricValue}>4</Text>
            <Text style={styles.metricLabel}>Active Tiers</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <TrendingUp size={20} color="#fff" />
            <Text style={styles.metricValue}>1,405</Text>
            <Text style={styles.metricLabel}>Net Upgrades</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Users size={20} color="#fff" />
            <Text style={styles.metricValue}>450</Text>
            <Text style={styles.metricLabel}>At Risk</Text>
          </LinearGradient>

          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <Crown size={20} color="#fff" />
            <Text style={styles.metricValue}>82.4%</Text>
            <Text style={styles.metricLabel}>Avg Retention</Text>
          </LinearGradient>
        </View>

        {/* Tier Performance Table */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <BarChart3 size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Tier Performance
              </Text>
            </View>
            <TouchableOpacity>
              <MoreHorizontal size={20} color={theme.colors.secondaryText} />
            </TouchableOpacity>
          </View>

          <View style={styles.tierTable}>
            <View style={styles.tierTableHeader}>
              <Text style={[styles.tableHeaderText, { color: theme.colors.secondaryText, flex: 1 }]}>
                Tier
              </Text>
              <Text style={[styles.tableHeaderText, { color: theme.colors.secondaryText, width: 60 }]}>
                Members
              </Text>
              <Text style={[styles.tableHeaderText, { color: theme.colors.secondaryText, width: 70 }]}>
                Avg Spend
              </Text>
              <Text style={[styles.tableHeaderText, { color: theme.colors.secondaryText, width: 50 }]}>
                Retention
              </Text>
              <Text style={[styles.tableHeaderText, { color: theme.colors.secondaryText, width: 40 }]}>
                Trend
              </Text>
            </View>

            {tierData.map((tier) => (
              <View key={tier.tier} style={styles.tierTableRow}>
                <View style={[styles.tierCell, { flex: 1 }]}>
                  <View
                    style={[styles.tierDot, { backgroundColor: tier.color }]}
                  />
                  <Text style={[styles.tierName, { color: theme.colors.text }]}>
                    {tier.tier}
                  </Text>
                </View>
                <Text style={[styles.tierCellText, { color: theme.colors.text, width: 60 }]}>
                  {tier.members.toLocaleString()}
                </Text>
                <Text style={[styles.tierCellText, { color: theme.colors.text, width: 70 }]}>
                  {tier.avgSpend}
                </Text>
                <Text style={[styles.tierCellText, { color: theme.colors.text, width: 50 }]}>
                  {tier.retentionRate}
                </Text>
                <View style={[{ width: 40 }]}>
                  {tier.trend === 'up' && <ArrowUpRight size={18} color="#10B981" />}
                  {tier.trend === 'down' && <ArrowDownRight size={18} color="#EF4444" />}
                  {tier.trend === 'stable' && <Minus size={18} color="#F59E0B" />}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Migration Funnel */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Activity size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Migration Flow
              </Text>
            </View>
          </View>

          <View style={styles.migrationSection}>
            <Text style={[styles.migrationTitle, { color: theme.colors.text }]}>
              Upgrading
            </Text>
            <View style={styles.migrationFlows}>
              <View style={styles.migrationItem}>
                <View style={styles.migrationPath}>
                  <Text style={[styles.migrationTier, { color: '#C0C0C0' }]}>Silver</Text>
                  <ArrowUpRight size={14} color="#10B981" />
                  <Text style={[styles.migrationTier, { color: '#FFD700' }]}>Gold</Text>
                </View>
                <Text style={[styles.migrationCount, { color: theme.colors.text }]}>
                  {migrationData.upgrading.silverToGold}
                </Text>
              </View>
              <View style={styles.migrationItem}>
                <View style={styles.migrationPath}>
                  <Text style={[styles.migrationTier, { color: '#FFD700' }]}>Gold</Text>
                  <ArrowUpRight size={14} color="#10B981" />
                  <Text style={[styles.migrationTier, { color: '#E5E4E2' }]}>Platinum</Text>
                </View>
                <Text style={[styles.migrationCount, { color: theme.colors.text }]}>
                  {migrationData.upgrading.goldToPlatinum}
                </Text>
              </View>
              <View style={styles.migrationItem}>
                <View style={styles.migrationPath}>
                  <Text style={[styles.migrationTier, { color: '#CD7F32' }]}>Bronze</Text>
                  <ArrowUpRight size={14} color="#10B981" />
                  <Text style={[styles.migrationTier, { color: '#C0C0C0' }]}>Silver</Text>
                </View>
                <Text style={[styles.migrationCount, { color: theme.colors.text }]}>
                  {migrationData.upgrading.bronzeToSilver}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.migrationSection, { marginTop: 20 }]}>
            <Text style={[styles.migrationTitle, { color: theme.colors.text }]}>
              Downgrading
            </Text>
            <View style={styles.migrationFlows}>
              <View style={styles.migrationItem}>
                <View style={styles.migrationPath}>
                  <Text style={[styles.migrationTier, { color: '#FFD700' }]}>Gold</Text>
                  <ArrowDownRight size={14} color="#EF4444" />
                  <Text style={[styles.migrationTier, { color: '#C0C0C0' }]}>Silver</Text>
                </View>
                <Text style={[styles.migrationCount, { color: theme.colors.text }]}>
                  {migrationData.downgrading.goldToSilver}
                </Text>
              </View>
              <View style={styles.migrationItem}>
                <View style={styles.migrationPath}>
                  <Text style={[styles.migrationTier, { color: '#E5E4E2' }]}>Platinum</Text>
                  <ArrowDownRight size={14} color="#EF4444" />
                  <Text style={[styles.migrationTier, { color: '#FFD700' }]}>Gold</Text>
                </View>
                <Text style={[styles.migrationCount, { color: theme.colors.text }]}>
                  {migrationData.downgrading.platinumToGold}
                </Text>
              </View>
              <View style={styles.migrationItem}>
                <View style={styles.migrationPath}>
                  <Text style={[styles.migrationTier, { color: '#C0C0C0' }]}>Silver</Text>
                  <ArrowDownRight size={14} color="#EF4444" />
                  <Text style={[styles.migrationTier, { color: '#CD7F32' }]}>Bronze</Text>
                </View>
                <Text style={[styles.migrationCount, { color: theme.colors.text }]}>
                  {migrationData.downgrading.silverToBronze}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {isPremiumLocked && (
        <Animated.View
          style={[
            styles.lockOverlay,
            {
              opacity: fadeAnim,
              backgroundColor: theme.colors.background + 'CC',
            },
          ]}
        >
          <View
            style={[
              styles.lockCard,
              { backgroundColor: theme.colors.cardBackground },
            ]}
          >
            <View
              style={[
                styles.lockIconContainer,
                { backgroundColor: theme.colors.primary + '15' },
              ]}
            >
              <Lock size={32} color={theme.colors.primary} />
            </View>
            <Text
              style={[styles.lockTitle, { color: theme.colors.text }]}
            >
              Premium Agent
            </Text>
            <Text
              style={[styles.lockDesc, { color: theme.colors.secondaryText }]}
            >
              The AI Loyalty Tier Analyst is part of our Enterprise suite.
              Upgrade your plan to activate this agent.
            </Text>
            <TouchableOpacity
              style={[
                styles.upgradeBtn,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => router.push('/enterprise/billing')}
            >
              <Text style={styles.upgradeBtnText}>Upgrade Plan</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const renderInsightsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* AI Insights */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Sparkles size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                AI-Powered Insights
              </Text>
            </View>
          </View>

          {insights.map((insight) => (
            <View
              key={insight.id}
              style={[
                styles.insightCard,
                { borderLeftColor: insight.color, borderLeftWidth: 4 },
              ]}
            >
              <View
                style={[
                  styles.insightIcon,
                  { backgroundColor: insight.color + '15' },
                ]}
              >
                <insight.icon size={20} color={insight.color} />
              </View>
              <View style={styles.insightContent}>
                <Text
                  style={[styles.insightTitle, { color: theme.colors.text }]}
                >
                  {insight.title}
                </Text>
                <Text
                  style={[
                    styles.insightDesc,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  {insight.description}
                </Text>
                <View style={styles.insightImpact}>
                  <Zap size={14} color={insight.color} />
                  <Text style={[styles.insightImpactText, { color: insight.color }]}>
                    {insight.impact}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Member Journey */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Target size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Member Journey Funnel
              </Text>
            </View>
          </View>

          <View style={styles.journeyList}>
            {journeyStages.map((stage, index) => (
              <View key={stage.stage} style={styles.journeyItem}>
                <View style={styles.journeyLeft}>
                  <View
                    style={[
                      styles.journeyNumber,
                      { backgroundColor: theme.colors.primary + '15' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.journeyNumberText,
                        { color: theme.colors.primary },
                      ]}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[styles.journeyStage, { color: theme.colors.text }]}
                    >
                      {stage.stage}
                    </Text>
                    <Text
                      style={[
                        styles.journeyCount,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      {stage.count.toLocaleString()} members
                    </Text>
                  </View>
                </View>
                <View style={styles.journeyRight}>
                  <Text
                    style={[
                      styles.conversionRate,
                      { color: theme.colors.primary },
                    ]}
                  >
                    {stage.conversionRate}
                  </Text>
                  <Text
                    style={[
                      styles.conversionLabel,
                      { color: theme.colors.secondaryText },
                    ]}
                  >
                    conversion
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Analytics Header */}
        <View style={styles.analyticsHeader}>
          <View style={styles.searchContainer}>
            <Search size={18} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search members..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.filterBtn,
              { backgroundColor: theme.colors.cardBackground },
            ]}
          >
            <Filter size={18} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Performance Metrics */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <ChartBarBig size={20} color="#fff" />
            <Text style={styles.metricValue}>13.5%</Text>
            <Text style={styles.metricLabel}>Upgrade Rate</Text>
          </LinearGradient>

          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}>
            <ArrowDownRight size={20} color="#fff" />
            <Text style={styles.metricValue}>5.8%</Text>
            <Text style={styles.metricLabel}>Downgrade Rate</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <Users size={20} color="#fff" />
            <Text style={styles.metricValue}>8.2</Text>
            <Text style={styles.metricLabel}>Avg Months in Tier</Text>
          </LinearGradient>

          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <Crown size={20} color="#fff" />
            <Text style={styles.metricValue}>24.5%</Text>
            <Text style={styles.metricLabel}>Top Tier Growth</Text>
          </LinearGradient>
        </View>

        {/* Tier Revenue Distribution */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <PieChart size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Revenue by Tier
              </Text>
            </View>
          </View>

          <View style={styles.revenueList}>
            {tierData.map((tier) => {
              const totalRevenue = 25234000; // Sum of all tier revenues
              const tierRevenue = parseFloat(tier.revenue.replace(/[$MK]/g, '')) * (tier.revenue.includes('M') ? 1000000 : 1000);
              const percentage = ((tierRevenue / totalRevenue) * 100).toFixed(1);
              
              return (
                <View key={tier.tier} style={styles.revenueItem}>
                  <View style={styles.revenueLeft}>
                    <View
                      style={[styles.tierDot, { backgroundColor: tier.color }]}
                    />
                    <Text
                      style={[styles.revenueTier, { color: theme.colors.text }]}
                    >
                      {tier.tier}
                    </Text>
                  </View>
                  <View style={styles.revenueBarContainer}>
                    <View
                      style={[
                        styles.revenueBar,
                        {
                          width: `${percentage}%`,
                          backgroundColor: tier.color,
                        },
                      ]}
                    />
                  </View>
                  <View style={styles.revenueRight}>
                    <Text
                      style={[
                        styles.revenueValue,
                        { color: theme.colors.text },
                      ]}
                    >
                      {tier.revenue}
                    </Text>
                    <Text
                      style={[
                        styles.revenuePercent,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      {percentage}%
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Layers, component: renderOverviewTab() },
    { id: 'insights', label: 'Insights', icon: Sparkles, component: renderInsightsTab() },
    { id: 'analytics', label: 'Analytics', icon: ChartBarBig, component: renderAnalyticsTab() },
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContent: { padding: 20 },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 25,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 20,
    gap: 8,
  },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
  },
  section: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  tierTable: { gap: 8 },
  tierTableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tableHeaderText: { fontSize: 11, fontWeight: '600' },
  tierTableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tierCell: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tierDot: { width: 10, height: 10, borderRadius: 5 },
  tierName: { fontSize: 14, fontWeight: '600' },
  tierCellText: { fontSize: 13, fontWeight: '500' },
  migrationSection: {},
  migrationTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  migrationFlows: { gap: 10 },
  migrationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 12,
    borderRadius: 12,
  },
  migrationPath: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  migrationTier: { fontSize: 14, fontWeight: '600' },
  migrationCount: { fontSize: 15, fontWeight: '700' },
  insightCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 16,
    marginBottom: 12,
  },
  insightIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightContent: { flex: 1 },
  insightTitle: { fontSize: 15, fontWeight: '700', marginBottom: 6 },
  insightDesc: { fontSize: 13, lineHeight: 20, marginBottom: 8 },
  insightImpact: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  insightImpactText: { fontSize: 12, fontWeight: '600' },
  journeyList: { gap: 12 },
  journeyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  journeyLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  journeyNumber: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  journeyNumberText: { fontSize: 14, fontWeight: '700' },
  journeyStage: { fontSize: 15, fontWeight: '600' },
  journeyCount: { fontSize: 12, marginTop: 2 },
  journeyRight: { alignItems: 'flex-end' },
  conversionRate: { fontSize: 16, fontWeight: '700' },
  conversionLabel: { fontSize: 11 },
  analyticsHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  revenueList: { gap: 16 },
  revenueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  revenueLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 80,
  },
  revenueTier: { fontSize: 14, fontWeight: '600' },
  revenueBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  revenueBar: { height: '100%', borderRadius: 4 },
  revenueRight: { width: 80, alignItems: 'flex-end' },
  revenueValue: { fontSize: 14, fontWeight: '700' },
  revenuePercent: { fontSize: 11, marginTop: 2 },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 100,
  },
  lockCard: {
    width: '100%',
    padding: 30,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  lockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  upgradeBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
