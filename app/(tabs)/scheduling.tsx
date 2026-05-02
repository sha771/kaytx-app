 
import React, { useState } from 'react';
import {

  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,

  StyleSheet,
} from 'react-native';
import {
  Calendar,
  Plus,
  Clock,
  Send,
  Users,
  MessageSquare,
  Search,
  Pencil,
  Trash2,
  Bell,
  Repeat,
  MapPin,
  Video,
  Phone,
  CircleCheck,
  X,
  ChartBar,
  TrendingUp,
  Activity,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';
import { RelatedFeatures, QuickLinks } from '@/components/RelatedFeatures';

interface ScheduledMessage {
  id: string;
  title: string;
  message: string;
  recipients: string[];
  scheduledTime: string;
  status: 'scheduled' | 'sent' | 'failed';
  platform: string;
  createdAt: string;
  recurring: boolean;
  recurringType?: 'daily' | 'weekly' | 'monthly';
  priority: 'low' | 'medium' | 'high';
}

interface Meeting {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  location?: string;
  type: 'video' | 'phone' | 'in-person';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  dueTime: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  category: string;
}

interface QuickSchedule {
  id: string;
  title: string;
  time: string;
  icon: React.ComponentType<any>;
  color: string;
}

export default function SchedulingScreen() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'messages' | 'meetings' | 'reminders'>('messages');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'scheduled' | 'sent' | 'failed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // tRPC data fetching
  const { data: scheduledMessagesData } = trpc.marketing.getScheduledMessages.useQuery();
  const { data: meetingsData } = trpc.business.getMeetings.useQuery();
  const { data: remindersData } = trpc.aiAssistant.getReminders.useQuery();

  const scheduledMessages: ScheduledMessage[] = scheduledMessagesData ?? [
    {
      id: '1',
      title: 'Weekly Newsletter',
      message: 'Check out our latest updates and features...',
      recipients: ['All Subscribers'],
      scheduledTime: 'Today, 2:00 PM',
      status: 'scheduled',
      platform: 'WhatsApp',
      createdAt: '2 hours ago',
      recurring: true,
      recurringType: 'weekly',
      priority: 'medium',
    },
    {
      id: '2',
      title: 'Product Launch Announcement',
      message: 'We\'re excited to announce our new product...',
      recipients: ['VIP Customers', 'Beta Users'],
      scheduledTime: 'Tomorrow, 10:00 AM',
      status: 'scheduled',
      platform: 'Telegram',
      createdAt: '1 day ago',
      recurring: false,
      priority: 'high',
    },
    {
      id: '3',
      title: 'Holiday Greetings',
      message: 'Wishing you a wonderful holiday season...',
      recipients: ['All Contacts'],
      scheduledTime: 'Dec 25, 9:00 AM',
      status: 'scheduled',
      platform: 'Instagram',
      createdAt: '3 days ago',
      recurring: false,
      priority: 'low',
    },
    {
      id: '4',
      title: 'Flash Sale Alert',
      message: '24-hour flash sale starting now! Get 50% off...',
      recipients: ['Customers'],
      scheduledTime: 'Yesterday, 12:00 PM',
      status: 'sent',
      platform: 'WhatsApp',
      createdAt: '2 days ago',
      recurring: false,
      priority: 'high',
    },
  ];

  const meetings: Meeting[] = meetingsData ?? [
    {
      id: '1',
      title: 'Team Standup',
      description: 'Daily team sync and updates',
      startTime: 'Today, 9:00 AM',
      endTime: 'Today, 9:30 AM',
      attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      type: 'video',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Client Presentation',
      description: 'Quarterly business review with ABC Corp',
      startTime: 'Today, 2:00 PM',
      endTime: 'Today, 3:30 PM',
      attendees: ['Sarah Wilson', 'Tom Brown'],
      location: 'Conference Room A',
      type: 'in-person',
      status: 'upcoming',
    },
  ];

  const reminders: Reminder[] = remindersData ?? [
    {
      id: '1',
      title: 'Review quarterly reports',
      description: 'Analyze Q4 performance metrics',
      dueTime: 'Today, 4:00 PM',
      priority: 'high',
      completed: false,
      category: 'Work',
    },
    {
      id: '2',
      title: 'Update customer database',
      description: 'Clean and organize customer contacts',
      dueTime: 'Tomorrow, 10:00 AM',
      priority: 'medium',
      completed: false,
      category: 'Admin',
    },
  ];

  const quickSchedules: QuickSchedule[] = [
    {
      id: '1',
      title: 'In 1 Hour',
      time: '1h',
      icon: Clock,
      color: '#007AFF',
    },
    {
      id: '2',
      title: 'Tomorrow',
      time: '1d',
      icon: Calendar,
      color: '#34C759',
    },
    {
      id: '3',
      title: 'Next Week',
      time: '7d',
      icon: Calendar,
      color: '#FF9500',
    },
    {
      id: '4',
      title: 'Custom',
      time: 'Custom',
      icon: Clock,
      color: '#8E8E93',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
      case 'upcoming':
        return '#FF9500';
      case 'sent':
      case 'completed':
        return '#34C759';
      case 'failed':
      case 'cancelled':
        return '#FF3B30';
      case 'ongoing':
        return '#007AFF';
      default:
        return '#8E8E93';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#FF3B30';
      case 'medium':
        return '#FF9500';
      case 'low':
        return '#34C759';
      default:
        return '#8E8E93';
    }
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'phone':
        return Phone;
      case 'in-person':
        return MapPin;
      default:
        return Calendar;
    }
  };

  const getStatusText = (status: ScheduledMessage['status']) => {
    switch (status) {
      case 'scheduled':
        return 'Scheduled';
      case 'sent':
        return 'Sent';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const filteredMessages = scheduledMessages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || message.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const renderQuickSchedule = ({ item }: { item: QuickSchedule }) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity style={[styles.quickScheduleCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={[styles.quickScheduleIcon, { backgroundColor: `${item.color}20` }]}>
          <IconComponent size={20} color={item.color} />
        </View>
        <Text style={[styles.quickScheduleTitle, { color: theme.colors.text }]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderScheduledMessage = ({ item }: { item: ScheduledMessage }) => (
    <View style={[styles.messageCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.messageHeader}>
        <View style={styles.messageInfo}>
          <View style={styles.titleRow}>
            <Text style={[styles.messageTitle, { color: theme.colors.text }]} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) + '20' }]}>
              <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                {item.priority}
              </Text>
            </View>
          </View>
          <Text style={[styles.messagePreview, { color: theme.colors.secondaryText }]} numberOfLines={2}>
            {item.message}
          </Text>
        </View>
        <View style={styles.cardActions}>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {getStatusText(item.status)}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Pencil size={14} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Trash2 size={14} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.messageDetails}>
        <View style={styles.detailItem}>
          <Clock size={14} color={theme.colors.secondaryText} />
          <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
            {item.scheduledTime}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Users size={14} color={theme.colors.secondaryText} />
          <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
            {item.recipients.length} recipients
          </Text>
        </View>
        <View style={styles.detailItem}>
          <MessageSquare size={14} color={theme.colors.secondaryText} />
          <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
            {item.platform}
          </Text>
        </View>
        {item.recurring && (
          <View style={styles.detailItem}>
            <Repeat size={14} color={theme.colors.primary} />
            <Text style={[styles.detailText, { color: theme.colors.primary }]}>
              {item.recurringType}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.messageFooter}>
        <Text style={[styles.createdAt, { color: theme.colors.secondaryText }]}>
          Created {item.createdAt}
        </Text>
      </View>
    </View>
  );

  const renderMeeting = ({ item }: { item: Meeting }) => {
    const TypeIcon = getMeetingTypeIcon(item.type);
    
    return (
      <View style={[styles.messageCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.messageHeader}>
          <View style={styles.messageInfo}>
            <View style={styles.titleRow}>
              <View style={styles.meetingTitleContainer}>
                <TypeIcon size={16} color={theme.colors.primary} />
                <Text style={[styles.messageTitle, { color: theme.colors.text }]}>
                  {item.title}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <Text style={[styles.messagePreview, { color: theme.colors.secondaryText }]} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Pencil size={14} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Trash2 size={14} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.messageDetails}>
          <View style={styles.detailItem}>
            <Clock size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
              {item.startTime} - {item.endTime}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Users size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
              {item.attendees.length} attendees
            </Text>
          </View>
          {item.location && (
            <View style={styles.detailItem}>
              <MapPin size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
                {item.location}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderReminder = ({ item }: { item: Reminder }) => (
    <View style={[styles.messageCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.messageHeader}>
        <View style={styles.messageInfo}>
          <View style={styles.titleRow}>
            <View style={styles.reminderTitleContainer}>
              <TouchableOpacity>
                {item.completed ? (
                  <CircleCheck size={20} color="#34C759" />
                ) : (
                  <View style={[styles.uncheckedCircle, { borderColor: theme.colors.border }]} />
                )}
              </TouchableOpacity>
              <Text style={[
                styles.messageTitle, 
                { 
                  color: item.completed ? theme.colors.secondaryText : theme.colors.text,
                  textDecorationLine: item.completed ? 'line-through' : 'none',
                }
              ]}>
                {item.title}
              </Text>
            </View>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) + '20' }]}>
              <Text style={[styles.priorityText, { color: getPriorityColor(item.priority) }]}>
                {item.priority}
              </Text>
            </View>
          </View>
          <Text style={[styles.messagePreview, { color: theme.colors.secondaryText }]} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Pencil size={14} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Trash2 size={14} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.messageDetails}>
        <View style={styles.detailItem}>
          <Clock size={14} color={theme.colors.secondaryText} />
          <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
            Due: {item.dueTime}
          </Text>
        </View>
        <View style={styles.categoryTag}>
          <Text style={[styles.categoryText, { color: theme.colors.primary }]}>
            {item.category}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderFilterButton = (filter: typeof selectedFilter, label: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === Filter && { backgroundColor: theme.colors.primary },
      ]}
      onPress={() => setSelectedFilter(Filter)}
    >
      <Text
        style={[
          styles.filterButtonText,
          {
            color: selectedFilter === Filter ? 'white' : theme.colors.secondaryText,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const scheduledCount = scheduledMessages.filter(m => m.status === 'scheduled').length;
  const sentCount = scheduledMessages.filter(m => m.status === 'sent').length;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Scheduling
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Schedule and manage your messages
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowAnalytics(true)}
          >
            <ChartBarBig size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => setShowCreateModal(true)}
          >
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['messages', 'meetings', 'reminders'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              {
                backgroundColor: activeTab === tab ? theme.colors.primary : 'transparent',
              },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab ? 'white' : theme.colors.text,
                  fontWeight: activeTab === tab ? '600' : '500',
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {scheduledCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              Scheduled
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {sentCount}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              Sent Today
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              98%
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>
              Success Rate
            </Text>
          </View>
        </View>

        {/* Quick Schedule */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Quick Schedule
          </Text>
          <FlatList
            data={quickSchedules}
            renderItem={renderQuickSchedule}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickScheduleContainer}
          />
        </View>

        {/* Search and Filters */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={18} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search scheduled messages..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <View style={styles.filtersContainer}>
            {renderFilterButton('all', 'All')}
            {renderFilterButton('scheduled', 'Scheduled')}
            {renderFilterButton('sent', 'Sent')}
            {renderFilterButton('failed', 'Failed')}
          </View>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'messages' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Scheduled Messages
            </Text>
            <FlatList
              data={filteredMessages}
              renderItem={renderScheduledMessage}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.messagesList}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Send size={48} color={theme.colors.secondaryText} />
                  <Text style={[styles.emptyStateTitle, { color: theme.colors.text }]}>
                    No messages found
                  </Text>
                  <Text style={[styles.emptyStateText, { color: theme.colors.secondaryText }]}>
                    Try adjusting your search or filters
                  </Text>
                </View>
              }
            />
          </View>
        )}

        {activeTab === 'meetings' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Upcoming Meetings
            </Text>
            <FlatList
              data={meetings}
              renderItem={renderMeeting}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.messagesList}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Calendar size={48} color={theme.colors.secondaryText} />
                  <Text style={[styles.emptyStateTitle, { color: theme.colors.text }]}>
                    No meetings scheduled
                  </Text>
                  <Text style={[styles.emptyStateText, { color: theme.colors.secondaryText }]}>
                    Schedule your first meeting
                  </Text>
                </View>
              }
            />
          </View>
        )}

        {activeTab === 'reminders' && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Your Reminders
            </Text>
            <FlatList
              data={reminders}
              renderItem={renderReminder}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.messagesList}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Bell size={48} color={theme.colors.secondaryText} />
                  <Text style={[styles.emptyStateTitle, { color: theme.colors.text }]}>
                    No reminders set
                  </Text>
                  <Text style={[styles.emptyStateText, { color: theme.colors.secondaryText }]}>
                    Create your first reminder
                  </Text>
                </View>
              }
            />
          </View>
        )}
      </ScrollView>

      {/* Related Features - removed as per request */}

      {/* Create Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Create New {activeTab.slice(0, -1)}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCreateModal(false)}
            >
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <Text style={[styles.comingSoonText, { color: theme.colors.secondaryText }]}>
              Create {activeTab} form coming soon!
            </Text>
          </ScrollView>
        </View>
      </Modal>

      {/* Analytics Modal */}
      <Modal
        visible={showAnalytics}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Scheduling Analytics
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAnalytics(false)}
            >
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.analyticsSection}>
              <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>
                Performance Overview
              </Text>
              
              <View style={styles.analyticsGrid}>
                <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <TrendingUp size={24} color="#34C759" />
                  <Text style={[styles.analyticsValue, { color: theme.colors.text }]}>98%</Text>
                  <Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
                </View>
                
                <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <Activity size={24} color="#007AFF" />
                  <Text style={[styles.analyticsValue, { color: theme.colors.text }]}>247</Text>
                  <Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Total Sent</Text>
                </View>
                
                <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <Clock size={24} color="#FF9500" />
                  <Text style={[styles.analyticsValue, { color: theme.colors.text }]}>12</Text>
                  <Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Pending</Text>
                </View>
                
                <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <Users size={24} color="#AF52DE" />
                  <Text style={[styles.analyticsValue, { color: theme.colors.text }]}>1.2K</Text>
                  <Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Recipients</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickScheduleContainer: {
    paddingRight: 20,
  },
  quickScheduleCard: {
    width: 100,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickScheduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickScheduleTitle: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  searchSection: {
    marginBottom: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  messagesList: {
    gap: 16,
  },
  messageCard: {
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  messageInfo: {
    flex: 1,
    marginRight: 12,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  messagePreview: {
    fontSize: 14,
    lineHeight: 20,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  messageDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    flex: 1,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createdAt: {
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  meetingTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  reminderTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  uncheckedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  cardActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 6,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  comingSoonText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 100,
  },
  analyticsSection: {
    marginBottom: 32,
  },
  analyticsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  analyticsCard: {
    width: '47%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 8,
  },
  analyticsLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});