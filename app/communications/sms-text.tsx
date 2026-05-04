 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Switch,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MessageSquare,
  Send,
  Search,
  Plus,
  Archive,
  Star,
  ArrowLeft,
  ListFilter,
  Clock,
  CircleCheck,
  CircleAlert,
  Users,
  Tag,
  EllipsisVertical,
  Bell,
  Settings,
  Trash2,
  Eye,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';

interface SMSMessage {
  id: string;
  contact: string;
  contactAvatar: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'sent' | 'received';
  status: 'delivered' | 'sent' | 'failed';
  group?: boolean;
  participants?: number;
  tags?: string[];
}

const mockMessages: SMSMessage[] = [
  {
    id: '1',
    contact: 'John Smith',
    contactAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    message: 'Hey, are we still meeting today at 3 PM? Let me know if we need to reschedule.',
    time: '10:30 AM',
    unread: true,
    type: 'received',
    status: 'delivered',
    tags: ['Important'],
  },
  {
    id: '2',
    contact: 'Sarah Johnson',
    contactAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    message: 'Thanks for the update! I appreciate you keeping me in the loop.',
    time: '9:45 AM',
    unread: false,
    type: 'sent',
    status: 'delivered',
  },
  {
    id: '3',
    contact: 'Mike Wilson',
    contactAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    message: 'Can you send me the quarterly report when you get a chance?',
    time: 'Yesterday',
    unread: true,
    type: 'received',
    status: 'delivered',
    tags: ['Work'],
  },
  {
    id: '4',
    contact: 'Team Marketing',
    contactAvatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
    message: 'Perfect, see you all at the team meeting',
    time: 'Yesterday',
    unread: false,
    type: 'sent',
    status: 'delivered',
    group: true,
    participants: 8,
  },
];

export default function SMSTextScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'sent'>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
  const [autoReplyEnabled, setAutoReplyEnabled] = useState<boolean>(false);

  const filteredMessages = mockMessages.filter((message) => {
    const matchesSearch =
      message.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'unread' && message.unread) ||
      (activeFilter === 'sent' && message.type === 'sent');
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CircleCheck size={14} color="#34C759" />;
      case 'sent':
        return <Clock size={14} color="#FF9500" />;
      case 'failed':
        return <CircleAlert size={14} color="#EF4444" />;
      default:
        return null;
    }
  };

  const toggleMessageSelection = (id: string) => {
    const newSelected = new Set(selectedMessages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedMessages(newSelected);
  };

  const renderMessage = ({ item }: { item: SMSMessage }) => {
    const isSelected = selectedMessages.has(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.messageItem,
          { backgroundColor: theme.colors.cardBackground },
          item.unread && {
            borderLeftWidth: 3,
            borderLeftColor: theme.colors.primary,
          },
          isSelected && { backgroundColor: `${theme.colors.primary}10` },
        ]}
        onLongPress={() => toggleMessageSelection(item.id)}
      >
        <View style={styles.messageRow}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.contactAvatar }} style={styles.contactAvatar} />
            {item.group && (
              <View style={[styles.groupBadge, { backgroundColor: theme.colors.primary }]}>
                <Users size={10} color="white" />
              </View>
            )}
          </View>

          <View style={styles.messageContent}>
            <View style={styles.messageHeader}>
              <View style={styles.contactInfo}>
                <Text
                  style={[
                    styles.contactName,
                    { color: theme.colors.text },
                    item.unread && styles.unreadText,
                  ]}
                >
                  {item.contact}
                </Text>
                {item.group && item.participants && (
                  <Text style={[styles.participants, { color: theme.colors.secondaryText }]}>
                    ({item.participants})
                  </Text>
                )}
              </View>

              <View style={styles.messageMeta}>
                {getStatusIcon(item.status)}
                <Text style={[styles.messageTime, { color: theme.colors.secondaryText }]}>
                  {item.time}
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.messagePreview,
                { color: theme.colors.secondaryText },
                item.unread && styles.unreadText,
              ]}
              numberOfLines={2}
            >
              {item.message}
            </Text>

            <View style={styles.messageFooter}>
              {item.tags && (
                <View style={styles.tags}>
                  {item.tags.map((tag, index) => (
                    <View
                      key={index}
                      style={[styles.tag, { backgroundColor: `${theme.colors.primary}20` }]}
                    >
                      <Text style={[styles.tagText, { color: theme.colors.primary }]}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.messageActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Archive size={16} color={theme.colors.secondaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Star size={16} color={theme.colors.secondaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <EllipsisVertical size={16} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View
        style={[
          styles.header,
          { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 },
        ]}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>SMS & Text</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <ListFilter size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.composeButton}>
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {showFilters && (
        <View
          style={[
            styles.filtersPanel,
            { backgroundColor: theme.colors.cardBackground },
          ]}
        >
          <View style={styles.filterRow}>
            <Text style={[styles.filterLabel, { color: theme.colors.text }]}>
              Auto Reply
            </Text>
            <Switch
              value={autoReplyEnabled}
              onValueChange={setAutoReplyEnabled}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
            />
          </View>
          <View style={styles.filterRow}>
            <Text style={[styles.filterLabel, { color: theme.colors.text }]}>
              Message Notifications
            </Text>
            <Bell size={20} color={theme.colors.text} />
          </View>
        </View>
      )}

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search messages..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterChips}>
            {(['all', 'unread', 'sent'] as const).map((Filter) => (
              <TouchableOpacity
                key={Funnel}
                style={[
                  styles.filterChip,
                  { backgroundColor: theme.colors.cardBackground },
                  activeFilter === Filter && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setActiveFilter(Filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    {
                      color:
                        activeFilter === Filter ? 'white' : theme.colors.text,
                    },
                  ]}
                >
                  {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={[styles.stats, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.statItem}>
          <Eye size={16} color={theme.colors.primary} />
          <Text style={[styles.statText, { color: theme.colors.text }]}>
            {mockMessages.filter((m) => m.unread).length} unread
          </Text>
        </View>
        <View style={styles.statItem}>
          <CircleCheck size={16} color="#34C759" />
          <Text style={[styles.statText, { color: theme.colors.text }]}>
            100% delivered
          </Text>
        </View>
        <View style={styles.statItem}>
          <Clock size={16} color="#FF9500" />
          <Text style={[styles.statText, { color: theme.colors.text }]}>0 pending</Text>
        </View>
      </View>

      {selectedMessages.size > 0 && (
        <View
          style={[
            styles.bulkActions,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Text style={styles.bulkText}>{selectedMessages.size} selected</Text>
          <View style={styles.bulkButtons}>
            <TouchableOpacity style={styles.bulkButton}>
              <Archive size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bulkButton}>
              <Trash2 size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bulkButton}>
              <Star size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={filteredMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
      >
        <Send size={24} color="white" />
      </TouchableOpacity>
    </View>
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
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  composeButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filtersPanel: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterChips: {
    flexDirection: 'row',
    gap: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
  },
  bulkText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  bulkButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  bulkButton: {
    padding: 4,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  messageItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  messageRow: {
    flexDirection: 'row',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  groupBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
  },
  participants: {
    fontSize: 12,
  },
  messageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  messageTime: {
    fontSize: 12,
  },
  messagePreview: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  unreadText: {
    fontWeight: '700',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  messageActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
