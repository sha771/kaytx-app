 
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Voicemail, Play, Pause, Download, Trash2, Search, Filter, Star, Clock, Phone, Lock } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { trpc } from '@/lib/trpc';
import { useTheme } from '@/providers/ThemeProvider';

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
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Real tRPC data
  const { data: subscription } = trpc.user.getSubscription.useQuery();
  const isEnterprise = subscription?.plan === 'enterprise';

  const { data: voicemails = [], isLoading, refetch } = trpc.receptionist.getVoicemails.useQuery();
  const utils = trpc.useUtils();

  const markReadMutation = trpc.receptionist.markVoicemailRead.useMutation({
    onSuccess: () => utils.receptionist.getVoicemails.invalidate(),
  });

  const toggleFlagMutation = trpc.receptionist.toggleVoicemailFlag.useMutation({
    onSuccess: () => utils.receptionist.getVoicemails.invalidate(),
  });

  const deleteMutation = trpc.receptionist.deleteVoicemail.useMutation({
    onSuccess: () => utils.receptionist.getVoicemails.invalidate(),
  });

  const filteredMessages = useMemo(() => {
    return (voicemails as VoicemailMessage[]).filter(msg => 
      msg.callerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.callerNumber.includes(searchQuery) ||
      msg.transcription.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [voicemails, searchQuery]);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  const toggleFlag = (id: string) => {
    toggleFlagMutation.mutate({ id });
  };

  const deleteMessage = (id: string) => {
    deleteMutation.mutate({ id });
  };

  const markAsRead = (id: string) => {
    markReadMutation.mutate({ id });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background, justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const newCount = (voicemails as VoicemailMessage[]).filter(m => m.isNew).length;
  const flaggedCount = (voicemails as VoicemailMessage[]).filter(m => m.isFlagged).length;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Voicemail',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />

      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <View style={styles.statsRow}>
          <View style={[styles.statItem, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statValue, { color: theme.colors.primary }]}>{newCount}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>New</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statValue, { color: theme.colors.primary }]}>{(voicemails as VoicemailMessage[]).length}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Total</Text>
          </View>
          <View style={[styles.statItem, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statValue, { color: theme.colors.primary }]}>{flaggedCount}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Flagged</Text>
          </View>
        </View>

        <View style={[styles.searchContainer, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={18} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search voicemails..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={18} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {filteredMessages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageCard,
              { backgroundColor: theme.colors.cardBackground },
              message.isNew && styles.messageCardNew,
            ]}
          >
            <View style={styles.messageHeader}>
              <View style={styles.callerInfo}>
                <View style={[styles.avatarContainer, { backgroundColor: theme.colors.border }]}>
                  <Text style={[styles.avatarText, { color: theme.colors.text }]}
                  >
                    {message.callerName
                      .split(' ')
                      .filter(Boolean)
                      .map((n) => n[0])
                      .join('')}
                  </Text>
                </View>
                <View style={styles.callerDetails}>
                  <View style={styles.callerNameRow}>
                    <Text style={[styles.callerName, { color: theme.colors.text }]}>{message.callerName}</Text>
                    {message.isNew && (
                      <View style={[styles.newBadge, { backgroundColor: theme.colors.primary }]}>
                        <Text style={styles.newBadgeText}>NEW</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.callerNumber, { color: theme.colors.secondaryText }]}>{message.callerNumber}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.flagButton}
                onPress={() => toggleFlag(message.id)}
              >
                <Star
                  size={20}
                  color={message.isFlagged ? '#F59E0B' : theme.colors.secondaryText}
                  fill={message.isFlagged ? '#F59E0B' : 'none'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.messageInfo}>
              <View style={styles.infoItem}>
                <Clock size={14} color={theme.colors.secondaryText} />
                <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>{message.timestamp}</Text>
              </View>
              <View style={styles.infoItem}>
                <Voicemail size={14} color={theme.colors.secondaryText} />
                <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>{message.duration}</Text>
              </View>
              {!isEnterprise && <Lock size={12} color={theme.colors.secondaryText} />}
            </View>

            <View style={[styles.transcriptionContainer, { backgroundColor: theme.colors.border }]}>
              <Text style={[styles.transcriptionLabel, { color: theme.colors.secondaryText }]}>Transcription:</Text>
              <Text style={[styles.transcriptionText, { color: theme.colors.text }]}>{message.transcription}</Text>
            </View>

            <View style={styles.messageActions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.colors.border }]}
                onPress={() => togglePlay(message.id)}
              >
                {playingId === message.id ? (
                  <Pause size={16} color={theme.colors.primary} />
                ) : (
                  <Play size={16} color={theme.colors.primary} />
                )}
                <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>
                  {playingId === message.id ? 'Pause' : 'Play'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.border }]}
              >
                <Phone size={16} color="#10B981" />
                <Text style={[styles.actionButtonText, { color: '#10B981' }]}>
                  Call Back
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.border }]}>
                <Download size={16} color={theme.colors.secondaryText} />
                <Text style={[styles.actionButtonText, { color: theme.colors.text }]}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.colors.border }]}
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
                style={[styles.markReadButton, { backgroundColor: `${theme.colors.primary}20` }]}
                onPress={() => markAsRead(message.id)}
              >
                <Text style={[styles.markReadText, { color: theme.colors.primary }]}>Mark as Read</Text>
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
