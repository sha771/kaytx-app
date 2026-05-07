import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Settings, Power, Zap, Shield, Bell, Palette, Globe, Clock, Sliders, Cpu, Save, ChevronRight, Layers } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const OPTIONS_CATEGORIES = [
  {
    id: 'preferences',
    name: 'Agent Preferences',
    description: 'General settings, notifications, appearance',
    icon: Settings,
    color: '#3B82F6',
    route: '/ai-agent/options/agent-preferences',
    count: 25
  },
  {
    id: 'capabilities',
    name: 'Capabilities',
    description: 'Skills, features, sensory abilities',
    icon: Zap,
    color: '#F59E0B',
    route: '/ai-agent/options/agent-capabilities',
    count: 40
  },
  {
    id: 'activation',
    name: 'Activation Settings',
    description: 'When and how agents activate',
    icon: Power,
    color: '#10B981',
    route: '/ai-agent/options/activation-settings',
    count: 12
  },
  {
    id: 'permissions',
    name: 'Permissions & Access',
    description: 'Security, roles, data access controls',
    icon: Shield,
    color: '#EF4444',
    route: '/ai-agent/configuration',
    count: 18
  },
  {
    id: 'notifications',
    name: 'Notification Rules',
    description: 'Alerts, channels, quiet hours',
    icon: Bell,
    color: '#8B5CF6',
    route: '/ai-agent/notifications',
    count: 15
  },
  {
    id: 'performance',
    name: 'Performance Tuning',
    description: 'Speed, resources, optimization',
    icon: Cpu,
    color: '#06B6D4',
    route: '/ai-agent/agent-performance',
    count: 10
  },
];

const QUICK_SETTINGS = [
  { id: 'all-active', name: 'Activate All', icon: Power, color: '#10B981' },
  { id: 'all-pause', name: 'Pause All', icon: Clock, color: '#F59E0B' },
  { id: 'maintenance', name: 'Maintenance', icon: Sliders, color: '#3B82F6' },
  { id: 'backup', name: 'Backup Config', icon: Save, color: '#8B5CF6' },
];

export default function OptionsIndexPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.headerIconWrap, { backgroundColor: '#3B82F620' }]}>
          <Settings size={48} color="#3B82F6" />
        </View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Agent Options</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Configure all agent settings and preferences
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickSection}>
        <Text style={[styles.quickTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.quickGrid}>
          {QUICK_SETTINGS.map((setting) => (
            <TouchableOpacity
              key={setting.id}
              style={[styles.quickCard, { backgroundColor: setting.color + '15' }]}
            >
              <View style={[styles.quickIcon, { backgroundColor: setting.color + '25' }]}>
                <setting.icon size={24} color={setting.color} />
              </View>
              <Text style={[styles.quickName, { color: theme.colors.text }]}>{setting.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Options Categories */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Settings Categories</Text>
        {OPTIONS_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => router.push(category.route)}
            style={[styles.categoryCard, { backgroundColor: theme.colors.background }]}
          >
            <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
              <category.icon size={26} color={category.color} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={[styles.categoryName, { color: theme.colors.text }]}>{category.name}</Text>
              <Text style={[styles.categoryDesc, { color: theme.colors.textSecondary }]}>{category.description}</Text>
              <View style={styles.categoryMeta}>
                <View style={[styles.countBadge, { backgroundColor: category.color + '15' }]}>
                  <Text style={[styles.countText, { color: category.color }]}>{category.count} options</Text>
                </View>
              </View>
            </View>
            <ChevronRight size={22} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Global Settings */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Global Settings</Text>
        <TouchableOpacity style={[styles.globalItem, { backgroundColor: theme.colors.background }]}>
          <Globe size={22} color="#3B82F6" />
          <Text style={[styles.globalName, { color: theme.colors.text }]}>Language & Region</Text>
          <Text style={[styles.globalValue, { color: '#3B82F6' }]}>English (US)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.globalItem, { backgroundColor: theme.colors.background }]}>
          <Palette size={22} color="#F59E0B" />
          <Text style={[styles.globalName, { color: theme.colors.text }]}>Theme Preference</Text>
          <Text style={[styles.globalValue, { color: '#F59E0B' }]}>System</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.globalItem, { backgroundColor: theme.colors.background }]}>
          <Layers size={22} color="#10B981" />
          <Text style={[styles.globalName, { color: theme.colors.text }]}>Default Agent Level</Text>
          <Text style={[styles.globalValue, { color: '#10B981' }]}>Advanced</Text>
        </TouchableOpacity>
      </View>

      {/* Configuration Export */}
      <View style={[styles.exportSection, { backgroundColor: '#8B5CF615' }]}>
        <Text style={[styles.exportTitle, { color: theme.colors.text }]}>Configuration Management</Text>
        <Text style={[styles.exportDesc, { color: theme.colors.textSecondary }]}>
          Export or import agent configurations across environments
        </Text>
        <View style={styles.exportButtons}>
          <TouchableOpacity style={[styles.exportBtn, { backgroundColor: '#8B5CF6' }]}>
            <Save size={18} color="#fff" />
            <Text style={styles.exportBtnText}>Export Config</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.exportBtn, { backgroundColor: theme.colors.background }]}>
            <Layers size={18} color="#8B5CF6" />
            <Text style={[styles.exportBtnText, { color: '#8B5CF6' }]}>Import Config</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AgentFeatures agentId="options-index" agentName="Agent Options" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  headerIconWrap: { width: 90, height: 90, borderRadius: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 6, textAlign: 'center' },
  quickSection: { padding: 16 },
  quickTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  quickCard: { width: '23%', alignItems: 'center', padding: 14, borderRadius: 12 },
  quickIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  quickName: { fontSize: 12, fontWeight: '500', textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  categoryCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  categoryIcon: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  categoryInfo: { flex: 1 },
  categoryName: { fontSize: 16, fontWeight: '600' },
  categoryDesc: { fontSize: 12, marginTop: 2 },
  categoryMeta: { marginTop: 6 },
  countBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  countText: { fontSize: 11, fontWeight: '600' },
  globalItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 8 },
  globalName: { flex: 1, marginLeft: 12, fontSize: 15 },
  globalValue: { fontSize: 13, fontWeight: '600' },
  exportSection: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  exportTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  exportDesc: { fontSize: 13, marginBottom: 14 },
  exportButtons: { flexDirection: 'row', gap: 10 },
  exportBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, gap: 6 },
  exportBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
