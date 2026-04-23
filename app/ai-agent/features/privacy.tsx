import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ChevronLeft,
  Shield,
  Eye,
  Lock,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Database,
  Filter,
  Activity,
  Download
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function PrivacyPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { agentId, agentName } = useLocalSearchParams<{ agentId: string; agentName: string }>();
  const [dataMasking, setDataMasking] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);
  const [complianceCheck, setComplianceCheck] = useState(true);

  const privacyScore = 96;

  const privacyMetrics = [
    { title: 'Data Classification', value: '100%', icon: Filter, color: '#34C759', description: 'All data properly classified' },
    { title: 'Access Controls', value: 'Active', icon: Lock, color: '#007AFF', description: 'Role-based access enforced' },
    { title: 'Audit Trail', value: '2,847', icon: FileText, color: '#FF9500', description: 'Logged interactions this week' },
    { title: 'Compliance', value: 'GDPR ✓', icon: CheckCircle2, color: '#581C84', description: 'Regulatory compliance status' },
  ];

  const privacyGates = [
    {
      name: 'Privacy Input Gate',
      description: 'Data classification, purpose validation, and access control before processing',
      agents: ['Data Classifier', 'Purpose Validator', 'Access Controller'],
      icon: Eye,
      color: '#007AFF',
      status: 'Active'
    },
    {
      name: 'Privacy Agent Gate',
      description: 'Data masking, context filtering, and permission enforcement during processing',
      agents: ['Data Masker', 'Context Filter', 'Permission Enforcer'],
      icon: Shield,
      color: '#581C84',
      status: 'Active'
    },
    {
      name: 'Privacy Output Gate',
      description: 'Output sanitization, compliance checking, and audit logging before delivery',
      agents: ['Output Sanitizer', 'Compliance Checker', 'Audit Logger'],
      icon: Lock,
      color: '#34C759',
      status: 'Active'
    },
  ];

  const recentPrivacyEvents = [
    { time: '1 min ago', event: 'Masked 12 sensitive fields in billing query', type: 'mask', icon: Eye },
    { time: '5 min ago', event: 'Validated GDPR compliance for customer data', type: 'compliance', icon: CheckCircle2 },
    { time: '15 min ago', event: 'Blocked unauthorized PII access attempt', type: 'block', icon: AlertTriangle },
    { time: '30 min ago', event: 'Logged audit entry for data export', type: 'audit', icon: FileText },
    { time: '1 hour ago', event: 'Sanitized output for external delivery', type: 'sanitize', icon: Shield },
  ];

  const complianceStatus = [
    { regulation: 'GDPR', status: 'Compliant', color: '#34C759' },
    { regulation: 'CCPA', status: 'Compliant', color: '#34C759' },
    { regulation: 'HIPAA', status: 'Compliant', color: '#34C759' },
    { regulation: 'SOX', status: 'Compliant', color: '#34C759' },
    { regulation: 'PCI DSS', status: 'Compliant', color: '#34C759' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Shield size={24} color="#581C84" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Privacy</Text>
        <Text style={[styles.headerAgent, { color: theme.colors.textSecondary }]}>{agentName}</Text>
      </View>

      <View style={[styles.scoreSection, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={[styles.scoreCircle, { borderColor: '#581C84' }]}>
          <Text style={[styles.scoreValue, { color: '#581C84' }]}>{privacyScore}</Text>
          <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>Privacy Score</Text>
        </View>
        <View style={styles.scoreDetails}>
          <Text style={[styles.scoreTitle, { color: theme.colors.text }]}>Data Protection Status</Text>
          <Text style={[styles.scoreDesc, { color: theme.colors.textSecondary }]}>
            All privacy gates active and compliant. Real-time monitoring enabled for {agentName}.
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        {privacyMetrics.map((metric, i) => (
          <View key={i} style={[styles.metricCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <metric.icon size={20} color={metric.color} />
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
            <Text style={[styles.metricTitle, { color: theme.colors.textSecondary }]}>{metric.title}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Privacy Gates</Text>
        {privacyGates.map((gate, i) => (
          <View key={i} style={[styles.gateCard, { backgroundColor: theme.colors.background }]}>
            <View style={styles.gateHeader}>
              <View style={[styles.gateIcon, { backgroundColor: gate.color + '15' }]}>
                <gate.icon size={20} color={gate.color} />
              </View>
              <View style={styles.gateInfo}>
                <Text style={[styles.gateName, { color: theme.colors.text }]}>{gate.name}</Text>
                <Text style={[styles.gateDesc, { color: theme.colors.textSecondary }]}>{gate.description}</Text>
              </View>
              <View style={[styles.gateStatus, { backgroundColor: '#34C75922' }]}>
                <Text style={[styles.gateStatusText, { color: '#34C759' }]}>{gate.status}</Text>
              </View>
            </View>
            <View style={styles.gateAgents}>
              {gate.agents.map((agent, j) => (
                <View key={j} style={[styles.agentTag, { backgroundColor: gate.color + '12' }]}>
                  <Text style={[styles.agentTagText, { color: gate.color }]}>{agent}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Privacy Controls</Text>
        <View style={styles.controlRow}>
          <View style={styles.controlInfo}>
            <Eye size={20} color={theme.colors.primary} />
            <View style={styles.controlText}>
              <Text style={[styles.controlLabel, { color: theme.colors.text }]}>Data Masking</Text>
              <Text style={[styles.controlDesc, { color: theme.colors.textSecondary }]}>Mask sensitive fields automatically</Text>
            </View>
          </View>
          <Switch value={dataMasking} onValueChange={setDataMasking} trackColor={{ false: '#E5E5EA', true: '#581C84' }} />
        </View>
        <View style={styles.controlRow}>
          <View style={styles.controlInfo}>
            <FileText size={20} color={theme.colors.primary} />
            <View style={styles.controlText}>
              <Text style={[styles.controlLabel, { color: theme.colors.text }]}>Audit Logging</Text>
              <Text style={[styles.controlDesc, { color: theme.colors.textSecondary }]}>Log all data access events</Text>
            </View>
          </View>
          <Switch value={auditLogging} onValueChange={setAuditLogging} trackColor={{ false: '#E5E5EA', true: '#581C84' }} />
        </View>
        <View style={styles.controlRow}>
          <View style={styles.controlInfo}>
            <CheckCircle2 size={20} color={theme.colors.primary} />
            <View style={styles.controlText}>
              <Text style={[styles.controlLabel, { color: theme.colors.text }]}>Compliance Checks</Text>
              <Text style={[styles.controlDesc, { color: theme.colors.textSecondary }]}>Auto-validate regulatory compliance</Text>
            </View>
          </View>
          <Switch value={complianceCheck} onValueChange={setComplianceCheck} trackColor={{ false: '#E5E5EA', true: '#581C84' }} />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Compliance Status</Text>
        {complianceStatus.map((item, i) => (
          <View key={i} style={styles.complianceRow}>
            <CheckCircle2 size={18} color={item.color} />
            <Text style={[styles.complianceReg, { color: theme.colors.text }]}>{item.regulation}</Text>
            <Text style={[styles.complianceStatus, { color: item.color }]}>{item.status}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Privacy Events</Text>
        {recentPrivacyEvents.map((event, i) => (
          <View key={i} style={styles.eventRow}>
            <View style={[styles.eventIcon, { backgroundColor: '#581C8415' }]}>
              <event.icon size={14} color="#581C84" />
            </View>
            <View style={styles.eventContent}>
              <Text style={[styles.eventText, { color: theme.colors.text }]}>{event.event}</Text>
              <Text style={[styles.eventTime, { color: theme.colors.textSecondary }]}>{event.time}</Text>
            </View>
          </View>
        ))}
      </View>
      <AgentFeatures agentId={agentId || 'privacy'} agentName={agentName || 'Privacy'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, gap: 8 },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', flex: 1 },
  headerAgent: { fontSize: 13 },
  scoreSection: { margin: 16, padding: 20, borderRadius: 16, flexDirection: 'row', alignItems: 'center' },
  scoreCircle: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  scoreValue: { fontSize: 28, fontWeight: 'bold' },
  scoreLabel: { fontSize: 10, marginTop: 2 },
  scoreDetails: { flex: 1 },
  scoreTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  scoreDesc: { fontSize: 13, lineHeight: 18 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12, alignItems: 'center' },
  metricValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  metricTitle: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  gateCard: { padding: 16, borderRadius: 12, marginBottom: 12 },
  gateHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  gateIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  gateInfo: { flex: 1 },
  gateName: { fontSize: 15, fontWeight: '600' },
  gateDesc: { fontSize: 12, marginTop: 2 },
  gateStatus: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  gateStatusText: { fontSize: 12, fontWeight: '600' },
  gateAgents: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  agentTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  agentTagText: { fontSize: 11, fontWeight: '600' },
  controlRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  controlInfo: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 },
  controlText: { flex: 1 },
  controlLabel: { fontSize: 15, fontWeight: '600' },
  controlDesc: { fontSize: 12, marginTop: 2 },
  complianceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  complianceReg: { fontSize: 15, fontWeight: '500', flex: 1 },
  complianceStatus: { fontSize: 14, fontWeight: '600' },
  eventRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  eventIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  eventContent: { flex: 1 },
  eventText: { fontSize: 14, fontWeight: '500' },
  eventTime: { fontSize: 12, marginTop: 2 },
});
