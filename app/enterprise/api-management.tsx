 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Key,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Activity,
  TrendingUp,
  CircleAlert,
  CircleCheck,
  Code,
  Terminal,
  Webhook,
  Settings,
  RefreshCw,
  Lock,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface APIKey {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'inactive' | 'revoked';
  created: string;
  lastUsed: string;
  requests: number;
  permissions: string[];
}

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'inactive' | 'failed';
  lastTriggered: string;
  successRate: number;
}

interface APIMetric {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

const apiKeys: APIKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'pk_live_1234567890abcdefghijklmnopqrstuvwxyz',
    status: 'active',
    created: '2024-01-15',
    lastUsed: '2 min ago',
    requests: 1245000,
    permissions: ['read', 'write', 'delete'],
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'pk_test_abcdefghijklmnopqrstuvwxyz1234567890',
    status: 'active',
    created: '2024-01-10',
    lastUsed: '1 hour ago',
    requests: 45000,
    permissions: ['read', 'write'],
  },
  {
    id: '3',
    name: 'Mobile App Key',
    key: 'pk_live_mobile_xyz9876543210fedcba',
    status: 'active',
    created: '2024-01-05',
    lastUsed: '5 min ago',
    requests: 890000,
    permissions: ['read'],
  },
];

const webhooks: WebhookEndpoint[] = [
  {
    id: '1',
    name: 'Customer Events',
    url: 'https://api.yourapp.com/webhooks/customers',
    events: ['customer.created', 'customer.updated', 'customer.deleted'],
    status: 'active',
    lastTriggered: '3 min ago',
    successRate: 99.8,
  },
  {
    id: '2',
    name: 'Payment Notifications',
    url: 'https://api.yourapp.com/webhooks/payments',
    events: ['payment.succeeded', 'payment.failed'],
    status: 'active',
    lastTriggered: '10 min ago',
    successRate: 100,
  },
  {
    id: '3',
    name: 'System Alerts',
    url: 'https://api.yourapp.com/webhooks/alerts',
    events: ['system.error', 'system.warning'],
    status: 'failed',
    lastTriggered: '2 hours ago',
    successRate: 45.2,
  },
];

const apiMetrics: APIMetric[] = [
  {
    label: 'Total Requests',
    value: '2.4M',
    change: '+12%',
    icon: Activity,
    color: '#007AFF',
  },
  {
    label: 'Success Rate',
    value: '99.9%',
    change: '+0.1%',
    icon: CircleCheck,
    color: '#34C759',
  },
  {
    label: 'Avg Response',
    value: '45ms',
    change: '-5ms',
    icon: TrendingUp,
    color: '#FF9500',
  },
  {
    label: 'Error Rate',
    value: '0.1%',
    change: '-0.05%',
    icon: CircleAlert,
    color: '#FF3B30',
  },
];

export default function APIManagementScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'keys' | 'webhooks' | 'docs'>('keys');
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'inactive': return '#8E8E93';
      case 'revoked': return '#FF3B30';
      case 'failed': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const maskKey = (key: string) => {
    const visible = key.slice(0, 12);
    const hidden = '•'.repeat(key.length - 12);
    return visible + hidden;
  };

  const renderAPIKey = ({ item }: { item: APIKey }) => {
    const statusColor = getStatusColor(item.status);
    const isVisible = showKeys[item.id];

    return (
      <View style={[styles.keyCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.keyHeader}>
          <View style={styles.keyInfo}>
            <Text style={[styles.keyName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          </View>
          <View style={styles.keyActions}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => toggleKeyVisibility(item.id)}
            >
              {isVisible ? (
                <EyeOff size={18} color={theme.colors.text} />
              ) : (
                <Eye size={18} color={theme.colors.text} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Copy size={18} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Trash2 size={18} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.keyContainer, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.keyText, { color: theme.colors.text }]}>
            {isVisible ? item.key : maskKey(item.key)}
          </Text>
        </View>

        <View style={styles.keyMeta}>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.colors.secondaryText }]}>Created</Text>
            <Text style={[styles.metaValue, { color: theme.colors.text }]}>{item.created}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.colors.secondaryText }]}>Last Used</Text>
            <Text style={[styles.metaValue, { color: theme.colors.text }]}>{item.lastUsed}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.colors.secondaryText }]}>Requests</Text>
            <Text style={[styles.metaValue, { color: theme.colors.text }]}>
              {item.requests.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.permissionsContainer}>
          <Text style={[styles.permissionsLabel, { color: theme.colors.secondaryText }]}>
            Permissions:
          </Text>
          <View style={styles.permissionsList}>
            {item.permissions.map((permission, index) => (
              <View key={index} style={[styles.permissionChip, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.permissionText, { color: theme.colors.primary }]}>
                  {permission}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderWebhook = ({ item }: { item: WebhookEndpoint }) => {
    const statusColor = getStatusColor(item.status);

    return (
      <View style={[styles.webhookCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.webhookHeader}>
          <View style={styles.webhookInfo}>
            <Text style={[styles.webhookName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
              <Text style={[styles.statusText, { color: statusColor }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          </View>
          <View style={styles.webhookActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Settings size={18} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <RefreshCw size={18} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.urlContainer, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.urlText, { color: theme.colors.text }]} numberOfLines={1}>
            {item.url}
          </Text>
        </View>

        <View style={styles.webhookMeta}>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.colors.secondaryText }]}>Last Triggered</Text>
            <Text style={[styles.metaValue, { color: theme.colors.text }]}>{item.lastTriggered}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={[styles.metaLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
            <Text style={[styles.metaValue, { color: theme.colors.text }]}>{item.successRate}%</Text>
          </View>
        </View>

        <View style={styles.eventsContainer}>
          <Text style={[styles.eventsLabel, { color: theme.colors.secondaryText }]}>Events:</Text>
          <View style={styles.eventsList}>
            {item.events.map((event, index) => (
              <View key={index} style={[styles.eventChip, { backgroundColor: theme.colors.background }]}>
                <Text style={[styles.eventText, { color: theme.colors.text }]}>{event}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderMetric = ({ item }: { item: APIMetric }) => {
    const IconComponent = item.icon;
    const isPositive = item.change.startsWith('+') || item.change.startsWith('-');
    
    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
          <IconComponent size={20} color={item.color} />
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>{item.label}</Text>
        <Text style={[styles.metricChange, { 
          color: item.change.startsWith('-') && item.label !== 'Avg Response' ? '#34C759' : 
                 item.change.startsWith('+') && item.label === 'Error Rate' ? '#FF3B30' : '#34C759'
        }]}>
          {item.change}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>API Management</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Plus size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.metricsSection}>
        <FlatList
          data={apiMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.label}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>

      <View style={styles.tabsContainer}>
        {(['keys', 'webhooks', 'docs'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab ? 'white' : theme.colors.secondaryText },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'keys' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>API Keys</Text>
              <TouchableOpacity 
                style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
              >
                <Plus size={16} color="#FFFFFF" />
                <Text style={styles.addButtonText}>New Key</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={apiKeys}
              renderItem={renderAPIKey}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.keysList}
            />
          </View>
        )}

        {selectedTab === 'webhooks' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Webhooks</Text>
              <TouchableOpacity 
                style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
              >
                <Plus size={16} color="#FFFFFF" />
                <Text style={styles.addButtonText}>New Webhook</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={webhooks}
              renderItem={renderWebhook}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.webhooksList}
            />
          </View>
        )}

        {selectedTab === 'docs' && (
          <View style={styles.docsSection}>
            <View style={styles.docsCard}>
              <Code size={32} color={theme.colors.primary} />
              <Text style={[styles.docsTitle, { color: theme.colors.text }]}>
                API Documentation
              </Text>
              <Text style={[styles.docsDescription, { color: theme.colors.secondaryText }]}>
                Access comprehensive API documentation with examples and guides
              </Text>
              <TouchableOpacity 
                style={[styles.docsButton, { backgroundColor: theme.colors.primary }]}
              >
                <Terminal size={16} color="#FFFFFF" />
                <Text style={styles.docsButtonText}>View Documentation</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  metricsSection: {
    marginBottom: 16,
  },
  metricsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  metricCard: {
    width: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  keysList: {
    gap: 16,
  },
  keyCard: {
    padding: 16,
    borderRadius: 16,
  },
  keyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  keyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  keyName: {
    fontSize: 16,
    fontWeight: '600',
  },
  keyActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  keyContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  keyText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  keyMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  permissionsContainer: {
    marginTop: 8,
  },
  permissionsLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  permissionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  permissionChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  permissionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  webhooksList: {
    gap: 16,
  },
  webhookCard: {
    padding: 16,
    borderRadius: 16,
  },
  webhookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  webhookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  webhookName: {
    fontSize: 16,
    fontWeight: '600',
  },
  webhookActions: {
    flexDirection: 'row',
    gap: 8,
  },
  urlContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  urlText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  webhookMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  eventsContainer: {
    marginTop: 8,
  },
  eventsLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  eventsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  eventChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  eventText: {
    fontSize: 11,
    fontFamily: 'monospace',
  },
  docsSection: {
    paddingBottom: 20,
  },
  docsCard: {
    backgroundColor: 'rgba(0,122,255,0.1)',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  docsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
  },
  docsDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  docsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  docsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
