import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, TrendingUp, Target, Zap, Clock, AlertTriangle, CheckCircle, Users, DollarSign, BarChart3, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import { AIEmployee } from '@/constants/aiEmployees';

interface AgentDashboardProps {
  agent: Partial<AIEmployee>;
}

export const AgentDashboard: React.FC<AgentDashboardProps> = ({ agent }) => {
  const { theme } = useTheme();

  const dashboardData = {
    quickStats: [
      { label: 'Tasks Today', value: '127', change: '+12%', icon: Activity, color: '#34C759', trend: 'up' },
      { label: 'Success Rate', value: '96.8%', change: '+2.3%', icon: CheckCircle, color: '#007AFF', trend: 'up' },
      { label: 'Avg Response', value: '0.8s', change: '-15%', icon: Clock, color: '#FF9500', trend: 'down' },
      { label: 'Cost Savings', value: '$4,250', change: '+8%', icon: DollarSign, color: '#5856D6', trend: 'up' },
    ],
    recentActivity: [
      { task: 'Processed customer inquiry', status: 'completed', time: '2 min ago', impact: 'high' },
      { task: 'Generated weekly report', status: 'completed', time: '15 min ago', impact: 'medium' },
      { task: 'Analyzed data patterns', status: 'processing', time: '32 min ago', impact: 'high' },
      { task: 'Updated CRM records', status: 'completed', time: '1 hr ago', impact: 'low' },
      { task: 'Escalated priority issue', status: 'pending', time: '2 hr ago', impact: 'critical' },
    ],
    upcomingTasks: [
      { task: 'Monthly performance review', due: 'Today 5:00 PM', priority: 'high' },
      { task: 'System optimization check', due: 'Tomorrow 9:00 AM', priority: 'medium' },
      { task: 'Data backup verification', due: 'Tomorrow 2:00 PM', priority: 'low' },
      { task: 'Capability expansion training', due: 'In 3 days', priority: 'medium' },
    ],
    alerts: [
      { type: 'warning', message: 'High queue volume detected', time: '5 min ago' },
      { type: 'info', message: 'New capability available', time: '1 hr ago' },
      { type: 'success', message: 'Performance milestone reached', time: '3 hr ago' },
    ],
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Quick Stats Grid */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Stats</Text>
        <View style={styles.statsGrid}>
          {dashboardData.quickStats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.statHeader}>
                <stat.icon size={20} color={stat.color} />
                <View style={[styles.trendBadge, { backgroundColor: stat.trend === 'up' ? '#34C75920' : '#FF3B3020' }]}>
                  {stat.trend === 'up' ? <ArrowUpRight size={12} color="#34C759" /> : <ArrowDownRight size={12} color="#FF3B30" />}
                  <Text style={[styles.trendText, { color: stat.trend === 'up' ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
                </View>
              </View>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          {dashboardData.recentActivity.map((activity, index) => (
            <View key={index} style={[styles.activityItem, { borderBottomColor: theme.colors.border }]}>
              <View style={[styles.statusDot, { backgroundColor: 
                activity.status === 'completed' ? '#34C759' : 
                activity.status === 'processing' ? '#007AFF' : 
                activity.status === 'pending' ? '#FF9500' : '#FF3B30'
              }]} />
              <View style={styles.activityContent}>
                <Text style={[styles.activityTask, { color: theme.colors.text }]}>{activity.task}</Text>
                <Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>{activity.time}</Text>
              </View>
              <View style={[styles.impactBadge, { backgroundColor: 
                activity.impact === 'critical' ? '#FF3B3020' : 
                activity.impact === 'high' ? '#FF950020' : 
                activity.impact === 'medium' ? '#007AFF20' : '#34C75920'
              }]}>
                <Text style={[styles.impactText, { color: 
                  activity.impact === 'critical' ? '#FF3B30' : 
                  activity.impact === 'high' ? '#FF9500' : 
                  activity.impact === 'medium' ? '#007AFF' : '#34C759'
                }]}>{activity.impact}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Upcoming Tasks */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Upcoming Tasks</Text>
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          {dashboardData.upcomingTasks.map((task, index) => (
            <View key={index} style={[styles.taskItem, { borderBottomColor: theme.colors.border }]}>
              <Calendar size={16} color={agent.color || '#007AFF'} />
              <View style={styles.taskContent}>
                <Text style={[styles.taskName, { color: theme.colors.text }]}>{task.task}</Text>
                <Text style={[styles.taskDue, { color: theme.colors.secondaryText }]}>{task.due}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: 
                task.priority === 'high' ? '#FF3B3020' : 
                task.priority === 'medium' ? '#FF950020' : '#34C75920'
              }]}>
                <Text style={[styles.priorityText, { color: 
                  task.priority === 'high' ? '#FF3B30' : 
                  task.priority === 'medium' ? '#FF9500' : '#34C759'
                }]}>{task.priority}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Alerts */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Alerts & Notifications</Text>
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          {dashboardData.alerts.map((alert, index) => (
            <View key={index} style={[styles.alertItem, { borderBottomColor: theme.colors.border }]}>
              {alert.type === 'warning' && <AlertTriangle size={16} color="#FF9500" />}
              {alert.type === 'info' && <Activity size={16} color="#007AFF" />}
              {alert.type === 'success' && <CheckCircle size={16} color="#34C759" />}
              <View style={styles.alertContent}>
                <Text style={[styles.alertMessage, { color: theme.colors.text }]}>{alert.message}</Text>
                <Text style={[styles.alertTime, { color: theme.colors.secondaryText }]}>{alert.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Performance Overview */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Overview</Text>
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.performanceRow}>
            <View style={styles.performanceItem}>
              <BarChart3 size={20} color="#34C759" />
              <Text style={[styles.performanceLabel, { color: theme.colors.secondaryText }]}>Weekly Tasks</Text>
              <Text style={[styles.performanceValue, { color: theme.colors.text }]}>892</Text>
            </View>
            <View style={styles.performanceItem}>
              <Target size={20} color="#007AFF" />
              <Text style={[styles.performanceLabel, { color: theme.colors.secondaryText }]}>Goals Met</Text>
              <Text style={[styles.performanceValue, { color: theme.colors.text }]}>94%</Text>
            </View>
            <View style={styles.performanceItem}>
              <Zap size={20} color="#FF9500" />
              <Text style={[styles.performanceLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
              <Text style={[styles.performanceValue, { color: theme.colors.text }]}>97%</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  activityContent: {
    flex: 1,
  },
  activityTask: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  taskContent: {
    flex: 1,
  },
  taskName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  taskDue: {
    fontSize: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  alertContent: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  alertTime: {
    fontSize: 12,
  },
  performanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  performanceItem: {
    alignItems: 'center',
    gap: 8,
  },
  performanceLabel: {
    fontSize: 12,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: '700',
  },
});
