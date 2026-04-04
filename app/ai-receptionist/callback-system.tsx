import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { Stack } from 'expo-router';
import { PhoneCall, Calendar, CheckCircle, XCircle, Search } from 'lucide-react-native';

interface CallbackRequest {
  id: string;
  customerName: string;
  phoneNumber: string;
  requestedTime: string;
  reason: string;
  priority: 'urgent' | 'high' | 'normal';
  status: 'pending' | 'scheduled' | 'completed' | 'missed';
  notes: string;
  createdAt: string;
}

export default function CallbackSystemScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [sendConfirmation, setSendConfirmation] = useState(true);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const [callbacks] = useState<CallbackRequest[]>([
    {
      id: '1',
      customerName: 'Emily Chen',
      phoneNumber: '+1 (555) 789-0123',
      requestedTime: 'Today at 2:00 PM',
      reason: 'Product Demo',
      priority: 'urgent',
      status: 'pending',
      notes: 'Interested in enterprise plan',
      createdAt: '2024-01-04 09:30 AM',
    },
    {
      id: '2',
      customerName: 'David Martinez',
      phoneNumber: '+1 (555) 890-1234',
      requestedTime: 'Tomorrow at 10:00 AM',
      reason: 'Technical Support',
      priority: 'high',
      status: 'scheduled',
      notes: 'Issue with integration',
      createdAt: '2024-01-04 08:15 AM',
    },
    {
      id: '3',
      customerName: 'Lisa Anderson',
      phoneNumber: '+1 (555) 901-2345',
      requestedTime: 'Today at 11:00 AM',
      reason: 'Follow-up',
      priority: 'normal',
      status: 'completed',
      notes: 'Quote sent successfully',
      createdAt: '2024-01-03 04:20 PM',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'scheduled':
        return '#3B82F6';
      case 'completed':
        return '#10B981';
      case 'missed':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '#EF4444';
      case 'high':
        return '#F59E0B';
      case 'normal':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const filters = ['all', 'pending', 'scheduled', 'completed', 'missed'];

  const filteredCallbacks = callbacks.filter((callback) => {
    const matchesFilter =
      selectedFilter === 'all' || callback.status === selectedFilter;
    const matchesSearch =
      searchQuery === '' ||
      callback.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      callback.phoneNumber.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const stats = {
    pending: callbacks.filter((c) => c.status === 'pending').length,
    scheduled: callbacks.filter((c) => c.status === 'scheduled').length,
    completed: callbacks.filter((c) => c.status === 'completed').length,
    missed: callbacks.filter((c) => c.status === 'missed').length,
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Callback System',
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#F59E0B' }]}>
            <Text style={styles.statValue}>{stats.pending}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#3B82F6' }]}>
            <Text style={styles.statValue}>{stats.scheduled}</Text>
            <Text style={styles.statLabel}>Scheduled</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#10B981' }]}>
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#EF4444' }]}>
            <Text style={styles.statValue}>{stats.missed}</Text>
            <Text style={styles.statLabel}>Missed</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Auto-Schedule Callbacks</Text>
              <Switch
                value={autoSchedule}
                onValueChange={setAutoSchedule}
                trackColor={{ false: '#1E293B', true: '#3B82F6' }}
                thumbColor={autoSchedule ? '#fff' : '#64748B'}
              />
            </View>
            <Text style={styles.settingDescription}>
              Automatically schedule callbacks based on agent availability
            </Text>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Send Confirmation</Text>
              <Switch
                value={sendConfirmation}
                onValueChange={setSendConfirmation}
                trackColor={{ false: '#1E293B', true: '#3B82F6' }}
                thumbColor={sendConfirmation ? '#fff' : '#64748B'}
              />
            </View>
            <Text style={styles.settingDescription}>
              Send SMS/email confirmation to customers
            </Text>
          </View>

          <View style={styles.settingCard}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Reminder Notifications</Text>
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
                trackColor={{ false: '#1E293B', true: '#3B82F6' }}
                thumbColor={reminderEnabled ? '#fff' : '#64748B'}
              />
            </View>
            <Text style={styles.settingDescription}>
              Send reminders 15 minutes before callback
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Callback Requests</Text>

          <View style={styles.searchContainer}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or number..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {filteredCallbacks.map((callback) => (
            <View key={callback.id} style={styles.callbackCard}>
              <View style={styles.callbackHeader}>
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>{callback.customerName}</Text>
                  <Text style={styles.phoneNumber}>{callback.phoneNumber}</Text>
                </View>
                <View style={styles.badges}>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(callback.status) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        { color: getStatusColor(callback.status) },
                      ]}
                    >
                      {callback.status}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.priorityBadge,
                      { backgroundColor: getPriorityColor(callback.priority) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        { color: getPriorityColor(callback.priority) },
                      ]}
                    >
                      {callback.priority}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.callbackDetails}>
                <View style={styles.detailRow}>
                  <Calendar size={16} color="#64748B" />
                  <Text style={styles.detailText}>{callback.requestedTime}</Text>
                </View>
                <View style={styles.detailRow}>
                  <PhoneCall size={16} color="#64748B" />
                  <Text style={styles.detailText}>{callback.reason}</Text>
                </View>
                {callback.notes && (
                  <View style={styles.notesContainer}>
                    <Text style={styles.notesLabel}>Notes:</Text>
                    <Text style={styles.notesText}>{callback.notes}</Text>
                  </View>
                )}
              </View>

              {callback.status === 'pending' && (
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.scheduleButton}>
                    <CheckCircle size={18} color="#fff" />
                    <Text style={styles.scheduleButtonText}>Schedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton}>
                    <XCircle size={18} color="#EF4444" />
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '22%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  settingCard: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#fff',
  },
  callbackCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  callbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#64748B',
  },
  badges: {
    gap: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  callbackDetails: {
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  notesContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#0F172A',
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  scheduleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  scheduleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
});
