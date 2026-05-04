import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Crown, Users, Bot, Activity, ArrowRight } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

type Role = {
  id: string;
  title: string;
  code: string;
  color: string;
  description: string;
  icon: React.ComponentType<any>;
  badge?: React.ComponentType<any>;
};

const ROLES: Role[] = [
  {
    id: 'cdoo',
    title: 'Chief Decision & Orchestration Officer',
    code: 'CDOO',
    color: '#D4AF37',
    description: 'Final authority — overrides everything. Has Final Approve / Reject controls.',
    icon: Crown,
    badge: Crown,
  },
  {
    id: 'ddo',
    title: 'Duty Decision Officer',
    code: 'DDO',
    color: '#0EA5E9',
    description: 'Daily decision maker — active approvals and live duty inbox.',
    icon: Activity,
  },
  {
    id: 'wol',
    title: 'Workforce Operations Lead',
    code: 'WOL',
    color: '#34C759',
    description: 'Manages human employees, assignments and availability.',
    icon: Users,
  },
  {
    id: 'aod',
    title: 'AgentOps Director',
    code: 'AOD',
    color: '#8B5CF6',
    description: 'Manages AI agents: activate, pause, reassign, and monitor performance.',
    icon: Bot,
  },
];

const SAMPLE_QUEUE = [
  { id: 'q1', title: 'Approve Q2 Budget Rebalance', role: 'ddo' },
  { id: 'q2', title: 'Escalation: AgentOps throttle request', role: 'aod' },
  { id: 'q3', title: 'Employee shift swap approval', role: 'wol' },
  { id: 'q4', title: 'Final sign-off: Compliance rollout', role: 'cdoo' },
];

export default function CommandCenterPage() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [queue, setQueue] = useState(SAMPLE_QUEUE);

  const onActivate = (roleId: string) => {
    setActiveRole(roleId);
  };

  const handleAction = (itemId: string, action: 'approve' | 'reject' | 'escalate') => {
    console.log('Action', itemId, action);
    if (action === 'approve' || action === 'reject') {
      setQueue(prev => prev.filter(i => i.id !== itemId));
    }
    if (action === 'escalate') {
      // simple escalation: mark as escalated to CDOO
      setQueue(prev => prev.map(i => i.id === itemId ? { ...i, title: i.title + ' (Escalated)' } : i));
      router.push('/command-center');
    }
  };

  const isWide = width > 800;

  return (
    <ScrollView style= [styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <Text style= [styles.title, { color: colors.text }]}>Command Center</Text>
        <Text style= [styles.subtitle, { color: colors.text }]}>Centralized decision management and orchestration.</Text>
      </View>

      <View style= [styles.cardsRow, isWide ? { flexDirection: 'row' } : { flexDirection: 'column' }]}>
        {ROLES.map(r => {
          const Icon = r.icon as any;
          return (
            <View key={r.id} style= [styles.roleCard, { borderColor: r.color, backgroundColor: colors.background }]}>
              <View style={styles.roleTop}>
                <View style= [styles.badge, { backgroundColor: r.color }]}>
                  <Icon color="#fff" />
                </View>
                <View style={styles.roleMeta}>
                  <Text style= [styles.roleTitle, { color: colors.text }]}>{r.title}</Text>
                  <Text style= [styles.roleCode, { color: r.color }]}>{r.code}</Text>
                </View>
              </View>
              <Text style= [styles.roleDesc, { color: colors.text }]}>{r.description}</Text>
              <TouchableOpacity
                accessibilityLabel={`Activate ${r.code}`}
                style= [styles.activateBtn, activeRole === r.id ? { borderColor: r.color } : {}]}
                onPress={() => onActivate(r.id)}>
                <Text style= [styles.activateText, { color: activeRole === r.id ? r.color : colors.text }]}>
                  {activeRole === r.id ? 'Active' : 'Activate'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style= [styles.sectionTitle, { color: colors.text }]}>Decision Queue</Text>
        {queue.map(item => (
          <View key={item.id} style= [styles.queueItem, { borderColor: '#2d2d2d' }]}>
            <View style={{ flex: 1 }}>
              <Text style= [styles.queueTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style= [styles.queueMeta, { color: colors.text }]}>Assigned Role: {item.role.toUpperCase()}</Text>
            </View>
            <View style={styles.queueActions}>
              <TouchableOpacity onPress={() => handleAction(item.id, 'approve')} style= [styles.actionBtn, { backgroundColor: '#10B981' }]}>
                <Text style={styles.actionText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAction(item.id, 'reject')} style= [styles.actionBtn, { backgroundColor: '#EF4444' }]}>
                <Text style={styles.actionText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAction(item.id, 'escalate')} style= [styles.actionBtn, { backgroundColor: '#0EA5E9' }]}>
                <Text style={styles.actionText}>Escalate</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {queue.length === 0 && <Text style={{ color: colors.text }}>No pending decisions.</Text>}
      </View>

      <View style={styles.section}>
        <Text style= [styles.sectionTitle, { color: colors.text }]}>Hierarchy Flow</Text>
        <View style= [styles.flowContainer, isWide ? { flexDirection: 'row' } : { flexDirection: 'column' }]}>
          <View style={styles.flowNode}>
            <Text style= [styles.flowText, { color: '#D4AF37' }]}>CDOO</Text>
          </View>
          <View style={styles.flowArrow}><Text style={{ color: colors.text }}>→</Text></View>
          <View style={styles.flowNode}>
            <Text style= [styles.flowText, { color: '#0EA5E9' }]}>DDO</Text>
          </View>
          <View style={styles.flowArrow}><Text style={{ color: colors.text }}>→</Text></View>
          <View style={styles.flowNode}>
            <Text style= [styles.flowText, { color: '#34C759' }]}>WOL</Text>
          </View>
          <View style={styles.flowArrow}><Text style={{ color: colors.text }}>+</Text></View>
          <View style={styles.flowNode}>
            <Text style= [styles.flowText, { color: '#8B5CF6' }]}>AOD</Text>
          </View>
        </View>
        <Text style={{ color: colors.text, marginTop: 8 }}>Chain: CDOO → DDO → (WOL + AOD) → (Employees + AI Agents)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14, marginTop: 4 },
  cardsRow: { gap: 12, marginBottom: 16 },
  roleCard: { padding: 12, borderRadius: 12, borderWidth: 1 },
  roleTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  badge: { width: 44, height: 44, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  roleMeta: { flex: 1 },
  roleTitle: { fontSize: 16, fontWeight: '600' },
  roleCode: { marginTop: 4, fontWeight: '700' },
  roleDesc: { fontSize: 13, marginBottom: 12 },
  activateBtn: { padding: 8, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  activateText: { fontWeight: '700' },
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  queueItem: { flexDirection: 'row', padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 8, alignItems: 'center' },
  queueTitle: { fontSize: 16, fontWeight: '600' },
  queueMeta: { fontSize: 12, marginTop: 4 },
  queueActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { paddingHorizontal: 8, paddingVertical: 6, borderRadius: 6, marginLeft: 8 },
  actionText: { color: '#fff', fontWeight: '700' },
  flowContainer: { alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8 },
  flowNode: { padding: 8, borderRadius: 8, borderWidth: 1, minWidth: 80, alignItems: 'center' },
  flowText: { fontWeight: '800' },
  flowArrow: { padding: 4 },
});

