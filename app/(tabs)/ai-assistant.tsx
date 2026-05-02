import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {
  Brain,
  Calendar,
  SquareCheck,
  MessageSquare,
  Clock,
  TrendingUp,
  Users,
  Zap,
  Target,
  ChartBar,
  Send,
  Mic,
  Sparkles,
  Plus,
  ChevronRight,
  X,
  Search,
  Workflow,
  Lightbulb,
  Menu,
  Star,
  Bot,
  Sparkle,
  Mail,
  Activity,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { aiEmployees, aiEmployeeCategories, AIEmployee } from '@/constants/aiEmployees';
import { useTheme } from '@/providers/ThemeProvider';
import { useAIAssistant } from '@/providers/AIAssistantProvider';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RelatedFeatures, QuickLinks } from '@/components/RelatedFeatures';

const { width } = Dimensions.get('window');

export default function AIAssistantScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const {
    tasks,
    meetings,
    insights,
    aiMessages,
    sendMessage,
  } = useAIAssistant();

  const [message, setMessage] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'tasks' | 'schedule' | 'insights'>('overview');
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);

  const sidebarAnim = useRef(new Animated.Value(-width * 0.85)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim, fadeAnim]);

  const openSidebar = useCallback(() => {
    setShowSidebar(true);
    Animated.spring(sidebarAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  }, [sidebarAnim]);

  const closeSidebar = useCallback(() => {
    Animated.timing(sidebarAnim, {
      toValue: -width * 0.85,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowSidebar(false);
    });
  }, [sidebarAnim]);

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'critical': return '#FF3B30';
      case 'high': return '#FF9500';
      case 'medium': return '#007AFF';
      case 'low': return '#34C759';
      default: return '#8E8E93';
    }
  };

  const getMeetingIcon = (type: string) => {
    switch (type) {
      case 'video': return Users;
      case 'call': return MessageSquare;
      case 'standup': return Clock;
      default: return Calendar;
    }
  };

  const startVoiceInput = useCallback(() => {
    setIsListening(prev => !prev);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    }
  }, [message, sendMessage]);

  const filteredEmployees = useMemo(() => {
    return aiEmployees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || emp.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, searchQuery]);

  const stats = useMemo(() => ({
    total: aiEmployees.length,
    active: aiEmployees.filter(e => e.infrastructure.status === 'online').length,
    savings: '$145K',
    uptime: '99.99%',
  }), []);

  const handleEmployeePress = useCallback((employee: AIEmployee) => {
    closeSidebar();
    setTimeout(() => {
      router.push(employee.route);
    }, 300);
  }, [closeSidebar]);

  const renderOverview = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.overviewScroll}>
      <View style={styles.heroSection}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primary + 'dd']}
          style={styles.heroGradient}
        >
          <View style={styles.heroHeader}>
            <View style={styles.heroIconContainer}>
              <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <Brain size={40} color="#fff" />
              </Animated.View>
            </View>
            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>Your AI Network</Text>
              <Text style={styles.heroSubtitle}>Intelligent Enterprise Core</Text>
            </View>
          </View>
          
          <View style={styles.heroStatsGrid}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>{stats.active}/{stats.total}</Text>
              <Text style={styles.heroStatLabel}>Live Agents</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>{stats.savings}</Text>
              <Text style={styles.heroStatLabel}>Saved/mo</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>{stats.uptime}</Text>
              <Text style={styles.heroStatLabel}>Uptime</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.quickActionsSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Operations</Text>
          <Zap size={18} color={theme.colors.primary} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsScroll}>
          {[
            { id: 'emails', title: 'Emails', icon: Mail, color: '#FF9500', route: '/ai-assistant/emails' },
            { id: 'calendar', title: 'Calendar', icon: Calendar, color: '#007AFF', route: '/ai-assistant/calendar' },
            { id: 'research', title: 'Research', icon: Search, color: '#AF52DE', action: () => { setShowChat(true); sendMessage('I need to research something'); } },
            { id: 'workflow', title: 'Workflow', icon: Workflow, color: '#00C7BE', action: () => { setShowChat(true); sendMessage('Create an automation'); } },
          ].map(action => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => action.route ? router.push(action.route) : action.action?.()}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + '15' }]}>
                <action.icon size={22} color={action.color} />
              </View>
              <Text style={[styles.quickActionTitle, { color: theme.colors.text }]}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.activeWorkforceSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active AI Workforce</Text>
          <TouchableOpacity onPress={openSidebar}>
            <Text style={{ color: theme.colors.primary, fontSize: 14, fontWeight: '600' }}>Manage All</Text>
          </TouchableOpacity>
        </View>
        
        {aiEmployees.slice(0, 4).map(emp => (
          <TouchableOpacity
            key={emp.id}
            style={[styles.miniEmployeeCard, { backgroundColor: theme.colors.cardBackground }]}
            onPress={() => router.push(emp.route)}
          >
            <View style={[styles.miniEmpIcon, { backgroundColor: emp.color + '15' }]}>
              <emp.icon size={20} color={emp.color} />
            </View>
            <View style={styles.miniEmpInfo}>
              <Text style={[styles.miniEmpName, { color: theme.colors.text }]}>{emp.name}</Text>
              <Text style={[styles.miniEmpTitle, { color: theme.colors.secondaryText }]} numberOfLines={1}>{emp.title}</Text>
            </View>
            <View style={styles.miniEmpStatus}>
              <View style={[styles.statusDot, { backgroundColor: emp.infrastructure.status === 'online' ? '#34C759' : '#8E8E93' }]} />
              <ChevronRight size={16} color={theme.colors.border} />
            </View>
          </TouchableOpacity>
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
            <SquareCheck size={48} color={theme.colors.secondaryText} />
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
          <ChartBarBig size={20} color={theme.colors.primary} />
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
            {aiMessages.map((msg: any) => (
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

      {/* Related Features Section - removed as per request */}

      {showSidebar && (
        <TouchableOpacity
          style={styles.sidebarOverlay}
          activeOpacity={1}
          onPress={closeSidebar}
        >
          <Animated.View
            style={[
              styles.sidebar,
              {
                backgroundColor: theme.colors.background,
                transform: [{ translateX: sidebarAnim }],
              },
            ]}
          >
            <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
              <View style={[styles.sidebarHeader, { borderBottomColor: theme.colors.border }]}>
                <View style={styles.sidebarTitleRow}>
                  <Bot size={28} color={theme.colors.primary} />
                  <Text style={[styles.sidebarTitle, { color: theme.colors.text }]}>AI Employees</Text>
                </View>
                <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
                  <X size={24} color={theme.colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
                contentContainerStyle={styles.categoryContainer}
              >
                {aiEmployeeCategories.map((cat) => {
                  const CatIcon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoryChip,
                        {
                          backgroundColor: isSelected ? theme.colors.primary : theme.colors.cardBackground,
                        },
                      ]}
                      onPress={() => setSelectedCategory(cat.id)}
                    >
                      <CatIcon size={14} color={isSelected ? '#FFF' : theme.colors.secondaryText} />
                      <Text
                        style={[
                          styles.categoryChipText,
                          { color: isSelected ? '#FFF' : theme.colors.secondaryText },
                        ]}
                      >
                        {cat.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <ScrollView 
                style={styles.employeeList}
                showsVerticalScrollIndicator={false}
              >
                {filteredEmployees.map((employee) => {
                  const EmployeeIcon = employee.icon;
                  return (
                    <TouchableOpacity
                      key={employee.id}
                      style={[styles.employeeCard, { backgroundColor: theme.colors.cardBackground }]}
                      onPress={() => handleEmployeePress(employee)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.employeeIconContainer, { backgroundColor: employee.color + '20' }]}>
                        <EmployeeIcon size={24} color={employee.color} />
                      </View>
                      <View style={styles.employeeInfo}>
                        <View style={styles.employeeNameRow}>
                          <Text style={[styles.employeeName, { color: theme.colors.text }]} numberOfLines={1}>
                            {employee.name}
                          </Text>
                          {employee.isPremium && (
                            <View style={[styles.premiumBadge, { backgroundColor: '#FFD700' + '30' }]}>
                              <Star size={10} color="#FFD700" />
                            </View>
                          )}
                          {employee.isNew && (
                            <View style={[styles.newBadge, { backgroundColor: '#34C759' + '30' }]}>
                              <Sparkle size={10} color="#34C759" />
                            </View>
                          )}
                        </View>
                        <Text style={[styles.employeeTitle, { color: theme.colors.secondaryText }]} numberOfLines={1}>
                          {employee.title}
                        </Text>
                        <View style={styles.costRow}>
                          <Text style={[styles.aiCost, { color: theme.colors.primary }]}>
                            {employee.aiCost}
                          </Text>
                          <Text style={[styles.efficiency, { color: '#34C759' }]}>
                            {employee.efficiency}
                          </Text>
                        </View>
                      </View>
                      <ChevronRight size={18} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                  );
                })}
                <View style={styles.sidebarFooter}>
                  <Text style={[styles.footerText, { color: theme.colors.secondaryText }]}>
                    {aiEmployees.length} AI Employees Available
                  </Text>
                  <Text style={[styles.footerSubtext, { color: theme.colors.secondaryText }]}>
                    Replace costly human roles with AI
                  </Text>
                </View>
              </ScrollView>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
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
    paddingHorizontal: 20,
    paddingBottom: 16,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
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
  heroStatLabel: {
    fontSize: 12,
  },
  heroCard: {
    backgroundColor: 'transparent',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  miniEmployeeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(150,150,150,0.1)',
  },
  miniEmpIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  miniEmpInfo: {
    flex: 1,
  },
  miniEmpName: {
    fontSize: 15,
    fontWeight: '700',
  },
  miniEmpTitle: {
    fontSize: 12,
    marginTop: 2,
  },
  miniEmpStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  heroSection: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  heroGradient: {
    borderRadius: 24,
    padding: 20,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  heroTextContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  heroStatsGrid: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 18,
    padding: 15,
    alignItems: 'center',
  },
  heroStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  heroStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  quickActionsSection: {
    marginBottom: 25,
  },
  quickActionsScroll: {
    paddingLeft: 20,
    gap: 12,
  },
  activeWorkforceSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  overviewScroll: {
    paddingBottom: 100,
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
  sidebarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: Dimensions.get('window').width * 0.85,
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  sidebarTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sidebarTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
  },
  closeButton: {
    padding: 8,
  },
  categoryScroll: {
    maxHeight: 50,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  employeeList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  employeeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  employeeIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  employeeInfo: {
    flex: 1,
  },
  employeeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  employeeName: {
    fontSize: 14,
    fontWeight: '600' as const,
    flex: 1,
  },
  premiumBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  employeeTitle: {
    fontSize: 11,
    marginTop: 2,
  },
  costRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  aiCost: {
    fontSize: 11,
    fontWeight: '600' as const,
  },
  efficiency: {
    fontSize: 10,
    fontWeight: '500' as const,
  },
  sidebarFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600' as const,
  },
  footerSubtext: {
    fontSize: 11,
    marginTop: 4,
  },
});
