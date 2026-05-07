 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Send,
  Users,
  MessageSquare,
  ChartBarBig,
  Calendar,
  Plus,
  ListFilter,
  Search,
  TrendingUp,
  Clock,
  CircleCheck,
  CircleAlert,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Campaign {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'sent' | 'active';
  recipients: number;
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  scheduledDate?: string;
  createdDate: string;
}

interface Contact {
  id: string;
  name: string;
  phone: string;
  tags: string[];
  lastActivity: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale Promotion',
    status: 'sent',
    recipients: 1250,
    sent: 1250,
    delivered: 1198,
    opened: 856,
    clicked: 234,
    createdDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Product Launch Announcement',
    status: 'scheduled',
    recipients: 2100,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    scheduledDate: '2024-01-20',
    createdDate: '2024-01-18',
  },
  {
    id: '3',
    name: 'Customer Feedback Survey',
    status: 'active',
    recipients: 800,
    sent: 800,
    delivered: 785,
    opened: 456,
    clicked: 123,
    createdDate: '2024-01-10',
  },
];

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+1 (555) 123-4567',
    tags: ['VIP', 'Customer'],
    lastActivity: '2 days ago',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+1 (555) 987-6543',
    tags: ['Lead', 'Interested'],
    lastActivity: '1 week ago',
  },
];

export default function SMSMarketingHubScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'campaigns' | 'contacts' | 'analytics'>('campaigns');
  const [searchQuery, setSearchQuery] = useState<string>('');
   
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'sent': return '#34C759';
      case 'scheduled': return '#FF9500';
      case 'active': return '#007AFF';
      case 'draft': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status: Campaign['status']) => {
    switch (status) {
      case 'sent': return CircleCheck;
      case 'scheduled': return Clock;
      case 'active': return TrendingUp;
      case 'draft': return CircleAlert;
      default: return CircleAlert;
    }
  };

  const renderCampaignItem = ({ item }: { item: Campaign }) => {
    const StatusIcon = getStatusIcon(item.status);
    const openRate = item.sent > 0 ? ((item.opened / item.sent) * 100).toFixed(1) : '0';
    const clickRate = item.sent > 0 ? ((item.clicked / item.sent) * 100).toFixed(1) : '0';

    return (
      <TouchableOpacity
        style={[styles.campaignCard, { backgroundColor: theme.colors.cardBackground }]}
        onPress={() => setSelectedCampaign(item)}
      >
        <View style={styles.campaignHeader}>
          <View style={styles.campaignInfo}>
            <Text style={[styles.campaignName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.statusContainer}>
              <StatusIcon size={14} color={getStatusColor(item.status)} />
              <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
          </View>
          <Text style={[styles.campaignDate, { color: theme.colors.secondaryText }]}>
            {item.scheduledDate || item.createdDate}
          </Text>
        </View>
        
        <View style={styles.campaignStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.recipients}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Recipients</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{openRate}%</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Open Rate</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{clickRate}%</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Click Rate</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContactItem = ({ item }: { item: Contact }) => (
    <View style={[styles.contactCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, { color: theme.colors.text }]}>{item.name}</Text>
        <Text style={[styles.contactPhone, { color: theme.colors.secondaryText }]}>{item.phone}</Text>
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: theme.colors.primary + '20' }]}>
              <Text style={[styles.tagText, { color: theme.colors.primary }]}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={[styles.lastActivity, { color: theme.colors.secondaryText }]}>
        {item.lastActivity}
      </Text>
    </View>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.analyticsContainer}>
      <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Campaign Performance</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#34C759' }]}>94.2%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Delivery Rate</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#007AFF' }]}>68.5%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Open Rate</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FF9500' }]}>18.7%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Click Rate</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FF3B30' }]}>2.1%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Unsubscribe</Text>
          </View>
        </View>
      </View>
      
      <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: '#34C759' }]} />
            <Text style={[styles.activityText, { color: theme.colors.text }]}>
              New campaign &quot;Summer Sale&quot; reached 1,000+ recipients.
            </Text>
            <Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>2h ago</Text>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: '#007AFF' }]} />
            <Text style={[styles.activityText, { color: theme.colors.text }]}>New contact added: John Doe</Text>
            <Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>4h ago</Text>
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
        <Text style={[styles.title, { color: theme.colors.text }]}>SMS Marketing Hub</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Plus size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['campaigns', 'contacts', 'analytics'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search */}
      {(activeTab === 'campaigns' || activeTab === 'contacts') && (
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder={`Search ${activeTab}...`}
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      )}

      {/* Content */}
      {activeTab === 'campaigns' && (
        <FlatList
          data={mockCampaigns}
          renderItem={renderCampaignItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'contacts' && (
        <FlatList
          data={mockContacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'analytics' && renderAnalytics()}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => Alert.alert('Create Campaign', 'Campaign creation feature coming soon!')}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  campaignCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  campaignInfo: {
    flex: 1,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  campaignDate: {
    fontSize: 12,
  },
  campaignStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  contactCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500',
  },
  lastActivity: {
    fontSize: 12,
  },
  analyticsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  analyticsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  metricLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activityText: {
    flex: 1,
    fontSize: 14,
  },
  activityTime: {
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
