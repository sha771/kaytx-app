import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Brain,
  Upload,
  BarChart3,
  Users,
  MessageSquare,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Power,
  Sparkles,
  Command,
  Activity,
  Database,
  FileText,
  Bot,
  Target,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  allAgents,
  allSubAgents,
  allMainAgents,
  getAgentsWithVoiceEnabled,
  initializeAgentConfigurations,
} from '@/constants/aiAgentHierarchy';

export default function AIAgentsCommandCenterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isRefreshing, setIsRefreshing] = useState(false);

  const stats = {
    totalActive: allAgents.filter(a => a.status === 'active').length,
    totalPaused: allAgents.filter(a => a.status === ('paused' as any)).length,
    withVoice: getAgentsWithVoiceEnabled().length,
    withTraining: allAgents.filter(a => a.configuration?.training.enabled).length,
  };

  const quickActions = [
    {
      id: 'enable-all',
      label: 'Enable All Agents',
      icon: Power,
      color: '#10B981',
      description: 'Activate all AI agents',
      action: () => {
        allAgents.forEach(agent => agent.status = 'active');
        Alert.alert('Success', 'All agents have been activated');
      },
    },
    {
      id: 'pause-all',
      label: 'Pause All Agents',
      icon: Pause,
      color: '#F59E0B',
      description: 'Temporarily pause all agents',
      action: () => {
        allAgents.forEach(agent => agent.status = 'paused' as any);
        Alert.alert('Success', 'All agents have been paused');
      },
    },
    {
      id: 'refresh-configs',
      label: 'Refresh Configurations',
      icon: RefreshCw,
      color: '#3B82F6',
      description: 'Reload all agent configs',
      action: () => {
        setIsRefreshing(true);
        initializeAgentConfigurations();
        setTimeout(() => {
          setIsRefreshing(false);
          Alert.alert('Success', 'All configurations refreshed');
        }, 1000);
      },
    },
    {
      id: 'bulk-upload',
      label: 'Bulk Data Upload',
      icon: Upload,
      color: '#8B5CF6',
      description: 'Upload to multiple agents',
      route: '/ai-agent/bulk-config',
    },
    {
      id: 'enable-voice',
      label: 'Enable All Voice',
      icon: Activity,
      color: '#EC4899',
      description: 'Turn on voice for all agents',
      action: () => {
        allAgents.forEach(agent => {
          if (agent.configuration) agent.configuration.voice.enabled = true;
        });
        Alert.alert('Success', 'Voice enabled for all agents');
      },
    },
    {
      id: 'run-diagnostics',
      label: 'Run Diagnostics',
      icon: Target,
      color: '#14B8A6',
      description: 'Check all agent health',
      action: () => {
        const issues = allAgents.filter(a => a.performance?.successRate < 95);
        if (issues.length === 0) {
          Alert.alert('Diagnostics Complete', 'All agents are healthy!');
        } else {
          Alert.alert('Issues Found', `${issues.length} agents need attention`);
        }
      },
    },
  ];

  const navigationItems = [
    {
      id: 'analytics',
      label: 'Analytics Dashboard',
      icon: BarChart3,
      color: '#3B82F6',
      route: '/ai-agent/analytics',
      badge: 'Live',
    },
    {
      id: 'compare',
      label: 'Compare Agents',
      icon: Target,
      color: '#8B5CF6',
      route: '/ai-agent/compare',
    },
    {
      id: 'data-hub',
      label: 'Data & Training Hub',
      icon: Database,
      color: '#10B981',
      route: '/ai-agent/data-training-hub',
    },
    {
      id: 'bulk-config',
      label: 'Bulk Configuration',
      icon: Settings,
      color: '#F59E0B',
      route: '/ai-agent/bulk-config',
    },
    {
      id: 'settings',
      label: 'Global Settings',
      icon: Sparkles,
      color: '#EC4899',
      route: '/ai-agent/settings',
    },
    {
      id: 'all-agents',
      label: 'All Agents',
      icon: Users,
      color: '#6366F1',
      route: '/ai-agent',
    },
  ];

  const recentActivity = [
    { id: 1, text: 'AI Bookkeeper processed 1,240 transactions', time: '2 min ago', icon: CheckCircle, color: '#10B981' },
    { id: 2, text: 'AI Tax Agent completed compliance check', time: '15 min ago', icon: CheckCircle, color: '#10B981' },
    { id: 3, text: 'New training data uploaded to 3 agents', time: '1 hour ago', icon: Upload, color: '#3B82F6' },
    { id: 4, text: 'AI Sales Agent achieved 98% success rate', time: '2 hours ago', icon: Target, color: '#8B5CF6' },
  ];

  const handleAction = (item: typeof quickActions[0]) => {
    if (item.route) {
      router.push(item.route as any);
    } else if (item.action) {
      item.action();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Command size={22} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Command Center</Text>
          </View>
          <TouchableOpacity onPress={() => setIsRefreshing(!isRefreshing)}>
            <RotateCcw size={22} color={isRefreshing ? colors.primary : colors.text} />
          </TouchableOpacity>
        </View>

        {/* Status Overview */}
        <View style={styles.statusGrid}>
          <View style={[styles.statusCard, { backgroundColor: '#10B981' + '15' }]}>
            <Power size={20} color="#10B981" />
            <Text style={[styles.statusNumber, { color: '#10B981' }]}>{stats.totalActive}</Text>
            <Text style={[styles.statusLabel, { color: colors.text + '60' }]}>Active</Text>
          </View>
          <View style={[styles.statusCard, { backgroundColor: '#F59E0B' + '15' }]}>
            <Pause size={20} color="#F59E0B" />
            <Text style={[styles.statusNumber, { color: '#F59E0B' }]}>{stats.totalPaused}</Text>
            <Text style={[styles.statusLabel, { color: colors.text + '60' }]}>Paused</Text>
          </View>
          <View style={[styles.statusCard, { backgroundColor: '#8B5CF6' + '15' }]}>
            <Activity size={20} color="#8B5CF6" />
            <Text style={[styles.statusNumber, { color: '#8B5CF6' }]}>{stats.withVoice}</Text>
            <Text style={[styles.statusLabel, { color: colors.text + '60' }]}>Voice</Text>
          </View>
          <View style={[styles.statusCard, { backgroundColor: '#EC4899' + '15' }]}>
            <Zap size={20} color="#EC4899" />
            <Text style={[styles.statusNumber, { color: '#EC4899' }]}>{stats.withTraining}</Text>
            <Text style={[styles.statusLabel, { color: colors.text + '60' }]}>Training</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Actions Grid */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>QUICK ACTIONS</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <Animated.View entering={FadeInUp.delay(index * 50)} key={action.id} style={{ flex: 1, minWidth: '45%' }}>
                <TouchableOpacity
                  style={[styles.actionCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => handleAction(action)}
                >
                  <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
                    <action.icon size={24} color={action.color} />
                  </View>
                  <Text style={[styles.actionLabel, { color: colors.text }]}>{action.label}</Text>
                  <Text style={[styles.actionDesc, { color: colors.text + '60' }]}>{action.description}</Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        {/* Navigation Links */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>NAVIGATION</Text>
          <View style={[styles.navCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {navigationItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.navItem, index !== navigationItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
                onPress={() => router.push(item.route as any)}
              >
                <View style={[styles.navIcon, { backgroundColor: item.color + '15' }]}>
                  <item.icon size={20} color={item.color} />
                </View>
                <View style={styles.navContent}>
                  <Text style={[styles.navLabel, { color: colors.text }]}>{item.label}</Text>
                  {item.badge && (
                    <View style={[styles.navBadge, { backgroundColor: '#10B981' }]}>
                      <Text style={styles.navBadgeText}>{item.badge}</Text>
                    </View>
                  )}
                </View>
                <ChevronLeft size={20} color={colors.text + '40'} style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>RECENT ACTIVITY</Text>
          <View style={[styles.activityCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {recentActivity.map((activity, index) => (
              <View 
                key={activity.id} 
                style={[styles.activityItem, index !== recentActivity.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
              >
                <View style={[styles.activityIcon, { backgroundColor: activity.color + '15' }]}>
                  <activity.icon size={16} color={activity.color} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={[styles.activityText, { color: colors.text }]}>{activity.text}</Text>
                  <Text style={[styles.activityTime, { color: colors.text + '40' }]}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* System Status */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>SYSTEM STATUS</Text>
          <View style={[styles.systemCard, { backgroundColor: '#10B981' + '15', borderColor: '#10B981' }]}>
            <View style={styles.systemHeader}>
              <CheckCircle size={24} color="#10B981" />
              <Text style={[styles.systemTitle, { color: '#10B981' }]}>All Systems Operational</Text>
            </View>
            <View style={styles.systemMetrics}>
              <View style={styles.systemMetric}>
                <Text style={[styles.systemValue, { color: colors.text }]}>99.9%</Text>
                <Text style={[styles.systemLabel, { color: colors.text + '60' }]}>Uptime</Text>
              </View>
              <View style={styles.systemMetric}>
                <Text style={[styles.systemValue, { color: colors.text }]}>45ms</Text>
                <Text style={[styles.systemLabel, { color: colors.text + '60' }]}>Avg Latency</Text>
              </View>
              <View style={styles.systemMetric}>
                <Text style={[styles.systemValue, { color: colors.text }]}>{allAgents.length}</Text>
                <Text style={[styles.systemLabel, { color: colors.text + '60' }]}>Agents</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { borderBottomWidth: 1 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  backButton: { padding: 4 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600' },
  statusGrid: { flexDirection: 'row', padding: 16, gap: 10 },
  statusCard: { flex: 1, padding: 12, borderRadius: 12, alignItems: 'center' },
  statusNumber: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  statusLabel: { fontSize: 11, marginTop: 2 },
  content: { padding: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, marginBottom: 12 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionCard: { borderRadius: 16, borderWidth: 1, padding: 16, minHeight: 120 },
  actionIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  actionLabel: { fontSize: 14, fontWeight: '600' },
  actionDesc: { fontSize: 12, marginTop: 4 },
  navCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  navItem: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  navIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  navContent: { flex: 1, marginLeft: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  navLabel: { fontSize: 15, fontWeight: '500' },
  navBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  navBadgeText: { color: '#fff', fontSize: 10, fontWeight: '600' },
  activityCard: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  activityItem: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  activityIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1, marginLeft: 12 },
  activityText: { fontSize: 14 },
  activityTime: { fontSize: 12, marginTop: 2 },
  systemCard: { borderRadius: 16, borderWidth: 1, padding: 16 },
  systemHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  systemTitle: { fontSize: 16, fontWeight: '600' },
  systemMetrics: { flexDirection: 'row', justifyContent: 'space-around' },
  systemMetric: { alignItems: 'center' },
  systemValue: { fontSize: 20, fontWeight: '700' },
  systemLabel: { fontSize: 12, marginTop: 2 },
});
