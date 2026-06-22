import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Switch, Image, ActivityIndicator } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { useAIAssistant } from '@/providers/AIAssistantProvider';
import { aiEmployees, AIEmployee } from '@/constants/aiEmployees';
import { trpc } from '@/lib/trpc';
import { ArrowLeft, Save, Plus, Search, CircleCheck, ShoppingBag, Sparkles, User, Users, Briefcase, Zap, Settings, Shield, Power, Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreateAgentScreen() {
    const { theme } = useTheme();
    const { toggleAgent, activeAgents } = useAIAssistant();
    const [activeTab, setActiveTab] = useState<'marketplace' | 'custom'>('marketplace');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch existing agents from database
    const { data: agentsData, refetch: refetchAgents } = trpc.aiAgents.getAllAgents.useQuery();
    const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

    const isEnterprise = useMemo(() => {
        return subscription?.plan === 'enterprise' || subscription?.plan === 'professional';
    }, [subscription]);

    const createAgent = trpc.aiAgents.createAgent.useMutation({
        onSuccess: () => {
            refetchAgents();
            Alert.alert('Success', 'Agent created successfully!');
        },
        onError: (error: any) => {
            Alert.alert('Error', error.message || 'Failed to create agent');
        },
    });
    const updateStatus = trpc.aiAgents.updateAgentStatus.useMutation({
        onSuccess: () => {
            refetchAgents();
        },
    });

    const existingAgents = agentsData?.agents || [];
    const existingAgentTypes = new Set(existingAgents.map((a: any) => (a.type ?? '').toLowerCase()));

    // Custom Agent Form State
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<'sales' | 'marketing' | 'operations' | 'support' | 'analytics' | 'executive'>('operations');

    // Filter agents based on search
    const filteredAgents = useMemo(() => {
        if (!searchQuery) return aiEmployees;
        const query = searchQuery.toLowerCase();
        return aiEmployees.filter(agent => 
            agent.name.toLowerCase().includes(query) ||
            agent.title.toLowerCase().includes(query) ||
            agent.description.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const handleCreateAgent = async (agent: AIEmployee) => {
        try {
            const created = await createAgent.mutateAsync({
                name: agent.name,
                description: agent.description,
                type: agent.id.replace(/^ai-/, ''),
                model: 'gpt-4',
                systemPrompt: `You are an AI ${agent.name}. ${agent.description}`,
                capabilities: agent.capabilities,
                config: {
                    category: agent.category,
                    color: agent.color,
                    icon: agent.name,
                },
            });

            return created?.agent?.id as string | undefined;
        } catch {
            console.error('Failed to create agent:');
            return undefined;
        }


    const handleToggleAgent = async (agent: AIEmployee) => {
        const normalizedType = agent.id.replace(/^ai-/, '').toLowerCase();
        const existingAgent = existingAgents.find((a: any) =>
            (a.type || '').toLowerCase() === normalizedType ||
            (a.name || '').toLowerCase() === agent.name.toLowerCase()
        );

        if (existingAgent) {
            // Toggle status between active and paused
            const newStatus = existingAgent.status === 'active' ? 'paused' : 'active';
            try {
                await updateStatus.mutateAsync({
                    agentId: existingAgent.id,
                    status: newStatus as 'draft' | 'active' | 'paused' | 'archived',
                });
            } catch {
                console.error('Failed to update agent status:');
            }
        } else {
            // Create new agent and activate it
            const createdId = await handleCreateAgent(agent);
            if (createdId) {
                await updateStatus.mutateAsync({
                    agentId: createdId,
                    status: 'active',
                });
            } else {
                await refetchAgents();
            }
        }
    };

    const handleSaveCustomAgent = async () => {
        if (!name || !role) {
            Alert.alert('Missing Fields', 'Please provide a name and role for your agent.');
            return;
        }

        try {
            await createAgent.mutateAsync({
                name,
                description: description || 'Custom AI Agent trained for specific business logic.',
                type: role.toLowerCase().replace(/\s+/g, '-'),
                model: 'gpt-4',
                systemPrompt: `You are an AI ${name}. ${description || 'Custom AI Agent trained for specific business logic.'}`,
                capabilities: ['Custom Logic', 'Task Automation'],
                config: {
                    category,
                    custom: true,
                },
            });
            
            // Also add to local state for immediate UI update
            const newAgent: AIEmployee = {
                id: `custom-${Date.now()}`,
                name,
                title: role,
                description: description || 'Custom AI Agent trained for specific business logic.',
                icon: User,
                color: '#AF52DE',
                humanCost: '—',
                aiCost: '—',
                efficiency: '—',
                capabilities: ['Custom Logic', 'Task Automation'],
                route: '/ai-agent/create',
                category,
                type: 'agent',
                replacesRole: role,
                infrastructure: {
                    status: 'standby',
                    health: 100,
                    uptime: '—',
                    lastActive: 'Now',
                    processingPower: 'standard',
                },
                roiMetrics: {
                    tasksAutomatedDaily: 0,
                    responseTime: '—',
                    accuracyRate: '—',
                    savingsPerMonth: '0',
                },
                isNew: true
            };

            setName('');
            setRole('');
            setDescription('');
            Alert.alert('Success', 'Custom agent template created. To persist it, use the Create button in Marketplace.');
        } catch {
            console.error('Failed to create custom agent:');
        }
    };

    const getAgentStatus = (agent: AIEmployee) => {
        const existingAgent = existingAgents.find((a: any) => 
            (a.type || '').toLowerCase() === agent.id.replace('ai-', '').toLowerCase() ||
            (a.name || '').toLowerCase() === agent.name.toLowerCase()
        );
        return existingAgent?.status || 'draft';
    };

    const isAgentActive = (agent: AIEmployee) => {
        const status = getAgentStatus(agent);
        return status === 'active';
    };

    const renderMarketplace = () => (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={styles.banner}>
                <LinearGradient colors={['#007AFF', '#00C7BE']} style={styles.bannerGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <View style={styles.bannerContent}>
                        <Sparkles size={32} color="#fff" />
                        <View>
                            <Text style={styles.bannerTitle}>AI Talent Marketplace</Text>
                            <Text style={styles.bannerSubtitle}>Browse and activate specialized pre-trained agents.</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>

            <View style={[styles.searchContainer, { backgroundColor: theme.colors.cardBackground }]}>
                <Search size={20} color={theme.colors.secondaryText} />
                <TextInput
                    style={[styles.searchInput, { color: theme.colors.text }]}
                    placeholder="Search agents..."
                    placeholderTextColor={theme.colors.secondaryText}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>Available Roles ({filteredAgents.length})</Text>

            <View style={styles.grid}>
                {filteredAgents.map(agent => {
                    const isActive = isAgentActive(agent);
                    const status = getAgentStatus(agent);
                    const isLoading = createAgent.isPending || updateStatus.isPending;

                    return (
                        <View key={agent.id} style={[styles.marketCard, { backgroundColor: theme.colors.cardBackground }]}>
                            <View style={styles.cardHeader}>
                                <View style={[styles.iconBox, { backgroundColor: agent.color + '15' }]}>
                                    <agent.icon size={24} color={agent.color} />
                                </View>
                                <View style={styles.statusContainer}>
                                    {status !== 'draft' && (
                                        <View style={[styles.statusBadge, { backgroundColor: status === 'active' ? '#34C75915' : '#FF950015' }]}>
                                            <Text style={[styles.statusText, { color: status === 'active' ? '#34C759' : '#FF9500' }]}>
                                                {status.toUpperCase()}
                                            </Text>
                                        </View>
                                    )}
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (!isEnterprise && agent.isPremium) {
                                                router.push('/enterprise/billing');
                                                return;
                                            }
                                            handleToggleAgent(agent);
                                        }}
                                        disabled={isLoading}
                                        style={[styles.activateButton, { backgroundColor: isActive ? agent.color + '15' : theme.colors.background }]}
                                    >
                                        {isLoading ? (
                                            <ActivityIndicator size="small" color={agent.color} />
                                        ) : isActive ? (
                                            <Power size={18} color={agent.color} />
                                        ) : agent.isPremium && !isEnterprise ? (
                                            <Lock size={18} color={theme.colors.secondaryText} />
                                        ) : (
                                            <Power size={18} color={theme.colors.secondaryText} />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={[styles.cardName, { color: theme.colors.text }]}>{agent.name}</Text>
                            <Text style={[styles.cardRole, { color: theme.colors.secondaryText }]} numberOfLines={1}>{agent.title}</Text>
                            <Text style={[styles.cardDesc, { color: theme.colors.secondaryText }]} numberOfLines={2}>{agent.description}</Text>

                            <View style={styles.cardFooter}>
                                <Text style={[styles.cost, { color: agent.color }]}>{agent.aiCost}</Text>
                                {agent.isNew && (
                                    <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
                                        <Text style={styles.badgeText}>NEW</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );

    const renderCustomForm = () => (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={[styles.formCard, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.formHeader}>
                    <User size={32} color={theme.colors.primary} />
                    <Text style={[styles.formTitle, { color: theme.colors.text }]}>Design Your Agent</Text>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Agent Name</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
                        placeholder="e.g. Compliance User 3000"
                        placeholderTextColor={theme.colors.secondaryText}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Role / Title</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
                        placeholder="e.g. Internal Auditor"
                        placeholderTextColor={theme.colors.secondaryText}
                        value={role}
                        onChangeText={setRole}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Department</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                        {(['sales', 'marketing', 'operations', 'support', 'analytics', 'executive'] as const).map(cat => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.catChip,
                                    category === cat ? { backgroundColor: theme.colors.primary } : { backgroundColor: theme.colors.background }
                                ]}
                                onPress={() => setCategory(cat)}
                            >
                                <Text style={[
                                    styles.catText,
                                    { color: category === cat ? '#fff' : theme.colors.secondaryText, textTransform: 'capitalize' }
                                ]}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Description & Capabilities</Text>
                    <TextInput
                        style={[styles.textArea, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
                        placeholder="Describe what this agent will do..."
                        placeholderTextColor={theme.colors.secondaryText}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                <TouchableOpacity 
                    style={[
                        styles.saveBtn, 
                        { 
                            backgroundColor: isEnterprise ? theme.colors.primary : theme.colors.secondaryText, 
                            opacity: (createAgent.isPending || (!isEnterprise)) ? 0.6 : 1 
                        }
                    ]} 
                    onPress={() => {
                        if (!isEnterprise) {
                            router.push('/enterprise/billing');
                            return;
                        }
                        handleSaveCustomAgent();
                    }}
                    disabled={createAgent.isPending}
                >
                    {createAgent.isPending ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <>
                            {isEnterprise ? <Save size={20} color="#fff" /> : <Lock size={20} color="#fff" />}
                            <Text style={styles.saveText}>{isEnterprise ? 'Create Agent' : 'Upgrade to Create'}</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <ArrowLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <View style={styles.headerText}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>Deploy Workforce</Text>
                    <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Add new capabilities to your team</Text>
                </View>
            </View>

            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'marketplace' && styles.activeTab]}
                    onPress={() => setActiveTab('marketplace')}
                >
                    <ShoppingBag size={18} color={activeTab === 'marketplace' ? theme.colors.primary : theme.colors.secondaryText} />
                    <Text style={[styles.tabText, { color: activeTab === 'marketplace' ? theme.colors.primary : theme.colors.secondaryText }]}>Marketplace</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'custom' && styles.activeTab]}
                    onPress={() => setActiveTab('custom')}
                >
                    <Settings size={18} color={activeTab === 'custom' ? theme.colors.primary : theme.colors.secondaryText} />
                    <Text style={[styles.tabText, { color: activeTab === 'custom' ? theme.colors.primary : theme.colors.secondaryText }]}>Custom Build</Text>
                </TouchableOpacity>
            </View>

            {activeTab === 'marketplace' ? renderMarketplace() : renderCustomForm()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 15 },
    backButton: { padding: 8, borderRadius: 12, backgroundColor: 'rgba(150,150,150,0.1)' },
    headerText: { flex: 1 },
    title: { fontSize: 24, fontWeight: '800' },
    subtitle: { fontSize: 13, fontWeight: '500' },
    tabBar: { flexDirection: 'row', paddingHorizontal: 20, gap: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(150,150,150,0.1)' },
    tab: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingBottom: 15 },
    activeTab: { borderBottomWidth: 2, borderBottomColor: '#007AFF' },
    tabText: { fontWeight: '700', fontSize: 14 },
    scrollContent: { padding: 20 },
    banner: { marginBottom: 25, borderRadius: 20, overflow: 'hidden', height: 120 },
    bannerGradient: { flex: 1, padding: 20, justifyContent: 'center' },
    bannerContent: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    bannerTitle: { color: '#fff', fontSize: 20, fontWeight: '800' },
    bannerSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 13, maxWidth: 250 },
    sectionHeader: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 15, borderRadius: 12, marginBottom: 20 },
    searchInput: { flex: 1, fontSize: 15 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    marketCard: { width: '48%', padding: 15, borderRadius: 16, marginBottom: 5, gap: 10 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    statusContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    statusBadge: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4 },
    statusText: { fontSize: 8, fontWeight: '700' },
    activateButton: { padding: 6, borderRadius: 8 },
    iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    cardName: { fontSize: 14, fontWeight: '800' },
    cardRole: { fontSize: 11, fontWeight: '600' },
    cardDesc: { fontSize: 10, lineHeight: 14 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
    cost: { fontSize: 11, fontWeight: '700' },
    badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    badgeText: { color: '#fff', fontSize: 8, fontWeight: '900' },
    formCard: { padding: 25, borderRadius: 24, gap: 20 },
    formHeader: { alignItems: 'center', gap: 10, marginBottom: 10 },
    formTitle: { fontSize: 20, fontWeight: '800' },
    inputGroup: { gap: 8 },
    label: { fontSize: 13, fontWeight: '700' },
    input: { padding: 15, borderRadius: 12, fontSize: 15 },
    textArea: { padding: 15, borderRadius: 12, fontSize: 15, height: 100 },
    categoryScroll: { gap: 8 },
    catChip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
    catText: { fontSize: 13, fontWeight: '600' },
    saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 18, borderRadius: 16, marginTop: 10 },
    saveText: { color: '#fff', fontSize: 16, fontWeight: '800' }
});
