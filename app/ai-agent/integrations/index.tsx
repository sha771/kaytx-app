import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Plug, Plus, CheckCircle2, AlertCircle, RefreshCw, Settings, ChevronRight, Globe, Database, Cloud, MessageSquare, Calendar, Mail, FileText, Shield } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const INTEGRATION_CATEGORIES = [
  {
    id: 'crm',
    name: 'CRM & Sales',
    icon: Globe,
    color: '#3B82F6',
    integrations: [
      { id: 'salesforce', name: 'Salesforce', status: 'connected', icon: '☁️', lastSync: '2 min ago' },
      { id: 'hubspot', name: 'HubSpot', status: 'connected', icon: '🎯', lastSync: '5 min ago' },
      { id: 'pipedrive', name: 'Pipedrive', status: 'disconnected', icon: '📊', lastSync: 'Never' },
    ]
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: MessageSquare,
    color: '#8B5CF6',
    integrations: [
      { id: 'slack', name: 'Slack', status: 'connected', icon: '💬', lastSync: '1 min ago' },
      { id: 'teams', name: 'Microsoft Teams', status: 'connected', icon: '👥', lastSync: '3 min ago' },
      { id: 'discord', name: 'Discord', status: 'disconnected', icon: '🎮', lastSync: 'Never' },
    ]
  },
  {
    id: 'storage',
    name: 'Storage & Files',
    icon: Database,
    color: '#10B981',
    integrations: [
      { id: 'gdrive', name: 'Google Drive', status: 'connected', icon: '📁', lastSync: 'Just now' },
      { id: 'dropbox', name: 'Dropbox', status: 'connected', icon: '📦', lastSync: '10 min ago' },
      { id: 's3', name: 'AWS S3', status: 'error', icon: '☁️', lastSync: 'Failed' },
    ]
  },
  {
    id: 'productivity',
    name: 'Productivity',
    icon: Calendar,
    color: '#F59E0B',
    integrations: [
      { id: 'gsuite', name: 'Google Workspace', status: 'connected', icon: '📧', lastSync: '1 min ago' },
      { id: 'notion', name: 'Notion', status: 'connected', icon: '📝', lastSync: '5 min ago' },
      { id: 'asana', name: 'Asana', status: 'disconnected', icon: '✓', lastSync: 'Never' },
    ]
  },
];

const WEBHOOKS = [
  { id: 1, name: 'Agent Completion', url: 'https://api.example.com/webhooks/agent', events: 1240, status: 'active' },
  { id: 2, name: 'Task Failed', url: 'https://api.example.com/webhooks/errors', events: 23, status: 'active' },
  { id: 3, name: 'Workflow Trigger', url: 'https://api.example.com/webhooks/workflow', events: 856, status: 'paused' },
];

const API_STATS = {
  requests: '2.4M',
  avgLatency: '45ms',
  successRate: '99.9%',
  rateLimit: '10,000/hr',
};

export default function IntegrationsPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('crm');

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Integrations</Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Connect your tools and services
            </Text>
          </View>
          <TouchableOpacity style={[styles.addBtn, { backgroundColor: '#3B82F6' }]}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* API Stats */}
        <View style={styles.apiStats}>
          {Object.entries(API_STATS).map(([key, value]) => (
            <View key={key} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{value}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryTabs}>
        {INTEGRATION_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setActiveCategory(category.id)}
            style={[
              styles.categoryTab,
              { backgroundColor: activeCategory === category.id ? category.color + '20' : theme.colors.card || '#F2F2F7' },
              activeCategory === category.id && { borderColor: category.color, borderWidth: 2 }
            ]}
          >
            <category.icon size={20} color={activeCategory === category.id ? category.color : theme.colors.textSecondary} />
            <Text style={[styles.categoryText, { color: activeCategory === category.id ? category.color : theme.colors.textSecondary }]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Active Category Integrations */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {INTEGRATION_CATEGORIES.find(c => c.id === activeCategory)?.integrations.map((integration) => (
          <View key={integration.id} style={[styles.integrationCard, { backgroundColor: theme.colors.background }]}>
            <View style={styles.integrationHeader}>
              <Text style={styles.integrationIcon}>{integration.icon}</Text>
              <View style={styles.integrationInfo}>
                <Text style={[styles.integrationName, { color: theme.colors.text }]}>{integration.name}</Text>
                <View style={styles.integrationMeta}>
                  <View style={[styles.statusBadge, { 
                    backgroundColor: integration.status === 'connected' ? '#10B98120' : integration.status === 'error' ? '#EF444420' : '#F59E0B20' 
                  }]}>
                    <View style={[styles.statusDot, { 
                      backgroundColor: integration.status === 'connected' ? '#10B981' : integration.status === 'error' ? '#EF4444' : '#F59E0B' 
                    }]} />
                    <Text style={[styles.statusText, { 
                      color: integration.status === 'connected' ? '#10B981' : integration.status === 'error' ? '#EF4444' : '#F59E0B' 
                    }]}>
                      {integration.status}
                    </Text>
                  </View>
                  <Text style={[styles.syncText, { color: theme.colors.textSecondary }]}>{integration.lastSync}</Text>
                </View>
              </View>
            </View>
            <View style={styles.integrationActions}>
              {integration.status === 'connected' ? (
                <>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#3B82F620' }]}>
                    <RefreshCw size={16} color="#3B82F6" />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#F59E0B20' }]}>
                    <Settings size={16} color="#F59E0B" />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity style={[styles.connectBtn, { backgroundColor: '#3B82F6' }]}>
                  <Text style={styles.connectText}>Connect</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </View>

      {/* Webhooks */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Webhooks</Text>
          <TouchableOpacity style={[styles.addWebhookBtn, { backgroundColor: '#3B82F6' }]}>
            <Plus size={16} color="#fff" />
            <Text style={styles.addWebhookText}>Add</Text>
          </TouchableOpacity>
        </View>
        {WEBHOOKS.map((webhook) => (
          <View key={webhook.id} style={[styles.webhookCard, { backgroundColor: theme.colors.background }]}>
            <View style={styles.webhookInfo}>
              <Text style={[styles.webhookName, { color: theme.colors.text }]}>{webhook.name}</Text>
              <Text style={[styles.webhookUrl, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                {webhook.url}
              </Text>
              <Text style={[styles.webhookEvents, { color: '#3B82F6' }]}>{webhook.events.toLocaleString()} events</Text>
            </View>
            <Switch
              value={webhook.status === 'active'}
              trackColor={{ false: '#767577', true: '#3B82F680' }}
              thumbColor={webhook.status === 'active' ? '#3B82F6' : '#f4f3f4'}
            />
          </View>
        ))}
      </View>

      {/* API Keys */}
      <TouchableOpacity style={[styles.apiKeysCard, { backgroundColor: '#8B5CF620' }]}>
        <View style={[styles.apiKeysIcon, { backgroundColor: '#8B5CF6' }]}>
          <Shield size={24} color="#fff" />
        </View>
        <View style={styles.apiKeysContent}>
          <Text style={[styles.apiKeysTitle, { color: theme.colors.text }]}>API Keys</Text>
          <Text style={[styles.apiKeysDesc, { color: theme.colors.textSecondary }]}>
            Manage API keys and access tokens
          </Text>
        </View>
        <ChevronRight size={24} color="#8B5CF6" />
      </TouchableOpacity>

      <AgentFeatures agentId="integrations" agentName="Integrations Hub" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  addBtn: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  apiStats: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12 },
  statValue: { fontSize: 16, fontWeight: 'bold' },
  statLabel: { fontSize: 10, marginTop: 2 },
  categoryTabs: { padding: 16 },
  categoryTab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, marginRight: 10, gap: 8 },
  categoryText: { fontSize: 14, fontWeight: '500' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  integrationCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  integrationHeader: { flexDirection: 'row', alignItems: 'center' },
  integrationIcon: { fontSize: 28, marginRight: 12 },
  integrationInfo: { flex: 1 },
  integrationName: { fontSize: 16, fontWeight: '600' },
  integrationMeta: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, gap: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  syncText: { fontSize: 11 },
  integrationActions: { flexDirection: 'row', gap: 6 },
  actionBtn: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  connectBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  connectText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  addWebhookBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, gap: 4 },
  addWebhookText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  webhookCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  webhookInfo: { flex: 1, marginRight: 12 },
  webhookName: { fontSize: 15, fontWeight: '600' },
  webhookUrl: { fontSize: 12, marginTop: 2 },
  webhookEvents: { fontSize: 12, marginTop: 4, fontWeight: '500' },
  apiKeysCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  apiKeysIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  apiKeysContent: { flex: 1 },
  apiKeysTitle: { fontSize: 17, fontWeight: '600' },
  apiKeysDesc: { fontSize: 13, marginTop: 2 },
});
