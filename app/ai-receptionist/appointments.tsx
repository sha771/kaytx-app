import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Video,
  MapPin,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Bell,
  ChevronRight,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';
import { mockReceptionistAppointments } from '@/utils/mockNegotiationData';

export default function ReceptionistAppointmentsScreen() {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const appointments = mockReceptionistAppointments;

  const upcomingAppointments = appointments.filter(apt => apt.status === 'scheduled');
  const todayAppointments = appointments.filter(apt => apt.date === new Date().toISOString().split('T')[0]);

  const getTypeIcon = (type: string) => {
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video':
        return '#007AFF';
      case 'phone':
        return '#34C759';
      case 'in-person':
        return '#FF9500';
      default:
        return '#8E8E93';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Appointments',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerRight: () => (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Plus size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Appointments</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            {upcomingAppointments.length} upcoming appointments
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statBox, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {todayAppointments.length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Today</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {appointments.filter(a => a.type === 'video').length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Video</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: theme.colors.cardBackground }]}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {appointments.filter(a => a.type === 'phone').length}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Phone</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Today</Text>
            <Text style={[styles.sectionCount, { color: theme.colors.secondaryText }]}>
              {todayAppointments.length} appointments
            </Text>
          </View>

          {todayAppointments.map(appointment => {
            const TypeIcon = getTypeIcon(appointment.type);
            const typeColor = getTypeColor(appointment.type);

            return (
              <TouchableOpacity
                key={appointment.id}
                style={[styles.appointmentCard, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => setSelectedAppointment(appointment)}
              >
                <View style={styles.appointmentLeft}>
                  <View style={[styles.typeIcon, { backgroundColor: `${typeColor}20` }]}>
                    <TypeIcon size={20} color={typeColor} />
                  </View>
                  <View style={styles.appointmentDetails}>
                    <Text style={[styles.appointmentTitle, { color: theme.colors.text }]}>
                      {appointment.title}
                    </Text>
                    <View style={styles.appointmentMeta}>
                      <User size={14} color={theme.colors.secondaryText} />
                      <Text style={[styles.appointmentMetaText, { color: theme.colors.secondaryText }]}>
                        {appointment.callerName}
                      </Text>
                    </View>
                    <View style={styles.appointmentMeta}>
                      <Clock size={14} color={theme.colors.secondaryText} />
                      <Text style={[styles.appointmentMetaText, { color: theme.colors.secondaryText }]}>
                        {appointment.time} • {appointment.duration}
                      </Text>
                    </View>
                  </View>
                </View>
                <ChevronRight size={20} color={theme.colors.secondaryText} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Upcoming</Text>

          {upcomingAppointments.map(appointment => {
            const TypeIcon = getTypeIcon(appointment.type);
            const typeColor = getTypeColor(appointment.type);

            return (
              <TouchableOpacity
                key={appointment.id}
                style={[styles.appointmentCard, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => setSelectedAppointment(appointment)}
              >
                <View style={styles.appointmentLeft}>
                  <View style={[styles.typeIcon, { backgroundColor: `${typeColor}20` }]}>
                    <TypeIcon size={20} color={typeColor} />
                  </View>
                  <View style={styles.appointmentDetails}>
                    <Text style={[styles.appointmentTitle, { color: theme.colors.text }]}>
                      {appointment.title}
                    </Text>
                    <View style={styles.appointmentMeta}>
                      <Calendar size={14} color={theme.colors.secondaryText} />
                      <Text style={[styles.appointmentMetaText, { color: theme.colors.secondaryText }]}>
                        {new Date(appointment.date).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.appointmentMeta}>
                      <Clock size={14} color={theme.colors.secondaryText} />
                      <Text style={[styles.appointmentMetaText, { color: theme.colors.secondaryText }]}>
                        {appointment.time} • {appointment.duration}
                      </Text>
                    </View>
                    {appointment.notes && (
                      <Text style={[styles.appointmentNotes, { color: theme.colors.secondaryText }]} numberOfLines={1}>
                        {appointment.notes}
                      </Text>
                    )}
                  </View>
                </View>
                {appointment.reminders && (
                  <Bell size={16} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>New Appointment</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Title</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                placeholder="Enter appointment title"
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Caller Name</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                placeholder="Enter caller name"
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Phone Number</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                placeholder="Enter phone number"
                placeholderTextColor={theme.colors.secondaryText}
                keyboardType="phone-pad"
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Date & Time</Text>
              <View style={styles.dateTimeRow}>
                <TextInput
                  style={[styles.dateInput, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor={theme.colors.secondaryText}
                />
                <TextInput
                  style={[styles.timeInput, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                  placeholder="HH:MM"
                  placeholderTextColor={theme.colors.secondaryText}
                />
              </View>

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Duration</Text>
              <TextInput
                style={[styles.input, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                placeholder="e.g., 30 min, 1 hour"
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Type</Text>
              <View style={styles.typeButtons}>
                <TouchableOpacity style={[styles.typeButton, { backgroundColor: theme.colors.primary }]}>
                  <Phone size={16} color="white" />
                  <Text style={styles.typeButtonText}>Phone</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.typeButton, { backgroundColor: theme.colors.cardBackground }]}>
                  <Video size={16} color={theme.colors.text} />
                  <Text style={[styles.typeButtonTextInactive, { color: theme.colors.text }]}>Video</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.typeButton, { backgroundColor: theme.colors.cardBackground }]}>
                  <MapPin size={16} color={theme.colors.text} />
                  <Text style={[styles.typeButtonTextInactive, { color: theme.colors.text }]}>In-Person</Text>
                </TouchableOpacity>
              </View>

              <Text style={[styles.inputLabel, { color: theme.colors.text }]}>Notes (Optional)</Text>
              <TextInput
                style={[styles.textArea, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                placeholder="Add notes for this appointment"
                placeholderTextColor={theme.colors.secondaryText}
                multiline
                numberOfLines={4}
              />

              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => setShowAddModal(false)}
              >
                <CheckCircle size={20} color="white" />
                <Text style={styles.submitButtonText}>Schedule Appointment</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  addButton: {
    padding: 8,
    marginRight: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statBox: {
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
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  sectionCount: {
    fontSize: 14,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  appointmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  appointmentMetaText: {
    fontSize: 13,
  },
  appointmentNotes: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    flex: 2,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
  },
  timeInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  typeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  typeButtonTextInactive: {
    fontSize: 14,
    fontWeight: '600',
  },
  textArea: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    gap: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
