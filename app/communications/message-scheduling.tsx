import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Calendar, Clock, Plus, Search, Filter, Users, MapPin, Bell } from 'lucide-react-native';

interface ScheduledMessage {
  id: string;
  recipient: string;
  message: string;
  scheduledTime: string;
  status: 'scheduled' | 'sent' | 'failed';
  type: 'sms' | 'email' | 'push';
}

const mockScheduledMessages: ScheduledMessage[] = [
  {
    id: '1',
    recipient: 'Marketing Team',
    message: 'Weekly newsletter ready for review',
    scheduledTime: '2024-01-15 09:00 AM',
    status: 'scheduled',
    type: 'email'
  },
  {
    id: '2',
    recipient: 'John Doe',
    message: 'Meeting reminder: Product review at 2 PM',
    scheduledTime: '2024-01-15 01:30 PM',
    status: 'scheduled',
    type: 'sms'
  },
  {
    id: '3',
    recipient: 'All Users',
    message: 'New feature announcement',
    scheduledTime: '2024-01-14 10:00 AM',
    status: 'sent',
    type: 'push'
  }
];

export default function MessageSchedulingScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getStatusColor = (status: ScheduledMessage['status']) => {
    switch (status) {
      case 'scheduled': return '#3B82F6';
      case 'sent': return '#10B981';
      case 'failed': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: ScheduledMessage['type']) => {
    switch (type) {
      case 'email': return '📧';
      case 'sms': return '💬';
      case 'push': return '🔔';
      default: return '📱';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Message Scheduling',
          headerStyle: { backgroundColor: '#1F2937' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search scheduled messages..."
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
            <Calendar size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Scheduled</Text>
          </View>
          
          <View style={styles.statCard}>
            <Clock size={24} color="#10B981" />
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Sent Today</Text>
          </View>
          
          <View style={styles.statCard}>
            <Bell size={24} color="#F59E0B" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Failed</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scheduled Messages</Text>
          
          {mockScheduledMessages.map((message) => (
            <TouchableOpacity key={message.id} style={styles.messageCard}>
              <View style={styles.messageHeader}>
                <View style={styles.messageInfo}>
                  <Text style={styles.messageType}>{getTypeIcon(message.type)}</Text>
                  <View style={styles.messageDetails}>
                    <Text style={styles.recipient}>{message.recipient}</Text>
                    <Text style={styles.scheduledTime}>{message.scheduledTime}</Text>
                  </View>
                </View>
                
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(message.status) }]}>
                  <Text style={styles.statusText}>{message.status.toUpperCase()}</Text>
                </View>
              </View>
              
              <Text style={styles.messageContent}>{message.message}</Text>
              
              <View style={styles.messageActions}>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Schedule</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Calendar size={24} color="#3B82F6" />
              <Text style={styles.actionText}>Schedule Email</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Clock size={24} color="#10B981" />
              <Text style={styles.actionText}>Schedule SMS</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Bell size={24} color="#F59E0B" />
              <Text style={styles.actionText}>Schedule Push</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Users size={24} color="#8B5CF6" />
              <Text style={styles.actionText}>Bulk Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.templates}>
          <Text style={styles.sectionTitle}>Message Templates</Text>
          
          <View style={styles.templateList}>
            <TouchableOpacity style={styles.templateCard}>
              <MapPin size={20} color="#3B82F6" />
              <View style={styles.templateInfo}>
                <Text style={styles.templateName}>Meeting Reminder</Text>
                <Text style={styles.templateDescription}>Remind about upcoming meetings</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.templateCard}>
              <Bell size={20} color="#10B981" />
              <View style={styles.templateInfo}>
                <Text style={styles.templateName}>Weekly Update</Text>
                <Text style={styles.templateDescription}>Send weekly team updates</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.templateCard}>
              <Users size={20} color="#F59E0B" />
              <View style={styles.templateInfo}>
                <Text style={styles.templateName}>Event Invitation</Text>
                <Text style={styles.templateDescription}>Invite to company events</Text>
              </View>
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
  messageCard: {
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
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  messageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  messageType: {
    fontSize: 24,
    marginRight: 12,
  },
  messageDetails: {
    flex: 1,
  },
  recipient: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  scheduledTime: {
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
  messageContent: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
    lineHeight: 20,
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#EBF4FF',
    marginRight: 8,
  },
  editButtonText: {
    color: '#3B82F6',
    fontWeight: '500',
    fontSize: 12,
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FEF2F2',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontWeight: '500',
    fontSize: 12,
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
  templates: {
    marginBottom: 24,
  },
  templateList: {
    gap: 8,
  },
  templateCard: {
    flexDirection: 'row',
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
  templateInfo: {
    marginLeft: 12,
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  templateDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
});