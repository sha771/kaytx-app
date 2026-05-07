import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { trpc } from '@/lib/trpc';
import {
    ShoppingBag,
    ArrowLeft, Package, RefreshCw, MessageSquare, TrendingUp, Clock, Zap, Globe, ChartBarBig, Users, Truck, Lock, CircleCheck, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const USE_CASES = [
    { id: 'orders', title: 'Order Status & Tracking', description: 'Real-time order updates, shipping info, and delivery tracking', icon: Package, color: '#4ECDC4', stats: { automated: '96%', avgTime: '15s', satisfaction: '4.8/5' } },
    { id: 'returns', title: 'Returns & Refunds', description: 'Automated return processing and refund initiation', icon: RefreshCw, color: '#6C5CE7', stats: { automated: '91%', avgTime: '2m', satisfaction: '4.6/5' }, isPremium: true },
    { id: 'product', title: 'Product Q&A', description: 'Product information, sizing, and recommendations', icon: MessageSquare, color: '#FF6B6B', stats: { automated: '94%', avgTime: '30s', satisfaction: '4.7/5' } },
    { id: 'cart', title: 'Cart Recovery', description: 'Abandoned cart follow-ups and personalized offers', icon: ShoppingBag, color: '#00B894', stats: { automated: '88%', avgTime: '1m', satisfaction: '4.5/5' }, isPremium: true },
];

const RECOMMENDED_AGENTS = ['ai-customer-support', 'ai-retention-specialist', 'ai-marketer', 'ai-social-media-manager', 'ai-campaign-optimizer', 'ai-sales-agent', 'ai-sales-rep', 'ai-crm-assistant'];

export default function RetailScreen() {
    const { theme } = useTheme();
    const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);

    // Fetch real-time industry-specific metrics from tRPC
    const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'marketing-growth' });
    const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

    const isEnterprise = useMemo(() => {
        return subscription?.plan === 'enterprise' || subscription?.plan === 'professional';
    }, [subscription]);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!isEnterprise) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }).start();
        }
    }, [isEnterprise, fadeAnim]);

    const industryMetrics = useMemo(() => [
        { label: 'In-store Inquiries/Day', value: statsData?.tasksToday ? `${(statsData.tasksToday / 12).toFixed(1)}K+` : '35K+', icon: Users, color: '#007AFF' },
        { label: 'Avg Stock Check', value: '0.8s', icon: Clock, color: '#34C759' },
        { label: 'Inventory Accuracy', value: statsData?.avgSuccessRate ? `${statsData.avgSuccessRate}%` : '99.4%', icon: ShoppingBag, color: '#FF9500' },
        { label: 'Omnichannel Lift', value: '28%', icon: TrendingUp, color: '#5856D6' },
    ], [statsData]);

    const agents = useMemo(() => aiEmployees.filter(e => RECOMMENDED_AGENTS.includes(e.id)), []);

    const _renderAgent = ({ item }: { item: typeof aiEmployees[0] }) => {
        const IconComponent = item.icon;
        const isLocked = item.isPremium && !isEnterprise;

        return (
            <TouchableOpacity
                key={item.id}
                style={[styles.agentCard, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => {
                    if (isLocked) {
                        router.push('/enterprise/billing');
                        return;
                    }
                    router.push(item.route);
                }}
            >
                <View style={[styles.agentIcon, { backgroundColor: item.color + '15' }]}>
                    <IconComponent size={24} color={item.color} />
                </View>
                <View style={styles.agentInfo}>
                    <View style={styles.agentTitleRow}>
                        <Text style={[styles.agentName, { color: theme.colors.text }]}>
                            {item.name}
                        </Text>
                        {isLocked ? (
                            <Lock size={12} color={theme.colors.secondaryText} />
                        ) : (
                            <View style={[styles.statusDot, { backgroundColor: (item as any).infrastructure?.status === 'online' ? '#34C759' : '#8E8E93' }]} />
                        )}
                    </View>
                    <Text style={[styles.agentDescription, { color: theme.colors.secondaryText }]} numberOfLines={2}>
                        {item.description}
                    </Text>
                    <View style={styles.agentMetrics}>
                        <View style={styles.metric}>
                            <TrendingUp size={12} color="#34C759" />
                            <Text style={[styles.metricText, { color: '#34C759' }]}>{item.efficiency}</Text>
                        </View>
                        <View style={styles.metric}>
                            <CircleCheck size={12} color={theme.colors.primary} />
                            <Text style={[styles.metricText, { color: theme.colors.primary }]}>{(item as any).roiMetrics?.accuracyRate ?? 'N/A'}</Text>
                        </View>
                    </View>
                </View>
                <ChevronRight size={20} color={theme.colors.border} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Stack.Screen options={{ title: 'Retail & eCommerce', headerStyle: { backgroundColor: theme.colors.background }, headerTintColor: theme.colors.text, headerLeft: () => <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}><ArrowLeft size={24} color={theme.colors.text} /></TouchableOpacity> }} />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <LinearGradient colors={['#c31432', '#240b36', '#c31432']} style={styles.hero} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <View style={styles.heroIcon}><ShoppingBag size={48} color="#fff" /></View>
                    <Text style={styles.heroTitle}>Retail & eCommerce</Text>
                    <Text style={styles.heroSubtitle}>Manage orders, returns, and product questions quickly</Text>
                    <View style={styles.heroStats}>
                        {industryMetrics.map((metric, index) => {
                            const IconComponent = metric.icon;
                            return (
                                <View key={index} style={styles.heroStatItem}>
                                    <IconComponent size={20} color={metric.color} />
                                    <Text style={styles.heroStatValue}>{metric.value}</Text>
                                    <Text style={styles.heroStatLabel}>{metric.label}</Text>
                                </View>
                            );
                        })}
                    </View>
                </LinearGradient>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Benefits</Text>
                    <View style={styles.benefitsGrid}>
                        {[{ icon: Zap, color: '#FF6B6B', title: 'Peak Season Ready', desc: 'Handle 10x order volume' }, { icon: Globe, color: '#4ECDC4', title: 'Omnichannel', desc: 'Web, mobile, social, and in-store' }, { icon: Truck, color: '#6C5CE7', title: 'Delivery Updates', desc: 'Real-time tracking integration' }, { icon: ChartBarBig, color: '#00B894', title: 'Conversion AI', desc: 'Boost sales with AI upselling' }].map((b, i) => { const I = b.icon; return <View key={i} style={[styles.benefitCard, { backgroundColor: theme.colors.cardBackground }]}><I size={24} color={b.color} /><Text style={[styles.benefitTitle, { color: theme.colors.text }]}>{b.title}</Text><Text style={[styles.benefitDesc, { color: theme.colors.secondaryText }]}>{b.desc}</Text></View>; })}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Use Cases</Text>
                    {USE_CASES.map(uc => {
                        const I = uc.icon;
                        const sel = selectedUseCase === uc.id;
                        const isLocked = uc.isPremium && !isEnterprise;
                        return (
                            <TouchableOpacity
                                key={uc.id}
                                style={[styles.useCaseCard, { backgroundColor: theme.colors.cardBackground }, sel && { borderColor: uc.color, borderWidth: 2 }]}
                                onPress={() => {
                                    if (isLocked) {
                                        router.push('/enterprise/billing');
                                        return;
                                    }
                                    setSelectedUseCase(sel ? null : uc.id);
                                }}
                            >
                                <View style={styles.useCaseHeader}>
                                    <View style={[styles.useCaseIcon, { backgroundColor: uc.color + '20' }]}>
                                        <I size={24} color={uc.color} />
                                    </View>
                                    {isLocked && <Lock size={16} color={theme.colors.secondaryText} />}
                                </View>
                                <Text style={[styles.useCaseTitle, { color: theme.colors.text }]}>{uc.title}</Text>
                                <Text style={[styles.useCaseDesc, { color: theme.colors.secondaryText }]}>{uc.description}</Text>
                                {sel && !isLocked && (
                                    <View style={styles.useCaseStats}>
                                        <View style={styles.statItem}><Text style={[styles.statValue, { color: uc.color }]}>{uc.stats.automated}</Text><Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Automated</Text></View>
                                        <View style={styles.statItem}><Text style={[styles.statValue, { color: uc.color }]}>{uc.stats.avgTime}</Text><Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Time</Text></View>
                                        <View style={styles.statItem}><Text style={[styles.statValue, { color: uc.color }]}>{uc.stats.satisfaction}</Text><Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>CSAT</Text></View>
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recommended AI Agents</Text>
                    {agents.slice(0, 6).map(a => {
                        const I = a.icon;
                        const isLocked = a.isPremium && !isEnterprise;
                        return (
                            <TouchableOpacity
                                key={a.id}
                                style={[styles.agentCard, { backgroundColor: theme.colors.cardBackground }]}
                                onPress={() => {
                                    if (isLocked) {
                                        router.push('/enterprise/billing');
                                        return;
                                    }
                                    router.push(a.route);
                                }}
                            >
                                <View style={[styles.agentIcon, { backgroundColor: a.color + '20' }]}><I size={28} color={a.color} /></View>
                                <View style={styles.agentInfo}>
                                    <View style={styles.agentTitleRow}>
                                        <Text style={[styles.agentName, { color: theme.colors.text }]}>{a.name}</Text>
                                        {isLocked && <Lock size={12} color={theme.colors.secondaryText} />}
                                    </View>
                                    <Text style={[styles.agentTitle, { color: theme.colors.secondaryText }]}>{a.title}</Text>
                                    <View style={styles.agentMetrics}>
                                        <View style={styles.metricBadge}><Text style={[styles.metricText, { color: a.color }]}>{a.efficiency}</Text></View>
                                    </View>
                                </View>
                                <View style={styles.agentCost}><Text style={[styles.costLabel, { color: theme.colors.secondaryText }]}>AI Cost</Text><Text style={[styles.costValue, { color: '#34C759' }]}>{a.aiCost}</Text></View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={[styles.cta, { backgroundColor: theme.colors.cardBackground }]}>
                    <Text style={[styles.ctaTitle, { color: theme.colors.text }]}>Boost your retail performance</Text>
                    <TouchableOpacity style={[styles.ctaBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/ai-agent/ai-agent')}><Text style={styles.ctaBtnText}>Get Started</Text></TouchableOpacity>
                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    backBtn: { padding: 8, marginLeft: 8 },
    content: { flex: 1 },
    hero: { padding: 24, paddingTop: 32, paddingBottom: 32, marginHorizontal: 16, marginTop: 16, borderRadius: 24 },
    heroIcon: { width: 80, height: 80, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    heroTitle: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 8 },
    heroSubtitle: { fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 22, marginBottom: 24 },
    heroStats: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
    heroStatItem: { alignItems: 'center', minWidth: (width - 80) / 4 },
    heroStatValue: { fontSize: 20, fontWeight: '800', color: '#fff', marginTop: 6 },
    heroStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2, textAlign: 'center' },
    section: { padding: 20 },
    sectionTitle: { fontSize: 22, fontWeight: '800', marginBottom: 16 },
    benefitsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    benefitCard: { width: (width - 52) / 2, padding: 16, borderRadius: 16, gap: 8 },
    benefitTitle: { fontSize: 15, fontWeight: '700' },
    benefitDesc: { fontSize: 12, lineHeight: 18 },
    useCaseCard: { padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: 'transparent' },
    useCaseIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    useCaseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
    useCaseTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
    useCaseDesc: { fontSize: 13, lineHeight: 19 },
    useCaseStats: { flexDirection: 'row', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(150,150,150,0.2)', justifyContent: 'space-around' },
    statItem: { alignItems: 'center' },
    statValue: { fontSize: 18, fontWeight: '800' },
    statLabel: { fontSize: 11, marginTop: 2 },
    agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, gap: 14, marginBottom: 12 },
    agentIcon: { width: 56, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    agentInfo: { flex: 1 },
    agentTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
    agentName: { fontSize: 16, fontWeight: '700' },
    agentTitle: { fontSize: 12, marginBottom: 6 },
    agentDescription: { fontSize: 13, lineHeight: 18, marginBottom: 8 },
    agentMetrics: { flexDirection: 'row', gap: 8 },
    metric: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    metricBadge: { paddingHorizontal: 8, paddingVertical: 4, backgroundColor: 'rgba(52,199,89,0.15)', borderRadius: 6 },
    metricText: { fontSize: 11, fontWeight: '700' },
    statusDot: { width: 8, height: 8, borderRadius: 4 },
    agentCost: { alignItems: 'flex-end' },
    costLabel: { fontSize: 11, marginBottom: 2 },
    costValue: { fontSize: 14, fontWeight: '700' },
    cta: { margin: 20, padding: 24, borderRadius: 20, alignItems: 'center' },
    ctaTitle: { fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 16 },
    ctaBtn: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
    ctaBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
