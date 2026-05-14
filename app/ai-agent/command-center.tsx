import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity,
  Server,
  Database,
  Zap,
  Target,
  Shield,
  Code,
  Terminal,
  Monitor,
} from 'lucide-react-native';

export default function CommandCenterPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#007AFF20' }]}>
          <Activity size={56} color="#007AFF" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Command Center</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Centralized AI Operations Hub
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Server size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Systems Online</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}>
            <Zap size={12} color="#007AFF" />
            <Text style={[styles.badgeText, { color: '#007AFF' }]}>Active Processes</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Database size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>Data Streams</Text>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Server size={24} color="#34C759" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>99.8%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Uptime</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Zap size={24} color="#007AFF" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>2.4K</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Tasks/Hour</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Shield size={24} color="#FF9500" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>0</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Security Alerts</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Monitor size={24} color="#FFD700" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>15</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Active Monitors</Text>
        </View>
      </View>

      {/* Overview Section */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The Command Center serves as the central nervous system for AI operations, providing 
          real-time monitoring, control, and orchestration of all AI agents and workflows across 
          the enterprise. It enables seamless coordination between different layers of the AI 
          workforce architecture.
        </Text>
      </View>

      {/* Key Components */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Components</Text>
        <View style={styles.componentsList}>
          {[
            { label: 'Real-time Orchestration', icon: Zap, color: '#007AFF' },
            { label: 'Workflow Management', icon: Activity, color: '#34C759' },
            { label: 'Resource Allocation', icon: Server, color: '#FF9500' },
            { label: 'Performance Monitoring', icon: Monitor, color: '#FFD700' },
            { label: 'Security & Compliance', icon: Shield, color: '#EF4444' },
            { label: 'API Gateway', icon: Terminal, color: '#64748B' },
          ].map((comp, i) => (
            <View key={i} style={styles.componentItem}>
              <View style={[styles.componentIcon, { backgroundColor: comp.color + '20' }]}>
                <comp.icon size={20} color={comp.color} />
              </View>
              <Text style={[styles.componentText, { color: theme.colors.textSecondary }]}>
                {comp.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {[
            { label: 'Deploy New Agent', icon: Server, route: '/ai-agent/deploy-agent' },
            { label: 'Monitor Workflows', icon: Activity, route: '/ai-agent/workflow-monitor' },
            { label: 'System Diagnostics', icon: Zap, route: '/ai-agent/system-diagnostics' },
            { label: 'Resource Optimization', icon: Server, route: '/ai-agent/resource-optimizer' },
          ].map((action, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => router.push(action.route)}
              style={[styles.actionButton, { backgroundColor: '#007AFF15' }]}
            >
              <action.icon size={24} color="#007AFF" />
              <Text style={[styles.actionText, { color: '#007AFF' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* System Status */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>System Status</Text>
        <View style={styles.statusList}>
          {[
            { label: 'AI Orchestrator', status: 'Online', color: '#34C759' },
            { label: 'Workflow Engine', status: 'Online', color: '#34C759' },
            { label: 'Data Pipeline', status: 'Online', color: '#34C759' },
            { label: 'Communication Hub', status: 'Online', color: '#34C759' },
            { label: 'Security Monitor', status: 'Online', color: '#34C759' },
            { label: 'API Gateway', status: 'Online', color: '#34C759' },
          ].map((status, i) => (
            <View key={i} style={styles.statusItem}>
              <Text style={[styles.statusLabel, { color: theme.colors.textSecondary }]}>
                {status.label}
              </Text>
              <View style={styles.statusIndicator}>
                <View style={[styles.statusDot, { backgroundColor: status.color }]} />
                <Text style={[styles.statusText, { color: theme.colors.textSecondary }]}>
                  {status.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 28, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 18 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 16, borderRadius: 12 },
  statValue: { fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  componentsList: { gap: 12 },
  componentItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  componentIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  componentText: { flex: 1, fontSize: 14 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
  statusList: { gap: 10 },
  statusItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  statusLabel: { fontSize: 13, color: theme.colors.textSecondary },
  statusIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 13, fontWeight: '600' },
});
