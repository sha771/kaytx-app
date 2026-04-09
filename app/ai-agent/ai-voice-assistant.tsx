 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Bot, Mic, Phone, MessageSquare, Settings, Plus, Search, Filter, Clock, Users } from 'lucide-react-native';
import { trpc } from '@/lib/trpc';

interface AIVoiceAssistant {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'training';
  language: string;
  callsHandled: number;
  accuracy: number;
  lastActive: string;
}

export default function AIVoiceAssistantScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: agentsData } = trpc.aiAgents.getAllAgents.useQuery();
  const { data: activityData } = trpc.aiAgents.getAgentActivity.useQuery({ limit: 300 });

  const activities = activityData?.activities ?? [];

  const getRelativeTime = (isoTimestamp?: string) => {
    if (!isoTimestamp) return '—';
    const ts = new Date(isoTimestamp).getTime();
    const delta = Date.now() - ts;
    if (delta < 60 * 1000) return 'Just now';
    if (delta < 60 * 60 * 1000) return `${Math.floor(delta / (60 * 1000))} min ago`;
    if (delta < 24 * 60 * 60 * 1000) return `${Math.floor(delta / (60 * 60 * 1000))} hour ago`;
    return `${Math.floor(delta / (24 * 60 * 60 * 1000))} day ago`;
  };

  const assistants: AIVoiceAssistant[] = (agentsData?.agents ?? []).map((a: any) => {
    const last = activities.find((ev: any) => ev.agentId === a.id);
    const status: AIVoiceAssistant['status'] = a.status === 'active' ? 'active' : a.status === 'draft' ? 'training' : 'inactive';

    return {
      id: a.id,
      name: a.name,
      status,
      language: a.config?.language || 'English',
      callsHandled: typeof a.totalCalls === 'number' ? a.totalCalls : 0,
      accuracy: typeof a.successRate === 'number' ? a.successRate : 0,
      lastActive: getRelativeTime(last?.timestamp),
    };
  });

  const filteredAssistants = assistants.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAssistants = assistants.length;
  const totalCalls = assistants.reduce((sum, a) => sum + (a.callsHandled || 0), 0);
  const avgAccuracy = totalAssistants
    ? assistants.reduce((sum, a) => sum + (a.accuracy || 0), 0) / totalAssistants
    : 0;
  const activeNow = assistants.filter(a => a.status === 'active').length;

  const getStatusColor = (status: AIVoiceAssistant['status']) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'inactive': return '#6B7280';
      case 'training': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: AIVoiceAssistant['status']) => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'training': return 'Training';
      default: return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'AI Voice Assistant',
          headerStyle: { backgroundColor: '#1F2937' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search assistants..."
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
            <Text style={styles.addButtonText}>Create Assistant</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Bot size={24} color="#3B82F6" />
            <Text style={styles.statNumber}>{totalAssistants.toLocaleString()}</Text>
            <Text style={styles.statLabel}>AI Assistants</Text>
          </View>
          
          <View style={styles.statCard}>
            <Phone size={24} color="#10B981" />
            <Text style={styles.statNumber}>{totalCalls.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Calls Handled</Text>
          </View>
          
          <View style={styles.statCard}>
            <Mic size={22} color="#F59E0B" />
            <Text style={styles.statNumber}>{avgAccuracy.toFixed(1)}%</Text>
            <Text style={styles.statLabel}>Avg Accuracy</Text>
          </View>
          
          <View style={styles.statCard}>
            <Clock size={24} color="#8B5CF6" />
            <Text style={styles.statNumber}>{activeNow.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Active Now</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Assistants</Text>
          
          {filteredAssistants.map((assistant) => (
            <TouchableOpacity key={assistant.id} style={styles.assistantCard}>
              <View style={styles.assistantHeader}>
                <View style={styles.assistantInfo}>
                  <Text style={styles.assistantName}>{assistant.name}</Text>
                  <View style={styles.statusContainer}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(assistant.status) }]} />
                    <Text style={styles.statusText}>{getStatusText(assistant.status)}</Text>
                  </View>
                </View>
                
                <View style={styles.accuracyContainer}>
                  <Text style={styles.accuracy}>{assistant.accuracy}%</Text>
                  <Text style={styles.accuracyLabel}>Accuracy</Text>
                </View>
              </View>
              
              <View style={styles.assistantDetails}>
                <View style={styles.detailItem}>
                  <MessageSquare size={16} color="#6B7280" />
                  <Text style={styles.detailText}>Language: {assistant.language}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Phone size={16} color="#6B7280" />
                  <Text style={styles.detailText}>Calls: {assistant.callsHandled}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.detailText}>Last active: {assistant.lastActive}</Text>
                </View>
              </View>
              
              <View style={styles.assistantActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Mic size={16} color="#3B82F6" />
                  <Text style={styles.actionText}>Test Voice</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionButton}>
                  <Bot size={16} color="#10B981" />
                  <Text style={styles.actionText}>Train</Text>
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
              <Bot size={24} color="#3B82F6" />
              <Text style={styles.actionCardText}>Create New Assistant</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Mic size={24} color="#10B981" />
              <Text style={styles.actionCardText}>Voice Training</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Phone size={24} color="#F59E0B" />
              <Text style={styles.actionCardText}>Call Analytics</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Settings size={24} color="#8B5CF6" />
              <Text style={styles.actionCardText}>Global Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.features}>
          <Text style={styles.sectionTitle}>AI Features</Text>
          
          <View style={styles.featureList}>
            <TouchableOpacity style={styles.featureCard}>
              <MessageSquare size={20} color="#3B82F6" />
              <View style={styles.featureInfo}>
                <Text style={styles.featureName}>Natural Language Processing</Text>
                <Text style={styles.featureDescription}>Advanced NLP for better understanding</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.featureCard}>
              <Users size={20} color="#10B981" />
              <View style={styles.featureInfo}>
                <Text style={styles.featureName}>Multi-Language Support</Text>
                <Text style={styles.featureDescription}>Support for 50+ languages</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.featureCard}>
              <Bot size={20} color="#F59E0B" />
              <View style={styles.featureInfo}>
                <Text style={styles.featureName}>Continuous Learning</Text>
                <Text style={styles.featureDescription}>AI improves with each interaction</Text>
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
  assistantCard: {
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
  assistantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  assistantInfo: {
    flex: 1,
  },
  assistantName: {
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
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
  },
  accuracyContainer: {
    alignItems: 'flex-end',
  },
  accuracy: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B981',
  },
  accuracyLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  assistantDetails: {
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
  assistantActions: {
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
  features: {
    marginBottom: 24,
  },
  featureList: {
    gap: 8,
  },
  featureCard: {
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
  featureInfo: {
    marginLeft: 12,
    flex: 1,
  },
  featureName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
});