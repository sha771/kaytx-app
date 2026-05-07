import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
  Switch,
} from 'react-native';
import {
  Activity,
  BarChart3,
  TrendingUp,
  Users,
  Star,
  Target,
  Zap,
  Settings,
  Lock,
  ChartBarBig,
  PieChart,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  ChevronRight,
  MoreHorizontal,
  Award,
  Flame,
  Heart,
  ShoppingBag,
  MessageCircle,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIEngagementScoringAgentScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-engagement-scoring-agent')!;

  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const [activeTab, setActiveTab] = useState('scores');
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

  // Engagement Score Distribution
  const scoreDistribution = [
    { range: '90-100', label: 'Champions', count: 1840, color: '#10B981', percentage: 12 },
    { range: '70-89', label: 'Loyal', count: 4240, color: '#3B82F6', percentage: 28 },
    { range: '50-69', label: 'Potential', count: 5680, color: '#F59E0B', percentage: 38 },
    { range: '30-49', label: 'At Risk', count: 2240, color: '#EF4444', percentage: 15 },
    { range: '0-29', label: 'Dormant', count: 1040, color: '#6B7280', percentage: 7 },
  ];

  // Scoring Factors
  const scoringFactors = [
    { factor: 'Purchase Frequency', weight: '25%', score: 78, icon: ShoppingBag },
    { factor: 'Recency', weight: '20%', score: 82, icon: Clock },
    { factor: 'Social Engagement', weight: '15%', score: 65, icon: Heart },
    { factor: 'Feedback & Reviews', weight: '15%', score: 71, icon: MessageCircle },
    { factor: 'Referral Activity', weight: '15%', score: 54, icon: Users },
    { factor: 'App Usage', weight: '10%', score: 88, icon: Flame },
  ];

  // Top Engaged Members
  const topMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      score: 96,
      tier: 'Platinum',
      lastActivity: '2 min ago',
      trend: 'up',
    },
    {
      id: 2,
      name: 'Michael Chen',
      score: 94,
      tier: 'Gold',
      lastActivity: '15 min ago',
      trend: 'up',
    },
    {
      id: 3,
      name: 'Emily Davis',
      score: 92,
      tier: 'Gold',
      lastActivity: '32 min ago',
      trend: 'stable',
    },
    {
      id: 4,
      name: 'David Wilson',
      score: 89,
      tier: 'Silver',
      lastActivity: '1 hour ago',
      trend: 'up',
    },
    {
      id: 5,
      name: 'Jessica Brown',
      score: 87,
      tier: 'Silver',
      lastActivity: '2 hours ago',
      trend: 'down',
    },
  ];

  // Recent Score Changes
  const recentChanges = [
    {
      id: 1,
      member: 'Alex Thompson',
      change: '+12',
      reason: 'Completed purchase + review',
      time: '5 min ago',
      type: 'positive',
    },
    {
      id: 2,
      member: 'Maria Garcia',
      change: '-8',
      reason: '30 days inactive',
      time: '12 min ago',
      type: 'negative',
    },
    {
      id: 3,
      member: 'James Lee',
      change: '+15',
      reason: 'Referral converted',
      time: '28 min ago',
      type: 'positive',
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 70) return '#3B82F6';
    if (score >= 50) return '#F59E0B';
    if (score >= 30) return '#EF4444';
    return '#6B7280';
  };

  const renderScoresTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Activity size={20} color="#fff" />
            <Text style={styles.metricValue}>68.4</Text>
            <Text style={styles.metricLabel}>Avg Score</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <Users size={20} color="#fff" />
            <Text style={styles.metricValue}>6,080</Text>
            <Text style={styles.metricLabel}>High Engaged</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <TrendingUp size={20} color="#fff" />
            <Text style={styles.metricValue}>+4.2%</Text>
            <Text style={styles.metricLabel}>Score Growth</Text>
          </LinearGradient>

          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}>
            <AlertCircle size={20} color="#fff" />
            <Text style={styles.metricValue}>3,280</Text>
            <Text style={styles.metricLabel}>Needs Attention</Text>
          </LinearGradient>
        </View>

        {/* Score Distribution */}
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
                Score Distribution
              </Text>
            </View>
          </View>

          <View style={styles.distributionList}>
            {scoreDistribution.map((item) => (
              <View key={item.range} style={styles.distributionItem}>
                <View style={styles.distributionLeft}>
                  <View
                    style={[
                      styles.distributionDot,
                      { backgroundColor: item.color },
                    ]}
                  />
                  <View>
                    <Text
                      style={[
                        styles.distributionLabel,
                        { color: theme.colors.text },
                      ]}
                    >
                      {item.label}
                    </Text>
                    <Text
                      style={[
                        styles.distributionRange,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      Score {item.range}
                    </Text>
                  </View>
                </View>
                <View style={styles.distributionRight}>
                  <View style={styles.distributionBarContainer}>
                    <View
                      style={[
                        styles.distributionBar,
                        {
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.distributionCount,
                      { color: theme.colors.text },
                    ]}
                  >
                    {item.count.toLocaleString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Scoring Factors */}
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
                Scoring Factors
              </Text>
            </View>
          </View>

          <View style={styles.factorsList}>
            {scoringFactors.map((factor) => (
              <View key={factor.factor} style={styles.factorItem}>
                <View style={styles.factorLeft}>
                  <View
                    style={[
                      styles.factorIcon,
                      { backgroundColor: theme.colors.primary + '15' },
                    ]}
                  >
                    <factor.icon size={16} color={theme.colors.primary} />
                  </View>
                  <View>
                    <Text
                      style={[styles.factorName, { color: theme.colors.text }]}
                    >
                      {factor.factor}
                    </Text>
                    <Text
                      style={[
                        styles.factorWeight,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      Weight: {factor.weight}
                    </Text>
                  </View>
                </View>
                <View style={styles.factorRight}>
                  <View style={styles.factorScoreContainer}>
                    <View
                      style={[
                        styles.factorScoreBar,
                        {
                          width: `${factor.score}%`,
                          backgroundColor: getScoreColor(factor.score),
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.factorScore,
                      { color: getScoreColor(factor.score) },
                    ]}
                  >
                    {factor.score}
                  </Text>
                </View>
              </View>
            ))}
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
              The AI Engagement Scoring Agent is part of our Enterprise suite.
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

  const renderMembersTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Search Header */}
        <View style={styles.searchHeader}>
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

        {/* Top Members */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Award size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Top Engaged Members
              </Text>
            </View>
          </View>

          <View style={styles.membersList}>
            {topMembers.map((member, index) => (
              <View key={member.id} style={styles.memberItem}>
                <View style={styles.memberLeft}>
                  <View
                    style={[
                      styles.memberRank,
                      { backgroundColor: getScoreColor(member.score) + '15' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.memberRankText,
                        { color: getScoreColor(member.score) },
                      ]}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={[styles.memberName, { color: theme.colors.text }]}
                    >
                      {member.name}
                    </Text>
                    <Text
                      style={[
                        styles.memberTier,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      {member.tier} • {member.lastActivity}
                    </Text>
                  </View>
                </View>
                <View style={styles.memberRight}>
                  <View
                    style={[
                      styles.scoreBadge,
                      { backgroundColor: getScoreColor(member.score) + '15' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.scoreValue,
                        { color: getScoreColor(member.score) },
                      ]}
                    >
                      {member.score}
                    </Text>
                  </View>
                  <ChevronRight size={18} color={theme.colors.secondaryText} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Changes */}
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
                Recent Score Changes
              </Text>
            </View>
          </View>

          <View style={styles.changesList}>
            {recentChanges.map((change) => (
              <View key={change.id} style={styles.changeItem}>
                <View style={styles.changeLeft}>
                  <View
                    style={[
                      styles.changeIcon,
                      {
                        backgroundColor:
                          change.type === 'positive' ? '#10B98115' : '#EF444415',
                      },
                    ]}
                  >
                    {change.type === 'positive' ? (
                      <TrendingUp size={16} color="#10B981" />
                    ) : (
                      <AlertCircle size={16} color="#EF4444" />
                    )}
                  </View>
                  <View>
                    <Text
                      style={[styles.changeMember, { color: theme.colors.text }]}
                    >
                      {change.member}
                    </Text>
                    <Text
                      style={[
                        styles.changeReason,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      {change.reason}
                    </Text>
                  </View>
                </View>
                <View style={styles.changeRight}>
                  <Text
                    style={[
                      styles.changeValue,
                      {
                        color: change.type === 'positive' ? '#10B981' : '#EF4444',
                      },
                    ]}
                  >
                    {change.change}
                  </Text>
                  <Text
                    style={[
                      styles.changeTime,
                      { color: theme.colors.secondaryText },
                    ]}
                  >
                    {change.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const renderSettingsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Settings size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Scoring Configuration
              </Text>
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Real-time Scoring
              </Text>
              <Text
                style={[
                  styles.settingDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Update scores immediately after activity
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Predictive Scoring
              </Text>
              <Text
                style={[
                  styles.settingDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Forecast future engagement scores
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Auto-Notifications
              </Text>
              <Text
                style={[
                  styles.settingDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Alert on significant score changes
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Score Decay
              </Text>
              <Text
                style={[
                  styles.settingDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Reduce scores after 30 days inactivity
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </View>

        {/* Score Thresholds */}
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
                Score Thresholds
              </Text>
            </View>
          </View>

          <View style={styles.thresholdItem}>
            <View style={styles.thresholdLeft}>
              <View style={[styles.thresholdDot, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.thresholdLabel, { color: theme.colors.text }]}>
                Champion (90-100)
              </Text>
            </View>
            <TextInput
              style={[
                styles.thresholdInput,
                {
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                },
              ]}
              value="90"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.thresholdItem}>
            <View style={styles.thresholdLeft}>
              <View style={[styles.thresholdDot, { backgroundColor: '#3B82F6' }]} />
              <Text style={[styles.thresholdLabel, { color: theme.colors.text }]}>
                Loyal (70-89)
              </Text>
            </View>
            <TextInput
              style={[
                styles.thresholdInput,
                {
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                },
              ]}
              value="70"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.thresholdItem}>
            <View style={styles.thresholdLeft}>
              <View style={[styles.thresholdDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={[styles.thresholdLabel, { color: theme.colors.text }]}>
                Potential (50-69)
              </Text>
            </View>
            <TextInput
              style={[
                styles.thresholdInput,
                {
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                },
              ]}
              value="50"
              keyboardType="numeric"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'scores', label: 'Scores', icon: Activity, component: renderScoresTab() },
    { id: 'members', label: 'Members', icon: Users, component: renderMembersTab() },
    { id: 'settings', label: 'Settings', icon: Settings, component: renderSettingsTab() },
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
  distributionList: { gap: 16 },
  distributionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distributionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, width: 120 },
  distributionDot: { width: 12, height: 12, borderRadius: 6 },
  distributionLabel: { fontSize: 14, fontWeight: '600' },
  distributionRange: { fontSize: 12, marginTop: 2 },
  distributionRight: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  distributionBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  distributionBar: { height: '100%', borderRadius: 4 },
  distributionCount: { fontSize: 14, fontWeight: '700', width: 50, textAlign: 'right' },
  factorsList: { gap: 16 },
  factorItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  factorLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  factorIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  factorName: { fontSize: 14, fontWeight: '600' },
  factorWeight: { fontSize: 12, marginTop: 2 },
  factorRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  factorScoreContainer: {
    width: 80,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  factorScoreBar: { height: '100%', borderRadius: 3 },
  factorScore: { fontSize: 15, fontWeight: '700', width: 30 },
  searchHeader: {
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
  membersList: { gap: 4 },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  memberLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  memberRank: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberRankText: { fontSize: 14, fontWeight: '700' },
  memberName: { fontSize: 15, fontWeight: '600' },
  memberTier: { fontSize: 12, marginTop: 2 },
  memberRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  scoreBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  scoreValue: { fontSize: 15, fontWeight: '700' },
  changesList: { gap: 12 },
  changeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 14,
    borderRadius: 12,
  },
  changeLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  changeIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeMember: { fontSize: 15, fontWeight: '600' },
  changeReason: { fontSize: 12, marginTop: 2 },
  changeRight: { alignItems: 'flex-end' },
  changeValue: { fontSize: 16, fontWeight: '700' },
  changeTime: { fontSize: 11, marginTop: 2 },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingInfo: { flex: 1, marginRight: 16 },
  settingLabel: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  settingDesc: { fontSize: 13 },
  thresholdItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  thresholdLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  thresholdDot: { width: 12, height: 12, borderRadius: 6 },
  thresholdLabel: { fontSize: 15, fontWeight: '500' },
  thresholdInput: {
    width: 50,
    height: 36,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 14,
    textAlign: 'center',
  },
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
