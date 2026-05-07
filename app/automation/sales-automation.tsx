 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import {
  Zap,
  Mail,
  MessageSquare,
  Phone,
  Calendar,
  Target,
  TrendingUp,
  Users,
  CircleCheck,
  Clock,
  Play,
  Pause,
  Settings,
  Plus,
  X,
  Pencil,
  Trash2,
  ChartBarBig,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';

interface Workflow {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  isActive: boolean;
  leadsProcessed: number;
  conversionRate: number;
  lastRun: string;
}

interface AutomationStats {
  totalLeads: number;
  emailsSent: number;
  callsScheduled: number;
  conversions: number;
}

export default function SalesAutomationScreen() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'workflows' | 'stats' | 'settings'>('workflows');
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);

  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'New Lead Welcome',
      trigger: 'Lead Created',
      actions: ['Send Welcome Email', 'Add to CRM', 'Schedule Follow-up'],
      isActive: true,
      leadsProcessed: 245,
      conversionRate: 18.5,
      lastRun: '5 minutes ago',
    },
    {
      id: '2',
      name: 'Demo Request Follow-up',
      trigger: 'Demo Requested',
      actions: ['Send Confirmation', 'Create Calendar Event', 'Notify Sales Team'],
      isActive: true,
      leadsProcessed: 89,
      conversionRate: 42.3,
      lastRun: '15 minutes ago',
    },
    {
      id: '3',
      name: 'Abandoned Cart Recovery',
      trigger: 'Cart Abandoned',
      actions: ['Wait 1 Hour', 'Send Reminder Email', 'Offer 10% Discount'],
      isActive: true,
      leadsProcessed: 156,
      conversionRate: 28.7,
      lastRun: '1 hour ago',
    },
    {
      id: '4',
      name: 'Cold Lead Re-engagement',
      trigger: 'No Activity 30 Days',
      actions: ['Send Re-engagement Email', 'Offer Free Trial', 'Schedule Call'],
      isActive: false,
      leadsProcessed: 67,
      conversionRate: 12.1,
      lastRun: '2 days ago',
    },
  ]);

  const stats: AutomationStats = {
    totalLeads: 1247,
    emailsSent: 3456,
    callsScheduled: 234,
    conversions: 289,
  };

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev =>
      prev.map(w => (w.id === id ? { ...w, isActive: !w.isActive } : w))
    );
  };

  const renderWorkflows = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => setShowWorkflowModal(true)}
      >
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>Create Workflow</Text>
      </TouchableOpacity>

      <FlatList
        data={workflows}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={[styles.workflowCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.workflowHeader}>
              <View style={styles.workflowInfo}>
                <View style={styles.workflowTitleRow}>
                  <Zap size={20} color={item.isActive ? theme.colors.primary : theme.colors.secondaryText} />
                  <Text style={[styles.workflowName, { color: theme.colors.text }]}>
                    {item.name}
                  </Text>
                </View>
                <View style={styles.triggerBadge}>
                  <Target size={12} color={theme.colors.primary} />
                  <Text style={[styles.triggerText, { color: theme.colors.secondaryText }]}>
                    {item.trigger}
                  </Text>
                </View>
              </View>
              <Switch
                value={item.isActive}
                onValueChange={() => toggleWorkflow(item.id)}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={item.isActive ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={styles.actionsContainer}>
              {item.actions.map((action, index) => (
                <View key={index} style={[styles.actionChip, { backgroundColor: theme.colors.background }]}>
                  <Text style={[styles.actionText, { color: theme.colors.text }]}>
                    {index + 1}. {action}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.workflowStats}>
              <View style={styles.workflowStat}>
                <Users size={14} color={theme.colors.secondaryText} />
                <Text style={[styles.statText, { color: theme.colors.text }]}>
                  {item.leadsProcessed} leads
                </Text>
              </View>
              <View style={styles.workflowStat}>
                <TrendingUp size={14} color="#34C759" />
                <Text style={[styles.statText, { color: theme.colors.text }]}>
                  {item.conversionRate}% conversion
                </Text>
              </View>
              <View style={styles.workflowStat}>
                <Clock size={14} color={theme.colors.secondaryText} />
                <Text style={[styles.statText, { color: theme.colors.secondaryText }]}>
                  {item.lastRun}
                </Text>
              </View>
            </View>

            <View style={styles.workflowActions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.colors.background }]}
                onPress={() => {
                  setEditingWorkflow(item);
                  setShowWorkflowModal(true);
                }}
              >
                <Pencil size={16} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.colors.background }]}
              >
                <Trash2 size={16} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );

  const renderStats = () => (
    <View style={styles.tabContent}>
      <View style={[styles.statsGrid, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#007AFF20' }]}>
            <Users size={24} color="#007AFF" />
          </View>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {stats.totalLeads.toLocaleString()}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
            Total Leads
          </Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#FF950020' }]}>
            <Mail size={24} color="#FF9500" />
          </View>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {stats.emailsSent.toLocaleString()}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
            Emails Sent
          </Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#AF52DE20' }]}>
            <Calendar size={24} color="#AF52DE" />
          </View>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {stats.callsScheduled}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
            Calls Scheduled
          </Text>
        </View>

        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#34C75920' }]}>
            <CircleCheck size={24} color="#34C759" />
          </View>
          <Text style={[styles.statValue, { color: theme.colors.text }]}>
            {stats.conversions}
          </Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
            Conversions
          </Text>
        </View>
      </View>

      <View style={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
          Automation Performance
        </Text>
        <Text style={[styles.chartSubtitle, { color: theme.colors.secondaryText }]}>
          Last 30 days
        </Text>
        <View style={styles.chartPlaceholder}>
          <ChartBarBig size={48} color={theme.colors.secondaryText} />
          <Text style={[styles.chartPlaceholderText, { color: theme.colors.secondaryText }]}>
            Performance chart would appear here
          </Text>
        </View>
      </View>

      <View style={[styles.activityCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.activityTitle, { color: theme.colors.text }]}>
          Recent Activity
        </Text>
        {[
          { icon: Mail, text: 'Sent welcome email to John Smith', time: '2 min ago', color: '#FF9500' },
          { icon: Calendar, text: 'Scheduled demo call with Sarah Johnson', time: '15 min ago', color: '#AF52DE' },
          { icon: MessageSquare, text: 'Sent follow-up SMS to Mike Davis', time: '1 hour ago', color: '#007AFF' },
          { icon: CircleCheck, text: 'Lead converted: Emily Brown', time: '2 hours ago', color: '#34C759' },
        ].map((activity, index) => {
          const Icon = activity.icon;
          return (
            <View key={index} style={styles.activityItem}>
              <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
                <Icon size={16} color={activity.color} />
              </View>
              <View style={styles.activityContent}>
                <Text style={[styles.activityText, { color: theme.colors.text }]}>
                  {activity.text}
                </Text>
                <Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>
                  {activity.time}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.tabContent}>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingsTitle, { color: theme.colors.text }]}>
          Automation Settings
        </Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Auto-assign Leads
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Automatically assign new leads to sales team
            </Text>
          </View>
          <Switch
            value={true}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={'#fff'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Email Notifications
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Notify team when workflows complete
            </Text>
          </View>
          <Switch
            value={true}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={'#fff'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Smart Scheduling
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              AI optimizes send times for better engagement
            </Text>
          </View>
          <Switch
            value={false}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={'#f4f3f4'}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Sales Automation',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Sales Automation</Text>
        <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
          Automate your sales workflows and boost conversions
        </Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'workflows' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('workflows')}
        >
          <Zap
            size={20}
            color={activeTab === 'workflows' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'workflows' ? theme.colors.primary : theme.colors.secondaryText,
              },
            ]}
          >
            Workflows
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'stats' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('stats')}
        >
          <ChartBarBig
            size={20}
            color={activeTab === 'stats' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'stats' ? theme.colors.primary : theme.colors.secondaryText },
            ]}
          >
            Stats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'settings' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('settings')}
        >
          <Settings
            size={20}
            color={activeTab === 'settings' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'settings' ? theme.colors.primary : theme.colors.secondaryText,
              },
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'workflows' && renderWorkflows()}
        {activeTab === 'stats' && renderStats()}
        {activeTab === 'settings' && renderSettings()}
      </ScrollView>

      <Modal
        visible={showWorkflowModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowWorkflowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                {editingWorkflow ? 'Edit Workflow' : 'Create Workflow'}
              </Text>
              <TouchableOpacity onPress={() => setShowWorkflowModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Workflow Name</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="e.g., New Lead Welcome"
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Trigger</Text>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: theme.colors.background, color: theme.colors.text },
                ]}
                placeholder="e.g., Lead Created"
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Actions</Text>
              <Text style={[styles.inputHint, { color: theme.colors.secondaryText }]}>
                Add actions that will be executed when the trigger fires
              </Text>

              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
              >
                <Text style={styles.saveButtonText}>Save Workflow</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
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
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  workflowCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  workflowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  workflowInfo: {
    flex: 1,
  },
  workflowTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  workflowName: {
    fontSize: 16,
    fontWeight: '600',
  },
  triggerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  triggerText: {
    fontSize: 12,
  },
  actionsContainer: {
    gap: 8,
    marginBottom: 12,
  },
  actionChip: {
    padding: 8,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 13,
  },
  workflowStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  workflowStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  workflowActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statCard: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 16,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  chartCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  chartPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  chartPlaceholderText: {
    fontSize: 14,
  },
  activityCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
  },
  settingsCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  inputHint: {
    fontSize: 12,
    marginBottom: 12,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
