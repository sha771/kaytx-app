 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Users, MessageSquare, Phone, Calendar, Settings, Plus, Search, ListFilter, Clock } from 'lucide-react-native';

interface TeamCommunication {
  id: string;
  teamName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  members: number;
  status: 'active' | 'away' | 'busy';
}

const mockTeamChats: TeamCommunication[] = [
  {
    id: '1',
    teamName: 'Product Team',
    lastMessage: 'Let\'s review the new feature specs',
    timestamp: '2 min ago',
    unreadCount: 3,
    members: 8,
    status: 'active'
  },
  {
    id: '2',
    teamName: 'Marketing Team',
    lastMessage: 'Campaign results are looking great!',
    timestamp: '15 min ago',
    unreadCount: 0,
    members: 12,
    status: 'active'
  },
  {
    id: '3',
    teamName: 'Engineering Team',
    lastMessage: 'Code review needed for PR #234',
    timestamp: '1 hour ago',
    unreadCount: 5,
    members: 15,
    status: 'busy'
  }
];

export default function TeamCommunicationScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getStatusColor = (status: TeamCommunication['status']) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'away': return '#F59E0B';
      case 'busy': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Team Communication',
          headerStyle: { backgroundColor: '#1F2937' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search teams..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <ListFilter size={20} color="#3B82F6" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>New Team</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Users size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Active Teams</Text>
          </View>
          
          <View style={styles.statCard}>
            <MessageSquare size={24} color="#10B981" />
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Unread Messages</Text>
          </View>
          
          <View style={styles.statCard}>
            <Clock size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>35</Text>
            <Text style={styles.statLabel}>Total Members</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Chats</Text>
          
          {mockTeamChats.map((team) => (
            <TouchableOpacity key={team.id} style={styles.teamCard}>
              <View style={styles.teamHeader}>
                <View style={styles.teamInfo}>
                  <View style={styles.teamNameContainer}>
                    <Text style={styles.teamName}>{team.teamName}</Text>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(team.status) }]} />
                  </View>
                  <Text style={styles.memberCount}>{team.members} members</Text>
                </View>
                
                {team.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{team.unreadCount}</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.lastMessage}>{team.lastMessage}</Text>
              <Text style={styles.timestamp}>{team.timestamp}</Text>
              
              <View style={styles.teamActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <MessageSquare size={16} color="#3B82F6" />
                  <Text style={styles.actionText}>Chat</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Phone size={16} color="#10B981" />
                  <Text style={styles.actionText}>Call</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Settings size={16} color="#6B7280" />
                  <Text style={styles.actionText}>Settings</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Users size={24} color="#3B82F6" />
              <Text style={styles.actionCardText}>Create Team</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <MessageSquare size={24} color="#10B981" />
              <Text style={styles.actionCardText}>Broadcast Message</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Calendar size={24} color="#F59E0B" />
              <Text style={styles.actionCardText}>Schedule Meeting</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Settings size={24} color="#8B5CF6" />
              <Text style={styles.actionCardText}>Team Settings</Text>
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
  teamCard: {
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
  teamHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  teamInfo: {
    flex: 1,
  },
  teamNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  memberCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  lastMessage: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
  teamActions: {
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
});