import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Activity,
  TriangleAlert,
  Bell,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Zap,
  ChartBarBig,
  Settings,
  Plus,
  Trash2,
  Check,
  Mail,
  MessageSquare,
  Smartphone,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { allAgents, agentCategories } from '@/constants/aiAgentHierarchy';

interface AlertRule {
  id: string;
  name: string;
  metric: string;
  condition: 'above' | 'below' | 'equals';
  threshold: number;
  enabled: boolean;
  channels: string[];
  agents: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export default function PerformanceMonitoringScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: '1',
      name: 'High Error Rate',
      metric: 'error_rate',
      condition: 'above',
      threshold: 5,
      enabled: true,
      channels: ['email', 'push'],
      agents: ['all'],
      severity: 'high',
    },
    {
      id: '2',
      name: 'Low Success Rate',
      metric: 'success_rate',
      condition: 'below',
      threshold: 95,
      enabled: true,
      channels: ['email'],
      agents: ['all'],
      severity: 'critical',
    },
    {
      id: '3',
      name: 'Slow Response Time',
      metric: 'response_time',
      condition: 'above',
      threshold: 1000,
      enabled: false,
      channels: ['push'],
      agents: ['ai-receptionist', 'ai-customer-support'],
      severity: 'medium',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showAddAlert, setShowAddAlert] = useState(false);

  const performanceMetrics = [
    { label: 'Avg Success Rate', value: '97.2%', trend: '+2.1%', positive: true, icon: Target },
    { label: 'Avg Response Time', value: '245ms', trend: '-12%', positive: true, icon: Clock },
    { label: 'Tasks/Hour', value: '1,840', trend: '+15%', positive: true, icon: Zap },
    { label: 'Active Agents', value: '68', trend: '+3', positive: true, icon: User },
  ];

  const systemHealth = {
    status: 'healthy',
    uptime: '99.97%',
    lastIncident: '3 days ago',
    activeAlerts: 2,


  const recentAlerts = [
    { id: 1, message: 'AI Sales Agent response time spiked to 850ms', time: '5 min ago', severity: 'medium', resolved: false },
    { id: 2, message: 'AI Bookkeeper completed 10,000 transactions', time: '1 hour ago', severity: 'info', resolved: true },
    { id: 3, message: 'System backup completed successfully', time: '2 hours ago', severity: 'info', resolved: true },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#3B82F6';
      case 'low': return '#10B981';
      default: return colors.text + '60';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Activity size={22} color={colors.primary} />
            <Text style={[styles.titleText, { color: colors.text }]}>Performance Monitor</Text>
          </View>
          <TouchableOpacity onPress={() => setShowAddAlert(true)}>
            <Plus size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* System Health Banner */}
        <View style={[styles.healthBanner, { backgroundColor: systemHealth.status === 'healthy' ? '#10B981' + '15' : '#EF4444' + '15' }]}>
          <View style={styles.healthStatus}>
            <View style={[styles.statusDot, { backgroundColor: systemHealth.status === 'healthy' ? '#10B981' : '#EF4444' }]} />
            <Text style={[styles.statusText, { color: systemHealth.status === 'healthy' ? '#10B981' : '#EF4444' }]}>
              {systemHealth.status === 'healthy' ? 'All Systems Healthy' : 'Issues Detected'}
            </Text>
          </View>
          <View style={styles.healthStats}>
            <Text style={[styles.healthStat, { color: colors.text + '60' }]}>Uptime: {systemHealth.uptime}</Text>
            <Text style={[styles.healthStat, { color: colors.text + '60' }]}>Alerts: {systemHealth.activeAlerts}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Performance Metrics */}
        <View style={styles.metricsGrid}>
          {performanceMetrics.map((metric, idx) => (
            <Animated.View entering={FadeInUp.delay(idx * 50)} key={metric.label} style={[styles.metricCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <metric.icon size={20} color={colors.primary} />
              <Text style={[styles.metricValue, { color: colors.text }]}>{metric.value}</Text>
              <View style={styles.trendRow}>
                {metric.positive ? <TrendingUp size={12} color="#10B981" /> : <TrendingDown size={12} color="#EF4444" />}
                <Text style={[styles.trendText, { color: metric.positive ? '#10B981' : '#EF4444' }]}>{metric.trend}</Text>
              </View>
              <Text style={[styles.metricLabel, { color: colors.text + '60' }]}>{metric.label}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Recent Alerts */}
        <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>RECENT ALERTS</Text>
        <View style={[styles.alertsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {recentAlerts.map((alert, idx) => (
            <View key={alert.id} style={[styles.alertItem, idx !== recentAlerts.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
              <View style={[styles.alertIcon, { backgroundColor: getSeverityColor(alert.severity) + '15' }]}>
                {alert.severity === 'info' ? <Bell size={16} color={colors.text + '60'} /> : <TriangleAlert size={16} color={getSeverityColor(alert.severity)} />}
              </View>
              <View style={styles.alertContent}>
                <Text style={[styles.alertMessage, { color: colors.text }]}>{alert.message}</Text>
                <Text style={[styles.alertTime, { color: colors.text + '40' }]}>{alert.time}</Text>
              </View>
              {alert.resolved && <Check size={16} color="#10B981" />}
            </View>
          ))}
        </View>

        {/* Alert Rules */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>ALERT RULES</Text>
          <TouchableOpacity onPress={() => setShowAddAlert(true)}>
            <Plus size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {alertRules.map((rule, idx) => (
          <Animated.View entering={FadeInUp.delay(idx * 50)} key={rule.id}>
            <View style={[styles.ruleCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.ruleHeader}>
                <View style={styles.ruleInfo}>
                  <Text style={[styles.ruleName, { color: colors.text }]}>{rule.name}</Text>
                  <Text style={[styles.ruleCondition, { color: colors.text + '60' }]}>
                    {rule.metric} {rule.condition} {rule.threshold}
                  </Text>
                </View>
                <Switch
                  value={rule.enabled}
                  onValueChange={(v) => setAlertRules(alertRules.map(r => r.id === rule.id ? { ...r, enabled: v } : r))}
                  trackColor={{ false: '#767577', true: colors.primary + '80' }}
                  thumbColor={rule.enabled ? colors.primary : '#f4f3f4'}
                />
              </View>
              <View style={styles.ruleFooter}>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(rule.severity) + '15' }]}>
                  <Text style={[styles.severityText, { color: getSeverityColor(rule.severity) }]}>{rule.severity}</Text>
                </View>
                <View style={styles.channelsRow}>
                  {rule.channels.includes('email') && <Mail size={14} color={colors.text + '40'} />}
                  {rule.channels.includes('push') && <Smartphone size={14} color={colors.text + '40'} />}
                  {rule.channels.includes('sms') && <MessageSquare size={14} color={colors.text + '40'} />}
                </View>
              </View>
            </View>
          </Animated.View>
        ))}

        {/* Agent Performance */}
        <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>AGENT PERFORMANCE</Text>
        {allAgents.slice(0, 5).map((agent, idx) => (
          <View key={agent.id} style={[styles.agentPerfCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.agentPerfHeader}>
              <View style={[styles.agentPerfIcon, { backgroundColor: agent.color + '15' }]}>
                <agent.icon size={20} color={agent.color} />
              </View>
              <View style={styles.agentPerfInfo}>
                <Text style={[styles.agentPerfName, { color: colors.text }]}>{agent.name}</Text>
                <Text style={[styles.agentPerfMeta, { color: colors.text + '60' }]}>{agent.performance?.tasksCompleted?.toLocaleString()} tasks</Text>
              </View>
              <View style={styles.agentPerfStats}>
                <Text style={[styles.perfStat, { color: colors.primary }]}>{agent.performance?.successRate}%</Text>
                <Text style={[styles.perfLabel, { color: colors.text + '40' }]}>success</Text>
              </View>
            </View>
            <View style={styles.perfBarContainer}>
              <View style={[styles.perfBar, { backgroundColor: colors.border }]}>
                <View style={[styles.perfFill, { backgroundColor: agent.color, width: `${agent.performance?.successRate || 0}%` }]} />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add Alert Modal */}
      {showAddAlert && (
        <View style={styles.modalOverlay}>
          <View style={[styles.modal, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Add Alert Rule</Text>
              <TouchableOpacity onPress={() => setShowAddAlert(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              <Text style={[styles.inputLabel, { color: colors.text + '60' }]}>Rule Name</Text>
              <TextInput style={[styles.input, { color: colors.text, backgroundColor: colors.border + '30' }]} placeholder="e.g., High CPU Usage" placeholderTextColor={colors.text + '40'} />
              {/* More form fields would go here */}
              <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={() => setShowAddAlert(false)}>
                <Text style={styles.saveButtonText}>Create Rule</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

// X icon component
function X({ size, color }: { size: number; color: string }) {
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color, fontSize: size * 0.7, fontWeight: 'bold' }}>�</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  titleText: { fontSize: 18, fontWeight: '600' },
  healthBanner: { margin: 16, padding: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  healthStatus: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  statusText: { fontSize: 14, fontWeight: '600' },
  healthStats: { flexDirection: 'row', gap: 12 },
  healthStat: { fontSize: 12 },
  content: { padding: 16 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  metricCard: { width: '47%', padding: 14, borderRadius: 12, borderWidth: 1 },
  metricValue: { fontSize: 22, fontWeight: '700', marginTop: 8 },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  trendText: { fontSize: 12, fontWeight: '600' },
  metricLabel: { fontSize: 11, marginTop: 4 },
  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, marginBottom: 10 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  alertsCard: { borderRadius: 16, borderWidth: 1, marginBottom: 20 },
  alertItem: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  alertIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  alertContent: { flex: 1 },
  alertMessage: { fontSize: 14 },
  alertTime: { fontSize: 12, marginTop: 2 },
  ruleCard: { borderRadius: 16, borderWidth: 1, padding: 14, marginBottom: 10 },
  ruleHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  ruleInfo: { flex: 1 },
  ruleName: { fontSize: 15, fontWeight: '600' },
  ruleCondition: { fontSize: 13, marginTop: 2 },
  ruleFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  severityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  severityText: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  channelsRow: { flexDirection: 'row', gap: 8 },
  agentPerfCard: { borderRadius: 16, borderWidth: 1, padding: 14, marginBottom: 10 },
  agentPerfHeader: { flexDirection: 'row', alignItems: 'center' },
  agentPerfIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  agentPerfInfo: { flex: 1 },
  agentPerfName: { fontSize: 15, fontWeight: '600' },
  agentPerfMeta: { fontSize: 12, marginTop: 2 },
  agentPerfStats: { alignItems: 'flex-end' },
  perfStat: { fontSize: 18, fontWeight: '700' },
  perfLabel: { fontSize: 11 },
  perfBarContainer: { marginTop: 10 },
  perfBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  perfFill: { height: 6, borderRadius: 3 },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modal: { borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: '#00000010' },
  modalTitle: { fontSize: 18, fontWeight: '600' },
  modalContent: { padding: 20 },
  inputLabel: { fontSize: 12, fontWeight: '600', marginBottom: 8, textTransform: 'uppercase' },
  input: { padding: 12, borderRadius: 10, fontSize: 15, marginBottom: 16 },
  saveButton: { padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
