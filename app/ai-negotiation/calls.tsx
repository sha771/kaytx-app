 
import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  Switch,
  Alert,
} from 'react-native';
import {
  Phone,
  PhoneCall,
  PhoneIncoming,
  Search,
  Clock,
  DollarSign,
  Play,
  Pause,
  X,
  User,
  Building2,
  CircleCheck,
  Signal,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';
import { mockNegotiationCalls } from '@/utils/mockNegotiationData';
import type { NegotiationCall } from '@/types/negotiation';
import { useRealtimeCalls } from '@/utils/realtimeCallingService';
import { trpc } from '@/lib/trpc';

const { width } = Dimensions.get('window');

type Channel = 'voice' | 'whatsapp' | 'sms';

type CallQueueItem = {
  id: string;
  customer: string;
  eta: string;
  dealValue: number;
  channel: Channel;
  priority: 'high' | 'medium' | 'low';
};

type BridgeStatus = {
  id: string;
  label: string;
  status: 'operational' | 'scaling' | 'degraded';
  latency: string;
  color: string;
};

export default function CallsScreen() {
  const { theme } = useTheme();
  // tRPC data fetching
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'negotiation' });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ category: 'negotiation', limit: 10 });
  const { data: metricsData } = trpc.calling.getCallMetrics.useQuery();
  const { activeCalls, metrics: realtimeMetrics, initiateCall, endCall, defaultPhoneNumber } = useRealtimeCalls();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'completed' | 'scheduled'>('all');
  const [showCallModal, setShowCallModal] = useState<boolean>(false);
  const [selectedCall, setSelectedCall] = useState<NegotiationCall | null>(null);
  const [channelFilter, setChannelFilter] = useState<'all' | Channel>('all');
  const [autoDialerEnabled, setAutoDialerEnabled] = useState<boolean>(true);
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>(defaultPhoneNumber);
  const [dealValue, setDealValue] = useState<string>('');

  const callsWithChannels = useMemo(() =>
    mockNegotiationCalls.map((call, index) => {
      const channel: Channel = index % 3 === 0 ? 'voice' : index % 3 === 1 ? 'whatsapp' : 'sms';
      return { ...call, channel };
    }),
    []);

  const stats = useMemo(
    () => [
      { 
        title: 'Active Calls', 
        value: (realtimeMetrics.activeCalls + (statsData?.activeConnections || 0)).toString(), 
        icon: PhoneCall, 
        color: '#34C759' 
      },
      { 
        title: 'Today', 
        value: (metricsData?.totalCalls || realtimeMetrics.totalCalls).toString(), 
        icon: PhoneIncoming, 
        color: '#007AFF' 
      },
      { 
        title: 'Avg Duration', 
        value: metricsData?.avgDuration || `${Math.floor(realtimeMetrics.avgDuration / 60)}:${(realtimeMetrics.avgDuration % 60).toString().padStart(2, '0')}`, 
        icon: Clock, 
        color: '#FF9500' 
      },
      { 
        title: 'Success Rate', 
        value: `${statsData?.avgSuccessRate || realtimeMetrics.successRate}%`, 
        icon: CircleCheck, 
        color: '#AF52DE' 
      },
    ],
    [realtimeMetrics, statsData, metricsData],
  );

  const liveQueue = useMemo<CallQueueItem[]>(
    () => [
      { id: 'lq-1', customer: 'Helena @ Northwind', eta: '00:42', dealValue: 185000, channel: 'voice', priority: 'high' },
      { id: 'lq-2', customer: 'Amir @ Nova', eta: '02:15', dealValue: 72000, channel: 'whatsapp', priority: 'medium' },
      { id: 'lq-3', customer: 'Kira @ Finch', eta: '05:30', dealValue: 54000, channel: 'sms', priority: 'low' },
    ],
    [],
  );

  const bridgeStatuses = useMemo<BridgeStatus[]>(
    () => [
      { id: 'bridge-voice', label: 'Voice SIP Grid', status: 'operational', latency: '74ms', color: '#007AFF' },
      { id: 'bridge-wa', label: 'WhatsApp Meta BSP', status: 'scaling', latency: '108ms', color: '#25D366' },
      { id: 'bridge-sms', label: 'SMS Direct', status: 'operational', latency: '62ms', color: '#FF9500' },
    ],
    [],
  );

  const filteredCalls = useMemo(() => {
    return callsWithChannels.filter(call => {
      const matchesSearch =
        call.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.customerCompany.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || call.status === selectedStatus;
      const matchesChannel = channelFilter === 'all' || call.channel === channelFilter;
      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [callsWithChannels, searchQuery, selectedStatus, channelFilter]);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'active':
        return '#34C759';
      case 'completed':
        return '#007AFF';
      case 'scheduled':
        return '#FF9500';
      default:
        return '#8E8E93';
    }
  }, []);

  const getPriorityColor = useCallback((priority: string) => {
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
  }, []);

  const handleCallPress = useCallback((call: NegotiationCall) => {
    console.log('[CallsScreen] open call details', call.id);
    setSelectedCall(call);
  }, []);

  const toggleAutoDialer = useCallback(() => {
    setAutoDialerEnabled(prev => {
      const next = !prev;
      console.log('[CallsScreen] auto dialer toggled', next);
      return next;
    });
  }, []);

  const handleStartCall = useCallback(() => {
    const name = customerName || 'Customer';
    const phone = phoneNumber || defaultPhoneNumber;
    console.log('[CallsScreen] starting call', { name, phone });
    initiateCall(phone, name, 'voice');
    setShowCallModal(false);
    setCustomerName('');
    setPhoneNumber(defaultPhoneNumber);
    setDealValue('');
  }, [customerName, phoneNumber, defaultPhoneNumber, initiateCall]);

  const handleEndCall = useCallback((callId: string) => {
    console.log('[CallsScreen] ending call', callId);
    endCall(callId);
  }, [endCall]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Calls',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Negotiation Calls</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Orchestrate phone, WhatsApp, and SMS negotiations</Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <View key={stat.title} style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <Icon size={20} color={stat.color} />
                </View>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
                <Text style={[styles.statTitle, { color: theme.colors.secondaryText }]}>{stat.title}</Text>
              </View>
            );
          })}
        </View>

        <View style={[styles.autopilotCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View>
            <Text style={[styles.autopilotTitle, { color: theme.colors.text }]}>AI Auto-dialer</Text>
            <Text style={[styles.autopilotSubtitle, { color: theme.colors.secondaryText }]}>Routes inbound to AI closer + human pods with WhatsApp fallback</Text>
          </View>
          <Switch value={autoDialerEnabled} onValueChange={toggleAutoDialer} trackColor={{ false: '#767577', true: theme.colors.primary }} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.queueScroll}
          testID="live-queue"
        >
          {liveQueue.map(item => (
            <View key={item.id} style={[styles.queueCard, { backgroundColor: theme.colors.cardBackground }]}
            >
              <Text style={[styles.queueCustomer, { color: theme.colors.text }]}>{item.customer}</Text>
              <Text style={[styles.queueEta, { color: theme.colors.secondaryText }]}>ETA {item.eta}</Text>
              <Text style={[styles.queueValue, { color: theme.colors.text }]}>${(item.dealValue / 1000).toFixed(0)}K</Text>
              <View style={styles.queueMetaRow}>
                <View style={[styles.channelPill, { backgroundColor: item.channel === 'voice' ? '#007AFF20' : item.channel === 'whatsapp' ? '#25D36620' : '#FF950020' }]}>
                  <Text style={{ color: item.channel === 'voice' ? '#007AFF' : item.channel === 'whatsapp' ? '#25D366' : '#FF9500', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' }}>{item.channel}</Text>
                </View>
                <View style={[styles.channelPill, { backgroundColor: `${getPriorityColor(item.priority)}20` }]}>
                  <Text style={{ color: getPriorityColor(item.priority), fontSize: 11, fontWeight: '700' }}>{item.priority}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bridgeScroll}
          testID="bridge-health"
        >
          {bridgeStatuses.map(bridge => (
            <View key={bridge.id} style={[styles.bridgeCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={[styles.bridgeIcon, { backgroundColor: `${bridge.color}20` }]}>
                <Signal size={18} color={bridge.color} />
              </View>
              <Text style={[styles.bridgeLabel, { color: theme.colors.text }]}>{bridge.label}</Text>
              <Text style={[styles.bridgeStatus, { color: bridge.status === 'operational' ? '#34C759' : bridge.status === 'scaling' ? '#FF9500' : '#FF3B30' }]}> {bridge.status.toUpperCase()}</Text>
              <Text style={[styles.bridgeMeta, { color: theme.colors.secondaryText }]}>Latency {bridge.latency}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search calls..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={[styles.newCallButton, { backgroundColor: theme.colors.primary }]} onPress={() => setShowCallModal(true)}>
            <Phone size={20} color="white" />
            <Text style={styles.newCallText}>New Call</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.channelFilterRow}
          testID="call-channel-filters"
        >
          {(['all', 'voice', 'whatsapp', 'sms'] as const).map(filter => (
            <TouchableOpacity
              key={Filter}
              style={[styles.channelFilterChip, channelFilter === Filter && { backgroundColor: theme.colors.primary }]}
              onPress={() => setChannelFilter(Filter)}
            >
              <Text style={[styles.channelFilterText, { color: channelFilter === Filter ? '#fff' : theme.colors.secondaryText }]}>
                {Filter.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.filterContainer}>
          {(['all', 'active', 'completed', 'scheduled'] as const).map(status => (
            <TouchableOpacity
              key={status}
              style={[styles.filterButton, selectedStatus === status && { backgroundColor: theme.colors.primary }, selectedStatus !== status && { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => setSelectedStatus(status)}
            >
              <Text style={[styles.filterText, { color: selectedStatus === status ? 'white' : theme.colors.secondaryText }]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.callsContainer}>
          {activeCalls.map(activeCall => (
            <View
              key={activeCall.id}
              style={[styles.callCard, { backgroundColor: theme.colors.cardBackground }]}
              testID={`active-call-${activeCall.id}`}
            >
              <View style={styles.callHeader}>
                <View style={styles.callLeft}>
                  <View style={[styles.statusBadge, { backgroundColor: '#34C75920' }]}>
                    <View style={[styles.statusDot, { backgroundColor: '#34C759' }]} />
                    <Text style={[styles.statusText, { color: '#34C759' }]}>{activeCall.status}</Text>
                  </View>
                  <View style={[styles.channelPill, { backgroundColor: '#007AFF20' }]}>
                    <Text style={[styles.channelText, { color: '#007AFF' }]}>{activeCall.channel}</Text>
                  </View>
                </View>
                <View style={[styles.liveBadge, { backgroundColor: '#FF3B3020' }]}>
                  <View style={styles.livePulse} />
                  <Text style={styles.liveText}>LIVE</Text>
                </View>
              </View>
              <View style={styles.customerInfo}>
                <View style={[styles.avatar, { backgroundColor: `${theme.colors.primary}20` }]}>
                  <Text style={[styles.avatarText, { color: theme.colors.primary }]}>{activeCall.customerName.charAt(0)}</Text>
                </View>
                <View style={styles.customerDetails}>
                  <Text style={[styles.customerName, { color: theme.colors.text }]}>{activeCall.customerName}</Text>
                  <Text style={[styles.companyName, { color: theme.colors.secondaryText }]}>{activeCall.phoneNumber}</Text>
                </View>
              </View>
              <View style={styles.callDetails}>
                <View style={styles.detailRow}>
                  <Clock size={16} color={theme.colors.primary} />
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Duration:</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>{Math.floor(activeCall.duration / 60)}:{(activeCall.duration % 60).toString().padStart(2, '0')}</Text>
                </View>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: '#FF3B3020' }]}
                  onPress={() => handleEndCall(activeCall.id)}
                  testID={`end-call-${activeCall.id}`}
                >
                  <Pause size={16} color="#FF3B30" />
                  <Text style={[styles.actionButtonText, { color: '#FF3B30' }]}>End Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {filteredCalls.map(call => (
            <TouchableOpacity
              key={call.id}
              style={[styles.callCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => handleCallPress(call)}
              testID={`live-call-${call.id}`}
            >
              <View style={styles.callHeader}>
                <View style={styles.callLeft}>
                  <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(call.status)}20` }]}>
                    <View style={[styles.statusDot, { backgroundColor: getStatusColor(call.status) }]} />
                    <Text style={[styles.statusText, { color: getStatusColor(call.status) }]}>{call.status}</Text>
                  </View>
                  <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(call.priority)}20` }]}>
                    <Text style={[styles.priorityText, { color: getPriorityColor(call.priority) }]}>{call.priority}</Text>
                  </View>
                  <View style={[styles.channelPill, { backgroundColor: call.channel === 'voice' ? '#007AFF20' : call.channel === 'whatsapp' ? '#25D36620' : '#FF950020' }]}>
                    <Text style={[styles.channelText, { color: call.channel === 'voice' ? '#007AFF' : call.channel === 'whatsapp' ? '#25D366' : '#FF9500' }]}>{call.channel}</Text>
                  </View>
                </View>
                {call.status === 'active' && (
                  <View style={[styles.liveBadge, { backgroundColor: '#FF3B3020' }]}>
                    <View style={styles.livePulse} />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                )}
              </View>

              <View style={styles.customerInfo}>
                <View style={[styles.avatar, { backgroundColor: `${theme.colors.primary}20` }]}>
                  <Text style={[styles.avatarText, { color: theme.colors.primary }]}>{call.customerName.charAt(0)}</Text>
                </View>
                <View style={styles.customerDetails}>
                  <Text style={[styles.customerName, { color: theme.colors.text }]}>{call.customerName}</Text>
                  <View style={styles.companyRow}>
                    <Building2 size={14} color={theme.colors.secondaryText} />
                    <Text style={[styles.companyName, { color: theme.colors.secondaryText }]}>{call.customerCompany}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.callDetails}>
                <View style={styles.detailRow}>
                  <DollarSign size={16} color={theme.colors.primary} />
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Deal Value:</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>${call.dealValue.toLocaleString()}</Text>
                </View>
                {call.duration && (
                  <View style={styles.detailRow}>
                    <Clock size={16} color={theme.colors.primary} />
                    <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Duration:</Text>
                    <Text style={[styles.detailValue, { color: theme.colors.text }]}>{call.duration}</Text>
                  </View>
                )}
                {call.assignedTo && (
                  <View style={styles.detailRow}>
                    <User size={16} color={theme.colors.primary} />
                    <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Assigned:</Text>
                    <Text style={[styles.detailValue, { color: theme.colors.text }]}>{call.assignedTo}</Text>
                  </View>
                )}
              </View>

              {call.tags && call.tags.length > 0 && (
                <View style={styles.tagsContainer}>
                  {call.tags.map(tag => (
                    <View key={tag} style={[styles.tag, { backgroundColor: theme.colors.background }]}>
                      <Text style={[styles.tagText, { color: theme.colors.primary }]}>{tag}</Text>
                    </View>
                  ))}
                </View>
              )}

              {call.status === 'active' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#34C75920' }]}
                    testID={`join-call-${call.id}`}
                    onPress={() => Alert.alert('Join Call', `Entering call session with ${call.customerName}...`)}
                  >
                    <Play size={16} color="#34C759" />
                    <Text style={[styles.actionButtonText, { color: '#34C759' }]}>Join</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#FF3B3020' }]}
                    onPress={() => handleEndCall(call.id)}
                  >
                    <Pause size={16} color="#FF3B30" />
                    <Text style={[styles.actionButtonText, { color: '#FF3B30' }]}>End</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal visible={showCallModal} transparent animationType="slide" onRequestClose={() => setShowCallModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}
            testID="new-call-modal"
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>New Call</Text>
              <TouchableOpacity onPress={() => setShowCallModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>Customer Name</Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                placeholder="Enter customer name"
                placeholderTextColor={theme.colors.secondaryText}
                value={customerName}
                onChangeText={setCustomerName}
              />

              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>Phone Number</Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                placeholder={defaultPhoneNumber}
                placeholderTextColor={theme.colors.secondaryText}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />

              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>Deal Value</Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                placeholder="$0"
                placeholderTextColor={theme.colors.secondaryText}
                keyboardType="numeric"
                value={dealValue}
                onChangeText={setDealValue}
              />

              <TouchableOpacity style={[styles.submitButton, { backgroundColor: theme.colors.primary }]} onPress={handleStartCall}>
                <PhoneCall size={20} color="white" />
                <Text style={styles.submitButtonText}>Start Call</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={!!selectedCall} transparent animationType="slide" onRequestClose={() => setSelectedCall(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.detailModalContent, { backgroundColor: theme.colors.background }]}
            testID="call-detail-modal"
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Call Detail</Text>
              <TouchableOpacity onPress={() => setSelectedCall(null)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            {selectedCall && (
              <ScrollView style={styles.modalBody}>
                <Text style={[styles.detailTitle, { color: theme.colors.text }]}>{selectedCall.customerName}</Text>
                <Text style={[styles.detailSubtitle, { color: theme.colors.secondaryText }]}>{selectedCall.customerCompany}</Text>
                <View style={styles.detailRowSplit}>
                  <Text style={[styles.detailValueMain, { color: theme.colors.text }]}>${selectedCall.dealValue.toLocaleString()}</Text>
                  <View style={[styles.channelPill, { backgroundColor: '#F2F2F7' }]}>
                    <Text style={{ color: '#007AFF', fontWeight: '700' }}>{selectedCall.status.toUpperCase()}</Text>
                  </View>
                </View>
                {selectedCall.tags && (
                  <View style={styles.detailChipsRow}>
                    {selectedCall.tags.map(tag => (
                      <View key={tag} style={[styles.tag, { backgroundColor: theme.colors.cardBackground }]}>
                        <Text style={[styles.tagText, { color: theme.colors.primary }]}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {selectedCall.notes && (
                  <View style={styles.detailSummaryCard}>
                    <Text style={[styles.detailSectionTitle, { color: theme.colors.text }]}>Notes</Text>
                    <Text style={[styles.detailSummaryText, { color: theme.colors.secondaryText }]}>{selectedCall.notes}</Text>
                  </View>
                )}
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
  content: {
    flex: 1,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
  },
  autopilotCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 18,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  autopilotTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  autopilotSubtitle: {
    fontSize: 13,
  },
  queueScroll: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  queueCard: {
    width: 200,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  queueCustomer: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  queueEta: {
    fontSize: 12,
    marginBottom: 8,
  },
  queueValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  queueMetaRow: {
    flexDirection: 'row',
    gap: 8,
  },
  bridgeScroll: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bridgeCard: {
    width: 200,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  bridgeIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  bridgeLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  bridgeStatus: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  bridgeMeta: {
    fontSize: 11,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  searchBox: {
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
  newCallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    marginTop: 12,
  },
  newCallText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  channelFilterRow: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  channelFilterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 12,
    backgroundColor: '#F2F2F7',
  },
  channelFilterText: {
    fontSize: 12,
    fontWeight: '700',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  callsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },
  callCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  callHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  callLeft: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  channelPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  channelText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FF3B30',
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  companyName: {
    fontSize: 14,
  },
  callDetails: {
    gap: 10,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
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
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  modalInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
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
  detailModalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    maxHeight: '90%',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  detailSubtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  detailRowSplit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailValueMain: {
    fontSize: 18,
    fontWeight: '700',
  },
  detailChipsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  detailSummaryCard: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#F2F2F7',
    marginBottom: 12,
  },
  detailSectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  detailSummaryText: {
    fontSize: 13,
    lineHeight: 18,
  },
});
