 
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Video,
  Phone,
  MapPin,
  Sparkles,
  X,
  ChevronLeft,
  Plus,
  PenLine,
  Trash2,
  Check,
  Lock,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useAIAssistant, Meeting } from '@/providers/AIAssistantProvider';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { trpc } from '@/lib/trpc';

export default function CalendarScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { meetings, scheduleMeeting, cancelMeeting } = useAIAssistant();

  const scheduleMeetingMutation = trpc.assistant.scheduleMeeting.useMutation();
  const cancelMeetingMutation = trpc.assistant.cancelMeeting.useMutation();

  // Fetch real statistics from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ 
    category: 'core-intelligence' 
  });
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const isEnterprise = useMemo(() => {
    return subscription?.plan === 'enterprise' || subscription?.plan === 'professional';
  }, [subscription]);

  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [attendees, setAttendees] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [meetingType, setMeetingType] = useState<'video' | 'phone' | 'in-person'>('video');

  const upcomingMeetings = meetings
    .filter(m => new Date(m.startTime) > new Date() && m.status === 'scheduled')
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const pastMeetings = meetings
    .filter(m => new Date(m.startTime) <= new Date() || m.status === 'completed')
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  const getMeetingIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'phone':
        return Phone;
      default:
        return MapPin;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '#007AFF';
      case 'in-progress':
        return '#34C759';
      case 'completed':
        return '#8E8E93';
      case 'cancelled':
        return '#FF3B30';
      default:
        return theme.colors.secondaryText;
    }
  };

  const handleSchedule = async () => {
    if (!title || !startTime || !endTime) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }

    try {
      await scheduleMeetingMutation.mutateAsync({
        title,
        description,
        startTime,
        endTime,
        attendees: attendees.split(',').map(a => a.trim()).filter(Boolean),
        type: meetingType,
        location,
      });

      await scheduleMeeting({
        title,
        description,
        startTime,
        endTime,
        attendees: attendees.split(',').map(a => a.trim()).filter(Boolean),
        type: meetingType,
        location,
        preparationNeeded: false,
        status: 'scheduled',
      });

      Alert.alert('Success', 'Meeting scheduled successfully');
      setShowSchedule(false);
      resetForm();
    } catch (error) {
      console.error('Failed to schedule meeting:', error);
      Alert.alert('Error', 'Failed to schedule meeting');
    }
  };

  const handleCancel = async (id: string) => {
    Alert.alert(
      'Cancel Meeting',
      'Are you sure you want to cancel this meeting?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelMeetingMutation.mutateAsync({ id });
              await cancelMeeting(id);
              setSelectedMeeting(null);
              Alert.alert('Success', 'Meeting cancelled');
            } catch (error) {
              console.error('Failed to cancel meeting:', error);
              Alert.alert('Error', 'Failed to cancel meeting');
            }
          },
        },
      ]
    );
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
    setAttendees('');
    setLocation('');
    setMeetingType('video');
  };

  const renderMeetingList = () => (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Calendar</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            AI-powered scheduling • {statsData?.tasksToday ? `${statsData.tasksToday} optimizations today` : 'Real-time sync'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.scheduleButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => {
            if (!isEnterprise) {
              router.push('/enterprise/billing');
              return;
            }
            setShowSchedule(true);
          }}
        >
          {isEnterprise ? (
            <Plus size={20} color="white" />
          ) : (
            <Lock size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.meetingList} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Upcoming Meetings
          </Text>
          {upcomingMeetings.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: theme.colors.cardBackground }]}>
              <CalendarIcon size={48} color={theme.colors.secondaryText} />
              <Text style={[styles.emptyText, { color: theme.colors.text }]}>
                No upcoming meetings
              </Text>
            </View>
          ) : (
            upcomingMeetings.map(meeting => {
              const MeetingIcon = getMeetingIcon(meeting.type);
              return (
                <TouchableOpacity
                  key={meeting.id}
                  style={[styles.meetingCard, { backgroundColor: theme.colors.cardBackground }]}
                  onPress={() => setSelectedMeeting(meeting)}
                >
                  <View style={[styles.meetingIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                    <MeetingIcon size={20} color={theme.colors.primary} />
                  </View>
                  <View style={styles.meetingInfo}>
                    <View style={styles.meetingTitleRow}>
                      <Text style={[styles.meetingTitle, { color: theme.colors.text }]}>
                        {meeting.title}
                      </Text>
                      {meeting.aiScheduled && (
                        <View style={[styles.aiBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                          <Sparkles size={10} color={theme.colors.primary} />
                        </View>
                      )}
                    </View>
                    <View style={styles.meetingMeta}>
                      <Clock size={14} color={theme.colors.secondaryText} />
                      <Text style={[styles.meetingTime, { color: theme.colors.secondaryText }]}>
                        {new Date(meeting.startTime).toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.meetingMeta}>
                      <Users size={14} color={theme.colors.secondaryText} />
                      <Text style={[styles.meetingAttendees, { color: theme.colors.secondaryText }]}>
                        {meeting.attendees.length} attendees
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {pastMeetings.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Past Meetings
            </Text>
            {pastMeetings.map(meeting => {
              const MeetingIcon = getMeetingIcon(meeting.type);
              return (
                <TouchableOpacity
                  key={meeting.id}
                  style={[
                    styles.meetingCard,
                    { backgroundColor: theme.colors.cardBackground, opacity: 0.7 },
                  ]}
                  onPress={() => setSelectedMeeting(meeting)}
                >
                  <View style={[styles.meetingIcon, { backgroundColor: '#8E8E9320' }]}>
                    <MeetingIcon size={20} color="#8E8E93" />
                  </View>
                  <View style={styles.meetingInfo}>
                    <Text style={[styles.meetingTitle, { color: theme.colors.text }]}>
                      {meeting.title}
                    </Text>
                    <View style={styles.meetingMeta}>
                      <Clock size={14} color={theme.colors.secondaryText} />
                      <Text style={[styles.meetingTime, { color: theme.colors.secondaryText }]}>
                        {new Date(meeting.startTime).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(meeting.status) + '20' },
                    ]}
                  >
                    <Text
                      style={[styles.statusText, { color: getStatusColor(meeting.status) }]}
                    >
                      {meeting.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );

  const renderMeetingDetail = () => {
    if (!selectedMeeting) return null;

    const MeetingIcon = getMeetingIcon(selectedMeeting.type);

    return (
      <Modal visible={!!selectedMeeting} animationType="slide">
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.modalHeader, { paddingTop: insets.top + 20 }]}>
            <TouchableOpacity onPress={() => setSelectedMeeting(null)}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Meeting Details</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.actionButton}>
                <PenLine size={20} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleCancel(selectedMeeting.id)}
              >
                <Trash2 size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.detailContent} showsVerticalScrollIndicator={false}>
            <View style={[styles.detailHeader, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={[styles.detailIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                <MeetingIcon size={32} color={theme.colors.primary} />
              </View>
              <Text style={[styles.detailTitle, { color: theme.colors.text }]}>
                {selectedMeeting.title}
              </Text>
              {selectedMeeting.aiScheduled && (
                <View style={[styles.aiBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                  <Sparkles size={12} color={theme.colors.primary} />
                  <Text style={[styles.aiBadgeText, { color: theme.colors.primary }]}>
                    AI Scheduled
                  </Text>
                </View>
              )}
            </View>

            {selectedMeeting.description && (
              <View style={styles.detailSection}>
                <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>
                  Description
                </Text>
                <Text style={[styles.detailText, { color: theme.colors.text }]}>
                  {selectedMeeting.description}
                </Text>
              </View>
            )}

            <View style={styles.detailSection}>
              <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>
                Time
              </Text>
              <View style={styles.timeRow}>
                <Clock size={16} color={theme.colors.text} />
                <Text style={[styles.detailText, { color: theme.colors.text }]}>
                  {new Date(selectedMeeting.startTime).toLocaleString()} -{' '}
                  {new Date(selectedMeeting.endTime).toLocaleTimeString()}
                </Text>
              </View>
            </View>

            <View style={styles.detailSection}>
              <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>
                Attendees
              </Text>
              {selectedMeeting.attendees.map((attendee, index) => (
                <View key={index} style={styles.attendeeRow}>
                  <Users size={16} color={theme.colors.text} />
                  <Text style={[styles.detailText, { color: theme.colors.text }]}>
                    {attendee}
                  </Text>
                </View>
              ))}
            </View>

            {selectedMeeting.location && (
              <View style={styles.detailSection}>
                <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>
                  Location
                </Text>
                <View style={styles.locationRow}>
                  <MapPin size={16} color={theme.colors.text} />
                  <Text style={[styles.detailText, { color: theme.colors.text }]}>
                    {selectedMeeting.location}
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.detailSection}>
              <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>
                Status
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(selectedMeeting.status) + '20' },
                ]}
              >
                <Text
                  style={[styles.statusText, { color: getStatusColor(selectedMeeting.status) }]}
                >
                  {selectedMeeting.status}
                </Text>
              </View>
            </View>

            {selectedMeeting.aiScheduled && (
              <View style={[styles.aiInfo, { backgroundColor: theme.colors.primary + '10' }]}>
                <Sparkles size={16} color={theme.colors.primary} />
                <Text style={[styles.aiInfoText, { color: theme.colors.primary }]}>
                  This meeting was automatically scheduled by AI based on everyone&apos;s availability
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    );
  };

  const renderScheduleForm = () => (
    <Modal visible={showSchedule} animationType="slide">
      <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.modalHeader, { paddingTop: insets.top + 20 }]}>
          <TouchableOpacity onPress={() => setShowSchedule(false)}>
            <X size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Schedule Meeting</Text>
          <TouchableOpacity onPress={handleSchedule}>
            <Check size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scheduleForm} showsVerticalScrollIndicator={false}>
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Title *</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
              ]}
              placeholder="Meeting title"
              placeholderTextColor={theme.colors.secondaryText}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Description</Text>
            <TextInput
              style={[
                styles.textArea,
                { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
              ]}
              placeholder="Meeting description"
              placeholderTextColor={theme.colors.secondaryText}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Start Time *</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
              ]}
              placeholder="2024-01-15T10:00:00"
              placeholderTextColor={theme.colors.secondaryText}
              value={startTime}
              onChangeText={setStartTime}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>End Time *</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
              ]}
              placeholder="2024-01-15T11:00:00"
              placeholderTextColor={theme.colors.secondaryText}
              value={endTime}
              onChangeText={setEndTime}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Meeting Type</Text>
            <View style={styles.typeButtons}>
              {(['video', 'phone', 'in-person'] as const).map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    {
                      backgroundColor:
                        meetingType === type ? theme.colors.primary : theme.colors.cardBackground,
                    },
                  ]}
                  onPress={() => setMeetingType(type)}
                >
                  <Text
                    style={[
                      styles.typeButtonText,
                      { color: meetingType === type ? 'white' : theme.colors.text },
                    ]}
                  >
                    {type === 'in-person' ? 'In Person' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>
              Attendees (comma-separated)
            </Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
              ]}
              placeholder="email1@example.com, email2@example.com"
              placeholderTextColor={theme.colors.secondaryText}
              value={attendees}
              onChangeText={setAttendees}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Location</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
              ]}
              placeholder="Meeting location or link"
              placeholderTextColor={theme.colors.secondaryText}
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={[styles.aiTip, { backgroundColor: theme.colors.primary + '10' }]}>
            <Sparkles size={16} color={theme.colors.primary} />
            <Text style={[styles.aiTipText, { color: theme.colors.primary }]}>
              AI can automatically find the best time for all attendees based on their calendars
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {renderMeetingList()}
      {renderMeetingDetail()}
      {renderScheduleForm()}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  scheduleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  meetingList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    marginBottom: 16,
  },
  emptyState: {
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  meetingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  meetingIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  meetingInfo: {
    flex: 1,
  },
  meetingTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: '600' as const,
  },
  meetingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  meetingTime: {
    fontSize: 13,
  },
  meetingAttendees: {
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    padding: 8,
  },
  detailContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  detailHeader: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  detailIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    textAlign: 'center',
    marginBottom: 12,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  detailText: {
    fontSize: 15,
    lineHeight: 22,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  attendeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  aiInfoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  scheduleForm: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    marginBottom: 8,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
  },
  textArea: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    minHeight: 80,
    textAlignVertical: 'top' as const,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  aiTip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  aiTipText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});
