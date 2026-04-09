 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Video, Users, Calendar, Clock, Settings, Plus, Search, Filter } from 'lucide-react-native';

interface Conference {
  id: string;
  title: string;
  participants: number;
  duration: string;
  status: 'scheduled' | 'live' | 'ended';
  date: string;
  time: string;
}

const mockConferences: Conference[] = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    participants: 12,
    duration: '30 min',
    status: 'live',
    date: '2024-01-15',
    time: '10:00 AM'
  },
  {
    id: '2',
    title: 'Product Strategy Meeting',
    participants: 8,
    duration: '60 min',
    status: 'scheduled',
    date: '2024-01-15',
    time: '2:00 PM'
  },
  {
    id: '3',
    title: 'Client Presentation',
    participants: 15,
    duration: '45 min',
    status: 'ended',
    date: '2024-01-14',
    time: '3:00 PM'
  }
];

export default function ConferenceScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const getStatusColor = (status: Conference['status']) => {
    switch (status) {
      case 'live': return '#10B981';
      case 'scheduled': return '#3B82F6';
      case 'ended': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: Conference['status']) => {
    switch (status) {
      case 'live': return 'Live Now';
      case 'scheduled': return 'Scheduled';
      case 'ended': return 'Ended';
      default: return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Conference',
          headerStyle: { backgroundColor: '#1F2937' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conferences..."
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
            <Text style={styles.addButtonText}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Video size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Active Conferences</Text>
          </View>
          
          <View style={styles.statCard}>
            <Users size={24} color="#10B981" />
            <Text style={styles.statNumber}>35</Text>
            <Text style={styles.statLabel}>Total Participants</Text>
          </View>
          
          <View style={styles.statCard}>
            <Clock size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>2.5h</Text>
            <Text style={styles.statLabel}>Total Duration</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conferences</Text>
          
          {mockConferences.map((conference) => (
            <TouchableOpacity key={conference.id} style={styles.conferenceCard}>
              <View style={styles.conferenceHeader}>
                <Text style={styles.conferenceTitle}>{conference.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(conference.status) }]}>
                  <Text style={styles.statusText}>{getStatusText(conference.status)}</Text>
                </View>
              </View>
              
              <View style={styles.conferenceDetails}>
                <View style={styles.detailItem}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{conference.participants} participants</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{conference.duration}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{conference.date} at {conference.time}</Text>
                </View>
              </View>
              
              <View style={styles.conferenceActions}>
                {conference.status === 'live' && (
                  <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Join Now</Text>
                  </TouchableOpacity>
                )}
                
                {conference.status === 'scheduled' && (
                  <TouchableOpacity style={styles.editButton}>
                    <Settings size={16} color="#6B7280" />
                    <Text style={styles.editButtonText}>Edit</Text>
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
              <Video size={24} color="#3B82F6" />
              <Text style={styles.actionText}>Start Instant Meeting</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Calendar size={24} color="#10B981" />
              <Text style={styles.actionText}>Schedule Conference</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Users size={24} color="#F59E0B" />
              <Text style={styles.actionText}>Manage Participants</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Settings size={24} color="#8B5CF6" />
              <Text style={styles.actionText}>Conference Settings</Text>
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
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
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
  conferenceCard: {
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
  conferenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  conferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  conferenceDetails: {
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
  conferenceActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  joinButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  editButtonText: {
    marginLeft: 4,
    color: '#6B7280',
    fontWeight: '500',
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
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    textAlign: 'center',
  },
});