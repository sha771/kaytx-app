 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Image,
  Video,
  FileText,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  GripHorizontal,
  Clock,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface CalendarPost {
  id: string;
  platform: string;
  platformIcon: React.ComponentType<any>;
  platformColor: string;
  time: string;
  type: 'image' | 'video' | 'text';
  status: 'scheduled' | 'draft' | 'published';
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  posts: CalendarPost[];
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function ContentCalendar() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(new Date().getDate());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const mockPosts: { [key: number]: CalendarPost[] } = {
    5: [
      { id: '1', platform: 'Instagram', platformIcon: Instagram, platformColor: '#E4405F', time: '10:00 AM', type: 'image', status: 'scheduled' },
    ],
    8: [
      { id: '2', platform: 'Twitter', platformIcon: Twitter, platformColor: '#1DA1F2', time: '2:00 PM', type: 'text', status: 'scheduled' },
      { id: '3', platform: 'LinkedIn', platformIcon: Linkedin, platformColor: '#0A66C2', time: '4:00 PM', type: 'image', status: 'draft' },
    ],
    12: [
      { id: '4', platform: 'Facebook', platformIcon: Facebook, platformColor: '#1877F2', time: '9:00 AM', type: 'video', status: 'scheduled' },
    ],
    15: [
      { id: '5', platform: 'Instagram', platformIcon: Instagram, platformColor: '#E4405F', time: '12:00 PM', type: 'video', status: 'scheduled' },
      { id: '6', platform: 'Twitter', platformIcon: Twitter, platformColor: '#1DA1F2', time: '3:00 PM', type: 'text', status: 'scheduled' },
    ],
    20: [
      { id: '7', platform: 'LinkedIn', platformIcon: Linkedin, platformColor: '#0A66C2', time: '11:00 AM', type: 'image', status: 'draft' },
    ],
    25: [
      { id: '8', platform: 'Facebook', platformIcon: Facebook, platformColor: '#1877F2', time: '10:00 AM', type: 'image', status: 'scheduled' },
      { id: '9', platform: 'Instagram', platformIcon: Instagram, platformColor: '#E4405F', time: '2:00 PM', type: 'video', status: 'scheduled' },
      { id: '10', platform: 'Twitter', platformIcon: Twitter, platformColor: '#1DA1F2', time: '5:00 PM', type: 'text', status: 'scheduled' },
    ],
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const today = new Date();
    
    const days: CalendarDay[] = [];
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isToday: false,
        posts: [],
      });
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = today.getDate() === i && today.getMonth() === month && today.getFullYear() === year;
      days.push({
        date: i,
        isCurrentMonth: true,
        isToday,
        posts: mockPosts[i] || [],
      });
    }
    
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        isToday: false,
        posts: [],
      });
    }
    
    return days;
  };

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return Image;
      case 'video':
        return Video;
      default:
        return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '#34C759';
      case 'draft':
        return '#FF9500';
      case 'published':
        return '#007AFF';
      default:
        return '#8E8E93';
    }
  };

  const calendarDays = generateCalendarDays();
  const selectedDayPosts = selectedDate ? mockPosts[selectedDate] || [] : [];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Content Calendar',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity style={styles.addButton}>
              <Plus size={22} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* View Mode Toggle */}
        <View style={[styles.viewToggle, { backgroundColor: theme.colors.cardBackground }]}>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'month' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setViewMode('month')}
          >
            <Text style={[styles.viewButtonText, { color: viewMode === 'month' ? '#FFF' : theme.colors.secondaryText }]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewButton, viewMode === 'week' && { backgroundColor: theme.colors.primary }]}
            onPress={() => setViewMode('week')}
          >
            <Text style={[styles.viewButtonText, { color: viewMode === 'week' ? '#FFF' : theme.colors.secondaryText }]}>
              Week
            </Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navButton}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.monthTitle, { color: theme.colors.text }]}>
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navButton}>
            <ChevronRight size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={[styles.calendarCard, { backgroundColor: theme.colors.cardBackground }]}>
          {/* Days Header */}
          <View style={styles.daysHeader}>
            {DAYS.map((day) => (
              <View key={day} style={styles.dayHeaderCell}>
                <Text style={[styles.dayHeaderText, { color: theme.colors.secondaryText }]}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Calendar Days */}
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  day.isToday && styles.todayCell,
                  selectedDate === day.date && day.isCurrentMonth && { backgroundColor: `${theme.colors.primary}20` },
                ]}
                onPress={() => day.isCurrentMonth && setSelectedDate(day.date)}
              >
                <Text
                  style={[
                    styles.dayText,
                    { color: day.isCurrentMonth ? theme.colors.text : theme.colors.secondaryText },
                    day.isToday && { color: theme.colors.primary, fontWeight: '700' as const },
                  ]}
                >
                  {day.date}
                </Text>
                {day.posts.length > 0 && (
                  <View style={styles.postIndicators}>
                    {day.posts.slice(0, 3).map((post, i) => (
                      <View
                        key={post.id}
                        style={[styles.postDot, { backgroundColor: post.platformColor }]}
                      />
                    ))}
                    {day.posts.length > 3 && (
                      <Text style={[styles.moreText, { color: theme.colors.secondaryText }]}>+{day.posts.length - 3}</Text>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selected Day Posts */}
        {selectedDate && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                {MONTHS[currentDate.getMonth()]} {selectedDate}
              </Text>
              <Text style={[styles.postCount, { color: theme.colors.secondaryText }]}>
                {selectedDayPosts.length} post{selectedDayPosts.length !== 1 ? 's' : ''}
              </Text>
            </View>

            {selectedDayPosts.length === 0 ? (
              <View style={[styles.emptyState, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No posts scheduled</Text>
                <Text style={[styles.emptySubtitle, { color: theme.colors.secondaryText }]}>
                  Tap + to schedule a new post
                </Text>
              </View>
            ) : (
              selectedDayPosts.map((post) => {
                const PlatformIcon = post.platformIcon;
                const TypeIcon = getPostTypeIcon(post.type);
                return (
                  <TouchableOpacity
                    key={post.id}
                    style={[styles.postCard, { backgroundColor: theme.colors.cardBackground }]}
                  >
                    <View style={[styles.postPlatformIcon, { backgroundColor: `${post.platformColor}15` }]}>
                      <PlatformIcon size={20} color={post.platformColor} />
                    </View>
                    <View style={styles.postContent}>
                      <View style={styles.postHeader}>
                        <Text style={[styles.postPlatform, { color: theme.colors.text }]}>{post.platform}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(post.status)}15` }]}>
                          <Text style={[styles.statusText, { color: getStatusColor(post.status) }]}>
                            {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.postMeta}>
                        <Clock size={12} color={theme.colors.secondaryText} />
                        <Text style={[styles.postTime, { color: theme.colors.secondaryText }]}>{post.time}</Text>
                        <View style={[styles.postTypeIcon, { backgroundColor: `${theme.colors.primary}15` }]}>
                          <TypeIcon size={10} color={theme.colors.primary} />
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.moreButton}>
                      <GripHorizontal size={18} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        )}

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={[styles.legendTitle, { color: theme.colors.text }]}>Platforms</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#E4405F' }]} />
              <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>Instagram</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1DA1F2' }]} />
              <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>Twitter</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#1877F2' }]} />
              <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>Facebook</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#0A66C2' }]} />
              <Text style={[styles.legendText, { color: theme.colors.secondaryText }]}>LinkedIn</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  addButton: {
    padding: 8,
  },
  viewToggle: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  viewButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  calendarCard: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  daysHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayHeaderCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  dayHeaderText: {
    fontSize: 12,
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 6,
    borderRadius: 8,
  },
  todayCell: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
  },
  postIndicators: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 2,
  },
  postDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  moreText: {
    fontSize: 8,
    marginLeft: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  postCount: {
    fontSize: 14,
  },
  emptyState: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
  },
  postCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  postPlatformIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  postContent: {
    flex: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  postPlatform: {
    fontSize: 15,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  postTime: {
    fontSize: 13,
  },
  postTypeIcon: {
    width: 18,
    height: 18,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  moreButton: {
    padding: 8,
  },
  legend: {
    marginBottom: 20,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 13,
  },
});
