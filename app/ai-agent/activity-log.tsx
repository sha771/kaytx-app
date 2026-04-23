 
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { trpc } from '@/lib/trpc';

export default function GlobalActivityLogScreen() {
    const insets = useSafeAreaInsets();
    const [filter, setFilter] = useState('All');

    const { data: activityData } = trpc.aiAgents.getAgentActivity.useQuery({ limit: 200 });

    const activities: { id: string; agent: string; action: string; target: string; category: string; status: string; timestamp: Date }[] =
        (activityData?.activities ?? []).map((a: any) => {
            const ts = new Date(a.timestamp);
            return {
                id: a.id,
                agent: a.agentName || a.agentType || 'AI Agent',
                action: a.action || a.eventType || 'Activity',
                target: a.details?.target || a.details?.customerName || a.details?.dealName || a.details?.ticketId || '',
                category: a.agentType || 'general',
                status: a.status === 'warn' ? 'warning' : a.status,
                timestamp: ts,
            };
        });

    const categories = Array.from(
        new Set(activities.map((a) => a.category).filter(Boolean))
    ).slice(0, 12);
    const categoryOptions = ['All', ...categories];

    const filteredData =
        filter === 'All'
            ? activities
            : activities.filter(item => item.category === filter);

    const completedToday = activities.filter(a => {
        const now = new Date();
        const isToday = a.timestamp.toDateString() === now.toDateString();
        return isToday && a.status === 'success';
    }).length;

    const criticalAlerts = activities.filter(a => a.status === 'warning' || a.status === 'error').length;

    return (
        <View style={[styles.container, { backgroundColor: '#09090b' }]}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>Global Operations Log</Text>
                    <Text style={styles.subtitle}>Audit Trail & Historical Actions</Text>
                </View>
            </View>

            <View style={styles.statsRow}>
                <LinearGradient colors={['rgba(52, 199, 89, 0.2)', 'rgba(52, 199, 89, 0.05)']} style={styles.statCard}>
                    <Text style={[styles.statVal, { color: '#34C759' }]}>{completedToday.toLocaleString()}</Text>
                    <Text style={styles.statLab}>Completed Today</Text>
                </LinearGradient>
                <LinearGradient colors={['rgba(255, 59, 48, 0.2)', 'rgba(255, 59, 48, 0.05)']} style={styles.statCard}>
                    <Text style={[styles.statVal, { color: '#FF3B30' }]}>{criticalAlerts.toLocaleString()}</Text>
                    <Text style={styles.statLab}>Critical Alerts</Text>
                </LinearGradient>
            </View>

            <View style={styles.filterScroll}>
                {categoryOptions.map(cat => (
                    <TouchableOpacity
                        key={cat}
                        style={[styles.filterChip, filter === cat && styles.activeChip]}
                        onPress={() => setFilter(cat)}
                    >
                        <Text style={[styles.chipText, filter === cat && { color: '#000' }]}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredData}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.logRow}>
                        <View style={[styles.iconBox, { backgroundColor: item.status === 'success' ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 189, 46, 0.1)' }]}>
                            {item.status === 'success' ? <CheckCircle size={16} color="#34C759" /> : <AlertTriangle size={16} color="#FFBD2E" />}
                        </View>
                        <View style={styles.logInfo}>
                            <Text style={styles.logAction}>{item.action}</Text>
                            <Text style={styles.logDetail}>{item.agent}{item.target ? ` • ${item.target}` : ''} • {item.category}</Text>
                        </View>
                        <Text style={styles.logTime}>{item.timestamp.toLocaleTimeString()}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, flexDirection: 'row', alignItems: 'center', gap: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
    title: { color: '#fff', fontSize: 20, fontWeight: '800' },
    subtitle: { color: '#888', fontSize: 12 },
    statsRow: { flexDirection: 'row', padding: 20, gap: 15 },
    statCard: { flex: 1, padding: 15, borderRadius: 16, alignItems: 'center' },
    statVal: { fontSize: 24, fontWeight: '900', marginBottom: 4 },
    statLab: { color: '#ccc', fontSize: 11, fontWeight: '600' },
    filterScroll: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10, gap: 10 },
    filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', marginRight: 10 },
    activeChip: { backgroundColor: '#fff' },
    chipText: { color: '#fff', fontSize: 12, fontWeight: '700' },
    logRow: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, marginBottom: 10 },
    iconBox: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
    logInfo: { flex: 1 },
    logAction: { color: '#fff', fontSize: 14, fontWeight: '700', marginBottom: 2 },
    logDetail: { color: '#666', fontSize: 11 },
    logTime: { color: '#444', fontSize: 11, fontWeight: '600' }
});
