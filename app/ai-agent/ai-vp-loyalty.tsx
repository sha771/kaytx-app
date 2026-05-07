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
  Crown,
  Gift,
  TrendingUp,
  Users,
  Star,
  Award,
  Target,
  Zap,
  Settings,
  Lock,
  ChartBar,
  ChartBarBig,
  CircleCheck,
  CircleAlert,
  Clock,
  ChevronRight,
  Plus,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  Sparkles,
  Heart,
  Wallet,
  BadgePercent,
  Layers,
  Filter,
  Search,
  MoreHorizontal,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIVPLoyaltyScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-vp-loyalty')!;

  // Fetch real data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({
    category: 'customer-experience',
  });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({
    category: 'customer-experience',
    limit: 10,
  });
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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

  // Loyalty Program Metrics
  const loyaltyMetrics = useMemo(() => {
    if (!statsData)
      return {
        totalMembers: 0,
        activeMembers: 0,
        avgLifetimeValue: '$0',
        redemptionRate: '0%',
        churnPrevented: 0,
        pointsIssued: 0,
      };
    return {
      totalMembers: statsData.tasksToday * 12,
      activeMembers: Math.round(statsData.tasksToday * 12 * 0.78),
      avgLifetimeValue: '$2,847',
      redemptionRate: '64.2%',
      churnPrevented: Math.round(statsData.tasksToday * 0.15),
      pointsIssued: statsData.tasksToday * 1450,
    };
  }, [statsData]);

  // Tier Distribution
  const tierDistribution = [
    { tier: 'Platinum', count: 1240, color: '#E5E4E2', percentage: 8 },
    { tier: 'Gold', count: 5680, color: '#FFD700', percentage: 35 },
    { tier: 'Silver', count: 7240, color: '#C0C0C0', percentage: 45 },
    { tier: 'Bronze', count: 1840, color: '#CD7F32', percentage: 12 },
  ];

  // Recent Activity
  const recentActivities = [
    {
      id: 1,
      type: 'tier_upgrade',
      member: 'Sarah Johnson',
      action: 'Upgraded to Gold Tier',
      time: '2 min ago',
      value: '+$150 LTV',
    },
    {
      id: 2,
      type: 'reward_redeemed',
      member: 'Michael Chen',
      action: 'Redeemed 5,000 points',
      time: '5 min ago',
      value: '$50 reward',
    },
    {
      id: 3,
      type: 'points_earned',
      member: 'Emily Davis',
      action: 'Earned 2,500 bonus points',
      time: '12 min ago',
      value: '2.5x multiplier',
    },
    {
      id: 4,
      type: 'churn_prevented',
      member: 'David Wilson',
      action: 'Retained via win-back offer',
      time: '18 min ago',
      value: '$1,200 saved',
    },
  ];

  // Active Campaigns
  const activeCampaigns = [
    {
      id: 1,
      name: 'Summer Rewards Boost',
      status: 'active',
      participants: 8450,
      conversionRate: '34.2%',
      roi: '4.8x',
    },
    {
      id: 2,
      name: 'VIP Early Access',
      status: 'active',
      participants: 2100,
      conversionRate: '67.8%',
      roi: '8.2x',
    },
    {
      id: 3,
      name: 'Birthday Celebration',
      status: 'scheduled',
      participants: 0,
      conversionRate: '-',
      roi: '-',
    },
  ];

  // Sub-agents list
  const subAgents = [
    {
      id: 'ai-rewards-program-designer',
      name: 'Rewards Program Designer',
      status: 'active',
      tasks: 156,
      icon: Gift,
    },
    {
      id: 'ai-loyalty-tier-analyst',
      name: 'Loyalty Tier Analyst',
      status: 'active',
      tasks: 89,
      icon: Layers,
    },
    {
      id: 'ai-engagement-scoring-agent',
      name: 'Engagement Scoring Agent',
      status: 'active',
      tasks: 234,
      icon: Activity,
    },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Key Metrics Grid */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Users size={20} color="#fff" />
            <Text style={styles.metricValue}>
              {loyaltyMetrics.totalMembers.toLocaleString()}
            </Text>
            <Text style={styles.metricLabel}>Total Members</Text>
            <View style={styles.metricChange}>
              <TrendingUp size={12} color="#34C759" />
              <Text style={styles.metricChangeText}>+12.5%</Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Star size={20} color="#fff" />
            <Text style={styles.metricValue}>{loyaltyMetrics.redemptionRate}</Text>
            <Text style={styles.metricLabel}>Redemption Rate</Text>
            <View style={styles.metricChange}>
              <TrendingUp size={12} color="#34C759" />
              <Text style={styles.metricChangeText}>+5.3%</Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <Wallet size={20} color="#fff" />
            <Text style={styles.metricValue}>
              {loyaltyMetrics.avgLifetimeValue}
            </Text>
            <Text style={styles.metricLabel}>Avg Lifetime Value</Text>
            <View style={styles.metricChange}>
              <TrendingUp size={12} color="#34C759" />
              <Text style={styles.metricChangeText}>+8.7%</Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}>
            <Heart size={20} color="#fff" />
            <Text style={styles.metricValue}>
              {loyaltyMetrics.churnPrevented}
            </Text>
            <Text style={styles.metricLabel}>Churn Prevented</Text>
            <View style={styles.metricChange}>
              <TrendingUp size={12} color="#34C759" />
              <Text style={styles.metricChangeText}>+23.1%</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Tier Distribution */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Layers size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Tier Distribution
              </Text>
            </View>
            <TouchableOpacity>
              <MoreHorizontal size={20} color={theme.colors.secondaryText} />
            </TouchableOpacity>
          </View>

          <View style={styles.tierList}>
            {tierDistribution.map((tier) => (
              <View key={tier.tier} style={styles.tierRow}>
                <View style={styles.tierInfo}>
                  <View
                    style={[styles.tierDot, { backgroundColor: tier.color }]}
                  />
                  <Text
                    style={[styles.tierName, { color: theme.colors.text }]}
                  >
                    {tier.tier}
                  </Text>
                </View>
                <View style={styles.tierStats}>
                  <Text
                    style={[
                      styles.tierCount,
                      { color: theme.colors.secondaryText },
                    ]}
                  >
                    {tier.count.toLocaleString()}
                  </Text>
                  <View style={styles.tierBarContainer}>
                    <View
                      style={[
                        styles.tierBar,
                        {
                          width: `${tier.percentage}%`,
                          backgroundColor: tier.color,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.tierPercentage,
                      { color: theme.colors.text },
                    ]}
                  >
                    {tier.percentage}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Sub-Agents Status */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Zap size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Active Sub-Agents
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/ai-agent/ai-rewards-program-designer')}
            >
              <Text
                style={[
                  styles.viewAllText,
                  { color: theme.colors.primary },
                ]}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {subAgents.map((subAgent) => (
            <TouchableOpacity
              key={subAgent.id}
              style={styles.subAgentRow}
              onPress={() => router.push(`/ai-agent/${subAgent.id}`)}
            >
              <View style={styles.subAgentInfo}>
                <View
                  style={[
                    styles.subAgentIcon,
                    { backgroundColor: theme.colors.primary + '15' },
                  ]}
                >
                  <subAgent.icon size={18} color={theme.colors.primary} />
                </View>
                <View>
                  <Text
                    style={[
                      styles.subAgentName,
                      { color: theme.colors.text },
                    ]}
                  >
                    {subAgent.name}
                  </Text>
                  <Text
                    style={[
                      styles.subAgentStatus,
                      { color: '#34C759' },
                    ]}
                  >
                    ● {subAgent.status}
                  </Text>
                </View>
              </View>
              <View style={styles.subAgentStats}>
                <Text
                  style={[
                    styles.subAgentTasks,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  {subAgent.tasks} tasks
                </Text>
                <ChevronRight size={18} color={theme.colors.secondaryText} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
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
                Recent Activity
              </Text>
            </View>
          </View>

          {recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityRow}>
              <View
                style={[
                  styles.activityIcon,
                  {
                    backgroundColor:
                      activity.type === 'tier_upgrade'
                        ? '#FFD70020'
                        : activity.type === 'reward_redeemed'
                        ? '#10B98120'
                        : activity.type === 'churn_prevented'
                        ? '#EF444420'
                        : '#8B5CF620',
                  },
                ]}
              >
                {activity.type === 'tier_upgrade' && (
                  <Award size={16} color="#FFD700" />
                )}
                {activity.type === 'reward_redeemed' && (
                  <Gift size={16} color="#10B981" />
                )}
                {activity.type === 'points_earned' && (
                  <Star size={16} color="#8B5CF6" />
                )}
                {activity.type === 'churn_prevented' && (
                  <Heart size={16} color="#EF4444" />
                )}
              </View>
              <View style={styles.activityInfo}>
                <Text
                  style={[styles.activityMember, { color: theme.colors.text }]}
                >
                  {activity.member}
                </Text>
                <Text
                  style={[
                    styles.activityAction,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  {activity.action}
                </Text>
              </View>
              <View style={styles.activityMeta}>
                <Text
                  style={[
                    styles.activityValue,
                    { color: theme.colors.primary },
                  ]}
                >
                  {activity.value}
                </Text>
                <Text
                  style={[
                    styles.activityTime,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  {activity.time}
                </Text>
              </View>
            </View>
          ))}
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
              The AI VP Loyalty is part of our Enterprise suite. Upgrade your
              plan to activate this agent.
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

  const renderCampaignsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Campaign Stats */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <BadgePercent size={20} color="#fff" />
            <Text style={styles.metricValue}>3</Text>
            <Text style={styles.metricLabel}>Active Campaigns</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <Target size={20} color="#fff" />
            <Text style={styles.metricValue}>42.1%</Text>
            <Text style={styles.metricLabel}>Avg Conversion</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <ChartBarBig size={20} color="#fff" />
            <Text style={styles.metricValue}>6.5x</Text>
            <Text style={styles.metricLabel}>Avg ROI</Text>
          </LinearGradient>

          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <Users size={20} color="#fff" />
            <Text style={styles.metricValue}>10.5K</Text>
            <Text style={styles.metricLabel}>Participants</Text>
          </LinearGradient>
        </View>

        {/* Campaign List */}
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
                Campaign Management
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.createBtn,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Plus size={16} color="#fff" />
              <Text style={styles.createBtnText}>New Campaign</Text>
            </TouchableOpacity>
          </View>

          {activeCampaigns.map((campaign) => (
            <View key={campaign.id} style={styles.campaignCard}>
              <View style={styles.campaignHeader}>
                <View style={styles.campaignTitleRow}>
                  <Text
                    style={[
                      styles.campaignName,
                      { color: theme.colors.text },
                    ]}
                  >
                    {campaign.name}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          campaign.status === 'active'
                            ? '#10B98120'
                            : '#F59E0B20',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            campaign.status === 'active'
                              ? '#10B981'
                              : '#F59E0B',
                        },
                      ]}
                    >
                      {campaign.status === 'active' ? '● Active' : '○ Scheduled'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.campaignStats}>
                <View style={styles.campaignStat}>
                  <Text
                    style={[
                      styles.campaignStatLabel,
                      { color: theme.colors.secondaryText },
                    ]}
                  >
                    Participants
                  </Text>
                  <Text
                    style={[
                      styles.campaignStatValue,
                      { color: theme.colors.text },
                    ]}
                  >
                    {campaign.participants.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.campaignStat}>
                  <Text
                    style={[
                      styles.campaignStatLabel,
                      { color: theme.colors.secondaryText },
                    ]}
                  >
                    Conversion
                  </Text>
                  <Text
                    style={[
                      styles.campaignStatValue,
                      { color: theme.colors.text },
                    ]}
                  >
                    {campaign.conversionRate}
                  </Text>
                </View>
                <View style={styles.campaignStat}>
                  <Text
                    style={[
                      styles.campaignStatLabel,
                      { color: theme.colors.secondaryText },
                    ]}
                  >
                    ROI
                  </Text>
                  <Text
                    style={[
                      styles.campaignStatValue,
                      { color: '#10B981' },
                    ]}
                  >
                    {campaign.roi}
                  </Text>
                </View>
              </View>
            </View>
          ))}
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
              placeholder="Search analytics..."
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
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Performance Metrics */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <ChartBar size={20} color="#fff" />
            <Text style={styles.metricValue}>94.2%</Text>
            <Text style={styles.metricLabel}>Member Satisfaction</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <BarChart3 size={20} color="#fff" />
            <Text style={styles.metricValue}>3.2x</Text>
            <Text style={styles.metricLabel}>Engagement Lift</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <PieChart size={20} color="#fff" />
            <Text style={styles.metricValue}>78.4%</Text>
            <Text style={styles.metricLabel}>Retention Rate</Text>
          </LinearGradient>

          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>2.4s</Text>
            <Text style={styles.metricLabel}>Avg Response</Text>
          </LinearGradient>
        </View>

        {/* Insights Section */}
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
                AI Insights
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <TrendingUp size={20} color="#10B981" />
            </View>
            <View style={styles.insightContent}>
              <Text
                style={[styles.insightTitle, { color: theme.colors.text }]}
              >
                Tier Migration Opportunity
              </Text>
              <Text
                style={[
                  styles.insightDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                2,400 Silver members show Gold-tier activity patterns. Targeted
                campaign could drive $340K additional revenue.
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Bell size={20} color="#F59E0B" />
            </View>
            <View style={styles.insightContent}>
              <Text
                style={[styles.insightTitle, { color: theme.colors.text }]}
              >
                At-Risk Members Detected
              </Text>
              <Text
                style={[
                  styles.insightDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                450 members showing decreased engagement. Win-back campaign
                recommended with 85% success probability.
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Award size={20} color="#8B5CF6" />
            </View>
            <View style={styles.insightContent}>
              <Text
                style={[styles.insightTitle, { color: theme.colors.text }]}
              >
                Rewards Optimization
              </Text>
              <Text
                style={[
                  styles.insightDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Current point-to-dollar ratio suboptimal. Adjusting by 15%
                could increase redemption rate by 22%.
              </Text>
            </View>
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
                Program Configuration
              </Text>
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text
                style={[styles.settingLabel, { color: theme.colors.text }]}
              >
                Auto-Tier Upgrades
              </Text>
              <Text
                style={[
                  styles.settingDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Automatically upgrade members when criteria met
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text
                style={[styles.settingLabel, { color: theme.colors.text }]}
              >
                Points Expiration
              </Text>
              <Text
                style={[
                  styles.settingDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Enable point expiration after 24 months
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text
                style={[styles.settingLabel, { color: theme.colors.text }]}
              >
                Birthday Rewards
              </Text>
              <Text
                style={[
                  styles.settingDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Send special rewards on member birthdays
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text
                style={[styles.settingLabel, { color: theme.colors.text }]}
              >
                Churn Prevention
              </Text>
              <Text
                style={[
                  styles.settingDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Auto-engage at-risk members
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </View>

        {/* Tier Configuration */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Layers size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Tier Requirements
              </Text>
            </View>
          </View>

          {tierDistribution.map((tier) => (
            <View key={tier.tier} style={styles.tierConfigRow}>
              <View style={styles.tierConfigInfo}>
                <View
                  style={[styles.tierDot, { backgroundColor: tier.color }]}
                />
                <Text
                  style={[styles.tierConfigName, { color: theme.colors.text }]}
                >
                  {tier.tier}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.tierConfigBtn,
                  { backgroundColor: theme.colors.primary + '15' },
                ]}
              >
                <Text
                  style={[
                    styles.tierConfigBtnText,
                    { color: theme.colors.primary },
                  ]}
                >
                  Configure
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Crown, component: renderOverviewTab() },
    { id: 'campaigns', label: 'Campaigns', icon: Gift, component: renderCampaignsTab() },
    { id: 'analytics', label: 'Analytics', icon: ChartBarBig, component: renderAnalyticsTab() },
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
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  metricChangeText: { fontSize: 11, color: '#fff', fontWeight: '600' },
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
  viewAllText: { fontSize: 14, fontWeight: '600' },
  tierList: { gap: 12 },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tierInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, width: 100 },
  tierDot: { width: 12, height: 12, borderRadius: 6 },
  tierName: { fontSize: 14, fontWeight: '600' },
  tierStats: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tierCount: { fontSize: 13, fontWeight: '600', width: 60 },
  tierBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  tierBar: { height: '100%', borderRadius: 3 },
  tierPercentage: { fontSize: 13, fontWeight: '600', width: 40 },
  subAgentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  subAgentInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  subAgentIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentStatus: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  subAgentStats: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  subAgentTasks: { fontSize: 12, fontWeight: '500' },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityInfo: { flex: 1, marginLeft: 12 },
  activityMember: { fontSize: 14, fontWeight: '600' },
  activityAction: { fontSize: 12, marginTop: 2 },
  activityMeta: { alignItems: 'flex-end' },
  activityValue: { fontSize: 13, fontWeight: '700' },
  activityTime: { fontSize: 11, marginTop: 2 },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  createBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  campaignCard: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 16,
    marginBottom: 12,
  },
  campaignHeader: { marginBottom: 12 },
  campaignTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  campaignName: { fontSize: 16, fontWeight: '700' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600' },
  campaignStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  campaignStat: { alignItems: 'center' },
  campaignStatLabel: { fontSize: 11, marginBottom: 4 },
  campaignStatValue: { fontSize: 16, fontWeight: '700' },
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
  insightCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 16,
    marginBottom: 12,
  },
  insightIcon: { marginRight: 12, marginTop: 2 },
  insightContent: { flex: 1 },
  insightTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  insightDesc: { fontSize: 13, lineHeight: 20 },
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
  tierConfigRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tierConfigInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  tierConfigName: { fontSize: 15, fontWeight: '600' },
  tierConfigBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  tierConfigBtnText: { fontSize: 13, fontWeight: '600' },
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
