import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { FileText, Plus, Edit, Trash2, Save, Clock, Tag, Star, Archive } from 'lucide-react-native';
import { AIEmployee } from '@/constants/aiEmployees';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface AgentSummaryNotesProps {
  agent: Partial<AIEmployee>;
}

export const AgentSummaryNotes: React.FC<AgentSummaryNotesProps> = ({ agent }) => {
  const { theme } = useTheme();
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Performance Summary - Q1 2026',
      content: 'Agent has shown excellent performance with 96.8% success rate. Key achievements include processing 15,000+ tasks and achieving 97% customer satisfaction. Areas for improvement: response time optimization during peak hours.',
      tags: ['performance', 'quarterly', 'summary'],
      isPinned: true,
      createdAt: new Date('2026-01-15'),
      updatedAt: new Date('2026-04-01'),
    },
    {
      id: '2',
      title: 'Training Notes',
      content: 'Completed advanced capability training on March 15, 2026. New skills: complex data analysis, multi-language support, and advanced decision making. Recommended refresher: Q3 2026.',
      tags: ['training', 'capabilities'],
      isPinned: false,
      createdAt: new Date('2026-03-15'),
      updatedAt: new Date('2026-03-15'),
    },
    {
      id: '3',
      title: 'Integration Updates',
      content: 'Successfully integrated with CRM system on February 20, 2026. Integration with analytics platform scheduled for May 2026. All existing integrations functioning normally.',
      tags: ['integration', 'system'],
      isPinned: false,
      createdAt: new Date('2026-02-20'),
      updatedAt: new Date('2026-04-10'),
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTags, setNewNoteTags] = useState('');

  const handleSaveNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) {
      Alert.alert('Error', 'Please fill in both title and content');
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
      tags: newNoteTags.split(',').map(t => t.trim()).filter(t => t),
      isPinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes([newNote, ...notes]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTags('');
    setIsEditing(false);
  };

  const handleDeleteNote = (noteId: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setNotes(notes.filter(n => n.id !== noteId)),
        },
      ]
    );
  };

  const handleTogglePin = (noteId: string) => {
    setNotes(notes.map(n => n.id === noteId ? { ...n, isPinned: !n.isPinned } : n));
  };

  const pinnedNotes = notes.filter(n => n.isPinned);
  const otherNotes = notes.filter(n => !n.isPinned);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Summary Section */}
      <View style={styles.section}>
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.summaryHeader}>
            <FileText size={24} color={agent.color || '#007AFF'} />
            <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>Agent Summary</Text>
          </View>
          <Text style={[styles.summaryText, { color: theme.colors.secondaryText }]}>
            {agent.name} is a {agent.title || 'AI Agent'} specializing in {agent.capabilities?.join(', ') || 'various tasks'}. 
            Current performance metrics indicate excellent operational efficiency with high success rates and positive user feedback.
          </Text>
          <View style={styles.summaryStats}>
            <View style={styles.summaryStat}>
              <Text style={[styles.summaryStatValue, { color: theme.colors.text }]}>96.8%</Text>
              <Text style={[styles.summaryStatLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
            </View>
            <View style={styles.summaryStat}>
              <Text style={[styles.summaryStatValue, { color: theme.colors.text }]}>15,234</Text>
              <Text style={[styles.summaryStatLabel, { color: theme.colors.secondaryText }]}>Tasks Completed</Text>
            </View>
            <View style={styles.summaryStat}>
              <Text style={[styles.summaryStatValue, { color: theme.colors.text }]}>97%</Text>
              <Text style={[styles.summaryStatLabel, { color: theme.colors.secondaryText }]}>Satisfaction</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Add Note Button */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.addNoteBtn, { backgroundColor: theme.colors.primary }]}
          onPress={() => setIsEditing(true)}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.addNoteBtnText}>Add New Note</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Note Form */}
      {isEditing && (
        <View style={styles.section}>
          <View style={[styles.editCard, { backgroundColor: theme.colors.cardBackground }]}>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              placeholder="Note Title"
              placeholderTextColor={theme.colors.secondaryText}
              value={newNoteTitle}
              onChangeText={setNewNoteTitle}
            />
            <TextInput
              style={[styles.textArea, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              placeholder="Note Content"
              placeholderTextColor={theme.colors.secondaryText}
              value={newNoteContent}
              onChangeText={setNewNoteContent}
              multiline
              numberOfLines={6}
            />
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.background, color: theme.colors.text, borderColor: theme.colors.border }]}
              placeholder="Tags (comma-separated)"
              placeholderTextColor={theme.colors.secondaryText}
              value={newNoteTags}
              onChangeText={setNewNoteTags}
            />
            <View style={styles.editActions}>
              <TouchableOpacity
                style={[styles.editBtn, { backgroundColor: theme.colors.border }]}
                onPress={() => setIsEditing(false)}
              >
                <Text style={[styles.editBtnText, { color: theme.colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.editBtn, { backgroundColor: theme.colors.primary }]}
                onPress={handleSaveNote}
              >
                <Save size={16} color="#fff" />
                <Text style={styles.editBtnText}>Save Note</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Pinned Notes</Text>
          {pinnedNotes.map(note => (
            <View key={note.id} style={[styles.noteCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.noteHeader}>
                <View style={styles.noteHeaderLeft}>
                  <Star size={16} color="#FF9500" fill="#FF9500" />
                  <Text style={[styles.noteTitle, { color: theme.colors.text }]}>{note.title}</Text>
                </View>
                <View style={styles.noteHeaderRight}>
                  <TouchableOpacity onPress={() => handleTogglePin(note.id)}>
                    <Archive size={16} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
                    <Trash2 size={16} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.noteContent, { color: theme.colors.secondaryText }]}>{note.content}</Text>
              <View style={styles.noteFooter}>
                <View style={styles.noteTags}>
                  {note.tags.map((tag, index) => (
                    <View key={index} style={[styles.tag, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
                      <Tag size={12} color={theme.colors.secondaryText} />
                      <Text style={[styles.tagText, { color: theme.colors.secondaryText }]}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.noteDate, { color: theme.colors.secondaryText }]}>
                  {note.updatedAt.toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Other Notes */}
      {otherNotes.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>All Notes</Text>
          {otherNotes.map(note => (
            <View key={note.id} style={[styles.noteCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={styles.noteHeader}>
                <View style={styles.noteHeaderLeft}>
                  <FileText size={16} color={agent.color || '#007AFF'} />
                  <Text style={[styles.noteTitle, { color: theme.colors.text }]}>{note.title}</Text>
                </View>
                <View style={styles.noteHeaderRight}>
                  <TouchableOpacity onPress={() => handleTogglePin(note.id)}>
                    <Star size={16} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteNote(note.id)}>
                    <Trash2 size={16} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.noteContent, { color: theme.colors.secondaryText }]}>{note.content}</Text>
              <View style={styles.noteFooter}>
                <View style={styles.noteTags}>
                  {note.tags.map((tag, index) => (
                    <View key={index} style={[styles.tag, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }]}>
                      <Tag size={12} color={theme.colors.secondaryText} />
                      <Text style={[styles.tagText, { color: theme.colors.secondaryText }]}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={[styles.noteDate, { color: theme.colors.secondaryText }]}>
                  {note.updatedAt.toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  summaryCard: {
    borderRadius: 12,
    padding: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  summaryText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryStatLabel: {
    fontSize: 12,
  },
  addNoteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 14,
    borderRadius: 12,
  },
  addNoteBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  editCard: {
    borderRadius: 12,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 12,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  editBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  noteCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  noteHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  noteHeaderRight: {
    flexDirection: 'row',
    gap: 12,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  noteContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteTags: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 11,
  },
  noteDate: {
    fontSize: 12,
  },
});
