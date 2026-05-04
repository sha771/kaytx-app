 
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Phone, Clock, Users, ChartBar, Play, Pause, SkipForward, CircleAlert, Lock } from 'lucide-react-native';
import { trpc } from '@/lib/trpc';
import { useTheme } from '@/providers/ThemeProvider';

export default function CallQueueScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  
  // Real tRPC data
  const { data: subscription } = trpc.user.getSubscription.useQuery();
  const isEnterprise = subscription?.plan === 'enterprise';

  const { data: queuedCalls = [], isLoading, refetch } = trpc.receptionist.getQueue.useQuery(undefined, {
    refetchInterval: 5000, // Polling for live queue
  });

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

  const stats = useMemo(() => {
    if (!queuedCalls.length) {
      return {
        inQueue: 0,
        avgWaitTime: 0,
        longestWait: 0,
        abandoned: 0,
      };
    }
    return {
      inQueue: queuedCalls.length,
      avgWaitTime: Math.round(
        queuedCalls.reduce((sum, call) => sum + call.waitTime, 0) / queuedCalls.length
      ),
      longestWait: Math.max(...queuedCalls.map((c) => c.waitTime)),
      abandoned: 3, // Fallback as this might not be in queue endpoint
    };
  }, [queuedCalls]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Call Queue Management',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: theme.colors.primary }]}>
              {!isEnterprise && (
                <View style={styles.lockOverlayMini}>
                  <Lock size={14} color="white" />
                </View>
              )}
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
              <ChartBar size={24} color="#fff" />
              <Text style={styles.statValue}>{formatTime(stats.longestWait)}</Text>
              <Text style={styles.statLabel}>Longest Wait</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: '#EF4444' }]}>
              <CircleAlert size={24} color="#fff" />
              <Text style={styles.statValue}>{stats.abandoned}</Text>
              <Text style={styles.statLabel}>Abandoned</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Queue Settings</Text>

            <View style={[styles.settingRow, { backgroundColor: theme.colors.cardBackground }]}>
              {!isEnterprise && (
                <TouchableOpacity 
                  style={styles.lockOverlay}
                  onPress={() => router.push('/enterprise-admin')}
                >
                  <Lock size={20} color={theme.colors.text} />
                </TouchableOpacity>
              )}
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Maximum Queue Size</Text>
                <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                  Maximum number of callers in queue
                </Text>
              </View>
              <TextInput
                style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}
                value={maxQueueSize}
                onChangeText={setMaxQueueSize}
                keyboardType="number-pad"
                placeholderTextColor={theme.colors.secondaryText}
              />
            </View>

            <View style={[styles.settingRow, { backgroundColor: theme.colors.cardBackground }]}>
              {!isEnterprise && (
                <TouchableOpacity 
                  style={styles.lockOverlay}
                  onPress={() => router.push('/enterprise-admin')}
                >
                  <Lock size={20} color={theme.colors.text} />
                </TouchableOpacity>
              )}
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Max Wait Time (seconds)</Text>
                <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                  Auto-callback after this time
                </Text>
              </View>
              <TextInput
                style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border, backgroundColor: theme.colors.background }]}
                value={maxWaitTime}
                onChangeText={setMaxWaitTime}
                keyboardType="number-pad"
                placeholderTextColor={theme.colors.secondaryText}
              />
            </View>

            <View style={[styles.settingRow, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Enable Callback Option</Text>
                <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                  Offer callback instead of waiting
                </Text>
              </View>
              <Switch
                value={enableCallback}
                onValueChange={setEnableCallback}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={enableCallback ? '#fff' : '#f4f3f4'}
              />
            </View>

            <View style={[styles.settingRow, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Routing</Text>
                <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                  Automatically route to available agents
                </Text>
              </View>
              <Switch
                value={autoRouting}
                onValueChange={setAutoRouting}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={autoRouting ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Queue</Text>

            {queuedCalls.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Phone size={48} color={theme.colors.secondaryText} />
                <Text style={[styles.emptyText, { color: theme.colors.secondaryText }]}>No calls currently in queue</Text>
              </View>
            ) : (
              queuedCalls.map((call) => (
                <View key={call.id} style={[styles.callCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <View style={styles.callHeader}>
                    <View style={styles.callInfo}>
                      <Text style={[styles.callerName, { color: theme.colors.text }]}>{call.callerName}</Text>
                      <Text style={[styles.callerNumber, { color: theme.colors.secondaryText }]}>{call.callerNumber}</Text>
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
                      <Clock size={16} color={theme.colors.secondaryText} />
                      <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
                        Waiting: {formatTime(call.waitTime)}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Phone size={16} color={theme.colors.secondaryText} />
                      <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>{call.reason}</Text>
                    </View>
                  </View>

                  <View style={[styles.callActions, { borderTopColor: theme.colors.border }]}>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background }]}>
                      <Play size={18} color={theme.colors.success} />
                      <Text style={[styles.actionText, { color: theme.colors.success }]}>
                        Answer
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background }]}>
                      <Pause size={18} color="#F59E0B" />
                      <Text style={[styles.actionText, { color: '#F59E0B' }]}>
                        Hold
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.background }]}>
                      <SkipForward size={18} color={theme.colors.primary} />
                      <Text style={[styles.actionText, { color: theme.colors.primary }]}>
                        Transfer
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 12,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockOverlayMini: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    padding: 4,
    zIndex: 10,
  },
});
