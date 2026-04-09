import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Users,
  Plus,
  Search,
  MessageSquare,
  Folder,
  FileText,
  MoreVertical,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Bot,
  User,
  Send,
  Paperclip,
  Mic,
  Hash,
  Bell,
  Settings,
  ChevronDown,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  projects: Project[];
  activeConversations: number;
  lastActivity: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: 'admin' | 'member' | 'agent';
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
  type: 'user' | 'agent';
}

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'on_hold';
  progress: number;
  dueDate: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

interface Message {
  id: string;
  sender: string;
  senderType: 'user' | 'agent';
  content: string;
  timestamp: string;
  attachments?: string[];
}

// Mock Data
const TEAMS: Team[] = [
  {
    id: '1',
    name: 'Customer Success Squad',
    description: 'Handling customer inquiries and support tickets',
    members: [
      { id: 'u1', name: 'Sarah Chen', role: 'admin', status: 'online', type: 'user' },
      { id: 'u2', name: 'Mike Johnson', role: 'member', status: 'online', type: 'user' },
      { id: 'a1', name: 'Support AI', role: 'agent', status: 'online', type: 'agent' },
      { id: 'a2', name: 'Knowledge Base AI', role: 'agent', status: 'online', type: 'agent' },
    ],
    projects: [
      {
        id: 'p1',
        name: 'Q1 Support Improvement',
        status: 'active',
        progress: 75,
        dueDate: '2026-03-31',
        tasks: [
          { id: 't1', title: 'Analyze response times', assignee: 'Support AI', status: 'completed', priority: 'high' },
          { id: 't2', title: 'Update FAQ database', assignee: 'Knowledge Base AI', status: 'in_progress', priority: 'medium' },
        ],
      },
    ],
    activeConversations: 12,
    lastActivity: '2 min ago',
  },
  {
    id: '2',
    name: 'Sales & Revenue Team',
    description: 'Driving sales and revenue growth initiatives',
    members: [
      { id: 'u3', name: 'David Lee', role: 'admin', status: 'busy', type: 'user' },
      { id: 'u4', name: 'Emma Wilson', role: 'member', status: 'online', type: 'user' },
      { id: 'a3', name: 'Sales AI', role: 'agent', status: 'online', type: 'agent' },
    ],
    projects: [
      {
        id: 'p2',
        name: 'Lead Qualification Automation',
        status: 'active',
        progress: 60,
        dueDate: '2026-03-15',
        tasks: [
          { id: 't3', title: 'Train lead scoring model', assignee: 'Sales AI', status: 'in_progress', priority: 'high' },
        ],
      },
    ],
    activeConversations: 8,
    lastActivity: '15 min ago',
  },
  {
    id: '3',
    name: 'Product Development',
    description: 'Building and improving our core product',
    members: [
      { id: 'u5', name: 'Alex Kim', role: 'admin', status: 'online', type: 'user' },
      { id: 'u6', name: 'Jordan Taylor', role: 'member', status: 'offline', type: 'user' },
      { id: 'a4', name: 'Code Review AI', role: 'agent', status: 'online', type: 'agent' },
      { id: 'a5', name: 'Documentation AI', role: 'agent', status: 'online', type: 'agent' },
    ],
    projects: [
      {
        id: 'p3',
        name: 'Feature Release v2.5',
        status: 'on_hold',
        progress: 45,
        dueDate: '2026-04-01',
        tasks: [
          { id: 't4', title: 'API documentation', assignee: 'Documentation AI', status: 'in_progress', priority: 'medium' },
        ],
      },
    ],
    activeConversations: 5,
    lastActivity: '1 hour ago',
  },
];

const MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'Sarah Chen',
    senderType: 'user',
    content: 'Hey team, can we review the Q1 metrics today? I think Support AI has some interesting insights.',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    sender: 'Support AI',
    senderType: 'agent',
    content: 'I\'ve analyzed our response times and found that we improved by 35% compared to last quarter. The average first response is now under 2 minutes.',
    timestamp: '10:31 AM',
  },
  {
    id: '3',
    sender: 'Mike Johnson',
    senderType: 'user',
    content: 'That\'s amazing! What about customer satisfaction scores?',
    timestamp: '10:32 AM',
  },
  {
    id: '4',
    sender: 'Support AI',
    senderType: 'agent',
    content: 'CSAT increased from 4.2 to 4.7 out of 5. The new automated ticket routing really helped.',
    timestamp: '10:33 AM',
  },
  {
    id: '5',
    sender: 'Knowledge Base AI',
    senderType: 'agent',
    content: 'I\'ve also identified 15 new FAQ entries we should add based on common inquiries this quarter.',
    timestamp: '10:35 AM',
  },
];

const STATUS_COLORS = {
  online: '#10B981',
  offline: '#9CA3AF',
  busy: '#F59E0B',
};

const STATUS_LABELS = {
  active: { color: '#10B981', label: 'Active' },
  completed: { color: '#3B82F6', label: 'Completed' },
  on_hold: { color: '#F59E0B', label: 'On Hold' },
};

const PRIORITY_COLORS = {
  low: '#3B82F6',
  medium: '#F59E0B',
  high: '#EF4444',
};

export default function AgentTeamWorkspaceScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [activeTab, setActiveTab] = useState<'teams' | 'projects' | 'chat'>('teams');
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const filteredTeams = TEAMS.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTeamCard = (team: Team, index: number) => (
    <Animated.View
      key={team.id}
      entering={FadeInUp.delay(index * 50)}
      style={[styles.teamCard, { backgroundColor: colors.card }]}
    >
      <View style={styles.teamHeader}>
        <View style={[styles.teamIcon, { backgroundColor: colors.tint + '15' }]}>
          <Users size={22} color={colors.tint} />
        </View>
        <View style={styles.teamInfo}>
          <Text style={[styles.teamName, { color: colors.text }]}>{team.name}</Text>
          <Text style={[styles.teamDescription, { color: colors.icon }]}>
            {team.description}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setSelectedTeam(team)}>
          <ChevronDown size={20} color={colors.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.teamStats}>
        <View style={styles.stat}>
          <Users size={14} color={colors.icon} />
          <Text style={[styles.statText, { color: colors.icon }]}>
            {team.members.length} members
          </Text>
        </View>
        <View style={styles.stat}>
          <MessageSquare size={14} color={colors.icon} />
          <Text style={[styles.statText, { color: colors.icon }]}>
            {team.activeConversations} active
          </Text>
        </View>
        <View style={styles.stat}>
          <Clock size={14} color={colors.icon} />
          <Text style={[styles.statText, { color: colors.icon }]}>
            {team.lastActivity}
          </Text>
        </View>
      </View>

      <View style={styles.membersRow}>
        {team.members.slice(0, 4).map((member, i) => (
          <View
            key={member.id}
            style={[
              styles.memberAvatar,
              { backgroundColor: member.type === 'agent' ? colors.tint : '#8B5CF6', marginLeft: i > 0 ? -10 : 0 },
            ]}
          >
            {member.type === 'agent' ? (
              <Bot size={12} color="white" />
            ) : (
              <User size={12} color="white" />
            )}
          </View>
        ))}
        {team.members.length > 4 && (
          <View style={[styles.memberAvatar, { backgroundColor: colors.background, marginLeft: -10 }]}>
            <Text style={[styles.moreText, { color: colors.text }]}>
              +{team.members.length - 4}
            </Text>
          </View>
        )}
      </View>

      {selectedTeam?.id === team.id && (
        <Animated.View entering={FadeInUp} style={styles.teamDetails}>
          <View style={styles.sectionTitle}>
            <Text style={[styles.sectionTitleText, { color: colors.text }]}>
              Active Projects
            </Text>
          </View>
          {team.projects.map((project) => (
            <View key={project.id} style={styles.projectRow}>
              <View style={styles.projectInfo}>
                <Folder size={16} color={colors.tint} />
                <View>
                  <Text style={[styles.projectName, { color: colors.text }]}>
                    {project.name}
                  </Text>
                  <Text style={[styles.projectMeta, { color: colors.icon }]}>
                    Due {project.dueDate}
                  </Text>
                </View>
              </View>
              <View style={styles.projectProgress}>
                <View style={[styles.progressBar, { backgroundColor: colors.background }]}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${project.progress}%`, backgroundColor: STATUS_LABELS[project.status].color },
                    ]}
                  />
                </View>
                <Text style={[styles.progressText, { color: colors.icon }]}>
                  {project.progress}%
                </Text>
              </View>
            </View>
          ))}

          <TouchableOpacity style={[styles.joinChatButton, { backgroundColor: colors.tint }]}>
            <MessageSquare size={18} color="white" />
            <Text style={styles.joinChatText}>Join Team Chat</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );

  const renderMessage = (message: Message, index: number) => {
    const isAgent = message.senderType === 'agent';

    return (
      <Animated.View
        key={message.id}
        entering={FadeInUp.delay(index * 30)}
        style={[
          styles.messageContainer,
          isAgent && styles.messageContainerAgent,
        ]}
      >
        <View
          style={[
            styles.messageAvatar,
            { backgroundColor: isAgent ? colors.tint : '#8B5CF6' },
          ]}
        >
          {isAgent ? (
            <Bot size={16} color="white" />
          ) : (
            <User size={16} color="white" />
          )}
        </View>
        <View style={[styles.messageBubble, isAgent && styles.messageBubbleAgent]}>
          <View style={styles.messageHeader}>
            <Text style={[styles.messageSender, { color: isAgent ? colors.tint : '#8B5CF6' }]}>
              {message.sender}
            </Text>
            <Text style={[styles.messageTime, { color: colors.icon }]}>
              {message.timestamp}
            </Text>
          </View>
          <Text style={[styles.messageText, { color: colors.text }]}>
            {message.content}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Team Workspace
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Collaborate with AI agents and humans
            </Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.newButton, { backgroundColor: colors.tint }]}>
          <Plus size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: colors.tint + '15' }]}>
            <Users size={20} color={colors.tint} />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {TEAMS.reduce((acc, t) => acc + t.members.filter(m => m.type === 'user').length, 0)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Humans</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: '#8B5CF6' + '15' }]}>
            <Bot size={20} color="#8B5CF6" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {TEAMS.reduce((acc, t) => acc + t.members.filter(m => m.type === 'agent').length, 0)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>AI Agents</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: '#10B981' + '15' }]}>
            <Folder size={20} color="#10B981" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {TEAMS.reduce((acc, t) => acc + t.projects.length, 0)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Projects</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'teams' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('teams')}
        >
          <Users size={18} color={activeTab === 'teams' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'teams' ? 'white' : colors.text }]}>
            Teams
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'projects' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('projects')}
        >
          <Folder size={18} color={activeTab === 'projects' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'projects' ? 'white' : colors.text }]}>
            Projects
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'chat' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('chat')}
        >
          <MessageSquare size={18} color={activeTab === 'chat' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'chat' ? 'white' : colors.text }]}>
            Chat
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'teams' && (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Search */}
          <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
            <Search size={18} color={colors.icon} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search teams..."
              placeholderTextColor={colors.icon}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {filteredTeams.map((team, index) => renderTeamCard(team, index))}
        </ScrollView>
      )}

      {activeTab === 'chat' && (
        <View style={styles.chatContainer}>
          <ScrollView
            style={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContent}
          >
            <View style={styles.chatHeader}>
              <View style={[styles.chatTeamIcon, { backgroundColor: colors.tint + '15' }]}>
                <Users size={20} color={colors.tint} />
              </View>
              <View>
                <Text style={[styles.chatTeamName, { color: colors.text }]}>
                  Customer Success Squad
                </Text>
                <View style={styles.chatOnlineRow}>
                  <View style={styles.onlineIndicator} />
                  <Text style={[styles.chatOnlineText, { color: colors.icon }]}>
                    4 members online
                  </Text>
                </View>
              </View>
            </View>

            {MESSAGES.map((message, index) => renderMessage(message, index))}
          </ScrollView>

          <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
            <TouchableOpacity style={styles.attachButton}>
              <Paperclip size={22} color={colors.icon} />
            </TouchableOpacity>
            <TextInput
              style={[styles.messageInput, { color: colors.text }]}
              placeholder="Message the team..."
              placeholderTextColor={colors.icon}
              value={newMessage}
              onChangeText={setNewMessage}
              multiline
            />
            <TouchableOpacity style={styles.micButton}>
              <Mic size={22} color={colors.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.tint }]}>
              <Send size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {activeTab === 'projects' && (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {TEAMS.flatMap(t => t.projects).map((project, index) => (
            <Animated.View
              key={project.id}
              entering={FadeInUp.delay(index * 50)}
              style={[styles.projectCard, { backgroundColor: colors.card }]}
            >
              <View style={styles.projectHeader}>
                <View style={[styles.projectIcon, { backgroundColor: STATUS_LABELS[project.status].color + '15' }]}>
                  <Folder size={20} color={STATUS_LABELS[project.status].color} />
                </View>
                <View style={styles.projectTitleSection}>
                  <Text style={[styles.projectCardName, { color: colors.text }]}>
                    {project.name}
                  </Text>
                  <View style={[styles.projectStatusBadge, { backgroundColor: STATUS_LABELS[project.status].color + '15' }]}>
                    <Text style={[styles.projectStatusText, { color: STATUS_LABELS[project.status].color }]}>
                      {STATUS_LABELS[project.status].label}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.projectProgressCard}>
                <View style={styles.progressHeader}>
                  <Text style={[styles.progressLabel, { color: colors.icon }]}>Progress</Text>
                  <Text style={[styles.progressValue, { color: colors.text }]}>
                    {project.progress}%
                  </Text>
                </View>
                <View style={[styles.progressBarCard, { backgroundColor: colors.background }]}>
                  <View
                    style={[
                      styles.progressFillCard,
                      { width: `${project.progress}%`, backgroundColor: STATUS_LABELS[project.status].color },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.projectFooter}>
                <View style={styles.projectMetaItem}>
                  <Clock size={14} color={colors.icon} />
                  <Text style={[styles.projectMetaText, { color: colors.icon }]}>
                    Due {project.dueDate}
                  </Text>
                </View>
                <View style={styles.projectMetaItem}>
                  <CheckCircle size={14} color={colors.icon} />
                  <Text style={[styles.projectMetaText, { color: colors.icon }]}>
                    {project.tasks.filter(t => t.status === 'completed').length}/{project.tasks.length} tasks
                  </Text>
                </View>
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  newButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  teamCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
  },
  teamDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  teamStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  membersRow: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  moreText: {
    fontSize: 10,
    fontWeight: '600',
  },
  teamDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  sectionTitle: {
    marginBottom: 12,
  },
  sectionTitleText: {
    fontSize: 14,
    fontWeight: '600',
  },
  projectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  projectInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '500',
  },
  projectMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  projectProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    width: 60,
    height: 6,
    borderRadius: 3,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
  },
  joinChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
    marginTop: 16,
  },
  joinChatText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  chatTeamIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatTeamName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  chatOnlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  chatOnlineText: {
    fontSize: 13,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  messageContainerAgent: {
    flexDirection: 'row-reverse',
  },
  messageAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 12,
    borderBottomLeftRadius: 4,
  },
  messageBubbleAgent: {
    backgroundColor: '#EFF6FF',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  messageSender: {
    fontSize: 13,
    fontWeight: '600',
  },
  messageTime: {
    fontSize: 11,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    margin: 16,
    borderRadius: 24,
  },
  attachButton: {
    padding: 8,
  },
  messageInput: {
    flex: 1,
    maxHeight: 100,
    fontSize: 15,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  micButton: {
    padding: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  projectIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  projectTitleSection: {
    flex: 1,
  },
  projectCardName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 6,
  },
  projectStatusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  projectStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  projectProgressCard: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
  },
  progressValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  progressBarCard: {
    height: 8,
    borderRadius: 4,
  },
  progressFillCard: {
    height: 8,
    borderRadius: 4,
  },
  projectFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  projectMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  projectMetaText: {
    fontSize: 12,
  },
});
