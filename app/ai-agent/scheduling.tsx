import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Calendar,
  Clock,
  Timer,
  Repeat,
  Bell,
  Play,
  Pause,
  Sun,
  Moon,
  CalendarDays,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Zap,
  Bot,
  Settings,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import {
  allAgents,
  agentCategories,
} from '@/constants/aiAgentHierarchy';

interface AgentSchedule {
  agentId: string;
  enabled: boolean;
  workHours: { start: string; end: string };
  workDays: number[];
  timezone: string;
  breaks: { start: string; end: string; enabled: boolean }[];
  overtime: { enabled: boolean; maxHours: number; rate: number };
  holidays: { enabled: boolean; country: string };
  autoStart: boolean;
  autoPause: boolean;
  priorityHours: string[];
}

export default function AgentSchedulingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [schedules, setSchedules] = useState<Record<string, AgentSchedule>>({});
  const [showScheduleEditor, setShowScheduleEditor] = useState<string | null>(null);

  const filteredAgents = allAgents.filter(agent => {
    const matchesCategory = !selectedCategory || agent.category === selectedCategory;
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSchedule = (agentId: string): AgentSchedule => {
    return schedules[agentId] || {
      agentId,
      enabled: true,
      workHours: { start: '09:00', end: '17:00' },
      workDays: [1, 2, 3, 4, 5],
      timezone: 'UTC',
      breaks: [{ start: '12:00', end: '13:00', enabled: true }],
      overtime: { enabled: false, maxHours: 2, rate: 1.5 },
      holidays: { enabled: true, country: 'US' },
      autoStart: true,
      autoPause: true,
      priorityHours: ['09:00-11:00', '14:00-16:00'],
    };
  };

  const updateSchedule = (agentId: string, updates: Partial<AgentSchedule>) => {
    setSchedules(prev => ({
      ...prev,
      [agentId]: { ...getSchedule(agentId), ...updates },
    }));
  };

  const toggleWorkDay = (agentId: string, day: number) => {
    const schedule = getSchedule(agentId);
    const days = schedule.workDays.includes(day)
      ? schedule.workDays.filter(d => d !== day)
      : [...schedule.workDays, day].sort();
    updateSchedule(agentId, { workDays: days });
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const ScheduleEditor = ({ agentId }: { agentId: string }) => {
    const schedule = getSchedule(agentId);
    const agent = allAgents.find(a => a.id === agentId);
    if (!agent) return null;

    return (
      <View style={[styles.editorModal, { backgroundColor: colors.card }]}>
        <View style={styles.editorHeader}>
          <View style={styles.editorTitleRow}>
            <agent.icon size={24} color={agent.color} />
            <Text style={[styles.editorTitle, { color: colors.text }]}>{agent.name}</Text>
          </View>
          <TouchableOpacity onPress={() => setShowScheduleEditor(null)}>
            <Text style={[styles.doneButton, { color: colors.primary }]}>Done</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.editorContent}>
          {/* Enable Scheduling */}
          <View style={[styles.editorSection, { borderBottomColor: colors.border }]}>
            <View style={styles.editorRow}>
              <View style={styles.editorRowIcon}>
                <Zap size={20} color={colors.primary} />
              </View>
              <Text style={[styles.editorRowLabel, { color: colors.text }]}>Enable Scheduling</Text>
              <Switch
                value={schedule.enabled}
                onValueChange={(v) => updateSchedule(agentId, { enabled: v })}
                trackColor={{ false: '#767577', true: colors.primary + '80' }}
                thumbColor={schedule.enabled ? colors.primary : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Work Hours */}
          <View style={[styles.editorSection, { borderBottomColor: colors.border }]}>
            <Text style={[styles.sectionLabel, { color: colors.text + '60' }]}>WORK HOURS</Text>
            <View style={styles.timeRow}>
              <View style={styles.timeInputContainer}>
                <Clock size={16} color={colors.text + '60'} />
                <TextInput
                  style={[styles.timeInput, { color: colors.text }]}
                  value={schedule.workHours.start}
                  onChangeText={(v) => updateSchedule(agentId, { workHours: { ...schedule.workHours, start: v } })}
                  placeholder="09:00"
                  placeholderTextColor={colors.text + '40'}
                />
              </View>
              <Text style={[styles.timeSeparator, { color: colors.text }]}>to</Text>
              <View style={styles.timeInputContainer}>
                <Clock size={16} color={colors.text + '60'} />
                <TextInput
                  style={[styles.timeInput, { color: colors.text }]}
                  value={schedule.workHours.end}
                  onChangeText={(v) => updateSchedule(agentId, { workHours: { ...schedule.workHours, end: v } })}
                  placeholder="17:00"
                  placeholderTextColor={colors.text + '40'}
                />
              </View>
            </View>
          </View>

          {/* Work Days */}
          <View style={[styles.editorSection, { borderBottomColor: colors.border }]}>
            <Text style={[styles.sectionLabel, { color: colors.text + '60' }]}>WORK DAYS</Text>
            <View style={styles.daysRow}>
              {dayNames.map((day, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.dayChip, schedule.workDays.includes(idx) && { backgroundColor: colors.primary }]}
                  onPress={() => toggleWorkDay(agentId, idx)}
                >
                  <Text style={[styles.dayText, { color: schedule.workDays.includes(idx) ? '#fff' : colors.text }]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Breaks */}
          <View style={[styles.editorSection, { borderBottomColor: colors.border }]}>
            <Text style={[styles.sectionLabel, { color: colors.text + '60' }]}>BREAKS</Text>
            {schedule.breaks.map((breakItem, idx) => (
              <View key={idx} style={styles.breakRow}>
                <Switch
                  value={breakItem.enabled}
                  onValueChange={(v) => {
                    const newBreaks = [...schedule.breaks];
                    newBreaks[idx] = { ...breakItem, enabled: v };
                    updateSchedule(agentId, { breaks: newBreaks });
                  }}
                  trackColor={{ false: '#767577', true: colors.primary + '80' }}
                  thumbColor={breakItem.enabled ? colors.primary : '#f4f3f4'}
                />
                <View style={styles.breakTimeInputs}>
                  <TextInput
                    style={[styles.breakInput, { color: colors.text, backgroundColor: colors.border + '30' }]}
                    value={breakItem.start}
                    onChangeText={(v) => {
                      const newBreaks = [...schedule.breaks];
                      newBreaks[idx] = { ...breakItem, start: v };
                      updateSchedule(agentId, { breaks: newBreaks });
                    }}
                  />
                  <Text style={[styles.breakSeparator, { color: colors.text }]}>to</Text>
                  <TextInput
                    style={[styles.breakInput, { color: colors.text, backgroundColor: colors.border + '30' }]}
                    value={breakItem.end}
                    onChangeText={(v) => {
                      const newBreaks = [...schedule.breaks];
                      newBreaks[idx] = { ...breakItem, end: v };
                      updateSchedule(agentId, { breaks: newBreaks });
                    }}
                  />
                </View>
              </View>
            ))}
          </View>

          {/* Auto Controls */}
          <View style={[styles.editorSection, { borderBottomColor: colors.border }]}>
            <Text style={[styles.sectionLabel, { color: colors.text + '60' }]}>AUTOMATION</Text>
            <View style={styles.editorRow}>
              <Play size={20} color={colors.text + '60'} />
              <Text style={[styles.editorRowLabel, { color: colors.text }]}>Auto-start at work hours</Text>
              <Switch
                value={schedule.autoStart}
                onValueChange={(v) => updateSchedule(agentId, { autoStart: v })}
                trackColor={{ false: '#767577', true: colors.primary + '80' }}
                thumbColor={schedule.autoStart ? colors.primary : '#f4f3f4'}
              />
            </View>
            <View style={styles.editorRow}>
              <Pause size={20} color={colors.text + '60'} />
              <Text style={[styles.editorRowLabel, { color: colors.text }]}>Auto-pause after hours</Text>
              <Switch
                value={schedule.autoPause}
                onValueChange={(v) => updateSchedule(agentId, { autoPause: v })}
                trackColor={{ false: '#767577', true: colors.primary + '80' }}
                thumbColor={schedule.autoPause ? colors.primary : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Overtime */}
          <View style={[styles.editorSection, { borderBottomColor: colors.border }]}>
            <Text style={[styles.sectionLabel, { color: colors.text + '60' }]}>OVERTIME</Text>
            <View style={styles.editorRow}>
              <AlertCircle size={20} color={colors.text + '60'} />
              <Text style={[styles.editorRowLabel, { color: colors.text }]}>Allow overtime</Text>
              <Switch
                value={schedule.overtime.enabled}
                onValueChange={(v) => updateSchedule(agentId, { overtime: { ...schedule.overtime, enabled: v } })}
                trackColor={{ false: '#767577', true: colors.primary + '80' }}
                thumbColor={schedule.overtime.enabled ? colors.primary : '#f4f3f4'}
              />
            </View>
            {schedule.overtime.enabled && (
              <View style={styles.overtimeDetails}>
                <Text style={[styles.overtimeLabel, { color: colors.text + '60' }]}>Max overtime: {schedule.overtime.maxHours}h</Text>
                <Text style={[styles.overtimeLabel, { color: colors.text + '60' }]}>Rate: {schedule.overtime.rate}x</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
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
            <Calendar size={22} color={colors.primary} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Agent Scheduling</Text>
          </View>
          <TouchableOpacity onPress={() => Alert.alert('Apply to All', 'Apply current schedule settings to all agents?')}>
            <Settings size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statBadge, { backgroundColor: colors.primary + '15' }]}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{Object.values(schedules).filter(s => s.enabled).length}</Text>
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Scheduled</Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: '#10B981' + '15' }]}>
            <Sun size={16} color="#10B981" />
            <Text style={[styles.statLabel, { color: colors.text + '60' }]}>Active Now</Text>
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <TouchableOpacity
            style={[styles.filterChip, !selectedCategory && { backgroundColor: colors.primary }]}
            onPress={() => setSelectedCategory('')}
          >
            <Text style={[styles.filterText, { color: !selectedCategory ? '#fff' : colors.text }]}>All</Text>
          </TouchableOpacity>
          {agentCategories.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.filterChip, selectedCategory === cat.id && { backgroundColor: cat.color }]}
              onPress={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
            >
              <Text style={[styles.filterText, { color: selectedCategory === cat.id ? '#fff' : colors.text }]}>
                {cat.label.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Bulk Actions */}
        <View style={styles.bulkActions}>
          <TouchableOpacity style={[styles.bulkButton, { backgroundColor: colors.primary + '15' }]}>
            <Play size={18} color={colors.primary} />
            <Text style={[styles.bulkText, { color: colors.primary }]}>Start All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bulkButton, { backgroundColor: '#F59E0B' + '15' }]}>
            <Pause size={18} color="#F59E0B" />
            <Text style={[styles.bulkText, { color: '#F59E0B' }]}>Pause All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bulkButton, { backgroundColor: '#8B5CF6' + '15' }]}>
            <CalendarDays size={18} color="#8B5CF6" />
            <Text style={[styles.bulkText, { color: '#8B5CF6' }]}>Set Hours</Text>
          </TouchableOpacity>
        </View>

        {/* Agent List */}
        <Text style={[styles.sectionTitle, { color: colors.text + '60' }]}>AGENT SCHEDULES</Text>
        {filteredAgents.map((agent, index) => {
          const schedule = getSchedule(agent.id);
          return (
            <Animated.View entering={FadeInUp.delay(index * 30)} key={agent.id}>
              <TouchableOpacity
                style={[styles.agentCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => setShowScheduleEditor(agent.id)}
              >
                <View style={styles.agentHeader}>
                  <View style={[styles.agentIcon, { backgroundColor: agent.color + '15' }]}>
                    <agent.icon size={24} color={agent.color} />
                  </View>
                  <View style={styles.agentInfo}>
                    <Text style={[styles.agentName, { color: colors.text }]}>{agent.name}</Text>
                    <Text style={[styles.agentCategory, { color: colors.text + '60' }]}>{agent.category}</Text>
                  </View>
                  <View style={[styles.statusBadge, { 
                    backgroundColor: schedule.enabled ? '#10B981' + '20' : colors.text + '10'
                  }]}>
                    <Text style={[styles.statusText, { 
                      color: schedule.enabled ? '#10B981' : colors.text + '60'
                    }]}>
                      {schedule.enabled ? 'Scheduled' : 'Manual'}
                    </Text>
                  </View>
                </View>

                {schedule.enabled && (
                  <View style={styles.scheduleDetails}>
                    <View style={styles.scheduleRow}>
                      <Clock size={14} color={colors.text + '60'} />
                      <Text style={[styles.scheduleText, { color: colors.text + '80' }]}>
                        {schedule.workHours.start} - {schedule.workHours.end}
                      </Text>
                    </View>
                    <View style={styles.scheduleRow}>
                      <CalendarDays size={14} color={colors.text + '60'} />
                      <Text style={[styles.scheduleText, { color: colors.text + '80' }]}>
                        {schedule.workDays.map(d => dayNames[d]).join(', ')}
                      </Text>
                    </View>
                    {schedule.breaks.some(b => b.enabled) && (
                      <View style={styles.scheduleRow}>
                        <Bell size={14} color={colors.text + '60'} />
                        <Text style={[styles.scheduleText, { color: colors.text + '80' }]}>
                          Break: {schedule.breaks.find(b => b.enabled)?.start}
                        </Text>
                      </View>
                    )}
                  </View>
                )}

                <View style={styles.agentActions}>
                  <TouchableOpacity 
                    style={[styles.actionChip, { backgroundColor: schedule.autoStart ? colors.primary + '15' : colors.border + '30' }]}
                    onPress={() => updateSchedule(agent.id, { autoStart: !schedule.autoStart })}
                  >
                    <Play size={12} color={schedule.autoStart ? colors.primary : colors.text + '40'} />
                    <Text style={[styles.actionText, { color: schedule.autoStart ? colors.primary : colors.text + '40' }]}>
                      Auto
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={[styles.editText, { color: colors.primary }]}>Edit Schedule</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>

      {/* Schedule Editor Modal */}
      {showScheduleEditor && <ScheduleEditor agentId={showScheduleEditor} />}
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
  statsRow: { flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 12, gap: 10 },
  statBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statNumber: { fontSize: 14, fontWeight: '700' },
  statLabel: { fontSize: 12 },
  filterScroll: { paddingHorizontal: 16, paddingBottom: 12 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 8, backgroundColor: '#00000008' },
  filterText: { fontSize: 13, fontWeight: '500' },
  content: { padding: 16 },
  bulkActions: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  bulkButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  bulkText: { fontSize: 13, fontWeight: '600' },
  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 0.5, marginBottom: 12 },
  agentCard: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12 },
  agentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentCategory: { fontSize: 12, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  scheduleDetails: { marginTop: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#00000008' },
  scheduleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  scheduleText: { fontSize: 13 },
  agentActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  actionChip: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
  actionText: { fontSize: 11, fontWeight: '500' },
  editButton: { paddingVertical: 6, paddingHorizontal: 12 },
  editText: { fontSize: 14, fontWeight: '600' },
  editorModal: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 },
  editorHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#00000010' },
  editorTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  editorTitle: { fontSize: 18, fontWeight: '600' },
  doneButton: { fontSize: 16, fontWeight: '600' },
  editorContent: { flex: 1, padding: 16 },
  editorSection: { paddingVertical: 16, borderBottomWidth: 1 },
  sectionLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginBottom: 12 },
  editorRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  editorRowIcon: { width: 36, marginRight: 12 },
  editorRowLabel: { flex: 1, fontSize: 15 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  timeInputContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, backgroundColor: '#00000008', flex: 1 },
  timeInput: { fontSize: 16, fontWeight: '500', flex: 1 },
  timeSeparator: { fontSize: 14, fontWeight: '500' },
  daysRow: { flexDirection: 'row', gap: 8 },
  dayChip: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000008' },
  dayText: { fontSize: 12, fontWeight: '600' },
  breakRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  breakTimeInputs: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  breakInput: { width: 70, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, textAlign: 'center', fontSize: 14 },
  breakSeparator: { fontSize: 12 },
  overtimeDetails: { marginLeft: 48, marginTop: 8 },
  overtimeLabel: { fontSize: 13, marginBottom: 4 },
});
