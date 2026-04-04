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
  CheckCircle,
  Clock,
  Play,
  Pause,
  Settings,
  Plus,
  Search,
  Filter,
  TrendingUp,
  BarChart3,
  Users,
  Target,
  Calendar,
  AlertTriangle,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

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

const mockTasks: AutomationTask[] = [
  {
    id: '1',
    name: 'Welcome Email Sequence',
    description: 'Automatically send welcome emails to new subscribers',
    category: 'email',
    status: 'active',
    trigger: 'New subscriber signup',
    lastRun: '2024-01-19 14:30',
    nextRun: 'On trigger',
    executionCount: 145,
    successRate: 98.6,
    timeSaved: '12.5 hours',
  },
  {
    id: '2',
    name: 'Social Media Posting',
    description: 'Auto-post content across social media platforms',
    category: 'social',
    status: 'active',
    trigger: 'Daily at 9:00 AM',
    lastRun: '2024-01-19 09:00',
    nextRun: '2024-01-20 09:00',
    executionCount: 28,
    successRate: 100,
    timeSaved: '8.2 hours',
  },
  {
    id: '3',
    name: 'Lead Scoring Update',
    description: 'Update lead scores based on engagement data',
    category: 'data',
    status: 'paused',
    trigger: 'Weekly on Monday',
    lastRun: '2024-01-15 10:00',
    nextRun: '2024-01-22 10:00',
    executionCount: 12,
    successRate: 91.7,
    timeSaved: '6.8 hours',
  },
  {
    id: '4',
    name: 'Task Assignment',
    description: 'Automatically assign tasks based on team availability',
    category: 'workflow',
    status: 'failed',
    trigger: 'New task created',
    lastRun: '2024-01-19 11:45',
    nextRun: 'On trigger',
    executionCount: 67,
    successRate: 85.1,
    timeSaved: '15.3 hours',
  },
];

const mockTemplates: AutomationTemplate[] = [
  {
    id: '1',
    name: 'Email Drip Campaign',
    description: 'Set up automated email sequences for nurturing leads',
    category: 'email',
    complexity: 'medium',
    estimatedTime: '30 minutes',
    usageCount: 234,
  },
  {
    id: '2',
    name: 'Social Media Scheduler',
    description: 'Schedule and auto-post content across platforms',
    category: 'social',
    complexity: 'simple',
    estimatedTime: '15 minutes',
    usageCount: 189,
  },
  {
    id: '3',
    name: 'Data Sync Workflow',
    description: 'Sync data between different systems automatically',
    category: 'data',
    complexity: 'advanced',
    estimatedTime: '60 minutes',
    usageCount: 78,
  },
];

export default function SmartTaskAutomationScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'tasks' | 'templates' | 'analytics' | 'settings'>('tasks');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'email' | 'social' | 'data' | 'workflow' | 'communication'>('all');
  const [autoRetry, setAutoRetry] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<boolean>(true);

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
      case 'completed': return CheckCircle;
      case 'failed': return AlertTriangle;
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

  const filteredTasks = mockTasks.filter(task => {
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
            <Text style={[styles.metricValue, { color: '#007AFF' }]}>42</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Active Tasks</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#34C759' }]}>94.2%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FF9500' }]}>156h</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Time Saved</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FF3B30' }]}>$12.5K</Text>
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
              {mockTasks.filter(task => task.category === category).length} tasks
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
          <BarChart3 size={20} color={theme.colors.primary} />
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
          data={mockTemplates}
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
    width: 8,
    height: 8,
    borderRadius: 4,
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