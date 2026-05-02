 
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  Phone,
  Plus,
  Search,
  MapPin,
  Globe,
  CircleCheck,
  Pencil,
  X,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  TrendingUp,
  Shield,
  Zap,
  ChartBar,
  Route,
  Mic,
  FileText,
  Lock,
  Network,
  Wifi,
  WifiOff,
  RefreshCw,
  MessageCircle,
  Video,
  Send,
  Smartphone,
  Headphones,
  Users,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';
import { trpc } from '@/lib/trpc';
import { realtimeCallingService } from '@/utils/realtimeCallingService';
import { useAuth } from '@/providers/AuthProvider';

const { width } = Dimensions.get('window');

interface PhoneNumber {
  id: string;
  number: string;
  type: 'local' | 'toll-free' | 'international' | 'whatsapp' | 'voip';
  country: string;
  region: string;
  status: 'active' | 'inactive';
  calls: { total: number; today: number };
  assignedTo?: string;
  forwardingEnabled: boolean;
  forwardTo?: string;
  poolId?: string;
  recordingEnabled: boolean;
  transcriptionEnabled: boolean;
  complianceMode: 'strict' | 'standard' | 'flexible';
  maxConcurrentCalls: number;
  currentCalls: number;
  routingStrategy: 'round-robin' | 'weighted' | 'failover' | 'geographic';
  healthStatus: 'healthy' | 'warning' | 'critical';
  uptime: number;
  avgResponseTime: number;
  provider?: string;
  isConnected: boolean;
  lastSync?: string;
  integrations?: string[];
  whatsappVerified?: boolean;
  voiceEnabled?: boolean;
  smsEnabled?: boolean;
  videoEnabled?: boolean;
}

export default function PhoneNumbersScreen() {
  const { theme } = useTheme();
  const { token, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showRoutingModal, setShowRoutingModal] = useState<boolean>(false);
  const [showProviderModal, setShowProviderModal] = useState<boolean>(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState<boolean>(false);

  // Provider connection state
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [provider, setProvider] = useState<'twilio' | 'vonage' | 'plivo' | 'bandwidth'>('twilio');
  const [accountSid, setAccountSid] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappBusinessId, setWhatsappBusinessId] = useState('');

  // Fetch real statistics from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'customer-experience' });
  const { data: phoneNumbersData, isLoading: phonesLoading, refetch: refetchPhones } = trpc.calling.getPhoneNumbers.useQuery();
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  // Mutations
  const connectPhoneMutation = trpc.calling.connectProvider.useMutation();
  const syncMutation = trpc.calling.syncPhoneNumbers.useMutation();

  // Mock phone numbers data (fallback when API returns empty)
  const phoneNumbers = useMemo<PhoneNumber[]>(() => [
    {
      id: '1',
      number: '+1 (555) 123-4567',
      type: 'local',
      country: 'United States',
      region: 'California',
      status: 'active',
      calls: { total: 1247, today: 23 },
      assignedTo: 'Sales Team',
      forwardingEnabled: true,
      forwardTo: '+1 (555) 987-6543',
      poolId: 'pool-1',
      recordingEnabled: true,
      transcriptionEnabled: true,
      complianceMode: 'strict',
      maxConcurrentCalls: 10,
      currentCalls: 3,
      routingStrategy: 'round-robin',
      healthStatus: 'healthy',
      uptime: 99.9,
      avgResponseTime: 1.2,
      provider: 'Twilio',
      isConnected: true,
      lastSync: '2 min ago',
      integrations: ['Voice', 'SMS', 'Recording'],
      voiceEnabled: true,
      smsEnabled: true,
      videoEnabled: false,
    },
    {
      id: '2',
      number: '+1 (800) 234-5678',
      type: 'toll-free',
      country: 'United States',
      region: 'Nationwide',
      status: 'active',
      calls: { total: 3421, today: 47 },
      assignedTo: 'Support Team',
      forwardingEnabled: false,
      poolId: 'pool-2',
      recordingEnabled: true,
      transcriptionEnabled: true,
      complianceMode: 'standard',
      maxConcurrentCalls: 25,
      currentCalls: 12,
      routingStrategy: 'weighted',
      healthStatus: 'healthy',
      uptime: 99.8,
      avgResponseTime: 0.8,
      provider: 'Vonage',
      isConnected: true,
      lastSync: '1 min ago',
      integrations: ['Voice', 'SMS', 'Video'],
      voiceEnabled: true,
      smsEnabled: true,
      videoEnabled: true,
    },
    {
      id: '3',
      number: '+1 555-2468 (WhatsApp)',
      type: 'whatsapp',
      country: 'United States',
      region: 'Nationwide',
      status: 'active',
      calls: { total: 2847, today: 89 },
      assignedTo: 'Customer Service',
      forwardingEnabled: false,
      recordingEnabled: true,
      transcriptionEnabled: true,
      complianceMode: 'standard',
      maxConcurrentCalls: 50,
      currentCalls: 8,
      routingStrategy: 'round-robin',
      healthStatus: 'healthy',
      uptime: 99.95,
      avgResponseTime: 0.5,
      provider: 'WhatsApp Business',
      isConnected: true,
      lastSync: '30 sec ago',
      integrations: ['Chat', 'Media', 'Status'],
      whatsappVerified: true,
      voiceEnabled: false,
      smsEnabled: false,
      videoEnabled: false,
    },
    {
      id: '4',
      number: 'sip:office@company.voip',
      type: 'voip',
      country: 'Cloud',
      region: 'Global',
      status: 'active',
      calls: { total: 1543, today: 34 },
      assignedTo: 'All Teams',
      forwardingEnabled: true,
      forwardTo: '+1 (555) 999-0000',
      recordingEnabled: true,
      transcriptionEnabled: true,
      complianceMode: 'flexible',
      maxConcurrentCalls: 100,
      currentCalls: 5,
      routingStrategy: 'geographic',
      healthStatus: 'healthy',
      uptime: 99.99,
      avgResponseTime: 0.3,
      provider: 'VoIP Gateway',
      isConnected: true,
      lastSync: '10 sec ago',
      integrations: ['Voice', 'Video', 'Conferencing'],
      voiceEnabled: true,
      smsEnabled: false,
      videoEnabled: true,
    },
  ], []);

  const isEnterprise = useMemo(() => {
    return subscription?.plan === 'enterprise' || subscription?.plan === 'professional';
  }, [subscription]);

  const phoneNumbersList = useMemo(() => {
    return phoneNumbersData || phoneNumbers;
  }, [phoneNumbersData, phoneNumbers]);

  const statsMetrics = useMemo(() => {
    if (statsData) {
      return [
        { title: 'Total Numbers', value: phoneNumbersList.length.toString(), icon: Phone, color: '#007AFF', bgColor: '#007AFF15' },
        { title: 'Active Lines', value: phoneNumbersList.filter((n: PhoneNumber) => n.status === 'active').length.toString(), icon: CircleCheck, color: '#34C759', bgColor: '#34C75915' },
        { title: 'Calls Today', value: statsData.tasksToday.toString(), icon: PhoneIncoming, color: '#FF9500', bgColor: '#FF950015' },
        { title: 'WhatsApp', value: phoneNumbersList.filter((n: PhoneNumber) => n.type === 'whatsapp').length.toString(), icon: MessageCircle, color: '#25D366', bgColor: '#25D36615' },
        { title: 'Capacity', value: `${statsData.avgHealthScore}%`, icon: ChartBar, color: '#AF52DE', bgColor: '#AF52DE15' },
        { title: 'Avg Response', value: '1.8s', icon: Zap, color: '#32ADE6', bgColor: '#32ADE615' },
        { title: 'Call Quality', value: `${statsData.avgSuccessRate}%`, icon: Shield, color: '#5856D6', bgColor: '#5856D615' },
        { title: 'Uptime', value: '99.9%', icon: TrendingUp, color: '#34C759', bgColor: '#34C75915' },
      ];
    }
    return [
      { title: 'Total Numbers', value: '47', icon: Phone, color: '#007AFF', bgColor: '#007AFF15' },
      { title: 'Active Lines', value: '42', icon: CircleCheck, color: '#34C759', bgColor: '#34C75915' },
      { title: 'Calls Today', value: '1,847', icon: PhoneIncoming, color: '#FF9500', bgColor: '#FF950015' },
      { title: 'WhatsApp', value: '12', icon: MessageCircle, color: '#25D366', bgColor: '#25D36615' },
      { title: 'Capacity', value: '94%', icon: ChartBar, color: '#AF52DE', bgColor: '#AF52DE15' },
      { title: 'Avg Response', value: '1.8s', icon: Zap, color: '#32ADE6', bgColor: '#32ADE615' },
      { title: 'Call Quality', value: '99.7%', icon: Shield, color: '#5856D6', bgColor: '#5856D615' },
      { title: 'Uptime', value: '99.9%', icon: TrendingUp, color: '#34C759', bgColor: '#34C75915' },
    ];
  }, [statsData, phoneNumbersList]);

  const handleConnectProvider = async () => {
    setIsConnecting(true);
    try {
      await connectPhoneMutation.mutateAsync({
        platformId: provider,
        platformName: provider.charAt(0).toUpperCase() + provider.slice(1),
        email: accountSid || apiKey,
        password: authToken || apiSecret,
      });
      setShowProviderModal(false);
      setAccountSid('');
      setAuthToken('');
      setApiKey('');
      setApiSecret('');
      refetchPhones();
    } catch (error) {
      console.error('Failed to connect provider:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectWhatsApp = async () => {
    setIsConnecting(true);
    try {
      await connectPhoneMutation.mutateAsync({
        platformId: 'whatsapp',
        platformName: 'WhatsApp',
        email: whatsappBusinessId,
        password: whatsappNumber,
      });
      setShowWhatsAppModal(false);
      setWhatsappNumber('');
      setWhatsappBusinessId('');
      refetchPhones();
    } catch (error) {
      console.error('Failed to connect WhatsApp:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSyncNumbers = async () => {
    setIsSyncing(true);
    try {
      await syncMutation.mutateAsync({ platformId: 'phone-system' });
      refetchPhones();
    } catch (error) {
      console.error('Failed to sync numbers:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setWsConnected(false);
      return;
    }

    if (Platform.OS === 'web') {
      setWsConnected(false);
      return;
    }

    realtimeCallingService.connect(token, user?.organizationId);
    const unsubscribeConn = realtimeCallingService.subscribeToConnection(setWsConnected);
    const unsubscribeEvents = realtimeCallingService.subscribeToEvents((frame) => {
      if (frame.type === 'event' && frame.event.channel === 'phone-status') {
        refetchPhones();
      }
    });

    return () => {
      unsubscribeConn();
      unsubscribeEvents();
    };
  }, [token, user?.organizationId, refetchPhones]);

  const filteredNumbers = phoneNumbers.filter((num: PhoneNumber) => {
    const matchesSearch = num.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      num.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || num.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'local':
        return '#007AFF';
      case 'toll-free':
        return '#34C759';
      case 'international':
        return '#AF52DE';
      case 'whatsapp':
        return '#25D366';
      case 'voip':
        return '#FF9500';
      default:
        return '#8E8E93';
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return '#34C759';
      case 'warning':
        return '#FF9500';
      case 'critical':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'whatsapp':
        return MessageCircle;
      case 'voip':
        return Headphones;
      default:
        return Phone;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Phone Numbers',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 8, marginRight: 8 }}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setShowWhatsAppModal(true)}
              >
                <MessageCircle size={20} color="#25D366" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setShowProviderModal(true)}
              >
                <Plus size={20} color={theme.colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleSyncNumbers}
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <ActivityIndicator size="small" color={theme.colors.primary} />
                ) : (
                  <RefreshCw size={20} color={theme.colors.primary} />
                )}
              </TouchableOpacity>
              <View style={[styles.wsIndicator, { backgroundColor: wsConnected ? '#34C75920' : '#FF3B3020' }]}>
                {wsConnected ? (
                  <Wifi size={16} color="#34C759" />
                ) : (
                  <WifiOff size={16} color="#FF3B30" />
                )}
              </View>
            </View>
          ),
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Enterprise Phone System</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Real-time phone, WhatsApp & VoIP integration
          </Text>
        </View>

        <View style={styles.statsGrid}>
          {statsMetrics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <View
                key={index}
                style={[styles.statCard, { backgroundColor: theme.colors.cardBackground }]}
              >
                <View style={[styles.statIcon, { backgroundColor: stat.bgColor }]}>
                  <Icon size={20} color={stat.color} strokeWidth={2.5} />
                </View>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
                <Text style={[styles.statTitle, { color: theme.colors.secondaryText }]}>
                  {stat.title}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search numbers..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => setShowAddModal(true)}
          >
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          {(['all', 'active', 'inactive'] as const).map(filter => (
            <TouchableOpacity
              key={Filter}
              style={[
                styles.filterButton,
                selectedFilter === Filter && { backgroundColor: theme.colors.primary },
                selectedFilter !== Filter && { backgroundColor: theme.colors.cardBackground },
              ]}
              onPress={() => setSelectedFilter(Filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: selectedFilter === Filter ? 'white' : theme.colors.secondaryText },
                ]}
              >
                {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.numbersContainer}>
          {phoneNumbersList.map((number: PhoneNumber) => {
            const TypeIcon = getTypeIcon(number.type);
            return (
              <View
                key={number.id}
                style={[styles.numberCard, { backgroundColor: theme.colors.cardBackground }]}
              >
                <View style={styles.numberHeader}>
                  <View style={styles.numberLeft}>
                    <View
                      style={[
                        styles.typeBadge,
                        { backgroundColor: `${getTypeColor(number.type)}20` },
                      ]}
                    >
                      <TypeIcon size={14} color={getTypeColor(number.type)} />
                      <Text style={[styles.typeText, { color: getTypeColor(number.type) }]}>
                        {number.type.replace('-', ' ')}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            number.status === 'active' ? '#34C75920' : '#8E8E9320',
                        },
                      ]}
                    >
                      <View
                        style={[
                          styles.statusDot,
                          {
                            backgroundColor:
                              number.status === 'active' ? '#34C759' : '#8E8E93',
                          },
                        ]}
                      />
                      <Text
                        style={[
                          styles.statusText,
                          {
                            color: number.status === 'active' ? '#34C759' : '#8E8E93',
                          },
                        ]}
                      >
                        {number.status}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.healthBadge,
                        { backgroundColor: `${getHealthColor(number.healthStatus)}20` },
                      ]}
                    >
                      <View
                        style={[
                          styles.healthDot,
                          { backgroundColor: getHealthColor(number.healthStatus) },
                        ]}
                      />
                    </View>
                  </View>
                  <TouchableOpacity style={styles.actionButton}>
                    <Pencil size={18} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                </View>

                {number.provider && (
                  <View style={styles.providerRow}>
                    <Network size={14} color={theme.colors.primary} />
                    <Text style={[styles.providerText, { color: theme.colors.primary }]}>
                      {number.provider}
                    </Text>
                    {number.isConnected ? (
                      <View style={styles.connectedBadge}>
                        <View style={[styles.connectedDot, { backgroundColor: '#34C759' }]} />
                        <Text style={[styles.connectedText, { color: '#34C759' }]}>Connected</Text>
                      </View>
                    ) : (
                      <View style={[styles.connectedBadge, { backgroundColor: '#FF3B3020' }]}>
                        <View style={[styles.connectedDot, { backgroundColor: '#FF3B30' }]} />
                        <Text style={[styles.connectedText, { color: '#FF3B30' }]}>Disconnected</Text>
                      </View>
                    )}
                    {number.lastSync && (
                      <Text style={[styles.syncText, { color: theme.colors.secondaryText }]}>
                        • Synced {number.lastSync}
                      </Text>
                    )}
                  </View>
                )}

                {number.whatsappVerified && (
                  <View style={[styles.whatsappBanner, { backgroundColor: '#25D36620' }]}>
                    <MessageCircle size={14} color="#25D366" />
                    <Text style={[styles.whatsappText, { color: '#25D366' }]}>
                      WhatsApp Business Verified
                    </Text>
                    <CircleCheck size={14} color="#25D366" />
                  </View>
                )}

                <Text style={[styles.numberText, { color: theme.colors.text }]}>
                  {number.number}
                </Text>

                <View style={styles.numberDetails}>
                  <View style={styles.detailRow}>
                    <Globe size={14} color={theme.colors.secondaryText} />
                    <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
                      {number.country}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MapPin size={14} color={theme.colors.secondaryText} />
                    <Text style={[styles.detailText, { color: theme.colors.secondaryText }]}>
                      {number.region}
                    </Text>
                  </View>
                </View>

                {number.assignedTo && (
                  <View style={styles.assignedContainer}>
                    <Text style={[styles.assignedLabel, { color: theme.colors.secondaryText }]}>
                      Assigned to:
                    </Text>
                    <Text style={[styles.assignedValue, { color: theme.colors.text }]}>
                      {number.assignedTo}
                    </Text>
                  </View>
                )}

                {number.integrations && number.integrations.length > 0 && (
                  <View style={styles.integrationsRow}>
                    {number.integrations.map((integration: string, idx: number) => (
                      <View
                        key={idx}
                        style={[styles.integrationBadge, { backgroundColor: theme.colors.background }]}
                      >
                        <CircleCheck size={10} color="#34C759" />
                        <Text style={[styles.integrationText, { color: theme.colors.text }]}>
                          {integration}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.performanceRow}>
                  <View style={styles.performanceItem}>
                    <TrendingUp size={14} color="#34C759" />
                    <Text style={[styles.performanceLabel, { color: theme.colors.secondaryText }]}>
                      Uptime:
                    </Text>
                    <Text style={[styles.performanceValue, { color: '#34C759' }]}>
                      {number.uptime}%
                    </Text>
                  </View>
                  <View style={styles.performanceItem}>
                    <Zap size={14} color="#FF9500" />
                    <Text style={[styles.performanceLabel, { color: theme.colors.secondaryText }]}>
                      Response:
                    </Text>
                    <Text style={[styles.performanceValue, { color: theme.colors.text }]}>
                      {number.avgResponseTime}s
                    </Text>
                  </View>
                </View>

                <View style={styles.capacityRow}>
                  <Text style={[styles.capacityLabel, { color: theme.colors.secondaryText }]}>
                    Capacity: {number.currentCalls}/{number.maxConcurrentCalls} active
                  </Text>
                  <View style={[styles.capacityBar, { backgroundColor: `${theme.colors.text}10` }]}>
                    <View
                      style={[
                        styles.capacityFill,
                        {
                          backgroundColor: theme.colors.primary,
                          width: `${(number.currentCalls / number.maxConcurrentCalls) * 100}%`,
                        },
                      ]}
                    />
                  </View>
                </View>

                <View style={styles.callsContainer}>
                  <View style={styles.callStat}>
                    <PhoneCall size={16} color={theme.colors.primary} />
                    <Text style={[styles.callStatValue, { color: theme.colors.text }]}>
                      {number.calls.total}
                    </Text>
                    <Text style={[styles.callStatLabel, { color: theme.colors.secondaryText }]}>
                      Total
                    </Text>
                  </View>
                  <View style={styles.callStat}>
                    <PhoneIncoming size={16} color="#34C759" />
                    <Text style={[styles.callStatValue, { color: theme.colors.text }]}>
                      {number.calls.today}
                    </Text>
                    <Text style={[styles.callStatLabel, { color: theme.colors.secondaryText }]}>
                      Today
                    </Text>
                  </View>
                </View>

                <View style={styles.featuresRow}>
                  {number.recordingEnabled && (
                    <View style={[styles.featureBadge, { backgroundColor: '#007AFF20' }]}>
                      <Mic size={12} color="#007AFF" />
                      <Text style={[styles.featureText, { color: '#007AFF' }]}>Recording</Text>
                    </View>
                  )}
                  {number.transcriptionEnabled && (
                    <View style={[styles.featureBadge, { backgroundColor: '#AF52DE20' }]}>
                      <FileText size={12} color="#AF52DE" />
                      <Text style={[styles.featureText, { color: '#AF52DE' }]}>Transcription</Text>
                    </View>
                  )}
                  <View
                    style={[
                      styles.featureBadge,
                      { backgroundColor: number.complianceMode === 'strict' ? '#FF3B3020' : '#34C75920' },
                    ]}
                  >
                    <Lock size={12} color={number.complianceMode === 'strict' ? '#FF3B30' : '#34C759'} />
                    <Text
                      style={[
                        styles.featureText,
                        { color: number.complianceMode === 'strict' ? '#FF3B30' : '#34C759' },
                      ]}
                    >
                      {number.complianceMode}
                    </Text>
                  </View>
                </View>

                {number.forwardingEnabled && (
                  <View style={[styles.forwardingBanner, { backgroundColor: '#007AFF20' }]}>
                    <PhoneOutgoing size={14} color="#007AFF" />
                    <Text style={[styles.forwardingText, { color: '#007AFF' }]}>
                      Forwarding to {number.forwardTo}
                    </Text>
                  </View>
                )}

                <View style={[styles.routingBanner, { backgroundColor: theme.colors.background }]}>
                  <Route size={14} color={theme.colors.primary} />
                  <Text style={[styles.routingText, { color: theme.colors.primary }]}>
                    Strategy: {number.routingStrategy}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <Modal
        visible={showWhatsAppModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWhatsAppModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <MessageCircle size={24} color="#25D366" />
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                  Connect WhatsApp Business
                </Text>
              </View>
              <TouchableOpacity onPress={() => setShowWhatsAppModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={[styles.infoCard, { backgroundColor: '#25D36620' }]}>
                <MessageCircle size={24} color="#25D366" />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoTitle, { color: theme.colors.text }]}>
                    WhatsApp Business API
                  </Text>
                  <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
                    Connect your WhatsApp Business account for real-time messaging, media sharing, and status updates
                  </Text>
                </View>
              </View>

              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                WhatsApp Business Phone Number
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
                ]}
                placeholder="+1 555 123 4567"
                placeholderTextColor={theme.colors.secondaryText}
                value={whatsappNumber}
                onChangeText={setWhatsappNumber}
                autoCapitalize="none"
                keyboardType="phone-pad"
              />

              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                WhatsApp Business Account ID
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
                ]}
                placeholder="Your WhatsApp Business Account ID"
                placeholderTextColor={theme.colors.secondaryText}
                value={whatsappBusinessId}
                onChangeText={setWhatsappBusinessId}
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  { backgroundColor: '#25D366', opacity: isConnecting ? 0.6 : 1 },
                ]}
                onPress={handleConnectWhatsApp}
                disabled={isConnecting}
              >
                <MessageCircle size={20} color="white" />
                <Text style={styles.submitButtonText}>
                  {isConnecting ? 'Connecting...' : 'Connect WhatsApp'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showProviderModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowProviderModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Connect Phone Provider
              </Text>
              <TouchableOpacity onPress={() => setShowProviderModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                Select Provider
              </Text>
              <View style={styles.providerButtons}>
                {(['twilio', 'vonage', 'plivo', 'bandwidth'] as const).map(p => (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.providerButton,
                      {
                        backgroundColor: provider === p ? theme.colors.primary : theme.colors.cardBackground,
                        borderWidth: provider === p ? 2 : 0,
                        borderColor: provider === p ? theme.colors.primary : 'transparent',
                      },
                    ]}
                    onPress={() => setProvider(p)}
                  >
                    <Text
                      style={[
                        styles.providerButtonText,
                        { color: provider === p ? 'white' : theme.colors.text },
                      ]}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {provider === 'twilio' && (
                <>
                  <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                    Account SID
                  </Text>
                  <TextInput
                    style={[
                      styles.modalInput,
                      { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
                    ]}
                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    placeholderTextColor={theme.colors.secondaryText}
                    value={accountSid}
                    onChangeText={setAccountSid}
                    autoCapitalize="none"
                  />

                  <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                    Auth Token
                  </Text>
                  <TextInput
                    style={[
                      styles.modalInput,
                      { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
                    ]}
                    placeholder="Your Twilio auth token"
                    placeholderTextColor={theme.colors.secondaryText}
                    value={authToken}
                    onChangeText={setAuthToken}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </>
              )}

              {(provider === 'vonage' || provider === 'plivo' || provider === 'bandwidth') && (
                <>
                  <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                    API Key
                  </Text>
                  <TextInput
                    style={[
                      styles.modalInput,
                      { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
                    ]}
                    placeholder="Your API key"
                    placeholderTextColor={theme.colors.secondaryText}
                    value={apiKey}
                    onChangeText={setApiKey}
                    autoCapitalize="none"
                  />

                  <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                    API Secret
                  </Text>
                  <TextInput
                    style={[
                      styles.modalInput,
                      { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
                    ]}
                    placeholder="Your API secret"
                    placeholderTextColor={theme.colors.secondaryText}
                    value={apiSecret}
                    onChangeText={setApiSecret}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </>
              )}

              <View style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
                <Network size={24} color={theme.colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoTitle, { color: theme.colors.text }]}>
                    Real-Time Integration
                  </Text>
                  <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>
                    Your phone numbers will sync automatically and receive real-time call updates via WebSocket connection.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  { backgroundColor: theme.colors.primary, opacity: isConnecting ? 0.6 : 1 },
                ]}
                onPress={handleConnectProvider}
                disabled={isConnecting}
              >
                <Text style={styles.submitButtonText}>
                  {isConnecting ? 'Connecting...' : 'Connect Provider'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Purchase Phone Number
              </Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                Number Type
              </Text>
              <View style={styles.typeButtons}>
                {(['local', 'toll-free', 'international'] as const).map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeButton,
                      { backgroundColor: theme.colors.cardBackground },
                    ]}
                  >
                    <Text style={[styles.typeButtonText, { color: theme.colors.text }]}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>Country</Text>
              <TextInput
                style={[
                  styles.modalInput,
                  { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
                ]}
                placeholder="Select country"
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>Region</Text>
              <TextInput
                style={[
                  styles.modalInput,
                  { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
                ]}
                placeholder="Select region"
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>
                Max Concurrent Calls
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  { backgroundColor: theme.colors.cardBackground, color: theme.colors.text },
                ]}
                placeholder="10"
                placeholderTextColor={theme.colors.secondaryText}
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.submitButtonText}>Purchase Number</Text>
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
  headerButton: {
    padding: 8,
  },
  wsIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: (width - 64) / 4,
    padding: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  searchBox: {
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
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  numbersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },
  numberCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  numberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  numberLeft: {
    flexDirection: 'row',
    gap: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase' as const,
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
    textTransform: 'capitalize' as const,
  },
  healthBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  actionButton: {
    padding: 8,
  },
  providerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  providerText: {
    fontSize: 13,
    fontWeight: '600',
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#34C75920',
  },
  connectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  connectedText: {
    fontSize: 10,
    fontWeight: '600',
  },
  syncText: {
    fontSize: 11,
  },
  whatsappBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  whatsappText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  numberText: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  numberDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
  },
  assignedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  assignedLabel: {
    fontSize: 13,
  },
  assignedValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  integrationsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  integrationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  integrationText: {
    fontSize: 11,
    fontWeight: '600',
  },
  performanceRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 12,
  },
  performanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  performanceLabel: {
    fontSize: 12,
  },
  performanceValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  capacityRow: {
    marginBottom: 12,
  },
  capacityLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  capacityBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden' as const,
  },
  capacityFill: {
    height: '100%',
    borderRadius: 3,
  },
  callsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  callStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  callStatValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  callStatLabel: {
    fontSize: 12,
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  featureText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize' as const,
  },
  forwardingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  forwardingText: {
    fontSize: 12,
    fontWeight: '600',
  },
  routingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
  routingText: {
    fontSize: 12,
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
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  typeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  typeButtonText: {
    fontSize: 13,
    fontWeight: '600',
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
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 14,
    gap: 12,
    marginBottom: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
  },
  providerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  providerButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  providerButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
