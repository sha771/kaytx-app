import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Modal,
  FlatList,
} from 'react-native';
import {
  Phone,
  Calendar,
  Clock,
  User,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Search,
  Filter,
  Plus,
  X,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Settings,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack, router } from 'expo-router';

interface Call {
  id: string;
  callerName: string;
  callerPhone: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration: string;
  timestamp: string;
  summary: string;
  status: 'completed' | 'scheduled' | 'missed';
  notes: string;
}

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  notes: string;
}

export default function AIReceptionistScreen() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'calls' | 'bookings' | 'settings'>('calls');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [autoAnswer, setAutoAnswer] = useState(true);
  const [autoBooking, setAutoBooking] = useState(true);
  const [businessHours, setBusinessHours] = useState(true);

  const [calls] = useState<Call[]>([
    {
      id: '1',
      callerName: 'John Smith',
      callerPhone: '+1 (555) 123-4567',
      type: 'incoming',
      duration: '5:23',
      timestamp: '10 minutes ago',
      summary: 'Customer inquired about enterprise pricing. Scheduled follow-up call for tomorrow at 2 PM. Interested in annual subscription with 20+ users.',
      status: 'completed',
      notes: 'High priority lead. Mentioned competitor comparison.',
    },
    {
      id: '2',
      callerName: 'Sarah Johnson',
      callerPhone: '+1 (555) 234-5678',
      type: 'incoming',
      duration: '3:45',
      timestamp: '1 hour ago',
      summary: 'Requested product demo. Booked appointment for Friday at 11 AM. Interested in integration capabilities with existing CRM.',
      status: 'completed',
      notes: 'Send demo preparation email.',
    },
    {
      id: '3',
      callerName: 'Mike Davis',
      callerPhone: '+1 (555) 345-6789',
      type: 'missed',
      duration: '0:00',
      timestamp: '2 hours ago',
      summary: 'Missed call. AI left voicemail with callback number and business hours. Customer can also book online.',
      status: 'missed',
      notes: 'Follow up required.',
    },
    {
      id: '4',
      callerName: 'Emily Brown',
      callerPhone: '+1 (555) 456-7890',
      type: 'incoming',
      duration: '7:12',
      timestamp: '3 hours ago',
      summary: 'Support inquiry about billing. Resolved issue with payment method. Customer satisfied with resolution.',
      status: 'completed',
      notes: 'Updated billing information in system.',
    },
  ]);

  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      customerName: 'John Smith',
      customerPhone: '+1 (555) 123-4567',
      service: 'Enterprise Consultation',
      date: 'Tomorrow',
      time: '2:00 PM',
      status: 'confirmed',
      notes: 'Prepare pricing deck and case studies',
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      customerPhone: '+1 (555) 234-5678',
      service: 'Product Demo',
      date: 'Friday',
      time: '11:00 AM',
      status: 'confirmed',
      notes: 'Setup demo environment with CRM integration',
    },
    {
      id: '3',
      customerName: 'Robert Wilson',
      customerPhone: '+1 (555) 567-8901',
      service: 'Technical Support',
      date: 'Today',
      time: '4:30 PM',
      status: 'pending',
      notes: 'API integration issues',
    },
  ]);

  const getCallIcon = (type: string) => {
    switch (type) {
      case 'incoming':
        return PhoneIncoming;
      case 'outgoing':
        return PhoneOutgoing;
      case 'missed':
        return PhoneMissed;
      default:
        return Phone;
    }
  };

  const getCallColor = (type: string) => {
    switch (type) {
      case 'incoming':
        return '#34C759';
      case 'outgoing':
        return '#007AFF';
      case 'missed':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const renderCalls = () => (
    <View style={styles.tabContent}>
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search calls..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.cardBackground }]}>
          <Filter size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={[styles.statsRow, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.statItem}>
          <PhoneIncoming size={20} color="#34C759" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>24</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Answered</Text>
        </View>
        <View style={styles.statItem}>
          <PhoneMissed size={20} color="#FF3B30" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>3</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Missed</Text>
        </View>
        <View style={styles.statItem}>
          <Clock size={20} color="#007AFF" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>4.5m</Text>
          <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Avg Duration</Text>
        </View>
      </View>

      <FlatList
        data={calls}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => {
          const CallIcon = getCallIcon(item.type);
          const callColor = getCallColor(item.type);

          return (
            <TouchableOpacity
              style={[styles.callCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => {
                setSelectedCall(item);
                setShowCallModal(true);
              }}
            >
              <View style={[styles.callIcon, { backgroundColor: `${callColor}20` }]}>
                <CallIcon size={20} color={callColor} />
              </View>
              <View style={styles.callInfo}>
                <View style={styles.callHeader}>
                  <Text style={[styles.callerName, { color: theme.colors.text }]}>
                    {item.callerName}
                  </Text>
                  <Text style={[styles.callTime, { color: theme.colors.secondaryText }]}>
                    {item.timestamp}
                  </Text>
                </View>
                <Text style={[styles.callerPhone, { color: theme.colors.secondaryText }]}>
                  {item.callerPhone}
                </Text>
                <Text
                  style={[styles.callSummary, { color: theme.colors.secondaryText }]}
                  numberOfLines={2}
                >
                  {item.summary}
                </Text>
                <View style={styles.callFooter}>
                  <View style={styles.callMeta}>
                    <Clock size={12} color={theme.colors.secondaryText} />
                    <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
                      {item.duration}
                    </Text>
                  </View>
                  {item.status === 'completed' && (
                    <View style={[styles.statusBadge, { backgroundColor: '#34C75920' }]}>
                      <CheckCircle size={12} color="#34C759" />
                      <Text style={[styles.statusText, { color: '#34C759' }]}>Completed</Text>
                    </View>
                  )}
                  {item.status === 'missed' && (
                    <View style={[styles.statusBadge, { backgroundColor: '#FF3B3020' }]}>
                      <XCircle size={12} color="#FF3B30" />
                      <Text style={[styles.statusText, { color: '#FF3B30' }]}>Missed</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  const renderBookings = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
      >
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>New Booking</Text>
      </TouchableOpacity>

      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={[styles.bookingCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.bookingHeader}>
              <View style={styles.bookingInfo}>
                <Text style={[styles.bookingCustomer, { color: theme.colors.text }]}>
                  {item.customerName}
                </Text>
                <Text style={[styles.bookingService, { color: theme.colors.secondaryText }]}>
                  {item.service}
                </Text>
              </View>
              <View
                style={[
                  styles.bookingStatusBadge,
                  {
                    backgroundColor:
                      item.status === 'confirmed'
                        ? '#34C75920'
                        : item.status === 'pending'
                        ? '#FF950020'
                        : '#FF3B3020',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.bookingStatusText,
                    {
                      color:
                        item.status === 'confirmed'
                          ? '#34C759'
                          : item.status === 'pending'
                          ? '#FF9500'
                          : '#FF3B30',
                    },
                  ]}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
            </View>

            <View style={styles.bookingDetails}>
              <View style={styles.bookingDetail}>
                <Calendar size={16} color={theme.colors.secondaryText} />
                <Text style={[styles.bookingDetailText, { color: theme.colors.text }]}>
                  {item.date}
                </Text>
              </View>
              <View style={styles.bookingDetail}>
                <Clock size={16} color={theme.colors.secondaryText} />
                <Text style={[styles.bookingDetailText, { color: theme.colors.text }]}>
                  {item.time}
                </Text>
              </View>
              <View style={styles.bookingDetail}>
                <Phone size={16} color={theme.colors.secondaryText} />
                <Text style={[styles.bookingDetailText, { color: theme.colors.text }]}>
                  {item.customerPhone}
                </Text>
              </View>
            </View>

            {item.notes && (
              <View style={[styles.notesBox, { backgroundColor: theme.colors.background }]}>
                <FileText size={14} color={theme.colors.primary} />
                <Text style={[styles.notesText, { color: theme.colors.secondaryText }]}>
                  {item.notes}
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );

  const renderSettings = () => (
    <View style={styles.tabContent}>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingsTitle, { color: theme.colors.text }]}>
          AI Receptionist Settings
        </Text>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Auto-answer Calls
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              AI will automatically answer incoming calls
            </Text>
          </View>
          <Switch
            value={autoAnswer}
            onValueChange={setAutoAnswer}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={autoAnswer ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Auto-booking
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Allow AI to schedule appointments automatically
            </Text>
          </View>
          <Switch
            value={autoBooking}
            onValueChange={setAutoBooking}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={autoBooking ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
              Business Hours Only
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
              Only answer calls during business hours
            </Text>
          </View>
          <Switch
            value={businessHours}
            onValueChange={setBusinessHours}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor={businessHours ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
        <AlertCircle size={24} color={theme.colors.primary} />
        <View style={styles.infoContent}>
          <Text style={[styles.infoTitle, { color: theme.colors.text }]}>
            How AI Receptionist Works
          </Text>
          <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
            • Answers calls professionally{'\n'}
            • Takes messages and notes{'\n'}
            • Schedules appointments{'\n'}
            • Provides business information{'\n'}
            • Summarizes all conversations{'\n'}
            • Routes urgent calls to staff
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'AI Receptionist',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: theme.colors.text }]}>AI Receptionist</Text>
            <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
              Automated call handling and booking management
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.configButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => router.push('/ai-agent/receptionist-config')}
          >
            <Settings size={20} color="white" />
            <Text style={styles.configButtonText}>Configure</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'calls' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('calls')}
        >
          <PhoneCall
            size={20}
            color={activeTab === 'calls' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'calls' ? theme.colors.primary : theme.colors.secondaryText },
            ]}
          >
            Calls
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'bookings' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('bookings')}
        >
          <Calendar
            size={20}
            color={activeTab === 'bookings' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'bookings' ? theme.colors.primary : theme.colors.secondaryText,
              },
            ]}
          >
            Bookings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'settings' && [styles.activeTab, { borderBottomColor: theme.colors.primary }],
          ]}
          onPress={() => setActiveTab('settings')}
        >
          <AlertCircle
            size={20}
            color={activeTab === 'settings' ? theme.colors.primary : theme.colors.secondaryText}
          />
          <Text
            style={[
              styles.tabText,
              {
                color:
                  activeTab === 'settings' ? theme.colors.primary : theme.colors.secondaryText,
              },
            ]}
          >
            Settings
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'calls' && renderCalls()}
        {activeTab === 'bookings' && renderBookings()}
        {activeTab === 'settings' && renderSettings()}
      </ScrollView>

      <Modal
        visible={showCallModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowCallModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Call Details</Text>
              <TouchableOpacity onPress={() => setShowCallModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            {selectedCall && (
              <ScrollView style={styles.modalBody}>
                <View style={styles.modalSection}>
                  <Text style={[styles.modalLabel, { color: theme.colors.secondaryText }]}>
                    Caller
                  </Text>
                  <Text style={[styles.modalValue, { color: theme.colors.text }]}>
                    {selectedCall.callerName}
                  </Text>
                  <Text style={[styles.modalSubValue, { color: theme.colors.secondaryText }]}>
                    {selectedCall.callerPhone}
                  </Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={[styles.modalLabel, { color: theme.colors.secondaryText }]}>
                    Call Summary
                  </Text>
                  <Text style={[styles.modalValue, { color: theme.colors.text }]}>
                    {selectedCall.summary}
                  </Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={[styles.modalLabel, { color: theme.colors.secondaryText }]}>
                    Notes
                  </Text>
                  <Text style={[styles.modalValue, { color: theme.colors.text }]}>
                    {selectedCall.notes}
                  </Text>
                </View>

                <View style={styles.modalMeta}>
                  <View style={styles.modalMetaItem}>
                    <Clock size={16} color={theme.colors.secondaryText} />
                    <Text style={[styles.modalMetaText, { color: theme.colors.secondaryText }]}>
                      Duration: {selectedCall.duration}
                    </Text>
                  </View>
                  <View style={styles.modalMetaItem}>
                    <Calendar size={16} color={theme.colors.secondaryText} />
                    <Text style={[styles.modalMetaText, { color: theme.colors.secondaryText }]}>
                      {selectedCall.timestamp}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            )}
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  configButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  configButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
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
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  callCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  callIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  callInfo: {
    flex: 1,
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  callerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  callTime: {
    fontSize: 12,
  },
  callerPhone: {
    fontSize: 13,
    marginBottom: 8,
  },
  callSummary: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  callFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  callMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bookingCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingCustomer: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookingService: {
    fontSize: 14,
  },
  bookingStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bookingStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookingDetails: {
    gap: 8,
    marginBottom: 12,
  },
  bookingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookingDetailText: {
    fontSize: 14,
  },
  notesBox: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  notesText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  settingsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  infoCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
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
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalSection: {
    marginBottom: 24,
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  modalValue: {
    fontSize: 16,
    lineHeight: 22,
  },
  modalSubValue: {
    fontSize: 14,
    marginTop: 4,
  },
  modalMeta: {
    gap: 12,
  },
  modalMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalMetaText: {
    fontSize: 14,
  },
});
