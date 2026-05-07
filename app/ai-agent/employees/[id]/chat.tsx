import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  EllipsisVertical,
  Phone,
  Video,
  Mic,
  Send,
  Paperclip,
  Smile,
  Bot,
  Clock,
  Check,
  CheckCheck,
  Sparkles,
  Zap,
  FileText,
  ChartBarBig,
  Calendar,
  Briefcase,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Message Types
interface Message {
  id: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'voice' | 'system';
  sender: 'user' | 'agent';
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  metadata?: {
    fileName?: string;
    fileSize?: string;
    duration?: string;
    sentiment?: 'positive' | 'neutral' | 'negative';
    intent?: string;
    confidence?: number;
  };
  suggestions?: string[];
  actions?: {
    label: string;
    action: string;
    icon?: string;
  }[];
}

interface Agent {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  status: 'online' | 'busy' | 'offline';
  isTyping?: boolean;
  capabilities: string[];
}

// Mock Data
const MOCK_AGENT: Agent = {
  id: 'accounting-ai',
  name: 'Accounting & Finance AI',
  title: 'Chief Financial Officer AI',
  status: 'online',
  capabilities: ['Financial Analysis', 'Reporting', 'Budgeting', 'Bookkeeping'],
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hello! I\'m your Accounting & Finance AI. I can help you with:\n\n📊 Financial Reports\n💰 Budget Management\n📈 Performance Analytics\n📑 Bookkeeping Tasks\n\nWhat would you like to work on today?',
    type: 'text',
    sender: 'agent',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: 'read',
    suggestions: ['Generate Q1 Report', 'Review Expenses', 'Check Cash Flow', 'Update Budget'],
  },
];

const QUICK_ACTIONS = [
  { icon: FileText, label: 'Reports', color: '#3B82F6' },
  { icon: ChartBarBig, label: 'Analytics', color: '#8B5CF6' },
  { icon: Calendar, label: 'Schedule', color: '#F59E0B' },
  { icon: Briefcase, label: 'Tasks', color: '#10B981' },
];

export default function AgentChatScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText.trim(),
      type: 'text',
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setShowQuickActions(false);

    // Simulate agent typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const agentResponse = generateAgentResponse(userMessage.content);
      setMessages(prev => [...prev, agentResponse]);
    }, 1500 + Math.random() * 1500);
  };

  const generateAgentResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('report') || lowerMessage.includes('q1')) {
      return {
        id: (Date.now() + 1).toString(),
        content: 'I can help you generate the Q1 financial report. Let me pull the latest data from your accounting system.',
        type: 'text',
        sender: 'agent',
        timestamp: new Date().toISOString(),
        status: 'read',
        actions: [
          { label: 'Generate Q1 Report', action: 'generate_report', icon: 'file' },
          { label: 'View Previous Reports', action: 'view_reports', icon: 'folder' },
        ],
        metadata: {
          sentiment: 'positive',
          intent: 'report_generation',
          confidence: 0.95,
        },
      };
    }

    if (lowerMessage.includes('expense') || lowerMessage.includes('spending')) {
      return {
        id: (Date.now() + 1).toString(),
        content: 'I\'ve analyzed your expense data. Here\'s a summary:\n\n💰 Total Expenses (MTD): $127,450\n📊 Top Categories:\n• Salaries: $85,000 (67%)\n• Operations: $22,450 (18%)\n• Marketing: $12,000 (9%)\n• Software: $8,000 (6%)\n\nYou\'re tracking 8% under budget for this month.',
        type: 'text',
        sender: 'agent',
        timestamp: new Date().toISOString(),
        status: 'read',
        actions: [
          { label: 'View Detailed Breakdown', action: 'view_expenses', icon: 'chart' },
          { label: 'Download CSV', action: 'download_csv', icon: 'download' },
        ],
        metadata: {
          sentiment: 'neutral',
          intent: 'expense_review',
          confidence: 0.92,
        },
      };
    }

    if (lowerMessage.includes('budget') || lowerMessage.includes('forecast')) {
      return {
        id: (Date.now() + 1).toString(),
        content: 'Based on your current spending patterns and revenue projections, here\'s your budget forecast:\n\n📈 Projected Q2 Budget: $485,000\n💵 Current Burn Rate: $142K/month\n⏱️ Runway: 18 months\n\nWould you like me to create a detailed budget plan?',
        type: 'text',
        sender: 'agent',
        timestamp: new Date().toISOString(),
        status: 'read',
        actions: [
          { label: 'Create Budget Plan', action: 'create_budget', icon: 'calendar' },
          { label: 'Adjust Forecast', action: 'adjust_forecast', icon: 'settings' },
        ],
        metadata: {
          sentiment: 'positive',
          intent: 'budget_planning',
          confidence: 0.88,
        },
      };
    }

    return {
      id: (Date.now() + 1).toString(),
      content: 'I understand. I can help you with that. Would you like me to:\n\n1. Look up specific financial data\n2. Generate a report\n3. Analyze trends\n4. Schedule a task\n\nOr just let me know what specific information you need!',
      type: 'text',
      sender: 'agent',
      timestamp: new Date().toISOString(),
      status: 'read',
      suggestions: ['Show Dashboard', 'Recent Transactions', 'Help'],
      metadata: {
        sentiment: 'neutral',
        intent: 'general_inquiry',
        confidence: 0.75,
      },
    };
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock size={14} color={colors.icon} />;
      case 'sent':
        return <Check size={14} color={colors.icon} />;
      case 'delivered':
        return <CheckCheck size={14} color={colors.icon} />;
      case 'read':
        return <CheckCheck size={14} color={colors.tint} />;
      default:
        return null;
    }
  };

  const renderMessage = (message: Message, index: number) => {
    const isAgent = message.sender === 'agent';

    return (
      <Animated.View
        key={message.id}
        entering={FadeInUp.delay(index * 50)}
        style={[
          styles.messageContainer,
          isAgent ? styles.agentMessageContainer : styles.userMessageContainer,
        ]}
      >
        {isAgent && (
          <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
            <Bot size={20} color="white" />
          </View>
        )}

        <View style={styles.messageContent}>
          <View
            style={[
              styles.messageBubble,
              {
                backgroundColor: isAgent ? colors.card : colors.tint,
                borderBottomLeftRadius: isAgent ? 4 : 16,
                borderBottomRightRadius: isAgent ? 16 : 4,
              },
            ]}
          >
            <Text
              style={[
                styles.messageText,
                { color: isAgent ? colors.text : 'white' },
              ]}
            >
              {message.content}
            </Text>

            {/* Action Buttons */}
            {message.actions && message.actions.length > 0 && (
              <View style={styles.actionButtonsContainer}>
                {message.actions.map((action, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.actionButton, { backgroundColor: isAgent ? colors.tint + '15' : 'rgba(255,255,255,0.2)' }]}
                  >
                    <Sparkles size={14} color={isAgent ? colors.tint : 'white'} />
                    <Text
                      style={[
                        styles.actionButtonText,
                        { color: isAgent ? colors.tint : 'white' },
                      ]}
                    >
                      {action.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Suggestions */}
          {message.suggestions && message.suggestions.length > 0 && isAgent && (
            <View style={styles.suggestionsContainer}>
              {message.suggestions.map((suggestion, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.suggestionChip, { backgroundColor: colors.tint + '15' }]}
                  onPress={() => {
                    setInputText(suggestion);
                    handleSend();
                  }}
                >
                  <Text style={[styles.suggestionText, { color: colors.tint }]}>
                    {suggestion}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Metadata */}
          {message.metadata && isAgent && (
            <View style={styles.metadataContainer}>
              <View style={[styles.intentBadge, { backgroundColor: colors.background }]}>
                <Zap size={12} color={colors.icon} />
                <Text style={[styles.intentText, { color: colors.icon }]}>
                  {message.metadata.intent?.replace('_', ' ')}
                </Text>
              </View>
              <Text style={[styles.confidenceText, { color: colors.icon }]}>
                {(message.metadata.confidence! * 100).toFixed(0)}% confidence
              </Text>
            </View>
          )}

          <View style={styles.messageFooter}>
            <Text style={[styles.timestamp, { color: colors.icon }]}>
              {formatTime(message.timestamp)}
            </Text>
            {!isAgent && (
              <View style={styles.statusContainer}>
                {getStatusIcon(message.status)}
              </View>
            )}
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.agentInfo}>
            <View style={[styles.agentAvatar, { backgroundColor: colors.tint }]}>
              <Bot size={24} color="white" />
            </View>
            <View>
              <Text style={[styles.agentName, { color: colors.text }]}>
                {MOCK_AGENT.name}
              </Text>
              <View style={styles.statusRow}>
                <View style={[styles.onlineDot, { backgroundColor: '#10B981' }]} />
                <Text style={[styles.statusText, { color: colors.icon }]}>
                  {MOCK_AGENT.status === 'online' ? 'Online' : 'Offline'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Phone size={20} color={colors.tint} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Video size={20} color={colors.tint} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <EllipsisVertical size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      {showQuickActions && (
        <Animated.View entering={FadeIn} style={styles.quickActionsContainer}>
          <Text style={[styles.quickActionsTitle, { color: colors.icon }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsRow}>
            {QUICK_ACTIONS.map((action, index) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.quickActionButton, { backgroundColor: colors.card }]}
                  onPress={() => {
                    setInputText(action.label);
                    handleSend();
                  }}
                >
                  <View
                    style={[
                      styles.quickActionIcon,
                      { backgroundColor: action.color + '20' },
                    ]}
                  >
                    <Icon size={20} color={action.color} />
                  </View>
                  <Text style={[styles.quickActionLabel, { color: colors.text }]}>
                    {action.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>
      )}

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={scrollToBottom}
      >
        {messages.map((message, index) => renderMessage(message, index))}

        {/* Typing Indicator */}
        {isTyping && (
          <Animated.View entering={FadeIn} style={styles.typingContainer}>
            <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
              <Bot size={20} color="white" />
            </View>
            <View style={[styles.typingBubble, { backgroundColor: colors.card }]}>
              <View style={styles.typingDots}>
                <View style={[styles.typingDot, { backgroundColor: colors.icon }]} />
                <View style={[styles.typingDot, { backgroundColor: colors.icon }]} />
                <View style={[styles.typingDot, { backgroundColor: colors.icon }]} />
              </View>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={22} color={colors.icon} />
          </TouchableOpacity>

          <View style={[styles.inputWrapper, { backgroundColor: colors.background }]}>
            <TextInput
              style={[styles.textInput, { color: colors.text }]}
              placeholder="Type a message..."
              placeholderTextColor={colors.icon}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={1000}
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Smile size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>

          {inputText.trim() ? (
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: colors.tint }]}
              onPress={handleSend}
            >
              <Send size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.micButton}>
              <Mic size={22} color={colors.tint} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  agentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 4,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
  },
  quickActionsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  quickActionsTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '85%',
  },
  agentMessageContainer: {
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  messageContent: {
    flex: 1,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  suggestionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  suggestionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  metadataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
    marginLeft: 4,
  },
  intentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  intentText: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  confidenceText: {
    fontSize: 11,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginLeft: 4,
  },
  timestamp: {
    fontSize: 11,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  typingBubble: {
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    marginLeft: 8,
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    maxHeight: 100,
    paddingVertical: 4,
  },
  emojiButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  micButton: {
    padding: 8,
    marginLeft: 8,
  },
});
