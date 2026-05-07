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
  Gift,
  Palette,
  Coins,
  Target,
  Sparkles,
  Settings,
  Lock,
  ChartBarBig,
  CircleCheck,
  Plus,
  Edit3,
  Copy,
  Trash2,
  ChevronRight,
  TrendingUp,
  Users,
  Star,
  Zap,
  Layers,
  Calculator,
  Percent,
  BadgeCheck,
  Clock,
  MoreHorizontal,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIRewardsProgramDesignerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-rewards-program-designer')!;

  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const [activeTab, setActiveTab] = useState('programs');
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

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

  // Program Templates
  const programTemplates = [
    {
      id: 'points-based',
      name: 'Points-Based Rewards',
      description: 'Classic points accumulation system',
      icon: Coins,
      color: '#F59E0B',
      popular: true,
    },
    {
      id: 'tier-based',
      name: 'Tier-Based Program',
      description: 'Status levels with increasing benefits',
      icon: Layers,
      color: '#8B5CF6',
      popular: false,
    },
    {
      id: 'cashback',
      name: 'Cashback Rewards',
      description: 'Direct percentage return on spend',
      icon: Percent,
      color: '#10B981',
      popular: false,
    },
    {
      id: 'vip-exclusive',
      name: 'VIP Exclusive',
      description: 'Invitation-only premium rewards',
      icon: Star,
      color: '#EF4444',
      popular: false,
    },
  ];

  // Existing Programs
  const existingPrograms = [
    {
      id: 'prog-1',
      name: 'Gold Rewards Plus',
      type: 'points-based',
      status: 'active',
      members: 8450,
      avgEngagement: '78.4%',
      monthlyRedemptions: 1240,
      revenue: '$145K',
      lastModified: '2 days ago',
    },
    {
      id: 'prog-2',
      name: 'Platinum Elite',
      type: 'tier-based',
      status: 'active',
      members: 2100,
      avgEngagement: '92.1%',
      monthlyRedemptions: 580,
      revenue: '$89K',
      lastModified: '1 week ago',
    },
    {
      id: 'prog-3',
      name: 'Flash Rewards',
      type: 'cashback',
      status: 'draft',
      members: 0,
      avgEngagement: '-',
      monthlyRedemptions: 0,
      revenue: '-',
      lastModified: 'Just now',
    },
  ];

  // Program Designer State
  const [programConfig, setProgramConfig] = useState({
    name: '',
    type: 'points-based',
    pointValue: 100,
    pointCost: 1,
    welcomeBonus: 500,
    referralBonus: 1000,
    tierCount: 4,
    expirationMonths: 24,
    autoUpgrade: true,
    birthdayBonus: true,
  });

  const renderProgramsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Gift size={20} color="#fff" />
            <Text style={styles.metricValue}>3</Text>
            <Text style={styles.metricLabel}>Active Programs</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <Users size={20} color="#fff" />
            <Text style={styles.metricValue}>10.5K</Text>
            <Text style={styles.metricLabel}>Total Members</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <TrendingUp size={20} color="#fff" />
            <Text style={styles.metricValue}>82.3%</Text>
            <Text style={styles.metricLabel}>Avg Engagement</Text>
          </LinearGradient>

          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <Coins size={20} color="#fff" />
            <Text style={styles.metricValue}>$234K</Text>
            <Text style={styles.metricLabel}>Total Revenue</Text>
          </LinearGradient>
        </View>

        {/* Create New Section */}
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
                Create New Program
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.sectionDescription,
              { color: theme.colors.secondaryText },
            ]}
          >
            Choose a template to get started or create from scratch
          </Text>

          <View style={styles.templateGrid}>
            {programTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[
                  styles.templateCard,
                  { backgroundColor: theme.colors.background },
                ]}
                onPress={() => {
                  setProgramConfig({ ...programConfig, type: template.id });
                  setIsCreating(true);
                }}
              >
                <View
                  style={[
                    styles.templateIcon,
                    { backgroundColor: template.color + '15' },
                  ]}
                >
                  <template.icon size={24} color={template.color} />
                </View>
                <Text
                  style={[
                    styles.templateName,
                    { color: theme.colors.text },
                  ]}
                >
                  {template.name}
                </Text>
                <Text
                  style={[
                    styles.templateDesc,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  {template.description}
                </Text>
                {template.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>Popular</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Existing Programs */}
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
                Existing Programs
              </Text>
            </View>
          </View>

          {existingPrograms.map((program) => (
            <TouchableOpacity
              key={program.id}
              style={[
                styles.programCard,
                { backgroundColor: theme.colors.background },
              ]}
              onPress={() => setSelectedProgram(program.id)}
            >
              <View style={styles.programHeader}>
                <View style={styles.programTitleRow}>
                  <Text
                    style={[
                      styles.programName,
                      { color: theme.colors.text },
                    ]}
                  >
                    {program.name}
                  </Text>
                  <View
                    style={[
                      styles.programStatus,
                      {
                        backgroundColor:
                          program.status === 'active'
                            ? '#10B98120'
                            : '#F59E0B20',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.programStatusText,
                        {
                          color:
                            program.status === 'active'
                              ? '#10B981'
                              : '#F59E0B',
                        },
                      ]}
                    >
                      ● {program.status}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <MoreHorizontal size={18} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              </View>

              <View style={styles.programStats}>
                <View style={styles.programStat}>
                  <Text
                    style={[
                      styles.programStatLabel,
                      { color: theme.colors.secondaryText },
                    ]}
                  >
                    Members
                  </Text>
                  <Text
                    style={[
                      styles.programStatValue,
                      { color: theme.colors.text },
                    ]}
                  >
                    {program.members.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.programStat}>
                  <Text
                    style={[
                      styles.programStatLabel,
                      { color: theme.colors.secondaryText },
                    ]}
                  >
                    Engagement
                  </Text>
                  <Text
                    style={[
                      styles.programStatValue,
                      { color: theme.colors.text },
                    ]}
                  >
                    {program.avgEngagement}
                  </Text>
                </View>
                <View style={styles.programStat}>
                  <Text
                    style={[
                      styles.programStatLabel,
                      { color: theme.colors.secondaryText },
                    ]}
                  >
                    Monthly Redemptions
                  </Text>
                  <Text
                    style={[
                      styles.programStatValue,
                      { color: theme.colors.text },
                    ]}
                  >
                    {program.monthlyRedemptions}
                  </Text>
                </View>
                <View style={styles.programStat}>
                  <Text
                    style={[
                      styles.programStatLabel,
                      { color: theme.colors.secondaryText },
                    ]}
                  >
                    Revenue
                  </Text>
                  <Text
                    style={[
                      styles.programStatValue,
                      { color: '#10B981' },
                    ]}
                  >
                    {program.revenue}
                  </Text>
                </View>
              </View>

              <View style={styles.programFooter}>
                <Text
                  style={[
                    styles.programModified,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  Modified {program.lastModified}
                </Text>
                <View style={styles.programActions}>
                  <TouchableOpacity
                    style={[
                      styles.programActionBtn,
                      { backgroundColor: theme.colors.primary + '15' },
                    ]}
                  >
                    <Edit3 size={14} color={theme.colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.programActionBtn,
                      { backgroundColor: theme.colors.primary + '15' },
                    ]}
                  >
                    <Copy size={14} color={theme.colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
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
              The AI Rewards Program Designer is part of our Enterprise suite.
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

  const renderDesignerTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Program Builder Form */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Palette size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Program Designer
              </Text>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text
              style={[styles.formLabel, { color: theme.colors.text }]}
            >
              Program Name
            </Text>
            <TextInput
              style={[
                styles.formInput,
                {
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                },
              ]}
              placeholder="Enter program name"
              placeholderTextColor={theme.colors.secondaryText}
              value={programConfig.name}
              onChangeText={(text) =>
                setProgramConfig({ ...programConfig, name: text })
              }
            />
          </View>

          <View style={styles.formGroup}>
            <Text
              style={[styles.formLabel, { color: theme.colors.text }]}
            >
              Point Value Configuration
            </Text>
            <View style={styles.pointConfig}>
              <View style={styles.pointInput}>
                <Text
                  style={[
                    styles.pointLabel,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  Points per $
                </Text>
                <TextInput
                  style={[
                    styles.pointValueInput,
                    {
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                    },
                  ]}
                  keyboardType="numeric"
                  value={programConfig.pointValue.toString()}
                  onChangeText={(text) =>
                    setProgramConfig({
                      ...programConfig,
                      pointValue: parseInt(text) || 0,
                    })
                  }
                />
              </View>
              <View style={styles.pointInput}>
                <Text
                  style={[
                    styles.pointLabel,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  Point Value ($)
                </Text>
                <TextInput
                  style={[
                    styles.pointValueInput,
                    {
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                    },
                  ]}
                  keyboardType="numeric"
                  value={programConfig.pointCost.toString()}
                  onChangeText={(text) =>
                    setProgramConfig({
                      ...programConfig,
                      pointCost: parseInt(text) || 0,
                    })
                  }
                />
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text
              style={[styles.formLabel, { color: theme.colors.text }]}
            >
              Bonus Configuration
            </Text>
            <View style={styles.bonusConfig}>
              <View style={styles.bonusItem}>
                <View style={styles.bonusInfo}>
                  <Gift size={18} color={theme.colors.primary} />
                  <Text
                    style={[styles.bonusText, { color: theme.colors.text }]}
                  >
                    Welcome Bonus
                  </Text>
                </View>
                <TextInput
                  style={[
                    styles.bonusInput,
                    {
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                    },
                  ]}
                  keyboardType="numeric"
                  value={programConfig.welcomeBonus.toString()}
                  onChangeText={(text) =>
                    setProgramConfig({
                      ...programConfig,
                      welcomeBonus: parseInt(text) || 0,
                    })
                  }
                />
              </View>
              <View style={styles.bonusItem}>
                <View style={styles.bonusInfo}>
                  <Users size={18} color={theme.colors.primary} />
                  <Text
                    style={[styles.bonusText, { color: theme.colors.text }]}
                  >
                    Referral Bonus
                  </Text>
                </View>
                <TextInput
                  style={[
                    styles.bonusInput,
                    {
                      backgroundColor: theme.colors.background,
                      color: theme.colors.text,
                    },
                  ]}
                  keyboardType="numeric"
                  value={programConfig.referralBonus.toString()}
                  onChangeText={(text) =>
                    setProgramConfig({
                      ...programConfig,
                      referralBonus: parseInt(text) || 0,
                    })
                  }
                />
              </View>
            </View>
          </View>
        </View>

        {/* Advanced Settings */}
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
                Advanced Settings
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
            <Switch
              value={programConfig.autoUpgrade}
              onValueChange={(value) =>
                setProgramConfig({ ...programConfig, autoUpgrade: value })
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text
                style={[styles.settingLabel, { color: theme.colors.text }]}
              >
                Birthday Bonus
              </Text>
              <Text
                style={[
                  styles.settingDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Send bonus points on member birthdays
              </Text>
            </View>
            <Switch
              value={programConfig.birthdayBonus}
              onValueChange={(value) =>
                setProgramConfig({ ...programConfig, birthdayBonus: value })
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text
                style={[styles.settingLabel, { color: theme.colors.text }]}
              >
                Point Expiration
              </Text>
              <Text
                style={[
                  styles.settingDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Points expire after {programConfig.expirationMonths} months
              </Text>
            </View>
            <TextInput
              style={[
                styles.expirationInput,
                {
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                },
              ]}
              keyboardType="numeric"
              value={programConfig.expirationMonths.toString()}
              onChangeText={(text) =>
                setProgramConfig({
                  ...programConfig,
                  expirationMonths: parseInt(text) || 0,
                })
              }
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.saveBtn,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <CircleCheck size={18} color="#fff" />
            <Text style={styles.saveBtnText}>Save Program</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.previewBtn,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Sparkles size={18} color={theme.colors.text} />
            <Text
              style={[styles.previewBtnText, { color: theme.colors.text }]}
            >
              Preview
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Performance Overview */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <ChartBarBig size={20} color="#fff" />
            <Text style={styles.metricValue}>4.2x</Text>
            <Text style={styles.metricLabel}>Program ROI</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <BadgeCheck size={20} color="#fff" />
            <Text style={styles.metricValue}>68.4%</Text>
            <Text style={styles.metricLabel}>Redemption Rate</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>14.2</Text>
            <Text style={styles.metricLabel}>Avg Days to Redeem</Text>
          </LinearGradient>

          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <Zap size={20} color="#fff" />
            <Text style={styles.metricValue}>2.8x</Text>
            <Text style={styles.metricLabel}>Engagement Lift</Text>
          </LinearGradient>
        </View>

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
                AI Recommendations
              </Text>
            </View>
          </View>

          <View style={styles.recommendationCard}>
            <View style={styles.recommendationIcon}>
              <Target size={20} color="#10B981" />
            </View>
            <View style={styles.recommendationContent}>
              <Text
                style={[styles.recommendationTitle, { color: theme.colors.text }]}
              >
                Optimize Point Economics
              </Text>
              <Text
                style={[
                  styles.recommendationDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Current point liability ratio at 18%. Reducing by 2% could
                improve margins by $45K annually.
              </Text>
            </View>
          </View>

          <View style={styles.recommendationCard}>
            <View style={styles.recommendationIcon}>
              <Users size={20} color="#F59E0B" />
            </View>
            <View style={styles.recommendationContent}>
              <Text
                style={[styles.recommendationTitle, { color: theme.colors.text }]}
              >
                Tier Migration Opportunity
              </Text>
              <Text
                style={[
                  styles.recommendationDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                2,400 Silver members approaching Gold threshold. Targeted
                campaign could drive $340K additional revenue.
              </Text>
            </View>
          </View>

          <View style={styles.recommendationCard}>
            <View style={styles.recommendationIcon}>
              <Gift size={20} color="#8B5CF6" />
            </View>
            <View style={styles.recommendationContent}>
              <Text
                style={[styles.recommendationTitle, { color: theme.colors.text }]}
              >
                Reward Catalog Expansion
              </Text>
              <Text
                style={[
                  styles.recommendationDesc,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Adding experiential rewards could increase redemption rate by
                15% and member satisfaction by 22%.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'programs', label: 'Programs', icon: Gift, component: renderProgramsTab() },
    { id: 'designer', label: 'Designer', icon: Palette, component: renderDesignerTab() },
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
    marginBottom: 12,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  sectionDescription: { fontSize: 14, marginBottom: 20, lineHeight: 20 },
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  templateCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  templateName: { fontSize: 14, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  templateDesc: { fontSize: 12, textAlign: 'center', lineHeight: 16 },
  popularBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  programCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  programTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  programName: { fontSize: 16, fontWeight: '700' },
  programStatus: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  programStatusText: { fontSize: 11, fontWeight: '600' },
  programStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  programStat: { alignItems: 'center' },
  programStatLabel: { fontSize: 11, marginBottom: 4 },
  programStatValue: { fontSize: 15, fontWeight: '700' },
  programFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  programModified: { fontSize: 12 },
  programActions: { flexDirection: 'row', gap: 8 },
  programActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formGroup: { marginBottom: 20 },
  formLabel: { fontSize: 15, fontWeight: '600', marginBottom: 10 },
  formInput: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  pointConfig: {
    flexDirection: 'row',
    gap: 12,
  },
  pointInput: { flex: 1 },
  pointLabel: { fontSize: 12, marginBottom: 6 },
  pointValueInput: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  bonusConfig: { gap: 12 },
  bonusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bonusInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  bonusText: { fontSize: 15, fontWeight: '500' },
  bonusInput: {
    width: 100,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    textAlign: 'center',
  },
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
  expirationInput: {
    width: 60,
    height: 36,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  saveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 14,
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  previewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 24,
  },
  previewBtnText: { fontSize: 16, fontWeight: '600' },
  recommendationCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 16,
    marginBottom: 12,
  },
  recommendationIcon: { marginRight: 12, marginTop: 2 },
  recommendationContent: { flex: 1 },
  recommendationTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  recommendationDesc: { fontSize: 13, lineHeight: 20 },
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
