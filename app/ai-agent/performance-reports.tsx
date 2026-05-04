import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, TrendingUp, DollarSign, Clock, Users, ChartPie, Download } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function PerformanceReportsScreen() {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { backgroundColor: '#09090b' }]}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>Enterprise Reports</Text>
                    <Text style={styles.subtitle}>Aggregated Performance Metrics</Text>
                </View>
                <TouchableOpacity style={styles.exportBtn}>
                    <Download size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Main KPI Cards */}
                <View style={styles.grid}>
                    <LinearGradient colors={['#34C759', '#30D158']} style={styles.kpiCard}>
                        <View style={styles.kpiIcon}><DollarSign size={20} color="#fff" /></View>
                        <Text style={styles.kpiLabel}>Est. Savings</Text>
                        <Text style={styles.kpiValue}>$142,500</Text>
                        <Text style={styles.kpiChange}>+12% vs last mo</Text>
                    </LinearGradient>
                    <LinearGradient colors={['#5856D6', '#5E5CE6']} style={styles.kpiCard}>
                        <View style={styles.kpiIcon}><Clock size={20} color="#fff" /></View>
                        <Text style={styles.kpiLabel}>Hours Saved</Text>
                        <Text style={styles.kpiValue}>3,211h</Text>
                        <Text style={styles.kpiChange}>+8% vs last mo</Text>
                    </LinearGradient>
                </View>

                {/* Efficiency Breakdown */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Agent Efficiency by Role</Text>
                    {[
                        { label: 'Sales Agents', val: 92, color: '#30D158' },
                        { label: 'Support Bots', val: 88, color: '#FF9500' },
                        { label: 'Data Analysts', val: 96, color: '#5856D6' },
                        { label: 'HR Assistants', val: 81, color: '#FF3B30' }
                    ].map((item, i) => (
                        <View key={i} style={styles.barRow}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                                <Text style={styles.barLabel}>{item.label}</Text>
                                <Text style={styles.barVal}>{item.val}%</Text>
                            </View>
                            <View style={styles.track}>
                                <View style={[styles.fill, { width: `${item.val}%`, backgroundColor: item.color }]} />
                            </View>
                        </View>
                    ))}
                </View>

                {/* Task Volume Map */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Task Volume Distribution</Text>
                    <View style={styles.chartArea}>
                        <View style={styles.piePlaceholder}>
                            <ChartPie size={120} color="#444" />
                            <View style={styles.legend}>
                                <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: '#5856D6' }]} /><Text style={styles.lText}>Prospecting (45%)</Text></View>
                                <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: '#34C759' }]} /><Text style={styles.lText}>Support (30%)</Text></View>
                                <View style={styles.legendItem}><View style={[styles.dot, { backgroundColor: '#FF9500' }]} /><Text style={styles.lText}>Ops (25%)</Text></View>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, flexDirection: 'row', alignItems: 'center', gap: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
    exportBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto' },
    title: { color: '#fff', fontSize: 20, fontWeight: '800' },
    subtitle: { color: '#888', fontSize: 12 },
    content: { flex: 1, padding: 20 },
    grid: { flexDirection: 'row', gap: 15, marginBottom: 30 },
    kpiCard: { flex: 1, padding: 20, borderRadius: 20, alignItems: 'center' },
    kpiIcon: { marginBottom: 10, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    kpiLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600' },
    kpiValue: { color: '#fff', fontSize: 24, fontWeight: '900', marginVertical: 4 },
    kpiChange: { color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 2, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 8 },
    section: { marginBottom: 30, padding: 20, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
    sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '800', marginBottom: 20 },
    barRow: { marginBottom: 15 },
    barLabel: { color: '#ccc', fontSize: 13, fontWeight: '600' },
    barVal: { color: '#fff', fontSize: 13, fontWeight: '800' },
    track: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' },
    fill: { height: '100%', borderRadius: 4 },
    chartArea: { alignItems: 'center', justifyContent: 'center' },
    piePlaceholder: { flexDirection: 'row', alignItems: 'center', gap: 30 },
    legend: { gap: 10 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    dot: { width: 10, height: 10, borderRadius: 5 },
    lText: { color: '#ccc', fontSize: 12, fontWeight: '600' }
});
