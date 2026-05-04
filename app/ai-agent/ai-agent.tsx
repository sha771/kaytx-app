 
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Switch,
  ActivityIndicator,
} from 'react-native';

import {
  Users,
  Brain,
  Target,
  TrendingUp,
  ArrowLeft,
  Cpu,
  Menu,
  DollarSign,
  Activity,
  Zap,
  Plus,
  Clock,
  Settings,
  Crown,
  ArrowRight,
  User,
} from 'lucide-react-native';
import { useAIAssistant } from '@/providers/AIAssistantProvider';
import { AIWorkforceSidebar } from '@/components/AIWorkforceSidebar';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { aiEmployees, AIEmployee } from '@/constants/aiEmployees';
import { trpc } from '@/lib/trpc';
import { useCommandCenter, ROLE_CONFIGS } from '@/providers/CommandCenterProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AIAgentScreen() {
  const { theme } = useTheme();
  const { activeAgents, toggleAgent } = useAIAssistant();

  const { activeRole, setActiveRole } = useCommandCenter();

  const insets = useSafeAreaInsets();
  const [toggleError, setToggleError] = useState<string | null>(null);

  // Backend data fetching with tRPC
  const { data: agentMetrics, isLoading: metricsLoading } = trpc.aiAgents.getStats.useQuery({});
  const { data: agentActivity, isLoading: activityLoading } = trpc.aiAgents.getActivity.useQuery({});
  const toggleAgentMutation = trpc.aiAgents.toggleAgent.useMutation();

  const activities = agentActivity?.activities || [];

  // Default metrics used when API data is not available
  const defaultMetrics = [
    {
      title: 'Workforce Size',
      value: (agentMetrics?.totalAgents ?? 50).toString(),
      change: 'Total Roles',
      icon: Users,
      color: '#007AFF',
    },
    {
      title: 'Active Assets',
      value: (agentMetrics?.activeAgents ?? 0).toString(),
      change: 'Operational',
      icon: Activity,
      color: '#34C759',
    },
    {
      title: 'Monthly ROI',
      value: `$${((agentMetrics?.totalTasks ?? 0) * 0.15).toLocaleString()}`,
      change: 'Net Savings',
      icon: TrendingUp,
      color: '#FF9500',
    },
    {
      title: 'Compute Load',
      value: (agentMetrics?.avgHealthScore ? (100 - agentMetrics.avgHealthScore) : 24) + '%',
      change: 'Scalable',
      icon: Cpu,
      color: '#AF52DE',
    },
  ];
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'agents' | 'analytics'>('overview');

  const getStatusColor = (active: boolean) => {
    return active ? '#34C759' : '#8E8E93';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'executive': return '#FF2D55';
      case 'sales': return '#5856D6';
      case 'operations': return '#FF6482';
      case 'support': return '#FF9500';
      case 'analytics': return '#5AC8FA';
      case 'marketing': return '#AF52DE';
      default: return theme.colors.secondaryText;
    }
  };

  const renderMetric = ({ item }: { item: any }) => {
    const IconComponent = item.icon;

    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground, borderColor: item.color + '20', borderWidth: 1 }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: `${item.color}15` }]}>
            <IconComponent size={18} color={item.color} />
          </View>
          <Text style={[styles.metricChange, { color: item.color }]}>
            {item.change}
          </Text>
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>
      </View>
    );
  };

  const renderAgent = ({ item }: { item: AIEmployee }) => {
    const IconComponent = item.icon;
    const isActive = activeAgents[item.id];

    const handleToggle = async (next: boolean) => {
      setToggleError(null);

      // Optimistically update local UI
      toggleAgent(item.id);

      try {
        await toggleAgentMutation.mutateAsync({
          agentId: item.id,
          enabled: next,
          agentType: 'sub',
        });
      } catch (e) {
        // Roll back optimistic update
        toggleAgent(item.id);
        const message = e instanceof Error ? e.message : 'Failed to toggle agent';
        setToggleError(message);
      }
    };

    return (
      <TouchableOpacity
        style={[styles.agentCard, { backgroundColor: theme.colors.cardBackground, borderLeftWidth: 4, borderLeftColor: item.color }]}
        onPress={() => router.push(item.route)}
      >
        <View style={styles.agentHeader}>
          <View style={styles.agentInfo}>
            <View style={[styles.agentAvatarContainer, { backgroundColor: item.color + '15' }]}>
              <IconComponent size={24} color={item.color} />
              <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(isActive) }]} />
            </View>
            <View style={styles.agentDetails}>
              <View style={styles.nameRow}>
                <Text style={[styles.agentName, { color: theme.colors.text }]}>{item.name}</Text>
                <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.category) + '15' }]}>
                  <Text style={[styles.typeText, { color: getTypeColor(item.category) }]}>
                    {item.category.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={[styles.agentDescription, { color: theme.colors.secondaryText }]} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          </View>
          <Switch
            value={isActive}
            onValueChange={handleToggle}
            trackColor={{ false: '#767577', true: item.color }}
            thumbColor={isActive ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.efficiencyBar}>
          <View style={styles.effCol}>
            <Text style={styles.effLab}>HUMAN</Text>
            <Text style={[styles.effVal, { color: '#FF3B30' }]}>{item.humanCost}</Text>
          </View>
          <View style={styles.effArrow}>
            <TrendingUp size={14} color={theme.colors.secondaryText} style={{ transform: [{ rotate: '90deg' }] }} />
          </View>
          <View style={styles.effCol}>
            <Text style={styles.effLab}>AI AGENT</Text>
            <Text style={[styles.effVal, { color: '#34C759' }]}>{item.aiCost}</Text>
          </View>
          <View style={[styles.multBadge, { backgroundColor: item.color + '10' }]}>
            <Text style={[styles.multText, { color: item.color }]}>{item.efficiency}</Text>
          </View>
        </View>

        <View style={styles.agentFooter}>
          <View style={styles.footerCaps}>
            {item.capabilities.slice(0, 3).map((cap, i) => (
              <View key={i} style={[styles.capTag, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.capTagText, { color: theme.colors.secondaryText }]}>{cap}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.manageBtn, { backgroundColor: item.color }]}
            onPress={() => router.push(item.route)}
          >
            <Zap size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOverview = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Metrics */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Intelligence Matrix</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAllText, { color: theme.colors.primary }]}>Live Monitor</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={agentMetrics ? [
            { title: 'Total Agents', value: agentMetrics.totalAgents.toString(), change: 'Workforce', icon: Users, color: '#007AFF' },
            { title: 'Active Agents', value: agentMetrics.activeAgents.toString(), change: 'Live', icon: Activity, color: '#34C759' },
            { title: 'Success Rate', value: `${agentMetrics.avgSuccessRate}%`, change: 'Quality', icon: Target, color: '#FF9500' },
            { title: 'Health Score', value: `${agentMetrics.avgHealthScore}%`, change: 'System', icon: Zap, color: '#AF52DE' }
          ] : defaultMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.title}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
        />
        {metricsLoading && (
          <View style={styles.inlineStatusRow}>
            <ActivityIndicator color={theme.colors.primary} />
            <Text style={[styles.inlineStatusText, { color: theme.colors.secondaryText }]}>Loading metrics...</Text>
          </View>
        )}
      </View>

      {/* Global Sync Card */}
      <LinearGradient colors={[theme.colors.primary, theme.colors.primary + 'cc']} style={styles.syncCard}>
        <View style={styles.syncContent}>
          <Brain size={32} color="#fff" />
          <View style={styles.syncTextContent}>
            <Text style={styles.syncTitle}>Collective Intelligence</Text>
            <Text style={styles.syncDesc}>All agents share a unified enterprise memory cluster for cross-functional context.</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.syncBtn} onPress={() => router.push('/ai-agent/history')}>
          <Text style={styles.syncBtnText}>VIEW AGENT HISTORY</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Deployment Control</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.quickAction, { backgroundColor: theme.colors.cardBackground }]}
            onPress={() => router.push('/ai-agent/create')}
          >
            <Plus size={24} color={theme.colors.primary} />
            <Text style={[styles.quickActionText, { color: theme.colors.text }]}>Deploy Role</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickAction, { backgroundColor: theme.colors.cardBackground }]}
            onPress={() => router.push('/ai-agent/history')}
          >
            <Clock size={24} color={theme.colors.primary} />
            <Text style={[styles.quickActionText, { color: theme.colors.text }]}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.colors.cardBackground }]}>
            <Settings size={24} color={theme.colors.primary} />
            <Text style={[styles.quickActionText, { color: theme.colors.text }]}>Global Config</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Operations</Text>
        {activityLoading && (
          <View style={[styles.activityCard, { backgroundColor: theme.colors.cardBackground, flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
            <ActivityIndicator color={theme.colors.primary} />
            <Text style={[styles.activityText, { color: theme.colors.text }]}>Loading activity...</Text>
          </View>
        )}
        {activities.length > 0 ? activities.map((act: any) => (
          <View key={act.id} style={[styles.activityCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.agentName}: {act.action}</Text>
            <Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>{new Date(act.timestamp).toLocaleTimeString()}</Text>
          </View>
        )) : (
          <View style={[styles.activityCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.activityText, { color: theme.colors.text }]}>No recent activity</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  const renderAgents = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <FlatList
        data={aiEmployees}
        renderItem={renderAgent}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.agentsContainer}
      />
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Intelligence</Text>
        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.analyticsHeader}>
            <DollarSign size={20} color="#34C759" />
            <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Economic Impact</Text>
          </View>
          <Text style={[styles.analyticsDescription, { color: theme.colors.secondaryText }]}>
            Current automated workforce is generating <Text style={{ fontWeight: '700', color: '#34C759' }}>${((agentMetrics?.totalTasks ?? 0) * 0.15).toLocaleString()}</Text> in monthly human capital savings.
          </Text>
        </View>

        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.analyticsHeader}>
            <Activity size={20} color="#007AFF" />
            <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Uptime Efficiency</Text>
          </View>
          <Text style={[styles.analyticsDescription, { color: theme.colors.secondaryText }]}>
            Average system health is <Text style={{ fontWeight: '700', color: '#007AFF' }}>{agentMetrics?.avgHealthScore ?? 0}%</Text> across all clusters with a {agentMetrics?.avgSuccessRate ?? 0}% successful task execution rate.
          </Text>
        </View>

        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.analyticsHeader}>
            <Zap size={20} color="#FF9500" />
            <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Task Optimization</Text>
          </View>
          <Text style={[styles.analyticsDescription, { color: theme.colors.secondaryText }]}>
            <Text style={{ fontWeight: '700', color: '#FF9500' }}>{(agentMetrics?.tasksToday ?? 0).toLocaleString()}</Text> tasks are being autonomously handled daily, reducing institutional friction by 64%.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSidebar(true)} style={styles.menuButton}>
            <Menu size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>AI Agent</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/ai-agent/create')}>
          <Plus size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={[styles.commandBanner, { backgroundColor: theme.colors.cardBackground }]}
      >
        <View style={styles.commandBannerLeft}>
          <View
            style={[
              styles.commandBadge,
              {
                backgroundColor: ROLE_CONFIGS.AOD.bgColor,
                borderColor: ROLE_CONFIGS.AOD.color,
              },
            ]}
          >
            <User size={16} color={ROLE_CONFIGS.AOD.color} />
            <Text style={[styles.commandBadgeText, { color: ROLE_CONFIGS.AOD.color }]}>AOD</Text>
          </View>
          <View style={styles.commandBannerMeta}>
            <Text style={[styles.commandBannerTitle, { color: theme.colors.text }]}>AgentOps Director</Text>
            <Text style={[styles.commandBannerSub, { color: theme.colors.secondaryText }]}
            >{activeRole ? `Active Operator: ${activeRole}` : 'No active operator selected'}</Text>
          </View>
        </View>

        <View style={styles.commandBannerRight}>
          <TouchableOpacity
            style={[styles.commandLinkBtn, { borderColor: theme.colors.border }]}
            onPress={() => router.push('/command-center')}
          >
            <Crown size={16} color={theme.colors.text} />
            <Text style={[styles.commandLinkText, { color: theme.colors.text }]}>Command</Text>
            <ArrowRight size={14} color={theme.colors.secondaryText} />
          </TouchableOpacity>

          {activeRole !== 'AOD' && (
            <TouchableOpacity
              style={[styles.commandActivateBtn, { backgroundColor: ROLE_CONFIGS.AOD.color }]}
              onPress={() => setActiveRole('AOD')}
            >
              <Text style={styles.commandActivateText}>Activate</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <AIWorkforceSidebar isVisible={showSidebar} onClose={() => setShowSidebar(false)} />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['overview', 'agents', 'analytics'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {toggleError && (
        <View style={[styles.errorBanner, { backgroundColor: theme.colors.cardBackground, borderColor: 'rgba(255,59,48,0.25)' }]}>
          <Text style={[styles.errorBannerText, { color: theme.colors.text }]}>{toggleError}</Text>
        </View>
      )}
      {selectedTab === 'overview' && renderOverview()}
      {selectedTab === 'agents' && renderAgents()}
      {selectedTab === 'analytics' && renderAnalytics()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 16 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  backButton: { padding: 8, marginRight: 8 },
  menuButton: { padding: 8 },
  title: { fontSize: 24, fontWeight: '700', flex: 1 },
  headerButton: { padding: 8 },
  tabsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 16, gap: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.05)' },
  tabText: { fontSize: 14, fontWeight: '500' },
  tabContent: { flex: 1, paddingHorizontal: 20 },
  section: { marginBottom: 24 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  viewAllText: { fontSize: 12, fontWeight: '700' },
  metricsContainer: { gap: 12 },
  metricCard: { flex: 1, padding: 16, borderRadius: 16, marginHorizontal: 6 },
  metricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  metricIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  metricChange: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  metricValue: { fontSize: 22, fontWeight: '900', marginBottom: 2, letterSpacing: -0.5 },
  metricTitle: { fontSize: 11, fontWeight: '600' },
  syncCard: { padding: 24, borderRadius: 24, marginBottom: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  syncContent: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
  syncTextContent: { flex: 1 },
  syncTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 4 },
  syncDesc: { color: 'rgba(255,255,255,0.7)', fontSize: 12, lineHeight: 18 },
  syncBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  syncBtnText: { color: '#fff', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  quickActions: { flexDirection: 'row', gap: 12 },
  quickAction: { flex: 1, alignItems: 'center', padding: 16, borderRadius: 16, gap: 8, borderWidth: 1, borderColor: 'rgba(150,150,150,0.1)' },
  quickActionText: { fontSize: 12, fontWeight: '700' },
  agentsContainer: { gap: 16, paddingBottom: 40 },
  agentCard: { padding: 20, borderRadius: 20, marginBottom: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 1 },
  agentHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  agentInfo: { flexDirection: 'row', flex: 1 },
  agentAvatarContainer: { width: 44, height: 44, borderRadius: 12, marginRight: 12, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  statusIndicator: { width: 10, height: 10, borderRadius: 5, position: 'absolute', bottom: -2, right: -2, borderWidth: 2, borderColor: '#FFF' },
  agentDetails: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  agentName: { fontSize: 16, fontWeight: '800' },
  agentDescription: { fontSize: 12, fontWeight: '500' },
  typeBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  typeText: { fontSize: 8, fontWeight: '900' },
  efficiencyBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(150,150,150,0.05)', padding: 15, borderRadius: 16, marginBottom: 20 },
  effCol: { flex: 1 },
  effLab: { fontSize: 8, fontWeight: '800', opacity: 0.4, marginBottom: 2 },
  effVal: { fontSize: 16, fontWeight: '900' },
  effArrow: { paddingHorizontal: 15 },
  multBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  multText: { fontSize: 10, fontWeight: '900' },
  agentFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerCaps: { flexDirection: 'row', gap: 6, flex: 1 },
  capTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  capTagText: { fontSize: 9, fontWeight: '700' },
  manageBtn: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  analyticsCard: { padding: 20, borderRadius: 20, marginBottom: 12 },
  analyticsHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  analyticsTitle: { fontSize: 15, fontWeight: '800' },
  analyticsDescription: { fontSize: 13, lineHeight: 18 },
  activityCard: { padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(150,150,150,0.1)' },
  activityText: { fontSize: 13, fontWeight: '500', marginBottom: 4 },
  activityTime: { fontSize: 11, fontWeight: '600', opacity: 0.5 },
  inlineStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, paddingHorizontal: 6 },
  inlineStatusText: { fontSize: 12, fontWeight: '600' },
  errorBanner: { marginHorizontal: 20, marginBottom: 12, padding: 12, borderRadius: 12, borderWidth: 1 },
  errorBannerText: { fontSize: 12, fontWeight: '700' },
  commandBanner: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  commandBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  commandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    gap: 6,
  },
  commandBadgeText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  commandBannerMeta: {
    flex: 1,
  },
  commandBannerTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  commandBannerSub: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
  commandBannerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  commandLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  commandLinkText: {
    fontSize: 12,
    fontWeight: '800',
  },
  commandActivateBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  commandActivateText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
  },
});
