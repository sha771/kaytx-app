import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Phone, Users, Clock, BarChart3, Settings, Plus, Search, Filter, PhoneCall } from 'lucide-react-native';

interface CallCenter {
  id: string;
  agentName: string;
  status: 'available' | 'busy' | 'break' | 'offline';
  currentCall?: string;
  callsHandled: number;
  avgCallTime: string;
  rating: number;
}

const mockAgents: CallCenter[] = [
  {
    id: '1',
    agentName: 'Sarah Johnson',
    status: 'busy',
    currentCall: 'Customer Support - Billing Issue',
    callsHandled: 23,
    avgCallTime: '4:32',
    rating: 4.8
  },
  {
    id: '2',
    agentName: 'Mike Chen',
    status: 'available',
    callsHandled: 18,
    avgCallTime: '3:45',
    rating: 4.6
  },
  {
    id: '3',
    agentName: 'Emily Davis',
    status: 'break',
    callsHandled: 31,
    avgCallTime: '5:12',
    rating: 4.9
  }
];

export default function CallCenterScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getStatusColor = (status: CallCenter['status']) => {
    switch (status) {
      case 'available': return '#10B981';
      case 'busy': return '#EF4444';
      case 'break': return '#F59E0B';
      case 'offline': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: CallCenter['status']) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'On Call';
      case 'break': return 'On Break';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Call Center',
          headerStyle: { backgroundColor: '#1F2937' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search agents..."
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
            <Text style={styles.addButtonText}>Add Agent</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Users size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Total Agents</Text>
          </View>
          
          <View style={styles.statCard}>
            <PhoneCall size={24} color="#10B981" />
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Active Calls</Text>
          </View>
          
          <View style={styles.statCard}>
            <Clock size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>4:23</Text>
            <Text style={styles.statLabel}>Avg Call Time</Text>
          </View>
          
          <View style={styles.statCard}>
            <BarChart3 size={24} color="#8B5CF6" />
            <Text style={styles.statNumber}>72</Text>
            <Text style={styles.statLabel}>Calls Today</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agents</Text>
          
          {mockAgents.map((agent) => (
            <TouchableOpacity key={agent.id} style={styles.agentCard}>
              <View style={styles.agentHeader}>
                <View style={styles.agentInfo}>
                  <Text style={styles.agentName}>{agent.agentName}</Text>
                  <View style={styles.statusContainer}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(agent.status) }]} />
                    <Text style={styles.statusText}>{getStatusText(agent.status)}</Text>
                  </View>
                </View>
                
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>⭐ {agent.rating}</Text>
                </View>
              </View>
              
              {agent.currentCall && (
                <View style={styles.currentCallContainer}>
                  <Phone size={16} color="#3B82F6" />
                  <Text style={styles.currentCall}>{agent.currentCall}</Text>
                </View>
              )}
              
              <View style={styles.agentStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{agent.callsHandled}</Text>
                  <Text style={styles.statLabel}>Calls Handled</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{agent.avgCallTime}</Text>
                  <Text style={styles.statLabel}>Avg Call Time</Text>
                </View>
              </View>
              
              <View style={styles.agentActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Phone size={16} color="#3B82F6" />
                  <Text style={styles.actionText}>Call</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <BarChart3 size={16} color="#10B981" />
                  <Text style={styles.actionText}>Stats</Text>
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
              <Phone size={24} color="#3B82F6" />
              <Text style={styles.actionCardText}>Make Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Users size={24} color="#10B981" />
              <Text style={styles.actionCardText}>Manage Queue</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <BarChart3 size={24} color="#F59E0B" />
              <Text style={styles.actionCardText}>View Reports</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Settings size={24} color="#8B5CF6" />
              <Text style={styles.actionCardText}>Call Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.callQueue}>
          <Text style={styles.sectionTitle}>Call Queue</Text>
          
          <View style={styles.queueStats}>
            <View style={styles.queueItem}>
              <Text style={styles.queueNumber}>5</Text>
              <Text style={styles.queueLabel}>Waiting</Text>
            </View>
            
            <View style={styles.queueItem}>
              <Text style={styles.queueNumber}>2:34</Text>
              <Text style={styles.queueLabel}>Avg Wait Time</Text>
            </View>
            
            <View style={styles.queueItem}>
              <Text style={styles.queueNumber}>12</Text>
              <Text style={styles.queueLabel}>Completed</Text>
            </View>
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
    fontSize: 20,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  agentCard: {
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
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  currentCallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF4FF',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  currentCall: {
    marginLeft: 8,
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  agentStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  agentActions: {
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
  callQueue: {
    marginBottom: 24,
  },
  queueStats: {
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
  queueItem: {
    alignItems: 'center',
  },
  queueNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  queueLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});