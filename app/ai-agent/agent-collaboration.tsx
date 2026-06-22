import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Users, MessageSquare, Share2, Clock, CheckCircle, 
  AlertCircle, Send, Plus, Filter, Search, Star, 
  Activity, Target, Zap, Layers, FileText, Calendar
} from 'lucide-react-native';

export default function AgentCollaborationPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');

  const COLLABORATION_TABS = [
    { id: 'active', label: 'Active', icon: Activity },
    { id: 'shared', label: 'Shared Resources', icon: Share2 },
    { id: 'projects', label: 'Projects', icon: Target },
    { id: 'archive', label: 'Archive', icon: Layers }
  ];

  const ACTIVE_COLLABORATIONS = [
    {
      id: 1,
      name: 'Customer Onboarding Optimization',
      participants: ['Customer Support Agent', 'Sales Agent', 'Training Agent'],
      status: 'in_progress',
      progress: 68,
      messages: 24,
      lastActivity: '5m ago',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Q4 Sales Campaign Planning',
      participants: ['Marketing Agent', 'Sales Agent', 'Data Analytics Agent'],
      status: 'in_progress',
      progress: 42,
      messages: 18,
      lastActivity: '1h ago',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Security Protocol Update',
      participants: ['Security Agent', 'DevOps Agent', 'Compliance Agent'],
      status: 'review',
      progress: 95,
      messages: 56,
      lastActivity: '3h ago',
      priority: 'critical'
    },
    {
      id: 4,
      name: 'Customer Feedback Analysis',
      participants: ['Sentiment Analysis Agent', 'Support Agent', 'Product Agent'],
      status: 'in_progress',
      progress: 23,
      messages: 12,
      lastActivity: '2d ago',
      priority: 'low'
    }
  ];

  const RECENT_MESSAGES = [
    {
      id: 1,
      agent: 'Customer Support Agent',
      message: 'I have completed the initial customer segmentation for the onboarding process. Ready for review.',
      time: '2m ago',
      avatar: '#00BCD4'
    },
    {
      id: 2,
      agent: 'Sales Agent',
      message: 'The lead scoring model is showing 94% accuracy on test data. Should we proceed to production?',
      time: '15m ago',
      avatar: '#10B981'
    },
    {
      id: 3,
      agent: 'Data Analytics Agent',
      message: 'Weekly performance report has been generated. Customer satisfaction is up 3.2%.',
      time: '1h ago',
      avatar: '#7C3AED'
    },
    {
      id: 4,
      agent: 'Security Agent',
      message: 'Potential security anomaly detected in user authentication flow. Investigating.',
      time: '3h ago',
      avatar: '#EF4444'
    }
  ];

  const COLLABORATION_STATS = [
    { label: 'Active Projects', value: '12', icon: Target, color: '#3B82F6' },
    { label: 'Agent Messages', value: '847', icon: MessageSquare, color: '#10B981' },
    { label: 'Shared Resources', value: '234', icon: Share2, color: '#8B5CF6' },
    { label: 'Avg Response', value: '2.1m', icon: Clock, color: '#F59E0B' }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF620' }]}>
          <Users size={56} color="#8B5CF6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Agent Collaboration</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Multi-agent coordination and real-time collaboration workspace
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}>
            <Activity size={12} color="#10B981" />
            <Text style={[styles.badgeText, { color: '#10B981' }]}>12 Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#3B82F622' }]}>
            <MessageSquare size={12} color="#3B82F6" />
            <Text style={[styles.badgeText, { color: '#3B82F6' }]}>847 Messages</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}>
            <Share2 size={12} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>234 Shared</Text>
          </View>
        </View>
      </View>

      {/* Collaboration Stats */}
      <View style={styles.statsContainer}>
        {COLLABORATION_STATS.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={24} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        {COLLABORATION_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setSelectedTab(tab.id)}
            style={[
              styles.tab,
              {
                backgroundColor: selectedTab === tab.id ? '#8B5CF6' : 'transparent'
              }
            ]}
          >
            <tab.icon size={20} color={selectedTab === tab.id ? 'white' : theme.colors.textSecondary} />
            <Text style={[
              styles.tabText,
              { color: selectedTab === tab.id ? 'white' : theme.colors.textSecondary }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={[styles.searchInputWrapper, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Search size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search collaborations..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={[styles.createButton, { backgroundColor: '#8B5CF6' }]}>
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Active Collaborations */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Collaborations</Text>
        {ACTIVE_COLLABORATIONS.map((collab) => (
          <TouchableOpacity
            key={collab.id}
            style={[styles.collabCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
          >
            <View style={styles.collabHeader}>
              <View style={styles.collabInfo}>
                <View style={styles.collabTitleRow}>
                  <Text style={[styles.collabName, { color: theme.colors.text }]}>{collab.name}</Text>
                  <View style={[
                    styles.priorityBadge,
                    { 
                      backgroundColor: collab.priority === 'critical' ? '#EF444420' : 
                                   collab.priority === 'high' ? '#F59E0B20' : '#10B98120'
                    }
                  ]}>
                    <View style={[
                      styles.priorityDot,
                      { 
                        backgroundColor: collab.priority === 'critical' ? '#EF4444' : 
                                   collab.priority === 'high' ? '#F59E0B' : '#10B981'
                      }
                    ]} />
                    <Text style={[
                      styles.priorityText,
                      { 
                        color: collab.priority === 'critical' ? '#EF4444' : 
                             collab.priority === 'high' ? '#F59E0B' : '#10B981'
                      }
                    ]}>
                      {collab.priority}
                    </Text>
                  </View>
                </View>
                <View style={styles.collabParticipants}>
                  {collab.participants.slice(0, 3).map((participant, i) => (
                    <View key={i} style={[styles.participantChip, { backgroundColor: '#E5E5EA' }]}>
                      <Text style={[styles.participantText, { color: theme.colors.text }]}>{participant}</Text>
                    </View>
                  ))}
                  {collab.participants.length > 3 && (
                    <Text style={[styles.moreParticipants, { color: theme.colors.textSecondary }]}>
                      +{collab.participants.length - 3}
                    </Text>
                  )}
                </View>
              </View>
              <CheckCircle size={20} color="#10B981" />
            </View>

            <View style={styles.collabMetrics}>
              <View style={styles.collabMetric}>
                <Activity size={16} color={theme.colors.textSecondary} />
                <Text style={[styles.collabMetricValue, { color: theme.colors.text }]}>{collab.progress}%</Text>
                <Text style={[styles.collabMetricLabel, { color: theme.colors.textSecondary }]}>Progress</Text>
              </View>
              <View style={styles.collabMetric}>
                <MessageSquare size={16} color={theme.colors.textSecondary} />
                <Text style={[styles.collabMetricValue, { color: theme.colors.text }]}>{collab.messages}</Text>
                <Text style={[styles.collabMetricLabel, { color: theme.colors.textSecondary }]}>Messages</Text>
              </View>
              <View style={styles.collabMetric}>
                <Clock size={16} color={theme.colors.textSecondary} />
                <Text style={[styles.collabMetricValue, { color: theme.colors.text }]}>{collab.lastActivity}</Text>
                <Text style={[styles.collabMetricLabel, { color: theme.colors.textSecondary }]}>Activity</Text>
              </View>
            </View>

            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { backgroundColor: '#E5E5EA' }]}>
                <View style={[styles.progressFill, { width: `${collab.progress}%`, backgroundColor: '#8B5CF6' }]} />
              </View>
              <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>{collab.progress}%</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Messages */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Messages</Text>
        {RECENT_MESSAGES.map((msg) => (
          <View key={msg.id} style={[styles.messageCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.messageAvatar, { backgroundColor: msg.avatar }]}>
              <Users size={20} color="white" />
            </View>
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={[styles.messageAgent, { color: theme.colors.text }]}>{msg.agent}</Text>
                <Text style={[styles.messageTime, { color: theme.colors.textSecondary }]}>{msg.time}</Text>
              </View>
              <Text style={[styles.messageText, { color: theme.colors.text }]}>{msg.message}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/workflow-automation')}
            style={[styles.actionButton, { backgroundColor: '#8B5CF615' }]}
          >
            <Zap size={28} color="#8B5CF6" />
            <Text style={[styles.actionText, { color: '#8B5CF6' }]}>Workflows</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/ai-agents-employees')}
            style={[styles.actionButton, { backgroundColor: '#10B98115' }]}
          >
            <Users size={28} color="#10B981" />
            <Text style={[styles.actionText, { color: '#10B981' }]}>All Agents</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push('/ai-agent/analytics-dashboard')}
            style={[styles.actionButton, { backgroundColor: '#F59E0B15' }]}
          >
            <Star size={28} color="#F59E0B" />
            <Text style={[styles.actionText, { color: '#F59E0B' }]}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    padding: 24,
    borderBottomWidth: 1,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  createButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: 20,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  collabCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  collabHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  collabInfo: {
    flex: 1,
  },
  collabTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  collabName: {
    fontSize: 16,
    fontWeight: '600',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  collabParticipants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  participantChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  participantText: {
    fontSize: 11,
    fontWeight: '500',
  },
  moreParticipants: {
    fontSize: 11,
  },
  collabMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  collabMetric: {
    alignItems: 'center',
    gap: 4,
  },
  collabMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  collabMetricLabel: {
    fontSize: 11,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  messageAgent: {
    fontSize: 14,
    fontWeight: '600',
  },
  messageTime: {
    fontSize: 12,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: 140,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});