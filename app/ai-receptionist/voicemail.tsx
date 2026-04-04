import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { Voicemail, Play, Pause, Download, Trash2, Search, Filter, Star, Clock, Phone } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface VoicemailMessage {
  id: string;
  callerName: string;
  callerNumber: string;
  duration: string;
  timestamp: string;
  isNew: boolean;
  isFlagged: boolean;
  transcription: string;
}

export default function VoicemailScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [messages, setMessages] = useState<VoicemailMessage[]>([
    {
      id: '1',
      callerName: 'John Smith',
      callerNumber: '+1 (555) 123-4567',
      duration: '01:23',
      timestamp: '2 hours ago',
      isNew: true,
      isFlagged: true,
      transcription: 'Hi, this is John Smith calling about the proposal we discussed yesterday. I have a few questions about the pricing structure. Could you please call me back at your earliest convenience? Thanks.',
    },
    {
      id: '2',
      callerName: 'Sarah Johnson',
      callerNumber: '+1 (555) 987-6543',
      duration: '00:45',
      timestamp: '5 hours ago',
      isNew: true,
      isFlagged: false,
      transcription: 'Hello, I am calling to schedule a follow-up appointment for next week. Please give me a call when you get a chance.',
    },
    {
      id: '3',
      callerName: 'Mike Wilson',
      callerNumber: '+1 (555) 456-7890',
      duration: '02:15',
      timestamp: 'Yesterday',
      isNew: false,
      isFlagged: false,
      transcription: 'Hey, this is Mike. Just wanted to touch base about the project timeline. We might need to push the deadline back a couple of days. Let me know if that works for you.',
    },
  ]);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  const toggleFlag = (id: string) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, isFlagged: !msg.isFlagged } : msg
    ));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const markAsRead = (id: string) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, isNew: false } : msg
    ));
  };

  const newCount = messages.filter(m => m.isNew).length;

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Voicemail',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />
      
      <View style={styles.header}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{newCount}</Text>
            <Text style={styles.statLabel}>New</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{messages.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{messages.filter(m => m.isFlagged).length}</Text>
            <Text style={styles.statLabel}>Flagged</Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Search size={18} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search voicemails..."
            placeholderTextColor="#6B7280"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={18} color="#60A5FA" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {messages.map((message) => (
          <View 
            key={message.id}
            style={[
              styles.messageCard,
              message.isNew && styles.messageCardNew
            ]}
          >
            <View style={styles.messageHeader}>
              <View style={styles.callerInfo}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>
                    {message.callerName.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.callerDetails}>
                  <View style={styles.callerNameRow}>
                    <Text style={styles.callerName}>{message.callerName}</Text>
                    {message.isNew && (
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>NEW</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.callerNumber}>{message.callerNumber}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.flagButton}
                onPress={() => toggleFlag(message.id)}
              >
                <Star 
                  size={20} 
                  color={message.isFlagged ? '#F59E0B' : '#6B7280'} 
                  fill={message.isFlagged ? '#F59E0B' : 'none'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.messageInfo}>
              <View style={styles.infoItem}>
                <Clock size={14} color="#9CA3AF" />
                <Text style={styles.infoText}>{message.timestamp}</Text>
              </View>
              <View style={styles.infoItem}>
                <Voicemail size={14} color="#9CA3AF" />
                <Text style={styles.infoText}>{message.duration}</Text>
              </View>
            </View>

            <View style={styles.transcriptionContainer}>
              <Text style={styles.transcriptionLabel}>Transcription:</Text>
              <Text style={styles.transcriptionText}>{message.transcription}</Text>
            </View>

            <View style={styles.messageActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => togglePlay(message.id)}
              >
                {playingId === message.id ? (
                  <Pause size={16} color="#60A5FA" />
                ) : (
                  <Play size={16} color="#60A5FA" />
                )}
                <Text style={styles.actionButtonText}>
                  {playingId === message.id ? 'Pause' : 'Play'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Phone size={16} color="#10B981" />
                <Text style={[styles.actionButtonText, { color: '#10B981' }]}>
                  Call Back
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <Download size={16} color="#9CA3AF" />
                <Text style={styles.actionButtonText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => deleteMessage(message.id)}
              >
                <Trash2 size={16} color="#EF4444" />
                <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>

            {message.isNew && (
              <TouchableOpacity
                style={styles.markReadButton}
                onPress={() => markAsRead(message.id)}
              >
                <Text style={styles.markReadText}>Mark as Read</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#60A5FA',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    paddingVertical: 12,
  },
  filterButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  messageCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#374151',
  },
  messageCardNew: {
    borderLeftColor: '#60A5FA',
    backgroundColor: '#1A2642',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  callerInfo: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#60A5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  callerDetails: {
    flex: 1,
  },
  callerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  callerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  newBadge: {
    backgroundColor: '#60A5FA',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  callerNumber: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  flagButton: {
    padding: 4,
  },
  messageInfo: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  transcriptionContainer: {
    backgroundColor: '#0F1621',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  transcriptionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#60A5FA',
    marginBottom: 6,
  },
  transcriptionText: {
    fontSize: 13,
    color: '#D1D5DB',
    lineHeight: 18,
  },
  messageActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  markReadButton: {
    backgroundColor: '#1E3A5F',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  markReadText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#60A5FA',
  },
});
