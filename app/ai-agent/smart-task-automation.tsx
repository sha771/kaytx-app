import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Zap,
  CircleCheck,
  Clock,
  Play,
  Pause,
  Settings,
  Plus,
  Search,
  ListFilter,
  TrendingUp,
  ChartBar,
  Users,
  Target,
  Calendar,
  TriangleAlert,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { trpc } from '@/lib/trpc';

interface AutomationTask {
  id: string;
  name: string;
  description: string;
  category: 'email' | 'social' | 'data' | 'workflow' | 'communication';
  status: 'active' | 'paused' | 'completed' | 'failed';
  trigger: string;
  lastRun: string;
  nextRun?: string;
  executionCount: number;
  successRate: number;
  timeSaved: string;
}

interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  category: 'email' | 'social' | 'data' | 'workflow' | 'communication';
  complexity: 'simple' | 'medium' | 'advanced';
  estimatedTime: string;
  usageCount: number;
}

interface ActivityEvent {
  action?: string;
  eventType?: string;
  timestamp?: string;
  status?: string;
  details?: {
    trigger?: string;
    source?: string;
    description?: string;
    summary?: string;
    nextRun?: string;
    executions?: string;
    successRate?: string;
  };
}

export default function SmartTaskAutomationScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'tasks' | 'templates' | 'analytics' | 'settings'>('tasks');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'email' | 'social' | 'data' | 'workflow' | 'communication'>('all');
  const [autoRetry, setAutoRetry] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<boolean>(true);

  const { data: analytics } = trpc.aiAgents.getAgentAnalytics.useQuery({ timeRange: '7d' });
  const { data: activityData } = trpc.aiAgents.getAgentActivity.useQuery({ limit: 300 });

  const activities = (activityData?.activities ?? []) as ActivityEvent[];

  const getRelativeTime = (isoTimestamp?: string) => {
    if (!isoTimestamp) return '—';
    const ts = new Date(isoTimestamp).getTime();
    const delta = Date.now() - ts;
    if (delta < 60 * 1000) return 'Just now';
    if (delta < 60 * 60 * 1000) return `${Math.floor(delta / (60 * 1000))} min ago`;
    if (delta < 24 * 60 * 60 * 1000) return `${Math.floor(delta / (60 * 60 * 1000))} hour ago`;
    return `${Math.floor(delta / (24 * 60 * 60 * 1000))} day ago`;
  };

  const categorizeAction = (action: string): AutomationTask['category'] => {
    const s = (action || '').toLowerCase();
    if (s.includes('email') || s.includes('mail')) return 'email';
    if (s.includes('social') || s.includes('linkedin') || s.includes('twitter') || s.includes('instagram')) return 'social';
    if (s.includes('sync') || s.includes('import') || s.includes('export') || s.includes('score') || s.includes('analytics')) return 'data';
    if (s.includes('call') || s.includes('message') || s.includes('sms') || s.includes('notify')) return 'communication';
    return 'workflow';
  };

  const taskNames = (analytics?.topActions && analytics.topActions.length > 0)
    ? analytics.topActions.map((a: { action?: string }) => a.action).filter(Boolean)
    : Array.from(
        new Set(
          activities
            .map((ev: ActivityEvent) => ev.action || ev.eventType)
            .filter(Boolean)
        )
      ).slice(0, 50);

  const tasks: AutomationTask[] = taskNames.map((name: string, idx: number) => {
    const last = activities.find((ev: ActivityEvent) => (ev.action || ev.eventType) === name);
    const lastTs = last?.timestamp ? new Date(last.timestamp).getTime() : 0;
    const isRecent = lastTs ? Date.now() - lastTs < 24 * 60 * 60 * 1000 : false;

    const status: AutomationTask['status'] =
      last?.status === 'error'
        ? 'failed'
        : last?.status === 'warn'
          ? 'paused'
          : isRecent
            ? 'active'
            : 'completed';

    const category = categorizeAction(name);
    const trigger = last?.details?.trigger || last?.details?.source || last?.eventType || 'Event-driven';

    return {
      id: `automation-${idx}`,
      name,
      description: last?.details?.description || last?.details?.summary || last?.eventType || 'Automated workflow execution',
      category,
      status,
      trigger,
      lastRun: getRelativeTime(last?.timestamp),
      nextRun: typeof last?.details?.nextRun === 'string' ? last.details.nextRun : undefined,
      executionCount: typeof last?.details?.executions === 'number' ? last.details.executions : 0,
      successRate: typeof last?.details?.successRate === 'number' ? last.details.successRate : (analytics?.successRate ?? 0),
      timeSaved: '—',
    };
  });

  const templates: AutomationTemplate[] = taskNames.slice(0, 25).map((name: any, idx: number) => {
    const category = categorizeAction(name);
    const complexity: AutomationTemplate['complexity'] = (analytics?.successRate ?? 0) >= 85 ? 'simple' : (analytics?.successRate ?? 0) >= 60 ? 'medium' : 'advanced';

    return {
      id: `template-${idx}`,
      name,
      description: 'Template generated from real usage patterns',
      category,
      complexity,
      estimatedTime: '—',
      usageCount: 0,
    };
  });

  const getCategoryColor = (category: AutomationTask['category']) => {
    switch (category) {
      case 'email': return '#007AFF';
      case 'social': return '#34C759';
      case 'data': return '#FF9500';
      case 'workflow': return '#AF52DE';
      case 'communication': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getStatusColor = (status: AutomationTask['status']) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'paused': return '#FF9500';
      case 'completed': return '#8E8E93';
      case 'failed': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status: AutomationTask['status']) => {
    switch (status) {
      case 'active': return Play;
      case 'paused': return Pause;
      case 'completed': return CircleCheck;
      case 'failed': return TriangleAlert;
      default: return Clock;
    }
  };

  const getComplexityColor = (complexity: AutomationTemplate['complexity']) => {
    switch (complexity) {
      case 'simple': return '#34C759';
      case 'medium': return '#FF9500';
      case 'advanced': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const renderTaskItem = ({ item }: { item: AutomationTask }) => {
    const StatusIcon = getStatusIcon(item.status);
    
    return (
      <View style={[styles.taskCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.taskHeader}>
          <View style={styles.taskInfo}>
            <View style={styles.taskTitleRow}>
              <Text style={[styles.taskName, { color: theme.colors.text }]} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) + '20' }]}>
                <Text style={[styles.categoryText, { color: getCategoryColor(item.category) }]}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </Text>
              </View>
            </View>
            <Text style={[styles.taskDescription, { color: theme.colors.secondaryText }]} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <StatusIcon size={12} color={getStatusColor(item.status)} />
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.taskMeta}>
          <Text style={[styles.triggerText, { color: theme.colors.secondaryText }]}>
            Trigger: {item.trigger}
          </Text>
          <Text style={[styles.lastRunText, { color: theme.colors.secondaryText }]}>
            Last run: {item.lastRun}
          </Text>
          {item.nextRun && (
            <Text style={[styles.nextRunText, { color: theme.colors.secondaryText }]}>
              Next run: {item.nextRun}
            </Text>
          )}
        </View>

        <View style={styles.taskStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.executionCount}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Executions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#34C759' }]}>{item.successRate}%</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#007AFF' }]}>{item.timeSaved}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Time Saved</Text>
          </View>
        </View>

        <View style={styles.taskActions}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: theme.colors.primary + '20' }]}
            onPress={() => Alert.alert('Edit Task', `Editing ${item.name}`)}
          >
            <Settings size={16} color={theme.colors.primary} />
            <Text style={[styles.actionText, { color: theme.colors.primary }]}>Configure</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: getStatusColor(item.status) + '20' }]}
            onPress={() => Alert.alert('Toggle Status', `${item.status === 'active' ? 'Pausing' : 'Activating'} ${item.name}`)}
          >
            <StatusIcon size={16} color={getStatusColor(item.status)} />
            <Text style={[styles.actionText, { color: getStatusColor(item.status) }]}>
              {item.status === 'active' ? 'Pause' : 'Start'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTemplateItem = ({ item }: { item: AutomationTemplate }) => (
    <TouchableOpacity 
      style={[styles.templateCard, { backgroundColor: theme.colors.cardBackground }]}
      onPress={() => Alert.alert('Use Template', `Using template: ${item.name}`)}
    >
      <View style={styles.templateHeader}>
        <View style={styles.templateInfo}>
          <Text style={[styles.templateName, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.templateDescription, { color: theme.colors.secondaryText }]} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <View style={[styles.complexityBadge, { backgroundColor: getComplexityColor(item.complexity) + '20' }]}>
          <Text style={[styles.complexityText, { color: getComplexityColor(item.complexity) }]}>
            {item.complexity.charAt(0).toUpperCase() + item.complexity.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.templateFooter}>
        <View style={styles.templateMeta}>
          <Text style={[styles.estimatedTime, { color: theme.colors.secondaryText }]}>
            Setup: {item.estimatedTime}
          </Text>
          <Text style={[styles.usageCount, { color: theme.colors.secondaryText }]}>
            Used {item.usageCount} times
          </Text>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) + '20' }]}>
          <Text style={[styles.categoryText, { color: getCategoryColor(item.category) }]}>
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.analyticsContainer}>
      <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Automation Performance</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#007AFF' }]}>{tasks.filter(t => t.status === 'active').length.toLocaleString()}</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Active Tasks</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#34C759' }]}>{(analytics?.successRate ?? 0).toFixed(1)}%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FF9500' }]}>—</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Time Saved</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FF3B30' }]}>{'—'}</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Cost Savings</Text>
          </View>
        </View>
      </View>

      <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Category Breakdown</Text>
        {['email', 'social', 'data', 'workflow', 'communication'].map((category) => (
          <View key={category} style={styles.categoryBreakdown}>
            <View style={styles.categoryInfo}>
              <View style={[styles.categoryDot, { backgroundColor: getCategoryColor(category as AutomationTask['category']) }]} />
              <Text style={[styles.categoryName, { color: theme.colors.text }]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </View>
            <Text style={[styles.categoryCount, { color: theme.colors.secondaryText }]}>
              {tasks.filter(task => task.category === category).length} tasks
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const renderSettings = () => (
    <ScrollView style={styles.settingsContainer}>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingsTitle, { color: theme.colors.text }]}>Automation Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Retry Failed Tasks</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Automatically retry failed automations
            </Text>
          </View>
          <Switch
            value={autoRetry}
            onValueChange={setAutoRetry}
            trackColor={{ false: '#8E8E93', true: theme.colors.primary }}
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Notifications</Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Get notified about automation status
            </Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#8E8E93', true: theme.colors.primary }}
          />
        </View>
      </View>

      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingsTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        
        <TouchableOpacity style={styles.quickAction}>
          <Zap size={20} color={theme.colors.primary} />
          <Text style={[styles.quickActionText, { color: theme.colors.primary }]}>Run All Active Tasks</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickAction}>
          <Pause size={20} color={theme.colors.primary} />
          <Text style={[styles.quickActionText, { color: theme.colors.primary }]}>Pause All Tasks</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickAction}>
          <ChartBarBig size={20} color={theme.colors.primary} />
          <Text style={[styles.quickActionText, { color: theme.colors.primary }]}>Export Analytics</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Smart Task Automation</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Plus size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['tasks', 'templates', 'analytics', 'settings'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search and Filters */}
      {activeTab === 'tasks' && (
        <View style={styles.filtersContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search tasks..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilters}>
            {(['all', 'email', 'social', 'data', 'workflow', 'communication'] as const).map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryFilter,
                  filterCategory === category && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setFilterCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryFilterText,
                    {
                      color: filterCategory === category ? 'white' : theme.colors.secondaryText,
                    },
                  ]}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Content */}
      {activeTab === 'tasks' && (
        <FlatList
          data={filteredTasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'templates' && (
        <FlatList
          data={templates}
          renderItem={renderTemplateItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'analytics' && renderAnalytics()}
      {activeTab === 'settings' && renderSettings()}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => Alert.alert('Create Automation', 'Feature coming soon!')}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoryFilters: {
    flexDirection: 'row',
  },
  categoryFilter: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginRight: 8,
  },
  categoryFilterText: {
    fontSize: 12,
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  taskCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    marginBottom: 12,
  },
  taskInfo: {
    marginBottom: 8,
  },
  taskTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  taskDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '500',
  },
  taskMeta: {
    marginBottom: 12,
  },
  triggerText: {
    fontSize: 12,
    marginBottom: 2,
  },
  lastRunText: {
    fontSize: 12,
    marginBottom: 2,
  },
  nextRunText: {
    fontSize: 12,
  },
  taskStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  taskActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  templateCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  templateInfo: {
    flex: 1,
    marginRight: 12,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  complexityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  complexityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  templateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  templateMeta: {
    flex: 1,
  },
  estimatedTime: {
    fontSize: 12,
    marginBottom: 2,
  },
  usageCount: {
    fontSize: 12,
  },
  analyticsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  analyticsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  metricLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  categoryBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryCount: {
    fontSize: 12,
  },
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  settingsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});