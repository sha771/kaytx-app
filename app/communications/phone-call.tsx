 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, PhoneCall, PhoneIncoming, PhoneOutgoing, Clock, User, Search } from 'lucide-react-native';

interface CallRecord {
  id: string;
  name: string;
  number: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration: string;
  time: string;
}

const mockCalls: CallRecord[] = [
  { id: '1', name: 'John Smith', number: '+1 (555) 123-4567', type: 'incoming', duration: '5:23', time: '2 hours ago' },
  { id: '2', name: 'Sarah Johnson', number: '+1 (555) 987-6543', type: 'outgoing', duration: '12:45', time: '4 hours ago' },
  { id: '3', name: 'Mike Wilson', number: '+1 (555) 456-7890', type: 'missed', duration: '0:00', time: '1 day ago' },
  { id: '4', name: 'Emily Davis', number: '+1 (555) 321-0987', type: 'incoming', duration: '8:12', time: '2 days ago' },
];

export default function PhoneCallScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'missed'>('all');

  const filteredCalls = mockCalls.filter(call => 
    (activeTab === 'all' || call.type === 'missed') &&
    (call.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     call.number.includes(searchQuery))
  );

  const getCallIcon = (type: string) => {
    switch (type) {
      case 'incoming': return <PhoneIncoming size={20} color="#10B981" />;
      case 'outgoing': return <PhoneOutgoing size={20} color="#3B82F6" />;
      case 'missed': return <PhoneIncoming size={20} color="#EF4444" />;
      default: return <Phone size={20} color="#6B7280" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Phone Calls</Text>
        <TouchableOpacity style={styles.newCallButton}>
          <PhoneCall size={20} color="#FFFFFF" />
          <Text style={styles.newCallText}>New Call</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts or numbers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>All Calls</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'missed' && styles.activeTab]}
          onPress={() => setActiveTab('missed')}
        >
          <Text style={[styles.tabText, activeTab === 'missed' && styles.activeTabText]}>Missed</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.callsList}>
        {filteredCalls.map((call) => (
          <TouchableOpacity key={call.id} style={styles.callItem}>
            <View style={styles.callIcon}>
              {getCallIcon(call.type)}
            </View>
            <View style={styles.callInfo}>
              <Text style={styles.callName}>{call.name}</Text>
              <Text style={styles.callNumber}>{call.number}</Text>
            </View>
            <View style={styles.callMeta}>
              <Text style={styles.callTime}>{call.time}</Text>
              <Text style={styles.callDuration}>{call.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.dialPad}>
        <TouchableOpacity style={styles.dialButton}>
          <Phone size={24} color="#FFFFFF" />
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
  newCallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#6B7280',
  },
  activeTabText: {
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
  callIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  callInfo: {
    flex: 1,
  },
  callName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#111827',
    marginBottom: 4,
  },
  callNumber: {
    fontSize: 14,
    color: '#6B7280',
  },
  callMeta: {
    alignItems: 'flex-end',
  },
  callTime: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  callDuration: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#111827',
  },
  dialPad: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  dialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
