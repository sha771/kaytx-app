import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Power, Clock, Calendar, Activity, Zap, Shield, Globe, Bell, Play, Pause, RefreshCw, Timer, Moon, Sun, ChevronRight, Save, AlertTriangle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const ACTIVATION_MODES = [
  { id: 'always-on', name: 'Always On', description: 'Agent runs 24/7 continuously', icon: Activity, color: '#10B981' },
  { id: 'scheduled', name: 'Scheduled', description: 'Active only during set hours', icon: Clock, color: '#3B82F6' },
  { id: 'on-demand', name: 'On Demand', description: 'Activated manually when needed', icon: Power, color: '#F59E0B' },
  { id: 'event-driven', name: 'Event Driven', description: 'Triggered by specific events', icon: Zap, color: '#8B5CF6' },
];

const SCHEDULE_PRESETS = [
  { id: 'business-hours', name: 'Business Hours', schedule: 'Mon-Fri, 9AM-6PM', icon: Sun },
  { id: 'extended', name: 'Extended Coverage', schedule: 'Mon-Sat, 7AM-10PM', icon: Clock },
  { id: '24-7', name: '24/7 Coverage', schedule: 'All days, all hours', icon: Activity },
  { id: 'weekdays', name: 'Weekdays Only', schedule: 'Mon-Fri, 8AM-8PM', icon: Calendar },
  { id: 'custom', name: 'Custom Schedule', schedule: 'Configure manually', icon: ChevronRight },
];

const AUTO_SCALING_OPTIONS = [
  { id: 'load-based', name: 'Load Based Scaling', description: 'Scale up when demand increases', enabled: true },
  { id: 'time-based', name: 'Time Based Scaling', description: 'More agents during peak hours', enabled: false },
  { id: 'event-based', name: 'Event Based Scaling', description: 'Scale for specific events', enabled: false },
  { id: 'predictive', name: 'Predictive Scaling', description: 'AI-powered demand prediction', enabled: false, premium: true },
];

const FAILOVER_OPTIONS = [
  { id: 'backup-agents', name: 'Backup Agent Pool', description: 'Maintain standby agents for failover', enabled: true },
  { id: 'cross-region', name: 'Cross-Region Failover', description: 'Deploy to multiple regions', enabled: false },
  { id: 'auto-recovery', name: 'Auto Recovery', description: 'Automatically restart failed agents', enabled: true },
  { id: 'health-checks', name: 'Health Checks', description: 'Continuous monitoring and alerts', enabled: true },
];

export default function ActivationSettingsPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activationMode, setActivationMode] = useState('always-on');
  const [schedulePreset, setSchedulePreset] = useState('business-hours');
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'load-based': true,
    'time-based': false,
    'event-based': false,
    'predictive': false,
    'backup-agents': true,
    'cross-region': false,
    'auto-recovery': true,
    'health-checks': true,
  });

  const handleToggle = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.headerIconWrap, { backgroundColor: '#10B98120' }]}>
          <Power size={40} color="#10B981" />
        </View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Activation Settings</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Control when and how agents activate
        </Text>
      </View>

      {/* Activation Mode */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activation Mode</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
          Choose how this agent should be activated
        </Text>
        <View style={styles.modesContainer}>
          {ACTIVATION_MODES.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              onPress={() => setActivationMode(mode.id)}
              style={[
                styles.modeCard,
                { backgroundColor: activationMode === mode.id ? mode.color + '20' : theme.colors.background },
                activationMode === mode.id && { borderColor: mode.color, borderWidth: 2 }
              ]}
            >
              <View style={[styles.modeIcon, { backgroundColor: mode.color + '20' }]}>
                <mode.icon size={28} color={mode.color} />
              </View>
              <Text style={[styles.modeName, { color: theme.colors.text }]}>{mode.name}</Text>
              <Text style={[styles.modeDesc, { color: theme.colors.textSecondary }]}>{mode.description}</Text>
              {activationMode === mode.id && (
                <View style={[styles.activeIndicator, { backgroundColor: mode.color }]}>
                  <Text style={styles.activeText}>Active</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Schedule Configuration */}
      {activationMode === 'scheduled' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Schedule Configuration</Text>
          <View style={styles.scheduleList}>
            {SCHEDULE_PRESETS.map((preset) => (
              <TouchableOpacity
                key={preset.id}
                onPress={() => setSchedulePreset(preset.id)}
                style={[
                  styles.scheduleItem,
                  { backgroundColor: schedulePreset === preset.id ? '#3B82F615' : 'transparent' },
                  schedulePreset === preset.id && { borderLeftWidth: 3, borderLeftColor: '#3B82F6' }
                ]}
              >
                <View style={styles.scheduleInfo}>
                  <Text style={[styles.scheduleName, { color: theme.colors.text }]}>{preset.name}</Text>
                  <Text style={[styles.scheduleTime, { color: theme.colors.textSecondary }]}>{preset.schedule}</Text>
                </View>
                {preset.id === 'custom' ? (
                  <ChevronRight size={20} color={theme.colors.textSecondary} />
                ) : (
                  <View style={[styles.radio, schedulePreset === preset.id && { backgroundColor: '#3B82F6', borderColor: '#3B82F6' }]}>
                    {schedulePreset === preset.id && <View style={styles.radioInner} />}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Auto Scaling */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIcon, { backgroundColor: '#8B5CF620' }]}>
            <RefreshCw size={22} color="#8B5CF6" />
          </View>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Auto Scaling</Text>
        </View>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
          Automatically adjust agent capacity based on demand
        </Text>
        <View style={styles.optionsList}>
          {AUTO_SCALING_OPTIONS.map((option) => (
            <View key={option.id} style={styles.optionItem}>
              <View style={styles.optionInfo}>
                <View style={styles.optionHeader}>
                  <Text style={[styles.optionName, { color: theme.colors.text }]}>{option.name}</Text>
                  {option.premium && (
                    <View style={[styles.premiumBadge, { backgroundColor: '#FFD70030' }]}>
                      <Text style={[styles.premiumText, { color: '#FFD700' }]}>PRO</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.optionDesc, { color: theme.colors.textSecondary }]}>{option.description}</Text>
              </View>
              <Switch
                value={toggles[option.id] ?? option.enabled}
                onValueChange={() => handleToggle(option.id)}
                trackColor={{ false: '#767577', true: '#8B5CF680' }}
                thumbColor={toggles[option.id] ?? option.enabled ? '#8B5CF6' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Failover & Reliability */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIcon, { backgroundColor: '#EF444420' }]}>
            <Shield size={22} color="#EF4444" />
          </View>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Failover & Reliability</Text>
        </View>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
          Ensure high availability and fault tolerance
        </Text>
        <View style={styles.optionsList}>
          {FAILOVER_OPTIONS.map((option) => (
            <View key={option.id} style={styles.optionItem}>
              <View style={styles.optionInfo}>
                <Text style={[styles.optionName, { color: theme.colors.text }]}>{option.name}</Text>
                <Text style={[styles.optionDesc, { color: theme.colors.textSecondary }]}>{option.description}</Text>
              </View>
              <Switch
                value={toggles[option.id] ?? option.enabled}
                onValueChange={() => handleToggle(option.id)}
                trackColor={{ false: '#767577', true: '#EF444480' }}
                thumbColor={toggles[option.id] ?? option.enabled ? '#EF4444' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>
      </View>

      {/* Current Status */}
      <View style={[styles.statusCard, { backgroundColor: '#10B98120' }]}>
        <View style={styles.statusHeader}>
          <Activity size={20} color="#10B981" />
          <Text style={[styles.statusTitle, { color: '#10B981' }]}>Current Status</Text>
        </View>
        <Text style={[styles.statusText, { color: theme.colors.text }]}>
          Agent is currently <Text style={{ color: '#10B981', fontWeight: '600' }}>Active</Text> and running in 
          <Text style={{ fontWeight: '600' }}> {ACTIVATION_MODES.find(m => m.id === activationMode)?.name}</Text> mode.
        </Text>
        <View style={styles.statusActions}>
          <TouchableOpacity style={[styles.statusBtn, { backgroundColor: '#F59E0B' }]}>
            <Pause size={16} color="#fff" />
            <Text style={styles.statusBtnText}>Pause</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.statusBtn, { backgroundColor: '#EF4444' }]}>
            <Power size={16} color="#fff" />
            <Text style={styles.statusBtnText}>Deactivate</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: '#10B981' }]}>
        <Save size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Save Activation Settings</Text>
      </TouchableOpacity>

      <AgentFeatures agentId="activation-settings" agentName="Activation Settings" />
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
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  sectionIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  sectionSubtitle: { fontSize: 13, marginTop: 4, marginBottom: 16 },
  modesContainer: { gap: 10 },
  modeCard: { padding: 16, borderRadius: 14 },
  modeIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  modeName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  modeDesc: { fontSize: 12, marginBottom: 8 },
  activeIndicator: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  activeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
  scheduleList: { gap: 2 },
  scheduleItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderRadius: 10 },
  scheduleInfo: { flex: 1 },
  scheduleName: { fontSize: 15, fontWeight: '500' },
  scheduleTime: { fontSize: 12, marginTop: 2 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#767577', justifyContent: 'center', alignItems: 'center' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff' },
  optionsList: { gap: 4 },
  optionItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5EA30' },
  optionInfo: { flex: 1, marginRight: 12 },
  optionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  optionName: { fontSize: 15, fontWeight: '500' },
  premiumBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  premiumText: { fontSize: 9, fontWeight: '700' },
  optionDesc: { fontSize: 12, marginTop: 2 },
  statusCard: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  statusHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  statusTitle: { fontSize: 16, fontWeight: '600' },
  statusText: { fontSize: 14, lineHeight: 20, marginBottom: 14 },
  statusActions: { flexDirection: 'row', gap: 10 },
  statusBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, gap: 6 },
  statusBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginVertical: 20, padding: 16, borderRadius: 14, gap: 8 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
