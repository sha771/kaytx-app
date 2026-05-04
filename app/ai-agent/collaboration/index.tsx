import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, Users, FolderOpen, Video, MessageSquare, FileText,
  LayoutGrid, Zap, ArrowRight, Calendar, Bell, Share2
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const COLLAB_TOOLS = [
  {
    id: 'shared-workspace',
    name: 'Shared Workspaces',
    description: 'Collaborate in organized team spaces',
    icon: LayoutGrid,
    color: '#8B5CF6',
    route: '/ai-agent/collaboration/shared-workspace',
    users: 45
  },
  {
    id: 'document-collab',
    name: 'Document Collaboration',
    description: 'Edit documents together in real-time',
    icon: FileText,
    color: '#3B82F6',
    route: '/ai-agent/collaboration/document-collab',
    users: 78
  },
  {
    id: 'meeting-rooms',
    name: 'Meeting Rooms',
    description: 'Smart video conferencing with AI',
    icon: Video,
    color: '#10B981',
    route: '/ai-agent/collaboration/meeting-rooms',
    users: 23
  },
];

const TEAM_STATS = [
  { label: 'Active Projects', value: '12', icon: FolderOpen },
  { label: 'Team Members', value: '48', icon: Users },
  { label: 'Meetings Today', value: '8', icon: Video },
  { label: 'Shared Docs', value: '156', icon: FileText },
];

const RECENT_ACTIVITIES = [
  { user: 'Sarah Chen', action: 'shared a document', target: 'Q2 Roadmap', time: '10 min ago' },
  { user: 'Mike Johnson', action: 'joined', target: 'Product Standup', time: '25 min ago' },
  { user: 'Emma Wilson', action: 'commented on', target: 'Design Review', time: '1 hour ago' },
];

export default function CollaborationIndexScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Team Collaboration
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Work together, smarter
            </Text>
          </View>
        </View>

        {/* Team Stats */}
        <View style={styles.statsRow}>
          {TEAM_STATS.map((stat, i) => (
            <Animated.View
              key={stat.label}
              entering={FadeInUp.delay(i * 50)}
              style={[styles.statCard, { backgroundColor: theme.colors.background }]}
            >
              <stat.icon size={20} color={theme.colors.primary} />
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Collaboration Tools */}
      <View style={styles.toolsContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Collaboration Tools
        </Text>
        {COLLAB_TOOLS.map((tool, i) => (
          <Animated.View key={tool.id} entering={FadeInUp.delay(i * 50)}>
            <TouchableOpacity
              style={[styles.toolCard, { backgroundColor: theme.colors.card }]}
              onPress={() => router.push(tool.route)}
            >
              <View style={[styles.toolIcon, { backgroundColor: tool.color + '15' }]}>
                <tool.icon size={28} color={tool.color} />
              </View>
              <View style={styles.toolContent}>
                <Text style={[styles.toolName, { color: theme.colors.text }]}>
                  {tool.name}
                </Text>
                <Text style={[styles.toolDesc, { color: theme.colors.textSecondary }]}>
                  {tool.description}
                </Text>
                <View style={styles.toolUsers}>
                  <Users size={14} color={tool.color} />
                  <Text style={[styles.usersText, { color: tool.color }]}>
                    {tool.users} active users
                  </Text>
                </View>
              </View>
              <ArrowRight size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Recent Activity */}
      <View style={[styles.activitySection, { backgroundColor: theme.colors.card }]}>
        <View style={styles.activityHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 0 }]}>
            Recent Activity
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: '#3B82F6' }]}>View All</Text>
          </TouchableOpacity>
        </View>
        {RECENT_ACTIVITIES.map((activity, i) => (
          <Animated.View key={i} entering={FadeInUp.delay(i * 50)}>
            <View style={[styles.activityRow, { backgroundColor: theme.colors.background }]}>
              <View style={styles.activityAvatar}>
                <Text style={styles.activityAvatarText}>{activity.user.charAt(0)}</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityText, { color: theme.colors.text }]}>
                  <Text style={{ fontWeight: '600' }}>{activity.user}</Text> {activity.action}{' '}
                  <Text style={{ fontWeight: '600', color: '#3B82F6' }}>{activity.target}</Text>
                </Text>
                <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>
                  {activity.time}
                </Text>
              </View>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* AI Collaboration Features */}
      <View style={[styles.aiCard, { backgroundColor: theme.colors.card }]}>
        <View style={styles.aiHeader}>
          <Zap size={24} color="#8B5CF6" />
          <Text style={[styles.aiTitle, { color: theme.colors.text }]}>
            AI-Powered Collaboration
          </Text>
        </View>
        <Text style={[styles.aiDesc, { color: theme.colors.textSecondary }]}>
          Smart features that enhance team productivity and streamline workflows.
        </Text>
        <View style={styles.aiFeatures}>
          <View style={styles.aiFeature}>
            <View style={[styles.aiDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={[styles.aiFeatureText, { color: theme.colors.textSecondary }]}>
              Smart meeting transcription
            </Text>
          </View>
          <View style={styles.aiFeature}>
            <View style={[styles.aiDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.aiFeatureText, { color: theme.colors.textSecondary }]}>
              Auto-generated action items
            </Text>
          </View>
          <View style={styles.aiFeature}>
            <View style={[styles.aiDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.aiFeatureText, { color: theme.colors.textSecondary }]}>
              Context-aware document suggestions
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: '700', marginTop: 6, marginBottom: 2 },
  statLabel: { fontSize: 10 },
  toolsContainer: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  toolCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 12 },
  toolIcon: { width: 56, height: 56, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  toolContent: { flex: 1 },
  toolName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  toolDesc: { fontSize: 13, marginBottom: 6 },
  toolUsers: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  usersText: { fontSize: 12, fontWeight: '600' },
  activitySection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  activityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  seeAll: { fontSize: 14, fontWeight: '600' },
  activityRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 8 },
  activityAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#3B82F6', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  activityAvatarText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 13, lineHeight: 18, marginBottom: 2 },
  activityTime: { fontSize: 11 },
  aiCard: { marginHorizontal: 16, marginBottom: 30, padding: 20, borderRadius: 16 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  aiTitle: { fontSize: 17, fontWeight: '700' },
  aiDesc: { fontSize: 14, lineHeight: 20, marginBottom: 14 },
  aiFeatures: { gap: 8 },
  aiFeature: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  aiDot: { width: 8, height: 8, borderRadius: 4 },
  aiFeatureText: { fontSize: 13 },
});
