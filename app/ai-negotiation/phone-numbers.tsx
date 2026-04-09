 
import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Switch,
} from 'react-native';
import {
  Phone,
  Plus,
  Search,
  CheckCircle,
  Edit,
  X,
  PhoneCall,
  PhoneIncoming,
  TrendingUp,
  BarChart2,
  Users,
  Settings as SettingsIcon,
  ShieldCheck,
  Globe,
  Link2,
  Wifi,
  AlertTriangle,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';
import { mockPhoneNumbers } from '@/utils/mockNegotiationData';
import type { PhoneNumber } from '@/types/negotiation';

type RoutingProfile = {
  id: string;
  name: string;
  destinations: string[];
  utilization: number;
  failover: string;
  compliance: string;
};

type CarrierIntegration = {
  id: string;
  name: string;
  status: 'operational' | 'scheduled' | 'attention';
  vendor: string;
  latency: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
};

export default function PhoneNumbersScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [whatsappConnected, setWhatsappConnected] = useState<boolean>(true);
  const [selectedProfile, setSelectedProfile] = useState<RoutingProfile | null>(null);

  const stats = useMemo(
    () => [
      {
        title: 'Total Numbers',
        value: mockPhoneNumbers.length.toString(),
        icon: Phone,
        color: '#007AFF',
      },
      {
        title: 'Active',
        value: mockPhoneNumbers.filter(n => n.isActive).length.toString(),
        icon: CheckCircle,
        color: '#34C759',
      },
      {
        title: 'Calls Today',
        value: '127',
        icon: PhoneIncoming,
        color: '#FF9500',
      },
      {
        title: 'Avg Success',
        value: '74%',
        icon: TrendingUp,
        color: '#AF52DE',
      },
    ],
    [],
  );

  const carrierIntegrations = useMemo<CarrierIntegration[]>(
    () => [
      {
        id: 'twilio',
        name: 'Twilio Super Network',
        status: 'operational',
        vendor: 'Voice + WhatsApp',
        latency: '92ms',
        icon: Phone,
        color: '#34C759',
      },
      {
        id: 'meta',
        name: 'WhatsApp Business',
        status: whatsappConnected ? 'operational' : 'attention',
        vendor: 'Meta verified',
        latency: '108ms',
        icon: Link2,
        color: '#FF9500',
      },
      {
        id: 'sip',
        name: 'Direct SIP Grid',
        status: 'scheduled',
        vendor: '7 regional POPs',
        latency: '74ms',
        icon: Wifi,
        color: '#007AFF',
      },
    ],
    [whatsappConnected],
  );

  const routingProfiles = useMemo<RoutingProfile[]>(
    () => [
      {
        id: 'profile-enterprise',
        name: 'Enterprise Voice Blend',
        destinations: ['Tier-1 sales pod', 'WhatsApp concierge', 'AI receptionist'],
        utilization: 82,
        failover: 'SIP core > WhatsApp > Voicemail AI',
        compliance: 'PCI ready',
      },
      {
        id: 'profile-startup',
        name: 'Startup Autopilot',
        destinations: ['AI closer', 'SMS assist', 'Live agent backup'],
        utilization: 61,
        failover: 'AI > SMS > Agent queue',
        compliance: 'GDPR',
      },
      {
        id: 'profile-emea',
        name: 'EMEA Federated',
        destinations: ['UK edge', 'WhatsApp verified senders', 'Paris pod'],
        utilization: 48,
        failover: 'Edge > Direct SIP',
        compliance: 'ISO 27001',
      },
    ],
    [],
  );

  const utilizationBands = useMemo(
    () => [
      { region: 'North America', utilization: 87, failover: 'Chicago edge live' },
      { region: 'EMEA', utilization: 63, failover: 'Frankfurt hot standby' },
      { region: 'APAC', utilization: 54, failover: 'Singapore auto-scale' },
    ],
    [],
  );

  const filteredNumbers = useMemo(() => {
    return mockPhoneNumbers.filter(num => {
      const matchesSearch =
        num.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        num.label.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        selectedFilter === 'all' ||
        (selectedFilter === 'active' && num.isActive) ||
        (selectedFilter === 'inactive' && !num.isActive);
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, selectedFilter]);

  const getTypeColor = useCallback((type: string) => {
    switch (type) {
      case 'local':
        return '#007AFF';
      case 'toll-free':
        return '#34C759';
      case 'international':
        return '#AF52DE';
      default:
        return '#8E8E93';
    }
  }, []);

  const handleSyncCarrier = useCallback((integration: CarrierIntegration) => {
    console.log('[PhoneNumbers] syncing carrier', integration.id);
  }, []);

  const handleProfilePress = useCallback((profile: RoutingProfile) => {
    console.log('[PhoneNumbers] open routing profile', profile.id);
    setSelectedProfile(profile);
  }, []);

  const handleTestRoute = useCallback((number: PhoneNumber) => {
    console.log('[PhoneNumbers] run test call', number.id);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Phone Numbers',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Phone Numbers</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Enterprise-grade telephony fabric with WhatsApp + SIP connectivity</Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => {
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

        <View style={styles.searchContainer}>
          <View style={[styles.searchBox, { backgroundColor: theme.colors.cardBackground }]}
            testID="phone-search"
          >
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
              key={filter}
              style={[styles.filterButton, selectedFilter === filter && { backgroundColor: theme.colors.primary }, selectedFilter !== filter && { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[styles.filterText, { color: selectedFilter === filter ? 'white' : theme.colors.secondaryText }]}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.connectivitySection}
          testID="connectivity-fabric"
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Connectivity Fabric</Text>
            <TouchableOpacity style={styles.inlineButton}>
              <SettingsIcon size={16} color={theme.colors.primary} />
              <Text style={[styles.inlineButtonText, { color: theme.colors.primary }]}>Policies</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {carrierIntegrations.map(integration => {
              const Icon = integration.icon;
              return (
                <View
                  key={integration.id}
                  style={[styles.integrationCard, { backgroundColor: theme.colors.cardBackground }]}
                >
                  <View style={[styles.integrationIcon, { backgroundColor: `${integration.color}20` }]}> 
                    <Icon size={20} color={integration.color} />
                  </View>
                  <Text style={[styles.integrationName, { color: theme.colors.text }]}>{integration.name}</Text>
                  <Text style={[styles.integrationVendor, { color: theme.colors.secondaryText }]}>{integration.vendor}</Text>
                  <Text style={[styles.integrationLatency, { color: integration.color }]}>Latency {integration.latency}</Text>
                  <TouchableOpacity
                    style={styles.integrationAction}
                    onPress={() => handleSyncCarrier(integration)}
                    testID={`carrier-sync-${integration.id}`}
                  >
                    <Text style={[styles.integrationActionText, { color: theme.colors.primary }]}>Sync</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={[styles.utilizationCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeaderCompact}>
            <Text style={[styles.sectionTitleSmall, { color: theme.colors.text }]}>Edge Utilization</Text>
            <ShieldCheck size={18} color={theme.colors.primary} />
          </View>
          {utilizationBands.map(band => (
            <View key={band.region} style={styles.utilizationRow}>
              <View style={styles.utilizationLabelRow}>
                <Globe size={14} color={theme.colors.secondaryText} />
                <Text style={[styles.utilizationRegion, { color: theme.colors.secondaryText }]}>{band.region}</Text>
              </View>
              <View style={styles.utilizationBarBackground}
                testID={`utilization-${band.region}`}
              >
                <View style={[styles.utilizationBarFill, { width: `${band.utilization}%`, backgroundColor: theme.colors.primary }]} />
              </View>
              <Text style={[styles.utilizationValue, { color: theme.colors.text }]}>{band.utilization}%</Text>
              <Text style={[styles.utilizationFailover, { color: '#34C759' }]}>{band.failover}</Text>
            </View>
          ))}
        </View>

        <View style={styles.routingSection}
          testID="routing-profiles"
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Routing Profiles</Text>
            <TouchableOpacity style={styles.inlineButton}>
              <Link2 size={16} color={theme.colors.primary} />
              <Text style={[styles.inlineButtonText, { color: theme.colors.primary }]}>Provision</Text>
            </TouchableOpacity>
          </View>
          {routingProfiles.map(profile => (
            <View key={profile.id} style={[styles.profileCard, { backgroundColor: theme.colors.cardBackground }]}
              testID={`routing-profile-${profile.id}`}
            >
              <View style={styles.profileHeader}>
                <View>
                  <Text style={[styles.profileName, { color: theme.colors.text }]}>{profile.name}</Text>
                  <Text style={[styles.profileMeta, { color: theme.colors.secondaryText }]}>{profile.failover}</Text>
                </View>
                <TouchableOpacity onPress={() => handleProfilePress(profile)}>
                  <Text style={[styles.profileAction, { color: theme.colors.primary }]}>View</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.destinationsRow}>
                {profile.destinations.map(dest => (
                  <View key={dest} style={[styles.destinationBadge, { backgroundColor: theme.colors.background }]}> 
                    <Text style={[styles.destinationText, { color: theme.colors.primary }]}>{dest}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.profileUtilizationRow}>
                <Text style={[styles.profileUtilizationLabel, { color: theme.colors.secondaryText }]}>Utilization</Text>
                <View style={styles.utilizationBarBackgroundSmall}>
                  <View style={[styles.utilizationBarFill, { width: `${profile.utilization}%`, backgroundColor: '#34C759' }]} />
                </View>
                <Text style={[styles.profileUtilizationValue, { color: theme.colors.text }]}>{profile.utilization}%</Text>
                <Text style={[styles.profileCompliance, { color: '#FF9500' }]}>{profile.compliance}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.channelCard, { backgroundColor: theme.colors.cardBackground }]}
          testID="whatsapp-connect"
        >
          <View style={styles.channelHeader}>
            <View>
              <Text style={[styles.channelTitle, { color: theme.colors.text }]}>WhatsApp + Voice Bridge</Text>
              <Text style={[styles.channelSubtitle, { color: theme.colors.secondaryText }]}>Verified Meta BSP with multi-agent routing</Text>
            </View>
            <Switch
              value={whatsappConnected}
              onValueChange={() => setWhatsappConnected(prev => {
                const next = !prev;
                console.log('[PhoneNumbers] whatsapp toggle', next);
                return next;
              })}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
            />
          </View>
          <View style={styles.channelStatsRow}>
            <View style={styles.channelStat}>
              <Text style={[styles.channelStatValue, { color: theme.colors.text }]}>12</Text>
              <Text style={[styles.channelStatLabel, { color: theme.colors.secondaryText }]}>WhatsApp IDs</Text>
            </View>
            <View style={styles.channelStat}>
              <Text style={[styles.channelStatValue, { color: theme.colors.text }]}>3</Text>
              <Text style={[styles.channelStatLabel, { color: theme.colors.secondaryText }]}>Failover tiers</Text>
            </View>
            <View style={styles.channelStatAlert}>
              <AlertTriangle size={16} color="#FF3B30" />
              <Text style={[styles.channelAlertText, { color: '#FF3B30' }]}>1 template expiring</Text>
            </View>
          </View>
        </View>

        <View style={styles.numbersContainer}>
          {filteredNumbers.map(number => (
            <TouchableOpacity
              key={number.id}
              style={[styles.numberCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => {
                setSelectedNumber(number);
                setShowDetailsModal(true);
              }}
            >
              <View style={styles.numberHeader}>
                <View style={styles.numberLeft}>
                  <View style={[styles.typeBadge, { backgroundColor: `${getTypeColor(number.type)}20` }]}> 
                    <Text style={[styles.typeText, { color: getTypeColor(number.type) }]}>{number.type.replace('-', ' ')}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: number.isActive ? '#34C75920' : '#8E8E9320' }]}
                    testID={`number-status-${number.id}`}
                  >
                    <View style={[styles.statusDot, { backgroundColor: number.isActive ? '#34C759' : '#8E8E93' }]} />
                    <Text style={[styles.statusText, { color: number.isActive ? '#34C759' : '#8E8E93' }]}>{number.isActive ? 'active' : 'inactive'}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                  <Edit size={18} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              </View>

              <Text style={[styles.labelText, { color: theme.colors.secondaryText }]}>{number.label}</Text>
              <Text style={[styles.numberText, { color: theme.colors.text }]}>{number.number}</Text>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <PhoneCall size={16} color={theme.colors.primary} />
                  <Text style={[styles.statItemValue, { color: theme.colors.text }]}>{number.callsHandled}</Text>
                  <Text style={[styles.statItemLabel, { color: theme.colors.secondaryText }]}>Calls</Text>
                </View>
                <View style={styles.statItem}>
                  <BarChart2 size={16} color="#34C759" />
                  <Text style={[styles.statItemValue, { color: theme.colors.text }]}>{number.successRate}%</Text>
                  <Text style={[styles.statItemLabel, { color: theme.colors.secondaryText }]}>Success</Text>
                </View>
                <TouchableOpacity
                  style={styles.testButton}
                  onPress={() => handleTestRoute(number)}
                  testID={`test-call-${number.id}`}
                >
                  <Text style={[styles.testButtonText, { color: theme.colors.primary }]}>Test route</Text>
                </TouchableOpacity>
              </View>

              {number.assignedAgents && number.assignedAgents.length > 0 && (
                <View style={[styles.agentsContainer, { backgroundColor: theme.colors.background }]}
                  testID={`number-agents-${number.id}`}
                >
                  <Users size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.agentsText, { color: theme.colors.secondaryText }]}>{number.assignedAgents.join(', ')}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal visible={showAddModal} transparent animationType="slide" onRequestClose={() => setShowAddModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Add Phone Number</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>Number Label</Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                placeholder="e.g., Sales Line"
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>Number Type</Text>
              <View style={styles.typeButtons}>
                {(['local', 'toll-free', 'international'] as const).map(type => (
                  <TouchableOpacity key={type} style={[styles.typeButton, { backgroundColor: theme.colors.cardBackground }]}>
                    <Text style={[styles.typeButtonText, { color: theme.colors.text }]}>{type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.modalLabel, { color: theme.colors.text }]}>Country</Text>
              <TextInput
                style={[styles.modalInput, { backgroundColor: theme.colors.cardBackground, color: theme.colors.text }]}
                placeholder="Select country"
                placeholderTextColor={theme.colors.secondaryText}
              />

              <TouchableOpacity style={[styles.submitButton, { backgroundColor: theme.colors.primary }]} onPress={() => setShowAddModal(false)}>
                <Text style={styles.submitButtonText}>Purchase Number</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showDetailsModal} transparent animationType="slide" onRequestClose={() => setShowDetailsModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Number Details</Text>
              <TouchableOpacity onPress={() => setShowDetailsModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            {selectedNumber && (
              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}
                testID="number-details"
              >
                <View style={styles.detailSection}>
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Number</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>{selectedNumber.number}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Label</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>{selectedNumber.label}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Type</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>{selectedNumber.type.replace('-', ' ').toUpperCase()}</Text>
                </View>

                <View style={styles.detailSection}>
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Status</Text>
                    <Switch
                      value={selectedNumber.isActive}
                      trackColor={{ false: '#767577', true: theme.colors.primary }}
                      thumbColor={selectedNumber.isActive ? '#fff' : '#f4f3f4'}
                    />
                  </View>
                </View>

                <View style={[styles.statsCard, { backgroundColor: theme.colors.cardBackground }]}
                  testID="number-performance-card"
                >
                  <Text style={[styles.statsCardTitle, { color: theme.colors.text }]}>Performance</Text>
                  <View style={styles.statsCardGrid}>
                    <View style={styles.statsCardItem}>
                      <Text style={[styles.statsCardValue, { color: theme.colors.text }]}>{selectedNumber.callsHandled}</Text>
                      <Text style={[styles.statsCardLabel, { color: theme.colors.secondaryText }]}>Total Calls</Text>
                    </View>
                    <View style={styles.statsCardItem}>
                      <Text style={[styles.statsCardValue, { color: '#34C759' }]}>{selectedNumber.successRate}%</Text>
                      <Text style={[styles.statsCardLabel, { color: theme.colors.secondaryText }]}>Success Rate</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={[styles.dangerButton, { backgroundColor: '#FF3B3020' }]} onPress={() => setShowDetailsModal(false)}>
                  <Text style={[styles.dangerButtonText, { color: '#FF3B30' }]}>Delete Number</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <Modal visible={!!selectedProfile} transparent animationType="slide" onRequestClose={() => setSelectedProfile(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}
            testID="routing-profile-modal"
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Routing Profile</Text>
              <TouchableOpacity onPress={() => setSelectedProfile(null)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            {selectedProfile && (
              <ScrollView style={styles.modalBody}>
                <Text style={[styles.modalProfileName, { color: theme.colors.text }]}>{selectedProfile.name}</Text>
                <Text style={[styles.modalProfileMeta, { color: theme.colors.secondaryText }]}>{selectedProfile.failover}</Text>
                <View style={styles.destinationsList}>
                  {selectedProfile.destinations.map(dest => (
                    <View key={dest} style={[styles.destinationBadge, { backgroundColor: theme.colors.cardBackground }]}
                      testID={`profile-destination-${dest}`}
                    >
                      <Text style={[styles.destinationText, { color: theme.colors.primary }]}>{dest}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.profileUtilizationRow}>
                  <Text style={[styles.profileUtilizationLabel, { color: theme.colors.secondaryText }]}>Utilization</Text>
                  <View style={styles.utilizationBarBackgroundSmall}>
                    <View style={[styles.utilizationBarFill, { width: `${selectedProfile.utilization}%`, backgroundColor: theme.colors.primary }]} />
                  </View>
                  <Text style={[styles.profileUtilizationValue, { color: theme.colors.text }]}>{selectedProfile.utilization}%</Text>
                </View>
                <View style={styles.modalComplianceRow}>
                  <ShieldCheck size={18} color={theme.colors.primary} />
                  <Text style={[styles.modalComplianceText, { color: theme.colors.text }]}>{selectedProfile.compliance} ready</Text>
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
    width: '47%',
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
  connectivitySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  inlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  inlineButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  integrationCard: {
    width: 220,
    padding: 16,
    borderRadius: 18,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  integrationIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  integrationName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  integrationVendor: {
    fontSize: 12,
    marginBottom: 6,
  },
  integrationLatency: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
  },
  integrationAction: {
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECECEE',
  },
  integrationActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  utilizationCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 18,
    borderRadius: 18,
  },
  sectionHeaderCompact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleSmall: {
    fontSize: 16,
    fontWeight: '700',
  },
  utilizationRow: {
    marginBottom: 12,
  },
  utilizationLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  utilizationRegion: {
    fontSize: 13,
  },
  utilizationBarBackground: {
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
  },
  utilizationBarBackgroundSmall: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  utilizationBarFill: {
    height: '100%',
    borderRadius: 999,
  },
  utilizationValue: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 6,
  },
  utilizationFailover: {
    fontSize: 12,
    marginTop: 2,
  },
  routingSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  profileCard: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  profileMeta: {
    fontSize: 12,
  },
  profileAction: {
    fontSize: 14,
    fontWeight: '600',
  },
  destinationsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  destinationsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  destinationBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  destinationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  profileUtilizationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  profileUtilizationLabel: {
    fontSize: 12,
    width: 80,
  },
  profileUtilizationValue: {
    fontSize: 13,
    fontWeight: '700',
    marginHorizontal: 8,
  },
  profileCompliance: {
    fontSize: 12,
    fontWeight: '600',
  },
  channelCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 18,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  channelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  channelTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  channelSubtitle: {
    fontSize: 13,
  },
  channelStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  channelStat: {
    flex: 1,
  },
  channelStatValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  channelStatLabel: {
    fontSize: 12,
  },
  channelStatAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  channelAlertText: {
    fontSize: 12,
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
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
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
  actionButton: {
    padding: 8,
  },
  labelText: {
    fontSize: 13,
    marginBottom: 4,
  },
  numberText: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statItemValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statItemLabel: {
    fontSize: 12,
  },
  testButton: {
    marginLeft: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  testButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
  agentsText: {
    fontSize: 12,
    flex: 1,
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
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  detailSection: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  statsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  statsCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsCardGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  statsCardItem: {
    flex: 1,
    alignItems: 'center',
  },
  statsCardValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statsCardLabel: {
    fontSize: 12,
  },
  dangerButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalProfileName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalProfileMeta: {
    fontSize: 13,
    marginBottom: 12,
  },
  modalComplianceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  modalComplianceText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
