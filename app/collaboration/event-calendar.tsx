 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Calendar, Clock, Users, Plus, MapPin, Video, Phone, Bell } from 'lucide-react-native';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: 'meeting' | 'event' | 'reminder';
  attendees: number;
  location?: string;
  isVirtual: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface CalendarDay {
  date: number;
  isToday: boolean;
  hasEvents: boolean;
  isCurrentMonth: boolean;
}

export default function EventCalendar() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'events' | 'schedule'>('calendar');
  const [selectedDate, setSelectedDate] = useState<string>('2024-01-15');
  const [events] = useState<Event[]>([
    { id: '1', title: 'Team Standup', date: '2024-01-15', time: '09:00', duration: '30 min', type: 'meeting', attendees: 8, isVirtual: true, priority: 'medium' },
    { id: '2', title: 'Client Presentation', date: '2024-01-15', time: '14:00', duration: '1 hour', type: 'meeting', attendees: 5, location: 'Conference Room A', isVirtual: false, priority: 'high' },
    { id: '3', title: 'Project Deadline', date: '2024-01-16', time: '17:00', duration: 'All day', type: 'reminder', attendees: 0, isVirtual: false, priority: 'high' },
    { id: '4', title: 'Team Building Event', date: '2024-01-18', time: '15:00', duration: '2 hours', type: 'event', attendees: 15, location: 'Office Lounge', isVirtual: false, priority: 'low' },
  ]);

  const generateCalendarDays = () => {
    const days: CalendarDay[] = [];
    const today = new Date();
    const currentDate = today.getDate();
    
    for (let i = 1; i <= 31; i++) {
      const hasEvents = events.some(event => {
        const eventDate = new Date(event.date).getDate();
        return eventDate === i;
      });
      
      days.push({
        date: i,
        isToday: i === currentDate,
        hasEvents,
        isCurrentMonth: true,
      });
    }
    return days;
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users size={16} color="#4ecdc4" />;
      case 'event': return <Calendar size={16} color="#45b7d1" />;
      case 'reminder': return <Bell size={16} color="#f39c12" />;
      default: return <Clock size={16} color="#666" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#666';
    }
  };

  const renderCalendar = () => (
    <View style={styles.tabContent}>
      <View style={styles.calendarHeader}>
        <Text style={styles.monthTitle}>January 2024</Text>
        <TouchableOpacity style={styles.addEventButton}>
          <Plus size={16} color="#4ecdc4" />
          <Text style={styles.addEventText}>Add Event</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Text key={day} style={styles.weekDay}>{day}</Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {generateCalendarDays().map((day) => (
          <TouchableOpacity
            key={day.date}
            style={[
              styles.calendarDay,
              day.isToday && styles.todayDay,
              selectedDate === `2024-01-${day.date.toString().padStart(2, '0')}` && styles.selectedDay,
            ]}
            onPress={() => setSelectedDate(`2024-01-${day.date.toString().padStart(2, '0')}`)}
          >
            <Text style={[
              styles.dayNumber,
              day.isToday && styles.todayText,
              selectedDate === `2024-01-${day.date.toString().padStart(2, '0')}` && styles.selectedText,
            ]}>
              {day.date}
            </Text>
            {day.hasEvents && <View style={styles.eventDot} />}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.selectedDateEvents}>
        <Text style={styles.sectionTitle}>
          Events for {new Date(selectedDate).toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
        {events
          .filter(event => event.date === selectedDate)
          .map((event) => (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <View style={styles.eventInfo}>
                  {getEventTypeIcon(event.type)}
                  <Text style={styles.eventTitle}>{event.title}</Text>
                </View>
                <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(event.priority) }]} />
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTime}>{event.time} • {event.duration}</Text>
                {event.location && (
                  <View style={styles.eventLocation}>
                    <MapPin size={12} color="#666" />
                    <Text style={styles.locationText}>{event.location}</Text>
                  </View>
                )}
                {event.isVirtual && (
                  <View style={styles.eventLocation}>
                    <Video size={12} color="#4ecdc4" />
                    <Text style={styles.locationText}>Virtual Meeting</Text>
                  </View>
                )}
                {event.attendees > 0 && (
                  <Text style={styles.attendeesText}>{event.attendees} attendees</Text>
                )}
              </View>
            </View>
          ))}
      </View>
    </View>
  );

  const renderEvents = () => (
    <View style={styles.tabContent}>
      <View style={styles.eventsHeader}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.eventTypeFilters}>
        <TouchableOpacity style={[styles.typeFilter, styles.activeFilter]}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeFilter}>
          <Text style={styles.filterText}>Meetings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeFilter}>
          <Text style={styles.filterText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.typeFilter}>
          <Text style={styles.filterText}>Reminders</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.eventsList}>
        {events.map((event) => (
          <View key={event.id} style={styles.eventListItem}>
            <View style={styles.eventDateColumn}>
              <Text style={styles.eventDateDay}>
                {new Date(event.date).getDate()}
              </Text>
              <Text style={styles.eventDateMonth}>
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
              </Text>
            </View>
            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <View style={styles.eventInfo}>
                  {getEventTypeIcon(event.type)}
                  <Text style={styles.eventTitle}>{event.title}</Text>
                </View>
                <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(event.priority) }]} />
              </View>
              <View style={styles.eventMeta}>
                <Text style={styles.eventTime}>{event.time} • {event.duration}</Text>
                {event.attendees > 0 && (
                  <Text style={styles.attendeesText}>{event.attendees} attendees</Text>
                )}
              </View>
              {(event.location || event.isVirtual) && (
                <View style={styles.eventLocation}>
                  {event.isVirtual ? (
                    <>
                      <Video size={12} color="#4ecdc4" />
                      <Text style={styles.locationText}>Virtual Meeting</Text>
                    </>
                  ) : (
                    <>
                      <MapPin size={12} color="#666" />
                      <Text style={styles.locationText}>{event.location}</Text>
                    </>
                  )}
                </View>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSchedule = () => (
    <View style={styles.tabContent}>
      <View style={styles.scheduleHeader}>
        <Text style={styles.sectionTitle}>Today&apos;s Schedule</Text>
        <Text style={styles.scheduleDate}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </Text>
      </View>

      <View style={styles.timelineContainer}>
        {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time, index) => {
          const timeEvents = events.filter(event => event.time === time);
          return (
            <View key={time} style={styles.timeSlot}>
              <Text style={styles.timeLabel}>{time}</Text>
              <View style={styles.timeContent}>
                {timeEvents.length > 0 ? (
                  timeEvents.map((event) => (
                    <View key={event.id} style={styles.timelineEvent}>
                      <View style={styles.timelineEventContent}>
                        <Text style={styles.timelineEventTitle}>{event.title}</Text>
                        <Text style={styles.timelineEventDuration}>{event.duration}</Text>
                        {event.isVirtual && (
                          <View style={styles.virtualBadge}>
                            <Video size={12} color="#4ecdc4" />
                            <Text style={styles.virtualText}>Virtual</Text>
                          </View>
                        )}
                      </View>
                      <View style={styles.timelineActions}>
                        {event.isVirtual && (
                          <TouchableOpacity style={styles.joinButton}>
                            <Video size={14} color="#fff" />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.callButton}>
                          <Phone size={14} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyTimeSlot}>
                    <Text style={styles.emptyText}>No events</Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Event & Calendar',
          headerStyle: { backgroundColor: '#1a1a1a' },
          headerTintColor: '#fff',
        }} 
      />
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'calendar' && styles.activeTab]}
          onPress={() => setActiveTab('calendar')}
        >
          <Calendar size={20} color={activeTab === 'calendar' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'calendar' && styles.activeTabText]}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}
        >
          <Users size={20} color={activeTab === 'events' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'schedule' && styles.activeTab]}
          onPress={() => setActiveTab('schedule')}
        >
          <Clock size={20} color={activeTab === 'schedule' ? '#4ecdc4' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'schedule' && styles.activeTabText]}>Schedule</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'calendar' && renderCalendar()}
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'schedule' && renderSchedule()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#2a2a2a',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  activeTabText: {
    color: '#4ecdc4',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  addEventButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addEventText: {
    color: '#4ecdc4',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDay: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    width: 40,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  calendarDay: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 20,
    position: 'relative',
  },
  todayDay: {
    backgroundColor: '#4ecdc4',
  },
  selectedDay: {
    backgroundColor: '#2a2a2a',
    borderWidth: 2,
    borderColor: '#4ecdc4',
  },
  dayNumber: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  todayText: {
    color: '#000',
  },
  selectedText: {
    color: '#4ecdc4',
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#f39c12',
  },
  selectedDateEvents: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  eventTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  eventDetails: {
    gap: 4,
  },
  eventTime: {
    color: '#4ecdc4',
    fontSize: 12,
    fontWeight: '500',
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 4,
  },
  attendeesText: {
    color: '#666',
    fontSize: 12,
  },
  eventsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    marginRight: 12,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  filterButton: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#4ecdc4',
    fontSize: 14,
    fontWeight: '500',
  },
  eventTypeFilters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  typeFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#4ecdc4',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
  eventsList: {
    gap: 12,
  },
  eventListItem: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
  },
  eventDateColumn: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 40,
  },
  eventDateDay: {
    color: '#4ecdc4',
    fontSize: 20,
    fontWeight: '700',
  },
  eventDateMonth: {
    color: '#666',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  eventContent: {
    flex: 1,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  scheduleHeader: {
    marginBottom: 24,
  },
  scheduleDate: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  timelineContainer: {
    gap: 16,
  },
  timeSlot: {
    flexDirection: 'row',
  },
  timeLabel: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
    width: 60,
    textAlign: 'right',
    marginRight: 16,
    marginTop: 4,
  },
  timeContent: {
    flex: 1,
  },
  timelineEvent: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#4ecdc4',
  },
  timelineEventContent: {
    flex: 1,
  },
  timelineEventTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  timelineEventDuration: {
    color: '#666',
    fontSize: 12,
  },
  virtualBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  virtualText: {
    color: '#4ecdc4',
    fontSize: 12,
    marginLeft: 4,
  },
  timelineActions: {
    flexDirection: 'row',
    gap: 8,
  },
  joinButton: {
    backgroundColor: '#4ecdc4',
    padding: 6,
    borderRadius: 4,
  },
  callButton: {
    backgroundColor: '#45b7d1',
    padding: 6,
    borderRadius: 4,
  },
  emptyTimeSlot: {
    padding: 12,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
  },
});