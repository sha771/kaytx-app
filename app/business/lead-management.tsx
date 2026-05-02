 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { Users, Plus, Search, ListFilter, Tag, Calendar, DollarSign, TrendingUp, Mail, Phone } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'negotiation' | 'won' | 'lost';
  value: number;
  source: string;
  lastContact: string;
  tags: string[];
}

export default function LeadManagementScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Lead['status']>('all');
  const [leads] = useState<Lead[]>([
    {
      id: '1',
      name: 'John Smith',
      company: 'Tech Corp',
      email: 'john@techcorp.com',
      phone: '+1 (555) 123-4567',
      score: 85,
      status: 'qualified',
      value: 50000,
      source: 'Website',
      lastContact: '2 hours ago',
      tags: ['Enterprise', 'Hot Lead'],
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'Marketing Co',
      email: 'sarah@marketing.com',
      phone: '+1 (555) 987-6543',
      score: 72,
      status: 'negotiation',
      value: 35000,
      source: 'Referral',
      lastContact: '1 day ago',
      tags: ['SMB', 'Warm'],
    },
    {
      id: '3',
      name: 'Mike Wilson',
      company: 'Startup Inc',
      email: 'mike@startup.com',
      phone: '+1 (555) 456-7890',
      score: 95,
      status: 'new',
      value: 75000,
      source: 'Cold Call',
      lastContact: 'Just now',
      tags: ['Enterprise', 'High Value'],
    },
    {
      id: '4',
      name: 'Emily Brown',
      company: 'Design Studio',
      email: 'emily@design.com',
      phone: '+1 (555) 321-0987',
      score: 68,
      status: 'contacted',
      value: 25000,
      source: 'LinkedIn',
      lastContact: '3 days ago',
      tags: ['SMB'],
    },
  ]);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 60) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusColor = (status: Lead['status']) => {
    const colors = {
      new: '#60A5FA',
      contacted: '#A78BFA',
      qualified: '#10B981',
      negotiation: '#F59E0B',
      won: '#34D399',
      lost: '#EF4444',
    };
    return colors[status];
  };

  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const avgScore = Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Lead Management',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Lead Pipeline</Text>
            <Text style={styles.headerSubtitle}>{leads.length} active leads</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Search size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search leads..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterIcon}>
            <ListFilter size={18} color="#60A5FA" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.statusFilter}
        contentContainerStyle={styles.statusFilterContent}
      >
        {['all', 'new', 'contacted', 'qualified', 'negotiation', 'won', 'lost'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusChip,
              statusFilter === status && styles.statusChipActive
            ]}
            onPress={() => setStatusFilter(status as typeof statusFilter)}
          >
            <Text style={[
              styles.statusChipText,
              statusFilter === status && styles.statusChipTextActive
            ]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <DollarSign size={18} color="#10B981" />
          <Text style={styles.statValue}>${(totalValue / 1000).toFixed(0)}K</Text>
          <Text style={styles.statLabel}>Pipeline Value</Text>
        </View>
        <View style={styles.statCard}>
          <Users size={18} color="#60A5FA" />
          <Text style={styles.statValue}>{leads.length}</Text>
          <Text style={styles.statLabel}>Total Leads</Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={18} color="#F59E0B" />
          <Text style={styles.statValue}>{avgScore}</Text>
          <Text style={styles.statLabel}>Avg Score</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {filteredLeads.map((lead) => (
          <TouchableOpacity key={lead.id} style={styles.leadCard}>
            <View style={styles.leadHeader}>
              <View style={styles.leadAvatar}>
                <Text style={styles.leadAvatarText}>
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.leadInfo}>
                <Text style={styles.leadName}>{lead.name}</Text>
                <Text style={styles.leadCompany}>{lead.company}</Text>
              </View>
              <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(lead.score) + '20' }]}>
                <Text style={[styles.scoreText, { color: getScoreColor(lead.score) }]}>
                  {lead.score}
                </Text>
              </View>
            </View>

            <View style={styles.leadDetails}>
              <View style={styles.detailRow}>
                <Mail size={14} color="#9CA3AF" />
                <Text style={styles.detailText}>{lead.email}</Text>
              </View>
              <View style={styles.detailRow}>
                <Phone size={14} color="#9CA3AF" />
                <Text style={styles.detailText}>{lead.phone}</Text>
              </View>
            </View>

            <View style={styles.leadMeta}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(lead.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(lead.status) }]}>
                  {lead.status.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.valueText}>${lead.value.toLocaleString()}</Text>
            </View>

            <View style={styles.leadTags}>
              {lead.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Tag size={10} color="#60A5FA" />
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.leadFooter}>
              <View style={styles.sourceInfo}>
                <Text style={styles.sourceLabel}>Source:</Text>
                <Text style={styles.sourceText}>{lead.source}</Text>
              </View>
              <View style={styles.contactInfo}>
                <Calendar size={12} color="#9CA3AF" />
                <Text style={styles.contactText}>{lead.lastContact}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  addButton: {
    backgroundColor: '#60A5FA',
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    paddingVertical: 12,
  },
  filterIcon: {
    padding: 4,
  },
  statusFilter: {
    maxHeight: 50,
  },
  statusFilterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  statusChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    marginRight: 8,
  },
  statusChipActive: {
    backgroundColor: '#60A5FA',
  },
  statusChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  statusChipTextActive: {
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  leadCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
  },
  leadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  leadAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#60A5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leadAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  leadInfo: {
    flex: 1,
  },
  leadName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  leadCompany: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  scoreBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
  },
  leadDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#D1D5DB',
  },
  leadMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  valueText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
  },
  leadTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  tagText: {
    fontSize: 11,
    color: '#93C5FD',
  },
  leadFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  sourceInfo: {
    flexDirection: 'row',
    gap: 4,
  },
  sourceLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  sourceText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  contactText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
