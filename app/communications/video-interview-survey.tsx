 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Video, Play, Users, Star, Calendar, BarChart3 } from 'lucide-react-native';

interface VideoSurvey {
  id: string;
  title: string;
  type: 'interview' | 'survey';
  participants: number;
  duration: string;
  status: 'scheduled' | 'active' | 'completed';
  scheduledDate: string;
  rating: number;
}

const mockVideoSurveys: VideoSurvey[] = [
  {
    id: '1',
    title: 'Product Demo Interview',
    type: 'interview',
    participants: 12,
    duration: '45 min',
    status: 'scheduled',
    scheduledDate: '2024-01-20',
    rating: 4.5
  },
  {
    id: '2',
    title: 'User Experience Survey',
    type: 'survey',
    participants: 28,
    duration: '30 min',
    status: 'completed',
    scheduledDate: '2024-01-15',
    rating: 4.2
  }
];

export default function VideoInterviewSurveyScreen() {
  const [surveys, setSurveys] = useState<VideoSurvey[]>(mockVideoSurveys);
  const [activeTab, setActiveTab] = useState<'interview' | 'survey'>('interview');

  const VideoSurveyCard = ({ survey }: { survey: VideoSurvey }) => (
    <TouchableOpacity style={styles.surveyCard}>
      <View style={styles.surveyHeader}>
        <View style={styles.surveyInfo}>
          <Video size={24} color="#007AFF" />
          <View style={styles.surveyDetails}>
            <Text style={styles.surveyTitle}>{survey.title}</Text>
            <Text style={styles.surveyDate}>Scheduled for {survey.scheduledDate}</Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { 
          backgroundColor: survey.status === 'active' ? '#34C759' : 
                          survey.status === 'scheduled' ? '#FF9500' : '#8E8E93' 
        }]}>
          <Text style={styles.statusText}>{survey.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.surveyStats}>
        <View style={styles.stat}>
          <Users size={16} color="#666" />
          <Text style={styles.statValue}>{survey.participants}</Text>
          <Text style={styles.statLabel}>Participants</Text>
        </View>
        <View style={styles.stat}>
          <Play size={16} color="#666" />
          <Text style={styles.statValue}>{survey.duration}</Text>
          <Text style={styles.statLabel}>Duration</Text>
        </View>
        <View style={styles.stat}>
          <Star size={16} color="#666" />
          <Text style={styles.statValue}>{survey.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
      
      <View style={styles.surveyActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Play size={16} color="#007AFF" />
          <Text style={styles.actionText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Calendar size={16} color="#007AFF" />
          <Text style={styles.actionText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <BarChart3 size={16} color="#007AFF" />
          <Text style={styles.actionText}>Analytics</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const filteredSurveys = surveys.filter(survey => survey.type === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Video Interview & Survey',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#1a1a1a', fontWeight: '600' }
        }} 
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Video size={28} color="#007AFF" />
            <View>
              <Text style={styles.title}>Video Research</Text>
              <Text style={styles.subtitle}>Conduct interviews and video surveys</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'interview' && styles.activeTab]}
            onPress={() => setActiveTab('interview')}
          >
            <Video size={20} color={activeTab === 'interview' ? '#fff' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'interview' && styles.activeTabText]}>
              Interviews
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'survey' && styles.activeTab]}
            onPress={() => setActiveTab('survey')}
          >
            <BarChart3 size={20} color={activeTab === 'survey' ? '#fff' : '#666'} />
            <Text style={[styles.tabText, activeTab === 'survey' && styles.activeTabText]}>
              Video Surveys
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {activeTab === 'interview' ? 'Video Interviews' : 'Video Surveys'}
            </Text>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>Create New</Text>
            </TouchableOpacity>
          </View>
          
          {filteredSurveys.map(survey => (
            <VideoSurveyCard key={survey.id} survey={survey} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <Video size={24} color="#007AFF" />
              <Text style={styles.quickActionText}>New Interview</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <Calendar size={24} color="#34C759" />
              <Text style={styles.quickActionText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <BarChart3 size={24} color="#FF9500" />
              <Text style={styles.quickActionText}>Reports</Text>
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
    justifyContent: 'space-around',
    marginBottom: 12
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
  surveyActions: {
    flexDirection: 'row',
    gap: 12
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
    gap: 4,
    flex: 1,
    justifyContent: 'center'
  },
  actionText: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500'
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