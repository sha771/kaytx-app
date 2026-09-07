 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Users, UserPlus, SquareCheck, Calendar, Clock, BarChart3, Settings } from 'lucide-react-native';

interface Task {
  id: string;
  title: string;
  assignee: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  tasksCompleted: number;
  efficiency: number;
}

export default function TaskAssignment() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'team' | 'analytics'>('tasks');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Design Homepage', assignee: 'John Doe', status: 'in-progress', priority: 'high', dueDate: '2024-01-20' },
    { id: '2', title: 'API Integration', assignee: 'Jane Smith', status: 'pending', priority: 'medium', dueDate: '2024-01-22' },
    { id: '3', title: 'Testing Phase', assignee: 'Mike Johnson', status: 'completed', priority: 'low', dueDate: '2024-01-18' },
  ]);
  const [teamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'John Doe', role: 'Designer', avatar: '?????', tasksCompleted: 15, efficiency: 92 },
    { id: '2', name: 'Jane Smith', role: 'Developer', avatar: '?????', tasksCompleted: 23, efficiency: 88 },
    { id: '3', name: 'Mike Johnson', role: 'QA Engineer', avatar: '?????', tasksCompleted: 18, efficiency: 95 },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#f39c12';
      case 'low': return '#4ecdc4';
      default: return '#666';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#27ae60';
      case 'in-progress': return '#3498db';
      case 'pending': return '#95a5a6';
      default: return '#666';
    }
  };

  const renderTasks = () => (
    <View style={styles.tabContent}>
      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.taskInput}
          placeholder="Enter new task"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.addButton}>
          <UserPlus size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, styles.activeFilter]}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>In Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Completed</Text>
        </TouchableOpacity>
      </View>

      {tasks.map((task) => (
        <View key={task.id} style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
              <Text style={styles.priorityText}>{task.priority}</Text>
            </View>
          </View>
          <View style={styles.taskDetails}>
            <Text style={styles.assignee}>Assigned to: {task.assignee}</Text>
            <View style={styles.taskMeta}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
                <Text style={styles.statusText}>{task.status}</Text>
              </View>
              <Text style={styles.dueDate}>Due: {task.dueDate}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderTeam = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Team Members</Text>
        <TouchableOpacity style={styles.addMemberButton}>
          <UserPlus size={20} color="#4ecdc4" />
        </TouchableOpacity>
      </View>

      {teamMembers.map((member) => (
        <View key={member.id} style={styles.memberCard}>
          <View style={styles.memberInfo}>
            <Text style={styles.memberAvatar}>{member.avatar}</Text>
            <View style={styles.memberDetails}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
            </View>
          </View>
          <View style={styles.memberStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{member.tasksCompleted}</Text>
              <Text style={styles.statLabel}>Tasks</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{member.efficiency}%</Text>
              <Text style={styles.statLabel}>Efficiency</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.tabContent}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <SquareCheck size={24} color="#4ecdc4" />
          <Text style={styles.statCardValue}>24</Text>
          <Text style={styles.statCardLabel}>Active Tasks</Text>
        </View>
        <View style={styles.statCard}>
          <Users size={24} color="#45b7d1" />
          <Text style={styles.statCardValue}>8</Text>
          <Text style={styles.statCardLabel}>Team Members</Text>
        </View>
        <View style={styles.statCard}>
          <BarChart3 size={24} color="#f39c12" />
          <Text style={styles.statCardValue}>92%</Text>
          <Text style={styles.statCardLabel}>Completion Rate</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Task Distribution</Text>
        <View style={styles.chartBar}>
          <View style={[styles.chartSegment, { flex: 3, backgroundColor: '#27ae60' }]} />
          <View style={[styles.chartSegment, { flex: 2, backgroundColor: '#3498db' }]} />
          <View style={[styles.chartSegment, { flex: 1, backgroundColor: '#95a5a6' }]} />
        </View>
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#27ae60' }]} />
            <Text style={styles.legendText}>Completed (60%)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#3498db' }]} />
            <Text style={styles.legendText}>In Progress (30%)</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#95a5a6' }]} />
            <Text style={styles.legendText}>Pending (10%)</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Task Assignment',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        }} 
      />
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'tasks' && styles.activeTab]}
          onPress={() => setActiveTab('tasks')}
        >
          <SquareCheck size={20} color={activeTab === 'tasks' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'tasks' && styles.activeTabText]}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'team' && styles.activeTab]}
          onPress={() => setActiveTab('team')}
        >
          <Users size={20} color={activeTab === 'team' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'team' && styles.activeTabText]}>Team</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'analytics' && styles.activeTab]}
          onPress={() => setActiveTab('analytics')}
        >
          <BarChart3 size={20} color={activeTab === 'analytics' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'analytics' && styles.activeTabText]}>Analytics</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'team' && renderTeam()}
        {activeTab === 'analytics' && renderAnalytics()}
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
  addTaskContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  taskInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 12,
  },
  addButton: {
    backgroundColor: '#4ecdc4',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#4ecdc4',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
  taskCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  taskDetails: {
    gap: 8,
  },
  assignee: {
    color: '#666',
    fontSize: 14,
  },
  taskMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  dueDate: {
    color: '#666',
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  addMemberButton: {
    padding: 8,
  },
  memberCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  memberAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  memberDetails: {
    flex: 1,
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
  memberStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statCardValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  statCardLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
  },
  chartTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  chartSegment: {
    height: '100%',
  },
  chartLegend: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#666',
    fontSize: 14,
  },
});
