
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TrendingUp, Activity, ChartBarBig, Shield, Globe, Zap, DollarSign } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';

const orchestrationTasks = [
  { task: 'Coordinating 15 sub-agents', status: 'Active', color: '#00C853' },
  { task: 'Real-time market scan running', status: 'Running', color: '#007AFF' },
  { task: 'Portfolio rebalance queued', status: 'Queued', color: '#FF9500' },
  { task: 'Risk threshold check', status: 'Passed', color: '#00C853' },
  { task: 'Macro data ingestion', status: 'Active', color: '#00C853' },
];

export default function TradingMainScreen() {
  const { theme } = useTheme();
  const agent = useMemo(() => aiEmployees.find(e => e.id === 'trading-investment-ai')!, []);

  const orchestrationTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#00C853', '#009624']} style={styles.metricCard}>
          <TrendingUp size={20} color="#fff" />
          <Text style={styles.metricValue}>15</Text>
          <Text style={styles.metricLabel}>Active Sub-Agents</Text>
        </LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}>
          <Activity size={20} color="#fff" />
          <Text style={styles.metricValue}>5,240</Text>
          <Text style={styles.metricLabel}>Tasks Today</Text>
        </LinearGradient>
        <LinearGradient colors={['#5856D6', '#4846b0']} style={styles.metricCard}>
          <Shield size={20} color="#fff" />
          <Text style={styles.metricValue}>99.9%</Text>
          <Text style={styles.metricLabel}>Uptime</Text>
        </LinearGradient>
        <LinearGradient colors={['#FF9500', '#e68a00']} style={styles.metricCard}>
          <DollarSign size={20} color="#fff" />
          <Text style={styles.metricValue}>$25K</Text>
          <Text style={styles.metricLabel}>Monthly Savings</Text>
        </LinearGradient>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>Orchestration Status</Text>
        {orchestrationTasks.map((item, i) => (
          <View key={i} style={[styles.taskRow, { borderBottomColor: theme.colors.border }]}>
            <View style={[styles.statusDot, { backgroundColor: item.color }]} />
            <Text style={[styles.taskText, { color: theme.colors.text }]}>{item.task}</Text>
            <Text style={[styles.taskStatus, { color: item.color }]}>{item.status}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 16 }]}>System Intelligence</Text>
        {[
          { label: 'Signal Accuracy', value: '98.5%', icon: Zap, color: '#00C853' },
          { label: 'Avg Response Time', value: '0.1s', icon: Activity, color: '#007AFF' },
          { label: 'Market Coverage', value: '12 Assets', icon: Globe, color: '#AF52DE' },
          { label: 'Risk Score', value: 'LOW', icon: Shield, color: '#34C759' },
        ].map((item, i) => (
          <View key={i} style={[styles.intelRow, { borderBottomColor: theme.colors.border }]}>
            <View style={[styles.intelIcon, { backgroundColor: item.color + '20' }]}>
              <item.icon size={16} color={item.color} />
            </View>
            <Text style={[styles.intelLabel, { color: theme.colors.secondaryText }]}>{item.label}</Text>
            <Text style={[styles.intelValue, { color: theme.colors.text }]}>{item.value}</Text>
          </View>
        ))}
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );

  const customTabs = [
    { id: 'orchestration', label: 'Orchestration', icon: Activity, component: orchestrationTab },
    { id: 'analytics', label: 'Analytics', icon: ChartBarBig, component: <View /> },
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 6 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  taskRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 10 },
  statusDot: { width: 9, height: 9, borderRadius: 5 },
  taskText: { flex: 1, fontSize: 14, fontWeight: '500' },
  taskStatus: { fontSize: 13, fontWeight: '700' },
  intelRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, gap: 12 },
  intelIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  intelLabel: { flex: 1, fontSize: 14 },
  intelValue: { fontSize: 15, fontWeight: '700' },
});
