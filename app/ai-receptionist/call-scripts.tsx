 
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Plus,
  Search,
  PhoneCall,
  MessageCircle,
  Shield,
  Link2,
  Wifi,
  Copy,
  Pencil,
  Star,
  TrendingUp,
  Check,
  X,
  Radio,
  RefreshCw,
  Users,
  Lock,
} from 'lucide-react-native';
import { trpc } from '@/lib/trpc';
import { useTheme } from '@/providers/ThemeProvider';

type ChannelType = 'PSTN' | 'WhatsApp' | 'Direct Line' | 'Web Chat';
type ComplianceState = 'all' | 'approved' | 'review';

interface ScriptRecord {
  id: string;
  title: string;
  script: string;
  channel: ChannelType;
  phoneNumber: string;
  whatsappFallback: string;
  status: 'live' | 'pilot' | 'draft';
  escalationOwner: string;
  lastSynced: string;
  compliance: 'approved' | 'review';
  aiGuardrails: string[];
  successRate: number;
  timesUsed: number;
}

const channelColors: Record<ChannelType, string> = {
  PSTN: '#007AFF',
  WhatsApp: '#25D366',
  'Direct Line': '#FF9500',
  'Web Chat': '#AF52DE',
};

export default function ReceptionistCallScriptsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | 'all'>('all');
  const [complianceFilter, setComplianceFilter] = useState<ComplianceState>('all');
  const [selectedScript, setSelectedScript] = useState<ScriptRecord | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // Real tRPC data
  const { data: subscription } = trpc.user.getSubscription.useQuery();
  const isEnterprise = subscription?.plan === 'enterprise';

  const { data: scriptRecords = [], isLoading, refetch } = trpc.receptionist.getCallScripts.useQuery();
  
  const [endpoints, setEndpoints] = useState([
    {
      id: 'PSTN' as ChannelType,
      label: 'Carrier PSTN Edge',
      connected: true,
      description: '+1 and +44 pools provisioned',
    },
    {
      id: 'WhatsApp' as ChannelType,
      label: 'WhatsApp Business',
      connected: true,
      description: 'Meta BSP live, green tick verified',
    },
    {
      id: 'Direct Line' as ChannelType,
      label: 'SIP / Teams Direct Line',
      connected: false,
      description: 'Awaiting TLS mutual auth',
    },
    {
      id: 'Web Chat' as ChannelType,
      label: 'Web + In-app Chat',
      connected: true,
      description: 'SDK v3 embedded',
    },
  ]);

  const filteredScripts = useMemo(() => {
    return scriptRecords.filter(script => {
      const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesChannel = selectedChannel === 'all' || script.channel === selectedChannel;
      const matchesCompliance = complianceFilter === 'all' || script.compliance === complianceFilter;
      return matchesSearch && matchesChannel && matchesCompliance;
    });
  }, [scriptRecords, searchQuery, selectedChannel, complianceFilter]);

  const orchestrationStats = [
    { id: 'live', label: 'Live scripts', value: '18', delta: '+3 this week', icon: Radio },
    { id: 'coverage', label: 'Numbers covered', value: '42', delta: '12 WhatsApp queues', icon: PhoneCall },
    { id: 'whatsapp', label: 'WA engagements', value: '1.4k', delta: 'SLA 6m median', icon: MessageCircle },
    { id: 'quality', label: 'AI quality score', value: '96%', delta: 'Compliant in 4 regions', icon: Shield },
  ];

  const handleEndpointToggle = (id: ChannelType) => {
    setEndpoints(prev => prev.map(endpoint => {
      if (endpoint.id === id) {
        console.log('Endpoint toggled', id, !endpoint.connected);
        return { ...endpoint, connected: !endpoint.connected };
      }
      return endpoint;
    }));
  };

  const handleChannelChange = (channel: ChannelType | 'all') => {
    console.log('Channel Filter changed', channel);
    setSelectedChannel(channel);
  };

  const handleComplianceChange = (filter: ComplianceState) => {
    console.log('Compliance Filter changed', Filter);
    setComplianceFilter(Filter);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Call Scripts',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => setShowCreateModal(true)} style={styles.addButton} testID="receptionist-call-scripts-create-button">
              <Plus size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : (
            <>
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]} testID="receptionist-call-scripts-headline">Omni-channel playbooks</Text>
                <Text style={[styles.sectionSubtitle, { color: theme.colors.secondaryText }]}>Map scripts to live numbers, WhatsApp queues, and SIP trunks with per-channel guardrails.</Text>
              </View>

              <View style={styles.summaryRow}>
                {orchestrationStats.map(stat => {
                  const Icon = stat.icon;
                  return (
                    <View key={stat.id} style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]} testID={`receptionist-call-scripts-summary-${stat.id}`}>
                      {!isEnterprise && (
                        <View style={styles.lockOverlayMini}>
                          <Lock size={12} color="white" />
                        </View>
                      )}
                      <View style={styles.summaryIcon}>
                        <Icon size={18} color={theme.colors.primary} />
                      </View>
                      <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{stat.value}</Text>
                      <Text style={[styles.summaryLabel, { color: theme.colors.secondaryText }]}>{stat.label}</Text>
                      <Text style={[styles.summaryDelta, { color: theme.colors.primary }]}>{stat.delta}</Text>
                    </View>
                  );
                })}
              </View>

              <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
                {!isEnterprise && (
                  <TouchableOpacity 
                    style={styles.lockOverlay}
                    onPress={() => router.push('/enterprise-admin')}
                  >
                    <Lock size={24} color={theme.colors.text} />
                  </TouchableOpacity>
                )}
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Connected endpoints</Text>
                  <TouchableOpacity style={styles.refreshButton} onPress={() => refetch()} testID="receptionist-call-scripts-endpoint-sync">
                    <RefreshCw size={16} color={theme.colors.primary} />
                    <Text style={[styles.refreshText, { color: theme.colors.primary }]}>Sync registry</Text>
                  </TouchableOpacity>
                </View>
                {endpoints.map(endpoint => (
                  <View key={endpoint.id} style={styles.endpointRow}>
                    <View style={styles.endpointLeft}>
                      <View style={[styles.endpointIcon, { backgroundColor: `${channelColors[endpoint.id]}20` }]}> 
                        {endpoint.id === 'PSTN' && <PhoneCall size={18} color={channelColors[endpoint.id]} />}
                        {endpoint.id === 'WhatsApp' && <MessageCircle size={18} color={channelColors[endpoint.id]} />}
                        {endpoint.id === 'Direct Line' && <Link2 size={18} color={channelColors[endpoint.id]} />}
                        {endpoint.id === 'Web Chat' && <Wifi size={18} color={channelColors[endpoint.id]} />}
                      </View>
                      <View>
                        <Text style={[styles.endpointTitle, { color: theme.colors.text }]}>{endpoint.label}</Text>
                        <Text style={[styles.endpointDescription, { color: theme.colors.secondaryText }]}>{endpoint.description}</Text>
                      </View>
                    </View>
                    <Switch
                      value={endpoint.connected}
                      onValueChange={() => handleEndpointToggle(endpoint.id)}
                      trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                      thumbColor={endpoint.connected ? '#fff' : '#f4f3f4'}
                    />
                  </View>
                ))}
              </View>
            </>
          )}

          <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
            testID="receptionist-call-scripts-filters">
            <View style={styles.searchBar}>
              <Search size={18} color={theme.colors.secondaryText} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search title, number, or owner"
                placeholderTextColor={theme.colors.secondaryText}
                value={searchQuery}
                onChangeText={text => {
                  console.log('Search query', text);
                  setSearchQuery(text);
                }}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
              {(['all', 'PSTN', 'WhatsApp', 'Direct Line', 'Web Chat'] as const).map(channel => (
                <TouchableOpacity
                  key={channel}
                  style={[styles.filterChip, selectedChannel === channel && styles.filterChipActive]}
                  onPress={() => handleChannelChange(channel)}
                >
                  <Text style={[styles.filterChipText, { color: selectedChannel === channel ? '#fff' : theme.colors.text }]}>
                    {channel === 'all' ? 'All channels' : channel}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.complianceRow}>
              {(['all', 'approved', 'review'] as const).map(filter => (
                <TouchableOpacity
                  key={Funnel}
                  style={[styles.complianceChip, complianceFilter === Filter && styles.complianceChipActive]}
                  onPress={() => handleComplianceChange(Filter)}
                >
                  <Text style={[styles.complianceChipText, { color: complianceFilter === Filter ? '#fff' : theme.colors.secondaryText }]}>
                    {filter === 'all' ? 'All compliance' : Filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.scriptList}>
            {filteredScripts.map(script => (
              <TouchableOpacity
                key={script.id}
                style={[styles.scriptCard, { backgroundColor: theme.colors.cardBackground }]} 
                onPress={() => setSelectedScript(script)}
                testID={`receptionist-call-script-card-${script.id}`}
              >
                <View style={styles.scriptHeader}>
                  <View style={styles.channelBadge}>
                    <Text style={[styles.channelBadgeText, { color: channelColors[script.channel] }]}>{script.channel}</Text>
                  </View>
                  <View style={styles.scriptActions}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Copy script', script.id)}>
                      <Copy size={18} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Edit script', script.id)}>
                      <Pencil size={18} color={theme.colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={[styles.scriptTitle, { color: theme.colors.text }]}>{script.title}</Text>
                <Text style={[styles.scriptPreview, { color: theme.colors.secondaryText }]} numberOfLines={3}>{script.script}</Text>

                <View style={styles.scriptMetaRow}>
                  <View style={styles.metaPill}>
                    <PhoneCall size={14} color={theme.colors.primary} />
                    <Text style={[styles.metaText, { color: theme.colors.text }]}>{script.phoneNumber}</Text>
                  </View>
                  <View style={styles.metaPill}>
                    <MessageCircle size={14} color={channelColors.WhatsApp} />
                    <Text style={[styles.metaText, { color: theme.colors.text }]}>{script.whatsappFallback}</Text>
                  </View>
                </View>

                <View style={styles.scriptStats}>
                  <View style={styles.statRow}>
                    <Star size={14} color="#FFD700" />
                    <Text style={[styles.statText, { color: theme.colors.text }]}>{script.successRate}% success</Text>
                  </View>
                  <View style={styles.statRow}>
                    <TrendingUp size={14} color={theme.colors.success} />
                    <Text style={[styles.statText, { color: theme.colors.text }]}>{script.timesUsed} live calls</Text>
                  </View>
                  <View style={styles.statRow}>
                    <Shield size={14} color={theme.colors.warning} />
                    <Text style={[styles.statText, { color: theme.colors.text }]}>{script.compliance === 'approved' ? 'Approved' : 'Needs review'}</Text>
                  </View>
                </View>

                <View style={styles.guardrailRow}>
                  {script.aiGuardrails.map(rule => (
                    <View key={rule} style={styles.guardrailPill}>
                      <Text style={styles.guardrailText}>{rule}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.footerRow}>
                  <View>
                    <Text style={[styles.footerLabel, { color: theme.colors.secondaryText }]}>Escalation owner</Text>
                    <Text style={[styles.footerValue, { color: theme.colors.text }]}>{script.escalationOwner}</Text>
                  </View>
                  <View>
                    <Text style={[styles.footerLabel, { color: theme.colors.secondaryText }]}>Last synced</Text>
                    <Text style={[styles.footerValue, { color: theme.colors.text }]}>{script.lastSynced}</Text>
                  </View>
                  <View style={styles.quickActions}>
                    <TouchableOpacity style={styles.quickActionButton} onPress={() => console.log('Dial test call', script.phoneNumber)}>
                      <PhoneCall size={14} color={theme.colors.primary} />
                      <Text style={[styles.quickActionText, { color: theme.colors.primary }]}>Dial</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.quickActionButton} onPress={() => console.log('Open WhatsApp handoff', script.whatsappFallback)}>
                      <MessageCircle size={14} color={channelColors.WhatsApp} />
                      <Text style={[styles.quickActionText, { color: channelColors.WhatsApp }]}>WhatsApp</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal visible={selectedScript !== null} animationType="slide" transparent={false} onRequestClose={() => setSelectedScript(null)}>
          {selectedScript && (
            <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Script orchestration</Text>
                <TouchableOpacity onPress={() => setSelectedScript(null)}>
                  <X size={24} color={theme.colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                <View style={styles.modalMetaRow}>
                  <View style={styles.modalChannelBadge}>
                    <Text style={[styles.modalChannelText, { color: channelColors[selectedScript.channel] }]}>{selectedScript.channel}</Text>
                  </View>
                  <View style={styles.modalStatusPill}>
                    <Text style={[styles.modalStatusText, { color: theme.colors.text }]}>{selectedScript.status.toUpperCase()}</Text>
                  </View>
                </View>

                <Text style={[styles.modalScriptTitle, { color: theme.colors.text }]}>{selectedScript.title}</Text>
                <Text style={[styles.modalDescription, { color: theme.colors.secondaryText }]}>{selectedScript.script}</Text>

                <View style={styles.modalGrid}>
                  <View style={[styles.modalInfoCard, { backgroundColor: theme.colors.cardBackground }]}
                    testID="receptionist-call-scripts-modal-routing">
                    <Text style={[styles.modalInfoLabel, { color: theme.colors.secondaryText }]}>Primary number</Text>
                    <Text style={[styles.modalInfoValue, { color: theme.colors.text }]}>{selectedScript.phoneNumber}</Text>
                    <Text style={[styles.modalInfoHint, { color: theme.colors.secondaryText }]}>WhatsApp fallback {selectedScript.whatsappFallback}</Text>
                  </View>
                  <View style={[styles.modalInfoCard, { backgroundColor: theme.colors.cardBackground }]}
                    testID="receptionist-call-scripts-modal-quality">
                    <Text style={[styles.modalInfoLabel, { color: theme.colors.secondaryText }]}>Quality signals</Text>
                    <Text style={[styles.modalInfoValue, { color: theme.colors.success }]}>{selectedScript.successRate}%</Text>
                    <Text style={[styles.modalInfoHint, { color: theme.colors.secondaryText }]}>{selectedScript.timesUsed} live interactions</Text>
                  </View>
                </View>

                <View style={styles.modalGuardrailBox}>
                  <View style={styles.modalGuardrailHeader}>
                    <Shield size={20} color={theme.colors.primary} />
                    <Text style={[styles.modalGuardrailTitle, { color: theme.colors.text }]}>Guardrails & automation</Text>
                  </View>
                  {selectedScript.aiGuardrails.map(rule => (
                    <View key={rule} style={styles.modalGuardrailRow}>
                      <Check size={16} color={theme.colors.success} />
                      <Text style={[styles.modalGuardrailText, { color: theme.colors.text }]}>{rule}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]} onPress={() => console.log('Deploy script', selectedScript.id)}>
                    <Radio size={18} color="#fff" />
                    <Text style={styles.primaryButtonText}>Deploy to number</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.secondaryButton, { borderColor: theme.colors.primary }]} onPress={() => console.log('Share script', selectedScript.id)}>
                    <Users size={18} color={theme.colors.primary} />
                    <Text style={[styles.secondaryButtonText, { color: theme.colors.primary }]}>Share with team</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          )}
        </Modal>

        <Modal visible={showCreateModal} animationType="slide" transparent={false} onRequestClose={() => setShowCreateModal(false)}>
          <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Create script</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <Text style={[styles.formLabel, { color: theme.colors.text }]}>Script title</Text>
              <TextInput
                style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
                placeholder="Inbound triage - executive desk"
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.formLabel, { color: theme.colors.text }]}>Primary channel</Text>
              <View style={styles.channelGrid}>
                {(Object.keys(channelColors) as ChannelType[]).map(channel => (
                  <View key={channel} style={[styles.channelOption, { borderColor: channelColors[channel] }]}>
                    <Text style={[styles.channelOptionLabel, { color: channelColors[channel] }]}>{channel}</Text>
                  </View>
                ))}
              </View>

              <Text style={[styles.formLabel, { color: theme.colors.text }]}>Script body</Text>
              <TextInput
                style={[styles.input, styles.textArea, { color: theme.colors.text, borderColor: theme.colors.border }]}
                multiline
                numberOfLines={8}
                placeholder="Greeting, verification, routing, escalation, and compliance copy..."
                placeholderTextColor={theme.colors.secondaryText}
                textAlignVertical="top"
              />

              <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.colors.primary, marginTop: 24 }]} onPress={() => console.log('Create script requested')}>
                <Check size={18} color="#fff" />
                <Text style={styles.primaryButtonText}>Save draft</Text>
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
  },
  scrollContent: {
    paddingBottom: 32,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  summaryCard: {
    width: '47%',
    borderRadius: 18,
    padding: 16,
  },
  summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  summaryDelta: {
    fontSize: 12,
  },
  card: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderRadius: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  refreshText: {
    fontSize: 13,
    fontWeight: '600',
  },
  endpointRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  endpointLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  endpointIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endpointTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  endpointDescription: {
    fontSize: 13,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  complianceRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  complianceChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
  },
  complianceChipActive: {
    backgroundColor: '#1C1C1E',
    borderColor: '#1C1C1E',
  },
  complianceChipText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  scriptList: {
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 16,
  },
  scriptCard: {
    borderRadius: 20,
    padding: 18,
  },
  scriptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  channelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  channelBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  scriptActions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    padding: 8,
    borderRadius: 10,
  },
  scriptTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  scriptPreview: {
    fontSize: 14,
    lineHeight: 20,
  },
  scriptMetaRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 12,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scriptStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
  },
  guardrailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  guardrailPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  guardrailText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  footerLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  footerValue: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  addButton: {
    padding: 6,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalContent: {
    padding: 20,
  },
  modalMetaRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  modalChannelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  modalChannelText: {
    fontSize: 13,
    fontWeight: '600',
  },
  modalStatusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  modalStatusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  modalScriptTitle: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  modalGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  modalInfoCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  modalInfoLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  modalInfoValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
  },
  modalInfoHint: {
    fontSize: 12,
    marginTop: 4,
  },
  modalGuardrailBox: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.04)',
    marginBottom: 24,
  },
  modalGuardrailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  modalGuardrailTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalGuardrailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  modalGuardrailText: {
    fontSize: 14,
  },
  modalActions: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  textArea: {
    minHeight: 160,
    textAlignVertical: 'top',
  },
  channelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  channelOption: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  channelOptionLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
});
