import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, ActivityIndicator, Pressable } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { useAIAssistant } from '@/providers/AIAssistantProvider';
import { trpc } from '@/lib/trpc';
import { useAgentCounseling } from '@/hooks/useAgentCounseling';
import { getAgentById, getAgentHierarchy } from '@/constants/aiAgentHierarchy';
import {
    ArrowLeft,
    Activity,
    Cpu,
    Clock,
    TrendingUp,
    Brain,
    Zap,
    Settings,
    EllipsisVertical,
    ChartBar,
    Target,
    DollarSign,
    CircleCheck,
    Timer,
    ChartLine,
    Eye,
    RefreshCw,
    Shield,
    Database
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AIEmployee } from '@/constants/aiEmployees';

// const { width } = Dimensions.get('window'); // unused

type AgentInput = Partial<AIEmployee> & Pick<AIEmployee, 'id' | 'name' | 'title' | 'description' | 'capabilities'>;

interface EnhancedAgentShellProps {
    agent: AgentInput;
    customTabs?: {
        id: string;
        label: string;
        icon: any;
        component: React.ReactNode;
    }[];
    customActions?: React.ReactNode;
    isActive?: boolean;
    onToggleActive?: (next: boolean) => void;
}

export const EnhancedAgentShell: React.FC<EnhancedAgentShellProps> = ({ agent, customTabs = [], customActions, isActive: controlledIsActive, onToggleActive }) => {
    const { theme } = useTheme();
    const { activeAgents, toggleAgent } = useAIAssistant();
    const [activeTab, setActiveTab] = useState('overview');
    const [logs, setLogs] = useState<{ id: string, text: string, type: 'info' | 'success' | 'warn' | 'error', timestamp: Date }[]>([]);
    const [toggleError, setToggleError] = useState<string | null>(null);

    const {
        sessions: counselingSessions,
        loading: counselingLoading,
        error: counselingError,
        fetchSessions,
        mainToSub,
        subToMain,
        peer,
    } = useAgentCounseling();

    const [selectedRelatedAgentId, setSelectedRelatedAgentId] = useState<string | null>(null);

    const hierarchyAgent = useMemo(() => getAgentById(agent.id), [agent.id]);
    const hierarchyInfo = useMemo(() => getAgentHierarchy(agent.id), [agent.id]);

    const toggleAgentMutation = trpc.aiAgents.toggleAgent.useMutation();

    const isActive = controlledIsActive ?? (activeAgents[agent.id] ?? true);
    const setIsActive = async (next: boolean) => {
        setToggleError(null);

        if (onToggleActive) {
            onToggleActive(next);
            return;
        }

        const current = activeAgents[agent.id] ?? true;
        if (current === next) return;

        // Optimistic local update
        toggleAgent(agent.id);

        try {
            await toggleAgentMutation.mutateAsync({
                agentId: agent.id,
                enabled: next,
                agentType: agent.type === 'employee' ? 'main' : 'sub',
            });
        } catch (_error) {
            // Roll back optimistic update
            toggleAgent(agent.id);
            const message = _error instanceof Error ? _error.message : 'Failed to toggle agent';
            setToggleError(message);
        }
    };

    // Fetch analytics and activity
    const {
        data: analytics,
        isLoading: statsLoading,
        refetch: refetchStats,
    } = trpc.aiAgents.getAgentAnalytics.useQuery({
        agentId: agent.id,
        timeRange: '7d',
    });

    const {
        data: activityData,
        refetch: refetchActivity,
    } = trpc.aiAgents.getAgentActivity.useQuery({ 
        agentId: agent.id,
        limit: 20 
    });

    // Simulate live logs with real activity data
    useEffect(() => {
        if (activityData?.activities) {
            const newLogs = activityData.activities.slice(0, 10).map((act: any) => ({
                id: act.id,
                text: act.action,
                type: act.status === 'success' ? 'success' as const : act.status === 'processing' ? 'info' as const : 'warn' as const,
                timestamp: new Date(act.timestamp),
            }));
            setLogs(newLogs);
        }
    }, [activityData]);

    // Auto-refresh analytics every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            refetchStats();
            refetchActivity();
        }, 30000);
        return () => clearInterval(interval);
    }, [refetchActivity, refetchStats]);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Eye },
        { id: 'analytics', label: 'Analytics', icon: ChartBar },
        { id: 'performance', label: 'Performance', icon: TrendingUp },
        { id: 'capabilities', label: 'Capabilities', icon: Brain },
        { id: 'activity', label: 'Live Activity', icon: Activity },
        { id: 'history', label: 'History', icon: Clock },
        ...customTabs,
        { id: 'counseling', label: 'Counseling', icon: Brain },
        { id: 'config', label: 'Settings', icon: Settings }
    ];

    const renderOverview = () => (
        <View style={styles.tabContent}>
            {/* What They Do Section */}
            <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.sectionHeader}>
                    <Brain size={24} color={agent.color} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>What {agent.name} Does</Text>
                </View>
                <Text style={[styles.description, { color: theme.colors.secondaryText }]}>
                    {agent.description}
                </Text>
                <View style={styles.divider} />
                <Text style={[styles.subsectionTitle, { color: theme.colors.text }]}>Replaces Role</Text>
                <Text style={[styles.roleText, { color: theme.colors.secondaryText }]}>{agent.replacesRole || 'Automated role'}</Text>
            </View>

            {/* Current Activity */}
            <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.sectionHeader}>
                    <Activity size={24} color={agent.color} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Currently Doing</Text>
                    <TouchableOpacity onPress={() => refetchActivity()} style={styles.refreshButton}>
                        <RefreshCw size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
                {activityData?.activities && activityData.activities.length > 0 ? (
                    <View style={styles.activityList}>
                        {activityData.activities.slice(0, 5).map((act: any, i: number) => (
                            <View key={act.id || i} style={styles.activityItem}>
                                <View style={[styles.activityDot, { backgroundColor: act.status === 'success' ? '#34C759' : act.status === 'processing' ? '#007AFF' : '#FF9500' }]} />
                                <View style={styles.activityContent}>
                                    <Text style={[styles.activityAction, { color: theme.colors.text }]}>{act.action}</Text>
                                    <Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>
                                        {new Date(act.timestamp).toLocaleTimeString()}
                                    </Text>
                                </View>
                                <View style={[styles.statusBadge, { backgroundColor: act.status === 'success' ? '#34C75915' : '#007AFF15' }]}>
                                    <Text style={[styles.statusText, { color: act.status === 'success' ? '#34C759' : '#007AFF' }]}>
                                        {act.status}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>No recent activity</Text>
                )}
            </View>

            {/* Quick Stats */}
            {analytics && (
                <View style={styles.quickStatsGrid}>
                    <View style={[styles.quickStatCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <Target size={20} color="#34C759" />
                        <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{analytics.totalTasks.toLocaleString()}</Text>
                        <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Total Tasks</Text>
                    </View>
                    <View style={[styles.quickStatCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <CircleCheck size={20} color="#34C759" />
                        <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{analytics.successRate.toFixed(1)}%</Text>
                        <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
                    </View>
                    <View style={[styles.quickStatCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <Timer size={20} color="#007AFF" />
                        <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{analytics.averageResponseTime}</Text>
                        <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Avg Response</Text>
                    </View>
                    <View style={[styles.quickStatCard, { backgroundColor: theme.colors.cardBackground }]}>
                        <DollarSign size={20} color="#FF9500" />
                        <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{analytics.revenueImpact}</Text>
                        <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Revenue Impact</Text>
                    </View>
                </View>
            )}
        </View>
    );

    const renderCounseling = () => (
        <View style={styles.tabContent}>
            <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.sectionHeader}>
                    <Brain size={24} color={agent.color} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Counseling (A2A)</Text>
                </View>

                <Text style={[styles.description, { color: theme.colors.secondaryText }]}>
                    Related agents
                </Text>

                <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginTop: 10, marginBottom: 12 }}>
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

                {!!counselingError && (
                    <Text style={[styles.roleText, { color: theme.colors.secondaryText, marginBottom: 12 }]}>
                        {counselingError}
                    </Text>
                )}

                <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
                    <Pressable
                        style={[styles.cta, { borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}
                        onPress={async () => {
                            await fetchSessions({ agentId: agent.id, scope: 'active', limit: 20, offset: 0 });
                        }}
                    >
                        <Text style={[styles.ctaText, { color: theme.colors.text }]}>Refresh Sessions</Text>
                    </Pressable>

                    <Pressable
                        disabled={!hierarchyAgent || hierarchyAgent.type !== 'main_agent' || hierarchyInfo.subAgents.length === 0}
                        style={[
                            styles.cta,
                            {
                                borderColor: theme.colors.border,
                                backgroundColor: theme.colors.background,
                                opacity: (!hierarchyAgent || hierarchyAgent.type !== 'main_agent' || hierarchyInfo.subAgents.length === 0) ? 0.5 : 1,
                            },
                        ]}
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
                        style={[
                            styles.cta,
                            {
                                borderColor: theme.colors.border,
                                backgroundColor: theme.colors.background,
                                opacity: (!hierarchyAgent || hierarchyAgent.type !== 'subagent' || !hierarchyInfo.mainAgent) ? 0.5 : 1,
                            },
                        ]}
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
                    <Text style={[styles.roleText, { color: theme.colors.secondaryText }]}>Loading counseling sessions...</Text>
                ) : (counselingSessions || []).length === 0 ? (
                    <Text style={[styles.roleText, { color: theme.colors.secondaryText }]}>No counseling sessions yet.</Text>
                ) : (
                    <View>
                        {(counselingSessions || []).slice(0, 10).map((s: any) => (
                            <View key={s.id} style={[styles.historyItem, { borderBottomColor: theme.colors.border }]}>
                                <View style={styles.historyLeft}>
                                    <CircleCheck size={16} color={agent.color} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.historyTask, { color: theme.colors.text }]} numberOfLines={1}>
                                            {s?.requests?.[0]?.topic || 'Counseling Session'}
                                        </Text>
                                        <Text style={[styles.historyResult, { color: theme.colors.secondaryText }]} numberOfLines={2}>
                                            Status: {s.status}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={[styles.statusBadgeText, { color: theme.colors.secondaryText }]}>
                                    {s.updatedAt ? new Date(s.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );

    const renderAnalytics = () => (
        <View style={styles.tabContent}>
            {statsLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={agent.color} />
                    <Text style={[styles.loadingText, { color: theme.colors.secondaryText }]}>Loading analytics...</Text>
                </View>
            ) : analytics ? (
                <>
                    {/* Performance Metrics */}
                    <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                        <View style={styles.sectionHeader}>
                            <ChartBarBig size={24} color={agent.color} />
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
                        </View>
                        <View style={styles.metricsGrid}>
                            <View style={styles.metricItem}>
                                <Text style={[styles.metricValue, { color: '#34C759' }]}>{analytics.successRate.toFixed(1)}%</Text>
                                <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
                            </View>
                            <View style={styles.metricItem}>
                                <Text style={[styles.metricValue, { color: '#007AFF' }]}>{analytics.uptime}%</Text>
                                <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Health</Text>
                            </View>
                            <View style={styles.metricItem}>
                                <Text style={[styles.metricValue, { color: '#FF9500' }]}>{analytics.errorRate}</Text>
                                <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Error Rate</Text>
                            </View>
                            <View style={styles.metricItem}>
                                <Text style={[styles.metricValue, { color: '#5856D6' }]}>{analytics.averageResponseTime}</Text>
                                <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Response Time</Text>
                            </View>
                        </View>
                    </View>

                    {/* Activity Chart */}
                    <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                        <View style={styles.sectionHeader}>
                            <ChartLine size={24} color={agent.color} />
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>7-Day Activity Trend</Text>
                        </View>
                        <View style={styles.chartContainer}>
                            <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>No trend data available</Text>
                        </View>
                    </View>

                    {/* Top Actions */}
                    <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                        <View style={styles.sectionHeader}>
                            <Target size={24} color={agent.color} />
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Actions</Text>
                        </View>
                        <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>No actions available</Text>
                    </View>
                </>
            ) : null}
        </View>
    );

    const renderPerformance = () => (
        <View style={styles.tabContent}>
            <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.sectionHeader}>
                    <TrendingUp size={24} color={agent.color} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>ROI & Economics</Text>
                </View>
                <View style={styles.roiComparison}>
                    <View style={styles.roiColumn}>
                        <Text style={styles.roiOwner}>HUMAN CAPITAL</Text>
                        <Text style={[styles.roiValue, { color: '#FF3B30' }]}>{agent.humanCost || 'Not specified'}</Text>
                        <Text style={[styles.roiSubtext, { color: theme.colors.secondaryText }]}>Annual salary + overhead</Text>
                    </View>
                    <View style={styles.roiVs}>
                        <Text style={[styles.vsText, { color: theme.colors.secondaryText }]}>VS</Text>
                    </View>
                    <View style={styles.roiColumn}>
                        <Text style={styles.roiOwner}>AUTONOMOUS AGENT</Text>
                        <Text style={[styles.roiValue, { color: '#34C759' }]}>{agent.aiCost || 'Not specified'}</Text>
                        <Text style={[styles.roiSubtext, { color: theme.colors.secondaryText }]}>24/7 Unlimited capacity</Text>
                    </View>
                </View>
                <LinearGradient colors={['#34C75920', '#34C75910']} style={styles.efficiencyBanner}>
            <Zap size={20} color="#34C759" />
            <Text style={[styles.efficiencyText, { color: '#34C759' }]}>{agent.efficiency || 'High efficiency'} Profitability Increase</Text>
                </LinearGradient>
            </View>

            {analytics && (
                <>
                    <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                        <View style={styles.sectionHeader}>
                            <DollarSign size={24} color={agent.color} />
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Financial Impact</Text>
                        </View>
                        <View style={styles.performanceGrid}>
                            <View style={styles.performanceItem}>
                                <Text style={[styles.performanceValue, { color: '#34C759' }]}>{analytics.revenueImpact}</Text>
                                <Text style={[styles.performanceLabel, { color: theme.colors.secondaryText }]}>Revenue Impact</Text>
                            </View>
                            <View style={styles.performanceItem}>
                                <Text style={[styles.performanceValue, { color: agent.color }]}>{agent?.roiMetrics?.savingsPerMonth || 'N/A'}</Text>
                                <Text style={[styles.performanceLabel, { color: theme.colors.secondaryText }]}>Monthly Savings</Text>
                            </View>
                            <View style={styles.performanceItem}>
                                <Text style={[styles.performanceValue, { color: '#007AFF' }]}>{analytics.tasksCompleted.toLocaleString()}</Text>
                                <Text style={[styles.performanceLabel, { color: theme.colors.secondaryText }]}>Tasks Completed</Text>
                            </View>
                            <View style={styles.performanceItem}>
                                <Text style={[styles.performanceValue, { color: '#FF9500' }]}>{analytics.activeConversations}</Text>
                                <Text style={[styles.performanceLabel, { color: theme.colors.secondaryText }]}>Active Conversations</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                        <View style={styles.sectionHeader}>
                            <Activity size={24} color={agent.color} />
                            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Operational Metrics</Text>
                        </View>
                        <View style={styles.operationalMetrics}>
                            <View style={styles.operationalItem}>
                                <Text style={[styles.operationalLabel, { color: theme.colors.secondaryText }]}>Tasks Automated Daily</Text>
                                <Text style={[styles.operationalValue, { color: theme.colors.text }]}>{agent?.roiMetrics?.tasksAutomatedDaily?.toLocaleString() || 'N/A'}</Text>
                            </View>
                            <View style={styles.operationalItem}>
                                <Text style={[styles.operationalLabel, { color: theme.colors.secondaryText }]}>Response Time</Text>
                                <Text style={[styles.operationalValue, { color: theme.colors.text }]}>{agent?.roiMetrics?.responseTime || 'N/A'}</Text>
                            </View>
                            <View style={styles.operationalItem}>
                                <Text style={[styles.operationalLabel, { color: theme.colors.secondaryText }]}>Accuracy Rate</Text>
                                <Text style={[styles.operationalValue, { color: theme.colors.text }]}>{agent.roiMetrics.accuracyRate}</Text>
                            </View>
                        </View>
                    </View>
                </>
            )}
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen
                options={{
                    title: agent.name,
                    headerShown: false
                }}
            />

            {/* Enhanced Header */}
            <LinearGradient
                colors={[agent.color, agent.color + 'dd', agent.color + 'aa']}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
                        <ArrowLeft size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.headerActions}>
                        {customActions}
                        <Switch value={isActive} onValueChange={setIsActive} />
                        <TouchableOpacity style={styles.headerBtn}>
                            <EllipsisVertical size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {toggleError && (
                    <View style={[styles.toggleErrorBanner, { backgroundColor: 'rgba(0,0,0,0.2)' }]}>
                        <Text style={styles.toggleErrorText} numberOfLines={2}>{toggleError}</Text>
                    </View>
                )}

                <View style={styles.heroContent}>
                         <View style={styles.heroIconContainer}>
                         {agent.icon ? <agent.icon size={48} color="#fff" /> : <Cpu size={48} color="#fff" />}
                         <View style={[styles.pulseCircle, { borderColor: '#fff' }]} />
                     </View>
                     <View style={styles.heroText}>
                         <Text style={styles.heroTitle}>{agent.name}</Text>
                         <Text style={styles.heroSubtitle}>{agent.title || 'AI Agent'}</Text>
                         <View style={styles.statusRow}>
                             <View style={[styles.statusPoint, { backgroundColor: isActive ? '#34C759' : '#8E8E93' }]} />
                             <Text style={styles.statusText}>{isActive ? 'OPERATIONAL' : 'PAUSED'}</Text>
                             <View style={styles.statusDivider} />
                             <Text style={styles.statusText}>{agent?.infrastructure?.uptime || '99.9%'} UPTIME</Text>
                         </View>
                     </View>
                </View>

                {/* Infrastructure Stats */}
                <View style={styles.headerStats}>
                <View style={styles.headerStatItem}>
                    <Cpu size={14} color="rgba(255,255,255,0.7)" />
                    <Text style={styles.headerStatValue}>{agent?.infrastructure?.processingPower?.toUpperCase() || 'STANDARD'}</Text>
                    <Text style={styles.headerStatLabel}>Compute</Text>
                </View>
                    <View style={styles.headerStatItem}>
                        <Shield size={14} color="rgba(255,255,255,0.7)" />
                        <Text style={styles.headerStatValue}>SECURE</Text>
                        <Text style={styles.headerStatLabel}>Encryption</Text>
                    </View>
                    <View style={styles.headerStatItem}>
                        <Database size={14} color="rgba(255,255,255,0.7)" />
                        <Text style={styles.headerStatValue}>MEMORY</Text>
                        <Text style={styles.headerStatLabel}>Context</Text>
                    </View>
                    {analytics && (
                        <View style={styles.headerStatItem}>
                            <Activity size={14} color="rgba(255,255,255,0.7)" />
                            <Text style={styles.headerStatValue}>{analytics.successRate.toFixed(0)}%</Text>
                            <Text style={styles.headerStatLabel}>Success</Text>
                        </View>
                    )}
                </View>
            </LinearGradient>

            {/* Tabs */}
            <View style={styles.tabsWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
                    {tabs.map(tab => (
                        <TouchableOpacity
                            key={tab.id}
                            style={[
                                styles.tab,
                                activeTab === tab.id && { backgroundColor: theme.colors.primary }
                            ]}
                            onPress={() => setActiveTab(tab.id)}
                        >
                            <tab.icon size={18} color={activeTab === tab.id ? '#fff' : theme.colors.secondaryText} />
                            <Text style={[styles.tabText, { color: activeTab === tab.id ? '#fff' : theme.colors.secondaryText }]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'analytics' && renderAnalytics()}
                {activeTab === 'performance' && renderPerformance()}
                {activeTab === 'counseling' && renderCounseling()}
                {activeTab === 'capabilities' && (
                    <View style={styles.tabContent}>
                        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                            <View style={styles.sectionHeader}>
                                <Brain size={24} color={agent.color} />
                                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
                            </View>
                            <View style={styles.capabilityList}>
                                {agent.capabilities.map((cap, i) => (
                                    <View key={i} style={styles.capabilityItem}>
                                        <View style={[styles.capIcon, { backgroundColor: agent.color + '15' }]}>
                                            <CircleCheck size={14} color={agent.color} />
                                        </View>
                                        <Text style={[styles.capText, { color: theme.colors.text }]}>{cap}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                )}
                {activeTab === 'activity' && (
                    <View style={styles.tabContent}>
                        <View style={[styles.terminal, { backgroundColor: '#000' }]}>
                            <View style={styles.terminalHeader}>
                                <View style={[styles.dot, { backgroundColor: '#FF5F56' }]} />
                                <View style={[styles.dot, { backgroundColor: '#FFBD2E' }]} />
                                <View style={[styles.dot, { backgroundColor: '#27C93F' }]} />
                                <Text style={styles.terminalTitle}>live-activity-stream</Text>
                            </View>
                            <View style={styles.terminalBody}>
                                {logs.map(log => (
                                    <View key={log.id} style={styles.logRow}>
                                        <Text style={styles.logTime}>[{log.timestamp.toLocaleTimeString()}]</Text>
                                        <Text style={[styles.logText, { color: log.type === 'success' ? '#00FF41' : log.type === 'warn' ? '#FFBD2E' : '#eee' }]}>
                                            {log.text}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                )}
                {activeTab === 'history' && (
                    <View style={styles.tabContent}>
                        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                            <View style={styles.sectionHeader}>
                                <Clock size={24} color={agent.color} />
                                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Execution History</Text>
                            </View>
                            {(agent.simulationConfig?.historyItems || []).map((item, i) => (
                                <View key={i} style={styles.historyRow}>
                                    <View style={styles.historyLeft}>
                                        <View style={[styles.historyDot, { backgroundColor: item.status === 'Success' ? '#34C759' : '#FFBD2E' }]} />
                                        <View>
                                            <Text style={[styles.historyTask, { color: theme.colors.text }]}>{item.task}</Text>
                                            <Text style={[styles.historyResult, { color: theme.colors.secondaryText }]}>{item.result}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: item.status === 'Success' ? '#34C75920' : '#FF950020' }]}>
                                        <Text style={[styles.statusBadgeText, { color: item.status === 'Success' ? '#34C759' : '#FF9500' }]}>{item.status}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
                {activeTab === 'config' && (
                    <View style={styles.tabContent}>
                        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                            <View style={styles.settingRow}>
                                <View>
                                    <Text style={[styles.settingTitle, { color: theme.colors.text }]}>Autonomous Execution</Text>
                                    <Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Apply directives without human approval</Text>
                                </View>
                                <Switch value={isActive} onValueChange={setIsActive} />
                            </View>
                        </View>
                    </View>
                )}

                {/* Custom Tabs */}
                {customTabs.find(t => t.id === activeTab)?.component}

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingBottom: 32, borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50 },
    headerBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
    headerActions: { flexDirection: 'row', gap: 10 },
    toggleErrorBanner: { marginHorizontal: 20, marginTop: 12, padding: 10, borderRadius: 12 },
    toggleErrorText: { color: '#fff', fontSize: 12, fontWeight: '700' },
    heroContent: { paddingHorizontal: 30, paddingTop: 20, flexDirection: 'row', alignItems: 'center', gap: 20 },
    heroIconContainer: { width: 84, height: 84, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
    heroText: { flex: 1 },
    heroTitle: { fontSize: 28, fontWeight: '900', color: '#fff', letterSpacing: -1 },
    heroSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginBottom: 8 },
    statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    statusPoint: { width: 10, height: 10, borderRadius: 5 },
    statusText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
    statusDivider: { width: 1, height: 10, backgroundColor: 'rgba(255,255,255,0.3)' },
    pulseCircle: { position: 'absolute', width: 94, height: 94, borderRadius: 28, borderWidth: 1, opacity: 0.3 },
    headerStats: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 30, marginTop: 30 },
    headerStatItem: { alignItems: 'center' },
    headerStatValue: { color: '#fff', fontSize: 13, fontWeight: '800', marginTop: 4 },
    headerStatLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '600' },
    tabsWrapper: { marginTop: -25, zIndex: 10 },
    tabsContainer: { paddingHorizontal: 20, gap: 10, paddingBottom: 15 },
    tab: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16, backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
    tabText: { fontSize: 14, fontWeight: '700' },
    content: { flex: 1, paddingTop: 10 },
    tabContent: { paddingHorizontal: 20 },
    card: { padding: 24, borderRadius: 24, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: '800', flex: 1 },
    description: { fontSize: 15, lineHeight: 22, marginBottom: 16 },
    divider: { height: 1, backgroundColor: 'rgba(150,150,150,0.1)', marginVertical: 16 },
    subsectionTitle: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
    roleText: { fontSize: 14, lineHeight: 20 },
    activityList: { gap: 12 },
    activityItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
    activityDot: { width: 8, height: 8, borderRadius: 4 },
    activityContent: { flex: 1 },
    activityAction: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
    activityTime: { fontSize: 12 },
    refreshButton: { padding: 4 },
    quickStatsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
    quickStatCard: { flex: 1, minWidth: '47%', padding: 20, borderRadius: 20, alignItems: 'center', gap: 8 },
    quickStatValue: { fontSize: 24, fontWeight: '900' },
    quickStatLabel: { fontSize: 12, fontWeight: '600' },
    loadingContainer: { alignItems: 'center', justifyContent: 'center', padding: 40 },
    loadingText: { marginTop: 12, fontSize: 14 },
    metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
    metricItem: { flex: 1, minWidth: '47%', alignItems: 'center', padding: 16 },
    metricValue: { fontSize: 28, fontWeight: '900', marginBottom: 4 },
    metricLabel: { fontSize: 12, fontWeight: '600' },
    chartContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 150, marginTop: 20 },
    chartBar: { flex: 1, alignItems: 'center', gap: 8 },
    bar: { width: 30, borderRadius: 4, minHeight: 10 },
    chartLabel: { fontSize: 10, fontWeight: '600' },
    actionRow: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(150,150,150,0.1)' },
    actionInfo: { marginBottom: 8 },
    actionName: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
    actionCount: { fontSize: 12 },
    actionProgress: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    progressBar: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 3 },
    actionSuccess: { fontSize: 12, fontWeight: '700', minWidth: 40 },
    roiComparison: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    roiColumn: { flex: 1, alignItems: 'center' },
    roiVs: { width: 40, alignItems: 'center' },
    vsText: { fontWeight: '900', fontSize: 12 },
    roiOwner: { fontSize: 10, fontWeight: '800', marginBottom: 4, letterSpacing: 0.5 },
    roiValue: { fontSize: 24, fontWeight: '900' },
    roiSubtext: { fontSize: 11, textAlign: 'center', marginTop: 2 },
    efficiencyBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 14, borderRadius: 16 },
    efficiencyText: { fontSize: 14, fontWeight: '800' },
    performanceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
    performanceItem: { flex: 1, minWidth: '47%', alignItems: 'center', padding: 16 },
    performanceValue: { fontSize: 24, fontWeight: '900', marginBottom: 4 },
    performanceLabel: { fontSize: 12, fontWeight: '600' },
    operationalMetrics: { gap: 16 },
    operationalItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
    operationalLabel: { fontSize: 14, fontWeight: '600' },
    operationalValue: { fontSize: 16, fontWeight: '800' },
    capabilityList: { gap: 12 },
    capabilityItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    capIcon: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    capText: { fontSize: 15, fontWeight: '600' },
    terminal: { borderRadius: 16, overflow: 'hidden', paddingBottom: 20 },
    terminalHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 12, backgroundColor: '#333' },
    terminalTitle: { color: '#aaa', fontSize: 10, fontWeight: '700', marginLeft: 10 },
    dot: { width: 10, height: 10, borderRadius: 5 },
    terminalBody: { padding: 15, maxHeight: 400 },
    logRow: { flexDirection: 'row', gap: 10, marginBottom: 6 },
    logTime: { color: '#00FF41', fontSize: 11, fontFamily: 'monospace' },
    logText: { fontSize: 11, flex: 1, fontFamily: 'monospace' },
    settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    settingTitle: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
    settingDesc: { fontSize: 12 },
    historyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
    historyLeft: { flexDirection: 'row', alignItems: 'center', gap: 15, flex: 1 },
    historyDot: { width: 8, height: 8, borderRadius: 4 },
    historyTask: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
    historyResult: { fontSize: 12 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    statusBadgeText: { fontSize: 10, fontWeight: '700' },
    emptyText: { fontSize: 14, textAlign: 'center', padding: 20 },
    historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
    cta: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14, borderWidth: 1 },
    ctaText: { fontSize: 12, fontWeight: '700' },
});
