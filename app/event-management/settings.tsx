import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Settings, User, Bell, Shield, Database, Globe, Palette,
  ChevronRight, ToggleRight, Moon, Sun, Lock, CreditCard, HelpCircle,
  Clock, Mail, RefreshCw, MapPin, AlertTriangle, LogOut, MessageSquare, FileText
} from 'lucide-react-native';

export default function EventManagementSettings() {
  const router = useRouter();

  const SETTINGS_SECTIONS = [
    {
      title: 'Account',
      icon: User,
      color: '#06B6D4',
      items: [
        { label: 'Profile Settings', icon: User, route: '/profile' },
        { label: 'Payment Methods', icon: CreditCard, route: '/settings' },
        { label: 'Security', icon: Lock, route: '/security-privacy' },
      ]
    },
    {
      title: 'Preferences',
      icon: Settings,
      color: '#8B5CF6',
      items: [
        { label: 'Notifications', icon: Bell, route: '/notification' },
        { label: 'Appearance', icon: Palette, route: '/settings' },
        { label: 'Language', icon: Globe, route: '/settings' },
        { label: 'Time Zone', icon: Clock, route: '/settings' },
      ]
    },
    {
      title: 'System',
      icon: Database,
      color: '#10B981',
      items: [
        { label: 'Data Management', icon: Database, route: '/settings' },
        { label: 'Integrations', icon: Globe, route: '/settings' },
        { label: 'API Settings', icon: Lock, route: '/settings' },
      ]
    },
    {
      title: 'Support',
      icon: HelpCircle,
      color: '#F59E0B',
      items: [
        { label: 'Help Center', icon: HelpCircle, route: '/support' },
        { label: 'Contact Support', icon: MessageSquare, route: '/support' },
        { label: 'Documentation', icon: FileText, route: '/settings' },
      ]
    }
  ];

  const TOGGLE_SETTINGS = [
    { label: 'Dark Mode', icon: Moon, enabled: true, description: 'Use dark theme' },
    { label: 'Push Notifications', icon: Bell, enabled: true, description: 'Receive push notifications' },
    { label: 'Email Notifications', icon: Mail, enabled: true, description: 'Receive email updates' },
    { label: 'Auto-Sync', icon: RefreshCw, enabled: true, description: 'Sync data automatically' },
    { label: 'Location Services', icon: MapPin, enabled: false, description: 'Enable location tracking' },
  ];

  const SYSTEM_INFO = [
    { label: 'Version', value: '2.4.1' },
    { label: 'Build', value: '2026.06.26' },
    { label: 'Environment', value: 'Production' },
    { label: 'Status', value: 'Operational' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Settings size={48} color="#06B6D4" />
        </View>
        <View>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>System Configuration</Text>
        </View>
      </View>

      {/* Toggle Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Settings</Text>
        {TOGGLE_SETTINGS.map((setting, index) => (
          <View key={index} style={styles.toggleItem}>
            <View style={styles.toggleLeft}>
              <View style={[styles.toggleIcon, { backgroundColor: setting.icon === Moon ? '#06B6D420' : '#8B5CF620' }]}>
                <setting.icon size={20} color={setting.icon === Moon ? '#06B6D4' : '#8B5CF6'} />
              </View>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleLabel}>{setting.label}</Text>
                <Text style={styles.toggleDescription}>{setting.description}</Text>
              </View>
            </View>
            <View style={[styles.toggleSwitch, { backgroundColor: setting.enabled ? '#10B981' : '#374151' }]}>
              <View style={[styles.toggleKnob, { transform: [{ translateX: setting.enabled ? 20 : 0 }] }]} />
            </View>
          </View>
        ))}
      </View>

      {/* Settings Sections */}
      {SETTINGS_SECTIONS.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.settingsCard}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.settingItem}
                onPress={() => router.push(item.route as any)}
              >
                <View style={[styles.settingIcon, { backgroundColor: section.color + '20' }]}>
                  <item.icon size={20} color={section.color} />
                </View>
                <Text style={styles.settingLabel}>{item.label}</Text>
                <ChevronRight size={20} color="#6B7280" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* System Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Information</Text>
        <View style={styles.infoCard}>
          {SYSTEM_INFO.map((info, index) => (
            <View key={index} style={styles.infoItem}>
              <Text style={styles.infoLabel}>{info.label}</Text>
              <Text style={styles.infoValue}>{info.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Danger Zone</Text>
        <TouchableOpacity style={styles.dangerButton}>
          <AlertTriangle size={20} color="#EF4444" />
          <Text style={styles.dangerButtonText}>Reset All Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dangerButton}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.dangerButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Event Management AI OS v2.4.1</Text>
        <Text style={styles.footerSubtext}>© 2026 Kaytx Enterprise</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#06B6D440',
    gap: 16,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#06B6D420',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  section: {
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleInfo: {
    gap: 4,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  toggleDescription: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  toggleSwitch: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 4,
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  settingsCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
    gap: 12,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
  },
  infoCard: {
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  infoLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A0F1A',
    borderWidth: 1,
    borderColor: '#EF444440',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
  },
  dangerButtonText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
});
