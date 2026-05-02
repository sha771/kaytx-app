 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Users, Phone, MessageCircle, Calendar, Clock, Star, Search, ListFilter, Plus, GripHorizontal } from 'lucide-react-native';

const contacts = [
  { 
    id: 1, 
    name: 'John Smith', 
    company: 'Tech Corp',
    phone: '+1 (555) 123-4567',
    email: 'john@techcorp.com',
    lastContact: '2 days ago',
    contactType: 'customer',
    priority: 'high',
    notes: 'Interested in enterprise package'
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    company: 'Design Studio',
    phone: '+1 (555) 987-6543',
    email: 'sarah@designstudio.com',
    lastContact: '1 week ago',
    contactType: 'lead',
    priority: 'medium',
    notes: 'Requested demo for team collaboration tools'
  },
  { 
    id: 3, 
    name: 'Mike Wilson', 
    company: 'Marketing Inc',
    phone: '+1 (555) 246-8135',
    email: 'mike@marketinginc.com',
    lastContact: '3 days ago',
    contactType: 'partner',
    priority: 'high',
    notes: 'Partnership discussion scheduled'
  },
];

const callQueue = [
  { id: 1, name: 'Emma Davis', number: '+1 (555) 369-2580', waitTime: '2:15', priority: 'high' },
  { id: 2, name: 'Robert Brown', number: '+1 (555) 147-2589', waitTime: '1:45', priority: 'medium' },
  { id: 3, name: 'Lisa Garcia', number: '+1 (555) 753-9514', waitTime: '0:30', priority: 'low' },
];

const agents = [
  { id: 1, name: 'Agent 1', status: 'available', currentCall: null, callsToday: 12 },
  { id: 2, name: 'Agent 2', status: 'busy', currentCall: 'John Smith', callsToday: 8 },
  { id: 3, name: 'Agent 3', status: 'break', currentCall: null, callsToday: 15 },
];

const callStats = [
  { label: 'Calls Today', value: '156', change: '+12%', color: '#3B82F6' },
  { label: 'Avg Wait Time', value: '1:23', change: '-8%', color: '#10B981' },
  { label: 'Resolution Rate', value: '94%', change: '+3%', color: '#F59E0B' },
  { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', color: '#8B5CF6' },
];

export default function ContactCenterScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'customer' | 'lead' | 'partner'>('all');
  const [selectedTab, setSelectedTab] = useState<'contacts' | 'queue' | 'agents' | 'stats'>('contacts');

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || contact.contactType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#10B981';
      case 'busy': return '#EF4444';
      case 'break': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getContactTypeColor = (type: string) => {
    switch (type) {
      case 'customer': return '#3B82F6';
      case 'lead': return '#F59E0B';
      case 'partner': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Contact Center',
          headerStyle: { backgroundColor: '#059669' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.content}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {['contacts', 'queue', 'agents', 'stats'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab as any)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
          {/* Contacts Tab */}
          {selectedTab === 'contacts' && (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Contact Directory</Text>
                  <TouchableOpacity style={styles.addButton}>
                    <Plus size={20} color="#059669" />
                  </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                  <Search size={20} color="#6B7280" />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search contacts..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  <TouchableOpacity style={styles.filterButton}>
                    <ListFilter size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <View style={styles.filterTabs}>
                  {['all', 'customer', 'lead', 'partner'].map((Filter) => (
                    <TouchableOpacity
                      key={Filter}
                      style={[styles.filterTab, selectedFilter === Filter && styles.activeFilterTab]}
                      onPress={() => setSelectedFilter(Filter as any)}
                    >
                      <Text style={[styles.filterTabText, selectedFilter === Filter && styles.activeFilterTabText]}>
                        {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {filteredContacts.map((contact) => (
                  <View key={contact.id} style={styles.contactCard}>
                    <View style={styles.contactHeader}>
                      <View style={styles.contactAvatar}>
                        <Text style={styles.contactAvatarText}>{contact.name.charAt(0)}</Text>
                      </View>
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactName}>{contact.name}</Text>
                        <Text style={styles.contactCompany}>{contact.company}</Text>
                        <Text style={styles.contactEmail}>{contact.email}</Text>
                      </View>
                      <TouchableOpacity style={styles.contactMenu}>
                        <GripHorizontal size={20} color="#6B7280" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.contactMeta}>
                      <View style={styles.contactDetails}>
                        <View style={styles.detailItem}>
                          <Phone size={16} color="#6B7280" />
                          <Text style={styles.detailText}>{contact.phone}</Text>
                        </View>
                        <View style={styles.detailItem}>
                          <Clock size={16} color="#6B7280" />
                          <Text style={styles.detailText}>Last contact: {contact.lastContact}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.contactFooter}>
                      <View style={styles.contactBadges}>
                        <View style={[styles.typeBadge, { backgroundColor: getContactTypeColor(contact.contactType) }]}>
                          <Text style={styles.typeText}>{contact.contactType}</Text>
                        </View>
                        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(contact.priority) }]}>
                          <Text style={styles.priorityText}>{contact.priority}</Text>
                        </View>
                      </View>
                      <View style={styles.contactActions}>
                        <TouchableOpacity style={styles.actionButton}>
                          <Phone size={16} color="#059669" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                          <MessageCircle size={16} color="#059669" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {contact.notes && (
                      <View style={styles.contactNotes}>
                        <Text style={styles.notesText}>{contact.notes}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Queue Tab */}
          {selectedTab === 'queue' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Call Queue</Text>
              <Text style={styles.queueSummary}>{callQueue.length} callers waiting</Text>
              
              {callQueue.map((call) => (
                <View key={call.id} style={styles.queueItem}>
                  <View style={styles.queueInfo}>
                    <Text style={styles.queueName}>{call.name}</Text>
                    <Text style={styles.queueNumber}>{call.number}</Text>
                  </View>
                  <View style={styles.queueMeta}>
                    <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(call.priority) }]} />
                    <Text style={styles.waitTime}>{call.waitTime}</Text>
                    <TouchableOpacity style={styles.answerButton}>
                      <Phone size={16} color="#FFFFFF" />
                      <Text style={styles.answerText}>Answer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Agents Tab */}
          {selectedTab === 'agents' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Agent Status</Text>
              
              {agents.map((agent) => (
                <View key={agent.id} style={styles.agentCard}>
                  <View style={styles.agentInfo}>
                    <View style={styles.agentAvatar}>
                      <Text style={styles.agentAvatarText}>{agent.name.charAt(-1)}</Text>
                    </View>
                    <View style={styles.agentDetails}>
                      <Text style={styles.agentName}>{agent.name}</Text>
                      <Text style={styles.agentCalls}>{agent.callsToday} calls today</Text>
                      {agent.currentCall && (
                        <Text style={styles.currentCall}>On call with: {agent.currentCall}</Text>
                      )}
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(agent.status) }]}>
                    <Text style={styles.statusText}>{agent.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Stats Tab */}
          {selectedTab === 'stats' && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Call Center Statistics</Text>
                <View style={styles.statsGrid}>
                  {callStats.map((stat, index) => (
                    <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
                      <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                      <Text style={styles.statLabel}>{stat.label}</Text>
                      <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#10B981' : '#EF4444' }]}>
                        {stat.change}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Performance Metrics</Text>
                <View style={styles.metricsContainer}>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Peak Hours</Text>
                    <Text style={styles.metricValue}>10 AM - 2 PM</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Busiest Day</Text>
                    <Text style={styles.metricValue}>Tuesday</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Avg Call Duration</Text>
                    <Text style={styles.metricValue}>4:32</Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>First Call Resolution</Text>
                    <Text style={styles.metricValue}>87%</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#059669',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#059669',
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  filterButton: {
    padding: 4,
  },
  filterTabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#059669',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  contactCompany: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  contactEmail: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  contactMenu: {
    padding: 4,
  },
  contactMeta: {
    marginBottom: 12,
  },
  contactDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  contactFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactNotes: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },
  notesText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  queueSummary: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  queueItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  queueInfo: {
    flex: 1,
  },
  queueName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  queueNumber: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  queueMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  waitTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EF4444',
    minWidth: 40,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  answerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  agentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  agentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agentAvatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  agentDetails: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  agentCalls: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  currentCall: {
    fontSize: 12,
    color: '#059669',
    marginTop: 2,
    fontStyle: 'italic',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    minWidth: '45%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
});