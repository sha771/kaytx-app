 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Webhook as WebhookIcon,
  Plus,
  Trash2,
  PenLine,
  Check,
  X,
  Zap,
  Play,
  Pause,
  RefreshCw,
  CircleAlert,
  Clock4,
  Send,
  ListFilter,
  Settings,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Webhook Types
interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'active' | 'paused' | 'failed';
  secret?: string;
  method: 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;
  retryPolicy: {
    maxRetries: number;
    backoffMultiplier: number;
    initialDelay: number;
  };
  lastTriggered?: string;
  totalTriggers: number;
  failedTriggers: number;
  createdAt: string;
}

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: string;
    condition: string;
  };
  actions: {
    type: string;
    config: any;
  }[];
  status: 'active' | 'paused' | 'draft';
  runCount: number;
  lastRun?: string;
  createdAt: string;
}

// Mock Data
const MOCK_WEBHOOKS: Webhook[] = [
  {
    id: '1',
    name: 'CRM Integration',
    url: 'https://api.salesforce.com/webhook/v1/lead',
    events: ['lead.created', 'lead.updated', 'deal.closed'],
    status: 'active',
    method: 'POST',
    retryPolicy: { maxRetries: 3, backoffMultiplier: 2, initialDelay: 1000 },
    lastTriggered: '2026-03-01T10:30:00Z',
    totalTriggers: 1250,
    failedTriggers: 12,
    createdAt: '2026-01-15T08:00:00Z',
  },
  {
    id: '2',
    name: 'Slack Notifications',
    url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
    events: ['agent.error', 'task.failed', 'alert.critical'],
    status: 'active',
    method: 'POST',
    retryPolicy: { maxRetries: 5, backoffMultiplier: 2, initialDelay: 500 },
    lastTriggered: '2026-03-01T09:15:00Z',
    totalTriggers: 3420,
    failedTriggers: 0,
    createdAt: '2026-01-20T14:00:00Z',
  },
  {
    id: '3',
    name: 'External API Sync',
    url: 'https://api.external-service.com/sync',
    events: ['data.updated', 'record.deleted'],
    status: 'paused',
    method: 'PUT',
    retryPolicy: { maxRetries: 3, backoffMultiplier: 1.5, initialDelay: 2000 },
    lastTriggered: '2026-02-28T16:45:00Z',
    totalTriggers: 890,
    failedTriggers: 45,
    createdAt: '2026-02-01T10:00:00Z',
  },
];

const MOCK_AUTOMATION_RULES: AutomationRule[] = [
  {
    id: '1',
    name: 'Auto-Assign Support Tickets',
    description: 'Automatically assign incoming support tickets to available agents based on category',
    trigger: {
      type: 'ticket.created',
      condition: 'category IS NOT NULL',
    },
    actions: [
      { type: 'assign_agent', config: { strategy: 'round_robin' } },
      { type: 'send_notification', config: { channel: 'email' } },
    ],
    status: 'active',
    runCount: 5234,
    lastRun: '2026-03-01T11:00:00Z',
    createdAt: '2026-01-10T09:00:00Z',
  },
  {
    id: '2',
    name: 'Lead Qualification',
    description: 'Score and route leads based on engagement and company size',
    trigger: {
      type: 'lead.created',
      condition: 'source == "website"',
    },
    actions: [
      { type: 'calculate_score', config: { formula: 'engagement * 0.6 + company_size * 0.4' } },
      { type: 'update_field', config: { field: 'status', value: 'qualified' } },
      { type: 'create_task', config: { type: 'follow_up', due_in_hours: 24 } },
    ],
    status: 'active',
    runCount: 1890,
    lastRun: '2026-03-01T10:45:00Z',
    createdAt: '2026-01-15T11:00:00Z',
  },
  {
    id: '3',
    name: 'High-Value Customer Alert',
    description: 'Notify team when a high-value customer submits a support request',
    trigger: {
      type: 'ticket.created',
      condition: 'customer.tier == "enterprise"',
    },
    actions: [
      { type: 'send_notification', config: { channel: 'slack', priority: 'high' } },
      { type: 'escalate', config: { level: 'senior_support' } },
      { type: 'tag', config: { tags: ['enterprise', 'priority'] } },
    ],
    status: 'active',
    runCount: 234,
    lastRun: '2026-03-01T09:30:00Z',
    createdAt: '2026-02-01T08:00:00Z',
  },
  {
    id: '4',
    name: 'Inactive Lead Follow-up',
    description: 'Send re-engagement email to leads inactive for 30 days',
    trigger: {
      type: 'schedule',
      condition: 'last_activity > 30_days AND status == "inactive"',
    },
    actions: [
      { type: 'send_email', config: { template: 'reengagement', from: 'sales@company.com' } },
      { type: 'create_task', config: { type: 'follow_up', due_in_days: 7 } },
    ],
    status: 'paused',
    runCount: 567,
    lastRun: '2026-02-28T08:00:00Z',
    createdAt: '2026-02-10T14:00:00Z',
  },
];

export default function WebhookAutomationScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'webhooks' | 'automation'>('webhooks');
  const [webhooks, setWebhooks] = useState(MOCK_WEBHOOKS);
  const [automationRules, setAutomationRules] = useState(MOCK_AUTOMATION_RULES);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'webhook' | 'automation'>('webhook');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'paused': return '#F59E0B';
      case 'failed': return '#EF4444';
      case 'draft': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const toggleWebhookStatus = (webhookId: string) => {
    setWebhooks(webhooks.map(w =>
      w.id === webhookId
        ? { ...w, status: (w.status === 'active' ? 'paused' : 'active') as Webhook['status'] }
        : w
    ));
  };

  const toggleRuleStatus = (ruleId: string) => {
    setAutomationRules(automationRules.map(r =>
      r.id === ruleId
        ? { ...r, status: (r.status === 'active' ? 'paused' : 'active') as AutomationRule['status'] }
        : r
    ));
  };

  const deleteWebhook = (webhookId: string) => {
    Alert.alert(
      'Delete Webhook',
      'Are you sure you want to delete this webhook?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setWebhooks(webhooks.filter(w => w.id !== webhookId)),
        },
      ]
    );
  };

  const deleteRule = (ruleId: string) => {
    Alert.alert(
      'Delete Rule',
      'Are you sure you want to delete this automation rule?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setAutomationRules(automationRules.filter(r => r.id !== ruleId)),
        },
      ]
    );
  };

  const renderWebhookCard = (webhook: Webhook, index: number) => (
    <Animated.View
      key={webhook.id}
      entering={FadeInUp.delay(index * 50)}
      style={[styles.card, { backgroundColor: colors.card }]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.webhookIcon, { backgroundColor: getStatusColor(webhook.status) + '20' }]}>
          <WebhookIcon size={24} color={getStatusColor(webhook.status)} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardName, { color: colors.text }]}>{webhook.name}</Text>
          <Text style={[styles.cardUrl, { color: colors.icon }]} numberOfLines={1}>
            {webhook.url}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(webhook.status) + '20' }]}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(webhook.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(webhook.status) }]}>
            {webhook.status.charAt(0).toUpperCase() + webhook.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.eventsContainer}>
        <Text style={[styles.eventsLabel, { color: colors.icon }]}>Events:</Text>
        <View style={styles.eventsList}>
          {webhook.events.slice(0, 3).map((event, idx) => (
            <View key={idx} style={[styles.eventTag, { backgroundColor: colors.background }]}>
              <Text style={[styles.eventText, { color: colors.icon }]}>{event}</Text>
            </View>
          ))}
          {webhook.events.length > 3 && (
            <View style={[styles.eventTag, { backgroundColor: colors.background }]}>
              <Text style={[styles.eventText, { color: colors.icon }]}>+{webhook.events.length - 3}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.cardStats}>
        <View style={styles.stat}>
          <Send size={14} color={colors.icon} />
          <Text style={[styles.statText, { color: colors.text }]}>
            {webhook.totalTriggers.toLocaleString()} sent
          </Text>
        </View>
        <View style={styles.stat}>
          <Clock4 size={14} color={colors.icon} />
          <Text style={[styles.statText, { color: colors.text }]}>
            {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleDateString() : 'Never'}
          </Text>
        </View>
        {webhook.failedTriggers > 0 && (
          <View style={styles.stat}>
            <CircleAlert size={14} color="#EF4444" />
            <Text style={[styles.statText, { color: '#EF4444' }]}>
              {webhook.failedTriggers} failed
            </Text>
          </View>
        )}
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleWebhookStatus(webhook.id)}
        >
          {webhook.status === 'active' ? (
            <Pause size={18} color="#F59E0B" />
          ) : (
            <Play size={18} color="#10B981" />
          )}
          <Text style={[styles.actionText, { color: webhook.status === 'active' ? '#F59E0B' : '#10B981' }]}>
            {webhook.status === 'active' ? 'Pause' : 'Resume'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <PenLine size={18} color={colors.tint} />
          <Text style={[styles.actionText, { color: colors.tint }]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => deleteWebhook(webhook.id)}
        >
          <Trash2 size={18} color="#EF4444" />
          <Text style={[styles.actionText, { color: '#EF4444' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderRuleCard = (rule: AutomationRule, index: number) => (
    <Animated.View
      key={rule.id}
      entering={FadeInUp.delay(index * 50)}
      style={[styles.card, { backgroundColor: colors.card }]}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.ruleIcon, { backgroundColor: getStatusColor(rule.status) + '20' }]}>
          <Zap size={24} color={getStatusColor(rule.status)} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={[styles.cardName, { color: colors.text }]}>{rule.name}</Text>
          <Text style={[styles.cardDescription, { color: colors.icon }]} numberOfLines={1}>
            {rule.description}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(rule.status) + '20' }]}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(rule.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(rule.status) }]}>
            {rule.status.charAt(0).toUpperCase() + rule.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.triggerSection}>
        <Text style={[styles.triggerLabel, { color: colors.icon }]}>When:</Text>
        <View style={[styles.triggerBadge, { backgroundColor: colors.tint + '20' }]}>
          <ListFilter size={14} color={colors.tint} />
          <Text style={[styles.triggerText, { color: colors.tint }]}>
            {rule.trigger.type}
          </Text>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Text style={[styles.actionsLabel, { color: colors.icon }]}>Then:</Text>
        <View style={styles.actionsList}>
          {rule.actions.map((action, idx) => (
            <View key={idx} style={[styles.actionBadge, { backgroundColor: colors.background }]}>
              <Check size={12} color={colors.tint} />
              <Text style={[styles.actionBadgeText, { color: colors.text }]}>
                {action.type.replace('_', ' ')}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.cardStats}>
        <View style={styles.stat}>
          <RefreshCw size={14} color={colors.icon} />
          <Text style={[styles.statText, { color: colors.text }]}>
            {rule.runCount.toLocaleString()} runs
          </Text>
        </View>
        <View style={styles.stat}>
          <Clock4 size={14} color={colors.icon} />
          <Text style={[styles.statText, { color: colors.text }]}>
            {rule.lastRun ? new Date(rule.lastRun).toLocaleDateString() : 'Never'}
          </Text>
        </View>
      </View>

      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => toggleRuleStatus(rule.id)}
        >
          {rule.status === 'active' ? (
            <Pause size={18} color="#F59E0B" />
          ) : (
            <Play size={18} color="#10B981" />
          )}
          <Text style={[styles.actionText, { color: rule.status === 'active' ? '#F59E0B' : '#10B981' }]}>
            {rule.status === 'active' ? 'Pause' : 'Resume'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <PenLine size={18} color={colors.tint} />
          <Text style={[styles.actionText, { color: colors.tint }]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => deleteRule(rule.id)}
        >
          <Trash2 size={18} color="#EF4444" />
          <Text style={[styles.actionText, { color: '#EF4444' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={28} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Webhooks & Automation</Text>
          <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
            Connect and automate your workflows
          </Text>
        </View>
        <TouchableOpacity>
          <Settings size={24} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsOverview}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>{webhooks.length}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Webhooks</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>{automationRules.length}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Rules</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {webhooks.filter(w => w.status === 'active').length + automationRules.filter(r => r.status === 'active').length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Active</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'webhooks' && { borderBottomColor: colors.tint }]}
          onPress={() => setActiveTab('webhooks')}
        >
          <WebhookIcon size={20} color={activeTab === 'webhooks' ? colors.tint : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'webhooks' ? colors.tint : colors.icon }]}>
            Webhooks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'automation' && { borderBottomColor: colors.tint }]}
          onPress={() => setActiveTab('automation')}
        >
          <Zap size={20} color={activeTab === 'automation' ? colors.tint : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'automation' ? colors.tint : colors.icon }]}>
            Automation
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'webhooks' ? (
          <>
            {webhooks.map((webhook, index) => renderWebhookCard(webhook, index))}
            {webhooks.length === 0 && (
              <View style={styles.emptyState}>
                <WebhookIcon size={48} color={colors.icon} />
                <Text style={[styles.emptyTitle, { color: colors.text }]}>No webhooks yet</Text>
                <Text style={[styles.emptyText, { color: colors.icon }]}>
                  Create your first webhook to connect with external services
                </Text>
              </View>
            )}
          </>
        ) : (
          <>
            {automationRules.map((rule, index) => renderRuleCard(rule, index))}
            {automationRules.length === 0 && (
              <View style={styles.emptyState}>
                <Zap size={48} color={colors.icon} />
                <Text style={[styles.emptyTitle, { color: colors.text }]}>No automation rules</Text>
                <Text style={[styles.emptyText, { color: colors.icon }]}>
                  Create rules to automate your workflows
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.tint }]}
        onPress={() => {
          setCreateType(activeTab === 'webhooks' ? 'webhook' : 'automation');
          setShowCreateModal(true);
        }}
      >
        <Plus size={28} color="white" />
      </TouchableOpacity>

      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}
            >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Create {createType === 'webhook' ? 'Webhook' : 'Automation Rule'}</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <X size={22} color={colors.icon} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.modalText, { color: colors.icon }]}>Coming soon.</Text>
          </View>
        </View>
      </Modal>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  statsOverview: {
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
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  webhookIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  ruleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardUrl: {
    fontSize: 13,
  },
  cardDescription: {
    fontSize: 13,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  eventsContainer: {
    marginBottom: 12,
  },
  eventsLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  eventsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  eventTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  eventText: {
    fontSize: 11,
  },
  triggerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  triggerLabel: {
    fontSize: 12,
  },
  triggerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
  },
  triggerText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionsSection: {
    marginBottom: 12,
  },
  actionsLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  actionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  actionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 4,
  },
  actionBadgeText: {
    fontSize: 11,
  },
  cardStats: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginBottom: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 24,
  },
});
