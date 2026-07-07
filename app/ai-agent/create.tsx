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
    const { showAIAssistant } = useAIAssistant();
    const [activeTab, setActiveTab] = useState<'marketplace' | 'custom'>('marketplace');
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const filteredAgents = useMemo(() => {
        if (!search) return aiEmployees;
        const q = search.toLowerCase();
        return aiEmployees.filter((a: AIEmployee) =>
            a.name.toLowerCase().includes(q) ||
            a.role.toLowerCase().includes(q) ||
            a.description?.toLowerCase().includes(q)
        );
    }, [search]);

    const availableAgents = filteredAgents.filter((a: AIEmployee) => !a.isActive && !a.isComingSoon);
    const comingSoon = filteredAgents.filter((a: AIEmployee) => a.isComingSoon);

    const renderMarketplace = () => (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <LinearGradient colors={['#007AFF', '#5856D6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.banner}>
                <View style={styles.bannerGradient}>
                    <View style={styles.bannerContent}>
                        <Sparkles size={28} color="#fff" />
                        <View>
                            <Text style={styles.bannerTitle}>AI Agent Marketplace</Text>
                            <Text style={styles.bannerSubtitle}>Browse and deploy AI agents to supercharge your workforce</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>

            <View style={[styles.searchContainer, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
                <Search size={18} color={theme.colors.secondaryText} />
                <TextInput
                    style={[styles.searchInput, { color: theme.colors.text }]}
                    placeholder="Search agents..."
                    placeholderTextColor={theme.colors.secondaryText}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>Available Agents ({availableAgents.length})</Text>
            <View style={styles.grid}>
                {availableAgents.map((agent: AIEmployee) => (
                    <TouchableOpacity
                        key={agent.id}
                        style={[styles.marketCard, { backgroundColor: theme.colors.card, borderColor: selectedId === agent.id ? theme.colors.primary : theme.colors.border }]}
                        onPress={() => setSelectedId(selectedId === agent.id ? null : agent.id)}
                    >
                        <View style={styles.cardHeader}>
                            <View style={[styles.iconBox, { backgroundColor: agent.color + '20' }]}>
                                <Text style={{ fontSize: 20 }}>{agent.icon}</Text>
                            </View>
                            <View style={styles.statusContainer}>
                                <View style={[styles.statusBadge, { backgroundColor: agent.isActive ? '#34C759' : '#8E8E93' }]}>
                                    <Text style={styles.statusText}>{agent.isActive ? 'Active' : agent.isComingSoon ? 'Soon' : 'Ready'}</Text>
                                </View>
                                <TouchableOpacity style={[styles.activateButton, { backgroundColor: theme.colors.primary + '20' }]}>
                                    <Plus size={14} color={theme.colors.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={[styles.cardName, { color: theme.colors.text }]}>{agent.name}</Text>
                        <Text style={[styles.cardRole, { color: theme.colors.secondaryText }]}>{agent.role}</Text>
                        {agent.description && (
                            <Text style={[styles.cardDesc, { color: theme.colors.secondaryText }]} numberOfLines={2}>
                                {agent.description}
                            </Text>
                        )}
                        <View style={styles.cardFooter}>
                            <Text style={[styles.cost, { color: theme.colors.primary }]}>${agent.cost?.toLocaleString() ?? 'Contact'}/yr</Text>
                            {agent.isActive && (
                                <View style={[styles.badge, { backgroundColor: '#34C759' }]}>
                                    <Text style={styles.badgeText}>ACTIVE</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {comingSoon.length > 0 && (
                <>
                    <Text style={[styles.sectionHeader, { color: theme.colors.text }]}>Coming Soon ({comingSoon.length})</Text>
                    <View style={styles.grid}>
                        {comingSoon.map((agent: AIEmployee) => (
                            <View key={agent.id} style={[styles.marketCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border, opacity: 0.5 }]}>
                                <View style={styles.cardHeader}>
                                    <View style={[styles.iconBox, { backgroundColor: agent.color + '10' }]}>
                                        <Text style={{ fontSize: 20 }}>{agent.icon}</Text>
                                    </View>
                                    <View style={[styles.badge, { backgroundColor: '#FF9500' }]}>
                                        <Text style={styles.badgeText}>SOON</Text>
                                    </View>
                                </View>
                                <Text style={[styles.cardName, { color: theme.colors.text }]}>{agent.name}</Text>
                                <Text style={[styles.cardRole, { color: theme.colors.secondaryText }]}>{agent.role}</Text>
                            </View>
                        ))}
                    </View>
                </>
            )}
        </ScrollView>
    );

    const renderCustomForm = () => (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={[styles.formCard, { backgroundColor: theme.colors.card }]}>
                <View style={styles.formHeader}>
                    <Settings size={32} color={theme.colors.primary} />
                    <Text style={[styles.formTitle, { color: theme.colors.text }]}>Custom Agent Builder</Text>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Agent Name</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
                        placeholder="e.g., Customer Support AI"
                        placeholderTextColor={theme.colors.secondaryText}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Role / Specialty</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
                        placeholder="e.g., Support Agent"
                        placeholderTextColor={theme.colors.secondaryText}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Description</Text>
                    <TextInput
                        style={[styles.textArea, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
                        placeholder="Describe what this agent does..."
                        placeholderTextColor={theme.colors.secondaryText}
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>Category</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
                        {['Customer Support', 'Sales', 'Marketing', 'Engineering', 'HR', 'Finance', 'Operations'].map(cat => (
                            <TouchableOpacity key={cat} style={[styles.catChip, { backgroundColor: theme.colors.primary + '15', borderColor: theme.colors.primary + '30' }]}>
                                <Text style={[styles.catText, { color: theme.colors.primary }]}>{cat}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <TouchableOpacity style={[styles.saveBtn, { backgroundColor: theme.colors.primary }]}>
                    <Save size={18} color="#fff" />
                    <Text style={styles.saveText}>Create Agent</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ArrowLeft size={22} color={theme.colors.text} />
                </TouchableOpacity>
                <View style={styles.headerText}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>Create Agent</Text>
                    <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Deploy a new AI agent</Text>
                </View>
            </View>

            <View style={[styles.tabBar, { borderBottomColor: theme.colors.border }]}>
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
