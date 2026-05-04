import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  Plus, 
  CircleCheckBig, 
  Clock, 
  CircleAlert, 
  GripHorizontal,
  Calendar,
  Flag,
  User,
  FolderOpen,
  TrendingUp,
  ListFilter,
  Search
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  assignee?: string;
  category: string;
}

interface Deal {
  id: string;
  name: string;
  value: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  closeDate: string;
  contact: string;
}

export default function TaskDealManagementPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { agentId, agentName } = useLocalSearchParams<{ agentId: string; agentName: string }>();
  const [activeTab, setActiveTab] = useState<'tasks' | 'deals'>('tasks');
  const [filterStatus, setFilterStatus] = useState('All');

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Review Q3 performance metrics', status: 'in_progress', priority: 'high', dueDate: 'Today', category: 'Analysis', assignee: 'Self' },
    { id: '2', title: 'Update customer response templates', status: 'pending', priority: 'medium', dueDate: 'Tomorrow', category: 'Content', assignee: 'Self' },
    { id: '3', title: 'Process pending support tickets', status: 'completed', priority: 'urgent', dueDate: 'Yesterday', category: 'Support', assignee: 'Self' },
    { id: '4', title: 'Sync with CRM database', status: 'blocked', priority: 'high', dueDate: '2 days', category: 'Data', assignee: 'Self' },
    { id: '5', title: 'Generate weekly report', status: 'pending', priority: 'medium', dueDate: '3 days', category: 'Reporting', assignee: 'Self' },
  ]);

  const [deals, setDeals] = useState<Deal[]>([
    { id: '1', name: 'Enterprise Software License', value: '$125,000', stage: 'negotiation', probability: 75, closeDate: 'Dec 15', contact: 'John Smith' },
    { id: '2', name: 'Consulting Services Package', value: '$45,000', stage: 'proposal', probability: 60, closeDate: 'Dec 20', contact: 'Sarah Johnson' },
    { id: '3', name: 'Annual Support Contract', value: '$78,000', stage: 'closed_won', probability: 100, closeDate: 'Dec 1', contact: 'Mike Chen' },
    { id: '4', name: 'Training Program License', value: '$32,000', stage: 'qualification', probability: 40, closeDate: 'Jan 5', contact: 'Emily Davis' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': case 'closed_won': return '#34C759';
      case 'in_progress': case 'negotiation': return '#007AFF';
      case 'pending': case 'prospecting': case 'qualification': return '#FF9500';
      case 'blocked': case 'closed_lost': return '#FF3B30';
      case 'proposal': return '#AF52DE';
      default: return '#8E8E93';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#FF3B30';
      case 'high': return '#FF9500';
      case 'medium': return '#007AFF';
      case 'low': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
  };

  const dealStats = {
    total: deals.length,
    value: deals.reduce((acc, d) => acc + parseInt(d.value.replace(/[$,]/g, '')), 0),
    won: deals.filter(d => d.stage === 'closed_won').length,
    active: deals.filter(d => d.stage !== 'closed_won' && d.stage !== 'closed_lost').length,
  };

  const filteredTasks = filterStatus === 'All' 
    ? tasks 
    : tasks.filter(t => t.status === filterStatus.toLowerCase().replace(' ', '_'));

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Task & Deal Management</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
            {agentName || 'AI Agent'} Workspace
          </Text>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Plus size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'tasks' && { backgroundColor: theme.colors.primary }]}
          onPress={() => setActiveTab('tasks')}
        >
          <CircleCheckBig size={18} color={activeTab === 'tasks' ? '#fff' : theme.colors.textSecondary} />
          <Text style={[styles.tabText, { color: activeTab === 'tasks' ? '#fff' : theme.colors.textSecondary }]}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'deals' && { backgroundColor: theme.colors.primary }]}
          onPress={() => setActiveTab('deals')}
        >
          <TrendingUp size={18} color={activeTab === 'deals' ? '#fff' : theme.colors.textSecondary} />
          <Text style={[styles.tabText, { color: activeTab === 'deals' ? '#fff' : theme.colors.textSecondary }]}>Deals</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {activeTab === 'tasks' ? (
          <>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{taskStats.total}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Total</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <Text style={[styles.statValue, { color: '#34C759' }]}>{taskStats.completed}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Done</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <Text style={[styles.statValue, { color: '#007AFF' }]}>{taskStats.inProgress}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Active</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <Text style={[styles.statValue, { color: '#FF9500' }]}>{taskStats.pending}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Pending</Text>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{dealStats.total}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Deals</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <Text style={[styles.statValue, { color: '#34C759' }]}>${(dealStats.value / 1000).toFixed(0)}k</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Pipeline</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <Text style={[styles.statValue, { color: '#007AFF' }]}>{dealStats.active}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Active</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <Text style={[styles.statValue, { color: '#AF52DE' }]}>{dealStats.won}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Won</Text>
            </View>
          </>
        )}
      </View>

      {/* Content */}
      {activeTab === 'tasks' ? (
        <View style={styles.section}>
          {/* Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {['All', 'Pending', 'In Progress', 'Completed', 'Blocked'].map(status => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterChip,
                  filterStatus === status && { backgroundColor: theme.colors.primary }
                ]}
                onPress={() => setFilterStatus(status)}
              >
                <Text style={[styles.filterChipText, { color: filterStatus === status ? '#fff' : theme.colors.textSecondary }]}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Task List */}
          {filteredTasks.map(task => (
            <View key={task.id} style={[styles.taskCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <View style={styles.taskHeader}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(task.status) }]} />
                <Text style={[styles.taskTitle, { color: theme.colors.text }]}>{task.title}</Text>
                <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) + '20' }]}>
                  <Flag size={10} color={getPriorityColor(task.priority)} />
                  <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>{task.priority}</Text>
                </View>
              </View>
              <View style={styles.taskMeta}>
                <View style={styles.metaItem}>
                  <FolderOpen size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>{task.category}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Calendar size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>{task.dueDate}</Text>
                </View>
                <View style={styles.metaItem}>
                  <User size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>{task.assignee}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.section}>
          {/* Deal List */}
          {deals.map(deal => (
            <View key={deal.id} style={[styles.dealCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <View style={styles.dealHeader}>
                <View>
                  <Text style={[styles.dealName, { color: theme.colors.text }]}>{deal.name}</Text>
                  <Text style={[styles.dealContact, { color: theme.colors.textSecondary }]}>{deal.contact}</Text>
                </View>
                <Text style={[styles.dealValue, { color: theme.colors.primary }]}>{deal.value}</Text>
              </View>
              <View style={styles.dealProgress}>
                <View style={[styles.progressBar, { backgroundColor: theme.colors.background }]}>
                  <View style={[styles.progressFill, { width: `${deal.probability}%`, backgroundColor: getStatusColor(deal.stage) }]} />
                </View>
                <Text style={[styles.probability, { color: theme.colors.textSecondary }]}>{deal.probability}%</Text>
              </View>
              <View style={styles.dealFooter}>
                <View style={[styles.stageBadge, { backgroundColor: getStatusColor(deal.stage) + '20' }]}>
                  <Text style={[styles.stageText, { color: getStatusColor(deal.stage) }]}>{deal.stage.replace('_', ' ').toUpperCase()}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Calendar size={14} color={theme.colors.textSecondary} />
                  <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>Close: {deal.closeDate}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    
      <AgentFeatures agentId="task-deal-management" agentName="Task Deal Management" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E5EA' 
  },
  backButton: { padding: 4 },
  headerContent: { flex: 1, marginLeft: 12 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  actionButton: { padding: 8 },
  tabContainer: { 
    flexDirection: 'row', 
    padding: 16, 
    gap: 12 
  },
  tab: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 12, 
    borderRadius: 12, 
    backgroundColor: '#E5E5EA',
    gap: 8
  },
  tabText: { fontSize: 15, fontWeight: '600' },
  statsRow: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    gap: 8, 
    marginBottom: 16 
  },
  statCard: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 12, 
    borderRadius: 12 
  },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { paddingHorizontal: 16 },
  filterScroll: { marginBottom: 12 },
  filterChip: { 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: '#E5E5EA', 
    marginRight: 8 
  },
  filterChipText: { fontSize: 13, fontWeight: '500' },
  taskCard: { 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12 
  },
  taskHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  statusDot: { 
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    marginRight: 10 
  },
  taskTitle: { 
    flex: 1, 
    fontSize: 15, 
    fontWeight: '600' 
  },
  priorityBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12, 
    gap: 4 
  },
  priorityText: { fontSize: 11, fontWeight: '500' },
  taskMeta: { 
    flexDirection: 'row', 
    gap: 16 
  },
  metaItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 4 
  },
  metaText: { fontSize: 12 },
  dealCard: { 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12 
  },
  dealHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    marginBottom: 12 
  },
  dealName: { fontSize: 15, fontWeight: '600' },
  dealContact: { fontSize: 12, marginTop: 2 },
  dealValue: { fontSize: 16, fontWeight: 'bold' },
  dealProgress: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  progressBar: { 
    flex: 1, 
    height: 6, 
    borderRadius: 3, 
    marginRight: 8 
  },
  progressFill: { 
    height: '100%', 
    borderRadius: 3 
  },
  probability: { fontSize: 12, fontWeight: '500', minWidth: 35 },
  dealFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  stageBadge: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 8 
  },
  stageText: { fontSize: 10, fontWeight: '600' },
});
