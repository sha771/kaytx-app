import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Calendar, Clock, Users, MapPin, Settings, Plus, Search, Filter, Bell, CheckCircle } from 'lucide-react-native';

interface ScheduleEvent {
  id: string;
  title: string;
  type: 'meeting' | 'call' | 'task' | 'reminder';
  date: string;
  time: string;
  duration: string;
  attendees?: number;
  location?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const mockEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Team Standup Meeting',
    type: 'meeting',
    date: '2024-01-15',
    time: '09:00 AM',
    duration: '30 min',
    attendees: 8,
    location: 'Conference Room A',
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Client Call - Project Review',
    type: 'call',
    date: '2024-01-15',
    time: '02:00 PM',
    duration: '60 min',
    attendees: 4,
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Submit Monthly Report',
    type: 'task',
    date: '2024-01-15',
    time: '05:00 PM',
    duration: '120 min',
    status: 'scheduled'
  },
  {
    id: '4',
    title: 'Follow up with leads',
    type: 'reminder',
    date: '2024-01-14',
    time: '10:00 AM',
    duration: '15 min',
    status: 'completed'
  }
];

export default function SchedulingCalendarScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('2024-01-15');

  const getTypeColor = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'meeting': return '#3B82F6';
      case 'call': return '#10B981';
      case 'task': return '#F59E0B';
      case 'reminder': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: ScheduleEvent['type']) => {
    switch (type) {
      case 'meeting': return <Users size={16} color="#FFFFFF" />;
      case 'call': return <Bell size={16} color="#FFFFFF" />;
      case 'task': return <CheckCircle size={16} color="#FFFFFF" />;
      case 'reminder': return <Clock size={16} color="#FFFFFF" />;
      default: return <Calendar size={16} color="#FFFFFF" />;
    }
  };

  const getStatusColor = (status: ScheduleEvent['status']) => {
    switch (status) {
      case 'scheduled': return '#3B82F6';
      case 'completed': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Scheduling & Calendar',
          headerStyle: { backgroundColor: '#1F2937' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#3B82F6" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Event</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Calendar size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Today's Events</Text>
          </View>
          
          <View style={styles.statCard}>
            <Clock size={24} color="#10B981" />
            <Text style={styles.statNumber}>3h 45m</Text>
            <Text style={styles.statLabel}>Total Duration</Text>
          </View>
          
          <View style={styles.statCard}>
            <Users size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Attendees</Text>
          </View>
          
          <View style={styles.statCard}>
            <CheckCircle size={24} color="#8B5CF6" />
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <Text style={styles.sectionTitle}>Calendar View</Text>
          
          <View style={styles.dateSelector}>
            <TouchableOpacity style={styles.dateButton}>
              <Text style={styles.dateButtonText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateButton}>
              <Text style={styles.dateButtonText}>Tomorrow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateButton}>
              <Text style={styles.dateButtonText}>This Week</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          
          {mockEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <View style={[styles.typeIcon, { backgroundColor: getTypeColor(event.type) }]}>
                  {getTypeIcon(event.type)}
                </View>
                
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventTime}>{event.date} at {event.time}</Text>
                </View>
                
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(event.status) }]}>
                  <Text style={styles.statusText}>{event.status.toUpperCase()}</Text>
                </View>
              </View>
              
              <View style={styles.eventDetails}>
                <View style={styles.detailItem}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.detailText}>Duration: {event.duration}</Text>
                </View>
                
                {event.attendees && (
                  <View style={styles.detailItem}>
                    <Users size={16} color="#6B7280" />
                    <Text style={styles.detailText}>Attendees: {event.attendees}</Text>
                  </View>
                )}
                
                {event.location && (
                  <View style={styles.detailItem}>
                    <MapPin size={16} color="#6B7280" />
                    <Text style={styles.detailText}>Location: {event.location}</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.eventActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Calendar size={16} color="#3B82F6" />
                  <Text style={styles.actionText}>Reschedule</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Settings size={16} color="#6B7280" />
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                
                {event.status === 'scheduled' && (
                  <TouchableOpacity style={styles.actionButton}>
                    <CheckCircle size={16} color="#10B981" />
                    <Text style={styles.actionText}>Complete</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Users size={24} color="#3B82F6" />
              <Text style={styles.actionCardText}>Schedule Meeting</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Bell size={24} color="#10B981" />
              <Text style={styles.actionCardText}>Set Reminder</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <CheckCircle size={24} color="#F59E0B" />
              <Text style={styles.actionCardText}>Add Task</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Calendar size={24} color="#8B5CF6" />
              <Text style={styles.actionCardText}>View Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.timeSlots}>
          <Text style={styles.sectionTitle}>Available Time Slots</Text>
          
          <View style={styles.slotGrid}>
            <TouchableOpacity style={styles.timeSlot}>
              <Text style={styles.slotTime}>10:00 AM</Text>
              <Text style={styles.slotDuration}>30 min</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeSlot}>
              <Text style={styles.slotTime}>11:30 AM</Text>
              <Text style={styles.slotDuration}>60 min</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeSlot}>
              <Text style={styles.slotTime}>03:00 PM</Text>
              <Text style={styles.slotDuration}>45 min</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timeSlot}>
              <Text style={styles.slotTime}>04:30 PM</Text>
              <Text style={styles.slotDuration}>30 min</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EBF4FF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  calendarContainer: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  dateButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  eventDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#4B5563',
  },
  quickActions: {
    marginBottom: 24,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionCardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
  timeSlots: {
    marginBottom: 24,
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  slotTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  slotDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
});