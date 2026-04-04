import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { User, Calendar, CheckCircle, Clock, Plus, Search, Filter, Bell } from 'lucide-react-native';

const assistantTasks = [
  { id: 1, title: 'Schedule meeting with John', priority: 'high', status: 'pending', dueDate: '2024-01-15', category: 'scheduling' },
  { id: 2, title: 'Send follow-up email to Sarah', priority: 'medium', status: 'in-progress', dueDate: '2024-01-14', category: 'communication' },
  { id: 3, title: 'Prepare quarterly report', priority: 'high', status: 'completed', dueDate: '2024-01-13', category: 'documentation' },
  { id: 4, title: 'Book restaurant reservation', priority: 'low', status: 'pending', dueDate: '2024-01-16', category: 'personal' },
];

const upcomingEvents = [
  { id: 1, title: 'Team Meeting', time: '10:00 AM', date: 'Today', type: 'meeting' },
  { id: 2, title: 'Client Call', time: '2:30 PM', date: 'Today', type: 'call' },
  { id: 3, title: 'Project Review', time: '9:00 AM', date: 'Tomorrow', type: 'meeting' },
];

const quickActions = [
  { id: 1, title: 'Schedule Meeting', icon: Calendar, color: '#3B82F6' },
  { id: 2, title: 'Set Reminder', icon: Bell, color: '#F59E0B' },
  { id: 3, title: 'Add Task', icon: Plus, color: '#10B981' },
  { id: 4, title: 'Search Contacts', icon: Search, color: '#8B5CF6' },
];

export default function PersonalAssistantScreen() {
  const [newTask, setNewTask] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  const filteredTasks = assistantTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || task.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const addTask = () => {
    if (newTask.trim()) {
      console.log('Adding task:', newTask);
      setNewTask('');
    }
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Personal Assistant',
          headerStyle: { backgroundColor: '#6366F1' },
          headerTintColor: '#FFFFFF',
        }} 
      />
      
      <ScrollView style={styles.content}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.id} style={[styles.quickActionButton, { borderLeftColor: action.color }]}>
                <action.icon size={24} color={action.color} />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add New Task */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add New Task</Text>
          <View style={styles.addTaskContainer}>
            <TextInput
              style={styles.taskInput}
              placeholder="What would you like me to help you with?"
              value={newTask}
              onChangeText={setNewTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventTime}>
                <Text style={styles.eventTimeText}>{event.time}</Text>
                <Text style={styles.eventDateText}>{event.date}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventType}>{event.type}</Text>
              </View>
              <TouchableOpacity style={styles.eventAction}>
                <Calendar size={20} color="#6366F1" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Tasks Management */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Tasks</Text>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Search and Filter */}
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search tasks..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.filterTabs}>
            {['all', 'pending', 'in-progress', 'completed'].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[styles.filterTab, selectedFilter === filter && styles.activeFilterTab]}
                onPress={() => setSelectedFilter(filter as any)}
              >
                <Text style={[styles.filterTabText, selectedFilter === filter && styles.activeFilterTabText]}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tasks List */}
          {filteredTasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskCategory}>{task.category}</Text>
                </View>
                <View style={styles.taskMeta}>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                    <Text style={styles.priorityText}>{task.priority}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.taskFooter}>
                <View style={styles.taskStatus}>
                  <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(task.status) }]} />
                  <Text style={styles.statusText}>{task.status.replace('-', ' ')}</Text>
                </View>
                <View style={styles.taskDue}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.dueText}>{task.dueDate}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* AI Suggestions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Suggestions</Text>
          <View style={styles.suggestionCard}>
            <User size={24} color="#6366F1" />
            <View style={styles.suggestionContent}>
              <Text style={styles.suggestionTitle}>Optimize Your Schedule</Text>
              <Text style={styles.suggestionText}>
                I noticed you have back-to-back meetings today. Would you like me to suggest some buffer time?
              </Text>
            </View>
            <TouchableOpacity style={styles.suggestionAction}>
              <CheckCircle size={20} color="#10B981" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.suggestionCard}>
            <Bell size={24} color="#F59E0B" />
            <View style={styles.suggestionContent}>
              <Text style={styles.suggestionTitle}>Reminder Setup</Text>
              <Text style={styles.suggestionText}>
                Don't forget about your client presentation tomorrow. Shall I set up preparation reminders?
              </Text>
            </View>
            <TouchableOpacity style={styles.suggestionAction}>
              <CheckCircle size={20} color="#10B981" />
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
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
    backgroundColor: '#6366F1',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTime: {
    alignItems: 'center',
    minWidth: 80,
  },
  eventTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  eventDateText: {
    fontSize: 12,
    color: '#6B7280',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  eventType: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  eventAction: {
    padding: 8,
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
  filterTabs: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#6366F1',
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
  taskCategory: {
    fontSize: 14,
    color: '#6B7280',
  },
  taskMeta: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  taskDue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dueText: {
    fontSize: 12,
    color: '#6B7280',
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  suggestionText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  suggestionAction: {
    padding: 8,
  },
});