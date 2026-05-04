import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { ChartBar, Brain, Clock, CircleCheckBig, TriangleAlert } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useAIAssistant } from '@/providers/AIAssistantProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { trpc } from '@/lib/trpc';
import { useAgentCounseling } from '@/hooks/useAgentCounseling';
import { getAgentById, getAgentHierarchy } from '@/constants/aiAgentHierarchy';

export default function DynamicAgentScreen() {
    const { id } = useLocalSearchParams();
    const { theme } = useTheme();

    const { activeAgents, toggleAgent } = useAIAssistant();
    const [toggleError, setToggleError] = useState<string | null>(null);

    const toggleAgentMutation = trpc.aiAgents.toggleAgent.useMutation();

    const agent = useMemo(() => {
        if (!id || typeof id !== 'string') return undefined;
        return aiEmployees.find(e => e.id === id);
    }, [id]);

    const hierarchyAgent = useMemo(() => {
        if (!agent?.id) return undefined;
        return getAgentById(agent.id);
    }, [agent?.id]);

    const hierarchyInfo = useMemo(() => {
        if (!agent?.id) return { mainAgent: undefined, subAgents: [] as any[] };
        return getAgentHierarchy(agent.id);
    }, [agent?.id]);

    const {
        sessions: counselingSessions,
        loading: counselingLoading,
        error: counselingError,
        fetchSessions,
        mainToSub,
        subToMain,
        peer,
        employeeToAgent,
    } = useAgentCounseling();

    const [selectedRelatedAgentId, setSelectedRelatedAgentId] = useState<string | null>(null);

    // Fetch real analytics data
    const { data: analytics, isLoading: isAnalyticsLoading } = trpc.aiAgents.getAgentAnalytics.useQuery({
        agentId: agent?.id ?? '',
        timeRange: '7d',
    }, {
        enabled: !!agent?.id,
    });

    const { data: recentActivity } = trpc.aiAgents.getAgentActivity.useQuery({
        agentId: agent?.id ?? '',
        limit: 5,
    }, {
        enabled: !!agent?.id,
    });

    const isActive = !!(agent && activeAgents[agent.id]);

    if (!agent) {
        return (
            <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff' }}>Agent Not Found</Text>
            </View>
        );
    }


    const renderWhatItDoesTab = (
        <View style={styles.tabContent}>
            <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.cardHeader}>
                    <Brain size={20} color={agent.color} />
                    <Text style={[styles.cardTitle, { color: theme.colors.text }]}>What this agent does</Text>
                </View>
                <Text style={[styles.cardText, { color: theme.colors.secondaryText }]}>
                    {agent.description}
                </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.cardHeader}>
                    <CircleCheckBig size={20} color={agent.color} />
                    <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Core capabilities</Text>
                </View>
                <View style={styles.tags}>
                    {agent.capabilities.map((cap, idx) => (
                        <View key={`${agent.id}-cap-${idx}`} style={[styles.tag, { borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}>
                            <Text style={[styles.tagText, { color: theme.colors.text }]}>{cap}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );

    const renderCounselingTab = (
        <View style={styles.tabContent}>
            <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.cardHeader}>
                    <Brain size={20} color={agent.color} />
                    <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Agent Counseling (A2A)</Text>
                </View>

                <View style={{ marginTop: 8 }}>
                    <Text style={[styles.cardText, { color: theme.colors.secondaryText }]}>
                        Related agents
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
                        {!!hierarchyInfo.mainAgent && (
                            <Pressable
                                style={[
                                    styles.cta,
                                    {
                                        borderColor: theme.colors.border,
                                        backgroundColor: (selectedRelatedAgentId || '') === hierarchyInfo.mainAgent.id ? theme.colors.primary : theme.colors.background,
                                    },
                                ]}
                                onPress={() => setSelectedRelatedAgentId(hierarchyInfo.mainAgent!.id)}
                            >
                                <Text style={[styles.ctaText, { color: (selectedRelatedAgentId || '') === hierarchyInfo.mainAgent.id ? '#fff' : theme.colors.text }]}>
                                    Main: {hierarchyInfo.mainAgent.name}
                                </Text>
                            </Pressable>
                        )}

                        {hierarchyInfo.subAgents.map((sa: any) => (
                            <Pressable
                                key={sa.id}
                                style={[
                                    styles.cta,
                                    {
                                        borderColor: theme.colors.border,
                                        backgroundColor: (selectedRelatedAgentId || '') === sa.id ? theme.colors.primary : theme.colors.background,
                                    },
                                ]}
                                onPress={() => setSelectedRelatedAgentId(sa.id)}
                            >
                                <Text style={[styles.ctaText, { color: (selectedRelatedAgentId || '') === sa.id ? '#fff' : theme.colors.text }]}>
                                    {sa.name}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {!!counselingError && (
                    <Text style={[styles.cardText, { color: theme.colors.secondaryText }]}>
                        {counselingError}
                    </Text>
                )}

                <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap' }}>
                    <Pressable
                        style={[styles.cta, { borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}
                        onPress={async () => {
                            if (!agent?.id) return;
                            await fetchSessions({ agentId: agent.id, scope: 'active', limit: 20, offset: 0 });
                        }}
                    >
                        <Text style={[styles.ctaText, { color: theme.colors.text }]}>Refresh Sessions</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.cta, { borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}
                        onPress={async () => {
                            const targetAgentId = hierarchyAgent?.id || agent?.id;
                            if (!targetAgentId) return;

                            await employeeToAgent({
                                agentId: targetAgentId,
                                topic: 'Employee counseling request',
                                question: 'Please counsel me on improving performance and communication with this agent.',
                                options: {
                                    priority: 'medium',
                                    type: 'advisory',
                                    confidentiality: 'team',
                                },
                            });

                            await fetchSessions({ agentId: targetAgentId, scope: 'active', limit: 20, offset: 0 });
                        }}
                    >
                        <Text style={[styles.ctaText, { color: theme.colors.text }]}>Employee → Agent Counseling</Text>
                    </Pressable>

                    <Pressable
                        disabled={!hierarchyAgent || hierarchyAgent.type !== 'main_agent' || hierarchyInfo.subAgents.length === 0}
                        style={[styles.cta, { borderColor: theme.colors.border, backgroundColor: theme.colors.background, opacity: (!hierarchyAgent || hierarchyAgent.type !== 'main_agent' || hierarchyInfo.subAgents.length === 0) ? 0.5 : 1 }]}
                        onPress={async () => {
                            if (!hierarchyAgent || hierarchyAgent.type !== 'main_agent') return;
                            const picked = selectedRelatedAgentId
                                ? hierarchyInfo.subAgents.find((sa: any) => sa.id === selectedRelatedAgentId)
                                : undefined;
                            const targetSub = picked || hierarchyInfo.subAgents[0];
                            if (!targetSub) return;

                            await mainToSub({
                                mainAgentId: hierarchyAgent.id,
                                subagentId: targetSub.id,
                                counselingType: 'development',
                                topic: 'Development counseling',
                                details: {
                                    goals: ['Improve response quality', 'Reduce average response time'],
                                    expectations: ['Follow playbooks', 'Escalate edge cases early'],
                                },
                                options: { priority: 'medium', confidentiality: 'team', sessionType: 'one_time' },
                            });

                            await fetchSessions({ agentId: hierarchyAgent.id, scope: 'active', limit: 20, offset: 0 });
                        }}
                    >
                        <Text style={[styles.ctaText, { color: theme.colors.text }]}>Main → Sub Counseling</Text>
                    </Pressable>

                    <Pressable
                        disabled={!hierarchyAgent || hierarchyAgent.type !== 'subagent' || !hierarchyInfo.mainAgent}
                        style={[styles.cta, { borderColor: theme.colors.border, backgroundColor: theme.colors.background, opacity: (!hierarchyAgent || hierarchyAgent.type !== 'subagent' || !hierarchyInfo.mainAgent) ? 0.5 : 1 }]}
                        onPress={async () => {
                            if (!hierarchyAgent || hierarchyAgent.type !== 'subagent') return;
                            const main = hierarchyInfo.mainAgent;
                            if (!main) return;

                            await subToMain({
                                subagentId: hierarchyAgent.id,
                                mainAgentId: main.id,
                                requestType: 'escalation',
                                topic: 'Escalation / guidance request',
                                details: {
                                    challenge: 'Need guidance on handling a complex edge case',
                                    whatAttempted: ['Reviewed policy', 'Tried alternate workflow'],
                                    urgency: 'high',
                                },
                                options: { priority: 'high', confidentiality: 'team' },
                            });

                            await fetchSessions({ agentId: hierarchyAgent.id, scope: 'active', limit: 20, offset: 0 });
                        }}
                    >
                        <Text style={[styles.ctaText, { color: theme.colors.text }]}>Sub → Main Escalation</Text>
                    </Pressable>

                    <Pressable
                        disabled={!hierarchyAgent || !selectedRelatedAgentId || selectedRelatedAgentId === hierarchyAgent?.id}
                        style={[
                            styles.cta,
                            {
                                borderColor: theme.colors.border,
                                backgroundColor: theme.colors.background,
                                opacity: (!hierarchyAgent || !selectedRelatedAgentId || selectedRelatedAgentId === hierarchyAgent?.id) ? 0.5 : 1,
                            },
                        ]}
                        onPress={async () => {
                            if (!hierarchyAgent) return;
                            if (!selectedRelatedAgentId) return;
                            if (selectedRelatedAgentId === hierarchyAgent.id) return;

                            await peer({
                                agentId1: hierarchyAgent.id,
                                agentId2: selectedRelatedAgentId,
                                counselingType: 'knowledge_sharing',
                                topic: 'Peer knowledge sharing',
                                details: {
                                    knowledgeArea: 'Best practices and playbook alignment',
                                    collaborationGoal: 'Share edge-case learnings across the team',
                                },
                                options: { priority: 'medium', confidentiality: 'team' },
                            });

                            await fetchSessions({ agentId: hierarchyAgent.id, scope: 'active', limit: 20, offset: 0 });
                        }}
                    >
                        <Text style={[styles.ctaText, { color: theme.colors.text }]}>Peer Counseling</Text>
                    </Pressable>
                </View>

                {counselingLoading ? (
                    <Text style={{ color: theme.colors.secondaryText, marginTop: 10 }}>Loading counseling sessions...</Text>
                ) : (
                    <View style={{ marginTop: 12, gap: 10 }}>
                        {(counselingSessions || []).length === 0 ? (
                            <Text style={[styles.cardText, { color: theme.colors.secondaryText }]}>No counseling sessions yet.</Text>
                        ) : (
                            (counselingSessions || []).slice(0, 10).map((s: any) => (
                                <View key={s.id} style={[styles.historyRow, { borderBottomColor: theme.colors.border }]}>
                                    <View style={styles.historyLeft}>
                                        <CircleCheckBig size={16} color={agent.color} />
                                        <View style={{ flex: 1 }}>
                                            <Text style={[styles.historyTitle, { color: theme.colors.text }]} numberOfLines={1}>
                                                {s?.requests?.[0]?.topic || 'Counseling Session'}
                                            </Text>
                                            <Text style={[styles.historySub, { color: theme.colors.secondaryText }]} numberOfLines={2}>
                                                Status: {s.status}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={[styles.historyTime, { color: theme.colors.secondaryText }]}>
                                        {s.updatedAt ? new Date(s.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </Text>
                                </View>
                            ))
                        )}
                    </View>
                )}
            </View>
        </View>
    );

    const renderPerformanceTab = (
        <View style={styles.tabContent}>
            <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.cardHeader}>
                    <ChartBar size={20} color={agent.color} />
                    <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Performance & analytics</Text>
                </View>

                {isAnalyticsLoading ? (
                    <Text style={{ color: theme.colors.secondaryText }}>Loading analytics...</Text>
                ) : (
                    <>
                        <View style={styles.kpiRow}>
                            <View style={styles.kpiItem}>
                                <Text style={[styles.kpiValue, { color: theme.colors.text }]}>
                                    {analytics?.tasksCompleted ?? agent.roiMetrics.tasksAutomatedDaily}
                                </Text>
                                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Tasks Total</Text>
                            </View>
                            <View style={styles.kpiItem}>
                                <Text style={[styles.kpiValue, { color: theme.colors.text }]}>
                                    {analytics?.averageResponseTime ?? agent.roiMetrics.responseTime}
                                </Text>
                                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Avg Response</Text>
                            </View>
                            <View style={styles.kpiItem}>
                                <Text style={[styles.kpiValue, { color: theme.colors.text }]}>
                                    {typeof analytics?.successRate === 'number' ? `${analytics.successRate.toFixed(1)}%` : agent.roiMetrics.accuracyRate}
                                </Text>
                                <Text style={[styles.kpiLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
                            </View>
                        </View>

                        <Text style={[styles.cardText, { color: theme.colors.secondaryText, marginTop: 12 }]}>
                            Revenue Impact: {analytics?.revenueImpact ?? '—'}
                        </Text>
                    </>
                )}
            </View>
        </View>
    );

    const renderHistoryTab = (
        <View style={styles.tabContent}>
            <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.cardHeader}>
                    <Clock size={20} color={agent.color} />
                    <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Recent Activity</Text>
                </View>

                {!recentActivity?.activities || recentActivity.activities.length === 0 ? (
                    <Text style={[styles.cardText, { color: theme.colors.secondaryText }]}>
                        No recorded events yet. Activate/deactivate this agent to start building a history trail.
                    </Text>
                ) : (
                    <View style={styles.historyList}>
                        {recentActivity.activities.map((h: any) => {
                            const isSuccess = h.status === 'success' || h.status === 'completed';
                            const statusColor = isSuccess ? '#34C759' : h.status === 'warning' ? '#FF9500' : '#FF3B30';
                            return (
                                <View key={h.id} style={[styles.historyRow, { borderBottomColor: theme.colors.border }]}>
                                    <View style={styles.historyLeft}>
                                        {isSuccess ? (
                                            <CircleCheckBig size={16} color={statusColor} />
                                        ) : (
                                            <TriangleAlert size={16} color={statusColor} />
                                        )}
                                        <View style={{ flex: 1 }}>
                                            <Text style={[styles.historyTitle, { color: theme.colors.text }]}>{h.action}</Text>
                                            <Text style={[styles.historySub, { color: theme.colors.secondaryText }]}>{h.description ?? h.details?.description ?? ''}</Text>
                                        </View>
                                    </View>
                                    <Text style={[styles.historyTime, { color: theme.colors.secondaryText }]}>
                                        {new Date(h.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                )}
            </View>
        </View>
    );

    const customTabs = [
        { id: 'overview', label: 'Overview', icon: Brain, component: renderWhatItDoesTab },
        { id: 'performance', label: 'Performance', icon: ChartBar, component: renderPerformanceTab },
        { id: 'history-local', label: 'History', icon: Clock, component: renderHistoryTab },
        { id: 'counseling', label: 'Counseling', icon: Brain, component: renderCounselingTab },
    ];

    return (
        <>
            {!!toggleError && (
                <View style={[styles.errorBanner, { backgroundColor: theme.colors.cardBackground, borderColor: 'rgba(255,59,48,0.25)' }]}>
                    <Text style={[styles.errorBannerText, { color: theme.colors.text }]} numberOfLines={2}>
                        {toggleError}
                    </Text>
                </View>
            )}
            <AgentShell
                agent={agent}
                customTabs={customTabs}
                isActive={isActive}
                onToggleActive={async (next) => {
                    setToggleError(null);
                    if (next === isActive) return;

                    toggleAgent(agent.id);

                    try {
                        await toggleAgentMutation.mutateAsync({
                            agentId: agent.id,
                            enabled: next,
                            agentType: agent.type === 'employee' ? 'main' : 'sub',
                        });
                    } catch (error) {
                        toggleAgent(agent.id);
                        const message = error instanceof Error ? error.message : 'Failed to toggle agent';
                        setToggleError(message);
                    }
                }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    tabContent: { paddingHorizontal: 20 },
    card: { padding: 20, borderRadius: 16, marginBottom: 15 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 15 },
    cardTitle: { fontSize: 16, fontWeight: '700' },
    cardText: { fontSize: 14, lineHeight: 22 },
    cta: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
    ctaText: { fontSize: 12, fontWeight: '700' },
    errorBanner: { marginHorizontal: 20, marginTop: 12, padding: 12, borderRadius: 12, borderWidth: 1 },
    errorBannerText: { fontSize: 12, fontWeight: '700' },
    tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1 },
    tagText: { fontSize: 12, fontWeight: '600' },
    kpiRow: { flexDirection: 'row', gap: 10 },
    kpiItem: { flex: 1 },
    kpiValue: { fontSize: 20, fontWeight: '900' },
    kpiLabel: { fontSize: 11, fontWeight: '600', marginTop: 2 },
    historyList: { gap: 10 },
    historyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1 },
    historyLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1, paddingRight: 10 },
    historyTitle: { fontSize: 13, fontWeight: '700' },
    historySub: { fontSize: 12, fontWeight: '500', marginTop: 2 },
    historyTime: { fontSize: 10, fontWeight: '600' },
});
