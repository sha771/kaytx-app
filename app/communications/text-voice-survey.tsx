 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { MessageSquare, Phone, Star, ChartBar, Users, Clock } from 'lucide-react-native';

interface Survey {
  id: string;
  title: string;
  type: 'text' | 'voice';
  responses: number;
  completion: number;
  status: 'active' | 'draft' | 'completed';
  createdAt: string;
}

const mockSurveys: Survey[] = [
  {
    id: '1',
    title: 'Customer Satisfaction Survey',
    type: 'text',
    responses: 245,
    completion: 78,
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Product Feedback Call',
    type: 'voice',
    responses: 89,
    completion: 65,
    status: 'active',
    createdAt: '2024-01-10'
  }
];

export default function TextVoiceSurveyScreen() {
  const [surveys, setSurveys] = useState<Survey[]>(mockSurveys);
  const [activeTab, setActiveTab] = useState<'text' | 'voice'>('text');

  const SurveyCard = ({ survey }: { survey: Survey }) => (
    <TouchableOpacity style={styles.surveyCard}>
      <View style={styles.surveyHeader}>
        <View style={styles.surveyInfo}>
          {survey.type === 'text' ? (
            <MessageSquare size={24} color="#007AFF" />
          ) : (
            <Phone size={24} color="#34C759" />
          )}
          <View style={styles.surveyDetails}>
            <Text style={styles.surveyTitle}>{survey.title}</Text>
            <Text style={styles.surveyDate}>Created {survey.createdAt}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { 
          backgroundColor: survey.status === 'active' ? '#34C759' : 
                          survey.status === 'draft' ? '#FF9500' : '#8E8E93' 
        }]}>
          <Text style={styles.statusText}>{survey.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.surveyStats}>
        <View style={styles.stat}>
          <Users size={16} color="#666" />
          <Text style={styles.statValue}>{survey.responses}</Text>
          <Text style={styles.statLabel}>Responses</Text>
        </View>
        <View style={styles.stat}>
          <ChartBarBig size={16} color="#666" />
          <Text style={styles.statValue}>{survey.completion}%</Text>
          <Text style={styles.statLabel}>Completion</Text>
        </View>
        <View style={styles.stat}>
          <Star size={16} color="#666" />
          <Text style={styles.statValue}>4.2</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredSurveys = surveys.filter(survey => survey.type === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Text & Voice Surveys',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#1a1a1a', fontWeight: '600' }
        }} 
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <MessageSquare size={28} color="#007AFF" />
            <View>
              <Text style={styles.title}>Survey Management</Text>
              <Text style={styles.subtitle}>Create and manage text & voice surveys</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'text' && styles.activeTab]}
            onPress={() => setActiveTab('text')}
          >
            <MessageSquare size={20} color={activeTab === 'text' ? '#fff' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'text' && styles.activeTabText]}>
              Text Surveys
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'voice' && styles.activeTab]}
            onPress={() => setActiveTab('voice')}
          >
            <Phone size={20} color={activeTab === 'voice' ? '#fff' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'voice' && styles.activeTabText]}>
              Voice Surveys
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {activeTab === 'text' ? 'Text' : 'Voice'} Surveys
            </Text>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>Create New</Text>
            </TouchableOpacity>
          </View>
          
          {filteredSurveys.map(survey => (
            <SurveyCard key={survey.id} survey={survey} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <MessageSquare size={24} color="#007AFF" />
              <Text style={styles.quickActionText}>SMS Survey</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Phone size={24} color="#34C759" />
              <Text style={styles.quickActionText}>Voice Survey</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <ChartBarBig size={24} color="#FF9500" />
              <Text style={styles.quickActionText}>Analytics</Text>
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
    backgroundColor: '#f8f9fa'
  },
  content: {
    flex: 1,
    padding: 16
  },
  header: {
    marginBottom: 24
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a'
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8
  },
  activeTab: {
    backgroundColor: '#007AFF'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666'
  },
  activeTabText: {
    color: '#fff'
  },
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  createButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14
  },
  surveyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  surveyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  surveyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1
  },
  surveyDetails: {
    flex: 1
  },
  surveyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  surveyDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600'
  },
  surveyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  stat: {
    alignItems: 'center',
    gap: 4
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a'
  },
  statLabel: {
    fontSize: 12,
    color: '#666'
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9'
  },
  quickActionText: {
    fontSize: 12,
    color: '#1a1a1a',
    fontWeight: '500',
    textAlign: 'center'
  }
});