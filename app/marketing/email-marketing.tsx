 
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Send, Users, BarChart3, Calendar, Plus, Search, Filter, Target, TrendingUp, AlertCircle, RefreshCw, Pause } from 'lucide-react-native';
import { useCampaigns, useMarketingAnalytics } from '../../hooks/useMarketing';

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  status: 'draft' | 'scheduled' | 'sent' | 'active';
  recipients: number;
  openRate: number;
  clickRate: number;
  sentDate: string;
  type: 'newsletter' | 'promotional' | 'transactional';
}

const mockCampaigns: EmailCampaign[] = [
  {
    id: '1',
    name: 'Summer Sale Newsletter',
    subject: 'Summer Sale - Up to 50% Off!',
    status: 'sent',
    recipients: 12450,
    openRate: 24.5,
    clickRate: 3.2,
    sentDate: '2 days ago',
    type: 'promotional'
  },
  {
    id: '2',
    name: 'Weekly Product Updates',
    subject: 'New Features This Week',
    status: 'scheduled',
    recipients: 8920,
    openRate: 0,
    clickRate: 0,
    sentDate: 'Tomorrow 9:00 AM',
    type: 'newsletter'
  },
];

export default function EmailMarketingScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'draft' | 'scheduled' | 'sent' | 'active'>('all');

  // Use real backend data
  const { 
    campaigns, 
    loadingCampaigns, 
    campaignsError, 
    refreshCampaigns,
    launchCampaign,
    pauseCampaign 
  } = useCampaigns();
  
  const { analytics, loadingAnalytics } = useMarketingAnalytics();

  // Handle errors
  useEffect(() => {
    if (campaignsError) {
      Alert.alert('Error', 'Failed to load campaigns. Please try again.');
    }
  }, [campaignsError]);

  const handleLaunchCampaign = async (campaignId: string) => {
    const result = await launchCampaign(campaignId);
    if (!result.success) {
      Alert.alert('Error', result.error || 'Failed to launch campaign');
    }
  };

  const handlePauseCampaign = async (campaignId: string) => {
    const result = await pauseCampaign(campaignId);
    if (!result.success) {
      Alert.alert('Error', result.error || 'Failed to pause campaign');
    }
  };

  // Filter campaigns based on search and status
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.content.subject?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || campaign.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats from real data
  const totalSent = campaigns.reduce((sum, campaign) => sum + campaign.metrics.sent, 0);
  const avgOpenRate = campaigns.length > 0 
    ? campaigns.reduce((sum, campaign) => sum + campaign.metrics.opened / campaign.metrics.sent * 100, 0) / campaigns.length 
    : 0;
  const avgClickRate = campaigns.length > 0 
    ? campaigns.reduce((sum, campaign) => sum + campaign.metrics.clicked / campaign.metrics.opened * 100, 0) / campaigns.filter(c => c.metrics.opened > 0).length 
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return '#10B981';
      case 'scheduled': return '#3B82F6';
      case 'active': return '#8B5CF6';
      case 'draft': return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Email Marketing Hub</Text>
        <TouchableOpacity style={styles.createButton}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.createText}>Create Campaign</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Mail size={20} color="#3B82F6" />
          <Text style={styles.statValue}>{loadingAnalytics ? '...' : totalSent.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Sent</Text>
        </View>
        <View style={styles.statCard}>
          <Target size={20} color="#10B981" />
          <Text style={styles.statValue}>{loadingAnalytics ? '...' : `${avgOpenRate.toFixed(1)}%`}</Text>
          <Text style={styles.statLabel}>Avg Open Rate</Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={20} color="#8B5CF6" />
          <Text style={styles.statValue}>{loadingAnalytics ? '...' : `${avgClickRate.toFixed(1)}%`}</Text>
          <Text style={styles.statLabel}>Avg Click Rate</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search campaigns..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.campaignsList}>
        {loadingCampaigns ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Loading campaigns...</Text>
          </View>
        ) : campaignsError ? (
          <View style={styles.errorContainer}>
            <AlertCircle size={24} color="#EF4444" />
            <Text style={styles.errorText}>Failed to load campaigns</Text>
            <TouchableOpacity 
              style={styles.retryButton} 
              onPress={refreshCampaigns}
            >
              <RefreshCw size={16} color="#FFFFFF" />
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredCampaigns.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Mail size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>No campaigns found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery || activeFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first campaign to get started'}
            </Text>
          </View>
        ) : (
          filteredCampaigns.map((campaign) => (
            <TouchableOpacity key={campaign.id} style={styles.campaignCard}>
              <View style={styles.campaignHeader}>
                <View style={styles.campaignInfo}>
                  <Text style={styles.campaignName}>{campaign.name}</Text>
                  <Text style={styles.campaignSubject}>{campaign.content.subject || 'No subject'}</Text>
                  <View style={styles.campaignMeta}>
                    <View style={styles.recipientsInfo}>
                      <Users size={14} color="#6B7280" />
                      <Text style={styles.recipientsText}>
                        {campaign.targetAudience.estimatedReach.toLocaleString()} recipients
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.campaignStatus}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(campaign.status) }]}>
                    <Text style={styles.statusText}>{campaign.status}</Text>
                  </View>
                </View>
              </View>

              {(campaign.status === 'completed' || campaign.status === 'running') ? (
                <View style={styles.campaignStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statItemValue}>
                      {campaign.metrics.sent > 0 
                        ? `${((campaign.metrics.opened / campaign.metrics.sent) * 100).toFixed(1)}%`
                        : '0%'}
                    </Text>
                    <Text style={styles.statItemLabel}>Open Rate</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statItemValue}>
                      {campaign.metrics.opened > 0 
                        ? `${((campaign.metrics.clicked / campaign.metrics.opened) * 100).toFixed(1)}%`
                        : '0%'}
                    </Text>
                    <Text style={styles.statItemLabel}>Click Rate</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statItemValue}>{campaign.metrics.opened.toLocaleString()}</Text>
                    <Text style={styles.statItemLabel}>Opens</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.campaignPlaceholder}>
                  <Text style={styles.placeholderText}>
                    {campaign.status === 'scheduled' 
                      ? `Scheduled for ${campaign.scheduling.scheduledAt ? new Date(campaign.scheduling.scheduledAt).toLocaleDateString() : 'TBD'}`
                      : 'Campaign not sent yet'}
                  </Text>
                </View>
              )}

              <View style={styles.campaignFooter}>
                <View style={styles.dateInfo}>
                  <Calendar size={14} color="#6B7280" />
                  <Text style={styles.dateText}>
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.campaignActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <BarChart3 size={16} color="#6B7280" />
                    <Text style={styles.actionText}>Analytics</Text>
                  </TouchableOpacity>
                  {campaign.status === 'draft' && (
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleLaunchCampaign(campaign.id)}
                    >
                      <Send size={16} color="#3B82F6" />
                      <Text style={styles.actionText}>Launch</Text>
                    </TouchableOpacity>
                  )}
                  {(campaign.status === 'running' || campaign.status === 'scheduled') && (
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handlePauseCampaign(campaign.id)}
                    >
                      <Pause size={16} color="#F59E0B" />
                      <Text style={styles.actionText}>Pause</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#111827',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  createText: {
    color: '#FFFFFF',
    fontWeight: '600' as const,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    gap: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    gap: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    marginLeft: 12,
  },
  campaignsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  campaignCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#111827',
    marginBottom: 4,
  },
  campaignSubject: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  campaignMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recipientsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  recipientsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  campaignStatus: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  campaignStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statItemValue: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#111827',
    marginBottom: 4,
  },
  statItemLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  campaignPlaceholder: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  campaignFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: '#6B7280',
  },
  campaignActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '600',
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});