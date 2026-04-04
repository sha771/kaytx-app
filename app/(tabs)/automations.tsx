import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';
import {
  Zap,
  Plus,
  Play,
  Pause,
  Settings,
  Clock,
  MessageSquare,
  Filter,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Automation {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  trigger: string;
  action: string;
  executionCount: number;
  lastExecuted: string;
  status: 'active' | 'paused' | 'error';
}

interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  color: string;
}

export default function AutomationsScreen() {
  const { theme } = useTheme();
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: '1',
      name: 'Welcome Message',
      description: 'Send welcome message to new contacts',
      isActive: true,
      trigger: 'New contact added',
      action: 'Send message',
      executionCount: 47,
      lastExecuted: '2 hours ago',
      status: 'active',
    },
    {
      id: '2',
      name: 'Auto Reply',
      description: 'Reply to messages outside business hours',
      isActive: true,
      trigger: 'Message received after 6 PM',
      action: 'Send auto-reply',
      executionCount: 23,
      lastExecuted: '1 day ago',
      status: 'active',
    },
    {
      id: '3',
      name: 'Follow-up Reminder',
      description: 'Remind to follow up on unanswered messages',
      isActive: false,
      trigger: 'No reply for 24 hours',
      action: 'Send notification',
      executionCount: 12,
      lastExecuted: '3 days ago',
      status: 'paused',
    },
    {
      id: '4',
      name: 'Keyword Filter',
      description: 'Filter messages containing specific keywords',
      isActive: true,
      trigger: 'Message contains keywords',
      action: 'Move to folder',
      executionCount: 156,
      lastExecuted: '30 min ago',
      status: 'error',
    },
  ]);

  const templates: AutomationTemplate[] = [
    {
      id: '1',
      name: 'Auto Reply',
      description: 'Automatically reply to incoming messages',
      category: 'Messaging',
      icon: MessageSquare,
      color: '#007AFF',
    },
    {
      id: '2',
      name: 'Message Filter',
      description: 'Filter and organize messages automatically',
      category: 'Organization',
      icon: Filter,
      color: '#34C759',
    },
    {
      id: '3',
      name: 'Scheduled Messages',
      description: 'Send messages at specific times',
      category: 'Scheduling',
      icon: Clock,
      color: '#FF9500',
    },
    {
      id: '4',
      name: 'Smart Notifications',
      description: 'Intelligent notification management',
      category: 'Notifications',
      icon: Zap,
      color: '#FF3B30',
    },
  ];

  const toggleAutomation = (automationId: string) => {
    setAutomations(prev =>
      prev.map(automation =>
        automation.id === automationId
          ? { 
              ...automation, 
              isActive: !automation.isActive,
              status: !automation.isActive ? 'active' : 'paused'
            }
          : automation
      )
    );
  };

  const getStatusIcon = (status: Automation['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle size={16} color="#34C759" />;
      case 'paused':
        return <Pause size={16} color="#FF9500" />;
      case 'error':
        return <AlertCircle size={16} color="#FF3B30" />;
      default:
        return null;
    }
  };

  const renderAutomationCard = ({ item }: { item: Automation }) => (
    <View style={[styles.automationCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.automationHeader}>
        <View style={styles.automationInfo}>
          <View style={styles.automationTitleRow}>
            <Text style={[styles.automationName, { color: theme.colors.text }]}>
              {item.name}
            </Text>
            {getStatusIcon(item.status)}
          </View>
          <Text style={[styles.automationDescription, { color: theme.colors.secondaryText }]}>
            {item.description}
          </Text>
        </View>
        <Switch
          value={item.isActive}
          onValueChange={() => toggleAutomation(item.id)}
          trackColor={{ false: '#767577', true: theme.colors.primary }}
          thumbColor={item.isActive ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.automationDetails}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>
            Trigger:
          </Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>
            {item.trigger}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>
            Action:
          </Text>
          <Text style={[styles.detailValue, { color: theme.colors.text }]}>
            {item.action}
          </Text>
        </View>
      </View>

      <View style={styles.automationStats}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {item.executionCount}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
            Executions
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {item.lastExecuted}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
            Last Run
          </Text>
        </View>
        <TouchableOpacity style={styles.configureButton}>
          <Settings size={16} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTemplateCard = ({ item }: { item: AutomationTemplate }) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity style={[styles.templateCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.templateIcon, { backgroundColor: `${item.color}20` }]}>
          <IconComponent size={24} color={item.color} />
        </View>
        <View style={styles.templateInfo}>
          <Text style={[styles.templateName, { color: theme.colors.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.templateDescription, { color: theme.colors.secondaryText }]}>
            {item.description}
          </Text>
          <Text style={[styles.templateCategory, { color: item.color }]}>
            {item.category}
          </Text>
        </View>
        <ArrowRight size={16} color={theme.colors.secondaryText} />
      </TouchableOpacity>
    );
  };

  const activeAutomations = automations.filter(a => a.isActive);
  const totalExecutions = automations.reduce((sum, a) => sum + a.executionCount, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Automations
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Streamline your messaging workflow
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statCardValue, { color: theme.colors.text }]}>
              {activeAutomations.length}
            </Text>
            <Text style={[styles.statCardLabel, { color: theme.colors.secondaryText }]}>
              Active
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statCardValue, { color: theme.colors.text }]}>
              {totalExecutions}
            </Text>
            <Text style={[styles.statCardLabel, { color: theme.colors.secondaryText }]}>
              Total Runs
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statCardValue, { color: theme.colors.text }]}>
              98%
            </Text>
            <Text style={[styles.statCardLabel, { color: theme.colors.secondaryText }]}>
              Success Rate
            </Text>
          </View>
        </View>

        {/* Active Automations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Your Automations
          </Text>
          <FlatList
            data={automations}
            renderItem={renderAutomationCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.automationsList}
          />
        </View>

        {/* Templates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Automation Templates
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={templates}
            renderItem={renderTemplateCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.templatesList}
          />
        </View>
      </ScrollView>
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
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statCardLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  automationsList: {
    gap: 16,
  },
  automationCard: {
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  automationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  automationInfo: {
    flex: 1,
    marginRight: 16,
  },
  automationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  automationName: {
    fontSize: 16,
    fontWeight: '600',
  },
  automationDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  automationDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '500',
    width: 60,
  },
  detailValue: {
    fontSize: 13,
    flex: 1,
  },
  automationStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
  },
  configureButton: {
    padding: 8,
  },
  templatesList: {
    gap: 12,
  },
  templateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  templateDescription: {
    fontSize: 13,
    marginBottom: 4,
  },
  templateCategory: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
});