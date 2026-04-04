import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Animated,
  Alert,
  Dimensions,
  Switch,
} from 'react-native';
import {
  Brain,
  Calendar,
  Mail,
  CheckSquare,
  MessageSquare,
  Clock,
  TrendingUp,
  Users,
  Zap,
  Target,
  BarChart3,
  Send,
  Mic,
  Sparkles,
  Plus,
  ChevronRight,
  X,
  Search,
  Workflow,
  Database,
  Shield,
  Activity,
  Phone,
  Video,
  Lightbulb,
  FileText,
  Menu,
  Star,
  Bot,
  Sparkle,
  Cpu,
  Server,
  CircleDollarSign,
  AlertTriangle,
} from 'lucide-react-native';
import { aiEmployees, aiEmployeeCategories, aiInfrastructureStats, AIEmployee } from '@/constants/aiEmployees';
import { useTheme } from '@/providers/ThemeProvider';
import { useAIAssistant } from '@/providers/AIAssistantProvider';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AIWorkforceSidebar } from '@/components/AIWorkforceSidebar';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  action: () => void;
}

export default function AIAssistantScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const {
    tasks,
    meetings,
    insights,
    workflows,
    aiMessages,
    sendMessage,
    activeAgents,
    toggleAgent,
    stats,
  } = useAIAssistant();

  const [message, setMessage] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'tasks' | 'schedule' | 'insights'>('overview');
  const [showChat, setShowChat] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim]);

  const openSidebar = useCallback(() => {
    setShowSidebar(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setShowSidebar(false);
  }, []);



  const quickActions: QuickAction[] = [
    {
      id: '1',
      title: 'Manage Emails',
      description: 'AI-powered inbox',
      icon: Mail,
      color: '#FF9500',
      action: () => {
        router.push('/ai-assistant/emails');
      },
    },
    {
      id: '2',
      title: 'View Calendar',
      description: 'Smart scheduling',
      icon: Calendar,
      color: '#007AFF',
      action: () => {
        router.push('/ai-assistant/calendar');
      },
    },
    {
      id: '3',
      title: 'Add Task',
      description: 'Create and prioritize tasks',
      icon: CheckSquare,
      color: '#34C759',
      action: () => {
        setShowChat(true);
        sendMessage('Add a new task to my list');
      },
    },
    {
      id: '4',
      title: 'Analyze Day',
      description: 'Get productivity insights',
      icon: BarChart3,
      color: '#5856D6',
      action: () => {
        setShowChat(true);
        sendMessage('Analyze my productivity today');
      },
    },
    {
      id: '5',
      title: 'Research',
      description: 'Deep dive into any topic',
      icon: Search,
      color: '#AF52DE',
      action: () => {
        setShowChat(true);
        sendMessage('I need to research something');
      },
    },
    {
      id: '6',
      title: 'Create Workflow',
      description: 'Automate repetitive tasks',
      icon: Workflow,
      color: '#00C7BE',
      action: () => {
        setShowChat(true);
        sendMessage('Help me create an automation workflow');
      },
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage('');
  };

  const startVoiceInput = () => {
    setIsListening(true);
    console.log('[AI Assistant] Voice input started');

    setTimeout(() => {
      setIsListening(false);
      Alert.alert('Voice Input', 'Voice recognition is active. This feature will be fully functional in production.');
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#34C759';
      default:
        return theme.colors.secondaryText;
    }
  };

  const getMeetingIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'phone':
        return Phone;
      default:
        return Users;
    }
  };

  const renderOverview = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <View style={styles.heroCard}>
          <View style={[styles.heroIcon, { backgroundColor: theme.colors.primary + '20' }]}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <Brain size={32} color={theme.colors.primary} />
            </Animated.View>
          </View>
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>
            Your AI Coworker
          </Text>
          <Text style={[styles.heroDescription, { color: theme.colors.secondaryText }]}>
            Not just a chatbot, but a thinking assistant that knows your schedule, work, routine, communication history, email, and tasks. It gets work done.
          </Text>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={[styles.heroStatValue, { color: theme.colors.primary }]}>3-5 hrs</Text>
              <Text style={[styles.heroStatLabel, { color: theme.colors.secondaryText }]}>Saved Daily</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={[styles.heroStatValue, { color: theme.colors.primary }]}>94%</Text>
              <Text style={[styles.heroStatLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
            </View>
            <View style={styles.heroStat}>
              <Text style={[styles.heroStatValue, { color: theme.colors.primary }]}>24/7</Text>
              <Text style={[styles.heroStatLabel, { color: theme.colors.secondaryText }]}>Available</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Zap size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Quick Actions
          </Text>
        </View>
        <View style={styles.quickActionsGrid}>
          {quickActions.map(action => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={action.action}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                {React.createElement(action.icon, { size: 20, color: action.color })}
              </View>
              <Text style={[styles.quickActionTitle, { color: theme.colors.text }]}>
                {action.title}
              </Text>
              <Text style={[styles.quickActionDescription, { color: theme.colors.secondaryText }]}>
                {action.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Workforce Status Quick View */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Cpu size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Workforce Command
          </Text>
          <View style={[styles.badgeContainer, { backgroundColor: theme.colors.primary + '20' }]}>
            <Text style={[styles.badgeText, { color: theme.colors.primary }]}>
              {stats.activeCount} Active
            </Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.agentOverviewScroll}>
          {aiEmployees.slice(0, 6).map((agent) => {
            const isActive = activeAgents[agent.id];
            const AgentIcon = agent.icon;
            return (
              <View key={agent.id} style={[styles.agentStatusCard, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={[styles.agentCircle, { backgroundColor: agent.color + '15' }]}>
                  <AgentIcon size={18} color={agent.color} />
                  <View style={[styles.miniStatusDot, { backgroundColor: isActive ? '#34C759' : '#8E8E93' }]} />
                </View>
                <Text style={[styles.agentMiniName, { color: theme.colors.text }]} numberOfLines={1}>
                  {agent.name.split(' ')[1] || agent.name}
                </Text>
                <Switch
                  value={isActive}
                  onValueChange={() => toggleAgent(agent.id)}
                  trackColor={{ false: '#767577', true: theme.colors.primary }}
                  thumbColor={isActive ? '#fff' : '#f4f3f4'}
                  style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                />
              </View>
            );
          })}
          <TouchableOpacity
            style={[styles.agentStatusCard, { backgroundColor: theme.colors.primary + '10', borderStyle: 'dashed', borderWidth: 1, borderColor: theme.colors.primary }]}
            onPress={openSidebar}
          >
            <View style={[styles.agentCircle, { backgroundColor: theme.colors.primary + '20' }]}>
              <Users size={18} color={theme.colors.primary} />
            </View>
            <Text style={[styles.agentMiniName, { color: theme.colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.statIcon, { backgroundColor: '#007AFF20' }]}>
            <CheckSquare size={20} color="#007AFF" />
          </View>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{tasks.length}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Active Tasks</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.statIcon, { backgroundColor: '#34C75920' }]}>
            <Calendar size={20} color="#34C759" />
          </View>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{meetings.length}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Meetings</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.statIcon, { backgroundColor: '#00C7BE20' }]}>
            <Workflow size={20} color="#00C7BE" />
          </View>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{workflows.length}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Workflows</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.statIcon, { backgroundColor: '#FF950020' }]}>
            <TrendingUp size={20} color="#FF9500" />
          </View>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{stats.averageHealth}%</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>WF Health</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Sparkles size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            AI Capabilities
          </Text>
        </View>

        {[
          { icon: Calendar, title: 'Smart Scheduling', desc: 'Auto-find optimal meeting times', color: '#007AFF' },
          { icon: Mail, title: 'Email Agent', desc: 'Reads, drafts & replies in your tone', color: '#FF9500' },
          { icon: CheckSquare, title: 'Task Brain', desc: 'Prioritizes by urgency & energy', color: '#34C759' },
          { icon: Database, title: 'Context Memory', desc: 'Remembers conversations & preferences', color: '#5856D6' },
          { icon: Workflow, title: 'AI Workflows', desc: 'Automate repetitive routines', color: '#00C7BE' },
          { icon: Search, title: 'Research Assistant', desc: 'Searches web & docs instantly', color: '#AF52DE' },
          { icon: FileText, title: 'Meeting Summarizer', desc: 'Auto-generates notes & actions', color: '#FF6482' },
          { icon: Shield, title: 'Privacy Shield', desc: 'Encrypted data, you control it', color: '#34C759' },
        ].map((feature, index) => (
          <View
            key={index}
            style={[styles.featureCard, { backgroundColor: theme.colors.cardBackground }]}
          >
            <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
              {React.createElement(feature.icon, { size: 24, color: feature.color })}
            </View>
            <View style={styles.featureInfo}>
              <Text style={[styles.featureTitle, { color: theme.colors.text }]}>
                {feature.title}
              </Text>
              <Text style={[styles.featureDescription, { color: theme.colors.secondaryText }]}>
                {feature.desc}
              </Text>
            </View>
            <ChevronRight size={20} color={theme.colors.secondaryText} />
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderTasks = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Target size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Your Tasks
          </Text>
        </View>
        {tasks.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: theme.colors.cardBackground }]}>
            <CheckSquare size={48} color={theme.colors.secondaryText} />
            <Text style={[styles.emptyStateText, { color: theme.colors.text }]}>
              No tasks yet
            </Text>
            <Text style={[styles.emptyStateSubtext, { color: theme.colors.secondaryText }]}>
              Ask your AI assistant to add tasks for you
            </Text>
          </View>
        ) : (
          tasks.map(task => (
            <View
              key={task.id}
              style={[styles.taskCard, { backgroundColor: theme.colors.cardBackground }]}
            >
              <View style={styles.taskHeader}>
                <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
                <Text style={[styles.taskTitle, { color: theme.colors.text }]}>
                  {task.title}
                </Text>
                {task.aiGenerated && (
                  <View style={[styles.aiBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                    <Sparkles size={10} color={theme.colors.primary} />
                  </View>
                )}
              </View>
              {task.description && (
                <Text style={[styles.taskDescription, { color: theme.colors.secondaryText }]}>
                  {task.description}
                </Text>
              )}
              <View style={styles.taskFooter}>
                <View style={styles.taskMeta}>
                  {task.dueDate && (
                    <>
                      <Clock size={14} color={theme.colors.secondaryText} />
                      <Text style={[styles.taskTime, { color: theme.colors.secondaryText }]}>
                        {new Date(task.dueDate).toLocaleDateString()}
                      </Text>
                    </>
                  )}
                  {task.estimatedTime && (
                    <>
                      <Text style={[styles.taskTime, { color: theme.colors.secondaryText }]}> • </Text>
                      <Text style={[styles.taskTime, { color: theme.colors.secondaryText }]}>
                        {task.estimatedTime}
                      </Text>
                    </>
                  )}
                </View>
                <View
                  style={[
                    styles.taskStatus,
                    {
                      backgroundColor:
                        task.status === 'completed'
                          ? '#34C75920'
                          : task.status === 'in-progress'
                            ? '#FF950020'
                            : theme.colors.background,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.taskStatusText,
                      {
                        color:
                          task.status === 'completed'
                            ? '#34C759'
                            : task.status === 'in-progress'
                              ? '#FF9500'
                              : theme.colors.secondaryText,
                      },
                    ]}
                  >
                    {task.status === 'completed'
                      ? 'Done'
                      : task.status === 'in-progress'
                        ? 'In Progress'
                        : 'Pending'}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => {
          setShowChat(true);
          sendMessage('Add a new task');
        }}
      >
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>Add New Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderSchedule = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Calendar size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Your Schedule
          </Text>
        </View>
        {meetings.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: theme.colors.cardBackground }]}>
            <Calendar size={48} color={theme.colors.secondaryText} />
            <Text style={[styles.emptyStateText, { color: theme.colors.text }]}>
              No meetings scheduled
            </Text>
            <Text style={[styles.emptyStateSubtext, { color: theme.colors.secondaryText }]}>
              Ask your AI assistant to schedule meetings
            </Text>
          </View>
        ) : (
          meetings.map(meeting => {
            const MeetingIcon = getMeetingIcon(meeting.type);
            return (
              <View
                key={meeting.id}
                style={[styles.meetingCard, { backgroundColor: theme.colors.cardBackground }]}
              >
                <View style={[styles.meetingIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                  <MeetingIcon size={20} color={theme.colors.primary} />
                </View>
                <View style={styles.meetingInfo}>
                  <View style={styles.meetingTitleRow}>
                    <Text style={[styles.meetingTitle, { color: theme.colors.text }]}>
                      {meeting.title}
                    </Text>
                    {meeting.aiScheduled && (
                      <View style={[styles.aiBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                        <Sparkles size={10} color={theme.colors.primary} />
                      </View>
                    )}
                  </View>
                  <Text style={[styles.meetingTime, { color: theme.colors.secondaryText }]}>
                    {new Date(meeting.startTime).toLocaleString()}
                  </Text>
                  <View style={styles.meetingMeta}>
                    <Users size={14} color={theme.colors.secondaryText} />
                    <Text style={[styles.meetingAttendees, { color: theme.colors.secondaryText }]}>
                      {meeting.attendees.length} attendees
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.meetingAction}>
                  <ChevronRight size={20} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => {
          setShowChat(true);
          sendMessage('Schedule a meeting');
        }}
      >
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>Schedule Meeting</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderInsights = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <BarChart3 size={20} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Productivity Insights
          </Text>
        </View>

        {insights.map(insight => {
          const iconMap: Record<string, any> = {
            'peak-hours': TrendingUp,
            'response-time': Activity,
            'meeting-load': Clock,
            'task-completion': Target,
            'focus-time': Lightbulb,
          };
          const Icon = iconMap[insight.type] || TrendingUp;
          const colorMap: Record<string, string> = {
            'peak-hours': '#34C759',
            'response-time': '#007AFF',
            'meeting-load': '#FF9500',
            'task-completion': '#5856D6',
            'focus-time': '#FFCC00',
          };
          const color = colorMap[insight.type] || '#34C759';

          return (
            <View
              key={insight.id}
              style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}
            >
              <View style={styles.insightHeader}>
                <View style={[styles.insightIcon, { backgroundColor: color + '20' }]}>
                  <Icon size={20} color={color} />
                </View>
                <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
                  {insight.title}
                </Text>
              </View>
              <Text style={[styles.insightValue, { color: theme.colors.text }]}>
                {insight.value}
              </Text>
              <Text style={[styles.insightDescription, { color: theme.colors.secondaryText }]}>
                {insight.description}
              </Text>
              {insight.recommendation && (
                <View style={[styles.recommendationBox, { backgroundColor: theme.colors.primary + '10' }]}>
                  <Lightbulb size={14} color={theme.colors.primary} />
                  <Text style={[styles.recommendationText, { color: theme.colors.primary }]}>
                    {insight.recommendation}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View>
          <View style={styles.titleRow}>
            <Brain size={28} color={theme.colors.primary} />
            <Text style={[styles.title, { color: theme.colors.text }]}>AI Assistant</Text>
          </View>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Your intelligent productivity companion
          </Text>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={openSidebar}
          accessibilityLabel="Open AI Employees menu"
          accessibilityRole="button"
        >
          <Menu size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        {(['overview', 'tasks', 'schedule', 'insights'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab ? theme.colors.primary : theme.colors.secondaryText },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'tasks' && renderTasks()}
        {selectedTab === 'schedule' && renderSchedule()}
        {selectedTab === 'insights' && renderInsights()}
      </View>

      <View style={[styles.chatInput, { backgroundColor: theme.colors.cardBackground }]}>
        <TouchableOpacity
          style={styles.inputButton}
          onPress={() => setShowChat(true)}
        >
          <MessageSquare size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
          placeholder="Ask your AI assistant anything..."
          placeholderTextColor={theme.colors.secondaryText}
          value={message}
          onChangeText={setMessage}
          multiline
          onFocus={() => setShowChat(true)}
        />
        <TouchableOpacity
          style={[
            styles.inputButton,
            isListening && { backgroundColor: theme.colors.primary + '20' }
          ]}
          onPress={startVoiceInput}
        >
          <Mic size={20} color={isListening ? theme.colors.primary : theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: message.trim() ? theme.colors.primary : theme.colors.border },
          ]}
          disabled={!message.trim()}
          onPress={handleSendMessage}
        >
          <Send size={18} color="white" />
        </TouchableOpacity>
      </View>

      <Modal visible={showChat} animationType="slide" transparent={false}>
        <View style={[styles.chatModal, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.chatHeader, { paddingTop: insets.top + 20 }]}>
            <View style={styles.chatHeaderLeft}>
              <View style={[styles.chatAvatarContainer, { backgroundColor: theme.colors.primary + '20' }]}>
                <Brain size={24} color={theme.colors.primary} />
              </View>
              <View>
                <Text style={[styles.chatHeaderTitle, { color: theme.colors.text }]}>AI Assistant</Text>
                <Text style={[styles.chatHeaderStatus, { color: theme.colors.secondaryText }]}>Always active</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setShowChat(false)}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.chatMessages} showsVerticalScrollIndicator={false}>
            {aiMessages.map(msg => (
              <View
                key={msg.id}
                style={[
                  styles.messageContainer,
                  msg.role === 'user' ? styles.userMessage : styles.assistantMessage,
                ]}
              >
                {msg.role === 'assistant' && (
                  <View style={[styles.messageAvatar, { backgroundColor: theme.colors.primary + '20' }]}>
                    <Brain size={16} color={theme.colors.primary} />
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    {
                      backgroundColor:
                        msg.role === 'user'
                          ? theme.colors.primary
                          : theme.colors.cardBackground,
                    },
                  ]}
                >
                  {msg.parts?.map((part: any, i: number) => {
                    if (part.type === 'text') {
                      return (
                        <Text
                          key={i}
                          style={[
                            styles.messageText,
                            {
                              color:
                                msg.role === 'user'
                                  ? 'white'
                                  : theme.colors.text,
                            },
                          ]}
                        >
                          {part.text}
                        </Text>
                      );
                    }
                    if (part.type === 'tool') {
                      return (
                        <View key={i} style={styles.toolCall}>
                          <Sparkles size={14} color={theme.colors.primary} />
                          <Text style={[styles.toolCallText, { color: theme.colors.primary }]}>
                            {part.toolName}
                          </Text>
                        </View>
                      );
                    }
                    return null;
                  })}
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={[styles.chatInputContainer, { backgroundColor: theme.colors.cardBackground }]}>
            <TextInput
              style={[styles.chatTextInput, { backgroundColor: theme.colors.background, color: theme.colors.text }]}
              placeholder="Type your message..."
              placeholderTextColor={theme.colors.secondaryText}
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity
              style={styles.chatInputButton}
              onPress={startVoiceInput}
            >
              <Mic size={20} color={isListening ? theme.colors.primary : theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.chatSendButton,
                { backgroundColor: message.trim() ? theme.colors.primary : theme.colors.border },
              ]}
              disabled={!message.trim()}
              onPress={handleSendMessage}
            >
              <Send size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <AIWorkforceSidebar isVisible={showSidebar} onClose={closeSidebar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700' as const,
  },
  agentOverviewScroll: {
    paddingVertical: 8,
    gap: 12,
  },
  agentStatusCard: {
    width: 80,
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  agentCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  miniStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    bottom: -1,
    right: -1,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  agentMiniName: {
    fontSize: 10,
    fontWeight: '600' as const,
    textAlign: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  heroCard: {
    backgroundColor: 'transparent',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700' as const,
    marginBottom: 12,
    textAlign: 'center',
  },
  heroDescription: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 32,
  },
  heroStat: {
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    minHeight: 120,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 11,
    lineHeight: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
  },
  emptyState: {
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  taskCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500' as const,
    flex: 1,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 16,
  },
  aiBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  taskTime: {
    fontSize: 13,
  },
  taskStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  taskStatusText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  meetingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  meetingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  meetingInfo: {
    flex: 1,
  },
  meetingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    marginBottom: 4,
  },
  meetingTime: {
    fontSize: 13,
    marginBottom: 6,
  },
  meetingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  meetingAttendees: {
    fontSize: 12,
  },
  meetingAction: {
    padding: 8,
  },
  insightCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  insightValue: {
    fontSize: 20,
    fontWeight: '700' as const,
    marginBottom: 8,
  },
  insightDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  recommendationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  recommendationText: {
    fontSize: 13,
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  inputButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 8,
    maxHeight: 100,
    fontSize: 15,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatModal: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chatAvatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeaderTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  chatHeaderStatus: {
    fontSize: 12,
    marginTop: 2,
  },
  chatMessages: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  assistantMessage: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  toolCall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  toolCallText: {
    fontSize: 13,
    fontWeight: '600' as const,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  chatInputButton: {
    padding: 8,
  },
  chatTextInput: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 8,
    maxHeight: 100,
    fontSize: 15,
  },
  chatSendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
