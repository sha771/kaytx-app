 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { SquareCheck, Plus, Calendar, User, Flag, Clock, Search, ListFilter, GripHorizontal } from 'lucide-react-native';

const tasks = [
  { 
    id: 1, 
    title: 'Review quarterly reports', 
    description: 'Analyze Q4 performance metrics and prepare summary',
    priority: 'high', 
    status: 'in-progress', 
    assignee: 'John Smith',
    dueDate: '2024-01-15',
    progress: 60,
    tags: ['finance', 'quarterly']
  },
  { 
    id: 2, 
    title: 'Update website content', 
    description: 'Refresh homepage and product pages with new content',
    priority: 'medium', 
    status: 'pending', 
    assignee: 'Sarah Johnson',
    dueDate: '2024-01-18',
    progress: 0,
    tags: ['marketing', 'website']
  },
  { 
    id: 3, 
    title: 'Client presentation prep', 
    description: 'Prepare slides for upcoming client meeting',
    priority: 'high', 
    status: 'completed', 
    assignee: 'Mike Wilson',
    dueDate: '2024-01-12',
    progress: 100,
    tags: ['sales', 'presentation']
  },
];

const teamMembers = [
  { id: 1, name: 'John Smith', avatar: 'JS', tasksCount: 5, completedToday: 2 },
  { id: 2, name: 'Sarah Johnson', avatar: 'SJ', tasksCount: 3, completedToday: 1 },
  { id: 3, name: 'Mike Wilson', avatar: 'MW', tasksCount: 7, completedToday: 4 },
  { id: 4, name: 'Emma Davis', avatar: 'ED', tasksCount: 4, completedToday: 2 },
];

const taskStats = [
  { label: 'Total Tasks', value: '24', color: '#3B82F6' },
  { label: 'In Progress', value: '8', color: '#F59E0B' },
  { label: 'Completed', value: '12', color: '#10B981' },
  { label: 'Overdue', value: '4', color: '#EF4444' },
];

export default function TaskManagementScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [newTask, setNewTask] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || task.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in-progress': return '#3B82F6';
      case 'pending': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const addTask = () => {
    if (newTask.trim()) {
      console.log('Adding task:', newTask);
      setNewTask('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Task Management',
          headerStyle: { backgroundColor: '#3B82F6' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <ScrollView style={styles.content}>
        {/* Task Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Task Overview</Text>
          <View style={styles.statsGrid}>
            {taskStats.map((stat, index) => (
              <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Add Task */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Add Task</Text>
          <View style={styles.addTaskContainer}>
            <TextInput
              style={styles.taskInput}
              placeholder="Enter task title..."
              value={newTask}
              onChangeText={setNewTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Team Members */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Members</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {teamMembers.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberAvatarText}>{member.avatar}</Text>
                </View>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberStats}>{member.tasksCount} tasks</Text>
                <Text style={styles.memberCompleted}>{member.completedToday} completed today</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Search and Filter */}
        <View style={styles.section}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search tasks..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterButton}>
              <ListFilter size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.filterTabs}>
            {['all', 'pending', 'in-progress', 'completed'].map((Filter) => (
              <TouchableOpacity
                key={Funnel}
                style={[styles.filterTab, selectedFilter === Filter && styles.activeFilterTab]}
                onPress={() => setSelectedFilter(Filter as any)}
              >
                <Text style={[styles.filterTabText, selectedFilter === Filter && styles.activeFilterTabText]}>
                  {Filter.charAt(0).toUpperCase() + Filter.slice(1).replace('-', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tasks List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          {filteredTasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                </View>
                <TouchableOpacity style={styles.taskMenu}>
                  <GripHorizontal size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <View style={styles.taskMeta}>
                <View style={styles.taskMetaRow}>
                  <View style={styles.metaItem}>
                    <Flag size={16} color={getPriorityColor(task.priority)} />
                    <Text style={[styles.metaText, { color: getPriorityColor(task.priority) }]}>
                      {task.priority}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <User size={16} color="#6B7280" />
                    <Text style={styles.metaText}>{task.assignee}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Calendar size={16} color="#6B7280" />
                    <Text style={styles.metaText}>{task.dueDate}</Text>
                  </View>
                </View>

                <View style={styles.taskProgress}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${task.progress}%`,
                          backgroundColor: getStatusColor(task.status)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>{task.progress}%</Text>
                </View>

                <View style={styles.taskFooter}>
                  <View style={styles.taskTags}>
                    {task.tags.map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
                    <Text style={styles.statusText}>{task.status.replace('-', ' ')}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={styles.actionButton}>
              <SquareCheck size={24} color="#3B82F6" />
              <Text style={styles.actionText}>Create Project</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Calendar size={24} color="#3B82F6" />
              <Text style={styles.actionText}>Schedule Meeting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <User size={24} color="#3B82F6" />
              <Text style={styles.actionText}>Assign Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Clock size={24} color="#3B82F6" />
              <Text style={styles.actionText}>Time Tracking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flex: 1,
    minWidth: '45%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  addTaskContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  taskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  memberAvatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  memberStats: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  memberCompleted: {
    fontSize: 10,
    color: '#10B981',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  filterButton: {
    padding: 4,
  },
  filterTabs: {
    flexDirection: 'row',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#3B82F6',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  taskDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  taskMenu: {
    padding: 4,
  },
  taskMeta: {
    gap: 12,
  },
  taskMetaRow: {
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
    color: '#6B7280',
  },
  taskProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    minWidth: 35,
    textAlign: 'right',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTags: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
    color: '#6B7280',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
});
