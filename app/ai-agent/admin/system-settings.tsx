import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Server, Shield, Database, Globe, Clock, Cpu, AlertTriangle, Save, ChevronRight, Lock, Key, FileKey, Activity, Zap, Settings2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SYSTEM_SECTIONS = [
  {
    id: 'infrastructure',
    name: 'Infrastructure',
    icon: Server,
    color: '#3B82F6',
    settings: [
      { id: 'region', name: 'Primary Region', value: 'US-East', type: 'select' },
      { id: 'backup-regions', name: 'Backup Regions', value: 'US-West, EU-Central', type: 'multi-select' },
      { id: 'scaling', name: 'Auto Scaling', value: true, type: 'toggle' },
      { id: 'instances', name: 'Max Instances', value: '100', type: 'number' },
    ]
  },
  {
    id: 'security',
    name: 'Security',
    icon: Shield,
    color: '#EF4444',
    settings: [
      { id: 'encryption', name: 'Encryption at Rest', value: true, type: 'toggle' },
      { id: 'encryption-transit', name: 'Encryption in Transit', value: true, type: 'toggle' },
      { id: 'mfa', name: 'Require MFA', value: true, type: 'toggle' },
      { id: 'session-timeout', name: 'Session Timeout', value: '30 min', type: 'select' },
      { id: 'ip-whitelist', name: 'IP Whitelist', value: 'Disabled', type: 'select' },
    ]
  },
  {
    id: 'database',
    name: 'Database & Storage',
    icon: Database,
    color: '#10B981',
    settings: [
      { id: 'backup-frequency', name: 'Backup Frequency', value: 'Daily', type: 'select' },
      { id: 'retention', name: 'Data Retention', value: '90 days', type: 'select' },
      { id: 'archive', name: 'Auto Archive', value: true, type: 'toggle' },
      { id: 'storage-limit', name: 'Storage Limit', value: '10 TB', type: 'select' },
    ]
  },
  {
    id: 'api',
    name: 'API & Integrations',
    icon: Globe,
    color: '#8B5CF6',
    settings: [
      { id: 'rate-limit', name: 'Rate Limit', value: '10,000/hr', type: 'select' },
      { id: 'timeout', name: 'API Timeout', value: '30s', type: 'select' },
      { id: 'webhooks', name: 'Webhooks', value: true, type: 'toggle' },
      { id: 'cors', name: 'CORS Policy', value: 'Strict', type: 'select' },
    ]
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: Cpu,
    color: '#F59E0B',
    settings: [
      { id: 'caching', name: 'Response Caching', value: true, type: 'toggle' },
      { id: 'cache-ttl', name: 'Cache TTL', value: '5 min', type: 'select' },
      { id: 'compression', name: 'Compression', value: true, type: 'toggle' },
      { id: 'cdn', name: 'CDN Enabled', value: true, type: 'toggle' },
    ]
  },
];

const SYSTEM_STATUS = {
  healthy: true,
  uptime: '99.99%',
  lastIncident: '45 days ago',
  activeAlerts: 0,
  components: [
    { name: 'API Gateway', status: 'operational', latency: '45ms' },
    { name: 'Agent Runtime', status: 'operational', latency: '120ms' },
    { name: 'Database', status: 'operational', latency: '15ms' },
    { name: 'Message Queue', status: 'operational', latency: '8ms' },
    { name: 'Storage', status: 'operational', latency: '25ms' },
  ]
};

export default function SystemSettingsPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'scaling': true,
    'encryption': true,
    'encryption-transit': true,
    'mfa': true,
    'archive': true,
    'webhooks': true,
    'caching': true,
    'compression': true,
    'cdn': true,
  });

  const handleToggle = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.headerIconWrap, { backgroundColor: '#3B82F620' }]}>
          <Settings2 size={40} color="#3B82F6" />
        </View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>System Settings</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Configure platform-wide settings
        </Text>
      </View>

      {/* System Status */}
      <View style={[styles.statusCard, { backgroundColor: SYSTEM_STATUS.healthy ? '#10B98120' : '#EF444420' }]}>
        <View style={styles.statusHeader}>
          <View style={[styles.statusIndicator, { backgroundColor: SYSTEM_STATUS.healthy ? '#10B981' : '#EF4444' }]}>
            <Activity size={16} color="#fff" />
          </View>
          <Text style={[styles.statusTitle, { color: SYSTEM_STATUS.healthy ? '#10B981' : '#EF4444' }]}>
            System {SYSTEM_STATUS.healthy ? 'Healthy' : 'Issues Detected'}
          </Text>
        </View>
        <View style={styles.statusGrid}>
          <View style={styles.statusItem}>
            <Text style={[styles.statusValue, { color: theme.colors.text }]}>{SYSTEM_STATUS.uptime}</Text>
            <Text style={[styles.statusLabel, { color: theme.colors.textSecondary }]}>Uptime</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={[styles.statusValue, { color: theme.colors.text }]}>{SYSTEM_STATUS.lastIncident}</Text>
            <Text style={[styles.statusLabel, { color: theme.colors.textSecondary }]}>Last Incident</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={[styles.statusValue, { color: SYSTEM_STATUS.activeAlerts > 0 ? '#EF4444' : '#10B981' }]}>
              {SYSTEM_STATUS.activeAlerts}
            </Text>
            <Text style={[styles.statusLabel, { color: theme.colors.textSecondary }]}>Active Alerts</Text>
          </View>
        </View>
      </View>

      {/* Component Status */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Component Status</Text>
        <View style={styles.componentsList}>
          {SYSTEM_STATUS.components.map((component) => (
            <View key={component.name} style={styles.componentItem}>
              <View style={styles.componentInfo}>
                <View style={[styles.componentDot, { backgroundColor: component.status === 'operational' ? '#10B981' : '#F59E0B' }]} />
                <Text style={[styles.componentName, { color: theme.colors.text }]}>{component.name}</Text>
              </View>
              <View style={styles.componentMeta}>
                <Text style={[styles.componentStatus, { color: component.status === 'operational' ? '#10B981' : '#F59E0B' }]}>
                  {component.status}
                </Text>
                <Text style={[styles.componentLatency, { color: theme.colors.textSecondary }]}>{component.latency}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Settings Sections */}
      {SYSTEM_SECTIONS.map((section) => (
        <View key={section.id} style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: section.color + '20' }]}>
              <section.icon size={24} color={section.color} />
            </View>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{section.name}</Text>
          </View>
          <View style={styles.settingsList}>
            {section.settings.map((setting) => (
              <View key={setting.id} style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingName, { color: theme.colors.text }]}>{setting.name}</Text>
                </View>
                {setting.type === 'toggle' ? (
                  <Switch
                    value={toggles[setting.id] ?? setting.value}
                    onValueChange={() => handleToggle(setting.id)}
                    trackColor={{ false: '#767577', true: section.color + '80' }}
                    thumbColor={toggles[setting.id] ?? setting.value ? section.color : '#f4f3f4'}
                  />
                ) : (
                  <TouchableOpacity style={styles.valueButton}>
                    <Text style={[styles.valueText, { color: section.color }]}>{setting.value}</Text>
                    <ChevronRight size={16} color={theme.colors.textSecondary} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Danger Zone */}
      <View style={[styles.dangerSection, { backgroundColor: '#EF444410' }]}>
        <View style={styles.dangerHeader}>
          <AlertTriangle size={24} color="#EF4444" />
          <Text style={[styles.dangerTitle, { color: '#EF4444' }]}>Danger Zone</Text>
        </View>
        <TouchableOpacity style={[styles.dangerButton, { backgroundColor: '#EF444420' }]}>
          <Text style={[styles.dangerButtonText, { color: '#EF4444' }]}>Reset All Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.dangerButton, { backgroundColor: '#EF444420' }]}>
          <Text style={[styles.dangerButtonText, { color: '#EF4444' }]}>Clear All Data</Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: '#3B82F6' }]}>
        <Save size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Save System Settings</Text>
      </TouchableOpacity>

      <AgentFeatures agentId="system-settings" agentName="System Settings" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 30, paddingHorizontal: 20, borderBottomWidth: 1 },
  headerIconWrap: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 6, textAlign: 'center' },
  statusCard: { marginHorizontal: 16, marginTop: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  statusHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  statusIndicator: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  statusTitle: { fontSize: 18, fontWeight: '600' },
  statusGrid: { flexDirection: 'row', gap: 20 },
  statusItem: { flex: 1 },
  statusValue: { fontSize: 16, fontWeight: '600' },
  statusLabel: { fontSize: 12, marginTop: 2 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  sectionIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  componentsList: { gap: 12 },
  componentItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  componentInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  componentDot: { width: 10, height: 10, borderRadius: 5 },
  componentName: { fontSize: 15 },
  componentMeta: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  componentStatus: { fontSize: 13, fontWeight: '500' },
  componentLatency: { fontSize: 12 },
  settingsList: { gap: 4 },
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5EA30' },
  settingInfo: { flex: 1, marginRight: 12 },
  settingName: { fontSize: 15 },
  valueButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  valueText: { fontSize: 14, fontWeight: '500' },
  dangerSection: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#EF444440' },
  dangerHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  dangerTitle: { fontSize: 18, fontWeight: '600' },
  dangerButton: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, marginBottom: 8, alignItems: 'center' },
  dangerButtonText: { fontSize: 15, fontWeight: '600' },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginVertical: 20, padding: 16, borderRadius: 14, gap: 8 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
