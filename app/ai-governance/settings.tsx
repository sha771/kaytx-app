/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Settings, Bell, Shield, Database, Eye, Lock, 
  ArrowLeft, ChevronRight, Zap, Globe, Clock, 
  Monitor, Sliders, Info, AlertTriangle, CheckCircle
} from 'lucide-react-native';

interface SettingItem {
  id: string;
  name: string;
  description: string;
  type: 'toggle' | 'navigation' | 'info';
  value?: boolean;
  icon: any;
}

const settingCategories = [
  {
    id: 'notifications',
    name: 'Notifications',
    items: [
      { id: '1', name: 'Risk Alerts', description: 'Get notified when risk thresholds are exceeded', type: 'toggle' as const, value: true, icon: AlertTriangle },
      { id: '2', name: 'Policy Violations', description: 'Alerts for blocked policy violations', type: 'toggle' as const, value: true, icon: Shield },
      { id: '3', name: 'System Health', description: 'Infrastructure health status updates', type: 'toggle' as const, value: false, icon: Monitor },
      { id: '4', name: 'Audit Reports', description: 'Weekly audit report summaries', type: 'toggle' as const, value: true, icon: Database },
    ]
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    items: [
      { id: '5', name: 'Real-time Monitoring', description: 'Enable continuous AI system monitoring', type: 'toggle' as const, value: true, icon: Eye },
      { id: '6', name: 'Auto-scaling', description: 'Automatically scale monitoring resources', type: 'toggle' as const, value: true, icon: Zap },
      { id: '7', name: 'Data Retention', description: 'Configure monitoring data retention period', type: 'navigation' as const, icon: Clock },
      { id: '8', name: 'Alert Thresholds', description: 'Customize risk and performance thresholds', type: 'navigation' as const, icon: Sliders },
    ]
  },
  {
    id: 'security',
    name: 'Security',
    items: [
      { id: '9', name: 'Two-Factor Authentication', description: 'Require 2FA for governance access', type: 'toggle' as const, value: true, icon: Lock },
      { id: '10', name: 'IP Whitelist', description: 'Restrict access to specific IP ranges', type: 'toggle' as const, value: false, icon: Globe },
      { id: '11', name: 'Audit Trail', description: 'Enable comprehensive audit logging', type: 'toggle' as const, value: true, icon: Database },
      { id: '12', name: 'Encryption Keys', description: 'Manage encryption keys for data at rest', type: 'navigation' as const, icon: Shield },
    ]
  },
  {
    id: 'system',
    name: 'System',
    items: [
      { id: '13', name: 'API Configuration', description: 'Configure API endpoints and authentication', type: 'navigation' as const, icon: Settings },
      { id: '14', name: 'Database Settings', description: 'Manage database connections and pools', type: 'navigation' as const, icon: Database },
      { id: '15', name: 'Cache Configuration', description: 'Configure caching strategy and TTL', type: 'navigation' as const, icon: Zap },
      { id: '16', name: 'System Info', description: 'View system version and configuration', type: 'info' as const, icon: Info },
    ]
  },
];

export default function AIGovernanceSettingsScreen() {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    '1': true, '2': true, '3': false, '4': true,
    '5': true, '6': true,
    '9': true, '10': false, '11': true,
  });

  const toggleSetting = (id: string) => {
    setSettings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const SettingItem = ({ item }: { item: SettingItem }) => {
    const Icon = item.icon;
    return (
      <View style={[styles.settingItem, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
        <View style={[styles.settingIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
          <Icon size={20} color="#06b6d4" />
        </View>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingName, { color: '#f9fafb' }]}>{item.name}</Text>
          <Text style={[styles.settingDescription, { color: '#9ca3af' }]}>{item.description}</Text>
        </View>
        {item.type === 'toggle' && (
          <Switch
            value={settings[item.id] || false}
            onValueChange={() => toggleSetting(item.id)}
            trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: '#06b6d4' }}
            thumbColor="#fff"
          />
        )}
        {item.type === 'navigation' && (
          <ChevronRight size={20} color="#9ca3af" />
        )}
        {item.type === 'info' && (
          <CheckCircle size={20} color="#10b981" />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#05070A' }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: 'rgba(10, 15, 25, 0.95)', borderBottomWidth: 1, borderBottomColor: 'rgba(6, 182, 212, 0.1)' }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#f9fafb" />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={[styles.headerTitleText, { color: '#f9fafb' }]}>Settings</Text>
            <Text style={[styles.headerSubtitle, { color: '#9ca3af' }]}>AI Governance Configuration</Text>
          </View>
        </View>

        {/* System Status */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>System Status</Text>
          <View style={[styles.statusContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <View style={styles.statusItem}>
              <View style={[styles.statusDot, { backgroundColor: '#10b981' }]} />
              <Text style={[styles.statusText, { color: '#f9fafb' }]}>All Systems Operational</Text>
            </View>
            <View style={styles.statusItem}>
              <Monitor size={16} color="#06b6d4" />
              <Text style={[styles.statusMeta, { color: '#9ca3af' }]}>Version 2.4.1</Text>
            </View>
            <View style={styles.statusItem}>
              <Clock size={16} color="#06b6d4" />
              <Text style={[styles.statusMeta, { color: '#9ca3af' }]}>Last sync: 2 min ago</Text>
            </View>
          </View>
        </View>

        {/* Settings Categories */}
        {settingCategories.map(category => (
          <View key={category.id} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: '#f9faff' }]}>{category.name}</Text>
            <View style={styles.settingsGrid}>
              {category.items.map(item => (
                <SettingItem key={item.id} item={item} />
              ))}
            </View>
          </View>
        ))}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <Database size={24} color="#06b6d4" />
              </View>
              <Text style={[styles.actionTitle, { color: '#f9fafb' }]}>Export Configuration</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <Shield size={24} color="#8b5cf6" />
              </View>
              <Text style={[styles.actionTitle, { color: '#f9fafb' }]}>Run Diagnostics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <CheckCircle size={24} color="#10b981" />
              </View>
              <Text style={[styles.actionTitle, { color: '#f9fafb' }]}>Verify Compliance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <View style={[styles.actionIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <AlertTriangle size={24} color="#f59e0b" />
              </View>
              <Text style={[styles.actionTitle, { color: '#f9fafb' }]}>Reset to Defaults</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: '#f9fafb' }]}>Support</Text>
          <View style={[styles.supportContainer, { backgroundColor: 'rgba(10, 15, 25, 0.8)', borderColor: 'rgba(6, 182, 212, 0.2)' }]}>
            <TouchableOpacity style={styles.supportItem}>
              <Info size={20} color="#06b6d4" />
              <Text style={[styles.supportText, { color: '#f9fafb' }]}>Documentation</Text>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportItem}>
              <Bell size={20} color="#06b6d4" />
              <Text style={[styles.supportText, { color: '#f9fafb' }]}>Release Notes</Text>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportItem}>
              <AlertTriangle size={20} color="#06b6d4" />
              <Text style={[styles.supportText, { color: '#f9fafb' }]}>Report Issue</Text>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 24,
    borderRadius: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
  },
  headerTitleText: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  statusContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusMeta: {
    fontSize: 12,
    fontWeight: '500',
  },
  settingsGrid: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    fontWeight: '400',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  supportContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 12,
    gap: 16,
  },
  supportText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
});
