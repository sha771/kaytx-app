import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Settings, Activity, Bell, Shield, Zap, Clock, Globe, Palette, Moon, Sun, Volume2, Save, ChevronRight, User, BellRing } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PREFERENCE_CATEGORIES = [
  {
    id: 'general',
    name: 'General Preferences',
    icon: Settings,
    color: '#3B82F6',
    settings: [
      { id: 'auto-start', name: 'Auto-Start on Boot', description: 'Start agent automatically when system boots', type: 'toggle', default: true },
      { id: 'startup-delay', name: 'Startup Delay', description: 'Seconds to wait before starting (0-300)', type: 'number', default: '5' },
      { id: 'language', name: 'Primary Language', description: 'Default communication language', type: 'select', default: 'English', options: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'] },
    ]
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    color: '#F59E0B',
    settings: [
      { id: 'push-enabled', name: 'Push Notifications', description: 'Enable push notifications for this agent', type: 'toggle', default: true },
      { id: 'email-enabled', name: 'Email Notifications', description: 'Send email alerts for critical events', type: 'toggle', default: true },
      { id: 'sound-enabled', name: 'Sound Alerts', description: 'Play sound for important notifications', type: 'toggle', default: false },
      { id: 'quiet-hours', name: 'Quiet Hours', description: 'Mute notifications during these hours', type: 'time-range', default: '22:00 - 08:00' },
    ]
  },
  {
    id: 'performance',
    name: 'Performance Settings',
    icon: Zap,
    color: '#10B981',
    settings: [
      { id: 'processing-power', name: 'Processing Power', description: 'Allocate CPU/GPU resources', type: 'select', default: 'Balanced', options: ['Low', 'Balanced', 'High', 'Maximum'] },
      { id: 'parallel-tasks', name: 'Max Parallel Tasks', description: 'Maximum concurrent operations', type: 'number', default: '5' },
      { id: 'timeout', name: 'Task Timeout', description: 'Minutes before auto-cancelling stuck tasks', type: 'number', default: '30' },
      { id: 'cache-enabled', name: 'Result Caching', description: 'Cache intermediate results for faster processing', type: 'toggle', default: true },
    ]
  },
  {
    id: 'privacy',
    name: 'Privacy & Security',
    icon: Shield,
    color: '#EF4444',
    settings: [
      { id: 'data-retention', name: 'Data Retention', description: 'Days to keep conversation history', type: 'number', default: '90' },
      { id: 'encryption', name: 'End-to-End Encryption', description: 'Encrypt all agent communications', type: 'toggle', default: true },
      { id: 'audit-log', name: 'Audit Logging', description: 'Log all agent actions for compliance', type: 'toggle', default: true },
      { id: 'anonymize', name: 'Anonymize Outputs', description: 'Remove PII from generated content', type: 'toggle', default: false },
    ]
  },
  {
    id: 'appearance',
    name: 'Appearance',
    icon: Palette,
    color: '#8B5CF6',
    settings: [
      { id: 'theme', name: 'Theme Preference', description: 'Visual theme for agent interface', type: 'select', default: 'System', options: ['Light', 'Dark', 'System'] },
      { id: 'accent-color', name: 'Accent Color', description: 'Primary color for agent branding', type: 'color', default: '#3B82F6' },
      { id: 'animations', name: 'Animations', description: 'Enable UI animations and transitions', type: 'toggle', default: true },
    ]
  },
];

const QUICK_PRESETS = [
  { id: 'performance', name: 'Performance Mode', icon: Zap, description: 'Maximum speed, higher resource usage', color: '#10B981' },
  { id: 'balanced', name: 'Balanced', icon: Activity, description: 'Optimal balance of speed and resources', color: '#3B82F6' },
  { id: 'power-saver', name: 'Power Saver', icon: Moon, description: 'Reduced resource consumption', color: '#8B5CF6' },
  { id: 'stealth', name: 'Stealth Mode', icon: Shield, description: 'Maximum privacy, minimal traces', color: '#EF4444' },
];

export default function AgentPreferencesPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'auto-start': true,
    'push-enabled': true,
    'email-enabled': true,
    'sound-enabled': false,
    'cache-enabled': true,
    'encryption': true,
    'audit-log': true,
    'anonymize': false,
    'animations': true,
  });
  const [selectedPreset, setSelectedPreset] = useState('balanced');

  const handleToggle = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.headerIconWrap, { backgroundColor: '#3B82F620' }]}>
          <Settings size={40} color="#3B82F6" />
        </View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Agent Preferences</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Customize agent behavior and settings
        </Text>
      </View>

      {/* Quick Presets */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Presets</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
          Apply pre-configured setting combinations
        </Text>
        <View style={styles.presetsContainer}>
          {QUICK_PRESETS.map((preset) => (
            <TouchableOpacity
              key={preset.id}
              onPress={() => setSelectedPreset(preset.id)}
              style={[
                styles.presetCard,
                { backgroundColor: selectedPreset === preset.id ? preset.color + '20' : theme.colors.background },
                selectedPreset === preset.id && { borderColor: preset.color, borderWidth: 2 }
              ]}
            >
              <View style={[styles.presetIcon, { backgroundColor: preset.color + '20' }]}>
                <preset.icon size={24} color={preset.color} />
              </View>
              <Text style={[styles.presetName, { color: theme.colors.text }]}>{preset.name}</Text>
              <Text style={[styles.presetDesc, { color: theme.colors.textSecondary }]}>{preset.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Settings Categories */}
      {PREFERENCE_CATEGORIES.map((category) => (
        <View key={category.id} style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <View style={styles.categoryHeader}>
            <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
              <category.icon size={24} color={category.color} />
            </View>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{category.name}</Text>
          </View>
          <View style={styles.settingsList}>
            {category.settings.map((setting) => (
              <View key={setting.id} style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingName, { color: theme.colors.text }]}>{setting.name}</Text>
                  <Text style={[styles.settingDesc, { color: theme.colors.textSecondary }]}>{setting.description}</Text>
                </View>
                {setting.type === 'toggle' && (
                  <Switch
                    value={toggles[setting.id] ?? setting.default}
                    onValueChange={() => handleToggle(setting.id)}
                    trackColor={{ false: '#767577', true: category.color + '80' }}
                    thumbColor={toggles[setting.id] ?? setting.default ? category.color : '#f4f3f4'}
                  />
                )}
                {(setting.type === 'number' || setting.type === 'select' || setting.type === 'time-range') && (
                  <TouchableOpacity style={styles.valueButton}>
                    <Text style={[styles.valueText, { color: category.color }]}>{setting.default}</Text>
                    <ChevronRight size={16} color={theme.colors.textSecondary} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Save Button */}
      <TouchableOpacity style={[styles.saveButton, { backgroundColor: '#3B82F6' }]}>
        <Save size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Save Preferences</Text>
      </TouchableOpacity>

      <AgentFeatures agentId="agent-preferences" agentName="Agent Preferences" />
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
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, marginBottom: 16 },
  presetsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  presetCard: { width: '48%', padding: 14, borderRadius: 12 },
  presetIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  presetName: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  presetDesc: { fontSize: 11, lineHeight: 16 },
  categoryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  categoryIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  settingsList: { gap: 4 },
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5EA30' },
  settingInfo: { flex: 1, marginRight: 12 },
  settingName: { fontSize: 15, fontWeight: '500' },
  settingDesc: { fontSize: 12, marginTop: 2 },
  valueButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  valueText: { fontSize: 14, fontWeight: '600' },
  saveButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 16, marginVertical: 20, padding: 16, borderRadius: 14, gap: 8 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
