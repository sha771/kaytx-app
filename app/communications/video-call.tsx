 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Users, Settings, Share2 } from 'lucide-react-native';

interface VideoCall {
  id: string;
  title: string;
  participants: number;
  duration: string;
  status: 'active' | 'scheduled' | 'ended';
  time: string;
}

const mockVideoCalls: VideoCall[] = [
  { id: '1', title: 'Team Standup', participants: 8, duration: '25:30', status: 'active', time: 'Now' },
  { id: '2', title: 'Client Presentation', participants: 5, duration: '0:00', status: 'scheduled', time: '2:00 PM' },
  { id: '3', title: 'Project Review', participants: 12, duration: '45:20', status: 'ended', time: '1 hour ago' },
  { id: '4', title: 'One-on-One', participants: 2, duration: '30:15', status: 'ended', time: 'Yesterday' },
];

export default function VideoCallScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'scheduled'>('all');

  const filteredCalls = mockVideoCalls.filter(call => {
    const matchesSearch = call.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || call.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'scheduled': return '#F59E0B';
      case 'ended': return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Video Calls</Text>
        <TouchableOpacity style={styles.newCallButton}>
          <Video size={20} color="#FFFFFF" />
          <Text style={styles.newCallText}>New Call</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search video calls..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.filterContainer}>
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
            style={[styles.filterChip, activeFilter === 'scheduled' && styles.activeFilter]}
            onPress={() => setActiveFilter('scheduled')}
          >
            <Text style={[styles.filterText, activeFilter === 'scheduled' && styles.activeFilterText]}>Scheduled</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.callsList}>
        {filteredCalls.map((call) => (
          <TouchableOpacity key={call.id} style={styles.callItem}>
            <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(call.status) }]} />
            <View style={styles.callContent}>
              <View style={styles.callHeader}>
                <Text style={styles.callTitle}>{call.title}</Text>
                <Text style={styles.callTime}>{call.time}</Text>
              </View>
              <View style={styles.callMeta}>
                <View style={styles.participantsInfo}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.participantsText}>{call.participants} participants</Text>
                </View>
                <Text style={styles.durationText}>{call.duration}</Text>
              </View>
              <View style={styles.callActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Share2 size={16} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Settings size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.controlsContainer}>
        <View style={styles.controls}>
          <TouchableOpacity 
            style={[styles.controlButton, !isVideoOn && styles.controlButtonOff]}
            onPress={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <Video size={24} color="#FFFFFF" /> : <VideoOff size={24} color="#FFFFFF" />}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, !isAudioOn && styles.controlButtonOff]}
            onPress={() => setIsAudioOn(!isAudioOn)}
          >
            {isAudioOn ? <Mic size={24} color="#FFFFFF" /> : <MicOff size={24} color="#FFFFFF" />}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.endCallButton}>
            <PhoneOff size={24} color="#FFFFFF" />
          </TouchableOpacity>
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
  newCallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  newCallText: {
    color: '#FFFFFF',
    fontWeight: '600' as const,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#111827',
  },
  filterContainer: {
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
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#6B7280',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  callsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  callItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  callContent: {
    flex: 1,
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  callTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#111827',
  },
  callTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  callMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  participantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  participantsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#111827',
  },
  callActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  controlsContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6B7280',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonOff: {
    backgroundColor: '#EF4444',
  },
  endCallButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
