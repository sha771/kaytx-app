import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import {
  Shield, Eye, Lock, FingerprintPattern, ListFilter, Ban, Trash2, ClipboardCheck, FileText,
  Activity, CircleCheckBig, TriangleAlert, ArrowRight
} from 'lucide-react-native';
import {
  getPrivacyAgentsByGate,
  getAllPrivacyAgents,
  AI_WORKFORCE_STATS,
} from '@/constants/aiAgentHierarchy';

const gateConfig = {
  input: {
    label: 'PRIVACY INPUT GATE',
    color: '#448AFF',
    bgColor: '#448AFF18',
    agents: getPrivacyAgentsByGate('input'),
    description: 'Classifies incoming data and validates access before it enters the AI workforce.',
  },
  agent: {
    label: 'PRIVACY AGENT GATE',
    color: '#00BFA5',
    bgColor: '#00BFA518',
    agents: getPrivacyAgentsByGate('agent'),
    description: 'Masks and filters data before it reaches AI agents based on role and context.',
  },
  output: {
    label: 'PRIVACY OUTPUT GATE',
    color: '#FF6E40',
    bgColor: '#FF6E4018',
    agents: getPrivacyAgentsByGate('output'),
    description: 'Sanitizes outputs and validates compliance before delivery to users.',
  },
};

export default function PrivacyDashboard() {
  const { theme } = useTheme();
  const allAgents = getAllPrivacyAgents();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FF525220' }]}>
          <Shield size={48} color="#FF5252" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Privacy Layer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          9 AI Agents | 3 Gates | Real-Time Protection
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF525222' }]}>
            <Shield size={12} color="#FF5252" />
            <Text style={[styles.badgeText, { color: '#FF5252' }]}>Critical</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Shield size={22} color="#FF5252" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{allAgents.length}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Privacy Agents</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <CircleCheckBig size={22} color="#34C759" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>3</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Gates</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Activity size={22} color="#007AFF" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>99.9%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Uptime</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <TriangleAlert size={22} color="#FF9500" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>0</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Violations</Text>
        </View>
      </View>

      {/* Gates */}
      {(['input', 'agent', 'output'] as const).map((gateKey) => {
        const gate = gateConfig[gateKey];
        return (
          <View key={gateKey} style={[styles.gateSection, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <View style={styles.gateHeader}>
              <View style={[styles.gateIconWrap, { backgroundColor: gate.bgColor }]}>
                <ArrowRight size={20} color={gate.color} />
              </View>
              <View style={styles.gateTitleWrap}>
                <Text style={[styles.gateLabel, { color: gate.color }]}>{gate.label}</Text>
                <Text style={[styles.gateDesc, { color: theme.colors.textSecondary }]}>{gate.description}</Text>
              </View>
            </View>

            <View style={styles.agentsList}>
              {gate.agents.map((agent) => (
                <View key={agent.id} style={[styles.agentRow, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
                  <View style={[styles.agentIconWrap, { backgroundColor: gate.bgColor }]}>
                    {React.createElement(agent.icon, { size: 18, color: gate.color })}
                  </View>
                  <View style={styles.agentInfo}>
                    <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
                    <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>{agent.title}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: '#34C75922' }]}>
                    <Activity size={10} color="#34C759" />
                    <Text style={[styles.statusText, { color: '#34C759' }]}>Online</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );
      })}

      {/* Data Flow */}
      <View style={[styles.flowSection, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Privacy Flow</Text>
        <View style={styles.flowDiagram}>
          <View style={styles.flowStep}>
            <Text style={[styles.flowNode, { backgroundColor: '#448AFF22', color: '#448AFF' }]}>INPUT</Text>
          </View>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
          <View style={styles.flowStep}>
            <Text style={[styles.flowNode, { backgroundColor: '#448AFF22', color: '#448AFF' }]}>INPUT GATE</Text>
          </View>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
          <View style={styles.flowStep}>
            <Text style={[styles.flowNode, { backgroundColor: '#00BFA522', color: '#00BFA5' }]}>AGENT GATE</Text>
          </View>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
          <View style={styles.flowStep}>
            <Text style={[styles.flowNode, { backgroundColor: '#FF6E4022', color: '#FF6E40' }]}>OUTPUT GATE</Text>
          </View>
          <ArrowRight size={16} color={theme.colors.textSecondary} />
          <View style={styles.flowStep}>
            <Text style={[styles.flowNode, { backgroundColor: '#FF6E4022', color: '#FF6E40' }]}>OUTPUT</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: {
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
  },
  gateSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  gateHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  gateIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gateTitleWrap: {
    flex: 1,
  },
  gateLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  gateDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  agentsList: {
    gap: 8,
  },
  agentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  agentIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
  },
  agentRole: {
    fontSize: 12,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  flowSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  flowDiagram: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  flowStep: {
    alignItems: 'center',
  },
  flowNode: {
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

