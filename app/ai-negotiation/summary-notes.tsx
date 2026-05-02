 
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
  CircleCheck,
  CircleAlert,
  Pencil,
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
  ListFilter,
  Search,
  Plus,
  Sparkles,
  DollarSign,
  Briefcase,
  TrendingUp,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

type Priority = 'urgent' | 'high' | 'medium' | 'low';
type NoteType = 'deal' | 'negotiation' | 'follow-up' | 'contract';

type DealNote = {
  id: string;
  dealId: string;
  clientName: string;
  companyName: string;
  dealValue: string;
  timestamp: string;
  duration: string;
  type: NoteType;
  priority: Priority;
  subject: string;
  content: string;
  aiSummary: string;
  negotiationPoints: string[];
  nextSteps: string[];
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
  deal: '#34C759',
  negotiation: '#FF9500',
  'follow-up': '#AF52DE',
  contract: '#007AFF',
};

const mockDealNotes: DealNote[] = [
  {
    id: 'note-1',
    dealId: 'deal-001',
    clientName: 'Robert Fox',
    companyName: 'Acme Corp',
    dealValue: '$150,000',
    timestamp: '2025-12-09T15:30:00Z',
    duration: '24:15',
    type: 'negotiation',
    priority: 'high',
    subject: 'Price negotiation for Enterprise License',
    content: 'Client pushed back on the per-seat pricing. They want a 15% discount for a 3-year commitment.',
    aiSummary: 'High-value deal at risk. Client is price-sensitive but willing to commit long-term. AI suggests offering 10% discount with upfront payment.',
    negotiationPoints: ['15% discount request', '3-year commitment offer', 'Upfront payment terms'],
    nextSteps: ['Get approval for 10% discount', 'Draft 3-year contract', 'Schedule follow-up call'],
    tags: ['Enterprise', 'Pricing', 'Q4 Close'],
    assignedTo: 'Deal Desk',
    dueDate: '2025-12-11',
    completed: false,
  },
  {
    id: 'note-2',
    dealId: 'deal-002',
    clientName: 'Jane Cooper',
    companyName: 'TechStart',
    dealValue: '$45,000',
    timestamp: '2025-12-09T10:00:00Z',
    duration: '15:45',
    type: 'contract',
    priority: 'urgent',
    subject: 'Contract review - Liability Clause',
    content: 'Client legal team flagged the liability cap. They want it raised to 2x contract value.',
    aiSummary: 'Legal blocker identified. Standard terms are 1x. Needs legal review immediately to avoid slipping to next quarter.',
    negotiationPoints: ['Liability cap increase', 'Indemnification scope'],
    nextSteps: ['Escalate to Legal', 'Update contract draft'],
    tags: ['Legal', 'Blocker'],
    assignedTo: 'Legal Team',
    dueDate: '2025-12-10',
    completed: false,
  },
  {
    id: 'note-3',
    dealId: 'deal-003',
    clientName: 'Eleanor Pena',
    companyName: 'Designify',
    dealValue: '$25,000',
    timestamp: '2025-12-08T14:20:00Z',
    duration: '10:10',
    type: 'deal',
    priority: 'medium',
    subject: 'Discovery call - New requirements',
    content: 'Client interested in adding the analytics module. Upsell opportunity confirmed.',
    aiSummary: 'Upsell opportunity identified. Client needs advanced reporting. Demo scheduled.',
    negotiationPoints: ['Analytics module pricing', 'Implementation timeline'],
    nextSteps: ['Send updated quote', 'Schedule technical demo'],
    tags: ['Upsell', 'Discovery'],
    assignedTo: 'Account Executive',
    dueDate: '2025-12-13',
    completed: true,
  },
];

export default function NegotiationSummaryNotesScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<NoteType | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
  const [selectedNote, setSelectedNote] = useState<DealNote | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const filteredNotes = mockDealNotes.filter(note => {
    const matchesSearch = note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || note.type === selectedType;
    const matchesPriority = selectedPriority === 'all' || note.priority === selectedPriority;
    return matchesSearch && matchesType && matchesPriority;
  });

  const stats = [
    { id: 'pipeline', label: 'Pipeline Impact', value: '$220k', icon: DollarSign, color: theme.colors.success },
    { id: 'active', label: 'Active Deals', value: '12', icon: Briefcase, color: theme.colors.primary },
    { id: 'risk', label: 'At Risk', value: '3', icon: CircleAlert, color: '#FF3B30' },
    { id: 'rate', label: 'Win Rate', value: '68%', icon: TrendingUp, color: '#FF9500' },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Negotiation Summaries',
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
            <Text style={[styles.title, { color: theme.colors.text }]}>Deal Intelligence</Text>
            <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
              AI-driven insights on your negotiations, deal terms, and closing risks.
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
                placeholder="Search deals, companies, or tags..."
                placeholderTextColor={theme.colors.secondaryText}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
              {(['all', 'deal', 'negotiation', 'contract', 'follow-up'] as const).map(type => (
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
                  <Briefcase size={12} color={theme.colors.secondaryText} /> {note.companyName} · {note.clientName} · <Text style={{fontWeight: '700', color: theme.colors.success}}>{note.dealValue}</Text>
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

                {note.negotiationPoints.length > 0 && (
                  <View style={styles.actionItemsPreview}>
                    <CircleAlert size={14} color={theme.colors.primary} />
                    <Text style={[styles.actionItemsText, { color: theme.colors.text }]}>
                      {note.negotiationPoints.length} negotiation points
                    </Text>
                  </View>
                )}

                <View style={styles.noteFooter}>
                  <Text style={[styles.noteTimestamp, { color: theme.colors.secondaryText }]}>
                    <Clock size={12} color={theme.colors.secondaryText} /> {new Date(note.timestamp).toLocaleString()}
                  </Text>
                  {note.completed && (
                    <View style={styles.completedBadge}>
                      <CircleCheck size={14} color={theme.colors.success} />
                      <Text style={[styles.completedText, { color: theme.colors.success }]}>Resolved</Text>
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
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Negotiation Details</Text>
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
                    <Briefcase size={16} color={theme.colors.primary} />
                    <Text style={[styles.infoText, { color: theme.colors.text }]}>{selectedNote.companyName} ({selectedNote.dealValue})</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <User size={16} color={theme.colors.primary} />
                    <Text style={[styles.infoText, { color: theme.colors.text }]}>{selectedNote.clientName}</Text>
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
                      <Text style={[styles.infoText, { color: theme.colors.text }]}>Owner: {selectedNote.assignedTo}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Sparkles size={18} color={theme.colors.primary} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Analysis</Text>
                  </View>
                  <Text style={[styles.sectionContent, { color: theme.colors.text }]}>{selectedNote.aiSummary}</Text>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <MessageSquare size={18} color={theme.colors.primary} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Call Context</Text>
                  </View>
                  <Text style={[styles.sectionContent, { color: theme.colors.text }]}>{selectedNote.content}</Text>
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <CircleAlert size={18} color={theme.colors.warning} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Negotiation Points</Text>
                  </View>
                  {selectedNote.negotiationPoints.map((item, index) => (
                    <View key={index} style={[styles.actionItem, { backgroundColor: theme.colors.cardBackground }]}>
                      <DollarSign size={16} color={theme.colors.warning} />
                      <Text style={[styles.actionItemText, { color: theme.colors.text }]}>{item}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <CircleCheck size={18} color={theme.colors.success} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Next Steps</Text>
                  </View>
                  {selectedNote.nextSteps.map((item, index) => (
                    <View key={index} style={[styles.actionItem, { backgroundColor: theme.colors.cardBackground }]}>
                      <CircleCheck size={16} color={theme.colors.success} />
                      <Text style={[styles.actionItemText, { color: theme.colors.text }]}>{item}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: theme.colors.primary }]}
                    onPress={() => {
                      Alert.alert('Export', 'Summary exported to CRM');
                    }}
                  >
                    <Download size={18} color="#fff" />
                    <Text style={styles.modalButtonText}>Export to CRM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { borderWidth: 1, borderColor: theme.colors.primary }]}
                    onPress={() => {
                      // Edit logic
                    }}
                  >
                    <Pencil size={18} color={theme.colors.primary} />
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
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Add Negotiation Note</Text>
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

              <Text style={[styles.formLabel, { color: theme.colors.text }]}>Client / Deal</Text>
              <TextInput
                style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
                placeholder="Enter client or deal name..."
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.formLabel, { color: theme.colors.text }]}>Key Points</Text>
              <TextInput
                style={[styles.input, styles.textArea, { color: theme.colors.text, borderColor: theme.colors.border }]}
                multiline
                numberOfLines={6}
                placeholder="Enter key negotiation points..."
                placeholderTextColor={theme.colors.secondaryText}
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => {
                  setShowCreateModal(false);
                  Alert.alert('Success', 'Note added to deal record');
                }}
              >
                <CircleCheck size={18} color="#fff" />
                <Text style={styles.primaryButtonText}>Save Note</Text>
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
