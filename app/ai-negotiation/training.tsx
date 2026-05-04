 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
} from 'react-native';
import {
  Brain,
  BookOpen,
  Target,
  TrendingUp,
  MessageSquare,
  Zap,
  Settings,
  Play,
  Pause,
  CircleCheck,
  CircleAlert,
  Clock,
  Award,
  ChartBar,
  Pencil,
  Plus,
  Trash2,
  Save,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

interface Strategy {
  id: string;
  title: string;
  description: string;
  category: 'pricing' | 'objection' | 'closing' | 'rapport';
  effectiveness: number;
  timesUsed: number;
}

interface ConversationFlow {
  id: string;
  name: string;
  trigger: string;
  response: string;
  isActive: boolean;
}

export default function AITrainingScreen() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'strategies' | 'flows' | 'rules' | 'learning'>('strategies');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingFlow, setEditingFlow] = useState<ConversationFlow | null>(null);

  const [aiConfig, setAIConfig] = useState({
    aggressiveness: 5,
    emotionalIntelligence: true,
    learningMode: true,
    autoAdapt: true,
    priceFlexibility: 15,
    maxDiscount: 25,
  });

  const [strategies, setStrategies] = useState<Strategy[]>([
    {
      id: '1',
      title: 'Value-First Approach',
      description: 'Lead with value proposition before discussing price',
      category: 'pricing',
      effectiveness: 87,
      timesUsed: 145,
    },
    {
      id: '2',
      title: 'Social Proof Technique',
      description: 'Reference similar successful clients and case studies',
      category: 'objection',
      effectiveness: 92,
      timesUsed: 203,
    },
    {
      id: '3',
      title: 'Trial Close',
      description: 'Test readiness with assumptive questions',
      category: 'closing',
      effectiveness: 78,
      timesUsed: 98,
    },
    {
      id: '4',
      title: 'Mirror & Match',
      description: 'Adapt communication style to customer preferences',
      category: 'rapport',
      effectiveness: 95,
      timesUsed: 412,
    },
  ]);

  const [conversationFlows, setConversationFlows] = useState<ConversationFlow[]>([
    {
      id: '1',
      name: 'Price Too High',
      trigger: 'price, expensive, too much, cost',
      response: 'I understand your concern about pricing. Let me show you the ROI and value you\'ll receive...',
      isActive: true,
    },
    {
      id: '2',
      name: 'Need Time to Think',
      trigger: 'think about it, not sure, need time',
      response: 'Absolutely, I respect that. What specific aspects would you like to review?',
      isActive: true,
    },
    {
      id: '3',
      name: 'Competitor Mention',
      trigger: 'competitor, other options, comparing',
      response: 'Great that you\'re doing your research! Here\'s what makes us different...',
      isActive: true,
    },
  ]);

  const learningMetrics = [
    { label: 'Win Rate Improvement', value: '+12%', icon: TrendingUp, color: '#34C759' },
    { label: 'Avg Deal Size', value: '+$8.4K', icon: Target, color: '#007AFF' },
    { label: 'Call Duration', value: '-3:24', icon: Clock, color: '#FF9500' },
    { label: 'Objections Handled', value: '94%', icon: CircleCheck, color: '#AF52DE' },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pricing': return '#007AFF';
      case 'objection': return '#FF9500';
      case 'closing': return '#34C759';
      case 'rapport': return '#AF52DE';
      default: return '#666';
    }
  };

  const renderStrategies = () => (
    <View style={styles.tabContent}>
      <View style={styles.tabHeader}>
        <Text style={[styles.tabTitle, { color: theme.colors.text }]}>Negotiation Strategies</Text>
        <Text style={[styles.tabSubtitle, { color: theme.colors.secondaryText }]}>
          AI-powered strategies for better outcomes
        </Text>
      </View>

      {strategies.map(strategy => (
        <View key={strategy.id} style={[styles.strategyCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.strategyHeader}>
            <View style={{ flex: 1 }}>
              <View style={styles.strategyTop}>
                <Text style={[styles.strategyTitle, { color: theme.colors.text }]}>{strategy.title}</Text>
                <View style={[styles.categoryBadge, { backgroundColor: `${getCategoryColor(strategy.category)}20` }]}>
                  <Text style={[styles.categoryText, { color: getCategoryColor(strategy.category) }]}>
                    {strategy.category}
                  </Text>
                </View>
              </View>
              <Text style={[styles.strategyDescription, { color: theme.colors.secondaryText }]}>
                {strategy.description}
              </Text>
            </View>
          </View>

          <View style={styles.strategyStats}>
            <View style={styles.statItem}>
              <Target size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.statText, { color: theme.colors.secondaryText }]}>
                {strategy.effectiveness}% effective
              </Text>
            </View>
            <View style={styles.statItem}>
              <ChartBar size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.statText, { color: theme.colors.secondaryText }]}>
                {strategy.timesUsed} times used
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderConversationFlows = () => (
    <View style={styles.tabContent}>
      <View style={styles.tabHeader}>
        <Text style={[styles.tabTitle, { color: theme.colors.text }]}>Conversation Flows</Text>
        <Text style={[styles.tabSubtitle, { color: theme.colors.secondaryText }]}>
          Automated responses to common scenarios
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => setShowAddModal(true)}
      >
        <Plus size={20} color="#fff" />
        <Text style={styles.addButtonText}>Add New Flow</Text>
      </TouchableOpacity>

      {conversationFlows.map(flow => (
        <View key={flow.id} style={[styles.flowCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.flowHeader}>
            <View style={{ flex: 1 }}>
              <View style={styles.flowTop}>
                <Text style={[styles.flowName, { color: theme.colors.text }]}>{flow.name}</Text>
                <Switch
                  value={flow.isActive}
                  onValueChange={(value) => {
                    setConversationFlows(flows =>
                      flows.map(f => f.id === flow.id ? { ...f, isActive: value } : f)
                    );
                  }}
                  trackColor={{ false: '#D1D1D6', true: theme.colors.primary }}
                />
              </View>
              <View style={styles.flowSection}>
                <Text style={[styles.flowLabel, { color: theme.colors.secondaryText }]}>Trigger Words:</Text>
                <Text style={[styles.flowText, { color: theme.colors.text }]}>{flow.trigger}</Text>
              </View>
              <View style={styles.flowSection}>
                <Text style={[styles.flowLabel, { color: theme.colors.secondaryText }]}>Response:</Text>
                <Text style={[styles.flowText, { color: theme.colors.text }]} numberOfLines={2}>
                  {flow.response}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.flowActions}>
            <TouchableOpacity
              style={styles.flowActionButton}
              onPress={() => setEditingFlow(flow)}
            >
              <Pencil size={16} color={theme.colors.primary} />
              <Text style={[styles.flowActionText, { color: theme.colors.primary }]}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.flowActionButton}
              onPress={() => {
                setConversationFlows(flows => flows.filter(f => f.id !== flow.id));
              }}
            >
              <Trash2 size={16} color="#FF3B30" />
              <Text style={[styles.flowActionText, { color: '#FF3B30' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderRules = () => (
    <View style={styles.tabContent}>
      <View style={styles.tabHeader}>
        <Text style={[styles.tabTitle, { color: theme.colors.text }]}>AI Behavior Rules</Text>
        <Text style={[styles.tabSubtitle, { color: theme.colors.secondaryText }]}>
          Configure AI negotiation parameters
        </Text>
      </View>

      <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.ruleHeader}>
          <Zap size={20} color="#FF9500" />
          <Text style={[styles.ruleTitle, { color: theme.colors.text }]}>Aggressiveness Level</Text>
        </View>
        <View style={styles.sliderContainer}>
          <Text style={[styles.sliderValue, { color: theme.colors.text }]}>{aiConfig.aggressiveness}/10</Text>
          <View style={styles.slider}>
            {[...Array(10)].map((_, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.sliderDot,
                  {
                    backgroundColor: i < aiConfig.aggressiveness ? theme.colors.primary : '#E5E5EA',
                  },
                ]}
                onPress={() => setAIConfig({ ...aiConfig, aggressiveness: i + 1 })}
              />
            ))}
          </View>
        </View>
        <Text style={[styles.ruleDescription, { color: theme.colors.secondaryText }]}>
          How assertively should AI push for better terms
        </Text>
      </View>

      <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.ruleHeader}>
          <Target size={20} color="#007AFF" />
          <Text style={[styles.ruleTitle, { color: theme.colors.text }]}>Price Flexibility</Text>
        </View>
        <View style={styles.sliderContainer}>
          <Text style={[styles.sliderValue, { color: theme.colors.text }]}>{aiConfig.priceFlexibility}%</Text>
          <View style={styles.slider}>
            {[0, 5, 10, 15, 20, 25, 30].map(val => (
              <TouchableOpacity
                key={val}
                style={[
                  styles.sliderDot,
                  {
                    backgroundColor: val <= aiConfig.priceFlexibility ? theme.colors.primary : '#E5E5EA',
                  },
                ]}
                onPress={() => setAIConfig({ ...aiConfig, priceFlexibility: val })}
              />
            ))}
          </View>
        </View>
        <Text style={[styles.ruleDescription, { color: theme.colors.secondaryText }]}>
          Standard discount range AI can offer without approval
        </Text>
      </View>

      <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.ruleRow}>
          <View style={{ flex: 1 }}>
            <View style={styles.ruleHeader}>
              <Brain size={20} color="#AF52DE" />
              <Text style={[styles.ruleTitle, { color: theme.colors.text }]}>Emotional Intelligence</Text>
            </View>
            <Text style={[styles.ruleDescription, { color: theme.colors.secondaryText }]}>
              Detect and adapt to customer emotions
            </Text>
          </View>
          <Switch
            value={aiConfig.emotionalIntelligence}
            onValueChange={(value) => setAIConfig({ ...aiConfig, emotionalIntelligence: value })}
            trackColor={{ false: '#D1D1D6', true: theme.colors.primary }}
          />
        </View>
      </View>

      <View style={[styles.ruleCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.ruleRow}>
          <View style={{ flex: 1 }}>
            <View style={styles.ruleHeader}>
              <BookOpen size={20} color="#34C759" />
              <Text style={[styles.ruleTitle, { color: theme.colors.text }]}>Learning Mode</Text>
            </View>
            <Text style={[styles.ruleDescription, { color: theme.colors.secondaryText }]}>
              AI learns from successful negotiations
            </Text>
          </View>
          <Switch
            value={aiConfig.learningMode}
            onValueChange={(value) => setAIConfig({ ...aiConfig, learningMode: value })}
            trackColor={{ false: '#D1D1D6', true: theme.colors.primary }}
          />
        </View>
      </View>

      <TouchableOpacity style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}>
        <Save size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Save Configuration</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLearning = () => (
    <View style={styles.tabContent}>
      <View style={styles.tabHeader}>
        <Text style={[styles.tabTitle, { color: theme.colors.text }]}>AI Learning Progress</Text>
        <Text style={[styles.tabSubtitle, { color: theme.colors.secondaryText }]}>
          How AI is improving over time
        </Text>
      </View>

      <View style={styles.metricsGrid}>
        {learningMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <View
              key={index}
              style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}
            >
              <View style={[styles.metricIcon, { backgroundColor: `${metric.color}20` }]}>
                <Icon size={20} color={metric.color} />
              </View>
              <Text style={[styles.metricValue, { color: metric.color }]}>{metric.value}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>
                {metric.label}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.insightHeader}>
          <Award size={24} color="#FFD700" />
          <Text style={[styles.insightTitle, { color: theme.colors.text }]}>Recent Improvements</Text>
        </View>
        <View style={styles.insightItem}>
          <CircleCheck size={16} color="#34C759" />
          <Text style={[styles.insightText, { color: theme.colors.text }]}>
            AI learned to handle budget objections 15% more effectively
          </Text>
        </View>
        <View style={styles.insightItem}>
          <CircleCheck size={16} color="#34C759" />
          <Text style={[styles.insightText, { color: theme.colors.text }]}>
            Improved closing rate by adapting to customer urgency signals
          </Text>
        </View>
        <View style={styles.insightItem}>
          <CircleCheck size={16} color="#34C759" />
          <Text style={[styles.insightText, { color: theme.colors.text }]}>
            Identified optimal discount range: 8-12% for best outcomes
          </Text>
        </View>
      </View>

      <View style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.insightHeader}>
          <CircleAlert size={24} color="#FF9500" />
          <Text style={[styles.insightTitle, { color: theme.colors.text }]}>Areas for Improvement</Text>
        </View>
        <View style={styles.insightItem}>
          <CircleAlert size={16} color="#FF9500" />
          <Text style={[styles.insightText, { color: theme.colors.text }]}>
            Consider more follow-up questions during discovery phase
          </Text>
        </View>
        <View style={styles.insightItem}>
          <CircleAlert size={16} color="#FF9500" />
          <Text style={[styles.insightText, { color: theme.colors.text }]}>
            Practice handling competitor comparison objections
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'AI Training',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <View style={styles.tabs}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'strategies' && { borderBottomColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab('strategies')}
          >
            <Target
              size={18}
              color={selectedTab === 'strategies' ? theme.colors.primary : theme.colors.secondaryText}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedTab === 'strategies' ? theme.colors.primary : theme.colors.secondaryText,
                },
              ]}
            >
              Strategies
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'flows' && { borderBottomColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab('flows')}
          >
            <MessageSquare
              size={18}
              color={selectedTab === 'flows' ? theme.colors.primary : theme.colors.secondaryText}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedTab === 'flows' ? theme.colors.primary : theme.colors.secondaryText,
                },
              ]}
            >
              Flows
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'rules' && { borderBottomColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab('rules')}
          >
            <Settings
              size={18}
              color={selectedTab === 'rules' ? theme.colors.primary : theme.colors.secondaryText}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedTab === 'rules' ? theme.colors.primary : theme.colors.secondaryText,
                },
              ]}
            >
              Rules
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'learning' && { borderBottomColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab('learning')}
          >
            <Brain
              size={18}
              color={selectedTab === 'learning' ? theme.colors.primary : theme.colors.secondaryText}
            />
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedTab === 'learning' ? theme.colors.primary : theme.colors.secondaryText,
                },
              ]}
            >
              Learning
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'strategies' && renderStrategies()}
        {selectedTab === 'flows' && renderConversationFlows()}
        {selectedTab === 'rules' && renderRules()}
        {selectedTab === 'learning' && renderLearning()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  tabHeader: {
    marginBottom: 20,
  },
  tabTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  tabSubtitle: {
    fontSize: 14,
  },
  strategyCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  strategyHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  strategyTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  strategyTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  strategyDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  strategyStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  flowCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  flowHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  flowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  flowName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  flowSection: {
    marginBottom: 8,
  },
  flowLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  flowText: {
    fontSize: 14,
    lineHeight: 20,
  },
  flowActions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  flowActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  flowActionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  ruleCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  ruleTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  ruleDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  ruleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderContainer: {
    marginBottom: 12,
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  slider: {
    flexDirection: 'row',
    gap: 8,
  },
  sliderDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  metricCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
