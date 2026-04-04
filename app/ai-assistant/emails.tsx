import React, { useState } from 'react';
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
  Mail,
  Send,
  Sparkles,
  Archive,
  Trash2,
  Reply,
  Forward,
  X,
  ChevronLeft,
  Edit3,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useAIAssistant, Email } from '@/providers/AIAssistantProvider';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EmailsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { emails, draftEmail, sendEmail } = useAIAssistant();

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [showCompose, setShowCompose] = useState<boolean>(false);
  const [to, setTo] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'ai-drafted'>('all');

  const filteredEmails = emails.filter(email => {
    if (filter === 'unread') return !email.read;
    if (filter === 'ai-drafted') return email.aiDrafted;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#34C759';
      default:
        return theme.colors.secondaryText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work':
        return '#007AFF';
      case 'personal':
        return '#34C759';
      case 'promotional':
        return '#FF9500';
      case 'social':
        return '#5856D6';
      default:
        return theme.colors.secondaryText;
    }
  };

  const handleAIDraft = async () => {
    if (!to || !subject) {
      Alert.alert('Error', 'Please enter recipient and subject');
      return;
    }

    try {
      const draft = await draftEmail([to], subject, body || 'Please draft an appropriate email based on the subject');
      setBody(draft.body);
      Alert.alert('Success', 'AI has drafted your email. Review and edit as needed.');
    } catch {
      Alert.alert('Error', 'Failed to draft email');
    }
  };

  const handleSend = async () => {
    if (!to || !subject || !body) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const email: Email = {
      id: Date.now().toString(),
      from: 'user@example.com',
      to: [to],
      subject,
      body,
      timestamp: new Date(),
      read: true,
      aiDrafted: false,
      priority: 'medium',
      category: 'work',
    };

    await sendEmail(email);
    Alert.alert('Success', 'Email sent successfully');
    setShowCompose(false);
    setTo('');
    setSubject('');
    setBody('');
  };

  const renderEmailList = () => (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Emails</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            AI-powered inbox management
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.composeButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => setShowCompose(true)}
        >
          <Edit3 size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterBar}>
        {(['all', 'unread', 'ai-drafted'] as const).map(f => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterButton,
              {
                backgroundColor: filter === f ? theme.colors.primary : theme.colors.cardBackground,
              },
            ]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                { color: filter === f ? 'white' : theme.colors.text },
              ]}
            >
              {f === 'all' ? 'All' : f === 'unread' ? 'Unread' : 'AI Drafted'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.emailList} showsVerticalScrollIndicator={false}>
        {filteredEmails.length === 0 ? (
          <View style={[styles.emptyState, { backgroundColor: theme.colors.cardBackground }]}>
            <Mail size={48} color={theme.colors.secondaryText} />
            <Text style={[styles.emptyText, { color: theme.colors.text }]}>No emails</Text>
            <Text style={[styles.emptySubtext, { color: theme.colors.secondaryText }]}>
              Your inbox is empty
            </Text>
          </View>
        ) : (
          filteredEmails.map(email => (
            <TouchableOpacity
              key={email.id}
              style={[
                styles.emailCard,
                {
                  backgroundColor: theme.colors.cardBackground,
                  borderLeftColor: getPriorityColor(email.priority),
                },
              ]}
              onPress={() => setSelectedEmail(email)}
            >
              <View style={styles.emailHeader}>
                <View style={styles.emailFrom}>
                  <Text style={[styles.emailFromText, { color: theme.colors.text }]}>
                    {email.from}
                  </Text>
                  {email.aiDrafted && (
                    <View style={[styles.aiBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                      <Sparkles size={10} color={theme.colors.primary} />
                    </View>
                  )}
                </View>
                <Text style={[styles.emailTime, { color: theme.colors.secondaryText }]}>
                  {new Date(email.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
              <Text
                style={[
                  styles.emailSubject,
                  { color: theme.colors.text, fontWeight: email.read ? '400' : '600' },
                ]}
                numberOfLines={1}
              >
                {email.subject}
              </Text>
              <Text
                style={[styles.emailBody, { color: theme.colors.secondaryText }]}
                numberOfLines={2}
              >
                {email.body}
              </Text>
              <View style={styles.emailFooter}>
                <View
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: getCategoryColor(email.category) + '20' },
                  ]}
                >
                  <Text
                    style={[styles.categoryText, { color: getCategoryColor(email.category) }]}
                  >
                    {email.category}
                  </Text>
                </View>
                {!email.read && <View style={[styles.unreadDot, { backgroundColor: theme.colors.primary }]} />}
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );

  const renderEmailDetail = () => {
    if (!selectedEmail) return null;

    return (
      <Modal visible={!!selectedEmail} animationType="slide">
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={[styles.modalHeader, { paddingTop: insets.top + 20 }]}>
            <TouchableOpacity onPress={() => setSelectedEmail(null)}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Reply size={20} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Forward size={20} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Archive size={20} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Trash2 size={20} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.emailDetail} showsVerticalScrollIndicator={false}>
            <View style={styles.detailHeader}>
              <View style={styles.detailFrom}>
                <Text style={[styles.detailFromText, { color: theme.colors.text }]}>
                  {selectedEmail.from}
                </Text>
                {selectedEmail.aiDrafted && (
                  <View style={[styles.aiBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                    <Sparkles size={12} color={theme.colors.primary} />
                    <Text style={[styles.aiBadgeText, { color: theme.colors.primary }]}>
                      AI Drafted
                    </Text>
                  </View>
                )}
              </View>
              <Text style={[styles.detailTo, { color: theme.colors.secondaryText }]}>
                To: {selectedEmail.to.join(', ')}
              </Text>
              <Text style={[styles.detailTime, { color: theme.colors.secondaryText }]}>
                {new Date(selectedEmail.timestamp).toLocaleString()}
              </Text>
            </View>

            <Text style={[styles.detailSubject, { color: theme.colors.text }]}>
              {selectedEmail.subject}
            </Text>

            <View style={styles.detailMeta}>
              <View
                style={[
                  styles.priorityBadge,
                  { backgroundColor: getPriorityColor(selectedEmail.priority) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.priorityText,
                    { color: getPriorityColor(selectedEmail.priority) },
                  ]}
                >
                  {selectedEmail.priority} priority
                </Text>
              </View>
              <View
                style={[
                  styles.categoryBadge,
                  { backgroundColor: getCategoryColor(selectedEmail.category) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: getCategoryColor(selectedEmail.category) },
                  ]}
                >
                  {selectedEmail.category}
                </Text>
              </View>
            </View>

            <View style={[styles.detailBody, { backgroundColor: theme.colors.cardBackground }]}>
              <Text style={[styles.detailBodyText, { color: theme.colors.text }]}>
                {selectedEmail.body}
              </Text>
            </View>

            {selectedEmail.aiDrafted && (
              <View style={[styles.aiInfo, { backgroundColor: theme.colors.primary + '10' }]}>
                <Sparkles size={16} color={theme.colors.primary} />
                <Text style={[styles.aiInfoText, { color: theme.colors.primary }]}>
                  This email was drafted by AI based on your writing style and context
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    );
  };

  const renderCompose = () => (
    <Modal visible={showCompose} animationType="slide">
      <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.modalHeader, { paddingTop: insets.top + 20 }]}>
          <TouchableOpacity onPress={() => setShowCompose(false)}>
            <X size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: theme.colors.text }]}>New Email</Text>
          <TouchableOpacity onPress={handleSend}>
            <Send size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.composeForm} showsVerticalScrollIndicator={false}>
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>To</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
              ]}
              placeholder="recipient@example.com"
              placeholderTextColor={theme.colors.secondaryText}
              value={to}
              onChangeText={setTo}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Subject</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
              ]}
              placeholder="Email subject"
              placeholderTextColor={theme.colors.secondaryText}
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.bodyHeader}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Message</Text>
              <TouchableOpacity
                style={[styles.aiDraftButton, { backgroundColor: theme.colors.primary }]}
                onPress={handleAIDraft}
              >
                <Sparkles size={14} color="white" />
                <Text style={styles.aiDraftButtonText}>AI Draft</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={[
                styles.textArea,
                { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
              ]}
              placeholder="Type your message or let AI draft it for you..."
              placeholderTextColor={theme.colors.secondaryText}
              value={body}
              onChangeText={setBody}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />
          </View>

          <View style={[styles.aiTip, { backgroundColor: theme.colors.primary + '10' }]}>
            <Sparkles size={16} color={theme.colors.primary} />
            <Text style={[styles.aiTipText, { color: theme.colors.primary }]}>
              AI will draft emails in your writing style based on your past correspondence
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {renderEmailList()}
      {renderEmailDetail()}
      {renderCompose()}
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
  composeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  emailList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600' as const,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 8,
  },
  emailCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  emailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  emailFrom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emailFromText: {
    fontSize: 14,
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
  emailTime: {
    fontSize: 12,
  },
  emailSubject: {
    fontSize: 16,
    marginBottom: 4,
  },
  emailBody: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  emailFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
  emailDetail: {
    flex: 1,
    paddingHorizontal: 20,
  },
  detailHeader: {
    marginBottom: 20,
  },
  detailFrom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  detailFromText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  detailTo: {
    fontSize: 14,
    marginBottom: 4,
  },
  detailTime: {
    fontSize: 12,
  },
  detailSubject: {
    fontSize: 24,
    fontWeight: '700' as const,
    marginBottom: 16,
  },
  detailMeta: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  detailBody: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  detailBodyText: {
    fontSize: 16,
    lineHeight: 24,
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
  composeForm: {
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
  bodyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiDraftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  aiDraftButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600' as const,
  },
  textArea: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    minHeight: 200,
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
