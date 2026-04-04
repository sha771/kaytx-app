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
  Database,
  Users,
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Star,
  Clock,
  Activity,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface CRMIntegration {
  id: string;
  name: string;
  type: 'crm' | 'email' | 'calendar' | 'phone' | 'analytics';
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastSync: string;
  recordsCount: number;
  description: string;
  icon: string;
  features: string[];
}

interface SyncLog {
  id: string;
  integration: string;
  action: string;
  timestamp: string;
  status: 'success' | 'error' | 'warning';
  details: string;
}

const mockIntegrations: CRMIntegration[] = [
  {
    id: '1',
    name: 'Salesforce',
    type: 'crm',
    status: 'connected',
    lastSync: '2 min ago',
    recordsCount: 15420,
    description: 'Customer relationship management platform',
    icon: '🏢',
    features: ['Contacts', 'Leads', 'Opportunities', 'Accounts'],
  },
  {
    id: '2',
    name: 'HubSpot',
    type: 'crm',
    status: 'connected',
    lastSync: '5 min ago',
    recordsCount: 8750,
    description: 'Inbound marketing and sales platform',
    icon: '🎯',
    features: ['Contacts', 'Deals', 'Companies', 'Marketing'],
  },
  {
    id: '3',
    name: 'Google Calendar',
    type: 'calendar',
    status: 'syncing',
    lastSync: '1 min ago',
    recordsCount: 342,
    description: 'Calendar and scheduling integration',
    icon: '📅',
    features: ['Events', 'Meetings', 'Reminders'],
  },
  {
    id: '4',
    name: 'Mailchimp',
    type: 'email',
    status: 'error',
    lastSync: '2 hours ago',
    recordsCount: 0,
    description: 'Email marketing platform',
    icon: '📧',
    features: ['Email Lists', 'Campaigns', 'Analytics'],
  },
];

const mockSyncLogs: SyncLog[] = [
  {
    id: '1',
    integration: 'Salesforce',
    action: 'Contact sync',
    timestamp: '2 min ago',
    status: 'success',
    details: 'Synced 47 contacts successfully',
  },
  {
    id: '2',
    integration: 'HubSpot',
    action: 'Deal update',
    timestamp: '5 min ago',
    status: 'success',
    details: 'Updated 12 deals',
  },
  {
    id: '3',
    integration: 'Mailchimp',
    action: 'List sync',
    timestamp: '2 hours ago',
    status: 'error',
    details: 'Authentication failed - please reconnect',
  },
];

export default function CRMIntegrationScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'integrations' | 'logs' | 'settings'>('integrations');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return '#34C759';
      case 'disconnected': return '#8E8E93';
      case 'syncing': return '#007AFF';
      case 'error': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crm': return '#007AFF';
      case 'email': return '#34C759';
      case 'calendar': return '#FF9500';
      case 'phone': return '#AF52DE';
      case 'analytics': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const filteredIntegrations = mockIntegrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || integration.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderIntegration = ({ item }: { item: CRMIntegration }) => (
    <View style={[styles.integrationCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.integrationHeader}>
        <View style={styles.integrationInfo}>
          <View style={styles.integrationIcon}>
            <Text style={styles.iconText}>{item.icon}</Text>
          </View>
          <View style={styles.integrationDetails}>
            <Text style={[styles.integrationName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.integrationDescription, { color: theme.colors.secondaryText }]}>
              {item.description}
            </Text>
            <View style={styles.integrationBadges}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) + '20' }]}>
                <Text style={[styles.typeText, { color: getTypeColor(item.type) }]}>
                  {item.type.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.integrationActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Edit size={16} color={theme.colors.text} />
          </TouchableOpacity>
          <Switch
            value={item.status === 'connected'}
            onValueChange={() => {}}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={item.status === 'connected' ? '#f4f3f4' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.integrationStats}>
        <View style={styles.statItem}>
          <Database size={16} color={theme.colors.secondaryText} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {item.recordsCount.toLocaleString()}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Records</Text>
        </View>
        <View style={styles.statItem}>
          <Clock size={16} color={theme.colors.secondaryText} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.lastSync}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Last Sync</Text>
        </View>
      </View>

      <View style={styles.featuresSection}>
        <Text style={[styles.featuresTitle, { color: theme.colors.text }]}>Features:</Text>
        <View style={styles.featuresList}>
          {item.features.map((feature, index) => (
            <View key={index} style={[styles.featureTag, { backgroundColor: theme.colors.primary + '20' }]}>
              <Text style={[styles.featureText, { color: theme.colors.primary }]}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderSyncLog = ({ item }: { item: SyncLog }) => {
    const statusColor = getStatusColor(item.status);
    
    return (
      <View style={[styles.logCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.logHeader}>
          <View style={styles.logInfo}>
            <Text style={[styles.logIntegration, { color: theme.colors.text }]}>{item.integration}</Text>
            <Text style={[styles.logAction, { color: theme.colors.secondaryText }]}>{item.action}</Text>
          </View>
          <View style={styles.logStatus}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.logTimestamp, { color: theme.colors.secondaryText }]}>{item.timestamp}</Text>
          </View>
        </View>
        <Text style={[styles.logDetails, { color: theme.colors.text }]}>{item.details}</Text>
      </View>
    );
  };

  const renderIntegrations = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Search and Filters */}
      <View style={styles.filtersSection}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search integrations..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusFilters}>
          {['all', 'connected', 'disconnected', 'syncing', 'error'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusFilter,
                filterStatus === status && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setFilterStatus(status)}
            >
              <Text
                style={[
                  styles.statusFilterText,
                  {
                    color: filterStatus === status ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredIntegrations}
        renderItem={renderIntegration}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.integrationsList}
      />
    </ScrollView>
  );

  const renderLogs = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sync Activity</Text>
      <FlatList
        data={mockSyncLogs}
        renderItem={renderSyncLog}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.logsList}
      />
    </ScrollView>
  );

  const renderSettings = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sync Settings</Text>
        <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Sync</Text>
            <Switch
              value={true}
              onValueChange={() => {}}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Real-time Updates</Text>
            <Switch
              value={false}
              onValueChange={() => {}}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Conflict Resolution</Text>
            <Text style={[styles.settingValue, { color: theme.colors.secondaryText }]}>Manual</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>CRM Integration</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Plus size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['integrations', 'logs', 'settings'] as const).map((tab) => (
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
                {
                  color: selectedTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {selectedTab === 'integrations' && renderIntegrations()}
      {selectedTab === 'logs' && renderLogs()}
      {selectedTab === 'settings' && renderSettings()}
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filtersSection: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  statusFilters: {
    flexDirection: 'row',
  },
  statusFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginRight: 8,
  },
  statusFilterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  integrationsList: {
    gap: 16,
  },
  integrationCard: {
    padding: 16,
    borderRadius: 12,
  },
  integrationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  integrationInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  integrationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 20,
  },
  integrationDetails: {
    flex: 1,
  },
  integrationName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  integrationDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  integrationBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  integrationActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
  integrationStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 12,
  },
  featuresSection: {
    marginTop: 8,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  featureTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '500',
  },
  logsList: {
    gap: 12,
  },
  logCard: {
    padding: 16,
    borderRadius: 12,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  logInfo: {
    flex: 1,
  },
  logIntegration: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  logAction: {
    fontSize: 14,
  },
  logStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logTimestamp: {
    fontSize: 12,
  },
  logDetails: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingsCard: {
    padding: 16,
    borderRadius: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingValue: {
    fontSize: 14,
  },
});