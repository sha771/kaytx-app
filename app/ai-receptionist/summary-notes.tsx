import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Download,
  Share2,
  Tag,
  X,
  User,
  Phone,
  Mail,
  MessageSquare,
  Mic,
  Play,
  Pause,
  SkipForward,
  Filter,
  Search,
  Plus,
  Sparkles,
  Calendar,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

type Priority = 'urgent' | 'high' | 'medium' | 'low';
type NoteType = 'summary' | 'action' | 'follow-up' | 'transcript';

type CallNote = {
  id: string;
  callId: string;
  customerName: string;
  phoneNumber: string;
  timestamp: string;
  duration: string;
  type: NoteType;
  priority: Priority;
  subject: string;
  content: string;
  aiSummary: string;
  actionItems: string[];
  tags: string[];
  assignedTo?: string;
  dueDate?: string;
  completed: boolean;
  audioUrl?: string;
};

const priorityColors: Record<Priority, string> = {
  urgent: '#FF3B30',
  high: '#FF9500',
  medium: '#FFCC00',
  low: '#34C759',
};

const typeColors: Record<NoteType, string> = {
  summary: '#5AC8FA',
  action: '#FF9500',
  'follow-up': '#AF52DE',
  transcript: '#007AFF',
};

const mockNotes: CallNote[] = [
  {
    id: 'note-1',
    callId: 'call-001',
    customerName: 'Sarah Mitchell',
    phoneNumber: '+1 646 555 0123',
    timestamp: '2025-12-09T14:30:00Z',
    duration: '08:45',
    type: 'summary',
    priority: 'high',
    subject: 'Product inquiry and pricing discussion',
    content: 'Customer inquired about Enterprise tier pricing for 500 users. Discussed implementation timeline and onboarding support.',
    aiSummary: 'Qualified lead showing strong interest in Enterprise plan. Customer concerns addressed regarding data migration and compliance. Ready for sales handoff.',
    actionItems: ['Send enterprise pricing proposal', 'Schedule demo with sales engineer', 'Share compliance documentation'],
    tags: ['Sales', 'Enterprise', 'Pricing'],
    assignedTo: 'Sales Team',
    dueDate: '2025-12-12',
    completed: false,
  },
  {
    id: 'note-2',
    callId: 'call-002',
    customerName: 'James Rodriguez',
    phoneNumber: '+44 20 7123 4567',
    timestamp: '2025-12-09T11:15:00Z',
    duration: '05:22',
    type: 'action',
    priority: 'urgent',
    subject: 'Technical support escalation',
    content: 'Critical issue with API integration causing production outage. Customer frustrated. Escalated to Level 2 support.',
    aiSummary: 'Production-impacting issue requiring immediate attention. Customer sentiment: negative. API authentication failure identified as root cause.',
    actionItems: ['Assign senior engineer', 'Provide hourly updates', 'Schedule post-mortem'],
    tags: ['Support', 'Critical', 'API'],
    assignedTo: 'Engineering',
    dueDate: '2025-12-09',
    completed: true,
  },
  {
    id: 'note-3',
    callId: 'call-003',
    customerName: 'Emily Chen',
    phoneNumber: '+1 415 234 5678',
    timestamp: '2025-12-08T16:45:00Z',
    duration: '12:30',
    type: 'follow-up',
    priority: 'medium',
    subject: 'Contract renewal discussion',
    content: 'Annual contract expires next month. Customer happy with service but requesting volume discount. Competitor mentioned.',
    aiSummary: 'Renewal opportunity with upsell potential. Customer loyalty high but price-sensitive. Competitive pressure detected.',
    actionItems: ['Prepare renewal proposal with discount', 'Schedule call with account manager', 'Research competitor pricing'],
    tags: ['Renewal', 'Account Management', 'Pricing'],
    assignedTo: 'Account Manager',
    dueDate: '2025-12-15',
    completed: false,
    audioUrl: 'https://example.com/recording.mp3',
  },
];

export default function ReceptionistSummaryNotesScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<NoteType | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
  const [selectedNote, setSelectedNote] = useState<CallNote | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const filteredNotes = mockNotes.filter(note => {
    const matchesSearch = note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || note.type === selectedType;
    const matchesPriority = selectedPriority === 'all' || note.priority === selectedPriority;
    return matchesSearch && matchesType && matchesPriority;
  });

  const stats = [
    { id: 'total', label: 'Total notes', value: '147', icon: FileText, color: theme.colors.primary },
    { id: 'pending', label: 'Pending actions', value: '23', icon: Clock, color: '#FF9500' },
    { id: 'completed', label: 'Completed today', value: '18', icon: CheckCircle, color: '#34C759' },
    { id: 'urgent', label: 'Urgent items', value: '5', icon: AlertCircle, color: '#FF3B30' },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Call Summaries & Notes',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => setShowCreateModal(true)} style={styles.addButton}>
              <Plus size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Call Intelligence</Text>
            <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
              AI-generated summaries, transcripts, and action items from your receptionist calls.
            </Text>
          </View>

          <View style={styles.statsGrid}>
            {stats.map(stat => {
              const Icon = stat.icon;
              return (
                <View key={stat.id} style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}1A` }]}>
                    <Icon size={18} color={stat.color} />
                  </View>
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
                  <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>{stat.label}</Text>
                </View>
              );
            })}
          </View>

          <View style={[styles.filterCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.searchBar}>
              <Search size={18} color={theme.colors.secondaryText} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search notes, customers, or tags..."
                placeholderTextColor={theme.colors.secondaryText}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
              {(['all', 'summary', 'action', 'follow-up', 'transcript'] as const).map(type => (
                <TouchableOpacity
                  key={type}
                  style={[styles.filterChip, selectedType === type && styles.filterChipActive]}
                  onPress={() => setSelectedType(type)}
                >
                  <Text style={[styles.filterChipText, { color: selectedType === type ? '#fff' : theme.colors.text }]}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
              {(['all', 'urgent', 'high', 'medium', 'low'] as const).map(priority => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityChip,
                    selectedPriority === priority && styles.priorityChipActive,
                    selectedPriority === priority && priority !== 'all' && { backgroundColor: priorityColors[priority] }
                  ]}
                  onPress={() => setSelectedPriority(priority)}
                >
                  <Text style={[styles.priorityChipText, { color: selectedPriority === priority ? '#fff' : theme.colors.secondaryText }]}>
                    {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.notesList}>
            {filteredNotes.map(note => (
              <TouchableOpacity
                key={note.id}
                style={[styles.noteCard, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => setSelectedNote(note)}
              >
                <View style={styles.noteHeader}>
                  <View style={[styles.typeBadge, { backgroundColor: `${typeColors[note.type]}1A` }]}>
                    <Text style={[styles.typeBadgeText, { color: typeColors[note.type] }]}>{note.type}</Text>
                  </View>
                  <View style={[styles.priorityBadge, { backgroundColor: priorityColors[note.priority] }]}>
                    <Text style={styles.priorityBadgeText}>{note.priority.toUpperCase()}</Text>
                  </View>
                </View>

                <Text style={[styles.noteSubject, { color: theme.colors.text }]}>{note.subject}</Text>
                <Text style={[styles.noteCustomer, { color: theme.colors.secondaryText }]}>
                  <User size={12} color={theme.colors.secondaryText} /> {note.customerName} · {note.phoneNumber}
                </Text>

                <Text style={[styles.noteContent, { color: theme.colors.text }]} numberOfLines={2}>
                  {note.aiSummary}
                </Text>

                <View style={styles.tagsRow}>
                  {note.tags.map(tag => (
                    <View key={tag} style={styles.tagPill}>
                      <Tag size={10} color={theme.colors.secondaryText} />
                      <Text style={[styles.tagText, { color: theme.colors.secondaryText }]}>{tag}</Text>
                    </View>
                  ))}
                </View>

                {note.actionItems.length > 0 && (
                  <View style={styles.actionItemsPreview}>
                    <AlertCircle size={14} color={theme.colors.warning} />
                    <Text style={[styles.actionItemsText, { color: theme.colors.text }]}>
                      {note.actionItems.length} action {note.actionItems.length === 1 ? 'item' : 'items'}
                    </Text>
                  </View>
                )}

                <View style={styles.noteFooter}>
                  <Text style={[styles.noteTimestamp, { color: theme.colors.secondaryText }]}>
                    <Clock size={12} color={theme.colors.secondaryText} /> {new Date(note.timestamp).toLocaleString()}
                  </Text>
                  {note.completed && (
                    <View style={styles.completedBadge}>
                      <CheckCircle size={14} color={theme.colors.success} />
                      <Text style={[styles.completedText, { color: theme.colors.success }]}>Completed</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal visible={selectedNote !== null} animationType="slide" transparent={false} onRequestClose={() => setSelectedNote(null)}>
          {selectedNote && (
            <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Call Summary & Notes</Text>
                <TouchableOpacity onPress={() => setSelectedNote(null)}>
                  <X size={24} color={theme.colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
                <View style={styles.modalTopRow}>
                  <View style={[styles.typeBadge, { backgroundColor: `${typeColors[selectedNote.type]}1A` }]}>
                    <Text style={[styles.typeBadgeText, { color: typeColors[selectedNote.type] }]}>{selectedNote.type}</Text>
                  </View>
                  <View style={[styles.priorityBadge, { backgroundColor: priorityColors[selectedNote.priority] }]}>
                    <Text style={styles.priorityBadgeText}>{selectedNote.priority.toUpperCase()}</Text>
                  </View>
                </View>

                <Text style={[styles.modalSubject, { color: theme.colors.text }]}>{selectedNote.subject}</Text>

                <View style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <View style={styles.infoRow}>
                    <User size={16} color={theme.colors.primary} />
                    <Text style={[styles.infoText, { color: theme.colors.text }]}>{selectedNote.customerName}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Phone size={16} color={theme.colors.primary} />
                    <Text style={[styles.infoText, { color: theme.colors.text }]}>{selectedNote.phoneNumber}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Clock size={16} color={theme.colors.primary} />
                    <Text style={[styles.infoText, { color: theme.colors.text }]}>
                      {new Date(selectedNote.timestamp).toLocaleString()} · {selectedNote.duration}
                    </Text>
                  </View>
                  {selectedNote.assignedTo && (
                    <View style={styles.infoRow}>
                      <Mail size={16} color={theme.colors.primary} />
                      <Text style={[styles.infoText, { color: theme.colors.text }]}>Assigned to {selectedNote.assignedTo}</Text>
                    </View>
                  )}
                </View>

                {selectedNote.audioUrl && (
                  <View style={[styles.audioPlayer, { backgroundColor: theme.colors.cardBackground }]}>
                    <View style={styles.audioInfo}>
                      <Mic size={18} color={theme.colors.primary} />
                      <Text style={[styles.audioLabel, { color: theme.colors.text }]}>Call Recording</Text>
                    </View>
                    <View style={styles.audioControls}>
                      <TouchableOpacity onPress={() => setIsPlayingAudio(!isPlayingAudio)}>
                        {isPlayingAudio ? (
                          <Pause size={24} color={theme.colors.primary} />
                        ) : (
                          <Play size={24} color={theme.colors.primary} />
                        )}
                      </TouchableOpacity>
                      <View style={[styles.audioProgress, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
                        <View style={[styles.audioProgressFill, { width: '35%', backgroundColor: theme.colors.primary }]} />
                      </View>
                      <TouchableOpacity>
                        <SkipForward size={20} color={theme.colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Sparkles size={18} color={theme.colors.primary} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Summary</Text>
                  </View>
                  <Text style={[styles.sectionContent, { color: theme.colors.text }]}>{selectedNote.aiSummary}</Text>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <MessageSquare size={18} color={theme.colors.primary} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Call Details</Text>
                  </View>
                  <Text style={[styles.sectionContent, { color: theme.colors.text }]}>{selectedNote.content}</Text>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <CheckCircle size={18} color={theme.colors.warning} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Action Items</Text>
                  </View>
                  {selectedNote.actionItems.map((item, index) => (
                    <View key={index} style={[styles.actionItem, { backgroundColor: theme.colors.cardBackground }]}>
                      <CheckCircle size={16} color={theme.colors.success} />
                      <Text style={[styles.actionItemText, { color: theme.colors.text }]}>{item}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: theme.colors.primary }]}
                    onPress={() => {
                      console.log('Download note', selectedNote.id);
                      Alert.alert('Download', 'Note downloaded successfully');
                    }}
                  >
                    <Download size={18} color="#fff" />
                    <Text style={styles.modalButtonText}>Download</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: theme.colors.primary }]}
                    onPress={() => {
                      console.log('Share note', selectedNote.id);
                      Alert.alert('Share', 'Note shared with team');
                    }}
                  >
                    <Share2 size={18} color="#fff" />
                    <Text style={styles.modalButtonText}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { borderWidth: 1, borderColor: theme.colors.primary }]}
                    onPress={() => {
                      console.log('Edit note', selectedNote.id);
                    }}
                  >
                    <Edit size={18} color={theme.colors.primary} />
                    <Text style={[styles.modalButtonText, { color: theme.colors.primary }]}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          )}
        </Modal>

        <Modal visible={showCreateModal} animationType="slide" transparent={false} onRequestClose={() => setShowCreateModal(false)}>
          <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Create Note</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <Text style={[styles.formLabel, { color: theme.colors.text }]}>Subject</Text>
              <TextInput
                style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
                placeholder="Enter note subject..."
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.formLabel, { color: theme.colors.text }]}>Customer Name</Text>
              <TextInput
                style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
                placeholder="Enter customer name..."
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.formLabel, { color: theme.colors.text }]}>Content</Text>
              <TextInput
                style={[styles.input, styles.textArea, { color: theme.colors.text, borderColor: theme.colors.border }]}
                multiline
                numberOfLines={6}
                placeholder="Enter note content..."
                placeholderTextColor={theme.colors.secondaryText}
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => {
                  console.log('Create note');
                  setShowCreateModal(false);
                  Alert.alert('Success', 'Note created successfully');
                }}
              >
                <CheckCircle size={18} color="#fff" />
                <Text style={styles.primaryButtonText}>Create Note</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statCard: {
    width: '47%',
    borderRadius: 18,
    padding: 16,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  filterCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 18,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  priorityChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  priorityChipActive: {
    borderColor: 'transparent',
  },
  priorityChipText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  notesList: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 16,
  },
  noteCard: {
    borderRadius: 20,
    padding: 18,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  priorityBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  noteSubject: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  noteCustomer: {
    fontSize: 13,
    marginBottom: 10,
  },
  noteContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionItemsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  actionItemsText: {
    fontSize: 13,
    fontWeight: '600',
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteTimestamp: {
    fontSize: 12,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    padding: 6,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalContent: {
    padding: 20,
  },
  modalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalSubject: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    fontSize: 14,
  },
  audioPlayer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  audioInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  audioLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  audioControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  audioProgress: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  audioProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionItemText: {
    flex: 1,
    fontSize: 14,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 14,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 24,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
