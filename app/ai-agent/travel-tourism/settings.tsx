import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Switch } from 'react-native';
import { 
  Settings, Bell, Shield, Database, Globe, Users, 
  Clock, Zap, CheckCircle, AlertTriangle, Activity
} from 'lucide-react-native';
import { TRAVEL_COLORS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function TravelSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [autoPricingEnabled, setAutoPricingEnabled] = React.useState(true);
  const [aiRecommendationsEnabled, setAiRecommendationsEnabled] = React.useState(true);

  const SETTINGS_SECTIONS = [
    {
      title: 'General Settings',
      icon: Settings,
      color: TRAVEL_COLORS.oceanBlue,
      items: [
        { label: 'Dark Mode', value: 'Enabled', type: 'toggle' },
        { label: 'Language', value: 'English', type: 'select' },
        { label: 'Timezone', value: 'UTC', type: 'select' },
        { label: 'Currency', value: 'USD', type: 'select' },
      ],
    },
    {
      title: 'Notifications',
      icon: Bell,
      color: TRAVEL_COLORS.amber,
      items: [
        { label: 'Push Notifications', value: 'Enabled', type: 'toggle' },
        { label: 'Email Alerts', value: 'Enabled', type: 'toggle' },
        { label: 'SMS Alerts', value: 'Disabled', type: 'toggle' },
        { label: 'Flight Updates', value: 'Enabled', type: 'toggle' },
      ],
    },
    {
      title: 'AI Settings',
      icon: Zap,
      color: TRAVEL_COLORS.neonCyan,
      items: [
        { label: 'Auto Pricing', value: 'Enabled', type: 'toggle' },
        { label: 'AI Recommendations', value: 'Enabled', type: 'toggle' },
        { label: 'Forecast Accuracy', value: '94.8%', type: 'info' },
        { label: 'Model Version', value: 'v2.4.1', type: 'info' },
      ],
    },
    {
      title: 'Security',
      icon: Shield,
      color: TRAVEL_COLORS.emeraldGreen,
      items: [
        { label: 'Two-Factor Auth', value: 'Enabled', type: 'toggle' },
        { label: 'API Access', value: 'Restricted', type: 'info' },
        { label: 'Data Encryption', value: 'AES-256', type: 'info' },
        { label: 'Audit Log', value: 'Active', type: 'info' },
      ],
    },
    {
      title: 'Data & Storage',
      icon: Database,
      color: TRAVEL_COLORS.purple,
      items: [
        { label: 'Data Retention', value: '90 days', type: 'select' },
        { label: 'Backup Frequency', value: 'Daily', type: 'select' },
        { label: 'Storage Used', value: '2.4TB / 10TB', type: 'info' },
        { label: 'Cache Size', value: '840MB', type: 'info' },
      ],
    },
    {
      title: 'Integrations',
      icon: Globe,
      color: TRAVEL_COLORS.magenta,
      items: [
        { label: 'Airline APIs', value: '42 Connected', type: 'info' },
        { label: 'Hotel Partners', value: '45,000', type: 'info' },
        { label: 'Payment Gateways', value: '8 Active', type: 'info' },
        { label: 'Weather Services', value: '3 Connected', type: 'info' },
      ],
    },
  ];

  const SYSTEM_STATUS = [
    { metric: 'System Health', value: '99.9%', status: 'optimal', color: TRAVEL_COLORS.emeraldGreen },
    { metric: 'API Response', value: '124ms', status: 'optimal', color: TRAVEL_COLORS.emeraldGreen },
    { metric: 'Database Load', value: '42%', status: 'optimal', color: TRAVEL_COLORS.emeraldGreen },
    { metric: 'Memory Usage', value: '68%', status: 'warning', color: TRAVEL_COLORS.amber },
  ];

  const renderSystemStatus = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>System Status</Text>
      <View style={styles.statusGrid}>
        {SYSTEM_STATUS.map((status) => (
          <View key={status.metric} style={[styles.statusCard, { backgroundColor: status.color + '10', borderColor: status.color }]}>
            {status.status === 'optimal' ? <CheckCircle size={24} color={status.color} /> : <AlertTriangle size={24} color={status.color} />}
            <Text style={styles.statusValue}>{status.value}</Text>
            <Text style={styles.statusLabel}>{status.metric}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSettingsSection = (section: any, index: number) => (
    <View key={index} style={styles.section}>
      <View style={styles.sectionHeader}>
        <section.icon size={24} color={section.color} />
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
      <View style={styles.settingsList}>
        {section.items.map((item: any, itemIndex: number) => (
          <View key={itemIndex} style={styles.settingItem}>
            <Text style={styles.settingLabel}>{item.label}</Text>
            {item.type === 'toggle' && (
              <Switch
                value={item.value === 'Enabled'}
                onValueChange={() => {}}
                trackColor={{ false: '#1E293B', true: section.color }}
                thumbColor={item.value === 'Enabled' ? '#FFFFFF' : '#6B7280'}
              />
            )}
            {item.type === 'select' && (
              <Text style={styles.settingValue}>{item.value}</Text>
            )}
            {item.type === 'info' && (
              <Text style={styles.settingInfo}>{item.value}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Settings size={32} color={TRAVEL_COLORS.oceanBlue} />
        <View>
          <Text style={styles.headerTitle}>Travel & Tourism Settings</Text>
          <Text style={styles.headerSubtitle}>Configure system preferences and integrations</Text>
        </View>
      </View>

      {renderSystemStatus()}
      {SETTINGS_SECTIONS.map((section, index) => renderSettingsSection(section, index))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TRAVEL_COLORS.deepSpaceBlack,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statusCard: {
    width: (width - 64) / 4 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  statusValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statusLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  settingsList: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#0A0F1A',
    borderRadius: 8,
  },
  settingLabel: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  settingValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingInfo: {
    fontSize: 14,
    color: TRAVEL_COLORS.neonCyan,
    fontWeight: '600',
  },
});
