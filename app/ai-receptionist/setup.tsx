 
import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {
  DollarSign,
  Target,
  Handshake,
  Brain,
  Mic,
  Clock,
  BookOpen,
  User,
  CheckCircle,
  AlertCircle,
  Shield,
  PhoneCall,
  Wifi,
  Activity,
  Globe,
  Server,
  Database,
  MessageCircle,
  Link2,
  GitBranch,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack, useRouter } from 'expo-router';
import { trpc } from '@/lib/trpc';

export default function AIReceptionistSetup() {
  const { theme } = useTheme();
  const router = useRouter();
  
  // Real tRPC data
  const { data: subscription } = trpc.user.getSubscription.useQuery();
  const isEnterprise = subscription?.plan === 'enterprise';

  const { data: config, isLoading, refetch } = trpc.receptionist.getConfig.useQuery();
  const utils = trpc.useUtils();

  const updateConfigMutation = trpc.receptionist.updateConfig.useMutation({
    onSuccess: () => utils.receptionist.getConfig.invalidate(),
  });

  const setupProgress = useMemo(() => {
    if (!config) return 0;
    // Calculate progress based on configured fields
    const totalSteps = 8;
    let cleared = 0;
    if (config.businessProfile) cleared++;
    if (config.pricing) cleared++;
    if (config.escalationRules) cleared++;
    if (config.experienceGoals) cleared++;
    if (config.knowledgeBase) cleared++;
    if (config.voiceType) cleared++;
    if (config.businessHours) cleared++;
    if (config.aiConfig) cleared++;
    return Math.round((cleared / totalSteps) * 100);
  }, [config]);

  const [aiEnabled, setAiEnabled] = useState<boolean>(true);
  const [voiceType, setVoiceType] = useState<'professional' | 'friendly'>('professional');
  const [geoRouting, setGeoRouting] = useState<boolean>(true);
  const [complianceLock, setComplianceLock] = useState<boolean>(false);
  const [channelStates, setChannelStates] = useState<Record<string, boolean>>({
    pstnEdge: true,
    whatsappEdge: true,
    directLine: false,
  });
  const [playbookStates, setPlaybookStates] = useState<Record<string, boolean>>({
    'vip-escalation': true,
    'whatsapp-continuity': true,
    'after-hours': true,
    'revenue-guardrail': false,
  });
  const [callPickupMode, setCallPickupMode] = useState<'auto' | 'wait'>('wait');
  const [waitDuration, setWaitDuration] = useState<number>(8);
  const [orderConfirmationEnabled, setOrderConfirmationEnabled] = useState<boolean>(true);
  const [confirmationTiming, setConfirmationTiming] = useState<'immediate' | 'delayed'>('immediate');
  const [confirmationRetries, setConfirmationRetries] = useState<number>(2);

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'PSTN': return '#007AFF';
      case 'WhatsApp': return '#25D366';
      case 'Direct Line': return '#FF9500';
      default: return '#8E8E93';
    }
  };

  const setupSections = useMemo(
    () => [
      {
        id: '1',
        title: 'Profile Setup',
        description: 'Configure business identity + caller ID',
        icon: User,
        completed: true,
        route: '/ai-receptionist/setup/profile',
        color: '#007AFF',
      },
      {
        id: '2',
        title: 'Products & Pricing',
        description: 'Catalog, bundles, margin guardrails',
        icon: DollarSign,
        completed: true,
        route: '/ai-receptionist/setup/pricing',
        color: '#34C759',
      },
      {
        id: '3',
        title: 'Negotiation Rules',
        description: 'Enterprise escalation contracts',
        icon: Handshake,
        completed: false,
        route: '/ai-receptionist/setup/negotiations',
        color: '#FF9500',
      },
      {
        id: '4',
        title: 'Experience Goals',
        description: 'Target KPIs, SLAs, QoS',
        icon: Target,
        completed: false,
        route: '/ai-receptionist/setup/goals',
        color: '#FF2D92',
      },
      {
        id: '5',
        title: 'Knowledge Base',
        description: 'Playbooks, FAQs, troubleshooting',
        icon: BookOpen,
        completed: true,
        route: '/ai-receptionist/setup/knowledge-base',
        color: '#FF3B30',
      },
      {
        id: '6',
        title: 'Voice & Personality',
        description: 'Voice packs, pronunciations, tone',
        icon: Mic,
        completed: voiceType === 'professional',
        route: '/ai-receptionist/setup/voice',
        color: '#FFCC02',
      },
      {
        id: '7',
        title: 'Business Hours',
        description: 'Follow-the-sun routing matrix',
        icon: Clock,
        completed: true,
        route: '/ai-receptionist/setup/hours',
        color: '#5AC8FA',
      },
      {
        id: '8',
        title: 'AI Configuration',
        description: 'Limits, memory, redaction policies',
        icon: Brain,
        completed: false,
        route: '/ai-receptionist/setup/ai-config',
        color: '#FF2D55',
      },
    ],
    [voiceType],
  );

  const environments: EnvironmentStatus[] = [
    { id: 'prod', label: 'Production', load: 72, latency: '148 ms', active: true },
    { id: 'dr', label: 'Disaster Recovery', load: 18, latency: '212 ms', active: true },
    { id: 'qa', label: 'QA Playground', load: 38, latency: '190 ms', active: false },
  ];

  const complianceChecklist: ComplianceChecklistItem[] = [
    {
      id: 'pii',
      label: 'PII Redaction',
      description: 'Mask customer secrets in transcripts + logs',
      status: 'done',
    },
    {
      id: 'retention',
      label: 'Data Retention Policy',
      description: 'Auto-expire call data per tenant policy',
      status: 'pending',
    },
    {
      id: 'audit',
      label: 'Audit Trail Webhooks',
      description: 'Streaming to SIEM and SOC queue',
      status: 'done',
    },
  ];

  const channelMatrix: ChannelMatrixItem[] = [
    {
      id: 'pstnEdge',
      label: 'Voice edge (NYC)',
      channel: 'PSTN',
      endpoint: '+1 646 555 0148',
      region: 'us-east-1',
      latency: '142 ms',
      encrypted: true,
      status: 'active',
    },
    {
      id: 'whatsappEdge',
      label: 'WhatsApp verified',
      channel: 'WhatsApp',
      endpoint: '+1 917 888 4400',
      region: 'global',
      latency: '80 ms',
      encrypted: true,
      status: 'active',
    },
    {
      id: 'directLine',
      label: 'SIP / Teams direct line',
      channel: 'Direct Line',
      endpoint: 'sip.receptionist.acme.com',
      region: 'us-west-2',
      latency: '190 ms',
      encrypted: false,
      status: 'standby',
    },
  ];

  const observabilityMetrics = [
    { id: 'live', label: 'Live calls', value: '62', subtext: '4 active escalations', icon: PhoneCall },
    { id: 'sentiment', label: 'Positive sentiment', value: '92%', subtext: 'WA + voice combined', icon: MessageCircle },
    { id: 'qos', label: 'QoS score', value: '98', subtext: 'Packet loss < 0.3%', icon: Activity },
    { id: 'uptime', label: 'Edge uptime', value: '99.999%', subtext: 'Rolling 30d', icon: Wifi },
  ];

  const escalationLanes = [
    { id: 'lane1', title: 'Tier 1 concierge', description: 'AI handles intent + surfaces summary to CX agent', color: '#007AFF' },
    { id: 'lane2', title: 'Deal desk', description: 'Negotiation-ready transcript pushed to CRM + Slack', color: '#FF9500' },
    { id: 'lane3', title: 'Executive bridge', description: 'Immediate bridge-out to on-call exec with live sentiment feed', color: '#AF52DE' },
  ];

  const toggleChannel = (id: ChannelMatrixItem['id']) => {
    setChannelStates(prev => {
      const next = !prev[id];
      console.log('Channel toggled', id, next);
      return { ...prev, [id]: next };
    });
  };

  const togglePlaybook = (id: string) => {
    setPlaybookStates(prev => {
      const next = !prev[id];
      console.log('Playbook toggled', id, next);
      return { ...prev, [id]: next };
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]} testID="receptionist-setup-screen">
      <Stack.Screen
        options={{
          title: 'Setup & Configuration',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Enterprise Setup</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]} testID="receptionist-setup-subtitle">
            Hardened onboarding for voice AI, routing, compliance, and observability
          </Text>
        </View>

        <View style={[styles.progressCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.progressHeader}>
            <View>
              <Text style={[styles.progressTitle, { color: theme.colors.text }]}>Setup Progress</Text>
              <Text style={[styles.progressHint, { color: theme.colors.secondaryText }]}>Ready for global rollout</Text>
            </View>
            <Text style={[styles.progressPercent, { color: theme.colors.primary }]}>{setupProgress}%</Text>
          </View>
          <View style={[styles.progressBarBg, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.progressBarFill, { backgroundColor: theme.colors.primary, width: `${setupProgress}%` }]} />
          </View>
          <Text style={[styles.progressText, { color: theme.colors.secondaryText }]}>7 of 8 control gates cleared</Text>
        </View>

        <View style={styles.switchRow}>
          <View style={[styles.quickToggleCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleInfo}>
                <Text style={[styles.toggleLabel, { color: theme.colors.text }]}>Enable AI Receptionist</Text>
                <Text style={[styles.toggleDescription, { color: theme.colors.secondaryText }]}>Activates PSTN + messaging orchestration</Text>
              </View>
              <Switch
                value={aiEnabled}
                onValueChange={value => {
                  console.log('AI receptionist toggled', value);
                  setAiEnabled(value);
                }}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={aiEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
          <View style={[styles.quickToggleCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.toggleRow}>
              <View style={styles.toggleInfo}>
                <Text style={[styles.toggleLabel, { color: theme.colors.text }]}>Geo Routing</Text>
                <Text style={[styles.toggleDescription, { color: theme.colors.secondaryText }]}>Latency aware, region pinned media</Text>
              </View>
              <Switch
                value={geoRouting}
                onValueChange={value => {
                  console.log('Geo routing toggled', value);
                  setGeoRouting(value);
                }}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={geoRouting ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Call Pickup Behavior</Text>
          <View style={[styles.callPickupCard, { backgroundColor: theme.colors.cardBackground }]} testID="receptionist-call-pickup">
            <Text style={[styles.callPickupDescription, { color: theme.colors.secondaryText }]}>
              Configure how AI handles incoming calls
            </Text>
            
            <View style={styles.pickupOptions}>
              <TouchableOpacity
                style={[styles.pickupOption, { backgroundColor: callPickupMode === 'auto' ? theme.colors.primary : theme.colors.background }]}
                onPress={() => {
                  console.log('Call pickup mode changed to auto');
                  setCallPickupMode('auto');
                }}
                testID="receptionist-pickup-auto"
              >
                <View style={styles.pickupOptionContent}>
                  <PhoneCall size={20} color={callPickupMode === 'auto' ? 'white' : theme.colors.text} />
                  <View style={styles.pickupOptionText}>
                    <Text style={[styles.pickupOptionTitle, { color: callPickupMode === 'auto' ? 'white' : theme.colors.text }]}>Auto-pick calls</Text>
                    <Text style={[styles.pickupOptionSubtitle, { color: callPickupMode === 'auto' ? 'rgba(255,255,255,0.8)' : theme.colors.secondaryText }]}>AI immediately answers all calls</Text>
                  </View>
                </View>
                {callPickupMode === 'auto' && <CheckCircle size={20} color="white" />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.pickupOption, { backgroundColor: callPickupMode === 'wait' ? theme.colors.primary : theme.colors.background }]}
                onPress={() => {
                  console.log('Call pickup mode changed to wait');
                  setCallPickupMode('wait');
                }}
                testID="receptionist-pickup-wait"
              >
                <View style={styles.pickupOptionContent}>
                  <Clock size={20} color={callPickupMode === 'wait' ? 'white' : theme.colors.text} />
                  <View style={styles.pickupOptionText}>
                    <Text style={[styles.pickupOptionTitle, { color: callPickupMode === 'wait' ? 'white' : theme.colors.text }]}>Wait for company</Text>
                    <Text style={[styles.pickupOptionSubtitle, { color: callPickupMode === 'wait' ? 'rgba(255,255,255,0.8)' : theme.colors.secondaryText }]}>Let company pick first, AI as fallback</Text>
                  </View>
                </View>
                {callPickupMode === 'wait' && <CheckCircle size={20} color="white" />}
              </TouchableOpacity>
            </View>

            {callPickupMode === 'wait' && (
              <View style={[styles.waitSettings, { backgroundColor: theme.colors.background }]}>
                <View style={styles.waitSettingsHeader}>
                  <Clock size={18} color={theme.colors.primary} />
                  <Text style={[styles.waitSettingsTitle, { color: theme.colors.text }]}>Wait duration: {waitDuration} seconds</Text>
                </View>
                <Text style={[styles.waitSettingsDescription, { color: theme.colors.secondaryText }]}>
                  If company doesn&apos;t pick up within {waitDuration} seconds, AI will automatically answer the call
                </Text>
                <View style={styles.durationOptions}>
                  {[5, 8, 10, 15].map(duration => (
                    <TouchableOpacity
                      key={duration}
                      style={[styles.durationButton, { backgroundColor: waitDuration === duration ? theme.colors.primary : theme.colors.cardBackground }]}
                      onPress={() => {
                        console.log('Wait duration changed to', duration);
                        setWaitDuration(duration);
                      }}
                      testID={`receptionist-wait-${duration}`}
                    >
                      <Text style={[styles.durationButtonText, { color: waitDuration === duration ? 'white' : theme.colors.text }]}>{duration}s</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Order Confirmation (2-Step Verification)</Text>
          <View style={[styles.orderConfirmCard, { backgroundColor: theme.colors.cardBackground }]} testID="receptionist-order-confirmation">
            <View style={styles.orderConfirmHeader}>
              <View style={styles.orderConfirmTitleRow}>
                <CheckCircle size={20} color={theme.colors.primary} />
                <Text style={[styles.orderConfirmTitle, { color: theme.colors.text }]}>Automatic Order Confirmation</Text>
              </View>
              <Switch
                value={orderConfirmationEnabled}
                onValueChange={value => {
                  console.log('Order confirmation toggled', value);
                  setOrderConfirmationEnabled(value);
                }}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={orderConfirmationEnabled ? '#fff' : '#f4f3f4'}
              />
            </View>
            
            {orderConfirmationEnabled && (
              <>
                <Text style={[styles.orderConfirmDescription, { color: theme.colors.secondaryText }]}>
                  When customers place orders, AI will automatically call them to verify order details, shipping address, and payment information.
                </Text>

                <View style={styles.confirmTimingRow}>
                  <TouchableOpacity
                    style={[styles.timingOption, { backgroundColor: confirmationTiming === 'immediate' ? theme.colors.primary : theme.colors.background }]}
                    onPress={() => {
                      console.log('Confirmation timing changed to immediate');
                      setConfirmationTiming('immediate');
                    }}
                    testID="receptionist-confirmation-immediate"
                  >
                    <Text style={[styles.timingOptionText, { color: confirmationTiming === 'immediate' ? 'white' : theme.colors.text }]}>Immediate Call</Text>
                    <Text style={[styles.timingOptionSubtext, { color: confirmationTiming === 'immediate' ? 'rgba(255,255,255,0.8)' : theme.colors.secondaryText }]}>Call within 30 seconds</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.timingOption, { backgroundColor: confirmationTiming === 'delayed' ? theme.colors.primary : theme.colors.background }]}
                    onPress={() => {
                      console.log('Confirmation timing changed to delayed');
                      setConfirmationTiming('delayed');
                    }}
                    testID="receptionist-confirmation-delayed"
                  >
                    <Text style={[styles.timingOptionText, { color: confirmationTiming === 'delayed' ? 'white' : theme.colors.text }]}>Delayed Call</Text>
                    <Text style={[styles.timingOptionSubtext, { color: confirmationTiming === 'delayed' ? 'rgba(255,255,255,0.8)' : theme.colors.secondaryText }]}>Wait 2-5 minutes</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.retrySection, { backgroundColor: theme.colors.background }]}>
                  <View style={styles.retrySectionHeader}>
                    <PhoneCall size={18} color={theme.colors.primary} />
                    <Text style={[styles.retrySectionTitle, { color: theme.colors.text }]}>Retry attempts: {confirmationRetries}</Text>
                  </View>
                  <Text style={[styles.retrySectionDescription, { color: theme.colors.secondaryText }]}>
                    If customer doesn&apos;t answer, AI will retry calling after 5 minutes
                  </Text>
                  <View style={styles.retryOptions}>
                    {[1, 2, 3, 4].map(retry => (
                      <TouchableOpacity
                        key={retry}
                        style={[styles.retryButton, { backgroundColor: confirmationRetries === retry ? theme.colors.primary : theme.colors.cardBackground }]}
                        onPress={() => {
                          console.log('Confirmation retries changed to', retry);
                          setConfirmationRetries(retry);
                        }}
                        testID={`receptionist-confirmation-retry-${retry}`}
                      >
                        <Text style={[styles.retryButtonText, { color: confirmationRetries === retry ? 'white' : theme.colors.text }]}>{retry}x</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={[styles.confirmationFeatures, { backgroundColor: theme.colors.background }]}>
                  <Text style={[styles.confirmationFeaturesTitle, { color: theme.colors.text }]}>Verification Steps:</Text>
                  {[
                    'Order items and quantities',
                    'Delivery address confirmation',
                    'Payment method verification',
                    'Expected delivery date',
                    'Special instructions or notes'
                  ].map((step, index) => (
                    <View key={index} style={styles.featureRow}>
                      <CheckCircle size={16} color={theme.colors.success} />
                      <Text style={[styles.featureText, { color: theme.colors.secondaryText }]}>{step}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Setup Components</Text>
          {setupSections.map(section => {
            const Icon = section.icon;
            return (
              <TouchableOpacity
                key={section.id}
                style={[styles.setupCard, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => router.push(section.route as never)}
                testID={`receptionist-setup-card-${section.id}`}
              >
                <View style={[styles.setupIcon, { backgroundColor: `${section.color}20` }]}
                  >
                  <Icon size={24} color={section.color} />
                </View>
                <View style={styles.setupInfo}>
                  <Text style={[styles.setupTitle, { color: theme.colors.text }]}>{section.title}</Text>
                  <Text style={[styles.setupDescription, { color: theme.colors.secondaryText }]}>{section.description}</Text>
                </View>
                {section.completed ? (
                  <CheckCircle size={20} color={theme.colors.success} />
                ) : (
                  <AlertCircle size={20} color={theme.colors.secondaryText} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Voice & Messaging Infrastructure</Text>
          <View style={styles.voiceToggleRow}>
            {(
              [
                { id: 'professional', label: 'Executive tone' },
                { id: 'friendly', label: 'Conversational tone' },
              ] as const
            ).map(option => (
              <TouchableOpacity
                key={option.id}
                onPress={() => {
                  console.log('Voice profile selected', option.id);
                  setVoiceType(option.id);
                }}
                style={[
                  styles.voiceToggle,
                  {
                    backgroundColor:
                      voiceType === option.id ? theme.colors.primary : theme.colors.cardBackground,
                  },
                ]}
                testID={`receptionist-setup-voice-toggle-${option.id}`}
              >
                <Text
                  style={[
                    styles.voiceToggleText,
                    { color: voiceType === option.id ? 'white' : theme.colors.text },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalCards}>
            {[
              { id: 'pstn', title: 'Telephony Edge', body: 'Twilio + Direct Carrier interconnect', icon: PhoneCall, color: '#007AFF' },
              { id: 'voice', title: 'Neural Voice', body: `${voiceType === 'professional' ? 'Executive' : 'Conversational'} tone active`, icon: Mic, color: '#FF2D92' },
              { id: 'qos', title: 'QoS', body: 'Packet loss guardrails + jitter buffer', icon: Wifi, color: '#34C759' },
              { id: 'failover', title: 'Failover', body: 'Auto failover to DR cluster', icon: Activity, color: '#FF9500' },
            ].map(card => {
              const Icon = card.icon;
              return (
                <View key={card.id} style={[styles.resourceCard, { backgroundColor: theme.colors.cardBackground }]}
                  testID={`receptionist-setup-voice-${card.id}`}>
                  <View style={[styles.resourceIcon, { backgroundColor: `${card.color}20` }]}
                    >
                    <Icon size={18} color={card.color} />
                  </View>
                  <Text style={[styles.resourceTitle, { color: theme.colors.text }]}>{card.title}</Text>
                  <Text style={[styles.resourceBody, { color: theme.colors.secondaryText }]}>{card.body}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Channel mesh</Text>
          <View style={[styles.meshCard, { backgroundColor: theme.colors.cardBackground }]} testID="receptionist-setup-channel-mesh">
            {channelMatrix.map(item => (
              <View key={item.id} style={styles.meshRow}>
                <View style={styles.meshLeft}>
                  <View style={[styles.meshIcon, { backgroundColor: `${getChannelColor(item.channel)}1A` }]}
                    >
                    {item.channel === 'PSTN' && <PhoneCall size={18} color={getChannelColor(item.channel)} />}
                    {item.channel === 'WhatsApp' && <MessageCircle size={18} color={getChannelColor(item.channel)} />}
                    {item.channel === 'Direct Line' && <Link2 size={18} color={getChannelColor(item.channel)} />}
                  </View>
                  <View>
                    <Text style={[styles.meshLabel, { color: theme.colors.text }]}>{item.label}</Text>
                    <Text style={[styles.meshEndpoint, { color: theme.colors.secondaryText }]}>{item.endpoint}</Text>
                    <Text style={[styles.meshMeta, { color: theme.colors.secondaryText }]}>
                      {item.region} · {item.latency} · {item.encrypted ? 'mTLS' : 'TLS pending'}
                    </Text>
                  </View>
                </View>
                <View style={styles.meshRight}>
                  <View style={[styles.statusBadge, { backgroundColor: item.status === 'active' ? '#34C75920' : '#FF950020' }]}
                    >
                    <Text style={[styles.statusBadgeText, { color: item.status === 'active' ? theme.colors.success : '#FF9500' }]}>
                      {item.status}
                    </Text>
                  </View>
                  <Switch
                    value={channelStates[item.id]}
                    onValueChange={() => toggleChannel(item.id)}
                    trackColor={{ false: '#767577', true: theme.colors.primary }}
                    thumbColor={channelStates[item.id] ? '#fff' : '#f4f3f4'}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Automated playbooks</Text>
          <View style={[styles.playbookCard, { backgroundColor: theme.colors.cardBackground }]} testID="receptionist-setup-playbooks">
            {automationPlaybooks.map(playbook => (
              <View key={playbook.id} style={styles.playbookRow}>
                <View style={styles.playbookInfo}>
                  <Text style={[styles.playbookTitle, { color: theme.colors.text }]}>{playbook.title}</Text>
                  <Text style={[styles.playbookDescription, { color: theme.colors.secondaryText }]}>{playbook.description}</Text>
                </View>
                <Switch
                  value={playbookStates[playbook.id]}
                  onValueChange={() => togglePlaybook(playbook.id)}
                  trackColor={{ false: '#767577', true: theme.colors.primary }}
                  thumbColor={playbookStates[playbook.id] ? '#fff' : '#f4f3f4'}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Environments</Text>
          {environments.map(env => (
            <View key={env.id} style={[styles.environmentCard, { backgroundColor: theme.colors.cardBackground }]}
              testID={`receptionist-setup-environment-${env.id}`}>
              <View style={styles.environmentLeft}>
                <View style={[styles.environmentDot, { backgroundColor: env.active ? theme.colors.success : '#8E8E93' }]} />
                <Text style={[styles.environmentLabel, { color: theme.colors.text }]}>{env.label}</Text>
              </View>
              <View style={styles.environmentMetrics}>
                <View style={styles.metricPill}>
                  <Server size={12} color={theme.colors.primary} />
                  <Text style={[styles.metricPillText, { color: theme.colors.text }]}>{env.load}% load</Text>
                </View>
                <View style={styles.metricPill}>
                  <Clock size={12} color={theme.colors.secondaryText} />
                  <Text style={[styles.metricPillText, { color: theme.colors.text }]}>{env.latency}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Compliance Controls</Text>
          <View style={[styles.complianceCard, { backgroundColor: theme.colors.cardBackground }]}
            testID="receptionist-setup-compliance">
            <View style={styles.complianceHeader}>
              <View style={styles.complianceTitleRow}>
                <Shield size={20} color={theme.colors.primary} />
                <Text style={[styles.complianceTitle, { color: theme.colors.text }]}>Security posture</Text>
              </View>
              <Switch
                value={complianceLock}
                onValueChange={value => {
                  console.log('Compliance lock toggled', value);
                  setComplianceLock(value);
                }}
                trackColor={{ false: '#767577', true: theme.colors.primary }}
                thumbColor={complianceLock ? '#fff' : '#f4f3f4'}
              />
            </View>
            {complianceChecklist.map(item => (
              <View key={item.id} style={styles.complianceItem}>
                <View style={[styles.statusBadgeLarge, { backgroundColor: item.status === 'done' ? '#34C75920' : '#FF3B3015' }]}
                  >
                  {item.status === 'done' ? (
                    <CheckCircle size={16} color={theme.colors.success} />
                  ) : (
                    <AlertCircle size={16} color={theme.colors.error} />
                  )}
                </View>
                <View style={styles.complianceInfo}>
                  <Text style={[styles.complianceLabel, { color: theme.colors.text }]}>{item.label}</Text>
                  <Text style={[styles.complianceDescription, { color: theme.colors.secondaryText }]}>{item.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Escalation lanes</Text>
          <View style={styles.escalationGrid}>
            {escalationLanes.map(lane => (
              <View key={lane.id} style={[styles.escalationCard, { backgroundColor: theme.colors.cardBackground }]} testID={`receptionist-setup-lane-${lane.id}`}>
                <View style={[styles.escalationIcon, { backgroundColor: `${lane.color}20` }]}
                  >
                  <GitBranch size={18} color={lane.color} />
                </View>
                <Text style={[styles.escalationTitle, { color: theme.colors.text }]}>{lane.title}</Text>
                <Text style={[styles.escalationDescription, { color: theme.colors.secondaryText }]}>{lane.description}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Observability & health</Text>
          <View style={styles.observabilityGrid}>
            {observabilityMetrics.map(metric => {
              const Icon = metric.icon;
              return (
                <View key={metric.id} style={[styles.observabilityCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <View style={styles.observabilityHeader}>
                    <View style={styles.observabilityIcon}>
                      <Icon size={18} color={theme.colors.primary} />
                    </View>
                    <Text style={[styles.observabilityLabel, { color: theme.colors.secondaryText }]}>{metric.label}</Text>
                  </View>
                  <Text style={[styles.observabilityValue, { color: theme.colors.text }]}>{metric.value}</Text>
                  <Text style={[styles.observabilitySubtext, { color: theme.colors.secondaryText }]}>{metric.subtext}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Data Residency</Text>
          <View style={[styles.residencyCard, { backgroundColor: theme.colors.cardBackground }]}
            testID="receptionist-setup-residency">
            <View style={styles.residencyRow}>
              <Globe size={18} color={theme.colors.primary} />
              <Text style={[styles.residencyText, { color: theme.colors.text }]}>Multi-region buckets (US, EU, APAC)</Text>
            </View>
            <View style={styles.residencyRow}>
              <Database size={18} color={theme.colors.secondaryText} />
              <Text style={[styles.residencyText, { color: theme.colors.secondaryText }]}>Hot storage 14 days · archival 13 months</Text>
            </View>
            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
              testID="receptionist-setup-review-policy">
              <Text style={styles.primaryButtonText}>Review residency policy</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.infoCard, { backgroundColor: theme.colors.cardBackground }]}>
          <AlertCircle size={24} color={theme.colors.primary} />
          <View style={styles.infoContent}>
            <Text style={[styles.infoTitle, { color: theme.colors.text }]}>Complete setup for best resiliency</Text>
            <Text style={[styles.infoText, { color: theme.colors.secondaryText }]}>Finalize negotiation rules and AI configuration to unlock zero-touch onboarding, automated guardrails, and realtime observability hooks.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const getChannelColor = (channel: ChannelMatrixItem['channel']) => {
  const palette: Record<ChannelMatrixItem['channel'], string> = {
    PSTN: '#007AFF',
    WhatsApp: '#25D366',
    'Direct Line': '#FF9500',
  };
  return palette[channel];
};

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
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
  },
  progressCard: {
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressHint: {
    fontSize: 12,
    marginTop: 4,
  },
  progressPercent: {
    fontSize: 26,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
  },
  switchRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickToggleCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  toggleInfo: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: 13,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
  },
  setupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  setupIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  setupInfo: {
    flex: 1,
  },
  setupTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  setupDescription: {
    fontSize: 13,
  },
  voiceToggleRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  voiceToggle: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  voiceToggleText: {
    fontSize: 13,
    fontWeight: '700',
  },
  horizontalCards: {
    gap: 12,
  },
  resourceCard: {
    width: 180,
    padding: 16,
    borderRadius: 16,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  resourceBody: {
    fontSize: 13,
    lineHeight: 18,
  },
  meshCard: {
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  meshRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  meshLeft: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  meshIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meshLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  meshEndpoint: {
    fontSize: 13,
  },
  meshMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  meshRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  playbookCard: {
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  playbookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  playbookInfo: {
    flex: 1,
    paddingRight: 12,
  },
  playbookTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  playbookDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  environmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  environmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  environmentDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  environmentLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  environmentMetrics: {
    flexDirection: 'row',
    gap: 8,
  },
  metricPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  metricPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  complianceCard: {
    padding: 18,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  complianceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  complianceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  complianceTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  complianceItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  statusBadgeLarge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  complianceInfo: {
    flex: 1,
  },
  complianceLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  complianceDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  escalationGrid: {
    gap: 12,
  },
  escalationCard: {
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  escalationIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  escalationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  escalationDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  observabilityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  observabilityCard: {
    width: '47%',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  observabilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  observabilityIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  observabilityLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  observabilityValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  observabilitySubtext: {
    fontSize: 12,
  },
  residencyCard: {
    padding: 18,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  residencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  residencyText: {
    fontSize: 14,
  },
  primaryButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  infoCard: {
    marginHorizontal: 20,
    marginBottom: 28,
    flexDirection: 'row',
    padding: 20,
    borderRadius: 18,
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
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
  },
  callPickupCard: {
    padding: 18,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  callPickupDescription: {
    fontSize: 13,
    marginBottom: 16,
  },
  pickupOptions: {
    gap: 12,
  },
  pickupOption: {
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pickupOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  pickupOptionText: {
    flex: 1,
  },
  pickupOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  pickupOptionSubtitle: {
    fontSize: 13,
  },
  waitSettings: {
    padding: 16,
    borderRadius: 14,
    marginTop: 4,
  },
  waitSettingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  waitSettingsTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  waitSettingsDescription: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  durationOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  durationButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  durationButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  orderConfirmCard: {
    padding: 18,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  orderConfirmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderConfirmTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderConfirmTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  orderConfirmDescription: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  confirmTimingRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  timingOption: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  timingOptionText: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  timingOptionSubtext: {
    fontSize: 12,
  },
  retrySection: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  retrySectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  retrySectionTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  retrySectionDescription: {
    fontSize: 13,
    marginBottom: 12,
    lineHeight: 18,
  },
  retryOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  retryButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  confirmationFeatures: {
    padding: 16,
    borderRadius: 14,
  },
  confirmationFeaturesTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 13,
    flex: 1,
  },
});
