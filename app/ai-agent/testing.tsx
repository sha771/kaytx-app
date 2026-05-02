import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Play,
  RefreshCw,
  Save,
  MessageSquare,
  Zap,
  CircleCheck,
  CircleAlert,
  Clock,
  Settings,
  ChevronDown,
  EllipsisVertical,
  History,
  Bug,
  Lightbulb,
  ChartBar,
  Send,
  Mic,
  Paperclip,
  X,
  Plus,
  User,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface TestMessage {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: string;
  latency?: number;
  confidence?: number;
  intent?: string;
  entities?: string[];
}

interface TestScenario {
  id: string;
  name: string;
  description: string;
  category: string;
  messages: string[];
}

interface TestResult {
  totalTests: number;
  passed: number;
  failed: number;
  avgLatency: number;
  avgConfidence: number;
}

// Mock Data
const TEST_SCENARIOS: TestScenario[] = [
  {
    id: '1',
    name: 'Password Reset Flow',
    description: 'Test agent handling of password reset requests',
    category: 'Support',
    messages: ['I forgot my password', 'How do I reset my password?', 'Can\'t login to my account'],
  },
  {
    id: '2',
    name: 'Billing Inquiry',
    description: 'Test agent responses to billing questions',
    category: 'Billing',
    messages: ['Why was I charged twice?', 'When is my next billing date?', 'I want a refund'],
  },
  {
    id: '3',
    name: 'Feature Request',
    description: 'Test agent handling of feature requests',
    category: 'Product',
    messages: ['Can you add dark mode?', 'I need integration with Slack', 'Please add export feature'],
  },
];

const INITIAL_MESSAGES: TestMessage[] = [
  {
    id: '1',
    role: 'agent',
    content: 'Hello! I\'m Support AI. How can I help you today?',
    timestamp: '10:00 AM',
    latency: 0.8,
    confidence: 98,
    intent: 'greeting',
  },
];

export default function AgentTestingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [messages, setMessages] = useState<TestMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [selectedScenario, setSelectedScenario] = useState<TestScenario | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'scenarios' | 'results'>('chat');
  const [selectedAgent, setSelectedAgent] = useState('Support AI');
  const [isTesting, setIsTesting] = useState(false);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: TestMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTesting(true);

    // Simulate agent response
    setTimeout(() => {
      const agentResponse: TestMessage = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: 'I understand your request. Let me help you with that. Based on my analysis, I can provide you with the following information...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        latency: 1.2,
        confidence: 94,
        intent: 'support_request',
        entities: ['account', 'issue'],
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTesting(false);
    }, 1200);
  };

  const runScenario = (scenario: TestScenario) => {
    setSelectedScenario(scenario);
    setActiveTab('chat');
    // Simulate running the first message of the scenario
    setInputText(scenario.messages[0]);
  };

  const renderMessage = (message: TestMessage, index: number) => {
    const isAgent = message.role === 'agent';

    return (
      <Animated.View
        key={message.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.messageContainer, isAgent && styles.messageContainerAgent]}
      >
        <View
          style={[
            styles.messageAvatar,
            { backgroundColor: isAgent ? colors.tint : '#8B5CF6' },
          ]}
        >
          {isAgent ? (
            <User size={16} color="white" />
          ) : (
            <MessageSquare size={16} color="white" />
          )}
        </View>

        <View style={[styles.messageBubble, isAgent && styles.messageBubbleAgent]}>
          <View style={styles.messageHeader}>
            <Text style={[styles.messageSender, { color: isAgent ? colors.tint : '#8B5CF6' }]}>
              {isAgent ? 'Support AI' : 'Tester'}
            </Text>
            <Text style={[styles.messageTime, { color: colors.icon }]}>
              {message.timestamp}
            </Text>
          </View>

          <Text style={[styles.messageText, { color: colors.text }]}>
            {message.content}
          </Text>

          {isAgent && message.intent && (
            <View style={styles.messageMeta}>
              <View style={[styles.metaBadge, { backgroundColor: colors.tint + '15' }]}>
                <Zap size={10} color={colors.tint} />
                <Text style={[styles.metaText, { color: colors.tint }]}>
                  {message.latency}s
                </Text>
              </View>
              <View style={[styles.metaBadge, { backgroundColor: '#10B981' + '15' }]}>
                <CircleCheck size={10} color="#10B981" />
                <Text style={[styles.metaText, { color: '#10B981' }]}>
                  {message.confidence}%
                </Text>
              </View>
              <View style={[styles.metaBadge, { backgroundColor: '#F59E0B' + '15' }]}>
                <Lightbulb size={10} color="#F59E0B" />
                <Text style={[styles.metaText, { color: '#F59E0B' }]}>
                  {message.intent}
                </Text>
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    );
  };

  const renderScenarioCard = (scenario: TestScenario, index: number) => (
    <Animated.View
      key={scenario.id}
      entering={FadeInUp.delay(index * 50)}
      style={[styles.scenarioCard, { backgroundColor: colors.card }]}
    >
      <View style={styles.scenarioHeader}>
        <View style={[styles.scenarioIcon, { backgroundColor: colors.tint + '15' }]}>
          <Bug size={18} color={colors.tint} />
        </View>
        <View style={styles.scenarioInfo}>
          <Text style={[styles.scenarioName, { color: colors.text }]}>
            {scenario.name}
          </Text>
          <Text style={[styles.scenarioDescription, { color: colors.icon }]}>
            {scenario.description}
          </Text>
        </View>
      </View>

      <View style={styles.scenarioTags}>
        <View style={[styles.categoryTag, { backgroundColor: colors.tint + '10' }]}>
          <Text style={[styles.categoryText, { color: colors.tint }]}>
            {scenario.category}
          </Text>
        </View>
        <Text style={[styles.messageCount, { color: colors.icon }]}>
          {scenario.messages.length} test messages
        </Text>
      </View>

      <View style={styles.scenarioMessages}>
        {scenario.messages.slice(0, 2).map((msg, i) => (
          <View key={i} style={styles.scenarioMessage}>
            <MessageSquare size={12} color={colors.icon} />
            <Text style={[styles.scenarioMessageText, { color: colors.icon }]} numberOfLines={1}>
              {msg}
            </Text>
          </View>
        ))}
        {scenario.messages.length > 2 && (
          <Text style={[styles.moreMessages, { color: colors.tint }]}>
            +{scenario.messages.length - 2} more
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.runButton, { backgroundColor: colors.tint }]}
        onPress={() => runScenario(scenario)}
      >
        <Play size={16} color="white" />
        <Text style={styles.runButtonText}>Run Scenario</Text>
      </TouchableOpacity>
    </Animated.View>
  );

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
              Testing Sandbox
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Test and debug your agents
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Agent Selector */}
      <View style={[styles.agentSelector, { backgroundColor: colors.card }]}>
        <Text style={[styles.selectorLabel, { color: colors.icon }]}>Testing:</Text>
        <TouchableOpacity style={styles.selectorButton}>
          <User size={18} color={colors.tint} />
          <Text style={[styles.selectorText, { color: colors.text }]}>
            {selectedAgent}
          </Text>
          <ChevronDown size={16} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'chat' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('chat')}
        >
          <MessageSquare size={16} color={activeTab === 'chat' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'chat' ? 'white' : colors.text }]}>
            Live Test
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'scenarios' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('scenarios')}
        >
          <History size={16} color={activeTab === 'scenarios' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'scenarios' ? 'white' : colors.text }]}>
            Scenarios
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'results' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('results')}
        >
          <ChartBarBig size={16} color={activeTab === 'results' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'results' ? 'white' : colors.text }]}>
            Results
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'chat' ? (
        <>
          <ScrollView
            style={styles.chatContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.chatContent}
          >
            <View style={[styles.debugBanner, { backgroundColor: colors.tint + '10' }]}>
              <Bug size={16} color={colors.tint} />
              <Text style={[styles.debugText, { color: colors.tint }]}>
                Debug mode active - Viewing detailed metrics
              </Text>
            </View>

            {messages.map((message, index) => renderMessage(message, index))}

            {isTesting && (
              <View style={styles.typingIndicator}>
                <View style={[styles.typingDot, { backgroundColor: colors.tint }]} />
                <View style={[styles.typingDot, { backgroundColor: colors.tint }]} />
                <View style={[styles.typingDot, { backgroundColor: colors.tint }]} />
              </View>
            )}
          </ScrollView>

          <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
            <TouchableOpacity style={styles.attachButton}>
              <Paperclip size={22} color={colors.icon} />
            </TouchableOpacity>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              placeholder="Type a test message..."
              placeholderTextColor={colors.icon}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity style={styles.micButton}>
              <Mic size={22} color={colors.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: colors.tint }]}              onPress={sendMessage}
            >
              <Send size={18} color="white" />
            </TouchableOpacity>
          </View>
        </>
      ) : activeTab === 'scenarios' ? (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <TouchableOpacity style={[styles.createScenario, { backgroundColor: colors.tint + '15' }]}>
            <Plus size={20} color={colors.tint} />
            <Text style={[styles.createScenarioText, { color: colors.tint }]}>
              Create New Test Scenario
            </Text>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Available Scenarios
          </Text>
          {TEST_SCENARIOS.map((scenario, index) => renderScenarioCard(scenario, index))}
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={[styles.resultsCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.resultsTitle, { color: colors.text }]}>
              Test Session Results
            </Text>
            <View style={styles.resultsGrid}>
              <View style={styles.resultBox}>
                <Text style={[styles.resultValue, { color: colors.text }]}>24</Text>
                <Text style={[styles.resultLabel, { color: colors.icon }]}>
                  Total Tests
                </Text>
              </View>
              <View style={styles.resultBox}>
                <Text style={[styles.resultValue, { color: '#10B981' }]}>21</Text>
                <Text style={[styles.resultLabel, { color: colors.icon }]}>
                  Passed
                </Text>
              </View>
              <View style={styles.resultBox}>
                <Text style={[styles.resultValue, { color: '#EF4444' }]}>3</Text>
                <Text style={[styles.resultLabel, { color: colors.icon }]}>
                  Failed
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.metricsCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.metricsTitle, { color: colors.text }]}>
              Performance Metrics
            </Text>
            <View style={styles.metricRow}>
              <View style={styles.metricItem}>
                <Clock size={18} color={colors.tint} />
                <Text style={[styles.metricValue, { color: colors.text }]}>
                  1.2s
                </Text>
                <Text style={[styles.metricLabel, { color: colors.icon }]}>
                  Avg Response Time
                </Text>
              </View>
              <View style={styles.metricItem}>
                <CircleCheck size={18} color="#10B981" />
                <Text style={[styles.metricValue, { color: colors.text }]}>
                  94.5%
                </Text>
                <Text style={[styles.metricLabel, { color: colors.icon }]}>
                  Avg Confidence
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.historyCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.historyTitle, { color: colors.text }]}>
              Recent Test Runs
            </Text>
            <View style={styles.historyItem}>
              <CircleCheck size={16} color="#10B981" />
              <View style={styles.historyInfo}>
                <Text style={[styles.historyName, { color: colors.text }]}>
                  Password Reset Flow
                </Text>
                <Text style={[styles.historyTime, { color: colors.icon }]}>
                  3 tests passed • 2 min ago
                </Text>
              </View>
            </View>
            <View style={styles.historyItem}>
              <CircleAlert size={16} color="#EF4444" />
              <View style={styles.historyInfo}>
                <Text style={[styles.historyName, { color: colors.text }]}>
                  Billing Inquiry
                </Text>
                <Text style={[styles.historyTime, { color: colors.icon }]}>
                  2 tests passed, 1 failed • 15 min ago
                </Text>
              </View>
            </View>
          </View>
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
  agentSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  selectorLabel: {
    fontSize: 13,
    marginRight: 8,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  selectorText: {
    fontSize: 15,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
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
    fontSize: 13,
    fontWeight: '600',
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 16,
  },
  debugBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  debugText: {
    fontSize: 13,
    fontWeight: '500',
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
    marginBottom: 8,
  },
  messageMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 3,
  },
  metaText: {
    fontSize: 10,
    fontWeight: '500',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.6,
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
  input: {
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  createScenario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  createScenarioText: {
    fontSize: 15,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  scenarioCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  scenarioIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  scenarioInfo: {
    flex: 1,
  },
  scenarioName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  scenarioDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  scenarioTags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  categoryTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  messageCount: {
    fontSize: 12,
  },
  scenarioMessages: {
    backgroundColor: '#00000005',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  scenarioMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  scenarioMessageText: {
    fontSize: 12,
    flex: 1,
  },
  moreMessages: {
    fontSize: 12,
    marginTop: 4,
  },
  runButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  runButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  resultsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  resultsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  resultBox: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#00000005',
    borderRadius: 10,
  },
  resultValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  resultLabel: {
    fontSize: 12,
  },
  metricsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  metricsTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
  },
  historyCard: {
    padding: 20,
    borderRadius: 16,
  },
  historyTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  historyTime: {
    fontSize: 12,
  },
});
