 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, Plus, Search, ListFilter, Users, MapPin, Bell, Video } from 'lucide-react-native';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  attendees: number;
  location: string;
  type: 'in-person' | 'video' | 'phone';
  status: 'upcoming' | 'ongoing' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Team Standup',
    date: 'Today',
    time: '9:00 AM',
    duration: '30 min',
    attendees: 8,
    location: 'Conference Room A',
    type: 'in-person',
    status: 'upcoming',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Client Presentation',
    date: 'Today',
    time: '2:00 PM',
    duration: '1 hour',
    attendees: 5,
    location: 'Zoom Meeting',
    type: 'video',
    status: 'upcoming',
    priority: 'high'
  },
  {
    id: '3',
    title: 'Project Review',
    date: 'Tomorrow',
    time: '10:30 AM',
    duration: '45 min',
    attendees: 12,
    location: 'Main Conference Room',
    type: 'in-person',
    status: 'upcoming',
    priority: 'medium'
  },
];

export default function MeetingScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'upcoming' | 'completed'>('all');
  const [selectedView, setSelectedView] = useState<'list' | 'calendar'>('list');

  const filteredMeetings = mockMeetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'today' && meeting.date === 'Today') ||
                         meeting.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#3B82F6';
      case 'ongoing': return '#10B981';
      case 'completed': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} color="#8B5CF6" />;
      case 'phone': return <Bell size={16} color="#10B981" />;
      case 'in-person': return <MapPin size={16} color="#3B82F6" />;
      default: return <Calendar size={16} color="#6B7280" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meetings</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addText}>Schedule</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.viewToggle}>
        <TouchableOpacity 
          style={[styles.viewButton, selectedView === 'list' && styles.activeViewButton]}
          onPress={() => setSelectedView('list')}
        >
          <Text style={[styles.viewButtonText, selectedView === 'list' && styles.activeViewButtonText]}>List</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.viewButton, selectedView === 'calendar' && styles.activeViewButton]}
          onPress={() => setSelectedView('calendar')}
        >
          <Calendar size={16} color={selectedView === 'calendar' ? "#FFFFFF" : "#6B7280"} />
          <Text style={[styles.viewButtonText, selectedView === 'calendar' && styles.activeViewButtonText]}>Calendar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search meetings..."
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
            style={[styles.filterChip, activeFilter === 'today' && styles.activeFilter]}
            onPress={() => setActiveFilter('today')}
          >
            <Text style={[styles.filterText, activeFilter === 'today' && styles.activeFilterText]}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'upcoming' && styles.activeFilter]}
            onPress={() => setActiveFilter('upcoming')}
          >
            <Text style={[styles.filterText, activeFilter === 'upcoming' && styles.activeFilterText]}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterChip, activeFilter === 'completed' && styles.activeFilter]}
            onPress={() => setActiveFilter('completed')}
          >
            <Text style={[styles.filterText, activeFilter === 'completed' && styles.activeFilterText]}>Completed</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.meetingsList}>
        {filteredMeetings.map((meeting) => (
          <TouchableOpacity key={meeting.id} style={styles.meetingCard}>
            <View style={styles.meetingHeader}>
              <View style={styles.meetingInfo}>
                <Text style={styles.meetingTitle}>{meeting.title}</Text>
                <View style={styles.meetingMeta}>
                  <Text style={styles.meetingDate}>{meeting.date}</Text>
                  <View style={styles.separator} />
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.meetingTime}>{meeting.time}</Text>
                  <View style={styles.separator} />
                  <Text style={styles.meetingDuration}>{meeting.duration}</Text>
                </View>
              </View>
              <View style={styles.meetingBadges}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(meeting.status) }]}>
                  <Text style={styles.statusText}>{meeting.status}</Text>
                </View>
                <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(meeting.priority) }]} />
              </View>
            </View>

            <View style={styles.meetingDetails}>
              <View style={styles.locationContainer}>
                {getTypeIcon(meeting.type)}
                <Text style={styles.locationText}>{meeting.location}</Text>
              </View>
              <View style={styles.attendeesContainer}>
                <Users size={16} color="#6B7280" />
                <Text style={styles.attendeesText}>{meeting.attendees} attendees</Text>
              </View>
            </View>

            <View style={styles.meetingActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Join</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Details</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
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
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 8,
    padding: 4,
  },
  viewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  activeViewButton: {
    backgroundColor: '#3B82F6',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#6B7280',
  },
  activeViewButtonText: {
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
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
    marginBottom: 16,
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
  meetingsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  meetingCard: {
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
  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  meetingInfo: {
    flex: 1,
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#111827',
    marginBottom: 8,
  },
  meetingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  meetingDate: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600' as const,
  },
  meetingTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  meetingDuration: {
    fontSize: 14,
    color: '#6B7280',
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
  },
  meetingBadges: {
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
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  meetingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
  },
  attendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  attendeesText: {
    fontSize: 14,
    color: '#6B7280',
  },
  meetingActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#374151',
  },
  quickActions: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  quickActionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
