import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bot,
  MessageSquare,
  Settings,
  Play,
  Pause,
  BarChart3,
  Users,
  Clock,
  Zap,
  Brain,
  Target,
  TrendingUp,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Activity,
  CheckCircle,
  AlertTriangle,
  Cpu,
  Server,
  Shield,
  Search,
  Percent,
  Menu,
  TrendingDown,
  DollarSign,
} from 'lucide-react-native';
import { useAIAssistant } from '@/providers/AIAssistantProvider';
import { AIWorkforceSidebar } from '@/components/AIWorkforceSidebar';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { aiEmployees, aiInfrastructureStats, AIEmployee } from '@/constants/aiEmployees';

export default function AIAgentScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { activeAgents, toggleAgent, stats } = useAIAssistant();

  const agentMetrics = [
    {
      title: 'Workforce Size',
      value: (stats.totalEmployees + stats.totalAgents).toString(),
      change: 'Total Roles',
      icon: Users,
      color: '#007AFF',
    },
    {
      title: 'Active Assets',
      value: stats.activeCount.toString(),
      change: 'Operational',
      icon: Activity,
      color: '#34C759',
    },
    {
      title: 'Monthly ROI',
      value: stats.totalMonthlySavings,
      change: 'Net Savings',
      icon: TrendingUp,
      color: '#FF9500',
    },
    {
      title: 'Workforce Health',
      value: `${stats.averageHealth}%`,
      change: 'Optimal',
      icon: Shield,
      color: '#AF52DE',
    },
  ];
  const [selectedTab, setSelectedTab] = useState<'overview' | 'agents' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const getStatusColor = (active: boolean) => {
    return active ? '#34C759' : '#8E8E93';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'executive': return '#FF2D55';
      case 'sales': return '#5856D6';
      case 'operations': return '#FF6482';
      case 'support': return '#FF9500';
      case 'analytics': return '#5AC8FA';
      case 'marketing': return '#AF52DE';
      default: return theme.colors.secondaryText;
    }
  };

  const renderMetric = ({ item }: { item: any }) => {
    const IconComponent = item.icon;

    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={20} color={item.color} />
          </View>
          <Text style={[styles.metricChange, { color: theme.colors.secondaryText }]}>
            {item.change}
          </Text>
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>
      </View>
    );
  };

  const renderAgent = ({ item }: { item: AIEmployee }) => {
    const IconComponent = item.icon;
    const isActive = activeAgents[item.id];

    return (
      <View style={[styles.agentCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.agentHeader}>
          <View style={styles.agentInfo}>
            <View style={[styles.agentAvatarContainer, { backgroundColor: item.color + '20' }]}>
              <IconComponent size={24} color={item.color} />
              <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(isActive) }]} />
            </View>
            <View style={styles.agentDetails}>
              <View style={styles.nameRow}>
                <Text style={[styles.agentName, { color: theme.colors.text }]}>{item.name}</Text>
                <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.category) + '20' }]}>
                  <Text style={[styles.typeText, { color: getTypeColor(item.category) }]}>
                    {item.category.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={[styles.agentDescription, { color: theme.colors.secondaryText }]}>
                Replaces: {item.replacesRole}
              </Text>
            </View>
          </View>
          <Switch
            value={isActive}
            onValueChange={() => toggleAgent(item.id)}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={isActive ? '#fff' : '#f4f3f4'}
          />
        </View>

        {/* Infrastructure & Efficiency Grid */}
        <View style={styles.infraGrid}>
          <View style={styles.infraItem}>
            <Activity size={14} color={isActive ? '#34C759' : '#8E8E93'} />
            <Text style={[styles.infraValue, { color: theme.colors.text }]}>
              {isActive ? `${item.infrastructure.health}%` : 'Offline'}
            </Text>
            <Text style={[styles.infraLabel, { color: theme.colors.secondaryText }]}>Health</Text>
          </View>
          <View style={styles.infraItem}>
            <Clock size={14} color={theme.colors.primary} />
            <Text style={[styles.infraValue, { color: theme.colors.text }]}>{item.infrastructure.uptime}</Text>
            <Text style={[styles.infraLabel, { color: theme.colors.secondaryText }]}>Uptime</Text>
          </View>
          <View style={styles.infraItem}>
            <Cpu size={14} color="#00C7BE" />
            <Text style={[styles.infraValue, { color: theme.colors.text }]}>{item.infrastructure.processingPower.toUpperCase()}</Text>
            <Text style={[styles.infraLabel, { color: theme.colors.secondaryText }]}>Power</Text>
          </View>
        </View>

        {/* Cost Savings Comparison */}
        <View style={[styles.savingsCard, { backgroundColor: theme.colors.primary + '08' }]}>
          <View style={styles.savingsRow}>
            <View>
              <Text style={styles.savingsLabel}>Human Cost</Text>
              <Text style={[styles.savingsValue, { color: '#FF3B30' }]}>{item.humanCost}</Text>
            </View>
            <ArrowLeft size={16} color={theme.colors.secondaryText} style={{ transform: [{ rotate: '180deg' }] }} />
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.savingsLabel}>AI Cost</Text>
              <Text style={[styles.savingsValue, { color: '#34C759' }]}>{item.aiCost}</Text>
            </View>
          </View>
          <View style={styles.efficiencyBadge}>
            <TrendingDown size={12} color={theme.colors.primary} />
            <Text style={styles.efficiencyText}>{item.efficiency}</Text>
          </View>
        </View>

        <View style={styles.capabilities}>
          <Text style={[styles.capabilitiesTitle, { color: theme.colors.text }]}>Core Intelligence:</Text>
          <View style={styles.capabilityTags}>
            {item.capabilities.slice(0, 4).map((capability, index) => (
              <View key={index} style={[styles.capabilityTag, { backgroundColor: theme.colors.cardBackground, borderWidth: 1, borderColor: theme.colors.border }]}>
                <Text style={[styles.capabilityText, { color: theme.colors.secondaryText }]}>
                  {capability}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.agentFooter}>
          <Text style={[styles.lastActive, { color: theme.colors.secondaryText }]}>Infrastructure: {item.infrastructure.status.toUpperCase()}</Text>
          <TouchableOpacity
            style={[styles.dashboardButton, { borderColor: theme.colors.primary }]}
            onPress={() => router.push(item.route as any)}
          >
            <Text style={[styles.dashboardButtonText, { color: theme.colors.primary }]}>Access Control</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderOverview = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Metrics */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Infrastructure Performance</Text>
        <FlatList
          data={agentMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.title}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Workforce Management</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.colors.cardBackground }]}>
            <Plus size={24} color={theme.colors.primary} />
            <Text style={[styles.quickActionText, { color: theme.colors.text }]}>Deploy Role</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.colors.cardBackground }]}>
            <Brain size={24} color={theme.colors.primary} />
            <Text style={[styles.quickActionText, { color: theme.colors.text }]}>Model Bench</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.quickAction, { backgroundColor: theme.colors.cardBackground }]}>
            <Server size={24} color={theme.colors.primary} />
            <Text style={[styles.quickActionText, { color: theme.colors.text }]}>Node Clusters</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Operations</Text>
        <View style={[styles.activityCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.activityText, { color: theme.colors.text }]}>AI Manager synchronized 124 background nodes across clusters</Text>
          <Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>1 minute ago</Text>
        </View>
        <View style={[styles.activityCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.activityText, { color: theme.colors.text }]}>AI Sales Rep intercepted 3 potentially lost leads</Text>
          <Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>8 minutes ago</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderAgents = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <FlatList
        data={aiEmployees}
        renderItem={renderAgent}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.agentsContainer}
      />
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Intelligence</Text>
        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.analyticsHeader}>
            <DollarSign size={20} color="#34C759" />
            <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Economic Impact</Text>
          </View>
          <Text style={[styles.analyticsDescription, { color: theme.colors.secondaryText }]}>
            Current automated workforce is generating <Text style={{ fontWeight: '700', color: '#34C759' }}>{stats.totalMonthlySavings}</Text> in monthly human capital savings.
          </Text>
        </View>

        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.analyticsHeader}>
            <Activity size={20} color="#007AFF" />
            <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Uptime Efficiency</Text>
          </View>
          <Text style={[styles.analyticsDescription, { color: theme.colors.secondaryText }]}>
            Average system health is <Text style={{ fontWeight: '700', color: '#007AFF' }}>{stats.averageHealth}%</Text> across all clusters with a 99.98% successful task execution rate.
          </Text>
        </View>

        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.analyticsHeader}>
            <Zap size={20} color="#FF9500" />
            <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Task Optimization</Text>
          </View>
          <Text style={[styles.analyticsDescription, { color: theme.colors.secondaryText }]}>
            <Text style={{ fontWeight: '700', color: '#FF9500' }}>{stats.totalTasksAutomatedDaily.toLocaleString()}</Text> tasks are being autonomously handled daily, reducing institutional friction by 64%.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowSidebar(true)} style={styles.menuButton}>
            <Menu size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>AI Agent</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Plus size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <AIWorkforceSidebar isVisible={showSidebar} onClose={() => setShowSidebar(false)} />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['overview', 'agents', 'analytics'] as const).map((tab) => (
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
      {selectedTab === 'overview' && renderOverview()}
      {selectedTab === 'agents' && renderAgents()}
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  menuButton: {
    padding: 8,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsContainer: {
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activityCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  activityText: {
    fontSize: 14,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
  },
  agentsContainer: {
    gap: 16,
  },
  agentCard: {
    padding: 16,
    borderRadius: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  agentInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  agentAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  statusIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    bottom: -2,
    right: -2,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  agentDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
  },
  agentDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  infraGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    marginBottom: 12,
  },
  infraItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  infraValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  infraLabel: {
    fontSize: 10,
    fontWeight: '500',
  },
  savingsCard: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  savingsLabel: {
    fontSize: 10,
    color: '#8E8E93',
    marginBottom: 2,
  },
  savingsValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  efficiencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 4,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  efficiencyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#5856D6',
  },
  capabilities: {
    marginBottom: 16,
  },
  capabilitiesTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  capabilityTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  capabilityTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  capabilityText: {
    fontSize: 11,
    fontWeight: '500',
  },
  agentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastActive: {
    fontSize: 11,
    fontWeight: '500',
  },
  dashboardButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  dashboardButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  analyticsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  analyticsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
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