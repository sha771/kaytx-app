import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Send, Users, BarChart3, Calendar, Plus, Search, Filter, Target, TrendingUp } from 'lucide-react-native';

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

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || campaign.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

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
          <Text style={styles.statValue}>24,567</Text>
          <Text style={styles.statLabel}>Total Sent</Text>
        </View>
        <View style={styles.statCard}>
          <Target size={20} color="#10B981" />
          <Text style={styles.statValue}>28.4%</Text>
          <Text style={styles.statLabel}>Avg Open Rate</Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={20} color="#8B5CF6" />
          <Text style={styles.statValue}>4.7%</Text>
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
        {filteredCampaigns.map((campaign) => (
          <TouchableOpacity key={campaign.id} style={styles.campaignCard}>
            <View style={styles.campaignHeader}>
              <View style={styles.campaignInfo}>
                <Text style={styles.campaignName}>{campaign.name}</Text>
                <Text style={styles.campaignSubject}>{campaign.subject}</Text>
                <View style={styles.campaignMeta}>
                  <View style={styles.recipientsInfo}>
                    <Users size={14} color="#6B7280" />
                    <Text style={styles.recipientsText}>{campaign.recipients.toLocaleString()} recipients</Text>
                  </View>
                </View>
              </View>
              <View style={styles.campaignStatus}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(campaign.status) }]}>
                  <Text style={styles.statusText}>{campaign.status}</Text>
                </View>
              </View>
            </View>

            {campaign.status === 'sent' || campaign.status === 'active' ? (
              <View style={styles.campaignStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statItemValue}>{campaign.openRate}%</Text>
                  <Text style={styles.statItemLabel}>Open Rate</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statItemValue}>{campaign.clickRate}%</Text>
                  <Text style={styles.statItemLabel}>Click Rate</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statItemValue}>{Math.round(campaign.recipients * campaign.openRate / 100)}</Text>
                  <Text style={styles.statItemLabel}>Opens</Text>
                </View>
              </View>
            ) : (
              <View style={styles.campaignPlaceholder}>
                <Text style={styles.placeholderText}>Campaign not sent yet</Text>
              </View>
            )}

            <View style={styles.campaignFooter}>
              <View style={styles.dateInfo}>
                <Calendar size={14} color="#6B7280" />
                <Text style={styles.dateText}>{campaign.sentDate}</Text>
              </View>
              <View style={styles.campaignActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <BarChart3 size={16} color="#6B7280" />
                  <Text style={styles.actionText}>Analytics</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Send size={16} color="#3B82F6" />
                  <Text style={styles.actionText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    fontWeight: '600' as const,
    color: '#374151',
  },
});