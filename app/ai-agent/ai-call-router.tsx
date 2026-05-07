import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Switch,
} from 'react-native';
import {
  Phone,
  Route,
  Users,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Settings,
  Lock,
  ChartBarBig,
  BarChart3,
  PhoneForwarded,
  PhoneMissed,
  PhoneIncoming,
  PhoneOutgoing,
  Headphones,
  Building,
  Zap,
  ChevronRight,
  MoreHorizontal,
  Activity,
  Timer,
  Target,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AICallRouterScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-call-router')!;

  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const [activeTab, setActiveTab] = useState('live');

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

  // Live Call Stats
  const liveStats = {
    activeCalls: 24,
    queuedCalls: 8,
    avgWaitTime: '1m 24s',
    routedToday: 487,
  };

  // Routing Rules
  const routingRules = [
    {
      id: 1,
      name: 'Sales Inquiries',
      condition: 'Intent: purchase, pricing, demo',
      target: 'Sales Team',
      priority: 'High',
      active: true,
      successRate: '94.2%',
    },
    {
      id: 2,
      name: 'Technical Support',
      condition: 'Intent: troubleshooting, bug, error',
      target: 'Support Team',
      priority: 'High',
      active: true,
      successRate: '91.8%',
    },
    {
      id: 3,
      name: 'Billing Questions',
      condition: 'Intent: invoice, payment, refund',
      target: 'Billing Dept',
      priority: 'Medium',
      active: true,
      successRate: '96.5%',
    },
    {
      id: 4,
      name: 'General Inquiries',
      condition: 'Default fallback',
      target: 'Reception',
      priority: 'Low',
      active: true,
      successRate: '88.3%',
    },
  ];

  // Active Calls
  const activeCalls = [
    {
      id: 'CALL-2847',
      from: '+1 (555) 123-4567',
      duration: '2:34',
      routedTo: 'Sales Team',
      status: 'connected',
      intent: 'Product Inquiry',
    },
    {
      id: 'CALL-2848',
      from: '+1 (555) 987-6543',
      duration: '0:45',
      routedTo: 'Support Team',
      status: 'connecting',
      intent: 'Technical Issue',
    },
    {
      id: 'CALL-2849',
      from: '+1 (555) 456-7890',
      duration: '5:12',
      routedTo: 'Billing Dept',
      status: 'connected',
      intent: 'Payment Question',
    },
    {
      id: 'CALL-2850',
      from: '+1 (555) 234-5678',
      duration: '1:08',
      routedTo: 'Sales Team',
      status: 'onhold',
      intent: 'Demo Request',
    },
  ];

  // Queue Stats
  const queueStats = [
    { department: 'Sales', waiting: 3, avgWait: '1m 12s', agents: 8 },
    { department: 'Support', waiting: 4, avgWait: '2m 34s', agents: 12 },
    { department: 'Billing', waiting: 1, avgWait: '0m 45s', agents: 4 },
    { department: 'Reception', waiting: 0, avgWait: '-', agents: 3 },
  ];

  // Performance Metrics
  const performanceData = {
    totalCalls: 2847,
    connected: 2689,
    missed: 158,
    avgRoutingTime: '3.2s',
    satisfaction: '94.2%',
  };

  const renderLiveTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Live Stats */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <PhoneIncoming size={20} color="#fff" />
            <Text style={styles.metricValue}>{liveStats.activeCalls}</Text>
            <Text style={styles.metricLabel}>Active Calls</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Users size={20} color="#fff" />
            <Text style={styles.metricValue}>{liveStats.queuedCalls}</Text>
            <Text style={styles.metricLabel}>In Queue</Text>
          </LinearGradient>

          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>{liveStats.avgWaitTime}</Text>
            <Text style={styles.metricLabel}>Avg Wait</Text>
          </LinearGradient>

          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Route size={20} color="#fff" />
            <Text style={styles.metricValue}>{liveStats.routedToday}</Text>
            <Text style={styles.metricLabel}>Routed Today</Text>
          </LinearGradient>
        </View>

        {/* Active Calls */}
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
                Active Calls
              </Text>
            </View>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>

          <View style={styles.callsList}>
            {activeCalls.map((call) => (
              <View key={call.id} style={styles.callCard}>
                <View style={styles.callHeader}>
                  <View style={styles.callInfo}>
                    <Phone size={16} color={theme.colors.primary} />
                    <Text style={[styles.callNumber, { color: theme.colors.text }]}>
                      {call.from}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.callStatus,
                      {
                        backgroundColor:
                          call.status === 'connected'
                            ? '#10B98120'
                            : call.status === 'connecting'
                            ? '#F59E0B20'
                            : '#6B728020',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.callStatusText,
                        {
                          color:
                            call.status === 'connected'
                              ? '#10B981'
                              : call.status === 'connecting'
                              ? '#F59E0B'
                              : '#6B7280',
                        },
                      ]}
                    >
                      ● {call.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.callDetails}>
                  <View style={styles.callDetail}>
                    <Timer size={14} color={theme.colors.secondaryText} />
                    <Text
                      style={[
                        styles.callDetailText,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      {call.duration}
                    </Text>
                  </View>
                  <View style={styles.callDetail}>
                    <Headphones size={14} color={theme.colors.secondaryText} />
                    <Text
                      style={[
                        styles.callDetailText,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      {call.routedTo}
                    </Text>
                  </View>
                  <View style={styles.callDetail}>
                    <Target size={14} color={theme.colors.secondaryText} />
                    <Text
                      style={[
                        styles.callDetailText,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      {call.intent}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Queue Status */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Users size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Queue Status
              </Text>
            </View>
          </View>

          <View style={styles.queueList}>
            {queueStats.map((queue) => (
              <View key={queue.department} style={styles.queueItem}>
                <View style={styles.queueLeft}>
                  <Building size={16} color={theme.colors.primary} />
                  <Text style={[styles.queueDept, { color: theme.colors.text }]}>
                    {queue.department}
                  </Text>
                </View>
                <View style={styles.queueCenter}>
                  <View style={styles.queueStat}>
                    <Text
                      style={[
                        styles.queueStatValue,
                        { color: theme.colors.text },
                      ]}
                    >
                      {queue.waiting}
                    </Text>
                    <Text
                      style={[
                        styles.queueStatLabel,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      waiting
                    </Text>
                  </View>
                  <View style={styles.queueStat}>
                    <Text
                      style={[
                        styles.queueStatValue,
                        { color: theme.colors.text },
                      ]}
                    >
                      {queue.avgWait}
                    </Text>
                    <Text
                      style={[
                        styles.queueStatLabel,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      avg wait
                    </Text>
                  </View>
                  <View style={styles.queueStat}>
                    <Text
                      style={[
                        styles.queueStatValue,
                        { color: theme.colors.text },
                      ]}
                    >
                      {queue.agents}
                    </Text>
                    <Text
                      style={[
                        styles.queueStatLabel,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      agents
                    </Text>
                  </View>
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
              The AI Call Router is part of our Enterprise suite. Upgrade your
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

  const renderRulesTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Rules List */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Route size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Routing Rules
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.addBtn,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Zap size={16} color="#fff" />
              <Text style={styles.addBtnText}>Add Rule</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rulesList}>
            {routingRules.map((rule) => (
              <View key={rule.id} style={styles.ruleCard}>
                <View style={styles.ruleHeader}>
                  <View style={styles.ruleTitleRow}>
                    <Text
                      style={[styles.ruleName, { color: theme.colors.text }]}
                    >
                      {rule.name}
                    </Text>
                    <View
                      style={[
                        styles.priorityBadge,
                        {
                          backgroundColor:
                            rule.priority === 'High'
                              ? '#EF444420'
                              : rule.priority === 'Medium'
                              ? '#F59E0B20'
                              : '#6B728020',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.priorityText,
                          {
                            color:
                              rule.priority === 'High'
                                ? '#EF4444'
                                : rule.priority === 'Medium'
                                ? '#F59E0B'
                                : '#6B7280',
                          },
                        ]}
                      >
                        {rule.priority}
                      </Text>
                    </View>
                  </View>
                  <Switch value={rule.active} onValueChange={() => {}} />
                </View>

                <View style={styles.ruleDetails}>
                  <View style={styles.ruleDetail}>
                    <Target size={14} color={theme.colors.secondaryText} />
                    <Text
                      style={[
                        styles.ruleDetailText,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      {rule.condition}
                    </Text>
                  </View>
                  <View style={styles.ruleDetail}>
                    <PhoneForwarded size={14} color={theme.colors.secondaryText} />
                    <Text
                      style={[
                        styles.ruleDetailText,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      Routes to: {rule.target}
                    </Text>
                  </View>
                </View>

                <View style={styles.ruleFooter}>
                  <View style={styles.successRate}>
                    <CheckCircle size={14} color="#10B981" />
                    <Text style={styles.successRateText}>
                      {rule.successRate} success rate
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <MoreHorizontal size={18} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
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
        {/* Performance Metrics */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <PhoneIncoming size={20} color="#fff" />
            <Text style={styles.metricValue}>
              {performanceData.totalCalls.toLocaleString()}
            </Text>
            <Text style={styles.metricLabel}>Total Calls</Text>
          </LinearGradient>

          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <PhoneForwarded size={20} color="#fff" />
            <Text style={styles.metricValue}>
              {performanceData.connected.toLocaleString()}
            </Text>
            <Text style={styles.metricLabel}>Connected</Text>
          </LinearGradient>

          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}>
            <PhoneMissed size={20} color="#fff" />
            <Text style={styles.metricValue}>{performanceData.missed}</Text>
            <Text style={styles.metricLabel}>Missed</Text>
          </LinearGradient>

          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Zap size={20} color="#fff" />
            <Text style={styles.metricValue}>{performanceData.avgRoutingTime}</Text>
            <Text style={styles.metricLabel}>Avg Routing</Text>
          </LinearGradient>
        </View>

        {/* Satisfaction */}
        <View
          style={[
            styles.section,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <TrendingUp size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Routing Accuracy
              </Text>
            </View>
          </View>

          <View style={styles.accuracyContainer}>
            <View style={styles.accuracyMain}>
              <Text
                style={[styles.accuracyValue, { color: '#10B981' }]}
              >
                {performanceData.satisfaction}
              </Text>
              <Text
                style={[
                  styles.accuracyLabel,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Correct routing rate
              </Text>
            </View>
            <View style={styles.accuracyBreakdown}>
              <View style={styles.accuracyItem}>
                <Text style={[styles.accuracyItemValue, { color: theme.colors.text }]}>
                  94.2%
                </Text>
                <Text
                  style={[
                    styles.accuracyItemLabel,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  First attempt
                </Text>
              </View>
              <View style={styles.accuracyItem}>
                <Text style={[styles.accuracyItemValue, { color: theme.colors.text }]}>
                  4.8%
                </Text>
                <Text
                  style={[
                    styles.accuracyItemLabel,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  Transfer needed
                </Text>
              </View>
              <View style={styles.accuracyItem}>
                <Text style={[styles.accuracyItemValue, { color: theme.colors.text }]}>
                  1.0%
                </Text>
                <Text
                  style={[
                    styles.accuracyItemLabel,
                    { color: theme.colors.secondaryText },
                  ]}
                >
                  Wrong routing
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Department Performance */}
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
                Department Performance
              </Text>
            </View>
          </View>

          <View style={styles.deptList}>
            {[
              { name: 'Sales Team', calls: 1240, avgHandle: '4m 32s', satisfaction: '92.4%' },
              { name: 'Support Team', calls: 980, avgHandle: '8m 15s', satisfaction: '94.1%' },
              { name: 'Billing Dept', calls: 469, avgHandle: '3m 48s', satisfaction: '96.8%' },
            ].map((dept) => (
              <View key={dept.name} style={styles.deptItem}>
                <View style={styles.deptLeft}>
                  <Headphones size={18} color={theme.colors.primary} />
                  <Text style={[styles.deptName, { color: theme.colors.text }]}>
                    {dept.name}
                  </Text>
                </View>
                <View style={styles.deptStats}>
                  <View style={styles.deptStat}>
                    <Text
                      style={[styles.deptStatValue, { color: theme.colors.text }]}
                    >
                      {dept.calls}
                    </Text>
                    <Text
                      style={[
                        styles.deptStatLabel,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      calls
                    </Text>
                  </View>
                  <View style={styles.deptStat}>
                    <Text
                      style={[styles.deptStatValue, { color: theme.colors.text }]}
                    >
                      {dept.avgHandle}
                    </Text>
                    <Text
                      style={[
                        styles.deptStatLabel,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      avg handle
                    </Text>
                  </View>
                  <View style={styles.deptStat}>
                    <Text
                      style={[styles.deptStatValue, { color: '#10B981' }]}
                    >
                      {dept.satisfaction}
                    </Text>
                    <Text
                      style={[
                        styles.deptStatLabel,
                        { color: theme.colors.secondaryText },
                      ]}
                    >
                      satisfaction
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'live', label: 'Live', icon: Phone, component: renderLiveTab() },
    { id: 'rules', label: 'Rules', icon: Route, component: renderRulesTab() },
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
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EF444420',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  liveText: { fontSize: 11, color: '#EF4444', fontWeight: '700' },
  callsList: { gap: 12 },
  callCard: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 16,
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  callInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  callNumber: { fontSize: 15, fontWeight: '600' },
  callStatus: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  callStatusText: { fontSize: 11, fontWeight: '600' },
  callDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  callDetail: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  callDetailText: { fontSize: 12 },
  queueList: { gap: 16 },
  queueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  queueLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, width: 100 },
  queueDept: { fontSize: 15, fontWeight: '600' },
  queueCenter: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  queueStat: { alignItems: 'center' },
  queueStatValue: { fontSize: 15, fontWeight: '700' },
  queueStatLabel: { fontSize: 11, marginTop: 2 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  rulesList: { gap: 12 },
  ruleCard: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 16,
    borderRadius: 16,
  },
  ruleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ruleTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  ruleName: { fontSize: 16, fontWeight: '700' },
  priorityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  priorityText: { fontSize: 11, fontWeight: '600' },
  ruleDetails: { gap: 8, marginBottom: 12 },
  ruleDetail: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ruleDetailText: { fontSize: 13, flex: 1 },
  ruleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  successRate: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  successRateText: { fontSize: 13, color: '#10B981', fontWeight: '600' },
  accuracyContainer: { alignItems: 'center', paddingVertical: 20 },
  accuracyMain: { alignItems: 'center', marginBottom: 24 },
  accuracyValue: { fontSize: 48, fontWeight: '800' },
  accuracyLabel: { fontSize: 15, marginTop: 8 },
  accuracyBreakdown: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  accuracyItem: { alignItems: 'center' },
  accuracyItemValue: { fontSize: 20, fontWeight: '700' },
  accuracyItemLabel: { fontSize: 12, marginTop: 4 },
  deptList: { gap: 16 },
  deptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  deptLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, width: 120 },
  deptName: { fontSize: 15, fontWeight: '600' },
  deptStats: { flexDirection: 'row', gap: 24 },
  deptStat: { alignItems: 'center' },
  deptStatValue: { fontSize: 14, fontWeight: '700' },
  deptStatLabel: { fontSize: 11, marginTop: 2 },
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
