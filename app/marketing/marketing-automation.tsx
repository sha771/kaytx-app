import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Zap,
  Users,
  Mail,
  MessageSquare,
  Calendar,
  Target,
  TrendingUp,
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  Plus,
  Filter,
  Settings,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'email_signup' | 'purchase' | 'cart_abandon' | 'page_visit' | 'date_time';
    condition: string;
  };
  actions: AutomationAction[];
  status: 'active' | 'paused' | 'draft';
  performance: {
    triggered: number;
    completed: number;
    conversionRate: number;
    revenue: number;
  };
  createdDate: string;
  lastRun: string;
}

interface AutomationAction {
  id: string;
  type: 'send_email' | 'send_sms' | 'add_tag' | 'wait' | 'condition';
  config: any;
  delay?: number;
}

interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  category: 'welcome' | 'nurture' | 'retention' | 'recovery';
  estimatedSetupTime: string;
  popularity: number;
}

const mockWorkflows: AutomationWorkflow[] = [
  {
    id: '1',
    name: 'Welcome Email Series',
    description: 'Onboard new subscribers with a 5-email welcome sequence',
    trigger: {
      type: 'email_signup',
      condition: 'User subscribes to newsletter',
    },
    actions: [
      { id: '1', type: 'send_email', config: { template: 'welcome_1' } },
      { id: '2', type: 'wait', config: { days: 2 } },
      { id: '3', type: 'send_email', config: { template: 'welcome_2' } },
    ],
    status: 'active',
    performance: {
      triggered: 1247,
      completed: 1089,
      conversionRate: 23.5,
      revenue: 15420,
    },
    createdDate: '2024-01-01',
    lastRun: '2 hours ago',
  },
  {
    id: '2',
    name: 'Abandoned Cart Recovery',
    description: 'Win back customers who left items in their cart',
    trigger: {
      type: 'cart_abandon',
      condition: 'Cart abandoned for 1 hour',
    },
    actions: [
      { id: '1', type: 'wait', config: { hours: 1 } },
      { id: '2', type: 'send_email', config: { template: 'cart_reminder' } },
      { id: '3', type: 'wait', config: { days: 1 } },
      { id: '4', type: 'send_email', config: { template: 'cart_discount' } },
    ],
    status: 'active',
    performance: {
      triggered: 892,
      completed: 234,
      conversionRate: 18.7,
      revenue: 8950,
    },
    createdDate: '2024-01-15',
    lastRun: '15 minutes ago',
  },
  {
    id: '3',
    name: 'Customer Re-engagement',
    description: 'Re-activate dormant customers with special offers',
    trigger: {
      type: 'date_time',
      condition: 'No purchase in 90 days',
    },
    actions: [
      { id: '1', type: 'send_email', config: { template: 'winback_offer' } },
      { id: '2', type: 'wait', config: { days: 7 } },
      { id: '3', type: 'condition', config: { if: 'no_purchase' } },
      { id: '4', type: 'send_sms', config: { message: 'Last chance offer' } },
    ],
    status: 'paused',
    performance: {
      triggered: 456,
      completed: 123,
      conversionRate: 12.3,
      revenue: 3420,
    },
    createdDate: '2023-12-01',
    lastRun: '3 days ago',
  },
];

const automationTemplates: AutomationTemplate[] = [
  {
    id: '1',
    name: 'Welcome Series',
    description: 'Introduce new subscribers to your brand',
    category: 'welcome',
    estimatedSetupTime: '15 min',
    popularity: 95,
  },
  {
    id: '2',
    name: 'Lead Nurturing',
    description: 'Guide prospects through your sales funnel',
    category: 'nurture',
    estimatedSetupTime: '30 min',
    popularity: 87,
  },
  {
    id: '3',
    name: 'Win-back Campaign',
    description: 'Re-engage inactive customers',
    category: 'retention',
    estimatedSetupTime: '20 min',
    popularity: 78,
  },
  {
    id: '4',
    name: 'Cart Recovery',
    description: 'Recover abandoned shopping carts',
    category: 'recovery',
    estimatedSetupTime: '25 min',
    popularity: 92,
  },
];

export default function MarketingAutomationScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'workflows' | 'templates' | 'analytics'>('workflows');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'paused': return '#FF9500';
      case 'draft': return '#8E8E93';
      default: return theme.colors.secondaryText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'paused': return Pause;
      case 'draft': return Edit;
      default: return AlertTriangle;
    }
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'email_signup': return Mail;
      case 'purchase': return Target;
      case 'cart_abandon': return AlertTriangle;
      case 'page_visit': return Activity;
      case 'date_time': return Clock;
      default: return Zap;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'welcome': return '#007AFF';
      case 'nurture': return '#34C759';
      case 'retention': return '#FF9500';
      case 'recovery': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const filteredWorkflows = mockWorkflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || workflow.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const renderWorkflow = ({ item }: { item: AutomationWorkflow }) => {
    const statusColor = getStatusColor(item.status);
    const StatusIcon = getStatusIcon(item.status);
    const TriggerIcon = getTriggerIcon(item.trigger.type);
    const completionRate = (item.performance.completed / item.performance.triggered) * 100;
    
    return (
      <View style={[styles.workflowCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.workflowHeader}>
          <View style={styles.workflowInfo}>
            <Text style={[styles.workflowName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.workflowDescription, { color: theme.colors.secondaryText }]}>
              {item.description}
            </Text>
            <View style={styles.workflowTrigger}>
              <TriggerIcon size={14} color={theme.colors.primary} />
              <Text style={[styles.triggerText, { color: theme.colors.secondaryText }]}>
                {item.trigger.condition}
              </Text>
            </View>
          </View>
          <View style={styles.workflowActions}>
            <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
              <StatusIcon size={12} color={statusColor} />
              <Text style={[styles.statusText, { color: statusColor }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton}>
                <Edit size={16} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Copy size={16} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                {item.status === 'active' ? (
                  <Pause size={16} color={theme.colors.text} />
                ) : (
                  <Play size={16} color={theme.colors.text} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.workflowMetrics}>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {item.performance.triggered.toLocaleString()}
            </Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Triggered</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {completionRate.toFixed(1)}%
            </Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Completion</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>
              {item.performance.conversionRate}%
            </Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Conversion</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#34C759' }]}>
              ${item.performance.revenue.toLocaleString()}
            </Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Revenue</Text>
          </View>
        </View>
        
        <View style={styles.workflowFooter}>
          <Text style={[styles.lastRun, { color: theme.colors.secondaryText }]}>
            Last run: {item.lastRun}
          </Text>
          <TouchableOpacity style={[styles.viewButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTemplate = ({ item }: { item: AutomationTemplate }) => {
    const categoryColor = getCategoryColor(item.category);
    
    return (
      <TouchableOpacity style={[styles.templateCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.templateHeader}>
          <View style={styles.templateInfo}>
            <Text style={[styles.templateName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.templateDescription, { color: theme.colors.secondaryText }]}>
              {item.description}
            </Text>
          </View>
          <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '20' }]}>
            <Text style={[styles.categoryText, { color: categoryColor }]}>
              {item.category.toUpperCase()}
            </Text>
          </View>
        </View>
        
        <View style={styles.templateFooter}>
          <View style={styles.templateMeta}>
            <View style={styles.metaItem}>
              <Clock size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
                {item.estimatedSetupTime}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <TrendingUp size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
                {item.popularity}% popular
              </Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.useTemplateButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.useTemplateText}>Use Template</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderWorkflows = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Search and Filters */}
      <View style={styles.filtersSection}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search workflows..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          {['all', 'active', 'paused', 'draft'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterChip,
                filterStatus === status && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setFilterStatus(status)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  {
                    color: filterStatus === status ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredWorkflows}
        renderItem={renderWorkflow}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.workflowsList}
      />
    </ScrollView>
  );

  const renderTemplates = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <FlatList
        data={automationTemplates}
        renderItem={renderTemplate}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.templatesList}
      />
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Automation Performance</Text>
        <Text style={[styles.analyticsDescription, { color: theme.colors.secondaryText }]}>
          Your automation workflows have generated $27,790 in revenue this month with an average conversion rate of 18.2%.
        </Text>
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
        <Text style={[styles.title, { color: theme.colors.text }]}>Marketing Automation</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Plus size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['workflows', 'templates', 'analytics'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {selectedTab === 'workflows' && renderWorkflows()}
      {selectedTab === 'templates' && renderTemplates()}
      {selectedTab === 'analytics' && renderAnalytics()}
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filtersSection: {
    marginBottom: 20,
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchInput: {
    fontSize: 16,
  },
  filters: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginRight: 8,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  workflowsList: {
    gap: 16,
  },
  workflowCard: {
    padding: 16,
    borderRadius: 12,
  },
  workflowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  workflowInfo: {
    flex: 1,
  },
  workflowName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  workflowDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  workflowTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  triggerText: {
    fontSize: 12,
  },
  workflowActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  workflowMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  metricLabel: {
    fontSize: 12,
  },
  workflowFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastRun: {
    fontSize: 12,
  },
  viewButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  templatesList: {
    gap: 16,
  },
  templateCard: {
    padding: 16,
    borderRadius: 12,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  templateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  templateMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  useTemplateButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  useTemplateText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  analyticsCard: {
    padding: 16,
    borderRadius: 12,
  },
  analyticsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  analyticsDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});