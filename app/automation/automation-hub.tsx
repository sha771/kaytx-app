 
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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Zap,
  Play,
  Pause,
  Settings,
  Plus,
  Search,
  ListFilter,
  BarChart3,
  Clock,
  CircleCheck,
  TriangleAlert,
  ArrowRight,
  ArrowLeft,
  Pencil,
  Trash2,
  Copy,
  Activity,
  Target,
  Users,
  Mail,
  MessageSquare,
  Calendar,
  Database,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Automation {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  trigger: string;
  actions: string[];
  executions: number;
  successRate: number;
  lastRun: string;
  category: 'marketing' | 'sales' | 'support' | 'operations';
  complexity: 'simple' | 'medium' | 'complex';
}

interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  color: string;
}

const mockAutomations: Automation[] = [
  {
    id: '1',
    name: 'Welcome Email Sequence',
    description: 'Send welcome emails to new subscribers',
    status: 'active',
    trigger: 'New subscriber',
    actions: ['Send welcome email', 'Add to CRM', 'Schedule follow-up'],
    executions: 1247,
    successRate: 94,
    lastRun: '2 min ago',
    category: 'marketing',
    complexity: 'simple',
  },
  {
    id: '2',
    name: 'Lead Qualification',
    description: 'Automatically qualify and route leads',
    status: 'active',
    trigger: 'Form submission',
    actions: ['Score lead', 'Assign to sales rep', 'Send notification'],
    executions: 856,
    successRate: 87,
    lastRun: '15 min ago',
    category: 'sales',
    complexity: 'medium',
  },
  {
    id: '3',
    name: 'Support Ticket Routing',
    description: 'Route support tickets based on priority',
    status: 'paused',
    trigger: 'New support ticket',
    actions: ['Categorize ticket', 'Assign to team', 'Set priority'],
    executions: 432,
    successRate: 76,
    lastRun: '1 hour ago',
    category: 'support',
    complexity: 'complex',
  },
];

const automationTemplates: AutomationTemplate[] = [
  {
    id: '1',
    name: 'Email Marketing',
    description: 'Automated email campaigns',
    category: 'Marketing',
    icon: Mail,
    color: '#007AFF',
  },
  {
    id: '2',
    name: 'Lead Management',
    description: 'Lead scoring and routing',
    category: 'Sales',
    icon: Target,
    color: '#34C759',
  },
  {
    id: '3',
    name: 'Customer Support',
    description: 'Ticket management and routing',
    category: 'Support',
    icon: MessageSquare,
    color: '#FF9500',
  },
  {
    id: '4',
    name: 'Task Management',
    description: 'Automated task creation and assignment',
    category: 'Operations',
    icon: CircleCheck,
    color: '#AF52DE',
  },
];

export default function AutomationHubScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'automations' | 'templates' | 'analytics' | 'logs'>('automations');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused' | 'draft'>('all');

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
      case 'active': return Play;
      case 'paused': return Pause;
      case 'draft': return Pencil;
      default: return TriangleAlert;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'marketing': return '#007AFF';
      case 'sales': return '#34C759';
      case 'support': return '#FF9500';
      case 'operations': return '#AF52DE';
      default: return theme.colors.secondaryText;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return '#34C759';
      case 'medium': return '#FF9500';
      case 'complex': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const filteredAutomations = mockAutomations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      automation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || automation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderAutomation = ({ item }: { item: Automation }) => {
    const StatusIcon = getStatusIcon(item.status);

    return (
      <View style={[styles.automationCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.automationHeader}>
          <View style={styles.automationInfo}>
            <View style={styles.automationTitle}>
              <Text style={[styles.automationName, { color: theme.colors.text }]}>{item.name}</Text>
              <View style={styles.automationBadges}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                  <StatusIcon size={12} color={getStatusColor(item.status)} />
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
                <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) + '20' }]}>
                  <Text style={[styles.categoryText, { color: getCategoryColor(item.category) }]}>
                    {item.category.toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={[styles.automationDescription, { color: theme.colors.secondaryText }]}>
              {item.description}
            </Text>
          </View>
          <View style={styles.automationActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Pencil size={16} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Copy size={16} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Settings size={16} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.automationDetails}>
          <View style={styles.triggerSection}>
            <Text style={[styles.sectionLabel, { color: theme.colors.secondaryText }]}>Trigger:</Text>
            <Text style={[styles.triggerText, { color: theme.colors.text }]}>{item.trigger}</Text>
          </View>

          <View style={styles.actionsSection}>
            <Text style={[styles.sectionLabel, { color: theme.colors.secondaryText }]}>Actions:</Text>
            <View style={styles.actionsList}>
              {item.actions.map((action, index) => (
                <View key={index} style={styles.actionItem}>
                  <View style={[styles.actionDot, { backgroundColor: theme.colors.primary }]} />
                  <Text style={[styles.actionText, { color: theme.colors.text }]}>{action}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.automationStats}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.executions}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Executions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.successRate}%</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
          </View>
          <View style={styles.statItem}>
            <View style={[styles.complexityIndicator, { backgroundColor: getComplexityColor(item.complexity) }]} />
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              {item.complexity.charAt(0).toUpperCase() + item.complexity.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.automationFooter}>
          <Text style={[styles.lastRun, { color: theme.colors.secondaryText }]}>Last run: {item.lastRun}</Text>
          <View style={styles.automationControls}>
            <Switch
              value={item.status === 'active'}
              onValueChange={() => { }}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={item.status === 'active' ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderTemplate = ({ item }: { item: AutomationTemplate }) => {
    const IconComponent = item.icon;

    return (
      <TouchableOpacity style={[styles.templateCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.templateIcon, { backgroundColor: item.color + '20' }]}>
          <IconComponent size={24} color={item.color} />
        </View>
        <Text style={[styles.templateName, { color: theme.colors.text }]}>{item.name}</Text>
        <Text style={[styles.templateDescription, { color: theme.colors.secondaryText }]}>
          {item.description}
        </Text>
        <View style={[styles.templateCategory, { backgroundColor: item.color + '20' }]}>
          <Text style={[styles.templateCategoryText, { color: item.color }]}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAutomations = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search automations..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filters}>
          {(['all', 'active', 'paused', 'draft'] as const).map((Filter) => (
            <TouchableOpacity
              key={Funnel}
              style={[
                styles.filterChip,
                filterStatus === Filter && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setFilterStatus(Filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: filterStatus === Filter ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <FlatList
        data={filteredAutomations}
        renderItem={renderAutomation}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.automationsContainer}
      />
    </ScrollView>
  );

  const renderTemplates = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Automation Templates</Text>
      <FlatList
        data={automationTemplates}
        renderItem={renderTemplate}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.templatesContainer}
      />
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Automation Analytics</Text>
        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Total Executions</Text>
          <Text style={[styles.analyticsValue, { color: theme.colors.primary }]}>2,535</Text>
          <Text style={[styles.analyticsChange, { color: '#34C759' }]}>+12% from last week</Text>
        </View>
        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Average Success Rate</Text>
          <Text style={[styles.analyticsValue, { color: theme.colors.primary }]}>89%</Text>
          <Text style={[styles.analyticsChange, { color: '#34C759' }]}>+5% improvement</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderLogs = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Real-time Execution Logs</Text>
      {[
        { id: 'l1', time: '12:45:01', automation: 'Welcome Email', status: 'Success', details: 'Email sent to hello@example.com' },
        { id: 'l2', time: '12:44:32', automation: 'Lead Qualification', status: 'Success', details: 'Lead scored 82/100, routed to Sales' },
        { id: 'l3', time: '12:42:15', automation: 'Support Routing', status: 'Failed', details: 'No available agent in Tier 2' },
        { id: 'l4', time: '12:40:08', automation: 'Welcome Email', status: 'Success', details: 'Email sent to tech@startup.io' },
      ].map(log => (
        <View key={log.id} style={[styles.logCard, { backgroundColor: theme.colors.cardBackground, borderLeftColor: log.status === 'Success' ? '#34C759' : '#FF3B30' }]}>
          <View style={styles.logHeader}>
            <Text style={[styles.logTime, { color: theme.colors.secondaryText }]}>{log.time}</Text>
            <View style={[styles.logStatusBadge, { backgroundColor: log.status === 'Success' ? '#34C75920' : '#FF3B3020' }]}>
              <Text style={{ color: log.status === 'Success' ? '#34C759' : '#FF3B30', fontSize: 10, fontWeight: '700' }}>{log.status.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={[styles.logAutomation, { color: theme.colors.text }]}>{log.automation}</Text>
          <Text style={[styles.logDetails, { color: theme.colors.secondaryText }]}>{log.details}</Text>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Premium Header */}
      <View style={[styles.premiumHeader, { paddingTop: insets.top + 20, backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.premiumTitle, { color: theme.colors.text }]}>Autonomous Ops</Text>
          <TouchableOpacity style={[styles.createBtn, { backgroundColor: theme.colors.primary }]}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.headerStats}>
          <View style={styles.headerStat}>
            <Text style={[styles.headerStatVal, { color: theme.colors.text }]}>12.4k</Text>
            <Text style={[styles.headerStatLab, { color: theme.colors.secondaryText }]}>Total Executions</Text>
          </View>
          <View style={styles.headerStatDivider} />
          <View style={styles.headerStat}>
            <Text style={[styles.headerStatVal, { color: '#34C759' }]}>98.2%</Text>
            <Text style={[styles.headerStatLab, { color: theme.colors.secondaryText }]}>Avg Success</Text>
          </View>
          <View style={styles.headerStatDivider} />
          <View style={styles.headerStat}>
            <Text style={[styles.headerStatVal, { color: theme.colors.primary }]}>$18.4k</Text>
            <Text style={[styles.headerStatLab, { color: theme.colors.secondaryText }]}>Ops ROI</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.premiumTabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.premiumTabs}>
          {(['automations', 'templates', 'analytics', 'logs'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.premiumTab,
                selectedTab === tab && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.premiumTabText,
                  {
                    color: selectedTab === tab ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {selectedTab === 'automations' && renderAutomations()}
        {selectedTab === 'templates' && renderTemplates()}
        {selectedTab === 'analytics' && renderAnalytics()}
        {selectedTab === 'logs' && renderLogs()}
      </View>
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
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  automationsContainer: {
    gap: 16,
  },
  automationCard: {
    padding: 16,
    borderRadius: 12,
  },
  automationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  automationInfo: {
    flex: 1,
  },
  automationTitle: {
    marginBottom: 8,
  },
  automationName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  automationBadges: {
    flexDirection: 'row',
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
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  automationDescription: {
    fontSize: 14,
  },
  automationActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  automationDetails: {
    marginBottom: 16,
  },
  triggerSection: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionsSection: {},
  actionsList: {
    gap: 4,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  actionText: {
    fontSize: 14,
  },
  automationStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
  },
  complexityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  automationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastRun: {
    fontSize: 12,
  },
  automationControls: {},
  templatesContainer: {
    gap: 12,
  },
  templateCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  templateName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  templateDescription: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 12,
  },
  templateCategory: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  templateCategoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  analyticsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  analyticsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  analyticsValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  analyticsChange: {
    fontSize: 12,
    fontWeight: '500',
  },
  logCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  logTime: {
    fontSize: 11,
  },
  logStatusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  logAutomation: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  logDetails: {
    fontSize: 13,
  },
  premiumHeader: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: '800',
    flex: 1,
    textAlign: 'center',
  },
  createBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerStat: {
    alignItems: 'center',
    flex: 1,
  },
  headerStatVal: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 2,
  },
  headerStatLab: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  headerStatDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(150,150,150,0.1)',
  },
  premiumTabsWrapper: {
    marginBottom: 16,
  },
  premiumTabs: {
    paddingHorizontal: 20,
    gap: 8,
  },
  premiumTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(150,150,150,0.05)',
  },
  premiumTabText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
