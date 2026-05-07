 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Clock, Calendar, Timer as TimerIcon, Play, Pause, RotateCcw, Plus, ChartBarBig } from 'lucide-react-native';

interface TimeEntry {
  id: string;
  task: string;
  duration: number;
  category: string;
  date: string;
}

interface Timer {
  id: string;
  name: string;
  duration: number;
  isRunning: boolean;
  timeLeft: number;
}

export default function TimeManagement() {
  const [activeTab, setActiveTab] = useState<'tracker' | 'timers' | 'analytics'>('tracker');
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    { id: '1', task: 'Project Planning', duration: 120, category: 'Work', date: '2024-01-15' },
    { id: '2', task: 'Client Meeting', duration: 60, category: 'Meetings', date: '2024-01-15' },
    { id: '3', task: 'Code Review', duration: 90, category: 'Development', date: '2024-01-14' },
  ]);
  const [timers, setTimers] = useState<Timer[]>([
    { id: '1', name: 'Pomodoro', duration: 1500, isRunning: false, timeLeft: 1500 },
    { id: '2', name: 'Break', duration: 300, isRunning: false, timeLeft: 300 },
    { id: '3', name: 'Deep Work', duration: 3600, isRunning: false, timeLeft: 3600 },
  ]);
  const [newTask, setNewTask] = useState('');

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id ? { ...timer, isRunning: true } : timer
    ));
  };

  const pauseTimer = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id ? { ...timer, isRunning: false } : timer
    ));
  };

  const resetTimer = (id: string) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id ? { ...timer, isRunning: false, timeLeft: timer.duration } : timer
    ));
  };

  const renderTimeTracker = () => (
    <View style={styles.tabContent}>
      <View style={styles.addTaskContainer}>
        <TextInput
          style={styles.taskInput}
          placeholder="Enter task name"
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Entries</Text>
      </View>

      {timeEntries.map((entry) => (
        <View key={entry.id} style={styles.entryCard}>
          <View style={styles.entryHeader}>
            <Text style={styles.entryTask}>{entry.task}</Text>
            <Text style={styles.entryDuration}>{Math.floor(entry.duration / 60)}m</Text>
          </View>
          <View style={styles.entryFooter}>
            <Text style={styles.entryCategory}>{entry.category}</Text>
            <Text style={styles.entryDate}>{entry.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderTimers = () => (
    <View style={styles.tabContent}>
      {timers.map((timer) => (
        <View key={timer.id} style={styles.timerCard}>
          <Text style={styles.timerName}>{timer.name}</Text>
          <Text style={styles.timerTime}>{formatTime(timer.timeLeft)}</Text>
          <View style={styles.timerControls}>
            <TouchableOpacity 
              style={[styles.controlButton, { backgroundColor: timer.isRunning ? '#ff6b6b' : '#4ecdc4' }]}
              onPress={() => timer.isRunning ? pauseTimer(timer.id) : startTimer(timer.id)}
            >
              {timer.isRunning ? <Pause size={20} color="#fff" /> : <Play size={20} color="#fff" />}
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.controlButton, { backgroundColor: '#95a5a6' }]}
              onPress={() => resetTimer(timer.id)}
            >
              <RotateCcw size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.tabContent}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <ChartBarBig size={24} color="#4ecdc4" />
          <Text style={styles.statValue}>8.5h</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
        <View style={styles.statCard}>
          <Calendar size={24} color="#45b7d1" />
          <Text style={styles.statValue}>42h</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </View>
        <View style={styles.statCard}>
          <Clock size={24} color="#f39c12" />
          <Text style={styles.statValue}>168h</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
      </View>

      <View style={styles.categoryBreakdown}>
        <Text style={styles.sectionTitle}>Category Breakdown</Text>
        <View style={styles.categoryItem}>
          <View style={[styles.categoryColor, { backgroundColor: '#4ecdc4' }]} />
          <Text style={styles.categoryName}>Work</Text>
          <Text style={styles.categoryTime}>65%</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={[styles.categoryColor, { backgroundColor: '#45b7d1' }]} />
          <Text style={styles.categoryName}>Meetings</Text>
          <Text style={styles.categoryTime}>20%</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={[styles.categoryColor, { backgroundColor: '#f39c12' }]} />
          <Text style={styles.categoryName}>Development</Text>
          <Text style={styles.categoryTime}>15%</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Time Management',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        }} 
      />
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'tracker' && styles.activeTab]}
          onPress={() => setActiveTab('tracker')}
        >
          <Clock size={20} color={activeTab === 'tracker' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'tracker' && styles.activeTabText]}>Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'timers' && styles.activeTab]}
          onPress={() => setActiveTab('timers')}
        >
          <Timer size={20} color={activeTab === 'timers' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'timers' && styles.activeTabText]}>Timers</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'analytics' && styles.activeTab]}
          onPress={() => setActiveTab('analytics')}
        >
          <ChartBarBig size={20} color={activeTab === 'analytics' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'analytics' && styles.activeTabText]}>Analytics</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'tracker' && renderTimeTracker()}
        {activeTab === 'timers' && renderTimers()}
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
    marginBottom: 24,
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
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  entryCard: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryTask: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  entryDuration: {
    color: '#4ecdc4',
    fontSize: 16,
    fontWeight: '600',
  },
  entryFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entryCategory: {
    color: '#666',
    fontSize: 14,
  },
  entryDate: {
    color: '#666',
    fontSize: 14,
  },
  timerCard: {
    backgroundColor: '#1a1a1a',
    padding: 24,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  timerName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  timerTime: {
    color: '#4ecdc4',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
  },
  timerControls: {
    flexDirection: 'row',
    gap: 16,
  },
  controlButton: {
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
  },
  statLabel: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  categoryBreakdown: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  categoryColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  categoryTime: {
    color: '#666',
    fontSize: 16,
  },
});
