 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Search, Plus, ListFilter, Phone, Mail, Calendar, DollarSign, Star } from 'lucide-react-native';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'prospect';
  value: number;
  lastContact: string;
  tags: string[];
  score: number;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@company.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Corp',
    status: 'active',
    value: 25000,
    lastContact: '2 days ago',
    tags: ['VIP', 'Enterprise'],
    score: 95
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@startup.io',
    phone: '+1 (555) 987-6543',
    company: 'Startup Inc',
    status: 'prospect',
    value: 12000,
    lastContact: '1 week ago',
    tags: ['Hot Lead', 'SMB'],
    score: 78
  },
  {
    id: '3',
    name: 'Mike Wilson',
    email: 'mike@business.com',
    phone: '+1 (555) 456-7890',
    company: 'Business Solutions',
    status: 'active',
    value: 45000,
    lastContact: '3 hours ago',
    tags: ['Enterprise', 'Long-term'],
    score: 88
  },
];

export default function CustomerManagementScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'prospect' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'value' | 'score' | 'lastContact'>('name');

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || customer.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'value': return b.value - a.value;
      case 'score': return b.score - a.score;
      case 'lastContact': return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime();
      default: return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'prospect': return '#F59E0B';
      case 'inactive': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Customer Management</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addText}>Add Customer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={styles.filterButton}>
          <ListFilter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'all' && styles.activeFilter]}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={[styles.filterText, activeFilter === 'all' && styles.activeFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'active' && styles.activeFilter]}
            onPress={() => setActiveFilter('active')}
          >
            <Text style={[styles.filterText, activeFilter === 'active' && styles.activeFilterText]}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'prospect' && styles.activeFilter]}
            onPress={() => setActiveFilter('prospect')}
          >
            <Text style={[styles.filterText, activeFilter === 'prospect' && styles.activeFilterText]}>Prospects</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'inactive' && styles.activeFilter]}
            onPress={() => setActiveFilter('inactive')}
          >
            <Text style={[styles.filterText, activeFilter === 'inactive' && styles.activeFilterText]}>Inactive</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.sortChip, sortBy === 'name' && styles.activeSortChip]}
            onPress={() => setSortBy('name')}
          >
            <Text style={[styles.sortText, sortBy === 'name' && styles.activeSortText]}>Name</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sortChip, sortBy === 'value' && styles.activeSortChip]}
            onPress={() => setSortBy('value')}
          >
            <Text style={[styles.sortText, sortBy === 'value' && styles.activeSortText]}>Value</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.sortChip, sortBy === 'score' && styles.activeSortChip]}
            onPress={() => setSortBy('score')}
          >
            <Text style={[styles.sortText, sortBy === 'score' && styles.activeSortText]}>Score</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.customersList}>
        {sortedCustomers.map((customer) => (
          <TouchableOpacity key={customer.id} style={styles.customerCard}>
            <View style={styles.customerHeader}>
              <View style={styles.customerInfo}>
                <View style={styles.customerAvatar}>
                  <Users size={24} color="#6B7280" />
                </View>
                <View style={styles.customerDetails}>
                  <Text style={styles.customerName}>{customer.name}</Text>
                  <Text style={styles.customerCompany}>{customer.company}</Text>
                  <View style={styles.customerContact}>
                    <Mail size={14} color="#6B7280" />
                    <Text style={styles.contactText}>{customer.email}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.customerMeta}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(customer.status) }]}>
                  <Text style={styles.statusText}>{customer.status}</Text>
                </View>
                <View style={styles.scoreContainer}>
                  <Star size={14} color={getScoreColor(customer.score)} />
                  <Text style={[styles.scoreText, { color: getScoreColor(customer.score) }]}>
                    {customer.score}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.customerStats}>
              <View style={styles.statItem}>
                <DollarSign size={16} color="#6B7280" />
                <Text style={styles.statValue}>${customer.value.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Customer Value</Text>
              </View>
              <View style={styles.statItem}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.statValue}>{customer.lastContact}</Text>
                <Text style={styles.statLabel}>Last Contact</Text>
              </View>
            </View>

            <View style={styles.customerTags}>
              {customer.tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.customerActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Phone size={16} color="#3B82F6" />
                <Text style={styles.actionText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Mail size={16} color="#10B981" />
                <Text style={styles.actionText}>Email</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Calendar size={16} color="#8B5CF6" />
                <Text style={styles.actionText}>Schedule</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.summaryStats}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{mockCustomers.length}</Text>
          <Text style={styles.summaryLabel}>Total Customers</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>${mockCustomers.reduce((sum, c) => sum + c.value, 0).toLocaleString()}</Text>
          <Text style={styles.summaryLabel}>Total Value</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>{Math.round(mockCustomers.reduce((sum, c) => sum + c.score, 0) / mockCustomers.length)}</Text>
          <Text style={styles.summaryLabel}>Avg Score</Text>
        </View>
      </View>
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  addText: {
    color: '#FFFFFF',
    fontWeight: '600' as const,
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
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeFilter: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#6B7280',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#6B7280',
    marginRight: 12,
  },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    marginRight: 8,
  },
  activeSortChip: {
    backgroundColor: '#10B981',
  },
  sortText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#6B7280',
  },
  activeSortText: {
    color: '#FFFFFF',
  },
  customersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  customerCard: {
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
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  customerInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  customerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#111827',
    marginBottom: 4,
  },
  customerCompany: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  customerContact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactText: {
    fontSize: 12,
    color: '#6B7280',
  },
  customerMeta: {
    alignItems: 'flex-end',
    gap: 8,
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
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold' as const,
  },
  customerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  customerTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#3B82F6',
  },
  customerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#374151',
  },
  summaryStats: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#111827',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
