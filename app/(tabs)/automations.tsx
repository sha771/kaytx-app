 
import React, { useState, useEffect, useMemo } from 'react';
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
  ListFilter,
  ArrowRight,
  CircleCheck,
  CircleAlert,
  Lock,
  Reply,
  Send,
  Mail,
  Timer,
  Bot,
  Sparkles,
  ChevronRight,
  Users,
  CalendarClock,
  MessageCircle,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { trpc } from '@/lib/trpc';
import { RelatedFeatures, QuickLinks } from '@/components/RelatedFeatures';

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

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  route: string;
}

interface ScheduledMessage {
  id: string;
  recipient: string;
  message: string;
  scheduledTime: string;
  platform: string;
  status: 'pending' | 'sent' | 'failed';
}

export default function AutomationsScreen() {
  const { theme } = useTheme();
  
  // Backend data fetching with tRPC
  const { data: workflowAutomations, isLoading: automationsLoading, refetch: refetchAutomations } = trpc.workflowAutomation.getAutomations.useQuery();
  const { data: workflowTemplates, isLoading: templatesLoading } = trpc.workflowAutomation.getTemplates.useQuery();
  // Fetch real statistics from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ 
    category: 'core-intelligence' 
  });
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  
  const isEnterprise = useMemo(() => {
    return subscription?.plan === 'enterprise' || subscription?.plan === 'professional';
  }, [subscription]);

  const toggleAutomationMutation = trpc.workflowAutomation.toggleAutomation.useMutation();
  
  const [automations, setAutomations] = useState<Automation[]>(workflowAutomations || []);
  const [templates, setTemplates] = useState<AutomationTemplate[]>(workflowTemplates || []);
  const [scheduledMessages, setScheduledMessages] = useState<ScheduledMessage[]>([
    { id: '1', recipient: 'Team Alpha', message: 'Good morning! Here are today\'s priorities...', scheduledTime: '8:00 AM', platform: 'Slack', status: 'pending' },
    { id: '2', recipient: 'Client - Acme Corp', message: 'Weekly progress report attached', scheduledTime: '9:30 AM', platform: 'Email', status: 'pending' },
    { id: '3', recipient: 'Support Queue', message: 'Auto-response: We\'ll get back to you within 2 hours', scheduledTime: 'Recurring', platform: 'All', status: 'sent' },
  ]);

  const quickActions: QuickAction[] = [
    {
      id: 'message-automate',
      title: 'Message Automate',
      description: 'Auto-send messages based on triggers & schedules',
      icon: Send,
      color: '#007AFF',
      route: '/automation/message-automate',
    },
    {
      id: 'reply-automate',
      title: 'Reply Automate',
      description: 'Smart auto-replies with AI-powered responses',
      icon: Reply,
      color: '#34C759',
      route: '/automation/reply-automate',
    },
    {
      id: 'scheduled-messages',
      title: 'Scheduled Messages',
      description: 'Schedule messages across all platforms',
      icon: CalendarClock,
      color: '#FF9500',
      route: '/automation/scheduled-messages',
    },
    {
      id: 'ai-responder',
      title: 'AI Auto-Responder',
      description: 'Let AI handle incoming messages intelligently',
      icon: Bot,
      color: '#AF52DE',
      route: '/automation/ai-responder',
    },
  ];

  const messagingTemplates: AutomationTemplate[] = [
    {
      id: 't1',
      name: 'Welcome Message',
      description: 'Send a welcome message to new contacts automatically',
      category: 'Messaging',
      icon: MessageCircle,
      color: '#007AFF',
    },
    {
      id: 't2',
      name: 'Auto-Reply Out of Office',
      description: 'Automatically reply when you\'re unavailable',
      category: 'Reply',
      icon: Reply,
      color: '#34C759',
    },
    {
      id: 't3',
      name: 'Follow-Up Reminder',
      description: 'Auto follow-up on unanswered messages after 24h',
      category: 'Messaging',
      icon: Timer,
      color: '#FF9500',
    },
    {
      id: 't4',
      name: 'Bulk Broadcast',
      description: 'Send personalized messages to multiple contacts',
      category: 'Messaging',
      icon: Users,
      color: '#5856D6',
    },
    {
      id: 't5',
      name: 'Smart Categorizer',
      description: 'Auto-categorize and tag incoming messages by topic',
      category: 'AI',
      icon: Sparkles,
      color: '#AF52DE',
    },
    {
      id: 't6',
      name: 'Escalation Alert',
      description: 'Escalate urgent messages to the right team member',
      category: 'Reply',
      icon: CircleAlert,
      color: '#FF3B30',
    },
  ];

  useEffect(() => {
    if (workflowAutomations) {
      setAutomations(workflowAutomations);
    }
  }, [workflowAutomations]);

  useEffect(() => {
    if (workflowTemplates) {
      setTemplates(workflowTemplates);
    }
  }, [workflowTemplates]);

  const handleToggleAutomation = async (automationId: string) => {
    const automation = automations.find(a => a.id === automationId);
    if (!automation) return;

    try {
      await toggleAutomationMutation.mutateAsync({
        id: automationId,
        active: !automation.isActive
      });
      
      setAutomations(prev =>
        prev.map(a =>
          a.id === automationId
            ? { 
                ...a, 
                isActive: !a.isActive,
                status: !a.isActive ? 'active' : 'paused'
              }
            : a
        )
      );
    } catch (error) {
      console.error('Failed to toggle automation:', error);
    }
  };

  const getStatusIcon = (status: Automation['status']) => {
    switch (status) {
      case 'active':
        return <CircleCheck size={16} color="#34C759" />;
      case 'paused':
        return <Pause size={16} color="#FF9500" />;
      case 'error':
        return <CircleAlert size={16} color="#FF3B30" />;
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
          onValueChange={() => handleToggleAutomation(item.id)}
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
          style={[styles.addButton, { backgroundColor: isEnterprise ? theme.colors.primary : theme.colors.secondaryText }]}
          onPress={() => {
            if (!isEnterprise) {
              router.push('/enterprise/billing');
              return;
            }
            // Navigate to create automation
          }}
        >
          {isEnterprise ? <Plus size={20} color="white" /> : <Lock size={20} color="white" />}
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
              {scheduledMessages.filter(m => m.status === 'pending').length}
            </Text>
            <Text style={[styles.statCardLabel, { color: theme.colors.secondaryText }]}>
              Scheduled
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <TouchableOpacity
                  key={action.id}
                  style={[styles.quickActionCard, { backgroundColor: theme.colors.cardBackground }]}
                  onPress={() => router.push(action.route)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.quickActionIcon, { backgroundColor: `${action.color}15` }]}>
                    <IconComponent size={22} color={action.color} />
                  </View>
                  <Text style={[styles.quickActionTitle, { color: theme.colors.text }]}>
                    {action.title}
                  </Text>
                  <Text style={[styles.quickActionDesc, { color: theme.colors.secondaryText }]}>
                    {action.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Scheduled Messages */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Scheduled Messages
            </Text>
            <TouchableOpacity onPress={() => router.push('/automation/scheduled-messages')}>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          {scheduledMessages.map((msg) => (
            <View key={msg.id} style={[styles.scheduledCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.scheduledHeader}>
                <View style={[styles.platformBadge, { backgroundColor: msg.platform === 'Slack' ? '#E01E5A20' : msg.platform === 'Email' ? '#007AFF20' : '#FF950020' }]}>
                  {msg.platform === 'Slack' ? (
                    <MessageSquare size={12} color={msg.platform === 'Slack' ? '#E01E5A' : '#007AFF'} />
                  ) : msg.platform === 'Email' ? (
                    <Mail size={12} color="#007AFF" />
                  ) : (
                    <Send size={12} color="#FF9500" />
                  )}
                  <Text style={[styles.platformText, { color: msg.platform === 'Slack' ? '#E01E5A' : msg.platform === 'Email' ? '#007AFF' : '#FF9500' }]}>
                    {msg.platform}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: msg.status === 'pending' ? '#FF950020' : msg.status === 'sent' ? '#34C75920' : '#FF3B3020' }]}>
                  <Text style={[styles.statusText, { color: msg.status === 'pending' ? '#FF9500' : msg.status === 'sent' ? '#34C759' : '#FF3B30' }]}>
                    {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                  </Text>
                </View>
              </View>
              <Text style={[styles.scheduledRecipient, { color: theme.colors.text }]}>
                {msg.recipient}
              </Text>
              <Text style={[styles.scheduledMessage, { color: theme.colors.secondaryText }]} numberOfLines={2}>
                {msg.message}
              </Text>
              <View style={styles.scheduledFooter}>
                <View style={styles.scheduledTimeRow}>
                  <Clock size={12} color={theme.colors.secondaryText} />
                  <Text style={[styles.scheduledTime, { color: theme.colors.secondaryText }]}>
                    {msg.scheduledTime}
                  </Text>
                </View>
                <TouchableOpacity style={styles.editScheduleBtn}>
                  <Settings size={14} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Active Automations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Active Automations
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={automations}
            renderItem={renderAutomationCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.automationsList}
          />
        </View>

        {/* Messaging Automation Templates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Messaging Templates
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
                Browse All
              </Text>
            </TouchableOpacity>
          </View>
          {messagingTemplates.map((template) => {
            const IconComponent = template.icon;
            return (
              <TouchableOpacity
                key={template.id}
                style={[styles.templateCard, { backgroundColor: theme.colors.cardBackground }]}
                activeOpacity={0.7}
              >
                <View style={[styles.templateIcon, { backgroundColor: `${template.color}15` }]}>
                  <IconComponent size={24} color={template.color} />
                </View>
                <View style={styles.templateInfo}>
                  <Text style={[styles.templateName, { color: theme.colors.text }]}>
                    {template.name}
                  </Text>
                  <Text style={[styles.templateDescription, { color: theme.colors.secondaryText }]}>
                    {template.description}
                  </Text>
                  <Text style={[styles.templateCategory, { color: template.color }]}>
                    {template.category}
                  </Text>
                </View>
                <ChevronRight size={16} color={theme.colors.secondaryText} />
              </TouchableOpacity>
            );
          })}
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
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: '47%',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  quickActionDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  scheduledCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduledHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  platformBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  platformText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  scheduledRecipient: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  scheduledMessage: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  scheduledFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduledTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  scheduledTime: {
    fontSize: 12,
  },
  editScheduleBtn: {
    padding: 6,
  },
});