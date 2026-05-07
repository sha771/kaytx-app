import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ChevronRight, Play, Pause, RefreshCw, Power, Sparkles, Crown, Star, CircleCheck, Settings, ChartBarBig as ChartBar, Zap, Radio, Eye, Brain, ArrowUpRight, ArrowDownRight, Activity, Shield, Gauge, Timer, ThumbsUp } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { trpc } from '@/lib/trpc';
import { useAIAssistant } from '@/providers/AIAssistantProvider';

export interface DeptSubAgent {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  status: 'active' | 'paused' | 'training' | 'inactive' | 'optimizing';
  tasksCompleted: number;
  successRate: number;
  lastActive: string;
  capabilities: string[];
  tier: 'standard' | 'premium' | 'enterprise';
  learningProgress: number;
  efficiency: number;
  todayTasks: number;
  avgResponseTime: string;
  trend: 'up' | 'down' | 'stable';
  recentActions: string[];
  healthScore: number;
  weeklyGrowth: number;
}

interface DeptPageConfig {
  title: string;
  subtitle: string;
  accentColor: string;
  gradientColors: readonly [string, string];
  mainIcon: React.ComponentType<any>;
  mainAgentId: string;
  category: string;
  statLabels?: [string, string, string];
  subAgents: DeptSubAgent[];
}

export function DepartmentAIPage({ config }: { config: DeptPageConfig }) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { activeAgents, toggleAgent } = useAIAssistant();
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: config.category });
  const toggleAgentMutation = trpc.aiAgents.toggleAgent.useMutation();
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const ACCENT = config.accentColor;

  const subAgents = useMemo(() => config.subAgents.map(a => ({ ...a, enabled: activeAgents[a.id] ?? a.enabled })), [activeAgents, config.subAgents]);

  const toggleSubAgent = useCallback(async (agentId: string) => {
    try {
      const cur = activeAgents[agentId] ?? true;
      await toggleAgentMutation.mutateAsync({ agentId, enabled: !cur, agentType: 'sub' });
      toggleAgent(agentId);
    } catch { console.error('Failed to toggle agent'); }
  }, [activeAgents, toggleAgent, toggleAgentMutation]);

  const activateAll = useCallback(async () => {
    for (const a of subAgents) if (!activeAgents[a.id]) await toggleSubAgent(a.id);
  }, [subAgents, activeAgents, toggleSubAgent]);

  const deactivateAll = useCallback(async () => {
    for (const a of subAgents) if (activeAgents[a.id]) await toggleSubAgent(a.id);
  }, [subAgents, activeAgents, toggleSubAgent]);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
      Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
    ])).start();
    Animated.timing(progressAnim, { toValue: 1, duration: 1500, useNativeDriver: false }).start();
  }, [pulseAnim, progressAnim]);

  const toggleMainAgent = useCallback(async () => {
    try {
      const cur = activeAgents[config.mainAgentId] ?? true;
      await toggleAgentMutation.mutateAsync({ agentId: config.mainAgentId, enabled: !cur, agentType: 'main' });
      toggleAgent(config.mainAgentId);
    } catch { console.error('Failed'); }
  }, [activeAgents, toggleAgent, toggleAgentMutation, config.mainAgentId]);

  const mainEnabled = activeAgents[config.mainAgentId] ?? true;
  const stats = useMemo(() => statsData ? { active: statsData.activeAgents, tasks: statsData.tasksToday, success: statsData.avgSuccessRate, health: statsData.avgHealthScore } : { active: 0, tasks: 0, success: 0, health: 0 }, [statsData]);

  const getStatusColor = (s: string) => ({ active: '#34C759', paused: '#FF9500', training: '#007AFF', inactive: '#8E8E93', optimizing: '#AF52DE' }[s] || '#8E8E93');
  const getStatusIcon = (s: string) => ({ active: Play, paused: Pause, training: RefreshCw, inactive: Power, optimizing: Sparkles }[s] || Power);
  const getTierColor = (t: string) => ({ enterprise: '#AF52DE', premium: '#FF9500', standard: '#007AFF' }[t] || '#8E8E93');
  const getTierIcon = (t: string) => ({ enterprise: Crown, premium: Star }[t] || CircleCheck);
  const getTrendIcon = (t: string) => ({ up: ArrowUpRight, down: ArrowDownRight }[t] || Activity);
  const getTrendColor = (t: string) => ({ up: '#34C759', down: '#FF3B30' }[t] || '#FF9500');
  const getHealthColor = (s: number) => s >= 90 ? '#34C759' : s >= 70 ? '#FF9500' : '#FF3B30';
  const labels = config.statLabels || ['Tasks Today', 'Success', 'Sub-Agents'];

  const renderSubAgent = (agent: DeptSubAgent) => {
    const SIcon = getStatusIcon(agent.status) as React.ComponentType<any>;
    const TIcon = getTierIcon(agent.tier) as React.ComponentType<any>;
    const TrIcon = getTrendIcon(agent.trend) as React.ComponentType<any>;
    const isExp = expandedAgent === agent.id;
    return (
      <View key={agent.id} style={[s.card, { backgroundColor: theme.colors.cardBackground }]}>
        <TouchableOpacity style={s.cardHeader} onPress={() => setExpandedAgent(isExp ? null : agent.id)} activeOpacity={0.7}>
          <View style={s.iconWrap}>
            <View style={[s.iconBox, { backgroundColor: `${ACCENT}15` }]}><agent.icon size={22} color={ACCENT} /></View>
            {agent.status === 'active' && <Animated.View style={[s.live, { transform: [{ scale: pulseAnim }] }]}><View style={s.liveInner} /></Animated.View>}
          </View>
          <View style={s.info}>
            <View style={s.titleRow}>
              <Text style={[s.name, { color: theme.colors.text }]} numberOfLines={1}>{agent.name}</Text>
              <View style={[s.tier, { backgroundColor: `${getTierColor(agent.tier)}15` }]}><TIcon size={10} color={getTierColor(agent.tier)} /><Text style={[s.tierT, { color: getTierColor(agent.tier) }]}>{agent.tier}</Text></View>
            </View>
            <Text style={[s.desc, { color: theme.colors.secondaryText }]} numberOfLines={1}>{agent.description}</Text>
            <View style={s.meta}>
              <View style={[s.badge, { backgroundColor: `${getStatusColor(agent.status)}20` }]}><SIcon size={10} color={getStatusColor(agent.status)} /><Text style={[s.badgeT, { color: getStatusColor(agent.status) }]}>{agent.status}</Text></View>
              <View style={[s.badge, { backgroundColor: `${getHealthColor(agent.healthScore)}15` }]}><Shield size={10} color={getHealthColor(agent.healthScore)} /><Text style={[s.badgeT, { color: getHealthColor(agent.healthScore) }]}>{agent.healthScore}%</Text></View>
              <View style={[s.badge, { backgroundColor: `${getTrendColor(agent.trend)}15` }]}><TrIcon size={10} color={getTrendColor(agent.trend)} />{agent.weeklyGrowth > 0 && <Text style={[s.badgeT, { color: getTrendColor(agent.trend) }]}>+{agent.weeklyGrowth}%</Text>}</View>
            </View>
          </View>
          <View style={s.actions}>
            <Switch value={agent.enabled && mainEnabled} onValueChange={() => toggleSubAgent(agent.id)} trackColor={{ false: '#E5E5EA', true: `${ACCENT}50` }} thumbColor={agent.enabled && mainEnabled ? ACCENT : '#fff'} disabled={!mainEnabled} />
            <ChevronRight size={18} color={theme.colors.secondaryText} style={{ transform: [{ rotate: isExp ? '90deg' : '0deg' }] }} />
          </View>
        </TouchableOpacity>
        {isExp && (
          <View style={s.expanded}>
            <View style={[s.divider, { backgroundColor: `${ACCENT}30` }]} />
            <View style={s.qStats}>
              <View style={[s.qItem, { backgroundColor: theme.colors.background }]}><ThumbsUp size={14} color={ACCENT} /><Text style={[s.qVal, { color: theme.colors.text }]}>{agent.successRate}%</Text><Text style={[s.qLbl, { color: theme.colors.secondaryText }]}>Success</Text></View>
              <View style={[s.qItem, { backgroundColor: theme.colors.background }]}><Timer size={14} color="#FF9500" /><Text style={[s.qVal, { color: theme.colors.text }]}>{agent.avgResponseTime}</Text><Text style={[s.qLbl, { color: theme.colors.secondaryText }]}>Response</Text></View>
              <View style={[s.qItem, { backgroundColor: theme.colors.background }]}><Gauge size={14} color="#34C759" /><Text style={[s.qVal, { color: theme.colors.text }]}>{agent.efficiency}%</Text><Text style={[s.qLbl, { color: theme.colors.secondaryText }]}>Efficiency</Text></View>
            </View>
            <View style={s.prog}><View style={s.progH}><Brain size={14} color={ACCENT} /><Text style={[s.progL, { color: theme.colors.secondaryText }]}>AI Learning</Text><Text style={[s.progV, { color: theme.colors.text }]}>{agent.learningProgress}%</Text></View><View style={[s.progBar, { backgroundColor: 'rgba(0,0,0,0.08)' }]}><Animated.View style={[s.progFill, { width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', `${agent.learningProgress}%`] }), backgroundColor: ACCENT }]} /></View></View>
            <View style={s.recent}><View style={s.secH}><Radio size={14} color="#34C759" /><Text style={[s.secL, { color: theme.colors.secondaryText }]}>Recent</Text></View>{agent.recentActions.slice(0, 3).map((a, i) => <View key={i} style={s.actItem}><View style={[s.actDot, { backgroundColor: '#34C759' }]} /><Text style={[s.actT, { color: theme.colors.text }]} numberOfLines={1}>{a}</Text></View>)}</View>
            <View style={s.caps}><View style={s.secH}><Sparkles size={14} color={ACCENT} /><Text style={[s.secL, { color: theme.colors.secondaryText }]}>Capabilities</Text></View><View style={s.capList}>{agent.capabilities.map((c, i) => <View key={i} style={[s.capTag, { backgroundColor: `${ACCENT}10` }]}><Text style={[s.capT, { color: ACCENT }]}>{c}</Text></View>)}</View></View>
            <View style={s.btns}>
              <TouchableOpacity style={[s.btn, { backgroundColor: `${ACCENT}15` }]}><Settings size={16} color={ACCENT} /><Text style={[s.btnT, { color: ACCENT }]}>Configure</Text></TouchableOpacity>
              <TouchableOpacity style={[s.btn, { backgroundColor: '#34C75915' }]}><ChartBarBig size={16} color="#34C759" /><Text style={[s.btnT, { color: '#34C759' }]}>Analytics</Text></TouchableOpacity>
              <TouchableOpacity style={[s.btn, { backgroundColor: '#FF950015' }]}><Eye size={16} color="#FF9500" /><Text style={[s.btnT, { color: '#FF9500' }]}>Monitor</Text></TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[s.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient colors={config.gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[s.hGrad, { paddingTop: insets.top }]}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.back}><ArrowLeft size={24} color="#fff" /></TouchableOpacity>
          <View style={s.hCenter}><Text style={s.hTitle}>{config.title}</Text><Text style={s.hSub}>{config.subtitle}</Text></View>
          <Switch value={mainEnabled} onValueChange={toggleMainAgent} trackColor={{ false: 'rgba(255,255,255,0.3)', true: 'rgba(255,255,255,0.5)' }} thumbColor="#fff" />
        </View>
        <View style={s.mainCard}>
          <View style={s.mainH}>
            <View style={s.mainIcon}><config.mainIcon size={28} color="#fff" />{mainEnabled && <Animated.View style={[s.mainLive, { transform: [{ scale: pulseAnim }] }]}><View style={s.mainLiveIn} /></Animated.View>}</View>
            <View style={s.mainTitleSec}><Text style={s.mainTitle}>Main Agent</Text><View style={[s.mainBadge, { backgroundColor: mainEnabled ? 'rgba(52,199,89,0.3)' : 'rgba(142,142,147,0.3)' }]}><View style={[s.mainDot, { backgroundColor: mainEnabled ? '#34C759' : '#8E8E93' }]} /><Text style={s.mainBadgeT}>{mainEnabled ? 'Active' : 'Inactive'}</Text></View></View>
            <View style={s.healthInd}><View style={[s.healthC, { borderColor: getHealthColor(stats.health) }]}><Text style={s.healthV}>{stats.health}%</Text></View><Text style={s.healthL}>Health</Text></View>
          </View>
          <View style={s.mainStats}>
            <View style={s.mStat}><Text style={s.mStatV}>{stats.active}/{subAgents.length}</Text><Text style={s.mStatL}>{labels[2]}</Text></View>
            <View style={s.mDiv} />
            <View style={s.mStat}><Text style={s.mStatV}>{stats.tasks}</Text><Text style={s.mStatL}>{labels[0]}</Text></View>
            <View style={s.mDiv} />
            <View style={s.mStat}><Text style={s.mStatV}>{stats.success}%</Text><Text style={s.mStatL}>{labels[1]}</Text></View>
          </View>
        </View>
      </LinearGradient>
      <View style={s.bulk}>
        <TouchableOpacity style={[s.bulkBtn, { backgroundColor: '#34C75915' }]} onPress={activateAll} disabled={!mainEnabled}><Zap size={16} color={mainEnabled ? '#34C759' : '#8E8E93'} /><Text style={[s.bulkT, { color: mainEnabled ? '#34C759' : '#8E8E93' }]}>Activate All</Text></TouchableOpacity>
        <TouchableOpacity style={[s.bulkBtn, { backgroundColor: '#FF3B3015' }]} onPress={deactivateAll}><Power size={16} color="#FF3B30" /><Text style={[s.bulkT, { color: '#FF3B30' }]}>Deactivate All</Text></TouchableOpacity>
      </View>
      <ScrollView style={s.scroll} contentContainerStyle={s.scrollC} showsVerticalScrollIndicator={false}>
        <View style={s.secTitleRow}><Text style={[s.secTitle, { color: theme.colors.text }]}>Sub-Agents</Text><View style={[s.countBadge, { backgroundColor: `${ACCENT}15` }]}><Text style={[s.countT, { color: ACCENT }]}>{stats.active} Active</Text></View></View>
        {subAgents.map(renderSubAgent)}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 }, hGrad: { paddingBottom: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16 },
  back: { padding: 8, marginRight: 12, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
  hCenter: { flex: 1 }, hTitle: { fontSize: 22, fontWeight: '700', color: '#fff' }, hSub: { fontSize: 13, marginTop: 2, color: 'rgba(255,255,255,0.8)' },
  mainCard: { marginHorizontal: 20, padding: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16 },
  mainH: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  mainIcon: { width: 52, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 12, position: 'relative' },
  mainLive: { position: 'absolute', top: -2, right: -2, width: 14, height: 14, borderRadius: 7, backgroundColor: 'rgba(52,199,89,0.4)', justifyContent: 'center', alignItems: 'center' },
  mainLiveIn: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34C759' },
  mainTitleSec: { flex: 1 }, mainTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 4 },
  mainBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', gap: 6 },
  mainDot: { width: 6, height: 6, borderRadius: 3 }, mainBadgeT: { fontSize: 12, fontWeight: '600', color: '#fff' },
  healthInd: { alignItems: 'center' }, healthC: { width: 48, height: 48, borderRadius: 24, borderWidth: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  healthV: { fontSize: 14, fontWeight: '700', color: '#fff' }, healthL: { fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  mainStats: { flexDirection: 'row', alignItems: 'center' }, mStat: { flex: 1, alignItems: 'center' },
  mStatV: { fontSize: 20, fontWeight: '700', color: '#fff' }, mStatL: { fontSize: 11, marginTop: 2, color: 'rgba(255,255,255,0.7)' },
  mDiv: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  bulk: { flexDirection: 'row', marginHorizontal: 20, marginTop: 16, gap: 12 },
  bulkBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 12, gap: 8 },
  bulkT: { fontSize: 14, fontWeight: '600' }, scroll: { flex: 1, marginTop: 16 }, scrollC: { paddingHorizontal: 20, paddingBottom: 40 },
  secTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  secTitle: { fontSize: 16, fontWeight: '600' }, countBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }, countT: { fontSize: 12, fontWeight: '600' },
  card: { borderRadius: 16, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', padding: 14 }, iconWrap: { position: 'relative' },
  iconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  live: { position: 'absolute', top: -2, right: 8, width: 12, height: 12, borderRadius: 6, backgroundColor: 'rgba(52,199,89,0.3)', justifyContent: 'center', alignItems: 'center' },
  liveInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#34C759' }, info: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }, name: { fontSize: 15, fontWeight: '600', flex: 1 },
  tier: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
  tierT: { fontSize: 9, fontWeight: '600', textTransform: 'uppercase' }, desc: { fontSize: 12, marginBottom: 6 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
  badgeT: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  actions: { alignItems: 'center', gap: 8 },
  divider: { height: 1, marginHorizontal: 14 }, expanded: { paddingHorizontal: 14, paddingBottom: 14 },
  qStats: { flexDirection: 'row', gap: 8, marginTop: 12 },
  qItem: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, gap: 4 },
  qVal: { fontSize: 14, fontWeight: '700' }, qLbl: { fontSize: 10 },
  prog: { marginTop: 12 }, progH: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  progL: { flex: 1, fontSize: 12 }, progV: { fontSize: 14, fontWeight: '700' },
  progBar: { height: 6, borderRadius: 3 }, progFill: { height: 6, borderRadius: 3 },
  recent: { marginTop: 14 }, secH: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  secL: { fontSize: 12, fontWeight: '600' }, actItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  actDot: { width: 6, height: 6, borderRadius: 3 }, actT: { fontSize: 12, flex: 1 },
  caps: { marginTop: 14 }, capList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  capTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }, capT: { fontSize: 11, fontWeight: '500' },
  btns: { flexDirection: 'row', gap: 8, marginTop: 14 },
  btn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10, gap: 6 },
  btnT: { fontSize: 12, fontWeight: '600' },
});
