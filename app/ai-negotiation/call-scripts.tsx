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
} from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Plus,
  Search,
  Target,
  Briefcase,
  PhoneCall,
  MessageCircle,
  Link2,
  Shield,
  TrendingUp,
  Copy,
  Edit,
  X,
  Check,
  Rocket,
  BarChart3,
  CalendarRange,
  RefreshCw,
} from 'lucide-react-native';
import { mockCallScripts } from '@/utils/mockNegotiationData';
import type { CallScript } from '@/types/negotiation';
import { useTheme } from '@/providers/ThemeProvider';

type ChannelType = 'Voice' | 'WhatsApp' | 'Video' | 'Email';
type Stage = 'Prospecting' | 'Discovery' | 'Negotiation' | 'Closing';

type NegotiationScript = CallScript & {
  stage: Stage;
  channel: ChannelType;
  dealValue: number;
  owner: string;
  targetNumber: string;
  whatsappThread: string;
  risk: 'low' | 'medium' | 'high';
  lastEngaged: string;
  approvalsRequired: string[];
};

type StageFilter = 'all' | Stage;
type ChannelFilter = 'all' | ChannelType;

type Connector = {
  id: string;
  label: string;
  detail: string;
  connected: boolean;
};

const stageColors: Record<Stage, string> = {
  Prospecting: '#5AC8FA',
  Discovery: '#34C759',
  Negotiation: '#FF9500',
  Closing: '#FF2D55',
};

const channelColors: Record<ChannelType, string> = {
  Voice: '#0A84FF',
  WhatsApp: '#25D366',
  Video: '#AF52DE',
  Email: '#FF9F0A',
};

export default function NegotiationCallScriptsScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stageFilter, setStageFilter] = useState<StageFilter>('all');
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>('all');
  const [selectedScript, setSelectedScript] = useState<NegotiationScript | null>(null);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [connectors, setConnectors] = useState<Connector[]>([
    { id: 'whatsapp', label: 'WhatsApp BSP', detail: 'Meta BSP verified · green check', connected: true },
    { id: 'twilio', label: 'PSTN Dialer', detail: '+1 +44 pools mapped', connected: true },
    { id: 'zoom', label: 'Zoom / Meet bridge', detail: 'SAML SSO enforced', connected: true },
    { id: 'slack', label: 'Slack deal desk', detail: '#deal-war-room', connected: true },
  ]);

  const scripts = useMemo<NegotiationScript[]>(() => {
    const owners = ['Deal Desk', 'AE Squad', 'Finance Review'];
    const numbers = ['+1 415 982 1100', '+44 20 7123 2209', '+61 2 8294 5577'];
    const whatsapp = ['+1 917 880 4410', '+44 7700 900321', '+971 50 123 9980'];
    const stages: Stage[] = ['Prospecting', 'Discovery', 'Negotiation', 'Closing'];
    const channels: ChannelType[] = ['Voice', 'WhatsApp', 'Video', 'Email'];
    const risks: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];

    return mockCallScripts.map((script, index) => ({
      ...script,
      id: `${script.id}-neg-${index}`,
      stage: stages[index % stages.length],
      channel: channels[index % channels.length],
      dealValue: 250000 + index * 42000,
      owner: owners[index % owners.length],
      targetNumber: numbers[index % numbers.length],
      whatsappThread: whatsapp[index % whatsapp.length],
      risk: risks[index % risks.length],
      lastEngaged: index % 2 === 0 ? '1h ago' : 'Yesterday',
      approvalsRequired: index % 2 === 0 ? ['Legal', 'Revenue Ops'] : ['Finance'],
    }));
  }, []);

  const filteredScripts = useMemo(() => {
    return scripts.filter(script => {
      const matchesSearch = script.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStage = stageFilter === 'all' || script.stage === stageFilter;
      const matchesChannel = channelFilter === 'all' || script.channel === channelFilter;
      return matchesSearch && matchesStage && matchesChannel;
    });
  }, [scripts, searchQuery, stageFilter, channelFilter]);

  const pipelineStats = [
    { id: 'coverage', label: 'Pipeline coverage', value: '4.1x', delta: '+0.4 QoQ', icon: BarChart3 },
    { id: 'time', label: 'Cycle time', value: '26d', delta: '-3 days', icon: CalendarRange },
    { id: 'win', label: 'Win rate', value: '38%', delta: '+6 pts', icon: Target },
    { id: 'expansion', label: 'Expansion ready', value: '14 deals', delta: '>$3.2M', icon: Briefcase },
  ];

  const stageFilters: StageFilter[] = ['all', 'Prospecting', 'Discovery', 'Negotiation', 'Closing'];
  const channelFilters: ChannelFilter[] = ['all', 'Voice', 'WhatsApp', 'Video', 'Email'];

  const toggleConnector = (id: string) => {
    setConnectors(prev => prev.map(connector => {
      if (connector.id === id) {
        const next = !connector.connected;
        console.log('Connector toggled', id, next);
        return { ...connector, connected: next };
      }
      return connector;
    }));
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
            <TouchableOpacity onPress={() => setShowCreateModal(true)} style={styles.addButton} testID="negotiation-call-scripts-create">
              <Plus size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['bottom']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.text }]}>Deal orchestration playbooks</Text>
            <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>Pair phone numbers, WhatsApp threads, and approval flows with stage-specific AI scripts.</Text>
          </View>

          <View style={styles.summaryRow}>
            {pipelineStats.map(stat => {
              const Icon = stat.icon;
              return (
                <View key={stat.id} style={[styles.summaryCard, { backgroundColor: theme.colors.cardBackground }]} testID={`negotiation-call-scripts-summary-${stat.id}`}>
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
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Revenue stack connectors</Text>
              <TouchableOpacity style={styles.refreshButton} onPress={() => console.log('Sync connectors')}>
                <RefreshCw size={16} color={theme.colors.primary} />
                <Text style={[styles.refreshText, { color: theme.colors.primary }]}>Resync</Text>
              </TouchableOpacity>
            </View>
            {connectors.map(connector => (
              <View key={connector.id} style={styles.connectorRow}>
                <View>
                  <Text style={[styles.connectorLabel, { color: theme.colors.text }]}>{connector.label}</Text>
                  <Text style={[styles.connectorDetail, { color: theme.colors.secondaryText }]}>{connector.detail}</Text>
                </View>
                <Switch
                  value={connector.connected}
                  onValueChange={() => toggleConnector(connector.id)}
                  trackColor={{ false: '#767577', true: theme.colors.primary }}
                  thumbColor={connector.connected ? '#fff' : '#f4f3f4'}
                />
              </View>
            ))}
          </View>

          <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]} testID="negotiation-call-scripts-filters">
            <View style={styles.searchBar}>
              <Search size={18} color={theme.colors.secondaryText} />
              <TextInput
                style={[styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search title, number, or owner"
                placeholderTextColor={theme.colors.secondaryText}
                value={searchQuery}
                onChangeText={text => {
                  console.log('Negotiation script search', text);
                  setSearchQuery(text);
                }}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
              {stageFilters.map(stage => (
                <TouchableOpacity
                  key={stage}
                  style={[styles.filterChip, stageFilter === stage && styles.filterChipActive]}
                  onPress={() => {
                    console.log('Stage filter', stage);
                    setStageFilter(stage);
                  }}
                >
                  <Text style={[styles.filterChipText, { color: stageFilter === stage ? '#fff' : theme.colors.text }]}>
                    {stage === 'all' ? 'All stages' : stage}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
              {channelFilters.map(channel => (
                <TouchableOpacity
                  key={channel}
                  style={[styles.channelChip, channelFilter === channel && styles.channelChipActive]}
                  onPress={() => {
                    console.log('Channel filter', channel);
                    setChannelFilter(channel);
                  }}
                >
                  <Text style={[styles.channelChipText, { color: channelFilter === channel ? '#fff' : theme.colors.secondaryText }]}>
                    {channel === 'all' ? 'All channels' : channel}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.list}>
            {filteredScripts.map(script => (
              <TouchableOpacity
                key={script.id}
                style={[styles.scriptCard, { backgroundColor: theme.colors.cardBackground }]} 
                onPress={() => setSelectedScript(script)}
                testID={`negotiation-call-script-${script.id}`}
              >
                <View style={styles.scriptHeader}>
                  <View style={[styles.stageBadge, { backgroundColor: `${stageColors[script.stage]}1A` }]}
                    >
                    <Text style={[styles.stageBadgeText, { color: stageColors[script.stage] }]}>{script.stage}</Text>
                  </View>
                  <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Copy script', script.id)}>
                      <Copy size={16} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => console.log('Edit script', script.id)}>
                      <Edit size={16} color={theme.colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={[styles.scriptTitle, { color: theme.colors.text }]}>{script.title}</Text>
                <Text style={[styles.scriptPreview, { color: theme.colors.secondaryText }]} numberOfLines={2}>{script.script}</Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaPill}>
                    <PhoneCall size={14} color={theme.colors.primary} />
                    <Text style={[styles.metaText, { color: theme.colors.text }]}>{script.targetNumber}</Text>
                  </View>
                  <View style={styles.metaPill}>
                    <MessageCircle size={14} color={channelColors.WhatsApp} />
                    <Text style={[styles.metaText, { color: theme.colors.text }]}>{script.whatsappThread}</Text>
                  </View>
                  <View style={styles.metaPill}>
                    <TrendingUp size={14} color={theme.colors.success} />
                    <Text style={[styles.metaText, { color: theme.colors.text }]}>${(script.dealValue / 1000).toFixed(0)}k</Text>
                  </View>
                </View>

                <View style={styles.statsRow}>
                  <View style={styles.stat}>
                    <Shield size={14} color={theme.colors.warning} />
                    <Text style={[styles.statText, { color: theme.colors.text }]}>{script.risk.toUpperCase()} RISK</Text>
                  </View>
                  <View style={styles.stat}>
                    <Link2 size={14} color={theme.colors.primary} />
                    <Text style={[styles.statText, { color: theme.colors.text }]}>{script.owner}</Text>
                  </View>
                  <View style={styles.stat}>
                    <Rocket size={14} color={theme.colors.success} />
                    <Text style={[styles.statText, { color: theme.colors.text }]}>{script.lastEngaged}</Text>
                  </View>
                </View>

                <View style={styles.guardrailRow}>
                  {script.approvalsRequired.map(approval => (
                    <View key={approval} style={styles.guardrailPill}>
                      <Text style={styles.guardrailText}>{approval}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.footerRow}>
                  <TouchableOpacity style={styles.footerAction} onPress={() => console.log('Dial number', script.targetNumber)}>
                    <PhoneCall size={14} color={theme.colors.primary} />
                    <Text style={[styles.footerActionText, { color: theme.colors.primary }]}>Dial</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.footerAction} onPress={() => console.log('Open WhatsApp thread', script.whatsappThread)}>
                    <MessageCircle size={14} color={channelColors.WhatsApp} />
                    <Text style={[styles.footerActionText, { color: channelColors.WhatsApp }]}>WhatsApp</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.footerAction} onPress={() => console.log('Push to CRM', script.id)}>
                    <Link2 size={14} color={theme.colors.primary} />
                    <Text style={[styles.footerActionText, { color: theme.colors.primary }]}>Sync CRM</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <Modal visible={selectedScript !== null} animationType="slide" transparent={false} onRequestClose={() => setSelectedScript(null)}>
          {selectedScript && (
            <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Script blueprint</Text>
                <TouchableOpacity onPress={() => setSelectedScript(null)}>
                  <X size={24} color={theme.colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                <View style={styles.modalStageRow}>
                  <View style={[styles.stageBadge, { backgroundColor: `${stageColors[selectedScript.stage]}1A` }]}
                    >
                    <Text style={[styles.stageBadgeText, { color: stageColors[selectedScript.stage] }]}>{selectedScript.stage}</Text>
                  </View>
                  <View style={[styles.channelChipModal, { backgroundColor: `${channelColors[selectedScript.channel]}1A` }]}
                    >
                    <Text style={[styles.channelChipModalText, { color: channelColors[selectedScript.channel] }]}>{selectedScript.channel}</Text>
                  </View>
                </View>

                <Text style={[styles.modalScriptTitle, { color: theme.colors.text }]}>{selectedScript.title}</Text>
                <Text style={[styles.modalDescription, { color: theme.colors.secondaryText }]}>{selectedScript.script}</Text>

                <View style={styles.modalStatsRow}>
                  <View style={[styles.modalStatCard, { backgroundColor: theme.colors.cardBackground }]}>
                    <Text style={[styles.modalStatLabel, { color: theme.colors.secondaryText }]}>Deal value</Text>
                    <Text style={[styles.modalStatValue, { color: theme.colors.text }]}>${selectedScript.dealValue.toLocaleString()}</Text>
                  </View>
                  <View style={[styles.modalStatCard, { backgroundColor: theme.colors.cardBackground }]}>
                    <Text style={[styles.modalStatLabel, { color: theme.colors.secondaryText }]}>Approvals</Text>
                    <Text style={[styles.modalStatValue, { color: theme.colors.text }]}>{selectedScript.approvalsRequired.length}</Text>
                  </View>
                </View>

                <View style={styles.modalBlock}>
                  <Text style={[styles.modalBlockTitle, { color: theme.colors.text }]}>Guardrails & follow ups</Text>
                  {selectedScript.tags.map(tag => (
                    <View key={tag} style={[styles.modalGuardrailRow, { backgroundColor: theme.colors.cardBackground }]}
                      >
                      <Text style={[styles.modalGuardrailText, { color: theme.colors.text }]}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modalActions}>
                  <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]} onPress={() => console.log('Deploy script', selectedScript.id)}>
                    <Check size={18} color="#fff" />
                    <Text style={styles.primaryButtonText}>Deploy to stage</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.secondaryButton, { borderColor: theme.colors.primary }]} onPress={() => console.log('Share script', selectedScript.id)}>
                    <MessageCircle size={18} color={theme.colors.primary} />
                    <Text style={[styles.secondaryButtonText, { color: theme.colors.primary }]}>Share with pod</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
          )}
        </Modal>

        <Modal visible={showCreateModal} animationType="slide" transparent={false} onRequestClose={() => setShowCreateModal(false)}>
          <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Create negotiation script</Text>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <Text style={[styles.formLabel, { color: theme.colors.text }]}>Title</Text>
              <TextInput
                style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
                placeholder="Executive objection handler"
                placeholderTextColor={theme.colors.secondaryText}
              />

              <Text style={[styles.formLabel, { color: theme.colors.text }]}>Stage</Text>
              <View style={styles.selectorRow}>
                {stageFilters.filter(stage => stage !== 'all').map(stage => (
                  <View key={stage} style={[styles.selectorChip, { borderColor: stageColors[stage] ?? theme.colors.border }]}
                    >
                    <Text style={[styles.selectorChipText, { color: stageColors[stage] ?? theme.colors.text }]}>{stage}</Text>
                  </View>
                ))}
              </View>

              <Text style={[styles.formLabel, { color: theme.colors.text }]}>Script body</Text>
              <TextInput
                style={[styles.input, styles.textArea, { color: theme.colors.text, borderColor: theme.colors.border }]}
                multiline
                numberOfLines={8}
                placeholder="Opening, discovery prompts, concession guardrails, escalation copy..."
                placeholderTextColor={theme.colors.secondaryText}
                textAlignVertical="top"
              />

              <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.colors.primary, marginTop: 24 }]} onPress={() => console.log('Create negotiation script')}>
                <Check size={18} color="#fff" />
                <Text style={styles.primaryButtonText}>Save playbook</Text>
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  summaryCard: {
    width: '47%',
    borderRadius: 18,
    padding: 16,
  },
  summaryIcon: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  summaryDelta: {
    fontSize: 12,
  },
  card: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  connectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  connectorLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  connectorDetail: {
    fontSize: 13,
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterChipActive: {
    backgroundColor: '#000',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  channelChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  channelChipActive: {
    backgroundColor: '#0A84FF',
    borderColor: '#0A84FF',
  },
  channelChipText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  list: {
    paddingHorizontal: 20,
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
  stageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  stageBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 6,
    borderRadius: 10,
  },
  scriptTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  scriptPreview: {
    fontSize: 14,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
  },
  guardrailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  guardrailPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  guardrailText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
  },
  footerAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerActionText: {
    fontSize: 12,
    fontWeight: '700',
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
  modalStageRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  channelChipModal: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  channelChipModalText: {
    fontSize: 12,
    fontWeight: '700',
  },
  modalScriptTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 18,
  },
  modalStatsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  modalStatCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  modalStatLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  modalStatValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
  },
  modalBlock: {
    marginBottom: 20,
  },
  modalBlockTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  modalGuardrailRow: {
    padding: 12,
    borderRadius: 14,
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
    paddingVertical: 14,
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
    paddingVertical: 14,
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
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 8,
  },
  textArea: {
    minHeight: 150,
    textAlignVertical: 'top',
  },
  selectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectorChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  selectorChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
