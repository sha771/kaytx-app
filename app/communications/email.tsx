 
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
  Mail,
  Send,
  Search,
  Plus,
  Archive,
  Star,
  Paperclip,
  Flag,
  Inbox,
  Filter,
  Clock,
  Users,
  Tag,
  Eye,
  Trash2,
  ArrowLeft,
  MoreVertical,
  Reply,
  Forward,
  AlertCircle,
  CheckCircle,
  Calendar,
  FileText,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';

interface EmailMessage {
  id: string;
  sender: string;
  senderAvatar: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  important: boolean;
  hasAttachment: boolean;
  starred: boolean;
  labels: string[];
  category: 'primary' | 'social' | 'promotions' | 'updates';
}

interface EmailFilter {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  count: number;
}

const mockEmails: EmailMessage[] = [
  {
    id: '1',
    sender: 'john@company.com',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    subject: 'Project Update - Q4 Review',
    preview: 'Hi team, I wanted to share the latest updates on our Q4 project milestones and discuss the next steps for the upcoming quarter...',
    time: '2:30 PM',
    unread: true,
    important: true,
    hasAttachment: true,
    starred: true,
    labels: ['Work', 'Important'],
    category: 'primary',
  },
  {
    id: '2',
    sender: 'sarah@client.com',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    subject: 'Meeting Confirmation - Tomorrow 3PM',
    preview: 'Thanks for scheduling the meeting. I confirm our appointment for tomorrow at 3 PM. Looking forward to discussing the proposal...',
    time: '1:15 PM',
    unread: true,
    important: false,
    hasAttachment: false,
    starred: false,
    labels: ['Meetings'],
    category: 'primary',
  },
  {
    id: '3',
    sender: 'notifications@service.com',
    senderAvatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
    subject: 'Your monthly analytics report is ready',
    preview: 'Your comprehensive analytics report for this month has been generated and is now ready for review in your dashboard...',
    time: 'Yesterday',
    unread: false,
    important: false,
    hasAttachment: true,
    starred: false,
    labels: ['Reports'],
    category: 'updates',
  },
  {
    id: '4',
    sender: 'marketing@platform.com',
    senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    subject: 'New features announcement',
    preview: 'We are excited to introduce several new features that will enhance your experience and productivity...',
    time: '2 days ago',
    unread: false,
    important: false,
    hasAttachment: false,
    starred: false,
    labels: ['Marketing'],
    category: 'promotions',
  },
];

const emailFilters: EmailFilter[] = [
  { id: 'inbox', name: 'Inbox', icon: Inbox, count: 25 },
  { id: 'sent', name: 'Sent', icon: Send, count: 142 },
  { id: 'important', name: 'Important', icon: Flag, count: 8 },
  { id: 'starred', name: 'Starred', icon: Star, count: 12 },
  { id: 'scheduled', name: 'Scheduled', icon: Clock, count: 3 },
  { id: 'drafts', name: 'Drafts', icon: FileText, count: 5 },
];

export default function EmailScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFolder, setActiveFolder] = useState<string>('inbox');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());
  const [autoReplyEnabled, setAutoReplyEnabled] = useState<boolean>(false);

  const filteredEmails = mockEmails.filter((email) => {
    const matchesSearch =
      email.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.preview.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFolder =
      activeFolder === 'inbox' ||
      (activeFolder === 'important' && email.important) ||
      (activeFolder === 'starred' && email.starred);

    const matchesCategory =
      selectedCategory === 'all' || email.category === selectedCategory;

    return matchesSearch && matchesFolder && matchesCategory;
  });

  const toggleEmailSelection = (id: string) => {
    const newSelected = new Set(selectedEmails);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedEmails(newSelected);
  };

  const renderEmailItem = ({ item }: { item: EmailMessage }) => {
    const isSelected = selectedEmails.has(item.id);
    
    return (
      <TouchableOpacity
        style={[
          styles.emailItem,
          { backgroundColor: theme.colors.cardBackground },
          item.unread && { borderLeftWidth: 3, borderLeftColor: theme.colors.primary },
          isSelected && { backgroundColor: `${theme.colors.primary}10` },
        ]}
        onLongPress={() => toggleEmailSelection(item.id)}
      >
        <View style={styles.emailRow}>
          <Image source={{ uri: item.senderAvatar }} style={styles.senderAvatar} />
          
          <View style={styles.emailContent}>
            <View style={styles.emailHeader}>
              <View style={styles.senderInfo}>
                <Text
                  style={[
                    styles.senderName,
                    { color: theme.colors.text },
                    item.unread && styles.unreadText,
                  ]}
                  numberOfLines={1}
                >
                  {item.sender}
                </Text>
                {item.starred && (
                  <Star size={14} color="#FFD700" fill="#FFD700" />
                )}
                {item.important && (
                  <Flag size={14} color="#EF4444" fill="#EF4444" />
                )}
              </View>
              
              <View style={styles.emailMeta}>
                {item.hasAttachment && <Paperclip size={14} color={theme.colors.secondaryText} />}
                <Text style={[styles.emailTime, { color: theme.colors.secondaryText }]}>
                  {item.time}
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.emailSubject,
                { color: theme.colors.text },
                item.unread && styles.unreadText,
              ]}
              numberOfLines={1}
            >
              {item.subject}
            </Text>

            <Text
              style={[styles.emailPreview, { color: theme.colors.secondaryText }]}
              numberOfLines={2}
            >
              {item.preview}
            </Text>

            <View style={styles.emailFooter}>
              <View style={styles.labels}>
                {item.labels.slice(0, 2).map((label, index) => (
                  <View
                    key={index}
                    style={[styles.label, { backgroundColor: `${theme.colors.primary}20` }]}
                  >
                    <Text style={[styles.labelText, { color: theme.colors.primary }]}>
                      {label}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.emailActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Reply size={16} color={theme.colors.secondaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Archive size={16} color={theme.colors.secondaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MoreVertical size={16} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFilterChip = ({ item }: { item: EmailFilter }) => {
    const IconComponent = item.icon;
    const isActive = activeFolder === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.filterChip,
          { backgroundColor: theme.colors.cardBackground },
          isActive && { backgroundColor: theme.colors.primary },
        ]}
        onPress={() => setActiveFolder(item.id)}
      >
        <IconComponent size={16} color={isActive ? 'white' : theme.colors.text} />
        <Text
          style={[
            styles.filterText,
            { color: isActive ? 'white' : theme.colors.text },
          ]}
        >
          {item.name}
        </Text>
        <View
          style={[
            styles.filterBadge,
            { backgroundColor: isActive ? 'rgba(255,255,255,0.3)' : `${theme.colors.primary}20` },
          ]}
        >
          <Text
            style={[
              styles.filterBadgeText,
              { color: isActive ? 'white' : theme.colors.primary },
            ]}
          >
            {item.count}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Email</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.composeButton}>
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {showFilters && (
        <View style={[styles.filtersPanel, { backgroundColor: theme.colors.cardBackground }]}>
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
          <Text style={[styles.filterLabel, { color: theme.colors.text }]}>
            Category
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryFilters}>
              {['all', 'primary', 'social', 'promotions', 'updates'].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category && {
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color:
                          selectedCategory === category
                            ? 'white'
                            : theme.colors.secondaryText,
                      },
                    ]}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search emails..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filtersList}>
        <FlatList
          data={emailFilters}
          renderItem={renderFilterChip}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        />
      </View>

      <View style={[styles.stats, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.statItem}>
          <Eye size={16} color={theme.colors.primary} />
          <Text style={[styles.statText, { color: theme.colors.text }]}>
            12 unread
          </Text>
        </View>
        <View style={styles.statItem}>
          <CheckCircle size={16} color="#34C759" />
          <Text style={[styles.statText, { color: theme.colors.text }]}>
            98% delivered
          </Text>
        </View>
        <View style={styles.statItem}>
          <AlertCircle size={16} color="#FF9500" />
          <Text style={[styles.statText, { color: theme.colors.text }]}>
            2 spam
          </Text>
        </View>
      </View>

      {selectedEmails.size > 0 && (
        <View style={[styles.bulkActions, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.bulkText}>{selectedEmails.size} selected</Text>
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
        data={filteredEmails}
        renderItem={renderEmailItem}
        keyExtractor={(item) => item.id}
        style={styles.emailsList}
        contentContainerStyle={styles.emailsContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={[styles.fab, { backgroundColor: theme.colors.primary }]}>
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
    backgroundColor: '#007AFF',
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
    marginBottom: 8,
  },
  categoryFilters: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
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
  filtersList: {
    marginBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  filterBadgeText: {
    fontSize: 12,
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
  emailsList: {
    flex: 1,
  },
  emailsContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emailItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  emailRow: {
    flexDirection: 'row',
  },
  senderAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  emailContent: {
    flex: 1,
  },
  emailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
  },
  emailMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emailTime: {
    fontSize: 12,
  },
  emailSubject: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  unreadText: {
    fontWeight: '700',
  },
  emailPreview: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  emailFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labels: {
    flexDirection: 'row',
    gap: 6,
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  labelText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emailActions: {
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