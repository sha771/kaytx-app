 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Users, TrendingUp, Award, Target, Calendar, ChartBar, Clock } from 'lucide-react-native';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  performance: number;
  tasksCompleted: number;
  efficiency: number;
  streak: number;
}

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  unit: string;
}

export default function TeamPerformance() {
  const [activeTab, setActiveTab] = useState<'overview' | 'individual' | 'goals'>('overview');
  const [teamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'John Doe', role: 'Designer', avatar: '👨‍💻', performance: 92, tasksCompleted: 15, efficiency: 88, streak: 7 },
    { id: '2', name: 'Jane Smith', role: 'Developer', avatar: '👩‍💻', performance: 88, tasksCompleted: 23, efficiency: 92, streak: 12 },
    { id: '3', name: 'Mike Johnson', role: 'QA Engineer', avatar: '👨‍🔬', performance: 95, tasksCompleted: 18, efficiency: 95, streak: 5 },
    { id: '4', name: 'Sarah Wilson', role: 'Product Manager', avatar: '👩‍💼', performance: 90, tasksCompleted: 12, efficiency: 87, streak: 9 },
  ]);
  const [metrics] = useState<PerformanceMetric[]>([
    { id: '1', name: 'Team Productivity', value: 89, change: 5.2, unit: '%' },
    { id: '2', name: 'Task Completion Rate', value: 94, change: 2.1, unit: '%' },
    { id: '3', name: 'Average Response Time', value: 2.3, change: -0.5, unit: 'hrs' },
    { id: '4', name: 'Quality Score', value: 4.7, change: 0.3, unit: '/5' },
  ]);

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return '#27ae60';
    if (performance >= 80) return '#f39c12';
    return '#e74c3c';
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      <View style={styles.metricsGrid}>
        {metrics.map((metric) => (
          <View key={metric.id} style={styles.metricCard}>
            <Text style={styles.metricValue}>{metric.value}{metric.unit}</Text>
            <Text style={styles.metricName}>{metric.name}</Text>
            <View style={styles.metricChange}>
              <TrendingUp 
                size={16} 
                color={metric.change > 0 ? '#27ae60' : '#e74c3c'} 
              />
              <Text style={[
                styles.changeText, 
                { color: metric.change > 0 ? '#27ae60' : '#e74c3c' }
              ]}>
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.teamOverview}>
        <Text style={styles.sectionTitle}>Team Overview</Text>
        <View style={styles.overviewStats}>
          <View style={styles.overviewStat}>
            <Users size={24} color="#4ecdc4" />
            <Text style={styles.overviewValue}>4</Text>
            <Text style={styles.overviewLabel}>Team Members</Text>
          </View>
          <View style={styles.overviewStat}>
            <Target size={24} color="#45b7d1" />
            <Text style={styles.overviewValue}>68</Text>
            <Text style={styles.overviewLabel}>Tasks Completed</Text>
          </View>
          <View style={styles.overviewStat}>
            <Award size={24} color="#f39c12" />
            <Text style={styles.overviewValue}>91%</Text>
            <Text style={styles.overviewLabel}>Avg Performance</Text>
          </View>
        </View>
      </View>

      <View style={styles.performanceChart}>
        <Text style={styles.sectionTitle}>Performance Trend</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>Performance chart would go here</Text>
        </View>
      </View>
    </View>
  );

  const renderIndividual = () => (
    <View style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search team members..."
          placeholderTextColor="#666"
        />
      </View>

      {teamMembers.map((member) => (
        <View key={member.id} style={styles.memberPerformanceCard}>
          <View style={styles.memberHeader}>
            <View style={styles.memberInfo}>
              <Text style={styles.memberAvatar}>{member.avatar}</Text>
              <View>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
            </View>
            <View style={[
              styles.performanceBadge, 
              { backgroundColor: getPerformanceColor(member.performance) }
            ]}>
              <Text style={styles.performanceText}>{member.performance}%</Text>
            </View>
          </View>

          <View style={styles.memberStats}>
            <View style={styles.statColumn}>
              <Text style={styles.statValue}>{member.tasksCompleted}</Text>
              <Text style={styles.statLabel}>Tasks</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={styles.statValue}>{member.efficiency}%</Text>
              <Text style={styles.statLabel}>Efficiency</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={styles.statValue}>{member.streak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>

          <View style={styles.performanceBar}>
            <View 
              style={[
                styles.performanceFill, 
                { 
                  width: `${member.performance}%`,
                  backgroundColor: getPerformanceColor(member.performance)
                }
              ]} 
            />
          </View>
        </View>
      ))}
    </View>
  );

  const renderGoals = () => (
    <View style={styles.tabContent}>
      <View style={styles.goalsHeader}>
        <Text style={styles.sectionTitle}>Team Goals</Text>
        <TouchableOpacity style={styles.addGoalButton}>
          <Text style={styles.addGoalText}>+ Add Goal</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>Q1 Productivity Target</Text>
          <Text style={styles.goalProgress}>85%</Text>
        </View>
        <Text style={styles.goalDescription}>Achieve 90% team productivity by end of Q1</Text>
        <View style={styles.goalBar}>
          <View style={[styles.goalFill, { width: '85%' }]} />
        </View>
        <Text style={styles.goalDeadline}>Deadline: March 31, 2024</Text>
      </View>

      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>Task Completion Rate</Text>
          <Text style={styles.goalProgress}>94%</Text>
        </View>
        <Text style={styles.goalDescription}>Maintain 95% task completion rate</Text>
        <View style={styles.goalBar}>
          <View style={[styles.goalFill, { width: '94%' }]} />
        </View>
        <Text style={styles.goalDeadline}>Deadline: Ongoing</Text>
      </View>

      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>Response Time Improvement</Text>
          <Text style={styles.goalProgress}>67%</Text>
        </View>
        <Text style={styles.goalDescription}>Reduce average response time to under 2 hours</Text>
        <View style={styles.goalBar}>
          <View style={[styles.goalFill, { width: '67%' }]} />
        </View>
        <Text style={styles.goalDeadline}>Deadline: February 15, 2024</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Team Performance',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        }} 
      />
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}
        >
          <ChartBarBig size={20} color={activeTab === 'overview' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'individual' && styles.activeTab]}
          onPress={() => setActiveTab('individual')}
        >
          <Users size={20} color={activeTab === 'individual' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'individual' && styles.activeTabText]}>Individual</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'goals' && styles.activeTab]}
          onPress={() => setActiveTab('goals')}
        >
          <Target size={20} color={activeTab === 'goals' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'goals' && styles.activeTabText]}>Goals</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'individual' && renderIndividual()}
        {activeTab === 'goals' && renderGoals()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#2a2a2a',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#4ecdc4',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    width: '48%',
    marginBottom: 12,
  },
  metricValue: {
    color: '#4ecdc4',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricName: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  teamOverview: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overviewStat: {
    alignItems: 'center',
  },
  overviewValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  overviewLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  performanceChart: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
  },
  chartText: {
    color: '#666',
    fontSize: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  memberPerformanceCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  memberName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  memberRole: {
    color: '#666',
    fontSize: 14,
  },
  performanceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  performanceText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  memberStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statColumn: {
    alignItems: 'center',
  },
  statValue: {
    color: '#4ecdc4',
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  performanceBar: {
    height: 6,
    backgroundColor: '#2a2a2a',
    borderRadius: 3,
    overflow: 'hidden',
  },
  performanceFill: {
    height: '100%',
    borderRadius: 3,
  },
  goalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addGoalButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addGoalText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  goalCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  goalProgress: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: '700',
  },
  goalDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 12,
  },
  goalBar: {
    height: 6,
    backgroundColor: '#2a2a2a',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  goalFill: {
    height: '100%',
    backgroundColor: '#4ecdc4',
    borderRadius: 3,
  },
  goalDeadline: {
    color: '#666',
    fontSize: 12,
  },
});