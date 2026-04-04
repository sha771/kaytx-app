import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { Stack } from 'expo-router';
import { Phone, Clock, Users, BarChart3, Play, Pause, SkipForward, AlertCircle } from 'lucide-react-native';

interface QueuedCall {
  id: string;
  callerName: string;
  callerNumber: string;
  waitTime: number;
  priority: 'high' | 'normal' | 'low';
  reason: string;
  status: 'waiting' | 'on-hold' | 'transferred';
}

export default function CallQueueScreen() {
  const [queuedCalls] = useState<QueuedCall[]>([
    {
      id: '1',
      callerName: 'John Smith',
      callerNumber: '+1 (555) 123-4567',
      waitTime: 145,
      priority: 'high',
      reason: 'Technical Support',
      status: 'waiting',
    },
    {
      id: '2',
      callerName: 'Sarah Johnson',
      callerNumber: '+1 (555) 234-5678',
      waitTime: 89,
      priority: 'normal',
      reason: 'Sales Inquiry',
      status: 'on-hold',
    },
    {
      id: '3',
      callerName: 'Michael Brown',
      callerNumber: '+1 (555) 345-6789',
      waitTime: 45,
      priority: 'normal',
      reason: 'General Inquiry',
      status: 'waiting',
    },
  ]);

  const [maxQueueSize, setMaxQueueSize] = useState('50');
  const [maxWaitTime, setMaxWaitTime] = useState('300');
  const [enableCallback, setEnableCallback] = useState(true);
  const [autoRouting, setAutoRouting] = useState(true);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#EF4444';
      case 'normal':
        return '#3B82F6';
      case 'low':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const stats = {
    inQueue: queuedCalls.length,
    avgWaitTime: Math.round(
      queuedCalls.reduce((sum, call) => sum + call.waitTime, 0) / queuedCalls.length
    ),
    longestWait: Math.max(...queuedCalls.map((c) => c.waitTime)),
    abandoned: 3,
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Call Queue Management',
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#3B82F6' }]}>
            <Users size={24} color="#fff" />
            <Text style={styles.statValue}>{stats.inQueue}</Text>
            <Text style={styles.statLabel}>In Queue</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#8B5CF6' }]}>
            <Clock size={24} color="#fff" />
            <Text style={styles.statValue}>{formatTime(stats.avgWaitTime)}</Text>
            <Text style={styles.statLabel}>Avg Wait</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#F59E0B' }]}>
            <BarChart3 size={24} color="#fff" />
            <Text style={styles.statValue}>{formatTime(stats.longestWait)}</Text>
            <Text style={styles.statLabel}>Longest Wait</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: '#EF4444' }]}>
            <AlertCircle size={24} color="#fff" />
            <Text style={styles.statValue}>{stats.abandoned}</Text>
            <Text style={styles.statLabel}>Abandoned</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Queue Settings</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Maximum Queue Size</Text>
              <Text style={styles.settingDescription}>
                Maximum number of callers in queue
              </Text>
            </View>
            <TextInput
              style={styles.input}
              value={maxQueueSize}
              onChangeText={setMaxQueueSize}
              keyboardType="number-pad"
              placeholderTextColor="#64748B"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Max Wait Time (seconds)</Text>
              <Text style={styles.settingDescription}>
                Auto-callback after this time
              </Text>
            </View>
            <TextInput
              style={styles.input}
              value={maxWaitTime}
              onChangeText={setMaxWaitTime}
              keyboardType="number-pad"
              placeholderTextColor="#64748B"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Enable Callback Option</Text>
              <Text style={styles.settingDescription}>
                Offer callback instead of waiting
              </Text>
            </View>
            <Switch
              value={enableCallback}
              onValueChange={setEnableCallback}
              trackColor={{ false: '#1E293B', true: '#3B82F6' }}
              thumbColor={enableCallback ? '#fff' : '#64748B'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Auto-Routing</Text>
              <Text style={styles.settingDescription}>
                Automatically route to available agents
              </Text>
            </View>
            <Switch
              value={autoRouting}
              onValueChange={setAutoRouting}
              trackColor={{ false: '#1E293B', true: '#3B82F6' }}
              thumbColor={autoRouting ? '#fff' : '#64748B'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Queue</Text>

          {queuedCalls.map((call) => (
            <View key={call.id} style={styles.callCard}>
              <View style={styles.callHeader}>
                <View style={styles.callInfo}>
                  <Text style={styles.callerName}>{call.callerName}</Text>
                  <Text style={styles.callerNumber}>{call.callerNumber}</Text>
                </View>
                <View
                  style={[
                    styles.priorityBadge,
                    { backgroundColor: getPriorityColor(call.priority) + '20' },
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      { color: getPriorityColor(call.priority) },
                    ]}
                  >
                    {call.priority.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.callDetails}>
                <View style={styles.detailRow}>
                  <Clock size={16} color="#64748B" />
                  <Text style={styles.detailText}>
                    Waiting: {formatTime(call.waitTime)}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Phone size={16} color="#64748B" />
                  <Text style={styles.detailText}>{call.reason}</Text>
                </View>
              </View>

              <View style={styles.callActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Play size={18} color="#10B981" />
                  <Text style={[styles.actionText, { color: '#10B981' }]}>
                    Answer
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Pause size={18} color="#F59E0B" />
                  <Text style={[styles.actionText, { color: '#F59E0B' }]}>
                    Hold
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <SkipForward size={18} color="#3B82F6" />
                  <Text style={[styles.actionText, { color: '#3B82F6' }]}>
                    Transfer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  input: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#fff',
    width: 80,
    textAlign: 'center',
  },
  callCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  callInfo: {
    flex: 1,
  },
  callerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  callerNumber: {
    fontSize: 14,
    color: '#64748B',
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '700',
  },
  callDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#94A3B8',
  },
  callActions: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
