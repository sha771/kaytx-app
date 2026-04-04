import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Calendar as CalendarIcon,
  Plus,
  Search,
  Phone,
  Video,
  MapPin,
  Clock,
  User,
  CheckCircle,
  X,
  Edit,
  Trash2,
  Bell,
  Filter,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from 'lucide-react-native';
import { mockNegotiationAppointments } from '@/utils/mockNegotiationData';
import type { NegotiationAppointment } from '@/types/negotiation';

export default function AppointmentsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<NegotiationAppointment | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [filterType, setFilterType] = useState<'all' | 'phone' | 'video' | 'in-person'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'scheduled' | 'completed' | 'cancelled'>('all');

  const filteredAppointments = mockNegotiationAppointments.filter((appointment) => {
    const matchesSearch = appointment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          appointment.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || appointment.type === filterType;
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return <Phone size={16} color="#007AFF" />;
      case 'video':
        return <Video size={16} color="#5AC8FA" />;
      case 'in-person':
        return <MapPin size={16} color="#FF9500" />;
      default:
        return <CalendarIcon size={16} color="#8E8E93" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'phone':
        return '#007AFF';
      case 'video':
        return '#5AC8FA';
      case 'in-person':
        return '#FF9500';
      default:
        return '#8E8E93';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return '#007AFF';
      case 'completed':
        return '#34C759';
      case 'cancelled':
        return '#FF3B30';
      case 'rescheduled':
        return '#FF9500';
      default:
        return '#8E8E93';
    }
  };

  const upcomingCount = mockNegotiationAppointments.filter(a => a.status === 'scheduled').length;
  const todayCount = mockNegotiationAppointments.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.date === today && a.status === 'scheduled';
  }).length;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Appointments',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTintColor: '#1A1A1A',
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addButton}>
              <Plus size={24} color="#FF2D92" />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.topSection}>
          <View style={styles.searchBar}>
            <Search size={18} color="#8E8E93" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search appointments..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#8E8E93"
            />
          </View>

          <View style={styles.viewModeSelector}>
            {(['day', 'week', 'month'] as const).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[styles.viewModeButton, viewMode === mode && styles.viewModeButtonActive]}
                onPress={() => setViewMode(mode)}
              >
                <Text style={[styles.viewModeText, viewMode === mode && styles.viewModeTextActive]}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filtersRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterChips}>
              <Text style={styles.filterLabel}>Type:</Text>
              {(['all', 'phone', 'video', 'in-person'] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.filterChip, filterType === type && styles.filterChipActive]}
                  onPress={() => setFilterType(type)}
                >
                  <Text style={[styles.filterChipText, filterType === type && styles.filterChipTextActive]}>
                    {type === 'in-person' ? 'In-Person' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: '#E8F5FF' }]}>
              <CalendarIcon size={20} color="#007AFF" />
              <Text style={[styles.statValue, { color: '#007AFF' }]}>{todayCount}</Text>
              <Text style={styles.statLabel}>Today</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#F0FFF0' }]}>
              <Clock size={20} color="#34C759" />
              <Text style={[styles.statValue, { color: '#34C759' }]}>{upcomingCount}</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: '#FFF0F5' }]}>
              <CheckCircle size={20} color="#FF2D92" />
              <Text style={[styles.statValue, { color: '#FF2D92' }]}>
                {mockNegotiationAppointments.filter(a => a.status === 'completed').length}
              </Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.calendarSection}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity style={styles.calendarNavButton}>
                <ChevronLeft size={20} color="#FF2D92" />
              </TouchableOpacity>
              <Text style={styles.calendarMonth}>
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </Text>
              <TouchableOpacity style={styles.calendarNavButton}>
                <ChevronRight size={20} color="#FF2D92" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.appointmentsList}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            {filteredAppointments.map((appointment) => (
              <TouchableOpacity
                key={appointment.id}
                style={styles.appointmentCard}
                onPress={() => setSelectedAppointment(appointment)}
              >
                <View style={styles.appointmentHeader}>
                  <View style={[styles.typeIconContainer, { backgroundColor: getTypeColor(appointment.type) + '20' }]}>
                    {getTypeIcon(appointment.type)}
                  </View>
                  <View style={styles.appointmentInfo}>
                    <Text style={styles.appointmentTitle}>{appointment.title}</Text>
                    <View style={styles.customerRow}>
                      <User size={14} color="#8E8E93" />
                      <Text style={styles.customerText}>{appointment.customerName}</Text>
                    </View>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
                      {appointment.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.appointmentDetails}>
                  <View style={styles.detailRow}>
                    <CalendarIcon size={14} color="#8E8E93" />
                    <Text style={styles.detailText}>
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Clock size={14} color="#8E8E93" />
                    <Text style={styles.detailText}>
                      {appointment.time} ({appointment.duration})
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Phone size={14} color="#8E8E93" />
                    <Text style={styles.detailText}>{appointment.customerPhone}</Text>
                  </View>
                </View>

                {appointment.dealValue && (
                  <View style={styles.dealValueRow}>
                    <Text style={styles.dealValueLabel}>Deal Value:</Text>
                    <Text style={styles.dealValueText}>${appointment.dealValue.toLocaleString()}</Text>
                  </View>
                )}

                {appointment.reminders && (
                  <View style={styles.reminderRow}>
                    <Bell size={14} color="#FF9500" />
                    <Text style={styles.reminderText}>Reminder enabled</Text>
                  </View>
                )}

                {appointment.notes && (
                  <View style={styles.notesPreview}>
                    <Text style={styles.notesLabel}>Notes:</Text>
                    <Text style={styles.notesText} numberOfLines={2}>
                      {appointment.notes}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal
          visible={selectedAppointment !== null}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setSelectedAppointment(null)}
        >
          {selectedAppointment && (
            <SafeAreaView style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Appointment Details</Text>
                <View style={styles.modalHeaderActions}>
                  <TouchableOpacity style={styles.modalHeaderButton}>
                    <Edit size={20} color="#FF2D92" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalHeaderButton}>
                    <Trash2 size={20} color="#FF3B30" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setSelectedAppointment(null)}>
                    <X size={24} color="#1A1A1A" />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView style={styles.modalContent}>
                <View style={styles.modalAppointmentHeader}>
                  <View style={[styles.modalTypeIcon, { backgroundColor: getTypeColor(selectedAppointment.type) + '20' }]}>
                    {getTypeIcon(selectedAppointment.type)}
                  </View>
                  <Text style={styles.modalAppointmentTitle}>{selectedAppointment.title}</Text>
                  <View style={[styles.modalStatusBadge, { backgroundColor: getStatusColor(selectedAppointment.status) + '20' }]}>
                    <Text style={[styles.modalStatusText, { color: getStatusColor(selectedAppointment.status) }]}>
                      {selectedAppointment.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Date & Time</Text>
                  <View style={styles.dateTimeCard}>
                    <View style={styles.dateTimeRow}>
                      <CalendarIcon size={18} color="#FF2D92" />
                      <Text style={styles.dateTimeText}>
                        {new Date(selectedAppointment.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Text>
                    </View>
                    <View style={styles.dateTimeRow}>
                      <Clock size={18} color="#FF2D92" />
                      <Text style={styles.dateTimeText}>
                        {selectedAppointment.time} ({selectedAppointment.duration})
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Contact Information</Text>
                  <View style={styles.contactCard}>
                    <View style={styles.contactRow}>
                      <User size={18} color="#8E8E93" />
                      <Text style={styles.contactText}>{selectedAppointment.customerName}</Text>
                    </View>
                    <View style={styles.contactRow}>
                      <Phone size={18} color="#8E8E93" />
                      <Text style={styles.contactText}>{selectedAppointment.customerPhone}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Meeting Type</Text>
                  <View style={[styles.typeCard, { backgroundColor: getTypeColor(selectedAppointment.type) + '15' }]}>
                    <View style={styles.typeCardContent}>
                      {getTypeIcon(selectedAppointment.type)}
                      <Text style={[styles.typeCardText, { color: getTypeColor(selectedAppointment.type) }]}>
                        {selectedAppointment.type === 'in-person'
                          ? 'In-Person Meeting'
                          : selectedAppointment.type.charAt(0).toUpperCase() + selectedAppointment.type.slice(1) + ' Call'}
                      </Text>
                    </View>
                  </View>
                </View>

                {selectedAppointment.dealValue && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Deal Information</Text>
                    <View style={styles.dealCard}>
                      <Text style={styles.dealLabel}>Expected Deal Value</Text>
                      <Text style={styles.dealValue}>${selectedAppointment.dealValue.toLocaleString()}</Text>
                    </View>
                  </View>
                )}

                {selectedAppointment.notes && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Notes</Text>
                    <View style={styles.modalNotesCard}>
                      <Text style={styles.modalNotesText}>{selectedAppointment.notes}</Text>
                    </View>
                  </View>
                )}

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Reminders</Text>
                  <View style={styles.reminderCard}>
                    <Bell size={18} color={selectedAppointment.reminders ? '#34C759' : '#8E8E93'} />
                    <Text style={styles.reminderCardText}>
                      {selectedAppointment.reminders
                        ? 'Reminders enabled - You will be notified before the meeting'
                        : 'No reminders set'}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalActionsSection}>
                  <TouchableOpacity style={styles.primaryActionButton}>
                    <Phone size={20} color="#FFFFFF" />
                    <Text style={styles.primaryActionText}>Call Customer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.primaryActionButton, { backgroundColor: '#34C759' }]}>
                    {selectedAppointment.type === 'video' ? (
                      <Video size={20} color="#FFFFFF" />
                    ) : (
                      <CheckCircle size={20} color="#FFFFFF" />
                    )}
                    <Text style={styles.primaryActionText}>
                      {selectedAppointment.type === 'video' ? 'Join Meeting' : 'Mark Complete'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          )}
        </Modal>

        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setShowAddModal(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Appointment</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Sales meeting, Demo call, etc."
                  placeholderTextColor="#8E8E93"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Customer Name</Text>
                <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor="#8E8E93" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Customer Phone</Text>
                <TextInput
                  style={styles.input}
                  placeholder="+1 (555) 123-4567"
                  placeholderTextColor="#8E8E93"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Date</Text>
                  <TextInput style={styles.input} placeholder="MM/DD/YYYY" placeholderTextColor="#8E8E93" />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Time</Text>
                  <TextInput style={styles.input} placeholder="10:00 AM" placeholderTextColor="#8E8E93" />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Duration</Text>
                <TextInput style={styles.input} placeholder="30 min" placeholderTextColor="#8E8E93" />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Meeting Type</Text>
                <View style={styles.typeOptions}>
                  <TouchableOpacity style={styles.typeOption}>
                    <Phone size={20} color="#007AFF" />
                    <Text style={styles.typeOptionText}>Phone</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.typeOption}>
                    <Video size={20} color="#5AC8FA" />
                    <Text style={styles.typeOptionText}>Video</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.typeOption}>
                    <MapPin size={20} color="#FF9500" />
                    <Text style={styles.typeOptionText}>In-Person</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Notes (Optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Add any relevant notes..."
                  placeholderTextColor="#8E8E93"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity style={styles.createButton}>
                <CheckCircle size={20} color="#FFFFFF" />
                <Text style={styles.createButtonText}>Create Appointment</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  topSection: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1A1A1A',
  },
  viewModeSelector: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 4,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  viewModeButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: '#8E8E93',
  },
  viewModeTextActive: {
    color: '#FF2D92',
  },
  filtersRow: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginRight: 8,
  },
  filterChips: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#FF2D92',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: '#8E8E93',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700' as const,
  },
  statLabel: {
    fontSize: 11,
    color: '#8E8E93',
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  calendarSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarNavButton: {
    padding: 8,
  },
  calendarMonth: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1A1A1A',
  },
  appointmentsList: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 16,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  appointmentHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  typeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  appointmentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  customerText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  appointmentDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  dealValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0FFF0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  dealValueLabel: {
    fontSize: 14,
    color: '#34C759',
  },
  dealValueText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#34C759',
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  reminderText: {
    fontSize: 13,
    color: '#FF9500',
  },
  notesPreview: {
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#8E8E93',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 13,
    color: '#1A1A1A',
    lineHeight: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#1A1A1A',
  },
  modalHeaderActions: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  modalHeaderButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  modalAppointmentHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
  },
  modalTypeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalAppointmentTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  modalStatusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  modalStatusText: {
    fontSize: 13,
    fontWeight: '600' as const,
    textTransform: 'capitalize' as const,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 12,
  },
  dateTimeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dateTimeText: {
    fontSize: 15,
    color: '#1A1A1A',
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 15,
    color: '#1A1A1A',
  },
  typeCard: {
    borderRadius: 12,
    padding: 16,
  },
  typeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  typeCardText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  dealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  dealLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  dealValue: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#34C759',
  },
  modalNotesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  modalNotesText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1A1A1A',
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  reminderCardText: {
    flex: 1,
    fontSize: 15,
    color: '#1A1A1A',
  },
  modalActionsSection: {
    gap: 12,
    marginBottom: 24,
  },
  primaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#1A1A1A',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
  },
  typeOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  typeOption: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    gap: 8,
  },
  typeOptionText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FF2D92',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
});
