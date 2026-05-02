import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { 
  ChevronLeft, 
  Plus, 
  FileText, 
  Clock, 
  Tag, 
  EllipsisVertical, 
  Search,
  PenLine,
  Trash2,
  Bookmark,
  Share2,
  ListFilter
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  timestamp: string;
  isPinned: boolean;
}

export default function SummaryNotesPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const { agentId, agentName } = useLocalSearchParams<{ agentId: string; agentName: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Weekly Performance Summary',
      content: 'Completed 1,247 tasks this week with 94.2% accuracy. Key highlights include resolving complex customer issues and optimizing response workflows.',
      tags: ['Weekly', 'Performance'],
      timestamp: '2 hours ago',
      isPinned: true,
    },
    {
      id: '2',
      title: 'Process Improvement Ideas',
      content: 'Identified 3 areas for optimization: 1) Automate routine ticket categorization 2) Enhance escalation protocols 3) Improve knowledge base integration.',
      tags: ['Ideas', 'Optimization'],
      timestamp: '1 day ago',
      isPinned: false,
    },
    {
      id: '3',
      title: 'Customer Feedback Analysis',
      content: 'Collected 523 feedback responses. Overall satisfaction: 4.8/5. Common themes: fast response time, helpful solutions, professional tone.',
      tags: ['Feedback', 'Analysis'],
      timestamp: '2 days ago',
      isPinned: false,
    },
    {
      id: '4',
      title: 'Training Data Update Log',
      content: 'Added 150 new training examples to domain knowledge base. Focus areas: technical troubleshooting, billing inquiries, account management.',
      tags: ['Training', 'Data'],
      timestamp: '3 days ago',
      isPinned: false,
    },
  ]);

  const tags = ['All', 'Weekly', 'Performance', 'Ideas', 'Optimization', 'Feedback', 'Analysis', 'Training', 'Data'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const pinnedNotes = filteredNotes.filter(n => n.isPinned);
  const regularNotes = filteredNotes.filter(n => !n.isPinned);

  const togglePin = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Summary & Notes</Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
            {agentName || 'AI Agent'} Documentation
          </Text>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Plus size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Search size={20} color={theme.colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text }]}
          placeholder="Search notes..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tags Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tagsScroll}
        contentContainerStyle={styles.tagsContent}
      >
        {tags.map(tag => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tagChip,
              selectedTag === tag && { backgroundColor: theme.colors.primary }
            ]}
            onPress={() => setSelectedTag(tag)}
          >
            <Text style={[
              styles.tagChipText,
              { color: selectedTag === tag ? '#fff' : theme.colors.primary }
            ]}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <FileText size={20} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{notes.length}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Total Notes</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Bookmark size={20} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>{notes.filter(n => n.isPinned).length}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Pinned</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Clock size={20} color={theme.colors.primary} />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>2h</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Last Edit</Text>
        </View>
      </View>

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Pinned Notes</Text>
          {pinnedNotes.map(note => (
            <View key={note.id} style={[styles.noteCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
              <View style={styles.noteHeader}>
                <Text style={[styles.noteTitle, { color: theme.colors.text }]}>{note.title}</Text>
                <View style={styles.noteActions}>
                  <TouchableOpacity onPress={() => togglePin(note.id)}>
                    <Bookmark size={18} color={theme.colors.primary} fill={theme.colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteNote(note.id)}>
                    <Trash2 size={18} color={theme.colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.noteContent, { color: theme.colors.textSecondary }]} numberOfLines={3}>
                {note.content}
              </Text>
              <View style={styles.noteFooter}>
                <View style={styles.tagsRow}>
                  {note.tags.map((tag, idx) => (
                    <View key={idx} style={[styles.tagBadge, { backgroundColor: theme.colors.primary + '15' }]}>
                      <Tag size={10} color={theme.colors.primary} />
                      <Text style={[styles.tagText, { color: theme.colors.primary }]}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.timestamp, { color: theme.colors.textSecondary }]}>{note.timestamp}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* All Notes */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>All Notes</Text>
        {regularNotes.map(note => (
          <View key={note.id} style={[styles.noteCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <View style={styles.noteHeader}>
              <Text style={[styles.noteTitle, { color: theme.colors.text }]}>{note.title}</Text>
              <View style={styles.noteActions}>
                <TouchableOpacity onPress={() => togglePin(note.id)}>
                  <Bookmark size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteNote(note.id)}>
                  <Trash2 size={18} color={theme.colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[styles.noteContent, { color: theme.colors.textSecondary }]} numberOfLines={3}>
              {note.content}
            </Text>
            <View style={styles.noteFooter}>
              <View style={styles.tagsRow}>
                {note.tags.map((tag, idx) => (
                  <View key={idx} style={[styles.tagBadge, { backgroundColor: theme.colors.primary + '15' }]}>
                    <Tag size={10} color={theme.colors.primary} />
                    <Text style={[styles.tagText, { color: theme.colors.primary }]}>{tag}</Text>
                  </View>
                ))}
              </View>
              <Text style={[styles.timestamp, { color: theme.colors.textSecondary }]}>{note.timestamp}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Add Note Button */}
      <TouchableOpacity style={[styles.addNoteBtn, { backgroundColor: theme.colors.primary }]}>
        <Plus size={20} color="#fff" />
        <Text style={styles.addNoteText}>Create New Note</Text>
      </TouchableOpacity>
    
      <AgentFeatures agentId="summary-notes" agentName="Summary Notes" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E5EA' 
  },
  backButton: { padding: 4 },
  headerContent: { flex: 1, marginLeft: 12 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  actionButton: { padding: 8 },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    margin: 16, 
    padding: 12, 
    borderRadius: 12 
  },
  searchInput: { 
    flex: 1, 
    marginLeft: 12, 
    fontSize: 15 
  },
  tagsScroll: { maxHeight: 50, marginBottom: 8 },
  tagsContent: { paddingHorizontal: 16, gap: 8 },
  tagChip: { 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: '#E5E5EA' 
  },
  tagChipText: { fontSize: 13, fontWeight: '500' },
  statsRow: { 
    flexDirection: 'row', 
    paddingHorizontal: 16, 
    gap: 12, 
    marginBottom: 16 
  },
  statCard: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 16, 
    borderRadius: 12 
  },
  statValue: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginTop: 8 
  },
  statLabel: { fontSize: 12, marginTop: 4 },
  section: { paddingHorizontal: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  noteCard: { 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12 
  },
  noteHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  noteTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  noteActions: { flexDirection: 'row', gap: 12 },
  noteContent: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  noteFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  tagsRow: { flexDirection: 'row', gap: 8 },
  tagBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12, 
    gap: 4 
  },
  tagText: { fontSize: 11, fontWeight: '500' },
  timestamp: { fontSize: 12 },
  addNoteBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    margin: 16, 
    padding: 16, 
    borderRadius: 12, 
    gap: 8 
  },
  addNoteText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});