 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Mail, 
  Phone, 
  MessageSquare, 
  ListFilter, 
  Search, 
  Plus,
  ChartBarBig,
  Calendar,
  DollarSign,
  CircleCheck,
  Clock,
  CircleAlert,
  Star,
  Download
} from 'lucide-react-native';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  source: string;
  value: number;
  lastContact: string;
  assignedTo: string;
}

interface LeadSource {
  id: string;
  name: string;
  leads: number;
  conversion: number;
  color: string;
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc',
    status: 'qualified',
    score: 85,
    source: 'Website',
    value: 15000,
    lastContact: '2 hours ago',
    assignedTo: 'John Smith'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'mchen@innovate.io',
    phone: '+1 (555) 234-5678',
    company: 'Innovate Solutions',
    status: 'new',
    score: 72,
    source: 'LinkedIn',
    value: 25000,
    lastContact: 'Never',
    assignedTo: 'Unassigned'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@startup.com',
    phone: '+1 (555) 345-6789',
    company: 'Startup Labs',
    status: 'contacted',
    score: 68,
    source: 'Referral',
    value: 12000,
    lastContact: '1 day ago',
    assignedTo: 'Jane Doe'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'dkim@enterprise.com',
    phone: '+1 (555) 456-7890',
    company: 'Enterprise Co',
    status: 'converted',
    score: 95,
    source: 'Email Campaign',
    value: 50000,
    lastContact: '3 days ago',
    assignedTo: 'John Smith'
  }
];

const leadSources: LeadSource[] = [
  { id: '1', name: 'Website', leads: 145, conversion: 18, color: '#007AFF' },
  { id: '2', name: 'LinkedIn', leads: 89, conversion: 24, color: '#0077B5' },
  { id: '3', name: 'Email Campaign', leads: 67, conversion: 15, color: '#34C759' },
  { id: '4', name: 'Referral', leads: 43, conversion: 32, color: '#FF9500' },
  { id: '5', name: 'Cold Outreach', leads: 28, conversion: 8, color: '#AF52DE' }
];

export default function LeadGenerationScreen() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'leads' | 'sources' | 'analytics'>('leads');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#007AFF';
      case 'contacted': return '#FF9500';
      case 'qualified': return '#34C759';
      case 'converted': return '#AF52DE';
      case 'lost': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return CircleAlert;
      case 'contacted': return MessageSquare;
      case 'qualified': return Star;
      case 'converted': return CircleCheck;
      case 'lost': return Clock;
      default: return Target;
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const renderLead = ({ item }: { item: Lead }) => {
    const StatusIcon = getStatusIcon(item.status);
    
    return (
      <TouchableOpacity style={styles.leadCard}>
        <View style={styles.leadHeader}>
          <View style={styles.leadInfo}>
            <Text style={styles.leadName}>{item.name}</Text>
            <Text style={styles.leadCompany}>{item.company}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <StatusIcon size={12} color={getStatusColor(item.status)} />
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.leadDetails}>
          <View style={styles.detailRow}>
            <Mail size={14} color="#666" />
            <Text style={styles.detailText}>{item.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Phone size={14} color="#666" />
            <Text style={styles.detailText}>{item.phone}</Text>
          </View>
        </View>

        <View style={styles.leadMeta}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Score</Text>
            <View style={styles.scoreContainer}>
              <View style={styles.scoreBar}>
                <View style={[styles.scoreFill, { width: `${item.score}%`, backgroundColor: getStatusColor(item.status) }]} />
              </View>
              <Text style={styles.scoreText}>{item.score}</Text>
            </View>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Value</Text>
            <Text style={styles.metaValue}>${item.value.toLocaleString()}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Source</Text>
            <Text style={styles.metaValue}>{item.source}</Text>
          </View>
        </View>

        <View style={styles.leadFooter}>
          <Text style={styles.assignedText}>Assigned to: {item.assignedTo}</Text>
          <Text style={styles.lastContactText}>Last contact: {item.lastContact}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSource = ({ item }: { item: LeadSource }) => (
    <View style={styles.sourceCard}>
      <View style={[styles.sourceIndicator, { backgroundColor: item.color }]} />
      <View style={styles.sourceContent}>
        <Text style={styles.sourceName}>{item.name}</Text>
        <View style={styles.sourceStats}>
          <View style={styles.sourceStat}>
            <Text style={styles.sourceStatValue}>{item.leads}</Text>
            <Text style={styles.sourceStatLabel}>Leads</Text>
          </View>
          <View style={styles.sourceStat}>
            <Text style={[styles.sourceStatValue, { color: item.color }]}>{item.conversion}%</Text>
            <Text style={styles.sourceStatLabel}>Conversion</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderLeads = () => (
    <View style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search leads..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <ListFilter size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statusFilters}>
        {['all', 'new', 'contacted', 'qualified', 'converted', 'lost'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.statusFilter,
              selectedStatus === status && { backgroundColor: '#007AFF' }
            ]}
            onPress={() => setSelectedStatus(status)}
          >
            <Text style={[
              styles.statusFilterText,
              { color: selectedStatus === status ? '#fff' : '#666' }
            ]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredLeads}
        renderItem={renderLead}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.leadsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderSources = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Lead Sources Performance</Text>
      <FlatList
        data={leadSources}
        renderItem={renderSource}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.sourcesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Users size={24} color="#007AFF" />
          <Text style={styles.statValue}>{leads.length}</Text>
          <Text style={styles.statLabel}>Total Leads</Text>
        </View>
        <View style={styles.statCard}>
          <Target size={24} color="#34C759" />
          <Text style={styles.statValue}>{leads.filter(l => l.status === 'qualified').length}</Text>
          <Text style={styles.statLabel}>Qualified</Text>
        </View>
        <View style={styles.statCard}>
          <CircleCheck size={24} color="#AF52DE" />
          <Text style={styles.statValue}>{leads.filter(l => l.status === 'converted').length}</Text>
          <Text style={styles.statLabel}>Converted</Text>
        </View>
        <View style={styles.statCard}>
          <DollarSign size={24} color="#FF9500" />
          <Text style={styles.statValue}>${(leads.reduce((sum, l) => sum + l.value, 0) / 1000).toFixed(0)}K</Text>
          <Text style={styles.statLabel}>Total Value</Text>
        </View>
      </View>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>Lead Generation Trend</Text>
        <View style={styles.chartPlaceholder}>
          <ChartBarBig size={48} color="#007AFF" />
          <Text style={styles.chartText}>Interactive chart visualization</Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Lead Generation',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#1a1a1a', fontWeight: '600' }
        }} 
      />

      <View style={styles.header}>
        <View style={styles.titleSection}>
          <TrendingUp size={28} color="#007AFF" />
          <View>
            <Text style={styles.title}>Lead Generation</Text>
            <Text style={styles.subtitle}>Manage and track your leads</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'leads' && styles.activeTabButton]}
          onPress={() => setActiveTab('leads')}
        >
          <Users size={20} color={activeTab === 'leads' ? '#007AFF' : '#666'} />
          <Text style={[styles.tabButtonText, activeTab === 'leads' && styles.activeTabButtonText]}>
            Leads
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'sources' && styles.activeTabButton]}
          onPress={() => setActiveTab('sources')}
        >
          <Target size={20} color={activeTab === 'sources' ? '#007AFF' : '#666'} />
          <Text style={[styles.tabButtonText, activeTab === 'sources' && styles.activeTabButtonText]}>
            Sources
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'analytics' && styles.activeTabButton]}
          onPress={() => setActiveTab('analytics')}
        >
          <ChartBarBig size={20} color={activeTab === 'analytics' ? '#007AFF' : '#666'} />
          <Text style={[styles.tabButtonText, activeTab === 'analytics' && styles.activeTabButtonText]}>
            Analytics
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'leads' && renderLeads()}
      {activeTab === 'sources' && renderSources()}
      {activeTab === 'analytics' && renderAnalytics()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9'
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9'
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF'
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666'
  },
  activeTabButtonText: {
    color: '#007AFF'
  },
  tabContent: {
    flex: 1,
    padding: 16
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a'
  },
  filterButton: {
    backgroundColor: '#fff',
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  statusFilters: {
    marginBottom: 16
  },
  statusFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  statusFilterText: {
    fontSize: 14,
    fontWeight: '500'
  },
  leadsList: {
    gap: 12
  },
  leadCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  leadHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  leadInfo: {
    flex: 1
  },
  leadName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2
  },
  leadCompany: {
    fontSize: 14,
    color: '#666'
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600'
  },
  leadDetails: {
    gap: 8,
    marginBottom: 12
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  detailText: {
    fontSize: 14,
    color: '#666'
  },
  leadMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  metaItem: {
    flex: 1
  },
  metaLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  scoreBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden'
  },
  scoreFill: {
    height: '100%',
    borderRadius: 3
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
    minWidth: 25
  },
  leadFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0'
  },
  assignedText: {
    fontSize: 12,
    color: '#666'
  },
  lastContactText: {
    fontSize: 12,
    color: '#999'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16
  },
  sourcesList: {
    gap: 12
  },
  sourceCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  sourceIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: 16
  },
  sourceContent: {
    flex: 1
  },
  sourceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12
  },
  sourceStats: {
    flexDirection: 'row',
    gap: 24
  },
  sourceStat: {
    alignItems: 'center'
  },
  sourceStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4
  },
  sourceStatLabel: {
    fontSize: 12,
    color: '#666'
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  statLabel: {
    fontSize: 12,
    color: '#666'
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16
  },
  chartPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40
  },
  chartText: {
    fontSize: 14,
    color: '#666',
    marginTop: 12
  }
});
